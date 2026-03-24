import axios, { Method } from 'axios'
import { GeneratorAuthHelper } from './GeneratorAuthHelper'
import { GENERATOR_CONFIG } from '../config'
import {
  EulogiseProduct,
  EulogiseResource,
  ISlideshowData,
  IAssetRequestData,
  IClientData,
  IInviteData,
  ICaseData,
  ICardProductData,
} from '@eulogise/core'

export const GeneratorApiRequestHelper = {
  findResource: async (resource: EulogiseResource, caseId: string) => {
    const webtoken = await GeneratorAuthHelper.getApiToken()
    const url = `${GENERATOR_CONFIG.API_URL}/v2/old/resource/find`
    const findResourceOption = {
      url,
      method: 'POST' as Method,
      params: {
        webtoken,
      },
      data: {
        resource,
        search: {
          case: caseId,
        },
      },
    }
    console.log('GeneratorApiRequestHelper.findResource', findResourceOption)
    const response = await axios(findResourceOption)
    console.log('GeneratorApiRequestHelper.findResource succeeded')
    return response.data
  },

  updateFileStatuses: async (params: {
    caseId: string
    product: EulogiseProduct
    productId: string
    fileStatusKey: string
    fileStatus: string
    slug?: string
  }): Promise<void> => {
    console.log('updateFileStatuses', params)
    const { caseId, product, productId, fileStatusKey, fileStatus, slug } =
      params
    const webtoken = await GeneratorAuthHelper.getApiToken()
    const url = `${GENERATOR_CONFIG.API_URL}/v2/admin/cases/${caseId}/${product}/${productId}/fileStatuses`

    const updateResourceOptions = {
      url,
      method: 'PUT' as Method,
      params: {
        webtoken,
      },
      data: {
        fileStatusKey,
        fileStatus,
        slug,
      },
    }
    console.log(
      'GeneratorApiRequestHelper.updateFileStatuses',
      updateResourceOptions,
    )
    const response = await axios(updateResourceOptions)
    console.log(
      'GeneratorApiRequestHelper.updateFileStatuses succeeded',
      updateResourceOptions,
    )
    return response.data
  },

  saveResource: async (
    resource: EulogiseResource,
    item:
      | IAssetRequestData
      | ISlideshowData
      | IClientData
      | ICaseData
      | IInviteData
      | ICardProductData,
  ) => {
    const webtoken = await GeneratorAuthHelper.getApiToken()
    const url = `${GENERATOR_CONFIG.API_URL}/v2/old/resource/save`

    const saveResourceOptions = {
      url,
      method: 'POST' as Method,
      params: {
        webtoken,
      },
      data: {
        resource,
        item,
      },
    }
    console.log('GeneratorApiRequestHelper.saveResource', saveResourceOptions)
    const response = await axios(saveResourceOptions)
    console.log(
      'GeneratorApiRequestHelper.saveResource succeeded',
      saveResourceOptions,
    )
    return response.data
  },

  sendGeneratedEmail: async (product: EulogiseProduct, caseId: string) => {
    const webtoken = await GeneratorAuthHelper.getApiToken()
    const url = `${GENERATOR_CONFIG.API_URL}/v2/admin/cases/${caseId}/${product}/sendGeneratedEmailByCaseId`

    const saveResourceOptions = {
      url,
      method: 'POST' as Method,
      params: {
        webtoken,
      },
    }
    console.log(
      'GeneratorApiRequestHelper.sendGeneratedEmail',
      saveResourceOptions,
    )
    const response = await axios(saveResourceOptions)
    console.log(
      'GeneratorApiRequestHelper.sendGeneratedEmail succeeded',
      saveResourceOptions,
    )
    return response.data
  },
}
