import React from 'react'
import styled from 'styled-components'
import { SortableContainer } from '@eulogise/client-components'
import PhotoLibraryTimelinePanel, {
  ITimelinePanelProps,
} from './PhotoLibraryTimelinePanel'
import { useHeaderHeight } from '../../../hooks/useGlobal'

const StyledPhotoLibraryEditPanel = styled.div<{
  $isShow: boolean
  $height: string
}>`
  display: flex;
  ${({ $isShow, $height }) => `
    height: ${$height};
    ${
      $isShow === undefined || $isShow === true
        ? ``
        : `display: none !important;`
    }
  `}
`

type IEditSlideshowPanelProps = ITimelinePanelProps & {
  className?: string
  isShow: boolean
}

const PhotoLibraryEditPanel: React.FunctionComponent<
  IEditSlideshowPanelProps
> = (props) => {
  const height = useHeaderHeight()
  const { className, isShow, ...timelineProps } = props
  return (
    <StyledPhotoLibraryEditPanel
      className={className}
      $height={height ? `calc(100vh - ${height}px)` : '100vh'}
      id="photo-image-library"
      $isShow={isShow}
    >
      <PhotoLibraryTimelinePanel {...timelineProps} />
    </StyledPhotoLibraryEditPanel>
  )
}

export default SortableContainer(PhotoLibraryEditPanel)
