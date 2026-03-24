import { FontHelper, NavigationHelper } from '@eulogise/helpers'
import {
  CardProductActionTypes,
  CardProductContentItemType,
  CardProductPageMode,
  CardProductPageSize,
  CardProductViewDisplayMode,
  EulogiseExportProductName,
  EulogiseProduct,
  EulogiseRegion,
  IAllActiveCardProducts,
  IBorderSettingsModalFormFields,
  ICardPopulatedTextData,
  ICardProductBackgroundImage,
  ICardProductContent,
  ICardProductData,
  ICardProductDivider,
  ICardProductDividerName,
  ICardProductFrameContentItem,
  ICardProductFrameLayout,
  ICardProductIconName,
  ICardProductOverlayUpdateOptions,
  ICardProductPage,
  ICardProductRow,
  ICardProductRowData,
  ICardProductTheme,
  ICase,
  IGenericCardProductMetadata,
  IGenericCardProductTypeData,
  IGenericCardProductTypeDimension,
  IImageAssetContent,
  ISlideshowData,
  ITheme,
  UpdateBackgroundImageMode,
} from '@eulogise/core'

type GenerateCardProductPayload = {
  product: EulogiseProduct
  caseId: string
  cardProductId: string
  slug?: string
}
export type GenerateCardProductAction = {
  type: CardProductActionTypes.GENERATE_CARD_PRODUCT
  payload: GenerateCardProductPayload
}
export const generateCardProduct = (payload: GenerateCardProductPayload) => ({
  type: CardProductActionTypes.GENERATE_CARD_PRODUCT,
  payload,
})

type AddCardProductPagesPayload = {
  product: EulogiseProduct
  slug?: string
  cardProductTheme: ICardProductTheme
  region: EulogiseRegion
  onSuccess?: () => void
}
export type AddCardProductPagesAction = {
  type: CardProductActionTypes.ADD_CARD_PRODUCT_PAGES
  payload: AddCardProductPagesPayload
}

export const addCardProductPages = (
  payload: AddCardProductPagesPayload,
): AddCardProductPagesAction => ({
  type: CardProductActionTypes.ADD_CARD_PRODUCT_PAGES,
  payload,
})

type RemoveCardProductPagesPayload = {
  product: EulogiseProduct
  slug?: string
  removePages: number
}
export type RemoveCardProductPagesAction = {
  type: CardProductActionTypes.REMOVE_CARD_PRODUCT_PAGES
  payload: RemoveCardProductPagesPayload
}
export const removeCardProductPages = (
  payload: RemoveCardProductPagesPayload,
): RemoveCardProductPagesAction => ({
  type: CardProductActionTypes.REMOVE_CARD_PRODUCT_PAGES,
  payload,
})

type AddCardProductPageRowPayload = {
  product: EulogiseProduct
  slug?: string
  genericProductMetadata?: IGenericCardProductMetadata
  type: CardProductContentItemType
  productTheme: ICardProductTheme
  // @ts-ignore
  options: any
  pageIndex: number
  success?: (row: ICardProductRow) => void
}

export type AddCardProductPageRowAction = {
  type: CardProductActionTypes.ADD_CARD_PRODUCT_PAGE_ROW
  payload: AddCardProductPageRowPayload
}

export const addCardProductPageRow = (
  payload: AddCardProductPageRowPayload,
): AddCardProductPageRowAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.ADD_CARD_PRODUCT_PAGE_ROW,
    payload,
  }
}

type CleanupCardProductEmptyRowsPayload = {
  product: EulogiseProduct
  cardProduct: ICardProductData
  pageIndex: number
}
export type CleanupCardProductEmptyRowsAction = {
  type: CardProductActionTypes.CLEANUP_CARD_PRODUCT_EMPTY_ROWS
  payload: CleanupCardProductEmptyRowsPayload
}
export const cleanupCardProductEmptyRows = (
  payload: CleanupCardProductEmptyRowsPayload,
): CleanupCardProductEmptyRowsAction => ({
  type: CardProductActionTypes.CLEANUP_CARD_PRODUCT_EMPTY_ROWS,
  payload,
})

type DeleteCardProductRowPayload = {
  product: EulogiseProduct
  id: string
  pageIndex: number
  cardProduct: ICardProductData
}
export type DeleteCardProductRowAction = {
  type: CardProductActionTypes.DELETE_CARD_PRODUCT_ROW
  payload: DeleteCardProductRowPayload
}
export const deleteCardProductRow = (
  payload: DeleteCardProductRowPayload,
): DeleteCardProductRowAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.DELETE_CARD_PRODUCT_ROW,
    payload,
  }
}

