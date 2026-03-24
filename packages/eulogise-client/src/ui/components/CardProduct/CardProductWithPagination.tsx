import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GlobalHotKeys } from 'react-hotkeys'
import styled from 'styled-components'
import { EditorPagination } from '../EditorPagination/EditorPagination'
import { CardProductEditor } from '../../containers/CardProduct/CardProductEditor'
import {
  DEFAULT_TITLE_SLIDE_TRANSITION,
  useIsNotDesktop,
} from '@eulogise/client-core'
import {
  CardProductContentItemType,
  CardProductFrameOnItemClickType,
  CardProductPageMode,
  CardProductViewDisplayMode,
  DEFAULT_CLIENT_INSERTED_BRAND_HEIGHT,
  EULOGISE_EDITOR_MIN_WIDTH,
  EulogiseCardProducts,
  EulogiseProduct,
  EulogiseRegion,
  GUIDE_SHOW_UP_PAGE,
  IAllActiveCardProducts,
  IAssetState,
  IBorderSettingsModalFormFields,
  ICardProductContent,
  ICardProductData,
  ICardProductDynamicDataFieldEvent,
  ICardProductFrameContentItem,
  ICardProductFrameImageContent,
  ICardProductFrameLayout,
  ICardProductIconName,
  ICardProductImageRow,
  ICardProductImageRowData,
  ICardProductLayoutData,
  ICardProductOverlayUpdateOptions,
  ICardProductPage,
  ICardProductRow,
  ICardProductRowData,
  ICardProductState,
  ICardProductTextRowData,
  ICardProductTheme,
  ICaseDeceased,
  ICaseState,
  IContentItemOnChangeEvent,
  IGenericCardProductData,
  IGenericCardProductTypeData,
  IGuideWalkThroughState,
  IImageAsset,
  IImageAssetContent,
  IImageSize,
  ISlide,
  ITitleSlideTransition,
  ResourceFileStatus,
  SlideType,
} from '@eulogise/core'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { CardProductFrameHelper } from '../../../../../eulogise-helpers/src/CardProductFrameHelper'
import {
  AssetHelper,
  ImageHelper,
  NavigationHelper,
  PhotobookHelper,
  SlideshowHelper,
  UtilHelper,
} from '@eulogise/helpers'
import UploadPicturesPanel, {
  EXPANDED_IMAGE_LIBRARY_BASE_WIDTH,
} from '../../containers/Dashboard/UploadPicturesPanel/UploadPicturesPanel'
import {
  changeFrameByRowId,
  changeToFrameLayoutFromPageLayout,
  cleanupCardProductEmptyRows,
  deleteCardProductRow,
  duplicateCardProductRow,
  enableCardProductOverlayAction,
  redoCardProductContent,
  removeCardProductPages,
  replaceCardProductPage,
  repopulatePrimaryImage,
  saveCardProduct,
  toggleTextCardProductRow,
  undoCardProductContent,
  updateCardProductBorder,
  updateCardProductContent,
  updateCardProductContentByContentItem,
  updateCardProductImage,
  updateCardProductOverlay,
} from '../../store/CardProduct/actions'
import {
  detectAssetFaces,
  fetchImageAssetsByCaseId,
} from '../../store/AssetState/actions'
import {
  useAllActiveCardProducts,
  useAssetState,
  useAuthState,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
  useProductState,
  useSlideshowState,
  useUserSettingsState,
} from '../../store/hooks'
import {
  BorderSettingsModal,
  IChangeImageEvent,
  IFrameChangeEvent,
  IRowDataChangeEvent,
  Notification,
  SortableContainer,
  EDITOR_TOOLBAR_PORTAL_TARGET_ID,
  EDITOR_TOOLBAR_HEIGHT,
} from '@eulogise/client-components'
import { updateCaseById } from '../../store/CaseState/actions'
import { TranformationUIHelper } from '../../helpers/TransformationUIHelper'
import RemoveCardProductPagesModal from './RemoveCardProductPagesModal'
import { openCopyLibraryDrawer } from '../../store/DrawerState/actions'
import {
  fetchSlideshowsByCaseId,
  saveSlidesToSlideshowByCaseId,
  saveTitleSlide,
} from '../../store/SlideshowState/actions'
import {
  BASED_TITLE_SLIDE_CONTROL_PANEL_CONTAINER_HEIGHT,
  TitleSlideControlPanel,
  TitleSlideControlPanelProps,
} from './TitleSlideControlPanel'
import { CardProductFrameDrawer } from '../../../../../eulogise-client-components/src/Drawer/CardProductFrameDrawer/CardProductFrameDrawer'
import useElementSize from '../../hooks/useElementSize'
import InsertBrandModal from '../../containers/Modal/InsertBrandModal/InsertBrandModal'
import { OverlaySettingsModal } from '@eulogise/client-components/dist/Modal/OverlaySettingsModal'
import { selectUserSettingsColorAction } from '../../store/UserSettingsState/actions'
import { useResize } from '../../hooks/useResize'
import CopyLibraryDrawer from '../../containers/CopyLibraryDrawer/CopyLibraryDrawer'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

