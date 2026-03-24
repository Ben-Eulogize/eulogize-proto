import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { SlidePlayer } from '@eulogise/client-components'
import {
  useCaseState,
  useSlideshowState,
  useSlideshowTitleSlideState,
} from '../../store/hooks'
import { STYLE, COLOR } from '@eulogise/client-core'
import { SlideshowHelper } from '@eulogise/helpers'
import SlideshowPreviewControlBar from '../Modal/SlideshowPreviewModal/SlideshowPreviewControlBar'
import {
  AudioStatus,
  ICardProductData,
  ICardProductState,
  ICardProductTheme,
  ICaseState,
  ISlideshowBackground,
  ISlideshowData,
  ISlideshowState,
  ISlideshowTheme,
  TimelineType,
} from '@eulogise/core'
import {
  SlideshowPlayIcon,
  AudioSoundSeries,
} from '@eulogise/client-components'
import { useResize } from '../../hooks/useResize'
import { loadCardProductsFonts } from '../../store/CardProduct/actions'

interface ISlideshowPlayerProps {
  isFullScreen?: boolean
}

const StyledSlideshowPlayer = styled.div`
  width: 100%;
`

const SlidePlayerContainer = styled.div<{ $backgroundColor?: string }>`
  height: ${STYLE.SLIDESHOW_PREVIEW_HEIGHT}px;
  width: auto;
  overflow: hidden;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-style: solid;
    border-color: ${COLOR.DARK_BLUE};
    z-index: 1;
  }
  ${({ $backgroundColor }) =>
    $backgroundColor ? `background-color: ${$backgroundColor};` : ''}
`

const SlideshowPlayAndPauseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`

const INTERVAL: number = 50 // refer to SoundManger html5PollingInterval

type IActiveSlidesProps = {
  activeSlideIndexes: Array<number>
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  cardProductTheme: ICardProductTheme
  progress: number
  slideshowTitleSlideData: ICardProductData
  caseId: string
}

const ActiveSlides = React.memo(
  ({
    activeSlideIndexes,
    slideshowData,
    slideshowTheme,
    cardProductTheme,
    progress,
    slideshowTitleSlideData,
    caseId,
  }: IActiveSlidesProps) => {
    return (
      <>
        {activeSlideIndexes.map((activeSlideIndex: number) => {
          const slideProgress: number = SlideshowHelper.getSlideProgress({
            slideshowData: slideshowData!,
            currentSlideshowProgress: progress,
            slideIndex: activeSlideIndex,
            slideshowTheme,
          })
          return (
            <SlidePlayer
              key={activeSlideIndex}
              slideshowData={slideshowData!}
              slideshowTheme={slideshowTheme}
              cardProductTheme={cardProductTheme}
              cardProduct={slideshowTitleSlideData!}
              slideIndex={activeSlideIndex}
              caseId={caseId}
              progress={slideProgress}
              slideshowProgress={progress}
              fadeInAndOut
              isMp4={!false}
            />
          )
        })}
      </>
    )
  },
  (prevProps, nextProps) => prevProps === nextProps,
)

const SlideshowPlayerZoom = styled.div<{ zoom: number }>`
  ${({ zoom }) => `
    zoom: ${zoom !== undefined ? zoom : 1};
  `}
`

const StyledSlideshowPreviewControlBar = styled(SlideshowPreviewControlBar)<{
  isFloating: boolean
  isShowMobileControls?: boolean
}>`
  ${({ isFloating, isShowMobileControls }) =>
    isFloating
      ? `
    position: absolute;
    width: 100%;
    transform: translateY(-100%);
    z-index: 100;
    ${isShowMobileControls ? 'opacity: 1;' : 'opacity: 0;'}
    transition: opacity .3s;
  `
      : ''}
