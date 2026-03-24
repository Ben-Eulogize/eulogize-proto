import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  IDoubleCardProductPageViewProps,
  Spin,
} from '@eulogise/client-components'
import { DoubleCardProductPageView } from '../../../../../eulogise-client-components/src/CardProductPage/DoubleCardProductPageView'
import { useEulogiseDispatch } from '../../store/hooks'
import {
  loadCardProductsFonts,
  moveCardProductContentToPage,
  reorderCardProductPageRows,
} from '../../store/CardProduct/actions'
import {
  CARD_PRODUCT_NORMAL_EDITOR_VERTICAL_PADDING_IN_REM,
  CARD_PRODUCT_THANK_YOU_CARD_EDITOR_VERTICAL_PADDING_IN_REM,
  CardProductPageColMode,
  EulogiseProduct,
  GUIDE_SHOW_UP_PAGE,
  ICardProductFrameScaleProps,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { MAX_CARD_PRODUCT_PHOTO_SIZE } from '@eulogise/helpers/dist/cardProduct.constants'

type ICardProductEditorProps = Omit<
  IDoubleCardProductPageViewProps,
  'onFocus' | 'onDragEnd' | 'pages' | 'colMode'
> & {
  loading?: boolean
  className?: string
  onRowFocused: (params: { rowId?: string; pageIndex: number }) => void
  hasSkippedOrFilledMemorialDataPullForm: boolean
  isRowAddActionButtonHighlighted?: boolean
  onOpenCopyLibraryDrawer: () => void
  editorScaledFactor: number
  currentStep?: number
  guideShowAt?: GUIDE_SHOW_UP_PAGE
  setUpdateSpacePageIndex?: number
  updateSpacePageIndex: (index: number) => void
  isCoverPage?: boolean
} & ICardProductFrameScaleProps

const StyledCardProductEditorContainer = styled.div<{
  $cardProductEditorPaddingInRem: number
}>`
  display: flex;
  flex-direction: column;
  ${({ $cardProductEditorPaddingInRem }) =>
    $cardProductEditorPaddingInRem &&
    `
      padding: ${$cardProductEditorPaddingInRem}rem 0
      ${$cardProductEditorPaddingInRem}rem 0;
  `}

  transition: background 300ms;
`

export const CardProductEditor: React.FunctionComponent<
  ICardProductEditorProps
> = (props: ICardProductEditorProps) => {
  const dispatch = useEulogiseDispatch()
  const {
    className,
    onRowFocused,
    loading,
    cardProduct,
    product,
    hasSkippedOrFilledMemorialDataPullForm,
    isRowAddActionButtonHighlighted,
    onOpenCopyLibraryDrawer,
    setUpdateSpacePageIndex,
    updateSpacePageIndex,
    editorScaledFactor,
    containerRef,
    currentStep,
    guideShowAt,
    ...doubleCardProductProps
  } = props
  const cardProductContent = cardProduct?.content
  const colMode: CardProductPageColMode =
    CardProductHelper.getPageColModeByPageSize(cardProductContent.pageSize)

  const cardProductEditorPaddingInRem =
    product === EulogiseProduct.THANK_YOU_CARD
      ? CARD_PRODUCT_THANK_YOU_CARD_EDITOR_VERTICAL_PADDING_IN_REM
      : CARD_PRODUCT_NORMAL_EDITOR_VERTICAL_PADDING_IN_REM

  useEffect(() => {
    loadCardProductsFonts()
  }, [])

  if (!cardProductContent) {
    return null
  }

  const handleDragEnd = (e: any) => {
    const { source, destination } = e
    // Dropped outside the list
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderCardProductPageRows({
          product,
          source,
          destination,
          cardProductContent,
        }),
      )
    } else {
      dispatch(
        moveCardProductContentToPage({
          product,
          source,
          destination,
          cardProductContent,
        }),
      )
    }
  }

  return (
    <StyledCardProductEditorContainer
      $cardProductEditorPaddingInRem={cardProductEditorPaddingInRem}
      style={{}}
      className={`${className ? className : ''} card-product-editor-container`}
    >
      {loading ? (
        <Spin />
      ) : (
        <DoubleCardProductPageView
          {...doubleCardProductProps}
          maxPhotoSize={MAX_CARD_PRODUCT_PHOTO_SIZE}
          isEnablePhotobookEdit={false}
          colMode={colMode}
          onDragEnd={handleDragEnd}
          cardProduct={cardProduct}
          product={product}
          pages={cardProductContent.pages}
          onFocus={(focusedParams) => onRowFocused(focusedParams)}
          hasSkippedOrFilledMemorialDataPullForm={
            hasSkippedOrFilledMemorialDataPullForm!
          }
          isRowAddActionButtonHighlighted={isRowAddActionButtonHighlighted}
          onOpenCopyLibraryDrawer={onOpenCopyLibraryDrawer}
          setUpdateSpacePageIndex={setUpdateSpacePageIndex}
          updateSpacePageIndex={updateSpacePageIndex}
          editorScaledFactor={editorScaledFactor}
          containerRef={containerRef}
          currentStep={currentStep}
          guideShowAt={guideShowAt}
        />
      )}
    </StyledCardProductEditorContainer>
  )
}
