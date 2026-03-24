import {
  EulogiseCountry,
  EulogiseUserRole,
  IAllowPurchasingOption,
  IEulogiseEmbeddedIframeSettings,
  IEulogiseProductAvailabilityStatus,
  IEulogiseUser,
  IEulogizeFeatureAvailabilityStatus,
} from '@eulogise/core'
import { Item } from 'dynamoose/dist/Item'

export namespace IClientModel {
  export interface Director {
    fullName: string
    position: string
    email: string
    phone: string
    officePhone: string
  }
  export interface Schema {
    id?: string
    handle?: string
    title: string
    defaultClientSignUpText?: string
    primaryAddress: Array<string>
    additionalAddress: Array<Array<string>>
    createCaseFamilyInviteOptions: Array<string>
    country: EulogiseCountry
    clientSignUpDefaultUserRole?: EulogiseUserRole
    editorPaymentConfig?: string
    logo?: string
    clientEmailAsset?: string
    directors?: IClientModel.Director[]
    users?: string[]
    createdAt?: number
    updatedAt?: number
    clientBrandHandles?: Array<string>
    defaultProducts?: IEulogiseProductAvailabilityStatus
    availableProducts?: IEulogiseProductAvailabilityStatus
    features?: IEulogizeFeatureAvailabilityStatus
    embeddedIframes?: IEulogiseEmbeddedIframeSettings
    allowPurchasing?: IAllowPurchasingOption
    isDemoClient?: boolean
  }

  export type Model = Item & Schema
}

export type IUpdateClientRequestPayload = IClientModel.Schema & {
  funeralDirectors: Array<IEulogiseUser>
}

export type IUpdateClientResponsePayload = IClientModel.Schema & {
  funeralDirectors: Array<IEulogiseUser>
}
