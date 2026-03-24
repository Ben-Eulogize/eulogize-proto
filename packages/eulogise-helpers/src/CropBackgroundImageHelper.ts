import {
  BackgroundImageAlignmentType,
  DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
  IImageSizeAndPosition,
} from '@eulogise/core'

const bleedSize = DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE

export class CropBackgroundImageHelper {
  public static getDefaultDisplayImageSizeAndPosition(props: {
    actualImageSize: { width: number; height: number }
    containerSize: { width: number; height: number }
    isTwoColumnsPages: boolean
    alignment: BackgroundImageAlignmentType
    isRemoveSideBleed?: boolean
    isRemoveFullBleed?: boolean
  }): IImageSizeAndPosition {
    const {
      actualImageSize: { width: imageWidth, height: imageHeight },
      containerSize: { width: containerWidth, height: containerHeight },
      isTwoColumnsPages = true,
      alignment,
      isRemoveSideBleed,
      isRemoveFullBleed,
    } = props

    if (isTwoColumnsPages) {
      if (alignment === BackgroundImageAlignmentType.FULL) {
        throw new Error('Cannot use full alignment with two columns pages')
      }
    }
    if (isRemoveFullBleed && isRemoveSideBleed) {
      throw new Error('Cannot remove both side and full bleed together')
    }
    if (isRemoveSideBleed) {
      if (alignment === BackgroundImageAlignmentType.FULL) {
        throw new Error('Cannot remove side bleed with full alignment')
      }
    }

    const displaySizeAndPosition: IImageSizeAndPosition = {
      width: 0,
      height: 0,
      top: undefined,
      left: undefined,
      right: undefined,
    }
    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) {
      return displaySizeAndPosition
    }
    const newContainerWidth = containerWidth * (isTwoColumnsPages ? 2 : 1)
    const horizontalRatio = newContainerWidth / imageWidth
    const verticalRatio = containerHeight / imageHeight

    const maxRatio = Math.max(horizontalRatio, verticalRatio)
    displaySizeAndPosition.width = imageWidth * maxRatio
    displaySizeAndPosition.height = imageHeight * maxRatio
    // if (horizontalRatio > verticalRatio) {
    displaySizeAndPosition.top =
      (containerHeight - displaySizeAndPosition.height) / 2
    //}
    // verticalRatio is smaller than horizontal ratio, use containerHeight as the height of the image
    if (
      alignment === BackgroundImageAlignmentType.FULL ||
      alignment === BackgroundImageAlignmentType.LEFT ||
      alignment === BackgroundImageAlignmentType.MID_LEFT
    ) {
      displaySizeAndPosition.left =
        (newContainerWidth - displaySizeAndPosition.width) / 2
      if (alignment === BackgroundImageAlignmentType.MID_LEFT) {
        displaySizeAndPosition.left =
          displaySizeAndPosition.left - containerWidth / 2
      }
    } else if (
      alignment === BackgroundImageAlignmentType.RIGHT ||
      alignment === BackgroundImageAlignmentType.MID_RIGHT
    ) {
      displaySizeAndPosition.right =
        (newContainerWidth - displaySizeAndPosition.width) / 2
      if (alignment === BackgroundImageAlignmentType.MID_RIGHT) {
        displaySizeAndPosition.right =
          displaySizeAndPosition.right - containerWidth / 2
      }
    }

    if (isRemoveFullBleed || isRemoveSideBleed) {
      // set top
      if (displaySizeAndPosition.top === undefined) {
        throw new Error('displaySizeAndPosition.top is undefined')
      }
      displaySizeAndPosition.top = displaySizeAndPosition.top - bleedSize
    }

    // for non-bleed
    if (isRemoveSideBleed) {
      // set left right
      if (
        alignment === BackgroundImageAlignmentType.LEFT ||
        alignment === BackgroundImageAlignmentType.MID_LEFT
      ) {
        if (displaySizeAndPosition.left === undefined) {
          throw new Error('displaySizeAndPosition.left is undefined')
        }
        displaySizeAndPosition.left = displaySizeAndPosition.left - bleedSize
      } else if (
        alignment === BackgroundImageAlignmentType.RIGHT ||
        alignment === BackgroundImageAlignmentType.MID_RIGHT
      ) {
        if (displaySizeAndPosition.right === undefined) {
          throw new Error('displaySizeAndPosition.right is undefined')
        }
        displaySizeAndPosition.right = displaySizeAndPosition.right - bleedSize
      }
    } else if (isRemoveFullBleed) {
      // set left right
      if (
        alignment === BackgroundImageAlignmentType.FULL ||
        alignment === BackgroundImageAlignmentType.LEFT ||
        alignment === BackgroundImageAlignmentType.MID_LEFT
      ) {
        if (displaySizeAndPosition.left === undefined) {
          throw new Error('displaySizeAndPosition.left is undefined')
        }
        displaySizeAndPosition.left = displaySizeAndPosition.left - bleedSize
      }
      if (
        alignment === BackgroundImageAlignmentType.RIGHT ||
        alignment === BackgroundImageAlignmentType.MID_RIGHT
      ) {
        if (displaySizeAndPosition.right === undefined) {
          throw new Error('displaySizeAndPosition.right is undefined')
        }
        displaySizeAndPosition.right = displaySizeAndPosition.right - bleedSize
      }
    }

    return displaySizeAndPosition
  }
}
