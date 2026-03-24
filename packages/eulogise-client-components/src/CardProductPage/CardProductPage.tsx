import React, { memo, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DummyDraggable,
  DummyDroppable,
} from '../Draggable'
import { AddIcon, CloseCircleIcon, WarnIcon } from '../icons'
import { Button, ButtonType } from '../Button'
import styled from 'styled-components'
import { Popover } from '../Popover'
import { ContentRow, IContentRowProps } from '../ContentRow'
import {
  ActionBar,
  IChangeImageEvent,
  IFrameChangeEvent,
  IRowDataChangeEvent,
  PageActions,
} from '../ContentItem'
import { CardProductPageAddActionContainer } from './CardProductPage.style'
import { CardProductHelper, PhotobookHelper } from '@eulogise/helpers'
import {
  AlignmentType,
  BleedPageMode,
  CardProductContentItemType,
  CardProductDrawerLayoutType,
  CardProductDynamicDataKey,
  CardProductPageColMode,
  CardProductViewDisplayMode,
  DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT,
  EulogiseImageSize,
  EulogiseProduct,
  GUIDE_SHOW_UP_PAGE,
  ICardProductData,
  ICardProductDividerName,
  ICardProductDynamicDataFieldEvent,
  ICardProductFrameContentItem,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameRow,
  ICardProductFrameRowData,
  ICardProductIconName,
  ICardProductPage,
  ICardProductPageStyle,
  ICardProductRow,
  ICardProductRowData,
  ICardProductTheme,
  IContentItemOnChangeEvent,
  IGenericCardProductContent,
  PageActionPosition,
} from '@eulogise/core'
import { CardProductOverlayAndBorder } from '../CardProductBorder/CardProductOverlayAndBorder'
import { PageBleed } from './PageBleed'
import { ActionBarImageLayoutButton } from '../ContentItem/ActionBar/ActionBarButtons'
import { STYLE } from '@eulogise/client-core'

export interface ICardProductPageProps {
  className?: string
  isCoverPage?: boolean
  isPrintCoverPage?: boolean
  isEnablePhotobookEdit?: boolean
  product: EulogiseProduct
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  actionsPosition?: PageActionPosition
  pageIndex: number
  displayMode?: CardProductViewDisplayMode
  onToggleImageBorderClick?: (ev: IChangeImageEvent) => void
  onToggleFadeImageClick?: (ev: IChangeImageEvent) => void
  onTransparencyChange?: (ev: IChangeImageEvent & { opacity: number }) => void
  onChangeImageClick?: (ev: IChangeImageEvent) => void
  onEditImageClick?: (ev: IChangeImageEvent) => void
  onBgRemoverClick?: (ev: IChangeImageEvent) => void
  onEnhanceImageClick?: (ev: IChangeImageEvent) => void
  onChangeLayoutClick?: (ev: IFrameChangeEvent) => void
  onChangeFrameBackgroundClick?: (ev: IFrameChangeEvent) => void
  onToggleTextClick?: (ev: IFrameChangeEvent) => void
  onRowDataChange?: (ev: IRowDataChangeEvent) => void
  onAddIconAssetClick?: (pageIndex: number) => void
  onAddDividerAssetClick?: (pageIndex: number) => void
  onFocus?: (props: { rowId?: string; pageIndex: number }) => void
  focusedRowId?: string
  onItemFocus?: (ev: {
    type: CardProductContentItemType
    layoutId: string
    layoutType: string
  }) => void
  maxPhotoSize?: EulogiseImageSize
  onAddAndCancelNewElementClick?: () => void
  onCancel?: ({
    product,
    cardProduct,
    pageIndex,
  }: {
    product: EulogiseProduct
    cardProduct: ICardProductData
    pageIndex: number
  }) => void

  onUpdate?: ({
    product,
    cardProduct,
    pageIndex,
    rowId,
    data,
    event,
  }: {
    product: EulogiseProduct
    cardProduct: ICardProductData
    pageIndex: number
    rowId: string
    data: ICardProductRowData
    event?: IContentItemOnChangeEvent
  }) => void

  onDelete?: ({
    product,
    id,
    pageIndex,
    cardProduct,
  }: {
    product: EulogiseProduct
    id: string
    pageIndex: number
    cardProduct: ICardProductData
  }) => void

