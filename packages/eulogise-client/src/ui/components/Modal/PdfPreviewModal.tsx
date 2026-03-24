import React from 'react'
import styled from 'styled-components'
import { Modal } from '@eulogise/client-components'
import { IModalState, IPdfPreviewModalOption, ModalId } from '@eulogise/core'
import { useEulogiseDispatch, useModalState } from '../../store/hooks'
import { hideModalAction } from '../../store/ModalState/actions'
import { useWindowSize } from '../../hooks/useWindowSize'
import { CardProductHelper } from '@eulogise/helpers'
import { PdfViewer } from '../PdfViewer/PdfViewer'

const PdfViewerContainer = styled.div<{ $height: number }>`
  padding-top: 3rem;
  ${({ $height }) => `
    ${$height ? `height: calc(${$height}px + 3rem + 3rem);` : ''}
  `}
`

export const PdfViewerModal = () => {
  const dispatch = useEulogiseDispatch()
  const modalState: IModalState = useModalState()
  const windowSize = useWindowSize()
  const options = modalState.options as IPdfPreviewModalOption
  const src: string = options.src
  const genericProductMetadata = options.genericProductMetadata
  const product = options.product
  const pageSize = options.pageSize
  if (!windowSize) {
    return null
  }
  const { width: windowWidth, height: windowHeight } = windowSize
  const viewport = CardProductHelper.getPdfPageViewport({
    product,
    pageSize,
    genericProductMetadata,
  })

  const viewportWidth = parseInt(viewport.width, 10)
  const viewportHeight = parseInt(viewport.height, 10)
  const MARGIN = 206
  const maxPdfWidth = windowWidth - MARGIN
  const maxPdfHeight = windowHeight - MARGIN
  const ratioWidth = maxPdfWidth / viewportWidth
  const ratioHeight = maxPdfHeight / viewportHeight
  const isUseWidth = ratioWidth < ratioHeight
  const width = isUseWidth ? maxPdfWidth : viewportWidth * ratioHeight
  const aspectRatio = viewportHeight / viewportWidth
  const height = width * aspectRatio
  if (!src) {
    throw new Error(`No src provided`)
  }
  const PADDING = 24 * 2
  return (
    <Modal
      isOpen
      footer={null}
      onCloseClick={() => {
        dispatch(hideModalAction(ModalId.PDF_VIEWER))
      }}
      closable
      width={width + PADDING}
    >
      <PdfViewerContainer $height={height}>
        <PdfViewer src={src} width={width} height={height} />
      </PdfViewerContainer>
    </Modal>
  )
}
