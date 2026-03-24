import { ISlideshowData, ISlideshowTheme } from './Slideshow.types'
import {
  EulogiseCardProducts,
  EulogiseProduct,
  EulogiseRegion,
} from './Eulogise.types'
import { IImageAssetContent } from './Assets.types'
import {
  CardProductPageSize,
  ICardProductData,
  ICardProductDivider,
  ICardProductDividerName,
  ICardProductIcon,
  ICardProductIconName,
} from './CardProduct.types'
import { EulogisePage } from './EulogisePage.types'
import { IInvoice } from './Invoice.types'
import { IGenericCardProductTypeData } from './GenericCardProductType.types'
import { IGenericCardProductMetadata } from './GenericCardProduct.types'

export enum ModalActionTypes {
  SHOW_MODAL = 'SHOW_MODAL',
  SHOW_DOWNLOAD_MODAL = 'SHOW_DOWNLOAD_MODAL',
  HIDE_MODAL = 'HIDE_MODAL',
}

export enum ModalId {
  DOWNLOAD = 'DOWNLOAD',
  CHECKOUT = 'CHECKOUT',
  PDF_VIEWER = 'PDF_VIEWER',
  VIDEO_VIEWER = 'VIDEO_VIEWER',
  SLIDESHOW_PREVIEW = 'SLIDESHOW_PREVIEW',
  SELECT_PHOTOBOOK_DESIGN = 'SELECT_PHOTOBOOK_DESIGN',
  CARD_PRODUCT_PREVIEW = 'CARD_PRODUCT_PREVIEW',
  SHARE_SLIDESHOW = 'SHARE_SLIDESHOW',
  SHARE_CARD_PRODUCT = 'SHARE_CARD_PRODUCT',
  ICON_ASSET = 'ICON_ASSET',
  DIVIDER_ASSET = 'DIVIDER_ASSET',
  APPLY_PRODUCT = 'APPLY_PRODUCT',
  AUDIO_SETTINGS = 'AUDIO_SETTINGS',
  INVITE = 'INVITE',
  SELECT_IMAGE = 'SELECT_IMAGE',
  EDIT_IMAGE = 'EDIT_IMAGE',
  FINALISE_SIGNUP = 'FINALISE_SIGNUP',
  MEMORIAL_DATA_PULL = ' MEMORIAL_DATA_PULL',
  REPLACE_EDITED_IMAGE_CONFIRM = 'REPLACE_EDITED_IMAGE_CONFIRM',
  UNSAVED_CHANGES_CONFIRM = 'UNSAVED_CHANGES_CONFIRM',
  UNSAVED_PHOTO_IMAGES_ORDER_CONFIRM = 'UNSAVED_PHOTO_IMAGES_ORDER_CONFIRM',
  SAVE_TEMPLATE_DESIGN = 'SAVE_TEMPLATE_DESIGN',
  MOBILE_UPLOAD_QR_CODE = 'MOBILE_UPLOAD_QR_CODE',
  VIEW_CLIENT_BRANDS = 'VIEW_CLIENT_BRANDS',
  INSERT_BRAND = 'INSERT_BRAND',
  EDITOR_CLEAR_ALL = 'EDITOR_CLEAR_ALL',
  SLIDESHOW_CLEAR_ALL = 'SLIDESHOW_CLEAR_ALL',
  REMOVE_IMAGE_BACKGROUND = 'REMOVE_IMAGE_BACKGROUND',
  VIEW_INVOICE = 'VIEW_INVOICE',
  PRINTING_PAPER_TYPE_PREVIEW = 'PRINTING_PAPER_TYPE_PREVIEW',
  DELETE_SELECTED_PHOTOS = 'DELETE_SELECTED_PHOTOS',
  DELETE_CLIENT_MODAL = 'DELETE_CLIENT_MODAL',
  DELETE_ACCOUNT_MODAL = 'DELETE_ACCOUNT_MODAL',
  SYSTEM_UPGRADE_NOTIFICATION = 'SYSTEM_UPGRADE_NOTIFICATION',
}

export interface IApplyToProductModalOption {
  theme: ISlideshowTheme
  product: EulogiseProduct
}

export interface IDownloadModalOption {
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
}

export interface IShareCardProductModalOption {
  product: EulogiseProduct
  slug?: string
}

