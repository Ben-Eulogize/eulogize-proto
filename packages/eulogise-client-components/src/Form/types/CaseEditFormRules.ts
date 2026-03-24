import { IFormValidationRules } from './Form.types'
import { FieldRules } from '../../Field'

export const CaseEditFormRules: IFormValidationRules = {
  deceasedFullName: [FieldRules.required],
}
