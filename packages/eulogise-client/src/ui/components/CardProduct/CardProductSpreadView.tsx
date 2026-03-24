import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CardProductPageColMode,
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductState,
  IGenericCardProductContent,
  IGenericCardProductData,
} from '@eulogise/core'
import { useEulogiseDispatch, useProductState } from '../../store/hooks'
import { PhotobookHelper, UtilHelper } from '@eulogise/helpers'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { SortableContainer, SortableElement } from '@eulogise/client-components'
import { useResize } from '../../hooks/useResize'
import { DoubleCardProductPageView } from '../../../../../eulogise-client-components/src/CardProductPage/DoubleCardProductPageView'
import { COLOR, SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import RemoveCardProductPagesModal from './RemoveCardProductPagesModal'
import { removeCardProductPages } from '../../store/CardProduct/actions'

const CONTAINER_PADDING = 16 // pixel
const SPREAD_MARGIN = 16 // pixel

const StyledCardProductSpreadView = styled.div<{
  $height: number
}>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ $height }) =>
    `height: ${
      $height ? `${$height}px` : `calc(100vh - ${STYLE.HEADER_HEIGHT})`
    };`};
  padding: ${CONTAINER_PADDING}px ${CONTAINER_PADDING}px;
`

type ICardProductSpreadViewProps = {
  product: EulogiseProduct
  slug?: string
  cardProduct: ICardProductData
  onItemDoubleClick?: (pageCursor: number) => void
  magnifierSliderValue: number
  isShowRemoveCardProductPagesModal?: boolean
  setIsShowRemoveCardProductPagesModal?: (
    isShowRemoveCardProductPagesModal: boolean,
  ) => void
}

const DoubleCardProductViewStyle = `
  margin-bottom: ${SPREAD_MARGIN * 2}px;
  ${SCREEN_SIZE.TABLET} {
    margin-left: ${SPREAD_MARGIN / 2}px;
    margin-right: ${SPREAD_MARGIN / 2}px;
  }
`

const SortableDoubleCardProductPageView = SortableElement(
  DoubleCardProductPageView,
)

const StyledSortableDoubleCardProductPageView = styled(
  SortableDoubleCardProductPageView,
)`
  ${DoubleCardProductViewStyle};
  z-index: 3;
  position: relative;
  cursor: pointer;
`

const StyledDoubleCardProductPageView = styled(DoubleCardProductPageView)`
  ${DoubleCardProductViewStyle}
`

const PageNumberContainer = styled.div`
  position: relative;
`

const PageNumber = styled.div`
  position: absolute;
  top: 100%;
  text-align: center;
  transform: translate(calc(-100% - 8px), -130%);
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
  color: ${COLOR.CORNFLOWER_BLUE};
