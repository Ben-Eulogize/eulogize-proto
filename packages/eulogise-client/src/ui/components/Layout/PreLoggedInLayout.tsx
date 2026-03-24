import React from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import Layout from './Layout'
import { Card } from '@eulogise/client-components'
import { SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import { PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING } from '../../constants/pre-logged'

interface IPreLoggedInLayoutProps {
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
}>`
  max-width: 100%;
  border-radius: 15px;
  ${SCREEN_SIZE.TABLET} {
    max-width: 60vw;
  }
  .ant-card-body {
    padding: ${PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING}px;
    ${({ $adjustableCardHeight }) =>
      $adjustableCardHeight &&
      `
      max-height: ${$adjustableCardHeight}px;
      overflow: auto;
  `}
  }
`

const StyledPreLoggedInLayout = styled(Layout).attrs({
  showSider: false,
})`
  background-image: url(${`https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/preview-background-new-partners-funeral-booklets-2517-1080.jpeg`});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(
    100vh - ${STYLE.PRE_LOGIN_HEADER_HEIGHT} - ${STYLE.FOOTER_HEIGHT}
  );
`

export const PreLoggedInLayout: React.FC<IPreLoggedInLayoutProps> = ({
  children,
  title,
  location,
  className,
  noRedirect,
  adjustableCardHeight,
  adjustableCardWidth,
  isLoading,
}) => {
  return (
    <StyledPreLoggedInLayout
      className={className}
      title={title}
      location={location}
      noRedirect={noRedirect}
      noPadding={true}
      isLoading={isLoading}
    >
      <PreLoggedInCard
        $adjustableCardHeight={adjustableCardHeight}
        $adjustableCardWidth={adjustableCardWidth}
      >
        {children}
      </PreLoggedInCard>
    </StyledPreLoggedInLayout>
  )
}
