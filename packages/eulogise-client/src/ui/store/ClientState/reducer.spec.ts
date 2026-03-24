import { ClientInitialState, ClientReducer } from './reducer'
import { IEulogiseClient, ClientActionTypes } from '@eulogise/core'
import { MOCK_CLIENT_1, MOCK_CLIENT_2 } from '@eulogise/mock'

describe('ClientState - Reducer', () => {
  let results: any

  describe('FETCH_CLIENT', () => {
    beforeEach(() => {
      results = ClientReducer(ClientInitialState, {
        type: ClientActionTypes.FETCH_CLIENT,
      })
    })

    it('should update isFetching to true', () => {
      expect(results.isFetching).toEqual(true)
    })
  })

  describe('FETCH_CLIENT_SUCCESS', () => {
    const client1: IEulogiseClient = MOCK_CLIENT_1
    const client2: IEulogiseClient = MOCK_CLIENT_2
    const clients: Array<IEulogiseClient> = [client1, client2]

    beforeEach(() => {
      results = ClientReducer(ClientInitialState, {
        type: ClientActionTypes.FETCH_CLIENT_SUCCESS,
        payload: {
          clients,
        },
      })
    })

    describe('isFetching', () => {
      it('should be false', () => {
        expect(results.isFetching).toEqual(false)
      })
    })

    describe('items', () => {
      it('should be the payload clients', () => {
        expect(results.items).toEqual(clients)
      })
    })

    describe('activeItem', () => {
      it('should be client1', () => {
        expect(results.activeItem).toEqual(client1)
      })
    })
  })

  describe('FETCH_CLIENT_FAILED', () => {
    beforeEach(() => {
      results = ClientReducer(ClientInitialState, {
        type: ClientActionTypes.FETCH_CLIENT_FAILED,
      })
    })

    describe('isFetching', () => {
      it('should be false', () => {
        expect(results.isFetching).toEqual(false)
      })
    })
  })
})
