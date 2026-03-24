import React from 'react'
import ServiceCard from '../ServiceCard'
import OrderOfServiceImageSrc from '../../../../assets/dashboard/memorial-page-booklet-2.svg'
import { EulogiseProduct } from '@eulogise/core'

interface IBookletServiceCardProps {}

const BookletServiceCard: React.FunctionComponent<
  IBookletServiceCardProps
> = () => (
  <ServiceCard
    id="order-of-service-booklet"
    icon={OrderOfServiceImageSrc}
    product={EulogiseProduct.BOOKLET}
  />
)

export default BookletServiceCard
