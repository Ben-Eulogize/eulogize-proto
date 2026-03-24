import React from 'react'
import styled from 'styled-components'
import {
  BackgroundRestrictions,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductBackgroundImage,
  ICardProductBackgroundImageBase,
  IEulogiseCategory,
} from '@eulogise/core'
import { DrawerThumbnailSlider } from '../../DrawerSlider/DrawerThumbnailSlider'
import BackgroundImageSelectionCard from './BackgroundImageSelectionCard'
import { useCaseState, useClientState } from '../../../store/hooks'

const StyledBackgroundImageSelectionRow = styled.div``

type IBackgroundImageOnApply = (
  product: EulogiseProduct,
  selectedBackgroundImage: any,
) => void

type IBackgroundImageSelectionRowProps = {
  category: IEulogiseCategory
  productType: EulogiseProduct
  slug?: string
  images: Array<ICardProductBackgroundImage>
  onApply: IBackgroundImageOnApply
  onEdit: (backgroundImage: ICardProductBackgroundImageBase) => void
  region: EulogiseRegion
}

export const BackgroundImageSelectionRow = ({
  category,
  productType,
  slug,
  images,
  onApply,
  onEdit,
  region,
}: IBackgroundImageSelectionRowProps) => {
  const { activeItem: activeClient } = useClientState()
  const { activeItem: activeCase } = useCaseState()
  const deceasedName = activeCase?.deceased?.fullName
  const categoryImages = images.filter((image) => {
    if (category.backgroundType === BackgroundRestrictions.CLIENT_BASE) {
      return (
        image.restrictions === BackgroundRestrictions.CLIENT_BASE &&
        image.clientId
      )
    } else if (
      category.backgroundType === BackgroundRestrictions.CUSTOMER_BASE
    ) {
      return (
        image.restrictions === BackgroundRestrictions.CUSTOMER_BASE &&
        image.customerId
      )
    }
    return image.categoryIds?.includes(category.id)
  })
  const imageCount = categoryImages.length
  if (imageCount === 0) {
    return null
  }
  return (
    <StyledBackgroundImageSelectionRow key={category.id}>
      <DrawerThumbnailSlider
        categoryName={
          category.backgroundType === BackgroundRestrictions.CLIENT_BASE
            ? `${activeClient?.title ?? 'Client'} Backgrounds`
            : category.backgroundType === BackgroundRestrictions.CUSTOMER_BASE
            ? `${deceasedName ?? 'Customer'} Backgrounds`
            : category.name
        }
        noOfThumbnails={imageCount}
      >
        {categoryImages.map((backgroundImage: ICardProductBackgroundImage) => (
          <BackgroundImageSelectionCard
            key={backgroundImage.id}
            backgroundImage={backgroundImage}
            productType={productType}
            slug={slug}
            onApply={onApply}
            onEdit={onEdit}
            region={region}
          />
        ))}
      </DrawerThumbnailSlider>
    </StyledBackgroundImageSelectionRow>
  )
}
