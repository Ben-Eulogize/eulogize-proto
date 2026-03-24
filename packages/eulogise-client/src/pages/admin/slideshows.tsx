import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GlobalHotKeys } from 'react-hotkeys'
import { PageProps } from 'gatsby'
import { SortEnd } from '@eulogise/client-components/src/ReactSortableHoc/types/react-sortable-hoc'
import Layout from '../../ui/components/Layout/Layout'
import {
  DEVICES,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import UnsupportedScreenSize from '../../ui/components/UnsupportedScreenSize/UnsupportedScreenSize'
import {
  useAssetState,
  useCaseState,
  useDrawerState,
  useEulogiseDispatch,
  useSlideshowState,
} from '../../ui/store/hooks'
import {
  cleanupSlideshowUndoHistory,
  fetchSlideshowsByCaseId,
  undoSlideshowContent,
  updateSlideByIndex,
  updateSlides,
} from '../../ui/store/SlideshowState/actions'
import { fetchAssetsByCaseId } from '../../ui/store/AssetState/actions'
import {
  AssetType,
  EulogiseProduct,
  EulogiseRegion,
  IAssetState,
  ICase,
  ICaseState,
  IDrawerState,
  IImageAsset,
  ISlide,
  ISlideGroup,
  ISlideshowData,
  ISlideshowState,
  ISlideTransitionParams,
  SlideshowEditorSortableContainerType,
} from '@eulogise/core'
import {
  NavigationHelper,
  SlideshowHelper,
  UtilHelper,
} from '@eulogise/helpers'
import { fetchCardProductsByCaseId } from '../../ui/store/CardProduct/actions'
import { useIsDebug } from '../../ui/hooks/useIsDebug'
import { AudioHelper } from '../../ui/helpers/AudioHelper'
import EditSlideshowPanel from '../../ui/containers/Slideshow/EditSlideshowPanel'
import { collapseSiderMenu } from '../../ui/store/SiderMenuState/action'
import { SLIDESHOW_EDITOR_KEY_MAP } from '../../ui/constants/state'
import { NoAutoScroll } from '../../ui/components/NoAutoScroll/NoAutoScroll'

const StyledSlideshowPage = styled(Layout)`
  padding: 0;
  ${SCREEN_SIZE.TABLET} {
    padding: ${STYLE.CONTENT_PADDING};
  }
`

const StyledUnsupportedScreenSize = styled(UnsupportedScreenSize)<{
  isShow: boolean
  width: string
}>`
  ${({ isShow }) => (isShow ? `display: block;` : `display: none;`)}
  ${({ width }) => (width ? `width: ${width};` : `width: 100%;`)}
  min-height: 100vh;
`

const SlideshowPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const prevTouchPointHoveringElement = useRef<Element | null>(null)
  const screenSize = useBreakpoint()
  const slideshowState: ISlideshowState = useSlideshowState()
  const caseState: ICaseState = useCaseState()
  const dispatch = useEulogiseDispatch()
  const caseId: string = caseState?.activeItem?.id!
  const {
    undoContentList,
    redoContentList,
    activeSlideshowTheme: slideshowTheme,
  } = slideshowState
  const { images, isFilestackOverlayPickerOpen }: IAssetState = useAssetState()
  // const { openDrawerId }: IDrawerState = useDrawerState()
  const [isHoveringTimeline, setIsHoveringTimeline] = useState<boolean>(false)
  const [hoveringThumbnailIndex, setHoveringThumbnailIndex] = useState<number>()
  const [isDraggingImageLibraryItem, setIsDraggingImageLibraryItem] =
    useState<boolean>(false)
  const [isDraggingASlide, setIsDraggingASlide] = useState<boolean>(false)
  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const isDebug = useIsDebug()
  const audioUrls: Array<string> = SlideshowHelper.getAudioUrls(slideshowData)
  const [sortableContainerType, setSortableContainerType] =
    useState<SlideshowEditorSortableContainerType>(
      SlideshowEditorSortableContainerType.SLIDESHOW_IMAGE_PANEL_AND_THUMBNAIL_LIST,
    )
  const isEditSlideshowPanelPanelSortable =
    sortableContainerType ===
    SlideshowEditorSortableContainerType.SLIDESHOW_IMAGE_PANEL_AND_THUMBNAIL_LIST

  useEffect(() => {
    audioUrls.forEach((audioUrl: string) => {
      AudioHelper.preloadAudio(audioUrl)
    })
  }, [audioUrls])

  useEffect(() => {
    dispatch(collapseSiderMenu())
    return () => {
      NavigationHelper.removeUnsavedListener()
      dispatch(cleanupSlideshowUndoHistory())
    }
  }, [])

  useEffect(() => {
    if (!caseId) {
      return
    }
    dispatch(
      fetchSlideshowsByCaseId({
        caseId,
        callback: () => {
          dispatch(fetchAssetsByCaseId({ caseId, assetType: AssetType.IMAGE }))
        },
      }),
    )
    dispatch(
      fetchCardProductsByCaseId({
        product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
        caseId,
        region: EulogiseRegion.AU,
      }),
    )
  }, [caseId])

  if (!slides) {
    return null
  }

  const slideGroups: Array<ISlideGroup> = SlideshowHelper.getSlideGroups(slides)

  const updateActiveSlides = (newSlides: Array<ISlide>) => {
    dispatch(updateSlides({ slides: newSlides }))
  }

  const onSlideGroupsChange = (sg: Array<ISlideGroup>) => {
    const newSlides = SlideshowHelper.transformSlideGroupsToSlides(
      sg.filter((g) => g?.id !== 'end-title-slide'), // remove the existing end title slide and replace it with the new end title slide from the slides array
      slides,
    )
    updateActiveSlides(newSlides)
  }

  const hasTitleSlide = slides[0].isTitleSlideEnable
  const onSortEnd = (sortEnd: SortEnd) => {
    const { oldIndex, newIndex } = sortEnd

    // if dragging to the title slide and is not dragging image from image library, ignore it
    if (hasTitleSlide) {
      if (!isHoveringTimeline) {
        if (oldIndex === 0 || newIndex === 0) {
          return
        }
      }
    }

    setHoveringThumbnailIndex(-1)
    setIsDraggingImageLibraryItem(false)
    setIsDraggingASlide(false)

    if (isHoveringTimeline) {
      // from image library
      const isDraggingImageFromImageLibraryToTimeline: boolean =
        oldIndex >= slides.length
      if (isDraggingImageFromImageLibraryToTimeline) {
        const imageIndex: number = oldIndex - slides.length
        const image: IImageAsset = images?.[imageIndex]!

        const sg = SlideshowHelper.getSlideGroups(
          SlideshowHelper.insertImageToSlide({
            slides,
            index:
              hoveringThumbnailIndex! +
              (hasTitleSlide ? (hoveringThumbnailIndex === 0 ? 1 : 0) : 1),
            image,
            slideshowTheme: slideshowTheme!,
          }),
        )
        onSlideGroupsChange(sg)
      } else {
        const fromIndex = oldIndex + (hasTitleSlide ? 0 : 1)
        const toIndex = newIndex + (hasTitleSlide ? 0 : 1)
        onSlideGroupsChange(
          UtilHelper.arrayMove(slideGroups, fromIndex, toIndex),
        )
      }
    }
    // triggering this will make sure that the mouse/touch will leave the timeline component
    // - on desktop, the onTimelineMouseEnter() will be trigger immediately
    // - on ipad, which works with touch event, this will indicate that the touch point is not over the timeline component
    onTimelineMouseLeave()
  }

  const onThumbnailMouseEnter = (slideIndex: number) => {
    if (isDraggingImageLibraryItem && slideIndex !== hoveringThumbnailIndex) {
      setHoveringThumbnailIndex(slideIndex)
    }
    if (!isHoveringTimeline) {
      setIsHoveringTimeline(true)
    }
  }

  const onThumbnailMouseLeave = () => {
    // this may cause flickering
    // setHoveringThumbnailIndex(-1)
  }

  const onTimelineMouseEnter = () => {
    setSortableContainerType(
      SlideshowEditorSortableContainerType.SLIDE_THUMBNAIL_LIST,
    )
  }

  const onTimelineMouseLeave = () => {
    setIsHoveringTimeline(false)
    setHoveringThumbnailIndex(-1)
    setSortableContainerType(
      SlideshowEditorSortableContainerType.SLIDESHOW_IMAGE_PANEL_AND_THUMBNAIL_LIST,
    )
  }

  const handlers = {
    UNDO: () => dispatch(undoSlideshowContent()),
    UNDO_CTRL: () => dispatch(undoSlideshowContent()),
  }

  const eulogiseCase: ICase = caseState.activeItem!
  const isShowTooSmallScreen = !isDebug && isMobileScreenSize

  let handleAddImage = (image: IImageAsset) => {
    updateActiveSlides(
      SlideshowHelper.appendImageToSlide({
        slides,
        image,
        slideshowTheme,
        eulogiseCase,
      }),
    )
  }
  let handleRemoveImage = (image: IImageAsset) => {
    updateActiveSlides(SlideshowHelper.removeImageFromSlide(slides, image))
  }
  return (
    <GlobalHotKeys keyMap={SLIDESHOW_EDITOR_KEY_MAP} handlers={handlers}>
      <NoAutoScroll />
      <StyledSlideshowPage
        location={location}
        title="Slideshow"
        noPadding={true}
        shouldHideFooter={isShowTooSmallScreen}
      >
        <StyledUnsupportedScreenSize
          width={isMobileScreenSize && `${window.screen.width}`}
          isShow={isShowTooSmallScreen}
        />
        <EditSlideshowPanel
          pressDelay={isHoveringTimeline ? 0 : 100}
          isAtContributorArrangeDashbord={false}
          containerId={
            isEditSlideshowPanelPanelSortable
              ? 'edit-slideshow-panel'
              : 'slide-thumbnail-list'
          }
          isShow={!isShowTooSmallScreen}
          axis="xy"
          onEditSlideModalOpen={() => {}}
          onEditSlideModalClose={() => {}}
          onSlideUpdate={(params: ISlideTransitionParams) => {
            const slideIndex = params.slideIndex
            if (slideIndex === undefined) {
              throw new Error('slideIndex cannot be undefined')
            }
            const slide = slides[slideIndex]
            dispatch(
              updateSlideByIndex({
                slideIndex,
                slide: {
                  ...slide,
                  image: {
                    ...slide.image,
                    transitionIn:
                      params.transitionIn ?? slide.image?.transitionIn,
                    transitionOut:
                      params.transitionOut ?? slide.image?.transitionOut,
                    animation: params.animation ?? slide.image?.animation,
                  },
                  slideDuration: params.slideDuration,
                },
              }),
            )
          }}
          undoContentList={undoContentList}
          redoContentList={redoContentList}
          useDragHandle
          onAddImage={handleAddImage}
          onToggleImage={({ image, isSelected }) => {
            if (isSelected) {
              handleRemoveImage(image)
            } else {
              handleAddImage(image)
            }
          }}
          onRemoveImage={handleRemoveImage}
          onAddAllImages={() =>
            updateActiveSlides(
              SlideshowHelper.appendRemainingImagesToSlides({
                slides,
                images: images!,
                slideshowTheme: slideshowTheme!,
              }),
            )
          }
          onRemoveSlide={(slide: ISlide) => {
            const newSlides: Array<ISlide> = SlideshowHelper.removeSlide(
              slides,
              slide,
            )
            updateActiveSlides(newSlides)
          }}
          hoveringThumbnailIndex={hoveringThumbnailIndex!}
          onThumbnailMouseEnter={onThumbnailMouseEnter}
          onTimelineMouseLeave={onTimelineMouseLeave}
          onTimelineMouseEnter={onTimelineMouseEnter}
          onSortEnd={onSortEnd}
          onSortStart={(ev: any) => {
            if (ev.index > slides.length - 1) {
              setIsDraggingImageLibraryItem(true)
            } else {
              setIsDraggingASlide(true)
            }
          }}
          onSortMove={(ev: any) => {
            // only handle 'touchmove' event since
            if (ev.type === 'touchmove' && isDraggingImageLibraryItem) {
              // if touch point has enter a slide, trigger
              // - onTimelineMouseEnter and
              // - onThumbnailMouseEnter

              // step 1: get the current position of the touch on screen
              const x = ev.touches[0].clientX
              const y = ev.touches[0].clientY
              // step 2: get the DOM element of that position
              let el = document.elementFromPoint(x, y)

              if (
                // do nothing if touch point is hovering the same element
                prevTouchPointHoveringElement &&
                prevTouchPointHoveringElement.current === el
              )
                return
              prevTouchPointHoveringElement.current = el
              // step 3: go up the tree to find the 'slideshow-thumbnail' node and the 'timeline' node
              let slideshowThumbnailEl
              let timelineEl

              while (el?.parentElement) {
                const elementType = el?.dataset?.elementType
                if (elementType === 'slideshow-thumbnail') {
                  slideshowThumbnailEl = el
                } else if (elementType === 'timeline') {
                  timelineEl = el
                }

                if (slideshowThumbnailEl && timelineEl) break

                el = el.parentElement
              }

              // step 4:
              // if 'timelline' node is null, trigger:
              // - 1. onThumbnailMouseLeave
              // - 2. onTimelineMouseLeave
              // if 'timeline' node is not null, but 'slideshow-thumbnail' is null, trigger
              // 1. onThumbnailMouseLeave
              // 2. onTimelineMouseEnter
              // if 'slideshow-thumbnail is not null, trigger
              // 1. onTimelineMouseEnter
              // 2. onThumbnailMouseEnter

              if (!timelineEl) {
                onThumbnailMouseLeave()
                onTimelineMouseLeave()
              } else {
                onTimelineMouseEnter()
                if (!slideshowThumbnailEl) {
                  onThumbnailMouseLeave()
                } else {
                  const slideIndex =
                    slideshowThumbnailEl.dataset.elementSlideIndex
                  onThumbnailMouseEnter(parseInt(slideIndex))
                }
              }
            }
          }}
          isDraggingImageLibraryItem={isDraggingImageLibraryItem}
          caseId={caseId}
          slides={slides}
          slideshowData={slideshowData}
          slideshowTheme={slideshowTheme}
          slideGroups={slideGroups}
          isDraggingASlide={isDraggingASlide}
        />
      </StyledSlideshowPage>
    </GlobalHotKeys>
  )
}

export default SlideshowPage
