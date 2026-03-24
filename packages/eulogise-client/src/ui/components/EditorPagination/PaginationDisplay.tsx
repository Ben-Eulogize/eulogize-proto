import React from 'react'
import styled from 'styled-components'
import { Text } from '@eulogise/client-components'
import EditorPaginationImageIcons from './EditorPaginationImageIcons'
import {
  CardProductPageMode,
  EulogiseProduct,
  CardProductViewDisplayMode,
  GenericCardProductTypeFoldType,
} from '@eulogise/core'
import { COLOR, STYLE } from '@eulogise/client-core'

const PageNumber = styled(Text)``

const FirstRowContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SecondRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* make row span full width */
  margin: ${STYLE.HALF_GUTTER} auto;
  color: ${COLOR.CORNFLOWER_BLUE};
`

interface PaginationDisplayProps {
  isShowPageNumberInFirstRow: boolean
  foldType?: GenericCardProductTypeFoldType
  pageCursor: number
  product: EulogiseProduct
  pageMode: CardProductPageMode
  totalPages: number
  isSinglePage: boolean
  noOfPageCursors: number
  onPageChange?: (pc: number) => void
  isCoverPage?: boolean
  isFirstPage: boolean
  pageNumbers: string | number | null
}

export const PaginationDisplay = ({
  isShowPageNumberInFirstRow,
  pageCursor,
  product,
  pageMode,
  totalPages,
  isSinglePage,
  noOfPageCursors,
  onPageChange,
  isCoverPage = false,
  isFirstPage,
  pageNumbers,
  foldType,
}: PaginationDisplayProps) => {
  // First row content
  let firstRowContent: React.ReactNode = null
  if (isShowPageNumberInFirstRow) {
    firstRowContent = <PageNumber>Page {pageCursor + 1}</PageNumber>
  } else {
    firstRowContent = (
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
  }

  // Second row content (page number text or cover info)
  const secondRowContent = ((!isShowPageNumberInFirstRow && pageNumbers) ||
    isCoverPage) && (
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
  )

  return (
    <>
      <FirstRowContentWrapper>{firstRowContent}</FirstRowContentWrapper>
      {secondRowContent}
    </>
  )
}
