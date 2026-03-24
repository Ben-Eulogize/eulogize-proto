import React from 'react'
import styled from 'styled-components'
import { COLOR, STYLE, useIsNotDesktop } from '@eulogise/client-core'
import PhotoLibraryImageLayout from './PhotoLibraryImageLayout'
import { ImageHelper, StringHelper } from '@eulogise/helpers'
import { CheckedIcon } from '@eulogise/client-components'

import { SortableHandle } from '@eulogise/client-components'
import { IImageAsset } from '@eulogise/core'

export const BORDER_SIZE = 3
const SLIDE_THUMBNAIL_ACTION_ICON_WIDTH = 20
const SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT = 20

const StyledThumbnailContainer = styled.div<{
  $scaledThumbnailWidth: number
  $scaledThumbnailHeight: number
  $isMobileScreenSize: boolean
  $isMobileThumbnailSelected: boolean
  $isHoverable: boolean
  $isPhotoSelected: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${BORDER_SIZE}px solid ${COLOR.WHITE};
  ${({
    $isMobileScreenSize,
    $isMobileThumbnailSelected,
    $isHoverable,
    $isPhotoSelected,
  }) => {
    if ($isPhotoSelected) {
      return `border: ${BORDER_SIZE}px solid ${COLOR.DARK_BLUE};`
    }
    if ($isMobileScreenSize) {
      return $isMobileThumbnailSelected
        ? `border: ${BORDER_SIZE}px solid ${COLOR.DARK_BLUE}; cursor: pointer;`
        : `border: ${BORDER_SIZE}px solid ${COLOR.WHITE};`
    }
    return $isHoverable
      ? `&:hover { border: ${BORDER_SIZE}px solid ${COLOR.DARK_BLUE}; cursor: pointer; }`
      : ``
  }}
  background-color: ${COLOR.SHADOW_GREY};
  position: relative;
  ${({
    $scaledThumbnailWidth,
    $scaledThumbnailHeight,
  }: {
    $scaledThumbnailWidth?: number
    $scaledThumbnailHeight?: number
  }) =>
    $scaledThumbnailWidth
      ? `width: ${$scaledThumbnailWidth}px; height: ${$scaledThumbnailHeight}px;`
      : `width: ${STYLE.SLIDESHOW_THUMBNAIL_WIDTH}; height: ${STYLE.SLIDESHOW_THUMBNAIL_HEIGHT};`}
`

const StyledSlideNumberContainer = styled.div<{
  $isNotDesktop: boolean
  $isMobileScreenSize: boolean
}>`
  position: absolute;
  width: 20px;
  height: 20px;
  ${({ $isMobileScreenSize }) =>
    $isMobileScreenSize
      ? `
  left: 0px;
  top: 4px;
`
      : `
left: 8px;
top: 8px;`}
`

const ToolbarNumber = styled.div`
  min-width: ${SLIDE_THUMBNAIL_ACTION_ICON_WIDTH}px;
  height: ${SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT}px;
  border-radius: 10px;
  text-align: center;
  background-color: ${COLOR.DARK_BLUE};
  color: white;
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: -3px;
  padding-right: 3px;
  ${({ isDoubleDigits }: { isDoubleDigits?: boolean }) =>
    isDoubleDigits &&
    `
    padding-right: 4.8px;
  `}
`

const StyledSlideSelectorContainer = styled.div<{}>`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0px;
  top: 4px;
`

const StyledSelectedPhotoContainer = styled.div<{}>`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0px;
  top: 4px;
`

const MobileThumbnailSelector = styled.div<{
  $isPhotoSelected: boolean
}>`
  min-width: ${SLIDE_THUMBNAIL_ACTION_ICON_WIDTH}px;
  height: ${SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT}px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: -3px;
  padding-right: 3px;
  background-color: ${COLOR.DARK_BLUE};
  color: ${COLOR.WHITE};
  border: 1px solid black;
`

const DesktopThumbnailSelector = styled.div<{
  $isPhotoSelected: boolean
}>`
  min-width: ${SLIDE_THUMBNAIL_ACTION_ICON_WIDTH}px;
  height: ${SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT}px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: -3px;
  padding-right: 3px;
  background-color: ${COLOR.DARK_BLUE};
  color: ${COLOR.WHITE};
  border: 1px solid black;

  ${({ $isPhotoSelected }: { $isPhotoSelected?: boolean }) =>
    $isPhotoSelected
      ? `
  background-color: ${COLOR.DARK_BLUE};
  color: ${COLOR.WHITE};
  border: 1px solid black;
`
      : `
  background-color: ${COLOR.WHITE};
  color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.DARK_BLUE};
`}
`

const StyledCheckedIcon = styled(CheckedIcon)`
  padding-left: 2px;
`
interface IContributorArrangeImageThumbnailProps {
  scaledThumbnailWidth: number
  scaledThumbnailHeight: number
  image: IImageAsset
  caseId: string
  imageIndex: number
  isMobileScreenSize: boolean
  isMobileThumbnailSelected: boolean
  onHoverThumbnailIndex: number
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMobileClick: () => void
  onSelectPhotoClick: () => void
  isShowNumberContainer?: boolean
  isHoverable?: boolean
  isAlwaysShowingSpin?: boolean
  isRemovingImageBackground?: boolean
  isSelectingPhotos?: boolean
  isPhotoSelected?: boolean
}

const PhotoLibraryImageThumbnail = ({
  scaledThumbnailWidth,
  scaledThumbnailHeight,
  caseId,
  imageIndex,
  image,
  isMobileScreenSize,
  onMouseEnter,
  onMouseLeave,
  onMobileClick,
  isMobileThumbnailSelected,
  isShowNumberContainer = true,
  isHoverable = true,
  isAlwaysShowingSpin = false,
  isRemovingImageBackground = false,
  isSelectingPhotos = false,
  isPhotoSelected = false,
  onSelectPhotoClick,
}: IContributorArrangeImageThumbnailProps) => {
  if (!image && !isAlwaysShowingSpin) {
    return null
  }
  const isNotDesktop: boolean = useIsNotDesktop() ?? false
  const imageContent = image?.content
  const { width, height } = {
    width: StringHelper.convertPixelStringToNumber(
      STYLE.SLIDESHOW_THUMBNAIL_WIDTH as string,
    ),
    height: StringHelper.convertPixelStringToNumber(
      STYLE.SLIDESHOW_THUMBNAIL_HEIGHT as string,
    ),
  } // Default width and height if not provided
  const imageSrcUrl = ImageHelper.getImageUrl(imageContent, {
    caseId,
    width: width * 2,
    height: height * 2,
    isFormatToJpg: false,
    resizeMethod: '', // force image to be using the width and height that specified
  })

  return (
    <StyledThumbnailContainer
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onMobileClick}
      $scaledThumbnailWidth={scaledThumbnailWidth}
      $scaledThumbnailHeight={scaledThumbnailHeight}
      $isMobileScreenSize={isMobileScreenSize}
      $isMobileThumbnailSelected={isMobileThumbnailSelected}
      $isHoverable={isHoverable}
      onClick={onSelectPhotoClick}
      $isPhotoSelected={isPhotoSelected}
    >
      <PhotoLibraryImageLayout
        src={imageSrcUrl!}
        isAlwaysShowingSpin={isAlwaysShowingSpin}
        isRemovingImageBackground={isRemovingImageBackground}
      />
      {isShowNumberContainer && (
        <StyledSlideNumberContainer
          $isNotDesktop={isNotDesktop}
          $isMobileScreenSize={isMobileScreenSize}
        >
          <ToolbarNumber isDoubleDigits={imageIndex >= 10}>
            {imageIndex + 1}
          </ToolbarNumber>
        </StyledSlideNumberContainer>
      )}
      {isMobileScreenSize && (isMobileThumbnailSelected || isPhotoSelected) && (
        <StyledSlideSelectorContainer>
          <MobileThumbnailSelector
            $isPhotoSelected={!isMobileScreenSize && isPhotoSelected}
          >
            <StyledCheckedIcon />
          </MobileThumbnailSelector>
        </StyledSlideSelectorContainer>
      )}
      {isSelectingPhotos && !isMobileScreenSize && (
        <StyledSelectedPhotoContainer>
          <DesktopThumbnailSelector
            $isPhotoSelected={!isMobileScreenSize && isPhotoSelected}
          >
            <StyledCheckedIcon />
          </DesktopThumbnailSelector>
        </StyledSelectedPhotoContainer>
      )}
    </StyledThumbnailContainer>
  )
}

export default React.memo(SortableHandle(PhotoLibraryImageThumbnail))
