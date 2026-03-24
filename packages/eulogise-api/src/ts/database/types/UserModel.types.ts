import { Item } from 'dynamoose/dist/Item'
import { EulogiseUserRole, IClientRole } from '@eulogise/core'

export namespace IUserModel {
  export interface InputSchema {
    id?: string
    fullName: string
    email: string
    phone?: string
    firstStreetAddress?: string
    secondStreetAddress?: string
    city?: string
    state?: string
    postcode?: string
    password?: string
    token?: string
    shadowToken?: string
    verified: boolean
    role: EulogiseUserRole
    showOnBoardingHelperEveryTime?: boolean
    acceptTerms?: boolean
    acceptMarketing?: boolean
    userGuideHelperConfig?: IUserModel.UserGuideHelperConfig
    stripe?: StripeMetadata
  }
  export interface Schema {
    id?: string
    fullName: string
    email: string
    phone: string
    clientRole?: IClientRole
    firstStreetAddress: string
    secondStreetAddress?: string
    city: string
    state: string
    postcode: string
    password?: string
    token: string
    shadowToken?: string
    verified: boolean
    role: EulogiseUserRole
    createdAt?: number
    updatedAt?: number
    showOnBoardingHelperEveryTime: boolean
    acceptTerms?: boolean
    acceptMarketing?: boolean
    userGuideHelperConfig?: IUserModel.UserGuideHelperConfig
    stripe?: StripeMetadata
  }
  export interface PublicSchema {
    id: string
    fullName: string
    email: string
    phone: string
    firstStreetAddress: string
    secondStreetAddress: string
    city: string
    state: string
    postcode: string
    password?: string
    verified: boolean
    role: string
    createdAt?: number
    updatedAt?: number
    showOnBoardingHelperEveryTime: boolean
    acceptTerms?: boolean
    acceptMarketing?: boolean
    userGuideHelperConfig?: IUserModel.UserGuideHelperConfig
    stripe?: StripeMetadata
  }

  export interface UserGuideHelperConfig {
    hasViewedClientDashboardPartOne?: boolean
    hasViewedClientDashboardPartTwo?: boolean
    hasViewedMemorialDashboard?: boolean
    hasViewedBooklet?: boolean
    hasViewedSlideshow?: boolean
  }

  export interface StripeMetadata {
    metadata: {
      customers: {
        id: string
      }
    }
  }

  export type Model = Item & Schema
}
