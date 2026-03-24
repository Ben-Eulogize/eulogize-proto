import { Lambdur } from 'lambdur'
import Stripe from 'stripe'
import * as Errors from '../../error'
import { IOrderDetails } from '@eulogise/core'
import {
  STRIPE_EULOGIZE_PRODUCT_CATEGORIES,
  STRIPE_KEEPSAKES_PRODUCT_NAMES,
} from '../../../types/stripe'
import { getPrintingProductDetailsByProductName } from './price'

// Types and interfaces
interface GetQuantityByPriceCategoryArgs {
  price: Stripe.Price
  orderDetails: IOrderDetails
}

interface GetDescriptionByPriceCategoryArgs {
  price: Stripe.Price
  orderDetails: IOrderDetails
}

interface CreateStripeInvoiceItemArgs {
  stripeClient: Stripe
  stripeCustomerId: string
  price: Stripe.Price
  invoiceId: string
  orderDetails: IOrderDetails
  idempotencyKey?: string
}

interface FinaliseStripeInvoiceArgs {
  stripeClient: Stripe
  invoiceId: string
  idempotencyKey?: string
}

interface PayStripeInvoiceArgs {
  stripeClient: Stripe
  invoiceId: string
  paymentMethod: string
  idempotencyKey?: string
}

interface SendStripeInvoiceArgs {
  stripeClient: Stripe
  invoiceId: string
}

interface CreateStripeInvoiceArgs {
  stripeClient: Stripe
  stripeCustomerId: string
  collectionMethod: Stripe.Invoice.CollectionMethod
  currency: string
  defaultPaymentMethod: string
  idempotencyKey?: string
}

// Constants
const DEFAULT_QUANTITY = 1
const DEFAULT_COLLECTION_METHOD = 'charge_automatically' as const

// Logger
const logger = console // Replace with proper logger in production

/**
 * Validates Stripe client and required parameters
 */
const validateStripeClient = (stripeClient: Stripe, errorFn: string): void => {
  if (!stripeClient) {
    throw new Lambdur.Error(Errors.payment.create.noStripeClient({ errorFn }))
  }
}

/**
 * Validates required parameters for invoice operations
 */
const validateInvoiceParams = (
  params: Record<string, any>,
  operation: string,
): void => {
  const missingParams = Object.entries(params)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingParams.length > 0) {
    throw new Lambdur.Error(
      Errors.payment.stripe.invoice.noRequiredParameters(
        JSON.stringify({
          origin: 'validateInvoiceParams',
          missingParams,
          operation,
          providedParams: params,
        }),
      ),
    )
  }
}

/**
 * Gets quantity by price category
 */
const getQuantityByPriceCategory = ({
  price,
  orderDetails,
}: GetQuantityByPriceCategoryArgs): number => {
  if (!price || !orderDetails) {
    logger.warn('Missing price or order details for quantity calculation')
    return DEFAULT_QUANTITY
  }

  const { productCategory, productName } = price.metadata as {
    productCategory: STRIPE_EULOGIZE_PRODUCT_CATEGORIES
    productName: string
  }

  logger.info('Calculating quantity for price category', {
    productCategory,
    productName,
  })

  const quantityFromKeepsakes = (): number => {
    const keepsakesMap: Record<string, number | undefined> = {
      [STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_LEATHER_VIDEO_TRIBUTE_BOOKS]:
        orderDetails?.keepsakesDetails?.leatherVideoTributeBook?.metaData
          ?.copyAmount,
      [STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_PHOTO_BOOKS]:
        orderDetails?.keepsakesDetails?.photoBook?.metaData?.copyAmount,
    }

    const qty = keepsakesMap[productName] ?? DEFAULT_QUANTITY
    logger.info('Keepsakes quantity calculated', { productName, quantity: qty })
    return qty
  }

  const quantityFromPrinting = (): number => {
    const { printingProductDetails } = getPrintingProductDetailsByProductName({
      productName,
      orderDetails,
    })
    const qty = printingProductDetails?.copiesAmount ?? DEFAULT_QUANTITY
    logger.info('Printing quantity calculated', { quantity: qty })
    return qty
  }

  switch (productCategory) {
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PACKAGE:
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING:
      return DEFAULT_QUANTITY

    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.KEEPSAKES:
      return quantityFromKeepsakes()

    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PRINTING:
      return quantityFromPrinting()

    default:
      logger.warn('Unknown product category for quantity calculation', {
        productCategory,
      })
      return DEFAULT_QUANTITY
  }
}

/**
 * Gets description by price category
 */
