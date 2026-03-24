import { put, takeEvery } from 'redux-saga/effects'
import {
  CardProductActionTypes,
  EulogiseProduct,
  EulogiseResource,
  GenericCardProductActionTypes,
  IGenericCardProductData,
} from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import { Notification } from '@eulogise/client-components'
import {
  FetchAllGenericCardProductsByCaseIdAction,
  fetchAllGenericCardProductsByCaseIdFailed,
  fetchAllGenericCardProductsByCaseIdSuccess,
} from './actions'
import { ThemeHelper } from '@eulogise/helpers'
import { cardProductAction } from '../CardProduct/sagas'

/*
function* handleFetchAllGenericCardProductsByCaseId(
  action: FetchAllGenericCardProductsByCaseIdAction,
) {
  const { caseId, region, onSuccess, onComplete } = action.payload

  try {
    // Call the /admin/cases/:caseId/resources endpoint with genericCardProduct resource
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/admin/cases/${caseId}/resources`,
      {
        method: 'POST',
        data: {
          resources: [EulogiseResource.GENERIC_CARD_PRODUCT],
        },
      },
    )

    const products: IGenericCardProductData[] =
      data?.[EulogiseResource.GENERIC_CARD_PRODUCT] ?? []

    // Dispatch success action with all products
    yield put(fetchAllGenericCardProductsByCaseIdSuccess({ products }))

    // For each product, dispatch an action to update the individual product state by slug
    for (const product of products) {
      if (product.slug) {
        // Fetch theme for this product if it has one
        let activeProductTheme
        const activeThemeId = product.content?.theme
        if (activeThemeId) {
          try {
            const { data: themeData } =
              yield RequestHelper.fetchThemeById(activeThemeId)
            activeProductTheme = ThemeHelper.getProductThemeByProductType({
              theme: themeData.theme,
              product: EulogiseProduct.GENERIC_CARD_PRODUCT,
              region,
            })
          } catch (e) {
            console.warn(
              `Failed to fetch theme for generic card product ${product.id}`,
              e,
            )
          }
        }

        // Dispatch action to update the state for this slug
        yield put(
          cardProductAction({
            type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS,
            payload: {
              products: [product],
              activeProductTheme,
              slug: product.slug,
            },
            product: EulogiseProduct.GENERIC_CARD_PRODUCT,
          }),
        )
      }
    }

    if (onSuccess) {
      onSuccess(products)
    }
  } catch (error: any) {
    console.error('Failed to fetch generic card products by case ID:', error)
    Notification.error('Failed to fetch generic card products')
    yield put(fetchAllGenericCardProductsByCaseIdFailed(error?.message))
  }

  if (onComplete) {
    onComplete()
  }
}
*/

/* Watchers */
function* watchers() {
  /*yield takeEvery(
    GenericCardProductActionTypes.FETCH_GENERIC_CARD_PRODUCTS_BY_CASE_ID,
    handleFetchAllGenericCardProductsByCaseId,
  )*/
}

export const GenericCardProductSagas = [watchers()]
