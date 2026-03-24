import styled from 'styled-components'
import React from 'react'
import { Tooltip } from '@eulogise/client-components'
import EditorPaginationImageIcons from './EditorPaginationImageIcons'
import { LeftIcon, RightIcon, Text } from '@eulogise/client-components'
import {
  CardProductPageMode,
  EulogiseProduct,
  GenericCardProductTypeFoldType,
} from '@eulogise/core'
import { COLOR, STYLE } from '@eulogise/client-core'
import { CardProductViewDisplayMode } from '@eulogise/core'
import { useWindowSize } from '../../hooks/useWindowSize'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'

interface IEditorPaginationProps {
  pageMode: CardProductPageMode
  totalPages: number
  noOfPageCursors: number
  foldType?: GenericCardProductTypeFoldType
  pageCursor: number
  isCoverPage?: boolean
  onPageChange?: (pc: number) => void
  width?: string
  product: EulogiseProduct
  displayMode: CardProductViewDisplayMode
  maxSinglePageSize?: number
  isShowPaginationIcons?: boolean
}

const StyledPaginationButton = styled.span`
  padding: 0 0.25rem;
  margin: 0 0.25rem;
  white-space: nowrap;
  display: inline-block;
  cursor: pointer;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  ${({ isDisabled }: { isDisabled: boolean }) => isDisabled && `opacity: .3;`}
`

const PageNumber = styled(Text)``

const StyledEditorPagination = styled.div`
  position: relative;
`

const FirstRow = styled.div<{ $width: string | undefined }>`
  display: flex;
  align-items: center;
  min-width: 160px;
  ${({ $width }) => $width && `width: ${$width};`}
  max-width: 100%;
  margin: 0 auto 0;
  justify-content: space-between;
`

const SecondRow = styled.div`
  display: flex;
  justify-content: center;
  margin: ${STYLE.HALF_GUTTER} auto;
  color: ${COLOR.CORNFLOWER_BLUE};
`

export const EditorPagination = ({
  product,
  pageMode,
  totalPages = 0,
  noOfPageCursors = 3,
  pageCursor,
  foldType,
  onPageChange,
  width,
  displayMode,
  isShowPaginationIcons = true,
  maxSinglePageSize = 1000,
  isCoverPage = false,
}: IEditorPaginationProps) => {
  if (noOfPageCursors === 1) {
    return null
  }
  const windowSize = useWindowSize()
  const { width: windowWidth } = windowSize ?? { width: 0, height: 0 }
  const isSinglePage: boolean = noOfPageCursors === 2
  const lastPageCursor = noOfPageCursors - 1
  const isLastPage: boolean = lastPageCursor === pageCursor
  const isFirstPage = pageCursor === 0
  const isMobile = maxSinglePageSize > windowWidth
  const pageNumbers = CardProductHelper.getPageNumberTextByPageCursor({
    product,
    pageCursorIndex: pageCursor,
    totalPages,
    pageMode,
    isMobile,
    displayMode,
    foldType,
  })
  const isShowPageNumberInFirstRow =
    isMobile || displayMode === CardProductViewDisplayMode.TEMPLATE
  return (
    <StyledEditorPagination>
      <FirstRow $width={width}>
        <StyledPaginationButton
          isDisabled={isFirstPage}
          onMouseDown={() => {
            if (isSinglePage) {
              return onPageChange && onPageChange(0)
            }
            return pageCursor !== 0
              ? onPageChange && onPageChange(pageCursor - 1)
              : null
          }}
        >
          <Tooltip title={'Previous page'}>
            <LeftIcon /> {isSinglePage ? 'Front' : 'Back'}
          </Tooltip>
        </StyledPaginationButton>
        {isShowPaginationIcons ? (
          isShowPageNumberInFirstRow ? (
            <PageNumber>Page {pageCursor + 1}</PageNumber>
          ) : (
            <EditorPaginationImageIcons
              product={product}
              foldType={foldType}
              pageMode={pageMode}
              totalPages={totalPages}
              isSinglePage={isSinglePage}
              noOfPageCursors={noOfPageCursors}
              pageCursor={pageCursor}
              onPageChange={onPageChange}
            />
          )
        ) : null}
        <StyledPaginationButton
          isDisabled={isLastPage}
          onMouseDown={() => {
            if (isSinglePage) {
              return onPageChange && onPageChange(lastPageCursor)
            }
            return !isLastPage
              ? onPageChange && onPageChange(pageCursor + 1)
              : null
          }}
        >
          <Tooltip title={'Next page'}>
            {isSinglePage ? 'Back' : 'Next'}
            <RightIcon />
          </Tooltip>
        </StyledPaginationButton>
      </FirstRow>
      {(!isShowPageNumberInFirstRow && pageNumbers) || isCoverPage ? (
        <SecondRow>
          <PageNumber>
            &nbsp;&nbsp;
            {isCoverPage
              ? isFirstPage
                ? `Front Cover`
                : `Back Cover`
              : `Page ${pageNumbers}`}
          </PageNumber>
        </SecondRow>
      ) : null}
    </StyledEditorPagination>
  )
}