const getDescriptionByPriceCategory = ({
  price,
  orderDetails,
}: GetDescriptionByPriceCategoryArgs): string | undefined => {
  if (!price || !orderDetails) {
    logger.warn('Missing price or order details for description generation')
    return undefined
  }

  const productCategory = price.metadata
    .productCategory as STRIPE_EULOGIZE_PRODUCT_CATEGORIES
  const productName = price.metadata.productName

  logger.info('Generating description for price category', {
    productCategory,
    productName,
  })

  switch (productCategory) {
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PACKAGE:
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.KEEPSAKES:
      if (
        productName ===
        STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_LEATHER_VIDEO_TRIBUTE_BOOKS
      ) {
        const quantity =
          orderDetails?.keepsakesDetails?.leatherVideoTributeBook?.metaData
            ?.copyAmount ?? DEFAULT_QUANTITY
        const color =
          orderDetails?.keepsakesDetails?.leatherVideoTributeBook?.metaData
            ?.color

        const description = `${productName} | ${quantity} x ${color} Video Book${
          quantity === 1 ? '' : 's'
        }`

        logger.info('Keepsakes description generated', { description })
        return description
      }
      return undefined

    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING:
      return undefined

    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PRINTING:
      const { printingProductDetails } = getPrintingProductDetailsByProductName(
        { productName, orderDetails },
      )
      const displayedProductName = price.metadata.productName
      const description = `${displayedProductName} | ${printingProductDetails?.copiesAmount} Prints | ${printingProductDetails?.paperType}`

      logger.info('Printing description generated', { description })
      return description

    default:
      logger.warn('Unknown product category for description generation', {
        productCategory,
      })
      return undefined
  }
}

/**
 * Creates a Stripe invoice item
 */
export const createStripeInvoiceItem = async ({
  stripeClient,
  stripeCustomerId,
  price,
  invoiceId,
  orderDetails,
  idempotencyKey,
}: CreateStripeInvoiceItemArgs): Promise<
  Stripe.Response<Stripe.InvoiceItem>