  onAddRowClick?: ({
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

  onDuplicate?: ({
    product,
    id,
    pageIndex,
    cardProduct,
  }: {
    product: EulogiseProduct
    id: string
    pageIndex: number
    cardProduct: ICardProductData
  }) => void

  onOpenCopyLibraryDrawer?: () => void

  hasSkippedOrFilledMemorialDataPullForm?: boolean
  bleed?: boolean
  bleedPageMode?: BleedPageMode
  isRowAddActionButtonHighlighted?: boolean
  colMode: CardProductPageColMode
  onFrameContentItemClick?: ({
    frameContentItem,
    pageIndex,
    rowId,
  }: {
    frameContentItem: ICardProductFrameContentItem
    pageIndex: number
    rowId: string
  }) => void
  onFrameContentItemChange?: (
    event: ICardProductFrameImageChangeEvent,
    {
      contentItem,
      pageIndex,
      rowId,
    }: {
      contentItem: ICardProductFrameContentItem
      pageIndex: number
      rowId: string
    },
  ) => void
  selectedFrameContentItemId?: string
  editorScaledFactor: number
  containerRef: number
  onAssignDynamicData?: (event: ICardProductDynamicDataFieldEvent) => void
  guideShowAt?: GUIDE_SHOW_UP_PAGE
  currentStep?: number
  onChangeIconClick?: (params: {
    pageIndex: number
    rowId: string
    color: string
    iconName: ICardProductIconName
  }) => void
  onChangeDividerClick?: (params: {
    pageIndex: number
    rowId: string
    color: string
    dividerName: ICardProductDividerName
  }) => void
  isNoReordering?: boolean
  isDisabledDnd?: boolean
}

interface IStyledContainerProps {
  $isPageFull: boolean
  $width: number
  $height: number
  $isBleed: boolean
  $photobookPrintCoverScaleFactor?: number
}

const StyledContainer = styled.div<IStyledContainerProps>`
  position: relative;
  display: flex;
  transition: all 300ms;
  flex-direction: column;
  align-items: stretch;
  background-color: #fff;

  ${({
    $isPageFull = false,
    $width,
    $height,
    $isBleed,
    $photobookPrintCoverScaleFactor,
  }) => `
    && {
      ${$isPageFull ? `box-shadow : 0 0 5px 2px rgba(255, 0, 0, 0.5);` : ''}
    }
    ${
      $isBleed
        ? ``
        : `
      && {
        width: ${$width}px;
        height: ${$height}px;
      }
    `
    }
    ${
      $photobookPrintCoverScaleFactor !== undefined
        ? `
        .card-product-frame-rows:first-of-type {
          transform: scale(${$photobookPrintCoverScaleFactor});
          transform-origin: top;
        }
    `
        : ''
    }
  `}
`

// @ts-ignore
const StyledFullWarningPopOver = styled(Popover)`
  color: red;
  position: absolute;
  top: 2px;
  left: 2px;

  svg {
    font-size: 18px;
  }
`

const PopoverTitle = styled.div`
  font-weight: bold;
`

const PopoverContent = styled.div`
  max-width: 420px;
`

const StyledPage = styled.div<{
  $bleedPageMode?: BleedPageMode
  $width: number
  $height: number
}>`
  display: flex;
  flex-direction: column;
  ${({ $bleedPageMode, $width, $height }) =>
    $bleedPageMode !== undefined
      ? ''
      : `
    background-color: white;
    && {
      width: ${$width}px;
      height: ${$height}px;
    }
  `}
  background-position: center;
  background-repeat: no-repeat;
  transition: background 100ms;

  &.isDraggingOver {
    background-color: whitesmoke;
  }
`

// @ts-ignore
const StyledContentRow = styled(ContentRow)<IContentRowProps>`
  .dragging {
    background-color: white;
  }
`
// @ts-ignore
const StyledRowAddActionButton = styled(Button)`
  padding: 0px 5px 0px;
  height: 100%;
  left: -1px;
`
// @ts-ignore
const StyledAddIcon = styled(AddIcon)``

// @ts-ignore
const StyledCloseCircleIcon = styled(CloseCircleIcon)``

const StyledActionBar = styled(ActionBar)<{
  $editorScaledFactor: number
}>`
  top: calc(${STYLE.GUTTER} / 2);
  right: calc(${STYLE.GUTTER} / 2);
  z-index: 10;
  ${({ $editorScaledFactor }) =>
    $editorScaledFactor
      ? `
    transform: scale(${$editorScaledFactor});
    transform-origin: top right;
  `
      : ''}
`

/*
const DragHandle = SortableHandle(() => (
  <span style={{ cursor: 'grab' }}>☰</span>
))
*/

const PureCardProductPage = ({
  className,
  isCoverPage,
  product,
  cardProduct,
  bleed,
  bleedPageMode,
  productTheme,
  pageIndex,
  actionsPosition = PageActionPosition.RIGHT,
  displayMode = CardProductViewDisplayMode.EDIT,
  onChangeImageClick,
  onChangeLayoutClick,
  onChangeFrameBackgroundClick,
  onEditImageClick,
  onBgRemoverClick,
  onEnhanceImageClick,
  onToggleImageBorderClick,
  onToggleFadeImageClick,
  onTransparencyChange,
  focusedRowId,
  onFocus,
  onItemFocus,
  onAddAndCancelNewElementClick,
  onCancel,
  onUpdate,
  onDelete,
  onAddRowClick,
  onAddDividerAssetClick,
  onAddIconAssetClick,
  hasSkippedOrFilledMemorialDataPullForm,
  onDuplicate,
  onChangeIconClick,
  onChangeDividerClick,
  isRowAddActionButtonHighlighted = false,
  colMode,
  onOpenCopyLibraryDrawer,
  onFrameContentItemClick,
  onFrameContentItemChange,
  selectedFrameContentItemId,
  editorScaledFactor,
  containerRef,
  onRowDataChange,
  onAssignDynamicData,
  guideShowAt,
  currentStep,
  isNoReordering = false,
  onToggleTextClick,
  isDisabledDnd = false,
  isEnablePhotobookEdit = false,
  maxPhotoSize,
  isPrintCoverPage = false,
}: ICardProductPageProps) => {
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    setShouldRender(false)
    setTimeout(() => setShouldRender(true), 1)
  }, [cardProduct.content.theme, hasSkippedOrFilledMemorialDataPullForm])

