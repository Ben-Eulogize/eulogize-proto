import { DateTimeHelper } from '@eulogise/helpers'
import {
  EulogiseUserRole,
  IEulogiseClient,
  IEulogiseUser,
  PartialIUser,
  ExtractedPartialIUser,
  PartialIClient,
  ExtractedPartialIClient,
  PartialICase,
  ExtractedPartialICase,
  IClientCreateOrEditRequestBody,
  CaseStatus,
  ICase,
  EulogiseResource,
  EulogisePage,
  IClientFamilyInviteOptions,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'
import { Notification } from '@eulogise/client-components'
import RequestHelper from './RequestHelper'
import { EulogiseClientConfig, COLOR } from '@eulogise/client-core'
import copy from 'copy-to-clipboard'
import { RcFile } from 'antd/lib/upload/interface'
import { NavigationHelper } from '@eulogise/helpers'
import { EulogiseCountry } from '@eulogise/core'
import { saveBrandFromFilestack } from '../store/AssetState/actions'

export const userDataTransferHelper = (
  rawUsersData: Array<IEulogiseUser>,
): Array<PartialIUser<IEulogiseUser>> => {
  if (rawUsersData.length === 0) {
    return []
  }
  return rawUsersData.map((user: IEulogiseUser, key: number) => {
    const { id, email, role, createdAt, fullName } = user
    const formattedDate = DateTimeHelper.formatISODate(createdAt.toString())
    return { key, id, email, role, joinedAt: formattedDate, name: fullName }
  })
}

// @ts-ignore
interface IEnhancedEulogiseClient extends IEulogiseClient {
  users: Array<IEulogiseUser>
}

export const clientDataTransferHelper = (
  rawClientsData: Array<IEulogiseClient>,
  rawUsers: Array<IEulogiseUser>,
): Array<PartialIClient<IEnhancedEulogiseClient>> => {
  if (rawClientsData.length === 0) {
    return []
  }
  return rawClientsData.map((client: IEulogiseClient, key: number) => {
    const {
      id,
      users: userIds,
      handle,
      title,
      createdAt,
      primaryAddress = [],
      additionalAddress = [],
      country = EulogiseCountry.AUSTRALIA,
    } = client
    const formattedDate = DateTimeHelper.formatISODate(createdAt.toString())
    return {
      key,
      id,
      handle,
      users: userIds.map((uid) => rawUsers.find((u) => uid === u.id)),
      brand: title,
      createdAt: formattedDate,
      primaryAddress: joinClientAddressLines(primaryAddress, ' '),
      additionalAddress: joinClientAddressLines(additionalAddress, ' '),
      country,
    }
  })
}

export const casesDataTransferHelper = (
  rawCasesData: Array<ICase>,
): Array<PartialICase<ICase>> => {
  if (rawCasesData.length === 0) {
    return []
  }
  return rawCasesData.map((c: ICase, key: number) => {
    const {
      id,
      status,
      customer,
      deceased,
      createdAt,
      updatedAt,
      client,
      funeralDirector,
    } = c
    const customerFullName = customer?.fullName ?? ''
    const deceasedFullName = deceased?.fullName ?? ''
    const funeralFullName = funeralDirector?.fullName ?? ''
    const clientId = client ?? 'No Client Id'
    const formattedCreatedAt = DateTimeHelper.formatISODate(
      createdAt.toString(),
    )
    const formattedUpdatedAt = DateTimeHelper.formatISODate(
      updatedAt.toString(),
    )
    return {
      key,
      id,
      status,
      customerFullName,
      deceasedName: deceasedFullName,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
      clientId,
      funeralFullName,
    }
  })
}

export const renderTagColorByRole = (role: EulogiseUserRole) => {
  switch (role) {
    case EulogiseUserRole.ADMIN:
      return COLOR.LIGHT_RED
    case EulogiseUserRole.CLIENT:
      return COLOR.GREEN
    case EulogiseUserRole.CUSTOMER:
      return COLOR.CYAN
    default:
      return COLOR.BLACK
  }
}

export const renderTagColorByPaymentStatus = (
  casePaymentStatus: CaseStatus,
) => {
  switch (casePaymentStatus) {
    case CaseStatus.PAID:
      return COLOR.GREEN
    case CaseStatus.UNPAID:
      return COLOR.LIGHT_RED
    default:
      return COLOR.BLACK
  }
}

export const fetchInviteTokenByEmail = async (email: string) => {
  try {
    const { data } = await RequestHelper.inviteLinkRequest(email)
    return data.link
  } catch (e) {
    return [null, e]
  }
}

export const fetchShadowTokenByUserId = async (userId: string) => {
  try {
    const { data } = await RequestHelper.userShadowTokenRequest(
      EulogiseResource.USER,
      userId,
    )
    // @ts-ignore
    const { token } = data
    return [token, null]
  } catch (e) {
    return [null, e]
  }
}

export const copyInviteLink = async (email: string) => {
  const inviteLink = await fetchInviteTokenByEmail(email)
  try {
    await navigator.clipboard.writeText(inviteLink)
    Notification.success('Link copied to clipboard')
  } catch (ex) {
    Notification.error('Cannot fetch link')
  }
}

export const copyLoginLink = async (userId: string) => {
  if (!userId) {
    return Notification.error('No user id copied')
  }
  const [shadowToken, error] = await fetchShadowTokenByUserId(userId)
  if (error) {
    return Notification.error('Could not copy link!')
  }
  await copyLoginLinkFromBrowser(shadowToken)
  return shadowToken
}

export const copyLoginLinkFromBrowser = async (token: string) => {
  if (!token) {
    return
  }
  const sharedLink = `${EulogiseClientConfig.APP_ENDPOINT}/login/?token=${token}`
  let requiredUserInteraction = false
  // Use browser API and fall back to copy-to-clipboard package if it fails
  try {
    await navigator.clipboard.writeText(sharedLink)
  } catch (e) {
    // Displays a prompt dialog when execCommand and IE fallback fails
    requiredUserInteraction = copy(sharedLink)
  }
  // Only show success notification when user interaction was required
  if (!requiredUserInteraction) {
    Notification.success('Link copied to clipboard')
  }
  return sharedLink
}

export const filterUsersNameBySearchWords = (
  users: Array<PartialIUser<ExtractedPartialIUser>>,
  searchWords: string,
): Array<PartialIUser<IEulogiseUser>> => {
  if (!users) {
    return []
  }
  if (searchWords == '') {
    return users
  }
  return users.filter(
    (user) =>
      new RegExp(searchWords, 'i').test(user.name) ||
      new RegExp(searchWords, 'i').test(user.email),
  )
}

export const filterClientsNameBySearchWords = (
  clients: Array<PartialIClient<ExtractedPartialIClient>>,
  searchWords: string,
): Array<PartialIClient<IEulogiseClient>> => {
  if (!clients) {
    return []
  }
  if (searchWords == '') {
    return clients
  }
  return clients.filter((client) =>
    new RegExp(searchWords, 'i').test(client.brand),
  )
}

export const filterCasesNameBySearchWords = (
  cases: Array<PartialIClient<ExtractedPartialICase>>,
  searchWords: string,
): Array<PartialIClient<ICase>> => {
  if (!cases) {
    return []
  }
  if (searchWords == '') {
    return cases
  }
  return cases.filter(
    (c) =>
      new RegExp(searchWords, 'i').test(c.deceased?.fullName) ||
      new RegExp(searchWords, 'i').test(c.customer?.fullName),
  )
}

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

export const isUserHasRegisteredChecker = (
  userList: Array<IEulogiseUser>,
  userEmail: string,
): boolean => {
  if (!userList) {
    Notification.error('users registration checker failed.')
    return true
  }
  if (!userEmail) {
    Notification.error('user email cannot be empty.')
    return true
  }
  if (userList.find((user) => user.email === userEmail)) {
    Notification.error(
      `Email ${userEmail} has been registered at Eulogize, please use another one.`,
    )
    return true
  }
  return false
}

export const uploadClientAsset = async (
  file: RcFile,
  assetS3FolderName: string,
) => {
  const filestackQueryParams = [
    `key=${process.env.GATSBY_FILESTACK_API_KEY}`,
    `path=/clients/${assetS3FolderName}/`,
    `container=${process.env.GATSBY_AWS_S3_BUCKET}`,
    `region=${process.env.GATSBY_AWS_REGION}`,
  ].join('&')
  const filestackUrl = `https://www.filestackapi.com/api/store/S3?${filestackQueryParams}`
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  }
  try {
    const uploadResponse = await fetch(filestackUrl, config)
    return await uploadResponse.clone().json()
  } catch (e) {
    Notification.error(`${assetS3FolderName} upload failed'!`)
    console.log('upload error', e)
  }
}

