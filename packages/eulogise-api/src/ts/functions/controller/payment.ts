import { Lambdur } from 'lambdur'
import stripe from 'stripe'
import { createHash, randomUUID } from 'crypto'
import * as Errors from '../error'
import { Webtoken } from '../../webtoken'
import {
  caseModel,
  invoiceModel,
  transactionModel,
  userModel,
} from '../../database'
import {
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  EulogiseCountry,
  EulogisePackageOptions,
  IOrderDetails,
} from '@eulogise/core'
import { CheckoutHelper } from '@eulogise/helpers'
import { IInvoiceModel } from '../../database/types/InvoiceModel.types'
import { ICaseModel } from '../../database/types/CaseModel.types'
import { PaymentMethod } from '@stripe/stripe-js'
import {
  createStripeProductsByOrderDetails,
  retrieveOrCreateCustomer,
  retrieveOrCreatePrices,
} from './stripe'
import {
  createStripeInvoice,
  createStripeInvoiceItem,
  finaliseStripeInvoice,
  payStripeInvoice,
} from './stripe/invoice'

// Types and interfaces
interface CreatePaymentResponse {
  hasInvoiceGeneratedAndSent: boolean
  stripeInvoiceId?: string
}

interface PaymentValidationResult {
  isValid: boolean
  error?: string
}

interface StripeInvoiceResult {
  hasInvoiceGeneratedAndSent: boolean
  stripeInvoiceId?: string
}

// Constants
const STRIPE_API_VERSION = '2025-07-30.basil'
const DEFAULT_TAX_BEHAVIOR = 'unspecified' as const
const INVOICE_PAYMENT_TYPE = 'invoice_payment'
const PAYMENT_LOCK_TTL_MS = 3 * 60 * 1000

export class PaymentController {
  private static readonly logger = console // Replace with proper logger in production

  /**
   * Creates and returns a Stripe client instance
   */
  public static createStripeClient(): stripe {
    const apiKey = process.env.STRIPE_ACCESS_KEY
    if (!apiKey) {
      throw new Lambdur.Error(
        Errors.payment.create.noStripeClient({
          errorFn: 'createStripeClient',
        }),
      )
    }

    return new stripe(apiKey, {
      apiVersion: STRIPE_API_VERSION,
    })
  }

  /**
   * Validates payment input parameters
   */
  private static validatePaymentInput(
    paymentOptions: PaymentController.PaymentOptions,
    caseObj: ICaseModel.Schema | null,
    userObj: any,
  ): PaymentValidationResult {
    if (!caseObj) {
      return { isValid: false, error: 'Case not found' }
    }

    if (!userObj) {
      return { isValid: false, error: 'User not found' }
    }

    if (!caseObj.country) {
      return { isValid: false, error: 'Country is required' }
    }

    if (!paymentOptions.orderDetails) {
      return { isValid: false, error: 'Order details are required' }
    }

    if (!paymentOptions.orderDetails.orderSummary?.subtotalFee) {
      return { isValid: false, error: 'Order subtotal is required' }
    }

    return { isValid: true }
  }

