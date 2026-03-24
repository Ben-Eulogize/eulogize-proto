import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import SlideshowTimeline from '../SlideshowTimeline/SlideshowTimeline'
import {
  EulogisePage,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  IAuthState,
  ISlide,
  ISlideGroup,
  ISlideshowData,
  ISlideshowTheme,
  ISlideTransitionParams,
  IUserGuideHelperConfig,
} from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import {
  useAuthState,
  useEulogiseDispatch,
  useSiderMenuState,
  useSlideshowState,
  useTvWelcomeScreenState,
} from '../../store/hooks'
import { updateTitleSlide } from '../../store/SlideshowState/actions'
import { AlertFull, AlertLeft, AlertRight } from '@eulogise/client-components'
import { NavigationHelper, SlideshowHelper } from '@eulogise/helpers'
import { showGuide } from '../../store/GuideWalkThroughState/action'
import {
  COLLAPSED_SIDER_BASE_WIDTH,
  EXPANDED_SIDER_BASE_WIDTH,
} from '../../components/Layout/Sider/Sider'
import {
  COLLAPSED_IMAGE_LIBRARY_BASE_WIDTH,
  EXPANDED_IMAGE_LIBRARY_BASE_WIDTH,
} from './UploadPicturesPanel/UploadPicturesPanel'

interface ITimelinePanelProps {
  caseId: string
  slides: Array<ISlide>
  onRemoveSlideClick: (slide: ISlide) => void
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideGroups: Array<ISlideGroup>
  onThumbnailMouseEnter: (slideIndex: number) => void
  onTimelineMouseEnter: () => void
  onTimelineMouseLeave: () => void
  onSlideUpdate: (params: ISlideTransitionParams) => void
  hoveringThumbnailIndex: number
  onEditSlideModalOpen: () => void
  onEditSlideModalClose: () => void
  isDraggingASlide: boolean
}

const StyledTimelinePanel = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
`

const StyledDragText = styled.div`
  padding-left: ${STYLE.GUTTER};
  margin-bottom: ${STYLE.GUTTER};
`

const TimelinePanelContent = styled.div`
  padding: ${STYLE.GUTTER} ${STYLE.GUTTER} 2rem ${STYLE.GUTTER};
`

const StyledAlertFull = styled(AlertFull)`
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0 2rem;
`

const TimelinePanel: React.FunctionComponent<ITimelinePanelProps> = ({
  caseId,
  slides,
  slideshowData,
  slideshowTheme,
  onRemoveSlideClick,
  slideGroups,
  onThumbnailMouseEnter,
  onTimelineMouseEnter,
  onTimelineMouseLeave,
  onSlideUpdate,
  hoveringThumbnailIndex,
  onEditSlideModalOpen,
  onEditSlideModalClose,
  isDraggingASlide,
}) => {
  const thisRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeTvScreen } = useTvWelcomeScreenState()

  const { isCollapsed: isSiderMenuCollapsed } = useSiderMenuState()
  const {
    timelineThumbnailsDisplayedAmount = 0,
    timelineUploadImagePanelCollapsed,
  } = useSlideshowState()

  const totalImageSlides: number =
    SlideshowHelper.getTotalImageSlides(slideshowData)

  const { account }: IAuthState = useAuthState()
  const role = account?.role
  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig

  const validRoleAutoShowGuide: boolean =
    role === EulogiseUserRole.CUSTOMER ||
    role === EulogiseUserRole.COEDITOR ||
    role === EulogiseUserRole.EDITOR ||
    role === EulogiseUserRole.CLIENT
  const hasViewedSlideshowGuide =
    userGuideHelperConfig?.hasViewedSlideshow ?? false

  const windowWidth = window.innerWidth
  const siderMenuWidth = isSiderMenuCollapsed
    ? COLLAPSED_SIDER_BASE_WIDTH
    : EXPANDED_SIDER_BASE_WIDTH
  const uploadImagePanelWidth = timelineUploadImagePanelCollapsed
    ? COLLAPSED_IMAGE_LIBRARY_BASE_WIDTH
    : EXPANDED_IMAGE_LIBRARY_BASE_WIDTH
  const panelContentWidth = windowWidth - siderMenuWidth - uploadImagePanelWidth

  const timelinePanelContentWidthWithoutPadding = panelContentWidth - 16 * 2

  const scaledThumbnailWidth =
    (timelinePanelContentWidthWithoutPadding -
      (timelineThumbnailsDisplayedAmount + 2) *
        parseInt((STYLE.GUTTER as string).replace('rem', '')) *
        16) /
    timelineThumbnailsDisplayedAmount

  useEffect(() => {
    if (validRoleAutoShowGuide && slides && !hasViewedSlideshowGuide) {
      dispatch(showGuide(GUIDE_SHOW_UP_PAGE.SLIDESHOW, 0, false))
    }
  }, [])

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

  const onEditTitleSlideClick = () => {
    NavigationHelper.navigate(EulogisePage.EDIT_TV_WELCOME_SCREEN, {
      tvWelcomeScreenId: activeTvScreen?.id,
    })
  }
  return (
    <StyledTimelinePanel
      data-element-type="timeline"
      ref={thisRef}
      onClick={() => {
        // This will make sure that the isHoveringTimeline is false when clicking
        // the remove slideshow button at the bottom of a slide
        onTimelineMouseLeave()
      }}
      onMouseEnter={() => {
        onTimelineMouseEnter()
        // this is to ensure user can drag and drop image, from image library,
        // to the bottom (space) of the slideshow editor
        // refer to the video of the https://trello.com/c/VeUIFWKD/1451-can-no-longer-drag-and-drop-in-the-video-editor-from-the-photo-drawer
        onThumbnailMouseEnter(slides.length)
      }}
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
      {totalImageSlides === 0 && (
        <StyledAlertFull>
          <AlertLeft>
            <StyledDragText>
              Drag the images from your image library to the slideshow timeline.
            </StyledDragText>
          </AlertLeft>

          <AlertRight $hasMarginTop></AlertRight>
        </StyledAlertFull>
      )}
      <TimelinePanelContent>
        <SlideshowTimeline
          onRemoveSlideClick={onRemoveSlideClick}
          onThumbnailMouseEnter={onThumbnailMouseEnter}
          onEditSlideModalOpen={onEditSlideModalOpen}
          onEditSlideModalClose={onEditSlideModalClose}
          slides={slides}
          caseId={caseId}
          slideshowData={slideshowData}
          slideshowTheme={slideshowTheme}
          slideGroups={slideGroups}
          hoveringThumbnailIndex={hoveringThumbnailIndex}
          onSlideUpdate={onSlideUpdate}
          onEditStartTitleSlideClick={onEditTitleSlideClick}
          onEditEndTitleSlideClick={onEditTitleSlideClick}
          onDisableStartTitleSlideClick={() => {
            dispatch(
              updateTitleSlide({
                slideshowData,
                startTitleSlideData: {
                  isTitleSlideEnable: false,
                },
              }),
            )
          }}
          onDisableEndTitleSlideClick={() => {
            dispatch(
              updateTitleSlide({
                slideshowData,
                endTitleSlideData: {
                  isTitleSlideEnable: false,
                },
              }),
            )
          }}
          scaledThumbnailWidth={scaledThumbnailWidth}
        />
      </TimelinePanelContent>
    </StyledTimelinePanel>
  )
}

export default TimelinePanel