export const getResponseFromUpdateAsset = async (
  originalFileObject: RcFile,
  assetS3FolderName: string,
) => {
  let assetUploadingResponse
  if (originalFileObject) {
    assetUploadingResponse = await uploadClientAsset(
      originalFileObject,
      assetS3FolderName,
    )
  }
  return assetUploadingResponse
}

export const onCreateClientCancel = () => {
  NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
}

export const clientRequestBodyBuilderNew = ({
  client,
  title,
  handle,
  primaryAddress,
  additionalAddress,
  country,
  invitedFuneralDirectorIds,
  signUpNewFuneralDirectorIDs,
  originalLogoFilename,
  newLogoFilename,
  originalEmailAssetFilename,
  newEmailAssetFilename,
  createCaseFamilyInviteOptions,
  clientBrandHandles,
  defaultProducts,
  availableProducts,
}: {
  client?: string
  title: string
  handle?: string
  primaryAddress: Array<string>
  additionalAddress: Array<Array<string>>
  country?: EulogiseCountry
  originalLogoFilename: string
  newLogoFilename: string
  invitedFuneralDirectorIds: Array<string>
  signUpNewFuneralDirectorIDs: Array<string>
  originalEmailAssetFilename: string
  newEmailAssetFilename: string
  createCaseFamilyInviteOptions?: Array<IClientFamilyInviteOptions>
  clientBrandHandles?: Array<string>
  defaultProducts?: IEulogiseProductAvailabilityStatus
  availableProducts?: IEulogiseProductAvailabilityStatus
}): IClientCreateOrEditRequestBody => {
  // update the existed client
  if (client) {
    return {
      id: client,
      title,
      handle,
      primaryAddress,
      additionalAddress,
      country,
      logo: newLogoFilename ?? (originalLogoFilename || ''),
      emailAsset: newEmailAssetFilename ?? (originalEmailAssetFilename || ''),
      users: [...invitedFuneralDirectorIds, ...signUpNewFuneralDirectorIDs],
      createCaseFamilyInviteOptions,
      clientBrandHandles,
      defaultProducts,
      availableProducts,
    }
  }
  // create a new client
  return {
    title,
    handle,
    primaryAddress,
    additionalAddress,
    country,
    logo: newLogoFilename ?? '',
    clientEmailAsset: newEmailAssetFilename ?? '',
    users: signUpNewFuneralDirectorIDs,
    createCaseFamilyInviteOptions,
    clientBrandHandles,
    defaultProducts,
    availableProducts,
  }
}

