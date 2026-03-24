import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { IAssetState, ISlide, ISlideshowData } from '@eulogise/core'
import {
  DEVICES,
  STYLE,
  useBreakpoint,
  useDetectClickOutside,
} from '@eulogise/client-core'
import {
  useAssetState,
  useAuthState,
  useEulogiseDispatch,
  useSiderMenuState,
  useSlideshowState,
} from '../../../store/hooks'
import { updateTimelineThumbnailsDisplayedAmount } from '../../../store/SlideshowState/actions'
import PhotoLibraryTimeline, {
  IPhotoLibraryTimelineProps,
} from './PhotoLibraryTimeline'
import PhotoLibraryActionBar from './PhotoLibraryActionBar'
import { IImageAsset } from '@eulogise/core'
import { ISlideshowState } from '@eulogise/core'
import { THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT } from '@eulogise/client-core'
import {
  COLLAPSED_SIDER_BASE_WIDTH,
  EXPANDED_SIDER_BASE_WIDTH,
} from '../../../components/Layout/Sider/Sider'
import { EulogiseUserRole } from '@eulogise/core'
import { updateSelectedPhotos } from '../../../store/AssetState/actions'

const MIN_BOTTOM_WHITE_AREA_HEIGHT = 200

export type ITimelinePanelProps = Omit<
  IPhotoLibraryTimelineProps,
  'scaledThumbnailWidth'
> & {
  onTimelineMouseEnter: () => void
  onTimelineMouseLeave: () => void
  isDraggingASlide: boolean
}

const StyledTimelinePanel = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
`

const TimelinePanelContent = styled.div<{
  $isMobileScreenSize: boolean
}>`
  ${({ $isMobileScreenSize }) =>
    $isMobileScreenSize
      ? `padding: ${STYLE.GUTTER} 0 0 0;`
      : `padding: ${STYLE.GUTTER} ${STYLE.GUTTER} 2rem ${STYLE.GUTTER};`}
`

const StyledMobilePhotoLibraryActionBarContainer = styled.div`
  padding-bottom: ${THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT}px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledMobileBottomWhiteArea = styled.div<{
  $bottomWhiteAreaHeight: number
}>`
  ${({ $bottomWhiteAreaHeight }) =>
    $bottomWhiteAreaHeight ? `height: ${$bottomWhiteAreaHeight}px;` : ``}
`

const StyledTimelinePanelContentContainer = styled.div``

const PhotoLibraryTimelinePanel: React.FunctionComponent<
  ITimelinePanelProps
