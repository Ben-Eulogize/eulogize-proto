import { invoiceModel } from '../../../database'
import { Webtoken } from '../../../webtoken'

import { Lambdur } from 'lambdur'

import * as Errors from '../../error'
import { IInvoiceModel } from '../../../database/types/InvoiceModel.types'

export class InvoiceResourceController {
  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    switch (accountObj.role) {
      case 'customer':
        return InvoiceResourceController.findAsCustomer({ accountObj, search })
      case 'admin':
        return InvoiceResourceController.findAsAdmin({ accountObj, search })
      case 'client':
        return InvoiceResourceController.findAsCase({ accountObj, search })
      case 'editor':
        return InvoiceResourceController.findAsCase({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed('invoice'))
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

    return invoiceModel.query(findQuery)
  }

  public static async findAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    if (search.case) {
      const findQuery = {
        case: search.case,
      }
      return invoiceModel.query(findQuery)
    }
    return invoiceModel.getAll({ cache: true })
  }

  public static async findAsCase({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    if (!search.case) {
      throw new Lambdur.Error(Errors.resource.find.badRequest('invoice'))
    }
    const findQuery = {
      case: search.case,
    }

    return invoiceModel.query(findQuery)
  }

  public static async save({
    accountObj,
    invoiceObj,
  }: {
    accountObj: Webtoken.Payload.Account
    invoiceObj: IInvoiceModel.Schema
  }): Promise<any> {
    switch (accountObj.role) {
      case 'admin':
        return InvoiceResourceController.saveAsAdmin({ accountObj, invoiceObj })
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed('invoice'))
    }
  }

  public static async saveAsAdmin({
    accountObj,
    invoiceObj,
  }: {
    accountObj: Webtoken.Payload.Account
    invoiceObj: IInvoiceModel.Schema
  }): Promise<any> {
    const saveQuery: IInvoiceModel.Schema = {
      ...invoiceObj,
    }

    return invoiceModel.save(saveQuery)
  }

  public static async remove({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    switch (accountObj.role) {
      case 'admin':
        return InvoiceResourceController.removeAsAdmin({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.remove.notAllowed('invoice'))
    }
  }

  public static async removeAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const removeQuery = {
      ...search,
    }

    return invoiceModel.remove(removeQuery)
  }
}
