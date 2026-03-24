import React from 'react'
import ServiceCard from '../ServiceCard'
import SlideShowIcon from '../../../../assets/dashboard/memorial-page-slideshow-2.svg'
import { EulogiseProduct } from '@eulogise/core'

interface ISlideshowServiceCardProps {}

const SlideshowServiceCard: React.FunctionComponent<
  ISlideshowServiceCardProps
> = () => (
  <ServiceCard
    id="visual-tribute-slideshow-card"
    data-testId="visual-tribute-slideshow-card"
    icon={SlideShowIcon}
    product={EulogiseProduct.SLIDESHOW}
  />
)

export default SlideshowServiceCard
