import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { EulogisePhotobookCoverType } from '@eulogise/core'
import { PhotobookHelper } from '@eulogise/helpers'

const StyledPhotobookCoverTypeSelectorItem = styled.div`
  cursor: pointer;
  position: relative;
  &:hover,
  &.selected {
    &:after {
      content: '';
      position: absolute;
      border: 3px solid ${COLOR.CORE_PURPLE};
      border-radius: 50%;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
`

const PhotobookCoverTypeSelectorImg = styled.div<{
  $backgroundImageUrl: string
}>`
  width: 3rem;
  height: 3rem;
  margin: 0.25rem;
  border-radius: 50%;
  ${({ $backgroundImageUrl }) =>
    $backgroundImageUrl
      ? `
    background-image: url(${$backgroundImageUrl});
    background-size: contain;
    background-position: center;
  `
      : ''}
`

type IPhotobookCoverTypeSelectorItemProps = {
  coverType: EulogisePhotobookCoverType
  selected: boolean
  onClick: () => void
}

export const PhotobookCoverTypeSelectorItem = ({
  coverType,
  selected,
  onClick,
}: IPhotobookCoverTypeSelectorItemProps) => {
  const thumbnailUrl = PhotobookHelper.getCoverPageFabricUrl({
    coverType,
  })
  const coverTypeOption = PhotobookHelper.getPhotobookCoverTypeOptionByValue({
    coverType,
  })
  if (!coverTypeOption) {
    return null
  }
  return (
    <StyledPhotobookCoverTypeSelectorItem
      className={selected ? `selected` : ''}
      onClick={onClick}
    >
      <PhotobookCoverTypeSelectorImg $backgroundImageUrl={thumbnailUrl} />
    </StyledPhotobookCoverTypeSelectorItem>
  )
}
