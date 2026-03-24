import React from 'react'
import { PhotobookFeature } from '@eulogise/core'
import styled from 'styled-components'
import { CHECKOUT_BREAKPOINT, COLOR } from '@eulogise/client-core'

const StyledPhotobookDrawerFeature = styled.div`
  width: 100%;
  margin-right: 0;
  margin-bottom: 1.4rem;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: 31.4%;
    margin-right: 1.5rem;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`

const StyledFeatureImage = styled.img`
  width: 289px;
  border-radius: 0.75rem;
  border: 1px solid ${COLOR.LIGHT_GREY};
`

const StyledFeatureTitle = styled.div`
  margin: 0.5rem 0;
  font-size: 18px;
  line-height: 26px;
`

const StyledFeatureDescription = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #646872;
`

export const PhotobookDrawerFeature = ({
  feature,
}: {
  feature: PhotobookFeature
}) => {
  return (
    <StyledPhotobookDrawerFeature>
      <StyledFeatureImage src={feature.thumbnailUrl} />
      <StyledFeatureTitle>{feature.title}</StyledFeatureTitle>
      <StyledFeatureDescription>{feature.description}</StyledFeatureDescription>
    </StyledPhotobookDrawerFeature>
  )
}
