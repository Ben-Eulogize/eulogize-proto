import {
  IEulogiseClient,
  IEulogiseUser,
  IClientData,
  AdminActionTypes,
  EulogiseProduct,
  ICardProductData,
  EulogiseRegion,
  ICaseData,
  EulogiseUserRole,
  IUserReadable,
  IPortalCaseResponseItem,
} from '@eulogise/core'
import { IClientFormSubmitValuesNew } from '../../containers/Admin/Client/ClientForm.types'

type FetchUsersByClientIdPayload = {
  clientId: string
  onSuccess?: (users: Array<IEulogiseUser>) => void
}
export type FetchUsersByClientIdAction = {
  type: AdminActionTypes.FETCH_USERS_BY_CLIENT_ID
  payload: FetchUsersByClientIdPayload
}

type UpdateClientByIdPayload = {
  clientId: string
  clientData: IClientFormSubmitValuesNew
  onSuccess?: () => void
}

export type UpdateClientByIdAction = {
  type: AdminActionTypes.UPDATE_CLIENT_BY_CLIENT_ID
  payload: UpdateClientByIdPayload
}

type RemoveFuneralDirectorFromClientPayload = {
  clientId: string
  userId: string
  onSuccess: () => void
}

export type RemoveFuneralDirectorFromClientAction = {
  type: AdminActionTypes.REMOVE_FUNERAL_DIRECTORY_FROM_CLIENT
  payload: RemoveFuneralDirectorFromClientPayload
}

type CreateOrUpdateClientPayload = {
  requestBody: IClientData
}

export type CreateOrUpdateClientAction = {
  type: AdminActionTypes.CREATE_OR_UPDATE_CLIENT_ONGOING
  payload: CreateOrUpdateClientPayload
}

type UnlockProductByIdPayload = {
  product: EulogiseProduct
  productId: string
  slug?: string
  onSuccess?: (cardProduct: ICardProductData) => void
}

export type UnlockProductByIdAction = {
  type: AdminActionTypes.UNLOCK_PRODUCT_BY_ID
  payload: UnlockProductByIdPayload
}

export const unlockProductByIdAction = (
  payload: UnlockProductByIdPayload,
): UnlockProductByIdAction => ({
  type: AdminActionTypes.UNLOCK_PRODUCT_BY_ID,
  payload,
})

type UpdateProductByIdPayload = {
  product: EulogiseProduct
  caseId: string
  productId: string
  productData: Partial<ICardProductData>
  onSuccess?: (cardProduct: ICardProductData) => void
}

export type UpdateProductByIdAction = {
  type: AdminActionTypes.UPDATE_PRODUCT_BY_ID
  payload: UpdateProductByIdPayload
}

export const updateProductByIdAction = (
  payload: UpdateProductByIdPayload,
): UpdateProductByIdAction => ({
  type: AdminActionTypes.UPDATE_PRODUCT_BY_ID,
  payload,
})

/* Actions */
export const fetchCasesWithFullDetailsAsAdmin = () => ({
  type: AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS_AS_ADMIN,
})

export const fetchCasesWithFullDetails = () => ({
  type: AdminActionTypes.FETCH_CASES_WITH_FULL_DETAILS,
})

export const fetchRecentCasesWithFullDetails = () => ({
  type: AdminActionTypes.FETCH_RECENT_CASES_WITH_FULL_DETAILS,
})

export const fetchAllInvoicesWithAdmin = () => ({
  type: AdminActionTypes.FETCH_INVOICES_ONGOING,
})

// USERS
type UpdateUserRolePayload = {
  userId: string
  role: EulogiseUserRole
}

export type UpdateUserRoleAction = {
  type: AdminActionTypes.UPDATE_USER_ROLE
  payload: UpdateUserRolePayload
}
export const updateUserRole = ({
  userId,
  role,
}: UpdateUserRolePayload): UpdateUserRoleAction => ({
  type: AdminActionTypes.UPDATE_USER_ROLE,
  payload: { userId, role },
})

type FetchUserByUserIdPayload = {
  userId: string
  success: (user: IUserReadable) => void
  onComplete: () => void
}
export type FetchUserByUserIdAction = {
  type: AdminActionTypes.FETCH_USER_BY_USER_ID
  payload: FetchUserByUserIdPayload
}

export const fetchUserByUserId = ({
  userId,
  success,
  onComplete,
}: FetchUserByUserIdPayload): FetchUserByUserIdAction => ({
  type: AdminActionTypes.FETCH_USER_BY_USER_ID,
  payload: { userId, success, onComplete },
})

// USERS
export const fetchAllUsersWithAdmin = () => ({
  type: AdminActionTypes.FETCH_USERS_ONGOING,
})

type FetchClientByClientIdPayload = {
  clientId: string
  onSuccess?: (client: IEulogiseClient) => void
}
export type FetchClientByClientIdAction = {
  type: AdminActionTypes.FETCH_CLIENT_BY_CLIENT_ID_ONGOING
  payload: FetchClientByClientIdPayload
}

export const fetchClientByClientId = (
  payload: FetchClientByClientIdPayload,
): FetchClientByClientIdAction => ({
  type: AdminActionTypes.FETCH_CLIENT_BY_CLIENT_ID_ONGOING,
  payload,
})

export const fetchUsersByClientId = (
  payload: FetchUsersByClientIdPayload,
): FetchUsersByClientIdAction => ({
  type: AdminActionTypes.FETCH_USERS_BY_CLIENT_ID,
  payload,
})

export type AdminCaseSearchPayload = {
  query: string
  onSuccess?: (cases: Array<IPortalCaseResponseItem>) => void
  onFailed?: () => void
}

