import expect from 'expect'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import { MOCK_THEME_DATA_1 } from '../model/mock/mockTheme'
import { IThemeModel } from '../../../src/ts/database/types/ThemeModel.types'
import { MOCK_BOOKLET_THEME_1 } from '../model/mock/mockBookletTheme'
import {
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseProduct,
  EulogiseUserRole,
  ICardProductData,
  ITheme,
  MemorialVisualStatus,
  TestUserRole,
} from '@eulogise/core'
import { MOCK_BOOKLET_1, MOCK_CLIENT_ID_1 } from '@eulogise/mock'
import { themeModel } from '../../../src/ts/database'

describe('ThemeRoutes', () => {
  let results: any
  let theme: IThemeModel.Schema
  const mockTheme = MOCK_THEME_DATA_1
  const mockCardProduct: ICardProductData = {
    id: 'mock-cardproduct-1',
    case: 'mock-case-1',
    content: {
      pageSize: CardProductPageSize.A5,
      theme: 'mock-theme-id-1',
      pages: [],
      pageOrientation: CardProductPageOrientation.PORTRAIT,
      pageMargins: [],
    },
    status: MemorialVisualStatus.NOT_STARTED,
  }
  const otherClientId = 'other-client-id'

  beforeEach(async () => {
    // create
    await themeModel.create({
      clientId: 'other-client-id',
      name: 'other theme-name',
      categories: [],
      baseFont: '',
      dateFormat: '',
      products: {
        booklet: {
          name: 'other-booklet name',
          defaultStyle: {},
          styles: {},
          newPageStyles: {
            header: 'other-header',
            paragraph: '',
            headerHeight: 1,
            paragraphHeight: 1,
          },
          thumbnail: {
            images: ['other-image-thumbnail'],
          },
        },
      },
    })
  })

  describe('Admin', () => {
    const userType = EulogiseUserRole.ADMIN
    beforeEach(async () => {
      results = (
        await TestRequestHelper.request('/v2/themes', {
          userType,
          method: 'POST',
          data: {
            theme: mockTheme,
            product: EulogiseProduct.BOOKLET,
            cardProduct: mockCardProduct,
          },
        })
      ).response
      theme = results.data.theme
    })

    describe('POST /v2/themes', () => {
      it('should create the theme and return the theme with id', () => {
        expect(theme).toEqual({
          ...mockTheme,
          products: {
            ...mockTheme.products,
            booklet: {
              ...mockTheme.products.booklet,
              thumbnail: {
                images: [
                  expect.stringMatching(
                    /https:\/\/media\.eulogisememorials\.com\/themes\/custom\/.+\.jpg/,
                  ),
                ],
              },
            },
          },
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          id: expect.any(String),
        })
      })
    })

    describe('GET /v2/themes', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/themes', {
            userType,
            method: 'GET',
          })
        ).response
      })

      it('should return all themes (including all client themes) summary', () => {
        const data = results.data
        const themes: Array<ITheme> = data.themes
        console.log('themes', data.themes.length)
        expect(data.noOfThemes).toBeGreaterThanOrEqual(1)

        // all client themes
        const allClientThemes = themes.filter((theme) => !!theme.clientId)
        expect(allClientThemes.length).toBeGreaterThanOrEqual(1)

        // other client themes, should have at least one
        const otherClientTheme = themes.filter(
          (theme) => theme.clientId === otherClientId,
        )
        expect(otherClientTheme.length).toBeGreaterThanOrEqual(1)

        // global themes
        const globalThemes = themes.filter((theme) => !theme.clientId)
        expect(globalThemes.length).toBeGreaterThanOrEqual(1)
      })
    })

    describe('PUT /v2/themes/:themeId', () => {
      let newTheme: IThemeModel.Schema
      const newThemeName = 'New Name'
      const updatedBooklet = {
        ...MOCK_BOOKLET_THEME_1,
        thumbnail: {
          images: ['new-image-thumbnail'],
        },
      }

      beforeEach(async () => {
        const themeId = theme.id
        results = (
          await TestRequestHelper.request(`/v2/themes/${themeId}`, {
            userType,
            method: 'PUT',
            data: {
              theme: {
                ...mockTheme,
                products: {
                  booklet: updatedBooklet,
                },
                name: newThemeName,
              },
              cardProduct: MOCK_BOOKLET_1,
              product: EulogiseProduct.BOOKLET,
            },
          })
        ).response
        newTheme = results.data.theme
      })

      it('should update the booklet and it should not remove other products', () => {
        expect(newTheme.products.booklet).toMatchObject({
          ...updatedBooklet,
          thumbnail: {
            images: [
              expect.stringMatching(
                /https:\/\/media\.eulogisememorials\.com\/themes\/custom\/.+\.jpg/,
              ),
            ],
          },
        })
      })
    })

    describe('GET /v2/themes/:themeId', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(`/v2/themes/${theme.id}`, {
            userType,
            method: 'GET',
          })
        ).response
        theme = results.data.theme
      })

      it('should return specified theme in details', () => {
        expect(theme.products.booklet).toEqual({
          ...MOCK_BOOKLET_THEME_1,
          thumbnail: {
            images: [
              expect.stringMatching(
                /https:\/\/media\.eulogisememorials\.com\/themes\/custom\/.+\.jpg/,
              ),
            ],
          },
        })
      })
    })
  })

  describe('Client Admin', () => {
    const userType = EulogiseUserRole.CLIENT
    let clientId: string
    beforeEach(async () => {
      results = (
        await TestRequestHelper.request('/v2/themes', {
          userType,
          method: 'POST',
          data: {
            theme: mockTheme,
            product: EulogiseProduct.BOOKLET,
            cardProduct: mockCardProduct,
          },
        })
      ).response
      theme = results.data.theme
      clientId = theme.clientId
    })

    describe('POST /v2/themes', () => {
      it('should create the theme and return the theme with id', () => {
        expect(theme).toEqual({
          ...mockTheme,
          // should have client Id
          clientId: expect.stringMatching(/[a-z0-9_]+/),
          products: {
            ...mockTheme.products,
            booklet: {
              ...mockTheme.products.booklet,
              thumbnail: {
                images: [
                  expect.stringMatching(
                    /https:\/\/media\.eulogisememorials\.com\/themes\/custom\/.+\.jpg/,
                  ),
                ],
              },
            },
          },
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          id: expect.any(String),
        })
      })
    })

    describe('GET /v2/themes', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/themes', {
            userType,
            method: 'GET',
          })
        ).response
      })

      it('should return all global themes and client themes that belongs to the client', () => {
        const data = results.data
        console.log('themes', data.themes.length)
        expect(data.noOfThemes).toBeGreaterThanOrEqual(1)

        // global theme
        const globalThemes = data.themes.filter(
          (theme: ITheme) => !theme.clientId,
        )
        expect(globalThemes.length).toBeGreaterThanOrEqual(1)

        // client theme
        const clientThemes = data.themes.filter(
          (theme: ITheme) => theme.clientId === clientId,
        )

        // other client themes
        const otherClientThemes = data.themes.filter(
          (theme: ITheme) => theme.clientId === otherClientId,
        )
        expect(otherClientThemes.length).toEqual(0)

        // only themes that belong to the clients
        expect(clientThemes.length).toBeGreaterThanOrEqual(1)
        const allClientThemes = data.themes.filter(
          (theme: ITheme) => !!theme.clientId,
        )
        // no other client themes (all client themes in the response should match theme that belong to the client)
        expect(clientThemes.length).toEqual(allClientThemes.length)
      })

      describe('Client Customer', () => {
        const userType: TestUserRole = 'CLIENT_CUSTOMER'

        describe('GET /v2/themes', () => {
          beforeEach(async () => {
            results = (
              await TestRequestHelper.request('/v2/themes', {
                userType,
                method: 'GET',
              })
            ).response
          })

          it('should return global themes and its clients themes', () => {
            const data = results.data
            console.log('themes', data.themes.length)
            expect(data.noOfThemes).toBeGreaterThanOrEqual(1)

            // global theme
            const globalThemes = data.themes.filter(
              (theme: any) => !theme.clientId,
            )
            expect(globalThemes.length).toBeGreaterThanOrEqual(1)

            const clientId = MOCK_CLIENT_ID_1
            // client theme
            const clientThemes = data.themes.filter(
              (theme: any) => clientId === theme.clientId,
            )
            expect(clientThemes.length).toBeGreaterThan(0)
          })
        })
      })

      describe('Client Editor', () => {
        const userType: TestUserRole = 'CLIENT_EDITOR'

        describe('GET /v2/themes', () => {
          beforeEach(async () => {
            results = (
              await TestRequestHelper.request('/v2/themes', {
                userType,
                method: 'GET',
              })
            ).response
          })

          it('should return global themes and its clients themes', () => {
            const data = results.data
            console.log('themes', data.themes.length)
            expect(data.noOfThemes).toBeGreaterThanOrEqual(1)

            // global theme
            const globalThemes = data.themes.filter(
              (theme: any) => !theme.clientId,
            )
            expect(globalThemes.length).toBeGreaterThanOrEqual(1)

            const clientId = MOCK_CLIENT_ID_1
            // client theme
            const clientThemes = data.themes.filter(
              (theme: any) => clientId === theme.clientId,
            )
            expect(clientThemes.length).toBeGreaterThan(0)
          })
        })
      })

      describe('Client CoEditor', () => {
        const userType: TestUserRole = 'CLIENT_COEDITOR'

        describe('GET /v2/themes', () => {
          beforeEach(async () => {
            results = (
              await TestRequestHelper.request('/v2/themes', {
                userType,
                method: 'GET',
              })
            ).response
          })

          it('should return global themes and its clients themes', () => {
            const data = results.data
            console.log('themes', data.themes.length)
            expect(data.noOfThemes).toBeGreaterThanOrEqual(1)

            // global theme
            const globalThemes = data.themes.filter(
              (theme: any) => !theme.clientId,
            )
            expect(globalThemes.length).toBeGreaterThanOrEqual(1)

            const clientId = MOCK_CLIENT_ID_1
            // client theme
            const clientThemes = data.themes.filter(
              (theme: any) => clientId === theme.clientId,
            )
            expect(clientThemes.length).toBeGreaterThan(0)
          })
        })
      })
    })

    describe('PUT /v2/themes/:themeId', () => {
      let newTheme: IThemeModel.Schema
      const newThemeName = 'New Name'
      const updatedBooklet = {
        ...MOCK_BOOKLET_THEME_1,
        thumbnail: {
          images: ['new-image-thumbnail'],
        },
      }

      beforeEach(async () => {
        const themeId = theme.id
        results = (
          await TestRequestHelper.request(`/v2/themes/${themeId}`, {
            userType,
            method: 'PUT',
            data: {
              theme: {
                ...mockTheme,
                products: {
                  booklet: updatedBooklet,
                },
                name: newThemeName,
              },
              cardProduct: MOCK_BOOKLET_1,
              product: EulogiseProduct.BOOKLET,
            },
          })
        ).response
        newTheme = results.data.theme
      })

      it('should update the booklet and it should not remove other products', () => {
        expect(newTheme.products.booklet).toMatchObject({
          ...updatedBooklet,
          thumbnail: {
            images: [
              expect.stringMatching(
                /https:\/\/media\.eulogisememorials\.com\/themes\/custom\/.+\.jpg/,
              ),
            ],
          },
        })
      })
    })

    describe('GET /v2/themes/:themeId', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(`/v2/themes/${theme.id}`, {
            userType,
            method: 'GET',
          })
        ).response
        theme = results.data.theme
      })

      it('should return specified theme in details', () => {
        expect(theme.products.booklet).toEqual({
          ...MOCK_BOOKLET_THEME_1,
          thumbnail: {
            images: [
              expect.stringMatching(
                /https:\/\/media\.eulogisememorials\.com\/themes\/custom\/.+\.jpg/,
              ),
            ],
          },
        })
      })
    })
  })

  describe('Customer', () => {
    const userType = EulogiseUserRole.CUSTOMER

    describe('POST /v2/themes', () => {
      beforeEach(async () => {
        try {
          results = (
            await TestRequestHelper.request('/v2/themes', {
              userType,
              method: 'POST',
              data: {
                theme: mockTheme,
                product: EulogiseProduct.BOOKLET,
                cardProduct: mockCardProduct,
              },
            })
          ).response
        } catch (ex) {
          results = ex.response
        }
      })

      it('should return 400 http status', () => {
        expect(results.status).toEqual(400)
      })
    })

    describe('GET /v2/themes', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/themes', {
            userType,
            method: 'GET',
          })
        ).response
      })

      it('should return not return any client themes', () => {
        const data = results.data
        console.log('themes', data.themes.length)
        expect(data.noOfThemes).toBeGreaterThanOrEqual(1)

        // global theme
        const globalThemes = data.themes.filter((theme: any) => !theme.clientId)
        expect(globalThemes.length).toBeGreaterThanOrEqual(1)

        // client theme
        const clientThemes = data.themes.filter(
          (theme: any) => !!theme.clientId,
        )
        expect(clientThemes.length).toEqual(0)
      })
    })

    describe('PUT /v2/themes/:themeId', () => {
      const newThemeName = 'New Name'
      const updatedBooklet = {
        ...MOCK_BOOKLET_THEME_1,
        thumbnail: {
          images: ['new-image-thumbnail'],
        },
      }
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/themes', {
            userType: EulogiseUserRole.ADMIN,
            method: 'POST',
            data: {
              theme: mockTheme,
              product: EulogiseProduct.BOOKLET,
              cardProduct: mockCardProduct,
            },
          })
        ).response
        theme = results.data.theme
      })

      beforeEach(async () => {
        const themeId = theme.id
        try {
          results = (
            await TestRequestHelper.request(`/v2/themes/${themeId}`, {
              userType,
              method: 'PUT',
              data: {
                theme: {
                  ...mockTheme,
                  products: {
                    booklet: updatedBooklet,
                  },
                  name: newThemeName,
                },
                cardProduct: MOCK_BOOKLET_1,
                product: EulogiseProduct.BOOKLET,
              },
            })
          ).response
        } catch (ex) {
          results = ex.response
        }
      })

      it('should return status 400', () => {
        expect(results.status).toEqual(400)
      })
    })
  })
})
