import {
  AdminActionTypes,
  IAdminAction,
  IAdminActionPayload,
  IAdminState,
  ICase,
  IEulogiseClient,
  IEulogiseUser,
  IInvoice,
  IPortalCase,
  IPortalCaseResponseItem,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

const initialState: IAdminState = {
  manageUsersPageState: {
    users: [],
    fetchingUsers: true,
  },
  manageInvoicesPageState: {
    invoices: [],
    fetchingInvoices: false,
  },
  portalCasesPageState: {
    cases: [],
    fetchingCases: false,
    fetchingRecentCases: false,
  },
  viewAllCasesPageState: {
    cases: [],
    fetchingCases: true,
  },
  viewAllClientsPageState: {
    clients: [],
    fetchingClients: true,
  },
  createNewCasePageState: {},
  // @ts-ignore
  createNewClientPageState: {},
  funeralDirectors: [],
}

export const AdminReducer = (
  state: IAdminState = AdminInitialState,
  action: IAdminAction,
): IAdminState => {
  switch (action.type) {
    case AdminActionTypes.UPDATE_PRODUCT_BY_ID_SUCCESS: {
      const caseId = action.payload?.caseId
      const product = action.payload?.product!
      const productData = action.payload?.productData!
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          cases: state.portalCasesPageState.cases.map((c) => {
            if (c.id === caseId) {
              const productKey = CardProductHelper.getProductStateKeyByProduct({
                product,
              })
              if (!productKey) {
                throw new Error(`No productKey not found: ${product}`)
              }
              return {
                ...c,
                [productKey]: {
                  // @ts-ignore
                  ...c[productKey],
                  ...productData,
                },
              } as IPortalCase
            }
            return c
          }),
        },
      }
    }
    case AdminActionTypes.ASSIGN_FUNERAL_DIRECTOR_SUCCESS: {
      const { caseId, arrangerId, arrangerName } =
        action.payload as IAdminActionPayload
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          cases: state.portalCasesPageState.cases.map((c) => {
            if (c.id === caseId) {
              return {
                ...c,
                funeralDirector: arrangerId,
                funeralDirectorName: arrangerName,
              }
            }
            return c
          }) as Array<
            IPortalCaseResponseItem & {
              noOfInvites: number
              noOfImages: number
            }
          >,
        },
      }
    }
    case AdminActionTypes.UPDATE_ADMIN_CASE_BY_ID_SUCCESS: {
      const updatedCase = action.payload?.updatedCase as ICase
      console.log('case updated by id', updatedCase)
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          cases: state.portalCasesPageState.cases.map((c) => {
            if (c.id === updatedCase.id) {
              // only update the enabledProducts attribute
              return {
                ...c,
                retainOnCleanup: !!updatedCase.retainOnCleanup,
                enabledProducts: updatedCase.enabledProducts,
              }
            }
            return c
          }),
        },
      }
    }
    case AdminActionTypes.FETCH_CASE_SUMMARY_BY_CASE_ID_SUCCESS: {
      // @ts-ignore
      const { caseId, noOfInvites, noOfImages } = action.payload
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          cases: state.portalCasesPageState.cases.map((c) => {
            if (c.id === caseId) {
              return {
                ...c,
                noOfInvites,
                noOfImages,
              }
            }
            return c
          }),
        },
      }
    }
    case AdminActionTypes.ADD_NO_OF_IMAGES_TO_ADMIN_BY_CASE_ID: {
      // @ts-ignore
      const { caseId, noOfImages } = action.payload
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          cases: state.portalCasesPageState.cases.map((c) => {
            if (c.id === caseId) {
              return {
                ...c,
                noOfImages: (c.noOfImages || 0) + noOfImages,
              }
            }
            return c
          }),
        },
      }
    }
    case AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN:
    case AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS: {
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          fetchingCases: true,
        },
      }
    }
    case AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN_SUCCESS:
    case AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_SUCCESS: {
      return {
        ...state,
        portalCasesPageState: {
          // @ts-ignore
          cases: action.payload?.items,
          fetchingCases: false,
        },
      }
    }
    case AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN_FAILED:
    case AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_FAILED: {
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          fetchingCases: false,
        },
      }
    }
    case AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS: {
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          fetchingRecentCases: true,
        },
      }
    }
    case AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS_SUCCESS: {
      return {
        ...state,
        portalCasesPageState: {
          // @ts-ignore
          cases: action.payload?.items,
          fetchingRecentCases: false,
        },
      }
    }
    case AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS_FAILED: {
      return {
        ...state,
        portalCasesPageState: {
          ...state.portalCasesPageState,
          fetchingRecentCases: false,
        },
      }
    }
    case AdminActionTypes.FETCH_USERS_SUCCESS: {
      const users = action.payload?.items as IEulogiseUser[]
      return {
        ...state,
        manageUsersPageState: {
          ...state.manageUsersPageState,
          fetchingUsers: false,
          users,
        },
      }
    }
    case AdminActionTypes.FETCH_USERS_FAILED: {
      return {
        ...state,
        manageUsersPageState: {
          ...state.manageUsersPageState,
          fetchingUsers: false,
          users: [],
        },
      }
    }
    case AdminActionTypes.FETCH_USERS_ONGOING: {
      return {
        ...state,
        manageUsersPageState: {
          ...state.manageUsersPageState,
          fetchingUsers: true,
          users: [],
        },
      }
    }
    case AdminActionTypes.FETCH_INVOICES_SUCCESS: {
      const invoices = action.payload?.items as Array<IInvoice>
      return {
        ...state,
        manageInvoicesPageState: {
          ...state.manageInvoicesPageState,
          fetchingInvoices: false,
          invoices,
        },
      }
    }
    case AdminActionTypes.FETCH_INVOICES_FAILED: {
      return {
        ...state,
        manageInvoicesPageState: {
          ...state.manageInvoicesPageState,
          fetchingInvoices: false,
          invoices: [],
        },
      }
    }
    case AdminActionTypes.FETCH_INVOICES_ONGOING: {
      return {
        ...state,
        manageInvoicesPageState: {
          ...state.manageInvoicesPageState,
          fetchingInvoices: true,
        },
      }
    }
    case AdminActionTypes.FETCH_CLIENTS_SUCCESS: {
      const clients = action.payload?.items as Array<IEulogiseClient>
      return {
        ...state,
        viewAllClientsPageState: {
          ...state.viewAllClientsPageState,
          fetchingClients: false,
          clients,
        },
      }
    }
    case AdminActionTypes.FETCH_CLIENTS_FAILED: {
      return {
        ...state,
        viewAllClientsPageState: {
          ...state.viewAllClientsPageState,
          fetchingClients: false,
          clients: [],
        },
      }
    }
    case AdminActionTypes.ADMIN_FETCH_CASES_SUCCESS: {
      const cases = action.payload?.items as Array<ICase>
      return {
        ...state,
        viewAllCasesPageState: {
          fetchingCases: false,
          cases,
        },
      }
    }
    case AdminActionTypes.ADMIN_FETCH_CASES_FAILED: {
      return {
        ...state,
        viewAllCasesPageState: {
          fetchingCases: false,
          cases: [],
        },
      }
    }
    case AdminActionTypes.RESTORE_ADMIN_INITIAL_STATE: {
      return {
        ...initialState,
      }
    }
    default:
      return state
  }
}

export const AdminInitialState = initialState
