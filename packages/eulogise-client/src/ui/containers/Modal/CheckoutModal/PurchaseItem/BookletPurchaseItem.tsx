import React from 'react'
import styled from 'styled-components'
import PurchaseItem from './PurchaseItem'
import { STYLE } from '@eulogise/client-core'
import { PlusIcon } from '@eulogise/client-components'

interface IBookletPurchaseItemProps {
  price: number
}

const PurchaseSubItem = styled.div`
  padding: ${STYLE.GUTTER};
`

const PurchaseSubItemSeparator = styled.div`
  padding: ${STYLE.GUTTER};
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`

const BookletPurchaseItem: React.FC<IBookletPurchaseItemProps> = ({
  price,
}) => (
  <PurchaseItem price={price}>
    <PurchaseSubItem>
      <b>Download Order of Service Booklet</b> printable PDF
    </PurchaseSubItem>
    <PurchaseSubItemSeparator>
      <PlusIcon />
    </PurchaseSubItemSeparator>
    <PurchaseSubItem>
      <b>Visual Tribute Video</b> Download mp4 video
    </PurchaseSubItem>
  </PurchaseItem>
)

export default BookletPurchaseItem