export type AdminCaseSearchAction = {
  type: AdminActionTypes.ADMIN_CASE_SEARCH
  payload: AdminCaseSearchPayload
}

export const adminSearchCases = ({
  query,
  onSuccess,
  onFailed,
}: AdminCaseSearchPayload) => ({
  type: AdminActionTypes.ADMIN_CASE_SEARCH,
  payload: { query, onSuccess, onFailed },
})

export const removeFuneralDirectorFromClient = (
  payload: RemoveFuneralDirectorFromClientPayload,
): RemoveFuneralDirectorFromClientAction => ({
  type: AdminActionTypes.REMOVE_FUNERAL_DIRECTORY_FROM_CLIENT,
  payload,
})

export const updateClientById = (
  payload: UpdateClientByIdPayload,
): UpdateClientByIdAction => ({
  type: AdminActionTypes.UPDATE_CLIENT_BY_CLIENT_ID,
  payload,
})

// RESTORE THE STATE
export const restoreInitialStateWhenChangePage = () => ({
  type: AdminActionTypes.RESTORE_ADMIN_INITIAL_STATE,
})

// CLIENTS
export const fetchAllClientsWithAdmin = () => ({
  type: AdminActionTypes.FETCH_CLIENTS,
})

// CASES
export const fetchAllCasesWithAdmin = () => ({
  type: AdminActionTypes.ADMIN_FETCH_CASES,
})

// CREATE OR UPDATE CLIENT
export const createOrUpdateClient = (
  requestBody: IClientData,
): CreateOrUpdateClientAction => ({
  type: AdminActionTypes.CREATE_OR_UPDATE_CLIENT_ONGOING,
  payload: {
    requestBody,
  },
})

type ReeditProductPayload = {
  product: EulogiseProduct
  productId: string
  slug?: string
  region: EulogiseRegion
}

export type ReeditProductAction = {
  type: AdminActionTypes.REEDIT_PRODUCT
  payload: ReeditProductPayload
}

export const reeditProductAction = (
  payload: ReeditProductPayload,
): ReeditProductAction => ({
  type: AdminActionTypes.REEDIT_PRODUCT,
  payload,
})

type AddNoOfImagesToAdminByCaseIdPayload = {
  caseId: string
  noOfImages: number
}

export type AddNoOfImagesToAdminByCaseIdAction = {
  type: AdminActionTypes.ADD_NO_OF_IMAGES_TO_ADMIN_BY_CASE_ID
  payload: AddNoOfImagesToAdminByCaseIdPayload
}

export const addNoOfImagesToAdminByCaseId = (
  payload: AddNoOfImagesToAdminByCaseIdPayload,
): AddNoOfImagesToAdminByCaseIdAction => ({
  type: AdminActionTypes.ADD_NO_OF_IMAGES_TO_ADMIN_BY_CASE_ID,
  payload,
})

type UpdateAdminCaseByIdPayload = {
  caseId: string
  caseData: Partial<ICaseData>
}

export type UpdateAdminCaseByIdAction = {
  type: AdminActionTypes.UPDATE_ADMIN_CASE_BY_ID
  payload: UpdateAdminCaseByIdPayload
}

export const updateAdminCaseById = (payload: UpdateAdminCaseByIdPayload) => ({
  type: AdminActionTypes.UPDATE_ADMIN_CASE_BY_ID,
  payload,
})

type FetchFuneralDirectorsByCaseIdPayload = {
  caseId: string
  success: (funeralDirectors: Array<IEulogiseUser>) => void
  onComplete: () => void
}

export type FetchFuneralDirectorsByCaseIdAction = {
  type: AdminActionTypes.FETCH_FUNERAL_DIRECTORS_BY_CASE_ID
  payload: FetchFuneralDirectorsByCaseIdPayload
}

export const fetchFuneralDirectorsByCaseId = (
  payload: FetchFuneralDirectorsByCaseIdPayload,
): FetchFuneralDirectorsByCaseIdAction => ({
  type: AdminActionTypes.FETCH_FUNERAL_DIRECTORS_BY_CASE_ID,
  payload,
})

type AssignFuneralDirectorPayload = {
  caseId: string
  arrangerId: string
  arrangerName: string
}

export type AssignFuneralDirectorAction = {
  type: AdminActionTypes.ASSIGN_FUNERAL_DIRECTOR
  payload: AssignFuneralDirectorPayload
}

export const assignArranger = (payload: AssignFuneralDirectorPayload) => ({
  type: AdminActionTypes.ASSIGN_FUNERAL_DIRECTOR,
  payload,
})

type FetchCaseSummaryByCaseIdPayload = {
  caseId: string
  onSuccess: (params: { noOfInvites: number; noOfImages: number }) => void
  onComplete: () => void
}

export type FetchCaseSummaryByCaseIdAction = {
  type: AdminActionTypes.FETCH_CASE_SUMMARY_BY_CASE_ID
  payload: FetchCaseSummaryByCaseIdPayload
}

export const fetchCaseSummaryByCaseId = (
  payload: FetchCaseSummaryByCaseIdPayload,
): FetchCaseSummaryByCaseIdAction => ({
  type: AdminActionTypes.FETCH_CASE_SUMMARY_BY_CASE_ID,
  payload,
})

type ExportCasesReportPayload = {
  onComplete: () => void
}

export type ExportCasesReportAction = {
  type: AdminActionTypes.EXPORT_CASES_REPORT
  payload: ExportCasesReportPayload
}

export const exportCasesReport = (
  payload: ExportCasesReportPayload,
): ExportCasesReportAction => ({
  type: AdminActionTypes.EXPORT_CASES_REPORT,
  payload,
})
