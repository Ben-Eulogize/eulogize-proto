import rp from 'request-promise-native'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import {
  BackgroundRestrictions,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  ICardProductBackgroundImageBase,
  ICardProductBackgroundStatus,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
  V2RoutePutRequestEvent,
} from '../../../../types/routes.types'
import { backgroundImageModel } from '../../../../database/model/backgroundImage'
import { caseModel, clientModel } from '../../../../database'
import { IBackgroundImageModel } from '../../../../database/types/BackgroundImageModel.types'
import { CONFIG } from '../../../../config/Config'
import { S3Helper } from '../../../../utils/S3Helper'
import { BackgroundImageHelper, ThemeHelper } from '@eulogise/helpers'
import { EditedBackgroundImageProcessPayload } from '@eulogise/generator/src/types/GeneratorProcessJob.types'

const getAllBackgroundImages = async (
  ev: V2RouteGetRequestEvent,
): Promise<{ backgroundImages: Array<IBackgroundImageModel.Schema> }> => {
  const role = ev.webtoken.role
  const userId = ev.webtoken.ref

  console.log('getAllBackgroundImages Role', role)
  let backgroundImages: Array<IBackgroundImageModel.Schema> = []
  switch (role) {
    case EulogiseUserRole.ADMIN: {
      backgroundImages = await backgroundImageModel.getAll()
      break
    }
    case EulogiseUserRole.CLIENT: {
      const { queryStringParameters } = ev
      console.log('queryStringParameters', queryStringParameters)
      const customerId = queryStringParameters?.customerId
      const client = await clientModel.findOneByUserId(userId)
      const clientId = client.id
      if (!clientId) {
        console.log('clientId is not found client', client)
        throw new Error('clientId is not found in client object')
      }
      console.log('client id', clientId)
      console.log('customer id', customerId)
      backgroundImages = await backgroundImageModel.getAllByClientId(
        clientId,
        customerId,
      )
      break
    }
    case EulogiseUserRole.CUSTOMER: {
      const cases = await caseModel.findByCustomerId(userId)
      if (cases.length === 0) {
        console.log('User does not have any cases', cases)
        throw new Error('User does not have any cases')
      }
      const firstCase = cases[0]
      const { customer, client } = firstCase
      if (!customer) {
        console.log('customerId is not found', firstCase)
        throw new Error('customerId is not found')
      }
      console.log('customer', customer)
      console.log('client', client)
      backgroundImages = await backgroundImageModel.getAllByCustomerId(
        customer,
        client,
      )
      break
    }
    case EulogiseUserRole.COEDITOR:
    case EulogiseUserRole.EDITOR: {
      const { customer, client } = await caseModel.findByEditorOrCoEditorId(
        userId,
      )
      // if it is client invited editor/coeditor, return all background images for that client
      if (client) {
        backgroundImages = await backgroundImageModel.getAllByClientId(
          client,
          customer,
        )
        break
      } else {
        backgroundImages = await backgroundImageModel.getAllByCustomerId(
          customer,
          client,
        )
      }
      break
    }
    default: {
      console.log('Role is not supported', role)
      throw new Error('Role is not supported')
    }
  }
  return {
    backgroundImages,
  }
}

const createBackgroundImage = async (
  event: V2RoutePostRequestEvent<{
    backgroundImage: Omit<ICardProductBackgroundImageBase, 'id'>
  }>,
): Promise<{ backgroundImage: IBackgroundImageModel.Schema }> => {
  const {
    webtoken: { role, ref: userId },
    body: { backgroundImage: submittedBackgroundImageData },
  } = event
  console.log('createBackgroundImage body', {
    submittedBackgroundImageData,
    role,
    userId,
  })
  if (!submittedBackgroundImageData) {
    console.log(
      'backgroundImageData is not found',
      submittedBackgroundImageData,
    )
    throw new Error('backgroundImageData is not found')
  }

  let newBackgroundImage: ICardProductBackgroundImageBase
  switch (role) {
    case EulogiseUserRole.ADMIN: {
      // do not need client id and customer id
      const { clientId, customerId, ...rest } = submittedBackgroundImageData
      newBackgroundImage = await backgroundImageModel.create(rest)
      break
    }
    case EulogiseUserRole.CLIENT: {
      const client = await clientModel.findOneByUserId(userId)
      // do not need clientId
      const { clientId, ...rest } = submittedBackgroundImageData
      newBackgroundImage = await backgroundImageModel.create({
        ...rest,
        clientId: client.id,
      })
      break
    }
    case EulogiseUserRole.CUSTOMER: {
      // do not need customer id. use customer id from token
      const { customerId, ...rest } = submittedBackgroundImageData
      newBackgroundImage = await backgroundImageModel.create({
        ...rest,
        customerId: userId,
        restrictions: BackgroundRestrictions.CUSTOMER_BASE,
      })

      break
    }
    case EulogiseUserRole.EDITOR:
    case EulogiseUserRole.COEDITOR: {
      const { customer, client } = await caseModel.findByEditorOrCoEditorId(
        userId,
      )
      newBackgroundImage = await backgroundImageModel.create({
        ...submittedBackgroundImageData,
        customerId: customer,
        clientId: client,
        restrictions: BackgroundRestrictions.CUSTOMER_BASE,
      })
      break
    }
    default: {
      console.log('Role is not supported', role) // 'Role is not supported
      throw new Error('Role is not supported')
    }
  }
  if (!newBackgroundImage.id) {
    console.log('newBackgroundImage.id is not found', newBackgroundImage)
    throw new Error('newBackgroundImage.id is not found')
  }

  const backgroundImageId = newBackgroundImage.id

  if (process.env.ENABLE_GENERATOR === 'true') {
    try {
      const requestOptions = {
        method: 'POST',
        uri: `${CONFIG.GENERATOR_API_URL}/generator/backgroundImages`,
        body: {
          backgroundImageId,
          image: submittedBackgroundImageData,
        },
        json: true,
      }
      console.log('createBackgroundImage sending to generator', requestOptions)
      await rp(requestOptions)
      console.log('createBackgroundImage sent to generator')
    } catch (ex) {
      console.log('createBackgroundImage error sending to generator', ex)
      throw new Error('Error sending to generator')
    }
  }

  return {
    backgroundImage: newBackgroundImage,
  }
}

