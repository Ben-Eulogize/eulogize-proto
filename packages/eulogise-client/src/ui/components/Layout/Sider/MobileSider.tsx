import React from 'react'
import { Layout } from 'antd'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import SiderBottomMenu from './SiderBottomMenu'
import { DEVICES, SCREEN_SIZE } from '@eulogise/client-core'
import { COLOR } from '@eulogise/client-core'
import { useAuthState, useMobileMenuState } from '../../../store/hooks'
import { EulogiseUserRole, IAuthState } from '@eulogise/core'
import { useBreakpoint } from '@eulogise/client-core'
import { useIsDebug } from '../../../hooks/useIsDebug'
import { SiderTopMenu } from './SiderTopMenu/SiderTopMenu'

interface IMobileSiderProps {
  location?: WindowLocation
  isClientAdminSider?: boolean
}

const LimitFeatureText = styled.div`
  padding: 0 1rem;
`

const StyledSider = styled(Layout.Sider)<{ $isDebug: boolean; open: boolean }>`
  position: fixed;
  z-index: 100;
  height: 100%;
  top: 4rem;
  transform: translateX(-100%);
  transition: 0.3s;
  background-color: ${COLOR.TINT_TEAL_BLUE};
  ${({ $isDebug, open }) => `
    ${
      $isDebug
        ? `display: none;`
        : `
          ${SCREEN_SIZE.TABLET} {
            display: none;
          }
        `
    }
    ${open ? `transform: translateX(0);` : ''}
  `}
`

const MobileSider: React.FC<IMobileSiderProps> = ({
  location,
  isClientAdminSider,
}): JSX.Element => {
  const isDebug = useIsDebug()
  const { isOpen } = useMobileMenuState()
  const { account }: IAuthState = useAuthState()
  const screenSize = useBreakpoint()
  const isMobile = screenSize === DEVICES.MOBILE
  const userRole: EulogiseUserRole = account?.role!
  if (!account) {
    return null!
  }

  return (
    <StyledSider width={240} trigger={null} open={!!isOpen} $isDebug={isDebug}>
      <SiderTopMenu
        location={location!}
        userRole={userRole}
        isClientAdminSider={isClientAdminSider}
      />
      {isMobile && account?.role !== EulogiseUserRole.CONTRIBUTOR && (
        <LimitFeatureText>
          In order to edit your memorials please log in using a larger screen
          size.
        </LimitFeatureText>
      )}
      <SiderBottomMenu
        location={location!}
        userRole={userRole}
        isClientAdminSider={isClientAdminSider}
      />
    </StyledSider>
  )
}

export default MobileSider
