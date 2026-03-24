import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageColMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductData,
  PageActionPosition,
} from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'
import { CardProductHelper } from '@eulogise/helpers/dist/CardProductHelper'
import { FlipBook } from '../FlipBook/FlipBook'
import { DEVICES, SCREEN_SIZE, useBreakpoint } from '@eulogise/client-core'
import { CardProductPage } from '../CardProductPage'

const StyledCardProductFlipBook = React.memo(
  styled(FlipBook)<{
    $scaledFactor: number
    $transformX: boolean
  }>`
    margin: 1rem auto;
    transition: transform 100ms;
    transform-origin: top center;
    ${SCREEN_SIZE.DESKTOP} {
      ${({ $scaledFactor, $transformX }) =>
        `${
          $scaledFactor
            ? `transform: scale(${$scaledFactor}) translateX(${$transformX}) !important;`
            : ''
        }
    `}
    }
  `,
  (prevProps, nextProps) => {
    // only re-render if pages changes or $scaleFactor updated
    return (
      prevProps.pages.length === nextProps.pages.length &&
      prevProps.$scaledFactor === nextProps.$scaledFactor &&
      prevProps.showCover === nextProps.showCover &&
      prevProps.$transformX === nextProps.$transformX &&
      prevProps.editorScaledFactor === nextProps.editorScaledFactor
    )
  },
)

type ICardProductFlipBookPreviewProps = {
  cardProduct: ICardProductData
  region: EulogiseRegion
  onPreviewModalWidthChange?: (width: number) => void
  product: EulogiseProduct
  productTheme?: ICardProductTheme
  onFlip?: (event: any) => void
  bookRef: any
  isSinglePage?: boolean
  editorScaledFactor?: number
  isCoverPage?: boolean
}

const FlipBookContainer = styled.div``

export const CardProductFlipBookPreview = (
  props: ICardProductFlipBookPreviewProps,
) => {
  const {
    cardProduct,
    bookRef,
    region,
    product,
    productTheme,
    onFlip,
    isSinglePage = false,
    editorScaledFactor = 1,
    isCoverPage = false,
  } = props
  const screenSize = useBreakpoint()

  const displayMode = CardProductViewDisplayMode.PREVIEW
  const { pageWidth, pageHeight } =
    CardProductHelper.getPageWidthAndHeightByProduct({
      product,
      genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
        ?.metadata,
      region,
      pageSize: cardProduct?.content?.pageSize,
    })

  if (!productTheme) {
    return null
  }

  const $transformX = isSinglePage
    ? '0'
    : `var(--cardProductFlipbookTranslateX, 0)`

  return (
    <FlipBookContainer className={`flip-book-container`} /*ref={containerRef}*/>
      <StyledCardProductFlipBook
        // $scaledFactor={editorScaledFactor}
        $scaledFactor={1} // changing scaledFactor causing the flipbook flip to wrong page
        $transformX={$transformX}
        ref={bookRef}
        width={pageWidth * editorScaledFactor}
        height={pageHeight * editorScaledFactor}
        showCover={screenSize === DEVICES.DESKTOP}
        pages={UtilHelper.times(
          (pageIndex: number) => (
            <CardProductPage
              isEnablePhotobookEdit={false}
              isDisabledDnd={true}
              product={product}
              cardProduct={cardProduct}
              bleed={false}
              productTheme={productTheme}
              pageIndex={pageIndex}
              actionsPosition={PageActionPosition.RIGHT}
              displayMode={displayMode}
              hasSkippedOrFilledMemorialDataPullForm={false}
              colMode={CardProductPageColMode.ONE_COL}
              editorScaledFactor={editorScaledFactor}
              containerRef={0}
              isCoverPage={isCoverPage}
            />
          ),
          cardProduct.content.pages.length,
        )}
        onFlip={onFlip}
      />
    </FlipBookContainer>
  )
}
