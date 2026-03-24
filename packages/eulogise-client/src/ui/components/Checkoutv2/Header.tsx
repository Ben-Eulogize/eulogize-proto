import React from 'react'
import styled from 'styled-components'

const StyledCheckoutHeaderContainer = styled.div`
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  height: 32px;
`

const Header = ({ text }: { text: string }): JSX.Element | null => {
  if (!text) {
    return null
  }
  return <StyledCheckoutHeaderContainer>{text}</StyledCheckoutHeaderContainer>
}

export default Header
