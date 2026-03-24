import { Lambdur } from 'lambdur'
import * as Errors from '../../error'
import Stripe from 'stripe'
import {
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  EulogiseCountry,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePhotoBookCheckoutOptions,
  IOrderDetails,
} from '@eulogise/core'
import {
  STRIPE_EULOGIZE_PACKAGES_PRODUCTS,
  STRIPE_EULOGIZE_PRINTING_PRODUCTS_NAMES,
  STRIPE_EULOGIZE_PRODUCT_CATEGORIES,
  STRIPE_KEEPSAKES_PRODUCT_NAMES,
  STRIPE_SHIPPING_PRODUCT_NAMES,
} from '../../../types/stripe'
import { CheckoutHelper } from '@eulogise/helpers'

// Types and interfaces
interface CreateStripeProductArgs {
  stripeClient: Stripe
  params: Stripe.ProductCreateParams
}

interface RetrieveStripeProductArgs {
  stripeClient: Stripe
  productId: string
}

interface CreateStripeProductsByOrderDetailsArgs {
  stripeClient: Stripe
  orderDetails: IOrderDetails
  country: EulogiseCountry
}

interface RetrieveOrCreateProductArgs {
  stripeClient: Stripe
  productId: string
  createProductParams: Stripe.ProductCreateParams
}

interface CreateNamedProductArgs {
  name: string
  category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES
}

type PrintingProductKey = keyof typeof STRIPE_EULOGIZE_PRINTING_PRODUCTS_NAMES

// Constants
const PRODUCT_ID_PREFIX = 'prod_'

// Logger
const logger = console // Replace with proper logger in production

/**
 * Generates a unique product ID based on name and currency
 */
const generateProductId = ({
  name,
  currencyISOCode,
}: {
  name: string
  currencyISOCode: string
}): string => {
  if (!name || !currencyISOCode) {
    return ''
  }
  return `${PRODUCT_ID_PREFIX}${name}_${currencyISOCode}`
}

/**
 * Validates Stripe client and required parameters
 */
const validateStripeClient = (stripeClient: Stripe, errorFn: string): void => {
  if (!stripeClient) {
    throw new Lambdur.Error(Errors.payment.create.noStripeClient({ errorFn }))
  }
}

/**
 * Creates a Stripe product
 */
const createStripeProduct = async ({
  stripeClient,
  params,
}: CreateStripeProductArgs): Promise<Stripe.Response<Stripe.Product>> => {
  validateStripeClient(stripeClient, 'createStripeProduct')

  const { name, id } = params

  if (!name) {
    throw new Lambdur.Error(
      Errors.payment.stripe.product.noProductName(JSON.stringify({ name })),
    )
  }

  if (!id) {
    throw new Lambdur.Error(
      Errors.payment.stripe.product.noProductId(JSON.stringify({ name })),
    )
  }

  try {
    logger.info('Creating Stripe product', { name, id })
    const product = await stripeClient.products.create(params)
    logger.info('Stripe product created successfully', {
      productId: product.id,
    })
    return product
  } catch (error) {
    logger.error('Failed to create Stripe product', { error, name, id })
    throw new Lambdur.Error(
      Errors.payment.stripe.product.createProductFailed(error),
    )
  }
}

/**
 * Retrieves a Stripe product by ID
 */
const retrieveStripeProduct = async ({
  stripeClient,
  productId,
}: RetrieveStripeProductArgs): Promise<Stripe.Response<Stripe.Product> | null> => {
  validateStripeClient(stripeClient, 'retrieveStripeProduct')

  if (!productId) {
    throw new Lambdur.Error(
      Errors.payment.stripe.product.noProductId(JSON.stringify({ productId })),
    )
  }

  try {
    logger.info('Retrieving Stripe product', { productId })
    const product = await stripeClient.products.retrieve(productId)
    logger.info('Stripe product retrieved successfully', { productId })
    return product
  } catch (error: any) {
    if (error?.code === 'resource_missing') {
      logger.info('Stripe product not found', { productId })
      return null
    }
    logger.error('Failed to retrieve Stripe product', { error, productId })
    throw new Lambdur.Error(
      Errors.payment.stripe.product.retrieveProductFailed(error),
    )
  }
}

