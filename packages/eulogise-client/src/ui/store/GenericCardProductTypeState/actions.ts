import {
  GenericCardProductTypeActionTypes,
  IGenericCardProductTypeData,
  IGenericCardProductTypeCreateRequest,
  IGenericCardProductTypeUpdateRequest,
  IGenericCardProductTypeFilters,
} from '@eulogise/core'

// Fetch List Actions
export type FetchGenericCardProductTypesPayload = {
  filters?: IGenericCardProductTypeFilters
  onSuccess?: (genericCardProductTypes: IGenericCardProductTypeData[]) => void
  onFailed?: (error: string) => void
}

export type FetchGenericCardProductTypesAction = {
  type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES
  payload?: FetchGenericCardProductTypesPayload
}

export const fetchGenericCardProductTypes = (
  payload?: FetchGenericCardProductTypesPayload,
): FetchGenericCardProductTypesAction => ({
  type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES,
  payload,
})

// Fetch Single Actions
export type FetchGenericCardProductTypeByIdPayload = {
  genericCardProductTypeId: string
  onSuccess?: (genericCardProductType: IGenericCardProductTypeData) => void
  onFailed?: (error: string) => void
}

export type FetchGenericCardProductTypeByIdAction = {
  type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID
  payload: FetchGenericCardProductTypeByIdPayload
}

export const fetchGenericCardProductTypeById = (
  payload: FetchGenericCardProductTypeByIdPayload,
): FetchGenericCardProductTypeByIdAction => ({
  type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID,
  payload,
})

// Create Actions
export type CreateGenericCardProductTypePayload = {
  data: IGenericCardProductTypeCreateRequest
  onSuccess?: (genericCardProductType: IGenericCardProductTypeData) => void
  onFailed?: (error: string) => void
}

export type CreateGenericCardProductTypeAction = {
  type: GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE
  payload: CreateGenericCardProductTypePayload
}

export const createGenericCardProductType = (
  payload: CreateGenericCardProductTypePayload,
): CreateGenericCardProductTypeAction => ({
  type: GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE,
  payload,
})

// Update Actions
export type UpdateGenericCardProductTypePayload = {
  genericCardProductTypeId: string
  data: IGenericCardProductTypeUpdateRequest
  onSuccess?: (genericCardProductType: IGenericCardProductTypeData) => void
  onFailed?: (error: string) => void
}

export type UpdateGenericCardProductTypeAction = {
  type: GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE
  payload: UpdateGenericCardProductTypePayload
}

export const updateGenericCardProductType = (
  payload: UpdateGenericCardProductTypePayload,
): UpdateGenericCardProductTypeAction => ({
  type: GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE,
  payload,
})

// Duplicate Actions
export type DuplicateGenericCardProductTypePayload = {
  genericCardProductTypeId: string
  newName: string
  onSuccess?: (genericCardProductType: IGenericCardProductTypeData) => void
  onFailed?: (error: string) => void
}

export type DuplicateGenericCardProductTypeAction = {
  type: GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE
  payload: DuplicateGenericCardProductTypePayload
}

export const duplicateGenericCardProductType = (
  payload: DuplicateGenericCardProductTypePayload,
): DuplicateGenericCardProductTypeAction => ({
  type: GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE,
  payload,
})

// Delete Actions
export type DeleteGenericCardProductTypePayload = {
  genericCardProductTypeId: string
  onSuccess?: () => void
  onFailed?: (error: string) => void
}

export type DeleteGenericCardProductTypeAction = {
  type: GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE
  payload: DeleteGenericCardProductTypePayload
}

export const deleteGenericCardProductType = (
  payload: DeleteGenericCardProductTypePayload,
): DeleteGenericCardProductTypeAction => ({
  type: GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE,
  payload,
})

// UI State Actions
export type SetActiveGenericCardProductTypePayload = {
  genericCardProductType: IGenericCardProductTypeData | null
}

export type SetActiveGenericCardProductTypeAction = {
  type: GenericCardProductTypeActionTypes.SET_ACTIVE_GENERIC_CARD_PRODUCT_TYPE
  payload: SetActiveGenericCardProductTypePayload
}

export const setActiveGenericCardProductType = (
  payload: SetActiveGenericCardProductTypePayload,
): SetActiveGenericCardProductTypeAction => ({
  type: GenericCardProductTypeActionTypes.SET_ACTIVE_GENERIC_CARD_PRODUCT_TYPE,
  payload,
})

export type SetGenericCardProductTypeFiltersPayload = {
  filters: IGenericCardProductTypeFilters
}

export type SetGenericCardProductTypeFiltersAction = {
  type: GenericCardProductTypeActionTypes.SET_GENERIC_CARD_PRODUCT_TYPE_FILTERS
  payload: SetGenericCardProductTypeFiltersPayload
}

export const setGenericCardProductTypeFilters = (
  payload: SetGenericCardProductTypeFiltersPayload,
): SetGenericCardProductTypeFiltersAction => ({
  type: GenericCardProductTypeActionTypes.SET_GENERIC_CARD_PRODUCT_TYPE_FILTERS,
  payload,
})

export type ClearGenericCardProductTypeStateAction = {
  type: GenericCardProductTypeActionTypes.CLEAR_GENERIC_CARD_PRODUCT_TYPE_STATE
}

export const clearGenericCardProductTypeState =
  (): ClearGenericCardProductTypeStateAction => ({
    type: GenericCardProductTypeActionTypes.CLEAR_GENERIC_CARD_PRODUCT_TYPE_STATE,
  })

// Union type of all action types for type safety
export type GenericCardProductTypeAction =
  | FetchGenericCardProductTypesAction
  | FetchGenericCardProductTypeByIdAction
  | CreateGenericCardProductTypeAction
  | UpdateGenericCardProductTypeAction
  | DeleteGenericCardProductTypeAction
  | DuplicateGenericCardProductTypeAction
  | SetActiveGenericCardProductTypeAction
  | SetGenericCardProductTypeFiltersAction
  | ClearGenericCardProductTypeStateAction
