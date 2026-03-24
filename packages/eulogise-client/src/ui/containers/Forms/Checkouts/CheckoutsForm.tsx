import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PaymentMethod } from '@stripe/stripe-js'
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js'
import { CHECKOUT_BREAKPOINT, COLOR, STYLE } from '@eulogise/client-core'
import {
  Notification,
  Radio,
  Space,
  Checkbox,
  AddBillingAddress,
} from '@eulogise/client-components'
import { Form, Input } from 'antd'
import {
  CHECKOUT_PAYMENT_METHODS,
  IAddressDetails,
  ICheckoutsState,
  IPaymentDetails,
  ADDRESS_INPUT_MODE,
} from '@eulogise/core'
import { useCheckoutsState, useEulogiseDispatch } from '../../../store/hooks'
import {
  updateBillingAddressDetails,
  updatePaymentDetails,
} from '../../../store/CheckoutsState/action'

import AMEXSvg from '../../../assets/checkouts/amex.svg'
import MasterCardSvg from '../../../assets/checkouts/mastercard.svg'
import VisaSvg from '../../../assets/checkouts/visa.svg'
import LinkSvg from '../../../assets/checkouts/link.svg'

interface IPaymentDetailsFormProps {
  onSubmit: (paymentMethod: PaymentMethod) => void
  onUpdateIsComingFromPaymentPage: (isComingFromPaymentPage: boolean) => void
  isPurchasing: boolean
  onFormReady?: (submitFn: () => void) => void
}

const StyledPaymentDetailsForm = styled.div``

const CARD_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#000',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Greycliff, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#bfbfbf',
      },
    },
  },
}

const StyledCardElement = styled(CardNumberElement)`
  border-radius: 6px;
  margin-right: 24px;
  padding: 6px 11px;
  input {
    font-family: sans-serif;
  }

  border: 1px solid rgb(217, 217, 217);
  &:hover,
  &:focus {
    border-color: #40a9ff;
  }

  background-color: ${COLOR.WHITE};
  width: 320px;
  height: 32px;
`

const StyledTitle = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;
  ${STYLE.HEADING_SMALL};
  font-size: 18px;
`

const StyledCardFormItem = styled(Form.Item)`
  margin-right: 24px;
  margin-bottom: 16px;
  width: 320px;
`

const StyledCardExpiryElement = styled(CardExpiryElement)`
  width: 160px;
  background-color: ${COLOR.WHITE};
  padding: 6px 11px;
  input {
    font-family: sans-serif;
    color: #bfbfbf;
  }

  border: 1px solid rgb(217, 217, 217);
  &:hover,
  &:focus {
    border-color: #40a9ff;
    color: #bfbfbf;
  }
  margin-right: 16px;
  border-radius: 6px;
  height: 32px;

  .ElementsApp {
    margin-top: 4px;
  }
`

const StyledCardCvcElement = styled(CardCvcElement)`
  width: 160px;
  background-color: ${COLOR.WHITE};
  margin-left: 16px;
  margin-right: 16px;
  padding: 6px 11px;
  input {
    font-family: sans-serif;
    color: #bfbfbf;
  }

  border: 1px solid rgb(217, 217, 217);
  &:hover,
  &:focus {
    border-color: #40a9ff;
  }
  margin-right: 24px;
  border-radius: 6px;
  height: 32px;
`

const StyledCardInfoContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const StyledItemTitle = styled.div`
  font-family: 'Greycliff';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  padding: 3px 2px;
`

const StyledCardValidationContainer = styled.div`
  width: 160px;
  height: 32px;
`

const StyledCardValidationTitle = styled.div<{ $padding?: string }>`
  width: 160px;
  font-family: 'Greycliff';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  ${({ $padding }) =>
    $padding ? `padding: ${$padding}` : `padding: 3px 2px 3px 0px;`}
`

const StyledBorder = styled.div`
  width: 90%;
  border-bottom: 1px solid #eaeaee;
  margin-bottom: 24px;
