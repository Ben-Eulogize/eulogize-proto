import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import { Title } from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  IAuthState,
  IClientHandleRouteResponse,
  SIGN_UP_HEADER_CONTENT,
} from '@eulogise/core'
import SignUpForm from './SignUpForm/SignUpForm'
import { PreLoggedInLayoutContainer } from '../../../components/Layout/PreLogged/PreLoggedInLayoutContainer'
import {
  DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD,
  FIT_CONTENT_RATIO,
  FOOTER_HEIGHT_IN_PIXES,
  HEADER_HEIGHT_IN_PIXES,
  PRE_LOGGED_IN_RESPONSIVE_ENABLE_SCREEN_HEIGHT,
  PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING,
} from '../../../constants/pre-logged'
import useElementSize from '../../../hooks/useElementSize'
import { ImageHelper } from '@eulogise/helpers'
import { useAuthState, useEulogiseDispatch } from '../../../store/hooks'
import { resetAuthState } from '../../../store/AuthState/actions'

const StyledSignUpContainer = styled.div<{
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
  margin-bottom: 10px;
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledLogo = styled.img`
  max-height: 80px;
  margin: 0 auto;
`

type IResponsiveSignUpPageProps = {
  location: WindowLocation
  client?: IClientHandleRouteResponse
  viaClientHandle?: string
}

export const ResponsiveSignUpPage = ({
  location,
  client,
  viaClientHandle,
}: IResponsiveSignUpPageProps) => {
  const dispatch = useEulogiseDispatch()
  const [zoom, setZoom] = useState<number>(1)
  const [signUpRef, { height: signUpHeight, width: signUpWidth }] =
    useElementSize()

  const isBrowser = () => typeof window !== 'undefined'

  const { isSigningUp }: IAuthState = useAuthState()

  const signUpContentHeight =
    signUpHeight + 2 * PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING
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
    adjustableZoom < 1 && adjustableZoom > 0 && !isNaN(adjustableZoom)
      ? contentHeight * FIT_CONTENT_RATIO +
        2 * PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING
      : undefined

  const adjustableCardWidth =
    adjustableZoom < 1 ? signUpWidth * FIT_CONTENT_RATIO : undefined

  useEffect(() => {
    // debounced updating the zoom factor
    if (
      Math.abs(zoom - adjustableZoom) > DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD
    ) {
      setZoom(adjustableZoom)
    }
  }, [adjustableZoom])

  useEffect(() => {
    if (isSigningUp) {
      dispatch(
        resetAuthState({
          success: () => null,
        }),
      )
    }
  }, [])

  return (
    <PreLoggedInLayoutContainer
      title="Sign up"
      location={location}
      adjustableCardHeight={adjustableCardHeight}
      adjustableCardWidth={adjustableCardWidth}
      noRedirect
    >
      {client?.logo && (
        <LogoContainer>
          <StyledLogo src={ImageHelper.getClientLogo(client.logo)} />
        </LogoContainer>
      )}
      <StyledTitle>
        {client?.defaultClientSignUpText &&
        client?.defaultClientSignUpText?.trim().length > 0
          ? client?.defaultClientSignUpText
          : SIGN_UP_HEADER_CONTENT}
      </StyledTitle>
      <StyledSignUpContainer
        ref={signUpRef}
        $zoom={zoom}
        $shouldEnableResponsiveness={shouldEnableResponsiveness}
      >
        <SignUpForm location={location} client={client} />
      </StyledSignUpContainer>
    </PreLoggedInLayoutContainer>
  )
}
