import React from 'react'
import { ICopyCatogries } from '@eulogise/core'
import styled from 'styled-components'
import CopyLibraryCategory from './CopyLibraryCategory'

const StyledCopyLibraryCopyCatogries = styled.div``

type ICopyLibraryCategoryGroupProps = {
  categories: Array<ICopyCatogries>
  onClose: () => void
  onReplaceText: (replaceText: string) => void
}

const CopyLibraryCategoryGroup = ({
  categories,
  onClose,
  onReplaceText,
}: ICopyLibraryCategoryGroupProps): JSX.Element | null => {
  if (!categories) {
    return null
  }
  return (
    <StyledCopyLibraryCopyCatogries>
      {categories.map((category) => {
        const { name, copies } = category
        return (
          <CopyLibraryCategory
            name={name}
            copies={copies}
            onClose={onClose}
            onReplaceText={onReplaceText}
          />
        )
      })}
    </StyledCopyLibraryCopyCatogries>
  )
}

export default CopyLibraryCategoryGroup
