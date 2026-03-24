import React from 'react'
import styled from 'styled-components'
import { Modal, Button, ButtonType } from '@eulogise/client-components'
import {
  EulogiseCountry,
  ICaseState,
  IModalState,
  IPrintingPaperDefinition,
  ModalId,
} from '@eulogise/core'
import {
  useCaseState,
  useEulogiseDispatch,
  useModalState,
} from '../../store/hooks'
import { hideModalAction } from '../../store/ModalState/actions'
import { CheckoutHelper } from '@eulogise/helpers'
import { PaperTypeCard } from './PaperTypeCard'
import { PaperTypePreviewSlider } from './PaperTypePreviewSlider'

export type IPaperTypePreviewModalProps = {}

const PaperTypePreviewContainer = styled.div`
  padding: 0 32px;
`

export const PaperTypePreviewModal = ({}: IPaperTypePreviewModalProps) => {
  const dispatch = useEulogiseDispatch()
  const close = () => {
    dispatch(hideModalAction(ModalId.PRINTING_PAPER_TYPE_PREVIEW))
  }

  const { activeItem: activeCase }: ICaseState = useCaseState()

  const country: EulogiseCountry = activeCase?.country!

  const {
    // @ts-ignore
    options: { product },
  }: IModalState = useModalState()

  const availablePaperTypeDefinition: IPrintingPaperDefinition[] =
    CheckoutHelper.getAvailablePrintingPaperTypesByProduct({ product })

  if (!product || !country) {
    return null
  }

  return (
    <Modal
      width={'75VW'}
      title={'Paper Printing Options'}
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
      footer={<></>}
      onCloseClick={close}
    >
      <PaperTypePreviewContainer>
        <PaperTypePreviewSlider
          noOfPaperTypes={availablePaperTypeDefinition?.length ?? 0}
        >
          {availablePaperTypeDefinition.map(
            (paperTypeDefinition: IPrintingPaperDefinition, index: number) => (
              <PaperTypeCard
                index={index}
                paperTypeDefinition={paperTypeDefinition}
                country={country}
                product={product}
              />
            ),
          )}
        </PaperTypePreviewSlider>
      </PaperTypePreviewContainer>
    </Modal>
  )
}
