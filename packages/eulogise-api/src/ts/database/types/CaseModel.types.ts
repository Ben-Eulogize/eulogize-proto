import {
  EulogiseCountry,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'
import { Item } from 'dynamoose/dist/Item'

export namespace ICaseModel {
  export interface Deceased {
    fullName: string
    title?: string | null
    suffix?: string | null
    nickName?: string | null
    education?: string | null
    occupation?: string | null
    militaryService?: {
      branch?: string | null
      rank?: string | null
      dateEntered?: string | null
      dateEnteredDisplay?: number | null
      dateDischarged?: string | null
      dateDischargedDisplay?: number | null
      notes?: string | null
    }
    hasSkippedOrFilledMemorialDataPullForm?: boolean
    dateOfBirth?: number
    dateOfBirthDisplay?: string // exact input that entered by the user and passed by the api
    dateOfDeath?: number
    dateOfDeathDisplay?: string // exact input that entered by the user and passed by the api
    gender?: string
    primaryImage?: {
      filestackHandle: string
      filepath: string
      url: string
      width?: string
      height?: string
    }
  }
  export interface Service {
    type?: string
    funeralHome?: string
    serviceAddress?: string
    viewingLocation?: string
    viewingAddress?: string
    viewingDate?: string | null
    viewingDateDisplay?: number | null
    viewingTime?: string
    wakeLocation?: string
    wakeAddrfess?: string
    wakeDate?: string | null
    wakeDateDisplay?: number | null
    wakeTime?: string
    serviceConductedBy?: string
    serviceNotes?: string
    pallbearers?: string
    placeOfDisposition?: string
    timeStart?: number
    timeStartDisplay?: string // exact input that entered by the user and passed by the api
    timeEnd?: number
    timeEndDisplay?: string // exact input that entered by the user and passed by the api
    serviceLocation?: string
    serviceStartTime?: string
  }
  export interface FamilyDetails {
    spouseName?: string | null
    childrenNames?: string | null
    fathersName?: string | null
    mothersName?: string | null
  }
  export interface InviteEmail {
    content: string
    greeting: string
    image: {
      filestackHandle: string
      filepath: string
      url: string
    }
  }
  export interface InviteCustomer {
    email: string
    fullName: string
  }
  export interface Schema {
    id?: string
    client?: string
    funeralDirector?: any
    customer?: any
    deceased?: ICaseModel.Deceased
    familyDetails?: ICaseModel.FamilyDetails
    obituary?: string | null
    service?: ICaseModel.Service
    inviteEmail?: ICaseModel.InviteEmail
    status: 'unpaid' | 'paid'
    createdAt?: number
    updatedAt?: number
    editors?: [string]
    hasImages?: boolean
    retainOnCleanup?: boolean
    region?: string
    country?: EulogiseCountry
    hasAccessedDownloadPage?: Boolean
    customisedImagesOrderIds?: Array<String>
    enabledProducts?: IEulogiseProductAvailabilityStatus
    externalCaseId?: string
    createdByAPIKey?: string
    viaClientHandle?: string
    editorPaymentConfig?: string | null
    paymentProcessingLockId?: string | null
    paymentProcessingLockExpiresAt?: number
  }

  export enum Regions {
    AU = 'AU',
    USA = 'USA',
  }
  export type Model = Item & Schema
}
