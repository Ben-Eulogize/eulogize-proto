import React from 'react'
import styled from 'styled-components'
import HTMLFlipBook from 'react-pageflip'
import { PhotobookHelper } from '@eulogise/helpers'
import { EulogiseProduct } from '@eulogise/core'

export const FLIPBOOK_TIME = 500

type IFlipBookProps = {
  width: number
  height: number
  pages: Array<React.ReactNode>
  showCover?: boolean
  className?: string
  onFlip?: (event: any) => void
  onInit?: (event: any) => void
  onChangeState?: (state: any) => void
  product: EulogiseProduct
}

const StyledFlipBook = styled(HTMLFlipBook)``

const StyledPage = styled.div<{ $hasBoxShadow?: boolean }>`
  ${({ $hasBoxShadow }) =>
    $hasBoxShadow
      ? `
      box-shadow: rgba(0, 21, 41, 0.25) 0px 1px 4px;
      #styled-page {
        box-shadow: inset 7px 0 30px -7px rgba(0,0,0,0.1);
      }
    `
      : ''}
`

export const FlipBook = React.forwardRef((props: IFlipBookProps, ref) => {
  const {
    width = 300,
    height = 500,
    showCover = false,
    pages,
    className,
    onFlip,
    onInit,
    onChangeState,
    product,
  } = props

  // HAS TO BE ROUNDED
  // width and height values cannot be decimal, otherwise, a lot of
  // spaces at the top and bottom added by the react-pageflip
  const pageWidth = Math.round(width)
  // HAS TO BE ROUNDED
  // width and height values cannot be decimal, otherwise, a lot of
  // spaces at the top and bottom added by the react-pageflip
  const pageHeight = Math.round(height)
  return (
    // @ts-ignore
    <StyledFlipBook
      className={className!}
      ref={ref}
      width={pageWidth}
      height={pageHeight}
      maxHeight={pageHeight}
      showCover={showCover}
      onFlip={onFlip}
      flippingTime={FLIPBOOK_TIME}
      maxShadowOpacity={0.1}
      onInit={onInit}
      onChangeState={onChangeState}
    >
      {pages.map((page, pageIndex) => {
        const isCoverPage = PhotobookHelper.isPhotobookCoverPage({
          pageIndex,
          product,
        })

        return (
          <StyledPage
            className={`styled-flip-page`}
            key={pageIndex}
            $hasBoxShadow={!isCoverPage}
          >
            {page}
          </StyledPage>
        )
      })}
    </StyledFlipBook>
  )
})
