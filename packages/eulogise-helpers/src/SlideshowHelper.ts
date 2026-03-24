import { CSSProperties } from 'react'
import {
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  EulogisePage,
  EulogiseProduct,
  IAudioAssetContent,
  IFilestackImageEnhancePreset,
  IGetTransitionInOutData,
  IImageAsset,
  IImageType,
  ImageAnimationType,
  ISlide,
  ISlideBackground,
  ISlideGroup,
  ISlideImage,
  ISlideshowBorderSettings,
  ISlideshowData,
  ISlideshowDataContent,
  ISlideshowTheme,
  ISlideshowThemeContent,
  IThemeTextTransition,
  ITransition,
  ITransitionInOutWithAnimation,
  MAX_SLIDESHOW_VIDEO_LENGTH,
  MemorialVisualStatus,
  ResourceFileStatus,
  SLIDESHOW_FPS,
  SlideTransition,
  SlideType,
  TimelineType,
} from '@eulogise/core'
import { transitions } from './transitions'
import { UtilHelper } from './UtilHelper'
import { AssetHelper } from './AssetHelper'
import { EulogiseClientConfig } from '@eulogise/client-core'

export const MIN_SLIDE_DURATION = 5000

export const DEFAULT_END_TITLE_SLIDE_TITLE_TEXT = 'End Title Slide Title'
export const DEFAULT_END_TITLE_SLIDE_SUBTITLE_TEXT = 'End Title Slide Subtitle'

export const SLIDESHOW_DEFAULT_SUBTITLE = '10 March 1954 - 10 January 2018'

export const VERY_FAST_SLIDES_WARNING_TEXT =
  'Very Fast Slides: Suggestion to add more music or remove slides'
export const SLOW_SLIDE_WARNING_TEXT_WITH_AUDIOS =
  'Slow Slides: Suggestion to add more slides or reduce music length'

export const VIDEO_CANNOT_EXCEED_LIMIT_TEXT = 'Video cannot exceed 45 minutes'

export const VERY_FAST_SLIDE_DURATION_THRESHOLD = 5000

export const SLOW_SLIDE_DURATION_THRESHOLD = 10000
export const SLOW_SLIDES_WARNING_TEXT_NO_AUDIOS =
  'Slow Slides: Recommended slide length is between 5-7 seconds'

export const SLIDE_TRANSITION_DURATION = 2000

export const DEFAULT_TITLE_SLIDE_DURATION = 5000

export const TIMELINE_VERY_FAST_SLIDE_TEXT = '!Very Fast Slides!'

export const TIMELINE_VERY_SLOW_SLIDE_TEXT = '!Very Slow Slides!'

export const EXPIRED_OLD_MUSIC_TRACK_TITLES = [
  'Nearer My God To Thee',
  'Another Day Woodwinds',
  'Bright New Day',
  'Down At The Creek',
  'Early Birds',
  'Little Apples',
  'Tomorrow Looks Great',
  'Embers At Sunrise',
  'Inner Peace',
  'Journey home',
  'Memories Of Seville',
  'A Prayer',
  'Desert Drift',
  'Folksy Dream',
  'Infinity Squared',
  'Coming home',
  'Haven',
  'In Solitude',
  'Love Bed',
  'Love Ritournelle',
  'Morning Ritournelle',
  'Awakening',
  'BY NIGHT',
  'Coming Alright',
  'Divine Spirit',
  'FRUIT OF THE RIVER',
  'Happy Forrest Family',
  'Divine Spirit',
  'Pastoral Glades',
  'Peace Be With You',
  'Reverie',
  'Sunlit Wander',
]

const IN_DOM_BUFFER = 2000 // in milliseconds

export class SlideshowHelper {
  public static convertSlideImageToPartialImageAsset(
    slideImage: ISlideImage,
  ): Partial<IImageAsset> {
    return {
      content: slideImage,
    }
  }
  public static getSlideshowImageAssets({
    slideshowData,
    imageAssets = [],
  }: {
    slideshowData: ISlideshowData
    imageAssets?: Array<IImageAsset>
  }): Array<IImageAsset> {
    if (!slideshowData) {
      return []
    }
    const slides: Array<ISlide> = this.getImageSlides(
      slideshowData.content.slides,
    )
    return slides
      .filter(
        (slide) =>
          slide.image &&
          slide.image?.filestackHandle !== DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
      )
      .map((s: ISlide) => {
        const imageAsset = imageAssets.find(
          (asset) => asset.content.filestackHandle === s.image?.filestackHandle,
        )
        if (imageAsset) {
          return imageAsset
        }
        return this.convertSlideImageToPartialImageAsset(
          s.image!,
        ) as IImageAsset
      })
  }

  public static getNoOfSlideshowImageAssets(slideshowData: ISlideshowData) {
    return this.getSlideshowImageAssets({ slideshowData }).length
  }

  public static hasSlideshowImageAssets(slideshowData: ISlideshowData) {
    return this.getNoOfSlideshowImageAssets(slideshowData) > 0
  }

  public static getEmbeddedSlideshowUrl({ caseId }: { caseId: string }) {
    return `${
      EulogiseClientConfig.APP_ENDPOINT
    }${EulogisePage.EMBEDDED_SLIDESHOW.replace(':caseId', caseId)}`
  }

  public static getEmbeddedWhitebarUrl({ caseId }: { caseId: string }) {
    return `${
      EulogiseClientConfig.APP_ENDPOINT
    }${EulogisePage.EMBEDDED_WHITEBAR.replace(':caseId', caseId)}`
  }

  public static getSlideshowEmbeddedCode({
    caseId,
    showWhiteBottomBar,
  }: {
    caseId: string
    showWhiteBottomBar: boolean
  }): string {
    const url: string = this.getEmbeddedSlideshowUrl({ caseId })
    const whitebarUrl: string = this.getEmbeddedWhitebarUrl({ caseId })
    return `<iframe
  src="${url}"
  allow='autoplay; fullscreen'
  style='filter: drop-shadow(2px 2px 2px #888888);border: 1px hidden black; ${
    showWhiteBottomBar
      ? 'border-top-left-radius: 16px; border-top-right-radius: 16px; margin: 10px auto 0 auto;'
      : 'border-radius: 16px; margin: 10px auto;'
  };aspect-ratio: 16/9; display: block; width: 1024px; max-height: 100%; max-width: 100%;'
></iframe>${
      showWhiteBottomBar
        ? `<iframe src="${whitebarUrl}" style='filter: drop-shadow(2px 2px 2px #888888);border: 1px hidden black; height: 54px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; display: block; width: 1024px; max-height: 100%; max-width: 100%; margin: 0 auto 10px auto;'></iframe>`
        : ''
    }`
  }
  public static getSlideshowS3PosterPath({
    caseId,
    format = 'jpg',
  }: {
    caseId: string
    format?: string
  }): string {
    return `cases/${caseId}/SlideshowPoster.${format}`
  }

  public static getSlideshowS3PosterUrl({
    caseId,
    format,
  }: {
    caseId: string
    format?: string
  }): string {
    return `${
      EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN
    }/${this.getSlideshowS3PosterPath({ caseId, format })}`
  }

