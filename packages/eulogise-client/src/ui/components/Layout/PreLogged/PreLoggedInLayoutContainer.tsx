import React from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import { Card } from '@eulogise/client-components'
import { SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import { PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING } from '../../../constants/pre-logged'
import PreLoggedLayout from './PreLoggedLayout'
import { COLOR } from '@eulogise/client-core'
import { useIsMobile } from '@eulogise/client-core'

interface INewPreLoggedInLayoutProps {
  children: React.ReactNode
  title: string
  location: WindowLocation
  className?: string
  noRedirect?: boolean
  adjustableCardHeight?: number
  adjustableCardWidth?: number
  isLoading?: boolean
}

const PreLoggedInCard = styled(Card)<{
  adjustableCardHeight: number
  adjustableCardWidth: number
  isMobileScreenSize: boolean
}>`
  max-width: 100%;
  border-radius: 15px;
  ${SCREEN_SIZE.TABLET} {
    max-width: 60vw;
  }
  .ant-card-body {
    padding: ${PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING}px;
    ${({ $adjustableCardHeight, $isMobileScreenSize }) =>
      !$isMobileScreenSize &&
      $adjustableCardHeight &&
      `
      max-height: ${$adjustableCardHeight}px;
      overflow: auto;
  `}
  }
`
const StyledPreLoggedInLayoutContainer = styled.div``

const StyledPreLoggedInLayout = styled(PreLoggedLayout)<{
  $isMobileScreenSize: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $isMobileScreenSize }) =>
    $isMobileScreenSize
      ? `
      background-color: ${COLOR.PRE_LOGGED_BACKGROUND_COLOR};
    `
      : `
      background-color: transparent;
    height: calc(
      100vh - ${STYLE.PRE_LOGIN_HEADER_HEIGHT} - ${STYLE.FOOTER_HEIGHT}
    );
  `}
`

export const PreLoggedInLayoutContainer: React.FC<
  INewPreLoggedInLayoutProps
> = ({
  children,
  title,
  location,
  className,
  noRedirect,
  adjustableCardHeight,
  adjustableCardWidth,
  isLoading,
}) => {
  const isMobileScreenSize: boolean = useIsMobile() ?? false
  return (
    <StyledPreLoggedInLayoutContainer>
      <StyledPreLoggedInLayout
        className={className}
        title={title}
        location={location}
        noRedirect={noRedirect}
        isLoading={isLoading}
        $isMobileScreenSize={isMobileScreenSize}
        noPadding={true}
      >
        <PreLoggedInCard
          bordered={false}
          $adjustableCardHeight={adjustableCardHeight}
          $adjustableCardWidth={adjustableCardWidth}
          $isMobileScreenSize={isMobileScreenSize}
        >
          {children}
        </PreLoggedInCard>
      </StyledPreLoggedInLayout>
    </StyledPreLoggedInLayoutContainer>
  )
}
