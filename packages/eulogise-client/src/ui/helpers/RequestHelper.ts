import axios, { AxiosResponse, Method } from 'axios'
import { EulogiseClientConfig } from '@eulogise/client-core'
import {
  EulogiseProduct,
  EulogiseProductThemeMap,
  EulogiseRegion,
  EulogiseResource,
  ITheme,
  RemoveBackgroundImageMode,
} from '@eulogise/core'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { Notification } from '@eulogise/client-components'
import { PersistentStorageHelper } from './PersistentStorageHelper'
import {
  IAssetRequestData,
  ISlideshowData,
  ICardProductData,
  ICaseData,
  IClientData,
  IInviteData,
  IInviteUserData,
  EulogiseUserRole,
  PHOTOBOOK_DEFAULT_THEME,
} from '@eulogise/core'

/*
if (CONFIG.USE_MOCK) {
  require('../mock/mock')
}
*/

interface IRequestOption {
  method?: Method
  params?: any
  data?: any
}

const RequestHelper = {
  webtoken: PersistentStorageHelper.getAuthState()?.webtoken,
  originalRequest: axios,
  request: async (
    path: string,
    { method = 'GET', params, data }: IRequestOption,
  ): Promise<AxiosResponse<any>> => {
    try {
      const url: string = `${EulogiseClientConfig.EULOGISE_API_URL}${path}`
      const options: IRequestOption = {
        method,
        params,
        data,
      }
      return await axios(url, options)
    } catch (ex: any) {
      console.log('ex', ex, path, method, params, data)
      const errorMessage: string = ex?.response?.data?.error?.message
      if (errorMessage) {
        console.log('ex response data', errorMessage)
        Notification.error(errorMessage)
      }
      console.log('RequestHelper Exception', { path, method, params, data })
      throw new Error(ex)
    }
  },

  requestWithToken: async (
    path: string,
    requestOption: IRequestOption = {},
  ): Promise<AxiosResponse<any>> => {
    const { method = 'GET', params, data } = requestOption
    if (!RequestHelper.webtoken) {
      console.error('webtoken is not defined')
      // @ts-ignore
      return { data: [], hasWebToken: false }
    }
    return await RequestHelper.request(
      `${path}?webtoken=${RequestHelper.webtoken}`,
      {
        method,
        params,
        data,
      },
    )
  },

  fetchThemeById: async (
    themeId: string,
  ): Promise<{ data: { theme: ITheme } }> => {
    if (!themeId) {
      throw new Error('fetchThemeId: themeId cannot be undefined')
    }
    const resp = await RequestHelper.requestWithToken(`/v2/themes/${themeId}`)
    return {
      ...resp,
      data: {
        ...resp.data,
        theme: {
          ...resp.data?.theme,
          products: {
            ...resp.data?.theme?.products,
            [EulogiseProductThemeMap.PHOTOBOOK]: PHOTOBOOK_DEFAULT_THEME,
            /*PhotobookHelper.createPhotobookTheme({
                noOfPages: 24,
                imageAssets: [],
              }),*/
          },
        },
      },
    }
  },

  findResourceRequest: async ({
    resource,
    caseId,
    isShareFlow = false,
    additionalData,
  }: {
    resource: EulogiseResource
    caseId?: string
    isShareFlow?: boolean
    additionalData?: object
  }) => {
    const caseParams: any = caseId ? { case: caseId } : {}
    return await RequestHelper[isShareFlow ? 'request' : 'requestWithToken'](
      EulogiseEndpoint.FIND_RESOURCE,
      {
        method: 'POST',
        data: {
          resource,
          search: {
            ...caseParams,
            ...additionalData,
          },
        },
      },
    )
  },

  generateResourceRequest: async ({
    product,
    productId,
    data,
  }: {
    product: EulogiseProduct
    productId: string
    data: {
      generateUserId?: string
      isVideoBier?: boolean
      region?: EulogiseRegion
      slug?: string
    }
  }) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.GENERATE_RESOURCE.replace(
        /\{productType\}/,
        product,
      ).replace(/\{productId\}/, productId),
      {
        method: 'POST',
        data,
      },
    )
  },

  generateResourceRequestExt: async ({
    product,
    productId,
    data,
  }: {
    product: EulogiseProduct
    productId: string
    data: {
      generateUserId?: string
      isVideoBier?: boolean
      region?: EulogiseRegion
    }
  }) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.GENERATE_RESOURCE.replace(/^\/v2\//, '/v2-ext/')
        .replace(/\{productType\}/, product)
        .replace(/\{productId\}/, productId),
      {
        method: 'POST',
        data,
      },
    )
  },

  generatePreSignedUrlRequest: async (
    resource: EulogiseResource,
    data: object,
  ) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.GENERATE_PRE_SIGNED_URL,
      {
        method: 'POST',
        data,
      },
    )
  },

  saveResourceRequest: async (
    resource: EulogiseResource,
    item:
      | IAssetRequestData
      | ISlideshowData
      | IClientData
      | ICaseData
      | IInviteData
      | ICardProductData,
    options?: any,
  ) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.SAVE_RESOURCE,
      {
        method: 'POST',
        data: {
          resource,
          item,
          options,
        },
      },
    )
  },

  updateResourceRequest: async (
    resource: EulogiseResource,
    item:
      | Partial<IAssetRequestData>
      | Partial<ISlideshowData>
      | Partial<IClientData>
      | Partial<ICaseData>
      | Partial<IInviteData>
      | Partial<ICardProductData>,
  ) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.SAVE_RESOURCE,
      {
        method: 'POST',
        data: {
          resource,
          item,
          update: true,
        },
      },
    )
  },

  shareResourceRequest: async (
    caseId: string,
    role: EulogiseUserRole,
    userData?: IInviteUserData,
  ) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.SAVE_RESOURCE,
      {
        method: 'POST',
        data: {
          resource: EulogiseResource.INVITE,
          item: {
            ...userData,
            case: caseId,
            role,
          },
        },
      },
    )
  },

  removeResourceRequest: async ({
    resource,
    itemId,
    caseId,
  }: {
    resource: EulogiseResource
    itemId: string
    caseId?: string
  }) => {
    if (!itemId) {
      throw Error(`Remove ${resource} failed, no itemId provided!`)
    }
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.REMOVE_RESOURCE,
      {
        method: 'POST',
        data: {
          resource,
          search: {
            id: itemId,
            caseId,
          },
        },
      },
    )
  },

  removeResourceRequests: async (
    resource: EulogiseResource,
    itemIds: Array<string>,
  ) => {
    if (!itemIds || itemIds?.length === 0) {
      throw Error(
        `Remove ${resource} with multiple requests failed, no itemIds provided!`,
      )
    }
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.REMOVE_MULTIPLE_RESOURCE,
      {
        method: 'POST',
        data: {
          resource,
          search: {
            ids: itemIds,
          },
        },
      },
    )
  },

  removeImageBackgroundResource: async (
    resource: EulogiseResource,
    itemId: string,
    mode: RemoveBackgroundImageMode,
  ) => {
    if (!itemId) {
      throw Error(`Remove image background failed, no itemId provided!`)
    }
    if (!mode) {
      throw Error(`Remove image background failed, no mode provided!`)
    }
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.REMOVE_IMAGE_BACKGROUND,
      {
        method: 'POST',
        data: {
          resource,
          search: {
            id: itemId,
            mode,
          },
        },
      },
    )
  },

  inviteLinkRequest: async (email: string) => {
    return await RequestHelper.requestWithToken(`/v2/admin/invites`, {
      method: 'GET',
      params: { email },
    })
  },

  userShadowTokenRequest: async (
    resource: EulogiseResource,
    userId: string,
  ) => {
    return await RequestHelper.requestWithToken(
      EulogiseEndpoint.SHADOW_TOKEN_RESOURCE,
      {
        method: 'POST',
        data: {
          resource,
          user: userId,
        },
      },
    )
  },
}

export default RequestHelper
