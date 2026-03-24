import React from 'react'
import styled from 'styled-components'
import {
  BleedPageMode,
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  GUIDE_SHOW_UP_PAGE,
  ICardProductFrameScaleProps,
  ICardProductPage,
  IGenericCardProductContent,
  PageActionPosition,
} from '@eulogise/core'
import { CardProductHelper, PhotobookHelper } from '@eulogise/helpers'
import { CardProductPage, ICardProductPageProps } from './CardProductPage'
import { DragDropContext } from '../Draggable'
import { BleedBoxLayout } from '../BleedBox/BleedBoxLayout'
import { COLOR, STYLE, useIsNotDesktop } from '@eulogise/client-core'
import { DummyCardProductPage } from './DummyCardProductPage'

const PAGE_CONTENT_BOTTOM_MARGIN = 60

export type IDoubleCardProductPageViewProps = Omit<
  ICardProductPageProps,
  'pageIndex' | 'actionsPosition'
> & {
  pageMode: CardProductPageMode
  pages: Array<ICardProductPage>
  pageCursor: number
  onDragEnd: (event: any) => void
  bleed?: boolean
  hasSkippedOrFilledMemorialDataPullForm: boolean
  isRowAddActionButtonHighlighted?: boolean
  onOpenCopyLibraryDrawer: () => void
  editorScaledFactor: number
  guideShowAt?: GUIDE_SHOW_UP_PAGE
  currentStep: number
  isShowDummyLeftPage?: boolean
  isShowDummyRightPage?: boolean
  className?: string
  onDoubleClick?: () => void
} & ICardProductFrameScaleProps

const StyledPageDivider = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 1px;
  background-color: whitesmoke;
  box-shadow: 0 1px 6px rgba(0, 21, 41, 0.25);
  @media print {
    && {
      display: none;
    }
  }
`

const StyledCardProduct = styled.div<{
  $displayMode: CardProductViewDisplayMode
  $isCoverPage: boolean
  $pageSizeWidth: number
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  ${({ $displayMode, $isCoverPage, $pageSizeWidth }) => `
    ${
      $displayMode !== CardProductViewDisplayMode.PRINT
        ? `box-shadow: ${STYLE.BOX_SHADOW_SIZE} ${COLOR.BOX_SHADOW_COLOR};`
        : ``
    }
    ${
      $displayMode !== CardProductViewDisplayMode.PRINT && $isCoverPage
        ? `margin-left: ${$pageSizeWidth / 2}px; margin-right: ${
            $pageSizeWidth / 2
          }px;`
        : ``
    }
  `}
`

