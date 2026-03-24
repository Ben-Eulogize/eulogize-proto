import React from 'react'
import ServiceCard from '../ServiceCard'
import TVWelcomeScreenIcon from '../../../../assets/dashboard/memorial-page-tv-screen-2.svg'
import { EulogiseProduct } from '@eulogise/core'

const WelcomeScreenServiceCard = () => (
  <ServiceCard
    id="tv-welcome-screen-card"
    data-testId="tv-welcome-screen-card"
    icon={TVWelcomeScreenIcon}
    product={EulogiseProduct.TV_WELCOME_SCREEN}
  />
)

export default WelcomeScreenServiceCard