`

export const CardProductSpreadView = ({
  product,
  slug,
  cardProduct,
  onItemDoubleClick,
  magnifierSliderValue,
  setIsShowRemoveCardProductPagesModal,
  isShowRemoveCardProductPagesModal,
}: ICardProductSpreadViewProps) => {
  const dispatch = useEulogiseDispatch()
  const scale = magnifierSliderValue / 100 + 1
  const [spreadViewHeight, setSpreadViewHeight] = useState()
  const [
    mainContainerWithoutPaddingWidth,
    setMainContainerWithoutPaddingWidth,
  ] = useState(0)
  const MIN_SPREAD_VIEW_WIDTH = 400
  const minSpreadViewWidth =
    mainContainerWithoutPaddingWidth < MIN_SPREAD_VIEW_WIDTH
      ? mainContainerWithoutPaddingWidth
      : MIN_SPREAD_VIEW_WIDTH
  const fitNoOfSpreadPagesPerRow = Math.floor(
    mainContainerWithoutPaddingWidth / minSpreadViewWidth,
  )
  const [itemElementWidth, setItemElementWidth] = useState()
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const { activeProductTheme: productTheme } = useProductState({
    product,
    slug,
  }) as ICardProductState
  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata

  const updateSpreadView = () => {
    const mainContainerEl = mainContainerRef.current
    if (mainContainerEl) {
      const mainContainerNoPaddingWidth =
        mainContainerEl.getBoundingClientRect().width - CONTAINER_PADDING * 2 // CONTAINER_PADDING is one each side
      setMainContainerWithoutPaddingWidth(mainContainerNoPaddingWidth * scale)

      // need to add timeout, otherwise the element width is not correct
      setTimeout(() => {
        // @ts-ignore
        const [firstElement] = mainContainerEl.getElementsByClassName(
          'double-card-product-page-view-element',
        )
        if (firstElement) {
          // @ts-ignore
          setItemElementWidth(firstElement?.getBoundingClientRect().width)
        }
      }, 100)
    }
  }

  useEffect(() => {
    updateSpreadView()
  }, [magnifierSliderValue])

  useResize(() => {
    updateSpreadView()
  }, [])

  if (!productTheme) {
    console.log(`No product theme found for product: ${product}`)
    if (product !== EulogiseProduct.PHOTOBOOK) {
      return null
    }
  }
  const cardProductData = cardProduct
  const cardProductContent = cardProductData.content
  const pages = cardProductContent.pages
  const pageSize = cardProductContent.pageSize
  const totalPages = pages.length
  const displayMode = CardProductViewDisplayMode.SPREAD_VIEW
  const foldType = genericProductMetadata?.foldType
  const noOfPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    foldType,
    totalPages,
    pageMode: CardProductPageMode.NORMAL,
    isMobile: false,
    displayMode,
  })!
  const colMode: CardProductPageColMode =
    CardProductHelper.getPageColModeByPageSize(cardProductContent.pageSize)
  const { pageWidth: originalProductWidth } =
    CardProductHelper.getPageWidthAndHeight({
      genericProductMetadata: (cardProductContent as IGenericCardProductContent)
        ?.metadata,
      pageSize: cardProductContent.pageSize,
      pageOrientation: cardProductContent.pageOrientation,
    })
  const originalSpreadProductWidth = originalProductWidth * 2 // 2 pages in a spread page
  const editorScaledFactor =
    (mainContainerWithoutPaddingWidth /
      ((originalSpreadProductWidth +
        SPREAD_MARGIN +
        (fitNoOfSpreadPagesPerRow === 1 ? 0 : 100)) *
        fitNoOfSpreadPagesPerRow)) *
    scale

  const updateSpreadViewHeight = () => {
    // @ts-ignore
    if (!window) {
      return
    }
    setSpreadViewHeight(
      window.document.getElementById('main-content')?.clientHeight,
    )
  }

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      updateSpreadViewHeight()
    }, 100) // wait for the DOM to be ready, otherwise the height will be too big
  }, [])

  useResize(() => {
    updateSpreadViewHeight()
  }, [])

  const removePages = PhotobookHelper.getNoOfRemovePages({ pageSize, foldType })
  return (
    <StyledCardProductSpreadView
      id="card-product-spread-view"
      ref={mainContainerRef}
      $height={spreadViewHeight}
    >
      {UtilHelper.times((pageCursor: number) => {
        const isFirstPageCursor = pageCursor === 0
        const isLastPageCursor = pageCursor === noOfPageCursors - 1
        const isCoverPageCursor = isFirstPageCursor || isLastPageCursor
        const isTitlePageCursor = pageCursor === 1
        const isReactSortable =
          !isCoverPageCursor && !isTitlePageCursor && !isLastPageCursor
        const DoubleCardProductPageViewElement = isReactSortable
          ? StyledSortableDoubleCardProductPageView
          : StyledDoubleCardProductPageView
        const spreadViewPageNumbers =
          CardProductHelper.getPageNumberTextByPageCursor({
            product,
            pageCursorIndex: pageCursor,
            totalPages,
            pageMode: CardProductPageMode.NORMAL,
            foldType,
          })

        return (
          <>
            <DoubleCardProductPageViewElement
              className={`double-card-product-page-view-element`}
              key={`pageCursor-${pageCursor}`}
              index={pageCursor}
              product={product}
              onDoubleClick={() => {
                if (onItemDoubleClick) {
                  onItemDoubleClick(pageCursor)
                }
              }}
              cardProduct={cardProductData}
              pageCursor={pageCursor}
              pages={pages}
              displayMode={displayMode}
              productTheme={productTheme}
              editorScaledFactor={editorScaledFactor}
              colMode={colMode}
              isShowDummyLeftPage={false}
              isShowDummyRightPage={false}
            />
            <PageNumberContainer>
              <PageNumber style={{ width: itemElementWidth }}>
                {isCoverPageCursor
                  ? isFirstPageCursor
                    ? 'Front Cover'
                    : 'Back Cover'
                  : spreadViewPageNumbers}
              </PageNumber>
            </PageNumberContainer>
          </>
        )
      }, noOfPageCursors)}
      {isShowRemoveCardProductPagesModal &&
        setIsShowRemoveCardProductPagesModal && (
          <RemoveCardProductPagesModal
            product={product}
            cardProduct={cardProduct}
            displayMode={CardProductViewDisplayMode.EDIT}
            onClose={() => setIsShowRemoveCardProductPagesModal(false)}
            onConfirm={() => {
              dispatch(removeCardProductPages({ product, removePages }))
              setIsShowRemoveCardProductPagesModal(false)
            }}
            foldType={foldType}
            removePages={removePages}
          />
        )}
    </StyledCardProductSpreadView>
  )
}

export const SortableCardProductSpreadView = SortableContainer(
  CardProductSpreadView,
)
