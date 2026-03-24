import styled from 'styled-components'
import { default as AntDropdown, DropdownProps } from 'antd/lib/dropdown'

export type DropdownItemProps = {
  label: string
  key: string
}

// @ts-ignore
export const Dropdown: any = styled(AntDropdown)<DropdownProps>`
  cursor: pointer;
`
