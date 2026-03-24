import React from 'react'
import { Button, ButtonGroup, ButtonType } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../store/hooks'
import { showModalAction } from '../../store/ModalState/actions'
import { EulogiseProduct, EulogisePage, ModalId } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

interface IEditorPreviewButtonGroupProps {
  product: EulogiseProduct
  slug?: string
}

export const EditorPreviewButtonGroup: React.FunctionComponent<
  IEditorPreviewButtonGroupProps
> = ({ product, slug }) => {
  const dispatch = useEulogiseDispatch()

  const handleClose = () => {
    NavigationHelper.navigate(EulogisePage.DASHBOARD)
  }

  const handleShare = () => {
    dispatch(
      showModalAction(ModalId.SHARE_CARD_PRODUCT, {
        product,
        slug,
      }),
    )
  }

  return (
    <ButtonGroup>
      <Button onClick={handleClose} buttonType={ButtonType.TRANSPARENT}>
        Close
      </Button>
      <Button buttonType={ButtonType.PRIMARY} onClick={handleShare}>
        Share
      </Button>
    </ButtonGroup>
  )
}
