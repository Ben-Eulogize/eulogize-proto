import { ICase, CaseActionTypes } from '@eulogise/core'
import { MOCK_CASE_1, MOCK_CASE_2 } from '@eulogise/mock'
import { CaseInitialState, CaseReducer } from './reducer'

describe('CaseState - Reducer', () => {
  let results: any

  describe('SET_ACTIVE_CASE_BY_CASE_ID', () => {
    describe('Case found', () => {
      const case1: ICase = MOCK_CASE_1
      const case2: ICase = MOCK_CASE_2
      const caseId: string = MOCK_CASE_2.id

      beforeEach(() => {
        results = CaseReducer(
          {
            ...CaseInitialState,
            items: [case1, case2],
            activeItem: case1,
          },
          {
            type: CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID,
            payload: {
              caseId,
            },
          },
        )
      })

      describe('activeItem', () => {
        it('should be set to case 2', () => {
          expect(results.activeItem).toEqual(case2)
        })
      })
    })

    describe('Case not exists', () => {
      const case1: ICase = MOCK_CASE_1
      const case2: ICase = MOCK_CASE_2
      const caseId: string = 'not-exist'

      beforeEach(() => {
        results = CaseReducer(
          {
            ...CaseInitialState,
            items: [case1, case2],
            activeItem: case1,
          },
          {
            type: CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID,
            payload: {
              caseId,
            },
          },
        )
      })

      describe('activeItem', () => {
        it('should not be changed', () => {
          expect(results.activeItem).toEqual(case1)
        })
      })
    })
  })

  describe('FETCH_BOOKLETS_BY_CASE_ID_SUCCESS', () => {
    describe('Return 1 item', () => {
      const items: Array<ICase> = [MOCK_CASE_1]

      beforeEach(() => {
        results = CaseReducer(CaseInitialState, {
          type: CaseActionTypes.FETCH_CASES_SUCCESS,
          payload: { items },
        })
      })

      it('should update "items" and "activeItem"', () => {
        expect(results.items).toEqual(items)
        expect(results.activeItem).toEqual(items[0])
      })
    })

    describe('Return 0 items', () => {
      const items: Array<ICase> = []

      beforeEach(() => {
        results = CaseReducer(CaseInitialState, {
          type: CaseActionTypes.FETCH_CASES_SUCCESS,
          payload: { items },
        })
      })

      it('should update "items" and "activeItem"', () => {
        expect(results.items).toEqual(items)
        expect(results.activeItem).toBeUndefined()
      })
    })
  })

  describe('CREATE_CASE_AS_CLIENT', () => {
    beforeEach(() => {
      results = CaseReducer(
        { ...CaseInitialState, isCreating: false },
        {
          type: CaseActionTypes.CREATE_CASE_AS_CLIENT,
        },
      )
    })

    describe('isCreating', () => {
      it('should be true', () => {
        expect(results.isCreating).toEqual(true)
      })
    })
  })

  describe('CREATE_CASE_AS_CLIENT_SUCCESS', () => {
    beforeEach(() => {
      results = CaseReducer(
        { ...CaseInitialState, isCreating: true },
        {
          type: CaseActionTypes.CREATE_CASE_AS_CLIENT_SUCCESS,
        },
      )
    })

    describe('isCreating', () => {
      it('should be true', () => {
        expect(results.isCreating).toEqual(false)
      })
    })
  })

  describe('CREATE_CASE_AS_CLIENT_FAILED', () => {
    beforeEach(() => {
      results = CaseReducer(
        { ...CaseInitialState, isCreating: true },
        {
          type: CaseActionTypes.CREATE_CASE_AS_CLIENT_FAILED,
        },
      )
    })

    describe('isCreating', () => {
      it('should be true', () => {
        expect(results.isCreating).toEqual(false)
      })
    })
  })

  describe('UPDATE_CASE_BY_ID', () => {
    beforeEach(() => {
      results = CaseReducer(
        { ...CaseInitialState, isUpdating: false },
        {
          type: CaseActionTypes.UPDATE_CASE_BY_ID,
        },
      )
    })

    describe('isUpdating', () => {
      it('should be true', () => {
        expect(results.isUpdating).toEqual(true)
      })
    })
  })

  describe('UPDATE_CASE_BY_ID_SUCCESS', () => {
    const deceasedFullName: string = 'Deceased Name'
    const updatedDeceasedFullName: string = 'Updated Deceased Name'
    const caseId: string = 'case-1'
    const existingCase: ICase = {
      // @ts-ignore
      updatedCase: {
        id: caseId,
        deceased: {
          fullName: deceasedFullName,
        },
      },
    }

    const updatedCase = {
      ...existingCase,
      deceased: {
        ...existingCase.deceased,
        fullName: updatedDeceasedFullName,
      },
    }
    beforeEach(() => {
      results = CaseReducer(
        { ...CaseInitialState, isUpdating: true, items: [existingCase] },
        {
          type: CaseActionTypes.UPDATE_CASE_BY_ID_SUCCESS,
          payload: {
            updatedCase,
          },
        },
      )
    })

    describe('isUpdating', () => {
      it('should be false', () => {
        expect(results.isUpdating).toEqual(false)
      })
    })
  })

  describe('UPDATE_CASE_BY_ID_FAILED', () => {
    beforeEach(() => {
      results = CaseReducer(
        { ...CaseInitialState, isUpdating: true },
        {
          type: CaseActionTypes.UPDATE_CASE_BY_ID_FAILED,
        },
      )
    })

    describe('isUpdating', () => {
      it('should be false', () => {
        expect(results.isUpdating).toEqual(false)
      })
    })
  })

  describe('UPDATE_CASE_HAS_SKIPPED_OR_FILLED_MEMORIAL_DATA_PULL_FORM_STATUS', () => {
    beforeEach(() => {
      results = CaseReducer(
        {
          ...CaseInitialState,
          isUpdating: false,
          activeItem: {
            deceased: {
              hasSkippedOrFilledMemorialDataPullForm: false,
            },
          },
        },
        {
          type: CaseActionTypes.UPDATE_CASE_HAS_SKIPPED_OR_FILLED_MEMORIAL_DATA_PULL_FORM_STATUS,
        },
      )
    })

    describe('isUpdatingMemorialStatus', () => {
      it('should be true', () => {
        expect(
          results.activeItem.deceased.hasSkippedOrFilledMemorialDataPullForm,
        ).toEqual(true)
      })
    })
  })
})