const protectGlobalBackgroundImage = ({
  backgroundImage,
}: {
  backgroundImage: IBackgroundImageModel.Model
}) => {
  // check if the background image is a global background image
  const isGlobalBackgroundImage =
    !backgroundImage.clientId && !backgroundImage.customerId
  console.log('isGlobalBackgroundImage', isGlobalBackgroundImage)
  if (isGlobalBackgroundImage) {
    console.log('User is not allowed to update the global background image')
    throw new Error('User is not allowed to update the global background image')
  }
}

const updateBackgroundImageById = async (
  event: V2RoutePutRequestEvent<{
    backgroundImage: IBackgroundImageModel.Schema
    status: ICardProductBackgroundStatus
    regenerateProduct: EulogiseProduct
    regenerateProductRegion: EulogiseRegion
    genericProductType?: IGenericCardProductTypeData
  }>,
  context: V2RouteContext,
  pathParams: { backgroundImageId: string },
): Promise<{ backgroundImage: IBackgroundImageModel.Schema }> => {
  console.log('updateBackgroundImageById event', event)
  const {
    webtoken: { role, ref: userId },
    body: {
      status,
      backgroundImage: backgroundImageData,
      regenerateProductRegion,
      regenerateProduct,
      genericProductType,
    },
  } = event
  const { backgroundImageId } = pathParams

  let updatedBackgroundImage
  const existingBackgroundImage = await backgroundImageModel.findById(
    backgroundImageId,
  )

  console.log('updateBackgroundImageById by role', role)
  switch (role) {
    case EulogiseUserRole.ADMIN: {
      console.log(
        'updateBackgroundImageById updateById admin',
        backgroundImageId,
        {
          ...backgroundImageData,
          status,
        },
      )
      updatedBackgroundImage = await backgroundImageModel.updateById(
        backgroundImageId,
        {
          ...backgroundImageData,
          // only update status if user passed in status value
          ...(status ? { status } : {}),
        },
      )
      break
    }
    case EulogiseUserRole.CLIENT: {
      protectGlobalBackgroundImage({ backgroundImage: existingBackgroundImage })

      const client = await clientModel.findOneByUserId(userId)
      // check if the background image is belonged to the client
      if (existingBackgroundImage.clientId !== client.id) {
        console.log('Client is not allowed to update the background image', {
          clientId: client.id,
          imageClientId: existingBackgroundImage.clientId,
          backgroundImageId,
        })
        throw new Error('Client is not allowed to update the background image')
      }
      console.log(
        'updateBackgroundImageById updateById client',
        backgroundImageId,
        {
          ...backgroundImageData,
          status,
        },
      )
      updatedBackgroundImage = await backgroundImageModel.updateById(
        backgroundImageId,
        {
          ...backgroundImageData,
          // only update status if user passed in status value
          ...(status ? { status } : {}),
        },
      )
      break
    }
    case EulogiseUserRole.CUSTOMER: {
      protectGlobalBackgroundImage({ backgroundImage: existingBackgroundImage })

      // check if the background image is belonged to the customer
      if (existingBackgroundImage.customerId !== userId) {
        console.log('Customer is not allowed to update the background image', {
          imageClientId: existingBackgroundImage.clientId,
          backgroundImageId,
          customerId: userId,
        })
        throw new Error(
          'Customer is not allowed to update the background image',
        )
      }
      const { name } = backgroundImageData
      console.log(
        'updateBackgroundImageById updateById customer',
        backgroundImageId,
        {
          name,
          status,
        },
      )
      updatedBackgroundImage = await backgroundImageModel.updateById(
        backgroundImageId,
        {
          name,
          // only update status if user passed in status value
          ...(status ? { status } : {}),
        },
      )
      break
    }
    case EulogiseUserRole.EDITOR:
    case EulogiseUserRole.COEDITOR: {
      protectGlobalBackgroundImage({ backgroundImage: existingBackgroundImage })

      const foundCase = await caseModel.findByEditorOrCoEditorId(userId)

      console.log('existingBackgroundImage vs foundCase', {
        existingBackgroundImage,
        foundCase,
      })
      if (
        !(
          // if the background image is belonged to the customer
          (
            (existingBackgroundImage.customerId &&
              existingBackgroundImage.customerId === foundCase.customer) ||
            (existingBackgroundImage.clientId &&
              existingBackgroundImage.clientId === foundCase.client)
          )
        )
      ) {
        console.log(
          'CoEditor/Editor is not allowed to update the background image',
          {
            imageClientId: existingBackgroundImage.clientId,
            backgroundImageId,
            customerId: userId,
          },
        )
        throw new Error(
          'CoEditor/Editor is not allowed to update the background image',
        )
      }

      const { name } = backgroundImageData
      console.log(
        'updateBackgroundImageById updateById editor',
        backgroundImageId,
        {
          name,
          // only update status if user passed in status value
          ...(status ? { status } : {}),
        },
      )
      updatedBackgroundImage = await backgroundImageModel.updateById(
        backgroundImageId,
        {
          name,
          status,
        },
      )
      break
    }
    default: {
      console.log('Role is not supported', role) // 'Role is not supported
      throw new Error('Role is not supported')
    }
  }
  if (regenerateProduct && regenerateProductRegion) {
    const regenerateProductKey =
      ThemeHelper.getEulogiseProductThemeMapValueByProduct({
        product: regenerateProduct,
        region: regenerateProductRegion,
      })
    if (!regenerateProductKey) {
      throw new Error(
        `regenerateProductKey (${regenerateProduct} ${regenerateProductRegion}) is not found`,
      )
    }
    if (!backgroundImageData.productProperties) {
      throw new Error('backgroundImageData.productProperties is not found')
    }
    try {
      const requestOptions = {
        method: 'POST',
        uri: `${CONFIG.GENERATOR_API_URL}/generator/editedBackgroundImage`,
        body: {
          backgroundImageId,
          imageSizeAndPosition:
            backgroundImageData.productProperties[regenerateProductKey],
          product: regenerateProduct,
          genericProductType,
          region: regenerateProductRegion,
        } as EditedBackgroundImageProcessPayload,
        json: true,
      }
      console.log(
        'updateBackgroundImageById sending to generator',
        requestOptions,
      )
      await rp(requestOptions)
      console.log('updateBackgroundImageById sent to generator')
    } catch (ex) {
      console.log('createBackgroundImage error sending to generator', ex)
      throw new Error('Error sending to generator')
    }
  }

  return {
    backgroundImage: updatedBackgroundImage,
  }
}

