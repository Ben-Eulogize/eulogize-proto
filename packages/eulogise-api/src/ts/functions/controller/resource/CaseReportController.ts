import { Webtoken } from '../../../webtoken'
import BBPromise from 'bluebird'
import moment from 'moment'
import {
  EulogiseUserRole,
  IMemorialProductSummary,
  MemorialVisualStatus,
  MemorialVisualStatusLevelOrder,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  bookletModel,
  bookmarkModel,
  caseModel,
  clientModel,
  genericCardProductModel,
  sidedCardModel,
  slideshowModel,
  thankyouCardModel,
  tvWelcomeScreenModel,
  userModel,
} from '../../../database'
import { CaseModelWithSummary } from './case'
import { ICaseModel } from '../../../database/types/CaseModel.types'
import { IUserModel } from '../../../database/types/UserModel.types'
import { IClientModel } from '../../../database/types/ClientModel.types'
import { MemorialProductIndexObject } from '../../../database/model/BaseMemorialModel'
import { IMemorialProductModel } from '../../../database/types/MemorialProductModel.types'
import { caseReportModel } from '../../../database/model/caseReport'
import { CaseHelper, UtilHelper } from '@eulogise/helpers'
import { S3Helper } from '../../../utils/S3Helper'
import { CloudfrontHelper } from '../../../utils/CloudfrontHelper'
import { photobookModel } from '../../../database/model/photobook'

export class CaseReportController {
  /* Private */
  public static getMemorialSummary(
    memorialProducts: Array<IMemorialProductModel.Schema> = [],
  ): IMemorialProductSummary {
    const newMemorialProducts = memorialProducts.filter(Boolean)
    // get highest status among the products
    const highestStatusProduct: {
      status?: MemorialVisualStatus
      id?: string | null
      fileStatus: ResourceFileStatus
      hasGeneratedBefore?: boolean
    } = newMemorialProducts.reduce(
      (acc, curr) => {
        const accStatus = acc.status
        const currStatus = curr.status
        const accStatusPriority =
          MemorialVisualStatusLevelOrder.indexOf(accStatus)
        const currStatusPriority = MemorialVisualStatusLevelOrder.indexOf(
          currStatus!,
        )
        if (currStatusPriority >= accStatusPriority) {
          return {
            id: curr.id,
            status: currStatus,
            fileStatus: curr.fileStatus as ResourceFileStatus,
            hasGeneratedBefore: curr.hasGeneratedBefore,
          }
        }
        return acc
      },
      {
        status: MemorialVisualStatus.NOT_STARTED,
        id: null,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        hasGeneratedBefore: false,
      },
    )
    return {
      ids: newMemorialProducts.map((p) => p.id!),
      activeId: highestStatusProduct.id!,
      status: highestStatusProduct.status!,
      fileStatus: highestStatusProduct.fileStatus!,
      hasGeneratedBefore: highestStatusProduct.hasGeneratedBefore!,
    }
  }

  private static summariseCases({
    cases,
    users,
    clients,
    booklets,
    bookmarks,
    sidedCards,
    slideshows,
    thankyouCards,
    tvWelcomeScreens,
    photobooks,
    genericCardProducts,
  }: {
    cases: Array<ICaseModel.Schema>
    users: { [key: string]: IUserModel.Model }
    clients?: { [key: string]: IClientModel.Model }
    booklets: MemorialProductIndexObject
    bookmarks: MemorialProductIndexObject
    sidedCards: MemorialProductIndexObject
    slideshows: MemorialProductIndexObject
    thankyouCards: MemorialProductIndexObject
    genericCardProducts: MemorialProductIndexObject
    tvWelcomeScreens: MemorialProductIndexObject
    photobooks: MemorialProductIndexObject
  }): Array<CaseModelWithSummary> {
    const casesWithDetails: Array<CaseModelWithSummary> = []
    for (let eulogiseCase of cases) {
      console.log('summaries case', eulogiseCase)

      const caseId = eulogiseCase.id
      const customerUserId = eulogiseCase.customer
      const funeralDirectorUserId = eulogiseCase.funeralDirector

      // console.log('customer found', users[customerUserId])
      casesWithDetails.push({
        ...eulogiseCase,
        customerName: users[customerUserId]?.fullName || '',
        clientName: clients?.[eulogiseCase.client!]?.title ?? '',
        customerEmail: users[customerUserId]?.email || '',
        funeralDirectorName: users[funeralDirectorUserId]?.fullName || '',
        booklet: this.getMemorialSummary(booklets[caseId!]),
        bookmark: this.getMemorialSummary(bookmarks[caseId!]),
        sidedCard: this.getMemorialSummary(sidedCards[caseId!]),
        slideshow: this.getMemorialSummary(slideshows[caseId!]),
        thankyouCard: this.getMemorialSummary(thankyouCards[caseId!]),
        tvWelcomeScreen: this.getMemorialSummary(tvWelcomeScreens[caseId!]),
        photobook: this.getMemorialSummary(photobooks[caseId!]),
        genericCardProducts: this.getMemorialSummary(
          genericCardProducts[caseId!],
        ),
        service: eulogiseCase.service || {},
      })
      console.log('completed: summaries case', eulogiseCase)
    }
    console.log('completed: summaries all cases')
    return casesWithDetails
  }

