import React from 'react'
import { InlineStyleValueEnum } from '@eulogise/core'
import { BoldIcon, ItalicIcon, UnderlinedIcon } from '../icons'

interface IEditorInlineStyleIconProps {
  value: InlineStyleValueEnum
}

export const EditorInlineStyleIcon: React.FC<IEditorInlineStyleIconProps> = ({
  value,
}) => {
  switch (value) {
    case InlineStyleValueEnum.BOLD:
      return <BoldIcon />
    case InlineStyleValueEnum.ITALIC:
      return <ItalicIcon />
    case InlineStyleValueEnum.UNDERLINE:
      return <UnderlinedIcon />
    default:
      return null
  }
}