export const getClientAssetUploadResponse = async (
  assetDragger: Array<any>,
  assetS3FolderName: string,
) => {
  const returnObj = {
    filename: null,
    filepath: null,
    filestackHandle: null,
    uploadedRes: {},
  }
  if (assetDragger?.length > 0) {
    try {
      const assetUploadingResponse = await getResponseFromUpdateAsset(
        assetDragger[0]?.originFileObj,
        assetS3FolderName,
      )
      const urlPrefix = `clients/${assetS3FolderName}/`
      returnObj.filename = assetUploadingResponse?.key?.replace(urlPrefix, '')
      returnObj.filestackHandle = assetUploadingResponse?.url?.replace(
        `${process.env.GATSBY_FILESTACK_CDN}/`,
        '',
      )
      returnObj.filepath = assetUploadingResponse?.key
      returnObj.uploadedRes = assetUploadingResponse
      return returnObj
    } catch (error) {
      console.log('getClientAssetUploadResponse error', error)
      return returnObj
    }
  }
  return returnObj
}

/**
 * Upload a product type asset to S3
 * Path: /productTypes/{filename}
 */
export const uploadProductTypeAsset = async (file: RcFile) => {
  const filestackQueryParams = [
    `key=${process.env.GATSBY_FILESTACK_API_KEY}`,
    `path=/productTypes/`,
    `container=${process.env.GATSBY_AWS_S3_BUCKET}`,
    `region=${process.env.GATSBY_AWS_REGION}`,
  ].join('&')
  const filestackUrl = `https://www.filestackapi.com/api/store/S3?${filestackQueryParams}`
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  }
  try {
    const uploadResponse = await fetch(filestackUrl, config)
    return await uploadResponse.clone().json()
  } catch (e) {
    Notification.error(`Product type image upload failed!`)
    console.log('upload error', e)
  }
}

