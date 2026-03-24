import React from 'react'
import styled from 'styled-components'
import { Card } from '@eulogise/client-components'
import {
  EulogiseProduct,
  EulogiseRegion,
  ICardProductBackgroundImage,
  ICardProductBackgroundImageBase,
} from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import BackgroundImageSelectionThumbnailPreview from './BackgroundImageSelectionThumbnailPreview'
import { useAuthState } from '../../../store/hooks'
import { BackgroundImageHelper } from '@eulogise/helpers'

interface IBackgroundImageSelectionCardProps {
  backgroundImage: ICardProductBackgroundImage
  productType: EulogiseProduct
  slug?: string
  onApply: (
    product: EulogiseProduct,
    selectedBackgroundImage: ICardProductBackgroundImage,
  ) => void
  onEdit: (backgroundImage: ICardProductBackgroundImageBase) => void
  region: EulogiseRegion
}

const StyledBackgroundImageSelectionCard = styled(Card)`
  border: none;
`

const BackgroundImageSelectionFooter = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: ${STYLE.GUTTER};
  text-align: center;
`

const BackgroundImageTitle = styled.div`
  &:first-letter {
    text-transform: uppercase;
  }
`

const BackgroundImageSelectionCard: React.FunctionComponent<
  IBackgroundImageSelectionCardProps
> = ({ backgroundImage, slug, productType, onEdit, onApply, region }) => {
  const { account } = useAuthState()
  const role = account?.role!
  const { id, name, thumbnail } = backgroundImage
  const isEditable = BackgroundImageHelper.isBackgroundEditable(
    role,
    backgroundImage,
  )

  return (
    <StyledBackgroundImageSelectionCard bodyStyle={{ padding: STYLE.GUTTER }}>
      <BackgroundImageSelectionThumbnailPreview
        key={id}
        region={region}
        backgroundImageThumbnail={thumbnail}
        productType={productType}
        slug={slug}
        onApply={() => {
          onApply(productType, backgroundImage)
        }}
        onEdit={() => onEdit(backgroundImage)}
        isEditable={isEditable}
        onApplyAll={() => {
          onApply(EulogiseProduct.ALL, backgroundImage)
        }}
      />
      <BackgroundImageSelectionFooter>
        <BackgroundImageTitle>{name}</BackgroundImageTitle>
      </BackgroundImageSelectionFooter>
    </StyledBackgroundImageSelectionCard>
  )
}

export default BackgroundImageSelectionCard
