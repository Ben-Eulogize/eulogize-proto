import { Lambdur } from 'lambdur'

import * as Errors from '../../error'
import BPPromise from 'bluebird'
import { Webtoken } from '../../../webtoken'
import { ICaseModel } from '../../../database/types/CaseModel.types'
import {
  bookletModel,
  bookmarkModel,
  caseModel,
  clientModel,
  genericCardProductModel,
  inviteModel,
  sidedCardModel,
  slideshowModel,
  thankyouCardModel,
  tvWelcomeScreenModel,
  userModel,
} from '../../../database'
import { ICaseResourceController } from './types/CaseResourceController.types'
import { IMemorialProductModel } from '../../../database/types/MemorialProductModel.types'
import {
  CaseStatus,
  EulogiseCountry,
  EulogiseCountryArray,
  EulogiseProduct,
  EulogiseUserRole,
  ICase,
  IMemorialProductSummary,
  MemorialVisualStatus,
  MemorialVisualStatusLevelOrder,
  WebSocketCaseDataUpdatedPayload,
  WebSocketMessageEventType,
} from '@eulogise/core'
import { IUserModel } from '../../../database/types/UserModel.types'
import { BaseMemorialModel } from '../../../database/model/BaseMemorialModel'
import { InviteResourceController } from './invite'
import { IInviteModel } from '../../../database/types/InviteModel.types'
import { CaseHelper } from '@eulogise/helpers'
import { SendGridHelper } from '../../../utils/SendGridHelper'
import { CaseReportController } from './CaseReportController'
import { photobookModel } from '../../../database/model/photobook'
import { ConnectionController } from '../ConnectionController'

export type CaseModelWithSummary = ICaseModel.Schema & {
  funeralDirectorName: string
  customerName: string
  customerEmail: string
  clientName: string | undefined
  booklet: IMemorialProductSummary
  bookmark: IMemorialProductSummary
  thankyouCard: IMemorialProductSummary
  slideshow: IMemorialProductSummary
  sidedCard: IMemorialProductSummary
  tvWelcomeScreen: IMemorialProductSummary
  photobook: IMemorialProductSummary
  genericCardProducts: IMemorialProductSummary
}

export class CaseResourceController {
  public static async postSaveHook(newCase: ICaseModel.Schema): Promise<void> {
    console.log('postSaveHook', newCase)
    if (!newCase.id) {
      throw new Error('newCase.id is required')
    }
    const caseId = newCase.id
    const connectionController = new ConnectionController()
    await connectionController.sendMessagesToCase(caseId!, {
      type: WebSocketMessageEventType.CASE_UPDATED,
      data: {
        caseId,
        caseData: newCase as unknown as ICase,
      } as WebSocketCaseDataUpdatedPayload,
    })

    console.log('start upserting case report')
    await CaseReportController.upsertCaseReportById(newCase.id)
  }