export interface ISelectImageModalOption {
  maxImages?: number
  defaultSelectedImageId?: string
  onChange?: (selectedImages: Array<IImageAssetContent>) => void
  isSelectable?: boolean
  isEditable?: boolean
}

export interface IPreviewModalOption {
  product?: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  showFooter?: boolean
  showDownloadButton?: boolean
  isEditing?: boolean
  showKeepEditingButton?: boolean
  isShareFlow?: boolean
}

export interface IPdfPreviewModalOption {
  src: string
  product: EulogiseProduct
  pageSize: CardProductPageSize
  genericProductMetadata?: IGenericCardProductMetadata
}

export interface IVideoPreviewModalOption {
  src: string
  title?: string
}

export interface ISlideshowPreviewModalOption {
  isShareFlow?: boolean
}

export interface IInviteModalOption {
  caseId: string
}

export interface IInvoiceModalOption {
  invoice: IInvoice
}

export interface IPrintingPaperTypeModalOption {
  product: EulogiseCardProducts
}

export type ISelectAssetModalOption = {
  pageIndex: number
  rowId: string
  color?: string
}

export type ISelectIconAssetModalOption = ISelectAssetModalOption & {
  iconName?: ICardProductIconName
  onConfirm: ({
    color,
    icon,
  }: {
    color: string
    icon: ICardProductIcon
  }) => void
}

export type ISelectDividerAssetModalOption = ISelectAssetModalOption & {
  dividerName?: ICardProductDividerName
  onConfirm: ({
    color,
    divider,
  }: {
    color: string
    divider: ICardProductDivider
  }) => void
}

export type ISaveTemplateDesignModalOption = {
  product: EulogiseProduct
  slug?: string
  region?: EulogiseRegion
}

export type IModalOptions =
  | IApplyToProductModalOption
  | IPreviewModalOption
  | IInviteModalOption
  | IDownloadModalOption
  | IShareCardProductModalOption
  | ISelectImageModalOption
  | IMemorialDataPullModalOption
  | IReplaceEditedImageConfirmOption
  | IUnsavedChangesConfirmOption
  | IUnsavedPhotoImagesOrderConfirmOption
  | IEditorClearAllConfirmOption
  | IInsertBrandOption
  | IRemoveImageBackgroundOption
  | ISelectIconAssetModalOption
  | ISelectDividerAssetModalOption
  | IInvoiceModalOption
  | IPrintingPaperTypeModalOption
  | IDeleteClientModalOption
  | IPdfPreviewModalOption
  | IVideoPreviewModalOption
  | ISlideshowPreviewModalOption
  | ISaveTemplateDesignModalOption

export interface IModalState {
  openModalIds?: Array<ModalId>
  options?: IModalOptions
}

export interface IModalAction {
  type: ModalActionTypes
  payload?: {
    id: ModalId
    options?:
      | IApplyToProductModalOption
      | IPreviewModalOption
      | IInviteModalOption
  }
}

export interface IMemorialDataPullModalOption {
  product: EulogiseProduct
  slug?: string
  id: string
}

export interface IReplaceEditedImageConfirmOption {
  editingImageContent: IImageAssetContent
  newEditedImageContent: IImageAssetContent
  updatedCardProducts: Array<EulogiseProduct>
  needUpdateSlideshow: boolean
}

export interface IEditorClearAllConfirmOption {
  product: EulogiseProduct
  leftPageIndex: number | undefined
  rightPageIndex: number | undefined
  currentPageCursor: number
  isShowClearAllPage?: boolean
  isShowClearCurrentPage?: boolean
  genericProductType?: IGenericCardProductTypeData
}

export interface IUnsavedChangesConfirmOption {
  editingProduct: EulogiseProduct
  unsavedProductState: ICardProductData | ISlideshowData
  page: EulogisePage
  region: EulogiseRegion
  query?: object // query params
}

export interface IUnsavedPhotoImagesOrderConfirmOption {
  page: EulogisePage
  newCustomisedPhotoImagesOrderIds: Array<string>
}

export interface IInsertBrandOption {
  pageIndex: number
}

export interface IRemoveImageBackgroundOption {
  assetId: string
  assetFilestackHandle: string
  removingImageBackgroundImageIndex: number
}

export interface IDeleteClientModalOption {
  clientId: string
}
