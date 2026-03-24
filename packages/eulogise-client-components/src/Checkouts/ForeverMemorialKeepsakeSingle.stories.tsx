import React from 'react'
import { ForeverMemorialKeepsakeSingle } from './ForeverMemorialKeepsakeSingle'

export default {
  title: 'Checkout/ForeverMemorialKeepsakeSingle',
  component: ForeverMemorialKeepsakeSingle,
  argTypes: {},
}

// Default - Single Component
export const Default = () => {
  return (
    <ForeverMemorialKeepsakeSingle
      thumbnailSrc={null}
      title={'Leather Video Book'}
      description={'View product'}
      isDescriptionClickable={false}
    />
  )
}