  /**
   * Prevents starting a new payment while another payment is still in progress.
   */
  private static async assertNoPaymentInProgress({
    caseObj,
    requestedPackageOption,
  }: {
    caseObj: ICaseModel.Schema
    requestedPackageOption: EulogisePackageOptions
  }) {
    if (!caseObj.id) {
      throw new Lambdur.Error(Errors.payment.create.paymentFailed())
    }

    const now = Date.now()
    if (
      caseObj.paymentProcessingLockExpiresAt &&
      caseObj.paymentProcessingLockExpiresAt > now
    ) {
      throw new Lambdur.Error(Errors.payment.create.pendingPaymentExisting())
    }

    const existingInvoices = await invoiceModel.findByCaseId(caseObj.id)
    const hasPendingInvoiceInProgress = existingInvoices.some((invoice) => {
      if (invoice.status !== 'pending') {
        return false
      }

      const lastActivityAt = Number(invoice.updatedAt ?? invoice.createdAt ?? 0)
      if (!lastActivityAt) {
        return false
      }

      return now - lastActivityAt < PAYMENT_LOCK_TTL_MS
    })

    if (hasPendingInvoiceInProgress) {
      throw new Lambdur.Error(Errors.payment.create.pendingPaymentExisting())
    }

    const isRequestedPackageKeepsake = EULOGIZE_CHECKOUT_PACKAGE_OPTION.find(
      (checkoutPackage) => checkoutPackage.value === requestedPackageOption,
    )?.isKeepsake
    const isRequestedPackageNonKeepsake = isRequestedPackageKeepsake === false

    if (!isRequestedPackageNonKeepsake) {
      return
    }

    const hasCompletedInvoiceForSameNonKeepsakePackage = existingInvoices.some(
      (invoice) =>
        invoice.status === 'complete' &&
        invoice.details?.packageOption === requestedPackageOption,
    )

    if (hasCompletedInvoiceForSameNonKeepsakePackage) {
      throw new Lambdur.Error(
        Errors.payment.create.duplicateNonKeepsakePackagePayment(),
      )
    }
  }

  /**
   * Builds a deterministic idempotency seed for Stripe requests in one payment attempt.
   */
  private static createStripeIdempotencySeed({
    caseId,
    customerId,
    paymentMethodId,
    stripeAmount,
    currency,
  }: {
    caseId: string
    customerId: string
    paymentMethodId: string
    stripeAmount: number
    currency: string
  }): string {
    const rawFingerprint = `${caseId}|${customerId}|${paymentMethodId}|${stripeAmount}|${currency}`
    const fingerprint = createHash('sha256')
      .update(rawFingerprint)
      .digest('hex')
      .slice(0, 24)

    return `payment_${caseId}_${fingerprint}`
  }

  /**
   * Updates invoice and case status atomically
   */
  private static async updatePaymentStatus(
    invoiceObj: IInvoiceModel.Schema,
    caseObj: ICaseModel.Schema,
    status: 'complete' | 'failed',
    transactionId?: string,
    error?: { message: string; details?: any },
  ): Promise<void> {
    const updates = [
      invoiceModel.save({
        ...invoiceObj,
        ...(transactionId && { transactions: [transactionId] }),
        status,
        ...(error &&
          status === 'failed' && {
            error: {
              message: error.message,
              timestamp: Date.now(),
              details: error.details,
            },
          }),
      }),
      caseModel.save({
        ...caseObj,
        customer: caseObj.customer,
        status: status === 'complete' ? 'paid' : 'unpaid',
      }),
    ]

    await Promise.all(updates)
  }

  /**
   * Creates a payment intent with Stripe
   * Note: Not used in the current payment flow due to avoiding the double charges with invoice flow.
   */
  public static async createPaymentIntent({
    stripeClient,
    amount,
    currency,
    userEmail,
    orderDetails,
    country,
    invoiceObj,
    caseObj,
    paymentMethod,
    customer,
  }: {
    stripeClient: stripe
    amount: number
    currency: string
    userEmail: string
    orderDetails: IOrderDetails
    country: EulogiseCountry
    invoiceObj: IInvoiceModel.Schema
    caseObj: ICaseModel.Schema
    paymentMethod: PaymentMethod
    customer: string
  }): Promise<stripe.PaymentIntent> {
    this.logger.info('Creating payment intent', {
      amount,
      currency,
      userEmail,
      customer,
      paymentMethod,
    })

    if (!stripeClient) {
      throw new Lambdur.Error(
        Errors.payment.create.noStripeClient({
          errorFn: 'createPaymentIntent',
        }),
      )
    }

    try {
      const paymentIntentParams: stripe.PaymentIntentCreateParams = {
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        confirm: true,
        payment_method: paymentMethod.id,
        customer,
      }

      if (userEmail) {
        paymentIntentParams.receipt_email = userEmail
      }

      const createdPaymentIntent = await stripeClient.paymentIntents.create(
        paymentIntentParams,
      )
      return createdPaymentIntent
    } catch (error) {
      await this.updatePaymentStatus(invoiceObj, caseObj, 'failed', undefined, {
        message: 'Failed to create initial payment intent',
        details: error,
      })
      throw new Lambdur.Error(
        Errors.payment.create.initalPaymentIntentIdMissing(error),
      )
    }
  }