/**
 * Get product type asset upload response
 * Returns the filename after stripping the S3 path prefix
 */
export const getProductTypeAssetUploadResponse = async (
  assetDragger: Array<any>,
) => {
  const returnObj = {
    filename: null as string | null,
    filepath: null as string | null,
    filestackHandle: null as string | null,
    uploadedRes: {} as any,
  }
  if (assetDragger?.length > 0) {
    try {
      const originalFileObj = assetDragger[0]?.originFileObj
      if (originalFileObj) {
        const assetUploadingResponse = await uploadProductTypeAsset(
          originalFileObj,
        )
        const urlPrefix = `productTypes/`
        returnObj.filename =
          assetUploadingResponse?.key?.replace(urlPrefix, '') ?? null
        returnObj.filestackHandle =
          assetUploadingResponse?.url?.replace(
            `${process.env.GATSBY_FILESTACK_CDN}/`,
            '',
          ) ?? null
        returnObj.filepath = assetUploadingResponse?.key ?? null
        returnObj.uploadedRes = assetUploadingResponse
      }
      return returnObj
    } catch (error) {
      console.log('getProductTypeAssetUploadResponse error', error)
      return returnObj
    }
  }
  return returnObj
}

export const formatMobileQRCodeMagicLinkWithInviteToken = (
  inviteToken?: string,
  redirectTo?: string,
) => {
  if (!inviteToken) {
    return ``
  }
  return `${EulogiseClientConfig.APP_ENDPOINT}/invite/?token=${inviteToken}&redirectTo=${redirectTo}`
}

export const formatMobileQRCodeMagicLinkWithShadowToken = (
  shadowToken?: string,
  redirectTo?: string,
) => {
  if (!shadowToken) {
    return ``
  }
  return `${EulogiseClientConfig.APP_ENDPOINT}/login/?token=${shadowToken}&redirectTo=${redirectTo}`
}

export const makeMobileUploadImageQrCodeLinkByRole = ({
  role,
  inviteToken,
  shadowToken,
  redirectTo,
}: {
  role?: EulogiseUserRole
  inviteToken?: string | null
  shadowToken?: string | null
  redirectTo?: string
}): string | null => {
  if (!role) {
    return null
  }
  if (shadowToken) {
    return formatMobileQRCodeMagicLinkWithShadowToken(shadowToken, redirectTo)
  }
  if (inviteToken) {
    return formatMobileQRCodeMagicLinkWithInviteToken(inviteToken, redirectTo)
  }
  return null
}

export const joinClientAddressLines = (
  addressLinesArray: Array<string>,
  optionalSeperator = ' ',
): string => {
  if (addressLinesArray?.length > 0) {
    return addressLinesArray
      .filter((line) => line?.length > 0)
      .join(optionalSeperator)
  }
  return ''
}

export class AdminHelper {
  public static getClientHandleUrl(clientHandle: string): string {
    return `${
      EulogiseClientConfig.APP_ENDPOINT
    }${EulogisePage.FUNERAL_HOME_LOGIN.replace(/:clientHandle/, clientHandle)}`
  }
}
