import React from 'react'
import { Tag } from 'antd'
import { InvoiceStatus } from '../../store/AdminState/types'

interface IInvoiceStatusProps {
  status: InvoiceStatus
}

const InvoiceStatusTag: React.FC<IInvoiceStatusProps> = ({ status }) => {
  const color: string = {
    complete: 'green',
    pending: 'orange',
    failed: 'red',
  }[status]
  return <Tag color={color}>{status}</Tag>
}

export default InvoiceStatusTag
