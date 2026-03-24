import {
  IPaymentFormFields,
  IShareViaEmailFields,
  PersonalDetailsFormRules,
  ShareViaEmailFormRules,
  UpdatePasswordFormRules,
  CaseEditFormRules,
  IFormValidationRules,
  InviteFormRules,
  PaymentFormRules,
  MemorialDataPullFormRules,
  MemorialDataPullFormFields,
  ICreatCaseFormFields,
  CreateCaseFormRules,
} from './types'
import {
  ICaseEditFields,
  IInviteFields,
  INewBackgroundFormFields,
  IPersonalDetailFields,
  IUpdatePasswordFields,
} from '@eulogise/core'
import { FieldRules, IFieldValidationRule } from '../Field'
import { NewBackgroundFormRules } from './types/NewBackgroundForm.types'

const FormHelper = {
  validate: (
    rules: Array<IFieldValidationRule>,
    value: string | number,
  ): IFieldValidationRule | undefined => {
    for (const rule of rules) {
      if (!rule.validate(value)) {
        return rule
      }
    }
    return
  },

  validateForm: (
    fields: object,
    formRules: IFormValidationRules,
  ): {
    isValid: boolean
    validation: { [key: string]: IFieldValidationRule }
  } => {
    let retObj: { [key: string]: IFieldValidationRule } = {}
    for (const [key, rules] of Object.entries(formRules)) {
      const validationResult = FormHelper.validate(rules, (fields as any)[key])
      if (validationResult) {
        retObj[key] = validationResult
      }
    }
    return { isValid: Object.keys(retObj).length === 0, validation: retObj }
  },

  validatePaymentForm: (fields: IPaymentFormFields) => {
    return FormHelper.validateForm(fields, PaymentFormRules)
  },

  validateShareViaEmailForm: (fields: IShareViaEmailFields) => {
    return FormHelper.validateForm(fields, ShareViaEmailFormRules)
  },

  validateCreateNewCase: (fields: ICreatCaseFormFields) => {
    const hasFamilyMemberEmailInput = Boolean(fields.email?.trim())
    const formRules: IFormValidationRules = {
      ...CreateCaseFormRules,
      email: [FieldRules.email],
    }

    if (!hasFamilyMemberEmailInput) {
      delete formRules['role']
    }

    return FormHelper.validateForm(fields, formRules)
  },

  validatePersonalDetailsForm: (fields: IPersonalDetailFields) => {
    return FormHelper.validateForm(fields, PersonalDetailsFormRules)
  },

  validateUpdatePasswordForm: (fields: IUpdatePasswordFields) => {
    return FormHelper.validateForm(fields, UpdatePasswordFormRules)
  },

  validateCaseEditForm: (fields: ICaseEditFields) => {
    return FormHelper.validateForm(fields, CaseEditFormRules)
  },

  validateNewBackgroundForm: (fields: INewBackgroundFormFields) => {
    return FormHelper.validateForm(fields, NewBackgroundFormRules)
  },

  validateInviteForm: (fields: IInviteFields) => {
    return FormHelper.validateForm(fields, InviteFormRules)
  },
  validateMemorialDataPullForm: (fields: MemorialDataPullFormFields) => {
    return FormHelper.validateForm(fields, MemorialDataPullFormRules)
  },
}

export { FormHelper }
