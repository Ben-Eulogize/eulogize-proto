import React from 'react'
import styled from 'styled-components'
import { hideModalAction } from '../../../store/ModalState/actions'
import { useEulogiseDispatch, useModalState } from '../../../store/hooks'
import {
  Button,
  ButtonType,
  Modal,
  CopyToClipBoardByText,
} from '@eulogise/client-components'
import {
  EulogiseCountry,
  EulogiseCountryTimeZoneDisplayName,
  IModalState,
  ModalId,
} from '@eulogise/core'
import { STYLE, COLOR } from '@eulogise/client-core'
import { CheckoutHelper, DateTimeHelper } from '@eulogise/helpers'
import {
  InvoiceDetailsContent,
  InvoiceRow,
  LabelCell,
  ValueCell,
  StyledCopiedTextContainer,
} from '../../../components/Invoices/InvoiceDetailsContent'

interface IViewInvoiceModal {}

const StyledBillingDetails = styled.div`
  margin: 2rem 0;
`

const InvoiceDetailsContainer = styled.div`
  padding: 0 ${STYLE.GUTTER};
`

const StyledDateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ViewInvoiceModal: React.FC<IViewInvoiceModal> = () => {
  const dispatch = useEulogiseDispatch()
  const close = () => {
    dispatch(hideModalAction(ModalId.VIEW_INVOICE))
  }

  const {
    // @ts-ignore
    options: { invoice },
  }: IModalState = useModalState()

  const country: EulogiseCountry =
    invoice?.details?.country ?? EulogiseCountry.AUSTRALIA

  const currencySymbol: string = CheckoutHelper.getCurrencySymbolByCountry({
    country,
  })

  const countryISOCode = CheckoutHelper.getCurrencyISOCodeByCountry({
    country,
  })

  const subtotalFee = invoice?.details?.orderSummary?.subtotalFee ?? 0

  if (!invoice) {
    return null
  }

  return (
    <Modal
      width={'60VW'}
      title={'Invoice Details'}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={close}
        >
          Cancel
        </Button>
      }
      footer={
        <>
          <Button
            noMarginRight
            buttonType={ButtonType.TRANSPARENT}
            onClick={close}
          >
            Close
          </Button>
        </>
      }
      onCloseClick={close}
    >
      <StyledBillingDetails>
        <InvoiceDetailsContainer key={invoice.id}>
          <InvoiceDetailsContent invoice={invoice} fallbackCountry={country} />
          <InvoiceRow>
            <LabelCell>Purchase Date - User:</LabelCell>
            <StyledDateContainer>
              <ValueCell>
                {DateTimeHelper.formatDateTimeWithCountry(
                  invoice.createdAt,
                  country,
                )}
              </ValueCell>
              <ValueCell>
                {EulogiseCountryTimeZoneDisplayName[country]}
              </ValueCell>
            </StyledDateContainer>
          </InvoiceRow>
          <InvoiceRow>
            <LabelCell>Purchase Date - Admin:</LabelCell>
            <StyledDateContainer>
              <ValueCell>
                {DateTimeHelper.formatDateTimeWithCountry(
                  invoice.createdAt,
                  EulogiseCountry.AUSTRALIA,
                )}
              </ValueCell>
              <ValueCell>
                {EulogiseCountryTimeZoneDisplayName[EulogiseCountry.AUSTRALIA]}
              </ValueCell>
            </StyledDateContainer>
          </InvoiceRow>
          <InvoiceRow>
            <LabelCell>Amount:</LabelCell>
            <ValueCell>
              {`${currencySymbol}${subtotalFee}`}
              &nbsp;
              {countryISOCode}
            </ValueCell>
          </InvoiceRow>
          <InvoiceRow>
            <LabelCell>Invoice Id:</LabelCell>
            <StyledCopiedTextContainer>
              <ValueCell>{invoice.id}</ValueCell>
              <CopyToClipBoardByText text={invoice.id} />
            </StyledCopiedTextContainer>
          </InvoiceRow>
          {invoice.status === 'failed' && invoice?.error?.message && (
            <InvoiceRow>
              <LabelCell $color={COLOR.RED}>Failed Payment Reason:</LabelCell>
              <StyledCopiedTextContainer>
                <ValueCell $color={COLOR.RED}>
                  {invoice?.error?.message}
                </ValueCell>
              </StyledCopiedTextContainer>
            </InvoiceRow>
          )}
        </InvoiceDetailsContainer>
      </StyledBillingDetails>
    </Modal>
  )
}

export default ViewInvoiceModal
