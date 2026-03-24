import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import {
  AdminActionTypes,
  CardProductActionTypes,
  EulogiseResource,
  ICardProductData,
  IEulogiseClient,
  IEulogiseUser,
  ModalActionTypes,
  ModalId,
} from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import {
  AdminCaseSearchAction,
  AssignFuneralDirectorAction,
  CreateOrUpdateClientAction,
  ExportCasesReportAction,
  FetchCaseSummaryByCaseIdAction,
  FetchClientByClientIdAction,
  FetchFuneralDirectorsByCaseIdAction,
  FetchUserByUserIdAction,
  FetchUsersByClientIdAction,
  ReeditProductAction,
  RemoveFuneralDirectorFromClientAction,
  UnlockProductByIdAction,
  UpdateAdminCaseByIdAction,
  UpdateClientByIdAction,
  UpdateProductByIdAction,
  UpdateUserRoleAction,
} from './actions'
import {
  CacheBusterHelper,
  CardProductHelper,
  CaseHelper,
  NavigationHelper,
} from '@eulogise/helpers'
import { Notification } from '@eulogise/client-components'
import { DownloadHelper } from '../../helpers/DownloadHelper'
import { EulogiseClientConfig, EulogiseEndpoint } from '@eulogise/client-core'

function* handleFetchCasesWithFullDetails() {
  try {
    const { data } = yield RequestHelper.requestWithToken(`/v2/admin/cases`, {
      method: 'GET',
      params: {
        mode: 'ALL',
      },
    })

    yield put({
      type: AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_SUCCESS,
      payload: {
        items: data.cases,
      },
    })
  } catch (ex) {
    console.log('Exception', ex)
    yield put({
      type: AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_FAILED,
    })
  }
}

function* handleFetchCasesWithFullDetailsAsAdmin() {
  try {
    const { data } = yield RequestHelper.originalRequest({
      method: 'GET',
      url: CacheBusterHelper.addCacheBusterToString(
        `${
          EulogiseClientConfig.AWS_S3_URL
        }/${CaseHelper.getCaseReportS3Path()}`,
      ),
    })

    yield put({
      type: AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN_SUCCESS,
      payload: {
        items: data,
      },
    })
  } catch (ex) {
    console.log('Exception', ex)
    yield put({
      type: AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN_FAILED,
    })
  }
}

function* handleFetchRecentCasesWithFullDetails() {
  try {
    const { data } = yield RequestHelper.requestWithToken(`/v2/admin/cases`, {
      method: 'GET',
      params: {
        mode: 'RECENT',
      },
    })

    yield put({
      type: AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS_SUCCESS,
      payload: {
        items: data.cases,
      },
    })
  } catch (ex) {
    console.log('Exception', ex)
    yield put({
      type: AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS_FAILED,
    })
  }
}

function* handleUpdateUserRole(action: UpdateUserRoleAction) {
  try {
    const {
      payload: { userId, role },
    } = action

    yield RequestHelper.requestWithToken(`/v2/users/${userId}/roles`, {
      method: 'PUT',
      data: {
        role,
      },
    })

    yield put({
      type: AdminActionTypes.UPDATE_USER_ROLE_SUCCESS,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.UPDATE_USER_ROLE_FAILED,
    })
  }
}

