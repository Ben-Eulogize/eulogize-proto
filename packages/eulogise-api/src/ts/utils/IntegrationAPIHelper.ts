import {
  CaseStatus,
  EulogiseCountry,
  EulogiseCountryArray,
  EulogiseProduct,
  EulogiseUserRole,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'
import { Lambdur } from 'lambdur'
import * as Errors from '../functions/error'
import moment from 'moment'
import { AccountController } from '../functions/controller'
import { CONFIG } from '../config/Config'
import {
  ExtneralRoutesPayloadMap,
  ExtneralRoutesSchemaName,
  isAllRequiredFieldValidSchemas,
  RequiredFieldKeys,
} from '../functions/handler/v2/routes/utils/type'
import { NewFuneralDirectorDetails } from '../functions/handler/v2/routes/utils/type'

const validEnableProductsArray = [
  EulogiseProduct.BOOKLET,
  EulogiseProduct.BOOKMARK,
  EulogiseProduct.SIDED_CARD,
  EulogiseProduct.SLIDESHOW,
  EulogiseProduct.THANK_YOU_CARD,
  EulogiseProduct.TV_WELCOME_SCREEN,
  EulogiseProduct.PHOTOBOOK,
]

export class IntegrationAPIHelper {
  public static isValidEnableProducts(
    enabledProducts: IEulogiseProductAvailabilityStatus | undefined,
  ) {
    if (!enabledProducts || typeof enabledProducts !== 'object') {
      return false
    }

    for (const [product, shouldProductEnabled] of Object.entries(
      enabledProducts,
    )) {
      if (!validEnableProductsArray.includes(product as EulogiseProduct)) {
        throw new Lambdur.Error(
          Errors.externalAPIErrors.create.invalidEnabledProducts(),
        )
      }
      if (typeof shouldProductEnabled !== 'boolean') {
        throw new Lambdur.Error(
          Errors.externalAPIErrors.create.invalidEnabledProductsPermission(),
        )
      }
    }
    return true
  }

  public static getOverwriteEnabledProducts = ({
    defaultClientProducts,
    enabledProducts,
  }: {
    defaultClientProducts: IEulogiseProductAvailabilityStatus | undefined
    enabledProducts: IEulogiseProductAvailabilityStatus
  }) => {
    if (!defaultClientProducts) {
      return enabledProducts
    } else {
      let overwriteEnabledProducts = defaultClientProducts
      const keys = Object.keys(defaultClientProducts) as EulogiseProduct[]

      keys.forEach((product) => {
        if (
          enabledProducts.hasOwnProperty(product) &&
          typeof enabledProducts?.[product] === 'boolean'
        ) {
          overwriteEnabledProducts[product] = enabledProducts[product]
        }
      })
      return overwriteEnabledProducts
    }
  }

  public static getAllDefaultEnabledProducts = () => {
    return validEnableProductsArray.reduce((a, product) => {
      // DISABLE PHOTOBOOK
      if (product === EulogiseProduct.PHOTOBOOK) {
        return {
          ...a,
          [product]: false,
        }
      }
      return { ...a, [product]: true }
    }, {})
  }

  public static getOverwriteInviteAsFamilyRoleForNewAccount = ({
    inviteFamilyAs,
  }: {
    inviteFamilyAs: EulogiseUserRole | undefined
  }) => {
    if (!inviteFamilyAs) {
      return EulogiseUserRole.COEDITOR
    } else {
      switch (inviteFamilyAs) {
        case EulogiseUserRole.COEDITOR:
          return EulogiseUserRole.COEDITOR
        case EulogiseUserRole.EDITOR:
          return EulogiseUserRole.EDITOR
        case EulogiseUserRole.CONTRIBUTOR:
          return EulogiseUserRole.CUSTOMER
        default:
          throw new Lambdur.Error(
            Errors.externalAPIErrors.create.invalidInvitedFamilyAs(),
          )
      }
    }
  }

  public static getOverwriteInviteAsFamilyRoleForInvite = ({
    inviteFamilyAs,
  }: {
    inviteFamilyAs: EulogiseUserRole | undefined
  }) => {
    if (!inviteFamilyAs) {
      return EulogiseUserRole.COEDITOR
    } else {
      switch (inviteFamilyAs) {
        case EulogiseUserRole.COEDITOR:
          return EulogiseUserRole.COEDITOR
        case EulogiseUserRole.EDITOR:
          return EulogiseUserRole.EDITOR
        case EulogiseUserRole.CONTRIBUTOR:
          return EulogiseUserRole.CONTRIBUTOR
        default:
          throw new Lambdur.Error(
            Errors.externalAPIErrors.create.invalidInvitedFamilyAs(),
          )
      }
    }
  }

  public static getCaseStatusByInviteFamilyAsRole = ({
    inviteFamilyAs,
  }: {
    inviteFamilyAs: EulogiseUserRole | undefined
  }): CaseStatus => {
    switch (inviteFamilyAs) {
      case EulogiseUserRole.COEDITOR:
        return CaseStatus.UNPAID
      case EulogiseUserRole.EDITOR:
        return CaseStatus.PAID
      case EulogiseUserRole.CONTRIBUTOR:
        return CaseStatus.UNPAID
      default:
        return CaseStatus.UNPAID
    }
  }

  public static isAllRequiredFieldValid<
    T extends ExtneralRoutesSchemaName,
  >(params: { payload: ExtneralRoutesPayloadMap[T]; schemaName: T }): boolean {
    const { payload, schemaName } = params

    const requiredKeys =
      (isAllRequiredFieldValidSchemas?.[schemaName] as RequiredFieldKeys[T]) ??
      []

    return requiredKeys.every((fieldKey) => {
      const value = payload?.[fieldKey]
      if (value === undefined || value === null) {
        return false
      }

      if (typeof value === 'string') {
        return value !== ''
      }

      return true
    })
  }

  public static isEmailInputValid = ({
    email,
  }: {
    email: string | undefined
  }): boolean => {
    if (!email) {
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  public static isAllEmailInputsValid = ({
    emails,
  }: {
    emails: Array<string | undefined>
  }): boolean => {
    if (!emails || emails?.length <= 0) {
      return false
    }
    for (let index = 0; index < emails.length; index++) {
      const email = emails[index]
      const isValid = this.isEmailInputValid({ email })
      if (!isValid) {
        return false
      }
    }
    return true
  }

  // Valid Date Input Format: YYYY-MM-DD
  public static isDateInputValidISO = ({
    dateString,
  }: {
    dateString: string | undefined
  }): boolean => {
    if (!dateString) {
      return true
    }
    const timestampMS = moment(dateString, 'YYYY-MM-DD', true).valueOf()
    if (isNaN(timestampMS)) {
      return false
    }
    return true
  }

  public static isAllDateInputsValid = ({
    dateStringArray,
  }: {
    dateStringArray: Array<string | undefined>
  }): boolean => {
    let isValid = true
    dateStringArray.map((dateString) => {
      if (!dateString) {
        return
      }
      const isDateStringValid = this.isDateInputValidISO({ dateString })
      if (!isDateStringValid) {
        isValid = false
      }
    })

    return isValid
  }

  public static replaceLastOccurrenceAndReplaceWithIncrementedNumber = ({
    email,
  }: {
    email: string
  }): string => {
    // Define the regex to match the last occurrence of +digits@
    const regex = /\+\d+(?=@)(?!.*\+\d+(?=@))/

    // Find the last match using regex
    const match = email.match(regex)

    if (match) {
      // Extract the matched number part (without the +)
      const matchedText = match[0]

      const numberPart = matchedText.slice(1) // Remove the '+'

      // Increment the number
      const incrementedNumber = parseInt(numberPart, 10) + 1

      // Replace the last occurrence with the incremented number
      const incrementedText = `+${incrementedNumber}`

      // Replace only the last match with the incremented value
      return email.replace(regex, incrementedText)
    } else {
      // If no match is found, add a +1 before @ symbol
      const [emailAddressPrefix, emailAddressSuffix] = email.split('@')

      return `${emailAddressPrefix}+1@${emailAddressSuffix}`
    }
  }

  public static incrementEmailNumberSuffixRecursion = async ({
    isEmailTaken,
    checkIsTakenFn,
    email,
    recursionMax = 100,
  }: {
    isEmailTaken: boolean
    checkIsTakenFn: Function
    email: string
    recursionMax: number
  }): Promise<string> => {
    // recursion termination - when exhausted
    if (recursionMax < 0) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.emailRecurstionExhausted(),
      )
    }

    // recursion termination - when no fn passed or email is not taken
    if (!isEmailTaken || !checkIsTakenFn) {
      return email
    }

    const newEmail = this.replaceLastOccurrenceAndReplaceWithIncrementedNumber({
      email,
    })
    const isModifiedEmailTaken = await checkIsTakenFn(newEmail)

    // recursion
    return await this.incrementEmailNumberSuffixRecursion({
      isEmailTaken: isModifiedEmailTaken,
      checkIsTakenFn,
      email: newEmail,
      recursionMax: recursionMax - 1,
    })
  }

  public static getLoginOrInviteLinkByInviteAsFamily = ({
    newInviteRole,
    token,
  }: {
    newInviteRole: EulogiseUserRole
    token: string
  }) => {
    if (!newInviteRole || !token) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.failedToGenerateCaseInviteOrLoginLink({
          errMsg: 'Invalid parameter!',
        }),
      )
    }
    switch (newInviteRole) {
      case EulogiseUserRole.CONTRIBUTOR:
        return AccountController.formatClientCustomerContributorMagicLink(token)
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
        return `https://${CONFIG.EULOGISE_APP_DOMAIN}/login/?token=${token}`
      default:
        throw new Lambdur.Error(
          Errors.externalAPIErrors.create.failedToGenerateCaseInviteOrLoginLink(
            { errMsg: 'Invalid invite type!' },
          ),
        )
    }
  }

  public static getFuneralDirectorLoginLink = ({
    shadowToken,
  }: {
    shadowToken: string | undefined | null
  }): string => {
    if (!shadowToken) {
      return `https://${CONFIG.EULOGISE_APP_DOMAIN}`
    }
    return `https://${CONFIG.EULOGISE_APP_DOMAIN}/login/?token=${shadowToken}`
  }

  public static isFuneralDirectorCreateDetailValid = ({
    details,
  }: {
    details: NewFuneralDirectorDetails
  }): boolean => {
    return Object.values(details).every(
      (value) => value !== undefined && value !== null && value !== '',
    )
  }

  public static isCountryInputValid = ({
    country,
  }: {
    country: string
  }): boolean => {
    if (!country) {
      return false
    }
    if (!EulogiseCountryArray.includes(country as EulogiseCountry)) {
      return false
    }
    return true
  }
}
