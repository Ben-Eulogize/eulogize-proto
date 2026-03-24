import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { EulogiseUserRole, IUserReadable } from '@eulogise/core'
import {
  V2RouteContext,
  V2RouteDeleteRequestEvent,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
  V2RoutePutRequestEvent,
} from '../../../../types/routes.types'
import { caseModel, userModel } from '../../../../database'
import { AccountController } from '../../../controller'

const updateUserRole = async (
  request: V2RoutePutRequestEvent<{
    role: EulogiseUserRole
  }>,
  context: V2RouteContext,
  pathParams: { userId: string },
): Promise<{ ok: boolean; userId: string }> => {
  const {
    body: { role },
  } = request
  const { userId } = pathParams
  const user = await userModel.updateById(userId, { role })
  return { ok: true, userId: user.id! }
}

const getUserById = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { userId: string },
): Promise<{ user: IUserReadable }> => {
  const { userId } = pathParams
  const user = await userModel.findById(userId)
  const { fullName, id, role, email } = user
  return { user: { fullName, id: id!, role, email } }
}

const sendInviteByUserId = async (
  request: V2RoutePostRequestEvent<{}>,
  context: V2RouteContext,
  pathParams: { userId: string },
) => {
  const { userId } = pathParams
  const userObj = await userModel.findById(userId)
  const [caseObj] = await caseModel.findByCustomerId(userId)
  const deceasedFullName = caseObj.deceased?.fullName ?? ''
  try {
    await AccountController.sendSignUpEmail(userObj, deceasedFullName)
  } catch (error) {
    throw new Error(`Unable to send invite.`)
  }
  return { ok: true }
}

const deleteMyAccount = async (
  request: V2RouteDeleteRequestEvent,
  context: V2RouteContext,
): Promise<{ ok: boolean }> => {
  if (request.webtoken.type !== 'user') {
    throw new Error('Only signed-in user accounts can delete an account.')
  }
  const accountId = request.webtoken.ref
  if (!accountId) {
    throw new Error('Invalid account reference.')
  }
  await AccountController.deleteDirectCustomerAccount(accountId)
  return { ok: true }
}

export default {
  '/users/:userId/roles': {
    PUT: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN, EulogiseUserRole.CLIENT],
      updateUserRole,
    ),
  },
  '/users/:userId': {
    GET: RouteMiddleware.authMiddleware(
      [
        EulogiseUserRole.ADMIN,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.COEDITOR,
      ],
      getUserById,
    ),
  },
  '/users/:userId/sendInvite': {
    POST: RouteMiddleware.authMiddleware(
      [
        EulogiseUserRole.ADMIN,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.COEDITOR,
        EulogiseUserRole.EDITOR,
      ],
      sendInviteByUserId,
    ),
  },
  '/users/self/delete': {
    DELETE: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.CUSTOMER],
      deleteMyAccount,
    ),
  },
}
