import { Lambdur } from 'lambdur'
import * as Errors from '../functions/error'
import { Webtoken } from '../webtoken'
import { caseModel, clientModel } from '../database'

/**
 * Enforcer function which checks if client should have access to the case they are requesting
 * Throws not allowed error
 * @param method function to call if access should be granted
 * @param resource name of resource
 */
export const clientCaseOwnerOnly = (
  method: (params: {
    accountObj: Webtoken.Payload.Account
    search: any
    isShouldSendEmail?: boolean
  }) => Promise<any>,
  resource: string,
) => {
  console.log('clientCaseOwnerOnly', method, resource)
  return async (params: {
    accountObj: Webtoken.Payload.Account
    search: any
    isShouldSendEmail?: boolean
  }) => {
    const { accountObj, search, isShouldSendEmail } = params
    if (!search.case) {
      throw new Error('Case id is required')
    }
    const [clientObj, caseObj] = await Promise.all([
      (await clientModel.query({ users: { contains: accountObj.ref } }))[0],
      await caseModel.findById(search.case),
    ])
    if (caseObj.client !== clientObj.id) {
      throw new Lambdur.Error(Errors.resource.find.notAllowed(resource))
    }
    return method({ accountObj, search, isShouldSendEmail })
  }
}
