import moment from 'moment'
import BluebirdPromise from 'bluebird'
import { EulogiseUserRole, MemorialVisualStatus } from '@eulogise/core'
import {
  assetModel,
  bookletModel,
  bookmarkModel,
  caseModel,
  sidedCardModel,
  slideshowModel,
  thankyouCardModel,
  tvWelcomeScreenModel,
  userModel,
} from '../database'
import { S3Helper } from './S3Helper'
import { caseReportModel } from '../database/model/caseReport'

console.log(`DB_PREFIX=${process.env.DB_PREFIX}`)

const threeMonthsAgo = moment().subtract(3, 'month').toDate().getTime()
const OneWeekAgo = moment().subtract(1, 'week').toDate().getTime()

const Models = [
  { id: 'booklet', Model: bookletModel },
  { id: 'bookmark', Model: bookmarkModel },
  { id: 'sidedCard', Model: sidedCardModel },
  { id: 'thankyouCard', Model: thankyouCardModel },
  { id: 'slideshow', Model: slideshowModel },
  { id: 'tvWelcomeScreen', Model: tvWelcomeScreenModel },
]

export class DbCleanUpHelper {
  public static async isCaseOlderThan1Week({
    caseId,
  }: {
    caseId: string
  }): Promise<boolean> {
    const c = await caseModel.findById(caseId)
    if (c.createdAt && moment(c.createdAt).isAfter(OneWeekAgo)) {
      // @ts-ignore
      console.log(
        `isCaseOlderThan1Week: case was created at ${c.createdAt}. Not removing`,
      )
      return false
    }
    console.log(`case was created at ${c.createdAt}. Removing`)
    return true
  }

  public static async getCasesOlderThan1Week(): Promise<Array<string>> {
    const cases = await caseModel.getModel().scan().exec()
    const removableCases: Array<string> = []
    for (const c of cases) {
      if (!c.id) {
        throw new Error(`caseId is undefined`)
      }
      const isRemovable = await this.isCaseOlderThan1Week({
        caseId: c.id,
      })
      if (isRemovable) {
        removableCases.push(c.id)
      }
    }
    console.log('removableCases', removableCases)
    return removableCases
  }

  public static async deleteCasesOlderThan1Week(): Promise<void> {
    console.log('Deleting cases older than 1 week')
    const removableCases = await this.getCasesOlderThan1Week()
    console.log('removableCases', removableCases)
    for (const caseId of removableCases) {
      await this.deleteCaseById(caseId)
    }
  }

  // active status: Downloaded / Completed
  public static async isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus({
    caseId,
  }: {
    caseId: string
  }): Promise<boolean> {
    const c = await caseModel.findById(caseId)
    // check if the case is a client case
    if (c.client) {
      // @ts-ignore
      console.log(
        `isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus: case is belong to a client. Not removing`,
      )
      return false
    }
    if (c.retainOnCleanup) {
      console.log(
        `case (${caseId}) is marked to retain on cleanup. Not removing`,
      )
      return false
    }
    // check if the case is created within 3 months
    if (c.updatedAt && moment(c.updatedAt).isAfter(threeMonthsAgo)) {
      // @ts-ignore
      console.log(
        `isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus: case was updated at ${c.updatedAt}. Not removing`,
      )
      return false
    }
    console.log(`case was updated at ${c.updatedAt}. Check product status`)
    const productModels = [
      bookletModel,
      bookmarkModel,
      sidedCardModel,
      slideshowModel,
      thankyouCardModel,
      tvWelcomeScreenModel,
    ]
    for (const productModel of productModels) {
      const booklet = await productModel.findByCaseId(c.id!)
      const activeStatuses = [
        MemorialVisualStatus.DOWNLOAD,
        MemorialVisualStatus.COMPLETE,
      ]
      if (activeStatuses.includes(booklet?.status!)) {
        return false
      }
    }

    return true
  }

