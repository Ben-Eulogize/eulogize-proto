import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { APIProvider as GoogleMapsAPIProvider } from '@vis.gl/react-google-maps'
import { GoogleAutoComplete } from '../GoogleAutoComplete/GoogleAutoComplete'
import axios from 'axios'
import { Reminder } from './Reminder'
import { EulogiseCountry, GooglePlaceAPIRegionCode } from '@eulogise/core'
import { CheckCircleIcon, CloseCircleIcon } from '../icons'

const StyledContainer = styled.div`
  border-radius: 10px;
  width: 100%;
`

const StyledGoogleAutoCompleteContainer = styled.div`
  border: 1px solid ${COLOR.GREY};
  border-radius: 4px;
  width: 100%;
`

const StyledDeliveryAddressValidationBoxContainer = styled.div`
  margin: 16px 0 0 0;
`

// const StyledPrefilledAddressCheckboxContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 16px 0 16px 40px;
// `

// const StyledPrefilledAddressTitle = styled.div`
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: 110%; /* 19.8px */
//   font-family: 'Greycliff';
// `

const StyledIconContainer = styled.div`
  padding: 6px 0 0 12px;
`

const StyledValidAddressIcon = styled(CheckCircleIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${COLOR.CORE_PURPLE};
`

const StyledInvalidAddressIcon = styled(CloseCircleIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${COLOR.RED};
`

enum ADDRESS_VALIDATE_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

enum ADDRESS_VALIDATION_GRANULARITY {
  PREMISE = 'PREMISE',
  SUB_PREMISE = 'SUB_PREMISE',
  OTHER = 'OTHER',
}

export interface IAddDeliveryAddressProps {
  onAddressSelected: (
    selectedAddress: string,
    response: any,
    isValidAddress: boolean,
  ) => void
  country: EulogiseCountry
  onResetDeliveryAddress: () => void
  googleAutoCompleteInputId: string
  googleAutoCompleteInputName: string
  shouldAddressInputDisabled?: boolean
  value?: string | undefined
}

export const AddDeliveryAddress: React.FC<IAddDeliveryAddressProps> = ({
  onAddressSelected = async (
    address: string,
    response: any,
    isValidAddress: boolean,
  ) => console.log(address, response, isValidAddress),
  country,
  onResetDeliveryAddress,
  googleAutoCompleteInputId,
  googleAutoCompleteInputName,
  shouldAddressInputDisabled = false,
  value,
}) => {
  const [addressValidationStatus, setAddressValidationStatus] =
    useState<ADDRESS_VALIDATE_STATUS>(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
  const googlePlacesAPIKey = process.env.GATSBY_GOOGLE_MAPS_PLACES_API_KEY ?? ''

  useEffect(() => {
    setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
    return () => {
      setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
    }
  }, [])

  useEffect(() => {
    if (!value) {
      onResetDeliveryAddress()
      setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
    }
  }, [value])

  const isAddressValidated = (response: any) => {
    const validationGranularity =
      response?.data?.result?.verdict?.validationGranularity ??
      ADDRESS_VALIDATION_GRANULARITY.OTHER
    const isValidAddress =
      validationGranularity === ADDRESS_VALIDATION_GRANULARITY.PREMISE ||
      validationGranularity === ADDRESS_VALIDATION_GRANULARITY.SUB_PREMISE

    return isValidAddress
  }

  const onValidatePlace = async (address: string): Promise<any> => {
    setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
    if (!address) {
      return {}
    }
    try {
      const response = await axios.post(
        `https://addressvalidation.googleapis.com/v1:validateAddress`,
        {
          address: {
            addressLines: address.split(','),
          },
        },
        {
          params: {
            key: googlePlacesAPIKey,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const regionCode =
        response?.data?.result?.address?.postalAddress?.regionCode
      const isAddressInSameCountry =
        regionCode === GooglePlaceAPIRegionCode?.[country]

      const isValidAddress = isAddressValidated(response)

      if (isValidAddress === true && isAddressInSameCountry) {
        setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.VALID)
      } else if (isValidAddress === false || !isAddressInSameCountry) {
        if (!isAddressInSameCountry) {
          console.error('Region code not matching!')
        }
        setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.INVALID)
      } else {
        setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
      }
      return response
    } catch (error) {
      console.error(error)
      setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
      return {
        error,
      }
    }
  }

  const onAddressSelectedAndValidation = async (selectedAddress: string) => {
    const response = await onValidatePlace(selectedAddress)
    const isValidAddress = isAddressValidated(response)
    onAddressSelected(selectedAddress, response, isValidAddress)
  }

  return (
    <StyledContainer>
      <StyledGoogleAutoCompleteContainer className="autocomplete-container">
        <GoogleMapsAPIProvider apiKey={googlePlacesAPIKey}>
          <GoogleAutoComplete
            onAddressSelected={async (selectedAddress: string) =>
              onAddressSelectedAndValidation(selectedAddress)
            }
            onChangeReset={() => {
              if (
                addressValidationStatus !== ADDRESS_VALIDATE_STATUS.NOT_STARTED
              ) {
                setAddressValidationStatus(ADDRESS_VALIDATE_STATUS.NOT_STARTED)
              }
            }}
            country={country}
            placeHolder={'Type your address here'}
            inputId={googleAutoCompleteInputId}
            inputName={googleAutoCompleteInputName}
            shouldAddressInputDisabled={shouldAddressInputDisabled}
            value={value}
          />
        </GoogleMapsAPIProvider>
      </StyledGoogleAutoCompleteContainer>

      {addressValidationStatus === ADDRESS_VALIDATE_STATUS.INVALID && (
        <StyledDeliveryAddressValidationBoxContainer>
          <Reminder
            textColor={COLOR.RED}
            text="Please enter a real address in order to check."
            backgroundColor={COLOR.SHALOW_PINK}
            borderColor={COLOR.RED}
            iconComponent={
              <StyledIconContainer>
                <StyledInvalidAddressIcon />
              </StyledIconContainer>
            }
          />
        </StyledDeliveryAddressValidationBoxContainer>
      )}

      {addressValidationStatus === ADDRESS_VALIDATE_STATUS.VALID && (
        <StyledDeliveryAddressValidationBoxContainer>
          <Reminder
            textColor={COLOR.CORE_PURPLE}
            text="Print and delivery is available on your area."
            backgroundColor={COLOR.CORE_PURPLE_10}
            borderColor={COLOR.CORE_PURPLE}
            iconComponent={
              <StyledIconContainer>
                <StyledValidAddressIcon />
              </StyledIconContainer>
            }
          />
        </StyledDeliveryAddressValidationBoxContainer>
      )}

      {/* Turn on below code if needs to display it during holidays */}
      {/* {addressValidationStatus === ADDRESS_VALIDATE_STATUS.VALID && (
        <StyledDeliveryAddressValidationBoxContainer>
          <Reminder
            text="Please note, shipping times can be impacted during the holiday season"
            backgroundColor={COLOR.CORE_PURPLE_10}
            borderColor={COLOR.CORE_PURPLE}
          />
        </StyledDeliveryAddressValidationBoxContainer>
      )} */}
    </StyledContainer>
  )
}
