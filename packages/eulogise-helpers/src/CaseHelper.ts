import {
  EulogiseRegion,
  EulogiseCountry,
  ICase,
  INITIAL_DEFAULT_PRODUCTS,
  EulogiseProduct,
  IEulogiseProductAvailabilityStatus,
  IImageAssetContent,
} from '@eulogise/core'
import { DateTimeHelper } from './DateTimeHelper'

export enum CaseSearchType {
  EMAIL = 'EMAIL',
  UUID = 'UUID',
  PARTIAL_EMAIL = 'PARTIAL_EMAIL',
}

export class CaseHelper {
  public static getFrameFadedEdgesS3Path({
    caseId,
    fileName,
  }: {
    caseId: string
    fileName: string
  }): string {
    return `cases/${caseId}/fadedEdgeFrame/${fileName}`
  }

  public static getCaseReportS3Path() {
    return 'reports/caseReport.json'
  }

  public static getSearchType = (query: string): CaseSearchType | undefined => {
    const isEmailSearch =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(query)
    const isUuidSearch =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
        query,
      )
    if (isEmailSearch) {
      return CaseSearchType.EMAIL
    } else if (isUuidSearch) {
      return CaseSearchType.UUID
    }
    return CaseSearchType.PARTIAL_EMAIL
  }

  public static getEnabledProducts({ activeCase }: { activeCase: ICase }) {
    return activeCase?.enabledProducts ?? INITIAL_DEFAULT_PRODUCTS
  }

  public static getPrimaryImage({
    activeCase,
  }: {
    activeCase: ICase
  }): IImageAssetContent | undefined {
    const deceased = activeCase?.deceased
    return deceased.primaryImage
  }

  // Date of Birth
  public static getDateOfBirth(icase: ICase) {
    const deceased = icase?.deceased
    return deceased?.dateOfBirthDisplay ?? deceased?.dateOfBirth
  }

  public static getDateOfBirthDisplayInTime(icase: ICase) {
    const dob = this.getDateOfBirth(icase)
    if (dob) {
      return DateTimeHelper.toTime(dob)
    }
    return
  }

  public static getDateOfBirthDisplay(icase: ICase): string | undefined {
    const time = this.getDateOfBirthDisplayInTime(icase)
    if (time === undefined) {
      return
    }
    return DateTimeHelper.formatDate(time)
  }

  // Date of Death
  public static getDateOfDeath(icase: ICase) {
    const deceased = icase?.deceased
    return deceased?.dateOfDeathDisplay ?? deceased?.dateOfDeath
  }

  public static getDateOfDeathDisplayInTime(icase: ICase) {
    const dod = this.getDateOfDeath(icase)
    if (dod) {
      return DateTimeHelper.toTime(dod)
    }
    return
  }

  public static getDateOfDeathDisplay(icase: ICase): string | undefined {
    const time = this.getDateOfDeathDisplayInTime(icase)
    if (time === undefined) {
      return
    }
    return DateTimeHelper.formatDate(time)
  }

  // Service Date
  public static getDateOfService(icase: ICase) {
    const service = icase?.service
    return service?.timeStartDisplay ?? service?.timeStart
  }

  public static getDateOfServiceDisplayInTime(icase: ICase) {
    const timeStartDisplay = this.getDateOfService(icase)
    if (timeStartDisplay) {
      return DateTimeHelper.toTime(timeStartDisplay)
    }
    return
  }

  public static getDateOfServiceDisplay(icase: ICase): string | undefined {
    const time = this.getDateOfServiceDisplayInTime(icase)
    if (time === undefined) {
      return
    }
    return DateTimeHelper.formatDate(time)
  }

  public static getIsDisplayTwoColumns({ activeCase }: { activeCase: ICase }) {
    const noOfEnabledProducts = this.getNoOfEnabledProducts({ activeCase })
    return noOfEnabledProducts < 6 && noOfEnabledProducts % 2 === 0
  }

  public static getNoOfEnabledProducts({ activeCase }: { activeCase: ICase }) {
    const enabledProducts = {
      ...this.getEnabledProducts({ activeCase }),

      // remove photobook from the list
      PHOTOBOOK: false,
    }
    return enabledProducts
      ? Object.values(enabledProducts).filter(Boolean).length
      : 0
  }

  public static isProductEnabled({
    enabledProducts,
    productOrSlug,
  }: {
    enabledProducts: IEulogiseProductAvailabilityStatus
    productOrSlug: EulogiseProduct | string
  }): boolean {
    return !!enabledProducts?.[productOrSlug]
  }

  public static isCaseProductEnabled({
    activeCase,
    productOrSlug,
  }: {
    activeCase: ICase
    productOrSlug: EulogiseProduct | string
  }): boolean {
    const enabledProducts = this.getEnabledProducts({ activeCase })
    return this.isProductEnabled({ enabledProducts, productOrSlug })
  }

  public static getRegionByCountry({
    country,
  }: {
    country: EulogiseCountry
  }): EulogiseRegion {
    const US_REGION_COUNTRIES = [
      EulogiseCountry.UNITED_STATES,
      EulogiseCountry.CANADA,
      EulogiseCountry.CHILE,
      EulogiseCountry.COLOMBIA,
      EulogiseCountry.COSTA_RICA,
      EulogiseCountry.MEXICO,
      EulogiseCountry.PANAMA,
      EulogiseCountry.GUATEMALA,
      EulogiseCountry.THE_DOMINICAN_REPUBLIC,
      EulogiseCountry.THE_PHILIPPINES,
      EulogiseCountry.REST_OF_THE_WOLRD,
    ]
    if (US_REGION_COUNTRIES.includes(country)) {
      return EulogiseRegion.USA
    }
    return EulogiseRegion.AU
  }
}
