import React from 'react'
import { Modal } from '@eulogise/client-components'
import ImageSelector from './ImageSelector'
import { IImageAsset } from '@eulogise/core'

interface IImageSelectorModalProps {
  isOpen: boolean
  onCloseClick: () => void
  onImageSelect: (image: IImageAsset) => void
}

const ImageSelectorModal: React.FC<IImageSelectorModalProps> = ({
  isOpen,
  onCloseClick,
  onImageSelect,
}) => (
  <Modal isOpen={isOpen} onCloseClick={onCloseClick} footer={null}>
    <ImageSelector onImageSelect={onImageSelect} />
  </Modal>
)

export default ImageSelectorModal
