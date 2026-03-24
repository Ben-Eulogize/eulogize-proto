import { EulogiseProduct, EulogiseRegion } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

export class CardProductFeatures {
  public static shouldMatchProductEditorUrl(product: EulogiseProduct) {
    switch (product) {
      case EulogiseProduct.BOOKLET: {
        cy.url().should(
          'match',
          new RegExp(`/admin/booklets/[a-zA-Z0-9\-]+\/*`),
        )
        break
      }
      case EulogiseProduct.BOOKMARK: {
        cy.url().should(
          'match',
          new RegExp(`/admin/bookmarks/[a-zA-Z0-9\-]+\/*`),
        )
        break
      }
      case EulogiseProduct.SLIDESHOW: {
        cy.url().should(
          'match',
          new RegExp(`/admin/slideshows/[a-zA-Z0-9\-]+\/*`),
        )
        break
      }
      case EulogiseProduct.SIDED_CARD: {
        cy.url().should(
          'match',
          new RegExp(`/admin/sidedCards/[a-zA-Z0-9\-]+\/*`),
        )
        break
      }
      case EulogiseProduct.THANK_YOU_CARD: {
        cy.url().should(
          'match',
          new RegExp(`/admin/thankYouCards/[a-zA-Z0-9\-]+\/*`),
        )
        break
      }
      case EulogiseProduct.TV_WELCOME_SCREEN: {
        cy.url().should(
          'match',
          new RegExp(`/admin/tvWelcomeScreens/[a-zA-Z0-9\-]+\/*`),
        )
        break
      }
    }
  }

  public static clientCreateCase({
    familyName,
    deceasedName,
  }: {
    familyName: string
    deceasedName: string
  }) {
    cy.findByRole('menuitem', {
      name: /create new tribute/i,
    })
      .should('exist')
      .click()

    cy.get('.create-case-modal')
      .should('be.visible')
      .eq(1)
      .within(() => {
        cy.wait(500)
        // Service Date field
        cy.findAllByPlaceholderText(/Select date/i)
          .should('be.visible')
          .first()
          .click()

        cy.get('.ant-picker-cell-today').click()

        // Decease name field
        cy.findAllByPlaceholderText(/deceased name/i)
          .first()
          .should('be.visible')
          .type(deceasedName)

        // Family Name field
        cy.findAllByPlaceholderText(/John Smith/i)
          .first()
          .should('be.visible')
          .type(familyName)

        cy.get('.ant-modal-footer').within(() => {
          // Click create button
          cy.findByRole('button', {
            name: 'Create',
          })
            .should('be.visible')
            .click()
        })
      })

    // make sure it is in descending order
    cy.findByText(/Case Created/i)
      .should('be.visible')
      // ascending
      .click()
      // descending
      .click()
  }

  public static assertChangeThemeDrawer(
    { product, region }: { product: EulogiseProduct; region: EulogiseRegion },
    callback?: () => void,
  ) {
    const productShortName = CardProductHelper.getProductShortName({
      product,
      region,
    })
    // wait until the theme modal is fully visible
    cy.wait(500)

    cy.get('.slick-list')
      .filter(':visible')
      .first()
      .within(() => {
        cy.get('.slick-current[data-index="0"]')
          .filter(':visible')
          .first()
          .trigger('mouseover')
          .within(() => {
            // should have the "Apply to Program" link
            cy.findByText(new RegExp(`apply to\\s+${productShortName}`, 'i'))
              .filter(':visible')
              .should('have.length', 1)

            // should have the "Apply to All" link
            cy.findByText(/apply to\s+all/i)
              .filter(':visible')
              .should('have.length', 1)

            if (callback) {
              callback()
            }
          })
      })
  }
}
