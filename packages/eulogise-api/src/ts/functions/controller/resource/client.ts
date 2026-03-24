import { Lambdur } from 'lambdur'
import BBPromise from 'bluebird'

import * as Errors from '../../error'
import { Webtoken } from '../../../webtoken'
import {
  IClientModel,
  IUpdateClientRequestPayload,
  IUpdateClientResponsePayload,
} from '../../../database/types/ClientModel.types'
import { ICaseModel } from '../../../database/types/CaseModel.types'
import {
  caseModel,
  clientModel,
  inviteModel,
  userModel,
} from '../../../database'
import { IUserModel } from '../../../database/types/UserModel.types'
import {
  EulogiseProduct,
  EulogiseUserRole,
  IEulogiseProductAvailabilityStatus,
  IEulogiseUser,
} from '@eulogise/core'

export class ClientResourceController {
  public static async findByHandle(
    handle: string,
  ): Promise<IClientModel.Model | undefined> {
    return await clientModel.findOneByHandle(handle)
  }

  public static async findById(clientId: string): Promise<IClientModel.Schema> {
    return clientModel.findById(clientId)
  }

  public static async findUsersById(
    clientId: string,
  ): Promise<Array<IUserModel.Schema>> {
    const client = await clientModel.findById(clientId)
    console.log('found client', client)
    const userIds = Array.from(client.users as any).filter((uid) => uid)
    console.log('findUsersById', { userIds })
    if (userIds?.length > 0) {
      return await BBPromise.map(userIds, (userId: string) => {
        return userModel.findById(userId)
      })
    }
    return []
  }

  public static async removeUsersById(
    clientId: string,
    userId: string,
  ): Promise<void> {
    const client = await clientModel.findById(clientId)
    const newUsers = Array.from(client.users!).filter((uId) => uId !== userId)
    if (newUsers.length === 0) {
      // assign dummy value as DynamoDb does not happy with empty set
      client.users = ['']
    } else {
      client.users = newUsers
    }

    await client.save()
  }

  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<ICaseModel.Model[]> {
    switch (accountObj.role) {
      case EulogiseUserRole.VISITOR_BOOKLET:
      case EulogiseUserRole.VISITOR_SLIDESHOW:
      case EulogiseUserRole.VISITOR_SIDED_CARD:
      case EulogiseUserRole.VISITOR_BOOKMARK:
      case EulogiseUserRole.VISITOR_THANKYOUCARD:
      case EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN:
      case EulogiseUserRole.VISITOR_PHOTOBOOK:
      case EulogiseUserRole.CONTRIBUTOR:
        return ClientResourceController.findAsVisitorOrContributor({
          accountObj,
          search,
        })
      case EulogiseUserRole.COEDITOR:
        return ClientResourceController.findAsCoEditor({ accountObj, search })
      case EulogiseUserRole.EDITOR:
        return ClientResourceController.findAsEditor({ accountObj, search })
      case EulogiseUserRole.CUSTOMER:
        return ClientResourceController.findAsCustomer({ accountObj, search })
      case EulogiseUserRole.CLIENT:
        return ClientResourceController.findAsClient({ accountObj, search })
      case EulogiseUserRole.ADMIN:
        return ClientResourceController.findAsAdmin({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed('client'))
    }
  }

  public static async findAsVisitorOrContributor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const inviteObj = await inviteModel.findById(accountObj.ref)
    const caseObj = await caseModel.findById(inviteObj.case!)

    if (!caseObj.client) {
      return []
    }

    const findQuery = {
      ...search,
      id: caseObj.client,
    }

    return clientModel.query(findQuery)
  }

  public static async findAsCoEditor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObjs = await inviteModel.findByEmail(userObj.email)
    const inviteObj = inviteObjs.filter(
      (i) => i.role === EulogiseUserRole.COEDITOR,
    )?.[0]

    if (!inviteObj) {
      return []
    }
    const caseObj = await caseModel.findById(inviteObj.case!)

    if (!caseObj.client) {
      return []
    }

    const findQuery = {
      ...search,
      id: caseObj.client,
    }

