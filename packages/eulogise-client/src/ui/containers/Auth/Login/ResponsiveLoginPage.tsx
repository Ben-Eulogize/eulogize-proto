import React, { useState, useEffect } from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import { Title } from '@eulogise/client-components'
import { LOGIN_HEADER_CONTENT } from '@eulogise/core'
import { UrlHelper, UtilHelper } from '@eulogise/helpers'
import { COLOR, STYLE } from '@eulogise/client-core'
import useElementSize from '../../../hooks/useElementSize'
import {
  DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD,
  FIT_CONTENT_RATIO,
  FOOTER_HEIGHT_IN_PIXES,
  HEADER_HEIGHT_IN_PIXES,
  PRE_LOGGED_IN_RESPONSIVE_ENABLE_SCREEN_HEIGHT,
  PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING,
} from '../../../constants/pre-logged'
import { PreLoggedInLayout } from '../../../components/Layout/PreLoggedInLayout'
import LoginForm from './LoginForm/LoginForm'

const StyledTitle = styled(Title)`
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.HEADING_FONT_SIZE_EXTRA_SMALL_LARGE};
`

const StyledSignInContainer = styled.div<{
  $zoom?: number
  $shouldEnableResponsiveness: boolean
}>`
  ${({ $zoom, $shouldEnableResponsiveness }) =>
    $zoom &&
    $zoom < 1 &&
    $shouldEnableResponsiveness &&
    `
    zoom: ${$zoom};
    `}
`

type IResponsiveLoginPageProps = {
  location: WindowLocation
}

export const ResponsiveLoginPage: React.FunctionComponent<
  IResponsiveLoginPageProps
> = ({ location }) => {
  const [zoom, setZoom] = useState<number>(1)
  const isBrowser = () => typeof window !== 'undefined'
  const [signInRef, { height: signInHeight, width: signInWidth }] =
    useElementSize()

  const signInContentHeight =
    signInHeight + 2 * PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING
  const screenHeight = isBrowser() ? window.innerHeight : 0
  const shouldEnableResponsiveness =
    screenHeight > PRE_LOGGED_IN_RESPONSIVE_ENABLE_SCREEN_HEIGHT
  const contentHeight =
    screenHeight > 0
      ? screenHeight - HEADER_HEIGHT_IN_PIXES - FOOTER_HEIGHT_IN_PIXES
      : 0
  const signUpRatioInContent = signInContentHeight / contentHeight
  const adjustableZoom = FIT_CONTENT_RATIO / signUpRatioInContent
  // responsive only targeting the factor < 1 scenarios
  const adjustableCardHeight =
    adjustableZoom < 1
      ? contentHeight * FIT_CONTENT_RATIO +
        2 * PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING
      : undefined

  const adjustableCardWidth =
    adjustableZoom < 1 ? signInWidth * FIT_CONTENT_RATIO : undefined

  useEffect(() => {
    // debounced updating the zoom factor
    if (
      Math.abs(zoom - adjustableZoom) > DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD
    ) {
      setZoom(adjustableZoom)
    }
  }, [adjustableZoom])

  if (!UtilHelper.getWindow()) {
    return null
  }
  const showCaseId = UrlHelper.getQueryParam(
    'showProductDownload',
    location.search,
  )
  if (showCaseId?.length > 0) {
    window.localStorage.setItem('showProductDownload', showCaseId)
  }
  return (
    <PreLoggedInLayout
      title="Sign in"
      location={location}
      adjustableCardHeight={adjustableCardHeight}
      adjustableCardWidth={adjustableCardWidth}
    >
      <StyledSignInContainer
        ref={signInRef}
        $zoom={zoom}
        $shouldEnableResponsiveness={shouldEnableResponsiveness}
      >
        <StyledTitle>{LOGIN_HEADER_CONTENT}</StyledTitle>
        <LoginForm />
      </StyledSignInContainer>
    </PreLoggedInLayout>
  )
}
