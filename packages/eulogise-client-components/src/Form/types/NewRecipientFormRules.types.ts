import { IFormValidationRules } from './Form.types'
import { FieldRules } from '../../Field'

export const NewRecipientFormRules: IFormValidationRules = {
  fullName: [FieldRules.required],
  email: [FieldRules.required, FieldRules.email],
}
