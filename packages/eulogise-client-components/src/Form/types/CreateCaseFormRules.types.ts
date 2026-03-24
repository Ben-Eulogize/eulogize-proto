import { IFormValidationRules } from './Form.types'
import { FieldRules } from '../../Field'

export const CreateCaseFormRules: IFormValidationRules = {
  name: [FieldRules.required],
  email: [FieldRules.required, FieldRules.email],
  deceasedName: [FieldRules.required],
  role: [FieldRules.required],
}