  const [showPageAddActionsBar, setShowPageAddActionsBar] =
    useState<boolean>(false)
  const [isDragDisabled, setIsDragDisabled] = useState<boolean>(false)

  const cardProductContent = cardProduct?.content
  const pages: Array<ICardProductPage> = CardProductHelper.getPages({
    product,
    productTheme,
    cardProduct,
    bleed,
  })

  const pageSize = cardProductContent?.pageSize
  const genericProductMetadata = (
    cardProductContent as IGenericCardProductContent
  )?.metadata
  const orderedPages: Array<ICardProductPage> =
    isNoReordering || isPrintCoverPage
      ? pages
      : CardProductHelper.getPagesOrder({
          product,
          displayMode,
          foldType: genericProductMetadata?.foldType,
          pages,
        })

  const page: ICardProductPage = orderedPages[pageIndex]
  const hasOverlay = CardProductHelper.hasPageOverlay(page)
  const pageLayoutId = page?.layoutId
  const pageRows: Array<ICardProductRow> = page.rows
  const isPageFull: boolean =
    displayMode === CardProductViewDisplayMode.PRINT
      ? false
      : CardProductHelper.isPageFull({ cardProduct, rows: pageRows, product })
  const contentHeight = pageRows.reduce(
    (total: number, row: ICardProductRow) =>
      total + CardProductHelper.getRowHeight(row),
    0,
  )

  const width = Math.round(page?.pageWidth!)

  const [focusColumnIndex, setFocusColumnIndex] = useState<number>()
  const pageAddContainerHeight =
    (page?.contentBoundaries?.height! - contentHeight) * editorScaledFactor

  const showIsPageFullWarningProducts = [
    EulogiseProduct.BOOKLET,
    EulogiseProduct.BOOKMARK,
    EulogiseProduct.SIDED_CARD,
    EulogiseProduct.THANK_YOU_CARD,
  ]
  const shouldShowPageFull =
    isPageFull && showIsPageFullWarningProducts.includes(product)

  if (!shouldRender) {
    return null
  }

  const { border } = page

  const boundaryHeight = page?.contentBoundaries?.height
  const pageOrientation = cardProduct.content.pageOrientation

  const { pageWidth, pageHeight } = CardProductHelper.getPageWidthAndHeight({
    genericProductMetadata,
    pageSize,
    pageOrientation,
  })

