import { EulogiseUserRole } from '@eulogise/core'

export const createCaseAPIrequiredFieldKeys = [
  'deceasedName',
  'familyFirstAndLastName',
  'clientId',
]

export const updateCaseAPIRequiredFieldKeys = [] as const

export const createClientAPIRequiredFieldKeys = [
  'newClientName',
  'country',
  'funeralDirectors',
]

export const addFuneralDirectorRequiredFiledKeys = [
  'clientId',
  'newFuneralDirectorName',
  'newFuneralDirectorEmail',
]

export const validInvitedAsFamilyRoles = [
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.COEDITOR,
  EulogiseUserRole.CONTRIBUTOR,
]
