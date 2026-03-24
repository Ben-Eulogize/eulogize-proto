import React from 'react'
import styled from 'styled-components'
import { Button, Modal } from '@eulogise/client-components'
import { ModalId } from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import { useEulogiseDispatch } from '../../../store/hooks'
import { STYLE } from '@eulogise/client-core'

const STORAGE_KEY = 'system-upgrade-notification-dismissed'
const ModalContent = styled.div`
  font-size: ${STYLE.FONT_SIZE_MD};
`

const SystemUpgradeNotificationModal: React.FC = () => {
  const dispatch = useEulogiseDispatch()

  const onClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    dispatch(hideModalAction(ModalId.SYSTEM_UPGRADE_NOTIFICATION))
  }

  return (
    <Modal
      isOpen
      title="System Upgrade Notice"
      isShowCloseIcon={false}
      onOkClick={onClose}
      footer={
        <Button key="confirm" noMarginRight onClick={onClose}>
          Confirm
        </Button>
      }
    >
      <ModalContent>
        <p>
          Due to a system upgrade on 16 January 2026, photos uploaded before
          this time may not be compatible with new videos.
        </p>
        <p>
          If you uploaded your photos before this date, we suggest re-uploading
          photos to your account.
        </p>
        <p>Printed products will not be affected, only new video downloads.</p>
      </ModalContent>
    </Modal>
  )
}

export default SystemUpgradeNotificationModal
