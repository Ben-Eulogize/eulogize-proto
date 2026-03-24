import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  COLOR,
  EulogiseClientConfig,
  STYLE,
  useDetectClickOutside,
  useEditorBreakpoint,
  useIsNotDesktop,
} from '@eulogise/client-core'
import {
  useCaseState,
  useEulogiseDispatch,
  useGenericCardProductTypeByPathname,
  useGuideWalkThroughState,
  useProductState,
  useSlideshowState,
} from '../../store/hooks'
import {
  AssetType,
  CardProductBorderType,
  CardProductContentItemType,
  CardProductPageMode,
  CardProductViewDisplayMode,
  DrawerId,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  ICardProductData,
  ICardProductPage,
  ICardProductRow,
  ICardProductTheme,
  ICardProductViewType,
  ICaseState,
  IGenericCardProductContent,
  IGenericCardProductTypeDimension,
  IGuideWalkThroughState,
  ModalId,
} from '@eulogise/core'
import { SlideshowHelper } from '@eulogise/helpers'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import {
  AccountSettingIcon,
  AddOverlayIcon,
  Alert,
  AlertFull,
  AlertLeft,
  AlertRight,
  BackgroundIcon,
  BorderSettingsIcon,
  BrandingWatermarkIcon,
  ButtonSize,
  ButtonType,
  ColumnsIcon,
  DropdownArrowDownIcon,
  DropdownArrowUpIcon,
  EditorViewIcon,
  FontSizeIcon,
  HynmsAndPrayersIcon,
  IconAssetIcon,
  ImageLayoutIcon,
  MagnifierPlusIcon,
  QRCodeIcon,
  RemoveOverlayIcon,
  Select,
  SelectOption,
  SpreadViewIcon,
  UploadImageIcon,
} from '@eulogise/client-components'
import { Button } from '../../../../../eulogise-client-components/src/Button'
import {
  addCardProductPages,
  toggleCardProductOverlay,
  updateSelectedDimension,
} from '../../store/CardProduct/actions'
import {
  openChangeBackgroundImageDrawer,
  openCopyLibraryDrawer,
  openDrawerAction,
} from '../../store/DrawerState/actions'
import { useDropdownHoverClick } from '../../hooks/useDropdownHoverClick'
import BookletEditorMagnifierSlider from './BookletEditorMagnifierSlider'
import { GuidePopover } from '../GuidePopover/GuidePopover'
import { showModalAction } from '../../store/ModalState/actions'
import { QRCodeModal } from '../../containers/Modal/QRCodeModal/QRCodeModal'
import { updateIsFSOverlayPickerOpen } from '../../store/AssetState/actions'

const StyledAlertFull = styled(AlertFull)`
  display: flex;
  padding: 0 16px;
`

const AlertContainer = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 0;
  width: 100%;
`

const StyledAlert = styled(Alert)<{ width?: string }>`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-top: 0;
  margin-bottom: 0;
`

const StyledVersesLibraryIcon = styled(HynmsAndPrayersIcon)`
  margin-top: 2px;
  height: 100%;
`

const StyledBorderIcon = styled(BorderSettingsIcon)`
  padding-top: 2px;
  height: 100%;
`

const DesktopTextButton = styled(Button)<{
  $shouldShowCardEditorDropdown?: boolean
}>`
  ${({
    $shouldShowCardEditorDropdown,
  }: {
    $shouldShowCardEditorDropdown?: boolean
  }) => ($shouldShowCardEditorDropdown ? `width: 180px;` : ``)}
  display: flex;
  align-items: center;
  height: 36px;
`

const StyledChangeBackgroundBookIcon = styled(BackgroundIcon)`
  margin-top: 1px;
  cursor: pointer;
  height: 100%;
`

const StyledFontSizeIcon = styled(FontSizeIcon)`
  margin-right: 4px;
  margin-top: 3px;
  cursor: pointer;
`

const StyledImageLayoutIcon = styled(ImageLayoutIcon)`
  margin-top: 3px;
  cursor: pointer;
`

const iconStyle = `
  margin-right: 4px;
  margin-top: 3px;
  cursor: pointer;
`

const StyledDividerAndSpaceIcon = styled(ColumnsIcon)`
  ${iconStyle}
`

const StyledIconAssetIcon = styled(IconAssetIcon)`
  ${iconStyle}
`

const StyledInsertBrandIcon = styled(BrandingWatermarkIcon)`
  ${iconStyle}
`

const StyledTributeQRCodeIcon = styled(QRCodeIcon)`
  ${iconStyle}
`

const IconStyle = `
  margin-left: 6px;
  margin-top: 3px;
  cursor: pointer;
  font-size: 20px;
`

const StyledMagnifierPlusIcon = styled(MagnifierPlusIcon)`
  ${IconStyle}
