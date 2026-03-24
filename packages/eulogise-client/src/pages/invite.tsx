import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { COLOR } from '@eulogise/client-core'
import { PreLoggedInLayout } from '../ui/components/Layout/PreLoggedInLayout'
import { HeaderTextXL } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../ui/store/hooks'
import { login, memoriseInviteToken } from '../ui/store/AuthState/actions'
import {
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  EulogiseUserType,
  IAuthAccount,
} from '@eulogise/core'
import {
  CardProductHelper,
  NavigationHelper,
  UrlHelper,
} from '@eulogise/helpers'

const StyledInvitePage = styled(PreLoggedInLayout)<{ isLoading: boolean }>`
  color: ${COLOR.TEXT_COLOR};
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const InvitePage: React.FunctionComponent<PageProps> = ({ location }) => {
  const [account, setAccount] = useState<IAuthAccount | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useEulogiseDispatch()
  const accountRole: EulogiseUserRole = account?.role!

  useEffect(() => {
    const token: string = UrlHelper.getQueryParam('token', location.search)
    if (!token) {
      return
    }
    dispatch(
      login({
        body: {
          type: EulogiseUserType.INVITE,
          token,
        },
        success: (acc) => {
          setAccount(acc)
        },
        callback: () => {
          dispatch(memoriseInviteToken({ inviteToken: token }))
          setTimeout(() => {
            setIsLoading(false)
          }, 5000)
        },
      }),
    )
  }, [])

  if (accountRole === EulogiseUserRole.CONTRIBUTOR) {
    NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)
  } else if (accountRole === EulogiseUserRole.VISITOR_SLIDESHOW) {
    NavigationHelper.navigate(EulogisePage.PREVIEW_SLIDESHOW)
  } else if (
    accountRole === EulogiseUserRole.COEDITOR ||
    accountRole === EulogiseUserRole.EDITOR
  ) {
    NavigationHelper.navigate(EulogisePage.DASHBOARD)
  } else if (accountRole === EulogiseUserRole.CLIENT) {
    // Done in AuthState
    // NavigationHelper.navigate(EulogisePage.CLIENT_ADMIN_CASES)
  } else {
    const product: EulogiseProduct =
      CardProductHelper.getProductByUserRole(accountRole)!
    if (product) {
      NavigationHelper.navigate(EulogisePage.PREVIEW_CARD_PRODUCT, {
        product,
      })
    }
  }

  return (
    <StyledInvitePage
      title={isLoading ? 'Loading' : 'Invalid invite'}
      location={location}
      noRedirect
      isLoading
    >
      <HeaderTextXL>
        {isLoading
          ? 'Loading. Please wait...'
          : 'This invite is not valid or expired'}
      </HeaderTextXL>
    </StyledInvitePage>
  )
}

export default InvitePage