> => {
  validateStripeClient(stripeClient, 'createStripeInvoiceItem')
  validateInvoiceParams(
    { stripeCustomerId, price: price?.id, invoiceId, orderDetails },
    'createStripeInvoiceItem',
  )

  logger.info('Creating Stripe invoice item', {
    stripeCustomerId,
    priceId: price.id,
    invoiceId,
  })

  try {
    const quantity = getQuantityByPriceCategory({ price, orderDetails })
    const description = getDescriptionByPriceCategory({ price, orderDetails })

    const invoiceItem = idempotencyKey
      ? await stripeClient.invoiceItems.create(
          {
            customer: stripeCustomerId,
            pricing: {
              price: price.id,
            },
            invoice: invoiceId,
            quantity,
            description,
          },
          { idempotencyKey },
        )
      : await stripeClient.invoiceItems.create({
          customer: stripeCustomerId,
          pricing: {
            price: price.id,
          },
          invoice: invoiceId,
          quantity,
          description,
        })

    logger.info('Stripe invoice item created successfully', {
      invoiceItemId: invoiceItem.id,
      quantity,
      description,
    })

    return invoiceItem
  } catch (error) {
    logger.error('Failed to create Stripe invoice item', {
      error,
      customerId: stripeCustomerId,
      priceId: price.id,
      invoiceId,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.invoice.createInvoiceItemFailed(
        JSON.stringify({
          customerId: stripeCustomerId,
          priceId: price.id,
          invoiceId,
          error,
        }),
      ),
    )
  }
}

/**
 * Finalizes a Stripe invoice
 */
export const finaliseStripeInvoice = async ({
  stripeClient,
  invoiceId,
  idempotencyKey,
}: FinaliseStripeInvoiceArgs): Promise<Stripe.Response<Stripe.Invoice>> => {
  validateStripeClient(stripeClient, 'finaliseStripeInvoice')
  validateInvoiceParams({ invoiceId }, 'finaliseStripeInvoice')

  logger.info('Finalizing Stripe invoice', { invoiceId })

  try {
    const finalisedInvoice = idempotencyKey
      ? await (stripeClient.invoices.finalizeInvoice as any)(
          invoiceId,
          {
            auto_advance: false,
          },
          { idempotencyKey },
        )
      : await stripeClient.invoices.finalizeInvoice(invoiceId, {
          auto_advance: false,
        })

    logger.info('Stripe invoice finalized successfully', {
      invoiceId: finalisedInvoice.id,
    })

    return finalisedInvoice
  } catch (error) {
    logger.error('Failed to finalize Stripe invoice, attempting to void', {
      error,
      invoiceId,
    })

    try {
      await stripeClient.invoices.voidInvoice(invoiceId)
      logger.info('Stripe invoice voided after finalization failure', {
        invoiceId,
      })
    } catch (voidError) {
      logger.error('Failed to void Stripe invoice after finalization failure', {
        voidError,
        invoiceId,
      })
    }

    throw new Lambdur.Error(
      Errors.payment.stripe.invoice.finaliseInvoiceFailed(
        JSON.stringify({ invoiceId, error }),
      ),
    )
  }
}

/**
 * Pays a Stripe invoice
 */
export const payStripeInvoice = async ({
  stripeClient,
  invoiceId,
  paymentMethod,
  idempotencyKey,
}: PayStripeInvoiceArgs): Promise<Stripe.Response<Stripe.Invoice>> => {
  validateStripeClient(stripeClient, 'payStripeInvoice')
  validateInvoiceParams({ invoiceId, paymentMethod }, 'payStripeInvoice')

  logger.info('Paying Stripe invoice', { invoiceId, paymentMethod })

  try {
    const paidInvoice = idempotencyKey
      ? await (stripeClient.invoices.pay as any)(
          invoiceId,
          {
            payment_method: paymentMethod,
          },
          { idempotencyKey },
        )
      : await stripeClient.invoices.pay(invoiceId, {
          payment_method: paymentMethod,
        })

    logger.info('Stripe invoice paid successfully', {
      invoiceId: paidInvoice.id,
      paymentMethod,
    })

    return paidInvoice
  } catch (error) {
    logger.error('Failed to pay Stripe invoice, attempting to void', {
      error,
      invoiceId,
      paymentMethod,
    })

    try {
      await stripeClient.invoices.voidInvoice(invoiceId)
      logger.info('Stripe invoice voided after payment failure', { invoiceId })
    } catch (voidError) {
      logger.error('Failed to void Stripe invoice after payment failure', {
        voidError,
        invoiceId,
      })
    }

    throw new Lambdur.Error(
      Errors.payment.stripe.invoice.finaliseInvoiceFailed(error),
    )
  }
}

/**
 * Sends a Stripe invoice
 */
export const sendStripeInvoice = async ({
  stripeClient,
  invoiceId,
}: SendStripeInvoiceArgs): Promise<Stripe.Response<Stripe.Invoice>> => {
  validateStripeClient(stripeClient, 'sendStripeInvoice')
  validateInvoiceParams({ invoiceId }, 'sendStripeInvoice')

  logger.info('Sending Stripe invoice', { invoiceId })

  try {
    const sentInvoice = await stripeClient.invoices.sendInvoice(invoiceId)

    logger.info('Stripe invoice sent successfully', {
      invoiceId: sentInvoice.id,
    })

    return sentInvoice
  } catch (error) {
    logger.error('Failed to send Stripe invoice', { error, invoiceId })
    throw new Lambdur.Error(
      Errors.payment.stripe.invoice.sendInvoiceFailed(
        JSON.stringify({ invoiceId, error }),
      ),
    )
  }
}

/**
 * Creates a Stripe invoice
 */
export const createStripeInvoice = async ({
  stripeClient,
  stripeCustomerId,
  collectionMethod,
  currency,
  defaultPaymentMethod,
  idempotencyKey,
}: CreateStripeInvoiceArgs): Promise<Stripe.Response<Stripe.Invoice>> => {
  validateStripeClient(stripeClient, 'createStripeInvoice')
  validateInvoiceParams(
    { stripeCustomerId, collectionMethod, currency, defaultPaymentMethod },
    'createStripeInvoice',
  )

  logger.info('Creating Stripe invoice', {
    stripeCustomerId,
    collectionMethod,
    currency,
    defaultPaymentMethod,
  })

  try {
    const invoiceParams: Stripe.InvoiceCreateParams = {
      customer: stripeCustomerId,
      collection_method: collectionMethod || DEFAULT_COLLECTION_METHOD,
      currency,
      default_payment_method: defaultPaymentMethod,
      auto_advance: false,
    }

    const invoice = idempotencyKey
      ? await stripeClient.invoices.create(invoiceParams, { idempotencyKey })
      : await stripeClient.invoices.create(invoiceParams)

    logger.info('Stripe invoice created successfully', {
      invoiceId: invoice.id,
      customerId: invoice.customer,
    })

    return invoice
  } catch (error) {
    logger.error('Failed to create Stripe invoice', {
      error,
      customerId: stripeCustomerId,
      collectionMethod,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.invoice.createInvoiceFailed({
        customerId: stripeCustomerId,
        collectionMethod,
        error: JSON.stringify(error),
      }),
    )
  }
}