function* handleFetchUserByUserId(action: FetchUserByUserIdAction) {
  const {
    payload: { userId, success, onComplete },
  } = action
  try {
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/users/${userId}`,
      {
        method: 'GET',
      },
    )

    const user = data.user
    yield put({
      type: AdminActionTypes.FETCH_USER_BY_USER_ID_SUCCESS,
      payload: {
        user,
      },
    })
    success(user)
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_USER_BY_USER_ID_FAILED,
    })
  }
  onComplete()
}

function* handleFetchInvoicesOngoing() {
  try {
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.INVOICE,
    })

    yield put({
      type: AdminActionTypes.FETCH_INVOICES_SUCCESS,
      payload: data,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_INVOICES_FAILED,
    })
  }
}

function* handleFetchUsersOngoing() {
  try {
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.USER,
    })
    yield put({
      type: AdminActionTypes.FETCH_USERS_SUCCESS,
      payload: data,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_USERS_FAILED,
    })
  }
}

function* handleFetchClientByClientIdOngoing(
  action: FetchClientByClientIdAction,
) {
  try {
    const {
      payload: { clientId, onSuccess },
    } = action

    const {
      data: { client },
    }: { data: { client: IEulogiseClient } } =
      yield RequestHelper.requestWithToken(`/v2/admin/clients/${clientId}`)

    if (onSuccess) {
      onSuccess(client)
    }
    yield put({
      type: AdminActionTypes.FETCH_CLIENT_BY_CLIENT_ID_SUCCESS,
      payload: {
        clientData: client,
      },
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_CLIENT_BY_CLIENT_ID_FAILED,
    })
  }
}

function* handleFetchUsersByClientId(action: FetchUsersByClientIdAction) {
  try {
    const {
      payload: { clientId, onSuccess },
    } = action
    const {
      data: { users },
    }: { data: { users: Array<IEulogiseUser> } } =
      yield RequestHelper.requestWithToken(
        `/v2/admin/clients/${clientId}/users`,
      )

    if (onSuccess) {
      onSuccess(users)
    }
    yield put({
      type: AdminActionTypes.FETCH_USERS_BY_CLIENT_ID_SUCCESS,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_USERS_BY_CLIENT_ID_FAILED,
    })
  }
}

function* handleRemoveFuneralDirectorFromClient(
  action: RemoveFuneralDirectorFromClientAction,
) {
  try {
    const {
      payload: { clientId, userId, onSuccess },
    } = action
    yield RequestHelper.requestWithToken(
      `/v2/admin/clients/${clientId}/users/${userId}`,
      {
        method: 'DELETE',
      },
    )

    if (onSuccess) {
      onSuccess()
    }
    yield put({
      type: AdminActionTypes.REMOVE_FUNERAL_DIRECTORY_FROM_CLIENT_SUCCESS,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.REMOVE_FUNERAL_DIRECTORY_FROM_CLIENT_FAILED,
    })
  }
}

function* handleUpdateClientById(action: UpdateClientByIdAction) {
  try {
    const {
      payload: { clientId, clientData, onSuccess },
    } = action
    yield RequestHelper.requestWithToken(`/v2/admin/clients/${clientId}`, {
      method: 'PUT',
      data: clientData,
    })

    if (onSuccess) {
      onSuccess()
    }

    yield put({
      type: AdminActionTypes.UPDATE_CLIENT_BY_CLIENT_ID_SUCCESS,
    })
  } catch (ex) {
    Notification.error('Failed to update client')
    yield put({
      type: AdminActionTypes.UPDATE_CLIENT_BY_CLIENT_ID_FAILED,
    })
  }
}

function* handleFetchClients() {
  try {
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.CLIENT,
    })
    yield put({
      type: AdminActionTypes.FETCH_CLIENTS_SUCCESS,
      payload: data,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_CLIENTS_FAILED,
    })
  }
}

function* handleAdminFetchCases() {
  try {
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.CASE,
    })
    yield put({
      type: AdminActionTypes.ADMIN_FETCH_CASES_SUCCESS,
      payload: data,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.ADMIN_FETCH_CASES_FAILED,
    })
  }
}

function* handleCreateOrUpdateClient(action: CreateOrUpdateClientAction) {
  try {
    const {
      payload: { requestBody },
    } = action
    // change here
    yield RequestHelper.saveResourceRequest(
      EulogiseResource.CLIENT,
      requestBody,
    )
    yield put({
      type: AdminActionTypes.CREATE_OR_UPDATE_CLIENT_SUCCESS,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.CREATE_OR_UPDATE_CLIENT_FAILED,
    })
  }
}

function* handleUpdateProductById(action: UpdateProductByIdAction) {
  try {
    const {
      payload: { caseId, product, productId, productData, onSuccess },
    } = action

    const { data: cardProduct } = yield RequestHelper.requestWithToken(
      EulogiseEndpoint.UPDATE_PRODUCT_BY_ID.replace(
        /\{productId\}/,
        productId,
      ).replace(/\{product\}/, product),
      {
        method: 'PUT',
        data: { data: productData },
      },
    )
    if (onSuccess) {
      yield call(onSuccess, cardProduct)
    }
    yield put({
      type: AdminActionTypes.UPDATE_PRODUCT_BY_ID_SUCCESS,
      payload: {
        caseId,
        product,
        productId,
        productData,
      },
    })
  } catch (ex) {
    Notification.error('Failed to update product')
    yield put({
      type: AdminActionTypes.UPDATE_PRODUCT_BY_ID_FAILED,
    })
  }
}

function* handleUnlockProductById(action: UnlockProductByIdAction) {
  try {
    const {
      payload: { product, productId, slug, onSuccess },
    } = action

    const { data: cardProduct } = yield RequestHelper.requestWithToken(
      EulogiseEndpoint.UNLOCK_PRODUCT_BY_ID.replace(
        /\{productId\}/,
        productId,
      ).replace(/\{product\}/, product),
      {
        method: 'POST',
        data: {
          slug,
        },
      },
    )
    if (onSuccess) {
      yield call(onSuccess, cardProduct)
    }
    yield put({
      type: AdminActionTypes.UNLOCK_PRODUCT_BY_ID_SUCCESS,
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.UNLOCK_PRODUCT_BY_ID_FAILED,
    })
  }
}

function* handleReeditProduct(action: ReeditProductAction) {
  try {
    const {
      payload: { product, productId, slug, region },
    } = action
    yield put({
      type: AdminActionTypes.UNLOCK_PRODUCT_BY_ID,
      payload: {
        product,
        productId,
        slug,
        onSuccess: function* (cardProduct: ICardProductData) {
          yield put({
            type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID,
            payload: {
              product,
              caseId: cardProduct.case!,
              region,
            },
          })
        },
      },
    })
    const page = CardProductHelper.getEditPageByProduct({ product })
    const key = CardProductHelper.getProductIdKey({ product })
    yield put({
      type: ModalActionTypes.HIDE_MODAL,
      payload: {
        id: ModalId.CARD_PRODUCT_PREVIEW,
      },
    })
    yield put({
      type: AdminActionTypes.REEDIT_PRODUCT_SUCCESS,
    })
    if (page && key) {
      NavigationHelper.navigateToProduct({
        product,
        id: productId,
        slug: slug,
      })
    }
  } catch (ex) {
    yield put({
      type: AdminActionTypes.REEDIT_PRODUCT_FAILED,
    })
  }
}

function* handleUpdateAdminCaseById(action: UpdateAdminCaseByIdAction) {
  try {
    const {
      payload: { caseId, caseData },
    } = action

    const {
      data: { case: updatedCase },
    } = yield RequestHelper.requestWithToken(`/v2/admin/cases/${caseId}`, {
      method: 'PUT',
      data: caseData,
    })
    Notification.success('Case has been updated')
    yield put({
      type: AdminActionTypes.UPDATE_ADMIN_CASE_BY_ID_SUCCESS,
      payload: {
        updatedCase,
      },
    })
  } catch (ex) {
    Notification.error('Update Case Failed')
    yield put({
      type: AdminActionTypes.UPDATE_ADMIN_CASE_BY_ID_FAILED,
    })
  }
}

function* handleFuneralDirectorsByCaseId(
  action: FetchFuneralDirectorsByCaseIdAction,
) {
  const {
    payload: { caseId, success, onComplete },
  } = action

  try {
    const {
      data: { funeralDirectors },
    } = yield RequestHelper.requestWithToken(
      `/v2/cases/${caseId}/funeralDirectors`,
      {
        method: 'GET',
      },
    )
    yield put({
      type: AdminActionTypes.FETCH_FUNERAL_DIRECTORS_BY_CASE_ID_SUCCESS,
      payload: {
        funeralDirectors,
      },
    })
    success(funeralDirectors)
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_FUNERAL_DIRECTORS_BY_CASE_ID_FAILED,
    })
  }
  onComplete()
}

function* handleAssignFuneralDirectors(action: AssignFuneralDirectorAction) {
  try {
    const {
      payload: { caseId, arrangerId, arrangerName },
    } = action
    yield RequestHelper.requestWithToken(
      `/v2/cases/${caseId}/funeralDirectors/assign`,
      {
        method: 'PUT',
        data: {
          funeralDirector: arrangerId,
        },
      },
    )
    yield put({
      type: AdminActionTypes.ASSIGN_FUNERAL_DIRECTOR_SUCCESS,
      payload: { caseId, arrangerId, arrangerName },
    })
  } catch (ex: any) {
    Notification.error(ex?.message!)
    yield put({
      type: AdminActionTypes.ASSIGN_FUNERAL_DIRECTOR_FAILED,
      payload: ex,
    })
  }
}

function* handleFetchCaseSummaryByCaseId(
  action: FetchCaseSummaryByCaseIdAction,
) {
  const {
    payload: { caseId, onSuccess, onComplete },
  } = action

  try {
    const { data }: { data: { noOfInvites: number; noOfImages: number } } =
      yield RequestHelper.requestWithToken(
        `/v2/admin/cases/${caseId}/summary`,
        {
          method: 'GET',
          params: {
            caseId,
          },
        },
      )

    if (onSuccess) {
      onSuccess(data)
    }

    yield put({
      type: AdminActionTypes.FETCH_CASE_SUMMARY_BY_CASE_ID_SUCCESS,
      payload: {
        ...data,
        caseId,
      },
    })
  } catch (ex) {
    yield put({
      type: AdminActionTypes.FETCH_CASE_SUMMARY_BY_CASE_ID_FAILED,
    })
  }
  onComplete()
}

function* handleExportCasesReport(action: ExportCasesReportAction) {
  const {
    payload: { onComplete },
  } = action
  try {
    const url = `${EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN}/reports/report.csv`
    yield DownloadHelper.downloadFileWithAvailable({
      fileUrl: url,
      fileName: `report.csv`,
    })
  } catch (ex) {
    Notification.error('Export cases report failed')
  }
  onComplete()
}

function* handleAdminSearchCases(action: AdminCaseSearchAction) {
  console.log('handleAdminSearchCases', action)
  const {
    payload: { query, onSuccess, onFailed },
  } = action
  try {
    const {
      data: { cases },
    } = yield RequestHelper.requestWithToken(`/v2/admin/cases/search`, {
      method: 'POST',
      data: {
        query,
      },
    })
    console.log('resp data', cases)
    if (onSuccess) {
      onSuccess(cases)
    }
    yield put({
      type: AdminActionTypes.ADMIN_CASE_SEARCH_SUCCESS,
      payload: {
        cases,
      },
    })
  } catch (ex) {
    Notification.error(`Admin Search Failed: ${ex}`)
    if (onFailed) {
      onFailed()
    }
    yield put({
      type: AdminActionTypes.ADMIN_CASE_SEARCH_FAILED,
    })
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(
    AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN,
    handleFetchCasesWithFullDetailsAsAdmin,
  )
  yield takeEvery(
    AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS,
    handleFetchCasesWithFullDetails,
  )
  yield takeEvery(
    AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS,
    handleFetchRecentCasesWithFullDetails,
  )
  yield takeEvery<UpdateUserRoleAction>(
    AdminActionTypes.UPDATE_USER_ROLE,
    handleUpdateUserRole,
  )
  yield takeEvery<FetchUserByUserIdAction>(
    AdminActionTypes.FETCH_USER_BY_USER_ID,
    handleFetchUserByUserId,
  )
  yield takeEvery(
    AdminActionTypes.FETCH_INVOICES_ONGOING,
    handleFetchInvoicesOngoing,
  )
  yield takeEvery(AdminActionTypes.FETCH_USERS_ONGOING, handleFetchUsersOngoing)
  yield takeEvery<FetchClientByClientIdAction>(
    AdminActionTypes.FETCH_CLIENT_BY_CLIENT_ID_ONGOING,
    handleFetchClientByClientIdOngoing,
  )
  yield takeEvery<FetchUsersByClientIdAction>(
    AdminActionTypes.FETCH_USERS_BY_CLIENT_ID,
    handleFetchUsersByClientId,
  )
  yield takeEvery<RemoveFuneralDirectorFromClientAction>(
    AdminActionTypes.REMOVE_FUNERAL_DIRECTORY_FROM_CLIENT,
    handleRemoveFuneralDirectorFromClient,
  )
  yield takeEvery<UpdateClientByIdAction>(
    AdminActionTypes.UPDATE_CLIENT_BY_CLIENT_ID,
    handleUpdateClientById,
  )
  yield takeEvery(AdminActionTypes.FETCH_CLIENTS, handleFetchClients)
  yield takeEvery(AdminActionTypes.ADMIN_FETCH_CASES, handleAdminFetchCases)
  yield takeEvery(
    AdminActionTypes.CREATE_OR_UPDATE_CLIENT_ONGOING,
    handleCreateOrUpdateClient,
  )
  yield takeEvery(
    AdminActionTypes.UNLOCK_PRODUCT_BY_ID,
    handleUnlockProductById,
  )
  yield takeEvery(
    AdminActionTypes.UPDATE_PRODUCT_BY_ID,
    handleUpdateProductById,
  )
  yield takeEvery(AdminActionTypes.REEDIT_PRODUCT, handleReeditProduct)
  yield takeEvery(
    AdminActionTypes.UPDATE_ADMIN_CASE_BY_ID,
    handleUpdateAdminCaseById,
  )
  yield takeEvery(
    AdminActionTypes.FETCH_FUNERAL_DIRECTORS_BY_CASE_ID,
    handleFuneralDirectorsByCaseId,
  )
  yield takeEvery(
    AdminActionTypes.ASSIGN_FUNERAL_DIRECTOR,
    handleAssignFuneralDirectors,
  )
  yield takeEvery(
    AdminActionTypes.FETCH_CASE_SUMMARY_BY_CASE_ID,
    handleFetchCaseSummaryByCaseId,
  )
  yield takeEvery(AdminActionTypes.EXPORT_CASES_REPORT, handleExportCasesReport)
  yield takeLatest(AdminActionTypes.ADMIN_CASE_SEARCH, handleAdminSearchCases)
}

export const AdminSagas = [watchers()]
