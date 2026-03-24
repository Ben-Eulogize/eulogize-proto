import React from 'react'
import styled from 'styled-components'
import {
  Dropdown,
  ProfileIcon,
  DropdownPlacement,
} from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import HeaderProfileDropdownMenu from './HeaderProfileDropdownMenu'
import { useAuthState, useEulogiseDispatch } from '../../store/hooks'
import { EulogiseProduct } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { EulogiseUserRole } from '@eulogise/core'
import { useBreakpoint } from '@eulogise/client-core'
import { DEVICES } from '@eulogise/client-core'
import { ConnectionCounter } from './ConnectionCounter'

const StyledHeaderProfileDropdown = styled(Dropdown)`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`

const ProfileText = styled.div`
  padding-right: ${STYLE.GUTTER};
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const HeaderProfileDropdown = ({ location }: { location: any }) => {
  const dispatch = useEulogiseDispatch()
  const { account } = useAuthState()

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })
  const isAtCardProductEditor = CardProductHelper.getIsAtCardProductEditor({
    location,
  })
  const isAtSlideshowTimelineEditor: boolean =
    product === EulogiseProduct.SLIDESHOW

  const isAdmin = account?.role === EulogiseUserRole.ADMIN

  const shouldShowAccountName =
    !isAtCardProductEditor &&
    !isAtSlideshowTimelineEditor &&
    !isMobileScreenSize &&
    !isAdmin

  if (!account) {
    return null
  }

  return (
    <StyledHeaderProfileDropdown
      className="header-profile-dropdown"
      overlay={HeaderProfileDropdownMenu(dispatch, location)}
      placement={DropdownPlacement.BOTTOM_RIGHT}
      trigger={['click']}
    >
      <div>
        {shouldShowAccountName && <ProfileText>{account.fullName}</ProfileText>}
        <ProfileIcon />
        <ConnectionCounter />
      </div>
    </StyledHeaderProfileDropdown>
  )
}

export default HeaderProfileDropdown
