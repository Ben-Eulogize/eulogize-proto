import { FieldRules } from '../../Field'
import { IFormValidationRules } from './Form.types'

export const PaymentFormRules: IFormValidationRules = {
  name: [FieldRules.required],
}