type DuplicateCardProductRowPayload = {
  product: EulogiseProduct
  id: string
  pageIndex: number
  cardProduct: ICardProductData
}
export type DuplicateCardProductRowAction = {
  type: CardProductActionTypes.DUPLICATE_CARD_PRODUCT_ROW
  payload: DuplicateCardProductRowPayload
}

export const duplicateCardProductRow = (
  payload: DuplicateCardProductRowPayload,
): DuplicateCardProductRowAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.DUPLICATE_CARD_PRODUCT_ROW,
    payload,
  }
}

export type ToggleTextCardProductRowPayload = {
  rowId: string
  pageIndex: number
  product: EulogiseProduct
  slug?: string
  genericProductMetadata?: IGenericCardProductMetadata
}

export type ToggleTextCardProductRowAction = {
  type: CardProductActionTypes.TOGGLE_TEXT_CARD_PRODUCT_ROW
  payload: ToggleTextCardProductRowPayload
}
export const toggleTextCardProductRow = (
  payload: ToggleTextCardProductRowPayload,
): ToggleTextCardProductRowAction => {
  return {
    type: CardProductActionTypes.TOGGLE_TEXT_CARD_PRODUCT_ROW,
    payload,
  }
}

type MoveCardProductContentToPagePayload = {
  product: EulogiseProduct
  source: any
  destination: any
  cardProductContent: ICardProductContent
}
export type MoveCardProductContentToPageAction = {
  type: CardProductActionTypes.MOVE_CARD_PRODUCT_CONTENT_TO_PAGE
  payload: MoveCardProductContentToPagePayload
}

export const moveCardProductContentToPage = (
  payload: MoveCardProductContentToPagePayload,
): MoveCardProductContentToPageAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.MOVE_CARD_PRODUCT_CONTENT_TO_PAGE,
    payload,
  }
}

type ReorderCardProductPageRowsPayload = {
  product: EulogiseProduct
  source: any
  destination: any
  cardProductContent: ICardProductContent
}

export type ReorderCardProductPageRowsAction = {
  type: CardProductActionTypes.REORDER_CARD_PRODUCT_PAGE_ROWS
  payload: ReorderCardProductPageRowsPayload
}

export const reorderCardProductPageRows = (
  payload: ReorderCardProductPageRowsPayload,
): ReorderCardProductPageRowsAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.REORDER_CARD_PRODUCT_PAGE_ROWS,
    payload,
  }
}

export const loadCardProductsFonts = () => {
  FontHelper.loadCardProductFonts()
}

type ApplyThemeToProductPayload = {
  activeCase: ICase
  slug?: string
  slideshow?: ISlideshowData
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  cardProduct?: ICardProductData
  themeId: string
  isPopulatingData: boolean
  populatedData: ICardPopulatedTextData
  onSuccess?: (id: string) => void
}
export type ApplyThemeToProductAction = {
  type: CardProductActionTypes.APPLY_THEME_TO_PRODUCT
  payload: ApplyThemeToProductPayload
}
export const resetAllCardProductStates = () => ({
  type: CardProductActionTypes.RESET_ALL_CARD_PRODUCT_STATE,
})

export const applyThemeToProduct = (
  payload: ApplyThemeToProductPayload,
): ApplyThemeToProductAction => ({
  type: CardProductActionTypes.APPLY_THEME_TO_PRODUCT,
  payload,
})

type ApplyThemeToAllProductsPayload = {
  activeCase: ICase
  slideshow?: ISlideshowData
  cardProducts?: IAllActiveCardProducts
  themeId: string
  isPopulatingData: boolean
  populatedData: ICardPopulatedTextData
  onSuccess?: (product: EulogiseProduct, productId: string) => void
}

export type ApplyThemeToAllProductsAction = {
  type: CardProductActionTypes.APPLY_THEME_TO_ALL_PRODUCTS
  payload: ApplyThemeToAllProductsPayload
}

export const applyThemeToAllProducts = (
  payload: ApplyThemeToAllProductsPayload,
): ApplyThemeToAllProductsAction => ({
  type: CardProductActionTypes.APPLY_THEME_TO_ALL_PRODUCTS,
  payload,
})

