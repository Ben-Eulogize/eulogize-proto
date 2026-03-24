import {
  IEulogiseFuneralDirectorInvite,
  IClientFamilyInviteOptions,
  EulogiseCountry,
  IEulogiseProductAvailabilityStatus,
  IEulogizeFeatureAvailabilityStatus,
  IEulogiseEmbeddedIframeSettings,
  EulogiseUserRole,
  IAllowPurchasingOption,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'

export type IClientFormSubmitValuesNew = {
  client?: string
  handle?: string
  title: string
  clientLogoDragger: Array<any>
  clientEmailAssetDragger: Array<any>
  pendingInvitedFuneralDirector: Array<IEulogiseFuneralDirectorInvite>
  country?: EulogiseCountry
  createCaseFamilyInviteOptions?: Array<IClientFamilyInviteOptions>
  clientBrandsDragger?: Array<any>
  primaryAddress: Array<string>
  additionalAddress: Array<Array<string>>
  defaultProducts: IEulogiseProductAvailabilityStatus
  availableProducts: IEulogiseProductAvailabilityStatus
  allowPurchasing: IAllowPurchasingOption
  clientSignUpDefaultUserRole?: EulogiseUserRole
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
  features: IEulogizeFeatureAvailabilityStatus
  embeddedIframes?: IEulogiseEmbeddedIframeSettings
  clientBrandHandles?: Array<string>
}

export type IClientFormInitialValues = {
  client?: string
  handle?: string
  title: string
  clientLogoDragger: Array<any>
  clientEmailAssetDragger: Array<any>
  pendingInvitedFuneralDirector: Array<IEulogiseFuneralDirectorInvite>
  country?: EulogiseCountry
  createCaseFamilyInviteOptions?: Array<IClientFamilyInviteOptions>
  clientSignUpDefaultUserRole?: EulogiseUserRole
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
  clientBrandsDragger: Array<string>
  primaryAddress: Array<string>
  additionalAddress: Array<Array<string>>
  defaultProducts: IEulogiseProductAvailabilityStatus
  availableProducts: IEulogiseProductAvailabilityStatus
  features: IEulogizeFeatureAvailabilityStatus
  embeddedIframes?: IEulogiseEmbeddedIframeSettings
  clientBrandHandles?: Array<string>
  allowPurchasing?: IAllowPurchasingOption
}
