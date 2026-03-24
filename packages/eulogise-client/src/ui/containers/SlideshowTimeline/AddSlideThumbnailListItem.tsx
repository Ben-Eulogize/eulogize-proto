import React from 'react'
import styled from 'styled-components'
import { EmptyThumbnailListItem } from './styles'
import { AddIcon } from '@eulogise/client-components'

interface IAddSlideThumbnailListItemProps {
  onMouseEnter?: () => void
}

const StyledAddSlideThumbnailListItem = styled(EmptyThumbnailListItem)``

const StyledAddIcon = styled(AddIcon)`
  font-size: 2rem;
`

const AddSlideThumbnailListItem: React.FC<IAddSlideThumbnailListItemProps> = ({
  onMouseEnter,
}) => (
  <StyledAddSlideThumbnailListItem onMouseEnter={onMouseEnter}>
    <StyledAddIcon />
  </StyledAddSlideThumbnailListItem>
)

export default AddSlideThumbnailListItem
