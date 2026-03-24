import { put, takeEvery } from 'redux-saga/effects'
import { jwtDecode } from 'jwt-decode'
import * as uuid from 'uuid'
import {
  AuthActionTypes,
  DEFAULT_ISO_DATE_FORMAT,
  EulogiseEditorPaymentConfig,
  EulogisePage,
  EulogiseUserRole,
  EulogiseUserType,
  ICaseDeceased,
  ICaseService,
  IEulogizeAuthTokenPayload,
} from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import { EulogiseEndpoint } from '@eulogise/client-core'
import {
  CreateNewCaseFromCreateCaseFormAction,
  ForgotPasswordAction,
  forgotPasswordSuccess,
  LoginAction,
  loginFailed,
  loginSuccess,
  LoginSuccessAction,
  LogoutAction,
  ResetPasswordAction,
  ResetStatePayloadAction,
  SignUpAction,
  SignUpCoEditorAction,
  signUpCustomerAsClient,
  SignUpCustomerAsClientAction,
  signUpFailed,
  signUpSuccess,
  SignUpSuccessAction,
  updateIsSigningUpStatus,
  UpdatePersonalDetailByIdAction,
  VerifyEmailAction,
} from './actions'
import { CaseHelper, DateTimeHelper, NavigationHelper } from '@eulogise/helpers'
import { fetchAllUsersWithAdmin } from '../AdminState/actions'
import {
  createCase,
  createCaseAsClient,
  fetchCases,
} from '../CaseState/actions'
import {
  FormHelper,
  ICreatCaseFormFields,
  Notification,
} from '@eulogise/client-components'

function* handleLogin(action: LoginAction) {
  const {
    payload: {
      redirectTo,
      callback,
      success,
      body: { type, token, password, email },
    },
  } = action

  try {
    const { data } = yield RequestHelper.request(
      EulogiseEndpoint.ACCOUNT_SIGN_IN,
      {
        method: 'POST',
        data: {
          email,
          password,
          type: type ?? EulogiseUserType.USER,
          token,
        },
      },
    )
    if (success) {
      success(data.account)
    }
    yield put(
      loginSuccess({
        account: data.account,
        webtoken: data.webtoken,
        isMagicLogin: !!token,
        redirectTo,
      }),
    )
  } catch (ex: any) {
    console.log('ex', ex)
    yield loginFailed(ex?.data)
  }
  if (callback) {
    callback()
  }
}

function* handleLoginSuccess(action: LoginSuccessAction) {
  const {
    payload: { webtoken, account, isMagicLogin, redirectTo, complete },
  } = action

  RequestHelper.webtoken = webtoken

  if (redirectTo) {
    console.log('loginSuccess redirectTo', redirectTo)
    NavigationHelper.navigate(redirectTo)
  } else {
    switch (account?.role) {
      case EulogiseUserRole.ADMIN:
        console.log('EulogiseUserRole.ADMIN login success')
        yield put(fetchAllUsersWithAdmin())
        NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
        break
      case EulogiseUserRole.CUSTOMER:
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR: // this is for user sign up from client handle (e.g. /home/:clientHandle)
        console.log(
          'EulogiseUserRole.CUSTOMER | EulogiseUserRole.EDITOR | EulogiseUserRole.COEDITOR login success',
        )
        yield put(fetchCases({}))
        NavigationHelper.navigate(EulogisePage.DASHBOARD)
        break
      case EulogiseUserRole.CLIENT: {
        NavigationHelper.navigate(EulogisePage.CLIENT_ADMIN_CASES)
        break
      }
    }
  }

  if (account?.role) {
    /*
    yield put({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload,
    })
*/
    if (account.role !== EulogiseUserRole.ADMIN) {
      yield put(fetchCases({}))
    }
  }
  if (complete) {
    complete()
  }
}

