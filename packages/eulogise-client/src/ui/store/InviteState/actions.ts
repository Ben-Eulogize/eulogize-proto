import {
  IInviteData,
  IInviteUserData,
  EulogiseUserRole,
  EulogiseProduct,
  InviteActionTypes,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

type ShareWithContactPayload = {
  caseId: string
  inviteRole: EulogiseUserRole
  userData: IInviteUserData
  success?: () => void
}

export type ShareWithContactAction = {
  type: InviteActionTypes.SHARE_WITH_CONTACT
  payload: ShareWithContactPayload
}

export const shareWithContact = (
  payload: ShareWithContactPayload,
): ShareWithContactAction => ({
  type: InviteActionTypes.SHARE_WITH_CONTACT,
  payload,
})

type GenerateShareLinkPayload = {
  caseId: string
  inviteRole: EulogiseUserRole
  success: (shareLink: string) => void
}

export type GenerateShareLinkAction = {
  type: InviteActionTypes.GENERATE_SHARABLE_LINK
  payload: GenerateShareLinkPayload
}

const generateShareLink = (payload: GenerateShareLinkPayload) => ({
  type: InviteActionTypes.GENERATE_SHARABLE_LINK,
  payload,
})

export const generateProductShareLink = (
  product: EulogiseProduct,
  caseId: string,
  success: (shareLink: string) => void,
) =>
  generateShareLink({
    caseId,
    inviteRole: CardProductHelper.getShareLinkUserRole(product),
    success,
  })

export const generateBookletShareLink = (
  caseId: string,
  success: (shareLink: string) => void,
) =>
  generateShareLink({
    caseId,
    inviteRole: EulogiseUserRole.VISITOR_BOOKLET,
    success,
  })

type CreateInvitePayload = {
  inviteData: IInviteData
  isShouldSendEmail?: boolean
  success?: () => void
  complete?: () => void
}

export type CreateInviteAction = {
  type: InviteActionTypes.CREATE_INVITE
  payload: CreateInvitePayload
}

export const createInvite = (
  payload: CreateInvitePayload,
): CreateInviteAction => ({
  type: InviteActionTypes.CREATE_INVITE,
  payload,
})

type FetchInvitesByCaseIdPayload = { caseId: string }

export type FetchInvitesByCaseIdAction = {
  type: InviteActionTypes.FETCH_INVITES_BY_CASE_ID
  payload: FetchInvitesByCaseIdPayload
}

export const fetchInvitesByCaseId = (
  payload: FetchInvitesByCaseIdPayload,
): FetchInvitesByCaseIdAction => ({
  type: InviteActionTypes.FETCH_INVITES_BY_CASE_ID,
  payload,
})

type SendInvitePayload = { inviteId: string; success?: () => void }

export type SendInviteAction = {
  type: InviteActionTypes.SEND_INVITE
  payload: SendInvitePayload
}

export const sendInvite = (payload: SendInvitePayload): SendInviteAction => ({
  type: InviteActionTypes.SEND_INVITE,
  payload,
})

export type SendWelcomeEmailPayload = {
  userId: string
  onComplete?: () => void
  onSuccess?: () => void
}

export type SendWelcomeEmailAction = {
  type: InviteActionTypes.SEND_WELCOME_EMAIL
  payload: SendWelcomeEmailPayload
}

export const sendWelcomeEmailAction = (
  payload: SendWelcomeEmailPayload,
): SendWelcomeEmailAction => {
  return {
    type: InviteActionTypes.SEND_WELCOME_EMAIL,
    payload,
  }
}

type RemoveInvitePayload = { inviteId: string; success?: () => void }

export type RemoveInviteAction = {
  type: InviteActionTypes.REMOVE_INVITE
  payload: RemoveInvitePayload
}

export const removeInvite = (payload: RemoveInvitePayload) => ({
  type: InviteActionTypes.REMOVE_INVITE,
  payload,
})