/**
 * Retrieves or creates a Stripe product
 */
export const retrieveOrCreateProduct = async ({
  stripeClient,
  productId,
  createProductParams,
}: RetrieveOrCreateProductArgs): Promise<Stripe.Response<Stripe.Product>> => {
  if (!productId || !createProductParams) {
    throw new Lambdur.Error(
      Errors.payment.stripe.product.retrieveOrCreateProductFailed(
        JSON.stringify({
          error: 'missing required parameters',
          params: { productId, createProductParams },
        }),
      ),
    )
  }

  logger.info('Retrieving or creating Stripe product', { productId })

  const product = await retrieveStripeProduct({ stripeClient, productId })

  if (product) {
    logger.info('Using existing Stripe product', { productId })
    return product
  }

  logger.info('Creating new Stripe product', { productId })
  return await createStripeProduct({
    stripeClient,
    params: createProductParams,
  })
}

/**
 * Creates a named product with proper formatting and metadata
 */
const createNamedProduct = async ({
  stripeClient,
  name,
  category,
  currency,
}: CreateNamedProductArgs & {
  stripeClient: Stripe
  currency: string
}): Promise<Stripe.Response<Stripe.Product>> => {
  const formattedProductName = name.toLowerCase().replace(/[\s\-]+/g, '_')
  const id = generateProductId({
    name: formattedProductName,
    currencyISOCode: currency,
  })

  const metadata = {
    productName: formattedProductName,
    originalProductName: name,
    currencyISOCode: currency,
    category,
  }

  return retrieveOrCreateProduct({
    stripeClient,
    productId: id,
    createProductParams: { id, name, metadata },
  })
}

/**
 * Creates package products based on order details
 */
const createPackageProducts = async ({
  stripeClient,
  orderDetails,
  country,
  currency,
}: {
  stripeClient: Stripe
  orderDetails: IOrderDetails
  country: EulogiseCountry
  currency: string
}): Promise<Stripe.Response<Stripe.Product>[]> => {
  const { packageOption } = orderDetails
  const products: Stripe.Response<Stripe.Product>[] = []

  const packageDisplayName =
    STRIPE_EULOGIZE_PACKAGES_PRODUCTS?.[packageOption]?.displayName
  if (packageDisplayName) {
    const packageProduct = await createNamedProduct({
      stripeClient,
      name: packageDisplayName,
      category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PACKAGE,
      currency,
    })

    const packageUnitAmount = CheckoutHelper.getPackagePriceByCountry({
      country,
      packageOption,
    })

    if (packageUnitAmount > 0) {
      products.push(packageProduct)
    }
  }

  return products
}

/**
 * Creates keepsake products based on order details
 */
const createKeepsakeProducts = async ({
  stripeClient,
  orderDetails,
  currency,
}: {
  stripeClient: Stripe
  orderDetails: IOrderDetails
  currency: string
}): Promise<Stripe.Response<Stripe.Product>[]> => {
  // This KeepsakeProducts should not included PhotoBook
  const products: Stripe.Response<Stripe.Product>[] = []

  if (
    orderDetails.keepsakesDetails.leatherVideoTributeBook.option ===
    EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK
  ) {
    const [tributeProduct, shippingProduct] = await Promise.all([
      createNamedProduct({
        stripeClient,
        name: STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_LEATHER_VIDEO_TRIBUTE_BOOKS,
        category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.KEEPSAKES,
        currency,
      }),
      createNamedProduct({
        stripeClient,
        name: STRIPE_SHIPPING_PRODUCT_NAMES.KEEPSAKES_SHIPPING,
        category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING,
        currency,
      }),
    ])

    products.push(tributeProduct, shippingProduct)
  }

  return products
}

