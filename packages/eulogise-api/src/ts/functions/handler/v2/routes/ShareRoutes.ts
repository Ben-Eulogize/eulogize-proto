import {
  ALL_EULOGIZE_PRODUCTS,
  CaseResourceRequestParams,
  EulogiseUserRole,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import draftToHtml from 'draftjs-to-html'
import {
  caseModel,
  shareModel,
  slideshowModel,
  themeModel,
  userModel,
} from '../../../../database'
import { IShareModel } from '../../../../database/types/ShareModel.types'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
} from '../../../../types/routes.types'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { Webtoken } from '../../../../webtoken'
import { findAdminResourcesByCaseId } from './CasesRoutes'
import { ProductController } from '../../../controller/ProductController'
import { SendGridHelper } from '../../../../utils/SendGridHelper'

const permitRoles = [
  EulogiseUserRole.ADMIN,
  EulogiseUserRole.CLIENT,
  EulogiseUserRole.CUSTOMER,
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.COEDITOR,
]

const sendShareInvitation = async ({
  share,
}: {
  share: IShareModel.Schema
}) => {
  const recipients = share.recipients.filter((r) => r.selected)
  const invitor = await userModel.findById(share.createdBy)
  const caseId = share.case
  const activeCase = await caseModel.findById(caseId)
  // const customer = await userModel.findById(activeCase.customer)
  // const customerName = customer.fullName
  for (const recipient of recipients) {
    await SendGridHelper.sendShareInvite({
      customerName: invitor.fullName,
      deceasedName: activeCase?.deceased?.fullName!,
      recipient: {
        email: recipient.email,
        name: recipient.fullName!,
      },
      replyTo: {
        email: share.replyEmail ?? NO_REPLY_EULOGISE_EMAIL,
      },
      caseId: share.case,
      customerMessage: draftToHtml(share.invitationMessage!),
    })
  }
}

// Upsert a new share
const upsertShareByCaseId = async (
  request: V2RoutePostRequestEvent<
    Omit<IShareModel.Schema, 'id' | 'createdBy'>
  >,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<{ share: IShareModel.Model }> => {
  const { caseId } = pathParams
  const account: Webtoken.Payload.Account = request.webtoken
  const shareData = request.body as Omit<IShareModel.Schema, 'id' | 'createdBy'>

  const existingShares = await shareModel.findByCaseId(caseId)
  // update share
  if (existingShares.length > 0) {
    const [existingShare] = existingShares
    const share = await shareModel.updateById(
      existingShare.id!,
      shareData as Partial<IShareModel.Schema>,
    )
    await sendShareInvitation({ share })
    return { share }
  }
  // create share
  const share = await shareModel.create({
    ...shareData,
    case: caseId,
    createdBy: account.ref,
  })
  await sendShareInvitation({ share })
  return { share }
}

// Get shares by case ID
const getSharesByCaseId = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<{ shares: Array<IShareModel.Model> }> => {
  const { caseId } = pathParams
  const shares = await shareModel.findByCaseId(caseId)
  for (const share of shares) {
    share.createdBy = (await userModel.findById(share.createdBy)) as any
  }

  return { shares }
}

const getShareCasesByCaseId = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  const { caseId } = pathParams
  const cases = await caseModel.findAllWithPopulatedCustomer({ id: caseId })
  return {
    items: cases,
  }
}

const getShareSlideshowsByCaseId = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  const { caseId } = pathParams
  const slideshows = await slideshowModel.findByCaseId(caseId)
  return {
    items: [slideshows].filter(Boolean),
  }
}

const getResourcesByCaseId = async (
  req: V2RoutePostRequestEvent<{
    resources: CaseResourceRequestParams
  }>,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  const { caseId } = pathParams
  return await findAdminResourcesByCaseId(
    {
      ...req,
      // @ts-ignore
      webtoken: {
        role: EulogiseUserRole.INTERNAL,
      },
    },
    context,
    { caseId },
  )
}

const getShareThemesByCaseId = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  const themes = []
  const { caseId } = pathParams
  const themeIds: Array<string> = []
  for (const product of ALL_EULOGIZE_PRODUCTS) {
    const foundModel = ProductController.getModelByProduct(product)
    const foundItem = await foundModel.findByCaseId(caseId)
    const themeId = foundItem?.content?.theme
    if (themeId && !themeIds.includes(themeId)) {
      themeIds.push(themeId)
    }
  }
  for (const themeId of themeIds) {
    // photobook default theme
    if (themeId === 'default') {
      continue
    }
    const theme = await themeModel.findById(themeId)
    themes.push(theme)
  }
  return { themes, noOfThemes: themes.length }
}

export const getShareThemeById = async (
  request: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string; themeId: string },
) => {
  const { themeId } = pathParams
  const theme = await themeModel.findById(themeId)
  return { theme }
}

export default {
  '/cases/:caseId/shares': {
    POST: RouteMiddleware.authMiddleware(permitRoles, upsertShareByCaseId),
    GET: RouteMiddleware.shareMiddleware(getSharesByCaseId),
  },
  '/cases/:caseId/shares/resources': {
    POST: RouteMiddleware.shareMiddleware(getResourcesByCaseId),
  },
  '/shares/cases/:caseId': {
    GET: RouteMiddleware.shareMiddleware(getShareCasesByCaseId),
  },
  '/shares/cases/:caseId/slideshow': {
    GET: RouteMiddleware.shareMiddleware(getShareSlideshowsByCaseId),
  },
  '/shares/cases/:caseId/themes': {
    GET: RouteMiddleware.shareMiddleware(getShareThemesByCaseId),
  },
  '/shares/cases/:caseId/themes/:themeId': {
    GET: RouteMiddleware.shareMiddleware(getShareThemeById),
  },
}
