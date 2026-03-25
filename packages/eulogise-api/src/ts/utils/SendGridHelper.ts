import Sendgrid from '@sendgrid/mail'
import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import type { EmailData } from '@sendgrid/helpers/classes/email-address'
import {
  DEFAULT_CLIENT_EULOGIZE_LOGO_URL,
  DEFAULT_COMPANY_LOGO,
  Sendgrid as SendgridTemplates,
} from '../types'
import { ICaseModel } from '../database/types/CaseModel.types'
import { IUserModel } from '../database/types/UserModel.types'
import { IInvoiceModel } from '../database/types/InvoiceModel.types'
import { IInviteModel } from '../database/types/InviteModel.types'
import { EulogiseUserRole, NO_REPLY_EULOGISE_EMAIL } from '@eulogise/core'

export class SendGridHelper {
  public static async send(options: MailDataRequired): Promise<any> {
    console.log('SendGridHelper send options', options)
    // @ts-ignore
    if (options?.personalizations?.[0]?.to?.email === NO_REPLY_EULOGISE_EMAIL) {
      return
    }
    Sendgrid.setApiKey(process.env.SENDGRID_ACCESS_KEY!)
    return await Sendgrid.send(options)
  }

  private static createOptions<T extends { [key: string]: any } | undefined>({
    templateId,
    inviteeEmail,
    inviteeName,
    replyTo,
    data,
  }: {
    templateId: string
    inviteeName: string
    inviteeEmail: string
    replyTo?: EmailData
    data: T
  }): MailDataRequired {
    return {
      from: {
        name: process.env.SENDGRID_EMAIL_SUPPORT_NAME,
        email: process.env.SENDGRID_EMAIL_SUPPORT_ADDRESS!,
      },
      templateId,
      replyTo,
      personalizations: [
        {
          to: {
            name: inviteeName,
            email: inviteeEmail,
          },
          dynamicTemplateData: { ...data },
        },
      ],
    }
  }

  public static async sendAccountSignUp(
    userObj: Partial<IUserModel.Schema>,
    deceasedName: string,
    magicInviteLink: string,
  ) {
    const substitutions: SendgridTemplates.Template.Account.SignUp = {
      customerName: userObj.fullName!, // TODO: need to be removed
      deceasedName,
      magicInviteLink,
    }

    const options = SendGridHelper.createOptions({
      templateId:
        process.env.SENDGRID_TEMPLATE_LIFECYCLE_UC06 ||
        process.env.SENDGRID_TEMPLATE_ACCOUNT_SIGNUP!,
      inviteeName: userObj.fullName!,
      inviteeEmail: userObj.email!,
      data: substitutions,
    })

    console.log('account sendSignUpEmail sgConfig', JSON.stringify(options))
    return SendGridHelper.send(options)
  }

  public static formatInviteMagicLink(token: string) {
    return `https://${process.env.EULOGISE_APP_DOMAIN}/invite/?token=${token}`
  }

  public static async sendVisitorBookletInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    const templateId =
      process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_BOOKLET
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendVisitorSlideshowInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    const templateId =
      process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_SLIDESHOW
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendVisitorSidedCardInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    const templateId =
      process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_SIDED_CARD
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendVisitorBookmarkInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    const templateId =
      process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_BOOKMARK
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendVisitorThankyouCardInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    const templateId =
      process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_VISITOR_THANKYOUCARD
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendEditorOrCoEditorInviteAsCustomer({
    inviteeName,
    inviteeEmail,
    inviteToken,
    invitorName,
    deceasedName,
    clientEmailAssetUrl,
    role,
  }: {
    inviteeName: string
    inviteeEmail: string
    inviteToken: string
    invitorName: string
    deceasedName: string
    clientEmailAssetUrl: string
    role: EulogiseUserRole.EDITOR | EulogiseUserRole.COEDITOR
  }) {
    const templateId =
      role === EulogiseUserRole.EDITOR
        ? process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_EDITOR_AS_CUSTOMER
        : process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CO_EDITOR_AS_CUSTOMER
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        fullName: inviteeName, // TODO: should be removed
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    console.log('sendCoEditorInviteAsCustomer options', JSON.stringify(options))
    return SendGridHelper.send(options)
  }

