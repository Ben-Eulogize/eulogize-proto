import type { CreateCaseRequestPayloadBody } from '../externalRoutes/case'
import type { UpdateCaseRequestPayloadBody } from '../externalRoutes/updateCase'
import type { CreateClientRequestPayloadBody } from '../externalRoutes/client'
import type { AddFuneralDirectorRequestPayloadBody } from '../externalRoutes/funeralDirector'
import {
  addFuneralDirectorRequiredFiledKeys,
  createCaseAPIrequiredFieldKeys,
  createClientAPIRequiredFieldKeys,
  updateCaseAPIRequiredFieldKeys,
} from './constants'

export enum EXTERNAL_API {
  CREATE_CASE_DEPRECATING = 'createCase',
  CREATE_CASE = 'case',
  UPDATE_CASE = 'updateCase',
  CREATE_CLIENT = 'client',
  ADD_FUNERAL_DIRECTOR = 'funeralDirector',
}

export const EXTERNAL_API_PATH_MAP = {
  [EXTERNAL_API.CREATE_CASE_DEPRECATING]: `/v2/external/${EXTERNAL_API.CREATE_CASE_DEPRECATING}`,
  [EXTERNAL_API.CREATE_CASE]: `/v2/external/${EXTERNAL_API.CREATE_CASE}`,
  [EXTERNAL_API.UPDATE_CASE]: `/v2/external/cases/:caseId`,
  [EXTERNAL_API.CREATE_CLIENT]: `/v2/external/${EXTERNAL_API.CREATE_CLIENT}`,
  [EXTERNAL_API.ADD_FUNERAL_DIRECTOR]: `/v2/external/${EXTERNAL_API.ADD_FUNERAL_DIRECTOR}`,
}

export const EXTERNAL_API_ROUTE_PATH_MAPPING = Object.entries(
  EXTERNAL_API_PATH_MAP,
).reduce((acc, [key, value]) => {
  acc[value] = key as EXTERNAL_API
  return acc
}, {} as Record<string, EXTERNAL_API>)

export const EXTERNAL_API_NAME_ARRAY = Object.values(EXTERNAL_API).filter(
  (value) => isNaN(Number(value)),
)

export type ExtneralRoutesSchemaName =
  | EXTERNAL_API.CREATE_CASE_DEPRECATING
  | EXTERNAL_API.CREATE_CASE
  | EXTERNAL_API.UPDATE_CASE
  | EXTERNAL_API.CREATE_CLIENT
  | EXTERNAL_API.ADD_FUNERAL_DIRECTOR

export const isAllRequiredFieldValidSchemas = {
  [EXTERNAL_API.CREATE_CASE_DEPRECATING]: createCaseAPIrequiredFieldKeys,
  [EXTERNAL_API.CREATE_CASE]: createCaseAPIrequiredFieldKeys,
  [EXTERNAL_API.UPDATE_CASE]: updateCaseAPIRequiredFieldKeys,
  [EXTERNAL_API.CREATE_CLIENT]: createClientAPIRequiredFieldKeys,
  [EXTERNAL_API.ADD_FUNERAL_DIRECTOR]: addFuneralDirectorRequiredFiledKeys,
} as const

export type ExtneralRoutesPayloadMap = {
  [EXTERNAL_API.CREATE_CASE_DEPRECATING]: CreateCaseRequestPayloadBody
  [EXTERNAL_API.CREATE_CASE]: CreateCaseRequestPayloadBody
  [EXTERNAL_API.UPDATE_CASE]: UpdateCaseRequestPayloadBody
  [EXTERNAL_API.CREATE_CLIENT]: CreateClientRequestPayloadBody
  [EXTERNAL_API.ADD_FUNERAL_DIRECTOR]: AddFuneralDirectorRequestPayloadBody
}

export type RequiredFieldKeys = {
  [K in ExtneralRoutesSchemaName]: readonly (keyof ExtneralRoutesPayloadMap[K])[]
}

export interface NewFuneralDirectorDetails {
  name: string
  email: string
}