interface ICardProductWithPaginationProps {
  bleed?: boolean
  dateFormat?: string
  slug?: string
  zoom?: number
  baseScaleRatio?: number
  product: EulogiseProduct
  cardProduct: ICardProductData
  pageCursor: number
  onPageChange?: (pc: number) => void
  className?: string
  displayMode?: CardProductViewDisplayMode
  genericProductType?: IGenericCardProductTypeData
  isFetching?: boolean
  isShowOverlaySettingModal?: boolean
  onIsShowOverlaySettingModalChange?: (
    isShowOverlaySettingModal: boolean,
  ) => void
  hasSkippedOrFilledMemorialDataPullForm?: boolean
  isEnabledScrolling?: boolean
  isShowBorderSettingModal?: boolean
  setIsShowBorderSettingModal?: (isShowBorderSettingModal: boolean) => void
  isShowRemoveCardProductPagesModal?: boolean
  onAddIconAssetClick?: (pageIndex: number) => void
  onAddDividerAssetClick?: (pageIndex: number) => void
  setIsShowRemoveCardProductPagesModal?: (
    isShowRemoveCardProductPagesModal: boolean,
  ) => void
  isShowImageLibrary?: boolean
  onIsShowImageLibrary?: (isShowImageLibrary: boolean) => void
  currentPageIndex?: number
  selectedFrameContentItemId?: string
  updatingImageDetails?: IChangeImageEvent
  onUpdatingImageDetails?: (updatingImageDetails: IChangeImageEvent) => void
  onSelectedFrameContentItemId?: (
    contentItemId: string | undefined,
    rowId?: string,
    filestackHandle?: string,
    pageIndex?: number,
  ) => void
  setFocusedRowId?: (
    rowId: string | undefined,
    autoSelectFirstContentId?: boolean,
    pageIndex?: number,
  ) => void
  onChangeImageClick?: ({
    columnIndex,
    frameContentItemId,
    product,
    pageIndex,
    rowId,
    filestackHandle,
  }: IChangeImageEvent) => void
  onEnhanceImageClick?: (ev: IChangeImageEvent) => void
  onBgRemoverClick?: (ev: IChangeImageEvent) => void
  onToggleImageBorderClick?: (ev: IChangeImageEvent) => void
  onToggleFadeImageClick?: (ev: IChangeImageEvent) => void
  onTransparencyChange?: (ev: IChangeImageEvent & { opacity: number }) => void
  dispatchAddRow?: ({
    product,
    type,
    productTheme,
    options,
    pageIndex,
  }: {
    product: EulogiseProduct
    type: CardProductContentItemType
    productTheme: ICardProductTheme
    options: any
    pageIndex: number
  }) => void
  focusedRowId?: string
  framePageIndex?: number
  setFramePageIndex?: (framePageIndex: number | undefined) => void
  onAddRowClick?: ({
    product,
    slug,
    type,
    productTheme,
    options,
    pageIndex,
  }: {
    product: EulogiseProduct
    slug?: string
    type: CardProductContentItemType
    productTheme: ICardProductTheme
    options: any
    pageIndex: number
  }) => void
  bookletMagnifierSliderValue: number
  onBookletMagnifierSliderChange?: (value: number) => void
  onPreviewModalWidthChange?: (width: number) => void
  onAssignDynamicData?: (event: ICardProductDynamicDataFieldEvent) => void
  isDraggingImageLibraryItem?: boolean
  isDraggableImageLibraryItem?: boolean
  isInsertBrandModalOpened?: boolean
  onChangeIconClick?: (params: {
    rowId: string
    pageIndex: number
    iconName: ICardProductIconName
    color: string
  }) => void
  shouldNavigationAsideOfContent?: boolean
  productTheme?: ICardProductTheme
}

const StyledCardProductWithPagination = styled.div<{
  $isPreview: boolean
  $zoom: number
}>`
  display: flex;
  ${({ $isPreview, $zoom }) =>
    `
      ${!$isPreview ? `height: 100%;` : ''}
      ${$zoom ? `zoom: ${$zoom};` : ''}
  `}
  overflow-y: hidden;
`

const StyledEditorContainer = styled.div``

/*
const StyledPhotobookCoverTypeSelector = styled(PhotobookCoverTypeSelector)`
  justify-content: center;
`
*/

const EditorPanel = styled.div<{ $isEnabledScrolling: boolean }>`
  flex: 1;
  ${({ $isEnabledScrolling }) =>
    $isEnabledScrolling
      ? `
    overflow-y: auto;
  `
      : 'overflow: hidden;'}
`

const EditorPanelContent = styled.div<{
  $noPadding: boolean
}>`
  ${({ $noPadding }) =>
    `
  ${!$noPadding ? `padding: 0 0 1.8rem;` : ''}
  padding: 0;
`}
`

const StickyToolbarContainer = styled.div`
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-top: 0.5rem;
  pointer-events: none;
  transition: left 200ms ease, width 200ms ease;

  > * {
    pointer-events: auto;
  }
`

const StyledTitleSlideControlPanelContainer = styled.div<{
  $titleSlidePanelScaleFactor: number
}>`
  ${({ $titleSlidePanelScaleFactor }) =>
    `
${
  $titleSlidePanelScaleFactor
    ? `height: ${
        $titleSlidePanelScaleFactor *
        BASED_TITLE_SLIDE_CONTROL_PANEL_CONTAINER_HEIGHT
      }px`
    : ''
}
`}
`

const keyMap = {
  UNDO: 'cmd+z',
  UNDO_CTRL: 'ctrl+z',
  REDO: 'cmd+y',
}

