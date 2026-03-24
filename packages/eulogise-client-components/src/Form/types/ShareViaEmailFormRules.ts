import { FieldRules } from '../../Field'
import { IFormValidationRules } from './Form.types'

export const ShareViaEmailFormRules: IFormValidationRules = {
  name: [FieldRules.required],
  email: [FieldRules.required, FieldRules.email],
}
