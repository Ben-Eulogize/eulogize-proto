import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CARD_PRODUCTS_OVERLAYS,
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  GenericCardProductTypeFoldType,
  GenericCardProductTypeOutputFormat,
  CardProductBorderThicknessType,
  CardProductBorderType,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductTypeData,
  CardProductViewDisplayMode,
  BOOKLET_THEMES_NORMAL_BORDERS,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { Checkbox } from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'
import CardProductWithPagination from '../../../components/CardProduct/CardProductWithPagination'

const StyledPreviewWrapper = styled.div`
  position: relative;
`

const StyledPreviewContainer = styled.div<{ $offsetY: number }>`
  border: 1px solid ${COLOR.LIGHT_GREY};
  border-radius: 4px;
  background: ${COLOR.SUPER_LITE_GREY};
  padding: 16px;
  min-height: 300px;
  transform: translateY(${({ $offsetY }) => $offsetY}px);
  transition: transform 0.15s ease-out;
`

const StyledPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${COLOR.DOVE_GREY};
  font-size: 13px;
  text-align: center;
`

const StyledDimensionLabel = styled.div`
  color: ${COLOR.CORE_PURPLE};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
`

interface IGenericCardProductTypePreviewProps {
  dimensions: Array<{
    name: string
    width: number
    height: number
    pageMarginsX: number
    pageMarginsY: number
    overlayMarginX: number
    overlayMarginY: number
  }>
  foldType: GenericCardProductTypeFoldType
  defaultPages: number
  selectedDimensionIndex?: number
  dimensionUnit: 'mm' | 'px'
}

// Calculate and format aspect ratio
const getAspectRatio = (width: number, height: number): string | null => {
  if (width <= 0 || height <= 0) return null

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divisor = gcd(width, height)

  const ratioWidth = width / divisor
  const ratioHeight = height / divisor

  if (ratioWidth <= 20 && ratioHeight <= 20) {
    return `${ratioWidth}:${ratioHeight}`
  }

  const decimalRatio = height / width
  return `1:${decimalRatio.toFixed(2)}`
}

const THEME_ID = 'reflection'
const FLOAT_TOP_MARGIN = 16

export const GenericCardProductTypePreview = ({
  dimensions,
  foldType,
  defaultPages,
  selectedDimensionIndex = 0,
  dimensionUnit,
}: IGenericCardProductTypePreviewProps) => {
  const [pageCursor, setPageCursor] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [showBleed, setShowBleed] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)
  const [showBorders, setShowBorders] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedDimension = dimensions[selectedDimensionIndex ?? 0]
  const hasValidDimensions =
    selectedDimension &&
    selectedDimension.width > 0 &&
    selectedDimension.height > 0

  // Float the preview by listening to window scroll (the actual scroll container)
  const handleScroll = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const previewEl = wrapper.firstElementChild as HTMLElement | null
    const previewHeight = previewEl?.offsetHeight ?? 0

    // How far the wrapper's top has scrolled above the viewport top
    const scrolledAbove = FLOAT_TOP_MARGIN - wrapperRect.top

    if (scrolledAbove <= 0) {
      setOffsetY(0)
    } else {
      // Clamp so the preview doesn't overflow past its parent column
      const parentHeight = wrapper.parentElement?.offsetHeight ?? 0
      const maxOffset = Math.max(0, parentHeight - previewHeight)
      setOffsetY(Math.min(scrolledAbove, maxOffset))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true })
    }
  }, [handleScroll])

  // Convert dimensions to pixels if the form is in mm mode
  const pxDimensions = useMemo(() => {
    if (dimensionUnit === 'mm') {
      return dimensions.map((d) => ({
        ...d,
        width: CardProductHelper.mmToPx(d.width),
        height: CardProductHelper.mmToPx(d.height),
        pageMarginsX: CardProductHelper.mmToPx(d.pageMarginsX),
        pageMarginsY: CardProductHelper.mmToPx(d.pageMarginsY),
      }))
    }
    return dimensions
  }, [dimensions, dimensionUnit])

  // Build mock IGenericCardProductTypeData from form values
  const mockGenericProductType =
    useMemo<IGenericCardProductTypeData | null>(() => {
      if (!hasValidDimensions) return null
      return {
        id: 'preview',
        name: 'Preview',
        slug: 'preview',
        dimensions: pxDimensions.map((d) => ({
          name: d.name || 'Preview',
          width: d.width,
          height: d.height,
          pageMarginsX: d.pageMarginsX,
          pageMarginsY: d.pageMarginsY,
          overlayMarginX: d.overlayMarginX,
          overlayMarginY: d.overlayMarginY,
        })),
        foldType,
        outputFormat: GenericCardProductTypeOutputFormat.PDF,
        defaultPages: defaultPages || 4,
        minPages: 1,
        maxPages: defaultPages || 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }, [
      pxDimensions,
      foldType,
      defaultPages,
      hasValidDimensions,
      selectedDimensionIndex,
    ])

  // Create dynamic theme and mock card product data
  const { cardProduct, productTheme } = useMemo<{
    cardProduct: ICardProductData | null
    productTheme: ICardProductTheme | null
  }>(() => {
    if (!mockGenericProductType)
      return { cardProduct: null, productTheme: null }

    try {
      // Build a temporary generic product type with only the selected dimension at index 0
      // so that getGenericProductPageWidthAndHeight (which falls back to dimensions[0]) uses it
      const selectedDim =
        mockGenericProductType.dimensions[selectedDimensionIndex ?? 0]
      const targetGenericProductType: IGenericCardProductTypeData = {
        ...mockGenericProductType,
        dimensions: [selectedDim],
      }

      const baseTheme = BOOKLET_THEMES_NORMAL_BORDERS.find(
        (t) => t.id === THEME_ID,
      )
      if (!baseTheme) return { cardProduct: null, productTheme: null }

      const dynamicTheme = CardProductHelper.createDynamicTheme({
        themeId: THEME_ID,
        product: EulogiseProduct.GENERIC_CARD_PRODUCT,
        genericProductType: targetGenericProductType,
        productTheme: baseTheme,
      })

      const data = CardProductHelper.createDummyGenericCardProductData({
        productTheme: dynamicTheme,
        genericProductType: targetGenericProductType,
      })

      // The theme's default content rows are sized for booklet (HALF_LETTER_A5) dimensions.
      // createDummyGenericCardProductData calls refinePages internally with scaleFactor=1,
      // which doesn't scale row heights. Re-refine with a proper scale factor so content
      // fits the form's target dimensions.
      const { width: baseContentWidth, height: baseContentHeight } =
        CardProductHelper.getPageContentWidthAndHeight({
          product: EulogiseProduct.BOOKLET,
          pageSize: CardProductPageSize.HALF_LETTER_A5,
          pageOrientation: CardProductPageOrientation.PORTRAIT,
          region: EulogiseRegion.USA,
        })

      const { width: targetContentWidth, height: targetContentHeight } =
        CardProductHelper.getPageContentWidthAndHeight({
          product: EulogiseProduct.GENERIC_CARD_PRODUCT,
          pageSize: CardProductPageSize.GENERIC_CARD_PRODUCT,
          genericProductType: targetGenericProductType,
          pageOrientation: CardProductPageOrientation.PORTRAIT,
          region: EulogiseRegion.USA,
        })

      const scaleFactor =
        baseContentHeight > 0 ? targetContentHeight / baseContentHeight : 1

      const refinedPages = CardProductHelper.refinePages({
        pages: data.content.pages,
        productTheme: dynamicTheme,
        pageContentWidth: targetContentWidth,
        pageContentHeight: targetContentHeight,
        product: EulogiseProduct.GENERIC_CARD_PRODUCT,
        scaleFactor,
        originalPageWidth: baseContentWidth,
      })

      // Add overlay settings to each page's background so hasPageOverlay() returns true,
      // and populate bleedPageBackground from each page's background image
      const overlayDefaults = {
        ...CARD_PRODUCTS_OVERLAYS[EulogiseProduct.GENERIC_CARD_PRODUCT],
        overlayColor: COLOR.CORNFLOWER_BLUE,
      }
      const defaultBorder = {
        borderStyle: CardProductBorderType.SINGLE_SOLID,
        color: '#333333',
        thickness: CardProductBorderThicknessType.MEDIUM,
      }
      const pagesWithOverlayAndBleed = refinedPages.map((page) => ({
        ...page,
        border: page.border ?? defaultBorder,
        background: {
          ...page.background,
          overlayEnabled: true,
          overlayColor: overlayDefaults.overlayColor,
          overlayOpacity: overlayDefaults.overlayOpacity,
          overlayMargin: overlayDefaults.overlayMargin,
        },
        bleedPageBackground: CardProductHelper.getBleedPageBackground({
          page,
          product: EulogiseProduct.GENERIC_CARD_PRODUCT,
        }),
      }))
      return {
        cardProduct: {
          ...data,
          content: {
            ...data.content,
            pageOverlay: {
              ...overlayDefaults,
              overlayEnabled: true,
            },
            pages: pagesWithOverlayAndBleed,
          },
        },
        productTheme: dynamicTheme,
      }
    } catch {
      return { cardProduct: null, productTheme: null }
    }
  }, [mockGenericProductType, selectedDimensionIndex])

  // Derive display data based on preview toggle states
  const { displayCardProduct, displayGenericProductType } = useMemo(() => {
    if (!cardProduct || !mockGenericProductType) {
      return { displayCardProduct: null, displayGenericProductType: null }
    }

    const displayGenericProductType = mockGenericProductType

    // Apply overlay, borders, and bleed toggles to card product pages
    let displayCardProduct: ICardProductData = cardProduct
    if (!showOverlay || !showBorders || !showBleed) {
      displayCardProduct = {
        ...cardProduct,
        content: {
          ...cardProduct.content,
          // Strip content-level page overlay when OFF
          ...(showOverlay ? {} : { pageOverlay: undefined }),
          pages: cardProduct.content.pages.map((page) => ({
            ...page,
            // Strip overlay from page background when OFF
            ...(showOverlay
              ? {}
              : {
                  background: page.background
                    ? {
                        ...page.background,
                        overlayEnabled: false,
                        overlayColor: undefined,
                        overlayOpacity: undefined,
                        overlayMargin: undefined,
                      }
                    : undefined,
                }),
            // Strip border when OFF
            ...(showBorders ? {} : { border: undefined }),
            // Strip bleed background when OFF
            ...(showBleed ? {} : { bleedPageBackground: undefined }),
          })),
        },
      }
    }

    return { displayCardProduct, displayGenericProductType }
  }, [cardProduct, mockGenericProductType, showBleed, showOverlay, showBorders])

  return (
    <StyledPreviewWrapper ref={wrapperRef}>
      <StyledPreviewContainer $offsetY={offsetY}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
          }}
        >
          <Checkbox
            checked={showBleed}
            onChange={(e: any) => setShowBleed(e.target.checked)}
          >
            Bleed
          </Checkbox>
          <Checkbox
            checked={showOverlay}
            onChange={(e: any) => setShowOverlay(e.target.checked)}
          >
            Overlay
          </Checkbox>
          <Checkbox
            checked={showBorders}
            onChange={(e: any) => setShowBorders(e.target.checked)}
          >
            Borders
          </Checkbox>
        </div>
        {!hasValidDimensions && (
          <StyledPlaceholder>Set dimensions to see preview</StyledPlaceholder>
        )}

        {hasValidDimensions && displayCardProduct && productTheme && (
          <>
            <StyledDimensionLabel>
              {selectedDimension.name ||
                `Dimension ${(selectedDimensionIndex ?? 0) + 1}`}{' '}
              — {selectedDimension.width}×{selectedDimension.height}
              {dimensionUnit}
              {getAspectRatio(
                selectedDimension.width,
                selectedDimension.height,
              ) &&
                ` (${getAspectRatio(
                  selectedDimension.width,
                  selectedDimension.height,
                )})`}
              {dimensionUnit === 'mm' &&
                ` (${Math.round(
                  pxDimensions[selectedDimensionIndex ?? 0].width,
                )}×${Math.round(
                  pxDimensions[selectedDimensionIndex ?? 0].height,
                )}px)`}
            </StyledDimensionLabel>
            <CardProductWithPagination
              product={EulogiseProduct.GENERIC_CARD_PRODUCT}
              slug="preview"
              bleed={showBleed}
              cardProduct={displayCardProduct}
              productTheme={productTheme}
              genericProductType={displayGenericProductType!}
              displayMode={CardProductViewDisplayMode.PREVIEW}
              pageCursor={pageCursor}
              onPageChange={(pc) => setPageCursor(pc)}
              isEnabledScrolling={false}
              bookletMagnifierSliderValue={0}
              isShowBorderSettingModal={false}
              setIsShowBorderSettingModal={() => null}
              isShowRemoveCardProductPagesModal={false}
              setIsShowRemoveCardProductPagesModal={() => null}
              isShowImageLibrary={false}
              onIsShowImageLibrary={() => null}
              currentPageIndex={0}
              selectedFrameContentItemId={''}
              onUpdatingImageDetails={() => null}
              onSelectedFrameContentItemId={() => null}
              setFocusedRowId={() => null}
              onChangeImageClick={() => null}
              dispatchAddRow={() => null}
              focusedRowId={''}
            />
          </>
        )}

        {hasValidDimensions && !displayCardProduct && (
          <StyledPlaceholder>Loading preview...</StyledPlaceholder>
        )}
      </StyledPreviewContainer>
    </StyledPreviewWrapper>
  )
}
