import React from 'react'
import { AddDeliveryAddress } from './AddDeliveryAddress'
import { EulogiseCountry } from '@eulogise/core'

export default {
  title: 'Checkout/AddDeliveryAddress',
  component: AddDeliveryAddress,
  argTypes: {},
}

export const USAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.UNITED_STATES}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const AUAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.AUSTRALIA}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const EuropeanUnionAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.EUROPEAN_UNION}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const UKAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.UNITED_KINGDOM}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const ChlieAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.CHILE}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const ColombiaAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.COLOMBIA}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const CostaRicaAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.COSTA_RICA}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const MexicoAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.MEXICO}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const NewZealandAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.NEW_ZEALAND}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const PanamaAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.PANAMA}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const GuatemalaAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.GUATEMALA}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const TheDominicanRepublicAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.THE_DOMINICAN_REPUBLIC}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const ThePhilippinesAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.THE_PHILIPPINES}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const CanadaAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.CANADA}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}

export const RestOfTheWorldAddressAutoComplete = () => {
  return (
    <AddDeliveryAddress
      onAddressSelected={() => console.log('onAddressSelected!')}
      country={EulogiseCountry.REST_OF_THE_WOLRD}
      onResetDeliveryAddress={() => console.log('onResetDeliveryAddress!')}
      googleAutoCompleteInputId={`google-auto-complete-input-id-1`}
      googleAutoCompleteInputName={`google-auto-complete-input-name-1`}
    />
  )
}
