import React from 'react'
import ServiceCard from '../ServiceCard'
import A6ThankyouCardIcon from '../../../../assets/dashboard/memorial-page-A6-card-2.svg'
import { EulogiseProduct } from '@eulogise/core'

interface IThankYouCardServiceCardProps {}

const ThankYouServiceCard: React.FunctionComponent<
  IThankYouCardServiceCardProps
> = () => (
  <ServiceCard
    id="a6-thankyou-card"
    data-testId="a6-thankyou-card"
    icon={A6ThankyouCardIcon}
    product={EulogiseProduct.THANK_YOU_CARD}
  />
)

export default ThankYouServiceCard
