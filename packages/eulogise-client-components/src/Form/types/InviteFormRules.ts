import { IFormValidationRules } from './Form.types'
import { FieldRules } from '../../Field'

export const InviteFormRules: IFormValidationRules = {
  fullName: [FieldRules.required],
  email: [FieldRules.required, FieldRules.email],
}
