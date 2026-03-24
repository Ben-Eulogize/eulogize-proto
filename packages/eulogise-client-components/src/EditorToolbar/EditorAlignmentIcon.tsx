import React from 'react'
import { AlignmentType } from '@eulogise/core'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '../icons'

interface IEditorAlignmentIcon {
  value: AlignmentType
}

export const EditorAlignmentIcon: React.FC<IEditorAlignmentIcon> = ({
  value,
}) => {
  switch (value) {
    case AlignmentType.LEFT:
      return <AlignLeftIcon />
    case AlignmentType.CENTER:
      return <AlignCenterIcon />
    case AlignmentType.RIGHT:
      return <AlignRightIcon />
    default:
      return null
  }
}