  /**
   * Main payment creation method
   */
  public static async create(
    accountObj: Webtoken.Payload.Account,
    paymentOptions: PaymentController.PaymentOptions,
  ): Promise<CreatePaymentResponse> {
    this.logger.info('Starting payment creation', {
      caseId: paymentOptions.case,
      customerId: accountObj.ref,
    })

    // Declare variables outside try block for access in catch block
    let caseObj: ICaseModel.Schema | null = null
    let userObj: any = null
    let invoiceObj: IInvoiceModel.Schema | null = null
    let transactionObj: any = null
    let paymentLockId: string | null = null
    let hasPaymentLock = false

    try {
      // Fetch required data in parallel
      const [fetchedCase, fetchedUser] = await Promise.all([
        caseModel.findById(paymentOptions.case),
        userModel.findById(accountObj.ref),
      ])

      caseObj = fetchedCase
      userObj = fetchedUser

      // Validate input
      const validation = this.validatePaymentInput(
        paymentOptions,
        caseObj,
        userObj,
      )

      if (!validation.isValid) {
        throw new Lambdur.Error(Errors.payment.create.paymentFailed())
      }

      await this.assertNoPaymentInProgress({
        caseObj: caseObj!,
        requestedPackageOption: paymentOptions.orderDetails.packageOption,
      })

      paymentLockId = randomUUID()
      hasPaymentLock = await caseModel.acquirePaymentProcessingLock({
        caseId: paymentOptions.case,
        lockId: paymentLockId,
        lockExpiresAt: Date.now() + PAYMENT_LOCK_TTL_MS,
      })

      if (!hasPaymentLock) {
        throw new Lambdur.Error(Errors.payment.create.pendingPaymentExisting())
      }

      const { country, orderDetails } = this.extractPaymentData(
        caseObj!,
        paymentOptions,
      )

      // Create initial invoice
      invoiceObj = await this.createInitialInvoice(
        paymentOptions.case,
        accountObj.ref,
        orderDetails,
      )

      // Calculate payment amount
      const { currency, stripeAmount } = this.calculatePaymentAmount(
        country,
        orderDetails,
      )

      // Initialize Stripe
      const stripeClient = this.createStripeClient()
      console.log('paymentOptions', paymentOptions)
      const stripeCustomerId = await this.setupStripeCustomer(
        stripeClient,
        userObj!,
        paymentOptions.paymentMethod.id,
      )
      const stripeIdempotencySeed = this.createStripeIdempotencySeed({
        caseId: paymentOptions.case,
        customerId: accountObj.ref,
        paymentMethodId: paymentOptions.paymentMethod.id,
        stripeAmount,
        currency,
      })

      // Generate and process invoice
      const invoiceResult = await this.generateAndSendInvoice({
        stripeClient,
        orderDetails,
        currency,
        totalStripeAmount: stripeAmount,
        stripeCustomerId,
        paymentMethodId: paymentOptions.paymentMethod.id,
        country,
        idempotencySeed: stripeIdempotencySeed,
      })

      // Create transaction record
      transactionObj = await this.createTransactionRecord(
        invoiceResult.stripeInvoiceId,
        stripeAmount,
        orderDetails,
        accountObj.ref,
      )

      // Handle payment result
      if (!invoiceResult.hasInvoiceGeneratedAndSent) {
        try {
          await this.updatePaymentStatus(
            invoiceObj,
            caseObj!,
            'failed',
            transactionObj.id!,
            {
              message: 'Invoice payment failed',
              details: { stripeInvoiceId: invoiceResult.stripeInvoiceId },
            },
          )
        } catch (error) {
          throw new Lambdur.Error(
            Errors.payment.stripe.invoice.payInvoiceFailed(error),
          )
        }

        throw new Lambdur.Error(Errors.payment.create.paymentFailed())
      }

      // Update status to complete
      await this.updatePaymentStatus(
        invoiceObj,
        caseObj!,
        'complete',
        transactionObj.id!,
      )

      this.logger.info('Payment completed successfully', {
        caseId: paymentOptions.case,
        invoiceId: invoiceResult.stripeInvoiceId,
      })

      return {
        hasInvoiceGeneratedAndSent: invoiceResult.hasInvoiceGeneratedAndSent,
        stripeInvoiceId: invoiceResult.stripeInvoiceId,
      }
    } catch (error) {
      this.logger.error('Payment creation failed', {
        error,
        caseId: paymentOptions.case,
      })

      // Update payment status to failed if we have the necessary objects
      if (invoiceObj && caseObj) {
        try {
          await this.updatePaymentStatus(
            invoiceObj,
            caseObj,
            'failed',
            transactionObj?.id,
            {
              message:
                error?.options?.message ||
                'Payment creation failed, please check the details in Stripe developer dashboard',
              details: {
                errorCode: error?.statusCode || 500,
                statusCode: error?.options?.statusCode || 500,
                originalError: JSON.stringify(error),
              },
            },
          )
          this.logger.info('Payment status updated to failed', {
            caseId: paymentOptions.case,
            invoiceId: invoiceObj.id,
          })
        } catch (updateError) {
          this.logger.error('Failed to update payment status', {
            error: updateError,
            caseId: paymentOptions.case,
          })
        }
      }

      throw new Lambdur.Error(
        Errors.payment.create.stripeError({
          statusCode: error?.options?.statusCode,
          message: error?.options?.message,
        }),
      )
    } finally {
      if (hasPaymentLock && paymentLockId) {
        try {
          await caseModel.releasePaymentProcessingLock({
            caseId: paymentOptions.case,
            lockId: paymentLockId,
          })
        } catch (lockReleaseError) {
          this.logger.error('Failed to release payment lock', {
            caseId: paymentOptions.case,
            lockReleaseError,
          })
        }
      }
    }
  }

