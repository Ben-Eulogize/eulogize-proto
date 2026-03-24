import { IFieldValidationRule } from './Field.types'

export const FieldRules: { [key: string]: IFieldValidationRule } = {
  required: {
    validate: (v: string) => v?.trim?.().length > 0,
    message: '* required',
  },
  email: {
    validate: (v: string) => {
      if (!v) {
        return true
      }
      return /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/.test(
        v,
      )
    },
    message: '* invalid email',
  },
  mobile: {
    validate: (v: string) => /^04[0-9]{8}$/.test(v),
    message: '* 10 digits',
  },
  monthYearLong: {
    validate: (v: string): boolean =>
      /(^0[1-9]\/20[0-9]{2}$|^10\/20[0-9]{2}$|^11\/20[0-9]{2}$|^12\/20[0-9]{2}$)/.test(
        v,
      ),
    message: '* MM/YYYY format',
  },
  monthYearShort: {
    validate: (v: string): boolean =>
      /(^0[1-9]\/[0-9]{2}$|^10\/[0-9]{2}$|^11\/[0-9]{2}$|^12\/[0-9]{2}$)/.test(
        v,
      ),
    message: '* MM/YY format',
  },
  creditCardCVC: {
    validate: (v: string): boolean => /^[0-9]{3}$/.test(v),
    message: '* 3 digits',
  },
  creditCardNo: {
    validate: (v: string): boolean => /^[0-9]{16}$/.test(v),
    message: '* 16 digits',
  },
  creditCardname: {
    validate: (v: string) => v?.trim?.().length > 0,
    message: 'Please input correct card holder name!',
  },
}
