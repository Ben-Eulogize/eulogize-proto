import rp from 'request-promise-native'
import { Webtoken } from '../../../webtoken'
import { IMemorialProductModel } from '../../../database/types/MemorialProductModel.types'
import { clientCaseOwnerOnly } from '../../../utils/accessControl'
import * as Errors from '../../error'
import { Lambdur } from 'lambdur'
import {
  caseModel,
  genericCardProductModel,
  inviteModel,
  invoiceModel,
  themeModel,
  userModel,
} from '../../../database'
import { CONFIG } from '../../../config/Config'
import {
  EulogiseProduct,
  EulogiseRegion,
  EulogiseResourceName,
  EulogiseUserRole,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductData,
  ISlideshowTheme,
  ITheme,
  MemorialVisualStatus,
  ResourceFileStatus,
  WebSocketMessageEventType,
  WebSocketProductDataUpdatedPayload,
} from '@eulogise/core'
import { ThemeHelper } from '@eulogise/helpers'
import { SendGridHelper } from '../../../utils/SendGridHelper'
import { IInvoiceModel } from '../../../database/types/InvoiceModel.types'
import { IUserModel } from '../../../database/types/UserModel.types'
import { ICaseModel } from '../../../database/types/CaseModel.types'
import { CaseReportController } from './CaseReportController'
import { PHOTOBOOK_DEFAULT_THEME } from '@eulogise/core'
import { BaseMemorialModel } from '../../../database/model/BaseMemorialModel'
import { ConnectionController } from '../ConnectionController'

export abstract class BaseProductResourceController {
  private readonly model: BaseMemorialModel
  private readonly modelName: EulogiseResourceName
  private readonly product: EulogiseProduct
  protected constructor({
    modelName,
    model,
    product,
  }: {
    modelName: EulogiseResourceName
    product: EulogiseProduct
    model: any
  }) {
    this.modelName = modelName
    this.model = model
    this.product = product
  }

  public async postSaveHook(caseId: string): Promise<void> {
    // update report status
    await CaseReportController.upsertCaseReportById(caseId)
  }

  private async findAsVisitor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const inviteObj = await inviteModel.findById(accountObj.ref)

    const findQuery = {
      ...search,
      case: inviteObj.case,
    }

