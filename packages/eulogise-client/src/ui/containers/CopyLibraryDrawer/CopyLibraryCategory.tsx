import React, { useState } from 'react'
import {
  DropdownArrowDownIcon,
  DropdownArrowUpIcon,
} from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import styled from 'styled-components'
import { ICopyCatogries } from '@eulogise/core'
import CopyLibraryDropdown from './CopyLibraryDrowpdown'

const StyledCopyCategoryContainer = styled.div``

const StyledCopyCategoryTitleContainer = styled.div<{ isSelected?: boolean }>`
  min-height: 60px;
  min-width: 100%;
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
  margin: 20px 0;
  border: 2px solid ${COLOR.BLACK};
  position: relative;
  border-radius: ${STYLE.SIDER_ITEM_BORDER_RADIUS};
  ${({ isSelected }) => isSelected && ` background-color: ${COLOR.DARK_BLUE};`}
`

interface ICopyCategoryProps extends ICopyCatogries {
  onClose: () => void
  onReplaceText: (replaceText: string) => void
}

const StyledCopyCategory = styled.div<{ isSelected?: boolean }>`
  color: ${COLOR.BLACK};
  min-width: 100%;
  font-size: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  ${({ isSelected }) => isSelected && `color: ${COLOR.WHITE};`}
`

const CopyLibraryCategory = ({
  name,
  copies,
  onClose,
  onReplaceText,
}: ICopyCategoryProps): JSX.Element | null => {
  const [isSelected, setSelected] = useState<boolean>(false)

  return (
    <StyledCopyCategoryContainer>
      <StyledCopyCategoryTitleContainer
        onClick={() => setSelected(!isSelected)}
        isSelected={isSelected}
      >
        <StyledCopyCategory isSelected={isSelected}>
          {name}
          {isSelected ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
        </StyledCopyCategory>
      </StyledCopyCategoryTitleContainer>

      <CopyLibraryDropdown
        copies={copies}
        isSelected={isSelected}
        onClose={onClose}
        onReplaceText={onReplaceText}
      />
    </StyledCopyCategoryContainer>
  )
}

export default CopyLibraryCategory
