import {
  V2RouteContext,
  V2RouteGetRequestEvent,
} from '../../../../types/routes.types'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { EulogiseUserRole } from '@eulogise/core'
import { InviteResourceController } from '../../../controller'

const getInviteLinkByEmail = async (
  request: V2RouteGetRequestEvent & {
    email: string
  },
  context: V2RouteContext,
): Promise<any> => {
  const email = request.queryStringParameters?.email
  if (!email) {
    throw new Error(`email is not specified`)
  }
  const link = await InviteResourceController.getInviteLinkByEmail(email)
  return {
    link,
  }
}

const permitRoles = [
  EulogiseUserRole.ADMIN,
  EulogiseUserRole.CLIENT,
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.COEDITOR,
]

export default {
  '/admin/invites': {
    GET: RouteMiddleware.authMiddleware(permitRoles, getInviteLinkByEmail),
  },
}
