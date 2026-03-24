import { IFieldValidationRule } from '../../Field'

export interface IFormValidationRules {
  [key: string]: Array<IFieldValidationRule>
}
