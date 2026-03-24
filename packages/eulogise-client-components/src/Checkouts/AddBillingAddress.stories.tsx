import React from 'react'
import { AddBillingAddress } from './AddBillingAddress'
import { EulogiseCountry } from '@eulogise/core'

export default {
  title: 'Checkout/AddBillingAddress',
  component: AddBillingAddress,
  argTypes: {},
}

export const USAddressAutoComplete = () => {
  return (
    <AddBillingAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.UNITED_STATES}
    />
  )
}

export const AUAddressAutoComplete = () => {
  return (
    <AddBillingAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.AUSTRALIA}
    />
  )
}

export const EuropeanUnionAddressAutoComplete = () => {
  return (
    <AddBillingAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.EUROPEAN_UNION}
    />
  )
}
