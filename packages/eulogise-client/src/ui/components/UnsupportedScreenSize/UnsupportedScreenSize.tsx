import React from 'react'
import styled from 'styled-components'
import { EulogisePage } from '@eulogise/core'
import { COLOR, STYLE } from '@eulogise/client-core'
import seaGreyBg from './sea-grey.jpg'
import { Button } from '@eulogise/client-components'
import { logout } from '../../store/AuthState/actions'
import { useEulogiseDispatch } from '../../store/hooks'
import { NavigationHelper } from '@eulogise/helpers'

const StyledUnsupportedScreenSize = styled.div`
  text-align: center;
  background: url(${seaGreyBg}) no-repeat;
  background-size: cover;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
`

const UnsupportedScreenSizeContentContainer = styled.div`
  background-color: ${COLOR.DARK_GREEN_BLACK};
  color: ${COLOR.LITE_GREY};
  padding: 5rem 2rem;
  border-radius: 0.5rem;
`

const UnsupportedScreenSizeTitle = styled.div`
  ${STYLE.HEADING_LARGE}
  margin-bottom: 2.625rem;
`

const UnsupportedScreenSizeContent = styled.div`
  ${STYLE.TEXT_MEDIUM}
`

const SignOutButton = styled(Button)`
  margin-top: 2.625rem;
`

const UnsupportedScreenSize = ({ className }: { className?: string }) => {
  const dispatch = useEulogiseDispatch()
  return (
    <StyledUnsupportedScreenSize className={className}>
      <UnsupportedScreenSizeContentContainer>
        <UnsupportedScreenSizeTitle>
          Sorry, this screen is too small
        </UnsupportedScreenSizeTitle>
        <UnsupportedScreenSizeContent>
          Eulogize is not optimised for this size screen. Please move to a
          larger device or desktop computer to continue.
        </UnsupportedScreenSizeContent>
        <SignOutButton
          onClick={() =>
            dispatch(
              logout({
                success: () => {
                  NavigationHelper.navigate(EulogisePage.SIGN_IN)
                },
              }),
            )
          }
        >
          Sign out
        </SignOutButton>
      </UnsupportedScreenSizeContentContainer>
    </StyledUnsupportedScreenSize>
  )
}

export default UnsupportedScreenSize
