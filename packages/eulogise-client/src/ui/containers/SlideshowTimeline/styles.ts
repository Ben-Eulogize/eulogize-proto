import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

export const StyledPhotoLibraryThumbnail = styled.div<{
  $scaledThumbnailWidth?: number
  $isMobileScreenSize?: boolean
}>`
  width: ${STYLE.SLIDESHOW_THUMBNAIL_WIDTH};
  user-select: none;
  position: relative;
  overflow: hidden;
  ${({ $scaledThumbnailWidth }) =>
    `
      ${$scaledThumbnailWidth && `width: ${$scaledThumbnailWidth}px;`}
  `}

  ${({ $isMobileScreenSize }) =>
    `
      ${$isMobileScreenSize ? `` : `margin-right: ${STYLE.GUTTER};`}
  `}
`

export const EmptyThumbnailListItem = styled(StyledPhotoLibraryThumbnail)<{
  $scaledThumbnailWidth?: number
}>`
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
  margin: 0 ${STYLE.GUTTER} ${STYLE.GUTTER} 0;
  padding: 1rem;
  width: ${STYLE.SLIDESHOW_THUMBNAIL_WIDTH};
  height: ${STYLE.SLIDESHOW_THUMBNAIL_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.PRIMARY};
`
