import React, { useRef, useEffect, useState } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import styled from 'styled-components'
import { SearchIcon } from '../icons'
import { COLOR } from '@eulogise/client-core'
import {
  EulogiseCountry,
  EULOGIZE_CHECKOUT_GOOGLE_AUTO_COMPLETE_COUNTRY_RESTRICTION_CODE,
} from '@eulogise/core'

// This is the component of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete

interface IGoogleAutoCompleteProps {
  onAddressSelected: (address: string) => void
  onChangeReset: () => void
  country?: EulogiseCountry
  placeHolder: string
  inputId: string
  inputName: string
  shouldAddressInputDisabled: boolean
  value?: string | undefined
}

const StyledAutoCompleteContainer = styled.div`
  display: flex;
  position: relative;
`

const StyledGoogleAutoCompleteInput = styled.input`
  width: 100%;
  padding: 4px 6px;
  border: 1px solid ${COLOR.GREY_BACKGROUND};
  border-radius; 8px;
`

const StyledSearchIcon = styled(SearchIcon)`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 95%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 16px;
`

export const GoogleAutoComplete = ({
  onAddressSelected,
  onChangeReset,
  country,
  placeHolder,
  inputId,
  inputName,
  shouldAddressInputDisabled,
  value,
}: IGoogleAutoCompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')

  const countryRestrictionCode = country
    ? EULOGIZE_CHECKOUT_GOOGLE_AUTO_COMPLETE_COUNTRY_RESTRICTION_CODE?.[country]
    : null

  useEffect(() => {
    if (!places || !inputRef.current) return

    const options = {
      fields: ['name', 'formatted_address'],
      ...(countryRestrictionCode
        ? {
            componentRestrictions: {
              country: countryRestrictionCode,
            },
          }
        : {}),
    }
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
  }, [places])

  useEffect(() => {
    if (!placeAutocomplete) return

    placeAutocomplete.addListener('place_changed', () => {
      const updatePlace = placeAutocomplete.getPlace()
      const address = updatePlace?.formatted_address
        ? updatePlace?.formatted_address
        : updatePlace?.name
      if (onAddressSelected && address) {
        onAddressSelected(address)
      }
    })
  }, [placeAutocomplete])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || ''
    }
  }, [value])

  return (
    <StyledAutoCompleteContainer className="autocomplete-container">
      <StyledGoogleAutoCompleteInput
        id={inputId}
        name={inputName}
        disabled={shouldAddressInputDisabled}
        placeholder={placeHolder ?? 'Type your address here'}
        ref={inputRef}
        onChange={(e) => {
          const value = e.target.value
          if (!value) {
            onChangeReset()
          }
        }}
      />
      <StyledSearchIcon />
    </StyledAutoCompleteContainer>
  )
}
