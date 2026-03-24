import { caseModel, userModel } from '../src/ts/database'

export class CaseHelper {
  public static async getCases(): Promise<any[]> {
    return await caseModel.all({})
  }

  // UNUSED?
  public static async getCasesDontHaveAssociatedUsers(): Promise<any[]> {
    const cases = await this.getCases()
    const casesWithNotCustomer: any[] = []
    await Promise.all(
      cases.map(async (c) => {
        if (c.customer) {
          const customer = await userModel.findById(c.customer)
          if (!customer) {
            console.log('not found customer id', c.customer)
            casesWithNotCustomer.push(c)
            return
          }
          // console.log('found customer', customer)
          return {
            caseId: c.id,
            customer,
          }
        }
        throw new Error('Customer id is undefined')
      }),
    )
    return casesWithNotCustomer
  }

  public static async getCasesByClientId(clientId: string): Promise<any[]> {
    const results: any = await userModel.query({ clientId })
    if (!results) {
      return []
    }
    return results
  }
}
