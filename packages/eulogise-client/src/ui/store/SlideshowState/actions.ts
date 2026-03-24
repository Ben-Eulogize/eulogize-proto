import {
  EulogiseProduct,
  IAudioAssetContent,
  ICardProductBackgroundImage,
  ISlide,
  ISlideshowData,
  ISlideshowTheme,
  SlideshowActionTypes,
  UpdateBackgroundImageMode,
} from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

type FetchSlideshowsByIdPayload = {
  caseId: string
  isShareFlow?: boolean
  callback?: (slideshows: Array<ISlideshowData>) => void
}

export type FetchSlideshowsByIdAction = {
  type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID
  payload: FetchSlideshowsByIdPayload
}

export const fetchSlideshowsByCaseId = (
  payload: FetchSlideshowsByIdPayload,
): FetchSlideshowsByIdAction => {
  return {
    type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID,
    payload,
  }
}

type UpdateSlideByIndexPayload = {
  slideIndex: number
  slide: ISlide
}

export const updateSlideByIndex = ({
  slideIndex,
  slide,
}: UpdateSlideByIndexPayload) => {
  NavigationHelper.addUnsavedListener()
  return {
    type: SlideshowActionTypes.UPDATE_SLIDE_BY_INDEX,
    payload: {
      slideIndex,
      slide,
    },
  }
}

export const cleanupSlideshowUndoHistory = () => ({
  type: SlideshowActionTypes.CLEAN_UP_SLIDESHOW_UNDO_HISTORY,
})

export const undoSlideshowContent = () => ({
  type: SlideshowActionTypes.UNDO_SLIDESHOW_CONTENT,
})

export const redoSlideshowContent = () => ({
  type: SlideshowActionTypes.REDO_SLIDESHOW_CONTENT,
})

export const resetSlideshowState = () => ({
  type: SlideshowActionTypes.RESET_SLIDESHOW_STATE,
})

export const updateTimelineThumbnailsDisplayedAmount = (
  timelineThumbnailsDisplayedAmount: number,
) => {
  return {
    type: SlideshowActionTypes.UPDATE_TIMELINE_THUMBNAILS_DISPLAYED_AMOUNT,
    payload: {
      timelineThumbnailsDisplayedAmount,
    },
  }
}

export const updateTimelineUploadImagePanelCollapsed = (
  timelineUploadImagePanelCollapsed: boolean,
) => {
  return {
    type: SlideshowActionTypes.UPDATE_TIMELINE_UPLOAD_IMAGE_PANEL_COLLAPSED,
    payload: {
      timelineUploadImagePanelCollapsed,
    },
  }
}

export const updateSlides = ({ slides }: { slides: Array<ISlide> }) => {
  NavigationHelper.addUnsavedListener()
  return {
    type: SlideshowActionTypes.UPDATE_SLIDES,
    payload: {
      slides,
    },
  }
}

export const updateSlideshow = ({
  slideshow,
}: {
  slideshow: ISlideshowData
}) => {
  NavigationHelper.addUnsavedListener()
  return {
    type: SlideshowActionTypes.UPDATE_SLIDESHOW,
    payload: {
      slideshow,
    },
  }
}

export const attachAudiosToSlideshow = ({
  audios,
}: {
  audios: Array<IAudioAssetContent>
}) => {
  NavigationHelper.addUnsavedListener()
  return {
    type: SlideshowActionTypes.ATTACH_AUDIOS_TO_SLIDESHOW,
    payload: {
      audios,
    },
  }
}

export const replaceAudiosFromSlideshow = ({
  audios,
}: {
  audios: Array<IAudioAssetContent>
}) => {
  NavigationHelper.addUnsavedListener()
  return {
    type: SlideshowActionTypes.REPLACE_AUDIOS_FROM_SLIDESHOW,
    payload: {
      audios,
    },
  }
}

type SaveSlideshowByCaseIdPayload = {
  slideshowTheme?: ISlideshowTheme
  slideshowData?: ISlideshowData
  onSuccess?: (id: string) => void
}

export type SaveSlideshowByCaseIdAction = {
  type: SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID
  payload: SaveSlideshowByCaseIdPayload
}

export const saveSlideshowByCaseId = (
  payload: SaveSlideshowByCaseIdPayload,
): SaveSlideshowByCaseIdAction => ({
  type: SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID,
  payload,
})

type SaveActiveSlideshowPayload = {
  onSuccess?: (id: string) => void
}

export type SaveActiveSlideshowAction = {
  type: SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID
  payload: SaveActiveSlideshowPayload
}
export const saveActiveSlideshow = (
  payload: SaveActiveSlideshowPayload,
): SaveActiveSlideshowAction => ({
  type: SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID,
  payload,
})

type UpdateTitleSlidePayload = {
  slideshowData: ISlideshowData
  startTitleSlideData?: Partial<ISlide>
  endTitleSlideData?: Partial<ISlide>
}

export type UpdateTitleSlideAction = {
  type: SlideshowActionTypes.UPDATE_TITLE_SLIDE
  payload: UpdateTitleSlidePayload
}

export const updateTitleSlide = (
  payload: UpdateTitleSlidePayload,
): UpdateTitleSlideAction => ({
  type: SlideshowActionTypes.UPDATE_TITLE_SLIDE,
  payload,
})