    return clientModel.query(findQuery)
  }

  public static async findAsEditor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObjs = await inviteModel.findByEmail(userObj.email)
    const inviteObj = inviteObjs.filter(
      (i) => i.role === EulogiseUserRole.EDITOR,
    )?.[0]

    if (!inviteObj) {
      return []
    }
    const caseObj = await caseModel.findById(inviteObj.case!)

    if (!caseObj.client) {
      return []
    }

    const findQuery = {
      ...search,
      id: caseObj.client,
    }

    return clientModel.query(findQuery)
  }

  public static async findAsCustomer({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    console.log('findAsCustomer', accountObj.ref)
    const caseObj = await caseModel.findOneByCustomerId(accountObj.ref)

    if (!caseObj || !caseObj.client) {
      return []
    }

    const findQuery = {
      ...search,
      id: caseObj.client,
    }

    return clientModel.query(findQuery)
  }

  public static async findAsClient({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const findQuery = {
      ...search,
      users: {
        contains: accountObj.ref,
      },
    }

    return clientModel.query(findQuery)
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
    const { id, ...restSearch } = search
    if (search.id && Object.keys(restSearch).length === 0) {
      const client = await clientModel.findById(search.id)
      console.log('foundClient', search.id, client)
      return [client]
    }
    return clientModel.query(findQuery)
  }

  public static async save({
    accountObj,
    clientObj,
  }: {
    accountObj: Webtoken.Payload.Account
    clientObj: IClientModel.Schema
  }): Promise<any> {
    switch (accountObj.role) {
      case 'client':
        return ClientResourceController.saveAsClient({ accountObj, clientObj })
      case 'admin':
        return ClientResourceController.saveAsAdmin({ accountObj, clientObj })
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed('client'))
    }
  }

  public static async saveAsClient({
    accountObj,
    clientObj,
  }: {
    accountObj: Webtoken.Payload.Account
    clientObj: IClientModel.Schema
  }): Promise<any> {
    if (!clientObj.id) {
      throw new Error('Not allowed to `create` client')
    }

    const saveQuery: IClientModel.Schema = {
      ...clientObj,
    }

    return clientModel.save(saveQuery)
  }

  public static async saveAsAdmin({
    accountObj,
    clientObj,
  }: {
    accountObj: Webtoken.Payload.Account
    clientObj: IClientModel.Schema
  }): Promise<any> {
    const saveQuery: IClientModel.Schema = {
      ...clientObj,
    }

    console.log('saveAsAdmin saveQuery', saveQuery)

    return clientModel.save(saveQuery)
  }

  public static async remove({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    if (accountObj.role !== EulogiseUserRole.ADMIN) {
      throw new Lambdur.Error(Errors.resource.remove.notAllowed('client'))
    }

    const removeQuery = {
      ...search,
    }

    return clientModel.remove(removeQuery)
  }

  public static async assignUser(
    userId: string,
    inviteId: string,
  ): Promise<void> {
    const inviteObj = await inviteModel.findById(inviteId)
    const clientObj = await clientModel.findById(inviteObj.client!)

    const saveQuery = {
      ...clientObj,
      users: [...clientObj.users!, userId],
    }

    await clientModel.save(saveQuery)
  }

  public static async saveClient(
    clientData: IUpdateClientRequestPayload,
  ): Promise<IUpdateClientResponsePayload> {
    const { funeralDirectors: funeralDirectorsData, ...clientSchemaData } =
      clientData
    const existingClient = clientSchemaData.id
      ? await clientModel.findById(clientSchemaData.id)
      : null
    if (!existingClient) {
      throw new Error('Client does not exist')
    }
    const disabledProducts = ClientResourceController.getDisabledProductKeys(
      existingClient?.availableProducts,
      clientSchemaData.availableProducts,
    )
    const client = await clientModel.save(clientSchemaData)
    if (client.id && disabledProducts.length > 0) {
      await ClientResourceController.disableProductsForClientCases(
        client.id,
        disabledProducts,
      )
    }

    const funeralDirectors = await BBPromise.map(
      funeralDirectorsData,
      async (fd) => {
        return await userModel.updateById(fd.id, {
          // @ts-ignore
          clientRole: fd.clientRole!,
        })
      },
      { concurrency: 10 },
    )
    return {
      ...client,
      funeralDirectors: funeralDirectors as unknown as Array<IEulogiseUser>,
    }
  }

  private static getDisabledProductKeys(
    previous?: IEulogiseProductAvailabilityStatus,
    next?: IEulogiseProductAvailabilityStatus,
  ): Array<EulogiseProduct> {
    if (!previous) {
      return []
    }
    const nextStatus = next ?? {}
    return Object.keys(previous).reduce(
      (acc: Array<EulogiseProduct>, key: string) => {
        const productKey = key as EulogiseProduct
        const wasEnabled = previous?.[productKey] === true
        const isStillEnabled = nextStatus?.[productKey] === true
        if (wasEnabled && !isStillEnabled) {
          acc.push(productKey)
        }
        return acc
      },
      [],
    )
  }

  private static async disableProductsForClientCases(
    clientId: string,
    productsToDisable: Array<EulogiseProduct>,
  ): Promise<void> {
    if (!productsToDisable?.length) {
      return
    }
    const cases = await caseModel.getAllCasesByClientId(clientId)
    if (!cases?.length) {
      return
    }

    await BBPromise.map(
      cases,
      async (caseObj: ICaseModel.Model) => {
        const currentEnabledProducts: IEulogiseProductAvailabilityStatus = {
          ...(caseObj.enabledProducts ?? {}),
        }
        let shouldUpdate = false
        productsToDisable.forEach((product) => {
          if (currentEnabledProducts[product] !== false) {
            currentEnabledProducts[product] = false
            shouldUpdate = true
          }
        })
        if (!shouldUpdate) {
          return
        }
        await caseModel.save({
          id: caseObj.id,
          enabledProducts: currentEnabledProducts,
        } as ICaseModel.Schema)
      },
      { concurrency: 5 },
    )
  }

  public static async findByAdminId(
    userId: string,
  ): Promise<IClientModel.Model | undefined> {
    return await clientModel.findOne({
      users: { contains: userId },
    })
  }

  public static async isArrangerIdValid({
    clientId,
    arrangerId,
  }: {
    clientId: string
    arrangerId?: string | undefined
  }): Promise<boolean> {
    const client = await clientModel.findById(clientId)
    const funeralDirectorUsers = Array.from(client?.users ?? [])

    if (
      arrangerId &&
      funeralDirectorUsers?.length > 0 &&
      funeralDirectorUsers?.includes(arrangerId)
    ) {
      return true
    }
    return false
  }
}
