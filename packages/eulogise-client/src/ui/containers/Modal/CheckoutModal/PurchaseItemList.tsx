import React from 'react'
import styled from 'styled-components'
import BookletPurchaseItem from './PurchaseItem/BookletPurchaseItem'
import { COLOR } from '@eulogise/client-core'

interface IPurchaseItemListProps {
  price: number
}

const StyledPurchaseItemList = styled.div`
  background-color: ${COLOR.SUPER_LITE_GREY};
  border-bottom: 2px solid ${COLOR.DOVE_GREY};
`

const PurchaseItemList: React.FC<IPurchaseItemListProps> = ({ price }) => (
  <StyledPurchaseItemList>
    <BookletPurchaseItem price={price} />
  </StyledPurchaseItemList>
)

export default PurchaseItemList
