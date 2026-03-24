import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { COLOR } from '@eulogise/client-core'
import { SlidedPhotoGalleryReactComponentThumbnail } from './SlidedPhotoGalleryReactComponentThumbnail'
import { DownloadProgressBar } from '@eulogise/client-components'

const SLIDES_TO_SHOW = 4
const THUMBNAIL_DIMENSION = 90

const StyledPhotoSlickContainer = styled.div``

const StyledPhotoWrapper = styled.div<{ $displayedThumbnailHeight: number }>`
  position: relative;
  width: 100%;
  height: ${({ $displayedThumbnailHeight }) => $displayedThumbnailHeight}px;
  overflow: hidden;
  border-radius: 20px;
`

const FadeImage = styled.img<{
  $isVisible: boolean
  $displayedThumbnailHeight: number
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: ${({ $displayedThumbnailHeight }) => $displayedThumbnailHeight}px;
  object-fit: cover;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  background-color: #000;
`

const DisabledArrowStyle = `
  opacity: 0.3;
  pointer-events: none;
`

const ArrowStyle = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: ${COLOR.SUPER_LITE_GREY};
  color: ${COLOR.DOVE_GREY};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    color: ${COLOR.DOVE_GREY};
  }
`

const StyledDownloadProgressBar = styled(DownloadProgressBar)<{
  // SlidedPhotoGallery is using $isThumbnail
  $isThumbnail?: boolean
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $isThumbnail }) => ($isThumbnail ? `width: 90%;` : `width: 60%;`)}
`

const PhotoPrevArrow = styled(LeftOutlined)<{ disabled?: boolean }>`
  left: 12px;
  ${ArrowStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  z-index: 3;
  ${({ disabled }) => disabled && DisabledArrowStyle}
`

const PhotoNextArrow = styled(RightOutlined)<{ disabled?: boolean }>`
  right: 12px;
  ${ArrowStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  z-index: 3;
  ${({ disabled }) => disabled && DisabledArrowStyle}
`

const StyledThumbnailSlider = styled(Slider)`
  margin-top: 16px;
`

const StyledThumbnailCardContainer = styled.div<{ $padding: string }>`
  display: block !important;
  ${({ $padding }) => $padding && `padding: ${$padding};`}
`

const StyledThumbnailCard = styled.img<{ $isSelected: boolean }>`
  border-radius: 8px;
  width: ${THUMBNAIL_DIMENSION}px;
  height: ${THUMBNAIL_DIMENSION}px;
  object-fit: cover;
  ${({ $isSelected }) =>
    $isSelected && `border: 1px solid ${COLOR.CORE_PURPLE_80};`}
  cursor: pointer;
`

export enum ISlidedPhotoGalleryAssetType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
  REACT_COMPONENT = 'REACT_COMPONENT',
}

export type ISlidedPhotoGalleryAssetPhoto = {
  src: string
  type: ISlidedPhotoGalleryAssetType.PHOTO
}

export type ISlidedPhotoGalleryAssetVideo = {
  src: string
  type: ISlidedPhotoGalleryAssetType.VIDEO
}

export type ISlidedPhotoGalleryAssetReactComponent = {
  type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT
  component: React.ReactNode
  isPhotobookPreview?: boolean
}

export type ISlidedPhotoGalleryAsset =
  | ISlidedPhotoGalleryAssetPhoto
  | ISlidedPhotoGalleryAssetVideo
  | ISlidedPhotoGalleryAssetReactComponent

interface SlidedPhotoGalleryProps {
  thumbnails: ISlidedPhotoGalleryAsset[]
  displayedThumbnailIndex: number
  setDisplayedThumbnailIndex: (index: number) => void
  displayedThumbnailHeight: number
  isShowLoadingBar?: boolean
  loadingProgress?: number
}

const StyledReactComponentContainer = styled.div<{
  $isVisible: boolean
  $displayedThumbnailHeight: number
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: ${({ $displayedThumbnailHeight }) => $displayedThumbnailHeight}px;
  object-fit: cover;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${COLOR.ISABELLINE};
  div#styled-page {
    // fix white space around the edges of the react component
    background-size: cover !important;
  }
`

const StyledReactComponentOverlay = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: pointer;
`

const SlidedPhotoGallery = ({
  isShowLoadingBar,
  loadingProgress,
  thumbnails,
  displayedThumbnailIndex,
  setDisplayedThumbnailIndex,
  displayedThumbnailHeight = 0,
}: SlidedPhotoGalleryProps) => {
  const [isSliding, setIsSliding] = useState(false)
  const sliderRef = useRef<Slider>(null)

  const atFirst = displayedThumbnailIndex === 0
  const atLast = displayedThumbnailIndex === thumbnails.length - 1

  const settings = {
    slidesToShow: SLIDES_TO_SHOW,
    slidesToScroll: 4,
    arrows: false,
    infinite: false,
    draggable: true,
    afterChange: (index: number) => setDisplayedThumbnailIndex(index),
  }

  const handlePrev = () => {
    if (isSliding || displayedThumbnailIndex === 0) return
    setIsSliding(true)
    const newIndex = displayedThumbnailIndex - 1
    setDisplayedThumbnailIndex(newIndex)
    if (newIndex <= thumbnails.length - SLIDES_TO_SHOW) {
      sliderRef.current?.slickGoTo(newIndex)
    }
    setTimeout(() => setIsSliding(false), 300)
  }

  const handleNext = () => {
    if (isSliding || displayedThumbnailIndex >= thumbnails.length - 1) return
    setIsSliding(true)
    const newIndex = displayedThumbnailIndex + 1
    setDisplayedThumbnailIndex(newIndex)
    if (newIndex <= thumbnails.length - SLIDES_TO_SHOW) {
      sliderRef.current?.slickGoTo(newIndex)
    }
    setTimeout(() => setIsSliding(false), 300)
  }

  return (
    <StyledPhotoSlickContainer>
      <StyledPhotoWrapper $displayedThumbnailHeight={displayedThumbnailHeight}>
        {thumbnails.map((t, i) => {
          switch (t.type) {
            case ISlidedPhotoGalleryAssetType.PHOTO: {
              return (
                <FadeImage
                  key={i}
                  src={t.src}
                  $isVisible={i === displayedThumbnailIndex}
                  $displayedThumbnailHeight={displayedThumbnailHeight}
                />
              )
            }
            case ISlidedPhotoGalleryAssetType.VIDEO: {
              throw new Error('Video type not implemented')
            }
            case ISlidedPhotoGalleryAssetType.REACT_COMPONENT: {
              return (
                <StyledReactComponentContainer
                  key={i}
                  $isVisible={i === displayedThumbnailIndex}
                  $displayedThumbnailHeight={displayedThumbnailHeight}
                >
                  {isShowLoadingBar && loadingProgress !== undefined ? (
                    <StyledDownloadProgressBar
                      $isThumbnail={false}
                      percent={loadingProgress}
                    />
                  ) : (
                    t.component
                  )}
                </StyledReactComponentContainer>
              )
            }
            default:
              return null
          }
        })}
        <PhotoPrevArrow onClick={handlePrev} disabled={atFirst || isSliding} />
        <PhotoNextArrow onClick={handleNext} disabled={atLast || isSliding} />
      </StyledPhotoWrapper>

      <StyledThumbnailSlider ref={sliderRef} {...settings}>
        {thumbnails.map((p, index) => {
          switch (p.type) {
            case ISlidedPhotoGalleryAssetType.PHOTO:
              return (
                <StyledThumbnailCardContainer $padding={'0 10px'} key={index}>
                  <StyledThumbnailCard
                    src={p.src}
                    $isSelected={index === displayedThumbnailIndex}
                    onClick={() => setDisplayedThumbnailIndex(index)}
                  />
                </StyledThumbnailCardContainer>
              )
            case ISlidedPhotoGalleryAssetType.VIDEO: {
              throw new Error('Video type not implemented')
            }
            case ISlidedPhotoGalleryAssetType.REACT_COMPONENT: {
              return (
                <StyledThumbnailCardContainer $padding={'0 10px'} key={index}>
                  <SlidedPhotoGalleryReactComponentThumbnail
                    isLoading={!!isShowLoadingBar}
                    fitterStyle={
                      isShowLoadingBar ? { width: '100%', height: '100%' } : {}
                    }
                    size={THUMBNAIL_DIMENSION}
                    onClick={() => setDisplayedThumbnailIndex(index)}
                    isSelected={index === displayedThumbnailIndex}
                    isAddThumbnailPadding={!!p.isPhotobookPreview}
                  >
                    <StyledReactComponentOverlay />
                    {isShowLoadingBar && loadingProgress !== undefined ? (
                      <StyledDownloadProgressBar
                        $isThumbnail={true}
                        percent={loadingProgress}
                      />
                    ) : (
                      p.component
                    )}
                  </SlidedPhotoGalleryReactComponentThumbnail>
                </StyledThumbnailCardContainer>
              )
            }
          }
        })}
      </StyledThumbnailSlider>
    </StyledPhotoSlickContainer>
  )
}

export default SlidedPhotoGallery