`

const StyledMethodRadio = styled(Radio)``

const StyledPaymentMethodRadioGroupContainer = styled(Radio.Group)`
  width: 100%;
  padding: 16px 0 24px 0;
`

const StyledManualInputBillingAddressCheckbox = styled(Checkbox)`
  margin-top: 10px;
`

// const StyledPaypalPaymentContainer = styled.div`
//   display: flex;
// `

// const StyledPayPalLogo = styled.img`
//   height: fit-content;
//   padding: 3px 0 0 8px;
// `

const StyledAcceptCardsSVGContainer = styled.div`
  flex: display;
`

const StyledAcceptCard = styled.img<{ $height?: string }>`
  padding: 0 8px 0 0;
  ${({ $height }) => ($height ? `height: ${$height}` : `height: 24px;`)}
`

const StyledBillingDetailsCollectionContainer = styled.div`
  padding: 20px 0 0 0;
`

const StyledBillingDetailsText = styled.div`
  ${STYLE.TEXT_SMALL};
  font-size: 15px;
`

const StyledCheckoutsAddBillingDeliveryAddressWrapper = styled.div`
  margin-top: 4px;
  display: block;
  width: 80%;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    width: 336px;
  }
`

const StyledBillingAddressSameAsShippingAddressCheckout = styled(Checkbox)``

const StyledBillingDetailsTextContainer = styled.div`
  padding: 8px 0 4px 0;
`

const StyledBillingDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledBillingDetailsWarning = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.ERROR};
  font-size: 15px;
`

const StyledManualBillingDetailsInput = styled(Input)`
  height: 32px !important;
  border-radius: 6px !important;
  display: block;
  width: 80%;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    width: 336px;
  }
`

const StyledBillingAddressSummary = styled.div`
  ${STYLE.TEXT_SMALL};
  padding: 0 0 12px 0;
