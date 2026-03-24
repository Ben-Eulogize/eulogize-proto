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
  ModalId,
  ICaseState,
  IRemoveImageBackgroundOption,
  AssetType,
  RemoveBackgroundImageMode,
  ISlide,
  ISlideshowData,
  ISlideshowState,
} from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useCaseState,
  useEulogiseDispatch,
  useModalState,
  useSlideshowState,
} from '../../../store/hooks'
import {
  fetchAssetsByCaseId,
  removeImageBackground,
} from '../../../store/AssetState/actions'
import { SlideshowHelper } from '@eulogise/helpers'
import {
  saveSlidesToSlideshowByCaseId,
  updateSlides,
} from '../../../store/SlideshowState/actions'

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

const StyledRemoveBackgroundModal = styled(Modal)`
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

interface IRemoveBackgroundModalProps {}

const RemoveBackgroundModal: React.FC<IRemoveBackgroundModalProps> = () => {
  const dispatch = useEulogiseDispatch()

  const { activeItem: activeCase }: ICaseState = useCaseState()

  const caseId: string = activeCase?.id!

  const { options } = useModalState()
  const removeBackgroundImageAssetId: string | undefined = (
    options as IRemoveImageBackgroundOption
  )?.assetId

  const removingImageBackgroundImageIndex: number | undefined = (
    options as IRemoveImageBackgroundOption
  )?.removingImageBackgroundImageIndex

  const removingImageBackgroundImageFilestackHandle: string | undefined = (
    options as IRemoveImageBackgroundOption
  )?.assetFilestackHandle

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides

  const onClose = () => {
    dispatch(hideModalAction(ModalId.REMOVE_IMAGE_BACKGROUND))
  }

  const onRemoveImageBackground = (mode: RemoveBackgroundImageMode) => {
    if (
      !removeBackgroundImageAssetId ||
      removingImageBackgroundImageIndex < 0 ||
      !removingImageBackgroundImageFilestackHandle ||
      !caseId ||
      !mode
    ) {
      Notification.error('Failed to remove image background')
      return
    }
    dispatch(hideModalAction(ModalId.REMOVE_IMAGE_BACKGROUND))
    dispatch(
      removeImageBackground({
        assetId: removeBackgroundImageAssetId,
        assetType: AssetType.IMAGE,
        removingImageBackgroundImageIndex: removingImageBackgroundImageIndex,
        mode,
        onSuccess: () => {
          dispatch(fetchAssetsByCaseId({ caseId, assetType: AssetType.IMAGE }))
          Notification.success('Image background removed.')
          if (
            mode === RemoveBackgroundImageMode.KEEP_NEW_IMAGE_ONLY &&
            removingImageBackgroundImageFilestackHandle
          ) {
            const originalImageSlide = slides?.find((slide: ISlide) => {
              return (
                slide.image?.filestackHandle ===
                removingImageBackgroundImageFilestackHandle
              )
            })

            if (originalImageSlide) {
              const newSlides: Array<ISlide> = SlideshowHelper.removeSlide(
                slides,
                originalImageSlide,
              )
              dispatch(updateSlides({ slides: newSlides }))
              dispatch(
                saveSlidesToSlideshowByCaseId({
                  caseId,
                  slideshowData,
                  slides: newSlides,
                  onSuccess: () => {
                    Notification.success('Slideshow saved.')
                  },
                }),
              )
            }
          }
        },
      }),
    )
  }

  return (
    <StyledRemoveBackgroundModal
      isOpen
      footer={null}
      width="800px"
      onCloseClick={() =>
        dispatch(hideModalAction(ModalId.REMOVE_IMAGE_BACKGROUND))
      }
    >
      <CompleteConfirmModalContent>
        <HeaderText>Remove Image Background</HeaderText>
        <Paragraph>
          Would you like to keep the original image in your photo library in
          addition to the new cut out?
        </Paragraph>
        <ButtonsContainer>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            onClick={() =>
              onRemoveImageBackground(
                RemoveBackgroundImageMode.KEEP_NEW_AND_OLD_IMAGES,
              )
            }
          >
            Keep Both
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            onClick={() =>
              onRemoveImageBackground(
                RemoveBackgroundImageMode.KEEP_NEW_IMAGE_ONLY,
              )
            }
          >
            Only Keep New Photo
          </StyledButton>
          <StyledButton buttonType={ButtonType.OUTLINE} onClick={onClose}>
            Cancel
          </StyledButton>
        </ButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledRemoveBackgroundModal>
  )
}

export default RemoveBackgroundModal