  public static getCaseReportDownloadPath() {
    return '/tmp/caseReport.json'
  }

  private static async getReportSummaryAsAdmin() {
    console.log('getReportSummaryAsAdmin')
    // return pre-generated case report from S3
    return await S3Helper.getJsonFile({
      key: CaseHelper.getCaseReportS3Path(),
    })
  }

  private static async getReportSummaryAsClient(clientId: string) {
    console.log('getReportSummaryAsClient', clientId)
    return await caseReportModel.getAllByClientId(clientId)
  }

  /* Public */
  public static async updateCaseReportTable() {
    console.log('updateCaseReportTable')
    const summaries = await this.getAllCaseReport()
    try {
      const blocks = UtilHelper.splitEvery(10, summaries)
      console.log('Start batch update data to Case Report table')
      await BBPromise.map(
        blocks,
        (block, index) => {
          const cases = block.map((c) => {
            const { service, ...reportDetails } = c
            return {
              ...reportDetails,
              service: UtilHelper.removeNils(service),
            }
          })
          return caseReportModel.getModel().batchPut(cases)
        },
        { concurrency: 5 },
      )
      /*
      console.log('Start upserting data to Case Report table')
      await BBPromise.map(
        summaries,
        (summary) => caseReportModel.upsertById(summary.id!, summary),
        {
          concurrency: 1,
        },
      )
*/

      await S3Helper.uploadJsonToS3({
        json: summaries,
        s3Path: CaseHelper.getCaseReportS3Path(),
      })
      await CloudfrontHelper.createInvalidation({
        path: `/${CaseHelper.getCaseReportS3Path()}`,
      })
    } catch (ex) {
      console.log('exception', ex)
      throw new Error(ex)
    }
    console.log('Completed batch put')
  }

  public static async getRecentCaseReport(
    account: Webtoken.Payload.Account,
  ): Promise<Array<CaseModelWithSummary>> {
    console.log('getRecentWithMemorySummary')
    console.log('account', account)
    console.log('account role', account.role)
    try {
      if (account.role === EulogiseUserRole.ADMIN) {
        const last30Days = moment().subtract(10, 'days').toDate()
        return await caseReportModel
          .getModel()
          .scan('createdAt')
          .gt(last30Days.getTime())
          .all()
          .exec()
      }
    } catch (ex) {
      console.log('exception', ex)
      throw new Error(ex)
    }
    throw new Error(
      `Account Role: ${account.role} does not have permission to find getRecentWithMemorySummary`,
    )
  }

  public static async findCaseSummariesWithProductDetails({
    foundCases,
  }: {
    foundCases: Array<ICaseModel.Schema>
  }) {
    const [firstCase] = foundCases
    const firstCaseId = firstCase.id!
    const customerId = firstCase.customer as string
    const foundCustomer = customerId
      ? await userModel.findById(customerId)
      : undefined
    const funeralDirectorId = firstCase.funeralDirector
    const foundFuneralDirector = funeralDirectorId
      ? await userModel.findById(funeralDirectorId)
      : undefined
    const foundClient = firstCase.client
      ? await clientModel.findById(firstCase.client)
      : undefined
    const [
      booklet,
      bookmark,
      sidedCard,
      slideshow,
      thankYouCard,
      tvWelcomeScreen,
      photobook,
      genericCardProducts,
    ] = await Promise.all([
      bookletModel.findByCaseId(firstCaseId),
      bookmarkModel.findByCaseId(firstCaseId),
      sidedCardModel.findByCaseId(firstCaseId),
      slideshowModel.findByCaseId(firstCaseId),
      thankyouCardModel.findByCaseId(firstCaseId),
      tvWelcomeScreenModel.findByCaseId(firstCaseId),
      photobookModel.findByCaseId(firstCaseId),
      genericCardProductModel.findByCaseId(firstCaseId),
    ])

    return this.summariseCases({
      cases: foundCases,
      // @ts-ignore
      users: {
        [customerId]: foundCustomer,
        [funeralDirectorId]: foundFuneralDirector,
      },
      clients: foundClient
        ? {
            [firstCase.client as string]: foundClient as IClientModel.Model,
          }
        : undefined,
      booklets: {
        [firstCaseId]: [booklet],
      } as MemorialProductIndexObject,
      bookmarks: {
        [firstCaseId]: [bookmark],
      } as MemorialProductIndexObject,
      sidedCards: {
        [firstCaseId]: [sidedCard],
      } as MemorialProductIndexObject,
      slideshows: {
        [firstCaseId]: [slideshow],
      } as MemorialProductIndexObject,
      thankyouCards: {
        [firstCaseId]: [thankYouCard],
      } as MemorialProductIndexObject,
      tvWelcomeScreens: {
        [firstCaseId]: [tvWelcomeScreen],
      } as MemorialProductIndexObject,
      photobooks: {
        [firstCaseId]: [photobook],
      } as MemorialProductIndexObject,
      genericCardProducts: {
        [firstCaseId]: [genericCardProducts],
      },
    })
  }

