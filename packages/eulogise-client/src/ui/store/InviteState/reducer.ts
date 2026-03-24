import {
  IInviteAction,
  IInviteState,
  InviteActionTypes,
  IInvite,
} from '@eulogise/core'

const initialState: IInviteState = {
  isGenerating: false,
  isSharing: false,
  isCreating: false,
  shareLinks: {},
  items: [],
  isFetching: false,
}

export const InviteReducer = (
  state: IInviteState = initialState,
  action: IInviteAction,
): IInviteState => {
  switch (action.type) {
    case InviteActionTypes.GENERATE_SHARABLE_LINK: {
      return {
        ...state,
        isGenerating: true,
      }
    }
    case InviteActionTypes.GENERATE_SHARABLE_LINK_SUCCESS: {
      // @ts-ignore
      const { inviteRole, shareLink } = action.payload
      return {
        ...state,
        isGenerating: false,
        shareLinks: { ...state.shareLinks, [inviteRole]: shareLink },
      }
    }
    case InviteActionTypes.GENERATE_SHARABLE_LINK_FAILED: {
      return {
        ...state,
        isGenerating: false,
      }
    }
    case InviteActionTypes.SHARE_WITH_CONTACT: {
      return {
        ...state,
        isSharing: true,
      }
    }
    case InviteActionTypes.SHARE_WITH_CONTACT_SUCCESS: {
      return {
        ...state,
        isSharing: false,
      }
    }
    case InviteActionTypes.SHARE_WITH_CONTACT_FAILED: {
      return {
        ...state,
        isSharing: false,
      }
    }
    case InviteActionTypes.FETCH_INVITES_BY_CASE_ID: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case InviteActionTypes.FETCH_INVITES_BY_CASE_ID_SUCCESS: {
      const invites = action.payload?.invites
      return {
        ...state,
        // @ts-ignore
        items: invites,
        isFetching: false,
      }
    }
    case InviteActionTypes.FETCH_INVITES_BY_CASE_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case InviteActionTypes.CREATE_INVITE: {
      return {
        ...state,
        isCreating: true,
      }
    }
    case InviteActionTypes.CREATE_INVITE_FAILED: {
      return {
        ...state,
        isCreating: false,
      }
    }
    case InviteActionTypes.CREATE_INVITE_SUCCESS: {
      const invite = action.payload?.invite
      return {
        ...state,
        isCreating: false,
        items: state.items
          .filter((i: IInvite) => i.id !== invite?.id)
          .concat(invite!),
      }
    }
    case InviteActionTypes.REMOVE_INVITE_SUCCESS: {
      const inviteId: string = action.payload?.inviteId!
      return {
        ...state,
        items: state.items.filter((i: IInvite) => i.id !== inviteId),
      }
    }
    default:
      return state
  }
}

export const InviteInitialState = initialState
