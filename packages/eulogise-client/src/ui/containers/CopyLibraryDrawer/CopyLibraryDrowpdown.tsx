import React from 'react'
import { ICopyLibraryCopy } from '@eulogise/core'
import CopyLibraryContentComponent from './CopyLibraryContent'

type CopyLibraryDropdownProps = {
  isSelected: boolean
  copies: Array<ICopyLibraryCopy>
  onClose: () => void
  onReplaceText: (replaceText: string) => void
}

const CopyLibraryDropdown = ({
  isSelected,
  copies,
  onClose,
  onReplaceText,
}: CopyLibraryDropdownProps): JSX.Element | null => {
  if (!isSelected) {
    return null
  }
  return (
    <>
      {copies.map((c: ICopyLibraryCopy) => {
        const { title, copyFrom, text } = c
        return (
          <CopyLibraryContentComponent
            title={title}
            copyFrom={copyFrom}
            text={text}
            onClose={onClose}
            onReplaceText={onReplaceText}
          />
        )
      })}
    </>
  )
}

export default CopyLibraryDropdown