/**
 * Creates PhotoBook products based on order details
 */
const createPhotoBookProducts = async ({
  stripeClient,
  orderDetails,
  currency,
}: {
  stripeClient: Stripe
  orderDetails: IOrderDetails
  currency: string
}): Promise<Stripe.Response<Stripe.Product>[]> => {
  const products: Stripe.Response<Stripe.Product>[] = []

  if (
    orderDetails.keepsakesDetails.photoBook.option ===
    EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK
  ) {
    const [tributeProduct, shippingProduct] = await Promise.all([
      createNamedProduct({
        stripeClient,
        name: STRIPE_KEEPSAKES_PRODUCT_NAMES.KEEPSAKES_PHOTO_BOOKS,
        category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.KEEPSAKES,
        currency,
      }),
      createNamedProduct({
        stripeClient,
        name: STRIPE_SHIPPING_PRODUCT_NAMES.PHOTOBOOK_SHIPPING,
        category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING,
        currency,
      }),
    ])

    products.push(tributeProduct, shippingProduct)
  }

  return products
}

/**
 * Creates printing products based on order details
 */
const createPrintingProducts = async ({
  stripeClient,
  orderDetails,
  currency,
}: {
  stripeClient: Stripe
  orderDetails: IOrderDetails
  currency: string
}): Promise<Stripe.Response<Stripe.Product>[]> => {
  const products: Stripe.Response<Stripe.Product>[] = []

  if (
    orderDetails.printingDetails.printingMethod ===
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED
  ) {
    const printingProductsDetails =
      orderDetails.printingDetails.orderedProductsDetails

    const productPromises: Array<Promise<Stripe.Response<Stripe.Product>>> =
      Object.entries(printingProductsDetails)
        .filter(([, details]) => details.isProductOrderedForPrinting)
        .map(([key]) => {
          const productKey = key as PrintingProductKey
          const name = STRIPE_EULOGIZE_PRINTING_PRODUCTS_NAMES[productKey]
          return createNamedProduct({
            stripeClient,
            name,
            category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.PRINTING,
            currency,
          })
        })

    const printingProducts = await Promise.all(productPromises)

    const shippingProduct = await createNamedProduct({
      stripeClient,
      name: STRIPE_SHIPPING_PRODUCT_NAMES.PRINTING_SHIPPING,
      category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES.SHIPPING,
      currency,
    })

    products.push(...printingProducts, shippingProduct)
  }

  return products
}

/**
 * Creates Stripe products based on order details
 */
const createStripeProductsByOrderDetails = async ({
  stripeClient,
  orderDetails,
  country,
}: CreateStripeProductsByOrderDetailsArgs): Promise<
  Array<Stripe.Response<Stripe.Product>>
> => {
  if (!orderDetails) {
    logger.warn('No order details provided for product creation')
    return []
  }

  const { currency } = orderDetails
  logger.info('Creating Stripe products for order', { currency, country })

  try {
    const [
      packageProducts,
      keepsakeProducts,
      printingProducts,
      photoBookProducts,
    ] = await Promise.all([
      createPackageProducts({
        stripeClient,
        orderDetails,
        country,
        currency,
      }),
      createKeepsakeProducts({ stripeClient, orderDetails, currency }),
      createPrintingProducts({ stripeClient, orderDetails, currency }),
      createPhotoBookProducts({ stripeClient, orderDetails, currency }),
    ])

    const allProducts = [
      ...packageProducts,
      ...keepsakeProducts,
      ...printingProducts,
      ...photoBookProducts,
    ]

    logger.info('Stripe products created successfully', {
      totalProducts: allProducts.length,
      packageProducts: packageProducts.length,
      keepsakeProducts: keepsakeProducts.length,
      printingProducts: printingProducts.length,
    })

    return allProducts
  } catch (error) {
    logger.error('Failed to create Stripe products', { error, orderDetails })
    throw error
  }
}

export { createStripeProductsByOrderDetails }