type UpdateCardProductSpaceAssetByRowIdPayload = {
  product: EulogiseProduct
  rowId: string
  pageIndex: number
  asset: ICardProductDivider
}
export type UpdateCardProductSpaceAssetByRowIdAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_SPACE_ASSET_BY_ROW_ID
  payload: UpdateCardProductSpaceAssetByRowIdPayload
}
export const updateCardProductSpaceAssetByRowId = (
  payload: UpdateCardProductSpaceAssetByRowIdPayload,
): UpdateCardProductSpaceAssetByRowIdAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_SPACE_ASSET_BY_ROW_ID,
    payload,
  }
}

type UpdateCardProductIconAssetByRowIdPayload = {
  product: EulogiseProduct
  slug?: string
  rowId: string
  pageIndex: number
  icon: ICardProductIconName
  color: string
}
export type UpdateCardProductIconAssetByRowIdAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_ICON_ASSET_BY_ROW_ID
  payload: UpdateCardProductIconAssetByRowIdPayload
}
export const updateCardProductIconAssetByRowIdAction = (
  payload: UpdateCardProductIconAssetByRowIdPayload,
): UpdateCardProductIconAssetByRowIdAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_ICON_ASSET_BY_ROW_ID,
    payload,
  }
}

export type UpdateCardProductDividerAssetByRowIdPayload = {
  product: EulogiseProduct
  slug?: string
  rowId: string
  pageIndex: number
  divider: ICardProductDividerName
  color: string
}
export type UpdateCardProductDividerAssetByRowIdAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_DIVIDER_ASSET_BY_ROW_ID
  payload: UpdateCardProductDividerAssetByRowIdPayload
}
export const updateCardProductDividerAssetByRowIdAction = (
  payload: UpdateCardProductDividerAssetByRowIdPayload,
): UpdateCardProductDividerAssetByRowIdAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_DIVIDER_ASSET_BY_ROW_ID,
    payload,
  }
}

type UpdateCardProductImagePayload = {
  product: EulogiseProduct
  slug?: string
  pageIndex: number
  rowId: string
  columnIndex: number
  image: IImageAssetContent
  frameContentItemId?: string
  cardProduct?: ICardProductData
}
export type UpdateCardProductImageAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_IMAGE
  payload: UpdateCardProductImagePayload
}
export const updateCardProductImage = (
  payload: UpdateCardProductImagePayload,
): UpdateCardProductImageAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_IMAGE,
    payload,
  }
}

/*
export const updateCardProductImages =
  (
    product: EulogiseProduct,
    pageIndex: number,
    rowId: string,
    images: Array<IImageAssetContent>,
  ) =>
  (dispatch: Dispatch<any>) => {
    NavigationHelper.addUnsavedListener()
    dispatch(
      cardProductAction({
        type: CardProductActionTypes.UPDATE_CARD_PRODUCT_IMAGES,
        payload: {
          product,
          pageIndex,
          rowId,
          images,
        },
        product,
      }),
    )
  }
*/

export const cleanupCardProductUndoHistory = ({
  product,
  slug,
}: {
  product: EulogiseProduct
  slug?: string
}) => ({
  type: CardProductActionTypes.CLEAN_UP_CARD_PRODUCT_UNDO_HISTORY,
  payload: {
    productType: product,
    slug,
  },
})

type RepopulatePrimaryImagePayload = {
  product: EulogiseProduct
  cardProduct: ICardProductData
  primaryImage: IImageAssetContent
  genericProductType?: IGenericCardProductTypeData
  defaultThemeLayoutColumns?: number
  cardProductViewDisplayMode: CardProductViewDisplayMode
  region: EulogiseRegion
}
export type RepopulatePrimaryImageAction = {
  type: CardProductActionTypes.REPOPULATE_PRIMARY_IMAGE
  payload: RepopulatePrimaryImagePayload
}
export const repopulatePrimaryImage = (
  payload: RepopulatePrimaryImagePayload,
) => ({
  type: CardProductActionTypes.REPOPULATE_PRIMARY_IMAGE,
  payload,
})

export const undoCardProductContent = (product: EulogiseProduct) => ({
  type: CardProductActionTypes.UNDO_CARD_PRODUCT_CONTENT,
  payload: {
    productType: product,
  },
})

export const redoCardProductContent = (product: EulogiseProduct) => ({
  type: CardProductActionTypes.REDO_CARD_PRODUCT_CONTENT,
  payload: {
    productType: product,
  },
})

