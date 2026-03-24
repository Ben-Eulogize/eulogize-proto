import axios, { AxiosHeaders, Method } from 'axios'

type PassareOrganization = {
  organization_name: string
  organization_uuid: string
}

type PassareCaseOverview = {
  branch_name: string
  branch_uuid: string
  case_identifier: string
  case_types: Array<string>
  case_uuid: string
  created_at: string
  full_name: string
}

type PassareCaseObituary = {
  content: string
  primary_photo: string
  secondary_photo: string
  locked: boolean
  last_updated: string
  tribute_video: string
}

type PassarePerson = {
  decedent_uuid: string
  title: string
  first_name: string
  middle_name: string
  last_name: string
  suffix: string
  gender: string
  birth_date: string
}

type PassareDecedentPerson = {
  address: string | null
  death: string
  highest_rank: string | null
  obituary: PassareCaseObituary | null
  person: PassarePerson
  veteran: boolean
}

type PassareCaseEventLocationAddress = {
  address1: string
  address2: string
  city: string
  state: string
  zip: string
}

type PassareCaseEventLocation = {
  name: string
  address: PassareCaseEventLocationAddress
}

type PassareCaseEvent = {
  name: string
  location: PassareCaseEventLocation
  event_uuid: string
  last_updated: string
}

type PassareCaseDonation = {
  name: string
  website: string
  memorial_donation_uuid: string
  last_updated: string
}

type PasssareCaseAcquaintance = {
  acquaintance_uuid: string
  title: string
  first_name: string
  middle_name: string
  last_name: string
  last_name_at_birth: string
  suffix: string
  preferred_name_attribute: string
  gender: string
  display_name: string
  is_deceased: boolean
  relationship: string
  other_relationship_description: string
  birth_date: string
  acquaintance_types: Array<string> // acquaintance_types_uuid
  spouse_acquaintance_uuid: string
  address_uuid: string
  birth_address_uuid: string
  contact_information_uuid: string
  do_not_contact: boolean
}

export type PassareCaseAcquaintanceResponse = {
  acquaintances: Array<PasssareCaseAcquaintance>
}

export type PassareCase = {
  case_assigned_to: string
  case_identifier: string
  case_status: string | null
  case_types: Array<string>
  case_url: string
  case_uuid: string
  client_service_type_name: string | null
  custom_fields: Array<string>
  decedent_animal: string | null
  decedent_person: PassareDecedentPerson
  events: Array<PassareCaseEvent>
  memorial_donations: Array<PassareCaseDonation>
  pc_payment_link: string | null
  send_survey: boolean
}

type PassareCaseSearchResult = {
  items_per_page: number
  page: number
  records: Array<PassareCaseOverview>
  total_pages: number
  total_records: number
}

type PassareCaseObituarySearchResult = {
  case_uuid: string
  obituary: PassareCaseObituary
}

type PassareCaseSignedByPerson = {
  user_uuid: string
  first_name: string
  last_name: string
  correspondence_emails: string
  funeral_home_name: string
  avatar_image: string
}

type PassareCaseContractAddendum = {
  uuid: string
  signed_at: string
  exported_on: string
  signed_by: PassareCaseSignedByPerson
}

type PassareCaseContract = {
  uuid: string
  contract_date: string
  contract_total: number
  signed_at: string
  sent_to_accounting_at: string
  exported_on: string
  case_type: string
  addendums: Array<PassareCaseContractAddendum>
  signed_by: PassareCaseSignedByPerson
  sent_to_accounting_by: PassareCaseSignedByPerson
}

type PassareCaseEventFull = {
  name: string
  location_name: string
  location_address: PassareCaseEventLocationAddress
  date: string
  start_time: string
  end_time: string
  event_uuid: string
  last_updated: string
  public: boolean
  livestream_url: string
  has_livestream: boolean
}

type PassareCaseServiceResponse = {
  uuid: string
  events: Array<PassareCaseEventFull>
}

export class PassareClient {
  static BASE_URL = 'https://cap.passare.com'
  static BASE_PATH = '/api/public/v2'
  static API_KEY: string = process.env.PASSARE_API_KEY || ''

  public static async fetch(
    urlPath: string,
    options?: {
      method?: Method
      headers?: AxiosHeaders
      params?: Record<string, any>
      timeout?: number
    },
  ) {
    const resp = await axios({
      ...options,
      url: `${this.BASE_URL}${this.BASE_PATH}/${urlPath}`,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        ...options?.headers,
      },
    })
    return resp.data
  }

  public static async getOrganizations(): Promise<Array<PassareOrganization>> {
    return await this.fetch('/organizations')
  }

  public static async getCasesByOrgId(
    orgId: string,
  ): Promise<PassareCaseSearchResult> {
    return await this.fetch('/cases', {
      params: { organization_uuid: orgId },
      timeout: 10000,
    })
  }

  public static async getCaseById(caseId: string): Promise<Array<PassareCase>> {
    return await this.fetch(`/cases/${caseId}`, {})
  }

  public static async getCaseObituaryByCaseId(
    caseId: string,
  ): Promise<Array<PassareCaseObituarySearchResult>> {
    return await this.fetch(`/cases/${caseId}/obituary`)
  }

  public static async getCaseAcquaintancesByCaseId(
    caseId: string,
  ): Promise<PassareCaseAcquaintanceResponse> {
    return await this.fetch(`/cases/${caseId}/acquaintances`)
  }

  public static async getCaseContractsByCaseId(
    caseId: string,
  ): Promise<Array<PassareCaseContract>> {
    return await this.fetch(`/cases/${caseId}/contracts`)
  }

  public static async getCaseServicesByCaseId(
    caseId: string,
  ): Promise<Array<PassareCaseServiceResponse>> {
    return await this.fetch(`/cases/${caseId}/services`)
  }

  public static async getContactInformationById(contactId: string) {
    return await this.fetch(`/contact_informations/${contactId}`)
  }
}
