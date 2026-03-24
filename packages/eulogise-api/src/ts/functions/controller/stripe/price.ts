import { Lambdur } from 'lambdur'
import * as Errors from '../../error'
import Stripe from 'stripe'
import {
  STRIPE_EULOGIZE_PRINTING_PRODUCTS_DISPLAY_NAME_MAPPING,
  STRIPE_EULOGIZE_PRODUCT_CATEGORIES,
  STRIPE_KEEPSAKES_PRODUCT_NAMES,
  STRIPE_SHIPPING_PRODUCT_NAMES,
  STRIPE_PACKAGE_DISPLAY_NAMES,
} from '../../../types/stripe'
import { CheckoutHelper } from '@eulogise/helpers'
import {
  EulogiseCountry,
  EulogisePackageOptions,
  EulogiseCardProducts,
  EulogizePrintingProductsPaperTypes,
  IPrintingPerUnitPriceByCopies,
  IOrderDetails,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EulogizeShippingAvailableCountries,
} from '@eulogise/core'
import { EulogizePrintingProductsPaperTypeDefinition } from '@eulogise/client-core'

// Types and interfaces
interface CreateStripePriceArgs {
  stripeClient: Stripe
  params: Stripe.PriceCreateParams
}

interface RetrieveOrCreatePriceArgs {
  stripeClient: Stripe
  priceId: string
  createPriceParams: Stripe.PriceCreateParams
  product: Stripe.Product
  stripeUnitAmount: number
}

interface RetrieveOrCreatePricesArgs {
  stripeClient: Stripe
  products: Array<Stripe.Response<Stripe.Product>>
  currencyISOCode: string
  country: EulogiseCountry
  orderDetails: IOrderDetails
}

interface GetUnitAmountByProductAndCurrency {
  product: Stripe.Product
  currencyISOCode: string
  productCategory: STRIPE_EULOGIZE_PRODUCT_CATEGORIES
  country: EulogiseCountry
  orderDetails: IOrderDetails
}

interface GeneratePriceIdParams {
  productName: string
  category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES
  currencyISOCode: string
  unitAmount: number
  orderDetails: IOrderDetails
}

interface PrintingProductDetails {
  printingProduct: EulogiseCardProducts
  printingProductDetails: any
}

// Constants
const PRICE_ID_PREFIX = 'price_'
const DEFAULT_TAX_BEHAVIOR = 'unspecified' as const
const STRIPE_CENT_MULTIPLIER = 100

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
 * Validates required parameters for price operations
 */
const validatePriceParams = (
  params: Record<string, any>,
  operation: string,
): void => {
  const missingParams = Object.entries(params)
    .filter(([, value]) => value === undefined || value === null)
    .map(([key]) => key)

  if (missingParams.length > 0) {
    throw new Lambdur.Error(
      Errors.payment.stripe.price.noRequiredParameters(
        JSON.stringify({
          origin: 'validatePriceParams',
          missingParams,
          operation,
          providedParams: params,
        }),
      ),
    )
  }
}

/**
 * Gets package option by product display name
 */
const getPackageOptionByProductDisplayName = ({
  productName,
}: {
  productName: string
}): EulogisePackageOptions | null => {
  const entry = Object.entries(STRIPE_PACKAGE_DISPLAY_NAMES).find(
    ([, v]) => v === productName,
  )
  return entry?.[0] as EulogisePackageOptions | null
}

/**
 * Gets Stripe Eulogize keepsakes product by product name
 */
const getStripeEulogizekeepsakesProductByProductName = ({
  productName,
}: {
  productName: string
}): keyof typeof STRIPE_KEEPSAKES_PRODUCT_NAMES | null => {
  const entry = Object.entries(STRIPE_KEEPSAKES_PRODUCT_NAMES).find(
    ([, v]) => v === productName,
  )
  return entry?.[0] as keyof typeof STRIPE_KEEPSAKES_PRODUCT_NAMES | null
}

/**
 * Gets printing product details by product name
 */
