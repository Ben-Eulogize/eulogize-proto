import {
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects'
import {
  CaseActionTypes,
  CaseStatus,
  DEFAULT_ISO_DATE_FORMAT,
  EulogiseEditorPaymentConfig,
  EulogiseResource,
  EulogiseUserRole,
  ICase,
  ICaseData,
} from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import { DateTimeHelper } from '@eulogise/helpers'
import {
  CreateCaseAction,
  CreateCaseAsClientAction,
  CreatePaymentAction,
  fetchCaseById,
  fetchCases,
  FetchCasesAction,
  FetchCasesByIdAction,
  resetCaseState,
  SetActiveCaseByIdAction,
  updateCaseById,
  UpdateCaseByIdAction,
  UpdateCaseEmailInviteByIdAction,
} from './actions'
import { Notification } from '@eulogise/client-components'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { resetAssetState } from '../AssetState/actions'
import { resetSlideshowState } from '../SlideshowState/actions'
import { resetAllCardProductStates } from '../CardProduct/actions'
import { createInvite } from '../InviteState/actions'

const formatISODateDisplayValue = (
  date?: string | number,
): string | undefined => {
  if (!date) {
    return undefined
  }
  return DateTimeHelper.formatDate(date, DEFAULT_ISO_DATE_FORMAT)
}

function* handleCreateCase(action: CreateCaseAction) {
  const {
    payload: {
      region,
      country,
      timeStartAndEnd,
      enabledProducts,
      clientId,
      callback,
      deceasedName,
      viaClientHandle,
      editorPaymentConfig,
    },
  } = action

  const { data } = yield RequestHelper.saveResourceRequest(
    EulogiseResource.CASE,
    {
      region,
      client: clientId,
      country,
      deceased: {
        fullName: deceasedName,
      },
      status:
        clientId &&
        editorPaymentConfig ===
          EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY
          ? CaseStatus.PAID
          : CaseStatus.UNPAID,
      enabledProducts,
      service: {
        timeStart: timeStartAndEnd,
        timeEnd: timeStartAndEnd,
      },
      viaClientHandle,
      editorPaymentConfig,
    } as ICaseData,
  )

  yield put({
    type: CaseActionTypes.SAVE_CASES_SUCCESS,
    payload: data,
  })
  if (callback) {
    yield callback()
  }
}

function* handleFetchCases(action: FetchCasesAction) {
  const { payload: { callback } = {} } = action
  try {
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.CASE,
    })
    yield put({
      type: CaseActionTypes.FETCH_CASES_SUCCESS,
      payload: data,
    })
  } catch (ex: any) {
    Notification.error(ex?.message!)
    yield put({
      type: CaseActionTypes.FETCH_CASES_FAILED,
      payload: ex,
    })
  }

  if (callback) {
    callback()
  }
}

function* handleCreatePayment(action: CreatePaymentAction) {
  const {
    payload: { paymentMethod, orderDetails, caseId, success, failed },
  } = action
  try {
    const { data } = yield RequestHelper.requestWithToken(
      EulogiseEndpoint.CREATE_PAYMENT,
      {
        method: 'POST',
        data: {
          options: {
            paymentMethod,
            case: caseId,
            orderDetails,
          },
        },
      },
    )
    const hasInvoiceGeneratedAndSent = data.hasInvoiceGeneratedAndSent

    yield put({
      type: CaseActionTypes.CREATE_PAYMENT_SUCCESS,
      payload: {
        caseId,
      },
    })
    Notification.success('Purchase success')
    if (hasInvoiceGeneratedAndSent) {
      Notification.success('Invoice sent')
    } else if (!hasInvoiceGeneratedAndSent) {
      Notification.error('Failed to send invoice')
    }
    if (success) {
      success()
    }
  } catch (ex: any) {
    yield put({
      type: CaseActionTypes.CREATE_PAYMENT_FAILED,
      payload: ex,
    })
    if (failed) {
      failed()
    }
  }
}

