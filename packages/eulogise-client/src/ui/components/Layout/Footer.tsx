import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { COLOR, STYLE, SCREEN_SIZE } from '@eulogise/client-core'
import { useBreakpoint } from '@eulogise/client-core'
import { DEVICES } from '@eulogise/client-core'
import { LogoIcon } from '../icons/LogoIcon'

const StyledFooter = styled(Layout.Footer)<{
  $isMobileScreenSize: boolean
}>`
  border-top: 1px solid ${COLOR.CORNFLOWER_BLUE};
  background-color: ${COLOR.PASTEL_BLUE};
  padding: 20px 1rem 1rem 1rem;
  bottom: 0;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $isMobileScreenSize }) =>
    $isMobileScreenSize
      ? `
    height: 100%;

`
      : `height: ${STYLE.FOOTER_HEIGHT};`}
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
    align-items: flex-start;
  }
`

const StyledLogoIcon = styled(LogoIcon)`
  height: 24px;
  margin-top: ${STYLE.GUTTER};
  ${SCREEN_SIZE.TABLET} {
    margin-top: 0;
  }
`

const FooterNavigationList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: ${STYLE.GUTTER} 0 0 0;
  padding-left: 0;
  flex-direction: column;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
    align-items: flex-start;
    margin: 0;
  }
`

const FooterNavigationListItem = styled.li`
  padding: 0 ${STYLE.GUTTER};
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
  color: ${COLOR.BLACK};
  margin: ${STYLE.GUTTER} 0;
  a {
    color: ${COLOR.BLACK};
    &:hover {
      text-decoration: underline;
    }
  }
  ${SCREEN_SIZE.TABLET} {
    margin: 0;
  }
`

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  return (
    <StyledFooter $isMobileScreenSize={isMobileScreenSize}>
      <StyledLogoIcon />
      <FooterNavigationList>
        <FooterNavigationListItem>
          <a href="https://www.eulogizememorials.com">Home</a>
        </FooterNavigationListItem>
        <FooterNavigationListItem>
          <a href="https://www.eulogizememorials.com/faq" target="_blank">
            FAQ
          </a>
        </FooterNavigationListItem>
        <FooterNavigationListItem>
          <a href="https://www.eulogizememorials.com/privacy-policy">
            Privacy Policy
          </a>
        </FooterNavigationListItem>
        <FooterNavigationListItem>
          &copy; Copyright Wildpalms 2018 - {currentYear}
        </FooterNavigationListItem>
      </FooterNavigationList>
    </StyledFooter>
  )
}

export default Footer
