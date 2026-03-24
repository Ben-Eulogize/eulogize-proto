import { IFormValidationRules } from './Form.types'
import { FieldRules } from '../../Field'

export const NewBackgroundFormRules: IFormValidationRules = {
  name: [FieldRules.required],
}
