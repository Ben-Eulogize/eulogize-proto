import { CropBackgroundImageHelper } from './CropBackgroundImageHelper'
import {
  BackgroundImageAlignmentType,
  DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
} from '@eulogise/core'

describe('CropBackgroundImageHelper', () => {
  describe('getDefaultDisplayImageSize', () => {
    // for bookmark and single column pages
    describe('isTwoColumnsPages = false', () => {
      const isTwoColumnsPages = false
      describe('alignment === left', () => {
        const alignment = BackgroundImageAlignmentType.LEFT
        it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 20 * 5,
            height: 300 * 5,
            top: -650,
            left: 0,
          })
        })

        it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 300, height: 20 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 300 * 5,
            height: 20 * 5,
            top: 0,
            left: -650,
          })
        })

        it('if image ratio is 1:1 and container ratio is 1:2', () => {
          // Arrange
          const actualImageSize = { width: 100, height: 100 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 2x
          expect(result).toEqual({
            width: 100 * 2,
            height: 100 * 2,
            top: -50,
            left: 0,
          })
        })
      })

      describe('alignment === mid-left', () => {
        const alignment = BackgroundImageAlignmentType.MID_LEFT
        it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 20 * 5,
            height: 300 * 5,
            top: -650,
            left: -50,
          })
        })

        it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 300, height: 20 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 300 * 5,
            height: 20 * 5,
            top: 0,
            left: -750,
          })
        })

        it('if image ratio is 1:1 and container ratio is 1:2', () => {
          // Arrange
          const actualImageSize = { width: 100, height: 100 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 2x
          expect(result).toEqual({
            width: 100 * 2,
            height: 100 * 2,
            top: -50,
            left: -100,
          })
        })
      })

      describe('alignment === mid-right', () => {
        const alignment = BackgroundImageAlignmentType.MID_RIGHT
        it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 20 * 5,
            height: 300 * 5,
            top: -650,
            right: -50,
          })
        })

        it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 300, height: 20 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 300 * 5,
            height: 20 * 5,
            top: 0,
            right: -750,
          })
        })

        it('if image ratio is 1:1 and container ratio is 1:2', () => {
          // Arrange
          const actualImageSize = { width: 100, height: 100 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 2x
          expect(result).toEqual({
            width: 100 * 2,
            height: 100 * 2,
            top: -50,
            right: -100,
          })
        })
      })

      describe('alignment === right', () => {
        const alignment = BackgroundImageAlignmentType.RIGHT
        it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 20 * 5,
            height: 300 * 5,
            top: -650,
            right: 0,
          })
        })

        it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
          // Arrange
          const actualImageSize = { width: 300, height: 20 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 5x
          expect(result).toEqual({
            width: 300 * 5,
            height: 20 * 5,
            top: 0,
            right: -650,
          })
        })

        it('if image ratio is 1:1 and container ratio is 1:2', () => {
          // Arrange
          const actualImageSize = { width: 100, height: 100 }
          const containerSize = { width: 200, height: 100 }
          // Act
          const result =
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            })
          // Assert
          // image width should be increased by 2x
          expect(result).toEqual({
            width: 100 * 2,
            height: 100 * 2,
            top: -50,
            right: 0,
          })
        })
      })

      describe('alignment === full', () => {
        // for bleed
        describe('isRemoveFullBleed = false', () => {
          const alignment = BackgroundImageAlignmentType.FULL
          it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 20 * 5,
              height: 300 * 5,
              top: -650,
              left: 0,
            })
          })

          it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 300, height: 20 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 300 * 5,
              height: 20 * 5,
              top: 0,
              left: -650,
            })
          })

          it('if image ratio is 1:1 and container ratio is 1:2', () => {
            // Arrange
            const actualImageSize = { width: 100, height: 100 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 2x
            expect(result).toEqual({
              width: 100 * 2,
              height: 100 * 2,
              top: -50,
              left: 0,
            })
          })
        })

        // for non-bleed
        describe('isRemoveFullBleed = true', () => {
          const isRemoveFullBleed = true
          const alignment = BackgroundImageAlignmentType.FULL
          it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
                isRemoveFullBleed,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 20 * 5,
              height: 300 * 5,
              top: -650 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              left: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })

          it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 300, height: 20 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveFullBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 300 * 5,
              height: 20 * 5,
              top: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              left: -650 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })

          it('if image ratio is 1:1 and container ratio is 1:2', () => {
            // Arrange
            const actualImageSize = { width: 100, height: 100 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveFullBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 2x
            expect(result).toEqual({
              width: 100 * 2,
              height: 100 * 2,
              top: -50 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              left: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })
        })
      })
    })

    // for left right booklet pages
    describe('isTwoColumnsPages = true', () => {
      const isTwoColumnsPages = true
      describe('Alignment: full', () => {
        const alignment = BackgroundImageAlignmentType.FULL
        it('should throw "Cannot use full alignment with two columns pages"', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          expect(() =>
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages,
              alignment,
            }),
          ).toThrowError('Cannot use full alignment with two columns pages')
        })
      })

      // for bleed
      describe('isRemoveSideBleed = false', () => {
        const isRemoveSideBleed = false
        describe('Alignment: left', () => {
          const alignment = BackgroundImageAlignmentType.LEFT
          it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
                isRemoveSideBleed,
              })
            // Assert
            // image width should be increased by 10x
            expect(result).toEqual({
              width: 20 * 5 * 2,
              height: 300 * 5 * 2,
              top: -1400,
              left: 0,
            })
          })

          it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 300, height: 20 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveSideBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 300 * 5,
              height: 20 * 5,
              top: 0,
              left: -550,
            })
          })

          it('if image ratio is 1:1 and container ratio is 1:2', () => {
            // Arrange
            const actualImageSize = { width: 100, height: 100 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 2x
            expect(result).toEqual({
              width: 100 * 2 * 2,
              height: 100 * 2 * 2,
              top: -150,
              left: 0,
            })
          })
        })

        describe('Alignment: right', () => {
          const alignment = BackgroundImageAlignmentType.RIGHT
          it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 10x
            expect(result).toEqual({
              width: 20 * 5 * 2,
              height: 300 * 5 * 2,
              top: -1400,
              right: 0,
            })
          })

          it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 300, height: 20 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 300 * 5,
              height: 20 * 5,
              top: 0,
              right: -550,
            })
          })

          it('if image ratio is 1:1 and container ratio is 1:2', () => {
            // Arrange
            const actualImageSize = { width: 100, height: 100 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
              })
            // Assert
            // image width should be increased by 2x
            expect(result).toEqual({
              width: 100 * 2 * 2,
              height: 100 * 2 * 2,
              top: -150,
              right: 0,
            })
          })
        })
      })

      // for non-bleed
      describe('isRemoveSideBleed = true', () => {
        const isRemoveSideBleed = true
        describe('isRemoveFullBleed = true', () => {
          const isRemoveFullBleed = true
          it('should throw "Cannot remove both side and full bleed together"', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            expect(() =>
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment: BackgroundImageAlignmentType.LEFT,
                isRemoveFullBleed,
                isRemoveSideBleed,
              }),
            ).toThrowError('Cannot remove both side and full bleed together')
          })
        })

        describe('Alignment: left', () => {
          const alignment = BackgroundImageAlignmentType.LEFT
          it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                alignment,
                isRemoveSideBleed,
              })
            // Assert
            // image width should be increased by 10x
            expect(result).toEqual({
              width: 20 * 5 * 2,
              height: 300 * 5 * 2,
              top: -1400 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              left: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })

          it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 300, height: 20 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveSideBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 300 * 5,
              height: 20 * 5,
              top: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              left: -550 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })

          it('if image ratio is 1:1 and container ratio is 1:2', () => {
            // Arrange
            const actualImageSize = { width: 100, height: 100 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveSideBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 2x
            expect(result).toEqual({
              width: 100 * 2 * 2,
              height: 100 * 2 * 2,
              top: -150 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              left: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })
        })

        describe('Alignment: right', () => {
          const alignment = BackgroundImageAlignmentType.RIGHT
          it('if image horizontal ratio is relatively narrower than the container horizontal ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 20, height: 300 }
            const containerSize = { width: 100, height: 200 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveSideBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 10x
            expect(result).toEqual({
              width: 20 * 5 * 2,
              height: 300 * 5 * 2,
              top: -1400 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              right: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })

          it('if image vertical ratio is relatively narrower than the container vertical ratio compare to', () => {
            // Arrange
            const actualImageSize = { width: 300, height: 20 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveSideBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 5x
            expect(result).toEqual({
              width: 300 * 5,
              height: 20 * 5,
              top: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              right: -550 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })

          it('if image ratio is 1:1 and container ratio is 1:2', () => {
            // Arrange
            const actualImageSize = { width: 100, height: 100 }
            const containerSize = { width: 200, height: 100 }
            // Act
            const result =
              CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
                actualImageSize,
                containerSize,
                isTwoColumnsPages,
                isRemoveSideBleed,
                alignment,
              })
            // Assert
            // image width should be increased by 2x
            expect(result).toEqual({
              width: 100 * 2 * 2,
              height: 100 * 2 * 2,
              top: -150 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
              right: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            })
          })
        })
      })
    })

    describe('isRemoveFullBleed = true', () => {
      const isRemoveFullBleed = true

      describe('Alignment: mid-left', () => {
        const alignment = BackgroundImageAlignmentType.MID_LEFT
        it('should return correct results', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          expect(
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages: true,
              alignment,
              isRemoveFullBleed,
            }),
          ).toEqual({
            height: 3000,
            left:
              -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE - containerSize.width / 2,
            top: -1400 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            width: 200,
          })
        })
      })

      describe('Alignment: left', () => {
        const alignment = BackgroundImageAlignmentType.LEFT
        it('should return correct results', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          expect(
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages: true,
              alignment,
              isRemoveFullBleed,
            }),
          ).toEqual({
            height: 3000,
            left: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            top: -1400 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            width: 200,
          })
        })
      })

      describe('Alignment: mid-right', () => {
        const alignment = BackgroundImageAlignmentType.MID_RIGHT
        it('should return correct results', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          expect(
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages: true,
              alignment,
              isRemoveFullBleed,
            }),
          ).toEqual({
            height: 3000,
            right:
              -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE - containerSize.width / 2,
            top: -1400 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            width: 200,
          })
        })
      })

      describe('Alignment: right', () => {
        const alignment = BackgroundImageAlignmentType.RIGHT
        it('should return correct results', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          expect(
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages: true,
              alignment,
              isRemoveFullBleed,
            }),
          ).toEqual({
            height: 3000,
            right: -DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            top: -1400 - DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
            width: 200,
          })
        })
      })
    })

    describe('isRemoveSideBleed = true', () => {
      const isRemoveSideBleed = true
      describe('Alignment: full', () => {
        const alignment = BackgroundImageAlignmentType.FULL
        it('should throw "Cannot remove side bleed with full alignment"', () => {
          // Arrange
          const actualImageSize = { width: 20, height: 300 }
          const containerSize = { width: 100, height: 200 }
          // Act
          expect(() =>
            CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
              actualImageSize,
              containerSize,
              isTwoColumnsPages: false,
              alignment,
              isRemoveSideBleed,
            }),
          ).toThrowError('Cannot remove side bleed with full alignment')
        })
      })
    })
  })
})
