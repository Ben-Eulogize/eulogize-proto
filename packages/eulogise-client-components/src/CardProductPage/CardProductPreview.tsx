import React from 'react'
import {
  CardProductPageColMode,
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductPage,
  ICardProductTheme,
  ICardProductFrameScaleProps,
  GUIDE_SHOW_UP_PAGE,
  EulogiseImageSize,
  IGenericCardProductContent,
} from '@eulogise/core'
import styled from 'styled-components'

import { UtilHelper } from '@eulogise/helpers'
import { CardProductHelper } from '@eulogise/helpers'
import { DragDropContext } from '../Draggable'
import { DoubleCardProductPageView } from './DoubleCardProductPageView'
import { useIsNotDesktop } from '@eulogise/client-core'

const StyledContainer = styled.div<{
  $displayMode: CardProductViewDisplayMode
  $viewport: { width: string; height: string }
}>`
  position: relative;
  ${({ $viewport, $displayMode }) => `
    ${
      $displayMode === CardProductViewDisplayMode.PRINT && $viewport
        ? `
          overflow: hidden;
          display: flex;
      `
        : `
        `
    }
  `}
  @media print {
    &&& {
      page-break-after: always;
      break-inside: avoid;
    }
  }
`

export type ICardProductPreviewProps = {
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
  displayMode?: CardProductViewDisplayMode
  bleed?: boolean
  hasSkippedOrFilledMemorialDataPullForm?: boolean
  pageMode?: CardProductPageMode
  maxPhotoSize?: EulogiseImageSize
} & ICardProductFrameScaleProps

export const CardProductPreview = ({
  cardProduct,
  productTheme,
  product,
  displayMode = CardProductViewDisplayMode.EDIT,
  bleed,
  hasSkippedOrFilledMemorialDataPullForm,
  containerRef,
  pageMode: propPageMode,
  maxPhotoSize,
}: ICardProductPreviewProps) => {
  const pageSize = cardProduct.content?.pageSize
  const isMobile = useIsNotDesktop()
  const cardProductContent = cardProduct.content as IGenericCardProductContent
  const genericProductMetadata = cardProductContent?.metadata
  const foldType = genericProductMetadata?.foldType
  const pageMode: CardProductPageMode =
    propPageMode ??
    // (cardProduct as IGenericCardProductData)?.content?.metadata?.foldType ??
    CardProductHelper.getPageModeByPageSize({
      pageSize,
      foldType,
      product,
      displayMode,
      isMobile,
    })
  const colMode: CardProductPageColMode =
    CardProductHelper.getPageColModeByPageSize(pageSize)

  const viewport = CardProductHelper.getPdfPageViewport({
    product,
    pageSize,
    bleed,
    pageMode,
    genericProductMetadata,
  })

  const pages: Array<ICardProductPage> = CardProductHelper.getPagesOrder({
    product,
    displayMode,
    foldType,
    pages: cardProduct.content.pages,
  })
  const totalPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    totalPages: pages.length,
    foldType,
    pageMode,
    displayMode,
  })
  return (
    <DragDropContext>
      {UtilHelper.times(
        (pageCursor: number) => (
          <StyledContainer
            className={`card-product-preview`}
            key={pageCursor}
            $displayMode={displayMode}
            $viewport={viewport}
          >
            <DoubleCardProductPageView
              isEnablePhotobookEdit={false}
              bleed={bleed}
              pages={pages}
              pageMode={pageMode}
              colMode={colMode}
              maxPhotoSize={maxPhotoSize}
              pageCursor={pageCursor}
              displayMode={displayMode}
              product={product}
              cardProduct={cardProduct}
              productTheme={productTheme}
              onDragEnd={() => {}}
              onItemFocus={() => {}}
              onFrameContentItemClick={() => {}}
              onToggleImageBorderClick={() => {}}
              onChangeLayoutClick={() => {}}
              onRowDataChange={() => {}}
              onChangeImageClick={() => {}}
              onEditImageClick={() => {}}
              onFocus={() => {}}
              onAddAndCancelNewElementClick={() => {}}
              onCancel={() => {}}
              onUpdate={() => {}}
              onDelete={() => {}}
              onAddRowClick={() => {}}
              hasSkippedOrFilledMemorialDataPullForm={
                !!hasSkippedOrFilledMemorialDataPullForm
              }
              onDuplicate={() => {}}
              onOpenCopyLibraryDrawer={() => {}}
              onFrameContentItemChange={() => {}}
              onChangeFrameBackgroundClick={() => {}}
              editorScaledFactor={1}
              containerRef={containerRef}
              guideShowAt={GUIDE_SHOW_UP_PAGE.NULL}
              currentStep={0}
            />
          </StyledContainer>
        ),
        totalPageCursors,
      )}
    </DragDropContext>
  )
}
