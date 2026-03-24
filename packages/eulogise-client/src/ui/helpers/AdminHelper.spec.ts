import { requestTokenResponses } from './__mocks__/RequestHelper'
jest.mock('./RequestHelper')

import {
  casesDataTransferHelper,
  clientDataTransferHelper,
  copyLoginLink,
  copyLoginLinkFromBrowser,
  fetchShadowTokenByUserId,
  filterCasesNameBySearchWords,
  filterClientsNameBySearchWords,
  filterUsersNameBySearchWords,
  formatMobileQRCodeMagicLinkWithInviteToken,
  formatMobileQRCodeMagicLinkWithShadowToken,
  getResponseFromUpdateLogo,
  isUserHasRegisteredChecker,
  makeMobileUploadImageQrCodeLinkByRole,
  normFile,
  renderTagColorByPaymentStatus,
  renderTagColorByRole,
  userDataTransferHelper,
} from './AdminHelper'
import {
  EulogiseUserRole,
  IEulogiseClient,
  IEulogiseUser,
  ExtractedPartialICase,
  ExtractedPartialIClient,
  ExtractedPartialIUser,
  PartialIClient,
  PartialIUser,
  CaseStatus,
  ICase,
} from '@eulogise/core'
import {
  MOCK_USERS,
  MOCK_CLIENTS,
  MOCK_CASES,
  ADMIN_EXTRACTED_PORTAL_MOCK_USERS,
  ADMIN_EXTRACTED_MOCK_CLIENTS,
  ADMIN_EXTRACTED_MOCK_CASES,
} from '@eulogise/mock'
import { COLOR } from '@eulogise/client-core'
import { EulogiseClientConfig } from '@eulogise/client-core'

window.prompt = jest.fn()

