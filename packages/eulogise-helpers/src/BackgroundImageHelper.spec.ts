import { BackgroundImageHelper } from './BackgroundImageHelper'
import {
  BACKGROUND_IMAGE_CATEGORIES,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  ICardProductBackgroundImageBase,
} from '@eulogise/core'
import { MOCK_BACKGROUND_IMAGES } from '@eulogise/mock'

describe('BackgroundImageHelper', () => {
  let results: any

  describe('getBackgroundImagePropertyKeysByProduct', () => {
    beforeEach(() => {
      results = BackgroundImageHelper.getBackgroundImagePropertyKeysByProduct(
        EulogiseProduct.BOOKLET,
      )
    })

    it('should return all booklet related keys', () => {
      expect(results).toEqual([
        'BOOKLET_FRONT',
        'BOOKLET_FRONT_BOTH_SIDE',
        'BOOKLET_LEFT',
        'BOOKLET_RIGHT',
        'BOOKLET_BACK',
        'BOOKLET_BACK_BOTH_SIDE',
        'BOOKLET_FRONT_BLEED',
        'BOOKLET_FRONT_BOTH_SIDE_BLEED',
        'BOOKLET_LEFT_BLEED',
        'BOOKLET_RIGHT_BLEED',
        'BOOKLET_BACK_BLEED',
        'BOOKLET_BACK_BOTH_SIDE_BLEED',
        'BOOKLET_BACK_BOTH_SIDE_USA_BLEED',
        'BOOKLET_BACK_BOTH_SIDE_USA',
        'BOOKLET_BACK_USA_BLEED',
        'BOOKLET_BACK_USA',
        'BOOKLET_FRONT_BOTH_SIDE_USA_BLEED',
        'BOOKLET_FRONT_BOTH_SIDE_USA',
        'BOOKLET_FRONT_USA_BLEED',
        'BOOKLET_FRONT_USA',
        'BOOKLET_LEFT_USA_BLEED',
        'BOOKLET_LEFT_USA',
        'BOOKLET_RIGHT_USA_BLEED',
        'BOOKLET_RIGHT_USA',
      ])
    })
  })

  describe('getEditedBackgroundUrlPath', () => {
    const backgroundImageId = 'mock-background-image-id'
    const product = EulogiseProduct.BOOKLET
    const region = EulogiseRegion.USA

    beforeEach(() => {
      results = BackgroundImageHelper.getEditedBackgroundUrlPath({
        backgroundImageId,
        product,
        region,
      })
    })

    it('should return correct url path', () => {
      expect(results).toEqual(
        'backgroundImages/mock-background-image-id/edited_BOOKLET_USA.jpg',
      )
    })
  })

  describe('isBackgroundEditable', () => {
    describe('Admin', () => {
      beforeEach(() => {
        results = BackgroundImageHelper.isBackgroundEditable(
          EulogiseUserRole.ADMIN,
          { id: 'id', name: 'name', categoryIds: [] },
        )
      })

      it('should return true', () => {
        expect(results).toBe(true)
      })
    })

    describe('Client Admin', () => {
      const role = EulogiseUserRole.CLIENT
      describe('Global Image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(
            role,
            // global image do not have clientid and customerid
            { id: 'id', name: 'name', categoryIds: [] },
          )
        })

        it('should return false', () => {
          expect(results).toBe(false)
        })
      })

      describe('Client Image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            clientId: 'mock-client-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return true', () => {
          expect(results).toBe(true)
        })
      })
    })

    describe('Editor', () => {
      const role = EulogiseUserRole.EDITOR
      describe('Global Image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            categoryIds: [],
          })
        })

        it('should return false', () => {
          expect(results).toBe(false)
        })
      })

      describe('Client Image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            clientId: 'mock-client-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return false', () => {
          expect(results).toBe(false)
        })
      })

      describe('Customer image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            customerId: 'mock-customer-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return true', () => {
          expect(results).toBe(true)
        })
      })

      describe('Customer image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            customerId: 'mock-customer-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return true', () => {
          expect(results).toBe(true)
        })
      })
    })

    describe('CoEditor', () => {
      const role = EulogiseUserRole.COEDITOR
      describe('Global Image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            categoryIds: [],
          })
        })

        it('should return false', () => {
          expect(results).toBe(false)
        })
      })

      describe('Client Image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            clientId: 'mock-client-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return false', () => {
          expect(results).toBe(false)
        })
      })

      describe('Customer image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            customerId: 'mock-customer-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return true', () => {
          expect(results).toBe(true)
        })
      })

      describe('Customer image', () => {
        beforeEach(() => {
          results = BackgroundImageHelper.isBackgroundEditable(role, {
            id: 'id',
            name: 'name',
            customerId: 'mock-customer-id',
            categoryIds: ['cat-1'],
          })
        })

        it('should return true', () => {
          expect(results).toBe(true)
        })
      })
    })
  })

  describe('createBackgroundImage', () => {
    const id = 'background-id'
    const name = 'background name'
    const categoryIds = ['cat-1', 'cat-2']

    describe('AU', () => {
      const region = EulogiseRegion.AU
      beforeEach(() => {
        results = BackgroundImageHelper.createBackgroundImage({
          id,
          name,
          region,
          categoryIds,
        })
      })

      it('should return results', () => {
        const filePrefix = 'backgroundImages/background-id/AU/background-id'
        expect(results).toEqual({
          id,
          name,
          categoryIds,
          cardProducts: {
            [EulogiseProduct.BOOKLET]: {
              back: `${filePrefix}_BOOKLET_BACK.jpg`,
              front: `${filePrefix}_BOOKLET_FRONT.jpg`,
              left: `${filePrefix}_BOOKLET_LEFT.jpg`,
              right: `${filePrefix}_BOOKLET_RIGHT.jpg`,
            },
            [EulogiseProduct.BOOKMARK]: {
              back: `${filePrefix}_BOOKMARK_BACK.jpg`,
              front: `${filePrefix}_BOOKMARK_FRONT.jpg`,
              left: '',
              right: '',
            },
            [EulogiseProduct.SIDED_CARD]: {
              back: `${filePrefix}_BOOKLET_BACK_BOTH_SIDE.jpg`,
              front: `${filePrefix}_BOOKLET_FRONT_BOTH_SIDE.jpg`,
              left: '',
              right: '',
            },
            [EulogiseProduct.THANK_YOU_CARD]: {
              back: '',
              front: `${filePrefix}_THANK_YOU_CARD.jpg`,
              left: `${filePrefix}_THANK_YOU_CARD_2_COL_LEFT.jpg`,
              right: `${filePrefix}_THANK_YOU_CARD_2_COL_RIGHT.jpg`,
            },
            [EulogiseProduct.TV_WELCOME_SCREEN]: {
              back: '',
              front: `${filePrefix}_THANK_YOU_CARD.jpg`,
              left: `${filePrefix}_TV_WELCOME_SCREEN_LEFT.jpg`,
              right: `${filePrefix}_TV_WELCOME_SCREEN_RIGHT.jpg`,
            },
            [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: {
              back: '',
              front:
                'backgroundImages/background-id/AU/background-id_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/background-id/AU/background-id_TV_WELCOME_SCREEN_LEFT.jpg',
              right:
                'backgroundImages/background-id/AU/background-id_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
          },
          slideshow: {
            slideBackgroundImageUrl: `${filePrefix}_SLIDESHOW.jpg`,
          },
          thumbnail: `${filePrefix}_THUMBNAIL.jpg`,
        })
      })
    })

    describe('USA', () => {
      const region = EulogiseRegion.USA
      beforeEach(() => {
        results = BackgroundImageHelper.createBackgroundImage({
          id,
          name,
          region,
          categoryIds,
        })
      })

      it('should return results', () => {
        const regionSuffix = '_USA'
        const filePrefixWithoutRegion =
          'backgroundImages/background-id/AU/background-id'
        const filePrefix = 'backgroundImages/background-id/USA/background-id'
        expect(results).toEqual({
          id,
          name,
          categoryIds,
          cardProducts: {
            [EulogiseProduct.BOOKLET]: {
              back: `${filePrefix}_BOOKLET_BACK${regionSuffix}.jpg`,
              front: `${filePrefix}_BOOKLET_FRONT${regionSuffix}.jpg`,
              left: `${filePrefix}_BOOKLET_LEFT${regionSuffix}.jpg`,
              right: `${filePrefix}_BOOKLET_RIGHT${regionSuffix}.jpg`,
            },
            [EulogiseProduct.BOOKMARK]: {
              back: `${filePrefixWithoutRegion}_BOOKMARK_BACK.jpg`,
              front: `${filePrefixWithoutRegion}_BOOKMARK_FRONT.jpg`,
              left: '',
              right: '',
            },
            [EulogiseProduct.SIDED_CARD]: {
              back: `${filePrefix}_BOOKLET_BACK_BOTH_SIDE${regionSuffix}.jpg`,
              front: `${filePrefix}_BOOKLET_FRONT_BOTH_SIDE${regionSuffix}.jpg`,
              left: '',
              right: '',
            },
            [EulogiseProduct.THANK_YOU_CARD]: {
              back: '',
              front: `${filePrefixWithoutRegion}_THANK_YOU_CARD.jpg`,
              left: `${filePrefixWithoutRegion}_THANK_YOU_CARD_2_COL_LEFT.jpg`,
              right: `${filePrefixWithoutRegion}_THANK_YOU_CARD_2_COL_RIGHT.jpg`,
            },
            [EulogiseProduct.TV_WELCOME_SCREEN]: {
              back: '',
              front: `${filePrefixWithoutRegion}_THANK_YOU_CARD.jpg`,
              left: `${filePrefixWithoutRegion}_TV_WELCOME_SCREEN_LEFT.jpg`,
              right: `${filePrefixWithoutRegion}_TV_WELCOME_SCREEN_RIGHT.jpg`,
            },
            [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: {
              back: '',
              front: `${filePrefixWithoutRegion}_THANK_YOU_CARD.jpg`,
              left: `${filePrefixWithoutRegion}_TV_WELCOME_SCREEN_LEFT.jpg`,
              right: `${filePrefixWithoutRegion}_TV_WELCOME_SCREEN_RIGHT.jpg`,
            },
          },
          slideshow: {
            slideBackgroundImageUrl: `${filePrefix}_SLIDESHOW${regionSuffix}.jpg`,
          },
          thumbnail: `${filePrefix}_THUMBNAIL${regionSuffix}.jpg`,
        })
      })
    })
  })

  describe('createBackgroundImages', () => {
    const baseBackgroundImages: Array<ICardProductBackgroundImageBase> =
      MOCK_BACKGROUND_IMAGES
    describe('AU', () => {
      beforeEach(() => {
        results = BackgroundImageHelper.createBackgroundImages({
          baseBackgroundImages,
          region: EulogiseRegion.AU,
        })
      })
      it('should return a list of background image sets', () => {
        expect(results.length).toBeGreaterThan(10)
      })
    })

    describe('USA', () => {
      beforeEach(() => {
        results = BackgroundImageHelper.createBackgroundImages({
          baseBackgroundImages,
          region: EulogiseRegion.USA,
        })
      })
      it('should return a list of background image sets', () => {
        expect(results.length).toBeGreaterThan(10)
      })
    })
  })

  describe('getBlankBackgroundImages', () => {
    describe('AU', () => {
      beforeEach(() => {
        results = BackgroundImageHelper.getBlankBackgroundImages({
          region: EulogiseRegion.AU,
        })
      })
      it('should return blank background images', () => {
        expect(results).toEqual({
          cardProducts: {
            BOOKLET: {
              back: 'backgroundImages/Blank/AU/Blank_BOOKLET_BACK.jpg',
              front: 'backgroundImages/Blank/AU/Blank_BOOKLET_FRONT.jpg',
              left: 'backgroundImages/Blank/AU/Blank_BOOKLET_LEFT.jpg',
              right: 'backgroundImages/Blank/AU/Blank_BOOKLET_RIGHT.jpg',
            },
            BOOKMARK: {
              back: 'backgroundImages/Blank/AU/Blank_BOOKMARK_BACK.jpg',
              front: 'backgroundImages/Blank/AU/Blank_BOOKMARK_FRONT.jpg',
              left: '',
              right: '',
            },
            SLIDESHOW_TITLE_SLIDE: {
              back: '',
              front: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_LEFT.jpg',
              right:
                'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            SIDED_CARD: {
              back: 'backgroundImages/Blank/AU/Blank_BOOKLET_BACK_BOTH_SIDE.jpg',
              front:
                'backgroundImages/Blank/AU/Blank_BOOKLET_FRONT_BOTH_SIDE.jpg',
              left: '',
              right: '',
            },
            THANK_YOU_CARD: {
              back: '',
              front: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_LEFT.jpg',
              right:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            TV_WELCOME_SCREEN: {
              back: '',
              front: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_LEFT.jpg',
              right:
                'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
          },
          id: 'Blank',
          name: 'Blank',
          slideshow: {
            slideBackgroundImageUrl:
              'backgroundImages/Blank/AU/Blank_SLIDESHOW.jpg',
          },
          thumbnail: 'backgroundImages/Blank/AU/Blank_THUMBNAIL.jpg',
        })
      })
    })

    describe('USA', () => {
      beforeEach(() => {
        results = BackgroundImageHelper.getBlankBackgroundImages({
          region: EulogiseRegion.USA,
        })
      })
      it('should return blank background images', () => {
        expect(results).toEqual({
          cardProducts: {
            BOOKLET: {
              back: 'backgroundImages/Blank/USA/Blank_BOOKLET_BACK_USA.jpg',
              front: 'backgroundImages/Blank/USA/Blank_BOOKLET_FRONT_USA.jpg',
              left: 'backgroundImages/Blank/USA/Blank_BOOKLET_LEFT_USA.jpg',
              right: 'backgroundImages/Blank/USA/Blank_BOOKLET_RIGHT_USA.jpg',
            },
            BOOKMARK: {
              back: 'backgroundImages/Blank/AU/Blank_BOOKMARK_BACK.jpg',
              front: 'backgroundImages/Blank/AU/Blank_BOOKMARK_FRONT.jpg',
              left: '',
              right: '',
            },
            SIDED_CARD: {
              back: 'backgroundImages/Blank/USA/Blank_BOOKLET_BACK_BOTH_SIDE_USA.jpg',
              front:
                'backgroundImages/Blank/USA/Blank_BOOKLET_FRONT_BOTH_SIDE_USA.jpg',
              left: '',
              right: '',
            },
            SLIDESHOW_TITLE_SLIDE: {
              back: '',
              front: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_LEFT.jpg',
              right:
                'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            THANK_YOU_CARD: {
              back: '',
              front: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_LEFT.jpg',
              right:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            TV_WELCOME_SCREEN: {
              back: '',
              front: 'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD.jpg',
              left: 'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_LEFT.jpg',
              right:
                'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
          },
          id: 'Blank',
          name: 'Blank',
          slideshow: {
            slideBackgroundImageUrl: `backgroundImages/Blank/USA/Blank_SLIDESHOW_USA.jpg`,
          },
          thumbnail: `backgroundImages/Blank/USA/Blank_THUMBNAIL_USA.jpg`,
        })
      })
    })
  })

  describe('getBackgroundImageCategories()', () => {
    beforeEach(() => {
      results = BackgroundImageHelper.getBackgroundImageCategories()
    })

    it('should return BACKGROUND_IMAGE_CATEGORIES', () => {
      expect(results).toEqual(BACKGROUND_IMAGE_CATEGORIES)
    })
  })
})
