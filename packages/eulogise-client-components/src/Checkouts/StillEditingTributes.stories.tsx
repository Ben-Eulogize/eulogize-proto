import React from 'react'
import { StillEditingTributes } from './StillEditingTributes'

export default {
  title: 'Checkout/StillEditingTributes',
  component: StillEditingTributes,
  argTypes: {},
}

// Default
export const Default = () => {
  return (
    <StillEditingTributes
      onRedirectToDashboard={() => console.log('onRedirectToDashboard')}
    />
  )
}