`

let fullScreenControlTimeout: number

const SlideshowPlayer: React.FC<ISlideshowPlayerProps> = ({
  isFullScreen = false,
}) => {
  const [progress, setProgress] = useState<number>(0)
  const [audioStatus, setAudioStatus] = useState<AudioStatus>(
    AudioStatus.STOPPED,
  )
  const slidePlayerContainerRef = useRef(null)
  const [playerZoom, setPlayerZoom] = useState(1)
  const [isShowMobileControls, setIsShowMobileControls] =
    useState<boolean>(false)
  const {
    activeItem: { id: caseId },
  }: ICaseState = useCaseState()
  const {
    activeItem: slideshowData,
    activeSlideshowTheme: slideshowTheme,
  }: ISlideshowState = useSlideshowState()
  const {
    activeItem: slideshowTitleSlideData,
    activeProductTheme,
  }: ICardProductState = useSlideshowTitleSlideState()
  const activeSlideIndexes: Array<number> =
    SlideshowHelper.getActiveSlideIndexesByProgress({
      slideProgress: progress,
      slideshowTheme: slideshowTheme!,
      slideshowData: slideshowData!,
    })

  const { duration: slideshowDuration } = SlideshowHelper.getSlideshowDurations(
    {
      slideshowData: slideshowData!,
      slideshowTheme: slideshowTheme!,
    },
  )

  const isPlaying: boolean = audioStatus === AudioStatus.PLAYING
  const isUseAudio =
    slideshowData?.content.timelineType !== TimelineType.NO_AUDIO

  const slideshowBackground: ISlideshowBackground =
    SlideshowHelper.getSlideshowBackground(slideshowTheme!)

  const updatePlayerZoom = () => {
    const width = slidePlayerContainerRef.current?.clientWidth
    const height = window.innerHeight
    const zoomX = width / (STYLE.SLIDESHOW_PREVIEW_WIDTH as number)
    const zoomY = height / (STYLE.SLIDESHOW_PREVIEW_HEIGHT as number)
    const newZoom = Math.min(zoomX, zoomY)
    setPlayerZoom(newZoom)
  }

  useResize(() => {
    setTimeout(() => updatePlayerZoom(), 50)
  })

  useEffect(() => {
    updatePlayerZoom()
  }, [isFullScreen])

  const onPlay = () => {
    if (progress + INTERVAL >= slideshowDuration) {
      setProgress(0)
    }
    setAudioStatus(AudioStatus.PLAYING)
  }

  const togglePlay = () => {
    if (audioStatus === AudioStatus.PLAYING) {
      setAudioStatus(AudioStatus.PAUSED)
    } else {
      setAudioStatus(AudioStatus.PLAYING)
    }
  }

  const autoHideControls = () => {
    if (fullScreenControlTimeout) {
      clearTimeout(fullScreenControlTimeout)
    }
    fullScreenControlTimeout = setTimeout(() => {
      setIsShowMobileControls(false)
    }, 2000) as unknown as number
  }

  const showMobileControls = () => {
    // if show mobile control is not show, show that and hide it in 2 seconds
    setIsShowMobileControls(true)
    autoHideControls()
  }

  useEffect(() => {
    loadCardProductsFonts()
  }, [])

  useEffect(() => {
    if (isFullScreen) {
      showMobileControls()
    }
  }, [isFullScreen])

  return (
    <StyledSlideshowPlayer ref={slidePlayerContainerRef}>
      <SlideshowPlayerZoom zoom={playerZoom}>
        <SlidePlayerContainer $backgroundColor={slideshowBackground?.color}>
          <ActiveSlides
            activeSlideIndexes={activeSlideIndexes}
            slideshowData={slideshowData!}
            slideshowTheme={slideshowTheme!}
            cardProductTheme={activeProductTheme!}
            caseId={caseId}
            progress={progress}
            slideshowTitleSlideData={slideshowTitleSlideData!}
          />
          <SlideshowPlayAndPauseOverlay
            onClick={() => {
              if (isFullScreen) {
                // if show mobile control bar is open and the user click again on the overlay, pause video
                if (isShowMobileControls === true) {
                  togglePlay()
                }

                showMobileControls()
                return
              }
              // if it is not full screen mode
              togglePlay()
            }}
          >
            {!isPlaying && (
              <SlideshowPlayIcon
                onClick={() => setAudioStatus(AudioStatus.PLAYING)}
              />
            )}
          </SlideshowPlayAndPauseOverlay>
        </SlidePlayerContainer>
      </SlideshowPlayerZoom>
      <StyledSlideshowPreviewControlBar
        isFloating={isFullScreen}
        isShowMobileControls={isShowMobileControls}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={() => setAudioStatus(AudioStatus.PAUSED)}
        value={(progress / slideshowDuration) * 100}
        progress={progress}
        duration={slideshowDuration}
        onChange={(value: number) => {
          setAudioStatus(AudioStatus.PAUSED)
          setProgress((value / 100) * slideshowDuration)
        }}
      />
      <AudioSoundSeries
        volumn={isUseAudio ? 100 : 0}
        isUseAudioMode={isUseAudio}
        audioStatus={audioStatus}
        onPlaying={(position: React.SetStateAction<number>) =>
          setProgress(position)
        }
        slideshowData={slideshowData!}
        slideshowDuration={slideshowDuration}
        progress={progress}
        onFinishPlaying={() => {
          setAudioStatus(AudioStatus.STOPPED)
          setProgress(100)
        }}
      />
    </StyledSlideshowPlayer>
  )
}

export default SlideshowPlayer
