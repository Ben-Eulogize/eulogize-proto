import React from 'react'
import styled from 'styled-components'
import { EmptyThumbnailListItem } from './styles'

interface IEmptyThumbnailListProps {
  onMouseEnter: () => void
  scaledThumbnailWidth?: number
}

const StyledEmptyThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const EmptyThumbnailList: React.FC<IEmptyThumbnailListProps> = ({
  onMouseEnter,
  scaledThumbnailWidth,
}) => (
  <StyledEmptyThumbnailList onMouseEnter={onMouseEnter}>
    <EmptyThumbnailListItem>
      Upload your images to get started
    </EmptyThumbnailListItem>
    <EmptyThumbnailListItem>
      Select images in your library to add them to your slideshow
    </EmptyThumbnailListItem>
    <EmptyThumbnailListItem>
      Drag and drop your images to re-arrange their order
    </EmptyThumbnailListItem>
  </StyledEmptyThumbnailList>
)

export default EmptyThumbnailList
