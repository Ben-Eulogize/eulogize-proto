import { IFormValidationRules } from './Form.types'
import { FieldRules } from '../../Field'

export const MemorialDataPullFormRules: IFormValidationRules = {
  deceasedFullName: [FieldRules.required],
}
