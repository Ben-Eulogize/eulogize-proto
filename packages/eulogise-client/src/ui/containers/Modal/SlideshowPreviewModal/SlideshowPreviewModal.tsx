import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  Modal,
  Notification,
} from '@eulogise/client-components'
import SlideshowPlayer from '../../Slideshow/SlideshowPlayer'
import {
  useCaseState,
  useEulogiseDispatch,
  useModalState,
  useSlideshowState,
} from '../../../store/hooks'
import {
  hideModalAction,
  showModalAction,
} from '../../../store/ModalState/actions'
import {
  EulogiseProduct,
  EulogiseRegion,
  IModalState,
  IPreviewModalOption,
  MemorialVisualStatus,
  ModalId,
} from '@eulogise/core'
import {
  downloadSlideshow,
  fetchSlideshowsByCaseId,
} from '../../../store/SlideshowState/actions'
import { VideoDurationMessage } from '../../SlideshowInfo/VideoDurationMessage'
import { NoOfSlidesMessage } from '../../SlideshowInfo/NoOfSlidesMessage'
import { SlideWarning } from '../../SlideshowInfo/SlideWarning'
import { COLOR, DEVICES, STYLE, useBreakpoint } from '@eulogise/client-core'
import { reeditProductAction } from '../../../store/AdminState/actions'
import { PreviewModalHeader } from '../PreviewModalHeader'
import { SlideshowHelper } from '@eulogise/helpers'
import { useOrientation } from '../../../hooks/useOrientation'
import { fetchCardProductsByCaseId } from '../../../store/CardProduct/actions'
import { AxiosProgressEvent } from 'axios'

interface ISlideshowPreviewModalProps {}

const SlideshowPreviewModalFooter = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: end;
`

const SlideshowPreviewModalFooterLeft = styled.div`
  color: ${COLOR.CORNFLOWER_BLUE};
`

const SlideshowPreviewModalFooterRight = styled.div`
  flex: 1;
  text-align: right;
`

const SlideshowPlayerContainer = styled.div``

const StyledFastSlideWarning = styled(SlideWarning)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const SlideshowInfo = styled.div`
  margin-top: 20px;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const KeepEditingButton = styled(Button)``

const FullScreenSlideshowPlayerContainer = styled.div<{
  $isFullScreen: boolean
}>`
  ${({ $isFullScreen }) =>
    $isFullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${COLOR.BLACK};
    z-index: 1000;
    display: flex;
    align-items: center;
  `}
`

const SlideshowPreviewModal: React.FC<ISlideshowPreviewModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const screenSize = useBreakpoint()
  const orientation = useOrientation()
  const modalState: IModalState = useModalState()
  const { activeItem: activeCase } = useCaseState()
  const deceasedFullName = activeCase?.deceased?.fullName
  const { isDownloading } = useSlideshowState()
  const options = modalState.options as IPreviewModalOption
  const isShareFlow = options.isShareFlow
  // const userRole: EulogiseUserRole = useUserRole()!
  const caseId = activeCase?.id!
  const region = activeCase?.region!
  const { activeItem: activeSlideshow, activeSlideshowTheme: slideshowTheme } =
    useSlideshowState()
  /*
  const hasTitleSlide =
    activeSlideshow &&
    (!!SlideshowHelper.hasStartTitleSlide(activeSlideshow) ||
      !!SlideshowHelper.hasEndTitleSlide(activeSlideshow))
*/

  /*
  if (!userRole) {
    return null
  }
*/

  useEffect(() => {
    if (isShareFlow) {
      return
    }
    dispatch(
      fetchSlideshowsByCaseId({
        caseId,
        callback: () => {
          dispatch(
            fetchCardProductsByCaseId({
              product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
              caseId,
              region: EulogiseRegion.AU,
            }),
          )
        },
      }),
    )
  }, [isShareFlow])

  if (!activeSlideshow) {
    return null
  }

  const showFooter: boolean =
    options?.showFooter === undefined ? true : options?.showFooter
  const close = () => dispatch(hideModalAction(ModalId.SLIDESHOW_PREVIEW))
  const noOfSlides = SlideshowHelper.getTotalActiveImageSlides(activeSlideshow!)

  const isFullScreen =
    (screenSize === DEVICES.MOBILE || screenSize === DEVICES.TABLET) &&
    (orientation === 'landscape-primary' ||
      orientation === 'landscape-secondary')
  return (
    <Modal isOpen isShowCloseIcon={false} footer={null} width={688}>
      <SlideshowPlayerContainer>
        <PreviewModalHeader
          left={
            options?.showKeepEditingButton &&
            (activeSlideshow.status === MemorialVisualStatus.DOWNLOAD ||
              activeSlideshow.status === MemorialVisualStatus.COMPLETE) && (
              <KeepEditingButton
                buttonType={ButtonType.SECONDARY}
                noMarginLeft
                onClick={() => {
                  const slideshowId = activeSlideshow?.id!
                  dispatch(
                    reeditProductAction({
                      product: EulogiseProduct.SLIDESHOW,
                      productId: slideshowId,
                      region,
                    }),
                  )
                }}
              >
                Keep editing
              </KeepEditingButton>
            )
          }
          onCloseClick={() => {
            close()
          }}
        >
          {options?.isEditing && (
            <StyledFastSlideWarning slideshowData={activeSlideshow} />
          )}
        </PreviewModalHeader>
        <FullScreenSlideshowPlayerContainer $isFullScreen={isFullScreen}>
          <SlideshowPlayer isFullScreen={isFullScreen} />
        </FullScreenSlideshowPlayerContainer>
        <SlideshowInfo>
          <VideoDurationMessage
            slideshowData={activeSlideshow}
            slideshowTheme={slideshowTheme!}
            noTitle={false}
          />
          <NoOfSlidesMessage noOfSlides={noOfSlides} />
        </SlideshowInfo>
        {showFooter ? (
          <SlideshowPreviewModalFooter>
            <SlideshowPreviewModalFooterLeft>
              Note: Preview may play at lower quality than final download
            </SlideshowPreviewModalFooterLeft>
            <SlideshowPreviewModalFooterRight>
              {options?.showDownloadButton && (
                <Button
                  noMarginRight
                  loading={isDownloading}
                  onClick={() => {
                    if (!caseId || !deceasedFullName) {
                      Notification.error(
                        'Cannot download the slideshow, please contact Eulogize admin.',
                      )
                      return
                    }
                    dispatch(
                      downloadSlideshow({
                        caseId,
                        deceasedName: deceasedFullName,
                        onProgress: (progressEvent: AxiosProgressEvent) =>
                          console.log(
                            `Downloading slideshow, progress precentage: ${Number(
                              ((progressEvent?.progress ?? 0) * 100)?.toFixed(
                                2,
                              ),
                            )}`,
                          ),
                      }),
                    )
                  }}
                >
                  Download
                </Button>
              )}
              <Button
                noMarginRight
                onClick={() =>
                  dispatch(
                    showModalAction(ModalId.SHARE_SLIDESHOW, {
                      // needs to pass in all the Preview Modal options
                      // otherwise the preview modal settings will be appeared
                      // while showing the Share Slideshow modal
                      ...options,
                    }),
                  )
                }
              >
                Share
              </Button>
            </SlideshowPreviewModalFooterRight>
          </SlideshowPreviewModalFooter>
        ) : null}
      </SlideshowPlayerContainer>
    </Modal>
  )
}

export default SlideshowPreviewModal