    return this.model.query(findQuery)
  }

  public async findAsCoEditor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = await inviteModel.findOneByEmail(userObj.email)

    const findQuery = {
      ...search,
      case: inviteObj.case,
    }

    return this.model.query(findQuery)
  }

  public async findAsCustomer({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    let caseId: string
    switch (accountObj.type) {
      case 'user':
        caseId = (await caseModel.findOneByCustomerId(accountObj.ref)).id!
        break
      case 'invite':
        caseId = (await inviteModel.findById(accountObj.ref)).case!
        break
    }

    const findQuery = {
      ...search,
      case: caseId!,
    }
    return this.model.query(findQuery)
  }

  public async findAsContributor(params: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const { accountObj, search } = params
    let caseId: string
    caseId = (await inviteModel.findById(accountObj.ref)).case!

    const findQuery = {
      ...search,
      case: caseId!,
    }
    return this.model.query(findQuery)
  }

  public async findAsClient(params: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const { accountObj: _accountObj, search } = params
    const findQuery = {
      ...search,
    }
    console.log('findAsClient', findQuery)
    return this.model.query(findQuery)
  }

  private async findAsAdmin(params: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const { accountObj: _accountObj, search } = params
    const findQuery = {
      ...search,
    }

    return this.model.query(findQuery)
  }

  public async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    console.log('find BaseProductResourceController', { accountObj, search })
    switch (accountObj.role) {
      case EulogiseUserRole.VISITOR_BOOKLET:
      case EulogiseUserRole.VISITOR_BOOKMARK:
      case EulogiseUserRole.VISITOR_SIDED_CARD:
      case EulogiseUserRole.VISITOR_SLIDESHOW:
      case EulogiseUserRole.VISITOR_THANKYOUCARD:
      case EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN:
      case EulogiseUserRole.VISITOR_PHOTOBOOK:
        return this.findAsVisitor({ accountObj, search })
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
        return this.findAsCoEditor({ accountObj, search })
      case EulogiseUserRole.CUSTOMER:
        return this.findAsCustomer({ accountObj, search })
      case EulogiseUserRole.CLIENT:
        return clientCaseOwnerOnly(
          this.findAsClient.bind(this),
          this.modelName,
        )({ accountObj, search })
      case EulogiseUserRole.ADMIN:
      case EulogiseUserRole.INTERNAL:
        return this.findAsAdmin({ accountObj, search })
      case EulogiseUserRole.CONTRIBUTOR:
        return this.findAsContributor({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed(this.modelName))
    }
  }

  public async generate({
    memorialProductId,
    product,
    slug,
    region,
    additionalPayload = {},
    generateUserId,
  }: {
    memorialProductId: string
    product: EulogiseProduct
    slug?: string
    region?: EulogiseRegion
    additionalPayload?:
      | object
      | {
          slideshowTheme: ISlideshowTheme
          slideshowTitleSlide: ICardProductData
          slideshowTitleSlideTheme: ICardProductTheme
          isVideoBier?: boolean // used by SlideshowResourceController
        }
    generateUserId: string
  }): Promise<any> {
    console.log('find originalMemorialProductObj', memorialProductId)
    // @ts-ignore
    const originalMemorialProductObj:
      | ICardProductData
      | IGenericCardProductData = await this.model.findById(memorialProductId)
    console.log(
      'find originalMemorialProductObj results',
      originalMemorialProductObj,
    )
    const theme = (await themeModel.findById(
      originalMemorialProductObj.content.theme,
    )) as unknown as ITheme

    const productTheme =
      product === EulogiseProduct.PHOTOBOOK
        ? PHOTOBOOK_DEFAULT_THEME
        : ThemeHelper.getProductThemeByProductType({
            theme,
            product,
            genericProductMetadata: (
              originalMemorialProductObj as IGenericCardProductData
            )?.content?.metadata,
            region,
          })

    if (!originalMemorialProductObj) {
      throw new Lambdur.Error(
        // @ts-ignore
        Errors.resource[this.modelName].generate.notFound(),
      )
    }
    const memorialProductObj = {
      ...originalMemorialProductObj,
      generateUserId,
    } as IMemorialProductModel.Schema

    try {
      const generatorPostRequest = {
        method: 'POST',
        uri: `${CONFIG.GENERATOR_API_URL}/generator/${this.modelName}`,
        body: {
          ...additionalPayload,
          productTheme,
          [this.modelName]: memorialProductObj,
        },
        json: true,
      }
      const returnItem = await this.setToProcessing({
        memorialProductId,
        generateUserId,
      })

      await rp(generatorPostRequest)
      return returnItem
    } catch (error) {
      console.log(`Memorial Product "${this.modelName}" generate error`, error)
      throw new Lambdur.Error(
        // @ts-ignore
        Errors.resource[this.modelName].generate.externalIssue(),
      )
    }
  }

  public async setToProcessing({
    memorialProductId,
    generateUserId,
  }: {
    memorialProductId: string
    generateUserId: string
  }) {
    console.log('setToProcessing', memorialProductId)
    return await this.model.updateById(memorialProductId, {
      fileStatus: 'processing',
      generateUserId,
    })
  }

  public async remove(
    accountObj: Webtoken.Payload.Account,
    search: any,
  ): Promise<any> {
    const removeQuery = {
      ...search,
    }

    return this.model.remove(removeQuery)
  }

  private getAllowUpdatedFieldsOnSave(
    memorialProductObj: IMemorialProductModel.Schema,
  ): IMemorialProductModel.Schema {
    console.log('getAllowUpdatedFieldsOnSave', memorialProductObj)
    // Disallow fileStatus field being updated by auto saving or saving
    const { fileStatus, ...rest } = memorialProductObj
    return rest
  }

  private async getDisallowedUpdatedFieldValuesByCaseId(
    caseId: string,
  ): Promise<{ fileStatus?: string }> {
    console.log('getDisallowedUpdatedFieldValuesByCaseId', caseId)
    const product = await this.model.getActiveProductByCaseId(caseId)

    return {
      fileStatus: product?.fileStatus,
    }
  }

  // do not save fileStatus field
  private async safeSaveByCaseId({
    caseId,
    memorialProductObj,
    update,
  }: {
    caseId: string
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<IMemorialProductModel.Schema> {
    const allowUpdatedFieldsOnSave =
      this.getAllowUpdatedFieldsOnSave(memorialProductObj)

    const saveQuery: IMemorialProductModel.Schema = {
      ...allowUpdatedFieldsOnSave,
      case: caseId,
    }

    if (update) {
      await this.model.updateByCaseId(caseId, saveQuery)
      return saveQuery
    }

    const disallowUpdatedFieldValues =
      await this.getDisallowedUpdatedFieldValuesByCaseId(caseId)

    console.log('saving', { ...saveQuery, ...disallowUpdatedFieldValues })
    // @ts-ignore
    return this.model.save({ ...saveQuery, ...disallowUpdatedFieldValues })
  }

  private async saveAsCoEditor(params: {
    accountObj: Webtoken.Payload.Account
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<IMemorialProductModel.Schema> {
    const { accountObj, memorialProductObj, update } = params
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = await inviteModel.findOneByEmail(userObj.email)

    return this.safeSaveByCaseId({
      caseId: inviteObj.case!,
      memorialProductObj,
      update,
    })
  }

  private async saveAsCustomer(params: {
    accountObj: Webtoken.Payload.Account
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<IMemorialProductModel.Schema> {
    const { accountObj, memorialProductObj, update } = params
    const caseObj = await caseModel.findOneByCustomerId(accountObj.ref)

    return this.safeSaveByCaseId({
      caseId: caseObj.id!,
      memorialProductObj,
      update,
    })
  }

  private async saveAsClient(params: {
    accountObj: Webtoken.Payload.Account
    search: IMemorialProductModel.Schema
    isShouldSendEmail?: boolean
  }): Promise<IMemorialProductModel.Schema> {
    const {
      accountObj: _accountObj,
      search: memorialProductObj,
      isShouldSendEmail: update,
    } = params
    return this.safeSaveByCaseId({
      caseId: memorialProductObj.case,
      memorialProductObj,
      update,
    })
  }

  public async saveAsAdmin(params: {
    accountObj: Webtoken.Payload.Account
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<IMemorialProductModel.Schema> {
    const { accountObj: _accountObj, memorialProductObj, update } = params
    return this.safeSaveByCaseId({
      caseId: memorialProductObj.case,
      memorialProductObj,
      update,
    })
  }

  // saveSafe is not needed for internal (generator)
  public async saveAsInternal(params: {
    accountObj: Webtoken.Payload.Account
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<IMemorialProductModel.Schema> {
    const { accountObj: _accountObj, memorialProductObj, update } = params
    const saveQuery: IMemorialProductModel.Schema = {
      ...memorialProductObj,
    }
    if (update) {
      return this.model.updateByCaseId(memorialProductObj.case, saveQuery)
    }

    return this.model.save(saveQuery)
  }

  public async saveAsContributor(params: {
    accountObj: Webtoken.Payload.Account
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<any> {
    const { accountObj: _accountObj, memorialProductObj, update } = params
    return this.safeSaveByCaseId({
      caseId: memorialProductObj.case,
      memorialProductObj,
      update,
    })
  }

  public async save(params: {
    accountObj: Webtoken.Payload.Account
    memorialProductObj: IMemorialProductModel.Schema
    update?: boolean
  }): Promise<any> {
    const { accountObj, memorialProductObj, update } = params
    let returnObj: any
    switch (accountObj.role) {
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR: {
        returnObj = await this.saveAsCoEditor({
          accountObj,
          memorialProductObj,
          update,
        })
        break
      }
      case EulogiseUserRole.CUSTOMER: {
        returnObj = await this.saveAsCustomer({
          accountObj,
          memorialProductObj,
          update,
        })
        break
      }
      case EulogiseUserRole.CLIENT: {
        returnObj = await clientCaseOwnerOnly(
          this.saveAsClient.bind(this),
          this.modelName,
        )({ accountObj, search: memorialProductObj, isShouldSendEmail: update })
        break
      }
      case EulogiseUserRole.CONTRIBUTOR: {
        returnObj = await this.saveAsContributor({
          accountObj,
          memorialProductObj,
          update,
        })
        break
      }
      case EulogiseUserRole.ADMIN: {
        returnObj = await this.saveAsAdmin({
          accountObj,
          memorialProductObj,
          update,
        })
        break
      }
      case EulogiseUserRole.INTERNAL: {
        returnObj = await this.saveAsInternal({
          accountObj,
          memorialProductObj,
          update,
        })
        break
      }
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed(this.modelName))
    }
    const caseId = memorialProductObj.case
    const connectionController = new ConnectionController()
    await connectionController.sendMessagesToCase(caseId, {
      type: WebSocketMessageEventType.PRODUCT_DATA_UPDATED,
      data: {
        caseId,
        product: this.product,
        productId: memorialProductObj.id,
        productData: memorialProductObj,
      } as WebSocketProductDataUpdatedPayload,
    })
    await this.postSaveHook(caseId)

    return returnObj
  }

  private getSendPrintEmailFunction(): (
    invoiceObj: Partial<IInvoiceModel.Schema>,
    caseId: string,
    productDescription: string,
  ) => any {
    switch (this.modelName) {
      case 'booklet':
        return SendGridHelper.sendBookletPrintEmail
      case 'bookmark':
        return SendGridHelper.sendBookmarkPrintEmail
      case 'sidedCard':
        return SendGridHelper.sendSidedCardPrintEmail
      case 'thankyouCard':
      case 'tvWelcomeScreen':
        return SendGridHelper.sendThankyouCardPrintEmail
      default:
        throw new Error(
          `getSendPrintEmailFunction is not supported for "${this.modelName}"`,
        )
    }
  }

  public async sendPrintEmail(memorialProductId: string): Promise<{}> {
    const memorialProductObj = await this.model.findById(memorialProductId)

    if (!memorialProductObj) {
      throw new Lambdur.Error(
        // @ts-ignore
        Errors.resource[this.modelName].sendPrint.notFound(),
      )
    }

    const invoiceObj = (
      await invoiceModel.query({ case: memorialProductObj.case })
    )[0]

    if (!invoiceObj) {
      throw new Lambdur.Error(
        // @ts-ignore
        Errors.resource[this.modelName].sendPrint.notPaid(),
      )
    }

    const caseObj = await caseModel.findById(memorialProductObj.case)

    if (!caseObj) {
      throw new Lambdur.Error(
        // @ts-ignore
        Errors.resource[this.modelName].sendPrint.notFoundCase(),
      )
    }

    return this.getSendPrintEmailFunction()(
      invoiceObj,
      memorialProductObj.case,
      '',
    )
  }

  private getSendGeneratedEmailFunction(): (
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
  ) => any {
    switch (this.modelName) {
      case 'slideshow':
        return SendGridHelper.sendSlideshowGeneratedEmail
      case 'booklet':
      case 'genericCardProduct':
        return SendGridHelper.sendBookletGeneratedEmail
      case 'bookmark':
        return SendGridHelper.sendBookmarkGeneratedEmail
      case 'sidedCard':
        return SendGridHelper.sendSidedCardGeneratedEmail
      case 'thankyouCard':
      case 'tvWelcomeScreen':
        // TvWelcomeScreen can share the same as other card products
        return SendGridHelper.sendThankyouCardGeneratedEmail
      case 'photobook':
        return SendGridHelper.sendPhotobookGeneratedEmail
      default:
        throw new Error(
          `getSendGeneratedEmailFunction is not supported for "${this.modelName}"`,
        )
    }
  }

  public async sendProductGeneratedEmailByCaseId(
    caseId: string,
    userId?: string,
  ): Promise<{}> {
    console.log('sendProductGeneratedEmail case id', { caseId })
    const caseObj = await caseModel.findById(caseId)
    console.log('sendProductGeneratedEmail user id', {
      caseObj,
      userId,
      customer: caseObj?.customer,
    })
    const userObj: IUserModel.Schema = (await userModel.findById(
      userId || caseObj?.customer,
    ))!
    console.log(`sendProductGeneratedEmail "${this.modelName}"`, {
      userId,
      userObj,
    })

    return this.getSendGeneratedEmailFunction()(userObj, caseObj!)
  }

  // it should return the product
  public async unlockProductByIdAndSlug({
    productId,
    slug,
  }: {
    productId: string
    slug?: string
  }): Promise<any> {
    if (slug) {
      const updatedProduct =
        await genericCardProductModel.unlockProductByIdAndSlug({
          productId,
          slug,
        })
      await this.postSaveHook(updatedProduct.case)
      return updatedProduct
    }
    const updatedProduct = await this.model.unlockProductById({ productId })
    await this.postSaveHook(updatedProduct.case)
    return updatedProduct
  }

  public async updateProductById(
    productId: string,
    data: Partial<IMemorialProductModel.Schema>,
  ): Promise<IMemorialProductModel.Schema> {
    const updatedProduct = await this.model.update({
      ...data,
      id: productId,
    })
    await this.postSaveHook(updatedProduct.case)
    return updatedProduct
  }

  public async updateFileStatusById({
    productId,
    fileStatus,
    status,
    hasGeneratedBefore = false,
  }: {
    productId: string
    fileStatus: ResourceFileStatus
    status: MemorialVisualStatus
    hasGeneratedBefore: boolean
  }): Promise<any> {
    console.log('updateFileStatusById', {
      productId,
      fileStatus,
      hasGeneratedBefore,
    })
    const updatedProduct = await this.model.updateFileStatusById({
      productId,
      fileStatus,
      status,
      hasGeneratedBefore,
    })
    await this.postSaveHook(updatedProduct.case)
    return updatedProduct
  }

  public async findById(productId: string): Promise<any> {
    return await this.model.findById(productId)
  }
}