const CardProductWithPagination = ({
  zoom = 1,
  product,
  slug,
  cardProduct,
  baseScaleRatio,
  isFetching,
  displayMode,
  className,
  pageCursor,
  onPageChange,
  onToggleFadeImageClick,
  onTransparencyChange,
  isEnabledScrolling = true,
  hasSkippedOrFilledMemorialDataPullForm = true,
  isShowOverlaySettingModal = false,
  onIsShowOverlaySettingModalChange = (isShowOverlaySettingModal) => {
    console.log(
      'onIsShowOverlaySettingModalChange is undefined',
      isShowOverlaySettingModal,
    )
  },
  isShowBorderSettingModal = false,
  setIsShowBorderSettingModal = (isShowBorderSettingModal) =>
    console.log(
      'isShowBorderSettingModal is undefined',
      isShowBorderSettingModal,
    ),
  isShowRemoveCardProductPagesModal = false,
  setIsShowRemoveCardProductPagesModal = (isShowRemoveCardProductPagesModal) =>
    console.log(
      'setIsShowRemoveCardProductPagesModal is undefined',
      isShowRemoveCardProductPagesModal,
    ),
  isShowImageLibrary,
  onIsShowImageLibrary,
  currentPageIndex,
  selectedFrameContentItemId,
  updatingImageDetails,
  onUpdatingImageDetails,
  onSelectedFrameContentItemId,
  setFocusedRowId,
  onEnhanceImageClick,
  onBgRemoverClick,
  onToggleImageBorderClick,
  onChangeImageClick,
  dispatchAddRow,
  focusedRowId,
  framePageIndex,
  setFramePageIndex,
  onAddRowClick,
  bookletMagnifierSliderValue,
  onBookletMagnifierSliderChange,
  onPreviewModalWidthChange = () => null,
  onAssignDynamicData,
  isDraggingImageLibraryItem,
  isDraggableImageLibraryItem = false,
  isInsertBrandModalOpened,
  shouldNavigationAsideOfContent = false,
  productTheme: productThemeProp,
  ...cardProductPageProps
}: ICardProductWithPaginationProps) => {
  const ref = useRef(null)
  const editorContainerRef = useRef(null)
  const isNotDesktop = useIsNotDesktop()
  const dispatch = useEulogiseDispatch()

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const [selectedLayoutData, setSelectedLayoutData] =
    useState<ICardProductLayoutData>()
  const { activeProductTheme: productThemeFromRedux } = useProductState({
    product,
    slug,
  }) as ICardProductState
  const productTheme = productThemeProp || productThemeFromRedux

  // this slideshow is for TV Welcome Screen
  const { activeItem: activeSlideshow } = useSlideshowState()
  const { account } = useAuthState()
  const { selectedColors: recentColors } = useUserSettingsState()
  const caseId: string = activeCase?.id!
  const region: EulogiseRegion = activeCase?.region ?? EulogiseRegion.AU
  const pageSize = cardProduct?.content?.pageSize
  const deceased: ICaseDeceased = activeCase?.deceased!
  const primaryImage = deceased?.primaryImage
  const [titleSlideProps, setTitleSlideProps] =
    useState<TitleSlideControlPanelProps>()
  const isShowSlideshowTitleSlideControlPanel = !(
    activeSlideshow?.fileStatus === ResourceFileStatus.PROCESSING ||
    (activeSlideshow &&
      !SlideshowHelper.isSlideshowThemeChangable(activeSlideshow))
  )

  const [imageLibraryHeight, setImageLibraryHeight] = useState<number>()

  const borderSettingFormFields: IBorderSettingsModalFormFields =
    CardProductHelper.getBorderSettingsFormFields(cardProduct)

  const overlaySettingsFormFields =
    CardProductHelper.getOverlaySettingsFormFields({ cardProduct, product })

  const { images = [], brands = [] }: IAssetState = useAssetState()

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { currentStep, guideShowAt } = guideWalkThroughContext
  const [screenContentWidth, setScreenContentWidth] = useState<number>(0)
  const isSlideshowTitlePage = product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
  const updateImageLibraryHeight = () => {
    // @ts-ignore
    if (!window) {
      return
    }
    setImageLibraryHeight(
      window.document.getElementById('main-content')?.clientHeight,
    )
  }

  const [
    screenContentRef,
    { height: screenContentHeight, width: containerWidth },
  ] = useElementSize()

  const isRowAddActionButtonHighlighted: boolean =
    guideShowAt === GUIDE_SHOW_UP_PAGE.BOOKLET && currentStep === 6

  const focusedRowContent = CardProductHelper.getCardProductRowByRowId(
    (cardProduct.content as ICardProductContent).pages,
    focusedRowId ?? '',
  )

  const isClientBrandImageSelected =
    (focusedRowContent?.data as ICardProductImageRowData)?.isClientBrandImage ??
    false

  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata

  const getImageContentByHandle = (
    imageFilestackHandle: string,
  ): IImageAsset => {
    if (!imageFilestackHandle) {
      return null!
    }
    return images?.find(
      (i: IImageAsset) => i?.content?.filestackHandle === imageFilestackHandle,
    )!
  }

  if (!cardProduct) {
    return null
  }

  const foldType = genericProductMetadata?.foldType
  const pageMode: CardProductPageMode = CardProductHelper.getPageModeByPageSize(
    {
      pageSize: cardProduct.content?.pageSize,
      product,
      foldType,
      displayMode,
    },
  )

  const { width: pageContentWidth } =
    CardProductHelper.getDefaultPageContentWidthAndHeight({
      product,
      genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
        ?.metadata,
      defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
      region,
      pageSize: cardProduct?.content?.pageSize,
    })

  const noOfPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    totalPages: cardProduct?.content?.pages?.length,
    pageMode,
    foldType,
    isMobile: isNotDesktop,
    displayMode,
  })
  const currentPageCursor =
    pageCursor > noOfPageCursors! - 1 ? noOfPageCursors! - 1 : pageCursor

  const onChangePrimaryImage = async (image: IImageAsset) => {
    if (image?.content) {
      const { height, width }: IImageSize =
        await ImageHelper.getImageSizeViaFilestack(
          image?.content?.filestackHandle,
        )
      const updatedCaseFields = {
        primaryImage: {
          ...image?.content,
          height,
          width,
        },
      }
      dispatch(
        updateCaseById({
          caseId,
          caseFields: updatedCaseFields,
          isShowNotification: false,
          success: () => null,
        }),
      )
    }
  }

  const isUpdatingBookletFrontImage = (): boolean => {
    const { rowId, product } = updatingImageDetails!
    const row: ICardProductRow = CardProductHelper.getCardProductRowByRowId(
      cardProduct.content.pages,
      rowId!,
    )!
    return (
      product === EulogiseProduct.BOOKLET &&
      CardProductHelper.isPrimaryImageRow(row) &&
      CardProductFrameHelper.isFirstContentIdByRow(
        row,
        selectedFrameContentItemId,
      )
    )
  }

  const changeImage = (image: IImageAsset) => {
    const orgImageHeight = image.content?.height!
    const orgImageWidth = image.content?.width!
    let height: number, width: number

    const rowId = updatingImageDetails?.rowId
    const row: ICardProductRow = CardProductHelper.getCardProductRowByRowId(
      cardProduct.content.pages,
      rowId!,
    )!

    if (!row?.type) {
      console.log(
        `[Bugsnag diagnostic data] - row: ${row}, row.type: ${row?.type}, rowId: ${rowId}`,
      )
      return
    }

    if (row.type === 'columns') {
      const orgImageScale = orgImageHeight / orgImageWidth
      const columnWidth = row.data?.items?.[0]?.data?.width
      const maxHeight = row.data.items.reduce(
        (maxHeight: number, c: ICardProductImageRow) =>
          c.data.height! > maxHeight ? c.data.height! : maxHeight,
        0,
      )
      if (columnWidth) {
        height = orgImageScale * columnWidth
      }
      if (height! > maxHeight) {
        height = maxHeight
      }
      const scale = orgImageWidth / orgImageHeight
      width = scale * height!
    } else if (row.type === 'image') {
      const adjustedImageSize = CardProductHelper.getImageSizeByProduct({
        orgImageHeight,
        orgImageWidth,
        product,
        productTheme: productTheme!,
        currentHeight: row.data.height!,
        region,
        genericProductMetadata: (cardProduct as IGenericCardProductData)
          ?.content?.metadata,
      })
      width = adjustedImageSize.width
      height = adjustedImageSize.height
    }
    dispatch(
      updateCardProductImage({
        product,
        slug,
        pageIndex: updatingImageDetails?.pageIndex!,
        rowId: updatingImageDetails?.rowId!,
        frameContentItemId: selectedFrameContentItemId,
        columnIndex: updatingImageDetails?.columnIndex!,
        image: {
          ...image.content,
          ...(height! ? { height } : {}),
          ...(width! ? { width } : {}),
        },
        cardProduct,
      }),
    )
    if (onUpdatingImageDetails) {
      onUpdatingImageDetails({
        ...updatingImageDetails,
        filestackHandle: image.content.filestackHandle,
      })
    }

    // Make the image as primary image when user change the front image in Booklet
    if (
      (isUpdatingBookletFrontImage() ||
        isSlideshowTitlePage ||
        PhotobookHelper.isPhotobookCoverPage({
          product,
          pageIndex: pageCursor,
          noOfPageCursors,
        })) &&
      primaryImage?.filestackHandle !== image.content.filestackHandle
    ) {
      onChangePrimaryImage(image)
    }
  }

  const handleSelectImage = async ({ image }: { image: IImageAsset }) => {
    // Check if face detection is needed
    if (!image.content?.faceDetection && image.id) {
      changeImage({
        ...image,
        content: {
          ...image.content,
          isShowLoading: true,
          loadingMessage: 'Positioning',
        },
      })
      // Trigger face detection
      dispatch(
        detectAssetFaces({
          assetId: image.id,
          oldFilestackHandle: image.content?.filestackHandle,
          forceRedetect: false,
          onSuccess: (updatedAsset) => {
            console.log('Face detection completed for asset:', updatedAsset)
            // Update the image with face detection data
            image.content = {
              ...image.content,
              ...updatedAsset.content,
              isShowLoading: false,
            }
            changeImage(image)
          },
          onError: (error) => {
            console.error('Face detection failed:', error)
            // Continue with image selection even if face detection fails
            image.content = {
              ...image.content,
              isShowLoading: false,
            }
            changeImage(image)
          },
        }),
      )
    } else {
      changeImage(image)
    }
  }

  /*
  const editorWidth = CardProductHelper.getEditorWidth({
    cardProduct,
    genericProductType,
    isMobile: isNotDesktop,
    minWidth: EULOGISE_EDITOR_MIN_WIDTH[product],
  })
*/
  const totalPages = cardProduct.content?.pages?.length
  useLayoutEffect(() => {
    // @ts-ignore
    updateImageLibraryHeight()
    // @ts-ignore
  }, [editorContainerRef.current?.clientHeight!])

  useResize(() => {
    updateImageLibraryHeight()
  }, [])

  useEffect(() => {
    const parentNodeRef = ref.current?.parentNode
    if (parentNodeRef) {
      // because of using CSS Transition, screenContentWidth have to be calculated based on the screenContentRef
      setScreenContentWidth(
        parentNodeRef!.clientWidth! -
          (isShowImageLibrary ? EXPANDED_IMAGE_LIBRARY_BASE_WIDTH : 0),
      )
    }
  }, [
    containerWidth,
    // make sure screenContentWidth update as showing/hiding image library
    isShowImageLibrary,
  ])

  useEffect(() => {
    // delay to make sure the primary image is not updated before requests complete
    setTimeout(() => {
      if (product === EulogiseProduct.PHOTOBOOK) {
        return
      }
      const isAllowAutoRepopulate =
        CardProductHelper.isAllowAutoRepopulatePrimaryImage({
          activeCase,
          cardProduct,
        })

      if (isAllowAutoRepopulate) {
        dispatch(
          repopulatePrimaryImage({
            product,
            cardProduct,
            primaryImage,
            defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
            cardProductViewDisplayMode: displayMode!,
            region,
          }),
        )
      }
    }, 500)
  }, [activeCase, primaryImage])

  const {
    scaledEditorWidth,
    editorScaledFactor,
    bookletMagnifierSliderScaleFactor,
    fixedWelcomeScreenTitleSlideEditorPanelHeight,
  } = CardProductHelper.getEditorScaleFactor({
    baseScaleRatio,
    cardProduct,
    isMobile: isNotDesktop,
    screenContentWidth,
    product,
    bookletMagnifierSliderValue,
  })

  const titleSlidePanelScaleFactor =
    (fixedWelcomeScreenTitleSlideEditorPanelHeight /
      BASED_TITLE_SLIDE_CONTROL_PANEL_CONTAINER_HEIGHT) *
    bookletMagnifierSliderScaleFactor

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()
  const allActiveCardProducts: IAllActiveCardProducts =
    useAllActiveCardProducts(allAvailableCardProducts)

  useEffect(() => {
    if (product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE) {
      dispatch(
        fetchSlideshowsByCaseId({
          caseId,
          callback: (slideshowData) => {
            const slides = slideshowData?.[0]?.content?.slides
            const startTitleSlide = SlideshowHelper.getStartTitleSlide(slides)
            const endTitleSlide = SlideshowHelper.getEndTitleSlide(slides)
            const titleSlideTransition: ITitleSlideTransition =
              UtilHelper.mergeDeepRight(
                DEFAULT_TITLE_SLIDE_TRANSITION,
                startTitleSlide?.titleSlideTransition || {},
              )
            const endTitleSlideTransition: ITitleSlideTransition =
              UtilHelper.mergeDeepRight(
                DEFAULT_TITLE_SLIDE_TRANSITION,
                endTitleSlide?.titleSlideTransition || {},
              )

            setTitleSlideProps({
              isStartTitleSlideEnabled: !!startTitleSlide?.isTitleSlideEnable,
              isEndTitleSlideEnabled: !!endTitleSlide?.isTitleSlideEnable,
              titleSlideTransition,
              endTitleSlideTransition,
            })
          },
        }),
      )
    }
  }, [product])

  useEffect(() => {
    if (!caseId) {
      return
    }
    if (!/^visitor/.test(account?.role!)) {
      dispatch(fetchImageAssetsByCaseId(caseId))
    }
  }, [caseId])

  useEffect(() => {
    if (onPreviewModalWidthChange) {
      if (
        EULOGISE_EDITOR_MIN_WIDTH[product] &&
        scaledEditorWidth < EULOGISE_EDITOR_MIN_WIDTH[product]
      ) {
        onPreviewModalWidthChange(EULOGISE_EDITOR_MIN_WIDTH[product])
      } else {
        onPreviewModalWidthChange(scaledEditorWidth)
      }
    }
  }, [scaledEditorWidth])

  const onEditImageClick = (params: any) => {
    const {
      columnIndex,
      product,
      pageIndex,
      rowId,
      filestackHandle,
      openImageLibrary = true,
    } = params
    if (openImageLibrary && onIsShowImageLibrary) {
      onIsShowImageLibrary(true)
    }
    if (openImageLibrary && onUpdatingImageDetails) {
      onUpdatingImageDetails({
        columnIndex,
        product,
        pageIndex,
        rowId,
        filestackHandle,
      })
    }

    const editingImage: IImageAsset = getImageContentByHandle(filestackHandle)
    const needUpdatePrimaryImage: boolean = isUpdatingBookletFrontImage()
    const updatedCardProducts = TranformationUIHelper.getAllUpdatedCardProducts(
      allActiveCardProducts,
    )

    const needUpdateSlideshow: boolean =
      !!activeSlideshow &&
      SlideshowHelper.checkIfNeedToReplaceSlideshowImagesAfterEditing(
        editingImage,
        activeSlideshow?.content?.slides,
      )
    const originPhotoIndex: number = images.findIndex(
      (i: IImageAsset) =>
        i?.content?.filestackHandle === editingImage?.content?.filestackHandle,
    )

    const onReplaceAllProductsWithEditedImageContent = (replaceParams: {
      updatedCardProducts: Array<EulogiseCardProducts>
      editingImageContent: IImageAssetContent
      newEditedImageContent: IImageAssetContent
      needUpdateSlideshow: boolean
    }) => {
      const {
        updatedCardProducts,
        editingImageContent,
        newEditedImageContent,
        needUpdateSlideshow,
      } = replaceParams
      try {
        // Update card products
        updatedCardProducts.forEach((p: keyof IAllActiveCardProducts) => {
          if (allActiveCardProducts?.[p]) {
            const pages: Array<ICardProductPage> =
              allActiveCardProducts[p]?.content?.pages!
            const updatedPages = CardProductHelper.replaceImageContentInPages({
              pages,
              oldFilestackHandle: editingImageContent?.filestackHandle,
              newImageContent: newEditedImageContent,
            })

            // update content
            for (const updatedPage of updatedPages) {
              dispatch(
                updateCardProductContent({
                  product: p as EulogiseProduct,
                  slug,
                  pageIndex: updatedPage.pageIndex,
                  newRows: updatedPage.rows,
                }),
              )
            }

            // Rebuild full pages array for saving
            const allUpdatedPages = pages.map(
              (page: ICardProductPage, index: number) => {
                const updated = updatedPages.find((u) => u.pageIndex === index)
                return updated ?? page
              },
            )

            dispatch(
              saveCardProduct({
                product: p,
                cardProduct: {
                  ...allActiveCardProducts[p]!,
                  content: {
                    ...allActiveCardProducts[p]?.content!,
                    pages: allUpdatedPages,
                  },
                  case: caseId,
                },
                onSuccess: () => null,
              }),
            )
          }
        })
        // Update slideshow
        if (needUpdateSlideshow && activeSlideshow) {
          const slides: Array<ISlide> = activeSlideshow?.content?.slides

          const updatedSlides: Array<ISlide> = slides.map((slide: ISlide) => {
            if (
              slide?.slideType === SlideType.IMAGE_SLIDE &&
              slide?.image?.filestackHandle ===
                editingImageContent?.filestackHandle
            ) {
              return {
                ...slide,
                image: newEditedImageContent,
              }
            }
            return slide
          })
          dispatch(
            saveSlidesToSlideshowByCaseId({
              caseId,
              slideshowData: activeSlideshow,
              slides: updatedSlides,
            }),
          )
        }
      } catch (error) {
        Notification.error(`Replacing old image failed`)
        console.log('`Replacing old image failed`', error)
      }
    }

    const onSaveNewCustomisedImageOrderIds = (
      newImageId: string,
      newImageInsertIndex: number,
    ) => {
      if (!newImageId || !newImageInsertIndex || newImageInsertIndex < 0) {
        return
      }
      let customisedImagesOrderIds: Array<string> =
        AssetHelper.getCustomisedImagesOrderIdsByImages(images)
      customisedImagesOrderIds[newImageInsertIndex] = newImageId

      const updatedCaseFields = {
        customisedImagesOrderIds,
      }
      dispatch(updateCaseById({ caseId, caseFields: updatedCaseFields }))
      NavigationHelper.removeUnsavedListener()
    }

    TranformationUIHelper.openTranformationUI({
      image: editingImage,
      caseId,
      dispatch,
      updatedCardProducts,
      needUpdateSlideshow,
      needUpdatePrimaryImage,
      onChangePrimaryImage,
      onReplaceAllProductsWithEditedImageContent,
      originPhotoIndex,
      onSaveNewCustomisedImageOrderIds,
    })
  }

  const handlers = {
    UNDO: () => {
      dispatch(undoCardProductContent(product))
    },
    UNDO_CTRL: () => {
      dispatch(undoCardProductContent(product))
    },
    REDO: () => {
      dispatch(redoCardProductContent(product))
    },
  }

  const onSaveTitleSlide = (tsp?: TitleSlideControlPanelProps) => {
    if (activeSlideshow && product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE) {
      const tSlideProps = tsp || titleSlideProps
      dispatch(
        saveTitleSlide({
          caseId,
          slideshowData: activeSlideshow,
          startTitleSlideData: {
            isTitleSlideEnable: tSlideProps?.isStartTitleSlideEnabled,
            titleSlideTransition: tSlideProps?.titleSlideTransition,
          },
          endTitleSlideData: {
            isTitleSlideEnable: tSlideProps?.isEndTitleSlideEnabled,
            titleSlideTransition: tSlideProps?.endTitleSlideTransition,
          },
        }),
      )
    }
  }

  const showChangeLayoutDrawer = (params: IFrameChangeEvent) => {
    const { pageIndex: pi, rowId, layoutType, layoutId } = params
    if (setFramePageIndex) {
      setFramePageIndex(pi)
    }
    if (setFocusedRowId) {
      setFocusedRowId(rowId)
    }
    setSelectedLayoutData({
      layoutType: layoutType!,
      layoutId: layoutId!,
    })
  }

  const isEditMode = displayMode === CardProductViewDisplayMode.EDIT

  useEffect(() => {
    if (!isEditMode) return

    const updateToolbarPosition = () => {
      const editorEl = ref.current as HTMLDivElement | null
      const toolbarEl = document.getElementById('editor-toolbar-sticky-target')
      if (editorEl && toolbarEl) {
        const editorRect = editorEl.getBoundingClientRect()
        const top = Math.max(0, editorRect.top)
        toolbarEl.style.top = `${top}px`
        toolbarEl.style.left = `${editorRect.left}px`
        toolbarEl.style.width = `${editorRect.width}px`
      }
    }

    window.addEventListener('scroll', updateToolbarPosition, { passive: true })
    window.addEventListener('resize', updateToolbarPosition, { passive: true })
    updateToolbarPosition()

    // Re-measure after CSS transition completes when image library toggles
    const transitionTimer = setTimeout(updateToolbarPosition, 350)

    return () => {
      window.removeEventListener('scroll', updateToolbarPosition)
      window.removeEventListener('resize', updateToolbarPosition)
      clearTimeout(transitionTimer)
    }
  }, [isEditMode, isShowImageLibrary])

  const shouldHidePagesSwitchActionsBar =
    isEditMode && product === EulogiseProduct.THANK_YOU_CARD
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK

  const onRowBlur = () => {
    if (setFocusedRowId) {
      setFocusedRowId(undefined)
    }
    if (onSelectedFrameContentItemId) {
      onSelectedFrameContentItemId(undefined)
    }
    if (onIsShowImageLibrary) {
      onIsShowImageLibrary(false)
    }
  }

  const onInsertBrand = async (
    insertBrandHandle: string,
    pageIndex: number | undefined,
  ) => {
    if (!productTheme || pageIndex === undefined) {
      return
    }
    const selectedBrand = brands?.find(
      (brand) => brand?.content?.filestackHandle === insertBrandHandle,
    )

    const imageContent = {
      type: CardProductContentItemType.IMAGE,
      filename: selectedBrand?.content?.filename,
      filepath: selectedBrand?.content?.filepath,
      filestackHandle: insertBrandHandle,
    } as ICardProductFrameImageContent

    const { height: orgImageHeight, width: orgImageWidth } =
      await ImageHelper.getImageSize(imageContent)

    const adjustedImageWidth =
      (DEFAULT_CLIENT_INSERTED_BRAND_HEIGHT / orgImageHeight) * orgImageWidth

    if (dispatchAddRow) {
      dispatchAddRow({
        product,
        type: CardProductContentItemType.IMAGE,
        productTheme,
        options: {
          content: {
            ...imageContent,
            height: DEFAULT_CLIENT_INSERTED_BRAND_HEIGHT,
            width: adjustedImageWidth,
            isClientBrandImage: true,
          },
        },
        pageIndex,
      })
    }
  }

  const onUpdate = ({
    product,
    pageIndex,
    rowId,
    data,
    event,
  }: {
    product: EulogiseProduct
    pageIndex: number
    rowId: string
    data: ICardProductRowData
    event?: IContentItemOnChangeEvent
  }) => {
    if (displayMode === CardProductViewDisplayMode.TEMPLATE) {
      return
    }
    if (displayMode !== CardProductViewDisplayMode.PREVIEW) {
      NavigationHelper.addUnsavedListener()
    }

    const isAddToUndoList = event?.event !== 'resize-no-recording'
    dispatch(
      updateCardProductContent({
        product,
        pageIndex,
        rowId,
        data,
        isAddToUndoList,
        slug,
      }),
    )
  }

  const removePages = PhotobookHelper.getNoOfRemovePages({ pageSize, foldType })
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <CopyLibraryDrawer
        onReplaceText={(replaceText: string) => {
          if (focusedRowId && currentPageIndex !== undefined) {
            const page = cardProduct.content.pages[currentPageIndex]
            const focusedRow = page.rows.find((row) => row.id === focusedRowId)
            if (focusedRow) {
              const isPhotobookTitlePageLayout =
                PhotobookHelper.isPhotobookTitlePageLayout({
                  page: currentPageIndex,
                })
              const focusedTextRowData =
                focusedRow.data as ICardProductTextRowData
              const firstBlock = focusedTextRowData.content.blocks[0]
              const rowStyle = focusedTextRowData.rowStyle
              const fontSize = rowStyle?.fontSize ?? 10
              const { height } = CardProductHelper.getTextDimensionsUsingCanvas(
                {
                  text: replaceText,
                  fontSize: fontSize,
                  fontFamily: rowStyle?.font,
                  maxWidth: focusedTextRowData.width! - 12,
                },
              )
              onUpdate({
                product,
                pageIndex: currentPageIndex,
                rowId: focusedRowId,
                data: {
                  ...focusedTextRowData,
                  content: {
                    ...focusedTextRowData.content,
                    blocks: [
                      {
                        ...firstBlock,
                        text: replaceText,
                      },
                    ],
                  },
                  height:
                    // remain the same height if photobook and not title page layout
                    isPhotobook && !isPhotobookTitlePageLayout
                      ? focusedTextRowData.height
                      : height,
                  rowStyle: {
                    ...rowStyle,
                    fontSize,
                  },
                },
              })
            }
          }
        }}
      />
      <StyledCardProductWithPagination
        ref={screenContentRef}
        $zoom={zoom}
        className={className}
        $isPreview={displayMode !== CardProductViewDisplayMode.EDIT}
        onMouseDown={() => {
          onRowBlur()
        }}
      >
        <div
          id="photo-frame-effects-drawer-target"
          style={{ position: 'relative', height: '100%', width: 0 }}
        />
        {displayMode === CardProductViewDisplayMode.EDIT &&
          !isClientBrandImageSelected && (
            <UploadPicturesPanel
              slug={slug}
              isShowUnusedImagesButton
              product={product}
              isVisible={true}
              isCollapsed={!isShowImageLibrary}
              onImageLayoutButtonClick={
                !!selectedFrameContentItemId
                  ? () => {
                      showChangeLayoutDrawer({
                        pageIndex: currentPageIndex!,
                        rowId: focusedRowId!,
                        layoutType: selectedLayoutData?.layoutType,
                        layoutId: selectedLayoutData?.layoutId,
                      })
                    }
                  : undefined
              }
              height={isShowImageLibrary ? `${imageLibraryHeight}px` : `0px`}
              title={`Select an image to add to your ${CardProductHelper.getProductShortName(
                {
                  product,
                  region,
                },
              ).toLowerCase()}`}
              existingFileHandles={[updatingImageDetails?.filestackHandle!]}
              isDraggingImageLibraryItem={isDraggingImageLibraryItem}
              isDraggableImageLibraryItem={isDraggableImageLibraryItem}
              onImageClick={handleSelectImage}
              onSelectImageClick={handleSelectImage}
              onUnselectImageClick={() => {
                console.log('unselect image click')
              }}
            />
          )}
        {isEditMode &&
          createPortal(
            <StickyToolbarContainer id="editor-toolbar-sticky-target" />,
            document.body,
          )}
        <EditorPanel $isEnabledScrolling={isEnabledScrolling} ref={ref}>
          <EditorPanelContent $noPadding={true} ref={editorContainerRef}>
            <StyledEditorContainer>
              {/*<DndProvider backend={HTML5Backend}>*/}
              <CardProductEditor
                {...cardProductPageProps}
                containerRef={ref}
                editorScaledFactor={editorScaledFactor}
                pageMode={pageMode}
                focusedRowId={focusedRowId}
                onRowFocused={({ rowId, pageIndex }) => {
                  if (setFocusedRowId) {
                    setFocusedRowId(rowId, true, pageIndex)
                  }
                  /*
                  // delay before setting it as we want the onFrameItemClick trigger first
                  setTimeout(() => {
                    // user change the row, reset the selectedFrameContentItem id
                    if (focusedRowId !== rowId) {
                      setSelectedFrameContentItemId(undefined)
                    }
                    setFocusedRowId(rowId)
                  }, 100)
*/
                }}
                cardProduct={cardProduct}
                product={product}
                productTheme={productTheme!}
                loading={isFetching}
                displayMode={displayMode}
                pageCursor={currentPageCursor}
                onItemFocus={({ type, layoutId, layoutType }) => {
                  if (onIsShowImageLibrary) {
                    // delay before setting it as we want the onFrameItemClick trigger first
                    onIsShowImageLibrary(
                      type === CardProductContentItemType.IMAGE ||
                        type === CardProductContentItemType.COLUMNS ||
                        type === CardProductContentItemType.FRAME,
                    )
                    setSelectedLayoutData({
                      layoutType,
                      layoutId,
                    })
                  }
                }}
                onAddAndCancelNewElementClick={() => {
                  if (setFocusedRowId) {
                    setFocusedRowId(undefined)
                  }
                  if (onIsShowImageLibrary) {
                    onIsShowImageLibrary(false)
                  }
                }}
                onToggleImageBorderClick={(ev) => {
                  if (onToggleImageBorderClick) {
                    onToggleImageBorderClick(ev)
                  }
                }}
                onToggleFadeImageClick={onToggleFadeImageClick}
                onTransparencyChange={onTransparencyChange}
                onChangeImageClick={(ev) => {
                  if (onChangeImageClick) {
                    onChangeImageClick(ev)
                  }
                }}
                onChangeLayoutClick={({
                  pageIndex,
                  rowId,
                  layoutType,
                  layoutId,
                }: IFrameChangeEvent) => {
                  showChangeLayoutDrawer({
                    pageIndex,
                    rowId,
                    layoutType,
                    layoutId,
                  })
                }}
                onRowDataChange={({
                  pageIndex,
                  rowId,
                  rowData,
                }: IRowDataChangeEvent) => {
                  dispatch(
                    updateCardProductContent({
                      product,
                      pageIndex,
                      rowId,
                      data: rowData,
                      slug,
                    }),
                  )
                }}
                onEditImageClick={onEditImageClick}
                onEnhanceImageClick={onEnhanceImageClick}
                onBgRemoverClick={onBgRemoverClick}
                onCancel={({ product, cardProduct, pageIndex }: any) => {
                  dispatch(
                    cleanupCardProductEmptyRows({
                      product,
                      cardProduct,
                      pageIndex,
                    }),
                  )
                }}
                onUpdate={onUpdate}
                onDelete={({ product, id, pageIndex, cardProduct }: any) => {
                  dispatch(
                    deleteCardProductRow({
                      product,
                      id,
                      pageIndex,
                      cardProduct,
                    }),
                  )
                }}
                onToggleTextClick={({ pageIndex, rowId }) => {
                  dispatch(
                    toggleTextCardProductRow({
                      product,
                      pageIndex,
                      rowId,
                      slug,
                      genericProductMetadata: (
                        cardProduct as IGenericCardProductData
                      )?.content?.metadata,
                    }),
                  )
                }}
                onDuplicate={({ product, id, pageIndex, cardProduct }: any) => {
                  dispatch(
                    duplicateCardProductRow({
                      product,
                      id,
                      pageIndex,
                      cardProduct,
                    }),
                  )
                }}
                onAddRowClick={(ev) => {
                  if (onAddRowClick) {
                    onAddRowClick(ev)
                  }
                }}
                selectedFrameContentItemId={
                  focusedRowId ? selectedFrameContentItemId : undefined
                }
                onFrameContentItemClick={({
                  frameContentItem,
                  pageIndex,
                  rowId,
                }: {
                  frameContentItem: ICardProductFrameContentItem
                  pageIndex: number
                  rowId: string
                }) => {
                  if (onSelectedFrameContentItemId) {
                    setTimeout(() => {
                      onSelectedFrameContentItemId(
                        frameContentItem.id,
                        rowId,
                        (
                          frameContentItem.content as ICardProductFrameImageContent
                        ).filestackHandle,
                        pageIndex,
                      )
                    }, 50)
                  }
                }}
                onFrameContentItemChange={(
                  event: any,
                  { contentItem, pageIndex, rowId },
                ) => {
                  /* Ignore the following: since we are showing loading icon if renderImageHeight or renderImageWidth is undefined
                     1. dispatch updateCardProductContentByContentItem
                     when it is "edit-confirm" otherwise, users will see
                     frame image resizing when they change images
                     refer to: https://trello.com/c/mReTVy47/1488-images-jump-resize-in-frame
                     2. dispatch event on "resize" as well. Otherwise,
                     image will not be fitting the frame size
                     refer to: https://trello.com/c/KuY8k3R5/1504-booklet-resizing-the-image-the-image-does-not-fit-the-size-of-the-frame
                   */
                  dispatch(
                    updateCardProductContentByContentItem({
                      product,
                      pageIndex,
                      rowId,
                      slug,
                      contentItem,
                      isAddToUndoList: event.eventType !== 'load',
                      onSuccess: (cardProduct: ICardProductData) => {
                        dispatch(
                          saveCardProduct({
                            product,
                            cardProduct,
                            cardProductTheme: productTheme,
                            isShowNotification: false,
                          }),
                        )
                      },
                    }),
                  )
                  //console.log('frameContentRowData', contentItem)
                  // dispatch update event
                  /*
                  dispatch(
                    updateCardProductContent({
                      product,
                      pageIndex,
                      rowId,
                      data: frameContentRowData,
                      isAddToUndoList: event.eventType !== 'load',
                    }),
                  )
*/
                }}
                hasSkippedOrFilledMemorialDataPullForm={
                  hasSkippedOrFilledMemorialDataPullForm
                }
                isRowAddActionButtonHighlighted={
                  isRowAddActionButtonHighlighted
                }
                onOpenCopyLibraryDrawer={() => {
                  dispatch(openCopyLibraryDrawer({ productType: product }))
                }}
                onAssignDynamicData={onAssignDynamicData}
                guideShowAt={guideShowAt}
                currentStep={currentStep || 0}
              />
              {/*</DndProvider>*/}
            </StyledEditorContainer>
            {/*
            {isPhotobook && isEditMode && pageCursor === 0 && (
              <StyledPhotobookCoverTypeSelector
                value={
                  cardProduct.content.pages[0]
                    .coverType as EulogisePhotobookCoverType
                }
                onChange={(ct) => {
                  dispatch(
                    updatePhotobookCoverType({
                      coverType: ct,
                    }),
                  )
                }}
                isShowLabel
              />
            )}
*/}
            {!shouldHidePagesSwitchActionsBar && (
              <EditorPagination
                product={product}
                foldType={foldType}
                pageMode={pageMode}
                totalPages={totalPages}
                isCoverPage={PhotobookHelper.isPhotobookCoverPage({
                  product,
                  pageIndex: pageCursor,
                  noOfPageCursors,
                })}
                noOfPageCursors={noOfPageCursors!}
                pageCursor={currentPageCursor}
                onPageChange={(pc: number) => {
                  if (onIsShowImageLibrary) {
                    onIsShowImageLibrary(false)
                  }
                  if (onPageChange) {
                    onPageChange(pc)
                  }
                }}
                width={scaledEditorWidth ? `${scaledEditorWidth}px` : undefined}
                displayMode={displayMode!}
              />
            )}
            {product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE &&
              displayMode === CardProductViewDisplayMode.EDIT &&
              titleSlideProps &&
              activeSlideshow &&
              isShowSlideshowTitleSlideControlPanel && (
                <StyledTitleSlideControlPanelContainer
                  $titleSlidePanelScaleFactor={titleSlidePanelScaleFactor}
                >
                  <TitleSlideControlPanel
                    titleSlidePanelScaleFactor={titleSlidePanelScaleFactor}
                    slideshowId={activeSlideshow.id!}
                    titleSlideTransition={titleSlideProps.titleSlideTransition!}
                    endTitleSlideTransition={
                      titleSlideProps.endTitleSlideTransition!
                    }
                    isStartTitleSlideEnabled={
                      titleSlideProps.isStartTitleSlideEnabled!
                    }
                    isEndTitleSlideEnabled={
                      titleSlideProps.isEndTitleSlideEnabled!
                    }
                    onChange={(props) => {
                      setTitleSlideProps(props)
                      onSaveTitleSlide(props)
                    }}
                    onNavigationLeave={() => {
                      dispatch(
                        saveCardProduct({
                          product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
                          cardProduct,
                        }),
                      )
                    }}
                  />
                </StyledTitleSlideControlPanelContainer>
              )}
          </EditorPanelContent>
        </EditorPanel>
        {isShowRemoveCardProductPagesModal && (
          <RemoveCardProductPagesModal
            product={product}
            cardProduct={cardProduct}
            displayMode={CardProductViewDisplayMode.EDIT}
            onClose={() => setIsShowRemoveCardProductPagesModal(false)}
            onConfirm={() => {
              dispatch(removeCardProductPages({ product, slug, removePages }))
              setIsShowRemoveCardProductPagesModal(false)
            }}
            removePages={removePages}
          />
        )}
      </StyledCardProductWithPagination>
      {framePageIndex !== undefined && framePageIndex >= 0 && (
        <CardProductFrameDrawer
          activeCase={activeCase!}
          product={product}
          cardProduct={cardProduct}
          isShowTitlePageLayouts={PhotobookHelper.isPhotobookTitlePage({
            product,
            pageIndex: framePageIndex,
          })}
          initialDrawerDisplayMode={selectedLayoutData?.layoutType}
          selectedLayoutId={selectedLayoutData?.layoutId}
          pageIndex={framePageIndex}
          isOpen={framePageIndex !== undefined && framePageIndex >= 0}
          onClose={() => {
            if (setFramePageIndex) {
              setFramePageIndex(undefined)
            }
          }}
          containerRef={ref}
          onItemClick={(type, layoutData) => {
            // changing from frame layout to page layout
            if (type === CardProductFrameOnItemClickType.PAGE) {
              const newLayoutData = layoutData as ICardProductPage
              dispatch(
                replaceCardProductPage({
                  product,
                  pageIndex: framePageIndex!,
                  rows: newLayoutData.rows,
                  layoutId: newLayoutData.layoutId,
                  isTitlePageLayout: true,
                  slug,
                }),
              )
            }
            // changing to frame layout
            else if (type === CardProductFrameOnItemClickType.FRAME_LAYOUT) {
              const newLayoutData = layoutData as ICardProductFrameLayout

              const isCurrentPhotobookTitlePageLayout =
                PhotobookHelper.isPhotobookTitlePageLayout({
                  page: cardProduct.content.pages[framePageIndex!],
                })
              // if it is changing from Page Layout to Frame Layout
              if (isCurrentPhotobookTitlePageLayout) {
                dispatch(
                  changeToFrameLayoutFromPageLayout({
                    product,
                    pageIndex: framePageIndex!,
                    frameContent: newLayoutData,
                    slug,
                  }),
                )
              }
              // changing from Frame Layout to another Frame Layout
              else {
                const firstFrameRowId =
                  CardProductHelper.getFirstFrameRowIdInPage(
                    cardProduct.content.pages[framePageIndex!],
                  )
                const changeRowId =
                  product === EulogiseProduct.PHOTOBOOK
                    ? focusedRowId ?? firstFrameRowId
                    : focusedRowId
                if (changeRowId && !isCurrentPhotobookTitlePageLayout) {
                  if (onSelectedFrameContentItemId) {
                    // select the first item on changing frame layout
                    onSelectedFrameContentItemId(
                      CardProductFrameHelper.getFirstContentId(newLayoutData),
                      changeRowId,
                      CardProductFrameHelper.getFirstContentFileHandle(
                        newLayoutData,
                      ),
                      framePageIndex,
                    )
                  }

                  dispatch(
                    changeFrameByRowId({
                      rowId: changeRowId,
                      cardProduct,
                      newLayoutData,
                      product,
                      slug,
                      pageContentWidth,
                      framePageIndex: framePageIndex!,
                      shouldUpdatePhotobookRowsAlignment:
                        product === EulogiseProduct.PHOTOBOOK,
                    }),
                  )
                }
                // when no rows selected
                else {
                  let contentWidth = newLayoutData.width
                  let contentHeight = newLayoutData.height
                  if (contentWidth! > pageContentWidth) {
                    contentWidth = pageContentWidth
                    contentHeight = pageContentWidth
                  }

                  if (dispatchAddRow) {
                    dispatchAddRow({
                      product,
                      type: CardProductContentItemType.FRAME,
                      productTheme,
                      options: {
                        content: {
                          ...newLayoutData,
                          width: contentWidth,
                          height: contentHeight,
                        },
                      },
                      pageIndex: framePageIndex!,
                    })
                  }
                }
              }
            }
            if (setFramePageIndex) {
              setFramePageIndex(undefined)
            }
          }}
        />
      )}
      {isShowOverlaySettingModal && (
        <OverlaySettingsModal
          fields={overlaySettingsFormFields}
          product={product}
          productTheme={productTheme!}
          cardProduct={cardProduct}
          onApply={(fields: ICardProductOverlayUpdateOptions) => {
            const { leftPageIndex, rightPageIndex } =
              CardProductHelper.getPageIndexesByPageCursor({
                product,
                pageCursorIndex: pageCursor,
                foldType,
                totalPages,
                pageMode,
                isMobile: false,
                displayMode,
              })

            dispatch(
              updateCardProductOverlay({ overlay: fields, product, slug }),
            )
            dispatch(
              enableCardProductOverlayAction({
                product,
                slug,
                pageIndexes: [leftPageIndex!, rightPageIndex!],
              }),
            )
            onIsShowOverlaySettingModalChange(false)
          }}
          onClose={() => onIsShowOverlaySettingModalChange(false)}
          isOpen={isShowOverlaySettingModal}
          onColorChange={(color: string) => {
            dispatch(selectUserSettingsColorAction({ color }))
          }}
          recentColors={recentColors}
        />
      )}
      {isShowBorderSettingModal && (
        <BorderSettingsModal
          fields={borderSettingFormFields}
          productTheme={productTheme!}
          genericProductMetadata={genericProductMetadata}
          product={product}
          region={region}
          pageSize={pageSize}
          onApply={(fields: IBorderSettingsModalFormFields) => {
            dispatch(
              updateCardProductBorder({
                borderSettings: fields,
                product,
                slug,
              }),
            )
            setIsShowBorderSettingModal(false)
          }}
          isOpen={isShowBorderSettingModal}
          onClose={() => setIsShowBorderSettingModal(false)}
          onColorChange={(color: string) => {
            dispatch(selectUserSettingsColorAction({ color }))
          }}
          recentColors={recentColors}
        />
      )}
      {isInsertBrandModalOpened && (
        <InsertBrandModal
          onInsertBrand={(
            insertBrandHandle: string,
            pageIndex: number | undefined,
          ) => onInsertBrand(insertBrandHandle, pageIndex)}
        />
      )}
    </GlobalHotKeys>
  )
}

export default CardProductWithPagination
export const SortableCardProductWithPagination = SortableContainer(
  CardProductWithPagination,
)
