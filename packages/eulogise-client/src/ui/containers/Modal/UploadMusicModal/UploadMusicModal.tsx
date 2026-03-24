import React, { useState } from 'react'
import styled from 'styled-components'
import { PickerInline } from 'filestack-react'

import {
  Button,
  ButtonType,
  ConfirmModal,
  ConfirmModalStatus,
  Modal,
  Spin,
} from '@eulogise/client-components'
import { EulogiseClientConfig, STYLE } from '@eulogise/client-core'
import { useCaseState, useEulogiseDispatch } from '../../../store/hooks'
import { saveAudioFromFileStack } from '../../../store/AssetState/actions'
import { IAudioAssetContent, ICaseState } from '@eulogise/core'
import {
  attachAudiosToSlideshow,
  replaceAudiosFromSlideshow,
} from '../../../store/SlideshowState/actions'
import { PickerFileMetadata } from 'filestack-js'

interface IUploadMusicModalProps {
  isOpen?: boolean
  onClose: () => void
}

const UploadingMessageContainer = styled.div`
  display: flex;
  align-items: center;
`

const UploadingMessage = styled.div`
  font-size: ${STYLE.FONT_SIZE_MD};
  padding-left: ${STYLE.GUTTER};
`

const UploadMusicModal: React.FunctionComponent<IUploadMusicModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [uploadedAudioContents, setUploadedAudioContents] = useState<
    Array<IAudioAssetContent>
  >([])
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id!
  const close = () => {
    setUploadedAudioContents([])
    setIsShowConfirmModal(false)
    onClose()
  }
  return (
    <>
      <Modal
        footer={null}
        isOpen={isOpen!}
        onCloseClick={close}
        title="Upload Music"
        closeIcon={
          <Button
            key="close"
            buttonType={ButtonType.TRANSPARENT}
            noMarginRight
            onClick={close}
          >
            Cancel
          </Button>
        }
      >
        {!isSaving && uploadedAudioContents.length === 0 ? (
          <PickerInline
            apikey={EulogiseClientConfig.FILESTACK_API_KEY}
            pickerOptions={{
              disableAltText: true,
              accept: 'audio/*',
              fromSources: [
                'local_file_system',
                'googledrive',
                'dropbox',
                'gmail',
              ],
              storeTo: {
                location: 's3',
                path: `/cases/${caseId}/audio/`,
                container: EulogiseClientConfig.AWS_S3_BUCKET,
                region: EulogiseClientConfig.AWS_REGION,
              },
              uploadInBackground: false,
              exposeOriginalFile: true,
              maxFiles: 1,
            }}
            onSuccess={(res) => console.log('upload success', res)}
            onUploadDone={({
              filesUploaded,
            }: {
              filesUploaded: Array<PickerFileMetadata>
            }) => {
              const fileUploaded = filesUploaded?.[0]
              if (!fileUploaded) {
                return
              }
              setIsSaving(true)
              dispatch(
                saveAudioFromFileStack({
                  caseId,
                  file: fileUploaded,
                  onSuccess: (audio: IAudioAssetContent) => {
                    setIsShowConfirmModal(true)
                    setIsSaving(false)
                    setUploadedAudioContents([audio])
                  },
                }),
              )
            }}
          />
        ) : (
          <UploadingMessageContainer>
            <Spin />
            <UploadingMessage>Uploading...</UploadingMessage>
          </UploadingMessageContainer>
        )}
      </Modal>
      {uploadedAudioContents.length > 0 && (
        <ConfirmModal
          isOpen={isShowConfirmModal}
          onClose={() => close()}
          footer={
            <>
              <Button
                buttonType={ButtonType.TRANSPARENT}
                noMarginRight
                onClick={() => close()}
              >
                Don't Add
              </Button>
              <Button
                noMarginRight
                onClick={() => {
                  dispatch(
                    replaceAudiosFromSlideshow({
                      audios: uploadedAudioContents,
                    }),
                  )
                  close()
                }}
              >
                Replace Track
              </Button>
              <Button
                noMarginRight
                onClick={() => {
                  dispatch(
                    attachAudiosToSlideshow({ audios: uploadedAudioContents }),
                  )
                  close()
                }}
              >
                Add Track
              </Button>
            </>
          }
          status={ConfirmModalStatus.SUCCESS}
          title="Audio uploaded successfully"
          text="Would you like to add your new music to your video?"
        />
      )}
    </>
  )
}

export default UploadMusicModal
