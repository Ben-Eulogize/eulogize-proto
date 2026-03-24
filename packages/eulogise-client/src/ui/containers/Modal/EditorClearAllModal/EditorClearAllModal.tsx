import React from 'react'
import {
  Button,
  ButtonType,
  HeaderTextLG,
  Modal,
  Text,
} from '@eulogise/client-components'
import styled from 'styled-components'
import {
  COLOR,
  DEVICES,
  SCREEN_SIZE,
  useBreakpoint,
} from '@eulogise/client-core'
import {
  DrawerId,
  EulogiseProduct,
  ICardProductData,
  IEditorClearAllConfirmOption,
  IGenericCardProductData,
  IModalState,
  ModalId,
} from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import { clearPagesContentByPageIndexes } from '../../../store/CardProduct/actions'
import { CardProductHelper } from '@eulogise/helpers'
import {
  useCaseState,
  useEulogiseDispatch,
  useModalState,
  useProductState,
} from '../../../store/hooks'
import { openDrawerAction } from '../../../store/DrawerState/actions'

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 80%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
  }
`

const StyledEditorClearAllModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    text-align: center;
    .ant-modal-close-x {
      color: ${COLOR.WHITE};
    }
  }
`

const HeaderText = styled(HeaderTextLG)`
  margin-bottom: 2rem;
`
const Paragraph = styled(Text)`
  display: block;
  margin-bottom: 0.4rem;
`

const CompleteConfirmModalContent = styled.div`
  margin: 2rem 0;
`

const StyledButton = styled(Button)`
  margin: 0.5rem auto;
  ${SCREEN_SIZE.TABLET} {
    margin: 0.5rem;
  }
`

interface IEditorClearAllModalProps {}

const EditorClearAllModal: React.FC<IEditorClearAllModalProps> = () => {
  const dispatch = useEulogiseDispatch()

  const modalState: IModalState = useModalState()
  const {
    options: {
      product,
      genericProductType,
      leftPageIndex,
      rightPageIndex,
      currentPageCursor,
      isShowClearAllPage = true,
      isShowClearCurrentPage = true,
    },
  } = modalState as { options: IEditorClearAllConfirmOption }
  // @ts-ignore
  const { activeItem: activeCase, isUpdating }: ICaseState = useCaseState()

  const region = activeCase?.region
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK

  const { activeItem: activeProductItem, activeProductTheme: productTheme } =
    useProductState({ product, slug: genericProductType?.slug })

  const cardProduct = activeProductItem as ICardProductData

  const screenSize = useBreakpoint()

  const isSinglePageShowed = screenSize !== DEVICES.DESKTOP

  const onCloseClearAllModal = () => {
    dispatch(hideModalAction(ModalId.EDITOR_CLEAR_ALL))
  }

  const onClearCurrentPage = async ({
    product,
    leftPageIndex,
    rightPageIndex,
    currentPageCursor,
  }: {
    product: EulogiseProduct
    leftPageIndex: number | undefined
    rightPageIndex: number | undefined
    currentPageCursor: number
  }) => {
    let blankPagesIndexes: Array<Number> = []

    if (!isSinglePageShowed) {
      if (leftPageIndex !== undefined) {
        blankPagesIndexes.push(leftPageIndex)
      }
      if (rightPageIndex !== undefined) {
        blankPagesIndexes.push(rightPageIndex)
      }
    } else {
      blankPagesIndexes = [currentPageCursor]
    }
    dispatch(
      clearPagesContentByPageIndexes({
        product,
        cardProduct,
        blankPagesIndexes,
        newRowsData: CardProductHelper.createBlankTextRows({
          product,
          productTheme,
          region,
          genericProductMetadata: (cardProduct as IGenericCardProductData)
            ?.content?.metadata,
        }),
      }),
    )
    dispatch(hideModalAction(ModalId.EDITOR_CLEAR_ALL))
  }

  const onClearAllPages = ({ product }: { product: EulogiseProduct }) => {
    const blankPagesIndexes: Array<Number> = Array.from(
      Array(cardProduct?.content?.pages?.length).keys(),
    )

    dispatch(
      clearPagesContentByPageIndexes({
        product,
        cardProduct,
        blankPagesIndexes,
        newRowsData: CardProductHelper.createBlankTextRows({
          product,
          productTheme,
          region,
          genericProductMetadata: (cardProduct as IGenericCardProductData)
            ?.content?.metadata,
        }),
      }),
    )
    dispatch(hideModalAction(ModalId.EDITOR_CLEAR_ALL))
  }

  const onRestartProject = () => {
    dispatch(hideModalAction(ModalId.EDITOR_CLEAR_ALL))
    dispatch(openDrawerAction(DrawerId.PHOTOBOOK_DRAWER))
  }

  return (
    <StyledEditorClearAllModal
      isOpen
      footer={null}
      width="800px"
      onCloseClick={() => dispatch(hideModalAction(ModalId.EDITOR_CLEAR_ALL))}
    >
      <CompleteConfirmModalContent>
        <HeaderText>Clear All</HeaderText>
        <Paragraph>
          Would you like to remove all text and photos from the current page or
          all pages?
        </Paragraph>
        <ButtonsContainer>
          {isShowClearCurrentPage && (
            <StyledButton
              buttonType={ButtonType.PRIMARY}
              onClick={() =>
                onClearCurrentPage({
                  product,
                  leftPageIndex,
                  rightPageIndex,
                  currentPageCursor,
                })
              }
            >
              Clear current page(s)
            </StyledButton>
          )}
          {isShowClearAllPage && (
            <StyledButton
              buttonType={ButtonType.OUTLINE}
              onClick={() => onClearAllPages({ product })}
            >
              Clear all pages
            </StyledButton>
          )}
          {isPhotobook && (
            <StyledButton
              buttonType={ButtonType.OUTLINE}
              onClick={() => onRestartProject()}
            >
              Restart Project
            </StyledButton>
          )}
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            onClick={onCloseClearAllModal}
          >
            Cancel
          </StyledButton>
        </ButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledEditorClearAllModal>
  )
}

export default EditorClearAllModal
