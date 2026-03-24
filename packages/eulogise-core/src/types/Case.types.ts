import { IInvoice } from './Invoice.types'
import { IImageAssetContent } from './Assets.types'
import { MemorialVisualStatus } from './CardProduct.types'
import {
  EulogiseCountry,
  EulogiseRegion,
  EulogiseResource,
  IEulogiseProductAvailabilityStatus,
} from './Eulogise.types'
import { ConnectionActionTypes } from './Connection.types'
import {
  EulogiseEditorPaymentConfig,
  EulogiseUserRole,
  ResourceFileStatus,
} from './Resource.types'

export enum CaseActionTypes {
  UPDATE_CASE_EMAIL_INVITE_BY_ID = 'UPDATE_CASE_EMAIL_INVITE_BY_ID',
  CREATE_CASE = 'CREATE_CASE',
  RESET_CASE_STATE = 'RESET_CASE_STATE',
  SET_ACTIVE_CASE_BY_CASE_ID = 'SET_ACTIVE_CASE_BY_CASE_ID',
  SET_ACTIVE_CASE_BY_CASE_ID_SUCCESS = 'SET_ACTIVE_CASE_BY_CASE_ID_SUCCESS',
  FETCH_CASE_BY_ID = 'FETCH_CASE_BY_ID',
  FETCH_CASE_BY_ID_SUCCESS = 'FETCH_CASE_BY_ID_SUCCESS',
  FETCH_CASE_BY_ID_FAILED = 'FETCH_CASE_BY_ID_FAILED',
  FETCH_CASES = 'FETCH_CASES',
  FETCH_CASES_SUCCESS = 'FETCH_CASES_SUCCESS',
  FETCH_CASES_FAILED = 'FETCH_CASES_FAILED',
  SAVE_CASES_SUCCESS = 'SAVE_CASES_SUCCESS',
  CREATE_PAYMENT = 'CREATE_PAYMENT',
  CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS',
  CREATE_PAYMENT_FAILED = 'FAILED',
  CLEAR_ACTIVE_CASE = 'CLEAR_ACTIVE_CASE',
  CREATE_CASE_AS_CLIENT = 'CREATE_CASE_AS_CLIENT',
  CREATE_CASE_AS_CLIENT_SUCCESS = 'CREATE_CASE_AS_CLIENT_SUCCESS',
  CREATE_CASE_AS_CLIENT_FAILED = 'CREATE_CASE_AS_CLIENT_FAILED',
  UPDATE_CASE_BY_ID = 'UPDATE_CASE_BY_ID',
  UPDATE_CASE_BY_ID_SUCCESS = 'UPDATE_CASE_BY_ID_SUCCESS',
  UPDATE_CASE_BY_ID_FAILED = 'UPDATE_CASE_BY_ID_FAILED',
  UPDATE_CASE_HAS_SKIPPED_OR_FILLED_MEMORIAL_DATA_PULL_FORM_STATUS = 'UPDATE_CASE_HAS_SKIPPED_OR_FILLED_MEMORIAL_DATA_PULL_FORM_STATUS',
  UPDATE_HAS_ACCESSED_DOWNLOAD_PAGE_STATUS_AFTER_VISTIED_DOWNLOAD_PAGE = 'UPDATE_HAS_ACCESSED_DOWNLOAD_PAGE_STATUS_AFTER_VISTIED_DOWNLOAD_PAGE',
}

export interface ICaseAction {
  type: CaseActionTypes | ConnectionActionTypes
  payload?: {
    caseId?: string
    caseData?: ICase
    updatedCase?: ICase
    items?: Array<ICase>
    fetchedCase?: ICase
  }
}

export enum CaseStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  UNKNOWN = 'unknown',
}

export type CaseResourceItemResponse = Array<any>

export type CaseResourceRequestParam =
  | EulogiseResource
  | {
      name: EulogiseResource
      query: any
    }

export type CaseResourceRequestParams = Array<CaseResourceRequestParam>

