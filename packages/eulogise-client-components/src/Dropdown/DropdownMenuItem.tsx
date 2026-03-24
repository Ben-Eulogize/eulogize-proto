import styled from 'styled-components'
import Menu from 'antd/lib/menu'
import { COLOR, STYLE } from '@eulogise/client-core'

// @ts-ignore
export const DropdownMenuItem = styled(Menu.Item)`
  ${STYLE.TEXT_MEDIUM};
  && {
    &.ant-menu-item-selected,
    &:hover,
    &:active,
    &:focus {
      background-color: ${COLOR.SUPER_LITE_GREY};
      color: currentColor;
    }
    &.ant-dropdown-menu-item-disabled {
      background-color: ${COLOR.WHITE};
      color: ${COLOR.GREY};
    }
  }
`