const StyledDoubleCardProductPageView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
`

export const DoubleCardProductPageView = ({
  pageCursor,
  pageMode,
  colMode,
  onDragEnd,
  bleed = false,
  hasSkippedOrFilledMemorialDataPullForm,
  isRowAddActionButtonHighlighted,
  onOpenCopyLibraryDrawer,
  editorScaledFactor,
  containerRef,
  guideShowAt,
  currentStep,
  isShowDummyLeftPage = false,
  isShowDummyRightPage = false,
  className,
  onDoubleClick,
  ...cardProductPageProps
}: IDoubleCardProductPageViewProps) => {
  const totalPages = cardProductPageProps.pages.length
  const product = cardProductPageProps.product
  const isMobile = useIsNotDesktop()

  const cardProductContent = cardProductPageProps.cardProduct.content
  const cardProductPageSize = cardProductContent?.pageSize
  const cardProductPageOrientation = cardProductContent?.pageOrientation
  const genericProductMetadata = (
    cardProductContent as IGenericCardProductContent
  ).metadata

  const foldType = genericProductMetadata?.foldType
  const { leftPageIndex, rightPageIndex } =
    CardProductHelper.getPageIndexesByPageCursor({
      product: cardProductPageProps.product,
      pageCursorIndex: pageCursor,
      totalPages,
      foldType,
      pageMode,
      isMobile,
      displayMode: cardProductPageProps.displayMode,
    })

  const hasLeftPage = leftPageIndex !== undefined
  const hasRightPage = rightPageIndex !== undefined
  const contentPages = cardProductPageProps.pages
  const leftPageContentHeight =
    leftPageIndex !== undefined
      ? CardProductHelper.getContentHeight({
          rows: contentPages[leftPageIndex]?.rows,
          product,
        })
      : 0

  const rightPageContentHeight =
    rightPageIndex !== undefined
      ? CardProductHelper.getContentHeight({
          rows: contentPages[rightPageIndex]?.rows,
          product,
        })
      : 0
  const { pageHeight: pageSizeHeight, pageWidth: pageSizeWidth } =
    CardProductHelper.getPageWidthAndHeight({
      genericProductMetadata,
      pageSize: cardProductPageSize,
      pageOrientation: cardProductPageOrientation,
    })
  const actualContentHeight =
    Math.max(leftPageContentHeight, rightPageContentHeight) +
    PAGE_CONTENT_BOTTOM_MARGIN
  const contentHeight = Math.max(actualContentHeight, pageSizeHeight)
  const noOfPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    totalPages,
    pageMode,
    isMobile,
    foldType,
    displayMode: cardProductPageProps.displayMode,
  })
  const isCoverPage = PhotobookHelper.isPhotobookCoverPage({
    pageIndex: pageCursor,
    product,
    noOfPageCursors,
  })
  return (
    <BleedBoxLayout
      disabled={
        !bleed &&
        cardProductPageProps.displayMode !== CardProductViewDisplayMode.PRINT
      }
      bleed={bleed}
      contentHeight={contentHeight * editorScaledFactor}
      product={cardProductPageProps.product}
      pageMode={pageMode}
      className={className}
    >
      <StyledDoubleCardProductPageView
        onDoubleClick={onDoubleClick}
        className={`double-card-product-page-view`}
      >
        <StyledCardProduct
          $isCoverPage={isCoverPage}
          $pageSizeWidth={pageSizeWidth * editorScaledFactor}
          // @ts-ignore
          $displayMode={cardProductPageProps.displayMode}
          onMouseDown={(ev) => ev.stopPropagation()}
          className={`card-product-page`}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {hasLeftPage && (
              <CardProductPage
                {...cardProductPageProps}
                isCoverPage={isCoverPage}
                key={`left-page-${leftPageIndex}`}
                // @ts-ignore
                index={leftPageIndex}
                bleed={bleed}
                bleedPageMode={BleedPageMode.LEFT_SIDE_BLEED}
                actionsPosition={PageActionPosition.LEFT}
                pageIndex={leftPageIndex}
                colMode={colMode}
                hasSkippedOrFilledMemorialDataPullForm={
                  hasSkippedOrFilledMemorialDataPullForm
                }
                isRowAddActionButtonHighlighted={
                  isRowAddActionButtonHighlighted
                }
                onOpenCopyLibraryDrawer={onOpenCopyLibraryDrawer}
                editorScaledFactor={editorScaledFactor}
                containerRef={containerRef}
                currentStep={currentStep}
                guideShowAt={guideShowAt}
              />
            )}
            {((!hasLeftPage &&
              pageMode !== CardProductPageMode.SINGLE_PAGE &&
              cardProductPageProps.product === EulogiseProduct.PHOTOBOOK &&
              cardProductPageProps.displayMode ===
                CardProductViewDisplayMode.PRINT) ||
              isShowDummyLeftPage) && (
              <DummyCardProductPage
                cardProduct={cardProductPageProps.cardProduct}
                editorScaledFactor={editorScaledFactor}
                bleedPageMode={
                  isShowDummyLeftPage
                    ? BleedPageMode.NO_BLEED
                    : BleedPageMode.LEFT_SIDE_BLEED
                }
              />
            )}
            {hasRightPage && (
              <CardProductPage
                {...cardProductPageProps}
                key={`right-page-${rightPageIndex}`}
                // @ts-ignore
                index={rightPageIndex}
                isCoverPage={isCoverPage}
                bleed={bleed}
                bleedPageMode={
                  leftPageIndex === undefined
                    ? cardProductPageProps.product === EulogiseProduct.PHOTOBOOK
                      ? pageMode === CardProductPageMode.SINGLE_PAGE
                        ? BleedPageMode.FULL_BLEED // single page photobook
                        : BleedPageMode.RIGHT_SIDE_BLEED // spread page photobook
                      : BleedPageMode.FULL_BLEED // products other than photobook
                    : BleedPageMode.RIGHT_SIDE_BLEED
                }
                actionsPosition={PageActionPosition.RIGHT}
                pageIndex={rightPageIndex}
                colMode={colMode}
                hasSkippedOrFilledMemorialDataPullForm={
                  hasSkippedOrFilledMemorialDataPullForm
                }
                isRowAddActionButtonHighlighted={
                  isRowAddActionButtonHighlighted
                }
                onOpenCopyLibraryDrawer={onOpenCopyLibraryDrawer}
                editorScaledFactor={editorScaledFactor}
                containerRef={containerRef}
                currentStep={currentStep}
                guideShowAt={guideShowAt}
              />
            )}
            {((!hasRightPage &&
              cardProductPageProps.product === EulogiseProduct.PHOTOBOOK &&
              cardProductPageProps.displayMode ===
                CardProductViewDisplayMode.PRINT) ||
              isShowDummyRightPage) && (
              <DummyCardProductPage
                cardProduct={cardProductPageProps.cardProduct}
                editorScaledFactor={editorScaledFactor}
                bleedPageMode={
                  isShowDummyRightPage
                    ? BleedPageMode.NO_BLEED
                    : BleedPageMode.RIGHT_SIDE_BLEED
                }
              />
            )}

            {hasLeftPage &&
              hasRightPage &&
              pageMode !== CardProductPageMode.TWO_PAGES && (
                <StyledPageDivider />
              )}
          </DragDropContext>
        </StyledCardProduct>
      </StyledDoubleCardProductPageView>
    </BleedBoxLayout>
  )
}
