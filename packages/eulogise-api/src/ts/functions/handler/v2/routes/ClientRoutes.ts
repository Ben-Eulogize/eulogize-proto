import { ClientResourceController } from '../../../controller'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import {
  IClientHandleRouteResponse,
  EulogiseUserRole,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'
import {
  IClientModel,
  IUpdateClientRequestPayload,
} from '../../../../database/types/ClientModel.types'
import { IUserModel } from '../../../../database/types/UserModel.types'
import { UtilHelper } from '@eulogise/helpers'
import {
  V2RouteContext,
  V2RouteDeleteRequestEvent,
  V2RouteGetRequestEvent,
  V2RoutePutRequestEvent,
} from '../../../../types/routes.types'
import { clientModel } from '../../../../database'

const getClientById = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { clientId: string },
): Promise<{ client: IClientModel.Schema }> => {
  const { clientId } = pathParams
  console.log('getClientById', clientId)
  const client = await ClientResourceController.findById(clientId)
  console.log('getClientById found client', client)
  return { client }
}

const updateClient = async (
  request: V2RoutePutRequestEvent<IUpdateClientRequestPayload>,
  context: V2RouteContext,
  pathParams: { clientId: string },
) => {
  const { clientId } = pathParams
  const body = request.body as IUpdateClientRequestPayload
  console.log('updateClient', { pathParams, body })
  try {
    await ClientResourceController.saveClient({
      ...body,
      id: clientId,
    })
    return { ok: true }
  } catch (error) {
    console.log('failed to update client', error)
    throw error
  }
}

const getClientUsersByClientId = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { clientId: string },
): Promise<{ users: Array<Partial<IUserModel.Schema>> }> => {
  const { clientId } = pathParams
  const users = await ClientResourceController.findUsersById(clientId)
  return {
    users: users.map((u) =>
      UtilHelper.omit(['password', 'shadowToken', 'token'], u),
    ),
  }
}

const getClientUsersFromToken = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
): Promise<{ users: Array<Partial<IUserModel.Schema>> }> => {
  const {
    webtoken: { ref: userId },
  } = request
  const client = await clientModel.findOneByUserId(userId)
  console.log('found client ', client)
  if (!client) {
    throw new Error(`Client (userId: ${userId}) not found`)
  }
  const users = await ClientResourceController.findUsersById(client.id!)
  return {
    users: users.map((u) =>
      UtilHelper.omit(['password', 'shadowToken', 'token'], u),
    ),
  }
}

const removeFuneralDirectoryByClientId = async (
  request: V2RouteDeleteRequestEvent,
  context: V2RouteContext,
  pathParams: {
    clientId: string
    userId: string
  },
): Promise<{ ok: boolean }> => {
  try {
    const { clientId, userId } = pathParams
    await ClientResourceController.removeUsersById(clientId, userId)
    return { ok: true }
  } catch (ex) {
    console.log('removeFuneralDirectoryByClientId Exception', ex)
    throw ex
  }
}

const isHandleExists = async (
  request: V2RouteDeleteRequestEvent,
  context: V2RouteContext,
  pathParams: { handle: string },
): Promise<{ exists: boolean }> => {
  try {
    console.log('isHandleExists request received')
    const { handle } = pathParams
    console.log('searching for handle', handle)
    const client = await ClientResourceController.findByHandle(handle)
    return { exists: !!client }
  } catch (ex) {
    console.log('isHandleExists Exception', ex)
    throw ex
  }
}

const getClientByHandle = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { handle: string },
): Promise<{
  client: IClientHandleRouteResponse
}> => {
  try {
    console.log('getClientByHandle request received')
    const { handle } = pathParams
    const client = await ClientResourceController.findByHandle(handle)
    if (!client) {
      throw new Error(`Client handle (${handle}) not found`)
    }
    const {
      id,
      country,
      logo,
      title,
      clientSignUpDefaultUserRole,
      editorPaymentConfig,
      defaultProducts,
      availableProducts,
      defaultClientSignUpText,
    } = client
    return {
      client: {
        id: id!,
        handle,
        country,
        logo,
        title,
        defaultProducts,
        availableProducts,
        clientSignUpDefaultUserRole,
        editorPaymentConfig: editorPaymentConfig as
          | EulogiseEditorPaymentConfig
          | undefined,
        defaultClientSignUpText,
      },
    }
  } catch (ex) {
    console.log('getClientByHandle request error', ex)
    throw ex
  }
}

export default {
  '/clients/handles/:handle': {
    GET: getClientByHandle,
  },
  '/admin/clients/handles/:handle/exists': {
    GET: isHandleExists,
  },
  '/admin/clients/:clientId': {
    GET: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      getClientById,
    ),
    PUT: RouteMiddleware.authMiddleware([EulogiseUserRole.ADMIN], updateClient),
  },
  '/admin/clients/:clientId/users': {
    GET: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      getClientUsersByClientId,
    ),
  },
  '/clients/users': {
    GET: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.CLIENT],
      getClientUsersFromToken,
    ),
  },
  '/admin/clients/:clientId/users/:userId': {
    DELETE: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      removeFuneralDirectoryByClientId,
    ),
  },
}
