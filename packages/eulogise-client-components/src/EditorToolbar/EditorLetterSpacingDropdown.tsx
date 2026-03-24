import React from 'react'
import styled from 'styled-components'
import { BOOKLET_LETTER_SPACING_PX, ICardProductTheme } from '@eulogise/core'
import { Dropdown, DropdownMenu, DropdownMenuItem } from '../Dropdown'
import { EditorDropdownButton } from './EditorDropdownButton'
import { STYLE } from '@eulogise/client-core'
import { LetterSpacingIcon } from '../icons'

interface IEditorLetterSpacingDropdownProps {
  productTheme?: ICardProductTheme
  onChange: (letterSpacing: number) => void
  letterSpacing: number
}

const StyledTextMenuItem = styled(DropdownMenuItem)<any>`
  ${STYLE.TEXT_SMALL};

  ${({ $active }: { $active: boolean }) =>
    $active ? `background: linear-gradient(to bottom, #3dc4d0, #05b6e7);` : ``}
`

export const EditorLetterSpacingDropdown: React.FC<
  IEditorLetterSpacingDropdownProps
> = ({ productTheme, onChange, letterSpacing }) => {
  if (!productTheme) {
    return null
  }

  return (
    <Dropdown
      trigger={['hover']}
      overlay={
        <DropdownMenu>
          {BOOKLET_LETTER_SPACING_PX.map((value: number) => (
            <StyledTextMenuItem
              key={value}
              onClick={() => onChange(value)}
              onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
              $active={letterSpacing === value}
            >
              {value}
            </StyledTextMenuItem>
          ))}
        </DropdownMenu>
      }
    >
      <EditorDropdownButton>
        <LetterSpacingIcon />
      </EditorDropdownButton>
    </Dropdown>
  )
}
