import { RouteMiddleware } from '../middleware/RouteMiddleware'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
} from '../../../../types/routes.types'
import { ConnectionController } from '../../../controller/ConnectionController'
import { UserResourceController } from '../../../controller'
import { UtilHelper } from '@eulogise/helpers'

const getConnectionsByCaseId = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<any> => {
  console.log('getConnectionsByCaseId')
  const connections = await ConnectionController.getConnectionsByCaseId(
    pathParams.caseId,
  )
  if (connections.length === 0) {
    return {
      connections: [],
    }
  }
  console.log('getConnectionsByCaseId connections', connections)
  const userIds = connections.map((connection) => connection.user)
  console.log('getConnectionsByCaseId userIds', userIds)
  const users = await UserResourceController.findByUserIds(
    UtilHelper.uniq(userIds),
  )
  return {
    connections: connections.map((connection) => ({
      ...connection,
      user: users.find((user) => user.id === connection.user),
    })),
  }
}

export default {
  '/connections/:caseId': {
    GET: RouteMiddleware.loggedInUserMiddleware(getConnectionsByCaseId),
  },
}
