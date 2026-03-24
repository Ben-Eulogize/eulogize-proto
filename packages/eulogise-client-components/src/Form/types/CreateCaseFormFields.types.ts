import {
  EulogiseCountry,
  EulogiseEditorPaymentConfig,
  EulogiseUserRole,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'

export interface ICreatCaseFormFields {
  name: string
  email: string
  deceasedName: string
  dateOfService?: string
  dateOfBirth: string
  dateOfDeath: string
  location: string
  serviceStartTime: string
  country?: EulogiseCountry
  role?: EulogiseUserRole
  enabledProducts?: IEulogiseProductAvailabilityStatus
  editorPaymentConfig?: EulogiseEditorPaymentConfig
}