  public static async findCaseSummariesByCaseId(
    caseId: string,
  ): Promise<Array<CaseModelWithSummary>> {
    const foundCase = await caseModel.findById(caseId)
    if (!foundCase) {
      console.log(
        'CaseResourceController.findCaseSummaryByCaseId: Case not found',
      )
      return []
    }
    return this.findCaseSummariesWithProductDetails({
      foundCases: [foundCase],
    })
  }

  public static async findCaseSummariesByEmail(
    email: string,
  ): Promise<Array<CaseModelWithSummary>> {
    const foundUser = await userModel.findOneByEmail(email)
    if (!foundUser) {
      console.log('CaseResourceController.findCasesByEmail: User not found')
      return []
    }
    const { id: customerId } = foundUser
    if (!customerId) {
      console.log(
        'CaseResourceController.findCasesByEmail: customerId not found',
      )
      return []
    }
    const foundCases = await caseModel.findByCustomerId(customerId)
    if (foundCases.length === 0) {
      console.log('no cases found for the user')
      return []
    }
    return this.findCaseSummariesWithProductDetails({
      foundCases,
    })
  }

  public static async findCaseSummariesByPartialEmail(
    partialEmail: string,
  ): Promise<Array<CaseModelWithSummary>> {
    const foundUsers = await userModel.findByPartialEmail(partialEmail)
    if (foundUsers.length === 0) {
      console.log(
        'CaseResourceController.findCaseSummariesByPartialEmail: No users found',
      )
      return []
    }
    const customerIds = foundUsers
      .map((user) => user.id)
      .filter((id): id is string => !!id)
    if (customerIds.length === 0) {
      return []
    }
    const casesPromises = customerIds.map((customerId) =>
      caseModel.findByCustomerId(customerId),
    )
    const casesArrays = await Promise.all(casesPromises)
    const foundCases = casesArrays.flat()
    if (foundCases.length === 0) {
      console.log('no cases found for matched users')
      return []
    }
    return this.findCaseSummariesWithProductDetails({
      foundCases,
    })
  }

  public static async getAllCaseReport(): Promise<Array<CaseModelWithSummary>> {
    console.log('getAllCaseReport')
    const summaryAttributes = [
      'case',
      'id',
      'status',
      'fileStatus',
      'hasGeneratedBefore',
    ]
    const [
      cases,
      users,
      clients,
      booklets,
      bookmarks,
      sidedCards,
      slideshows,
      thankyouCards,
      tvWelcomeScreens,
      photobooks,
      genericCardProducts,
    ] = await Promise.all([
      caseModel.getAll(),
      userModel.getAllIndexesById(['id', 'fullName', 'email']),
      clientModel.getAllIndexesById(['id', 'title']),
      bookletModel.getAllIndexesByCaseId(summaryAttributes),
      bookmarkModel.getAllIndexesByCaseId(summaryAttributes),
      sidedCardModel.getAllIndexesByCaseId(summaryAttributes),
      slideshowModel.getAllIndexesByCaseId(summaryAttributes),
      thankyouCardModel.getAllIndexesByCaseId(summaryAttributes),
      tvWelcomeScreenModel.getAllIndexesByCaseId(summaryAttributes),
      photobookModel.getAllIndexesByCaseId(summaryAttributes),
      genericCardProductModel.getAllIndexesByCaseId(summaryAttributes),
    ])
    console.log('start summarising cases')

    return this.summariseCases({
      cases: cases.filter((c) => c.id !== '*'),
      clients,
      users,
      booklets,
      bookmarks,
      sidedCards,
      slideshows,
      thankyouCards,
      tvWelcomeScreens,
      photobooks,
      genericCardProducts,
    })
  }

  public static async getAllReportSummary(
    account: Webtoken.Payload.Account,
  ): Promise<Array<CaseModelWithSummary>> {
    console.log('getReportSummary')
    console.log('account', account)
    console.log('account role', account.role)
    if (account.role === EulogiseUserRole.ADMIN) {
      return this.getReportSummaryAsAdmin()
    } else if (account.role === EulogiseUserRole.CLIENT) {
      const userId = account.ref
      const client = await clientModel.findOneByUserId(userId)
      return this.getReportSummaryAsClient(client.id!)
    }
    throw new Error(
      `Account Role: ${account.role} does not have permission to find cases`,
    )
  }

  public static async upsertCaseReportById(caseId: string) {
    console.log('upsertCaseReportById', caseId)
    const [caseReport] = await this.findCaseSummariesByCaseId(caseId)
    console.log('new case report', caseReport)
    return await caseReportModel.upsertById(caseId, caseReport)
  }
}
