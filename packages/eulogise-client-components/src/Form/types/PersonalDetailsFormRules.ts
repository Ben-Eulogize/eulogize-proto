import { FieldRules } from '../../Field'
import { IFormValidationRules } from './Form.types'

export const PersonalDetailsFormRules: IFormValidationRules = {
  fullName: [FieldRules.required],
}
