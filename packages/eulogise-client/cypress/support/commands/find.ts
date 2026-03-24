const Find = {
  getSelectorByTestId: (testId: string, parentSelector) =>
    `${parentSelector} *[data-testid=${testId}]`,
  getByTestId: (testId: string, parentSelector: string) =>
    cy.get(Find.getSelectorByTestId(testId, parentSelector)),
}

export default Find