type EnableCardProductOverlayPayload = {
  pageIndexes: Array<number>
  product: EulogiseProduct
  slug?: string
}

export type EnableCardProductOverlayAction = {
  type: CardProductActionTypes.ENABLE_CARD_PRODUCT_OVERLAY
  payload: EnableCardProductOverlayPayload
}

export const enableCardProductOverlayAction = (
  payload: EnableCardProductOverlayPayload,
): EnableCardProductOverlayAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.ENABLE_CARD_PRODUCT_OVERLAY,
    payload,
  }
}

type ToggleCardProductOverlayPayload = {
  product: EulogiseProduct
  slug?: string
  pageIndex: number
}

export type ToggleCardProductOverlayAction = {
  type: CardProductActionTypes.TOGGLE_CARD_PRODUCT_OVERLAY
  payload: ToggleCardProductOverlayPayload
}

export const toggleCardProductOverlay = (
  payload: ToggleCardProductOverlayPayload,
): ToggleCardProductOverlayAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.TOGGLE_CARD_PRODUCT_OVERLAY,
    payload,
  }
}

type UpdateCardProductOverlayPayload = {
  overlay: ICardProductOverlayUpdateOptions
  product: EulogiseProduct
  slug?: string
}

export type UpdateCardProductOverlayAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_OVERLAY
  payload: UpdateCardProductOverlayPayload
}

export const updateCardProductOverlay = (
  payload: UpdateCardProductOverlayPayload,
): UpdateCardProductOverlayAction => ({
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_OVERLAY,
  payload,
})

type UpdateCardProductBorderPayload = {
  productType: EulogiseProduct
  borderSettings: IBorderSettingsModalFormFields
  slug?: string
}

export type UpdateCardProductBorderAction = {
  type: CardProductActionTypes.UPDATE_BORDER_SETTINGS
  payload: UpdateCardProductBorderPayload
}

export const updateCardProductBorder = ({
  borderSettings,
  product,
  slug,
}: {
  borderSettings: IBorderSettingsModalFormFields
  product: EulogiseProduct
  slug?: string
}): UpdateCardProductBorderAction => ({
  type: CardProductActionTypes.UPDATE_BORDER_SETTINGS,
  payload: {
    productType: product,
    borderSettings: borderSettings,
    slug,
  },
})

type UpdateCardProductContentPayload = {
  product: EulogiseProduct
  slug?: string
  pageIndex: number
  // update all rows
  newRows?: Array<ICardProductRow>
  isTitlePageLayout?: boolean

  // single row update
  layoutId?: string
  rowId?: string
  data?: ICardProductRowData
  type?: CardProductContentItemType
  isAddToUndoList?: boolean
  onSuccess?: (cardProduct: ICardProductData) => void
  shouldUpdatePhotobookRowsAlignment?: boolean
}
export type UpdateCardProductContentAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT
  payload: UpdateCardProductContentPayload
}
export const updateCardProductContent = (
  payload: UpdateCardProductContentPayload,
): UpdateCardProductContentAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT,
    payload,
  }
}

export type UpdateCardProductPageByIndexPayload = {
  pageIndex: number
  page: ICardProductPage
  product: EulogiseProduct
}

export type UpdateCardProductPageByIndexAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_BY_INDEX
  payload: UpdateCardProductPageByIndexPayload
}

export const updateCardProductPageByIndex = (
  payload: UpdateCardProductPageByIndexPayload,
): UpdateCardProductPageByIndexAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_BY_INDEX,
    payload,
  }
}

export type UpdateCardProductPagesPayload = {
  product: EulogiseProduct
  pages: Array<ICardProductPage>
}
export type UpdateCardProductPagesAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGES
  payload: UpdateCardProductPagesPayload
}
export const updateCardProductPages = (
  payload: UpdateCardProductPagesPayload,
): UpdateCardProductPagesAction => {
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGES,
    payload,
  }
}

type UpdateCardProductContentByContentItemPayload = {
  product: EulogiseProduct
  contentItem: ICardProductFrameContentItem
  rowId: string
  slug?: string
  pageIndex: number
  isAddToUndoList?: boolean
  onSuccess?: (cardProduct: ICardProductData) => void
}
export type UpdateCardProductContentByContentItemAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_BY_CONTENT_ITEM
  payload: UpdateCardProductContentByContentItemPayload
}

