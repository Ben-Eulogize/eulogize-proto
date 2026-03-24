import { EulogisePage } from '@eulogise/core'

const CypressConfig = Cypress.config()
export const CypressHelper = {
  baseUrl: CypressConfig.baseUrl,
  pageUrl: (page: EulogisePage) => `${CypressHelper.baseUrl}${page}`,
  addCommand: (fnName: string, fn: () => void) => {
    Cypress.Commands.add<any>(fnName, fn)
  },
  addCommands: (obj: object) => {
    for (const [fnName, fn] of Object.entries(obj)) {
      CypressHelper.addCommand(fnName, fn)
    }
  },
}