const getBackgroundImageById = async (
  event: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { backgroundImageId: string },
) => {
  const { backgroundImageId } = pathParams
  const backgroundImage = await backgroundImageModel.findById(backgroundImageId)
  return {
    backgroundImage,
  }
}

const deleteBackgroundImageById = async (
  event: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { backgroundImageId: string },
) => {
  const { backgroundImageId } = pathParams
  await backgroundImageModel.remove({
    id: backgroundImageId,
  })
  await S3Helper.deleteObjectsInFolder({
    folderPrefix:
      BackgroundImageHelper.getBackgroundImagesPath(backgroundImageId),
  })
  return {}
}

const permitRoles = [
  EulogiseUserRole.ADMIN,
  EulogiseUserRole.CLIENT,
  EulogiseUserRole.CUSTOMER,
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.COEDITOR,
]
export default {
  '/backgroundImages': {
    GET: RouteMiddleware.authMiddleware(permitRoles, getAllBackgroundImages),
    POST: RouteMiddleware.authMiddleware(permitRoles, createBackgroundImage),
  },
  '/backgroundImages/:backgroundImageId': {
    PUT: RouteMiddleware.authMiddleware(permitRoles, updateBackgroundImageById),
    GET: RouteMiddleware.authMiddleware(permitRoles, getBackgroundImageById),
    DELETE: RouteMiddleware.authMiddleware(
      permitRoles,
      deleteBackgroundImageById,
    ),
  },
}
