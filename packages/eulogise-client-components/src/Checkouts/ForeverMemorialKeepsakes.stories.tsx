import React from 'react'
import { ForeverMemorialKeepsakes } from './ForeverMemorialKeepsakes'

export default {
  title: 'Checkout/ForeverMemorialKeepsakes',
  component: ForeverMemorialKeepsakes,
  argTypes: {},
}

// Default
export const Default = () => {
  return <ForeverMemorialKeepsakes keepSakes={[]} />
}