function* handleVerifyEmail(action: VerifyEmailAction) {
  const {
    payload: { token, onFailed, onSuccess },
  } = action

  try {
    const { data } = yield RequestHelper.request(
      EulogiseEndpoint.ACCOUNT_VERIFY_EMAIL,
      {
        method: 'POST',
        data: {
          token,
        },
      },
    )
    onSuccess()
    yield put({
      type: AuthActionTypes.VERIFY_EMAIL_SUCCESS,
    })
    const webtoken = data.webtoken
    const webtokenPayload = webtoken
      ? (jwtDecode(webtoken) as IEulogizeAuthTokenPayload)
      : null
    yield put(
      loginSuccess({
        account: data.account,
        webtoken: webtoken,
        isMagicLogin: !!token,
        isSigningUp: false,
        webtokenPayload,
      }),
    )
    return data
  } catch (ex) {
    onFailed()
    yield put({
      type: AuthActionTypes.VERIFY_EMAIL_FAILED,
      payload: { ex },
    })
    return {
      ref: '',
    }
  }
}

function* handleSignUpCoEditor(action: SignUpCoEditorAction) {
  const {
    payload: { complete, role, success, fullName, email },
  } = action
  try {
    yield RequestHelper.request(EulogiseEndpoint.ACCOUNT_SIGN_UP_CO_EDITOR, {
      method: 'POST',
      data: {
        email,
        fullName,
        role,
      },
    })
    yield put({
      type: AuthActionTypes.SIGN_UP_CO_EDITOR_SUCCESS,
    })
    if (success) {
      success()
    }
  } catch (ex) {
    yield put({
      type: AuthActionTypes.SIGN_UP_CO_EDITOR_FAILED,
    })
  }
  if (complete) {
    complete()
  }
}

const hasFilledAllFields = (fields: ICreatCaseFormFields): boolean => {
  let hasFilled = true
  for (let [, fieldValue] of Object.entries(fields)) {
    if (!fieldValue) {
      hasFilled = false
    }
  }
  return hasFilled
}

function* handleCreateNewCaseFromCreateCaseForm(
  action: CreateNewCaseFromCreateCaseFormAction,
) {
  const {
    payload: {
      onCreating,
      fields,
      onCreated,
      onFailed,
      clientUser,
      funeralHome,
    },
  } = action
  const { isValid } = FormHelper.validateCreateNewCase(fields)
  const { role, ...formFields } = fields
  if (isValid) {
    onCreating()
    if (
      role === EulogiseUserRole.CONTRIBUTOR ||
      role === EulogiseUserRole.COEDITOR ||
      role === EulogiseUserRole.EDITOR ||
      role === undefined
    ) {
      const dateOfBirthDisplay = formFields.dateOfBirth
        ? DateTimeHelper.formatDate(
            formFields.dateOfBirth,
            DEFAULT_ISO_DATE_FORMAT,
          )
        : undefined
      const dateOfDeathDisplay = formFields.dateOfDeath
        ? DateTimeHelper.formatDate(
            formFields.dateOfDeath,
            DEFAULT_ISO_DATE_FORMAT,
          )
        : undefined
      const timeStartDisplay = formFields.dateOfService
        ? DateTimeHelper.formatDate(
            formFields.dateOfService,
            DEFAULT_ISO_DATE_FORMAT,
          )
        : undefined

      const deceased: ICaseDeceased = {
        fullName: formFields.deceasedName,
        dateOfBirthDisplay,
        dateOfDeathDisplay,
        hasSkippedOrFilledMemorialDataPullForm: hasFilledAllFields(formFields),
      }

      const service: ICaseService = {
        location: formFields.location,
        timeStartDisplay,
        serviceStartTime: formFields.serviceStartTime,
      }

      if (!formFields.dateOfBirth) {
        delete deceased.dateOfBirth
        delete deceased.dateOfBirthDisplay
      }
      if (!formFields.dateOfDeath) {
        delete deceased.dateOfDeath
        delete deceased.dateOfDeathDisplay
      }

      if (!formFields.location) {
        delete service.location
      }

      if (!formFields.serviceStartTime) {
        delete service.serviceStartTime
      }

      if (!service.timeStart) {
        delete service.timeStart
      }
      if (!formFields.dateOfService) {
        delete service.timeStartDisplay
      }
      yield put(
        signUpCustomerAsClient({
          signUpData: {
            email: formFields.email,
            fullName: formFields.name,
            clientUser,
            deceasedName: formFields.deceasedName,
            funeralHome,
            password: uuid.v4(),
            type:
              role === EulogiseUserRole.CONTRIBUTOR || role === undefined
                ? EulogiseUserRole.CUSTOMER
                : role,
            deceased,
            service,
            country: formFields.country,
            enabledProducts: formFields.enabledProducts,
          },
          isShouldSendEmail: role !== undefined,
          editorPaymentConfig:
            role === EulogiseUserRole.EDITOR && fields.editorPaymentConfig
              ? fields.editorPaymentConfig
              : null,
          success: () => onCreated(),
          failed: () => onFailed(),
        }),
      )
    }
  }
}