  public static async getCasesOlderThan3MonthsNonClientCasesAndNotActiveStatus(): Promise<
    Array<string>
  > {
    const cases = await caseModel.getModel().scan().exec()
    const removableCases: Array<string> = []
    const nonRemovableCases: Array<string> = []
    for (const c of cases) {
      if (!c.id) {
        throw new Error(`caseId is undefined`)
      }
      const isRemovable =
        await this.isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus({
          caseId: c.id,
        })
      if (isRemovable) {
        removableCases.push(c.id)
      } else {
        nonRemovableCases.push(c.id)
      }
    }
    console.log('nonRemovableCases', nonRemovableCases)
    console.log('nonRemovableCases Size', nonRemovableCases.length)
    console.log('removableCases', removableCases)
    console.log('removableCases Size', removableCases.length)
    return removableCases
  }

  public static async deleteCaseOlderThan3MonthsNonClientCasesAndNotActiveStatus(): Promise<void> {
    console.log('Deleting cases older than 3 months and not active status')
    const removableCases =
      await this.getCasesOlderThan3MonthsNonClientCasesAndNotActiveStatus()
    console.log('removableCases', removableCases)
    for (const caseId of removableCases) {
      await this.deleteCaseById(caseId)
    }
  }

  public static async isCaseActive(eCase: any) {
    const caseId = eCase?.id
    if (!caseId) {
      console.log('No case id', caseId)
      return
    }
    console.log('caseId', caseId)

    let isActive = false
    // if case is created within 3 months, return true
    if (eCase.updatedAt && moment(eCase.updatedAt).isAfter(threeMonthsAgo)) {
      // @ts-ignore
      console.log(`case was updated at ${eCase.updatedAt}`)
      return true
    }
    if (eCase.status === 'paid') {
      return true
    }
    await BluebirdPromise.mapSeries(Models, async (item) => {
      console.log(`checking "${item.id}" for caseId: "${caseId}"`)
      const Model = item.Model.getModel()
      const dataItems = await Model.scan({
        case: caseId,
      }).exec()

      console.log(`Found items (${dataItems.length}) for "${item.id}"`)
      await BluebirdPromise.mapSeries(dataItems, (dataItem: any) => {
        console.log('updatedAt', dataItem.updatedAt)
        const updatedAt = dataItem.updatedAt
        if (moment(updatedAt).isAfter(threeMonthsAgo)) {
          isActive = true
        }
      })
    })
    return isActive
  }

  public static async isAccountActive(
    accountId: string,
  ): Promise<boolean | undefined> {
    const eCases = await caseModel.findByCustomerId(accountId)
    let isActive
    await BluebirdPromise.mapSeries(eCases, async (eCase) => {
      const caseId = eCase?.id
      if (!caseId) {
        console.log('No case id', eCases)
        return
      }
      isActive = await this.isCaseActive(eCase)
    })
    return isActive
  }

  public static async deleteProductByCaseId(caseId: string) {
    await BluebirdPromise.mapSeries(Models, async ({ id, Model }) => {
      console.log(`delete "${id}" for caseId: ${caseId}`)

      const productItems = await Model.getModel().scan({ case: caseId }).exec()

      const productItemIds = await BluebirdPromise.map(
        productItems,
        (b) => b.id,
      )
      if (productItemIds.length > 0) {
        console.log(`deleting "${id}" ids: ${productItemIds}`)
        await BluebirdPromise.mapSeries(productItemIds, async (pid: string) => {
          await Model.getModel().delete(pid)
        })
      }
    })
    console.log(`deleting caseId: ${caseId}`)
    await caseModel.getModel().delete(caseId)
  }

  public static async deleteAccount(accountId: string) {
    const cases = await caseModel
      .getModel()
      .scan({
        customer: accountId,
      })
      .exec()
    console.log('deleting account', accountId)
    await BluebirdPromise.mapSeries(cases, async (eCase) => {
      const caseId = eCase?.id
      if (!caseId) {
        return
      }
      await this.deleteProductByCaseId(caseId)
    })
    await userModel.getModel().delete(accountId)
  }

