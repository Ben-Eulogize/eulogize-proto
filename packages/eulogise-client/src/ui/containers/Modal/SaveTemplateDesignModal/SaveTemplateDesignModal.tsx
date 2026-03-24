import { Modal } from '@eulogise/client-components'
import React from 'react'
import { useEulogiseDispatch } from '../../../store/hooks'
import { hideModalAction } from '../../../store/ModalState/actions'
import { EulogiseRegion, ModalId } from '@eulogise/core'
import { Button } from '@eulogise/client-components'
import { ButtonType } from '@eulogise/client-components'
import SaveTemplate from '../../Template/SaveTemplate'
import { EulogiseProduct } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

interface ISaveTemplateDesignModalProps {
  product: EulogiseProduct
  region: EulogiseRegion
}

const SaveTemplateDesignModal: React.FunctionComponent<
  ISaveTemplateDesignModalProps
> = ({ product, region }) => {
  const dispatch = useEulogiseDispatch()

  const close = () => {
    dispatch(hideModalAction(ModalId.SAVE_TEMPLATE_DESIGN))
  }
  return (
    <Modal
      width="95%"
      isOpen
      footer={null}
      onCloseClick={close}
      title={`Save Design Template - ${CardProductHelper.getProductName({
        product,
        region,
      })}`}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          onClick={close}
          noMarginRight
        >
          Cancel
        </Button>
      }
    >
      <SaveTemplate product={product} onSaved={close} />
    </Modal>
  )
}

export default SaveTemplateDesignModal
