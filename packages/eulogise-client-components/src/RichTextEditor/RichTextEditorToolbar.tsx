import React from 'react'
import { EditorState } from 'draft-js'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { InlineStyleValueEnum } from '@eulogise/core'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from '@ant-design/icons'

interface IRichTextEditorToolbarProps {
  editorState: EditorState
  onToggleInlineStyle: (style: string) => void
  visible: boolean
}

const ToolbarContainer = styled.div<{ $visible: boolean }>`
  display: flex;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid ${COLOR.LITE_GREY};
  background-color: ${COLOR.SUPER_LITE_GREY};
  border-radius: 4px 4px 0 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0.6)};
  transition: opacity 0.2s;
`

const ToolbarButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid
    ${({ $active }) => ($active ? COLOR.CORE_PURPLE : 'transparent')};
  border-radius: 4px;
  background-color: ${({ $active }) =>
    $active ? COLOR.CORE_PURPLE_10 : 'transparent'};
  color: ${({ $active }) =>
    $active ? COLOR.CORE_PURPLE : COLOR.DARK_GREEN_BLACK};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? COLOR.CORE_PURPLE_10 : COLOR.LITE_GREY};
    border-color: ${COLOR.CORE_PURPLE_30};
  }

  &:active {
    background-color: ${COLOR.CORE_PURPLE_10};
  }
`

const INLINE_STYLES = [
  { style: InlineStyleValueEnum.BOLD, icon: BoldOutlined, label: 'Bold' },
  { style: InlineStyleValueEnum.ITALIC, icon: ItalicOutlined, label: 'Italic' },
  {
    style: InlineStyleValueEnum.UNDERLINE,
    icon: UnderlineOutlined,
    label: 'Underline',
  },
]

export const RichTextEditorToolbar: React.FC<IRichTextEditorToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
  visible,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <ToolbarContainer $visible={visible}>
      {INLINE_STYLES.map(({ style, icon: Icon, label }) => (
        <ToolbarButton
          key={style}
          $active={currentStyle.has(style)}
          onMouseDown={(e) => {
            e.preventDefault()
            onToggleInlineStyle(style)
          }}
          title={label}
          type="button"
        >
          <Icon />
        </ToolbarButton>
      ))}
    </ToolbarContainer>
  )
}
