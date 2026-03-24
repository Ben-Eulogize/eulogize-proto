import React from 'react'
import styled from 'styled-components'
import { StyledPhotoLibraryThumbnail } from './styles'
import { COLOR, STYLE } from '@eulogise/client-core'
import { IEulogiseContributorEmptyThumbnailItemContent } from './EmptyThumbnailListContributor'

const EmptyThumbnailListContributorItemContainer = styled(
  StyledPhotoLibraryThumbnail,
)<{
  $scaledThumbnailWidth?: number
}>`
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
  margin: 0 ${STYLE.GUTTER} ${STYLE.GUTTER} 0;
  padding: 1rem;
  width: ${STYLE.SLIDESHOW_THUMBNAIL_WIDTH};
  height: ${STYLE.SLIDESHOW_THUMBNAIL_HEIGHT};
  color: ${COLOR.PRIMARY};
`

const StyledRowContainer = styled.div`
  display: flex;
  padding: 6px 0;
`

const StyledText = styled.div`
  padding: 0 8px 0 0;
  ${STYLE.HEADING_SMALL};
`

const StyledIconContainer = styled.div`
  padding: 4px 0 0 6px;
  font-size: 20px;
`

export const EmptyThumbnailListContributorItem = ({
  thumbnailContent,
}: {
  thumbnailContent: IEulogiseContributorEmptyThumbnailItemContent
}) => {
  const { index, title, icon, description } = thumbnailContent
  return (
    <EmptyThumbnailListContributorItemContainer>
      <StyledRowContainer>
        <StyledText>{`Step ${index + 1}:`}</StyledText>

        <StyledText>{title}</StyledText>

        <StyledIconContainer>{icon}</StyledIconContainer>
      </StyledRowContainer>
      <StyledRowContainer>{description}</StyledRowContainer>
    </EmptyThumbnailListContributorItemContainer>
  )
}
