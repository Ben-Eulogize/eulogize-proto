import React from 'react'
import { Tag } from 'antd'
import { StripeTransactionStatus } from '@eulogise/core'

interface ITransactionStatusProps {
  status: StripeTransactionStatus
}

const InvoiceStatusTag: React.FC<ITransactionStatusProps> = ({ status }) => {
  const color: string = {
    [StripeTransactionStatus.SUCCEEDED]: 'green',
    [StripeTransactionStatus.PENDING]: 'orange',
    [StripeTransactionStatus.FAILED]: 'red',
  }[status]
  return <Tag color={color}>{status}</Tag>
}

export default InvoiceStatusTag
