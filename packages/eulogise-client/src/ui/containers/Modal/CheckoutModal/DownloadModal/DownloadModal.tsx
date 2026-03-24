import React from 'react'
import { hideModalAction } from '../../../../store/ModalState/actions'
import {
  useAvailableEulogiseCardProducts,
  useCaseState,
  useEulogiseDispatch,
  useModalState,
} from '../../../../store/hooks'
import DownloadCardProductModalSection from './DownloadCardProductModalSection'
import DownloadModalSlideshowSection from './DownloadModalSlideshowSection'
import { useModalWidth, STYLE } from '@eulogise/client-core'
import {
  EulogisePage,
  EulogiseProduct,
  ICaseState,
  ModalId,
} from '@eulogise/core'
import { Modal } from '@eulogise/client-components'
import { Button } from '@eulogise/client-components'
import { ButtonType } from '@eulogise/client-components/src/Button'
import { NavigationHelper } from '@eulogise/helpers'

interface IDownloadModalProps {}

const DownloadModal: React.FC<IDownloadModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const modalWidth: number = useModalWidth()!
  const availableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()
  const { activeItem }: ICaseState = useCaseState()
  const { options } = useModalState()
  const caseId = activeItem?.id
  const deceased = activeItem?.deceased
  const genericProductType = options?.genericProductType

  const deceasedName = deceased?.fullName

  const onClose = () => {
    NavigationHelper.navigate(EulogisePage.DASHBOARD)
    dispatch(hideModalAction(ModalId.DOWNLOAD))
  }

  return (
    <Modal
      isOpen
      width={modalWidth}
      title="Generate and download your tributes"
      footer={null}
      onCloseClick={onClose}
      fontSize={STYLE.TEXT_FONT_SIZE_MEDIUM as string}
      margin={'3px 0 0 0'}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={onClose}
        >
          Cancel
        </Button>
      }
    >
      {availableCardProducts.map((product: EulogiseProduct) => (
        <DownloadCardProductModalSection
          key={product}
          product={product}
          genericProductType={genericProductType}
          caseId={caseId}
          onClose={onClose}
          deceasedName={deceasedName}
        />
      ))}
      <DownloadModalSlideshowSection onClose={onClose} />
    </Modal>
  )
}

export default DownloadModal