  public static getGeneratedSlideshowUrl({
    caseId,
  }: {
    caseId: string
  }): string {
    return `${EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN}/cases/${caseId}/Slideshow.mp4`
  }

  public static getTotalFrames(slideshow: ISlideshowData) {
    return Math.ceil(
      // @ts-ignore
      (slideshow.content.duration / 1000) * SLIDESHOW_FPS,
    )
  }

  public static isExceededTimeLimit(duration: number) {
    if (!duration) {
      return false
    }
    return duration > MAX_SLIDESHOW_VIDEO_LENGTH * 60 * 1000
  }
  public static isPreviewable(slideshowData: ISlideshowData) {
    return this.getTotalActiveSlides(slideshowData) > 0
  }

  public static getNonSpecifiedDurationSlides({
    slideshowData,
  }: {
    slideshowData: ISlideshowData
  }) {
    return this.getActiveImageSlides(slideshowData).filter(
      (s) => !s.slideDuration,
    )
  }

  public static getSpecifiedDurationSlideIndexes({
    slideshowData,
  }: {
    slideshowData: ISlideshowData
  }): Array<number> {
    return slideshowData.content.slides
      .map((s: ISlide, index) => {
        if (this.isActiveSlide(s) && !!s.slideDuration) {
          return index
        }
        return -1
      })
      .filter((a) => a > -1)
  }

  // total slide duration - slide transition out duration
  public static getTotalSpecifiedDurationSlidesDuration({
    slideshowData,
    slideshowTheme,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
  }): number {
    const specifiedSlideIndexes = this.getSpecifiedDurationSlideIndexes({
      slideshowData,
    })

    return specifiedSlideIndexes.reduce((acc, slideIndex) => {
      return (
        acc +
        this.getNoAudioModeSlideDurationWithoutTransitionOutDuration({
          slideshowData,
          slideshowTheme,
          slideIndex,
        })
      )
    }, 0)
  }

  public static calculateSingleNonSpecifiedSlideDurationWithoutTransitionOutByTotalDuration(
    totalDurationInMs: number, // in ms
    {
      slideshowData,
      slideshowTheme,
    }: {
      slideshowData: ISlideshowData
      slideshowTheme: ISlideshowTheme
    },
  ): {
    noOfActiveSlides: number
    durationPerSlide: number
    totalDurationWithoutLastTransition: number
  } {
    // 1. get number of active slides
    const activeSlideIndexes = this.getActiveSlideIndexes(
      slideshowData.content.slides,
    )

    const totalTransitionOutDuration = activeSlideIndexes.reduce(
      (acc, slideIndex) =>
        acc +
        this.getTransitionInOutDataBySlideIndex({
          slideshowData,
          slideshowTheme,
          slideIndex,
        }).transitionOutData.duration,
      0,
    )

    // 2. get last active slide transition out duration
    const lastActiveSlideTransitionOutDuration =
      this.getLastActiveSlideTransitionOutDuration({
        slideshowData,
        slideshowTheme,
      })
    const totalDurationWithoutLastTransition =
      totalDurationInMs +
      totalTransitionOutDuration -
      lastActiveSlideTransitionOutDuration

    const noOfActiveSlides = activeSlideIndexes.length
    const durationPerSlide =
      totalDurationWithoutLastTransition / noOfActiveSlides
    return {
      noOfActiveSlides,
      durationPerSlide,
      totalDurationWithoutLastTransition,
    }
  }

  public static getTotalSlideDurationWithoutTransitionOutByIndexes = ({
    slideshowData,
    slideshowTheme,
    slideIndexes,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideIndexes: Array<number>
  }) => {
    return slideIndexes.reduce((acc, slideIndex) => {
      return (
        acc +
        this.getNoAudioModeSlideDurationWithoutTransitionOutDuration({
          slideshowData,
          slideshowTheme,
          slideIndex,
        })
      )
    }, 0)
  }

  public static getUnusedImages({
    images = [],
    slideshow,
  }: {
    images?: Array<IImageAsset>
    slideshow: ISlideshowData
  }): Array<IImageAsset> {
    if (!slideshow) {
      return images
    }

    const slides: Array<ISlide> = this.getImageSlides(slideshow.content.slides)

    // Get all filestack handles used in the slideshow
    const usedFilestackHandles = slides
      .filter(
        (slide) =>
          slide.image &&
          slide.image?.filestackHandle !== DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
      )
      .map((slide) => slide.image?.filestackHandle)
      .filter(Boolean)

    // Return images that are not used in the slideshow
    return images.filter(
      (image) => !usedFilestackHandles.includes(image.content.filestackHandle),
    )
  }

  public static isImageUsedByImageHandle({
    slideshow,
    imageHandle,
  }: {
    slideshow: ISlideshowData
    imageHandle: string
  }): boolean {
    if (!slideshow || !imageHandle) {
      return false
    }

    const slides: Array<ISlide> = this.getImageSlides(slideshow.content.slides)

    return slides.some(
      (slide) =>
        slide.image &&
        slide.image.filestackHandle === imageHandle &&
        slide.image.filestackHandle !== DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
    )
  }

  public static getNoAudioTotalSlideshowDuration({
    slideshowData,
    slideshowTheme,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
  }): number {
    const activeSlideIndexes = this.getActiveSlideIndexes(
      slideshowData.content.slides,
    )

    const totalActiveSlidesDuration =
      this.getTotalSlideDurationWithoutTransitionOutByIndexes({
        slideshowData,
        slideshowTheme,
        slideIndexes: activeSlideIndexes,
      })

    return (
      totalActiveSlidesDuration +
      this.getLastActiveSlideTransitionOutDuration({
        slideshowData,
        slideshowTheme,
      })
    )
  }

  // this duration includes transition in/out
  public static getNoAudioSlideDuration(slideshowData: ISlideshowData) {
    return slideshowData.content.noAudioModeSlideDuration ?? MIN_SLIDE_DURATION
  }

  public static getSpecifiedSlideDurationBySlideIndex({
    slideshowData,
    slideIndex,
  }: {
    slideshowData: ISlideshowData
    slideIndex: number
  }) {
    const slide = this.getSlideByIndex(slideshowData.content.slides, slideIndex)
    return slide.slideDuration
  }

  // return no audio slide duration (including transition in and out duration)
  public static getNoAudioModeSlideDurationInclTranInOut(
    slideshowData: ISlideshowData,
    slideIndex?: number,
  ) {
    const nonSpecifiedSlideDuration =
      this.getNoAudioSlideDuration(slideshowData)

    if (slideIndex === undefined) {
      return nonSpecifiedSlideDuration
    }
    return (
      this.getSpecifiedSlideDurationBySlideIndex({
        slideshowData,
        slideIndex,
      }) ?? nonSpecifiedSlideDuration
    )
  }

