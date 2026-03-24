import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'

import * as Errors from '../../error'
import { clientCaseOwnerOnly } from '../../../utils/accessControl'
import { SendGridHelper } from '../../../utils/SendGridHelper'
import { IInviteModel } from '../../../database/types/InviteModel.types'
import {
  caseModel,
  clientModel,
  inviteModel,
  userModel,
} from '../../../database'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'
import { DEFAULT_CLIENT_EULOGIZE_LOGO_URL } from '../../../types'
import { AccountController } from '../account'
import { ICaseModel } from '../../../database/types/CaseModel.types'
import { BLOCKED_INVITES_EMAILS } from '../../handler/account/sign/blacklistEmails'

const NO_CLIENT_ARRANGER_NAME = 'A team member'

export class InviteResourceController {
  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    console.log('InviteResourceController find', { accountObj, search })
    switch (accountObj.role) {
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
        return InviteResourceController.findAsCoEditor({ accountObj, search })
      case EulogiseUserRole.CUSTOMER:
        return InviteResourceController.findAsCustomer({ accountObj, search })
      case EulogiseUserRole.CONTRIBUTOR:
        return InviteResourceController.findAsContributor({
          accountObj,
          search,
        })
      case EulogiseUserRole.CLIENT:
        return clientCaseOwnerOnly(
          InviteResourceController.findAsClient,
          'invite',
        )({ accountObj, search })
      case EulogiseUserRole.ADMIN:
        return InviteResourceController.findAsAdmin({ accountObj, search })
    }
    return []
  }

  public static async findAsCustomer({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const caseObj = await caseModel.findOneByCustomerId(accountObj.ref)
    const findQuery = {
      case: caseObj.id,
      ...search,
    }

    return inviteModel.query(findQuery)
  }

  public static async findAsContributor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const findQuery = {
      ...search,
    }
    return inviteModel.query(findQuery)
  }

  public static async findAsCoEditor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = await inviteModel.findOneByEmail(userObj.email)
    const caseObj = await caseModel.findById(inviteObj.case!)
    const findQuery = {
      case: caseObj.id,
      ...search,
    }

    return inviteModel.query(findQuery)
  }

  public static async findAsClient({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const findQuery = {
      ...search,
    }

    return inviteModel.query(findQuery)
  }

  public static async findAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const findQuery = {
      ...search,
    }

    return inviteModel.query(findQuery)
  }

  public static async save({
    accountObj,
    inviteObj,
    options,
  }: {
    accountObj: Webtoken.Payload.Account
    inviteObj: IInviteModel.Schema
    options: InviteResourceController.Save.Options
  }): Promise<any> {
    console.log('save invite', { accountObj, inviteObj, options })

    const invitor = await userModel.findById(accountObj.ref)
    const invitorFullName = invitor?.fullName
    const newInvitorObj = { ...inviteObj, invitorFullName }
    console.log('newinviteobject', newInvitorObj)
    let returnInviteObj: any
    switch (accountObj.role) {
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
      case EulogiseUserRole.CUSTOMER: {
        returnInviteObj = await InviteResourceController.saveAsCustomer({
          accountObj,
          inviteObj: newInvitorObj,
        })
        break
      }
      case EulogiseUserRole.CONTRIBUTOR: {
        returnInviteObj = await InviteResourceController.saveAsContributor({
          accountObj,
          inviteObj: newInvitorObj,
          options,
        })
        break
      }
      case EulogiseUserRole.CLIENT: {
        if (options.isUpdatingInviteAsNewClientResetPassword) {
          returnInviteObj = await InviteResourceController.saveAsClient({
            accountObj,
            inviteObj: newInvitorObj,
            isShouldSendEmail: !!options.isShouldSendEmail,
          })
          break
        }
        // Adapter to map search to inviteObj for clientCaseOwnerOnly wrapper
        const saveAsClientAdapter = async (params: {
          accountObj: Webtoken.Payload.Account
          search: any
          isShouldSendEmail?: boolean
        }) => {
          return InviteResourceController.saveAsClient({
            accountObj: params.accountObj,
            inviteObj: params.search,
            isShouldSendEmail: !!params.isShouldSendEmail,
          })
        }
        returnInviteObj = await clientCaseOwnerOnly(
          saveAsClientAdapter,
          'invite',
        )({
          accountObj,
          search: newInvitorObj,
          isShouldSendEmail: options.isShouldSendEmail,
        })
        break
      }
      case EulogiseUserRole.ADMIN: {
        returnInviteObj = await InviteResourceController.saveAsAdmin({
          accountObj,
          inviteObj: newInvitorObj,
          options,
        })
        break
      }
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed('invite'))
    }

    return returnInviteObj
  }

  public static async saveAsCustomer({
    accountObj,
    inviteObj,
  }: {
    accountObj: Webtoken.Payload.Account
    inviteObj: IInviteModel.Schema
  }): Promise<IInviteModel.Schema> {
    if (
      ![
        EulogiseUserRole.VISITOR_BOOKLET,
        EulogiseUserRole.VISITOR_SIDED_CARD,
        EulogiseUserRole.VISITOR_SLIDESHOW,
        EulogiseUserRole.VISITOR_BOOKMARK,
        EulogiseUserRole.VISITOR_THANKYOUCARD,
        EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN,
        EulogiseUserRole.VISITOR_PHOTOBOOK,
        EulogiseUserRole.CONTRIBUTOR,
        EulogiseUserRole.COEDITOR,
        EulogiseUserRole.EDITOR,
      ].includes(inviteObj.role)
    ) {
      throw new Lambdur.Error(Errors.resource.save.notAllowed('invite'))
    }

    const saveQuery: IInviteModel.Schema = {
      ...inviteObj,
    }
    console.log('saveQuery', saveQuery)
    const saveResult = await inviteModel.save(saveQuery)

    if (
      (!inviteObj.id &&
        inviteObj.email &&
        (inviteObj.role === EulogiseUserRole.VISITOR_BOOKLET ||
          inviteObj.role === EulogiseUserRole.VISITOR_SLIDESHOW ||
          inviteObj.role === EulogiseUserRole.VISITOR_SIDED_CARD ||
          inviteObj.role === EulogiseUserRole.VISITOR_BOOKMARK ||
          inviteObj.role === EulogiseUserRole.VISITOR_THANKYOUCARD ||
          inviteObj.role === EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN ||
          inviteObj.role === EulogiseUserRole.VISITOR_PHOTOBOOK)) ||
      inviteObj.role === EulogiseUserRole.CONTRIBUTOR ||
      inviteObj.role === EulogiseUserRole.EDITOR ||
      inviteObj.role === EulogiseUserRole.COEDITOR
    ) {
      await InviteResourceController.sendAsCustomerOrClient(accountObj, {
        invite: saveResult.id!,
      })
    }

    return inviteModel.findById(saveResult.id!)
  }

  public static async saveAsClient({
    accountObj,
    inviteObj,
    isShouldSendEmail = true,
  }: {
    accountObj: Webtoken.Payload.Account
    inviteObj: IInviteModel.Schema
    isShouldSendEmail: boolean
  }): Promise<IInviteModel.Schema> {
    console.log('saveAsClient accountObj', {
      accountObj,
      inviteObj,
      isShouldSendEmail,
    })
    const saveQuery: IInviteModel.Schema = {
      ...inviteObj,
    }

    const saveResult = await inviteModel.save(saveQuery)
    // Client Customer, might need to refactor later to separate the logic.
    if (
      !inviteObj.id &&
      inviteObj.client &&
      inviteObj.status &&
      isShouldSendEmail
    ) {
      console.log('sendAsCustomerOrClient clientNewCustomer true')
      return await InviteResourceController.sendAsCustomerOrClient(accountObj, {
        invite: saveResult.id!,
        clientNewCustomer: true,
      })
    }

    if (!inviteObj.id && inviteObj.email && isShouldSendEmail) {
      console.log('sendAsCustomerOrClient clientNewCustomer false')
      await InviteResourceController.sendAsCustomerOrClient(accountObj, {
        invite: saveResult.id!,
      })

      return inviteModel.findById(saveResult.id!)
    }

    return saveResult
  }

  public static async saveAsAdmin({
    accountObj,
    inviteObj,
    options,
  }: {
    accountObj: Webtoken.Payload.Account
    inviteObj: IInviteModel.Schema
    options: InviteResourceController.Save.Options
  }): Promise<IInviteModel.Schema> {
    const saveQuery: IInviteModel.Schema = {
      ...inviteObj,
    }
    console.log('saveQuery', saveQuery)
    const saveResult = await inviteModel.save(saveQuery)
    if (
      !inviteObj.id &&
      inviteObj.email &&
      inviteObj.role === EulogiseUserRole.CLIENT
    ) {
      await InviteResourceController.sendAsAdmin(accountObj, {
        invite: saveResult.id!,
      })
    } else {
      await InviteResourceController.sendAsCustomerOrClient(accountObj, {
        invite: saveResult.id!,
      })
    }
    return inviteModel.findById(saveResult.id!)
  }

  public static async saveAsContributor({
    accountObj,
    inviteObj,
    options,
  }: {
    accountObj: Webtoken.Payload.Account
    inviteObj: IInviteModel.Schema
    options: InviteResourceController.Save.Options
  }): Promise<IInviteModel.Schema> {
    const saveQuery: IInviteModel.Schema = {
      ...inviteObj,
    }
    const saveResult = await inviteModel.save(saveQuery)
    if (
      !inviteObj.id &&
      inviteObj.email &&
      inviteObj.role === EulogiseUserRole.CLIENT
    ) {
      await InviteResourceController.sendAsAdmin(accountObj, {
        invite: saveResult.id!,
      })
    } else {
      await InviteResourceController.sendAsCustomerOrClient(accountObj, {
        invite: saveResult.id!,
      })
    }
    return inviteModel.findById(saveResult.id!)
  }

  public static async remove({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const removeQuery = {
      ...search,
    }

    return inviteModel.remove(removeQuery)
  }

  public static async sendWelcomeEmail(inviteObj: IInviteModel.Schema) {
    let caseObj
    if (inviteObj.case) {
      caseObj = (
        await caseModel.findAllWithPopulatedCustomer({ id: inviteObj.case })
      )[0]
    }

    const clientId = inviteObj.client
    const clientObj = await clientModel.findById(clientId!)
    let clientUser = NO_CLIENT_ARRANGER_NAME
    if (caseObj?.funeralDirector) {
      const funeralDirector = await userModel.findById(caseObj?.funeralDirector)
      clientUser = funeralDirector.fullName
    }
    const clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
      clientObj?.clientEmailAsset!,
    )
    const { email: inviteeEmail, token: inviteToken } = inviteObj
    const clientBrand = clientObj.title
    // @ts-ignore
    const inviteeName = inviteObj.fullName || caseObj?.customer?.fullName
    const deceasedName = caseObj?.deceased?.fullName
    const role = inviteObj.role

    await SendGridHelper.sendEditorOrCoEditorInviteAsClient({
      inviteeName,
      inviteeEmail: inviteeEmail!,
      inviteToken,
      clientUser,
      clientBrand,
      deceasedName: deceasedName!,
      clientEmailAssetUrl,
      // @ts-ignore
      role,
    })
  }

  public static async send(
    accountObj: Webtoken.Payload.Account,
    options: InviteResourceController.Send.Options,
  ): Promise<IInviteModel.Schema> {
    switch (accountObj.role) {
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
      case EulogiseUserRole.CUSTOMER:
      case EulogiseUserRole.CLIENT:
        return InviteResourceController.sendAsCustomerOrClient(
          accountObj,
          options,
        )
      case EulogiseUserRole.ADMIN:
        return InviteResourceController.sendAsAdmin(accountObj, options)
      default:
        throw new Lambdur.Error(Errors.resource.invite.send.notAllowed())
    }
  }

  public static async sendAsAdmin(
    accountObj: Webtoken.Payload.Account,
    options: InviteResourceController.Send.Options,
  ): Promise<IInviteModel.Schema> {
    console.log('sendAsAdmin', { accountObj, options })
    const inviteObj = await inviteModel.findById(options.invite)

    if (!inviteObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Cannot find invite.',
      })
    }

    try {
      switch (inviteObj.role) {
        case 'client':
          const clientId = inviteObj.client
          const funeralDirectorId = accountObj.ref
          const clientObj = await clientModel.findById(clientId!)
          const clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
            clientObj?.clientEmailAsset!,
          )
          await this.inviteFuneralDirector(
            clientId!,
            funeralDirectorId,
            inviteObj.fullName!,
            inviteObj.email!,
            inviteObj.token,
            clientEmailAssetUrl,
          )
          break
      }
      return inviteModel.save({
        ...inviteObj,
        status: 'sent',
      })
    } catch (ex) {
      return await inviteModel.save({
        ...inviteObj,
        status: 'error',
      })
    }
  }

  public static async getInviteLinkByEmail(email: string) {
    const { token } = await inviteModel.findOneByEmail(email)
    if (!token) {
      throw new Error('Token is not available')
    }
    return AccountController.formatClientCustomerContributorMagicLink(token)
  }

  public static async inviteFuneralDirector(
    clientId: string,
    funeralDirectorId: string,
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    clientEmailAssetUrl: string,
  ) {
    const clientObj = await clientModel.findById(clientId)
    const funeralDirector = await userModel.findById(funeralDirectorId)
    return await SendGridHelper.sendFuneralDirectorInvite(
      inviteeName,
      inviteeEmail,
      inviteToken,
      funeralDirector.fullName,
      clientObj.title,
      clientEmailAssetUrl,
    )
  }

  public static async inviteFuneralDirectorViaAPI({
    clientId,
    inviteeName,
    inviteeEmail,
    funeralDirectorAccessLink,
  }: {
    clientId: string
    inviteeName: string
    inviteeEmail: string
    funeralDirectorAccessLink: string
  }) {
    const clientObj = await clientModel.findById(clientId)
    const clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
      clientObj?.clientEmailAsset!,
    )
    return await SendGridHelper.sendFuneralDirectorInviteViaAPI({
      inviteeName,
      inviteeEmail,
      clientBrand: clientObj.title,
      clientEmailAssetUrl,
      funeralDirectorAccessLink,
    })
  }

  public static async sendAsCustomerOrClient(
    accountObj: Webtoken.Payload.Account,
    options: InviteResourceController.Send.Options,
  ): Promise<IInviteModel.Schema> {
    console.log('sendAsCustomerOrClient', { accountObj, options })
    const inviteObj = await inviteModel.findById(options.invite)
    let caseObj
    if (inviteObj.case) {
      caseObj = (
        await caseModel.findAllWithPopulatedCustomer({ id: inviteObj.case })
      )[0]
    }

    if (!inviteObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Cannot find invite.',
      })
    }

    if (!caseObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Cannot find case.',
      })
    }

    return await InviteResourceController.sendByRole({
      inviteObj,
      invitorUserId: accountObj.ref,
      options,
      caseObj,
    })
  }

  public static async sendByRole({
    inviteObj,
    caseObj,
    invitorUserId,
    options,
  }: {
    inviteObj: IInviteModel.Schema
    caseObj: ICaseModel.Schema
    invitorUserId: string
    options: InviteResourceController.Send.Options
  }): Promise<IInviteModel.Schema> {
    const { email: inviteeEmail, token: inviteToken } = inviteObj

    if (BLOCKED_INVITES_EMAILS.includes(inviteeEmail!)) {
      throw new Error('This email cannot be invited.')
    }

    const deceasedName = caseObj?.deceased?.fullName

    // @ts-ignore
    const inviteeName = inviteObj.fullName || caseObj?.customer?.fullName

    const invitor = await userModel.findById(invitorUserId)
    const invitorName = invitor?.fullName

    let clientObj
    let clientEmailAssetUrl = DEFAULT_CLIENT_EULOGIZE_LOGO_URL

    try {
      const role = inviteObj.role
      switch (role) {
        case EulogiseUserRole.VISITOR_BOOKLET: {
          const clientId = caseObj?.client
          if (clientId) {
            const clientObj = await clientModel.findById(clientId!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
          }
          await SendGridHelper.sendVisitorBookletInvite(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
            deceasedName!,
            clientEmailAssetUrl,
          )
          break
        }
        case EulogiseUserRole.VISITOR_SLIDESHOW: {
          const clientId = caseObj?.client
          if (clientId) {
            const clientObj = await clientModel.findById(clientId!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
          }
          await SendGridHelper.sendVisitorSlideshowInvite(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
            deceasedName!,
            clientEmailAssetUrl,
          )
          break
        }
        case EulogiseUserRole.VISITOR_SIDED_CARD: {
          const clientId = caseObj?.client
          if (clientId) {
            const clientObj = await clientModel.findById(clientId!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
          }
          await SendGridHelper.sendVisitorSidedCardInvite(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
            deceasedName!,
            clientEmailAssetUrl,
          )
          break
        }
        case EulogiseUserRole.VISITOR_BOOKMARK: {
          const clientId = caseObj?.client
          if (clientId) {
            const clientObj = await clientModel.findById(clientId!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
          }
          await SendGridHelper.sendVisitorBookmarkInvite(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
            deceasedName!,
            clientEmailAssetUrl,
          )
          break
        }
        case EulogiseUserRole.VISITOR_THANKYOUCARD:
        case EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN: {
          const clientId = caseObj?.client
          if (clientId) {
            const clientObj = await clientModel.findById(clientId!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
          }
          await SendGridHelper.sendVisitorThankyouCardInvite(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
            deceasedName!,
            clientEmailAssetUrl,
          )
          break
        }
        case EulogiseUserRole.VISITOR_PHOTOBOOK: {
          console.log(`VISITOR_PHOTOBOOK: Not implemented`)
          break
        }
        case EulogiseUserRole.CONTRIBUTOR: {
          console.log('before send contributor, options', options)
          if (options.clientNewCustomer) {
            const clientId = inviteObj.client
            clientObj = await clientModel.findById(clientId!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
            let clientUser = NO_CLIENT_ARRANGER_NAME
            if (caseObj?.funeralDirector) {
              const funeralDirector = await userModel.findById(
                caseObj?.funeralDirector,
              )
              clientUser = funeralDirector.fullName
            }
            const clientBrand = clientObj.title
            await SendGridHelper.sendContributorInviteAsClient(
              inviteeName,
              inviteeEmail!,
              inviteToken,
              clientUser,
              clientBrand,
              deceasedName!,
              clientEmailAssetUrl!,
            )
            break
          }
          if (inviteObj?.client) {
            const clientObj = await clientModel.findById(inviteObj?.client!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
          }
          console.log(
            'SendGridHelper.sendContributorInviteAsCustomer',
            inviteeName,
            inviteeEmail,
            inviteToken,
            invitorName,
            deceasedName,
            clientEmailAssetUrl,
          )
          await SendGridHelper.sendContributorInviteAsCustomer(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
            deceasedName!,
            clientEmailAssetUrl,
          )
          break
        }
        case EulogiseUserRole.COEDITOR:
        case EulogiseUserRole.EDITOR: {
          if (options.clientNewCustomer) {
            const clientId = inviteObj.client
            const clientObj = await clientModel.findById(clientId!)
            let clientUser = NO_CLIENT_ARRANGER_NAME
            if (caseObj?.funeralDirector) {
              const funeralDirector = await userModel.findById(
                caseObj?.funeralDirector,
              )
              clientUser = funeralDirector.fullName
            }
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
            const clientBrand = clientObj.title

            await SendGridHelper.sendEditorOrCoEditorInviteAsClient({
              inviteeName,
              inviteeEmail: inviteeEmail!,
              inviteToken,
              clientUser,
              clientBrand,
              deceasedName: deceasedName!,
              clientEmailAssetUrl,
              role,
            })
            break
          }
          let clientLogoPath
          if (inviteObj?.client) {
            const clientObj = await clientModel.findById(inviteObj?.client!)
            clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
              clientObj?.clientEmailAsset!,
            )
            clientLogoPath = clientObj.logo!
          }
          console.log('caseObj.viaClientHandle', caseObj)
          if (caseObj.viaClientHandle) {
            await SendGridHelper.sendCaseCreatedToClientUser({
              customerName: inviteeName,
              customerEmail: inviteeEmail!,
              clientLogoUrl: SendGridHelper.getClientLogoUrl(clientLogoPath),
              caseObj,
              inviteToken,
            })
          } else {
            console.log('SendGridHelper.sendCoEditorInviteAsCustomer', {
              inviteeName,
              inviteeEmail,
              inviteToken,
              invitorName,
              deceasedName,
              clientEmailAssetUrl,
            })
            await SendGridHelper.sendEditorOrCoEditorInviteAsCustomer({
              inviteeName,
              inviteeEmail: inviteeEmail!,
              inviteToken,
              invitorName,
              deceasedName: deceasedName!,
              clientEmailAssetUrl,
              role,
            })
          }
          break
        }
        case EulogiseUserRole.CUSTOMER: {
          await SendGridHelper.sendCustomerInvite(
            inviteeName,
            inviteeEmail!,
            inviteToken,
            invitorName,
          )
          break
        }
        case EulogiseUserRole.CLIENT: {
          const clientId = inviteObj.client
          const funeralDirectorId = invitorUserId
          const clientObj = await clientModel.findById(clientId!)
          clientEmailAssetUrl = SendGridHelper.getClientEmailAssetUrl(
            clientObj?.clientEmailAsset!,
          )
          await this.inviteFuneralDirector(
            clientId!,
            funeralDirectorId,
            inviteeName,
            inviteeEmail!,
            inviteToken,
            clientEmailAssetUrl,
          )
          break
        }
      }
      return await inviteModel.save({
        ...inviteObj,
        status: 'sent',
      })
    } catch (ex) {
      return inviteModel.save({
        ...inviteObj,
        status: 'error',
      })
    }
  }

  // External API Integration
  public static async saveInviteAsExternalAPI({
    invitorUserId,
    inviteObj,
    isShouldSendEmail = true,
  }: {
    invitorUserId: string
    inviteObj: IInviteModel.Schema
    isShouldSendEmail: boolean
  }): Promise<IInviteModel.Schema> {
    console.log('saveAsExternalAPI accountObj', {
      invitorUserId,
      inviteObj,
      isShouldSendEmail,
    })
    const saveQuery: IInviteModel.Schema = {
      ...inviteObj,
    }

    const saveResult = await inviteModel.save(saveQuery)
    console.log('saveAsExternalAPI saveResult', saveResult)
    if (
      !inviteObj.id &&
      inviteObj.client &&
      inviteObj.status &&
      isShouldSendEmail
    ) {
      console.log('saveAsExternalAPI clientNewCustomer')
      return await InviteResourceController.sendAsExternalCreateClientCaseAPI(
        invitorUserId,
        {
          invite: saveResult.id!,
          clientNewCustomer: true,
        },
      )
    }

    return saveResult
  }

  public static async sendAsExternalCreateClientCaseAPI(
    invitorUserId: string,
    options: InviteResourceController.Send.Options,
  ): Promise<IInviteModel.Schema> {
    console.log('sendAsExternalCreateCaseAPI', { invitorUserId, options })
    const inviteObj = await inviteModel.findById(options.invite)
    let caseObj
    if (inviteObj.case) {
      caseObj = (
        await caseModel.findAllWithPopulatedCustomer({ id: inviteObj.case })
      )[0]
    }

    if (!inviteObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Cannot find invite.',
      })
    }

    if (!caseObj) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Cannot find case.',
      })
    }

    return await InviteResourceController.sendByRole({
      inviteObj,
      invitorUserId,
      options,
      caseObj,
    })
  }
}

export namespace InviteResourceController {
  export namespace Save {
    export interface Options {
      isUpdatingInviteAsNewClientResetPassword: boolean
      isShouldSendEmail?: boolean
      country?: EulogiseCountry
    }
  }
  export namespace Send {
    export interface Options {
      invite: string
      clientNewCustomer?: boolean
    }
  }
}
