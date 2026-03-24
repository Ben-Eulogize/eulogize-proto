import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { MenuButtonIcon } from '@eulogise/client-components'
import { SCREEN_SIZE } from '@eulogise/client-core'
import { toggleMenuAction } from '../../store/MobileMenuState/actions'
import {
  useAuthState,
  useEulogiseDispatch,
  useMobileMenuState,
} from '../../store/hooks'
import { IAuthState, IMobileMenuState } from '@eulogise/core'

interface IMobileMenuButtonProps {}

const StyledMobileMenuButton = styled(Button)`
  border: none;
  box-shadow: none;
  outline: none;
  color: currentColor;
  transition: all 0.3s;
  transform: rotate(0);
  & {
    ${({ open }: { open: boolean }) => open && `transform: rotate(-90deg)`}
  }
  &:hover,
  &:active {
    color: currentColor;
  }
  ${SCREEN_SIZE.TABLET} {
    display: none;
  }
`

const MobileMenuButton: React.FunctionComponent<
  IMobileMenuButtonProps
> = () => {
  const { isOpen }: IMobileMenuState = useMobileMenuState()
  const { webtoken }: IAuthState = useAuthState()
  const dispatch = useEulogiseDispatch()
  if (!webtoken) {
    return null
  }
  return (
    <StyledMobileMenuButton
      icon={<MenuButtonIcon />}
      open={!!isOpen}
      onClick={() => dispatch(toggleMenuAction())}
    />
  )
}

export default MobileMenuButton
