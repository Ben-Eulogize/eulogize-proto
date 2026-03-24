import React from 'react'
import styled from 'styled-components'
import { EmptyThumbnailListContributorItem } from './EmptyThumbnailListContributorItem'
import {
  AddContributorIcon,
  UploadPicturesIcon,
  EditIcon,
} from '@eulogise/client-components'
import { DEVICES, useBreakpoint } from '@eulogise/client-core'

interface IEmptyThumbnailListContributorProps {
  onMouseEnter: () => void
  scaledThumbnailWidth?: number
}

const StyledEmptyThumbnailListContributor = styled.div<{
  $isMobileScreenSize: boolean
}>`
  display: flex;
  ${({ $isMobileScreenSize }) =>
    $isMobileScreenSize
      ? `
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex-wrap: wrap;
    
    `
      : ` flex-wrap: wrap;`}
`

export interface IEulogiseContributorEmptyThumbnailItemContent {
  index: number
  title: string
  icon: React.ReactNode
  description: string
}

const EULOGISE_CONTRIBUTOR_EMPTY_THUMBNAIL_CONTENT: Array<IEulogiseContributorEmptyThumbnailItemContent> =
  [
    {
      index: 0,
      title: 'Invite',
      icon: <AddContributorIcon />,
      description:
        'Invite any friends or family to contribute any photos via the button on the top row.',
    },
    {
      index: 1,
      title: 'Add Photos',
      icon: <UploadPicturesIcon />,
      description:
        'Use the two purple buttons to upload your photos from your computer or mobile.',
    },
    {
      index: 2,
      title: 'Select Order',
      icon: <></>,
      description:
        'Drag and drop to select the order you would like the photos to appear in your tribute.',
    },
    {
      index: 3,
      title: 'Edit or Rotate',
      icon: <EditIcon />,
      description:
        'If needed, you can click the pencil icon to edit, rotate or crop your photos.',
    },
  ]

const EmptyThumbnailListContributor: React.FC<
  IEmptyThumbnailListContributorProps
> = ({ onMouseEnter, scaledThumbnailWidth }) => {
  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  return (
    <StyledEmptyThumbnailListContributor
      $isMobileScreenSize={isMobileScreenSize}
      onMouseEnter={onMouseEnter}
    >
      {EULOGISE_CONTRIBUTOR_EMPTY_THUMBNAIL_CONTENT.map((item) => {
        return <EmptyThumbnailListContributorItem thumbnailContent={item} />
      })}
    </StyledEmptyThumbnailListContributor>
  )
}

export default EmptyThumbnailListContributor