function* handleFetchCaseById(action: FetchCasesByIdAction) {
  const {
    payload: { caseId, success, isShareFlow, onComplete },
  } = action
  try {
    const { data } = isShareFlow
      ? yield RequestHelper.request(`/v2/shares/cases/${caseId}`, {})
      : yield RequestHelper.findResourceRequest({
          resource: EulogiseResource.CASE,
          caseId: undefined,
          additionalData: { id: caseId },
        })

    const { items: cases } = data
    const fetchedCase = cases?.[0]
    if (!fetchedCase) {
      throw new Error(`Case (${caseId}) not found`)
    }
    yield put({
      type: CaseActionTypes.FETCH_CASE_BY_ID_SUCCESS,
      payload: {
        isShareFlow,
        fetchedCase,
      },
    })
    if (success) {
      success(fetchedCase)
    }
  } catch (ex: any) {
    Notification.error(ex?.message!)
    yield put({
      type: CaseActionTypes.FETCH_CASE_BY_ID_FAILED,
      payload: ex,
    })
  }
  if (onComplete) {
    onComplete()
  }
}

function* handleSetActiveCaseByCaseId(action: SetActiveCaseByIdAction) {
  const {
    payload: { caseId, success },
  } = action

  yield put(resetCaseState())
  yield put(resetAssetState())
  yield put(resetSlideshowState())
  yield put(resetAllCardProductStates())
  yield put(
    fetchCaseById({
      caseId,
      success: () => {
        // TODO:REDUX
        put({
          type: CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID_SUCCESS,
          payload: {
            caseId,
          },
        })
        success()
      },
    }),
  )
}

function* handleUpdateCaseEmailInviteById(
  action: UpdateCaseEmailInviteByIdAction,
) {
  const {
    payload: { caseId, success, existingCaseData },
  } = action
  const deceasedFullName: string = existingCaseData?.deceased?.fullName
  yield put(
    updateCaseById({
      caseId,
      caseFields: {
        inviteEmail: {
          image: {
            filepath: 'assets/email-invite-images/peaceful-shores.jpg',
            url: 'https://staging.media.eulogisememorials.com/assets/email-invite-images/peaceful-shores.jpg',
            default: true,
          },
          greeting: 'Hi',
          content: `<p>As you know, <strong>${deceasedFullName}</strong> passed away and will be sorely missed by us all.<br>\n</p>\n<p>They had an incredible life where he gave so much, and we would like their memorial to be a celebration of their life, rather than a focus on our loss.<br>\n</p>\n<p>I am preparing a Visual Tribute for the memorial service and need as many pictures of <strong>${deceasedFullName}</strong> as possible.If you have printed or digital pictures you would like to share, I’d love to include some. Please contribute your pictures using the link below, where you can also share any thoughts, memories or other words about <strong>${deceasedFullName}</strong>, that may help with the eulogy.<br>\n</p>\n<p>Please also join us to say goodbye to <strong>${deceasedFullName}</strong> at the memorial service for family and friends. The details for this are below.<br>\n</p>\n<p>Best Regards</p>`,
        },
      },
      success,
    }),
  )
}

