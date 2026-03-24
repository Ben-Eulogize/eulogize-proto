import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { CardProductFlipBookPreview } from '../../../../../eulogise-client-components/src/CardProductFlipBookPreview/CardProductFlipBookPreview'
import {
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductData,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { FLIPBOOK_TIME } from '@eulogise/client-components/dist/FlipBook/FlipBook'
import {
  COLOR,
  DEVICES,
  STYLE,
  useBreakpoint,
  useIsNotDesktop,
} from '@eulogise/client-core'
import { useWindowSize } from '../../hooks/useWindowSize'
import { PhotobookHelper } from '@eulogise/helpers'
import { PaginationDisplay } from '../EditorPagination/PaginationDisplay'
import { Tooltip } from '@eulogise/client-components'
import { ArrowLeftIcon, ArrowRightIcon } from '@eulogise/client-components'

type ICardProductFlipBookPreviewProps = {
  cardProduct: ICardProductData
  region: EulogiseRegion
  pageCursor: number
  onPageChange: (pc: number) => void
  onPreviewModalWidthChange?: (width: number) => void
  productTheme?: ICardProductTheme
  product: EulogiseProduct
}

const StyledCardProductFlipBookPreviewWithPagination = styled.div`
  position: relative;
`

export const DisabledArrowStyle = css`
  opacity: 0.3;
  pointer-events: none;
`

export const ArrowStyle = css`
  background: ${COLOR.SUPER_LITE_GREY};
  color: ${COLOR.DOVE_GREY};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 1px solid var(--Border, ${COLOR.LIGHT_GREY});

  :hover {
    background: #ede0f0;
    color: ${COLOR.DOVE_GREY};
  }
`

type PositionMode = 'float' | 'none'
const PaginationButtonWrapper = styled.div<{
  $right?: boolean
  $positionMode?: PositionMode
}>`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px; // space between icon and text
  ${({ $right, $positionMode }) =>
    `${$right ? `right: ${STYLE.GUTTER};` : `left: ${STYLE.GUTTER};`}
     ${
       $positionMode === 'float'
         ? `top: calc(50% - 50px); transform: translateY(-50%); opacity: 0.4; &:hover { opacity: 1; }`
         : ``
     }
    `}
`

const CircleButton = styled.div<{ isDisabled?: boolean }>`
  ${ArrowStyle};
  ${({ isDisabled }) => isDisabled && DisabledArrowStyle}
  background
`

const PaginationText = styled.span<{ isDisabled?: boolean }>`
  color: ${({ isDisabled }) => (isDisabled ? COLOR.DOVE_GREY : COLOR.BLACK)};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  font-size: 14px;
`

export const CardProductFlipBookPreviewWithPagination = ({
  cardProduct,
  region,
  pageCursor,
  onPageChange,
  onPreviewModalWidthChange,
  product,
  productTheme,
}: ICardProductFlipBookPreviewProps) => {
  const bookRef = useRef()
  const isNotDesktopRef = useRef<boolean>()
  const isNotDesktop = useIsNotDesktop()
  const screenSize = useBreakpoint()
  const windowSize = useWindowSize()
  const { width: windowWidth } = windowSize ?? { width: 0, height: 0 }

  const isFlipping = React.useRef(false)
  const displayMode = CardProductViewDisplayMode.PREVIEW
  const pageMode = CardProductPageMode.NORMAL
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const previewCardProduct = isPhotobook
    ? PhotobookHelper.getPreviewPhotobookData(cardProduct)
    : cardProduct
  const totalPages = previewCardProduct.content?.pages?.length
  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata
  const noOfPageCursors =
    CardProductHelper.getTotalPageCursors({
      product,
      totalPages,
      pageMode,
      foldType: genericProductMetadata?.foldType,
      isMobile: isNotDesktop,
      displayMode,
    }) ?? 0
  const { pageWidth: productPageWidth } =
    CardProductHelper.getPageWidthAndHeightByProduct({
      product,
      genericProductMetadata,
      region,
      pageSize: cardProduct?.content?.pageSize,
    })

  // add booklet "flipbook-first-page" on landing to the preview
  useEffect(() => {
    const bookRefEl = bookRef.current as any
    if (bookRefEl) {
      const pageFlipEl = bookRefEl.pageFlip()
      if (pageFlipEl) {
        CardProductHelper.positioningPageFlip({
          pageCursor: pageCursor ?? 0,
          pageFlipEl,
          totalPageCursors: noOfPageCursors!,
        })
      }
    }
  }, [bookRef.current])

  useEffect(() => {
    isNotDesktopRef.current = screenSize !== DEVICES.DESKTOP
  }, [screenSize])

  const maxProductPageWidth = windowWidth
    ? Math.min(600, windowWidth - 20)
    : 600
  const maxProductScale =
    productPageWidth > maxProductPageWidth
      ? maxProductPageWidth / productPageWidth
      : 1
  const editorScaledFactor = maxProductScale
  const scaledProductPageWidth = productPageWidth * editorScaledFactor
  const isSinglePage = windowWidth < scaledProductPageWidth * 2
  const flipBookModeChange = isSinglePage ? scaledProductPageWidth : 1400

  const maxSinglePageSize = scaledProductPageWidth * 2

  const isMobile = maxSinglePageSize > windowWidth

  const isCoverPage = PhotobookHelper.isPhotobookCoverPage({
    product,
    pageIndex: pageCursor,
    noOfPageCursors,
  })

  const isFirstPage = pageCursor === 0

  const lastPageCursor = noOfPageCursors - 1
  const isLastPage: boolean = lastPageCursor === pageCursor
  const foldType = genericProductMetadata?.foldType

  const pageNumbers = CardProductHelper.getPageNumberTextByPageCursor({
    product,
    pageCursorIndex: pageCursor,
    totalPages,
    pageMode,
    isMobile,
    displayMode,
    foldType,
  })

  useEffect(() => {
    if (onPreviewModalWidthChange) {
      onPreviewModalWidthChange(flipBookModeChange)
    }
  }, [flipBookModeChange])

  const OnFlipPageChange = (pc: number) => {
    if (isFlipping.current) {
      return
    }

    const bookRefEl = bookRef.current as any
    if (!bookRefEl) {
      throw new Error('bookRef.current is not defined')
    }
    const pageFlipEl = bookRefEl.pageFlip()
    CardProductHelper.positioningPageFlip({
      pageCursor: pc,
      pageFlipEl,
      totalPageCursors: noOfPageCursors!,
    })

    // @ts-ignore
    isFlipping.current = true

    const pageNumber = isNotDesktop
      ? pc
      : CardProductHelper.convertCursorToPageNumber(pc)
    ;(bookRef.current as any).pageFlip().flip(pageNumber)

    setTimeout(() => {
      onPageChange(pc)
      // @ts-ignore
      isFlipping.current = false
    }, FLIPBOOK_TIME)
  }

  const renderPaginationDisplay = () => {
    const isShowPageNumberInFirstRow = isMobile
    const foldType = genericProductMetadata?.foldType
    return (
      <PaginationDisplay
        isShowPageNumberInFirstRow={isShowPageNumberInFirstRow}
        pageCursor={pageCursor}
        product={product}
        pageMode={pageMode}
        foldType={foldType}
        totalPages={totalPages}
        isSinglePage={isSinglePage}
        noOfPageCursors={noOfPageCursors}
        onPageChange={OnFlipPageChange}
        isCoverPage={isCoverPage}
        isFirstPage={isFirstPage}
        pageNumbers={pageNumbers}
      />
    )
  }

  const renderBackPagination = ({
    positionMode = 'none',
  }: {
    positionMode?: PositionMode
  }) => {
    return (
      <PaginationButtonWrapper $positionMode={positionMode}>
        <CircleButton
          isDisabled={isFirstPage}
          onMouseDown={() => {
            if (isSinglePage) return OnFlipPageChange(0)
            return pageCursor !== 0 ? OnFlipPageChange(pageCursor - 1) : null
          }}
        >
          <ArrowLeftIcon />
        </CircleButton>
        {positionMode === 'none' && (
          <Tooltip title="Previous page">
            <PaginationText isDisabled={isFirstPage}>
              {isSinglePage
                ? 'Front'
                : `Back ${
                    isFirstPage ? `` : `${pageCursor}/${noOfPageCursors}`
                  }`}
            </PaginationText>
          </Tooltip>
        )}
      </PaginationButtonWrapper>
    )
  }

  const renderNextPagination = ({
    positionMode = 'none',
  }: {
    positionMode?: PositionMode
  }) => {
    return (
      <PaginationButtonWrapper $right $positionMode={positionMode}>
        {positionMode === 'none' && (
          <Tooltip title="Next page">
            <PaginationText isDisabled={isLastPage}>
              {isSinglePage
                ? 'Back'
                : `Next ${
                    isLastPage ? '' : `${pageCursor + 2}/${noOfPageCursors}`
                  }`}
            </PaginationText>
          </Tooltip>
        )}
        <CircleButton
          isDisabled={isLastPage}
          onMouseDown={() => {
            if (isSinglePage) return OnFlipPageChange(lastPageCursor)
            return !isLastPage ? OnFlipPageChange(pageCursor + 1) : null
          }}
        >
          <ArrowRightIcon />
        </CircleButton>
      </PaginationButtonWrapper>
    )
  }

  return (
    <StyledCardProductFlipBookPreviewWithPagination>
      <CardProductFlipBookPreview
        bookRef={bookRef}
        isSinglePage={isSinglePage}
        isCoverPage={isCoverPage}
        cardProduct={previewCardProduct}
        region={region}
        product={product}
        productTheme={productTheme}
        onPreviewModalWidthChange={onPreviewModalWidthChange}
        editorScaledFactor={editorScaledFactor}
        onFlip={(event: any) => {
          if (isFlipping.current) return
          const newPageCursor = CardProductHelper.onCardProductFlip(event, {
            bookRef,
            isNonDesktop: !!isNotDesktopRef.current,
            noOfPageCursors: noOfPageCursors!,
          })
          onPageChange(newPageCursor)
        }}
      />
      {renderBackPagination({})}
      {renderNextPagination({})}
      {renderBackPagination({ positionMode: 'float' })}
      {renderNextPagination({ positionMode: 'float' })}
      {renderPaginationDisplay()}
    </StyledCardProductFlipBookPreviewWithPagination>
  )
}