  public static async sendEditorOrCoEditorInviteAsClient({
    inviteeName,
    inviteeEmail,
    inviteToken,
    clientUser,
    clientBrand,
    deceasedName,
    clientEmailAssetUrl,
    role,
  }: {
    inviteeName: string
    inviteeEmail: string
    inviteToken: string
    clientUser: string
    clientBrand: string
    deceasedName: string
    clientEmailAssetUrl: string
    role: EulogiseUserRole.EDITOR | EulogiseUserRole.COEDITOR
  }) {
    const templateId =
      role === EulogiseUserRole.EDITOR
        ? process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_EDITOR_AS_CLIENT
        : process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CO_EDITOR_AS_CLIENT
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        clientUser,
        clientBrand,
        customerName: clientUser,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    console.log('sendCoEditorInviteAsClient options', JSON.stringify(options))
    return SendGridHelper.send(options)
  }

  public static async sendContributorInviteAsClient(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    clientUser: string,
    clientBrand: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    console.log('sendContributorInviteAsClient', {
      inviteeName,
      inviteeEmail,
      inviteToken,
      clientUser,
      clientBrand,
      deceasedName,
      clientEmailAssetUrl,
    })
    const templateId =
      process.env.SENDGRID_TEMPLATE_ACCOUNT_SIGNUP_CUSTOMER_AS_CLIENT
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        clientUser,
        clientBrand,
        customerName: clientUser,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendContributorInviteAsCustomer(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
    deceasedName: string,
    clientEmailAssetUrl: string,
  ) {
    const templateId = process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CONTRIBUTOR
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        fullName: inviteeName, // TODO: should be removed
        customerName: invitorName,
        deceasedName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    console.log(
      'sendContributorInviteAsCustomer options',
      JSON.stringify(options),
    )
    return SendGridHelper.send(options)
  }

  public static async sendCustomerInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    invitorName: string,
  ) {
    const templateId = process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CUSTOMER
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        fullName: inviteeName, // TODO: need to be removed
        customerName: invitorName,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
      },
    })
    return SendGridHelper.send(options)
  }

  public static async sendFuneralDirectorInvite(
    inviteeName: string,
    inviteeEmail: string,
    inviteToken: string,
    clientUser: string,
    clientBrand: string,
    clientEmailAssetUrl: string,
  ) {
    console.log('[Debug] - sendFuneralDirectorInvite - variables', {
      inviteeName,
      inviteeEmail,
      inviteToken,
      clientUser,
      clientBrand,
      clientEmailAssetUrl,
    })
    const templateId = process.env.SENDGRID_TEMPLATE_ACCOUNT_INVITE_CLIENT
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        fullName: inviteeName, // TODO: need to be removed
        clientUser,
        clientBrand,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl,
      },
    })
    console.log(
      '[Debug] - sendFuneralDirectorInvite - templateId',
      templateId,
      'options',
      options,
    )
    return SendGridHelper.send(options)
  }

  public static async sendFuneralDirectorInviteViaAPI({
    inviteeName,
    inviteeEmail,
    clientBrand,
    clientEmailAssetUrl,
    funeralDirectorAccessLink,
  }: {
    inviteeName: string
    inviteeEmail: string
    clientBrand: string
    clientEmailAssetUrl: string
    funeralDirectorAccessLink: string
  }) {
    console.log('[Debug] - sendFuneralDirectorInvite - variables', {
      inviteeName,
      clientBrand,
      clientEmailAssetUrl,
      funeralDirectorAccessLink,
    })
    const templateId =
      process.env
        .SENDGRID_TEMPLATE_ACCOUNT_INVITE_NEW_CLIENT_FUNERAL_DIRECTOR_VIA_API
    const options = SendGridHelper.createOptions({
      templateId: templateId!,
      inviteeName,
      inviteeEmail,
      data: {
        inviteeName,
        clientBrand,
        magicInviteLink: funeralDirectorAccessLink,
        clientEmailAssetUrl,
      },
    })
    console.log(
      '[Debug] - sendFuneralDirectorInvite - templateId',
      templateId,
      'options',
      options,
    )
    return SendGridHelper.send(options)
  }

  public static async sendForgotEmail(
    userObj: Partial<IUserModel.Schema>,
    magicPasswordResetLink: string,
  ) {
    const substitutions: SendgridTemplates.Template.Account.Password.Reset = {
      customerName: userObj.fullName!,
      email: userObj.email!,
      magicPasswordResetLink,
    }

    const options = SendGridHelper.createOptions({
      templateId: process.env.SENDGRID_TEMPLATE_ACCOUNT_PASSWORD_RESET!,
      inviteeName: userObj.fullName!,
      inviteeEmail: userObj.email!,
      data: substitutions,
    })
    console.log('account sendForgotEmail sgConfig', JSON.stringify(options))
    return SendGridHelper.send(options)
  }

  private static async sendCardProductPrintEmail(
    templateId: string,
    invoiceObj: Partial<IInvoiceModel.Schema>,
    caseId: string,
    productDescription: string,
  ) {
    const substitutions: SendgridTemplates.Template.Resource.Booklet.Print = {
      quantity: 50,
      deliveryAddress: invoiceObj.details?.keepsakesDetails
        ?.leatherVideoTributeBook?.shippingAddressDetails?.formattedAddress
        ? invoiceObj.details?.keepsakesDetails?.leatherVideoTributeBook
            ?.shippingAddressDetails?.formattedAddress
        : '',
      attentionTo: invoiceObj.details?.keepsakesDetails?.leatherVideoTributeBook
        ?.shippingAddressDetails?.formattedAddress
        ? invoiceObj.details?.keepsakesDetails?.leatherVideoTributeBook
            ?.shippingAddressDetails?.formattedAddress
        : '',
      paperQuality: productDescription,
      pdfUrl: `https://${process.env.XAWS_S3_BUCKET}/cases/${caseId}/booklet.pdf`,
    }
    const options = SendGridHelper.createOptions({
      templateId,
      inviteeName: '',
      inviteeEmail: process.env.SENDGRID_EMAIL_PRINT_ADDRESS!,
      data: substitutions,
    })
    console.log('card product sendPrintEmail config', JSON.stringify(options))
    return SendGridHelper.send(options)
  }

  private static async sendCardProductGeneratedEmail(
    templateId: string,
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
    magicInviteLink: string,
  ) {
    const substitutions: SendgridTemplates.Template.Resource.Booklet.Generated =
      {
        fullName: userObj?.fullName!, // deprecated
        customerName: userObj?.fullName!,
        deceasedName: caseObj?.deceased?.fullName!,
        magicInviteLink,
      }
    const options = SendGridHelper.createOptions({
      templateId,
      inviteeName: userObj.fullName!,
      inviteeEmail: userObj.email!,
      data: substitutions,
    })
    console.log(
      'card product sendCardProductGeneratedEmail config',
      JSON.stringify(options),
    )
    return SendGridHelper.send(options)
  }

  public static async sendShareInvite(params: {
    customerName: string
    deceasedName: string
    recipient: {
      name: string
      email: string
    }
    replyTo: EmailData
    customerMessage: string
    caseId: string
  }) {
    console.log('sendShareInvite', params)
    const {
      customerName,
      deceasedName,
      recipient,
      replyTo,
      caseId,
      customerMessage,
    } = params
    const options = SendGridHelper.createOptions({
      templateId: process.env.SENDGRID_TEMPLATE_SHARE_INVITATION!,
      inviteeName: recipient.name,
      inviteeEmail: recipient.email,
      data: {
        customerName,
        deceasedName,
        inviteeName: recipient.name,
        customerMessage,
        replyTo: (replyTo as any).email,
        magicInviteLink: `https://${process.env.EULOGISE_APP_DOMAIN}/shares/${caseId}`,
      },
      replyTo,
    })

    return SendGridHelper.send(options)
  }

  public static async sendCaseCreatedToClientUser(params: {
    customerName: string
    customerEmail: string
    inviteToken: string
    clientLogoUrl: string
    caseObj: Partial<ICaseModel.Schema>
  }) {
    console.log('sendCaseCreatedToClientUser', params)
    const { customerName, customerEmail, clientLogoUrl, caseObj, inviteToken } =
      params
    const substitutions: SendgridTemplates.Template.Resource.Booklet.Generated =
      {
        fullName: customerName!, // deprecated
        customerName: customerName!,
        deceasedName: caseObj?.deceased?.fullName!,
        magicInviteLink: SendGridHelper.formatInviteMagicLink(inviteToken),
        clientEmailAssetUrl: clientLogoUrl,
      }
    const templateId =
      process.env.SENDGRID_TEMPLATE_RESOURCE_CLIENT_USER_CASE_CREATED!
    const options = SendGridHelper.createOptions({
      templateId,
      inviteeName: customerName,
      inviteeEmail: customerEmail,
      data: substitutions,
    })
    console.log(
      'card product sendCaseCreatedToClientUser config',
      JSON.stringify(options),
    )
    return SendGridHelper.send(options)
  }

  public static async sendCaseCreatedToClientAdmin(params: {
    clientAdminName: string
    clientAdminEmail: string
    customerName: string
    caseObj: Partial<ICaseModel.Schema>
    clientLogoUrl: string
    clientEmailAssetUrl: string
  }) {
    console.log('sendCaseCreatedToClientAdmin', params)
    const {
      clientAdminName,
      clientAdminEmail,
      customerName,
      clientLogoUrl,
      clientEmailAssetUrl,
      caseObj,
    } = params
    const templateId =
      process.env.SENDGRID_TEMPLATE_RESOURCE_CLIENT_ADMIN_CASE_CREATED!

    const substitutions: SendgridTemplates.Template.Resource.Booklet.Generated =
      {
        fullName: customerName!, // deprecated
        customerName: customerName!,
        deceasedName: caseObj?.deceased?.fullName!,
        magicInviteLink: '',
        clientLogoUrl,
        clientEmailAssetUrl,
        arrangerName: clientAdminName,
      }
    const options = SendGridHelper.createOptions({
      templateId,
      inviteeName: clientAdminName,
      inviteeEmail: clientAdminEmail,
      data: substitutions,
    })
    console.log(
      'card product sendCaseCreatedToClientAdmin config',
      JSON.stringify(options),
    )
    return SendGridHelper.send(options)
  }

  public static formatProductDownloadMagicLink(caseId: string) {
    return `https://${process.env.EULOGISE_APP_DOMAIN}?showProductDownload=${caseId}`
  }

  // Slideshow
  public static async sendSlideshowGeneratedEmail(
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
  ) {
    const caseId: string = caseObj.id!
    const substitutions: SendgridTemplates.Template.Resource.Slideshow.Generated =
      {
        fullName: userObj.fullName!, // deprecated
        customerName: userObj.fullName!,
        deceasedName: caseObj.deceased?.fullName!,
        magicInviteLink: SendGridHelper.formatProductDownloadMagicLink(caseId),
      }
    const options = SendGridHelper.createOptions({
      templateId: process.env.SENDGRID_TEMPLATE_RESOURCE_SLIDESHOW_GENERATED!,
      inviteeName: userObj.fullName!,
      inviteeEmail: userObj.email!,
      data: substitutions,
    })
    console.log(
      'slideshow sendSlideshowGeneratedEmail config',
      JSON.stringify(options),
    )
    return SendGridHelper.send(options)
  }

  // Booklet
  public static async sendBookletPrintEmail(
    invoiceObj: Partial<IInvoiceModel.Schema>,
    caseId: string,
    productDescription: string,
  ) {
    return SendGridHelper.sendCardProductPrintEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_BOOKLET_PRINT!,
      invoiceObj,
      caseId,
      productDescription,
    )
  }

  public static async sendBookletGeneratedEmail(
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
  ) {
    const caseId: string = caseObj.id!
    return await SendGridHelper.sendCardProductGeneratedEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_BOOKLET_GENERATED!,
      userObj,
      caseObj,
      SendGridHelper.formatProductDownloadMagicLink(caseId),
    )
  }

  // Bookmark
  public static async sendBookmarkPrintEmail(
    invoiceObj: Partial<IInvoiceModel.Schema>,
    caseId: string,
    productDescription: string,
  ) {
    return SendGridHelper.sendCardProductPrintEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_SIDED_CARD_PRINT!,
      invoiceObj,
      caseId,
      productDescription,
    )
  }

  public static async sendBookmarkGeneratedEmail(
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
  ) {
    const caseId: string = caseObj.id!
    return await SendGridHelper.sendCardProductGeneratedEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_BOOKMARK_GENERATED!,
      userObj,
      caseObj,
      SendGridHelper.formatProductDownloadMagicLink(caseId),
    )
  }

  // Sided Card
  public static async sendSidedCardPrintEmail(
    invoiceObj: Partial<IInvoiceModel.Schema>,
    caseId: string,
    productDescription: string,
  ) {
    return SendGridHelper.sendCardProductPrintEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_SIDED_CARD_PRINT!,
      invoiceObj,
      caseId,
      productDescription,
    )
  }

  public static async sendSidedCardGeneratedEmail(
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
  ) {
    const caseId: string = caseObj.id!
    return await SendGridHelper.sendCardProductGeneratedEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_SIDEDCARD_GENERATED!,
      userObj,
      caseObj,
      SendGridHelper.formatProductDownloadMagicLink(caseId),
    )
  }

  // Thank you Card
  public static async sendThankyouCardPrintEmail(
    invoiceObj: Partial<IInvoiceModel.Schema>,
    caseId: string,
    productDescription: string,
  ) {
    return SendGridHelper.sendCardProductPrintEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_THANKYOUCARD_PRINT!,
      invoiceObj,
      caseId,
      productDescription,
    )
  }

  public static async sendPhotobookGeneratedEmail() {
    console.log('sendPhotobookGeneratedEmail not implemented')
    return new Promise((resolve) => {
      resolve(null)
    })
  }

  public static async sendThankyouCardGeneratedEmail(
    userObj: Partial<IUserModel.Schema>,
    caseObj: Partial<ICaseModel.Schema>,
  ) {
    const caseId: string = caseObj.id!
    return await SendGridHelper.sendCardProductGeneratedEmail(
      process.env.SENDGRID_TEMPLATE_RESOURCE_SIDEDCARD_GENERATED!,
      userObj,
      caseObj,
      SendGridHelper.formatProductDownloadMagicLink(caseId),
    )
  }

  // Invite
  public static async sendInvite<T>(
    templateId: string,
    inviteObj: Partial<IInviteModel.Schema>,
    substitutions: T,
  ) {
    const options = SendGridHelper.createOptions({
      templateId,
      inviteeName: inviteObj.fullName!,
      inviteeEmail: inviteObj.email!,
      data: substitutions,
    })
    return await SendGridHelper.send(options)
  }

  // Admin Invite
  public static async sendAdminInvite<T>(
    templateId: string,
    inviteeName: string,
    inviteeEmail: string,
    substitutions: T,
  ) {
    const options = SendGridHelper.createOptions({
      templateId,
      inviteeName,
      inviteeEmail,
      data: substitutions,
    })
    return await SendGridHelper.send(options)
  }

  public static getClientEmailAssetUrl(clientEmailAsset: string) {
    if (clientEmailAsset?.length > 0) {
      return `https://${process.env.XAWS_S3_BUCKET}/clients/emailAssets/${clientEmailAsset}`
    } else {
      return DEFAULT_CLIENT_EULOGIZE_LOGO_URL
    }
  }

  public static getClientLogoUrl(clientLogoUrl?: string) {
    if (clientLogoUrl) {
      return `https://${process.env.XAWS_S3_BUCKET}/clients/logos/${clientLogoUrl}`
    } else {
      return DEFAULT_COMPANY_LOGO
    }
  }
}
