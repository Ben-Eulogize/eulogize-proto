import React from 'react'
import { EulogiseProduct, IGenericCardProductTypeData } from '@eulogise/core'
import CardProductIcon from '../../../assets/dashboard/memorial-page-booklet-2.svg'
import ServiceCard from './ServiceCard'

interface IGenericCardProductTypeCardProps {
  genericProductType: IGenericCardProductTypeData
}

const GenericCardProductTypeCard = ({
  genericProductType,
}: IGenericCardProductTypeCardProps) => {
  // Use product image from S3 if available, otherwise fall back to default icon
  const iconSrc = genericProductType.productImage
    ? `https://${process.env.GATSBY_AWS_S3_BUCKET}/productTypes/${genericProductType.productImage}`
    : CardProductIcon

  return (
    <ServiceCard
      id={`generic-card-product-type-${genericProductType.id}`}
      data-testId={`generic-card-product-type-${genericProductType.id}`}
      icon={iconSrc}
      product={EulogiseProduct.GENERIC_CARD_PRODUCT}
      genericProductType={genericProductType}
    />
  )
}

export default GenericCardProductTypeCard