  public static async getInactiveAccounts(): Promise<string[]> {
    const users = await userModel
      .getModel()
      .scan({
        createdAt: {
          lt: threeMonthsAgo,
        },
        role: EulogiseUserRole.CUSTOMER,
      })
      .exec()
    console.log('users count:', users.length)

    const accounts: any = []
    await BluebirdPromise.map(
      users,
      async (u) => {
        const isAccountActive = await this.isAccountActive(u.id!)
        if (isAccountActive === false) {
          // @ts-ignore
          accounts.push(u)
        }
      },
      { concurrency: 1 },
    )

    console.log(
      'Inactive accounts:',
      accounts.map((a: any) => ({
        id: a.id,
        email: a.email,
        updatedAt: a.updatedAt,
      })),
    )
    console.log('Inactive accounts count:', accounts.length)
    return accounts.map((a: any) => a.id)
  }

  public static async deleteInactiveAccounts() {
    const accountIds = await this.getInactiveAccounts()
    console.log('accountIds', accountIds)
    await BluebirdPromise.mapSeries(accountIds, async (accountId) => {
      await this.deleteAccount(accountId)
    })
  }

  public static async getNonClientCases(): Promise<Array<string>> {
    const cases = await caseModel
      .getModel()
      .scan('client')
      .not()
      .exists()
      .exec()

    cases.forEach((c) => {
      console.log(
        `case id: ${c.id}; customer id: ${c.customer}; createdAt: ${new Date(
          c.createdAt!,
        )}`,
      )
    })
    return cases.map((c) => c.id) as Array<string>
  }

  public static async deleteNonClientUserCases(): Promise<void> {
    const nonClientCaseIds = await this.getNonClientCases()
    console.log('nonClientCaseIds', nonClientCaseIds)
    for (const caseId of nonClientCaseIds) {
      await this.deleteCaseById(caseId)
    }
  }

  public static async deleteCaseById(caseId: string): Promise<void> {
    if (caseId.trim() === '*') {
      console.log(`caseId (${caseId}) cannot be deleted`)
      return
    }
    // remove all memorial product for the case
    await bookletModel.removeByCaseId(caseId)
    await bookmarkModel.removeByCaseId(caseId)
    await sidedCardModel.removeByCaseId(caseId)
    await slideshowModel.removeByCaseId(caseId)
    await thankyouCardModel.removeByCaseId(caseId)
    await tvWelcomeScreenModel.removeByCaseId(caseId)

    // remove all s3 assets
    await S3Helper.deleteCaseResourceById({ caseId })

    // remove all assets
    await assetModel.removeByCaseId({ caseId })

    const currentCase = await caseModel.findById(caseId)
    let userId = currentCase.customer
    if (userId) {
      // check if the customer has other cases
      const otherCases = await caseModel.findByCustomerId(userId)
      // if the customer has only one case and the user is not a client user, remove the customer user
      const user = await userModel.findById(userId)
      if (user) {
        // check if the user has any cases that are client cases
        const cases = await caseModel.findByCustomerId(userId)
        const hasClientCases = cases.some((c) => c.client)

        if (
          // do not delete user if users have cases that belongs to a client
          !hasClientCases &&
          otherCases.length === 1 &&
          otherCases[0].id === caseId &&
          user.role !== EulogiseUserRole.CLIENT &&
          user.role !== EulogiseUserRole.ADMIN
        ) {
          // remove customer user
          await userModel.remove({ id: userId })
        }
      }
    }

    // remove the case
    await caseModel.remove({ id: caseId })

    // remove caseReport row
    await caseReportModel.remove({ id: caseId })
  }
}

/*
const start = async () => {
  console.log('Removing old accounts')
  const users = await userModel.getModel().scan().exec()
  console.log('Before users count:', users.length)

  await RemoveOldAccounts.deleteInactiveAccounts()
}

start()
*/
