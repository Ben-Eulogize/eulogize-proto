import { CardProductFeatures } from './CardProductFeatures'
import {
  EulogisePage,
  EulogiseProduct,
  EulogiseProductName,
  EulogiseRegion,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

export class DashboardFeature {
  public static fullSelectThemeFeature({
    product,
    region,
  }: {
    product: EulogiseProduct
    region: EulogiseRegion
  }) {
    const productCardSelector =
      CardProductHelper.getProductServiceCardSelector(product)
    const productShortName = CardProductHelper.getProductShortName({
      product,
      region,
    })
    beforeEach(() => {
      cy.get(productCardSelector).should('exist').click()
    })

    describe('Select theme', () => {
      beforeEach(() => {
        cy.findByRole('menuitem', {
          name: /select theme/i,
        }).click()
      })

      it('should show the change theme drawer and the theme list should appear', () => {
        CardProductFeatures.assertChangeThemeDrawer({ product, region })
      })

      describe(`Apply to ${productShortName}`, () => {
        beforeEach(() => {
          CardProductFeatures.assertChangeThemeDrawer(
            { product, region },
            () => {
              cy.findByText(new RegExp(`apply to\\s+${productShortName}`, 'i'))
                .filter(':visible')
                .click()
            },
          )
        })

        it('should show change theme confirmation drawer', () => {
          // Change theme Confirmation message should be visible
          cy.findByText(
            'You are about to change the theme used in the following memorial.',
          ).should('be.visible')

          // should apply to the only product
          cy.findByTestId('confirm-product-name').within(() => {
            if (product === EulogiseProduct.BOOKLET) {
              if (region === EulogiseRegion.USA) {
                cy.findByText(EulogiseProductName.BOOKLET_US).should(
                  'be.visible',
                )
              } else if (region === EulogiseRegion.AU) {
                cy.findByText(EulogiseProductName.BOOKLET).should('be.visible')
              }
            }
            if (product === EulogiseProduct.BOOKMARK) {
              cy.findByText(EulogiseProductName.BOOKMARK).should('be.visible')
            }
            if (product === EulogiseProduct.SIDED_CARD) {
              if (region === EulogiseRegion.USA) {
                cy.findByText(EulogiseProductName.SIDED_CARD_US).should(
                  'be.visible',
                )
              } else if (region === EulogiseRegion.AU) {
                cy.findByText(EulogiseProductName.SIDED_CARD).should(
                  'be.visible',
                )
              }
            }
            if (product === EulogiseProduct.SLIDESHOW) {
              cy.findByText(EulogiseProductName.SLIDESHOW).should('be.visible')
            }
            if (product === EulogiseProduct.THANK_YOU_CARD) {
              cy.findByText(EulogiseProductName.THANK_YOU_CARD).should(
                'be.visible',
              )
            }
            if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
              cy.findByText(EulogiseProductName.TV_WELCOME_SCREEN).should(
                'be.visible',
              )
            }
          })

          // Cancel button should appear
          cy.findAllByRole('button', {
            name: /cancel/i,
          })
            .filter(':visible')
            .should('have.length', 2)

          // Confirm Theme Change button should appear
          cy.findByRole('button', {
            name: 'Confirm Theme Change',
          }).should('have.length', 1)
        })

        describe('Click Cancel', () => {
          beforeEach(() => {
            // Cancel button should appear
            cy.findAllByRole('button', {
              name: /cancel/i,
            })
              .filter(':visible')
              .eq(1)
              .click()
          })

          it('should dismiss the change theme confirmation drawer and remain at dashboard', () => {
            // Change theme Confirmation message should not be visible
            cy.findByText(
              'You are about to change the theme used in the following memorial.',
            ).should('not.exist')

            // should apply the following products
            cy.findByTestId('confirm-product-name').should('not.be.exist')

            // should remain at the Dashboard
            cy.assertPage(EulogisePage.DASHBOARD)
          })
        })

        describe('Click Confirm Theme Change', () => {
          beforeEach(() => {
            cy.findByRole('button', {
              name: 'Confirm Theme Change',
            }).click()
          })

          it(`should dismiss the change theme confirmation drawer and direct users to the ${productShortName} editor`, () => {
            // Change theme Confirmation message should not be visible
            cy.findByText(
              'You are about to change the theme used in the following memorial.',
            ).should('not.exist')

            CardProductFeatures.shouldMatchProductEditorUrl(product)
          })
        })
      })

      describe('Apply to All', () => {
        beforeEach(() => {
          CardProductFeatures.assertChangeThemeDrawer(
            { product, region },
            () => {
              cy.findByText(/apply to\s+all/i)
                .filter(':visible')
                .click()
            },
          )
        })

        it('should show change theme confirmation drawer', () => {
          // Change theme Confirmation message should be visible
          cy.findByText(
            'You are about to change the theme used in the following memorial.',
          ).should('be.visible')

          // should apply the following products
          cy.findByTestId('confirm-product-name').within(() => {
            if (region === EulogiseRegion.AU) {
              cy.findByText(EulogiseProductName.BOOKLET).should('be.visible')
              cy.findByText(EulogiseProductName.BOOKMARK).should('be.visible')
              cy.findByText(EulogiseProductName.SIDED_CARD).should('be.visible')
              cy.findByText(EulogiseProductName.SLIDESHOW).should('be.visible')
              cy.findByText(EulogiseProductName.THANK_YOU_CARD).should(
                'be.visible',
              )
              cy.findByText(EulogiseProductName.TV_WELCOME_SCREEN).should(
                'be.visible',
              )
            } else if (region === EulogiseRegion.USA) {
              cy.findByText(EulogiseProductName.BOOKLET_US).should('be.visible')
              cy.findByText(EulogiseProductName.BOOKMARK).should('be.visible')
              cy.findByText(EulogiseProductName.SIDED_CARD_US).should(
                'be.visible',
              )
              cy.findByText(EulogiseProductName.SLIDESHOW).should('be.visible')
              cy.findByText(EulogiseProductName.THANK_YOU_CARD).should(
                'be.visible',
              )
              cy.findByText(EulogiseProductName.TV_WELCOME_SCREEN).should(
                'be.visible',
              )
            }
          })

          // Cancel button should appear
          cy.findAllByRole('button', {
            name: /cancel/i,
          })
            .filter(':visible')
            .should('have.length', 2)

          // Confirm Theme Change button should appear
          cy.findByRole('button', {
            name: 'Confirm Theme Change',
          }).should('have.length', 1)
        })

        describe('Click Confirm Theme Change', () => {
          beforeEach(() => {
            cy.findByRole('button', {
              name: 'Confirm Theme Change',
            }).click()
          })

          it('should dismiss the change theme confirmation drawer and direct users to the booklet editor', () => {
            // Change theme Confirmation message should not be visible
            cy.findByText(
              'You are about to change the theme used in the following memorial.',
            ).should('not.exist')

            // should direct users to the Card Product Editor
            CardProductFeatures.shouldMatchProductEditorUrl(product)
          })
        })
      })
    })

    describe(`Edit ${productShortName}`, () => {})
  }
}
