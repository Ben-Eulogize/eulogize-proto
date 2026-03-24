import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { ImageHelper, UrlHelper, UtilHelper } from '@eulogise/helpers'
import { CardProductHelper } from '@eulogise/helpers'
import { EulogisePage, EulogiseProduct } from '@eulogise/core'
import { FlipBook } from '../../../../eulogise-client-components/src/FlipBook/FlipBook'
import { useWindowSize } from '../../ui/hooks/useWindowSize'
import {
  DEVICES,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import { EmbeddedProductBottomBar } from '../../ui/components/EmbeddedProduct/EmbeddedProductBottomBar'
import { Button, DownloadProgressBar } from '@eulogise/client-components'
import { useIframeFullScreen } from '../../ui/hooks/useIframeFullScreen'

const HEIGHT_MARGIN_PERCENT = 2

const StyledCardProductFlipBook = styled(FlipBook)`
  transition: transform 100ms;
  ${SCREEN_SIZE.TABLET} {
    transform: translateX(var(--cardProductFlipbookTranslateX, 0)) !important;
  }
`

const StyledContainer = styled.div`
  padding: ${HEIGHT_MARGIN_PERCENT}vh 0;

  body:has(&) {
    overflow: hidden;
    #fc_frame {
      display: none;
    }
  }
`

const StyledCardProduct = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

const CardProductPageImage = styled.img`
  width: 100%;
  height: 100%;
`

const StyledEmbeddedProductBottomBar = styled(EmbeddedProductBottomBar)`
  margin-top: ${STYLE.GUTTER};
  padding-top: 0.5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const FlipBookContainer = styled.div``
const ButtonContainer = styled.div`
  text-align: right;
  margin-top: ${STYLE.GUTTER};
  //  margin-top: -26px;
`

const StyledDownloadProgressBar = styled(DownloadProgressBar)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`

const EmbeddedCardProductsPage = ({ location }: PageProps) => {
  const bookRef = useRef()
  const [pageCursor, setPageCursor] = React.useState<number>(0)
  const isNotDesktopRef = useRef<boolean>()
  // const movingToPageRef = useRef<number>()
  const isStartDragging = useRef<boolean>()
  const screenSize = useBreakpoint()
  const windowSize = useWindowSize()
  const [imageSize, setImageSize] = React.useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })
  const [imageUrls, setImageUrls] = React.useState<Array<string>>([])
  const [loadingPercent, setLoadingPercent] = React.useState<number>(0)
  const [showBottomBar, setShowBottomBar] = React.useState<boolean>(false)
  const { caseId, product: pathProduct } = UrlHelper.getParams(
    EulogisePage.EMBEDDED_CARD_PRODUCT,
    {
      pathname: location.pathname,
    },
  )
  const product = pathProduct
    ? (pathProduct.toUpperCase() as EulogiseProduct)
    : null
  const noOfPageCursors = imageUrls.length / 2 + 1
  const isIframeFullScreen = useIframeFullScreen()

  const initPositioning = () => {
    const bookRefEl = bookRef.current as any
    if (bookRefEl) {
      const pageFlipEl = bookRefEl.pageFlip()
      if (pageFlipEl) {
        CardProductHelper.positioningPageFlip({
          pageCursor,
          pageFlipEl,
          totalPageCursors: noOfPageCursors!,
        })
      } else {
        setTimeout(initPositioning, 10)
      }
    } else {
      setTimeout(initPositioning, 10)
    }
  }
  useEffect(() => {
    // add booklet "flipbook-first-page" on landing to the preview
    initPositioning()
  }, [])

  useEffect(() => {
    isNotDesktopRef.current = screenSize !== DEVICES.DESKTOP
  }, [screenSize])

  useEffect(() => {
    // determine all the available card product images in S3 before rendering
    const initImageUrls = async () => {
      if (!product || !caseId) return

      let localImageUrls: Array<string> = []

      while (true) {
        try {
          const imageUrl = `${CardProductHelper.getGeneratedProductS3UrlByPageIndex(
            {
              product,
              caseId,
              pageIndex: localImageUrls.length,
            },
          )}`
          console.log('checking image', imageUrl)
          await ImageHelper.checkImageAvailability(imageUrl)
          localImageUrls.push(imageUrl)
          setLoadingPercent(localImageUrls.length)
        } catch (ex) {
          console.log('ex', ex)
          if (localImageUrls[0]) {
            const localImageSize = await ImageHelper.getImageSize({
              url: localImageUrls[0],
            })
            setImageSize(localImageSize)
          }

          setImageUrls(localImageUrls)
          setLoadingPercent(100)
          break
        }
      }
    }
    initImageUrls()
  }, [product, caseId])

  if (!caseId || !pathProduct || !product) {
    return null
  }

  if (loadingPercent < 100 || !windowSize) {
    return <StyledDownloadProgressBar percent={loadingPercent} />
  }

  const totalMarginHeight = Math.ceil(
    // * 2 because top and bottom
    ((windowSize.height * HEIGHT_MARGIN_PERCENT) / 100) * 2,
  )
  const PAGINATION_CONTAINER_HEIGHT = 52
  const bottomBarHeight = showBottomBar
    ? (STYLE.BOTTOM_BAR_HEIGHT as number)
    : 0
  const { width: flipBookWidth, height: flipBookHeight } =
    CardProductHelper.computeGeneratedFlipBookSize({
      maxSize: {
        width:
          screenSize === DEVICES.MOBILE
            ? windowSize.width // single page
            : windowSize.width / 2, // 2 pages
        height:
          windowSize.height -
          PAGINATION_CONTAINER_HEIGHT -
          bottomBarHeight -
          totalMarginHeight,
      },
      imageSize,
    })

  const flipBook = (
    <StyledCardProductFlipBook
      key={`${flipBookWidth}-${flipBookHeight}`}
      className={pageCursor === 0 ? `flipbook-first-page` : ''}
      ref={bookRef}
      width={flipBookWidth}
      height={flipBookHeight}
      product={product}
      showCover
      pages={imageUrls.map((imageUrl) => (
        <CardProductPageImage key={imageUrl} src={imageUrl} />
      ))}
      onFlip={(event: any) => {
        const newPageCursor = CardProductHelper.onCardProductFlip(event, {
          bookRef,
          isNonDesktop: !!isNotDesktopRef.current,
          noOfPageCursors,
        })
        setPageCursor(newPageCursor)
      }}
    />
  )

  return (
    <StyledContainer>
      <StyledCardProduct
        onMouseDown={() => {
          isStartDragging.current = true
        }}
        onMouseUp={() => {
          isStartDragging.current = false
        }}
        onMouseLeave={() => {
          if (isStartDragging.current === false) {
            return
          }
          isStartDragging.current = false
          const bookRefEl = bookRef.current as any
          if (!bookRefEl) {
            throw new Error('bookRef.current is not defined')
          }
          const pageFlipEl = bookRefEl.pageFlip()

          if (pageFlipEl /*&& movingToPageRef.current !== undefined*/) {
            let pageIndex = 0
            const app = pageFlipEl.flipController.app
            const pages: Array<object> = app.pages.pages
            for (let i = 0; i < pages.length; i++) {
              const page = pages[i]
              if (page.element === app.flipController.flippingPage?.element) {
                pageIndex = i
                break
              }
            }
            pageFlipEl.flip(pageIndex)
            pageFlipEl.isUserTouch = false
          }
        }}
      >
        {screenSize === DEVICES.MOBILE ? (
          <FlipBookContainer
            style={{
              width: `${flipBookWidth}px`,
              height: `${flipBookHeight}px`,
            }}
          >
            {flipBook}
          </FlipBookContainer>
        ) : (
          flipBook
        )}
      </StyledCardProduct>

      {/*<PaginationContainer>
        <EditorPagination
          product={product}
          maxSinglePageSize={[DEVICES.MOBILE, DEVICES.TABLET]}
          pageMode={pageMode}
          totalPages={imageUrls.length}
          noOfPageCursors={noOfPageCursors!}
          pageCursor={currentPageCursor}
          isShowPaginationIcons={false}
          onPageChange={(pc: number) => {
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

            const pageNumber = CardProductHelper.convertCursorToPageNumber(pc)
            ;(bookRef.current as any).pageFlip().flip(pageNumber)
            console.log('pageNumber', pageNumber)

            setTimeout(() => {
              setPageCursor(pc)
              // @ts-ignore
              isFlipping.current = false
            }, FLIPBOOK_TIME)
          }}
          width={`${flipBookWidth}px`}
          displayMode={displayMode!}
        />
      </PaginationContainer>*/}

      <ButtonContainer>
        {isIframeFullScreen ? (
          <Button onClick={UtilHelper.exitFullScreen}>Exit Fullscreen</Button>
        ) : (
          <Button onClick={UtilHelper.makeFullScreen}>Fullscreen</Button>
        )}
      </ButtonContainer>

      <StyledEmbeddedProductBottomBar
        caseId={caseId}
        isShowPurchaseButton
        onBottomBarShow={() => {
          setShowBottomBar(true)
        }}
      />
    </StyledContainer>
  )
}

export default EmbeddedCardProductsPage
