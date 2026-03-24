import { LoginFeature } from '../../../support/commands/features/login'

describe('Dashboard Page', () => {
  describe('Service Card', () => {
    describe(`Logged in as US Customer`, () => {
      beforeEach(() => {
        LoginFeature.givenUSCustomerLoggedIn()
      })

      describe('Order Of Service Booklet Card', () => {
        const serviceCardElementSelector = '#order-of-service-booklet'
        it('should be visible', () => {
          cy.get(serviceCardElementSelector).should('exist')
        })

        describe('Actions', () => {
          it('should have these actions', () => {
            const dropdownElSelector = '#product-dropdown-menu'

            cy.get(serviceCardElementSelector).click()

            cy.get(dropdownElSelector).within(() => {
              cy.findByRole('menuitem', {
                name: /select theme/i,
              }).should('exist')

              cy.findByRole('menuitem', {
                name: /edit program/i,
              }).should('exist')
            })
          })
        })
      })

      describe('Visual Tribute Slideshow Card', () => {
        const serviceCardElementSelector = '#visual-tribute-slideshow-card'
        it('should be visible', () => {
          cy.get(serviceCardElementSelector).should('exist')
        })

        describe('Actions', () => {
          it('should have these actions', () => {
            const dropdownElSelector = '#product-dropdown-menu'

            cy.get(serviceCardElementSelector).click()

            cy.get(dropdownElSelector).within(() => {
              cy.findByRole('menuitem', {
                name: /select theme/i,
              }).should('exist')

              cy.findByRole('menuitem', {
                name: /edit slideshow/i,
              }).should('exist')
            })
          })
        })
      })

      describe('A5 Memorial Card', () => {
        const serviceCardElementSelector: string = `#a5-memorial-card`
        it('should be visible', () => {
          cy.get(serviceCardElementSelector).should('exist')
        })

        describe('Actions', () => {
          it('should have these actions', () => {
            const dropdownElSelector = '#product-dropdown-menu'

            cy.get(serviceCardElementSelector).click()

            cy.get(dropdownElSelector).within(() => {
              cy.findByRole('menuitem', {
                name: /select theme/i,
              }).should('exist')

              cy.findByRole('menuitem', {
                name: /edit card/i,
              }).should('exist')
            })
          })
        })
      })

      describe('A6 Thankyou Card', () => {
        const serviceCardElementSelector: string = `#a6-thankyou-card`
        it('should be visible', () => {
          cy.get(serviceCardElementSelector).should('exist')
        })

        describe('Actions', () => {
          it('should have these actions', () => {
            const dropdownElSelector = '#product-dropdown-menu'

            cy.get(serviceCardElementSelector).click()

            cy.get(dropdownElSelector).within(() => {
              cy.findByRole('menuitem', {
                name: /select theme/i,
              }).should('exist')

              cy.findByRole('menuitem', {
                name: /edit thankyou card/i,
              }).should('exist')
            })
          })
        })
      })

      describe('Bookmark Card', () => {
        const serviceCardElementSelector: string = `#bookmark-card`
        it('should be visible', () => {
          cy.get(serviceCardElementSelector).should('exist')
        })

        describe('Actions', () => {
          it('should have these actions', () => {
            const dropdownElSelector = '#product-dropdown-menu'

            cy.get(serviceCardElementSelector).click()

            cy.get(dropdownElSelector).within(() => {
              cy.findByRole('menuitem', {
                name: /select theme/i,
              }).should('exist')

              cy.findByRole('menuitem', {
                name: /edit bookmark/i,
              }).should('exist')
            })
          })
        })
      })

      describe('TV Welcome Screen Card', () => {
        const serviceCardElementSelector: string = `#tv-welcome-screen-card`
        it('should be visible', () => {
          cy.get(serviceCardElementSelector).should('exist')
        })

        describe('Actions', () => {
          it('should have these actions', () => {
            const dropdownElSelector = '#product-dropdown-menu'

            cy.get(serviceCardElementSelector).click()

            cy.get(dropdownElSelector).within(() => {
              cy.findByRole('menuitem', {
                name: /select theme/i,
              }).should('exist')

              cy.findByRole('menuitem', {
                name: /edit tv welcome screen/i,
              }).should('exist')
            })
          })
        })
      })
    })
  })
})
