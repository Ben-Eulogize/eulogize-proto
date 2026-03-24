export interface IFieldValidationRule {
  validate: (value: string | number) => boolean
  message: string
}

export interface IFieldProps {
  className?: string
  placeholder?: string
  labelText?: string
  rules?: Array<IFieldValidationRule>
  onChange?: (
    ev: any,
    value: string | number,
    invalidRule?: IFieldValidationRule,
  ) => void
  value: string | number
  required?: boolean
  disabled?: boolean
  type?: string
}