export const updateCardProductContentByContentItem = (
  payload: UpdateCardProductContentByContentItemPayload,
): UpdateCardProductContentByContentItemAction => {
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_BY_CONTENT_ITEM,
    payload,
  }
}

/*
export const updateCardProductPaperSize =
  ({
    pageSize,
    product,
    onSuccess,
  }: {
    pageSize: CardProductPageSize
    product: EulogiseProduct
    onSuccess?: () => void
  }) =>
  (dispatch: Dispatch<any>) => {
    dispatch(
      cardProductAction({
        type: CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_SIZE,
        payload: { pageSize },
        product,
      }),
    )
    // TODO: Update Background feafure after switching paper sizes only applies to Booklet and Sided card
    if (
      onSuccess &&
      (product === EulogiseProduct.BOOKLET ||
        product === EulogiseProduct.SIDED_CARD)
    ) {
      onSuccess()
    }
    return
  }

export const updateCardProductPaperMargin =
  ({
    region,
    product,
    onSuccess,
  }: {
    region: EulogiseRegion
    product: EulogiseProduct
    onSuccess?: () => void
  }) =>
  (dispatch: Dispatch<any>) => {
    let newRegionPageMargin
    if (region === EulogiseRegion.USA) {
      newRegionPageMargin = CardProductHelper.getDefaultUSPageMargins(product)!
    } else {
      newRegionPageMargin = CardProductHelper.getDefaultAUPageMargins(product)!
    }

    dispatch(
      cardProductAction({
        type: CardProductActionTypes.UPDATE_CARD_PRODUCT_PAGE_MARGIN,
        payload: { pageMargin: newRegionPageMargin },
        product,
      }),
    )
    if (onSuccess) {
      onSuccess()
    }
    return
  }
*/

type UpdateContentSuccessPayload = {
  product: EulogiseProduct
  slug?: string
  pages: ICardProductPage | Array<ICardProductPage>
  options?: { pageIndex?: number; isAddToUndoList?: boolean }
  onSuccess?: (cardProduct: ICardProductData) => void
}
export type UpdateContentSuccessAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_SUCCESS
  payload: UpdateContentSuccessPayload
}
export const updateContentSuccess = (
  payload: UpdateContentSuccessPayload,
): UpdateContentSuccessAction => {
  return {
    type: CardProductActionTypes.UPDATE_CARD_PRODUCT_CONTENT_SUCCESS,
    payload,
  }
}

type FetchAllProductsByCaseIdPayload = {
  caseId: string
  region: EulogiseRegion
  isShareFlow?: boolean
  complete?: () => void
  onFetchProductComplete?: () => void
}
export type FetchAllProductsByCaseIdAction = {
  type: CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID
  payload: FetchAllProductsByCaseIdPayload
}
export const fetchAllProductsByCaseId = (
  payload: FetchAllProductsByCaseIdPayload,
): FetchAllProductsByCaseIdAction => ({
  type: CardProductActionTypes.FETCH_ALL_PRODUCTS_BY_CASE_ID,
  payload,
})

type FetchCardProductsByCaseIdPayload = {
  product: EulogiseProduct
  caseId: string
  region: EulogiseRegion
  success?: (data: Array<ICardProductData>) => void
  genericProductType?: IGenericCardProductTypeData
}

export type FetchCardProductsByCaseIdAction = {
  type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID
  payload: FetchCardProductsByCaseIdPayload
}

export const fetchCardProductsByCaseId = (
  payload: FetchCardProductsByCaseIdPayload,
): FetchCardProductsByCaseIdAction => {
  return {
    type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID,
    payload,
  }
}

type UpdateCardProductImageByIdPayload = {
  product: EulogiseProduct
  contentId: string
  imageContent: IImageAssetContent
  slug?: string
}

export type UpdateCardProductImageByIdAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_BY_IMAGE_ID
  payload: UpdateCardProductImageByIdPayload
}

export const updateCardProductImageById = (
  payload: UpdateCardProductImageByIdPayload,
): UpdateCardProductImageByIdAction => ({
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_BY_IMAGE_ID,
  payload,
})

export type ChangeFrameByRowIdPayload = {
  rowId: string
  cardProduct: ICardProductData
  slug?: string
  newLayoutData: ICardProductFrameLayout
  product: EulogiseProduct
  pageContentWidth: number
  framePageIndex: number
  shouldUpdatePhotobookRowsAlignment?: boolean
}