export const getPrintingProductDetailsByProductName = ({
  productName,
  orderDetails,
}: {
  productName: string
  orderDetails: IOrderDetails
}): PrintingProductDetails => {
  const printingProduct: EulogiseCardProducts | null =
    STRIPE_EULOGIZE_PRINTING_PRODUCTS_DISPLAY_NAME_MAPPING?.[
      productName as keyof typeof STRIPE_EULOGIZE_PRINTING_PRODUCTS_DISPLAY_NAME_MAPPING
    ] ?? null

  logger.info('Getting printing product details', {
    productName,
    printingProduct,
  })

  if (!printingProduct) {
    logger.error('No printing product found for product name', {
      productName,
      orderDetails,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.price.noPrintingFoundForPrice(
        JSON.stringify({
          printingProduct,
          orderDetails,
          error: {
            from: 'getPrintingProductDetailsByProductName - no printingProduct',
            printingProduct,
          },
        }),
      ),
    )
  }

  const printingProductDetails =
    orderDetails.printingDetails.orderedProductsDetails?.[printingProduct]

  return {
    printingProduct,
    printingProductDetails,
  }
}

/**
 * Gets printing unit amount by product
 */
const getPrintingUnitAmountByProduct = ({
  printingProduct,
  paperType,
  country,
  copiesAmount,
}: {
  printingProduct: EulogiseCardProducts
  paperType: EulogizePrintingProductsPaperTypes
  country: EulogiseCountry
  copiesAmount: keyof IPrintingPerUnitPriceByCopies
}): number => {
  if (!paperType) {
    logger.warn('No paper type provided for printing unit amount calculation', {
      printingProduct,
      country,
      copiesAmount,
    })
    return 0
  }

  const unitAmount =
    EulogizePrintingProductsPaperTypeDefinition[paperType].perPaperUnitPrice?.[
      printingProduct
    ]?.[country]?.[copiesAmount]

  logger.info('Calculated printing unit amount', {
    printingProduct,
    paperType,
    country,
    copiesAmount,
    unitAmount,
  })

  return unitAmount || 0
}

/**
 * Generates price ID based on category and parameters
 */
const generatePriceId = ({
  productName,
  category,
  unitAmount,
  currencyISOCode,
  orderDetails,
}: GeneratePriceIdParams): string => {
  switch (category) {
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PRINTING:
      const { printingProduct, printingProductDetails } =
        getPrintingProductDetailsByProductName({ productName, orderDetails })
      const paperType = printingProductDetails?.paperType
      const copiesAmount =
        printingProductDetails?.copiesAmount as keyof IPrintingPerUnitPriceByCopies

      if (!paperType || !copiesAmount || !printingProduct) {
        logger.error(
          'Missing required parameters for printing price ID generation',
          {
            paperType,
            copiesAmount,
            printingProduct,
          },
        )
        throw new Lambdur.Error(
          Errors.payment.stripe.price.noRequiredParameters(
            JSON.stringify({
              paperType,
              copiesAmount,
              printingProduct,
            }),
          ),
        )
      }

      return generatePrintingPriceId({
        productName,
        currencyISOCode,
        unitAmount,
        printingProduct,
        paperType,
        copiesAmount,
      })

    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.KEEPSAKES:
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PACKAGE:
    case STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING:
      return generateNonPrintingPriceId({
        productName,
        currencyISOCode,
        unitAmount,
      })

    default:
      logger.warn('Unknown product category for price ID generation', {
        category,
      })
      return generateNonPrintingPriceId({
        productName,
        currencyISOCode,
        unitAmount,
      })
  }
}

/**
 * Generates printing price ID with detailed parameters
 */
const generatePrintingPriceId = ({
  productName,
  currencyISOCode,
  unitAmount,
  printingProduct,
  paperType,
  copiesAmount,
}: {
  productName: string
  currencyISOCode: string
  unitAmount: number
  printingProduct: EulogiseCardProducts
  paperType: EulogizePrintingProductsPaperTypes
  copiesAmount: keyof IPrintingPerUnitPriceByCopies
}): string => {
  return `${PRICE_ID_PREFIX}${productName}_${currencyISOCode}_${unitAmount}_${printingProduct}_${paperType}_${copiesAmount}`
}

/**
 * Generates non-printing price ID
 */
const generateNonPrintingPriceId = ({
  productName,
  currencyISOCode,
  unitAmount,
}: {
  productName: string
  currencyISOCode: string
  unitAmount: number
}): string => {
  return `${PRICE_ID_PREFIX}${productName}_${currencyISOCode}_${unitAmount}`
}

/**
 * Creates a Stripe price
 */
const createStripePrice = async ({
  stripeClient,
  params,
}: CreateStripePriceArgs): Promise<Stripe.Response<Stripe.Price>> => {
  validateStripeClient(stripeClient, 'createStripePrice')
  validatePriceParams(
    {
      product: params.product,
      currency: params.currency,
      unitAmount: params.unit_amount,
    },
    'createStripePrice',
  )

  try {
    logger.info('Creating Stripe price', {
      productId: params.product,
      currency: params.currency,
      unitAmount: params.unit_amount,
    })

    const price = await stripeClient.prices.create(params)

    logger.info('Stripe price created successfully', { priceId: price.id })
    return price
  } catch (error) {
    logger.error('Failed to create Stripe price', { error, params })
    throw new Lambdur.Error(
      Errors.payment.stripe.price.createPriceFailed(error),
    )
  }
}

/**
 * Searches for a Stripe price by ID
 */
const searchStripePrice = async (
  stripeClient: Stripe,
  priceId: string,
): Promise<Stripe.Price | null> => {
  validateStripeClient(stripeClient, 'searchStripePrice')
  validatePriceParams({ priceId }, 'searchStripePrice')

  try {
    logger.info('Searching Stripe price', { priceId })

    const res: Stripe.Response<Stripe.ApiSearchResult<Stripe.Price>> =
      await stripeClient.prices.search({
        query: `metadata['priceId']: '${priceId}'`,
      })

    const hasSearchResult = res.data?.length > 0
    if (!hasSearchResult) {
      logger.info('No Stripe price found', { priceId })
      return null
    }

    const price = res.data?.[0]
    logger.info('Stripe price found', { priceId, foundPriceId: price?.id })
    return price || null
  } catch (error: any) {
    if (error?.code === 'resource_missing') {
      logger.info('Stripe price not found (resource_missing)', { priceId })
      return null
    }

    logger.error('Failed to search Stripe price', { error, priceId })
    throw new Lambdur.Error(
      Errors.payment.stripe.price.retrievePriceFailed(error),
    )
  }
}

/**
 * Retrieves or creates a Stripe price
 */
const retrieveOrCreatePrice = async ({
  stripeClient,
  priceId,
  createPriceParams,
  product,
  stripeUnitAmount,
}: RetrieveOrCreatePriceArgs): Promise<Stripe.Price> => {
  validateStripeClient(stripeClient, 'retrieveOrCreatePrice')
  validatePriceParams(
    { priceId, productId: product?.id },
    'retrieveOrCreatePrice',
  )

  logger.info('Retrieving or creating Stripe price', { priceId })

  const price = await searchStripePrice(stripeClient, priceId)

  if (price) {
    if (price.unit_amount !== stripeUnitAmount) {
      logger.info('Price amount mismatch, creating new price', {
        priceId,
        existingAmount: price.unit_amount,
        newAmount: stripeUnitAmount,
      })
      return await createStripePrice({
        stripeClient,
        params: createPriceParams,
      })
    }

    logger.info('Using existing Stripe price', { priceId })
    return price
  }

  const productId = product?.id
  if (!productId || !createPriceParams) {
    logger.error('Missing required parameters for price creation', {
      productId,
      createPriceParams,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.price.noRequiredParameters(
        JSON.stringify({
          productId,
          createPriceParams,
        }),
      ),
    )
  }

  logger.info('Creating new Stripe price', { priceId, productId })
  return await createStripePrice({ stripeClient, params: createPriceParams })
}

/**
 * Retrieves or creates multiple Stripe prices
 */
const retrieveOrCreatePrices = async ({
  stripeClient,
  products,
  currencyISOCode,
  country,
  orderDetails,
}: RetrieveOrCreatePricesArgs): Promise<Stripe.Price[]> => {
  validateStripeClient(stripeClient, 'retrieveOrCreatePrices')
  validatePriceParams(
    {
      currencyISOCode,
      country,
      orderDetails,
      products: products?.length || 0,
    },
    'retrieveOrCreatePrices',
  )

  logger.info('Retrieving or creating Stripe prices', {
    productCount: products?.length || 0,
    currencyISOCode,
    country,
  })

  if (!products || !Array.isArray(products) || products.length === 0) {
    logger.warn('No products provided for price creation')
    throw new Lambdur.Error(
      Errors.payment.stripe.price.noRequiredParameters(
        JSON.stringify({ products, currencyISOCode, country, orderDetails }),
      ),
    )
  }

  logger.info('Processing products for price creation', {
    productIds: products.map((p) => p.id),
  })

  const pricePromises = products.map(async (product) => {
    logger.info('Creating price for product', { productId: product.id })

    const productId = product.id
    const productName = product.metadata.originalProductName
    const productCategory = product.metadata
      .category as STRIPE_EULOGIZE_PRODUCT_CATEGORIES

    logger.info('Product details for price creation', {
      productId,
      productName,
      productCategory,
    })

    const unitAmount = getUnitAmountByProductAndCurrency({
      product,
      currencyISOCode,
      productCategory,
      country,
      orderDetails,
    })

    // Stripe receives the unit amount with `cent` unit
    const stripeUnitAmount = Math.round(
      Number(unitAmount) * STRIPE_CENT_MULTIPLIER,
    )

    logger.info('Calculated unit amounts', {
      productId,
      unitAmount,
      stripeUnitAmount,
    })

    const priceId = generatePriceId({
      productName,
      category: productCategory,
      unitAmount,
      currencyISOCode,
      orderDetails,
    })

    logger.info('Generated price ID', { productId, priceId })

    const createPriceParams: Stripe.PriceCreateParams = {
      product: productId,
      currency: currencyISOCode,
      unit_amount: stripeUnitAmount ?? 0,
      tax_behavior: DEFAULT_TAX_BEHAVIOR,
      metadata: { priceId, productName, productCategory },
    }

    const price = await retrieveOrCreatePrice({
      stripeClient,
      createPriceParams,
      product,
      priceId,
      stripeUnitAmount,
    })

    logger.info('Price created/retrieved successfully', {
      productId: product.id,
      priceId: price.id,
    })
    return price
  })

  const prices = await Promise.all(pricePromises)
  logger.info('All prices processed successfully', {
    totalPrices: prices.length,
    priceIds: prices.map((p) => p.id),
  })
  return prices
}

/**
 * Gets unit amount by product and currency
 */
const getUnitAmountByProductAndCurrency = ({
  product,
  currencyISOCode,
  productCategory,
  country,
  orderDetails,
}: GetUnitAmountByProductAndCurrency): number => {
  const productName = product.metadata.originalProductName

  if (!productName || !currencyISOCode || !productCategory || !country) {
    logger.error('Missing required parameters for unit amount calculation', {
      productName,
      currencyISOCode,
      productCategory,
      country,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.price.noRequiredParameters(
        JSON.stringify({
          productName,
          currencyISOCode,
          productCategory,
          country,
        }),
      ),
    )
  }

  logger.info('Calculating unit amount for product', {
    productName,
    productCategory,
    country,
  })

  // Package
  if (productCategory === STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PACKAGE) {
    const packageOption = getPackageOptionByProductDisplayName({
      productName,
    }) as EulogisePackageOptions | null

    if (!packageOption) {
      logger.error('No package option found for product name', {
        productName: product.metadata.name,
      })
      throw new Lambdur.Error(
        Errors.payment.stripe.price.noPackageFoundForPrice(
          JSON.stringify({
            packageOption,
            productName: product.metadata.name,
          }),
        ),
      )
    }

    const packageUnitAmount = CheckoutHelper.getPackagePriceByCountry({
      country,
      packageOption,
    })

    logger.info('Package unit amount calculated', {
      packageOption,
      country,
      packageUnitAmount,
    })

    return packageUnitAmount
  }

  if (productCategory === STRIPE_EULOGIZE_PRODUCT_CATEGORIES.KEEPSAKES) {
    const keepsakeName = getStripeEulogizekeepsakesProductByProductName({
      productName,
    })

    if (!keepsakeName) {
      logger.error('No keepsake product found for product name', {
        productName,
      })
      throw new Lambdur.Error(
        Errors.payment.stripe.price.noKeepsakesFoundForPrice(
          JSON.stringify({ keepsakeName }),
        ),
      )
    }

    let keepsakeUnitAmount = 0

    switch (productName) {
      case STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_LEATHER_VIDEO_TRIBUTE_BOOKS:
        keepsakeUnitAmount =
          CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
            isLeatherVideoTributeBookAdded: true,
            country,
          })
        break
      case STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_PHOTO_BOOKS:
        const photoBookCopiesAmount =
          orderDetails.keepsakesDetails.photoBook.metaData.copyAmount ?? 0
        const photoBookCopiesUnit =
          orderDetails.orderSummary.photoBookTributeFee / photoBookCopiesAmount
        keepsakeUnitAmount = photoBookCopiesUnit
        break
      default:
        throw new Lambdur.Error(
          Errors.payment.stripe.price.noKeepsakesFeeCaluclated(
            JSON.stringify({ keepsakeName }),
          ),
        )
    }

    logger.info('Keepsake unit amount calculated', {
      keepsakeName,
      country,
      keepsakeUnitAmount,
    })

    return keepsakeUnitAmount
  }

  // Printing
  if (productCategory === STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PRINTING) {
    const { printingProduct, printingProductDetails } =
      getPrintingProductDetailsByProductName({ productName, orderDetails })
    const paperType =
      printingProductDetails?.paperType as EulogizePrintingProductsPaperTypes
    const copiesAmount =
      printingProductDetails?.copiesAmount as keyof IPrintingPerUnitPriceByCopies
    const paperUnitPrice = getPrintingUnitAmountByProduct({
      printingProduct,
      paperType,
      country,
      copiesAmount,
    })

    logger.info('Printing unit amount calculated', {
      printingProduct,
      paperType,
      copiesAmount,
      country,
      paperUnitPrice,
    })

    return paperUnitPrice
  }

  // Shipping
  if (productCategory === STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING) {
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      logger.info('No shipping fee for country', { country })
      return 0
    }

    let shippingFee = 0
    let shippingMethod = null

    switch (productName) {
      case STRIPE_SHIPPING_PRODUCT_NAMES.KEEPSAKES_SHIPPING:
        shippingMethod =
          orderDetails?.keepsakesDetails.leatherVideoTributeBook.shippingMethod
        shippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
          country,
          shippingMethod,
          shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.VIDEO_BOOKS,
        })

        logger.info('Keepsakes shipping fee calculated', {
          productName,
          country,
          shippingMethod,
          shippingFee,
        })

        return shippingFee

      case STRIPE_SHIPPING_PRODUCT_NAMES.PHOTOBOOK_SHIPPING:
        shippingMethod = orderDetails?.keepsakesDetails.photoBook.shippingMethod
        shippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
          country,
          shippingMethod,
          shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PHOTO_BOOKS,
        })

        logger.info('Keepsakes shipping fee calculated', {
          productName,
          country,
          shippingMethod,
          shippingFee,
        })

        return shippingFee

      case STRIPE_SHIPPING_PRODUCT_NAMES.PRINTING_SHIPPING:
        shippingMethod = orderDetails?.printingDetails.printingShippingMethod
        shippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
          country,
          shippingMethod,
          shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
        })

        logger.info('Printing shipping fee calculated', {
          productName,
          country,
          shippingMethod,
          shippingFee,
        })

        return shippingFee

      default:
        logger.info('No shipping fee applicable', { productName, country })
        return 0
    }
  }

  logger.warn('Unknown product category for unit amount calculation', {
    productCategory,
  })
  return 0
}

export { retrieveOrCreatePrices }
