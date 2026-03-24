import { AdminInitialState, AdminReducer } from './reducer'
import { MOCK_USERS, MOCK_CASES, MOCK_CLIENTS } from '@eulogise/mock'
import {
  ICase,
  IEulogiseClient,
  IEulogiseUser,
  AdminActionTypes,
} from '@eulogise/core'

describe('AdminState - Reducer', () => {
  let results: any

  describe('Fetch users test cases, which relates to manage users page', () => {
    describe('FETCH_USERS_ONGOING', () => {
      it('fetchingUsers flag should be true, users should be empty array', () => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.FETCH_USERS_ONGOING,
        })
        expect(results.manageUsersPageState.fetchingUsers).toEqual(true)
        expect(results.manageUsersPageState.users).toEqual([])
      })
    })

    describe('FETCH_USERS_SUCCESS', () => {
      const items: Array<IEulogiseUser> = MOCK_USERS

      beforeEach(() => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.FETCH_USERS_SUCCESS,
          payload: { items },
        })
      })

      it('should update "fetchingUsers" flag and "users"', () => {
        expect(results.manageUsersPageState.fetchingUsers).toEqual(false)
        expect(results.manageUsersPageState.users).toEqual(items)
      })
    })

    describe('FETCH_USERS_FAILED', () => {
      beforeEach(() => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.FETCH_USERS_FAILED,
        })
      })

      it('should update "fetchingUsers" flag and "users" will be empty', () => {
        expect(results.manageUsersPageState.fetchingUsers).toEqual(false)
        expect(results.manageUsersPageState.users).toEqual([])
      })
    })
  })

  describe('Fetch clients test cases, which relates to view all clients page', () => {
    const items: Array<IEulogiseClient> = MOCK_CLIENTS
    describe('FETCH_CLIENTS_SUCCESS', () => {
      beforeEach(() => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.FETCH_CLIENTS_SUCCESS,
          payload: { items },
        })
      })

      it('should update "fetchingClients" flag and "clients" will be the mock clients', () => {
        expect(results.viewAllClientsPageState.clients).toEqual(items)
        expect(results.viewAllClientsPageState.fetchingClients).toEqual(false)
      })
    })

    describe('FETCH_CLIENTS_FAILED', () => {
      beforeEach(() => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.FETCH_CLIENTS_FAILED,
          payload: { items },
        })
      })

      it('should update "fetchingClients" flag and "clients" will be empty', () => {
        expect(results.viewAllClientsPageState.clients).toEqual([])
        expect(results.viewAllClientsPageState.fetchingClients).toEqual(false)
      })
    })
  })

  describe('Fetch cases test cases, which relates to view all cases page', () => {
    const items: Array<ICase> = MOCK_CASES
    describe('FETCH_CASES_SUCCESS', () => {
      beforeEach(() => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.ADMIN_FETCH_CASES_SUCCESS,
          payload: { items },
        })
      })

      it('should update "fetchingClients" flag and "clients" will be the mock clients', () => {
        expect(results.viewAllCasesPageState.cases).toEqual(items)
        expect(results.viewAllCasesPageState.fetchingCases).toEqual(false)
      })
    })

    describe('FETCH_CASES_FAILED', () => {
      beforeEach(() => {
        results = AdminReducer(AdminInitialState, {
          type: AdminActionTypes.ADMIN_FETCH_CASES_FAILED,
          payload: { items },
        })
      })

      it('should update "fetchingClients" flag and "clients" will be empty', () => {
        expect(results.viewAllCasesPageState.cases).toEqual([])
        expect(results.viewAllCasesPageState.fetchingCases).toEqual(false)
      })
    })
  })

  describe('Reset Initial State', () => {
    beforeEach(() => {
      results = AdminReducer(AdminInitialState, {
        type: AdminActionTypes.RESTORE_INITIAL_STATE,
      })
    })

    it('should update "fetchingClients" flag and "clients" will be the mock clients', () => {
      expect(results).toEqual(AdminInitialState)
    })
  })
})
