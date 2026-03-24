import {
  EulogiseRegion,
  GenericCardProductActionTypes,
  IGenericCardProductData,
} from '@eulogise/core'

/*// Fetch all generic card products by case ID
type FetchAllGenericCardProductsByCaseIdPayload = {
  caseId: string
  region: EulogiseRegion
  onSuccess?: (products: IGenericCardProductData[]) => void
  onComplete?: () => void
}

export type FetchAllGenericCardProductsByCaseIdAction = {
  type: GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID
  payload: FetchAllGenericCardProductsByCaseIdPayload
}

export const fetchAllGenericCardProductsByCaseId = (
  payload: FetchAllGenericCardProductsByCaseIdPayload,
): FetchAllGenericCardProductsByCaseIdAction => ({
  type: GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID,
  payload,
})

// Success action with products grouped by slug
type FetchAllGenericCardProductsByCaseIdSuccessPayload = {
  products: IGenericCardProductData[]
}

export type FetchAllGenericCardProductsByCaseIdSuccessAction = {
  type: GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_SUCCESS
  payload: FetchAllGenericCardProductsByCaseIdSuccessPayload
}

export const fetchAllGenericCardProductsByCaseIdSuccess = (
  payload: FetchAllGenericCardProductsByCaseIdSuccessPayload,
): FetchAllGenericCardProductsByCaseIdSuccessAction => ({
  type: GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_SUCCESS,
  payload,
})

// Failed action
export type FetchAllGenericCardProductsByCaseIdFailedAction = {
  type: GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_FAILED
  payload?: { error: string }
}

export const fetchAllGenericCardProductsByCaseIdFailed = (
  error?: string,
): FetchAllGenericCardProductsByCaseIdFailedAction => ({
  type: GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID_FAILED,
  payload: error ? { error } : undefined,
})
*/
