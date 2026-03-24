import { Webtoken } from '../../../../webtoken'
import {
  CaseModelWithSummary,
  CaseResourceController,
  ClientResourceController,
} from '../../../controller'
import {
  assetModel,
  caseModel,
  clientModel,
  inviteModel,
} from '../../../../database'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
  V2RoutePutRequestEvent,
} from '../../../../types/routes.types'
import {
  CaseResourceRequestParams,
  CaseResourcesSearchResponse,
  EulogiseUserRole,
  IEulogiseEmbeddedIframeSettings,
} from '@eulogise/core'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { ICaseModel } from '../../../../database/types/CaseModel.types'
import { CaseHelper, CaseSearchType, UtilHelper } from '@eulogise/helpers'
import { CaseReportController } from '../../../controller/resource/CaseReportController'
import { ResourceController } from '../../../controller/ResourceController'

enum AdminSearchCaseMode {
  RECENT = 'RECENT',
  ALL = 'ALL',
}

const getAdminCases = async (
  request: V2RouteGetRequestEvent<{
    mode: AdminSearchCaseMode
  }>,
  context: V2RouteContext,
): Promise<any> => {
  let cases: Array<CaseModelWithSummary> = []
  const account: Webtoken.Payload.Account = request.webtoken
  const { mode = AdminSearchCaseMode.RECENT } = request.queryStringParameters

  switch (mode) {
    case AdminSearchCaseMode.RECENT:
      cases = await CaseReportController.getRecentCaseReport(account)
      break
    case AdminSearchCaseMode.ALL:
      cases = await CaseReportController.getAllReportSummary(account)
      break
    default:
      throw new Error('Invalid search mode')
  }

  return {
    cases,
  }
}

const searchAdminCase = async (
  request: V2RoutePostRequestEvent<{
    query: string
  }>,
  context: V2RouteContext,
): Promise<{
  cases: Array<CaseModelWithSummary>
}> => {
  console.log('searchAdminCase request received')

  const query = request.body.query.trim()
  const searchType = CaseHelper.getSearchType(query)
  switch (searchType) {
    case CaseSearchType.EMAIL:
      const cases = await CaseReportController.findCaseSummariesByEmail(query)
      return {
        cases,
      }
    case CaseSearchType.UUID:
      const caseSummaries =
        await CaseReportController.findCaseSummariesByCaseId(query)
      if (caseSummaries) {
        return {
          cases: caseSummaries,
        }
      }
      return {
        cases: [],
      }
    case CaseSearchType.PARTIAL_EMAIL:
      const partialEmailCases =
        await CaseReportController.findCaseSummariesByPartialEmail(query)
      return {
        cases: partialEmailCases,
      }
  }
}

const getAdminCaseSummaryByCaseId = async (
  req: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<any> => {
  console.log('getAdminCaseSummaryByCaseId request received')
  const caseId = pathParams.caseId
  const noOfInvites = await inviteModel.getInviteCountByCaseId(caseId)
  const noOfImages = await assetModel.getImageCountByCaseId(caseId)
  return {
    noOfInvites,
    noOfImages,
  }
}

const updateCaseByIdV2 = async (
  event: V2RoutePutRequestEvent<ICaseModel.Schema>,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  console.log(
    'updateAdminCaseById request received',
    pathParams.caseId,
    event.body,
  )
  const caseId = pathParams.caseId
  const eulogiseCase = event.body as ICaseModel.Schema

  const newCase = await caseModel.update({ ...eulogiseCase, id: caseId })
  await CaseResourceController.postSaveHook(newCase)
  return { case: newCase }
}

const getAvailableFuneralDirectorsByCaseId = async (
  event: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  const caseId = pathParams.caseId
  console.log('getFuneralDirectorsByCaseId request received', caseId)
  const activeCase = await caseModel.findById(caseId)
  const users = await ClientResourceController.findUsersById(activeCase.client!)
  return {
    funeralDirectors: users.map((u) =>
      UtilHelper.omit(['password', 'shadowToken', 'token'], u),
    ),
  }
}

const assignFuneralDirectorsByCaseId = async (
  event: V2RoutePutRequestEvent<ICaseModel.Schema>,
  context: V2RouteContext,
  pathParams: { caseId: string },
) => {
  const caseId = pathParams.caseId
  const { funeralDirector } = event.body as ICaseModel.Schema
  console.log('assignFuneralDirectorsByCaseId request received', {
    caseId,
    funeralDirector,
  })
  await caseModel.updateById(caseId, {
    funeralDirector,
  })
  return {
    ok: true,
  }
}

export const findAdminResourcesByCaseId = async (
  req: V2RoutePostRequestEvent<{
    resources: CaseResourceRequestParams
  }>,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<CaseResourcesSearchResponse> => {
  const webtoken = req.webtoken
  const resources: CaseResourceRequestParams = req.body.resources ?? []
  const caseId = pathParams.caseId
  console.log('findAdminResourcesByCaseId request received', caseId)
  const results: Array<Partial<CaseResourcesSearchResponse>> =
    await Promise.all(
      resources.map(async (resource) => {
        const resourceName =
          typeof resource === 'string' ? resource : resource.name
        const extraSearchQuery =
          typeof resource === 'string' ? {} : resource.query
        const searchQuery = {
          case: caseId,
          ...extraSearchQuery,
        }
        console.log('findAdminResourcesByCaseId searchQuery', searchQuery)
        const results = await ResourceController.switchHandler(webtoken, {
          resource: resourceName,
          search: searchQuery,
        })
        return {
          [resourceName]: results,
        }
      }),
    )
  console.log('findAdminResourcesByCaseId results', results)
  return UtilHelper.mergeAll(results) as CaseResourcesSearchResponse
}

const getEmbeddedProductDetailsByCaseId = async (
  req: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<{
  case: ICaseModel.Schema
  embeddedIframesSettings?: IEulogiseEmbeddedIframeSettings
}> => {
  const caseId = pathParams.caseId
  console.log('getEmbeddedProductDetailsByCaseId request received', caseId)
  const caseData = await caseModel.findById(caseId)
  const clientId = caseData.client
  let client
  if (clientId) {
    client = await clientModel.findById(caseData.client!)
  }
  return {
    case: caseData,
    embeddedIframesSettings: client?.embeddedIframes,
  }
}

const permitRoles = [
  EulogiseUserRole.ADMIN,
  EulogiseUserRole.CLIENT,
  EulogiseUserRole.CUSTOMER,
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.COEDITOR,
]

export default {
  '/admin/cases': {
    GET: getAdminCases,
  },
  '/admin/cases/search': {
    POST: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN],
      searchAdminCase,
    ),
  },
  '/cases/:caseId/funeralDirectors': {
    GET: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN, EulogiseUserRole.CLIENT],
      getAvailableFuneralDirectorsByCaseId,
    ),
  },
  '/cases/:caseId/funeralDirectors/assign': {
    PUT: RouteMiddleware.authMiddleware(
      [EulogiseUserRole.ADMIN, EulogiseUserRole.CLIENT],
      assignFuneralDirectorsByCaseId,
    ),
  },
  '/admin/cases/:caseId': {
    PUT: RouteMiddleware.authMiddleware(permitRoles, updateCaseByIdV2),
  },
  '/admin/cases/:caseId/summary': {
    GET: getAdminCaseSummaryByCaseId,
  },
  '/admin/cases/:caseId/embeddedDetails': {
    GET: getEmbeddedProductDetailsByCaseId,
  },
  '/admin/cases/:caseId/resources': {
    POST: RouteMiddleware.authMiddleware(
      permitRoles,
      findAdminResourcesByCaseId,
    ),
  },
}
