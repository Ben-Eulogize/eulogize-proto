import React from 'react'
import ServiceCard from '../ServiceCard'
import A5MemorialCardIcon from '../../../../assets/dashboard/memorial-page-A5-card-2.svg'
import { EulogiseProduct } from '@eulogise/core'

interface IMemorialCardServiceCardProps {}

const MemorialServiceCard: React.FunctionComponent<
  IMemorialCardServiceCardProps
> = () => (
  <ServiceCard
    id="a5-memorial-card"
    data-testId="a5-memorial-card"
    icon={A5MemorialCardIcon}
    product={EulogiseProduct.SIDED_CARD}
  />
)

export default MemorialServiceCard
