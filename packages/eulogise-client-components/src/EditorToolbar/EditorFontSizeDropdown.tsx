import React from 'react'
import styled from 'styled-components'
import { BOOKLET_FONT_SIZES, ICardProductTheme } from '@eulogise/core'
import { ChevronDownIcon } from '../icons'
import { Dropdown, DropdownMenu, DropdownMenuItem } from '../Dropdown'
import { EditorDropdownButton } from './EditorDropdownButton'
import { STYLE } from '@eulogise/client-core'

interface IEditorFontSizeDropdownProps {
  productTheme?: ICardProductTheme
  onChange: (fontSize: number) => void
  fontSize: number
  maxFontSize?: number
}

const StyledTextMenuItem = styled(DropdownMenuItem)<any>`
  ${STYLE.TEXT_SMALL};

  ${({ $active }: { $active: boolean }) =>
    $active ? `background: linear-gradient(to bottom, #3dc4d0, #05b6e7);` : ``}
`

export const EditorFontSizeDropdown: React.FC<IEditorFontSizeDropdownProps> = ({
  productTheme,
  onChange,
  fontSize,
  maxFontSize = 100,
}) => {
  if (!productTheme) {
    return null
  }

  return (
    <Dropdown
      trigger={['hover']}
      overlay={
        <DropdownMenu
          onMouseDown={(ev: React.MouseEvent) => {
            ev.preventDefault()
            ev.stopPropagation()
          }}
        >
          {BOOKLET_FONT_SIZES.filter((fz) => fz <= maxFontSize).map((value) => (
            <StyledTextMenuItem
              key={value}
              onClick={() => onChange(value)}
              onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
              $active={fontSize === value}
            >
              {value}
            </StyledTextMenuItem>
          ))}
        </DropdownMenu>
      }
    >
      <EditorDropdownButton>
        {fontSize ? fontSize : 20}&nbsp;
        <ChevronDownIcon />
      </EditorDropdownButton>
    </Dropdown>
  )
}
