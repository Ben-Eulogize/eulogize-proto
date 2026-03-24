import { EulogisePage } from '@eulogise/core'
import { CypressHelper } from '../helpers/CypressHelper'
import Find from './find'

const Assertions = {
  assertPage: (page: EulogisePage) =>
    cy.url().should('match', new RegExp(`${CypressHelper.pageUrl(page)}\/*`)),
  shouldExists: (selector: string) => cy.get(selector).should('exist'),
  shouldNotExist: (selector: string) => cy.get(selector).should('not.exist'),
  shouldBeDisabled: (selector: string) =>
    cy.get(selector).should('have.attr', 'aria-disabled', 'true'),
  shouldBeEnabled: (selector: string) =>
    cy.get(selector).should('have.attr', 'aria-disabled', 'false'),

  shouldNotExistByTestId: (testId: string, parentSelector: string) =>
    Assertions.shouldNotExist(Find.getSelectorByTestId(testId, parentSelector)),
  shouldExistsByTestId: (testId: string, parentSelector: string) =>
    Assertions.shouldExists(Find.getSelectorByTestId(testId, parentSelector)),
  shouldBeEnabledByTestId: (testId: string, parentSelector: string) =>
    Assertions.shouldBeEnabled(
      Find.getSelectorByTestId(testId, parentSelector),
    ),
  shouldBeDisabledByTestId: (testId: string, parentSelector: string) =>
    Assertions.shouldBeDisabled(
      Find.getSelectorByTestId(testId, parentSelector),
    ),
  shouldExistAndEnabledByTestId: (testId: string, parentSelector: string) => {
    Assertions.shouldExistsByTestId(testId, parentSelector)
    Assertions.shouldBeEnabledByTestId(testId, parentSelector)
  },
  shouldExistAndDisabledByTestId: (testId: string, parentSelector: string) => {
    Assertions.shouldExistsByTestId(testId, parentSelector)
    Assertions.shouldBeDisabledByTestId(testId, parentSelector)
  },
}

export default Assertions