function* handleSignUpAsClient(action: SignUpCustomerAsClientAction) {
  const {
    payload: {
      signUpData,
      isShouldSendEmail,
      editorPaymentConfig,
      success,
      failed,
    },
  } = action
  const { deceased, service, country } = signUpData

  try {
    const {
      data: { email, id },
    } = yield RequestHelper.requestWithToken(
      EulogiseEndpoint.ACCOUNT_SIGN_UP_AS_CLIENT,
      {
        method: 'POST',
        data: signUpData,
      },
    )

    yield put({
      type: AuthActionTypes.SIGN_UP_AS_CLIENT_SUCCESS,
    })

    yield put(
      createCaseAsClient({
        caseData: {
          customer: id
            ? id
            : {
                email,
                fullName: signUpData.fullName,
              },
          service,
          deceased,
          country,
          region: CaseHelper.getRegionByCountry({ country }),
          enabledProducts: signUpData.enabledProducts,
        },
        email,
        fullName: signUpData.fullName,
        role: signUpData.type,
        success,
        isShouldSendEmail,
        editorPaymentConfig,
      }),
    )
  } catch (ex) {
    yield put({
      type: AuthActionTypes.SIGN_UP_AS_CLIENT_FAILED,
      payload: ex,
    })
    if (failed) {
      failed()
    }
  }
}

function* handleSignUp(action: SignUpAction) {
  const {
    payload: {
      type,
      fullName,
      email,
      password,
      deceasedName,
      country,
      complete,
      clientId,
      enabledProducts,
      region,
      deceasedDate,
      viaClientHandle,
      editorPaymentConfig,
      /*
      acceptTerms,
      acceptMarketing,
*/
    },
  } = action
  try {
    const requestBody = {
      email,
      password,
      fullName,
      deceasedName,
      deceasedDate,
      type,
    }
    const {
      data: { webtoken },
    } = yield RequestHelper.request(EulogiseEndpoint.ACCOUNT_SIGN_UP, {
      method: 'POST',
      data: requestBody,
    })
    const {
      data: { account },
    } = yield RequestHelper.request(
      `${EulogiseEndpoint.ACCOUNT_CHECK}?webtoken=${webtoken}`,
      {
        method: 'POST',
        data: {},
      },
    )

    yield put(
      signUpSuccess({
        account,
        webtoken,
        deceasedDate,
        deceasedName,
        enabledProducts,
        region,
        country,
        clientId,
        complete,
        viaClientHandle,
        editorPaymentConfig,
      }),
    )
  } catch (ex) {
    console.log('sign-up ex', ex)
    yield put(signUpFailed(ex))
  }
}

function* handleSignUpSuccess(action: SignUpSuccessAction) {
  const {
    payload: {
      clientId,
      complete,
      country,
      account,
      region,
      webtoken,
      deceasedDate,
      deceasedName,
      enabledProducts,
      viaClientHandle,
      editorPaymentConfig = null,
    },
  } = action
  RequestHelper.webtoken = webtoken
  const timeStartAndEnd: number = DateTimeHelper.getTimeByDate(deceasedDate)
  yield put(
    createCase({
      deceasedName,
      viaClientHandle,
      region,
      country,
      timeStartAndEnd,
      clientId,
      enabledProducts,
      editorPaymentConfig,
      callback: function* () {
        // TODO:REDUX
        yield put(loginSuccess({ account, webtoken, complete }))
        yield put(updateIsSigningUpStatus({ isSigningUp: false }))
      },
    }),
  )
}

