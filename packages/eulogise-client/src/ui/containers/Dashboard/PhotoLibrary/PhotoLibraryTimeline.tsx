import React from 'react'
import styled from 'styled-components'
import EmptyThumbnailListContributor from '../../SlideshowTimeline/EmptyThumbnailListContributor'
import PhotoLibraryThumbnailList, {
  IPhotoLibraryThumbnailListProps,
} from './PhotoLibraryThumbnailList'
const StyledPhotoLibraryTimeline = styled.div``

export type IPhotoLibraryTimelineProps = IPhotoLibraryThumbnailListProps

const PhotoLibraryTimeline: React.FunctionComponent<
  IPhotoLibraryTimelineProps
> = (props) => {
  const {
    sortedImages = [],
    onThumbnailMouseEnter,
    onSelectPhotoClick,
    ...thumbnailListProps
  } = props
  return (
    <StyledPhotoLibraryTimeline>
      {sortedImages?.length === 0 && (
        <EmptyThumbnailListContributor
          onMouseEnter={() => onThumbnailMouseEnter(0)}
        />
      )}
      {sortedImages?.length > 0 && (
        <PhotoLibraryThumbnailList
          {...thumbnailListProps}
          onThumbnailMouseEnter={onThumbnailMouseEnter}
          sortedImages={sortedImages}
          onSelectPhotoClick={onSelectPhotoClick}
        />
      )}
    </StyledPhotoLibraryTimeline>
  )
}

export default PhotoLibraryTimeline