export type CaseResourcesSearchResponse = Record<
  EulogiseResource,
  CaseResourceItemResponse
>

export interface ICase {
  id: string
  service: ICaseService
  client: string
  updatedAt: string
  status: CaseStatus
  createdAt: string
  deceased: ICaseDeceased
  customer: {
    id: string
    fullName: string
    email: string
  }
  invoice?: IInvoice
  inviteEmail?: ICaseInviteEmail
  editors: Array<any>
  funeralDirector: {
    password: string
    token: string
    role: EulogiseUserRole.CLIENT
    showOnBoardingHelperEveryTime: boolean
    updatedAt: string
    createdAt: string
    fullName: string
    id: string
    email: string
    verified: boolean
  }
  country: EulogiseCountry
  region: EulogiseRegion
  hasAccessedDownloadPage: boolean
  customisedImagesOrderIds: Array<string>
  enabledProducts?: IEulogiseProductAvailabilityStatus
  retainOnCleanup?: boolean
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
}

export interface ICaseInviteEmail {
  image: {
    filepath: string
    url: string
    default: boolean
  }
  greeting: string
  content: string
}

export interface ICaseEditFields {
  deceasedFullName?: string
  inviteEmail?: ICaseInviteEmail
  dateOfBirth?: string
  dateOfDeath?: string
  hasSkippedOrFilledMemorialDataPullForm?: boolean
  dateOfService?: string
  location?: string
  serviceStartTime?: string
  primaryImage?: IImageAssetContent
  customisedImagesOrderIds?: Array<string>
  enabledProducts?: IEulogiseProductAvailabilityStatus
  hasAccessedDownloadPage?: boolean
}

export interface ICaseService {
  timeStart?: number
  timeStartDisplay?: string
  timeEnd?: number
  timeEndDisplay?: string
  location?: string
  serviceStartTime?: string
}

export interface ICaseDeceased {
  fullName: string
  gender?: string
  dateOfBirth?: number
  dateOfBirthDisplay?: string // exact input that entered by the user and passed by the api
  dateOfDeath?: number
  dateOfDeathDisplay?: string // exact input that entered by the user and passed by the api
  hasSkippedOrFilledMemorialDataPullForm?: boolean
  primaryImage?: IImageAssetContent
}

export interface ICaseData {
  customer?: {
    email: string
    fullName: string
  }
  client?: string
  deceased: ICaseDeceased
  inviteEmail?: ICaseInviteEmail
  service?: ICaseService
  status?: CaseStatus
  region?: EulogiseRegion
  country?: EulogiseCountry
  enabledProducts?: IEulogiseProductAvailabilityStatus
  retainOnCleanup?: boolean
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
}

export interface ICaseState {
  isCreating?: boolean
  isUpdating?: boolean
  isFetching?: boolean
  items?: Array<ICase>
  activeItem?: ICase
}

export type IMemorialProductSummary = {
  ids: Array<string>
  activeId: string | null
  status: MemorialVisualStatus
  fileStatus: ResourceFileStatus
  hasGeneratedBefore: boolean
}

export type IPortalCaseResponseItem = {
  service: {
    timeEnd: number
    timeStart: number
    timeStartDisplay: string
  }
  updatedAt: string
  status: 'paid' | 'unpaid'
  createdAt: string
  deceased: {
    fullName: string
  }
  customer: string
  customerEmail: string
  clientName?: string
  editors: Array<string>
  id: string
  customerName: string
  funeralDirector: string
  funeralDirectorName: string
  booklet: IMemorialProductSummary
  bookmark: IMemorialProductSummary
  sidedCard: IMemorialProductSummary
  slideshow: IMemorialProductSummary
  thankyouCard: IMemorialProductSummary
  tvWelcomeScreen: IMemorialProductSummary
  photobook?: IMemorialProductSummary
  country: EulogiseCountry
  enabledProducts?: IEulogiseProductAvailabilityStatus
  retainOnCleanup?: boolean
}
