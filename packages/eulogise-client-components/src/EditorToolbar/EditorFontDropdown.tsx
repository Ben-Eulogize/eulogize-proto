import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon } from '../icons'
import { BOOKLET_FONTS, ICardProductTheme, IFont } from '@eulogise/core'
import { Dropdown, DropdownMenu, DropdownMenuItem } from '../Dropdown'
import { EditorDropdownButton } from './EditorDropdownButton'
import { STYLE } from '@eulogise/client-core'

interface IEditorFontDropdownProps {
  productTheme?: ICardProductTheme
  onChange: (fontName: string) => void
  fontName: string
}

const StyledTextMenuItem = styled(DropdownMenuItem)<any>`
  ${STYLE.TEXT_SMALL};
  line-height: normal;

  ${({ $active }: { $active: boolean }) =>
    $active ? `background: linear-gradient(to bottom, #3dc4d0, #05b6e7);` : ``}
`

export const EditorFontDropdown: React.FC<IEditorFontDropdownProps> = ({
  productTheme,
  onChange,
  fontName,
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
          {BOOKLET_FONTS.map(({ name }: IFont) => (
            <StyledTextMenuItem
              key={name}
              onClick={() => onChange(name)}
              onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
              $active={fontName === name}
              style={{ fontFamily: name }}
            >
              {name}
            </StyledTextMenuItem>
          ))}
        </DropdownMenu>
      }
    >
      <EditorDropdownButton>
        {fontName ? (
          <span style={{ fontFamily: fontName }}>{fontName}</span>
        ) : (
          'Unstyled'
        )}
        &nbsp;
        <ChevronDownIcon />
      </EditorDropdownButton>
    </Dropdown>
  )
}
