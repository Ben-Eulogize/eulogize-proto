export interface ICustomerInfoState {
  customerInfo: ICaseCustomerInfo | null
  isFetching: boolean
  isUpdating: boolean
  error: string | null
}

export interface ICaseCustomerInfo {
  id: string
  fullName: string
  email: string
}
