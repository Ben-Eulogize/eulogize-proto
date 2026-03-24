import {
  EulogiseEditorPaymentConfig,
  EulogiseUserRole,
  IClientData,
  IEulogiseClient,
  IEulogiseUser,
} from './Resource.types'
import { ICase } from './Case.types'
import {
  EulogiseCountry,
  IEulogiseProductAvailabilityStatus,
  IRequestResponse,
} from './Eulogise.types'

export enum ClientActionTypes {
  FETCH_CLIENT = 'FETCH_CLIENT',
  FETCH_CLIENT_SUCCESS = 'FETCH_CLIENT_SUCCESS',
  FETCH_CLIENT_FAILED = 'FETCH_CLIENT_FAILED',
  FETCH_CLIENT_BY_HANDLE = 'FETCH_CLIENT_BY_HANDLE',
  FETCH_CLIENT_BY_HANDLE_SUCCESS = 'FETCH_CLIENT_BY_HANDLE_SUCCESS',
  FETCH_CLIENT_BY_HANDLE_FAILED = 'FETCH_CLIENT_BY_HANDLE_FAILED',
  FETCH_CLIENT_HANDLE_AVAILABILITY = 'FETCH_CLIENT_HANDLE_AVAILABILITY',
  FETCH_CLIENT_HANDLE_AVAILABILITY_SUCCESS = 'FETCH_CLIENT_HANDLE_AVAILABILITY_SUCCESS',
  FETCH_CLIENT_HANDLE_AVAILABILITY_FAILED = 'FETCH_CLIENT_HANDLE_AVAILABILITY_FAILED',
  DELETE_CLIENT = 'DELETE_CLIENT',
  DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS',
  DELETE_CLIENT_FAILED = 'DELETE_CLIENT_FAILED',
}

export type IClientHandleRouteResponse = {
  id: string
  handle: string
  country: EulogiseCountry
  logo?: string
  title: string
  clientSignUpDefaultUserRole?: EulogiseUserRole
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
  defaultProducts?: IEulogiseProductAvailabilityStatus
  availableProducts?: IEulogiseProductAvailabilityStatus
  defaultClientSignUpText?: string
}

export interface IClientAction {
  type: ClientActionTypes
  payload?: {
    clients?: Array<IEulogiseClient>
  }
}

export interface IClientUserDataset {
  clientData: IEulogiseClient
  userDataArray: Array<IEulogiseUser>
}

export enum IClientFamilyInviteOptions {
  EDITOR = 'EDITOR',
  EDITOR_HAS_TO_PAY = 'EDITOR_HAS_TO_PAY',
  CONTRIBUTOR = 'CONTRIBUTOR',
  COEDITOR = 'CO-EDITOR',
  DO_NOT_SEND_EMAIL = 'DO_NOT_SEND_EMAIL',
}

export interface IClientCreateOrEditRequestBody {
  id?: string
  handle?: string
  title: string
  primaryAddress: Array<string>
  additionalAddress?: Array<Array<string>>
  logo: string
  users: Array<string>
  country?: EulogiseCountry
  createCaseFamilyInviteOptions?: Array<IClientFamilyInviteOptions>
  defaultProducts?: IEulogiseProductAvailabilityStatus
  availableProducts?: IEulogiseProductAvailabilityStatus
}

export type PartialIUser<IEulogiseUser> = {
  [P in keyof IEulogiseUser]?: PartialIUser<IEulogiseUser[P]>
}

export type PartialIClient<IEulogiseClient> = {
  [P in keyof IEulogiseClient]?: PartialIClient<IEulogiseClient[P]>
}

export type PartialICase<ICase> = {
  [P in keyof ICase]?: PartialICase<ICase[P]>
}

export interface ExtractedPartialIUser extends PartialIUser<IEulogiseUser> {
  key: string
  name: string
}

export interface ExtractedPartialIClient
  extends PartialIClient<IEulogiseClient> {
  key: string
  brand: string
  stringifyUsers: string
}

export interface ExtractedPartialICase extends PartialIClient<ICase> {
  key: string
  deceasedName: string
}

export interface ICreateOrUpdateClientSaveResponse {
  items?: any
  count?: number
  ref: string
}

export interface ICreateOrUpdateClientResponse extends IRequestResponse {
  request: { body: IClientData }
  response: ICreateOrUpdateClientSaveResponse
}

export interface IClientState {
  items: Array<IEulogiseClient>
  activeClientUsers: Array<IEulogiseUser>
  activeItem?: IEulogiseClient
  isFetching: boolean
}

export interface IAllowPurchasingOption {
  printing: IAllowPurchasingProductOption
  videoBooks: IAllowPurchasingProductOption
  photoBooks: IAllowPurchasingProductOption
}

export interface IAllowPurchasingProductOption {
  [AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]: boolean
  [AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER]: boolean
}

export enum AllowPurchasingProductOptionKey {
  FUNERAL_HOME_CAN_ORDER = 'funeralHomeCanOrder',
  FAMILY_CAN_ORDER = 'familyCanOrder',
}
