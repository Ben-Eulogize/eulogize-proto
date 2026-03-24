import React, { useState, useEffect } from 'react'
import { PageProps } from 'gatsby'
import { Title } from '@eulogise/client-components'
import ForgotPasswordForm from '../ui/containers/Auth/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm'
import { FORGOT_PASSWORD_HEADER_CONTENT } from '@eulogise/core'
import { PreLoggedInLayout } from '../ui/components/Layout/PreLoggedInLayout'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { useElementSize } from 'usehooks-ts'
import {
  PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING,
  PRE_LOGGED_IN_RESPONSIVE_ENABLE_SCREEN_HEIGHT,
  HEADER_HEIGHT_IN_PIXES,
  FOOTER_HEIGHT_IN_PIXES,
  FIT_CONTENT_RATIO,
  DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD,
} from '../ui/constants/pre-logged'

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

const StyledTitle = styled(Title)`
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.HEADING_FONT_SIZE_EXTRA_SMALL_LARGE};
`

const forgotPasswordPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const [zoom, setZoom] = useState<number>(1)

  const [
    forgotPasswordRef,
    { height: forgotPasswordHeight, width: forgotPasswordWidth },
  ] = useElementSize()

  const isBrowser = () => typeof window !== 'undefined'

  const signUpContentHeight =
    forgotPasswordHeight + 2 * PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING
  const screenHeight = isBrowser() ? window.innerHeight : 0
  const shouldEnableResponsiveness =
    screenHeight > PRE_LOGGED_IN_RESPONSIVE_ENABLE_SCREEN_HEIGHT
  const contentHeight =
    screenHeight > 0
      ? screenHeight - HEADER_HEIGHT_IN_PIXES - FOOTER_HEIGHT_IN_PIXES
      : 0
  const signUpRatioInContent = signUpContentHeight / contentHeight
  const adjustableZoom = FIT_CONTENT_RATIO / signUpRatioInContent
  // responsive only targeting the factor < 1 scenarios
  const adjustableCardHeight =
    adjustableZoom < 1
      ? contentHeight * FIT_CONTENT_RATIO +
        2 * PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING
      : undefined

  const adjustableCardWidth =
    adjustableZoom < 1 ? forgotPasswordWidth * FIT_CONTENT_RATIO : undefined

  useEffect(() => {
    // debounced updating the zoom factor
    if (
      Math.abs(zoom - adjustableZoom) > DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD
    ) {
      setZoom(adjustableZoom)
    }
  }, [adjustableZoom])

  return (
    <StyledSignInContainer
      ref={forgotPasswordRef}
      $zoom={zoom}
      $shouldEnableResponsiveness={shouldEnableResponsiveness}
    >
      <PreLoggedInLayout
        title="Forgot password"
        location={location}
        adjustableCardHeight={adjustableCardHeight}
        adjustableCardWidth={adjustableCardWidth}
      >
        <StyledTitle>{FORGOT_PASSWORD_HEADER_CONTENT}</StyledTitle>
        <ForgotPasswordForm />
      </PreLoggedInLayout>
    </StyledSignInContainer>
  )
}

export default forgotPasswordPage
