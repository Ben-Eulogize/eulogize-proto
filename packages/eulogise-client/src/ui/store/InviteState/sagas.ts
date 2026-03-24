import { takeEvery, put } from 'redux-saga/effects'
import {
  EulogisePage,
  EulogiseResource,
  EulogiseUserRole,
  InviteActionTypes,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import {
  CreateInviteAction,
  FetchInvitesByCaseIdAction,
  GenerateShareLinkAction,
  RemoveInviteAction,
  SendInviteAction,
  SendWelcomeEmailAction,
  ShareWithContactAction,
} from './actions'
import RequestHelper from '../../helpers/RequestHelper'
import { Notification } from '@eulogise/client-components'
import { EulogiseEndpoint } from '@eulogise/client-core'

function* handleShareWithContact(action: ShareWithContactAction) {
  const {
    payload: { caseId, inviteRole, userData, success },
  } = action

  try {
    const {
      data: { item: invite },
    } = yield RequestHelper.shareResourceRequest(caseId, inviteRole, userData)
    Notification.success(`Preview email sent to ${invite.fullName}`)

    yield put({
      type: InviteActionTypes.SHARE_WITH_CONTACT_SUCCESS,
    })
    if (success) {
      success()
    }
  } catch (ex) {
    console.log('shareWithContact Exception', ex)
    Notification.error('Unable to share')
    yield put({
      type: InviteActionTypes.SHARE_WITH_CONTACT_FAILED,
      payload: { ex },
    })
  }
}

function* handleGenerateShareLink(action: GenerateShareLinkAction) {
  const {
    payload: { success, inviteRole, caseId },
  } = action
  try {
    const {
      data: { item },
    } = yield RequestHelper.shareResourceRequest(caseId, inviteRole)
    let invite = item
    if (Array.isArray(item) && item.length > 0) {
      invite = item[0]
    }
    const shareLink: string = `${window.location.origin}${EulogisePage.INVITE}/?token=${invite.token}`
    yield put({
      type: InviteActionTypes.GENERATE_SHARABLE_LINK_SUCCESS,
      payload: {
        shareLink,
        inviteRole,
      },
    })

    if (success) {
      success(shareLink)
    }
  } catch (ex) {
    Notification.error('Failed to generate a sharable link')
    yield put({
      type: InviteActionTypes.GENERATE_SHARABLE_LINK_FAILED,
      payload: {
        ex,
      },
    })
  }
}

function* handleCreateInvite(action: CreateInviteAction) {
  const {
    payload: { inviteData, isShouldSendEmail, success, complete },
  } = action
  try {
    const {
      data: { item: invite },
    } = yield RequestHelper.saveResourceRequest(
      EulogiseResource.INVITE,
      {
        ...inviteData,
        status: isShouldSendEmail ? 'sent' : 'pending',
      },
      { isShouldSendEmail },
    )
    if (invite?.status === 'error') {
      throw new Error('Invite sent failed')
    }
    yield put({
      type: InviteActionTypes.CREATE_INVITE_SUCCESS,
      payload: { invite },
    })
    const hasEmail = inviteData.email !== NO_REPLY_EULOGISE_EMAIL
    if (isShouldSendEmail && hasEmail) {
      Notification.success(
        `Invitation Email for ${inviteData.fullName} has been sent.`,
      )
    }
    if (success) {
      success()
    }
  } catch (ex) {
    if (isShouldSendEmail) {
      Notification.error(
        `Failed to send invitation Email for customer ${inviteData.fullName}`,
      )
    }
    yield put({
      type: InviteActionTypes.CREATE_INVITE_FAILED,
      payload: ex,
    })
  }
  if (complete) {
    complete()
  }
}

function* handleFetchInvitesByCaseId(action: FetchInvitesByCaseIdAction) {
  const {
    payload: { caseId },
  } = action
  try {
    const {
      data: { items: invites },
    } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.INVITE,
      caseId,
      additionalData: {
        role: {
          in: [
            EulogiseUserRole.EDITOR,
            EulogiseUserRole.COEDITOR,
            EulogiseUserRole.CONTRIBUTOR,
          ],
        },
      },
    })

    yield put({
      type: InviteActionTypes.FETCH_INVITES_BY_CASE_ID_SUCCESS,
      payload: { invites },
    })
  } catch (ex) {
    yield put({
      type: InviteActionTypes.FETCH_INVITES_BY_CASE_ID_FAILED,
      payload: ex,
    })
  }
}

function* handleSendInvite(action: SendInviteAction) {
  const {
    payload: { inviteId, success },
  } = action
  try {
    yield RequestHelper.requestWithToken(EulogiseEndpoint.SEND_INVITE, {
      method: 'POST',
      data: {
        invite: inviteId,
      },
    })

    Notification.success('Sending invite')
    yield put({
      type: InviteActionTypes.SEND_INVITE_SUCCESS,
    })
    if (success) {
      success()
    }
  } catch (ex) {
    Notification.error('Send invite failed')
    yield put({
      type: InviteActionTypes.SEND_INVITE_FAILED,
      payload: ex,
    })
  }
}

function* handleSendWelcomeEmail(action: SendWelcomeEmailAction) {
  const {
    payload: { userId, onComplete, onSuccess },
  } = action
  try {
    yield RequestHelper.requestWithToken(
      EulogiseEndpoint.SEND_WELCOME_INVITE.replace(/\{userId\}/, userId),
      {
        method: 'POST',
      },
    )

    Notification.success('Sending invite')
    yield put({
      type: InviteActionTypes.SEND_WELCOME_EMAIL_SUCCESS,
    })
    if (onSuccess) {
      onSuccess()
    }
  } catch (ex) {
    Notification.error('Send invite failed')
    yield put({
      type: InviteActionTypes.SEND_WELCOME_EMAIL_FAILED,
      payload: ex,
    })
  }
  if (onComplete) {
    onComplete()
  }
}

function* handleRemoveInvite(action: RemoveInviteAction) {
  const {
    payload: { inviteId, success },
  } = action
  try {
    if (!inviteId) {
      throw Error('Remove invite failed, no inviteId provided.')
    }
    yield RequestHelper.removeResourceRequest({
      resource: EulogiseResource.INVITE,
      itemId: inviteId,
    })

    Notification.success('Collaborator has been removed')
    yield put({
      type: InviteActionTypes.REMOVE_INVITE_SUCCESS,
      payload: {
        inviteId,
      },
    })
    if (success) {
      success()
    }
  } catch (ex) {
    Notification.error('Failed to remove collaborator')
    yield put({
      type: InviteActionTypes.REMOVE_INVITE_FAILED,
      payload: ex,
    })
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(InviteActionTypes.SHARE_WITH_CONTACT, handleShareWithContact)
  yield takeEvery(
    InviteActionTypes.GENERATE_SHARABLE_LINK,
    handleGenerateShareLink,
  )
  yield takeEvery(InviteActionTypes.CREATE_INVITE, handleCreateInvite)
  yield takeEvery(
    InviteActionTypes.FETCH_INVITES_BY_CASE_ID,
    handleFetchInvitesByCaseId,
  )
  yield takeEvery(InviteActionTypes.SEND_INVITE, handleSendInvite)
  yield takeEvery(InviteActionTypes.SEND_WELCOME_EMAIL, handleSendWelcomeEmail)
  yield takeEvery(InviteActionTypes.REMOVE_INVITE, handleRemoveInvite)
}

export const InviteSagas = [watchers()]
