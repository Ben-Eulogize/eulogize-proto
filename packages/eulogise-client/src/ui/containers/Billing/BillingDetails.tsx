import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useInvoiceState,
} from '../../store/hooks'
import { fetchInvoices } from '../../store/InvoiceState/actions'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  DateTimeHelper,
  CheckoutHelper,
  InvoiceHelper,
} from '@eulogise/helpers'
import {
  HeaderTextLG,
  CopyToClipBoardByText,
  Tag,
} from '@eulogise/client-components'
import {
  IAuthState,
  EulogiseUserRole,
  IInvoice,
  IInvoiceState,
  EulogiseCountry,
  ICaseState,
  EulogiseCountryTimeZoneDisplayName,
  InvoiceStatus,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'
import {
  InvoiceDetailsContent,
  InvoiceRow,
  LabelCell,
  ValueCell,
  StyledCopiedTextContainer,
} from '../../components/Invoices/InvoiceDetailsContent'

interface IBillingDetailsProps {}

const renderTagColorByStatus = (status: InvoiceStatus) => {
  switch (status) {
    case 'complete':
      return 'green'
    case 'failed':
      return 'red'
    case 'pending':
      return 'grey'
  }
}

const StyledBillingDetails = styled.div`
  margin: 2rem 0;
`

const InvoiceDetailsWrapper = styled.div`
  border: 1px solid ${COLOR.LITE_GREY};
  padding: ${STYLE.GUTTER};
`

const InvoiceDetailsContainer = styled.div`
  padding: 16px 0 0 24px;
`

const SectionTitle = styled.div`
  margin-bottom: calc(${STYLE.GUTTER} / 2);
`

const StyledDateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const BillingDetails: React.FC<IBillingDetailsProps> = () => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const { items: invoices }: IInvoiceState = useInvoiceState()
  const { activeItem }: ICaseState = useCaseState()
  const country = activeItem?.country ?? EulogiseCountry.AUSTRALIA
  const currencySymbol: string = CheckoutHelper.getCurrencySymbolByCountry({
    country,
  })
  const { activeItem: activeCase } = useCaseState()

  const countryISOCode = CheckoutHelper.getCurrencyISOCodeByCountry({
    country,
  })

  const role = account?.role

  const isAdmin = role === EulogiseUserRole.ADMIN

  const shouldShowBillingDetails =
    [
      EulogiseUserRole.CLIENT,
      EulogiseUserRole.CUSTOMER,
      EulogiseUserRole.EDITOR,
      EulogiseUserRole.ADMIN,
    ].includes(account?.role as EulogiseUserRole) ||
    (account?.role === EulogiseUserRole.EDITOR &&
      activeCase?.editorPaymentConfig ===
        EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY)

  useEffect(() => {
    if (
      role &&
      activeCase?.id &&
      [
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.ADMIN,
      ].includes(account?.role)
    ) {
      dispatch(fetchInvoices({ caseId: activeCase?.id }))
    }
  }, [activeCase?.id])

  if (invoices?.length === 0 || !shouldShowBillingDetails) {
    return null
  }

  const sortedInvoices =
    InvoiceHelper.sortBy({
      invoices,
      sortByKey: 'createdAt',
      mode: 'ASC',
    }) ?? []

  const succeedSortedInvoices = sortedInvoices?.filter(
    (i) => i.status === 'complete',
  )

  const displayedInvoices = isAdmin ? sortedInvoices : succeedSortedInvoices

  return (
    <StyledBillingDetails>
      <HeaderTextLG>Purchase Information</HeaderTextLG>
      {displayedInvoices?.map((invoice: IInvoice, index: number) => {
        const status = invoice?.status

        const amountInDollars =
          invoice.transactions?.[0]?.stripePaymentIntentData?.amount ?? 0

        return (
          <InvoiceDetailsContainer key={invoice.id}>
            <SectionTitle>Transaction #{index + 1}</SectionTitle>
            <InvoiceDetailsWrapper>
              <InvoiceDetailsContent
                invoice={invoice}
                fallbackCountry={country}
              />
              <InvoiceRow>
                <LabelCell>Purchase Date:</LabelCell>
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
                <LabelCell>Amount:</LabelCell>
                <ValueCell>
                  {`${currencySymbol}${
                    amountInDollars ? amountInDollars / 100 : 0
                  }`}
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

              <InvoiceRow>
                <LabelCell>Status:</LabelCell>
                <Tag color={renderTagColorByStatus(status)} key={status}>
                  {status}
                </Tag>
              </InvoiceRow>
            </InvoiceDetailsWrapper>
          </InvoiceDetailsContainer>
        )
      })}
    </StyledBillingDetails>
  )
}

export default BillingDetails
