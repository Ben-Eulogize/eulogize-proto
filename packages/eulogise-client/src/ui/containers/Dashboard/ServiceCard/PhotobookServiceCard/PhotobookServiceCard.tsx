import React from 'react'
import ServiceCard from '../ServiceCard'
import OrderOfServiceImageSrc from '../../../../assets/dashboard/memorial-page-booklet-2.svg'
import { EulogiseProduct } from '@eulogise/core'

const PhotobookServiceCard = () => (
  <ServiceCard
    id="photobook"
    data-testId="photobook"
    icon={OrderOfServiceImageSrc}
    product={EulogiseProduct.PHOTOBOOK}
  />
)

export default PhotobookServiceCard
