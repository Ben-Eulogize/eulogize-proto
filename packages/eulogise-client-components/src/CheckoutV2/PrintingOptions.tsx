import React from 'react'
import styled, { css } from 'styled-components'

import { CHECKOUT_BREAKPOINT, COLOR, STYLE } from '@eulogise/client-core'
import {
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  EulogiseCountry,
  IAddressDetails,
} from '@eulogise/core'
import { Radio } from '../Radio'
import { AddDeliveryAddress } from '../Checkouts/AddDeliveryAddress'

const CONTAINER_HORIZONTAL_PADDING = 32
const CONTAINER_CONTENT_GAP = 24
const MEDIUM_CONTAINER_WIDTH = 589
const LARGE_CONTAINER_WIDTH = 765
const THUMBNAIL_WIDTH_MD_TO_LG = 173
const THUMBNAIL_WIDTH_XL = 202

const StyledPrintingOptionContainer = styled.div<{
  $isSelected: boolean
}>`
  padding: 16px;
  background-color: ${COLOR.WARM_GREY_WHITE_BG};
  border-radius: 8px;
  width: 100%;

  ${({ $isSelected }) =>
    $isSelected
      ? `border: 2px solid ${COLOR.CORE_PURPLE};
  `
      : `border: 2px solid ${COLOR.LITE_GREY};`}

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
  1}px) {
    width: 589px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: 765px;
  }
`

const StyledRadioContainer = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

const StyledPrintingDeliveryOptionContainer = styled.div``

const StyledPrintingDeliveryOptionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledPrintingDeliveryOptionRadioContainer = styled.div`
  display: flex;
`

const StyledPrintingDeliveryOptionDescription = styled.div<{
  $margin?: string
  $hasThumbnail: boolean
}>`
  ${STYLE.TEXT_SMALL};
  width: calc(100% - ${CONTAINER_HORIZONTAL_PADDING}px);
  min-width: 0;

  ${({ $hasThumbnail }) =>
    $hasThumbnail &&
    css`
      @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
        1}px) {
        width: ${MEDIUM_CONTAINER_WIDTH -
        CONTAINER_HORIZONTAL_PADDING -
        CONTAINER_CONTENT_GAP -
        THUMBNAIL_WIDTH_MD_TO_LG}px;
      }

      @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) and (max-width: ${CHECKOUT_BREAKPOINT.XL -
        1}px) {
        width: ${LARGE_CONTAINER_WIDTH -
        CONTAINER_HORIZONTAL_PADDING -
        CONTAINER_CONTENT_GAP -
        THUMBNAIL_WIDTH_MD_TO_LG}px;
      }

      @media (min-width: ${CHECKOUT_BREAKPOINT.XL}px) {
        width: ${LARGE_CONTAINER_WIDTH -
        CONTAINER_HORIZONTAL_PADDING -
        CONTAINER_CONTENT_GAP -
        THUMBNAIL_WIDTH_XL}px;
      }
    `}

  ${({ $margin }) =>
    $margin
      ? `margin: ${$margin};
  `
      : `margin: 16px 0;`}
`

const StyledPrintingDeliveryOptionTitleRadio = styled(Radio)`
  ${STYLE.HEADING_SMALL};
`

const StyledContainer = styled.div<{
  $padding?: string | undefined
}>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  ${({ $padding }) =>
    $padding
      ? `padding: ${$padding};
  `
      : ``}
  gap: ${CONTAINER_CONTENT_GAP}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-wrap: nowrap;
    align-items: flex-start;
  }
`

const StyledImgThumbnail = styled.img`
  height: ${THUMBNAIL_WIDTH_MD_TO_LG}px;
  width: ${THUMBNAIL_WIDTH_MD_TO_LG}px;
  display: block;
  flex-shrink: 0;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.XL}px) {
    width: ${THUMBNAIL_WIDTH_XL}px;
    height: ${THUMBNAIL_WIDTH_XL}px;
  }
`

const StyledCheckoutsAddPrintingDeliveryAddress = styled(AddDeliveryAddress)<{
  value?: string | undefined
  $hasThumbnail: boolean
}>`
  width: calc(100% - ${CONTAINER_HORIZONTAL_PADDING}px);
  min-width: 0;

  ${({ $hasThumbnail }) =>
    $hasThumbnail &&
    css`
      @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
        1}px) {
        width: ${MEDIUM_CONTAINER_WIDTH -
        CONTAINER_HORIZONTAL_PADDING -
        CONTAINER_CONTENT_GAP -
        THUMBNAIL_WIDTH_MD_TO_LG}px;
      }

      @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) and (max-width: ${CHECKOUT_BREAKPOINT.XL -
        1}px) {
        width: ${LARGE_CONTAINER_WIDTH -
        CONTAINER_HORIZONTAL_PADDING -
        CONTAINER_CONTENT_GAP -
        THUMBNAIL_WIDTH_MD_TO_LG}px;
      }

      @media (min-width: ${CHECKOUT_BREAKPOINT.XL}px) {
        width: ${LARGE_CONTAINER_WIDTH -
        CONTAINER_HORIZONTAL_PADDING -
        CONTAINER_CONTENT_GAP -
        THUMBNAIL_WIDTH_XL}px;
      }
    `}