`

const StyledSpreadViewIcon = styled(SpreadViewIcon)`
  ${IconStyle}
`

const StyledEditorViewIcon = styled(EditorViewIcon)`
  ${IconStyle}
`

const StyledAddPageIcon = styled.img`
  margin-right: 0.5rem;
  height: 80%;
  ${({ $isButtonDisabled }: { $isButtonDisabled: boolean }) =>
    $isButtonDisabled ? `` : ``}
`

const StyledRemovePageIcon = styled.img`
  margin-right: 0.5rem;
  height: 80%;
  ${({ $isButtonDisabled }: { $isButtonDisabled: boolean }) =>
    $isButtonDisabled ? `` : ``}
`

const StyledAccountSettingIcon = styled(AccountSettingIcon)`
  margin-top: 2px;
`

const StyledDropdownArrowDownIconContainer = styled.div`
  margin: 0 0 0 5px;
  > * {
    margin-bottom: -3px;
  }
`

const StyledDropdownArrowDownIcon = styled(DropdownArrowDownIcon)``

const StyledDropdownArrowUpIcon = styled(DropdownArrowUpIcon)``

const StyledDesignOptionButton = styled(Button)`
  display: flex;
`

const StyledDesignOptionButtonGroupContainer = styled.div`
  & > button {
    height: 36px;
  }
`

const StyledDropdownButton = styled(Button)<{
  $isDropdownOpened: boolean
  $width?: string
}>`
  ${({
    $isDropdownOpened,
    $width,
  }: {
    $isDropdownOpened: boolean
    $width?: string
  }) => ($isDropdownOpened ? `width: ${$width ? `${$width};` : '200px;'}` : ``)}
  display: flex;
  justify-content: space-between;
`

const StyledDesignOptionDropdownButtonContainer = styled.div`
  position: absolute;
  z-index: 5;
`

const StyledDropdownItemButton = styled(DesktopTextButton)<{
  $width?: string
}>`
  ${({ $width }) => ($width ? `width: ${$width};` : `width: 200px;`)}

  &:hover {
    background-color: ${COLOR.SIDER_ITEM_HOVER_BACKGROUND_COLOR};
  }
`

const StyledMagnifierDropdownContainer = styled.div`
  position: relative;
`

const StyledBookletMagnifierSlider = styled(BookletEditorMagnifierSlider)``

const StyledMagnifierButton = styled(DesktopTextButton)`
  display: flex;
  margin-left: auto;
`

const StyledDesignOptionsButton = styled(DesktopTextButton)<{
  $shouldShowCardEditorDropdown: boolean
}>`
  ${({
    $shouldShowCardEditorDropdown,
  }: {
    $shouldShowCardEditorDropdown: boolean
  }) =>
    $shouldShowCardEditorDropdown
      ? `
  &:hover {
    background-color: ${COLOR.SIDER_ITEM_HOVER_BACKGROUND_COLOR};
  }`
      : ``}
  display: flex;
`

const StyledPageSwitcherContainer = styled.div`
  display: flex;
`

const StyledPageSwitcherButton = styled(Button)`
  width: 100px;
`

const StyledUploadImageIcon = styled(UploadImageIcon)`
  margin-top: 2px;
  margin-right: 4px;
`

const StyledMagnifierDropdownButtonContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 5;
  width: 200px;
`

const StyledSizeSelect = styled(Select)`
  min-width: 120px;
  margin-right: 8px;
  display: flex;
`

const StyledAlertRight = styled(AlertRight)`
  align-items: center;
  gap: ${STYLE.HALF_GUTTER};
`

