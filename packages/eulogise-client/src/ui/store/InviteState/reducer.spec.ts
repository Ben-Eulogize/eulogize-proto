import { InviteInitialState, InviteReducer } from './reducer'
import { EulogiseUserRole, IInvite, InviteActionTypes } from '@eulogise/core'
import { MOCK_INVITES } from '@eulogise/mock'

describe('Invite Reducer - Unit', () => {
  let results: any
  describe('GENERATE_SHARABLE_LINK', () => {
    beforeEach(() => {
      results = InviteReducer(InviteInitialState, {
        type: InviteActionTypes.GENERATE_SHARABLE_LINK,
      })
    })

    describe('isGenerating', () => {
      it('should be true', () => {
        expect(results.isGenerating).toEqual(true)
      })
    })
  })

  describe('GENERATE_SHARABLE_LINK_SUCCESS', () => {
    const shareLink: string = 'http://sharelink/invite'
    const inviteRole: EulogiseUserRole = EulogiseUserRole.VISITOR_SLIDESHOW

    beforeEach(() => {
      results = InviteReducer(InviteInitialState, {
        type: InviteActionTypes.GENERATE_SHARABLE_LINK_SUCCESS,
        payload: {
          inviteRole,
          shareLink,
        },
      })
    })

    describe('isGenerating', () => {
      it('should be false', () => {
        expect(results.isGenerating).toEqual(false)
      })
    })

    describe('shareLinks', () => {
      it('should be { "visitor-slideshow": shareLink }', () => {
        expect(results.shareLinks).toEqual({
          [EulogiseUserRole.VISITOR_SLIDESHOW]: shareLink,
        })
      })
    })
  })

  describe('GENERATE_SHARABLE_LINK_FAILED', () => {
    beforeEach(() => {
      results = InviteReducer(InviteInitialState, {
        type: InviteActionTypes.GENERATE_SHARABLE_LINK_FAILED,
      })
    })

    describe('isGenerating', () => {
      it('should be false', () => {
        expect(results.isGenerating).toEqual(false)
      })
    })
  })

  describe('SHARE_WITH_CONTACT', () => {
    beforeEach(() => {
      results = InviteReducer(InviteInitialState, {
        type: InviteActionTypes.SHARE_WITH_CONTACT,
      })
    })

    describe('isSharing', () => {
      it('should be true', () => {
        expect(results.isSharing).toEqual(true)
      })
    })
  })

  describe('SHARE_WITH_CONTACT_SUCCESS', () => {
    beforeEach(() => {
      results = InviteReducer(InviteInitialState, {
        type: InviteActionTypes.SHARE_WITH_CONTACT_SUCCESS,
      })
    })

    describe('isSharing', () => {
      it('should be false', () => {
        expect(results.isSharing).toEqual(false)
      })
    })
  })

  describe('SHARE_WITH_CONTACT_FAILED', () => {
    beforeEach(() => {
      results = InviteReducer(InviteInitialState, {
        type: InviteActionTypes.SHARE_WITH_CONTACT_FAILED,
      })
    })

    describe('isSharing', () => {
      it('should be false', () => {
        expect(results.isSharing).toEqual(false)
      })
    })
  })

  describe('FETCH_INVITES_BY_CASE_ID', () => {
    beforeEach(() => {
      results = InviteReducer(
        { ...InviteInitialState, isFetching: false },
        {
          type: InviteActionTypes.FETCH_INVITES_BY_CASE_ID,
        },
      )
    })

    describe('isFetching', () => {
      it('should be true', () => {
        expect(results.isFetching).toEqual(true)
      })
    })
  })

  describe('FETCH_INVITES_BY_CASE_ID_SUCCESS', () => {
    const invites: Array<IInvite> = MOCK_INVITES

    beforeEach(() => {
      results = InviteReducer(
        { ...InviteInitialState, isFetching: true },
        {
          type: InviteActionTypes.FETCH_INVITES_BY_CASE_ID_SUCCESS,
          payload: {
            invites,
          },
        },
      )
    })

    describe('isFetching', () => {
      it('should be false', () => {
        expect(results.isFetching).toEqual(false)
      })
    })

    describe('items', () => {
      it('should return all the invites', () => {
        expect(results.items).toEqual(invites)
      })
    })
  })
})
