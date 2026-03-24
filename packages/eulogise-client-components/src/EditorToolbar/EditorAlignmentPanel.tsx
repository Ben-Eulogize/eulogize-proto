import React from 'react'
import { Button, ButtonType } from '../Button'
import { AlignmentType, IAlignment } from '@eulogise/core'
import { EditorAlignmentIcon } from './EditorAlignmentIcon'

interface IAlignmentPanelProps {
  onToggleAlignment: (type: AlignmentType) => void
  type: AlignmentType
}

const ALIGNMENT: Array<IAlignment> = [
  { label: 'Left', value: AlignmentType.LEFT, icon: 'align-left' },
  { label: 'Center', value: AlignmentType.CENTER, icon: 'align-center' },
  { label: 'Right', value: AlignmentType.RIGHT, icon: 'align-right' },
]

export const EditorAlignmentPanel: React.FC<IAlignmentPanelProps> = ({
  onToggleAlignment,
  type,
}) => {
  return (
    <>
      {ALIGNMENT.map(
        (
          {
            label,
            value,
            icon,
          }: { label: string; value: AlignmentType; icon: string },
          index,
        ) => (
          <Button
            noMarginLeft
            noMarginRight
            key={index}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onToggleAlignment(value)}
            title={label}
            tooltip={label}
            buttonType={type === value ? ButtonType.PRIMARY : ButtonType.WHITE}
          >
            <EditorAlignmentIcon value={value} />
          </Button>
        ),
      )}
    </>
  )
}
