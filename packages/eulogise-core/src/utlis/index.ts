import { IImageSize } from '../types'

export const getScaledPrimaryImageSizeByHeight = (
  imageSize: IImageSize,
  height: number,
): IImageSize => {
  if (!height || !imageSize) {
    return imageSize
  }
  const coefficient = height / imageSize?.height
  const scaledWidth = Math.floor(imageSize?.width * coefficient)
  return {
    height: imageSize.height,
    width: scaledWidth,
  }
}