  const cardProductPageHeight = pageHeight * editorScaledFactor
  const cardProductPageWidth = pageWidth * editorScaledFactor

  const getScaledPageStyle = ({
    pageStyle,
    editorScaledFactor,
    hasExistingBleedBackground,
    isPrintCoverPage = false,
    printCoverScale,
  }: {
    pageStyle: ICardProductPageStyle | undefined
    editorScaledFactor: number
    hasExistingBleedBackground: boolean
    isPrintCoverPage: boolean
    printCoverScale: number | undefined
  }) => {
    if (!pageStyle) {
      return {}
    }
    const { backgroundImage, ...restStyle } = pageStyle

    const cachedBustedBackgroundImage =
      backgroundImage &&
      displayMode !== CardProductViewDisplayMode.GENERATE_VIDEO
        ? CardProductHelper.addCacheBusterToCssBackground(backgroundImage)
        : undefined
    // for sided card bleed - remove the
    const removedUrlBackgroundImage =
      cachedBustedBackgroundImage?.split(',').length === 1
        ? // if the only background is the backgroundImage, remove it
          cachedBustedBackgroundImage?.replace(/url\((['"])?(.*?)\1\)/gi, '')
        : // if more than one background images, don't remoev the first one
          cachedBustedBackgroundImage?.replace(/,\surl\((['"])?(.*?)\1\)/gi, '')

    const newPageStyle = isPrintCoverPage
      ? // if it is print cover page, we don't display background image and padding
        {
          width: restStyle.width,
          height: restStyle.height,
          justifyContent: 'center',
          transform: `scale(${printCoverScale})`,
        }
      : bleed && hasExistingBleedBackground
      ? { ...restStyle, backgroundImage: removedUrlBackgroundImage }
      : { ...restStyle, backgroundImage: cachedBustedBackgroundImage }

    // Apply backgroundSize: cover for cover pages and generic card products
    // to ensure background image covers the entire product while maintaining aspect ratio
    const shouldUseBackgroundCover =
      isCoverPage || product === EulogiseProduct.GENERIC_CARD_PRODUCT

    if (editorScaledFactor === 1) {
      return {
        ...newPageStyle,
        ...(shouldUseBackgroundCover ? { backgroundSize: 'cover' } : {}),
      }
    }
    return {
      ...newPageStyle,
      ...(shouldUseBackgroundCover ? { backgroundSize: 'cover' } : {}),
      height: pageStyle?.height * editorScaledFactor,
      width: pageStyle?.width * editorScaledFactor,
      paddingBottom: pageStyle?.paddingBottom * editorScaledFactor,
      paddingTop: pageStyle?.paddingTop * editorScaledFactor,
    }
  }

  const changeLayoutClick = ({
    layoutId,
    layoutType,
    rowId,
  }: {
    layoutId?: string
    layoutType: CardProductDrawerLayoutType
    rowId?: string
  }) => {
    if (onChangeLayoutClick) {
      onChangeLayoutClick({
        layoutType,
        pageIndex,
        rowId,
        layoutId,
      })
    }
  }

  const pageBackground = page.background
  const pageOverlay = cardProduct.content.pageOverlay
  const overlayColor = pageOverlay?.overlayColor ?? pageBackground?.overlayColor
  const overlayOpacity =
    pageOverlay?.overlayOpacity ?? pageBackground?.overlayOpacity
  /* DO NOT USE - pageBackground overlayMargin for now given that it is not part of MVP
  const pageOverlayMargin = pageOverlay?.overlayMargin
  const pageBackgroundMargin = pageBackground?.overlayMargin
  const overlayMargin = {
    marginX: pageOverlayMargin?.[0] ?? pageBackgroundMargin?.[0],
    marginY: pageOverlayMargin?.[1] ?? pageBackgroundMargin?.[1],
  }
*/
  const DroppableElement = isDisabledDnd ? DummyDroppable : Droppable
  const DraggableElement = isDisabledDnd ? DummyDraggable : Draggable
  const isPhotobookTitlePageLayout = PhotobookHelper.isPhotobookTitlePageLayout(
    {
      page,
    },
  )
  const region = CardProductHelper.getRegionByPageSize(
    cardProduct.content.pageSize,
  )
  const pageMargins =
    CardProductHelper.getDefaultPageMargins({
      product,
      region,
      genericProductMetadata,
    }) ?? cardProductContent?.pageMargins
  let printCoverScale: number | undefined
  if (isPrintCoverPage) {
    const firstPage = cardProduct.content.pages[0]
    const firstFrameRowInPage =
      CardProductHelper.getFirstFrameRowInPage(firstPage)
    const firstFrameWidth = firstFrameRowInPage
      ? firstFrameRowInPage.data.width
      : undefined
    printCoverScale =
      CardProductHelper.hasOnlyOneFrameRowInPage(firstPage) &&
      firstFrameWidth !== undefined &&
      firstFrameWidth > 0
        ? cardProductPageWidth / firstFrameWidth
        : 1
  }
  return (
    /* WARNING: don't make this any dom element, otherwise, the border will break */
    <>
      {(hasOverlay || border) &&
        colMode === CardProductPageColMode.TWO_COLS &&
        pageIndex % 2 === 0 && (
          <CardProductOverlayAndBorder
            hasBorder={!!border}
            hasOverlay={hasOverlay}
            product={product}
            overlayColor={overlayColor}
            overlayOpacity={overlayOpacity}
            overlayBorderRadius={pageOverlay?.borderRadius}
            overlayFadePosition={pageOverlay?.overlayFadePosition}
            overlayEndPosition={pageOverlay?.overlayEndPosition}
            region={region}
            bleedPageMode={bleed ? bleedPageMode : undefined}
            editorScaledFactor={editorScaledFactor}
            genericProductMetadata={genericProductMetadata}
            {...border}
          />
        )}
      <StyledContainer
        className={`${className} card-product-page-container`}
        $isBleed={!!bleed}
        $width={cardProductPageWidth}
        $height={cardProductPageHeight}
        $isPageFull={shouldShowPageFull}
        $photobookPrintCoverScaleFactor={printCoverScale}
      >
        {(hasOverlay || border) &&
          colMode === CardProductPageColMode.ONE_COL && (
            <CardProductOverlayAndBorder
              hasBorder={!!border}
              hasOverlay={hasOverlay}
              overlayColor={overlayColor}
              overlayOpacity={overlayOpacity}
              overlayBorderRadius={pageOverlay?.borderRadius}
              overlayFadePosition={pageOverlay?.overlayFadePosition}
              overlayEndPosition={pageOverlay?.overlayEndPosition}
              bleedPageMode={bleed ? bleedPageMode : undefined}
              editorScaledFactor={editorScaledFactor}
              product={product}
              region={region}
              genericProductMetadata={genericProductMetadata}
              {...border}
            />
          )}
        {shouldShowPageFull && (
          <StyledFullWarningPopOver
            title={
              <PopoverTitle>
                Oops. Your design is currently outside the safe print margins.
              </PopoverTitle>
            }
            content={
              <PopoverContent>
                <p>
                  This can cause issues when printing, we suggest you either
                  reduce the size of the elements on the page or remove an
                  element before printing.
                </p>
              </PopoverContent>
            }
          >
            <WarnIcon />
          </StyledFullWarningPopOver>
        )}

        <DroppableElement
          className="droppable-element-id"
          droppableId={`page${pageIndex}`}
        >
          {(provided: any) => {
            const pageBackgroundPosition =
              CardProductHelper.getPageBackgroundPosition(
                page.pageStyle?.backgroundImage!,
                bleedPageMode!,
              )
            const scaledPageStyle = getScaledPageStyle({
              isPrintCoverPage,
              // @ts-ignore
              pageStyle: {
                ...page.pageStyle,
                backgroundPosition: pageBackgroundPosition,
              },
              editorScaledFactor,
              hasExistingBleedBackground: !!page.bleedPageBackground,
              printCoverScale,
            })

            return (
              <PageBleed
                id="page-bleed"
                $bleedPageMode={bleed ? bleedPageMode : undefined}
                $backgroundSize={
                  product === EulogiseProduct.GENERIC_CARD_PRODUCT
                    ? 'cover'
                    : 'contain'
                }
                $backgroundPosition={
                  product === EulogiseProduct.GENERIC_CARD_PRODUCT
                    ? 'center center'
                    : 'unset'
                }
                $backgroundImage={
                  /* This line is for testing purpose only
                    isPrintCoverPage
                    ? page.background?.image?.url
                    : */ page.bleedPageBackground
                }
                $width={cardProductPageWidth}
                $height={cardProductPageHeight}
              >
                {isPhotobookTitlePageLayout && !!focusedRowId && (
                  <StyledActionBar
                    $editorScaledFactor={editorScaledFactor}
                    actions={[
                      ActionBarImageLayoutButton({
                        onClick: () => {
                          changeLayoutClick({
                            layoutType: CardProductDrawerLayoutType.TITLE_PAGE,
                            layoutId: pageLayoutId,
                          })
                        },
                        text: 'Change Layout',
                      }),
                    ]}
                    actionsPosition={actionsPosition}
                  />
                )}
                <StyledPage
                  id="styled-page"
                  $bleedPageMode={bleedPageMode}
                  $width={cardProductPageWidth}
                  $height={cardProductPageHeight}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={scaledPageStyle}
                >
                  {pageRows.map((row: ICardProductRow, index: number) => {
                    const isDragContainerHighlighted: boolean =
                      row?.dynamicDataId ===
                        CardProductDynamicDataKey.primaryImage &&
                      product === EulogiseProduct.BOOKLET &&
                      guideShowAt === GUIDE_SHOW_UP_PAGE.BOOKLET &&
                      currentStep === 2
                    const isPhotobookTextRow =
                      product === EulogiseProduct.PHOTOBOOK &&
                      row.type === CardProductContentItemType.TEXT

                    return (
                      <DraggableElement
                        key={row.id}
                        draggableId={row.id}
                        index={index}
                        isDragDisabled={
                          isDragDisabled ||
                          displayMode !== CardProductViewDisplayMode.EDIT ||
                          (product === EulogiseProduct.PHOTOBOOK &&
                            !isEnablePhotobookEdit)
                        }
                        disableInteractiveElementBlocking={
                          row.id === focusedRowId
                        }
                      >
                        {(provided: any, snapshot: any) => (
                          <StyledContentRow
                            maxPhotoSize={maxPhotoSize}
                            isPhotobookTitlePageLayout={
                              isPhotobookTitlePageLayout
                            }
                            onDragDisabled={(disabled) => {
                              setIsDragDisabled(disabled)
                            }}
                            isEnablePhotobookEdit={isEnablePhotobookEdit}
                            isDragContainerHighlighted={
                              isDragContainerHighlighted
                            }
                            editorScaledFactor={editorScaledFactor}
                            key={row.id}
                            id={row.id!}
                            provided={provided}
                            snapshot={snapshot}
                            focusedRowId={focusedRowId}
                            isFocused={row.id === focusedRowId}
                            onFocus={(type: CardProductContentItemType) => {
                              if (onItemFocus) {
                                const layoutType =
                                  CardProductHelper.isGraphicFrameRow(
                                    row as ICardProductFrameRow,
                                  )
                                    ? CardProductDrawerLayoutType.GRAPHIC_FRAME
                                    : CardProductDrawerLayoutType.LAYOUT_FRAME
                                onItemFocus({
                                  type,
                                  layoutType,
                                  layoutId: (
                                    row.data as ICardProductFrameRowData
                                  ).content?.layoutId!,
                                })
                              }
                              if (onFocus) {
                                onFocus({ rowId: row.id, pageIndex })
                              }
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setShowPageAddActionsBar(false)
                              }, 500)
                            }}
                            onChangeLayoutClick={(layoutId: string) => {
                              console.log(
                                `[Bugsnag diagnostic data] - onChangeLayoutClick, layoutId: ${layoutId}, row ${JSON.stringify(
                                  row,
                                )}`,
                              )
                              changeLayoutClick({
                                layoutType: CardProductHelper.isGraphicFrameRow(
                                  row as ICardProductFrameRow,
                                )
                                  ? CardProductDrawerLayoutType.GRAPHIC_FRAME
                                  : CardProductDrawerLayoutType.LAYOUT_FRAME,
                                rowId: row.id!,
                                layoutId,
                                // rowContent: row,
                              })
                            }}
                            onToggleTextClick={() => {
                              onToggleTextClick &&
                                onToggleTextClick({
                                  pageIndex,
                                  rowId: row.id!,
                                  rowContent: row,
                                })
                            }}
                            isTextEnabled={!!row.childRowIds}
                            onChangeFrameBackgroundClick={() => {
                              if (onChangeFrameBackgroundClick) {
                                onChangeFrameBackgroundClick({
                                  pageIndex,
                                  rowId: row.id!,
                                  rowContent: row,
                                })
                              }
                            }}
                            onToggleImageBorderClick={(ev) => {
                              if (onToggleImageBorderClick) {
                                onToggleImageBorderClick(ev)
                              }
                            }}
                            onToggleFadeImageClick={(ev) => {
                              if (onToggleFadeImageClick) {
                                onToggleFadeImageClick(ev)
                              }
                            }}
                            onTransparencyChange={
                              onTransparencyChange
                                ? (ev) => onTransparencyChange(ev)
                                : undefined
                            }
                            onFullWidthClick={() => {
                              const pageWidth =
                                CardProductHelper.getPageWidthByCardProduct({
                                  cardProduct,
                                })
                              const frameRowData =
                                row.data as ICardProductFrameRowData

                              const isFullWidth = !frameRowData.isFullWidth
                              const newWidth = isFullWidth
                                ? pageWidth
                                : frameRowData.prevWidth ??
                                  Math.floor(page.contentBoundaries?.width!)

                              if (onRowDataChange) {
                                onRowDataChange({
                                  pageIndex,
                                  rowId: row.id!,
                                  rowData: {
                                    isFullWidth,
                                    alignment: isFullWidth
                                      ? AlignmentType.CENTER
                                      : frameRowData.prevAlignment,
                                    prevAlignment: frameRowData.alignment,
                                    prevWidth: frameRowData.width,
                                    width: newWidth,
                                    // @ts-ignore
                                    content: {
                                      width: newWidth,
                                    },
                                  },
                                })
                              }
                            }}
                            onChangeAlignment={(alignment: any) => {
                              if (onRowDataChange) {
                                onRowDataChange({
                                  pageIndex,
                                  rowId: row.id!,
                                  rowData: {
                                    alignment,
                                  },
                                })
                              }
                            }}
                            onChangeIconClick={(params: {
                              rowId: string
                              color: string
                              iconName: ICardProductIconName
                            }) => {
                              if (onChangeIconClick) {
                                onChangeIconClick({
                                  ...params,
                                  pageIndex,
                                })
                              }
                            }}
                            onChangeDividerClick={(params: {
                              rowId: string
                              color: string
                              dividerName: ICardProductDividerName
                            }) => {
                              if (onChangeDividerClick) {
                                onChangeDividerClick({
                                  ...params,
                                  pageIndex,
                                })
                              }
                            }}
                            onChangeImageClick={(ev) => {
                              if (onChangeImageClick) {
                                onChangeImageClick(ev)
                              }
                            }}
                            onEditImageClick={(ev) => {
                              if (onEditImageClick) {
                                onEditImageClick(ev)
                              }
                            }}
                            onBgRemoverClick={onBgRemoverClick}
                            onEnhanceImageClick={onEnhanceImageClick}
                            pageIndex={pageIndex}
                            index={index}
                            focusColumnIndex={focusColumnIndex!}
                            setFocusColumnIndex={setFocusColumnIndex}
                            product={product}
                            type={row.type as CardProductContentItemType}
                            width={width}
                            height={
                              isPhotobookTextRow
                                ? DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
                                : CardProductHelper.getRowHeight(row)
                            }
                            boundaries={{
                              width: Math.floor(page.contentBoundaries?.width!),
                              height: boundaryHeight!,
                            }}
                            // @ts-ignore
                            data={row.data}
                            dynamicDataId={row.dynamicDataId}
                            actionsPosition={actionsPosition}
                            onCancel={() => {
                              if (onCancel) {
                                onCancel({ product, cardProduct, pageIndex })
                              }
                            }}
                            pageMargins={pageMargins}
                            displayMode={
                              page.editable === false
                                ? CardProductViewDisplayMode.PREVIEW
                                : displayMode
                            }
                            productTheme={productTheme}
                            onFrameContentItemClick={(
                              frameContentItem: ICardProductFrameContentItem,
                            ) => {
                              if (onFrameContentItemClick) {
                                onFrameContentItemClick({
                                  frameContentItem: frameContentItem,
                                  pageIndex,
                                  rowId: row.id!,
                                })
                              }
                            }}
                            onFrameContentItemChange={(
                              event: ICardProductFrameImageChangeEvent,
                              contentItem: ICardProductFrameContentItem,
                            ) => {
                              if (onFrameContentItemChange) {
                                onFrameContentItemChange(event, {
                                  contentItem,
                                  pageIndex,
                                  rowId: row.id!,
                                })
                              }
                            }}
                            selectedFrameContentItemId={
                              selectedFrameContentItemId
                            }
                            onChange={(
                              data: ICardProductRowData,
                              id: string,
                              event: IContentItemOnChangeEvent,
                            ) => {
                              // do not trigger update if it is measure-resize to avoid onChange event getting fire on page load
                              if (event?.event === 'measure-resize') {
                                return
                              }
                              if (onUpdate) {
                                onUpdate({
                                  product,
                                  cardProduct,
                                  pageIndex,
                                  rowId: row.id!,
                                  data,
                                  event,
                                })
                              }
                            }}
                            onDelete={(id: string) => {
                              if (onDelete) {
                                onDelete({
                                  product,
                                  id,
                                  pageIndex,
                                  cardProduct,
                                })
                              }
                            }}
                            onDuplicate={(id: string) => {
                              if (onDuplicate) {
                                onDuplicate({
                                  product,
                                  id,
                                  pageIndex,
                                  cardProduct,
                                })
                              }
                            }}
                            containerRef={containerRef}
                            onAssignDynamicData={(ev: any) => {
                              if (onAssignDynamicData) {
                                onAssignDynamicData({ ...ev, pageIndex })
                              }
                            }}
                          />
                        )}
                      </DraggableElement>
                    )
                  })}
                  {provided.placeholder}

                  {displayMode === CardProductViewDisplayMode.EDIT &&
                    product !== EulogiseProduct.PHOTOBOOK && (
                      <CardProductPageAddActionContainer
                        actionsPosition={actionsPosition}
                        pageAddContainerHeight={pageAddContainerHeight}
                      >
                        {displayMode === CardProductViewDisplayMode.EDIT &&
                        page.editable !== false ? (
                          <StyledRowAddActionButton
                            buttonType={ButtonType.CORE_PURPLE_60}
                            tooltip={
                              showPageAddActionsBar
                                ? 'Cancel'
                                : 'Add new element'
                            }
                            noMarginLeft
                            noMarginRight
                            onClick={(e: any) => {
                              e.stopPropagation()
                              if (onAddAndCancelNewElementClick) {
                                onAddAndCancelNewElementClick()
                              }
                              setShowPageAddActionsBar(!showPageAddActionsBar)
                            }}
                          >
                            {showPageAddActionsBar ? (
                              <StyledCloseCircleIcon />
                            ) : (
                              <StyledAddIcon />
                            )}
                          </StyledRowAddActionButton>
                        ) : null}

                        {displayMode === CardProductViewDisplayMode.EDIT &&
                          showPageAddActionsBar && (
                            <PageActions
                              onOutsideClick={() =>
                                setShowPageAddActionsBar(false)
                              }
                              onSelect={(
                                type: CardProductContentItemType,
                                options: any,
                              ) => {
                                setShowPageAddActionsBar(false)
                                if (type === CardProductContentItemType.SPACE) {
                                  if (onAddDividerAssetClick) {
                                    onAddDividerAssetClick(pageIndex)
                                  }
                                  return
                                } else if (
                                  type === CardProductContentItemType.ICON
                                ) {
                                  if (onAddIconAssetClick) {
                                    onAddIconAssetClick(pageIndex)
                                  }
                                  return
                                }

                                if (onAddRowClick) {
                                  onAddRowClick({
                                    product,
                                    type,
                                    productTheme,
                                    options,
                                    pageIndex,
                                  })
                                }

                                if (
                                  type === CardProductContentItemType.COLUMNS
                                ) {
                                  const defaultColumnIndex = 0
                                  // set default selected to 0 index when adding a new columns
                                  setFocusColumnIndex(defaultColumnIndex)
                                }
                              }}
                              onOpenCopyLibraryDrawer={() => {
                                if (onOpenCopyLibraryDrawer) {
                                  onOpenCopyLibraryDrawer()
                                }
                              }}
                            />
                          )}
                      </CardProductPageAddActionContainer>
                    )}
                </StyledPage>
              </PageBleed>
            )
          }}
        </DroppableElement>
      </StyledContainer>
    </>
  )
}

export const CardProductPage = memo(PureCardProductPage)

export const CardProductPageWithDroppableContext = (
  props: ICardProductPageProps,
) => {
  return (
    <DragDropContext>
      <CardProductPage {...props} />
    </DragDropContext>
  )
}