  public static validateCountry(country: string | undefined): void {
    if (country && !EulogiseCountryArray.includes(country as EulogiseCountry)) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.invalidCountryInput(),
      )
    }
  }

  public static getProductByInviteRole(
    role: EulogiseUserRole,
  ): EulogiseProduct {
    switch (role) {
      case EulogiseUserRole.VISITOR_BOOKLET:
        return EulogiseProduct.BOOKLET
      case EulogiseUserRole.VISITOR_BOOKMARK:
        return EulogiseProduct.BOOKMARK
      case EulogiseUserRole.VISITOR_SLIDESHOW:
        return EulogiseProduct.SLIDESHOW
      case EulogiseUserRole.VISITOR_SIDED_CARD:
        return EulogiseProduct.SIDED_CARD
      case EulogiseUserRole.VISITOR_THANKYOUCARD:
        return EulogiseProduct.THANK_YOU_CARD
      case EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN:
        return EulogiseProduct.TV_WELCOME_SCREEN
      case EulogiseUserRole.VISITOR_PHOTOBOOK:
        return EulogiseProduct.PHOTOBOOK
      default:
        throw new Error(
          `"${role}" is not supported. Invite should be sending to one of the visitors role.`,
        )
    }
  }

  public static getProductModelByProduct(
    product: EulogiseProduct,
  ): BaseMemorialModel {
    switch (product) {
      case EulogiseProduct.BOOKLET:
        return bookletModel
      case EulogiseProduct.BOOKMARK:
        return bookmarkModel
      case EulogiseProduct.SIDED_CARD:
        return sidedCardModel
      case EulogiseProduct.THANK_YOU_CARD:
        return thankyouCardModel
      case EulogiseProduct.SLIDESHOW:
        return slideshowModel
      case EulogiseProduct.TV_WELCOME_SCREEN:
        return tvWelcomeScreenModel
      case EulogiseProduct.PHOTOBOOK:
        return photobookModel
      case EulogiseProduct.GENERIC_CARD_PRODUCT:
        return genericCardProductModel
      default:
        throw new Error(
          `product is not supported by getProductModelByProduct: "${product}"`,
        )
    }
  }

  public static async updateProductStatusIfNeeded(
    caseId: string,
    product: EulogiseProduct,
    newStatus: MemorialVisualStatus,
  ): Promise<IMemorialProductModel.Model> {
    const model = this.getProductModelByProduct(product)
    const newStatusLevel = MemorialVisualStatusLevelOrder.indexOf(newStatus)
    const memorialProduct = (await model.getActiveProductByCaseId(caseId))!
    const currentStatusLevel = MemorialVisualStatusLevelOrder.indexOf(
      memorialProduct.status!,
    )
    if (newStatusLevel > currentStatusLevel) {
      memorialProduct.status = newStatus
      console.log(
        `updateProductStatusIfNeeded: successfully update product "${memorialProduct.id}" to status ${newStatus}`,
      )
      return (await memorialProduct.save()) as IMemorialProductModel.Model
    }
    console.log(
      `updateProductStatusIfNeeded: failed to update product "${memorialProduct.id}" to status ${newStatus}`,
    )
    return memorialProduct
  }

  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<ICaseModel.Model[]> {
    console.log('account', accountObj, search)
    switch (accountObj.role) {
      case EulogiseUserRole.VISITOR_BOOKLET:
      case EulogiseUserRole.VISITOR_SLIDESHOW:
      case EulogiseUserRole.VISITOR_SIDED_CARD:
      case EulogiseUserRole.VISITOR_BOOKMARK:
      case EulogiseUserRole.VISITOR_THANKYOUCARD:
      case EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN:
      case EulogiseUserRole.VISITOR_PHOTOBOOK:
      case EulogiseUserRole.CONTRIBUTOR:
        return this.findAsVisitorOrContributor({ accountObj, search })
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
        return this.findAsCoEditor({ accountObj, search })
      case EulogiseUserRole.CUSTOMER:
        return this.findAsCustomer({ accountObj, search })
      case EulogiseUserRole.CLIENT:
        return this.findAsClient({ accountObj, search })
      case EulogiseUserRole.ADMIN:
        return this.findAsAdmin({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed('case'))
    }
  }

  public static async findAsCoEditor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }) {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = await inviteModel.findOneByEmail(userObj.email)
    const findQuery = {
      ...search,
      id: inviteObj.case,
    }

    return caseModel.findAllWithPopulatedCustomer(findQuery)
  }

  public static async findAsVisitorOrContributor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<ICaseModel.Model[]> {
    const inviteObj = await inviteModel.findById(accountObj.ref)
    const findQuery = {
      ...search,
      id: inviteObj.case,
    }

    return caseModel.findAllWithPopulatedCustomer(findQuery)
  }

  public static async findAsCustomer({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<ICaseModel.Model[]> {
    const findQuery = {
      ...search,
      customer: accountObj.ref,
    }

    return caseModel.findAllWithPopulatedCustomer(findQuery)
  }

  public static async findAsClient({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<ICaseModel.Model[]> {
    try {
      console.log('findAsClient', accountObj, search)
      const clientObj = (
        await clientModel.query({
          users: { contains: accountObj.ref },
        })
      )[0]
      console.log('findAsClient clientObj', clientObj)

      if (!clientObj) {
        return []
      }

      const findQuery = {
        ...search,
        client: clientObj.id,
      }
      console.log('findAsClient findQuery', clientObj)
      return await caseModel.findAllWithPopulatedCustomer(findQuery)
    } catch (ex) {
      console.log('exception', ex)
      throw new Error(ex)
    }
  }

  public static async findAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<ICaseModel.Model[]> {
    return caseModel.all(search)
  }

  public static async save({
    accountObj,
    caseObj,
    options,
  }: {
    accountObj: Webtoken.Payload.Account
    caseObj: ICaseModel.Schema
    options: ICaseResourceController.Save.AsClient.Options
  }): Promise<any> {
    let newCase: ICaseModel.Schema
    // Validate country before proceeding with case creation
    this.validateCountry(caseObj.country)

    switch (accountObj.role) {
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR: {
        newCase = await this.saveAsCoEditor({ accountObj, caseObj })
        break
      }
      case EulogiseUserRole.CUSTOMER: {
        newCase = await this.saveAsCustomer({ accountObj, caseObj })
        break
      }
      case EulogiseUserRole.CLIENT: {
        newCase = await this.saveAsClient({ accountObj, caseObj, options })
        break
      }
      case EulogiseUserRole.ADMIN: {
        newCase = await this.saveAsAdmin({ accountObj, caseObj })
        console.log('save as admin', newCase)
        break
      }
      case EulogiseUserRole.CONTRIBUTOR: {
        newCase = await this.saveAsContributor({ accountObj, caseObj })
        break
      }
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed('case'))
    }
    await this.postSaveHook(newCase)
    return newCase
  }

  public static async saveAsCustomer({
    accountObj,
    caseObj,
  }: {
    accountObj: Webtoken.Payload.Account
    caseObj: ICaseModel.Schema
  }): Promise<any> {
    const saveQuery: ICaseModel.Schema = {
      ...caseObj,
      customer: accountObj.ref,
    }

    return caseModel.save(saveQuery)
  }

  public static async saveAsCoEditor({
    accountObj,
    caseObj,
  }: {
    accountObj: Webtoken.Payload.Account
    caseObj: ICaseModel.Schema
  }): Promise<any> {
    // for users sign up from clientHandle, this needs to creating invite for coeditor
    // create new case if case id is not provided
    if (!caseObj.id) {
      const newCase = await this.saveAsCustomer({ accountObj, caseObj })
      console.log('saveAsEditorOrCoEditor by client handle', {
        accountObj,
        caseObj,
      })
      const user = await userModel.findById(accountObj.ref)
      await InviteResourceController.save({
        accountObj,
        inviteObj: {
          email: user.email, // use coeditor email as the case email
          role:
            accountObj.role === EulogiseUserRole.EDITOR
              ? EulogiseUserRole.EDITOR
              : EulogiseUserRole.COEDITOR,
          case: newCase.id,
          client: caseObj.client,
          status: 'accepted',
          // token: '' // will be generated on creation
        } as IInviteModel.Schema,
        options: {
          isShouldSendEmail: true,
          isUpdatingInviteAsNewClientResetPassword: false,
        },
      })
      if (caseObj.client) {
        // send notification to all client administrators
        const admins = await clientModel.findAdmins(caseObj.client)
        console.log('found admins', admins)
        const clientObj = await clientModel.findById(caseObj.client)
        const clientLogoUrl = SendGridHelper.getClientLogoUrl(clientObj?.logo!)
        const clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
          clientObj?.clientEmailAsset!,
        )
        await BPPromise.map(
          admins,
          async (admin: IUserModel.Model) => {
            await SendGridHelper.sendCaseCreatedToClientAdmin({
              clientAdminName: admin.fullName,
              clientAdminEmail: admin.email,
              customerName: user.fullName,
              caseObj,
              clientLogoUrl,
              clientEmailAssetUrl,
            })
          },
          { concurrency: 10 },
        )
      }
      return newCase
    }

    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = (
      await inviteModel.query({ email: userObj.email, case: caseObj.id })
    )[0]

    if (!inviteObj) {
      throw Error(
        `User does not have authorization to update case ${caseObj.id}`,
      )
    }

    const saveQuery: ICaseModel.Schema = {
      ...caseObj,
      id: inviteObj.case,
    }

    return caseModel.save(saveQuery)
  }

  public static async saveAsContributor({
    accountObj,
    caseObj,
  }: {
    accountObj: Webtoken.Payload.Account
    caseObj: ICaseModel.Schema
  }): Promise<any> {
    const saveQuery: ICaseModel.Schema = {
      ...caseObj,
    }

    return caseModel.save(saveQuery)
  }

  public static async saveAsClient({
    accountObj,
    caseObj,
    options,
  }: {
    accountObj: Webtoken.Payload.Account
    caseObj: any
    options: ICaseResourceController.Save.AsClient.Options
  }): Promise<any> {
    console.log('saveAsClient accountObj', accountObj)
    console.log('saveAsClient caseObj', caseObj)
    console.log('saveAsClient options', options)
    // TODO: This is for client who is uploading the invite image in the client portal, we may need to refactor the logic later.
    if (options.isUpdatingClientCustomerCaseAsClient) {
      const saveQuery: ICaseModel.Schema = {
        ...caseObj,
        customer: accountObj.ref,
      }
      return caseModel.save(saveQuery)
    }
    // TODO: Need to also check the incomplete editor logic to see if we still need code below
    try {
      const [[clientObj], customerObj, caseData] = await Promise.all([
        clientModel.query({ users: { contains: accountObj.ref } }),
        caseObj.customer?.email
          ? userModel.findOneByEmail(caseObj.customer.email)
          : userModel.findById(caseObj.customer),
        caseObj.id ? caseModel.findById(caseObj.id) : undefined,
      ])

      const currentEditors: string[] = !caseData ? [] : caseData.editors || []

      const customerId = (customerObj || { id: '' }).id
      const isEditor = currentEditors.find(
        (editor: string) => editor === customerId,
      )

      const newEditors = !caseObj.editor
        ? currentEditors.filter((editor: string) => editor !== customerId)
        : !isEditor
        ? [...currentEditors, customerId]
        : currentEditors

      const saveQuery: any = {
        ...caseObj,
        client: clientObj.id,
        customer: customerId,
        funeralDirector: accountObj.ref,
        editors: newEditors,
        country: clientObj?.country ?? EulogiseCountry.AUSTRALIA,
        region: CaseHelper.getRegionByCountry({ country: clientObj?.country }),
      }

      return await caseModel.save(saveQuery)
    } catch (error) {
      throw error
    }
  }

  public static async saveAsAdmin({
    accountObj,
    caseObj,
  }: {
    accountObj: Webtoken.Payload.Account
    caseObj: ICaseModel.Schema
  }): Promise<any> {
    const saveQuery: ICaseModel.Schema = {
      ...caseObj,
    }

    return caseModel.save(saveQuery)
  }

  public static async remove({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const clientObj = (
      await clientModel.query({
        users: { contains: accountObj.ref },
      })
    )[0]

    if (!clientObj) {
      throw new Lambdur.Error(Errors.resource.remove.notFound('case'))
    }

    const removeQuery = {
      ...search,
      client: clientObj.id,
    }

    return caseModel.remove(removeQuery)
  }

  public static async assignClient(
    clientId: string,
    inviteId: string,
  ): Promise<void> {
    const inviteObj = await inviteModel.findById(inviteId)
    const caseObj = await caseModel.findById(inviteObj.case!)

    const saveQuery = {
      ...caseObj,
      client: clientId,
    }

    await caseModel.save(saveQuery)
  }

  public static async assignCustomer(
    customerId: string,
    inviteId: string,
  ): Promise<void> {
    const inviteObj = await inviteModel.findById(inviteId)
    const caseObj = await caseModel.findById(inviteObj.case!)

    const saveQuery = {
      ...caseObj,
      customer: customerId,
    }

    await caseModel.save(saveQuery)
  }

  // API designed for external integration use
  public static async createClientCase(
    caseData: any,
  ): Promise<ICaseModel.Schema> {
    const {
      client,
      funeralDirector,
      customer,
      deceased,
      familyDetails,
      obituary,
      service,
      enabledProducts,
      createdByAPIKey,
      region,
      country,
      status = CaseStatus.PAID,
    } = caseData

    // Validate country before proceeding with case creation
    this.validateCountry(country)
    const createdCase = await caseModel.create({
      client,
      funeralDirector,
      customer,
      deceased,
      familyDetails,
      obituary,
      service,
      inviteEmail: {
        content: '',
        greeting: '',
        image: {
          filestackHandle: '',
          filepath: '',
          url: '',
        },
      },
      status,
      enabledProducts,
      createdByAPIKey,
      region,
      country,
    })
    await this.postSaveHook(createdCase)
    return createdCase
  }

  // API designed for external integration use
  public static async updateByCustomerId(customerId: string, caseData: any) {
    if (!customerId) {
      throw Error('"Customer ID" is required')
    }

    const foundCase = await caseModel.findOne({ customer: customerId })
    if (!foundCase) {
      throw Error('Case not found')
    }

    await caseModel.save({
      ...foundCase,
      ...caseData,
    })
  }

  // API designed for external integration use
  public static async findByUserId(
    userId: string,
  ): Promise<ICaseModel.Model | undefined> {
    return await caseModel.findOne({
      customer: { contains: userId },
    })
  }

  // API designed for external integration use
  public static async findByClientId(
    clientId: string,
  ): Promise<ICaseModel.Model[]> {
    return await caseModel.findAll({
      client: { contains: clientId },
    })
  }
}
