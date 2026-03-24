import React from 'react'
import styled from 'styled-components'
import { BOOKLET_EDITOR_COLORS } from '@eulogise/core'
import { COLOR } from '@eulogise/client-core'
import { ChevronDownIcon } from '../icons'
import { Dropdown, DropdownMenu, DropdownMenuItem } from '../Dropdown'
import { EditorDropdownButton } from './EditorDropdownButton'

interface IStyledThumbProps {
  backgroundColor: string
}

interface IEditorColorPanelProps {
  onToggleColor: (color: string) => void
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}

const StyledColorMenuContainer = styled(DropdownMenu)`
  display: flex;
  width: 128px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 4px;

  &::after {
    content: '';
    flex: auto;
  }
`

const StyledColorItem = styled(DropdownMenuItem)`
  display: inline-block;
  padding: 2px;
`

const StyledThumb = styled.div<IStyledThumbProps>`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px ${COLOR.SHALLOW_GREY} solid;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export const EditorColorDropdown: React.FC<IEditorColorPanelProps> = ({
  onToggleColor,
  getPopupContainer,
}) => (
  <Dropdown
    trigger={['hover']}
    getPopupContainer={getPopupContainer}
    placement="bottomRight"
    overlay={
      <StyledColorMenuContainer>
        {BOOKLET_EDITOR_COLORS.map(({ label, value, color }, index) => (
          <StyledColorItem
            key={index}
            onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
            onClick={() => onToggleColor(value)}
            title={label}
          >
            <StyledThumb backgroundColor={color} />
          </StyledColorItem>
        ))}
      </StyledColorMenuContainer>
    }
  >
    <EditorDropdownButton>
      Color
      <ChevronDownIcon />
    </EditorDropdownButton>
  </Dropdown>
)
