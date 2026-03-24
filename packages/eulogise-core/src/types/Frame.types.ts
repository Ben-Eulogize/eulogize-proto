export type GraphicFrameField = {
  name: string
  width?: string
  height?: string
  top?: string
  left?: string
  imageContainerWidth?: string // container width for the container holding the image when graphic frame applied
  imageContainerHeight?: string // container height for the container holding the image when graphic frame applied
  imageContainerTransform?: string // transform for the container holding the image when graphic frame applied
  maskEditorImageUrl?: string // mask image for editor (when double clicking the image - repositioning)
  containerTransform?: string // this is the card-product-frame container transform
  thumbnailTransform?: string // this is the transform for thumbnail. If not specified, it will be using containerTransform for thumbnail
}
export type GraphicFrameDetailsField = GraphicFrameField & {
  thumbnailUrl: string
  backgroundUrl: string
  maskImageUrl?: string
}