`

const StyledAddPrintingAddressContainer = styled.div`
  width: 100%;
  margin-top: 16px;
`

interface PrintingOptionProps {
  id: string
  method: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD
  description: Array<string>
  headerText: string
  showAddressInput: boolean
  thumbnailSrc: string | null
  selectedPrintingDeliveryMethod: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD | null
  onChange: ({
    selectedPrintingDeliveryMethod,
  }: {
    selectedPrintingDeliveryMethod: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD
  }) => void
  country: EulogiseCountry
  printingAddressDetails: IAddressDetails | null
  isPrintingDeliverySkipped: boolean
  onAddressSelected?: (args: {
    selectedAddress: string
    response: any
    isValidAddress: boolean
  }) => void
  onResetDeliveryAddress?: () => void
}

export const PrintingOptions = ({
  id,
  selectedPrintingDeliveryMethod,
  method,
  description,
  headerText,
  showAddressInput,
  thumbnailSrc,
  onChange,
  country,
  printingAddressDetails,
  isPrintingDeliverySkipped,
  onAddressSelected,
  onResetDeliveryAddress,
}: PrintingOptionProps): JSX.Element | null => {
  const inputName = method

  const hasThumbnail = Boolean(thumbnailSrc)

  const renderDescription = ({
    description,
    hasThumbnail,
  }: {
    description: Array<string>
    hasThumbnail: boolean
  }) => {
    if (!description || description?.length === 0) {
      return null
    }
    return (
      description?.length > 0 &&
      description.map((d, index) => {
        return (
          <StyledPrintingDeliveryOptionDescription
            key={`${id}-${index}`}
            $margin={
              index === description?.length - 1 ? '16px 0 0 0' : '16px 0'
            }
            $hasThumbnail={hasThumbnail}
          >
            {d}
          </StyledPrintingDeliveryOptionDescription>
        )
      })
    )
  }

  const renderHeaderText = ({
    selectedPrintingDeliveryMethod,
    headerText,
  }: {
    selectedPrintingDeliveryMethod: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD | null
    headerText: string | null
  }) => {
    if (!selectedPrintingDeliveryMethod) {
      return null
    }
    return (
      <StyledPrintingDeliveryOptionTitleContainer>
        <StyledPrintingDeliveryOptionRadioContainer>
          <StyledPrintingDeliveryOptionTitleRadio
            id={`${method}-title-radio`}
            onChange={(e: {
              target: { value: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD }
            }) => {
              onChange({ selectedPrintingDeliveryMethod: e.target.value })
            }}
            checked={method === selectedPrintingDeliveryMethod}
            value={method}
          >
            {headerText}
          </StyledPrintingDeliveryOptionTitleRadio>
        </StyledPrintingDeliveryOptionRadioContainer>
      </StyledPrintingDeliveryOptionTitleContainer>
    )
  }

  const renderGooglePlaceInput = ({
    country,
    id,
    shouldAddressInputDisabled,
    hasThumbnail,
  }: {
    country: EulogiseCountry
    id: string
    shouldAddressInputDisabled: boolean
    hasThumbnail: boolean
  }) => {
    const addressValue =
      selectedPrintingDeliveryMethod ===
      CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED
        ? undefined
        : printingAddressDetails?.formattedAddress || undefined
    return (
      <StyledAddPrintingAddressContainer>
        {
          <StyledCheckoutsAddPrintingDeliveryAddress
            $hasThumbnail={hasThumbnail}
            googleAutoCompleteInputId={`google-auto-complete-input-id-${id}`}
            googleAutoCompleteInputName={`google-auto-complete-input-id-${inputName}`}
            onAddressSelected={(selectedAddress, response, isValidAddress) => {
              if (selectedAddress && response) {
                onAddressSelected?.({
                  selectedAddress,
                  response,
                  isValidAddress,
                })
              }
            }}
            country={country}
            onResetDeliveryAddress={onResetDeliveryAddress ?? (() => undefined)}
            shouldAddressInputDisabled={shouldAddressInputDisabled}
            value={addressValue}
          />
        }
      </StyledAddPrintingAddressContainer>
    )
  }

  return (
    <StyledPrintingOptionContainer
      $isSelected={selectedPrintingDeliveryMethod === method}
    >
      <StyledContainer>
        <StyledRadioContainer>
          <StyledPrintingDeliveryOptionContainer key={id}>
            {renderHeaderText({ selectedPrintingDeliveryMethod, headerText })}

            {renderDescription({ description, hasThumbnail })}

            {!isPrintingDeliverySkipped &&
              showAddressInput &&
              renderGooglePlaceInput({
                country,
                id,
                hasThumbnail,
                shouldAddressInputDisabled:
                  selectedPrintingDeliveryMethod !==
                  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED,
              })}
          </StyledPrintingDeliveryOptionContainer>
        </StyledRadioContainer>
        {thumbnailSrc && <StyledImgThumbnail src={thumbnailSrc} />}
      </StyledContainer>
    </StyledPrintingOptionContainer>
  )
}

export default PrintingOptions
