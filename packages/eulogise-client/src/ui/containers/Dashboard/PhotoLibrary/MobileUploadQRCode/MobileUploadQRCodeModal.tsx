import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Modal } from '@eulogise/client-components'
import { ModalId } from '@eulogise/core'
import { useEulogiseDispatch } from '../../../../store/hooks'
import { hideModalAction } from '../../../../store/ModalState/actions'
import { STYLE } from '@eulogise/client-core'
import MobileUploadQRCode from './MobileUploadQRCode'

const MobileUploadModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MobileUploadModalTitle = styled.div``

const MobileUploadModalContainer = styled.div`
  padding: 0px 32px;
  text-align: center;
`

const MobileUploadModalQRCodeText = styled.div`
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
`

const MobileUploadModalQRCodeContainer = styled.div`
  margin: 24px 0;
`

interface IMobileUploadQRCodeModal {
  qRCodeLink: string | null
}

const MobileUploadQRCodeModal = ({ qRCodeLink }: IMobileUploadQRCodeModal) => {
  const dispatch = useEulogiseDispatch()
  useEffect(() => {}, [])

  const close = () => {
    setTimeout(() => {
      dispatch(hideModalAction(ModalId.MOBILE_UPLOAD_QR_CODE))
    }, 50)
  }

  if (!qRCodeLink) {
    return null
  }

  return (
    <Modal
      footer={null}
      title={
        <MobileUploadModalHeader>
          <MobileUploadModalTitle>
            Upload photos from your mobile
          </MobileUploadModalTitle>
        </MobileUploadModalHeader>
      }
      isOpen
      onCloseClick={close}
    >
      <MobileUploadModalContainer>
        <MobileUploadModalQRCodeText>
          Quickly add photos to your photo library from your mobile
        </MobileUploadModalQRCodeText>
        <MobileUploadModalQRCodeContainer>
          <MobileUploadQRCode qRCodeLink={qRCodeLink} />
        </MobileUploadModalQRCodeContainer>
        <MobileUploadModalQRCodeText>
          Simply point your camera at the QR code above
        </MobileUploadModalQRCodeText>
        <MobileUploadModalQRCodeText>
          Then select your photos
        </MobileUploadModalQRCodeText>
      </MobileUploadModalContainer>
    </Modal>
  )
}

export default MobileUploadQRCodeModal
