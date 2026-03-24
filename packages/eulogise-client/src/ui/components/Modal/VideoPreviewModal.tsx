import React from 'react'
import styled from 'styled-components'
import { Modal } from '@eulogise/client-components'
import { IModalState, IVideoPreviewModalOption, ModalId } from '@eulogise/core'
import { useEulogiseDispatch, useModalState } from '../../store/hooks'
import { hideModalAction } from '../../store/ModalState/actions'
import { useWindowSize } from '../../hooks/useWindowSize'

const VideoContainer = styled.div<{ $height: number }>`
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $height }) => `
    ${$height ? `height: calc(${$height}px + 3rem + 3rem);` : ''}
  `}
`

const StyledVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`

export const VideoPreviewModal = () => {
  const dispatch = useEulogiseDispatch()
  const modalState: IModalState = useModalState()
  const windowSize = useWindowSize()
  const options = modalState.options as IVideoPreviewModalOption
  const src: string = options?.src

  if (!windowSize) {
    return null
  }

  if (!src) {
    throw new Error(`No src provided`)
  }

  const { width: windowWidth, height: windowHeight } = windowSize
  const MARGIN = 206
  const maxWidth = windowWidth - MARGIN
  const maxHeight = windowHeight - MARGIN

  const aspectRatio = 16 / 9
  const widthBasedOnHeight = maxHeight * aspectRatio
  const width = Math.min(maxWidth, widthBasedOnHeight)
  const height = width / aspectRatio

  const PADDING = 24 * 2

  return (
    <Modal
      isOpen
      footer={null}
      title={options?.title}
      onCloseClick={() => {
        dispatch(hideModalAction(ModalId.VIDEO_VIEWER))
      }}
      closable
      width={width + PADDING}
    >
      <VideoContainer $height={height}>
        <StyledVideo
          src={src}
          controls
          autoPlay={false}
          width={width}
          height={height}
        >
          Your browser does not support the video tag.
        </StyledVideo>
      </VideoContainer>
    </Modal>
  )
}
