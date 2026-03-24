import React, { useCallback } from 'react'
import {
  ADDRESS_INPUT_MODE,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  EulogiseCountry,
  IAddressDetails,
} from '@eulogise/core'
import { PrintingOptions } from '@eulogise/client-components'
import {
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
} from '../../store/hooks'
import { updatePrintingAddressDetails } from '../../store/CheckoutsState/action'

interface PrintingOptionsContainerProps {
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
}

export const PrintingOptionsContainer = ({
  id,
  method,
  description,
  headerText,
  showAddressInput,
  thumbnailSrc,
  selectedPrintingDeliveryMethod,
  onChange,
}: PrintingOptionsContainerProps) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const country = (activeCase?.country ?? null) as EulogiseCountry | null
  const { printingDetails } = useCheckoutsState()
  const printingAddressDetails =
    (printingDetails?.printingAddressDetails as IAddressDetails | null) ?? null

  const handleAddressSelected = useCallback(
    ({
      selectedAddress,
      response,
      isValidAddress,
    }: {
      selectedAddress: string
      response: any
      isValidAddress: boolean
    }) => {
      if (!selectedAddress) {
        return
      }
      const formattedAddress =
        response?.data?.result?.address?.formattedAddress ?? selectedAddress
      const portalAddressMetaData =
        response?.data?.result?.address?.postalAddress ?? null

      const details: IAddressDetails = {
        formattedAddress,
        isValidAddress,
        portalAddressMetaData,
        addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
      }
      dispatch(updatePrintingAddressDetails(details))
    },
    [dispatch],
  )

  if (!country) {
    return null
  }

  const isPrintingDeliverySkipped =
    selectedPrintingDeliveryMethod !==
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED

  return (
    <PrintingOptions
      id={id}
      method={method}
      description={description}
      headerText={headerText}
      showAddressInput={showAddressInput}
      thumbnailSrc={thumbnailSrc}
      selectedPrintingDeliveryMethod={selectedPrintingDeliveryMethod}
      onChange={onChange}
      country={country}
      printingAddressDetails={printingAddressDetails}
      isPrintingDeliverySkipped={isPrintingDeliverySkipped}
      onAddressSelected={handleAddressSelected}
    />
  )
}