  /**
   * Extract payment data from case and options
   */
  private static extractPaymentData(
    caseObj: ICaseModel.Schema,
    paymentOptions: PaymentController.PaymentOptions,
  ): { country: EulogiseCountry; orderDetails: IOrderDetails } {
    return {
      country: caseObj.country!,
      orderDetails: paymentOptions.orderDetails,
    }
  }

  /**
   * Create initial invoice record
   */
  private static async createInitialInvoice(
    caseId: string,
    customerId: string,
    orderDetails: IOrderDetails,
  ): Promise<IInvoiceModel.Schema> {
    return await invoiceModel.save({
      case: caseId,
      customer: customerId,
      details: orderDetails,
      transactions: [],
      status: 'pending',
    })
  }

  /**
   * Calculate payment amount and currency
   */
  private static calculatePaymentAmount(
    country: EulogiseCountry,
    orderDetails: IOrderDetails,
  ): { currency: string; stripeAmount: number } {
    const currency =
      CheckoutHelper.getStripeCurrencyCodeByCountry({ country }) ??
      process.env.STRIPE_CURRENCY!

    const stripeAmount = Math.round(
      orderDetails.orderSummary!.subtotalFee * 100,
    )

    this.logger.info('Payment amount calculated', {
      currency,
      stripeAmount,
      originalAmount: orderDetails.orderSummary!.subtotalFee,
    })

    return { currency, stripeAmount }
  }

