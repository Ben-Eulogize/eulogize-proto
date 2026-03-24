import { FieldRules } from '../../Field'
import { IFormValidationRules } from './Form.types'

export const UpdatePasswordFormRules: IFormValidationRules = {
  password: [FieldRules.required],
}