function* handleUpdateCaseById(action: UpdateCaseByIdAction) {
  const {
    payload: { caseId, success, caseFields, isShowNotification },
  } = action
  const { items: cases } = yield select((state) => state.cases)
  try {
    if (!cases) {
      throw new Error('state.cases.items is not available')
    }
    const existingCaseData = cases.find((c: ICase) => c.id === caseId)
    if (!existingCaseData) {
      throw new Error(`case id (${caseId}) not find in state`)
    }
    const {
      deceasedFullName,
      inviteEmail,
      dateOfBirth,
      dateOfDeath,
      hasSkippedOrFilledMemorialDataPullForm = false,
      dateOfService,
      location,
      serviceStartTime,
      primaryImage,
      hasAccessedDownloadPage,
      customisedImagesOrderIds,
      enabledProducts,
    } = caseFields

    const customerId =
      existingCaseData?.customer?.id ?? existingCaseData?.customer

    const dateOfBirthDisplay =
      formatISODateDisplayValue(dateOfBirth) ||
      existingCaseData?.deceased?.dateOfBirthDisplay
    const dateOfDeathDisplay =
      formatISODateDisplayValue(dateOfDeath) ||
      existingCaseData?.deceased?.dateOfDeathDisplay
    const timeStartDisplay =
      formatISODateDisplayValue(dateOfService) ||
      existingCaseData?.service?.timeStartDisplay

    const {
      data: { item: updatedCase },
    } = yield RequestHelper.saveResourceRequest(EulogiseResource.CASE, {
      id: caseId,
      enabledProducts: enabledProducts ?? existingCaseData?.enabledProducts,
      customer: customerId,
      deceased: {
        ...existingCaseData.deceased,
        fullName: deceasedFullName || existingCaseData?.deceased?.fullName,
        dateOfBirthDisplay,
        dateOfDeathDisplay,
        hasSkippedOrFilledMemorialDataPullForm:
          hasSkippedOrFilledMemorialDataPullForm ||
          existingCaseData?.deceased?.hasSkippedOrFilledMemorialDataPullForm,
        primaryImage: primaryImage || existingCaseData?.deceased?.primaryImage,
      },
      inviteEmail: inviteEmail || existingCaseData?.inviteEmail,
      service: {
        ...existingCaseData.service,
        timeStartDisplay,
        location: location || existingCaseData?.service?.location,
        serviceStartTime:
          serviceStartTime || existingCaseData?.service.serviceStartTime,
      },
      hasAccessedDownloadPage:
        hasAccessedDownloadPage || existingCaseData?.hasAccessedDownloadPage,
      customisedImagesOrderIds:
        customisedImagesOrderIds || existingCaseData?.customisedImagesOrderIds,
    })

    yield put({
      type: CaseActionTypes.UPDATE_CASE_BY_ID_SUCCESS,
      payload: {
        updatedCase,
      },
    })
    // has to refetch case instead of just updating the store since the response payload
    // does not have the customer info
    yield put(
      fetchCaseById({
        caseId,
      }),
    )
    if (success) {
      success()
    } else {
      if (isShowNotification) {
        Notification.success('Case has been updated')
      }
    }
  } catch (ex) {
    console.log(ex)
    if (isShowNotification) {
      Notification.error('Failed to update the case')
    }
    yield put({
      type: CaseActionTypes.UPDATE_CASE_BY_ID_FAILED,
    })
  }
}

function* handleCreateCaseAsClient(action: CreateCaseAsClientAction) {
  const {
    payload: {
      caseData,
      role,
      email,
      fullName,
      isShouldSendEmail,
      editorPaymentConfig,
      success,
    },
  } = action
  try {
    const hasEmail = !!email
    const casePaymentStatus =
      role === EulogiseUserRole.EDITOR &&
      editorPaymentConfig === EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
        ? CaseStatus.UNPAID
        : CaseStatus.PAID
    const {
      data: { item: createdCase },
    }: { data: { item: ICase } } = yield RequestHelper.saveResourceRequest(
      EulogiseResource.CASE,
      { ...caseData, status: casePaymentStatus, editorPaymentConfig },
    )
    yield put({
      type: CaseActionTypes.CREATE_CASE_AS_CLIENT_SUCCESS,
      payload: { createdCase },
    })
    yield put(fetchCases({}))

    if (hasEmail) {
      yield put(
        createInvite({
          inviteData: {
            role:
              role === EulogiseUserRole.CUSTOMER
                ? EulogiseUserRole.CONTRIBUTOR
                : role,
            client: createdCase.client,
            case: createdCase.id,
            fullName,
            email,
          },
          isShouldSendEmail,
        }),
      )
    }
    Notification.success(`Case has been created`)
    if (success) {
      success()
    }
  } catch (ex: any) {
    Notification.error(ex.message)
    yield put({
      type: CaseActionTypes.CREATE_CASE_AS_CLIENT_FAILED,
      payload: ex,
    })
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(CaseActionTypes.CREATE_CASE, handleCreateCase)
  yield takeEvery(CaseActionTypes.FETCH_CASES, handleFetchCases)
  yield takeLeading(CaseActionTypes.CREATE_PAYMENT, handleCreatePayment)
  yield takeEvery(CaseActionTypes.FETCH_CASE_BY_ID, handleFetchCaseById)
  yield takeEvery(
    CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID,
    handleSetActiveCaseByCaseId,
  )
  yield takeEvery(
    CaseActionTypes.UPDATE_CASE_EMAIL_INVITE_BY_ID,
    handleUpdateCaseEmailInviteById,
  )
  yield takeLatest(CaseActionTypes.UPDATE_CASE_BY_ID, handleUpdateCaseById)
  yield takeEvery(
    CaseActionTypes.CREATE_CASE_AS_CLIENT,
    handleCreateCaseAsClient,
  )
}

export const CaseSagas = [watchers()]
