import { ISlideshowState } from '@eulogise/core'

const initialState: ISlideshowState = {
  items: [],
  activeItem: undefined,
  activeSlideshowTheme: undefined,
  isFetching: false,
  isUpdating: false,
  isCreating: false,
  isDownloading: false,
  undoContentList: [],
  redoContentList: [],
  timelineThumbnailsDisplayedAmount: 4,
  timelineUploadImagePanelCollapsed: false,
}

export const SlideshowInitialState = initialState