  public static getNoAudioModeSlideDurationWithoutTransitionOutDuration({
    slideshowData,
    slideshowTheme,
    slideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideIndex: number
  }) {
    const totalSlideDuration = this.getNoAudioModeSlideDurationInclTranInOut(
      slideshowData,
      slideIndex,
    )
    const { transitionOutData } = this.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex: slideIndex!,
    })
    return totalSlideDuration - transitionOutData.duration
  }

  public static getBorderSettings({
    slideshowTheme,
    slideshowData,
  }: {
    slideshowTheme: ISlideshowTheme
    slideshowData?: ISlideshowData
  }): ISlideshowBorderSettings {
    if (!slideshowData) {
      return {
        enabled: false,
      }
    }
    const defaultBorderSettings = slideshowTheme.content.image.borderSettings
    const slideshowImageBorderSettings =
      slideshowData?.content.imageBorderSettings

    return slideshowImageBorderSettings ?? defaultBorderSettings
  }

  public static getSlidesBySlideshowData(slideshowData: ISlideshowData) {
    const slides = slideshowData.content.slides
    return this.getSlides(slides)
  }

  public static getSlides(slides: Array<ISlide>) {
    return slides.filter((s, i) => {
      if (s.slideType === SlideType.END_TITLE_SLIDE) {
        if (i > 0) {
          const previousSlide = slides[i - 1]
          if (previousSlide.slideType === SlideType.END_TITLE_SLIDE) {
            return false
          }
        }
      }
      return true
    })
  }

  public static getTextSlideAnimationName(slide: ISlide) {
    return slide.titleSlideTextAnimation || SlideTransition.FADE_ON
  }

  public static getAudioByProgress(
    slideshowData: ISlideshowData,
    progress: number,
  ): {
    audio: IAudioAssetContent
    playFromPosition: number
    audioIndex: number
  } {
    const audios: Array<IAudioAssetContent> = slideshowData.content.audio
    let audio = null
    let accDuration: number = 0
    let playFromPosition: number = 0
    let audioIndex = 0

    for (let i = 0; i < audios.length; i++) {
      const a = audios[i]
      if (progress < accDuration + (a?.duration || 0)) {
        audio = a
        playFromPosition = progress - accDuration
        audioIndex = i
        break
      }
      accDuration += a?.duration || 0
    }

    return {
      audio: audio as IAudioAssetContent,
      playFromPosition,
      audioIndex,
    }
  }

  public static transformImageAssetToSlide(image: IImageAsset): ISlide {
    const {
      content: {
        filename,
        filepath,
        filestackHandle,
        preset = IFilestackImageEnhancePreset.NULL,
        isRemovedBackgroundImage,
      },
    } = image

    return {
      image: {
        filename,
        filepath,
        filestackHandle,
        preset,
        isRemovedBackgroundImage,
      },
      slideType: SlideType.IMAGE_SLIDE,
    }
  }

  public static getAudioUrls(slideshowData?: ISlideshowData): Array<string> {
    if (!slideshowData) {
      return []
    }
    /*
    if (this.getTimelineType(slideshowData) === TimelineType.NO_AUDIO) {
      return []
    }
*/
    return slideshowData.content.audio
      ?.filter(Boolean)
      ?.map((audioAsset) => AssetHelper.getAudioUrl(audioAsset))
  }

  public static getAudioDuration(slideshowData: ISlideshowData): number {
    const {
      content: { audio },
    } = slideshowData
    return (audio ?? [])
      .filter(Boolean)
      .reduce<number>(
        (duration: number, track: IAudioAssetContent) =>
          duration + (track.duration || 0),
        0,
      )
  }

  public static getImageFilter(slideshowData: ISlideshowData): string {
    return slideshowData.content.imageFilter
  }

  public static getTotalTitleSlides(slideshowData: ISlideshowData): number {
    return this.getTitleSlides(slideshowData.content.slides).length
  }

  public static getTotalImageSlides(slideshowData: ISlideshowData): number {
    const slides = slideshowData?.content?.slides ?? []
    return this.getImageSlides(slides)?.length ?? 0
  }

  public static getSlideProgress({
    slideIndex,
    slideshowData,
    slideshowTheme,
    currentSlideshowProgress,
  }: {
    slideshowData: ISlideshowData
    currentSlideshowProgress: number
    slideshowTheme: ISlideshowTheme
    slideIndex: number
  }) {
    const slides = slideshowData.content.slides
    const startAt = slides.reduce((acc, slide, sIndex) => {
      if (sIndex >= slideIndex) {
        return acc
      }
      if (!this.isActiveSlide(slide)) {
        return acc
      }
      return (
        acc +
        this.getAnimationDuration({
          slideshowData,
          slideshowTheme,
          imageSlideIndex: sIndex,
        })
      )
    }, 0)
    return currentSlideshowProgress - startAt
  }

  // Get derived transition state properties
  public static getDerivedProgressProps({
    progress,
    slideDuration,
    transitionInDuration,
    transitionOutDelay = 0,
    transitionInDelay = 0,
  }: {
    progress?: number
    slideDuration: number
    transitionInDuration: number
    transitionOutDelay?: number
    transitionInDelay?: number
  }): {
    inProgress?: number
    outProgress?: number
    outDelay: number
  } {
    const outDelay = transitionInDuration + slideDuration + transitionOutDelay
    return {
      inProgress: progress && progress - transitionInDelay,
      outProgress: progress && progress - outDelay,
      outDelay,
    }
  }

  // Calculation: Please refer to https://docs.google.com/spreadsheets/d/1xtTk9IZabL2eNFyB045kVXQnt1MgCuDWZKdH_RivolU
  public static getActiveSlideIndexesByProgress({
    slideProgress,
    slideshowData,
    slideshowTheme,
  }: {
    slideProgress: number
    slideshowTheme: ISlideshowTheme
    slideshowData: ISlideshowData
  }) {
    const startSlide: number = 0
    const slides: Array<ISlide> = slideshowData.content.slides
    let progress: number = 0
    const activeSlides: Array<number> = []
    const summary: Array<any> = []
    const { duration: slideshowDuration } = this.getSlideshowDurations({
      slideshowData,
      slideshowTheme,
    })
    slides.forEach((slide: ISlide, slideIndex: number) => {
      const slideDuration: number = this.getSlideDuration({
        slideshowData,
        slideshowTheme,
        slideIndex,
      })
      const {
        transitionInData: { duration: transitionInDuration },
        transitionOutData: { duration: transitionOutDuration },
      } = this.getTransitionInOutDataBySlideIndex({
        slideshowData,
        slideshowTheme,
        slideIndex,
      })
      // https://docs.google.com/spreadsheets/d/1xtTk9IZabL2eNFyB045kVXQnt1MgCuDWZKdH_RivolU
      // sum of the previous slides - previous slide transition out duration
      const slideStartAt: number = progress - IN_DOM_BUFFER
      const totalSlideInDomDuration =
        slideDuration +
        transitionInDuration +
        transitionOutDuration +
        IN_DOM_BUFFER
      const slideEndAt: number = progress + totalSlideInDomDuration

      const activeSlide: boolean = !!this.isActiveSlide(slide)
      if (activeSlide) {
        progress = progress + slideDuration + transitionInDuration
        summary.push({
          progress,
          slideDuration,
          transitionInDuration,
          transitionOutDuration,
          slideIndex,
          slideProgress,
          slideStartAt,
          slideEndAt,
          slideshowDuration,
          'slideStartAt <= slideProgress': slideStartAt <= slideProgress,
          'slideProgress <= slideEndAt': slideProgress <= slideEndAt,
          'slideIndex >= startSlide': slideIndex >= startSlide,
        })
        if (
          slideStartAt <= slideProgress &&
          slideProgress <= slideEndAt &&
          slideIndex >= startSlide
        ) {
          activeSlides.push(slideIndex)
        }
      }
    })
    // console.log('summary', summary)
    return activeSlides
  }

  public static getTitleSlideBackgroundImageContent(
    slideshowTheme: ISlideshowTheme,
  ): ISlideBackground {
    return {
      getImage:
        (slideshowTheme.content.slideBackground.getImage &&
          slideshowTheme.content.slideBackground.getImage[0]) ||
        null,
      blurred:
        (slideshowTheme.content.slideBackground.blurred &&
          (slideshowTheme.content.slideBackground.blurred as any)[0]) ||
        false,
    }
  }

  public static createDefaultTitleSlide(
    slideshowTheme: ISlideshowTheme,
  ): ISlide {
    return {
      background: this.getTitleSlideBackgroundImageContent(slideshowTheme),
      isTitleSlideEnable: false,
      slideType: SlideType.TITLE_SLIDE,
      titleSlideTextAnimation: SlideTransition.FADE_ON,
    }
  }

  public static appendImageToSlide({
    slides,
    slideshowTheme,
    image,
  }: {
    slides: Array<ISlide>
    slideshowTheme: ISlideshowTheme
    image: IImageAsset
  }): Array<ISlide> {
    const newImageSlide: ISlide = this.transformImageAssetToSlide(image)
    const newTitleSlide: ISlide = this.createDefaultTitleSlide(slideshowTheme)
    return UtilHelper.insertAll(
      slides.length - 1,
      [newTitleSlide, newImageSlide],
      slides,
    )
  }

  public static updateSlideImagePreset({
    slides,
    originalSlide,
    updatedImage,
  }: {
    slides: Array<ISlide>
    originalSlide: ISlide
    updatedImage: IImageAsset
  }): Array<ISlide> {
    const preset = updatedImage?.content?.preset
    if (!preset) {
      return slides
    }
    const newImageSlides: Array<ISlide> = slides.map((slide: ISlide) => {
      if (
        slide?.image?.filestackHandle &&
        originalSlide?.image?.filestackHandle &&
        slide?.image?.filestackHandle === originalSlide?.image?.filestackHandle
      ) {
        return {
          ...slide,
          image: {
            ...slide?.image,
            preset: updatedImage?.content?.preset
              ? updatedImage?.content?.preset
              : IFilestackImageEnhancePreset.NULL,
          },
        }
      }
      return slide
    })
    return newImageSlides
  }

  public static appendRemainingImagesToSlides({
    slides,
    images,
    slideshowTheme,
  }: {
    slides: Array<ISlide>
    slideshowTheme: ISlideshowTheme
    images: Array<IImageAsset>
  }) {
    const remainingImages: Array<IImageAsset> = images.filter(
      (i: IImageAsset) =>
        !slides.find(
          (slide: ISlide) =>
            slide.image?.filestackHandle === i.content.filestackHandle,
        ),
    )

    let newSlides: Array<ISlide> = slides
    remainingImages.forEach((i: IImageAsset) => {
      newSlides = SlideshowHelper.appendImageToSlide({
        slides: newSlides,
        slideshowTheme,
        image: i,
      })
    })
    return newSlides
  }

  public static insertImageToSlide({
    slides,
    index,
    image,
    slideshowTheme,
  }: {
    slides: Array<ISlide>
    index: number
    image: IImageAsset
    slideshowTheme: ISlideshowTheme
  }): Array<ISlide> {
    const newImageSlide: ISlide = this.transformImageAssetToSlide(image)
    const newTitleSlide: ISlide = this.createDefaultTitleSlide(slideshowTheme)
    const imageIndex = index * 2
    return UtilHelper.insertAll(
      imageIndex,
      [newTitleSlide, newImageSlide],
      slides,
    )
  }

  public static removeImageFromSlide(
    slides: Array<ISlide>,
    image: IImageAsset,
  ) {
    const imageIndex = slides.findIndex(
      (s: ISlide) => s.image?.filestackHandle === image.content.filestackHandle,
    )
    const titleIndex = imageIndex - 1
    return slides.filter((s, index: number) => {
      return !(index === titleIndex || index === imageIndex)
    })
  }

  public static getSlideByFilestackHandle(
    slides: Array<ISlide>,
    filestackHandle: string,
  ): ISlide {
    return slides.find(
      (s: ISlide) => s.image?.filestackHandle === filestackHandle,
    ) as ISlide
  }

  public static isImageSelectedByFilestackHandle(
    slides: Array<ISlide>,
    filestackHandle: string,
  ): boolean {
    return !!this.getSlideByFilestackHandle(slides, filestackHandle)
  }

  public static getActiveSlideIndexes(slides: Array<ISlide>): Array<number> {
    return slides
      .map((s: ISlide, slideIndex: number) => {
        if (s.image && s.slideType === SlideType.IMAGE_SLIDE) {
          return slideIndex
        }
        return s.isTitleSlideEnable ? slideIndex : undefined
      })
      .filter((a) => a !== undefined) as Array<number>
  }

  public static isActiveSlide(slide: ISlide) {
    if (slide.slideType === SlideType.IMAGE_SLIDE) {
      return !!slide?.image
    }
    return slide.isTitleSlideEnable
  }

  public static getActiveSlides(slideshowData: ISlideshowData): Array<ISlide> {
    const slides: Array<ISlide> =
      this.getSlides(slideshowData?.content?.slides) || []
    return slides.filter(this.isActiveSlide)
  }

  public static getActiveImageSlides(slideshowData: ISlideshowData) {
    const slides: Array<ISlide> =
      this.getSlides(slideshowData?.content?.slides) || []
    return slides.filter(
      (s) => s.slideType === SlideType.IMAGE_SLIDE && this.isActiveSlide(s),
    )
  }

  public static getTotalActiveImageSlides(
    slideshowData: ISlideshowData,
  ): number {
    if (!slideshowData) {
      return 0
    }
    return this.getActiveImageSlides(slideshowData).length
  }

  public static getTotalActiveSlides(slideshowData: ISlideshowData) {
    return this.getActiveSlides(slideshowData).length
  }

  private static getDefaultSlideBackground({
    slideshowData,
    slideIndex,
    slideshowTheme,
  }: {
    slideshowData: ISlideshowData
    slideIndex: number
    slideshowTheme: ISlideshowTheme
  }) {
    const themeContent: ISlideshowThemeContent = slideshowTheme.content
    const slideShowContent: ISlideshowDataContent = slideshowData.content
    const slideBackground: ISlideBackground = themeContent.slideBackground
    const backgroundInitial = {
      getImage: slideBackground?.getImage,
      blurred: slideBackground?.blurred,
      // @ts-ignore
      color: slideBackground?.color,
      filter: slideShowContent.imageFilter || 'none',
      // @ts-ignore
      enlarge: slideBackground?.enlarge || false,
    }

    return !themeContent?.slideBackground
      ? backgroundInitial
      : Object.keys(slideBackground).reduce((acc, key) => {
          if (
            // @ts-ignore
            slideBackground[key] &&
            // @ts-ignore
            slideBackground[key].constructor === Array
          ) {
            return {
              ...acc,
              [key]:
                // @ts-ignore
                slideBackground[key][slideIndex % slideBackground[key].length],
            }
          }
          return acc
        }, backgroundInitial)
  }

  public static removeSlide(slides: Array<ISlide>, slide: ISlide) {
    const imageSlideIndex: number = slides.findIndex((s: ISlide) => s === slide)
    const titleSlideIndex: number = imageSlideIndex - 1

    return slides.filter((s, index: number) => {
      return !(titleSlideIndex === index || imageSlideIndex === index)
    })
  }

  public static createStartSlides = (
    slideshowTheme: ISlideshowTheme,
  ): Array<ISlide> => {
    const startTitleSlide: ISlide =
      SlideshowHelper.createDefaultTitleSlide(slideshowTheme)
    return [
      startTitleSlide,
      { slideType: 'Image Slide' }, // dummy image
    ]
  }

  public static hasStartSlides = (slides: Array<ISlide>): boolean => {
    if (slides.length < 3) {
      return false
    }
    return !slides.find(
      (s) => s.slideType === 'Image Slide' && s.image === undefined,
    )
  }

  public static insertStartSlidesIfNotExists = (
    slides: Array<ISlide>,
    slideshowTheme: ISlideshowTheme,
  ) => {
    if (this.hasStartSlides(slides)) {
      return slides
    }
    const startSlides = this.createStartSlides(slideshowTheme)
    return [...startSlides, ...slides]
  }

  private static getDefaultImage({
    slideshowData,
    slideshowTheme,
    slideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideIndex: number
  }): ISlideImage {
    const themeContent: ISlideshowThemeContent = slideshowTheme.content
    const slideShowContent = slideshowData.content
    const themeContentImage = themeContent.image
    // @ts-ignore
    return Object.keys(themeContentImage).reduce(
      (acc, key) => {
        if (
          // @ts-ignore
          themeContentImage[key] &&
          // @ts-ignore
          themeContentImage[key].constructor === Array
        ) {
          return {
            ...acc,
            [key]:
              // @ts-ignore
              themeContentImage[key][
                // @ts-ignore
                slideIndex % themeContentImage[key].length
              ],
          }
        }
        return acc
      },
      {
        filter: slideShowContent.imageFilter || 'none',
      },
    )
  }

  public static getSlideByIndex(
    slides: Array<ISlide>,
    slideIndex: number,
  ): ISlide {
    return slides[slideIndex]
  }

  public static getSlideshowBackground(slideshowTheme: ISlideshowTheme): {
    image: IImageType
    color: string
    blurred: boolean
  } {
    const { content: themeContent }: ISlideshowTheme = slideshowTheme
    return {
      // @ts-ignore
      image: themeContent.slideshowBackground?.image,
      color: themeContent.slideshowBackground?.color || '#000',
      blurred: themeContent.slideshowBackground?.blurred || false,
    }
  }

  public static isTitleSlideFullyDisplayed({
    slideshowData,
    slideshowTheme,
    slideshowProgress,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideshowProgress: number
  }) {
    const { transitionInData } = this.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex: 0,
    })

    const { duration: transitionInDuration } = transitionInData
    return slideshowProgress! > transitionInDuration
  }

  public static isShowBackgroundImage(slideshowTheme: ISlideshowTheme) {
    const getImage = slideshowTheme.content.slideBackground.getImage
    const firstGetImage = getImage?.[0]
    if (!firstGetImage) {
      return true
    }
    // do not show background image if it is 'previous' or 'next'
    return !(firstGetImage === 'previous' || firstGetImage === 'next')
  }

  public static getSlideBackground({
    slideshowData,
    slideshowTheme,
    slides,
    slide,
    slideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slides: Array<ISlide>
    slide: ISlide
    slideIndex: number
  }): ISlideBackground {
    const defaultSlideBackground = this.getDefaultSlideBackground({
      slideshowData,
      slideshowTheme,
      slideIndex,
    })
    const backgroundData: any = {
      ...defaultSlideBackground,
      ...slide.background,
    }

    let image
    if (backgroundData.image) {
      image = backgroundData.image
    } else if (
      backgroundData.getImage === 'previous' ||
      backgroundData.getImage === 'next'
    ) {
      image = slides[slideIndex].image
    }
    return {
      image,
      color: backgroundData.color || undefined,
      blurred: backgroundData.blurred || false,
      filter: backgroundData.filter || 'none',
      enlarge: backgroundData.enlarge || false,
    }
  }

  // this can return undefined if it is title slide
  // imageSlideIndex must be higher than 1. Assume the first title and image slide are Start Title Slide
  public static getImageTransitionTypeByImageIndex({
    slideshowTheme,
    imageSlideIndex,
  }: {
    slideshowTheme: ISlideshowTheme
    imageSlideIndex: number
  }): ITransitionInOutWithAnimation {
    const transitionIndex = Math.floor(imageSlideIndex / 2) - 1
    const themeContent: ISlideshowThemeContent = slideshowTheme.content
    const noOfTransitions = themeContent.slideTransitions.length
    return themeContent.slideTransitions[transitionIndex % noOfTransitions]
  }

  // return duration and delay in milliseconds
  private static getTransitionInOutData({
    type,
    defaultThemeTransition,
    slide,
  }: {
    type?: ImageAnimationType | IThemeTextTransition
    defaultThemeTransition?: ITransitionInOutWithAnimation
    slide: ISlide
  }): IGetTransitionInOutData {
    let defaultThemeTransitionIn = defaultThemeTransition?.in
    let defaultThemeTransitionOut = defaultThemeTransition?.out
    if (type) {
      const transition = transitions[type] // in seconds
      defaultThemeTransitionIn = transition?.in
      defaultThemeTransitionOut = transition?.out
    }
    const themeTransitionIn = {
      type: defaultThemeTransitionIn?.type ?? 'none',
      duration: type
        ? (defaultThemeTransitionIn?.duration ?? 1) * 1000
        : defaultThemeTransitionIn?.duration ?? 1000,
      delay: type
        ? (defaultThemeTransitionIn?.delay ?? 0) * 1000
        : defaultThemeTransitionIn?.delay ?? 0,
    }
    const themeTransitionOut = {
      type: defaultThemeTransitionOut?.type ?? 'none',
      duration: type
        ? (defaultThemeTransitionOut?.duration ?? 1) * 1000
        : defaultThemeTransitionOut?.duration ?? 1000,
      delay: type
        ? (defaultThemeTransitionOut?.delay ?? 0) * 1000
        : defaultThemeTransitionOut?.delay ?? 0,
    }

    // user selected transitions
    const slideImage = slide?.image
    const selectedTransitionIn = slideImage?.transitionIn
    const selectedTransitionOut = slideImage?.transitionOut

    const transitionIn = Object.assign(
      {},
      themeTransitionIn,
      selectedTransitionIn,
    )

    const transitionOut = Object.assign(
      {},
      themeTransitionOut,
      selectedTransitionOut,
    )
    return {
      in: transitionIn,
      out: transitionOut,
    }
  }

  public static getTitleSlideStyle({
    slideshowTheme,
    itemKey,
  }: {
    slideshowTheme: ISlideshowTheme
    itemKey: string
  }): CSSProperties {
    // @ts-ignore
    return slideshowTheme.content.text.layers[itemKey].style
  }

  public static getTitleSlideStyles(slideshowTheme: ISlideshowTheme): {
    titleStyle: CSSProperties
    subTitleStyle: CSSProperties
  } {
    const titleStyle: CSSProperties = SlideshowHelper.getTitleSlideStyle({
      slideshowTheme,
      itemKey: 'title',
    })
    const subTitleStyle: CSSProperties = SlideshowHelper.getTitleSlideStyle({
      slideshowTheme,
      itemKey: 'subTitle',
    })
    return {
      titleStyle,
      subTitleStyle,
    }
  }

  public static getTransitionInOutDataBySlideIndex({
    slideshowData,
    slideshowTheme,
    slideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideIndex: number
  }): {
    transitionInData: Required<ITransition>
    transitionOutData: Required<ITransition>
    animation?: ImageAnimationType
  } {
    let transitionInData
    let transitionOutData
    let animation
    const slides: Array<ISlide> = slideshowData.content.slides
    const slide: ISlide = slides[slideIndex]

    if (slide.slideType === SlideType.IMAGE_SLIDE) {
      const defaultThemeTransition = this.getImageTransitionTypeByImageIndex({
        slideshowTheme,
        imageSlideIndex: slideIndex,
      })
      animation = defaultThemeTransition?.animation
      const transitionInOutData = this.getTransitionInOutData({
        defaultThemeTransition,
        slide,
      })
      transitionInData = transitionInOutData.in
      transitionOutData = transitionInOutData.out
    }
    // Title Slide | End Title Slide
    else if (
      slide.slideType === SlideType.TITLE_SLIDE ||
      slide.slideType === SlideType.END_TITLE_SLIDE
    ) {
      const transitionData = this.getTransitionInOutData({
        type: 'crossFade', // dummy value, not take any effect
        slide,
      })
      transitionInData = {
        ...transitionData.in,
        type: slide.titleSlideTransition?.in?.type! ?? transitionData.in?.type,
      }
      transitionOutData = {
        ...transitionData.out,
        type:
          slide.titleSlideTransition?.out?.type! ?? transitionData.out?.type,
      }
    } else {
      throw new Error(`slideType not found ${slide.slideType}`)
    }
    return {
      transitionInData: transitionInData as never as Required<ITransition>,
      transitionOutData: transitionOutData as never as Required<ITransition>,
      animation,
    }
  }

  private static getSlideIndexesByType(
    slides: Array<ISlide>,
    slideType: SlideType,
  ): Array<number> {
    return slides
      .map((slide: ISlide, index: number) => {
        if (slide.slideType === slideType) {
          return index
        }
        return
      })
      .filter((a) => a) as Array<number>
  }

  public static getImageSlideIndexes(slides: Array<ISlide>): Array<number> {
    return this.getSlideIndexesByType(slides, SlideType.IMAGE_SLIDE)
  }

  private static isDummySlide(
    slides: Array<ISlide>,
    slideIndex: number,
  ): boolean {
    const currentSlide = slides[slideIndex]
    // check if dummy image slide
    if (currentSlide.slideType === SlideType.IMAGE_SLIDE) {
      return !currentSlide.image
    }
    // check if dummy title slide
    if (currentSlide.slideType === SlideType.TITLE_SLIDE) {
      // check and see if next slide is a dummy image slide
      const nextSlide = slides[slideIndex + 1]
      if (nextSlide.slideType === SlideType.IMAGE_SLIDE) {
        return !nextSlide.image
      }
    }
    return false
  }

  public static filterNonTitleSlideDummySlides(
    slides: Array<ISlide>,
  ): Array<ISlide> {
    return (slides || []).filter((slide, slideIndex: number) => {
      return (
        slideIndex < 2 ||
        (slideIndex >= 2 && !this.isDummySlide(slides, slideIndex))
      )
    })
  }

  public static getSlideGroups(slides: Array<ISlide>): Array<ISlideGroup> {
    const filteredSlides = this.filterNonTitleSlideDummySlides(slides)
    const imageSlideIndexes: Array<number> =
      this.getImageSlideIndexes(filteredSlides)

    const slideGroups = imageSlideIndexes.map((imageSlideIndex: number) => {
      const imageSlide: ISlide = filteredSlides[imageSlideIndex]
      return {
        id: imageSlide?.image?.filestackHandle,
        imageSlideIndex,
        imageSlide,
        titleSlide: filteredSlides[imageSlideIndex - 1],
      }
    })

    const endTitleSlide = this.getEndTitleSlide(slides)
    return [
      ...slideGroups,
      {
        id: 'end-title-slide',
        titleSlide: endTitleSlide,
        imageSlide: { slideType: SlideType.IMAGE_SLIDE },
      },
    ]
  }

  public static getEndTitleSlide(slides: Array<ISlide>): ISlide {
    return slides.find(
      (s: ISlide) => s.slideType === SlideType.END_TITLE_SLIDE,
    ) as ISlide
  }

  public static getStartTitleSlide(slides: Array<ISlide>): ISlide {
    // find the first title slide
    return slides.find(
      (s: ISlide) => s.slideType === SlideType.TITLE_SLIDE,
    ) as ISlide
  }

  public static hasStartTitleSlide(
    slideshow: ISlideshowData,
  ): boolean | undefined {
    if (!slideshow) {
      return
    }
    return !!this.getStartTitleSlide(slideshow.content.slides)
      ?.isTitleSlideEnable
  }

  public static hasEndTitleSlide(
    slideshow: ISlideshowData,
  ): boolean | undefined {
    if (!slideshow) {
      return
    }
    return !!this.getEndTitleSlide(slideshow.content.slides)?.isTitleSlideEnable
  }

  public static transformSlideGroupsToSlides(
    slideGroups: Array<ISlideGroup>,
    slides: Array<ISlide>,
  ): Array<ISlide> {
    const endTitleSlide: ISlide = this.getEndTitleSlide(slides)
    return (
      slideGroups
        .reduce((acc, slideGroup: ISlideGroup) => {
          // @ts-ignore
          return acc.concat([slideGroup.titleSlide, slideGroup.imageSlide])
        }, [])
        // @ts-ignore
        .concat(endTitleSlide ? endTitleSlide : [])
    )
  }

  public static getSlideImage({
    slideshowData,
    slideshowTheme,
    slide,
    slideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slide: ISlide
    slideIndex: number
  }): ISlideImage | undefined {
    const {
      transitionInData,
      transitionOutData,
      animation: defaultThemeAnimation,
    } = this.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex,
    })
    if (!slide.image) {
      return
    }

    return {
      ...this.getDefaultImage({ slideshowData, slideshowTheme, slideIndex }),
      ...slide.image,
      animation: slide.image.animation ?? defaultThemeAnimation,
      transitionIn: transitionInData,
      transitionOut: transitionOutData,
      preset: slide?.image?.preset
        ? slide?.image?.preset
        : IFilestackImageEnhancePreset.NULL,
    }
  }

  /*
  private static getEnabledTitleSlides(slides): Array<ISlide> {
    return slides.filter(
      (slide: ISlide) =>
        slide.slideType !== SlideType.TITLE_SLIDE && slide.isTitleSlideEnable,
    )
  }
*/

  public static getImageSlides(slides: Array<ISlide>): Array<ISlide> {
    return slides.filter((slide: ISlide) => {
      return slide.image && slide.slideType === SlideType.IMAGE_SLIDE
    })
  }

  private static getTitleSlides(slides: Array<ISlide>): Array<ISlide> {
    return slides.filter((slide: ISlide) => {
      return (
        slide.isTitleSlideEnable &&
        (slide.slideType === SlideType.TITLE_SLIDE ||
          slide.slideType === SlideType.END_TITLE_SLIDE)
      )
    })
  }

  public static getDisplayableSlideDuration(slideshowData: ISlideshowData) {
    const timelineType: TimelineType =
      SlideshowHelper.getTimelineType(slideshowData)

    if (timelineType === TimelineType.NO_AUDIO) {
      return this.getNoAudioModeSlideDurationInclTranInOut(slideshowData)
    }
    const totalImageSlides: number = this.getTotalImageSlides(slideshowData)
    const audioDuration: number =
      SlideshowHelper.getAudioDuration(slideshowData)
    return audioDuration / totalImageSlides
  }

  public static isVeryFastSlide(slideshowData: ISlideshowData) {
    const isAudioMode =
      this.getTimelineType(slideshowData) !== TimelineType.NO_AUDIO
    const slideshowDuration = this.getDisplayableSlideDuration(slideshowData)
    return isAudioMode && slideshowDuration < VERY_FAST_SLIDE_DURATION_THRESHOLD
  }

  public static isVerySlowSlide(slideshowData: ISlideshowData) {
    const isAudioMode =
      this.getTimelineType(slideshowData) !== TimelineType.NO_AUDIO
    const slideshowDuration = this.getDisplayableSlideDuration(slideshowData)
    return isAudioMode && slideshowDuration > SLOW_SLIDE_DURATION_THRESHOLD
  }

  public static getSlideDurationSummary(slideshowData: ISlideshowData): {
    noOfSpecifiedDurationSlides: number
    totalSpecifiedDuration: number
  } {
    return slideshowData.content.slides.reduce(
      (summary, slide) => {
        if (!slide.slideDuration) {
          return summary
        }
        return {
          noOfSpecifiedDurationSlides: summary.noOfSpecifiedDurationSlides + 1,
          totalSpecifiedDuration:
            summary.totalSpecifiedDuration +
            slide.slideDuration -
            IN_DOM_BUFFER,
        }
      },
      { noOfSpecifiedDurationSlides: 0, totalSpecifiedDuration: 0 },
    )
  }

  public static getLastActiveSlide(slideshowData: ISlideshowData) {
    const activeSlides = this.getActiveSlides(slideshowData)
    return activeSlides[activeSlides.length - 1]
  }

  public static getLastActiveSlideTransitionOutDuration({
    slideshowData,
    slideshowTheme,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
  }): number {
    const activeSlideIndexes = this.getActiveSlideIndexes(
      slideshowData.content.slides,
    )
    // if no active slides
    if (activeSlideIndexes.length === 0) {
      return 0
    }
    const lastActiveSlideIndex =
      activeSlideIndexes[activeSlideIndexes.length - 1]

    const { transitionOutData } = this.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex: lastActiveSlideIndex,
    })
    return transitionOutData.duration
  }

  public static getTotalTransitionOutDurations({
    slideshowData,
    slideshowTheme,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
  }) {
    const activeSlideIndexes = this.getActiveSlideIndexes(
      slideshowData.content.slides,
    )
    return activeSlideIndexes.reduce((acc, slideIndex) => {
      const { transitionOutData } = this.getTransitionInOutDataBySlideIndex({
        slideshowData,
        slideshowTheme,
        slideIndex,
      })
      return acc + transitionOutData.duration
    }, 0)
  }

  public static getAvgTransitionOutDurations({
    slideshowData,
    slideshowTheme,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
  }) {
    const totalTransitionOutDuration = this.getTotalTransitionOutDurations({
      slideshowData,
      slideshowTheme,
    })
    const totalActiveSlides = this.getTotalActiveSlides(slideshowData)
    return totalTransitionOutDuration / totalActiveSlides
  }

  // get slide duration (not include transition in duration) - please use getTotalSlideDuration (included transition duration)
  public static getSlideDuration({
    slideIndex,
    slideshowTheme,
    slideshowData,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideIndex: number
  }) {
    const timelineType = this.getTimelineType(slideshowData)
    const { transitionInData, transitionOutData } =
      this.getTransitionInOutDataBySlideIndex({
        slideshowData,
        slideshowTheme,
        slideIndex,
      })
    const avgTransitionOutDurations = this.getAvgTransitionOutDurations({
      slideshowData,
      slideshowTheme,
    })

    switch (timelineType) {
      case TimelineType.NO_AUDIO: {
        const noAudioSlideDuration: number =
          SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(
            slideshowData,
            slideIndex,
          )
        return Math.round(
          noAudioSlideDuration -
            transitionInData.duration -
            transitionOutData.duration,
        )
      }
      case TimelineType.FIT_SLIDES:
      default: {
        const totalSlideshowDurations = this.getAudioDuration(slideshowData)
        // - this.getLastActiveSlideTransitionOutDuration(slideshowData)
        const totalSlides = this.getTotalActiveSlides(slideshowData)
        // const totalSlideshowDurations = slideshowDuration - themeTransitionDuration
        const { noOfSpecifiedDurationSlides, totalSpecifiedDuration } =
          this.getSlideDurationSummary(slideshowData)

        // if no specified duration in any of the slides
        if (noOfSpecifiedDurationSlides === 0) {
          return (
            totalSlideshowDurations / totalSlides -
            transitionInData.duration -
            transitionOutData.duration +
            avgTransitionOutDurations // extend the slide duration by adding the avg transition out durations
          )
        }

        // if there are specified duration in any of the slides
        const slide = this.getSlideByIndex(
          slideshowData.content.slides,
          slideIndex,
        )
        // if the current slide has specified slideDuration
        if (slide.slideDuration !== undefined) {
          return (
            slide.slideDuration -
            transitionInData.duration -
            transitionOutData.duration
          )
        }
        // if other slides have specified slideDuration, not the current slide
        const remainingSlideshowDuration =
          totalSlideshowDurations - totalSpecifiedDuration
        const remainingNoOfSlides = totalSlides - noOfSpecifiedDurationSlides
        const slideDurationWithTransition =
          (remainingSlideshowDuration - 2000) / remainingNoOfSlides
        const slideDurationWithoutTransition =
          slideDurationWithTransition -
          transitionInData.duration -
          transitionOutData.duration +
          avgTransitionOutDurations
        return slideDurationWithoutTransition
      }
    }
  }

  public static getMaxSlides(slideshowData: ISlideshowData): number {
    const audioDuration: number =
      SlideshowHelper.getAudioDuration(slideshowData)
    const timelineType: TimelineType =
      SlideshowHelper.getTimelineType(slideshowData)
    return Math.floor(
      audioDuration /
        (timelineType === TimelineType.FIT_SLIDES ? MIN_SLIDE_DURATION : 0),
    )
  }

  public static getTimelineType(slideshowData: ISlideshowData): TimelineType {
    return slideshowData.content.timelineType
  }

  public static getSlideshowDurations({
    slideshowData,
    slideshowTheme,
  }: {
    slideshowTheme: ISlideshowTheme
    slideshowData: ISlideshowData
  }): {
    timelineType: TimelineType
    duration: number
  } {
    const timelineType: TimelineType = this.getTimelineType(slideshowData)
    const audioDuration: number = this.getAudioDuration(slideshowData)

    switch (timelineType) {
      case TimelineType.FIT_SLIDES:
        return {
          timelineType,
          duration: audioDuration,
        }
      case TimelineType.NO_AUDIO:
      default: {
        return {
          timelineType,
          duration: this.getNoAudioTotalSlideshowDuration({
            slideshowData,
            slideshowTheme,
          }),
        }
      }
    }
  }

  public static isSpecifiedSlideDuration(
    slideshowData: ISlideshowData,
    imageSlideIndex: number,
  ): boolean {
    return !!slideshowData.content.slides[imageSlideIndex].slideDuration
  }

  public static getTotalSlideDuration({
    slideshowData,
    slideshowTheme,
    imageSlideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    imageSlideIndex: number
  }): number {
    const slideDuration = this.getSlideDuration({
      slideshowData,
      slideshowTheme,
      slideIndex: imageSlideIndex,
    })
    const { transitionInData, transitionOutData } =
      this.getTransitionInOutDataBySlideIndex({
        slideshowData,
        slideshowTheme,
        slideIndex: imageSlideIndex,
      })

    const totalSlideDuration = Number(
      slideDuration + transitionInData.duration + transitionOutData.duration,
    )
    return totalSlideDuration
  }

  public static getAnimationDuration({
    slideshowData,
    slideshowTheme,
    imageSlideIndex,
  }: {
    slideshowData: ISlideshowData
    slideshowTheme: ISlideshowTheme
    imageSlideIndex: number
  }): number {
    const slideDuration = this.getSlideDuration({
      slideshowData,
      slideshowTheme,
      slideIndex: imageSlideIndex,
    })
    const { transitionInData } = this.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex: imageSlideIndex,
    })

    return Number(slideDuration + transitionInData.duration)
  }

  public static createEndTitleSlide(theme: ISlideshowTheme): ISlide {
    return {
      background: SlideshowHelper.getTitleSlideBackgroundImageContent(theme),
      isTitleSlideEnable: false,
      slideType: SlideType.END_TITLE_SLIDE,
      titleSlideTextAnimation: SlideTransition.FADE_ON,
    }
  }

  public static checkIfNeedToReplaceSlideshowImagesAfterEditing = (
    image: IImageAsset,
    slides: Array<ISlide>,
  ): boolean => {
    let needReplaceSlideshowImages: boolean = false
    if (!image || !slides) {
      return needReplaceSlideshowImages
    }

    slides.forEach((slide: ISlide) => {
      if (slide?.image?.filestackHandle === image?.content?.filestackHandle) {
        needReplaceSlideshowImages = true
      }
    })

    return needReplaceSlideshowImages
  }

  public static isSlideshowBackgroundChangable = (
    productData: ISlideshowData,
  ): boolean => {
    if (!productData) {
      return false
    }
    const isCompleted = productData?.status === MemorialVisualStatus.COMPLETE
    const isGenerated = productData?.fileStatus === ResourceFileStatus.GENERATED
    if (isCompleted || isGenerated) {
      return false
    }
    return true
  }

  public static isSlideshowThemeChangable = (
    productData: ISlideshowData,
  ): boolean => {
    // never started, allow it to change
    if (!productData) {
      return true
    }
    const isCompleted = productData?.status === MemorialVisualStatus.COMPLETE
    const isGenerated = productData?.fileStatus === ResourceFileStatus.GENERATED
    if (isCompleted || isGenerated) {
      return false
    }
    return true
  }

  public static getIsAtSlideshowTimeline = ({
    location,
  }: {
    location: Location
  }): boolean => {
    const path: string = location?.pathname!
    const [, firstPart, secondPart] = path.split('/')
    const simplifiedPath: string = `/${firstPart}/${secondPart}`

    const product: EulogiseProduct = {
      '/admin/slideshows': EulogiseProduct.SLIDESHOW,
      '/admin/booklets': EulogiseProduct.BOOKLET,
      '/admin/bookmarks': EulogiseProduct.BOOKMARK,
      '/admin/sidedCards': EulogiseProduct.SIDED_CARD,
      '/admin/thankYouCards': EulogiseProduct.THANK_YOU_CARD,
      '/admin/tvWelcomeScreens': EulogiseProduct.TV_WELCOME_SCREEN,
    }[simplifiedPath]!

    return [EulogiseProduct.SLIDESHOW].includes(product)
  }

  public static getTimelineMagnifierPercentageByDoubleClick = (
    currentPercentage: number,
    isMobileScreenSize = false,
  ): number => {
    if (isMobileScreenSize) {
      // Mobile
      if (
        currentPercentage < 0 ||
        currentPercentage > 100 ||
        isNaN(currentPercentage)
      ) {
        return 0
      }
      if (currentPercentage >= 0 && currentPercentage <= 100) {
        return 100
      }
    } else {
      // Desktop
      if (
        currentPercentage < 0 ||
        currentPercentage > 100 ||
        isNaN(currentPercentage)
      ) {
        return 33
      }
      if (currentPercentage >= 0 && currentPercentage < 33) {
        return 33
      }
      if (currentPercentage >= 33 && currentPercentage < 67) {
        return 67
      }
      if (currentPercentage >= 67 && currentPercentage <= 100) {
        return 100
      }
      return 100
    }
    return 100
  }

  public static getTimelineDisplayedThumbnailsAmountByMagnifierPercentage = (
    percentage: number,
    isMobileScreenSize = false,
  ): number => {
    if (isMobileScreenSize) {
      // Mobile
      if (percentage < 0 || percentage > 100 || isNaN(percentage)) {
        return 3
      }
      if (percentage === 0) {
        return 1
      }
      if (percentage === 100) {
        return 3
      }
    } else {
      // Desktop
      if (percentage < 0 || percentage > 100 || isNaN(percentage)) {
        return 4
      }
      if (percentage >= 0 && percentage < 33) {
        return 2
      }
      if (percentage >= 33 && percentage < 67) {
        return 4
      }
      if (percentage >= 67 && percentage < 100) {
        return 6
      }
      if (percentage === 100) {
        return 8
      }
      return 4
    }
    return 4
  }

  public static getTimelineMagnifierPercentageByDisplayedThumbnailsAmount = (
    thumbnailsAmount: number,
    isMobileScreenSize = false,
  ): number => {
    if (isMobileScreenSize) {
      // Mobile
      if (isNaN(thumbnailsAmount)) {
        return 100
      }
      if (thumbnailsAmount === 1) {
        return 0
      }
      if (thumbnailsAmount === 3) {
        return 100
      }
    } else {
      // Desktop
      if (isNaN(thumbnailsAmount)) {
        return 33
      }
      if (thumbnailsAmount === 2) {
        return 0
      }
      if (thumbnailsAmount === 4) {
        return 33
      }
      if (thumbnailsAmount === 6) {
        return 67
      }
      if (thumbnailsAmount === 8) {
        return 100
      }
      return 33
    }
    return 33
  }
}
