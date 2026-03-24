import SlideshowCardDropdownHelper from './SlideshowCardDropdownHelper'
import { SldeshowCardDropdownItemType } from './types'
import { EulogiseUserRole, ResourceFileStatus } from '@eulogise/core'

const {
  SELECT_THEME,
  CHANGE_THEME,
  UPLOAD_IMAGES,
  EDIT_SLIDESHOW,
  PREVIEW,
  CHECKOUT,
  COMPLETE,
  DOWNLOAD,
} = SldeshowCardDropdownItemType

// 0 - Select Theme, 1 - Change Theme, 2 - Upload Images, 3 - Select Images
// 4 - Edit Slideshow, 5 - Preview, 6 - Complete, 7 - Checkout, 8 - Download
describe('SlideshowCardDropdownHelper', () => {
  let results: any

  describe('getSlideshowCardDropdownItemStatuses()', () => {
    describe('hasTheme: false', () => {
      // [[0, 2, 3, 4, 5, 6], [true, false, false, false, false, false]]
      beforeEach(() => {
        results =
          SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses({
            hasTheme: false,
          })
      })

      it('should return correct results', () => {
        expect(results).toEqual({
          show: [
            SELECT_THEME,
            UPLOAD_IMAGES,
            EDIT_SLIDESHOW,
            PREVIEW,
            COMPLETE,
          ],
          enabled: [SELECT_THEME],
        })
      })
    })

    describe('hasTheme: true', () => {
      describe('hasImages: false', () => {
        // [[1, 2, 3, 4, 5, 6], [true, true, false, false, false, false]]
        beforeEach(() => {
          results =
            SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses({
              hasTheme: true,
              hasImages: false,
            })
        })

        it('should return correct results', () => {
          expect(results).toEqual({
            show: [
              CHANGE_THEME,
              UPLOAD_IMAGES,
              EDIT_SLIDESHOW,
              PREVIEW,
              COMPLETE,
            ],
            enabled: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW],
          })
        })
      })

      describe('hasImages: true', () => {
        describe('hasSaved: false', () => {
          describe('hasSlides: false', () => {
            // [[1, 2, 3, 4, 5, 6], [true, true, true, true, false, false]]
            beforeEach(() => {
              results =
                SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses(
                  {
                    hasTheme: true,
                    hasImages: true,
                  },
                )
            })

            it('should return correct results', () => {
              expect(results).toEqual({
                show: [
                  CHANGE_THEME,
                  UPLOAD_IMAGES,
                  EDIT_SLIDESHOW,
                  PREVIEW,
                  COMPLETE,
                ],
                enabled: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW],
              })
            })
          })

          describe('hasSlides: true', () => {
            // [[1, 2, 3, 4, 5, 6], [true, true, true, true, false, false]]
            beforeEach(() => {
              results =
                SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses(
                  {
                    hasTheme: true,
                    hasImages: true,
                    hasSlides: true,
                  },
                )
            })

            it('should return correct results', () => {
              expect(results).toEqual({
                show: [
                  CHANGE_THEME,
                  UPLOAD_IMAGES,
                  EDIT_SLIDESHOW,
                  PREVIEW,
                  CHECKOUT,
                ],
                enabled: [
                  CHANGE_THEME,
                  UPLOAD_IMAGES,
                  EDIT_SLIDESHOW,
                  PREVIEW,
                  CHECKOUT,
                ],
              })
            })
          })
        })

        describe('hasSaved: true', () => {
          describe('isPaid: false', () => {
            describe('userRole: Client', () => {
              // [[1, 2, 3, 4, 5, 8], [true, true, true, true, true, true]]
              beforeEach(() => {
                results =
                  SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses(
                    {
                      hasTheme: true,
                      hasImages: true,
                      hasSlides: true,
                      isPaid: false,
                      userRole: EulogiseUserRole.CLIENT,
                    },
                  )
              })

              it('should return correct results', () => {
                expect(results).toEqual({
                  show: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    DOWNLOAD,
                  ],
                  enabled: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    DOWNLOAD,
                  ],
                })
              })
            })

            describe('userRole: default', () => {
              // [[1, 2, 3, 4, 5, 7], [true, true, true, true, true, true]]
              beforeEach(() => {
                results =
                  SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses(
                    {
                      hasTheme: true,
                      hasImages: true,
                      hasSlides: true,
                      isPaid: false,
                    },
                  )
              })

              it('should return correct results', () => {
                expect(results).toEqual({
                  show: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    CHECKOUT,
                  ],
                  enabled: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    CHECKOUT,
                  ],
                })
              })
            })
          })

          describe('isPaid: true', () => {
            describe('fileStatus: generated', () => {
              // [1, 2, 3, 4, 5, 8], [false, false, false, false, true, true]
              beforeEach(() => {
                results =
                  SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses(
                    {
                      hasTheme: true,
                      hasImages: true,
                      hasSlides: true,
                      isPaid: true,
                      fileStatus: ResourceFileStatus.GENERATED,
                    },
                  )
              })

              it('should return correct results', () => {
                expect(results).toEqual({
                  show: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    DOWNLOAD,
                  ],
                  enabled: [PREVIEW, DOWNLOAD],
                })
              })
            })

            describe('fileStatus: default', () => {
              // [[1, 2, 3, 4, 5, 6], [true, true, true, true, true, true]]
              beforeEach(() => {
                results =
                  SlideshowCardDropdownHelper.getSlideshowCardDropdownItemStatuses(
                    {
                      hasTheme: true,
                      hasImages: true,
                      hasSlides: true,
                      isPaid: true,
                    },
                  )
              })

              it('should return correct results', () => {
                expect(results).toEqual({
                  show: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    COMPLETE,
                  ],
                  enabled: [
                    CHANGE_THEME,
                    UPLOAD_IMAGES,
                    EDIT_SLIDESHOW,
                    PREVIEW,
                    COMPLETE,
                  ],
                })
              })
            })
          })
        })
      })
    })
  })
})
