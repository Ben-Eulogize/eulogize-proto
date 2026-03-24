import React from 'react'
import { Reminder } from './Reminder'
import { COLOR } from '@eulogise/client-core'

export default {
  title: 'Checkout/Reminder',
  component: Reminder,
  argTypes: {},
}

export const InvalidAddress = () => {
  return (
    <Reminder
      text="Sorry delivery address is not currently available in your area."
      backgroundColor={COLOR.SHALOW_PINK}
      borderColor={COLOR.DEEP_PINK}
    />
  )
}

// TODO: Invalid print and delivery
// TODO: valid print and delivery
