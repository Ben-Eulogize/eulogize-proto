import { EulogizeIntegrationCase } from '@eulogise/core'

export class EulogizeBaseIntegration {
  public static async fetchCaseInfoByCaseId(
    externalCaseId: string,
  ): Promise<EulogizeIntegrationCase> {
    throw new Error('fetchCaseInfoByCaseId is not implemented')
  }
}