`

const CheckoutsForm: React.FC<IPaymentDetailsFormProps> = ({
  onSubmit,
  onUpdateIsComingFromPaymentPage,
  isPurchasing,
  onFormReady,
}) => {
  const [
    isBillingAddressSameAsShippingAddress,
    setIsBillingAddressSameAsShippingAddress,
  ] = useState(false)
  const dispatch = useEulogiseDispatch()
  const elements = useElements()
  const stripe = useStripe()
  const [form] = Form.useForm()
  const [isBillingAddressWarningVisible, setIsBillingAddressWarningVisible] =
    useState(false)
  const [isSubmittingPaymentMethod, setIsSubmittingPaymentMethod] =
    useState(false)
  const {
    paymentDetails,
    keepsakesDetails: {
      leatherVideoTributeBook: {
        shippingAddressDetails: {
          formattedAddress: formattedLeatherVideoBookShippingAddress,
          addressInputMode: leatherVideoBookShippingDetailsAddressInputMode,
          isValidAddress: isLeatherVideoBookShippingDetailsAddressValid,
        },
      },
      photoBook: {
        shippingAddressDetails: {
          formattedAddress: formattedPhotoBookShippingAddress,
          addressInputMode: photoBookShippingDetailsAddressInputMode,
          isValidAddress: isPhotoBookShippingDetailsAddressValid,
        },
      },
    },
    printingDetails: {
      printingAddressDetails: {
        formattedAddress: formattedPrintingShippingAddress,
        addressInputMode: printingShippingDetailsAddressInputMode,
        isValidAddress: isPrintingDetailsAddressValid,
      },
    },
    billingAddressDetails: {
      formattedAddress: formattedBillingAddress,
      addressInputMode: billingDetailsAddressInputmode,
      isValidAddress: isBillingAddressValidFlag,
    },
  }: ICheckoutsState = useCheckoutsState()
  const paymentMethod: CHECKOUT_PAYMENT_METHODS = paymentDetails?.method

  const hasValidLeatherVideoBookShippingAddress =
    !!formattedLeatherVideoBookShippingAddress &&
    leatherVideoBookShippingDetailsAddressInputMode !==
      ADDRESS_INPUT_MODE.NO_INPUT &&
    (leatherVideoBookShippingDetailsAddressInputMode ===
      ADDRESS_INPUT_MODE.MANUAL_INPUT ||
      !!isLeatherVideoBookShippingDetailsAddressValid)

  const hasValidPrintingShippingAddress =
    !!formattedPrintingShippingAddress &&
    printingShippingDetailsAddressInputMode !== ADDRESS_INPUT_MODE.NO_INPUT &&
    (printingShippingDetailsAddressInputMode ===
      ADDRESS_INPUT_MODE.MANUAL_INPUT ||
      !!isPrintingDetailsAddressValid)

  const hasValidPhotoBookShippingAddress =
    !!formattedPhotoBookShippingAddress &&
    photoBookShippingDetailsAddressInputMode !== ADDRESS_INPUT_MODE.NO_INPUT &&
    (photoBookShippingDetailsAddressInputMode ===
      ADDRESS_INPUT_MODE.MANUAL_INPUT ||
      !!isPhotoBookShippingDetailsAddressValid)

  const isBillingAddressSameAsKeepSakesShippingAddressCheckboxDisabled =
    !hasValidLeatherVideoBookShippingAddress

  const isBillingAddressSameAsPrintingShippingAddressCheckboxDisabled =
    !hasValidPrintingShippingAddress

  const isBillingAddressSameAsPhotoBookShippingAddressCheckboxDisabled =
    !hasValidPhotoBookShippingAddress

  const isBillingAddressFromShippingOptionsDisabled =
    isBillingAddressSameAsKeepSakesShippingAddressCheckboxDisabled &&
    isBillingAddressSameAsPrintingShippingAddressCheckboxDisabled &&
    isBillingAddressSameAsPhotoBookShippingAddressCheckboxDisabled

  const shippingAddressCandidates = [
    {
      formattedAddress: formattedLeatherVideoBookShippingAddress,
      addressInputMode: leatherVideoBookShippingDetailsAddressInputMode,
      isValidAddress: isLeatherVideoBookShippingDetailsAddressValid,
      isUsable: hasValidLeatherVideoBookShippingAddress,
    },
    {
      formattedAddress: formattedPrintingShippingAddress,
      addressInputMode: printingShippingDetailsAddressInputMode,
      isValidAddress: isPrintingDetailsAddressValid,
      isUsable: hasValidPrintingShippingAddress,
    },
    {
      formattedAddress: formattedPhotoBookShippingAddress,
      addressInputMode: photoBookShippingDetailsAddressInputMode,
      isValidAddress: isPhotoBookShippingDetailsAddressValid,
      isUsable: hasValidPhotoBookShippingAddress,
    },
  ] as const

  const firstAvailableShippingAddress = shippingAddressCandidates.find(
    ({ isUsable }) => isUsable,
  )

  const trimmedBillingAddress = formattedBillingAddress
    ? formattedBillingAddress.trim()
    : ''

  const isBillingAddressInputValid =
    billingDetailsAddressInputmode !== ADDRESS_INPUT_MODE.NO_INPUT &&
    !!trimmedBillingAddress &&
    (billingDetailsAddressInputmode !== ADDRESS_INPUT_MODE.AUTO_COMPLETE ||
      isBillingAddressValidFlag !== false)

  useEffect(() => {
    if (onFormReady && form) {
      // Only set up form submission callback once
      onFormReady(() => {
        if (form) {
          form.submit()
        }
      })
    }
  }, []) // Empty dependency array - only run once on mount

  useEffect(() => {
    if (!isPurchasing) {
      setIsSubmittingPaymentMethod(false)
    }
  }, [isPurchasing])

  const isShippingAddressPreFilled =
    !!formattedLeatherVideoBookShippingAddress &&
    leatherVideoBookShippingDetailsAddressInputMode ===
      ADDRESS_INPUT_MODE.AUTO_COMPLETE &&
    isLeatherVideoBookShippingDetailsAddressValid

  const isPrintingShippingAddressPreFilled =
    !!formattedPrintingShippingAddress &&
    printingShippingDetailsAddressInputMode ===
      ADDRESS_INPUT_MODE.AUTO_COMPLETE &&
    isPrintingDetailsAddressValid

  const isPhotoBookShippingAddressPreFilled =
    !!formattedPhotoBookShippingAddress &&
    photoBookShippingDetailsAddressInputMode ===
      ADDRESS_INPUT_MODE.AUTO_COMPLETE &&
    isPhotoBookShippingDetailsAddressValid

  useEffect(() => {
    if (
      isShippingAddressPreFilled ||
      isPrintingShippingAddressPreFilled ||
      isPhotoBookShippingAddressPreFilled
    ) {
      const billingAddressDetails: IAddressDetails = {
        formattedAddress: isShippingAddressPreFilled
          ? formattedLeatherVideoBookShippingAddress
          : isPrintingShippingAddressPreFilled
          ? formattedPrintingShippingAddress
          : formattedPhotoBookShippingAddress,
        addressInputMode: ADDRESS_INPUT_MODE.MANUAL_INPUT,
      }
      dispatch(updateBillingAddressDetails(billingAddressDetails))
      setIsBillingAddressSameAsShippingAddress(true)
      setIsBillingAddressWarningVisible(false)
      return
    }
  }, [])

  useEffect(() => {
    if (isBillingAddressSameAsShippingAddress) {
      setIsBillingAddressWarningVisible(false)
    }
  }, [isBillingAddressSameAsShippingAddress])

  const handleSubmit = async () => {
    if (isPurchasing || isSubmittingPaymentMethod) {
      return
    }

    if (!isBillingAddressSameAsShippingAddress && !isBillingAddressInputValid) {
      setIsBillingAddressWarningVisible(true)
      return
    }
    setIsBillingAddressWarningVisible(false)
    setIsSubmittingPaymentMethod(true)

    if (!stripe || !elements) {
      setIsSubmittingPaymentMethod(false)
      return
    }

    const cardElement = elements.getElement(CardNumberElement)

    if (!cardElement) {
      Notification.error('Unable to process payment, no card element')
      setIsSubmittingPaymentMethod(false)
      return
    }

    // Create payment intent on the server
    const { paymentMethod: stripePaymentMethod, error } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

    if (error) {
      Notification.error(error.message || 'Unable to process payment')
      setIsSubmittingPaymentMethod(false)
      return
    }
    try {
      onSubmit(stripePaymentMethod)
    } catch (submitError) {
      setIsSubmittingPaymentMethod(false)
      throw submitError
    }
    onUpdateIsComingFromPaymentPage(true)
  }

  const renderBillingDetailsCollector = () => {
    if (isBillingAddressSameAsShippingAddress) {
      return null
    }

    if (billingDetailsAddressInputmode === ADDRESS_INPUT_MODE.MANUAL_INPUT) {
      return (
        <StyledManualBillingDetailsInput
          className="billing-details-address"
          size="large"
          placeholder="Type your billing details here"
          disabled={
            billingDetailsAddressInputmode !== ADDRESS_INPUT_MODE.MANUAL_INPUT
          }
          onChange={(e) => {
            const value = e.target.value
            if (value.trim().length > 0) {
              setIsBillingAddressWarningVisible(false)
            }
            const billingAddressDetails = {
              formattedAddress: value,
              addressInputMode: ADDRESS_INPUT_MODE.MANUAL_INPUT,
            }
            dispatch(updateBillingAddressDetails(billingAddressDetails))
          }}
        />
      )
    }

    return (
      <StyledCheckoutsAddBillingDeliveryAddressWrapper>
        <AddBillingAddress
          onChangeReset={() => {
            const billingAddressDetails: IAddressDetails = {
              formattedAddress: null,
              addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
            }
            dispatch(updateBillingAddressDetails(billingAddressDetails))
            setIsBillingAddressWarningVisible(false)
          }}
          onAddressSelected={(selectedAddress) => {
            if (selectedAddress) {
              const billingAddressDetails: IAddressDetails = {
                formattedAddress: selectedAddress,
                addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
              }
              dispatch(updateBillingAddressDetails(billingAddressDetails))
              setIsBillingAddressWarningVisible(false)
            }
          }}
        />
      </StyledCheckoutsAddBillingDeliveryAddressWrapper>
    )
  }

  const renderEnterDetailsManuallyCheckbox = () => {
    if (isBillingAddressSameAsShippingAddress) {
      return null
    }

    return (
      <StyledManualInputBillingAddressCheckbox
        className="enter-details-manually"
        checked={
          billingDetailsAddressInputmode === ADDRESS_INPUT_MODE.MANUAL_INPUT
        }
        onChange={(ev: any) => {
          const isEnterDetailManually = ev.target.checked
          const billingAddressDetails: IAddressDetails = {
            formattedAddress: '',
            addressInputMode: isEnterDetailManually
              ? ADDRESS_INPUT_MODE.MANUAL_INPUT
              : ADDRESS_INPUT_MODE.AUTO_COMPLETE,
          }
          dispatch(updateBillingAddressDetails(billingAddressDetails))
          setIsBillingAddressSameAsShippingAddress(false)
          setIsBillingAddressWarningVisible(false)
        }}
      >
        <StyledBillingDetailsText>
          Enter details manually
        </StyledBillingDetailsText>
      </StyledManualInputBillingAddressCheckbox>
    )
  }

  const renderCreditDebitCardForm = () => {
    return (
      <Form onFinish={handleSubmit} layout="horizontal" form={form}>
        <StyledItemTitle>Name on card</StyledItemTitle>
        <StyledCardFormItem
          name="name"
          label=""
          rules={[
            {
              required: true,
              message: 'Please input the card holder name',
            },
          ]}
        >
          <Input
            style={{
              height: '32px',
              fontFamily: 'Greycliff, sans-serif',
              borderRadius: '6px',
            }}
            className="payment-name-on-card"
            size="large"
            placeholder="Cardholder"
            onChange={(e: any) => {
              console.log('cardholdernamechanged:', e?.target?.value)
              const updatedPaymentDetails: IPaymentDetails = {
                ...paymentDetails,
                cardHolderName: e?.target?.value,
              }
              dispatch(updatePaymentDetails(updatedPaymentDetails))
            }}
          />
        </StyledCardFormItem>

        <StyledItemTitle>Card number</StyledItemTitle>
        <StyledCardInfoContainer>
          <StyledCardElement options={CARD_OPTIONS} />
        </StyledCardInfoContainer>

        <StyledCardInfoContainer>
          <StyledCardValidationContainer>
            <StyledCardValidationTitle>Exp</StyledCardValidationTitle>
            <StyledCardExpiryElement options={CARD_OPTIONS} />
          </StyledCardValidationContainer>

          <StyledCardValidationContainer>
            <StyledCardValidationTitle $padding={'3px 2px 3px 16px;'}>
              CVV
            </StyledCardValidationTitle>
            <StyledCardCvcElement options={CARD_OPTIONS} />
          </StyledCardValidationContainer>
        </StyledCardInfoContainer>

        <StyledBillingDetailsCollectionContainer>
          {!isBillingAddressFromShippingOptionsDisabled && (
            <StyledBillingAddressSameAsShippingAddressCheckout
              className="billing-address-as-same-as-shipping-address"
              checked={isBillingAddressSameAsShippingAddress}
              onChange={(ev: any) => {
                if (ev.target.checked) {
                  if (!firstAvailableShippingAddress) {
                    return
                  }
                  const billingAddressDetails: IAddressDetails = {
                    formattedAddress:
                      firstAvailableShippingAddress.formattedAddress,
                    addressInputMode:
                      firstAvailableShippingAddress.addressInputMode ===
                      ADDRESS_INPUT_MODE.MANUAL_INPUT
                        ? ADDRESS_INPUT_MODE.MANUAL_INPUT
                        : ADDRESS_INPUT_MODE.AUTO_COMPLETE,
                  }
                  if (
                    firstAvailableShippingAddress.addressInputMode ===
                    ADDRESS_INPUT_MODE.AUTO_COMPLETE
                  ) {
                    billingAddressDetails.isValidAddress =
                      firstAvailableShippingAddress.isValidAddress
                  }
                  dispatch(updateBillingAddressDetails(billingAddressDetails))
                  setIsBillingAddressSameAsShippingAddress(true)
                  setIsBillingAddressWarningVisible(false)
                  return
                }
                if (!ev.target.checked) {
                  const billingAddressDetails: IAddressDetails = {
                    formattedAddress: '',
                    addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
                  }
                  dispatch(updateBillingAddressDetails(billingAddressDetails))
                  setIsBillingAddressSameAsShippingAddress(false)
                  setIsBillingAddressWarningVisible(false)
                }
              }}
              disabled={isBillingAddressFromShippingOptionsDisabled}
            >
              <StyledBillingDetailsText>
                Use my shipping address as the billing address
              </StyledBillingDetailsText>
            </StyledBillingAddressSameAsShippingAddressCheckout>
          )}

          <StyledBillingDetailsTextContainer>
            <StyledBillingDetailsHeader>
              <StyledItemTitle>Billing Details</StyledItemTitle>
              {isBillingAddressWarningVisible && (
                <StyledBillingDetailsWarning>
                  * please enter your billing address or use the shipping addess
                </StyledBillingDetailsWarning>
              )}
            </StyledBillingDetailsHeader>
          </StyledBillingDetailsTextContainer>
          {isBillingAddressSameAsShippingAddress && formattedBillingAddress && (
            <StyledBillingAddressSummary>
              {formattedBillingAddress}
            </StyledBillingAddressSummary>
          )}
        </StyledBillingDetailsCollectionContainer>

        {renderBillingDetailsCollector()}

        {renderEnterDetailsManuallyCheckbox()}
      </Form>
    )
  }

  const renderPayPalForm = () => {
    return <div>TODO</div>
  }

  return (
    <StyledPaymentDetailsForm>
      <StyledTitle>Complete your payment details</StyledTitle>
      <StyledPaymentMethodRadioGroupContainer
        onChange={(e: any) => {
          const updatedPaymentMethod: CHECKOUT_PAYMENT_METHODS =
            e?.target?.value
          const updatedPaymentDetails: IPaymentDetails = {
            ...paymentDetails,
            method: updatedPaymentMethod,
          }
          dispatch(updatePaymentDetails(updatedPaymentDetails))
        }}
        value={paymentMethod}
      >
        <Space direction="vertical">
          {/* <StyledPaypalPaymentContainer>
            <StyledMethodRadio value={CHECKOUT_PAYMENT_METHODS.PAYPAL}>
              Pay with PayPal
            </StyledMethodRadio>
            <StyledPayPalLogo src={PaypalLogo} />
          </StyledPaypalPaymentContainer> */}

          <StyledMethodRadio value={CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD}>
            Pay with credit/debit card
          </StyledMethodRadio>
          <StyledAcceptCardsSVGContainer>
            <StyledAcceptCard src={AMEXSvg} alt="amex" />
            <StyledAcceptCard src={MasterCardSvg} alt="master-card" />
            <StyledAcceptCard src={VisaSvg} alt="visa" />
            <StyledAcceptCard src={LinkSvg} alt="link" $height={'16px'} />
          </StyledAcceptCardsSVGContainer>
        </Space>
      </StyledPaymentMethodRadioGroupContainer>
      <StyledBorder />
      {paymentMethod === CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD &&
        renderCreditDebitCardForm()}

      {paymentMethod === CHECKOUT_PAYMENT_METHODS.PAYPAL && renderPayPalForm()}
    </StyledPaymentDetailsForm>
  )
}

export default CheckoutsForm