interface ICardProductEditorHeader {
  location: Location
  selectedRow?: ICardProductRow
  displayMode: CardProductViewDisplayMode
  pageCursor: number
  setPageCursor: (pc: number) => void
  setIsShowBorderSettingModal: (isShowBorderSettingModal: boolean) => void
  setIsShowRemoveCardProductPagesModal: (
    isShowBorderSettingModal: boolean,
  ) => void
  onAddIconAssetClick?: (pageIndex: number) => void
  onAddDividerAssetClick?: (pageIndex: number) => void
  onAddRowClick: ({
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
  onOverlayOptionClick?: () => void
  setFocusedRowId: (
    rowId: string | undefined,
    autoSelectFirstContentId?: boolean,
    pageIndex?: number,
  ) => void
  onBookletMagnifierSliderChange: (value: number) => void
  bookletMagnifierSliderValue: number
  viewType?: ICardProductViewType
  onViewTypeChange: (viewType: ICardProductViewType) => void
}

const CardProductEditorHeader = ({
  location,
  displayMode,
  selectedRow,
  pageCursor,
  setPageCursor,
  setIsShowBorderSettingModal,
  setIsShowRemoveCardProductPagesModal,
  onOverlayOptionClick,
  onAddRowClick,
  onAddIconAssetClick,
  onAddDividerAssetClick,
  viewType = ICardProductViewType.EDITOR_VIEW,
  onViewTypeChange,
  setFocusedRowId,
  onBookletMagnifierSliderChange,
  bookletMagnifierSliderValue,
}: ICardProductEditorHeader) => {
  const dispatch = useEulogiseDispatch()

  // TECHDEBT: Why boolean?
  const shouldShowInsertBrandButton: boolean = [
    EulogiseUserRole.ADMIN,
    EulogiseUserRole.CLIENT,
  ]

  const [isAddElementInTheLeftPage, setIsAddElementInTheLeftPage] =
    useState<boolean>(true)

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })
  const isAtCardProductEditor = CardProductHelper.getIsAtCardProductEditor({
    location,
  })

  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location,
  })
  const { activeItem: cardProduct, activeProductTheme } = useProductState({
    product,
    slug,
  }) as {
    activeItem: ICardProductData
    activeProductTheme: ICardProductTheme
  }
  const { activeItem: activeSlideshow } = useSlideshowState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const [isShowQRCodeModal, setIsShowQRCodeModal] = useState<boolean>(false)
  const region: EulogiseRegion = activeCase?.region ?? EulogiseRegion.AU
  const caseId = activeCase?.id
  const shouldShowTributeQRCodeButton: boolean =
    CardProductHelper.isReadyForDownload(activeSlideshow?.fileStatus!)

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { currentStep, guideShowAt } = guideWalkThroughContext
  const { genericProductType } = useGenericCardProductTypeByPathname(
    location.pathname,
  )

  const maxPages = CardProductHelper.getMaxPages({
    product,
    genericProductType,
  })
  const minPages = CardProductHelper.getMinPages({
    product,
    genericProductType,
  })

  const isNotDesktop = useIsNotDesktop()

  const editorWidth = CardProductHelper.getEditorWidth({
    cardProduct,
    isMobile: isNotDesktop,
  })

  const isPhotobook = product === EulogiseProduct.PHOTOBOOK

  const cardProductContent = cardProduct?.content
  const cardProductContentPages = cardProductContent?.pages
  const totalPages: number = isPhotobook
    ? cardProductContentPages?.length - 2
    : cardProductContentPages?.length ?? 0

  // Get dimensions from genericProductType and selected dimension from content metadata
  const availableDimensions = genericProductType?.dimensions ?? []
  const hasMultipleDimensions = availableDimensions.length > 1
  const genericCardProductContent =
    cardProductContent as IGenericCardProductContent
  const genericProductMetadata = genericCardProductContent?.metadata
  const selectedDimension = genericProductMetadata?.selectedDimension
  const foldType = genericProductMetadata?.foldType
  const isAllowAddPages = CardProductHelper.isAllowAddPages({
    product,
    foldType,
  })

  const isAtDesignYourProgramGuideStep: boolean =
    guideShowAt === GUIDE_SHOW_UP_PAGE.BOOKLET && currentStep === 3

  const pageMode: CardProductPageMode = CardProductHelper.getPageModeByPageSize(
    {
      pageSize: cardProductContent?.pageSize,
      product,
      displayMode,
    },
  )

  const noOfPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    totalPages: cardProductContentPages?.length,
    pageMode,
    foldType: genericProductMetadata?.foldType,
    isMobile: isNotDesktop,
  })

  const productShortName = `${CardProductHelper.getProductShortName({
    product: EulogiseProduct.SLIDESHOW,
    region,
  })}`

  const currentPageCursor =
    pageCursor > noOfPageCursors! - 1 ? noOfPageCursors! - 1 : pageCursor

  const { leftPageIndex, rightPageIndex } =
    CardProductHelper.getPageIndexesByPageCursor({
      product,
      pageCursorIndex: currentPageCursor,
      foldType: genericProductMetadata?.foldType,
      totalPages: cardProductContentPages?.length,
      pageMode,
    })

  const { isLeftPageOverlayed, isRightPageOverlayed } =
    CardProductHelper.getHasPagesOverlayEnabled(
      cardProductContentPages,
      leftPageIndex,
      rightPageIndex,
    )
  const isPageCursorPageOverlayed =
    CardProductHelper.getHasPageOverlayEnabledByIndex({
      pages: cardProductContentPages,
      // treat bookmark differently:
      // Bookmark can be four pages in data, but only displaying front and last page
      // therefore, return last page if pageCursor larger than 0
      pageIndex:
        product === EulogiseProduct.BOOKMARK && pageCursor > 0
          ? totalPages - 1
          : pageCursor,
    })

  const { shouldShowCardEditorDropdown } = useEditorBreakpoint()

  const hasLeftPage = leftPageIndex !== undefined
  const hasRightPage = rightPageIndex !== undefined

  const isSinglePageEditingView: boolean = hasLeftPage !== hasRightPage

  const addElementPageIndex: number = isNotDesktop
    ? pageCursor
    : !isSinglePageEditingView && isAddElementInTheLeftPage
    ? leftPageIndex
    : rightPageIndex

  const {
    hovered: addContentHovered,
    clicked: addContentClicked,
    onMouseClick: onAddContentMouseClick,
    onMouseEnter: onAddContentMouseEnter,
    onMouseLeave: onAddContentMouseLeave,
    onReset: onAddContentReset,
  } = useDropdownHoverClick({})
  const {
    hovered: overlayDropdownHovered,
    clicked: overlayDropdownClick,
    onMouseClick: onOverlayDropdownMouseClick,
    onMouseEnter: onOverlayDropdownMouseEnter,
    onMouseLeave: onOverlayDropdownMouseLeave,
    onReset: onOverlayDropdownReset,
  } = useDropdownHoverClick({})
  const {
    hovered: designOptionsHovered,
    clicked: designOptionsClicked,
    onMouseClick: onDesignOptionsMouseClick,
    onMouseEnter: onDesignOptionsMouseEnter,
    onMouseLeave: onDesignOptionsMouseLeave,
    onReset: onDesignOptionsReset,
  } = useDropdownHoverClick({})

  const {
    hovered: magnifierHovered,
    clicked: magnifierClicked,
    onMouseClick: onMagnifierMouseClick,
    onMouseEnter: onMagnifierMouseEnter,
    onMouseLeave: onMagnifierMouseLeave,
    onReset: onMagnifierMouseReset,
  } = useDropdownHoverClick({
    onDoubleClickedAction: () => {
      onBookletMagnifierSliderChange(
        CardProductHelper.getBookletEditorMagnifierValueByDoubleClick(
          bookletMagnifierSliderValue,
        ),
      )
    },
  })

  const shouldAddElementDropdownOpened = addContentHovered || addContentClicked
  const shouldOverlayDropdownOpened =
    overlayDropdownHovered || overlayDropdownClick
  const shouldDesignOptionsDropdownOpened =
    designOptionsHovered || designOptionsClicked

  const shouldMagnifierDropdownOpened = magnifierHovered || magnifierClicked

  const addContentRef = useDetectClickOutside({
    onTriggered: () => onAddContentReset(),
  })
  const overlayRef = useDetectClickOutside({
    onTriggered: () => onOverlayDropdownReset(),
  })
  const designOptionsRef = useDetectClickOutside({
    onTriggered: () => onDesignOptionsReset(),
  })

  const magnifierRef = useDetectClickOutside({
    onTriggered: () => onMagnifierMouseReset(),
  })

  useEffect(() => {
    setIsAddElementInTheLeftPage(true)
  }, [pageCursor, isNotDesktop])

  const renderBackgroundButton = () => {
    return (
      <StyledDesignOptionsButton
        $shouldShowCardEditorDropdown={shouldShowCardEditorDropdown}
        // tooltip="Change background image"
        buttonType={
          isAtDesignYourProgramGuideStep
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        onClick={() => {
          dispatch(
            openChangeBackgroundImageDrawer({
              productType: product,
              productId: cardProduct?.id,
              slug,
            }),
          )
          if (shouldShowCardEditorDropdown) {
            onDesignOptionsReset()
          }
        }}
        noMarginRight
        icon={<StyledChangeBackgroundBookIcon />}
      >
        Background
      </StyledDesignOptionsButton>
    )
  }

  const renderBorderButton = () => {
    // if there is single page in the pages that has border setting, then the border is considered active
    const pageWithBorderSettings = cardProductContentPages.find(
      (page: ICardProductPage) =>
        page.border && page.border.borderStyle !== CardProductBorderType.NONE,
    )
    const isActive = pageWithBorderSettings !== undefined
    return (
      <StyledDesignOptionsButton
        $shouldShowCardEditorDropdown={shouldShowCardEditorDropdown}
        // tooltip="Change Border Settings"
        buttonType={
          isActive || isAtDesignYourProgramGuideStep
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        onClick={() => {
          setIsShowBorderSettingModal(true)
          if (shouldShowCardEditorDropdown) {
            onDesignOptionsReset()
          }
        }}
        noMarginRight
        icon={<StyledBorderIcon />}
      >
        Borders
      </StyledDesignOptionsButton>
    )
  }

  const renderHymnsPrayersButton = () => {
    return (
      <DesktopTextButton
        $shouldShowCardEditorDropdown={false}
        buttonType={
          isAtDesignYourProgramGuideStep
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        icon={<StyledVersesLibraryIcon />}
        noMarginRight
        onClick={() => {
          dispatch(openCopyLibraryDrawer({ productType: product }))
        }}
      >
        Verses Library
      </DesktopTextButton>
    )
  }

  const renderOverlayDropdown = () => {
    const OVERLAY_BUTTON_SIZE = '120px'
    return (
      <StyledDesignOptionButtonGroupContainer
        ref={overlayRef}
        onMouseEnter={onOverlayDropdownMouseEnter}
        onMouseLeave={onOverlayDropdownMouseLeave}
      >
        <StyledDropdownButton
          $isDropdownOpened={shouldOverlayDropdownOpened}
          $width="auto"
          buttonType={
            isAtDesignYourProgramGuideStep
              ? ButtonType.HIGHLIGHTED_BUTTON
              : ButtonType.WHITE
          }
          noMarginRight
          onClick={onOverlayDropdownMouseClick}
        >
          Overlay
          <StyledDropdownArrowDownIconContainer>
            {shouldOverlayDropdownOpened ? (
              <StyledDropdownArrowUpIcon />
            ) : (
              <StyledDropdownArrowDownIcon />
            )}
          </StyledDropdownArrowDownIconContainer>
        </StyledDropdownButton>
        {shouldOverlayDropdownOpened && (
          <StyledDesignOptionDropdownButtonContainer>
            {product === EulogiseProduct.BOOKLET &&
            hasLeftPage &&
            hasRightPage ? (
              <>
                {renderAddOverlayButton({
                  text: 'Left',
                  pageIndex: leftPageIndex,
                  isPageOverlayed: isLeftPageOverlayed!,
                  width: OVERLAY_BUTTON_SIZE,
                })}
                {renderAddOverlayButton({
                  text: 'Right',
                  pageIndex: rightPageIndex,
                  isPageOverlayed: isRightPageOverlayed!,
                  width: OVERLAY_BUTTON_SIZE,
                })}
              </>
            ) : (
              renderAddOverlayButton({
                text: (
                  product === EulogiseProduct.BOOKLET
                    ? isRightPageOverlayed
                    : isPageCursorPageOverlayed
                )
                  ? 'On'
                  : 'Off',
                pageIndex: (product === EulogiseProduct.BOOKLET
                  ? rightPageIndex
                  : pageCursor)!,
                isPageOverlayed: (product === EulogiseProduct.BOOKLET
                  ? isRightPageOverlayed
                  : isPageCursorPageOverlayed)!,
                width: OVERLAY_BUTTON_SIZE,
              })
            )}
            <StyledDropdownItemButton
              icon={<AccountSettingIcon />}
              $width={OVERLAY_BUTTON_SIZE}
              buttonType={ButtonType.WHITE}
              onClick={onOverlayOptionClick}
            >
              Options
            </StyledDropdownItemButton>
          </StyledDesignOptionDropdownButtonContainer>
        )}
      </StyledDesignOptionButtonGroupContainer>
    )
  }

  const renderAddElementDropdown = () => {
    return (
      <StyledDesignOptionButtonGroupContainer
        ref={addContentRef}
        onMouseEnter={onAddContentMouseEnter}
        onMouseLeave={onAddContentMouseLeave}
      >
        <StyledDropdownButton
          $isDropdownOpened={shouldAddElementDropdownOpened}
          buttonType={
            isAtDesignYourProgramGuideStep
              ? ButtonType.HIGHLIGHTED_BUTTON
              : ButtonType.WHITE
          }
          noMarginRight
          onClick={onAddContentMouseClick}
        >
          Add Content
          <StyledDropdownArrowDownIconContainer>
            {shouldAddElementDropdownOpened ? (
              <StyledDropdownArrowUpIcon />
            ) : (
              <StyledDropdownArrowDownIcon />
            )}
          </StyledDropdownArrowDownIconContainer>
        </StyledDropdownButton>
        {shouldAddElementDropdownOpened && (
          <StyledDesignOptionDropdownButtonContainer>
            {!isSinglePageEditingView && !isNotDesktop && (
              <StyledPageSwitcherContainer>
                <StyledPageSwitcherButton
                  buttonType={
                    isAddElementInTheLeftPage
                      ? ButtonType.PRIMARY
                      : ButtonType.WHITE
                  }
                  noMarginRight
                  onClick={() => setIsAddElementInTheLeftPage(true)}
                >
                  Left
                </StyledPageSwitcherButton>
                <StyledPageSwitcherButton
                  buttonType={
                    isAddElementInTheLeftPage
                      ? ButtonType.WHITE
                      : ButtonType.PRIMARY
                  }
                  noMarginLeft
                  onClick={() => setIsAddElementInTheLeftPage(false)}
                >
                  Right
                </StyledPageSwitcherButton>
              </StyledPageSwitcherContainer>
            )}
            {renderAddTextButton()}
            {renderAddImagesButton()}
            {renderUploadPhotosButton()}
            {renderAddDividerButton()}
            {renderAddIconButton()}
            {/* TECHDEBT: given shouldShowInserrtBrand is an array of types, this will always return true */}
            {shouldShowInsertBrandButton && renderInsertBrandButton()}
            {shouldShowTributeQRCodeButton && renderTributeQRCodeButton()}
          </StyledDesignOptionDropdownButtonContainer>
        )}
      </StyledDesignOptionButtonGroupContainer>
    )
  }

  const renderAddTextButton = () => {
    return (
      <StyledDropdownItemButton
        // tooltip="Add text element"
        buttonType={ButtonType.WHITE}
        onClick={() => {
          onAddRowClick({
            product,
            slug,
            type: CardProductContentItemType.TEXT,
            productTheme: activeProductTheme,
            options: {
              region,
            },
            pageIndex: addElementPageIndex,
          })
          onAddContentReset()
        }}
        noMarginRight
        icon={<StyledFontSizeIcon />}
      >
        Text Box
      </StyledDropdownItemButton>
    )
  }

  const renderAddImagesButton = () => {
    return (
      <StyledDropdownItemButton
        // tooltip="Add photo(s)"
        buttonType={ButtonType.WHITE}
        onClick={() => {
          setFocusedRowId(undefined)
          onAddRowClick({
            product,
            type: CardProductContentItemType.FRAME,
            productTheme: activeProductTheme,
            options: {
              region,
            },
            pageIndex: addElementPageIndex,
          })
          onAddContentReset()
        }}
        noMarginRight
        icon={<StyledImageLayoutIcon style={{ display: 'block' }} />}
      >
        Photo(s)
      </StyledDropdownItemButton>
    )
  }

  const renderAddDividerButton = () => {
    return (
      <StyledDropdownItemButton
        // tooltip="add divider or spacer"
        buttonType={ButtonType.WHITE}
        onClick={() => {
          if (onAddDividerAssetClick) {
            onAddDividerAssetClick(addElementPageIndex)
          }
          onAddContentReset()
        }}
        noMarginRight
        icon={<StyledDividerAndSpaceIcon />}
      >
        Divider/Spacer
      </StyledDropdownItemButton>
    )
  }

  const renderAddIconButton = () => {
    return (
      <StyledDropdownItemButton
        // tooltip="add divider or spacer"
        buttonType={ButtonType.WHITE}
        onClick={() => {
          if (onAddIconAssetClick) {
            onAddIconAssetClick(addElementPageIndex)
          }
          onAddContentReset()
        }}
        noMarginRight
        icon={<StyledIconAssetIcon />}
      >
        Icon
      </StyledDropdownItemButton>
    )
  }

  const renderInsertBrandButton = () => {
    return (
      <StyledDropdownItemButton
        buttonType={ButtonType.WHITE}
        onClick={() => {
          dispatch(
            showModalAction(ModalId.INSERT_BRAND, {
              pageIndex: addElementPageIndex,
            }),
          )
          onAddContentReset()
        }}
        noMarginRight
        icon={<StyledInsertBrandIcon />}
      >
        Insert Brand
      </StyledDropdownItemButton>
    )
  }

  const renderTributeQRCodeButton = () => {
    return (
      <StyledDropdownItemButton
        buttonType={ButtonType.WHITE}
        onClick={() => {
          setIsShowQRCodeModal(true)
        }}
        noMarginRight
        icon={<StyledTributeQRCodeIcon />}
      >
        Tribute Video QR
      </StyledDropdownItemButton>
    )
  }

  const renderUploadPhotosButton = () => {
    return (
      <StyledDropdownItemButton
        // tooltip="upload image"
        buttonType={ButtonType.WHITE}
        onClick={() => {
          dispatch(
            updateIsFSOverlayPickerOpen({
              isFilestackOverlayPickerOpen: true,
              filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
            }),
          )
          onAddContentReset()
        }}
        noMarginRight
        icon={<StyledUploadImageIcon />}
      >
        Upload Photos
      </StyledDropdownItemButton>
    )
  }

  const renderAddOverlayButton = ({
    text,
    isPageOverlayed,
    pageIndex,
    width,
  }: {
    text: string
    isPageOverlayed: boolean
    pageIndex: number
    width?: string
  }) => {
    // need to specially apply to the last page of the bookmark since we have bookmark data there
    // are 4 pages, but we only needed 2. For bookmark and not the first page, get the last page index
    const updatedPageIndex =
      product === EulogiseProduct.BOOKMARK && pageCursor > 0
        ? totalPages - 1 // last page
        : pageIndex
    return (
      <StyledDropdownItemButton
        $width={width!}
        $shouldShowCardEditorDropdown={shouldShowCardEditorDropdown}
        buttonType={
          isPageOverlayed || isAtDesignYourProgramGuideStep
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        onClick={() => {
          dispatch(
            toggleCardProductOverlay({
              product,
              slug,
              pageIndex: updatedPageIndex,
            }),
          )
          /*
          dispatch(
            updatePageBackgroundOverlay({
              product,
              cardProduct,
              updatedPageIndex,
              cardProductOverlayOptions,
            }),
          )
*/
          onOverlayDropdownReset()
        }}
        noMarginRight
        icon={isPageOverlayed ? <RemoveOverlayIcon /> : <AddOverlayIcon />}
      >
        {text}
      </StyledDropdownItemButton>
    )
  }

  if (
    !isAtCardProductEditor ||
    displayMode !== CardProductViewDisplayMode.EDIT
  ) {
    return null
  }

  return (
    <AlertContainer>
      <StyledAlert
        width={editorWidth ? `${editorWidth}px` : undefined}
        flex
        justifyContent="space-between"
        padding={'16px 16px 16px 8px'}
      >
        <StyledAlertFull>
          <AlertLeft>
            {isAllowAddPages && (
              <>
                <GuidePopover
                  placedPage={GUIDE_SHOW_UP_PAGE.BOOKLET}
                  showUpStepIndex={3}
                  width={430}
                />
                {isPhotobook && (
                  <DesktopTextButton
                    noMarginRight
                    buttonType={ButtonType.WHITE}
                    icon={<StyledAccountSettingIcon />}
                    onClick={() => {
                      dispatch(openDrawerAction(DrawerId.PHOTOBOOK_DRAWER))
                    }}
                  >
                    Settings
                  </DesktopTextButton>
                )}
                <DesktopTextButton
                  // $isNotDesktop={false}
                  // tooltip={
                  //   totalPages >= MAX_PAGES ? "" : "Add additional pages to the booklet"
                  // }
                  noMarginRight
                  onClick={() => {
                    dispatch(
                      addCardProductPages({
                        product,
                        slug,
                        cardProductTheme: activeProductTheme,
                        region,
                        onSuccess: () => {
                          const totalPageCursors =
                            CardProductHelper.getTotalPageCursors({
                              product,
                              foldType: genericProductMetadata?.foldType,
                              totalPages,
                            })
                          setPageCursor(totalPageCursors! - 1)
                        },
                      }),
                    )
                  }}
                  icon={
                    <StyledRemovePageIcon
                      src={`${
                        EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN
                      }/icons/add-page-icon${
                        isAtDesignYourProgramGuideStep ? `-white` : ``
                      }.svg`}
                      $isButtonDisabled={totalPages >= maxPages}
                    />
                  }
                  disabled={totalPages >= maxPages}
                  buttonType={
                    isAtDesignYourProgramGuideStep
                      ? ButtonType.HIGHLIGHTED_BUTTON
                      : ButtonType.WHITE
                  }
                >
                  Pages
                </DesktopTextButton>
                <DesktopTextButton
                  // $isNotDesktop={false}
                  // tooltip={
                  //   totalPages <= MIN_PAGES ? "" : "Remove additional pages to the booklet"
                  // }
                  buttonType={
                    isAtDesignYourProgramGuideStep
                      ? ButtonType.HIGHLIGHTED_BUTTON
                      : ButtonType.WHITE
                  }
                  noMarginRight
                  onClick={() => setIsShowRemoveCardProductPagesModal(true)}
                  disabled={totalPages <= minPages}
                  icon={
                    <StyledAddPageIcon
                      src={`${
                        EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN
                      }/icons/remove-page-icon${
                        isAtDesignYourProgramGuideStep ? `-white` : ``
                      }.svg`}
                      $isButtonDisabled={totalPages <= minPages}
                    />
                  }
                >
                  Pages
                </DesktopTextButton>
              </>
            )}
            {shouldShowCardEditorDropdown && !isPhotobook && (
              <StyledDesignOptionButtonGroupContainer
                ref={designOptionsRef}
                onMouseEnter={onDesignOptionsMouseEnter}
                onMouseLeave={onDesignOptionsMouseLeave}
              >
                <StyledDesignOptionButton
                  buttonType={
                    isAtDesignYourProgramGuideStep
                      ? ButtonType.HIGHLIGHTED_BUTTON
                      : ButtonType.WHITE
                  }
                  noMarginRight
                  onClick={onDesignOptionsMouseClick}
                >
                  Design Options
                  <StyledDropdownArrowDownIconContainer>
                    {shouldDesignOptionsDropdownOpened ? (
                      <StyledDropdownArrowUpIcon />
                    ) : (
                      <StyledDropdownArrowDownIcon />
                    )}
                  </StyledDropdownArrowDownIconContainer>
                </StyledDesignOptionButton>
                {shouldDesignOptionsDropdownOpened && (
                  <StyledDesignOptionDropdownButtonContainer>
                    {renderBackgroundButton()}
                    {renderBorderButton()}
                    {isNotDesktop || product === EulogiseProduct.BOOKLET ? (
                      renderAddOverlayButton({
                        text: 'Overlay',
                        pageIndex: pageCursor,
                        isPageOverlayed: !!isPageCursorPageOverlayed,
                        width: '180px',
                      })
                    ) : (
                      <>
                        {renderAddOverlayButton({
                          text: 'Left Overlay',
                          pageIndex: leftPageIndex!,
                          isPageOverlayed: isLeftPageOverlayed!,
                        })}
                        {renderAddOverlayButton({
                          text: 'Right Overlay',
                          pageIndex: rightPageIndex!,
                          isPageOverlayed: isRightPageOverlayed!,
                        })}
                      </>
                    )}
                  </StyledDesignOptionDropdownButtonContainer>
                )}
              </StyledDesignOptionButtonGroupContainer>
            )}

            {!shouldShowCardEditorDropdown && !isPhotobook && (
              <>
                {renderBackgroundButton()}
                {renderOverlayDropdown()}
                {renderBorderButton()}
              </>
            )}

            {(!isPhotobook ||
              (isPhotobook &&
                selectedRow?.type === CardProductContentItemType.TEXT)) &&
              renderHymnsPrayersButton()}

            {!isPhotobook && renderAddElementDropdown()}
          </AlertLeft>
          <StyledAlertRight>
            {hasMultipleDimensions && (
              <StyledSizeSelect
                value={selectedDimension?.name}
                onChange={(value: string) => {
                  const dimension = availableDimensions.find(
                    (d: IGenericCardProductTypeDimension) => d.name === value,
                  )
                  if (dimension) {
                    dispatch(
                      updateSelectedDimension({
                        product,
                        slug,
                        selectedDimension: dimension,
                      }),
                    )
                  }
                }}
                placeholder="Select size"
              >
                {availableDimensions.map(
                  (dimension: IGenericCardProductTypeDimension) => (
                    <SelectOption key={dimension.name} value={dimension.name}>
                      {dimension.name} ({dimension.width}x{dimension.height}mm)
                    </SelectOption>
                  ),
                )}
              </StyledSizeSelect>
            )}
            {product === EulogiseProduct.PHOTOBOOK && (
              <DesktopTextButton
                buttonType={ButtonType.WHITE}
                buttonSize={ButtonSize.SM}
                disabled={false}
                onClick={() =>
                  onViewTypeChange(
                    viewType === ICardProductViewType.EDITOR_VIEW
                      ? ICardProductViewType.SPREAD_VIEW
                      : ICardProductViewType.EDITOR_VIEW,
                  )
                }
                icon={
                  viewType === ICardProductViewType.EDITOR_VIEW ? (
                    <StyledSpreadViewIcon />
                  ) : (
                    <StyledEditorViewIcon />
                  )
                }
              >
                {viewType === ICardProductViewType.EDITOR_VIEW
                  ? `Layout View`
                  : `Page View`}
              </DesktopTextButton>
            )}
            <StyledMagnifierDropdownContainer
              ref={magnifierRef}
              onMouseEnter={onMagnifierMouseEnter}
              onMouseLeave={onMagnifierMouseLeave}
            >
              <StyledMagnifierButton
                id="magnifier-button"
                buttonType={ButtonType.WHITE}
                disabled={false}
                noMarginRight
                onClick={() => onMagnifierMouseClick()}
                icon={<StyledMagnifierPlusIcon />}
              />
              {shouldMagnifierDropdownOpened && (
                <StyledMagnifierDropdownButtonContainer>
                  <StyledBookletMagnifierSlider
                    onChange={onBookletMagnifierSliderChange}
                    value={bookletMagnifierSliderValue}
                  />
                </StyledMagnifierDropdownButtonContainer>
              )}
            </StyledMagnifierDropdownContainer>
          </StyledAlertRight>
        </StyledAlertFull>
      </StyledAlert>
      {isShowQRCodeModal && caseId && (
        <QRCodeModal
          title={`QR Code to the ${productShortName}`}
          qrcodeTitle={`Directly link to the ${productShortName}`}
          content={SlideshowHelper.getEmbeddedSlideshowUrl({ caseId })}
          onCloseClick={() => {
            setIsShowQRCodeModal(false)
          }}
        />
      )}
    </AlertContainer>
  )
}

export default CardProductEditorHeader
