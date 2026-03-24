import React from 'react'
import styled from 'styled-components'
import { Button, ButtonType } from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import UploadMusicModal from '../../UploadMusicModal/UploadMusicModal'
import { useState } from 'react'
import { UploadMusicAgreementModal } from '../../UploadMusicAgreementModal/UploadMusicAgreementModal'

const StyledUploadSongButton = styled(Button).attrs({
  buttonType: ButtonType.PRIMARY,
  children: 'Upload a song',
  block: true,
  noMarginLeft: true,
  noMarginRight: true,
})`
  margin-bottom: ${STYLE.GUTTER};
  width: 100%;
  max-width: none;
`

const UploadSongButton = () => {
  const [isAgreementModalOpened, setIsAgreementModalOpened] =
    useState<boolean>(false)
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false)
  return (
    <>
      <StyledUploadSongButton onClick={() => setIsAgreementModalOpened(true)} />
      <UploadMusicAgreementModal
        isOpen={isAgreementModalOpened}
        onAccept={() => {
          setIsUploadModalOpened(true)
          setIsAgreementModalOpened(false)
        }}
        onClose={() => {
          setIsAgreementModalOpened(false)
        }}
      />
      <UploadMusicModal
        isOpen={isUploadModalOpened}
        onClose={() => setIsUploadModalOpened(false)}
      />
    </>
  )
}

export default UploadSongButton
