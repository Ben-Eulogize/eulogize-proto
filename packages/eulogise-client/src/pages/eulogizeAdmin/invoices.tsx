import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import { useAdminState, useEulogiseDispatch } from '../../ui/store/hooks'
import {
  IAdminState,
  IInvoice,
  IInvoiceTransaction,
  InvoiceStatus,
  IOrderDetails,
  IOrderSummaryDetails,
  ModalId,
} from '@eulogise/core'
import {
  Button,
  ButtonSize,
  ButtonType,
  Table,
  Tag,
} from '@eulogise/client-components'
import {
  fetchAllInvoicesWithAdmin,
  fetchAllUsersWithAdmin,
} from '../../ui/store/AdminState/actions'
import { CheckoutHelper, TableHelper } from '@eulogise/helpers'
import { showModalAction } from '../../ui/store/ModalState/actions'

const StyledAdminUserPage = styled(Layout)``

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

const renderInvoiceTypeTagText = (details: any) => {
  if (details?.orderSummary?.subtotalFee > 0) {
    return 'new'
  }
  return 'old'
}

const renderInvoiceTypeTagColor = (details: any) => {
  if (details?.orderSummary?.subtotalFee > 0) {
    return 'green'
  }
  return 'grey'
}

export const ADMIN_PORTAL_USERS_COLUMNS = [
  {
    title: 'Case',
    dataIndex: 'case',
    key: 'case',
    sorter: (a: IInvoice, b: IInvoice) => a.case.localeCompare(b.case),
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    sorter: (a: IInvoice, b: IInvoice) =>
      (a?.customer ?? '').localeCompare(b?.customer ?? ''),
    render: (customer: string) => {
      return customer
    },
  },
  {
    title: 'Eulogize Reference Number (Invoice ID)',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: IInvoice, b: IInvoice) => a.id.localeCompare(b.id),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a: IInvoice, b: IInvoice) => a.status.localeCompare(b.status),
    render: (status: InvoiceStatus) => (
      <Tag color={renderTagColorByStatus(status)} key={status}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Invoice Type',
    dataIndex: 'details',
    key: 'invoice-type',
    render: (details: any) => (
      <Tag color={renderInvoiceTypeTagColor(details)}>
        {renderInvoiceTypeTagText(details)}
      </Tag>
    ),
  },
  {
    title: 'Invoice Details',
    dataIndex: ['id', 'details'],
    key: 'invoice-details',
    render: (text: string, row: any) => {
      const dispatch = useEulogiseDispatch()
      return (
        <Button
          buttonSize={ButtonSize.XS}
          buttonType={ButtonType.TRANSPARENT}
          disabled={row?.details?.orderSummary?.subtotalFee > 0 ? false : true}
          key={row?.id}
          onClick={() =>
            dispatch(showModalAction(ModalId.VIEW_INVOICE, { invoice: row }))
          }
        >
          View Invoice
        </Button>
      )
    },
  },
  {
    title: 'Amount',
    dataIndex: 'details',
    key: 'details-amount',
    render: (details: any) => {
      if (details?.orderSummary?.subtotalFee > 0) {
        const countryISOCode = CheckoutHelper.getCurrencyISOCodeByCountry({
          country: details?.country,
        })
        return `${CheckoutHelper.getCurrencySymbolByCountry({
          country: details?.country,
        })}${details?.orderSummary?.subtotalFee.toFixed(2)} ${countryISOCode}`
      }
      return `$${details?.amount}`.replace(/00$/, '')
    },
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: TableHelper.dateRenderer('createdAt'),
    sorter: (a: IInvoice, b: IInvoice) =>
      a.createdAt.localeCompare(b.createdAt),
  },
]

const AdminInvoicesPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const dispatch = useEulogiseDispatch()
  const adminState: IAdminState = useAdminState()
  const {
    manageUsersPageState: { users },
    manageInvoicesPageState: { invoices = [] },
  } = adminState

  useEffect(() => {
    dispatch(fetchAllInvoicesWithAdmin())
    dispatch(fetchAllUsersWithAdmin())
  }, [])
  const invoiceSource = invoices
    .map((i) => {
      if (i.customer) {
        return {
          ...i,
          customer: users.find((u) => u.id === i.customer)?.fullName,
          transactionId: i?.transactions?.[0],
        }
      }
      return i
    })
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

  return (
    <StyledAdminUserPage title="Admin Invoices Management" location={location}>
      <Table dataSource={invoiceSource} columns={ADMIN_PORTAL_USERS_COLUMNS} />
    </StyledAdminUserPage>
  )
}

export default AdminInvoicesPage
