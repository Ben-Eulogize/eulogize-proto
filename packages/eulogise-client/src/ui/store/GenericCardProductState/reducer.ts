import {
  IGenericCardProductsState,
  ICardProductAction,
  EulogiseProduct,
  CardProductActionTypes,
  ICardProductState,
  GenericCardProductTypeActionTypes,
  IGenericCardProductTypeData,
  ICardProductData,
  EulogiseResource,
  IGenericCardProductData,
} from '@eulogise/core'
import {
  baseCardProductInitialState,
  BaseCardProductReducer,
} from '../CardProduct/baseCardProductReducer'
import { EulogiseResourceHelper } from '../../helpers/EulogiseResourceHelper'

const initialState: IGenericCardProductsState = {
  productsState: {},
  isFetching: false,
  hasInitialised: false,
}

// Create a base reducer instance for GENERIC_CARD_PRODUCT
const baseReducer = BaseCardProductReducer(EulogiseProduct.GENERIC_CARD_PRODUCT)

const updateGenericProductStateBySlug = ({
  slug,
  action,
  state,
}: {
  slug: string
  action: ICardProductAction | { type: string; payload?: any }
  state: IGenericCardProductsState
}): IGenericCardProductsState => {
  // Most actions require a slug to identify which product state to update
  if (!slug) {
    return state
  }

  // Get current state for this slug, or create new initial state
  const currentProductState =
    state.productsState[slug] || baseCardProductInitialState

  // Delegate to BaseCardProductReducer
  const newProductState = baseReducer(currentProductState, {
    ...action,
    payload: {
      ...action.payload,
      items:
        action.payload.items?.filter(
          (i: IGenericCardProductData) => i?.content?.metadata?.slug,
        ) ?? [],
      slug,
    },
  } as ICardProductAction)

  // If state didn't change, return original state
  if (newProductState === currentProductState) {
    return state
  }

  // Update the productsState map with the new state for this slug
  return {
    ...state,
    productsState: {
      ...state.productsState,
      [slug]: newProductState,
    },
  }
}

export const GenericCardProductReducer = (
  state: IGenericCardProductsState = initialState,
  action: ICardProductAction | { type: string; payload?: any },
): IGenericCardProductsState => {
  switch (action.type) {
    case CardProductActionTypes.RESET_CARD_PRODUCT_STATE: {
      return initialState
    }
    case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID: {
      if (state.hasInitialised) {
        // handle from outside the switch-case
        break
      }
      return {
        ...state,
        isFetching: state.hasInitialised ? state.isFetching : true, // global isFetching state
      }
    }
    case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_SUCCESS: {
      const resources = action.payload?.resources

      // First, set isFetching to false for all existing product states
      const newProductsState: Record<string, ICardProductState> = {}
      for (const [slug, productState] of Object.entries(state.productsState)) {
        newProductsState[slug] = {
          ...productState,
          isFetching: false,
        }
      }

      if (!resources) {
        return {
          ...state,
          productsState: newProductsState,
          isFetching: false,
        }
      }

      const genericCardProducts: IGenericCardProductData[] =
        resources[EulogiseResource.GENERIC_CARD_PRODUCT] ?? []

      if (genericCardProducts.length === 0) {
        return {
          ...state,
          productsState: newProductsState,
          isFetching: false,
        }
      }

      // Group products by slug
      const productsBySlug = genericCardProducts.reduce((acc, cardProduct) => {
        const productSlug = cardProduct.content.metadata.slug
        if (productSlug) {
          if (!acc[productSlug]) {
            acc[productSlug] = []
          }
          acc[productSlug].push(cardProduct)
        }
        return acc
      }, {} as Record<string, ICardProductData[]>)

      // Update state for each slug with fetched products
      for (const [productSlug, products] of Object.entries(productsBySlug)) {
        const activeItem = EulogiseResourceHelper.getLatestItem(products)
        newProductsState[productSlug] = {
          ...baseCardProductInitialState,
          items: products,
          activeItem,
          isFetching: false,
        }
      }

      return {
        ...state,
        productsState: newProductsState,
        isFetching: false,
      }
    }
    case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_FAILED: {
      if (state.hasInitialised) {
        // handle from outside the switch-case
        break
      }
      return {
        ...state,
        isFetching: false, // global isFetching state
      }
    }
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES_SUCCESS: {
      // do not reinitialised if it has already
      if (state.hasInitialised) {
        return state
      }
      const genericCardProductTypes: IGenericCardProductTypeData[] =
        action.payload?.genericCardProductTypes ?? []

      if (genericCardProductTypes.length === 0) {
        return state
      }

      // Create initial state for each product type's slug (if not already exists)
      const newProductsState: Record<string, ICardProductState> = {
        ...state.productsState,
      }

      for (const productType of genericCardProductTypes) {
        if (productType.slug && !newProductsState[productType.slug]) {
          newProductsState[productType.slug] = {
            ...baseCardProductInitialState,
            isFetching: state.isFetching, // set is fetching from the global state
          }
        }
      }

      return {
        ...state,
        productsState: newProductsState,
        hasInitialised: true,
      }
    }
    case CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS: {
      const payload = action.payload
      const products = payload?.products ?? []
      const activeProductTheme = payload?.activeProductTheme ?? {}
      let newProductsState: IGenericCardProductsState = state
      for (const product of products) {
        const productMetadata = product.content.metadata
        // only for Generic product
        if (productMetadata) {
          const slug = productMetadata.slug
          newProductsState = updateGenericProductStateBySlug({
            slug,
            action,
            state: newProductsState,
          }) as IGenericCardProductsState
        }
      }
      return newProductsState
      /*
      const newState = updateGenericProductStateBySlug({
        slug:
        state,
        action,
      })
*/
    }
    /*case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_SUCCESS: {

    }
    case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID: {
      // Set isFetching for all existing product states
      const newProductsState: Record<string, ICardProductState> = {}
      for (const [slug, productState] of Object.entries(state.productsState)) {
        newProductsState[slug] = {
          ...productState,
          isFetching: true,
        }
      }
      return {
        ...state,
        productsState: newProductsState,
      }
    }
    case CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID_FAILED: {
      // Set isFetching to false for all existing product states
      const newProductsState: Record<string, ICardProductState> = {}
      for (const [slug, productState] of Object.entries(state.productsState)) {
        newProductsState[slug] = {
          ...productState,
          isFetching: false,
        }
      }
      return {
        ...state,
        productsState: newProductsState,
      }
    }*/
  }

  const productType = action.payload?.productType ?? action.payload?.product
  const slug =
    action.payload?.slug ?? action.payload?.productData?.content?.metadata?.slug

  // Only handle GENERIC_CARD_PRODUCT actions
  if (productType !== EulogiseProduct.GENERIC_CARD_PRODUCT) {
    return state
  }

  // Handle reset all
  /*
  if (
    action.type === CardProductActionTypes.RESET_CARD_PRODUCT_STATE &&
    !slug
  ) {
    return initialState
  }
*/

  return updateGenericProductStateBySlug({ slug, action, state })
}

export const GenericCardProductInitialState = initialState
