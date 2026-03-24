import React from 'react'
import styled from 'styled-components'
import { COLOR, STYLE, SLIDESHOW_COLORS } from '@eulogise/client-core'
import { DropdownMenu } from './DropdownMenu'
import { DropdownMenuItem } from './DropdownMenuItem'

interface IColorSelectorDropdownMenuProps {
  onColorSelect: (color: string) => void
}

const Color = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid ${COLOR.GREY};
  border-radius: 2px;
  overflow: hidden;
  ${({ color }: { color: string }) =>
    color &&
    `
    background-color: ${color};
  `}
`

const StyledColorSelectorDropdownMenu = styled(DropdownMenu)`
  width: 170px;
  display: flex;
  flex-wrap: wrap;
  padding: calc(${STYLE.GUTTER} / 2);
  border-radius: 2px;
  && {
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  }
`

const StyledDropdownMenuItem = styled(DropdownMenuItem)`
  &&& {
    display: inline-block;
    padding: 2px;
    margin: 0 0.05rem 0 0.05rem;
  }
`

const ColorSelectorDropdownMenu: React.FC<IColorSelectorDropdownMenuProps> = ({
  onColorSelect,
}) => (
  <StyledColorSelectorDropdownMenu>
    {SLIDESHOW_COLORS.map(
      ({ value, color }: { value: string; color: string }) => (
        <StyledDropdownMenuItem
          key={value}
          onClick={() => onColorSelect(color)}
        >
          <Color color={color} />
        </StyledDropdownMenuItem>
      ),
    )}
  </StyledColorSelectorDropdownMenu>
)

export default ColorSelectorDropdownMenu
