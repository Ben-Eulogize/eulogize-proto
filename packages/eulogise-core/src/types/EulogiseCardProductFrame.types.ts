import CSS from 'csstype'
import { IImageAssetContent } from './Assets.types'
import {
  CardProductDynamicDataKey,
  CardProductViewDisplayMode,
  IFrameLayoutMetadata,
} from './CardProduct.types'
import { GraphicFrameField } from './Frame.types'
import { EulogiseImageSize } from './Eulogise.types'

export type ICardProductFrameBaseItem = {
  id?: string
  width?: number
  height?: number
  flex?: CSS.Property.Flex
  graphicFrame?: GraphicFrameField
}

export type ICardProductFrameBaseContent = {
  type: 'image' | 'text'
}

export type ICardProductFrameImageStyle = {
  transformX: number
  transformY: number
  height?: number
  width?: number
}

export type ICardProductFrameImageContainerStyle = {
  centerPositionX?: number
  centerPositionY?: number
  height?: number
  width?: number
}

export type ICardProductDynamicDataFieldEvent = {
  pageIndex?: number
  rowId: string
  dynamicDataId: CardProductDynamicDataKey
  itemId?: string
}

export type ICardProductFrameImageChangeImageAssetEvent = {
  eventType: 'change-image-asset'
  imageAssetContent: IImageAssetContent
}

export type ICardProductFrameImageChangeDimensionEvent = {
  eventType: 'load' | 'resize' | 'edit-confirm' | 'not-set'
  size: { width: number; height: number }
  position: { x: number; y: number }
}

export type ICardProductFrameImageChangeEvent =
  | ICardProductFrameImageChangeImageAssetEvent
  | ICardProductFrameImageChangeDimensionEvent

export type ICardProductFrameImageContent = ICardProductFrameBaseContent &
  IImageAssetContent & {
    renderImageWidth: number
    renderImageHeight: number
    transformX: number
    transformY: number
    isImagePositionFixed?: boolean
  }

export type ICardProductFrameTextContent = ICardProductFrameBaseContent & {}

export type ICardProductFrameContentItem = ICardProductFrameBaseItem & {
  type: 'content'
  borderRadius?: CSS.Property.BorderRadius
  align?: CSS.Property.AlignItems
  content?: ICardProductFrameImageContent | ICardProductFrameTextContent
}

export enum ICardProductFrameDisplayMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}

export type ICardProductFrameScaleProps = {
  containerRef?: any
}

export type ICardProductFrameItemUiBaseProps = {
  maxPhotoSize?: EulogiseImageSize
  onContentItemClick: (contentItem: ICardProductFrameContentItem) => void
  onContentItemChange: (
    event: ICardProductFrameImageChangeEvent,
    contentItem: ICardProductFrameContentItem,
  ) => void
  onDisplayModeChange: (displayMode: ICardProductFrameDisplayMode) => void
  selectedContentItemId?: string
  isResizing?: boolean
  frameDisplayMode?: ICardProductFrameDisplayMode
  enableBorder?: boolean
  enableFadeImage?: boolean
  opacity?: number
  isFrameFocused?: boolean
  isItemSelectable?: boolean
  graphicFrame?: GraphicFrameField
  cardProductDisplayMode?: CardProductViewDisplayMode
  repositionContentItemId?: string
}

export type ICardProductFrameRowsItem = ICardProductFrameBaseItem & {
  type: 'rows'
  items: Array<ICardProductFrameItem>
}

export type ICardProductFrameColumnsItem = ICardProductFrameBaseItem & {
  type: 'columns'
  items: Array<ICardProductFrameItem>
}

export type ICardProductFrameParentItem =
  | ICardProductFrameColumnsItem
  | ICardProductFrameRowsItem

export type ICardProductFrameItem =
  | ICardProductFrameContentItem
  | ICardProductFrameColumnsItem
  | ICardProductFrameRowsItem

export enum ICardProductFrameAvailability {
  PHOTOBOOK = 'PHOTOBOOK',
  CARD = 'CARD',
  ALL = 'ALL',
}

export enum ICardProductFadeEdgeType {
  ROUNDED = 'ROUNDED',
  RECTANGULAR = 'RECTANGULAR',
  NONE = 'NONE',
}

export type ICardProductFrameLayout = ICardProductFrameItem & {
  layoutId?: string
  lockAspectRatio?: boolean
  graphicFrame?: GraphicFrameField
  isAddAsRatio?: boolean // apply new layout ratio (width & height ratio) with the current component height
  frameAvailability?: ICardProductFrameAvailability
  thumbnailHeight?: number
  thumbnailWidth?: number
  fadeEdge?: ICardProductFadeEdgeType
  metadata?: IFrameLayoutMetadata
}

export enum CardProductDrawerLayoutType {
  TITLE_PAGE = 'TITLE_PAGE',
  LAYOUT_FRAME = 'LAYOUT_FRAME',
  GRAPHIC_FRAME = 'GRAPHIC_FRAME',
}

export enum CardProductPageType {
  PHOTOBOOK_TITLE_PAGE = 'PHOTOBOOK_TITLE_PAGE',
  PHOTOBOOK_COVER_PAGE = 'PHOTOBOOK_COVER_PAGE',
  NORMAL = 'NORMAL',
}

export type ICardProductLayoutData = {
  layoutId: string
  layoutType: CardProductDrawerLayoutType
}

export enum CardProductFrameOnItemClickType {
  PAGE = 'PAGE',
  FRAME_LAYOUT = 'FRAME_LAYOUT',
}