function* handleLogout(action: LogoutAction) {
  const {
    payload: { success },
  } = action

  RequestHelper.webtoken = undefined
  if (success) {
    success()
  }
}

function* handleResetState(action: ResetStatePayloadAction) {
  const {
    payload: { success },
  } = action

  RequestHelper.webtoken = undefined
  if (success) {
    success()
  }
}

function* handleForgotPassword(action: ForgotPasswordAction) {
  const {
    payload: { success, requestBody },
  } = action
  try {
    yield RequestHelper.request(EulogiseEndpoint.FORGOT_PASSWORD, {
      method: 'POST',
      data: requestBody,
    })
    success && success()
    yield put(forgotPasswordSuccess())
  } catch (ex) {
    console.log('ex', ex)
  }
}

function* handleResetPassword(action: ResetPasswordAction) {
  const {
    payload: { password, complete, token },
  } = action

  try {
    yield RequestHelper.request(EulogiseEndpoint.RESET_PASSWORD, {
      method: 'POST',
      data: {
        password,
        token,
      },
    })
    NavigationHelper.navigate(EulogisePage.SIGN_IN)
    Notification.success('Your password has been reset successfully')
  } catch (ex) {
    console.log('ex', ex)
    Notification.error('Reset password failed')
  }
  if (complete) {
    complete()
  }
}

function* handleCheckAccount() {
  try {
    const {
      data: { account },
    } = yield RequestHelper.requestWithToken(EulogiseEndpoint.ACCOUNT_CHECK, {
      method: 'POST',
      data: {},
    })

    yield put({
      type: AuthActionTypes.CHECK_ACCOUNT_SUCCESS,
      payload: { account },
    })
  } catch (ex) {
    yield put({
      type: AuthActionTypes.CHECK_ACCOUNT_FAILED,
    })
  }
}

function* handleUpdatePersonalData(action: UpdatePersonalDetailByIdAction) {
  const {
    payload: { userId, success, failed, personalDetailsFields },
  } = action

  try {
    yield RequestHelper.requestWithToken(EulogiseEndpoint.ACCOUNT_SAVE, {
      method: 'POST',
      data: {
        user: {
          id: userId,
          ...personalDetailsFields,
        },
      },
    })

    yield put({
      type: AuthActionTypes.UPDATE_PERSONAL_DATA_SUCCESS,
      payload: { account: personalDetailsFields },
    })
    if (success) {
      success()
    }
  } catch (ex) {
    Notification.error('Failed to update Personal Details')
    yield put({
      type: AuthActionTypes.UPDATE_PERSONAL_DATA_FAILED,
    })
  }
  if (failed) {
    failed()
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(AuthActionTypes.LOGIN, handleLogin)
  yield takeEvery(AuthActionTypes.LOGIN_SUCCESS, handleLoginSuccess)
  yield takeEvery(AuthActionTypes.VERIFY_EMAIL, handleVerifyEmail)
  yield takeEvery(AuthActionTypes.SIGN_UP_CO_EDITOR, handleSignUpCoEditor)
  yield takeEvery(
    AuthActionTypes.CREATE_NEW_CASE_FROM_CREATE_CASE_FORM,
    handleCreateNewCaseFromCreateCaseForm,
  )
  yield takeEvery(AuthActionTypes.SIGN_UP_AS_CLIENT, handleSignUpAsClient)
  yield takeEvery(AuthActionTypes.SIGN_UP, handleSignUp)
  yield takeEvery(AuthActionTypes.SIGN_UP_SUCCESS, handleSignUpSuccess)
  yield takeEvery(AuthActionTypes.LOGOUT, handleLogout)
  yield takeEvery(AuthActionTypes.RESET_AUTH_STATE, handleResetState)
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, handleForgotPassword)
  yield takeEvery(AuthActionTypes.RESET_PASSWORD, handleResetPassword)
  yield takeEvery(AuthActionTypes.CHECK_ACCOUNT, handleCheckAccount)
  yield takeEvery(
    AuthActionTypes.UPDATE_PERSONAL_DATA,
    handleUpdatePersonalData,
  )
}

export const AuthSagas = [watchers()]
