import React from 'react'
import { Button, ButtonType } from '../Button'
import { HynmsAndPrayersIcon } from '../icons'

interface IEditorCopyLibraryButton {
  onOpenCopyLibraryDrawer: () => void
}

export const EditorCopyLibraryButton: React.FC<IEditorCopyLibraryButton> = ({
  onOpenCopyLibraryDrawer,
}) => {
  return (
    <Button
      noMarginLeft
      noMarginRight
      onMouseDown={(event) => event.preventDefault()}
      onClick={onOpenCopyLibraryDrawer}
      title="Hymns & Prayers"
      tooltip="A library of popular funeral readings"
      buttonType={ButtonType.WHITE}
    >
      <HynmsAndPrayersIcon />
    </Button>
  )
}
