import React from 'react'
import type { DraftInlineStyle } from 'draft-js'
import { Button, ButtonType } from '../Button'
import { InlineStyleValueEnum } from '@eulogise/core'
import { EditorInlineStyleIcon } from './EditorInlineStyleIcon'

interface IEditorInlineStylesButtonsProps {
  inlineStyle: DraftInlineStyle
  onToggleInlineStyle: (value: InlineStyleValueEnum) => void
}

interface IInlineStyles {
  label: string
  value: InlineStyleValueEnum
  icon: string
}

const INLINE_STYLES: Array<IInlineStyles> = [
  { label: 'Bold', value: InlineStyleValueEnum.BOLD, icon: 'bold' },
  { label: 'Italic', value: InlineStyleValueEnum.ITALIC, icon: 'italic' },
  {
    label: 'Underline',
    value: InlineStyleValueEnum.UNDERLINE,
    icon: 'underline',
  },
]

export const EditorInlineStylesButtons: React.FC<
  IEditorInlineStylesButtonsProps
> = ({ onToggleInlineStyle, inlineStyle }) => {
  return (
    <>
      {INLINE_STYLES.map(
        (
          {
            label,
            value,
            icon,
          }: { label: string; value: InlineStyleValueEnum; icon: string },
          index: number,
        ) => (
          <Button
            noMarginLeft
            noMarginRight
            key={index}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onToggleInlineStyle(value)}
            title={label}
            tooltip={label}
            buttonType={
              inlineStyle.has(value) ? ButtonType.PRIMARY : ButtonType.WHITE
            }
          >
            <EditorInlineStyleIcon value={value} />
          </Button>
        ),
      )}
    </>
  )
}
