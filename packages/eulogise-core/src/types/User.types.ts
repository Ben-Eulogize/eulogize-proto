import { EulogiseUserRole } from './Resource.types'

export type IUserReadable = {
  id: string
  fullName: string
  role: EulogiseUserRole
  email: string
}
