import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'

interface IPurchaseItemProps {
  children: React.ReactNode
  price: number
}

const StyledPurchaseItem = styled.div`
  display: flex;
`

const PurchaseItemDescription = styled.div`
  display: flex;
`

const PurchaseItemPrice = styled.div`
  padding: ${STYLE.GUTTER};
  font-size: ${STYLE.FONT_SIZE_LG};
`

const PurchaseItem: React.FC<IPurchaseItemProps> = ({ children, price }) => (
  <StyledPurchaseItem>
    <PurchaseItemDescription>{children}</PurchaseItemDescription>
    <PurchaseItemPrice>${price}</PurchaseItemPrice>
  </StyledPurchaseItem>
)

export default PurchaseItem
