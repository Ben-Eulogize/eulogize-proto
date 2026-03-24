import React from 'react'
import {
  Modal,
  HeaderTextLG,
  Text,
  Button,
  ButtonType,
  Notification,
} from '@eulogise/client-components'
import styled from 'styled-components'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'
import {
  IModalState,
  ModalId,
  IAllActiveCardProducts,
  ICardProductPage,
  ICardProductRow,
  CardProductContentItemType,
  ISlideshowState,
  ISlideshowData,
  SlideType,
  EulogiseProduct,
  IReplaceEditedImageConfirmOption,
  ICardProductImageRow,
  ISlide,
} from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useAllActiveCardProducts,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useEulogiseDispatch,
  useModalState,
  useSlideshowState,
} from '../../../store/hooks'
import { saveCardProduct } from '../../../store/CardProduct/actions'
import { closeDrawerAction } from '../../../store/DrawerState/actions'
import { saveSlidesToSlideshowByCaseId } from '../../../store/SlideshowState/actions'

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 80%;
  flex-direction: column;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
  }
`

const StyledReplaceEditedImageConfirmModal = styled(Modal)`
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

interface IReplaceEditedImageConfirmModal {}

const ReplaceEditedImageConfirmModal: React.FC<
  IReplaceEditedImageConfirmModal
> = () => {
  const dispatch = useEulogiseDispatch()
  const modalState: IModalState = useModalState()
  const {
    options: {
      editingImageContent,
      newEditedImageContent,
      updatedCardProducts,
      needUpdateSlideshow,
    },
  } = modalState as { options: IReplaceEditedImageConfirmOption }
  // @ts-ignore
  const { activeItem: activeCase, isUpdating }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()

  const allActiveCardProducts: IAllActiveCardProducts =
    useAllActiveCardProducts(allAvailableCardProducts)

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!

  const onMakeReplaceEditedImage = async () => {
    // Update card products
    updatedCardProducts.forEach((p: keyof IAllActiveCardProducts) => {
      if (allActiveCardProducts?.[p]) {
        const pages: Array<ICardProductPage> =
          allActiveCardProducts[p]?.content?.pages!
        const updatedPages: Array<ICardProductPage> = pages.map(
          (p: ICardProductPage) => {
            return {
              ...p,
              rows: p.rows.map((r: ICardProductRow) => {
                // update single image row
                if (
                  r.type === CardProductContentItemType.IMAGE &&
                  r?.data?.filestackHandle ===
                    editingImageContent?.filestackHandle
                ) {
                  return {
                    ...r,
                    data: {
                      ...r.data,
                      ...newEditedImageContent,
                    },
                  }
                }
                // update column images
                else if (
                  r.type === CardProductContentItemType.COLUMNS &&
                  r?.data?.items
                ) {
                  const updatedColumnRow: Array<ICardProductImageRow> =
                    r?.data?.items?.map((item: ICardProductImageRow) => {
                      if (
                        item?.data?.filestackHandle ===
                        editingImageContent?.filestackHandle
                      ) {
                        return {
                          ...item,
                          data: {
                            ...item?.data,
                            ...newEditedImageContent,
                          },
                        }
                      }
                      return item
                    })
                  return {
                    ...r,
                    data: {
                      ...r?.data,
                      items: updatedColumnRow,
                    },
                  }
                }
                return r
              }),
            }
          },
        )
        dispatch(
          saveCardProduct({
            product: p,
            cardProduct: {
              ...allActiveCardProducts[p]!,
              content: {
                ...allActiveCardProducts[p]?.content!,
                pages: updatedPages!,
              },
              case: caseId,
            },
            onSuccess: () => null,
          }),
        )
      }
    })
    // Update slideshow
    if (needUpdateSlideshow) {
      const slides: Array<ISlide> = slideshowData?.content?.slides

      const updatedSlides: Array<ISlide> = slides.map((slide: ISlide) => {
        if (
          slide?.slideType === SlideType.IMAGE_SLIDE &&
          slide?.image?.filestackHandle === editingImageContent?.filestackHandle
        ) {
          return {
            ...slide,
            image: newEditedImageContent,
          }
        }
        return slide
      })
      dispatch(
        saveSlidesToSlideshowByCaseId({
          caseId,
          slideshowData,
          slides: updatedSlides,
        }),
      )
    }
    Notification.success(`Photo Updated.`)
    dispatch(closeDrawerAction())
    dispatch(hideModalAction(ModalId.REPLACE_EDITED_IMAGE_CONFIRM))
  }

  const onCloseModal = () => {
    dispatch(hideModalAction(ModalId.REPLACE_EDITED_IMAGE_CONFIRM))
  }

  return (
    <StyledReplaceEditedImageConfirmModal
      isOpen
      footer={null}
      width="800px"
      onCloseClick={() =>
        dispatch(hideModalAction(ModalId.REPLACE_EDITED_IMAGE_CONFIRM))
      }
    >
      <CompleteConfirmModalContent>
        <HeaderText>Image currently in use</HeaderText>
        <Paragraph>
          This image is currently selected in one or more memorials.
        </Paragraph>
        <Paragraph>
          Would you like to replace the original image with the edit in all
          memorials.
        </Paragraph>
        <ButtonsContainer>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            onClick={onMakeReplaceEditedImage}
          >
            Yes, Replace all versions
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            block
            onClick={onCloseModal}
          >
            Do not replace
          </StyledButton>
        </ButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledReplaceEditedImageConfirmModal>
  )
}

export default ReplaceEditedImageConfirmModal
