import {
  ISlide,
  TimelineType,
  SlideType,
  ISlideshowData,
  IAudioAssetCategory,
  IAudioAssetContent,
  MemorialVisualStatus,
} from '@eulogise/core'

export const createMockTitleSlide = (
  titleText: string,
  isTitleSlideEnable = true,
): ISlide => {
  return {
    isTitleSlideEnable,
    slideType: SlideType.TITLE_SLIDE,
  }
}

export const createMockImageSlide = (
  imageName: string,
  slideOptions?: Partial<ISlide>,
): ISlide => {
  return {
    slideType: SlideType.IMAGE_SLIDE,
    ...slideOptions,
    image: {
      filename: imageName,
      filepath: imageName,
      filestackHandle: imageName,
      ...slideOptions?.image,
    },
  }
}

export const createMockAudioAssetContent = ({
  duration = 100,
  filename = 'filename-1',
}): IAudioAssetContent => ({
  duration,
  filestackHandle: 'filestackHandle-1',
  filename,
  filepath: 'filepath-1',
  title: 'title-1',
  category: IAudioAssetCategory.PIANO,
  artist: 'artist-1',
})

export const createMockSlideshowData = ({
  slides = [],
  audio = [],
  id = 'slideshow-1',
}: {
  slides?: Array<ISlide>
  audio?: Array<IAudioAssetContent>
  id?: string
}): ISlideshowData => {
  return {
    id,
    case: 'case-1',
    content: {
      slides,
      audio,
      theme: 'theme-1',
      hasUserPreview: false,
      imageBorderSettings: {
        enabled: false,
      },
      hasUserSave: false,
      imageFilter: 'image-filter-1',
      timelineType: TimelineType.NO_AUDIO,
    },
    status: MemorialVisualStatus.INCOMPLETE,
  }
}
