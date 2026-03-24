import React from 'react'
import styled from 'styled-components'
import LogoSrc from '../../assets/logo-long.png'

const StyledLogo = styled.div`
  display: inline-block;
  margin: 2rem 0;
`

const LogoImage = styled.img`
  width: 12rem;
`

const Logo = ({ className }: { className?: string }) => (
  <StyledLogo className={className}>
    <LogoImage src={LogoSrc} />
  </StyledLogo>
)

export default Logo
