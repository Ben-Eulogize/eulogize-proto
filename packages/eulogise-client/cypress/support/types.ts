import { EulogisePage } from '@eulogise/core'

declare global {
  namespace Cypress {
    interface Chainable {
      getSelectorByTestId: (testId: string, parentSelector) => void
      getByTestId: (testId: string, parentSelector: string) => void

      assertPage: (page: EulogisePage) => void
      shouldExists: (selector: string) => void
      shouldNotExist: (selector: string) => void
      shouldBeDisabled: (selector: string) => void
      shouldBeEnabled: (selector: string) => void
      shouldNotExistByTestId: (testId: string, parentSelector: string) => void
      shouldExistsByTestId: (testId: string, parentSelector: string) => void
      shouldBeEnabledByTestId: (testId: string, parentSelector: string) => void
      shouldBeDisabledByTestId: (testId: string, parentSelector: string) => void
      shouldExistAndEnabledByTestId: (
        testId: string,
        parentSelector: string,
      ) => void
      shouldExistAndDisabledByTestId: (
        testId: string,
        parentSelector: string,
      ) => void
    }
  }
}