  /**
   * Setup Stripe customer and attach payment method
   */
  private static async setupStripeCustomer(
    stripeClient: stripe,
    userObj: any,
    paymentMethodId: string,
  ): Promise<string> {
    const stripeCustomer = await retrieveOrCreateCustomer({
      stripeClient,
      stripeCustomerId: userObj?.stripe?.metadata?.customers?.id,
      userId: userObj.id!,
    })

    const stripeCustomerId = stripeCustomer.id
    if (!stripeCustomerId) {
      throw new Lambdur.Error(
        Errors.payment.stripe.customers.noCustomerId({
          stripeCustomer,
          stripeCustomerId,
        }),
      )
    }

    await this.attachPaymentMethodToCustomer({
      stripeClient,
      customerId: stripeCustomerId,
      paymentMethodId,
    })

    return stripeCustomerId
  }

  /**
   * Create transaction record
   */
  private static async createTransactionRecord(
    stripeInvoiceId: string | undefined,
    stripeAmount: number,
    orderDetails: IOrderDetails,
    customerId: string,
  ) {
    return await transactionModel.save({
      stripePaymentIntentId: stripeInvoiceId || INVOICE_PAYMENT_TYPE,
      stripePaymentIntentData: {
        type: INVOICE_PAYMENT_TYPE,
        invoiceId: stripeInvoiceId,
        amount: stripeAmount,
        orderDetails,
      },
      customer: customerId,
    })
  }

  /**
   * Generate and send Stripe invoice
   */
  public static async generateAndSendInvoice({
    stripeClient,
    orderDetails,
    currency,
    totalStripeAmount,
    stripeCustomerId,
    paymentMethodId,
    country,
    idempotencySeed,
  }: {
    stripeClient: stripe
    orderDetails: IOrderDetails
    currency: string
    totalStripeAmount: number
    stripeCustomerId: string
    paymentMethodId: string
    country: EulogiseCountry
    idempotencySeed: string
  }): Promise<StripeInvoiceResult> {
    this.logger.info('Generating and sending invoice', {
      currency,
      totalStripeAmount,
      stripeCustomerId,
    })

    let hasInvoiceGeneratedAndSent = false
    let stripeInvoiceId: string | undefined

    try {
      // Create Stripe products and prices
      const stripeProducts = await createStripeProductsByOrderDetails({
        stripeClient,
        orderDetails,
        country,
      })

      const stripePrices = await retrieveOrCreatePrices({
        stripeClient,
        products: stripeProducts,
        currencyISOCode: currency,
        country,
        orderDetails,
      })

      // Create and finalize invoice
      const stripeInvoice = await createStripeInvoice({
        stripeClient,
        stripeCustomerId,
        collectionMethod: 'charge_automatically',
        currency,
        defaultPaymentMethod: paymentMethodId,
        idempotencyKey: `${idempotencySeed}:invoice:create`,
      })

      // Attach invoice items
      await Promise.all(
        stripePrices.map((price: stripe.Price, index: number) =>
          createStripeInvoiceItem({
            stripeClient,
            stripeCustomerId,
            price,
            orderDetails,
            invoiceId: stripeInvoice.id!,
            idempotencyKey: `${idempotencySeed}:invoice:item:${index}`,
          }),
        ),
      )

      await finaliseStripeInvoice({
        stripeClient,
        invoiceId: stripeInvoice.id!,
        idempotencyKey: `${idempotencySeed}:invoice:finalize`,
      })

      await payStripeInvoice({
        stripeClient,
        invoiceId: stripeInvoice.id!,
        paymentMethod: paymentMethodId,
        idempotencyKey: `${idempotencySeed}:invoice:pay`,
      })

      stripeInvoiceId = stripeInvoice.id
      hasInvoiceGeneratedAndSent = true

      this.logger.info('Invoice generated and sent successfully', {
        stripeInvoiceId,
      })
    } catch (error) {
      this.logger.error('Failed to generate and send invoice', { error })
      hasInvoiceGeneratedAndSent = false
    }

    return { hasInvoiceGeneratedAndSent, stripeInvoiceId }
  }

