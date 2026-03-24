import React from 'react'
import styled from 'styled-components'
import LogoSrc from '../../assets/logo-long-big.png'
import EulogizeWithMemorialsLogoSrc from '../../assets/Eulogize-memorial.png'
import MobileLogoSrc from '../../assets/logo.png'
import { useIsMobile } from '@eulogise/client-core'

const StyledLogo = styled.img`
  ${({ isInvert }: { isInvert?: boolean }) =>
    isInvert && `filter: brightness(0) invert(1)`};
`

const Logo = ({
  className,
  src,
  isInvert,
  isWithMemorialsText,
  isShowSmallLogoOnMobile = false,
}: {
  className?: string
  src?: string
  isInvert?: boolean
  isWithMemorialsText?: boolean
  isShowSmallLogoOnMobile?: boolean
}) => {
  const isMobile = useIsMobile()
  return (
    <StyledLogo
      className={className}
      src={
        src ||
        (isShowSmallLogoOnMobile && isMobile
          ? MobileLogoSrc
          : isWithMemorialsText
          ? EulogizeWithMemorialsLogoSrc
          : LogoSrc)
      }
      isInvert={isInvert}
    />
  )
}

export const LogoIcon = Logo
