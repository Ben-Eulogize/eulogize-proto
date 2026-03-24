import React from 'react'
import styled from 'styled-components'
import { useCaseState } from '../../../store/hooks'
import { ICaseState } from '@eulogise/core'

import { Button, ImagePreview, HeaderTextLG } from '@eulogise/client-components'
import { ImageHelper, CardProductHelper } from '@eulogise/helpers'

interface IPrimaryImageFormProps {
  isUpdating?: boolean
  onSetShowImageSelector: () => void
}

const StyledPrimaryImageForm = styled.form``

const StyledUpdatePrimaryImageButton = styled(Button)`
  margin: 20px;
`

const dummyImageUrl = ImageHelper.getImageUrl(
  CardProductHelper.getDummyImage(303, 1),
)

const PrimaryImageForm: React.FC<IPrimaryImageFormProps> = ({
  isUpdating,
  onSetShowImageSelector,
}) => {
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const primaryImage = activeCase?.deceased?.primaryImage
  const imageUrl: string = ImageHelper.getImageUrl(primaryImage!)!

  return (
    <StyledPrimaryImageForm>
      <HeaderTextLG>Primary Image</HeaderTextLG>
      <ImagePreview width={300} src={imageUrl ? imageUrl : dummyImageUrl} />
      <StyledUpdatePrimaryImageButton
        disabled={false}
        loading={isUpdating}
        noMarginLeft
        onClick={onSetShowImageSelector}
      >
        Change Primary Image
      </StyledUpdatePrimaryImageButton>
    </StyledPrimaryImageForm>
  )
}

export default PrimaryImageForm
