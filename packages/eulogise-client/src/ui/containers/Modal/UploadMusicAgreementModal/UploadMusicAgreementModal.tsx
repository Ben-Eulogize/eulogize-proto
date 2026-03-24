import React from 'react'
import { ConfirmModalStatus } from '@eulogise/client-components'
import { ConfirmModal } from '@eulogise/client-components'

type IUploadMusicAgreementModalProps = {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export const UploadMusicAgreementModal = ({
  isOpen,
  onClose,
  onAccept,
}: IUploadMusicAgreementModalProps) => (
  <ConfirmModal
    status={ConfirmModalStatus.SUCCESS}
    isOpen={isOpen}
    confirmButtonText="Agree and Accept"
    title="User Uploaded Music"
    onConfirm={onAccept}
    onClose={onClose}
    text='By clicking "Agree and Accept," you represent that you have obtained all
    appropriate licenses for any music you upload to Eulogize, and you will
    defend, indemnify and hold harmless Eulogize and all of their respective
    owners, employees, agents, successors and assigns from any claims of third
    parties arising from your breach of this representation.'
  />
)