  /**
   * Create Stripe product
   */
  public static async createStripeProduct({
    stripeClient,
    params,
  }: {
    stripeClient: stripe
    params: stripe.ProductCreateParams
  }): Promise<stripe.Response<stripe.Product>> {
    if (!stripeClient) {
      throw new Lambdur.Error(
        Errors.payment.create.noStripeClient({
          errorFn: 'createStripeProduct',
        }),
      )
    }

    const { name } = params
    if (!name) {
      throw new Lambdur.Error(
        Errors.payment.stripe.product.noProductName(JSON.stringify({ name })),
      )
    }

    try {
      return await stripeClient.products.create(params)
    } catch (error) {
      throw new Lambdur.Error(
        Errors.payment.stripe.product.createProductFailed(error),
      )
    }
  }

  /**
   * Create Stripe price
   */
  public static async createStripePrice({
    stripeClient,
    productId,
    currency,
    unitAmount = 0,
    taxBehavior = DEFAULT_TAX_BEHAVIOR,
  }: {
    stripeClient: stripe
    productId: string
    currency: string
    unitAmount: number
    taxBehavior?: stripe.Price.TaxBehavior
  }): Promise<stripe.Response<stripe.Price>> {
    if (!stripeClient) {
      throw new Lambdur.Error(
        Errors.payment.create.noStripeClient({ errorFn: 'createStripePrice' }),
      )
    }

    if (!productId || !currency || unitAmount < 0) {
      throw new Lambdur.Error(
        Errors.payment.stripe.price.noRequiredParameters(
          JSON.stringify({ productId, currency, unitAmount }),
        ),
      )
    }

    try {
      return await stripeClient.prices.create({
        product: productId,
        currency,
        unit_amount: unitAmount,
        tax_behavior: taxBehavior,
      })
    } catch (error) {
      throw new Lambdur.Error(
        Errors.payment.stripe.price.createPriceFailed(error),
      )
    }
  }

  /**
   * Attach payment method to customer
   */
  public static async attachPaymentMethodToCustomer({
    stripeClient,
    paymentMethodId,
    customerId,
  }: {
    stripeClient: stripe
    paymentMethodId: string
    customerId: string
  }): Promise<stripe.Response<stripe.PaymentMethod>> {
    if (!stripeClient) {
      throw new Lambdur.Error(
        Errors.payment.create.noStripeClient({
          errorFn: 'attachPaymentMethodToCustomer',
        }),
      )
    }

    if (!paymentMethodId || !customerId) {
      throw new Lambdur.Error(
        Errors.payment.stripe.paymentMethod.noRequiredParameters(
          JSON.stringify({ paymentMethodId, customerId }),
        ),
      )
    }

    try {
      return await stripeClient.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      })
    } catch (error) {
      if (error.type === 'StripeCardError') {
        const updatedError = enhanceDeclinedCardPaymentErrorMessage({
          error,
          declineCode: error?.raw?.decline_code,
        })
        throw new Lambdur.Error(
          Errors.payment.stripe.paymentMethod.attachpaymentMethodFailed(
            updatedError,
          ),
        )
      } else {
        throw new Lambdur.Error(
          Errors.payment.stripe.paymentMethod.attachpaymentMethodFailed(error),
        )
      }
    }
  }
}

export const enhanceDeclinedCardPaymentErrorMessage = ({
  error,
  declineCode,
}: {
  error: any
  declineCode: string
}) => {
  if (!declineCode) {
    return error
  }
  switch (declineCode) {
    case 'generic_decline':
    case 'lost_card':
    case 'stolen_card':
      return {
        ...error,
        message:
          'Your card was declined. Please contact your bank or try a different card.',
      }
    case 'expired_card':
      return {
        ...error,
        message:
          'Your card has expired. Please check the expiry date or use a different card.',
      }
    case 'incorrect_cvc':
      return {
        ...error,
        message: "Your card's CVV code is incorrect",
      }
    case 'processing_error':
      return {
        ...error,
        message:
          'Error processing your card. Please try again or use a different card.',
      }
    default:
      return error
  }
}

export namespace PaymentController {
  export interface PaymentOptions {
    paymentMethod: PaymentMethod
    case: string
    orderDetails: IOrderDetails
  }
}