export type ChangeFrameByRowIdAction = {
  type: CardProductActionTypes.CHANGE_FRAME_BY_ROW_ID
  payload: ChangeFrameByRowIdPayload
}

export const changeFrameByRowId = (
  payload: ChangeFrameByRowIdPayload,
): ChangeFrameByRowIdAction => ({
  type: CardProductActionTypes.CHANGE_FRAME_BY_ROW_ID,
  payload,
})

export type ReplaceCardProductPageRowsPayload = {
  product: EulogiseProduct
  slug?: string
  pageIndex: number
  rows: Array<ICardProductRow>
  layoutId?: string
  isTitlePageLayout?: boolean
}

export type ReplaceCardProductPageRowsAction = {
  type: CardProductActionTypes.REPLACE_CARD_PRODUCT_PAGE_ROWS
  payload: ReplaceCardProductPageRowsPayload
}

export const replaceCardProductPage = (
  payload: ReplaceCardProductPageRowsPayload,
): ReplaceCardProductPageRowsAction => ({
  type: CardProductActionTypes.REPLACE_CARD_PRODUCT_PAGE_ROWS,
  payload,
})

export type CleanCardProductPageByIndexPayload = {
  product: EulogiseProduct
  pageIndex: number
}

export type CleanCardProductPageByIndexAction = {
  type: CardProductActionTypes.CLEAN_CARD_PRODUCT_PAGE_BY_INDEX
  payload: CleanCardProductPageByIndexPayload
}

export const cleanCardProductPageByIndex = (
  payload: CleanCardProductPageByIndexPayload,
): CleanCardProductPageByIndexAction => ({
  type: CardProductActionTypes.CLEAN_CARD_PRODUCT_PAGE_BY_INDEX,
  payload,
})

export type ChangeToFrameLayoutFromPageLayoutPayload = {
  product: EulogiseProduct
  pageIndex: number
  frameContent: ICardProductFrameLayout
  slug?: string
}

export type ChangeToFrameLayoutFromPageLayoutAction = {
  type: CardProductActionTypes.CHANGE_TO_FRAME_LAYOUT_FROM_PAGE_LAYOUT
  payload: ChangeToFrameLayoutFromPageLayoutPayload
}

export const changeToFrameLayoutFromPageLayout = (
  payload: ChangeToFrameLayoutFromPageLayoutPayload,
): ChangeToFrameLayoutFromPageLayoutAction => ({
  type: CardProductActionTypes.CHANGE_TO_FRAME_LAYOUT_FROM_PAGE_LAYOUT,
  payload,
})

type SaveCardProductPayload = {
  product: EulogiseProduct
  cardProduct: ICardProductData
  slug?: string
  cardProductTheme?: ICardProductTheme
  onSuccess?: (id: string) => void
  saveFromClickComplete?: boolean
  isShowNotification?: boolean
  isUpdateActiveItemOnSuccess?: boolean
}

export type SaveCardProductAction = {
  type: CardProductActionTypes.SAVE_CARD_PRODUCT
  payload: SaveCardProductPayload
}

export const saveCardProduct = (
  payload: SaveCardProductPayload,
): SaveCardProductAction => ({
  type: CardProductActionTypes.SAVE_CARD_PRODUCT,
  payload,
})

type UpsertCardProductByCaseIdPayload = {
  product: EulogiseProduct
  slug?: string
  caseId: string
  cardProduct?: ICardProductData
  genericProductType?: IGenericCardProductTypeData
  region: EulogiseRegion
  themeId: string
  isPopulatingData: boolean
  populatedData?: ICardPopulatedTextData
  onSuccess?: (id: string) => void
  isUpdateActiveItemOnSuccess?: boolean
  pageSize?: CardProductPageSize
}

export type UpsertCardProductByCaseIdAction = {
  type: CardProductActionTypes.UPSERT_CARD_PRODUCT_BY_CASE_ID
  payload: UpsertCardProductByCaseIdPayload
}

export const upsertCardProductByCaseId = (
  payload: UpsertCardProductByCaseIdPayload,
): UpsertCardProductByCaseIdAction => ({
  type: CardProductActionTypes.UPSERT_CARD_PRODUCT_BY_CASE_ID,
  payload,
})

type DownloadCardProductByCaseIdPayload = {
  product: EulogiseProduct
  slug?: string
  productName: EulogiseExportProductName | string
  caseId: string
  deceasedName?: string
  isBleed?: boolean
  retries?: number
  complete?: () => void
  pageMode?: CardProductPageMode
  pageSize?: CardProductPageSize
}

