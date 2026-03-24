import { Lambdur } from 'lambdur'

import * as Errors from '../../error'
import { Webtoken } from '../../../webtoken'
import { transactionModel } from '../../../database'

export class TransactionResourceController {
  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    switch (accountObj.role) {
      case 'customer':
        return TransactionResourceController.findAsCustomer({
          accountObj,
          search,
        })
      case 'admin':
        return TransactionResourceController.findAsAdmin({ accountObj, search })
      case 'client':
        return TransactionResourceController.findAsCustomer({
          accountObj,
          search,
        })
      case 'editor':
        return TransactionResourceController.findAsCustomer({
          accountObj,
          search,
        })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed('transaction'))
    }
  }

  public static async findAsCustomer({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const findQuery = {
      ...search,
      customer: accountObj.ref,
    }

    return transactionModel.query(findQuery)
  }

  public static async findAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const findQuery = {
      ...search,
    }

    return transactionModel.query(findQuery)
  }
}