> = (props) => {
  const {
    onTimelineMouseEnter,
    onTimelineMouseLeave,
    isDraggingASlide,
    mobileSelectedImageIndex,
    setMobileSelectedImageIndex,
    sortedImages,
    ...timelineProps
  } = props
  const thisRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useEulogiseDispatch()
  const { timelineThumbnailsDisplayedAmount = 0 } = useSlideshowState()
  const { isCollapsed: isSiderMenuCollapsed } = useSiderMenuState()
  const { account } = useAuthState()
  const role = account?.role
  const isContributor = role === EulogiseUserRole.CONTRIBUTOR

  const { isSelectingPhoto, selectedPhotos }: IAssetState = useAssetState()

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  const thumbnailContainerWidthCompensation = isMobileScreenSize ? 0 : 16 * 2

  const timelinePanelContentRef = useDetectClickOutside({
    onTriggered: () => setMobileSelectedImageIndex(undefined),
  })

  const isBrowser = () => typeof window !== 'undefined'

  const windowWidth = isBrowser() ? window.innerWidth : 0

  const siderMenuWidth =
    isMobileScreenSize || isContributor
      ? 0
      : isSiderMenuCollapsed
      ? COLLAPSED_SIDER_BASE_WIDTH
      : EXPANDED_SIDER_BASE_WIDTH

  const timelinePanelContentWidthWithoutPadding =
    windowWidth - thumbnailContainerWidthCompensation - siderMenuWidth

  const desktopScaledThumbnailWidth =
    (timelinePanelContentWidthWithoutPadding -
      (timelineThumbnailsDisplayedAmount + 2) *
        parseInt((STYLE.GUTTER as string).replace('rem', '')) *
        16) /
    timelineThumbnailsDisplayedAmount

  const mobileScaledThumbnailWidth =
    (timelinePanelContentWidthWithoutPadding -
      2 * Number((STYLE.HALF_GUTTER as string).replace('rem', '')) * 16) /
    timelineThumbnailsDisplayedAmount

  const scaledThumbnailWidth = isMobileScreenSize
    ? mobileScaledThumbnailWidth
    : desktopScaledThumbnailWidth

  const defaultThumbnailWidth = parseInt(
    (STYLE.SLIDESHOW_THUMBNAIL_WIDTH as string).replace('px', ''),
    10,
  )

  const defaultThumbnailHeight = parseInt(
    (STYLE.SLIDESHOW_THUMBNAIL_HEIGHT as string).replace('px', ''),
    10,
  )

  const thumbnailScaledFactor = scaledThumbnailWidth / defaultThumbnailWidth
  const scaledThumbnailHeight = thumbnailScaledFactor * defaultThumbnailHeight

  const bottomWhiteAreaHeight =
    2 * scaledThumbnailHeight < MIN_BOTTOM_WHITE_AREA_HEIGHT
      ? MIN_BOTTOM_WHITE_AREA_HEIGHT
      : 2 * scaledThumbnailHeight

  useEffect(() => {
    if (isMobileScreenSize) {
      dispatch(updateTimelineThumbnailsDisplayedAmount(3))
    } else {
      dispatch(updateTimelineThumbnailsDisplayedAmount(4))
    }
  }, [isMobileScreenSize])

  useEffect(() => {
    if (!thisRef.current) return

    const touchStartListener = () => {
      onTimelineMouseEnter()
    }
    thisRef.current.addEventListener('touchstart', touchStartListener, true)
    return () => {
      if (thisRef.current) {
        thisRef.current!.removeEventListener('touchstart', touchStartListener)
      }
    }
  }, [])

  const mobileSelectedImage: IImageAsset =
    sortedImages?.[mobileSelectedImageIndex]

  const slideshowState: ISlideshowState = useSlideshowState()

  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides ?? []

  const existingFileHandles = slides?.map((s) => s.image?.filestackHandle)

  const isSelected: boolean = !!existingFileHandles.find(
    (h) => mobileSelectedImage?.content?.filestackHandle === h,
  )

  return (
    <StyledTimelinePanel
      data-element-type="timeline"
      id="photo-image-library-timeline"
      ref={thisRef}
      onClick={() => {
        // This will make sure that the isHoveringTimeline is false when clicking
        // the remove slideshow button at the bottom of a slide
        onTimelineMouseLeave()
      }}
      onMouseEnter={onTimelineMouseEnter}
      onMouseLeave={() => {
        // ignore mouseLeave Event when an image/slide is being dragged outside the TimelinePanel
        if (isDraggingASlide) {
          return
        }
        onTimelineMouseLeave()
      }}
      onTouchStartCapture={onTimelineMouseEnter}
      onTouchEnd={onTimelineMouseLeave}
    >
      <StyledTimelinePanelContentContainer ref={timelinePanelContentRef}>
        <TimelinePanelContent $isMobileScreenSize={isMobileScreenSize}>
          <PhotoLibraryTimeline
            {...timelineProps}
            mobileSelectedImageIndex={mobileSelectedImageIndex}
            sortedImages={sortedImages}
            setMobileSelectedImageIndex={setMobileSelectedImageIndex}
            scaledThumbnailWidth={scaledThumbnailWidth}
            onSelectPhotoClick={(image: IImageAsset) => {
              if (isSelectingPhoto) {
                let updatedSelectedPhotos = [...selectedPhotos]

                const hasPhotoSelected = selectedPhotos?.some(
                  (img: IImageAsset) => img.id === image.id,
                )
                if (hasPhotoSelected) {
                  updatedSelectedPhotos = updatedSelectedPhotos.filter(
                    (img) => img.id !== image.id,
                  )
                } else {
                  updatedSelectedPhotos = [...updatedSelectedPhotos, image]
                }
                dispatch(
                  updateSelectedPhotos({
                    selectedPhotos: updatedSelectedPhotos,
                  }),
                )
              }
            }}
          />
        </TimelinePanelContent>
        {isMobileScreenSize && !isNaN(mobileSelectedImageIndex) && (
          <StyledMobilePhotoLibraryActionBarContainer>
            <PhotoLibraryActionBar
              mobileSelectedImageIndex={mobileSelectedImageIndex}
              thumbnailActionContainerTopOffset={0}
              image={mobileSelectedImage}
              isSelected={isSelected}
            />
          </StyledMobilePhotoLibraryActionBarContainer>
        )}
        {isMobileScreenSize && (
          <StyledMobileBottomWhiteArea
            onTouchStart={() => setMobileSelectedImageIndex(undefined)}
            $bottomWhiteAreaHeight={bottomWhiteAreaHeight}
          />
        )}
      </StyledTimelinePanelContentContainer>
    </StyledTimelinePanel>
  )
}

export default PhotoLibraryTimelinePanel