describe('Admin helper specs', () => {
  let result: any
  describe('userDataTransferHelper', () => {
    let rawUsersData: Array<IEulogiseUser> = []
    it('returns empty array if no rawUsersData', () => {
      result = userDataTransferHelper(rawUsersData)
      expect(result).toEqual([])
    })

    it('check keys if matched if there are any raw users data', () => {
      rawUsersData = MOCK_USERS
      result = userDataTransferHelper(rawUsersData)
      expect(result).not.toEqual([])
      expect(result).toHaveLength(rawUsersData.length)
      expect(result[0]).toHaveProperty('email')
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('joinedAt')
      expect(result[0]).toHaveProperty('key')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('role')
    })
  })

  describe('clientDataTransferHelper', () => {
    let rawClientsData: Array<IEulogiseClient> = []
    it('returns empty array if no rawClientsData', () => {
      result = clientDataTransferHelper(rawClientsData)
      expect(result).toEqual([])
    })

    it('check keys if matched if there are any raw clients data', () => {
      rawClientsData = MOCK_CLIENTS
      result = clientDataTransferHelper(rawClientsData)
      expect(result).not.toEqual([])
      expect(result).toHaveLength(rawClientsData.length)
      expect(result[0]).toHaveProperty('key')
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('users')
      expect(result[0]).toHaveProperty('brand')
      expect(result[0]).toHaveProperty('createdAt')
      expect(result[0]).toHaveProperty('stringifyUsers')
    })
  })

  describe('casesDataTransferHelper', () => {
    let rawCasesData: Array<ICase> = []
    it('returns empty array if no rawCasesData', () => {
      result = casesDataTransferHelper(rawCasesData)
      expect(result).toEqual([])
    })

    it('check keys if matched if there are any raw cases data', () => {
      rawCasesData = MOCK_CASES
      result = casesDataTransferHelper(rawCasesData)
      expect(result).not.toEqual([])
      expect(result).toHaveLength(rawCasesData.length)
      expect(result[0]).toHaveProperty('key')
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('status')
      expect(result[0]).toHaveProperty('customerFullName')
      expect(result[0]).toHaveProperty('deceasedName')
      expect(result[0]).toHaveProperty('createdAt')
      expect(result[0]).toHaveProperty('updatedAt')
      expect(result[0]).toHaveProperty('clientId')
      expect(result[0]).toHaveProperty('funeralFullName')
    })
  })

  describe('renderTagColorByRole', () => {
    let renderColor: string
    it('return correct color for admin', () => {
      renderColor = renderTagColorByRole(EulogiseUserRole.ADMIN)
      expect(renderColor).toEqual(COLOR.LIGHT_RED)
    })
    it('return correct color for client', () => {
      renderColor = renderTagColorByRole(EulogiseUserRole.CLIENT)
      expect(renderColor).toEqual(COLOR.GREEN)
    })
    it('return correct color for customer', () => {
      renderColor = renderTagColorByRole(EulogiseUserRole.CUSTOMER)
      expect(renderColor).toEqual(COLOR.CYAN)
    })
    it('return correct color for default', () => {
      renderColor = renderTagColorByRole(EulogiseUserRole.CONTRIBUTOR)
      expect(renderColor).toEqual(COLOR.BLACK)
    })
  })

  describe('renderTagColorByPaymentStatus', () => {
    let renderColor: string
    it('return correct color for CaseStatus.PAID', () => {
      renderColor = renderTagColorByPaymentStatus(CaseStatus.PAID)
      expect(renderColor).toEqual(COLOR.GREEN)
    })
    it('return correct color for CaseStatus.UNPAID', () => {
      renderColor = renderTagColorByPaymentStatus(CaseStatus.UNPAID)
      expect(renderColor).toEqual(COLOR.LIGHT_RED)
    })
    it('return correct color for default', () => {
      renderColor = renderTagColorByPaymentStatus(CaseStatus.UNKNOWN)
      expect(renderColor).toEqual(COLOR.BLACK)
    })
  })

  describe('filterUsersNameBySearchWords', () => {
    let users: Array<PartialIUser<ExtractedPartialIUser>> | undefined
    let searchWords: string
    it('return empty array if no user', () => {
      users = undefined
      searchWords = 'random search string'
      expect(filterUsersNameBySearchWords(users!, searchWords)).toEqual([])
    })
    it('return users if searchWord is empty', () => {
      users = ADMIN_EXTRACTED_PORTAL_MOCK_USERS
      searchWords = ''
      expect(
        filterUsersNameBySearchWords(
          ADMIN_EXTRACTED_PORTAL_MOCK_USERS,
          searchWords,
        ),
      ).toEqual(ADMIN_EXTRACTED_PORTAL_MOCK_USERS)
    })
    it('return users include the search words', () => {
      users = ADMIN_EXTRACTED_PORTAL_MOCK_USERS
      searchWords = MOCK_USERS[0].fullName.slice(0, 2)
      expect(
        filterUsersNameBySearchWords(
          ADMIN_EXTRACTED_PORTAL_MOCK_USERS,
          searchWords,
        ),
      ).toEqual(expect.arrayContaining([ADMIN_EXTRACTED_PORTAL_MOCK_USERS[0]]))
    })
  })

  describe('filterClientsNameBySearchWords', () => {
    let clients: Array<PartialIClient<ExtractedPartialIClient>> | undefined
    let searchWords: string
    it('return empty array if no client', () => {
      clients = undefined
      searchWords = 'random search string'
      expect(filterClientsNameBySearchWords(clients, searchWords)).toEqual([])
    })
    it('return clients if searchWord is empty', () => {
      clients = ADMIN_EXTRACTED_MOCK_CLIENTS
      searchWords = ''
      expect(
        filterClientsNameBySearchWords(
          ADMIN_EXTRACTED_MOCK_CLIENTS,
          searchWords,
        ),
      ).toEqual(ADMIN_EXTRACTED_MOCK_CLIENTS)
    })
    it('return clients include the search words', () => {
      clients = ADMIN_EXTRACTED_MOCK_CLIENTS
      searchWords = ADMIN_EXTRACTED_MOCK_CLIENTS[0].brand.slice(0, 2)
      expect(
        filterClientsNameBySearchWords(
          ADMIN_EXTRACTED_MOCK_CLIENTS,
          searchWords,
        ),
      ).toEqual(expect.arrayContaining([ADMIN_EXTRACTED_MOCK_CLIENTS[0]]))
    })
  })

  describe('filterCasesNameBySearchWords', () => {
    let cases: Array<PartialIClient<ExtractedPartialICase>> | undefined
    let searchWords: string
    it('return empty array if no case', () => {
      cases = undefined
      searchWords = 'random search string'
      expect(filterCasesNameBySearchWords(cases, searchWords)).toEqual([])
    })
    it('return cases if searchWord is empty', () => {
      cases = ADMIN_EXTRACTED_MOCK_CASES
      searchWords = ''
      expect(
        filterCasesNameBySearchWords(ADMIN_EXTRACTED_MOCK_CASES, searchWords),
      ).toEqual(ADMIN_EXTRACTED_MOCK_CASES)
    })
    it('return cases include the search words', () => {
      cases = ADMIN_EXTRACTED_MOCK_CASES
      searchWords = ADMIN_EXTRACTED_MOCK_CASES[0].deceasedName.slice(0, 2)
      expect(
        filterCasesNameBySearchWords(ADMIN_EXTRACTED_MOCK_CASES, searchWords),
      ).toEqual(expect.arrayContaining([ADMIN_EXTRACTED_MOCK_CASES[0]]))
    })
  })

  describe('normFile', () => {
    let e: any
    it('return e if normFile is an array', () => {
      e = [1, 2, 3]
      expect(normFile(e)).toEqual(e)
    })
    it('return fileList if e is not an array', () => {
      e = { fileList: 123 }
      expect(normFile(e)).toEqual(e.fileList)
    })
  })

  describe('isUserHasRegisteredChecker', () => {
    let userList: Array<IEulogiseUser> | undefined
    let userEmail: string | undefined
    it('returns true if no user in list', () => {
      userList = undefined
      userEmail = 'mock@gmail.com'
      expect(isUserHasRegisteredChecker(userList!, userEmail)).toEqual(true)
    })
    it('returns true if no userEmail as the parameter', () => {
      userList = MOCK_USERS
      userEmail = undefined
      expect(isUserHasRegisteredChecker(userList, userEmail!)).toEqual(true)
    })
    it('returns true if user email was found in list', () => {
      userList = MOCK_USERS
      userEmail = MOCK_USERS[0].email
      expect(isUserHasRegisteredChecker(userList, userEmail)).toEqual(true)
    })
    it('returns false if user email was not found in list', () => {
      userList = MOCK_USERS
      userEmail = MOCK_USERS[0].email + 'random letters'
      expect(isUserHasRegisteredChecker(userList, userEmail)).toEqual(false)
    })
  })

  describe('getResponseFromUpdateLogo', () => {
    let logoUploadingResponse: any
    let originalFileObject: any
    it('return original response if no original file object', () => {
      logoUploadingResponse = undefined
      expect(getResponseFromUpdateLogo(originalFileObject)).toEqual(
        Promise.resolve({}),
      )
    })
  })

  describe('fetchShadowTokenByUserId', () => {
    it('return token if passing the correct userId', async () => {
      const token = await fetchShadowTokenByUserId('existedUserId')
      expect(token).toEqual(requestTokenResponses.existedUserId.expect)
    })
    it('return error if passing the correct userId', async () => {
      const token = await fetchShadowTokenByUserId('nonExistedUserId')
      expect(token).toEqual(requestTokenResponses.nonExistedUserId.expect)
    })
  })

  describe('copyLoginLink', () => {
    let shadowToken
    it('return nothing if no userId was passed-in', async () => {
      shadowToken = await copyLoginLink(null)
      expect(shadowToken).toEqual(undefined)
    })
    it('return nothing if anything wrong happened inside, error message included', async () => {
      const token = await copyLoginLink('nonExistedUserId')
      expect(token).toEqual(undefined)
    })
  })

  describe('copyLoginLinkFromBrowser', () => {
    let shadowToken
    it('no error when passing the token', async () => {
      shadowToken = await copyLoginLinkFromBrowser(null)
      expect(shadowToken).toEqual(undefined)
    })

    it('generated the correct shared link', async () => {
      let token = 'token'
      shadowToken = await copyLoginLinkFromBrowser(token)
      expect(shadowToken).toEqual(
        `${EulogiseClientConfig.APP_ENDPOINT}/login?token=${token}`,
      )
    })
  })

  describe('formatMobileQRCodeMagicLinkWithInviteToken', () => {
    let inviteToken
    let formattedLink
    it('should return empty string if inviteToken is undefined', async () => {
      formattedLink = await formatMobileQRCodeMagicLinkWithInviteToken(
        undefined,
      )
      expect(formattedLink).toEqual(``)
    })

    it('should return empty string if inviteToken is null', async () => {
      formattedLink = await formatMobileQRCodeMagicLinkWithInviteToken(``)
      expect(formattedLink).toEqual(``)
    })

    it('should return correct link if inviteToken is valid', async () => {
      inviteToken = `token-123`
      formattedLink = await formatMobileQRCodeMagicLinkWithInviteToken(
        inviteToken,
      )
      expect(formattedLink).toEqual(
        `${EulogiseClientConfig.APP_ENDPOINT}/invite/?token=${inviteToken}&redirectTo=undefined`,
      )
    })
  })

  describe('formatMobileQRCodeMagicLinkWithShadowToken', () => {
    let shadowToken
    let formattedLink
    it('should return empty string if shadowToken is undefined', async () => {
      formattedLink = await formatMobileQRCodeMagicLinkWithShadowToken(
        undefined,
      )
      expect(formattedLink).toEqual(``)
    })

    it('should return empty string if inviteToken is null', async () => {
      formattedLink = await formatMobileQRCodeMagicLinkWithShadowToken(``)
      expect(formattedLink).toEqual(``)
    })

    it('should return correct link if inviteToken is valid', async () => {
      shadowToken = `token-123`
      formattedLink = await formatMobileQRCodeMagicLinkWithShadowToken(
        shadowToken,
      )
      expect(formattedLink).toEqual(
        `${EulogiseClientConfig.APP_ENDPOINT}/login/?token=${shadowToken}&redirectTo=undefined`,
      )
    })
  })

  describe('makeMobileUploadImageQrCodeLinkByRole', () => {
    let inviteToken = `invite-token-123`
    let formattedLink
    it('should return invite token login link if role is contributor', async () => {
      formattedLink = await makeMobileUploadImageQrCodeLinkByRole({
        role: EulogiseUserRole.CONTRIBUTOR,
        inviteToken,
      })
      expect(formattedLink).toEqual(
        `${EulogiseClientConfig.APP_ENDPOINT}/invite/?token=${inviteToken}&redirectTo=undefined`,
      )
    })

    it('should return shadow token login link if role is non-contributor', async () => {
      let shadowToken = `shadow-token-123`
      let formattedLink
      formattedLink = await makeMobileUploadImageQrCodeLinkByRole({
        role: EulogiseUserRole.CONTRIBUTOR,
        shadowToken,
      })
      expect(formattedLink).toEqual(
        `${EulogiseClientConfig.APP_ENDPOINT}/login/?token=${shadowToken}&redirectTo=undefined`,
      )
    })
  })
})
