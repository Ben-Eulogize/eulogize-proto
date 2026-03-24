import React from 'react'
import styled from 'styled-components'
import Menu from 'antd/lib/menu'

const MenuItem = Menu.Item

// @ts-ignore
const StyledTextMenuItem = styled(MenuItem)<any>`
  line-height: normal;

  ${({ $active }: { $active: boolean }) =>
    $active ? `background: linear-gradient(to bottom, #3dc4d0, #05b6e7);` : ``}
`

interface IEditorTextDropdownMenuProps {
  onChange: (value: string | number) => void
  values: Array<number | string>
  selectedValue: string | number
}

export const EditorTextDropdownMenu: React.FC<IEditorTextDropdownMenuProps> = ({
  onChange,
  values,
  selectedValue,
}) => (
  // @ts-ignore
  <Menu>
    {values.map((value) => (
      <StyledTextMenuItem
        key={value}
        onClick={() => onChange(value)}
        onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
        $active={selectedValue === value}
      >
        {value}
      </StyledTextMenuItem>
    ))}
  </Menu>
)
