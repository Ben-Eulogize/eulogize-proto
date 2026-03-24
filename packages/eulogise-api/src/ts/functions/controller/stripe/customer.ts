import { Lambdur } from 'lambdur'
import Stripe from 'stripe'
import * as Errors from '../../error'
import { userModel } from '../../../database'

// Types and interfaces
interface RetrieveCustomerArgs {
  stripeClient: Stripe
  stripeCustomerId: string
}

interface SearchCustomerByEmailArgs {
  stripeClient: Stripe
  userEmail: string
}

interface RetrieveOrCreateCustomerArgs {
  stripeClient: Stripe
  stripeCustomerId: string | null | undefined
  userId: string
}

interface CreateStripeCustomerArgs {
  stripeClient: Stripe
  userId: string
  description?: string
}

// Constants
const CUSTOMER_SEARCH_QUERY_TEMPLATE = "email:'{email}'"

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
 * Validates required parameters for customer operations
 */
const validateCustomerParams = (
  params: Record<string, any>,
  operation: string,
): void => {
  const missingParams = Object.entries(params)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingParams.length > 0) {
    throw new Lambdur.Error(
      Errors.payment.stripe.customers.noRequiredParameters(
        JSON.stringify({
          origin: 'validateCustomerParams',
          missingParams,
          operation,
          providedParams: params,
        }),
      ),
    )
  }
}

/**
 * Retrieves a customer from Stripe by ID
 */
export const retrieveCustomer = async ({
  stripeClient,
  stripeCustomerId,
}: RetrieveCustomerArgs): Promise<
  Stripe.Customer | Stripe.DeletedCustomer | null
> => {
  validateStripeClient(stripeClient, 'retrieveCustomer')
  validateCustomerParams({ stripeCustomerId }, 'retrieveCustomer')

  try {
    logger.info('Retrieving Stripe customer', { stripeCustomerId })

    const customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> =
      await stripeClient.customers.retrieve(stripeCustomerId)

    logger.info('Stripe customer retrieved successfully', {
      customerId: customer.id,
      isDeleted: (customer as Stripe.DeletedCustomer).deleted || false,
    })

    return customer
  } catch (error: any) {
    if (error?.code === 'resource_missing') {
      logger.info('Stripe customer not found', { stripeCustomerId })
      return null
    }

    logger.error('Failed to retrieve Stripe customer', {
      error,
      stripeCustomerId,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.customers.retrieveCustomerFailed(error),
    )
  }
}

/**
 * Searches for a customer by email address
 */
export const searchCustomerByEmail = async ({
  stripeClient,
  userEmail,
}: SearchCustomerByEmailArgs): Promise<Stripe.Response<
  Stripe.ApiSearchResult<Stripe.Customer>
> | null> => {
  validateStripeClient(stripeClient, 'searchCustomerByEmail')
  validateCustomerParams({ userEmail }, 'searchCustomerByEmail')

  try {
    logger.info('Searching Stripe customer by email', { userEmail })

    const searchQuery = CUSTOMER_SEARCH_QUERY_TEMPLATE.replace(
      '{email}',
      userEmail,
    )
    const customer: Stripe.Response<Stripe.ApiSearchResult<Stripe.Customer>> =
      await stripeClient.customers.search({ query: searchQuery })

    const hasResults = customer.data && customer.data.length > 0
    logger.info('Stripe customer search completed', {
      userEmail,
      hasResults,
      resultCount: customer.data?.length || 0,
    })

    return customer
  } catch (error: any) {
    if (error?.code === 'resource_missing') {
      logger.info('No Stripe customer found for email', { userEmail })
      return null
    }

    logger.error('Failed to search Stripe customer by email', {
      error,
      userEmail,
    })
    throw new Lambdur.Error(
      Errors.payment.stripe.customers.searchCsutomerFailed(error),
    )
  }
}

/**
 * Retrieves or creates a customer
 */
export const retrieveOrCreateCustomer = async ({
  stripeClient,
  stripeCustomerId,
  userId,
}: RetrieveOrCreateCustomerArgs): Promise<Stripe.Customer> => {
  validateStripeClient(stripeClient, 'retrieveOrCreateCustomer')
  validateCustomerParams({ userId }, 'retrieveOrCreateCustomer')

  logger.info('Retrieving or creating Stripe customer', {
    stripeCustomerId: stripeCustomerId || 'none',
    userId,
  })

  let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null

  // Try to retrieve existing customer if ID is provided
  if (stripeCustomerId) {
    customer = await retrieveCustomer({ stripeClient, stripeCustomerId })
  }

  // If not found or was deleted, create new one
  if (!customer || (customer as Stripe.DeletedCustomer).deleted) {
    logger.info('Creating new Stripe customer', { userId })
    const created = await createStripeCustomer({
      stripeClient,
      userId,
    })
    return created
  }

  logger.info('Using existing Stripe customer', {
    customerId: customer.id,
    userId,
  })
  return customer as Stripe.Customer
}

/**
 * Creates a new Stripe customer
 */
export const createStripeCustomer = async ({
  stripeClient,
  userId,
  description,
}: CreateStripeCustomerArgs): Promise<Stripe.Response<Stripe.Customer>> => {
  validateStripeClient(stripeClient, 'createStripeCustomer')
  validateCustomerParams({ userId }, 'createStripeCustomer')

  logger.info('Creating new Stripe customer', { userId, description })

  try {
    // Fetch user data
    const userObj = await userModel.findById(userId)
    if (!userObj) {
      logger.error('User not found for customer creation', { userId })
      throw new Lambdur.Error(
        Errors.payment.stripe.customers.noCustomerEmailFound(
          JSON.stringify({ userId }),
        ),
      )
    }

    // Create customer parameters
    const customerParams: Stripe.CustomerCreateParams = {
      name: userObj.fullName,
      email: userObj.email,
    }

    if (description) {
      customerParams.description = description
    }

    // Create customer in Stripe
    const customer = await stripeClient.customers.create(customerParams)

    if (!customer.id) {
      logger.error('Stripe customer created but no ID returned', { userId })
      throw new Lambdur.Error(
        Errors.payment.stripe.customers.createCustomerFailed(
          JSON.stringify({
            customerId: customer.id,
          }),
        ),
      )
    }

    logger.info('Stripe customer created successfully', {
      customerId: customer.id,
      userId,
    })

    // Update user with Stripe customer ID
    await updateUserWithStripeCustomerId(userObj, customer.id)

    return customer
  } catch (error) {
    logger.error('Failed to create Stripe customer', { error, userId })
    throw new Lambdur.Error(
      Errors.payment.stripe.customers.createCustomerFailed(error),
    )
  }
}

/**
 * Updates user record with Stripe customer ID
 */
const updateUserWithStripeCustomerId = async (
  userObj: any,
  customerId: string,
): Promise<void> => {
  try {
    const saveQuery = {
      ...userObj,
      stripe: {
        ...userObj.stripe,
        metadata: {
          ...userObj.stripe?.metadata,
          customers: {
            ...userObj.stripe?.metadata?.customers,
            id: customerId,
          },
        },
      },
    }

    await userModel.update(saveQuery)
    logger.info('User updated with Stripe customer ID', {
      userId: userObj.id,
      customerId,
    })
  } catch (error) {
    logger.error('Failed to update user with Stripe customer ID', {
      error,
      userId: userObj.id,
      customerId,
    })
    // Don't throw here as the customer was created successfully
    // The user update failure shouldn't fail the entire operation
  }
}