type SaveTitleSlidePayload = {
  caseId: string
  slideshowData: ISlideshowData
  onSuccess?: () => void
  startTitleSlideData: Partial<ISlide>
  endTitleSlideData: Partial<ISlide>
}

export type SaveTitleSlideAction = {
  type: SlideshowActionTypes.SAVE_TITLE_SLIDE
  payload: SaveTitleSlidePayload
}

export const saveTitleSlide = (
  payload: SaveTitleSlidePayload,
): SaveTitleSlideAction => ({
  type: SlideshowActionTypes.SAVE_TITLE_SLIDE,
  payload,
})

type EnableTitleSlideAndSaveSlideshowPayload = {
  caseId: string
  slideshowData: ISlideshowData
  isStartTitleSlideEnabled?: boolean
  isEndTitleSlideEnabled?: boolean
  onSuccess?: () => void
}

export const enableTitleSlideAndSaveSlideShow = ({
  caseId,
  slideshowData,
  isStartTitleSlideEnabled,
  isEndTitleSlideEnabled,
  onSuccess,
}: EnableTitleSlideAndSaveSlideshowPayload) =>
  saveTitleSlide({
    caseId,
    slideshowData,
    onSuccess,
    startTitleSlideData:
      isStartTitleSlideEnabled === undefined
        ? {}
        : {
            isTitleSlideEnable: isStartTitleSlideEnabled,
          },
    endTitleSlideData:
      isEndTitleSlideEnabled === undefined
        ? {}
        : {
            isTitleSlideEnable: isEndTitleSlideEnabled,
          },
  })

type SaveSlidesToSlideshowByCase = {
  caseId: string
  slideshowData: ISlideshowData
  slides: Array<ISlide>
  onSuccess?: () => void
}

export const saveSlidesToSlideshowByCaseId = ({
  caseId,
  slideshowData,
  slides,
  onSuccess,
}: SaveSlidesToSlideshowByCase) =>
  saveSlideshowByCaseId({
    slideshowData: {
      ...slideshowData,
      content: {
        ...slideshowData?.content,
        slides,
      },
    },
    onSuccess,
  })

type CreateSlideshowByCasePayload = {
  caseId: string
  themeId: string
  slideshowTheme: ISlideshowTheme
  audio: Array<IAudioAssetContent>
  onSuccess?: (id: string) => void
}

export type CreateSlideshowByCaseIdAction = {
  type: SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID
  payload: CreateSlideshowByCasePayload
}

export const createSlideshowByCaseId = (
  payload: CreateSlideshowByCasePayload,
): CreateSlideshowByCaseIdAction => ({
  type: SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID,
  payload,
})

type DownloadSlideshowPayload = {
  caseId: string
  deceasedName: string
  onProgress: Function
}
export type DownloadSlideshowAction = {
  type: SlideshowActionTypes.DOWNLOAD_SLIDESHOW
  payload: DownloadSlideshowPayload
}

export const downloadSlideshow = (
  payload: DownloadSlideshowPayload,
): DownloadSlideshowAction => ({
  type: SlideshowActionTypes.DOWNLOAD_SLIDESHOW,
  payload,
})

export const resetSlideshowAction = () => ({
  type: SlideshowActionTypes.RESET_SLIDESHOW,
})

type UpsertSlideshowByCaseIdPayload = {
  caseId: string
  slideshow?: ISlideshowData
  themeId: string
  deceasedFullName?: string
  deceasedLifeString?: string
  onSuccess?: (id: string) => void
}

export type UpsertSlideshowByCaseIdAction = {
  type: SlideshowActionTypes.UPSERT_SLIDESHOW_BY_CASE_ID
  payload: UpsertSlideshowByCaseIdPayload
}

export const upsertSlideshowByCaseId = (
  payload: UpsertSlideshowByCaseIdPayload,
) => ({
  type: SlideshowActionTypes.UPSERT_SLIDESHOW_BY_CASE_ID,
  payload,
})

type GenerateSlideshowPayload = {
  caseId: string
  slideshowId: string
  tvWelcomeScreenId?: string
  isVideoBier?: boolean
}
export type GenerateSlideshowAction = {
  type: SlideshowActionTypes.GENERATE_SLIDESHOW
  payload: GenerateSlideshowPayload
}

export const generateSlideshow = (
  payload: GenerateSlideshowPayload,
): GenerateSlideshowAction => ({
  type: SlideshowActionTypes.GENERATE_SLIDESHOW,
  payload,
})

type UpdateSlideshowBackgroundImagePayload = {
  product: EulogiseProduct
  slideshowData: ISlideshowData
  updateMode: UpdateBackgroundImageMode
  backgroundImageSet: ICardProductBackgroundImage
  caseId: string
  slides: Array<ISlide>
}
export type UpdateSlideshowBackgroundImageAction = {
  type: SlideshowActionTypes.UPDATE_SLIDESHOW_BACKGROUND_IMAGE
  payload: UpdateSlideshowBackgroundImagePayload
}

export const updateSlideshowBackgroundImage = (
  payload: UpdateSlideshowBackgroundImagePayload,
): UpdateSlideshowBackgroundImageAction => ({
  type: SlideshowActionTypes.UPDATE_SLIDESHOW_BACKGROUND_IMAGE,
  payload,
})
