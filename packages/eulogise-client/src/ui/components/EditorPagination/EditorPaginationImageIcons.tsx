import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageMode,
  EulogiseProduct,
  GenericCardProductTypeFoldType,
  GUIDE_SHOW_UP_PAGE,
} from '@eulogise/core'
import { Tooltip } from '@eulogise/client-components'
import iconBookletFrontActive from '../../assets/editorPagination/icons/booklet-front-active.svg'
import iconBookletFront from '../../assets/editorPagination/icons/booklet-front.svg'
import iconBookletOpenActive from '../../assets/editorPagination/icons/booklet-open-active.svg'
import iconBookletOpen from '../../assets/editorPagination/icons/booklet-open.svg'
import iconBookletBackActive from '../../assets/editorPagination/icons/booklet-back-active.svg'
import iconBookletBack from '../../assets/editorPagination/icons/booklet-back.svg'
import { CardProductHelper, UtilHelper } from '@eulogise/helpers'
import { GuidePopover } from '../GuidePopover/GuidePopover'

const StyledPaginationImageIconsContainer = styled.div<{
  product?: EulogiseProduct
  isFirstOrLastPageCursor: boolean
}>`
  display: inline-block;
  padding: 0.25rem;
`

const StyledPaginationButton = styled.span<{ isClickable?: boolean }>`
  padding: 0 0.25rem;
  ${({ isClickable }) =>
    isClickable &&
    `
  cursor: pointer;
  `}
`

interface IEditorPaginationImageIconsProps {
  pageMode: CardProductPageMode
  product: EulogiseProduct
  foldType?: GenericCardProductTypeFoldType
  totalPages: number
  pageCursor: number
  noOfPageCursors: number
  onPageChange?: (pc: number) => void
  isSinglePage: boolean
  className?: string
  noOfHighlightCursors?: number
}

const EditorPaginationImageIcons: React.FC<
  IEditorPaginationImageIconsProps
> = ({
  product,
  foldType,
  noOfPageCursors,
  pageCursor,
  totalPages,
  isSinglePage,
  onPageChange,
  pageMode,
  className,
  noOfHighlightCursors = 1,
}) => {
  const hasFirstPageCursor: boolean = noOfPageCursors > 0
  const noOfMiddlePageCursors: number =
    foldType === GenericCardProductTypeFoldType.SINGLE_SIDE
      ? totalPages - 2
      : isSinglePage
      ? 0
      : (totalPages - 2) / 2
  const hasLastPageCursor: boolean = noOfPageCursors > 1
  // (totalPages - (cover and back)) / (noOfDisplayMidPagesPerCursor) + 1 = pageCursors
  const lastPageCursorIndex: number =
    CardProductHelper.getTotalPageCursors({
      product,
      foldType,
      totalPages,
      pageMode,
    })! - 1

  const highlightCursors: Array<number> = UtilHelper.times(
    (i: number) => i + pageCursor,
    noOfHighlightCursors,
  )

  const isFirstOrLastPageCursor: boolean =
    pageCursor === 0 || pageCursor === lastPageCursorIndex

  return (
    <StyledPaginationImageIconsContainer
      className={className}
      product={product}
      isFirstOrLastPageCursor={isFirstOrLastPageCursor}
    >
      <GuidePopover
        placedPage={GUIDE_SHOW_UP_PAGE.BOOKLET}
        showUpStepIndex={0}
        width={430}
      />
      <GuidePopover
        placedPage={GUIDE_SHOW_UP_PAGE.BOOKLET}
        showUpStepIndex={1}
        width={430}
      />
      <GuidePopover
        placedPage={GUIDE_SHOW_UP_PAGE.BOOKLET}
        showUpStepIndex={2}
        width={430}
      />
      {hasFirstPageCursor && (
        <StyledPaginationButton
          isClickable={!!onPageChange}
          onMouseDown={() => {
            if (onPageChange) {
              onPageChange(0)
            }
          }}
        >
          <Tooltip title={'First page'}>
            <img
              src={pageCursor === 0 ? iconBookletFrontActive : iconBookletFront}
              alt="1"
            />
          </Tooltip>
        </StyledPaginationButton>
      )}
      {UtilHelper.times((num: number) => {
        const cursor: number = num + 1
        const isHighlight = highlightCursors.includes(cursor)
        return (
          <StyledPaginationButton
            key={cursor}
            isClickable={!!onPageChange}
            onMouseDown={() => {
              if (onPageChange) {
                onPageChange(cursor)
              }
            }}
          >
            <Tooltip title={'Centre pages'}>
              <img
                src={
                  foldType === GenericCardProductTypeFoldType.SINGLE_SIDE
                    ? isHighlight
                      ? iconBookletFrontActive
                      : iconBookletFront
                    : isHighlight
                    ? iconBookletOpenActive
                    : iconBookletOpen
                }
                alt={`${cursor * 2} and ${cursor * 2 + 1}`}
              />
            </Tooltip>
          </StyledPaginationButton>
        )
      }, noOfMiddlePageCursors)}
      {hasLastPageCursor && (
        <StyledPaginationButton
          title="Last Page"
          isClickable={!!onPageChange}
          onMouseDown={() => {
            if (onPageChange) {
              onPageChange(lastPageCursorIndex)
            }
          }}
        >
          <Tooltip title={'Last page'}>
            <img
              src={
                foldType === GenericCardProductTypeFoldType.SINGLE_SIDE
                  ? pageCursor === lastPageCursorIndex
                    ? iconBookletFrontActive
                    : iconBookletFront
                  : pageCursor === lastPageCursorIndex
                  ? iconBookletBackActive
                  : iconBookletBack
              }
              alt={`${noOfPageCursors * 2 + 1}`}
            />
          </Tooltip>
        </StyledPaginationButton>
      )}
    </StyledPaginationImageIconsContainer>
  )
}

export default EditorPaginationImageIcons
