import {
  IGenericCardProductTypeAction,
  GenericCardProductTypeActionTypes,
  IGenericCardProductTypeState,
  IGenericCardProductTypeData,
} from '@eulogise/core'

const initialState: IGenericCardProductTypeState = {
  items: [],
  activeItem: null,
  filters: {},
  isFetching: false,
  isFetched: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
}

export const GenericCardProductTypeReducer = (
  state: IGenericCardProductTypeState = initialState,
  action: IGenericCardProductTypeAction,
): IGenericCardProductTypeState => {
  switch (action.type) {
    // FETCH LIST
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES_SUCCESS: {
      const items = action.payload?.genericCardProductTypes
      if (!items) {
        console.error(
          'GenericCardProductTypeState > Reducer > FETCH_GENERIC_CARD_PRODUCT_TYPES_SUCCESS: missing genericCardProductTypes data in the payload',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        isFetched: true,
        items,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES_FAILED: {
      return {
        ...state,
        isFetching: false,
        error:
          action.payload?.error || 'Failed to fetch generic card product types',
      }
    }

    // FETCH SINGLE
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_SUCCESS: {
      const genericCardProductType = action.payload?.genericCardProductType
      if (!genericCardProductType) {
        console.error(
          'GenericCardProductTypeState > Reducer > FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_SUCCESS: missing genericCardProductType data in the payload',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      // Update the genericCardProductType in the list if it exists
      const updatedList = state.items.some(
        (pt: IGenericCardProductTypeData) =>
          pt.id === genericCardProductType.id,
      )
        ? state.items.map((pt: IGenericCardProductTypeData) =>
            pt.id === genericCardProductType.id ? genericCardProductType : pt,
          )
        : state.items

      return {
        ...state,
        isFetching: false,
        items: updatedList,
        activeItem: genericCardProductType,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
        error:
          action.payload?.error || 'Failed to fetch generic card product type',
      }
    }

    // CREATE
    case GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE: {
      return {
        ...state,
        isCreating: true,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: {
      const newGenericCardProductType = action.payload?.genericCardProductType
      if (!newGenericCardProductType) {
        console.error(
          'GenericCardProductTypeState > Reducer > CREATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: missing genericCardProductType data in the payload',
        )
        return {
          ...state,
          isCreating: false,
        }
      }

      return {
        ...state,
        isCreating: false,
        items: [...state.items, newGenericCardProductType],
        activeItem: newGenericCardProductType,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE_FAILED: {
      return {
        ...state,
        isCreating: false,
        error:
          action.payload?.error || 'Failed to create generic card product type',
      }
    }

    // UPDATE
    case GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE: {
      return {
        ...state,
        isUpdating: true,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: {
      const updatedGenericCardProductType =
        action.payload?.genericCardProductType
      if (!updatedGenericCardProductType) {
        console.error(
          'GenericCardProductTypeState > Reducer > UPDATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: missing genericCardProductType data in the payload',
        )
        return {
          ...state,
          isUpdating: false,
        }
      }

      return {
        ...state,
        isUpdating: false,
        items: state.items.map((pt: IGenericCardProductTypeData) =>
          pt.id === updatedGenericCardProductType.id
            ? updatedGenericCardProductType
            : pt,
        ),
        activeItem:
          state.activeItem?.id === updatedGenericCardProductType.id
            ? updatedGenericCardProductType
            : state.activeItem,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE_FAILED: {
      return {
        ...state,
        isUpdating: false,
        error:
          action.payload?.error || 'Failed to update generic card product type',
      }
    }

    // DUPLICATE
    case GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE: {
      return {
        ...state,
        isCreating: true,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: {
      const duplicatedGenericCardProductType =
        action.payload?.genericCardProductType
      if (!duplicatedGenericCardProductType) {
        console.error(
          'GenericCardProductTypeState > Reducer > DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: missing genericCardProductType data in the payload',
        )
        return {
          ...state,
          isCreating: false,
        }
      }

      return {
        ...state,
        isCreating: false,
        items: [...state.items, duplicatedGenericCardProductType],
        activeItem: duplicatedGenericCardProductType,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_FAILED: {
      return {
        ...state,
        isCreating: false,
        error:
          action.payload?.error ||
          'Failed to duplicate generic card product type',
      }
    }

    // DELETE
    case GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE: {
      return {
        ...state,
        isDeleting: true,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: {
      const deletedId = action.payload?.genericCardProductTypeId
      if (!deletedId) {
        console.error(
          'GenericCardProductTypeState > Reducer > DELETE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS: missing genericCardProductTypeId in the payload',
        )
        return {
          ...state,
          isDeleting: false,
        }
      }

      return {
        ...state,
        isDeleting: false,
        items: state.items.filter(
          (pt: IGenericCardProductTypeData) => pt.id !== deletedId,
        ),
        activeItem:
          state.activeItem?.id === deletedId ? null : state.activeItem,
        error: null,
      }
    }
    case GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE_FAILED: {
      return {
        ...state,
        isDeleting: false,
        error:
          action.payload?.error || 'Failed to delete generic card product type',
      }
    }

    // UI STATE
    case GenericCardProductTypeActionTypes.SET_ACTIVE_GENERIC_CARD_PRODUCT_TYPE: {
      return {
        ...state,
        activeItem: action.payload?.genericCardProductType ?? null,
      }
    }

    case GenericCardProductTypeActionTypes.SET_GENERIC_CARD_PRODUCT_TYPE_FILTERS: {
      return {
        ...state,
        filters: action.payload?.filters || {},
      }
    }

    case GenericCardProductTypeActionTypes.CLEAR_GENERIC_CARD_PRODUCT_TYPE_STATE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export const GenericCardProductTypeInitialState = initialState
