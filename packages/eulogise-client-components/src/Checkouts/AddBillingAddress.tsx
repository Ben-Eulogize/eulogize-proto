import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { APIProvider as GoogleMapsAPIProvider } from '@vis.gl/react-google-maps'
import { GoogleAutoComplete } from '../GoogleAutoComplete/GoogleAutoComplete'

const StyledContainer = styled.div`
  border-radius: 10px;
  padding-bottom: 8px;
`
const StyledGoogleAutoCompleteContainer = styled.div<{
  $margin: string | undefined
}>`
  border: 1px solid ${COLOR.GREY};
  border-radius: 4px;

  ${({ $margin }) => $margin && `margin: ${$margin}`};
`

export interface IAddBillingAddressProps {
  onAddressSelected: (selectedAddress: string) => void
  onChangeReset?: () => void
  margin?: string | undefined
}

export const AddBillingAddress: React.FC<IAddBillingAddressProps> = ({
  onAddressSelected = async (address: string) => console.log(address),
  onChangeReset = () => null,
  margin,
}) => {
  const googlePlacesAPIKey = process.env.GATSBY_GOOGLE_MAPS_PLACES_API_KEY ?? ''

  return (
    <StyledContainer>
      <StyledGoogleAutoCompleteContainer
        $margin={margin}
        className="autocomplete-container"
      >
        <GoogleMapsAPIProvider apiKey={googlePlacesAPIKey}>
          <GoogleAutoComplete
            onAddressSelected={async (selectedAddress: string) => {
              onAddressSelected(selectedAddress)
            }}
            onChangeReset={onChangeReset}
            placeHolder={'Type your billing details here'}
            inputId={'google-auto-complete-input-billing-address-id'}
            inputName={'google-auto-complete-input-billing-address-name'}
            shouldAddressInputDisabled={false}
          />
        </GoogleMapsAPIProvider>
      </StyledGoogleAutoCompleteContainer>
    </StyledContainer>
  )
}