export type DownloadCardProductByCaseIdAction = {
  type: CardProductActionTypes.DOWNLOAD_CARD_PRODUCT_BY_CASE_ID
  payload: DownloadCardProductByCaseIdPayload
}

export const downloadCardProductByCaseId = (
  payload: DownloadCardProductByCaseIdPayload,
) => ({
  type: CardProductActionTypes.DOWNLOAD_CARD_PRODUCT_BY_CASE_ID,
  payload,
})

type CreateCardProductByCaseIdPayload = {
  product: EulogiseProduct
  cardProductTheme: ICardProductTheme
  genericProductType?: IGenericCardProductTypeData
  caseId: string
  themeId: string
  theme: ITheme
  isPopulatingData: boolean
  populatedData: ICardPopulatedTextData
  region: EulogiseRegion
  onSuccess?: (id: string) => void
  onSaving?: () => void
  pageSize?: CardProductPageSize
}

export type CreateCardProductByCaseIdAction = {
  type: CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID
  payload: CreateCardProductByCaseIdPayload
}

export const createCardProductByCaseId = (
  payload: CreateCardProductByCaseIdPayload,
): CreateCardProductByCaseIdAction => ({
  type: CardProductActionTypes.CREATE_CARD_PRODUCT_BY_CASE_ID,
  payload,
})

type UpdateCardProductBackgroundPagesImagePayload = {
  product: EulogiseProduct
  slug?: string
  cardProduct: ICardProductData
  updateMode: UpdateBackgroundImageMode
  backgroundImageSet: ICardProductBackgroundImage
  noSave?: boolean
}

export type UpdateCardProductBackgroundPagesImageAction = {
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_BACKGROUND_PAGES_IMAGE
  payload: UpdateCardProductBackgroundPagesImagePayload
}

// TODO: TECHDEBT - we need a more dynamic way to update the background image and also unit test needed
export const updateCardProductBackgroundPagesImage = (
  payload: UpdateCardProductBackgroundPagesImagePayload,
): UpdateCardProductBackgroundPagesImageAction => ({
  type: CardProductActionTypes.UPDATE_CARD_PRODUCT_BACKGROUND_PAGES_IMAGE,
  payload,
})

type UpdatePageBackgroundOverlayPayload = {
  product: EulogiseProduct
  cardProduct: ICardProductData
  updatedPageIndex: number | undefined
  cardProductOverlayOptions: ICardProductOverlayUpdateOptions
}

export type UpdatePageBackgroundOverlayAction = {
  type: CardProductActionTypes.UPDATE_PAGE_BACKGROUND_OVERLAY
  payload: UpdatePageBackgroundOverlayPayload
}

export const updatePageBackgroundOverlay = (
  payload: UpdatePageBackgroundOverlayPayload,
): UpdatePageBackgroundOverlayAction => ({
  type: CardProductActionTypes.UPDATE_PAGE_BACKGROUND_OVERLAY,
  payload,
})

type ClearPagesContentByPageIndexesPayload = {
  product: EulogiseProduct
  blankPagesIndexes: Array<Number>
  cardProduct: ICardProductData
  newRowsData?: Array<ICardProductRow>
}

export type ClearPagesContentByPageIndexesAction = {
  type: CardProductActionTypes.CLEAR_PAGES_CONTENT_BY_PAGE_INDEXES
  payload: ClearPagesContentByPageIndexesPayload
}

export const clearPagesContentByPageIndexes = (
  payload: ClearPagesContentByPageIndexesPayload,
): ClearPagesContentByPageIndexesAction => ({
  type: CardProductActionTypes.CLEAR_PAGES_CONTENT_BY_PAGE_INDEXES,
  payload,
})

type UpdateSelectedDimensionPayload = {
  product: EulogiseProduct
  slug?: string
  selectedDimension: IGenericCardProductTypeDimension
}

export type UpdateSelectedDimensionAction = {
  type: CardProductActionTypes.UPDATE_SELECTED_DIMENSION
  payload: UpdateSelectedDimensionPayload
}

export const updateSelectedDimension = (
  payload: UpdateSelectedDimensionPayload,
): UpdateSelectedDimensionAction => {
  NavigationHelper.addUnsavedListener()
  return {
    type: CardProductActionTypes.UPDATE_SELECTED_DIMENSION,
    payload,
  }
}
