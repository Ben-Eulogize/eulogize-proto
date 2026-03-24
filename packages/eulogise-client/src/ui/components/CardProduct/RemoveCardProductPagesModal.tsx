import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonGroup,
  ButtonSize,
  ButtonType,
  Modal,
  Text,
} from '@eulogise/client-components'
import {
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  GenericCardProductTypeFoldType,
  ICardProductData,
  IGenericCardProductData,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import EditorPaginationImageIcons from '../EditorPagination/EditorPaginationImageIcons'

interface IRemoveCardProductPagesModal {
  onClose: () => void
  onConfirm: () => void
  product: EulogiseProduct
  cardProduct: ICardProductData
  displayMode: CardProductViewDisplayMode
  removePages?: number
}

const StyledText = styled(Text)`
  margin: 0 0 1rem;
  display: block;
`

const StyledEditorPaginationImageIcons = styled(EditorPaginationImageIcons)`
  display: block;
  text-align: center;
  margin-top: 1rem;
`

const RemoveCardProductPagesModal = ({
  product,
  cardProduct,
  displayMode,
  onClose,
  onConfirm,
  removePages = 4,
}: IRemoveCardProductPagesModal) => {
  const pages = cardProduct?.content?.pages
  const noOfPages: number = pages.length
  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata
  const foldType = genericProductMetadata?.foldType
  const noOfHighlightCursors =
    foldType === GenericCardProductTypeFoldType.SINGLE_SIDE
      ? removePages
      : foldType === GenericCardProductTypeFoldType.TRIFOLD
      ? removePages / 3
      : removePages / 2
  const noOfPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    foldType,
    totalPages: noOfPages,
  })
  const pageMode: CardProductPageMode = CardProductHelper.getPageModeByPageSize(
    {
      pageSize: cardProduct.content?.pageSize,
      displayMode,
      foldType,
      product,
    },
  )
  const pageCursor =
    foldType === GenericCardProductTypeFoldType.SINGLE_SIDE
      ? noOfPageCursors! - 2
      : foldType === GenericCardProductTypeFoldType.TRIFOLD
      ? noOfPageCursors! - 3
      : noOfPageCursors! - 3
  const isSinglePage: boolean = noOfPageCursors === 2

  return (
    <Modal isOpen onCloseClick={onClose} footer={null}>
      <StyledText>Would you like to remove the following pages?</StyledText>
      <ButtonGroup isAlignRight>
        <Button
          buttonSize={ButtonSize.SM}
          buttonType={ButtonType.TRANSPARENT}
          onClick={onClose}
          noMarginRight
          noMarginLeft
        >
          Cancel
        </Button>
        <Button buttonSize={ButtonSize.SM} onClick={onConfirm}>
          Confirm
        </Button>
      </ButtonGroup>
      <StyledEditorPaginationImageIcons
        product={product}
        pageMode={pageMode}
        totalPages={noOfPages}
        isSinglePage={isSinglePage}
        foldType={foldType}
        noOfPageCursors={noOfPageCursors}
        pageCursor={pageCursor}
        noOfHighlightCursors={noOfHighlightCursors}
      />
    </Modal>
  )
}

export default RemoveCardProductPagesModal
