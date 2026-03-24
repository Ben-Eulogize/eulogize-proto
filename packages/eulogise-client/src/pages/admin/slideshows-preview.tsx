import React, { useEffect } from 'react'
import styled from 'styled-components'
import { GlobalHotKeys } from 'react-hotkeys'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import {
  COLOR,
  DEVICES,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import UnsupportedScreenSize from '../../ui/components/UnsupportedScreenSize/UnsupportedScreenSize'
import {
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
  useUserRole,
} from '../../ui/store/hooks'
import {
  cleanupSlideshowUndoHistory,
  fetchSlideshowsByCaseId,
} from '../../ui/store/SlideshowState/actions'
import { fetchAssetsByCaseId } from '../../ui/store/AssetState/actions'
import {
  AssetType,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  ICaseState,
  ISlide,
  ISlideshowData,
  ISlideshowState,
} from '@eulogise/core'
import { NavigationHelper, SlideshowHelper } from '@eulogise/helpers'
import { fetchCardProductsByCaseId } from '../../ui/store/CardProduct/actions'
import { useIsDebug } from '../../ui/hooks/useIsDebug'
import { AudioHelper } from '../../ui/helpers/AudioHelper'
import { collapseSiderMenu } from '../../ui/store/SiderMenuState/action'
import { SLIDESHOW_EDITOR_KEY_MAP } from '../../ui/constants/state'
import { NoAutoScroll } from '../../ui/components/NoAutoScroll/NoAutoScroll'
import { useOrientation } from '../../ui/hooks/useOrientation'
import { SlideWarning } from '../../ui/containers/SlideshowInfo/SlideWarning'
import SlideshowPlayer from '../../ui/containers/Slideshow/SlideshowPlayer'
import { VideoDurationMessage } from '../../ui/containers/SlideshowInfo/VideoDurationMessage'
import { NoOfSlidesMessage } from '../../ui/containers/SlideshowInfo/NoOfSlidesMessage'

const SlideshowPreviewModalFooter = styled.div`
  margin-top: 15px;
`

const SlideshowPreviewModalFooterLeft = styled.div`
  color: ${COLOR.DARK_BLUE};
`

const SlideshowPlayerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
`

const SlideshowPlayerCenterContainer = styled.div<{
  $isFullScreen: boolean
}>`
  ${({ $isFullScreen }) =>
    $isFullScreen
      ? `
    max-width: 100%;
    margin: auto;
  `
      : `
      width: 640px;
      margin: auto;
  `}
`

const StyledSlideWarningContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledFastSlideWarning = styled(SlideWarning)`
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const SlideshowInfo = styled.div`
  margin-top: 20px;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
`

const FullScreenSlideshowPlayerContainer = styled.div<{
  $isFullScreen: boolean
}>`
  ${({ $isFullScreen }) =>
    $isFullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${COLOR.BLACK};
    z-index: 1000;
    display: flex;
    align-items: center;
    `}
`

const StyledSlideshowPreviewPage = styled(Layout)`
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
  const screenSize = useBreakpoint()
  const slideshowState: ISlideshowState = useSlideshowState()
  const caseState: ICaseState = useCaseState()
  const dispatch = useEulogiseDispatch()
  const caseId: string = caseState?.activeItem?.id!

  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const isDebug = useIsDebug()
  const audioUrls: Array<string> = SlideshowHelper.getAudioUrls(slideshowData)

  const orientation = useOrientation()
  const userRole: EulogiseUserRole = useUserRole()!
  const { activeItem: activeSlideshow, activeSlideshowTheme: slideshowTheme } =
    useSlideshowState()

  const noOfSlides =
    SlideshowHelper.getTotalActiveImageSlides(activeSlideshow!) ?? 0

  const isFullScreen =
    (screenSize === DEVICES.MOBILE || screenSize === DEVICES.TABLET) &&
    (orientation === 'landscape-primary' ||
      orientation === 'landscape-secondary')

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

  if (!userRole) {
    return null
  }

  if (!activeSlideshow) {
    return null
  }

  if (!slides) {
    return null
  }

  const isShowTooSmallScreen = !isDebug && isMobileScreenSize

  return (
    <GlobalHotKeys keyMap={SLIDESHOW_EDITOR_KEY_MAP}>
      <NoAutoScroll />
      <StyledSlideshowPreviewPage
        location={location}
        title="Slideshow"
        noPadding={true}
      >
        {isMobileScreenSize ? (
          <StyledUnsupportedScreenSize
            width={isMobileScreenSize && `${window.screen.width}`}
            isShow={isShowTooSmallScreen}
          />
        ) : (
          <SlideshowPlayerContainer>
            <SlideshowPlayerCenterContainer $isFullScreen={isFullScreen}>
              <FullScreenSlideshowPlayerContainer $isFullScreen={isFullScreen}>
                {/* {!isFullScreen && (
              <StyledSlideWarningContainer>
                <StyledFastSlideWarning slideshowData={activeSlideshow} />
              </StyledSlideWarningContainer>
            )} */}

                <SlideshowPlayer isFullScreen={isFullScreen} />
              </FullScreenSlideshowPlayerContainer>
              <SlideshowInfo>
                <VideoDurationMessage
                  slideshowData={activeSlideshow}
                  slideshowTheme={slideshowTheme!}
                  noTitle={false}
                />
                <NoOfSlidesMessage noOfSlides={noOfSlides} />
              </SlideshowInfo>

              <SlideshowPreviewModalFooter>
                <SlideshowPreviewModalFooterLeft>
                  Note: Preview playback quality is dependant on user device and
                  video length.
                </SlideshowPreviewModalFooterLeft>
                <SlideshowPreviewModalFooterLeft>
                  This does not impact final download.
                </SlideshowPreviewModalFooterLeft>
              </SlideshowPreviewModalFooter>
            </SlideshowPlayerCenterContainer>
          </SlideshowPlayerContainer>
        )}
      </StyledSlideshowPreviewPage>
    </GlobalHotKeys>
  )
}

export default SlideshowPage
