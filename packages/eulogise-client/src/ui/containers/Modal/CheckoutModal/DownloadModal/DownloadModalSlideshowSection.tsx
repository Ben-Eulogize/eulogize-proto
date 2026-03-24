import React, { useState } from 'react'
import { Button, ButtonType, Notification } from '@eulogise/client-components'
import {
  DownloadModalProductDetailAction,
  DownloadModalProductDetailLabel,
  DownloadModalProductDetailRow,
  DownloadModalTitleText,
} from './DownloadModal.styles'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
  useTvWelcomeScreenState,
} from '../../../../store/hooks'
import {
  EulogisePage,
  IAuthState,
  ICardProductState,
  ICaseState,
  ISlideshowState,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import { AccountHelper } from '@eulogise/helpers'
import {
  downloadSlideshow,
  generateSlideshow,
} from '../../../../store/SlideshowState/actions'
import { openSlideshowDrawer } from '../../../../store/DrawerState/actions'
import { CompleteConfirmModal } from '@eulogise/client-components'
import { showModalAction } from '../../../../store/ModalState/actions'
import { NavigationHelper } from '@eulogise/helpers'
import { AxiosProgressEvent } from 'axios'

interface IOrderOfServiceSlideshowModalSectionProps {
  onClose: () => void
}

const DownloadModalSlideshowSection: React.FC<
  IOrderOfServiceSlideshowModalSectionProps
> = ({ onClose }) => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>()
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const deceasedFullName = activeCase?.deceased?.fullName
  const { activeItem: activeSlideshow, isDownloading }: ISlideshowState =
    useSlideshowState()
  const { activeItem: activeTvWelcomeScreen }: ICardProductState =
    useTvWelcomeScreenState()
  const fileStatus: ResourceFileStatus = activeSlideshow?.fileStatus!
  const hasPaidAccess: boolean = AccountHelper.hasPaidAccess(
    account!,
    activeCase,
  )
  const caseId: string = activeCase?.id

  return (
    <>
      <DownloadModalTitleText>Memorial Tribute Video</DownloadModalTitleText>
      {!activeSlideshow ? (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            Create a memorial Tribute Video
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            <Button
              buttonType={ButtonType.TRANSPARENT}
              noMarginLeft
              noMarginRight
              onClick={() => {
                onClose()
                NavigationHelper.navigate(EulogisePage.DASHBOARD)
                dispatch(openSlideshowDrawer())
              }}
              block
            >
              Create slideshow
            </Button>
          </DownloadModalProductDetailAction>
        </DownloadModalProductDetailRow>
      ) : fileStatus === ResourceFileStatus.PROCESSING ? (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            <strong>Your video is now processing</strong>
            <br />
            This can take 5-15 minutes depending on the length of your video and
            internet speed. You are able to close this window and work on other
            tributes. We will send you an email when your video is ready to
            download.
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            <Button
              noMarginLeft
              noMarginRight
              disabled
              buttonType={ButtonType.TRANSPARENT}
              loading
            >
              Processing
            </Button>
          </DownloadModalProductDetailAction>
        </DownloadModalProductDetailRow>
      ) : (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            Download your Memorial Tribute Video
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            {!hasPaidAccess ? (
              <Button noMarginLeft noMarginRight>
                Please checkout first
              </Button>
            ) : fileStatus === ResourceFileStatus.GENERATED ? (
              <Button
                noMarginLeft
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
                            ((progressEvent?.progress ?? 0) * 100)?.toFixed(2),
                          )}`,
                        ),
                    }),
                  )
                }}
              >
                Download
              </Button>
            ) : (
              <>
                <Button
                  noMarginLeft
                  noMarginRight
                  onClick={() => {
                    setIsOpenConfirmModal(true)
                  }}
                >
                  Process Slideshow
                </Button>
                <CompleteConfirmModal
                  isOpen={isOpenConfirmModal}
                  onClose={() => setIsOpenConfirmModal(false)}
                  onCompleteClick={() => {
                    setIsOpenConfirmModal(false)
                    dispatch(
                      generateSlideshow({
                        caseId,
                        slideshowId: activeSlideshow.id!,
                        tvWelcomeScreenId: activeTvWelcomeScreen?.id,
                      }),
                    )
                  }}
                  onShareClick={() => {
                    setIsOpenConfirmModal(false)
                    dispatch(showModalAction(ModalId.SHARE_SLIDESHOW))
                  }}
                  onKeepEditingClick={() => {
                    setIsOpenConfirmModal(false)
                    onClose()
                    NavigationHelper.navigate(EulogisePage.EDIT_SLIDESHOW, {
                      slideshowId: activeSlideshow.id,
                    })
                  }}
                />
              </>
            )}
          </DownloadModalProductDetailAction>
        </DownloadModalProductDetailRow>
      )}
    </>
  )
}

export default DownloadModalSlideshowSection
