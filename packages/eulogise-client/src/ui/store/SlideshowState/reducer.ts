import { EulogiseResourceHelper } from '../../helpers/EulogiseResourceHelper'
import {
  ConnectionActionTypes,
  ISlideshowAction,
  ISlideshowData,
  ISlideshowState,
  ResourceFileStatus,
  SlideshowActionTypes,
} from '@eulogise/core'
import { SlideshowHelper, UndoHelper, UtilHelper } from '@eulogise/helpers'
import { SlideshowInitialState } from './initialState'

export const SlideshowReducer = (
  state: ISlideshowState = SlideshowInitialState,
  action: ISlideshowAction,
): ISlideshowState => {
  switch (action.type) {
    case ConnectionActionTypes.PRODUCT_DATA_UPDATED: {
      if (action.payload?.product !== 'SLIDESHOW') {
        return state
      }
      const activeItem = UtilHelper.mergeDeepRight(
        state.activeItem,
        action.payload?.productData ?? {},
      ) as ISlideshowData
      return {
        ...state,
        activeItem,
      }
    }
    case SlideshowActionTypes.CLEAN_UP_SLIDESHOW_UNDO_HISTORY: {
      return {
        ...state,
        undoContentList: [],
        redoContentList: [],
      }
    }
    case SlideshowActionTypes.UNDO_SLIDESHOW_CONTENT: {
      if (!state.undoContentList || state.undoContentList?.length === 0) {
        return state
      }
      const [undoContent, ...newUndoContentList] = state.undoContentList
      const existingContent = state.activeItem?.content

      return {
        ...state,
        // @ts-ignore
        activeItem: {
          ...state.activeItem,
          content: JSON.parse(JSON.stringify(undoContent)),
        },
        undoContentList: newUndoContentList,
        redoContentList: UndoHelper.createUndoContentListWithNewItem(
          state.redoContentList,
          existingContent!,
        ),
      }
    }
    case SlideshowActionTypes.REDO_SLIDESHOW_CONTENT: {
      if (!state.redoContentList || state.redoContentList?.length === 0) {
        return state
      }
      const [redoContent, ...newRedoContentList] = state.redoContentList
      const existingContent = state.activeItem?.content
      return {
        ...state,
        // @ts-ignore
        activeItem: {
          ...state.activeItem,
          content: JSON.parse(JSON.stringify(redoContent)),
        },
        undoContentList: UndoHelper.createUndoContentListWithNewItem(
          state.undoContentList,
          existingContent!,
        ),
        redoContentList: newRedoContentList,
      }
    }
    case SlideshowActionTypes.ATTACH_AUDIOS_TO_SLIDESHOW: {
      return UtilHelper.mergeDeepRight(state, {
        activeItem: {
          content: {
            audio: [
              ...(state.activeItem?.content?.audio || []),
              ...action.payload?.audios!,
            ],
          },
        },
      })
    }
    case SlideshowActionTypes.REPLACE_AUDIOS_FROM_SLIDESHOW: {
      return UtilHelper.mergeDeepRight(state, {
        activeItem: {
          content: {
            audio: action.payload?.audios,
          },
        },
      })
    }
    case SlideshowActionTypes.DOWNLOAD_SLIDESHOW: {
      return {
        ...state,
        isDownloading: true,
      }
    }
    case SlideshowActionTypes.DOWNLOAD_SLIDESHOW_SUCCESS: {
      return {
        ...state,
        isDownloading: false,
      }
    }
    case SlideshowActionTypes.DOWNLOAD_SLIDESHOW_FAILED: {
      return {
        ...state,
        isDownloading: false,
      }
    }
    case SlideshowActionTypes.RESET_SLIDESHOW_STATE: {
      return SlideshowInitialState
    }
    case SlideshowActionTypes.UPDATE_SLIDESHOW: {
      const {
        // @ts-ignore
        payload: { slideshow },
      }: ISlideshowAction = action
      return UtilHelper.mergeDeepRight(state, {
        // @ts-ignore
        ...UndoHelper.recordUndoContentList(state),
        activeItem: slideshow,
      })
    }
    case SlideshowActionTypes.UPDATE_SLIDES: {
      const {
        // @ts-ignore
        payload: { slides },
      }: ISlideshowAction = action
      return UtilHelper.mergeDeepRight(state, {
        // @ts-ignore
        ...UndoHelper.recordUndoContentList(state),
        activeItem: {
          content: {
            slides: SlideshowHelper.filterNonTitleSlideDummySlides(slides),
          },
        },
      })
    }
    case SlideshowActionTypes.UPDATE_SLIDE_BY_INDEX: {
      const {
        // @ts-ignore
        payload: { slideIndex, slide },
      }: ISlideshowAction = action
      const slides = state.activeItem?.content?.slides
      const newSlides = SlideshowHelper.filterNonTitleSlideDummySlides(
        UtilHelper.updateArrayItem(slideIndex, slide, slides),
      )
      return UtilHelper.mergeDeepRight(state, {
        // @ts-ignore
        ...UndoHelper.recordUndoContentList(state),
        activeItem: {
          content: {
            slides: newSlides,
          },
        },
      })
    }
    case SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID: {
      return {
        ...state,
        isFetching: !state.activeItem, // do not set isFetching to true again if activeItem already exists
      }
    }
    case SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS: {
      // @ts-ignore
      const { items, activeSlideshowTheme } = action.payload
      const activeItem: ISlideshowData =
        EulogiseResourceHelper.getLatestItem(items)

      return {
        ...state,
        isFetching: false,
        items,
        activeSlideshowTheme,
        activeItem: activeItem
          ? {
              ...activeItem,
              content: {
                ...activeItem?.content,
                slides: SlideshowHelper.filterNonTitleSlideDummySlides(
                  activeItem?.content?.slides || [],
                ),
              },
            }
          : undefined,
      }
    }
    case SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID: {
      return {
        ...state,
        isUpdating: true,
      }
    }
    case SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID_SUCCESS: {
      // @ts-ignore
      const { slideshow, slideshowTheme } = action.payload
      return {
        ...state,
        items: UtilHelper.updateArrayItemById(state.items!, slideshow),
        activeItem: slideshow,
        activeSlideshowTheme: slideshowTheme ?? state.activeSlideshowTheme,
        isUpdating: false,
      }
    }
    case SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID_FAILED: {
      return {
        ...state,
        isUpdating: false,
      }
    }
    case SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID: {
      return {
        ...state,
        isCreating: true,
      }
    }
    case SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID_SUCCESS: {
      // @ts-ignore
      const { slideshow, slideshowTheme } = action.payload
      const items = state.items?.concat(slideshow)
      const slides1 = slideshow?.content?.slides
      return {
        ...state,
        items,
        activeSlideshowTheme: slideshowTheme,
        activeItem: slideshow
          ? {
              ...slideshow,
              content: {
                ...slideshow.content,
                slides: slides1
                  ? SlideshowHelper.insertStartSlidesIfNotExists(
                      slides1,
                      slideshowTheme,
                    )
                  : slides1,
              },
            }
          : slideshow,
        isCreating: false,
      }
    }
    case SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID_FAILED: {
      return {
        ...state,
        isCreating: false,
      }
    }
    case SlideshowActionTypes.GENERATE_SLIDESHOW: {
      const updatedSlideshow: ISlideshowData = {
        ...state.activeItem,
        fileStatus: ResourceFileStatus.PROCESSING,
      } as ISlideshowData
      return {
        ...state,
        items: UtilHelper.updateArrayItemById(state.items!, updatedSlideshow),
        activeItem: updatedSlideshow,
      }
    }
    case SlideshowActionTypes.GENERATE_SLIDESHOW_SUCCESS: {
      const updatedSlideshow: ISlideshowData = {
        ...state.activeItem,
        fileStatus: ResourceFileStatus.PROCESSING,
      } as ISlideshowData

      return {
        ...state,
        items: UtilHelper.updateArrayItemById(state.items!, updatedSlideshow),
        activeItem: updatedSlideshow,
      }
    }
    case SlideshowActionTypes.GENERATE_SLIDESHOW_FAILED: {
      const updatedSlideshow: ISlideshowData = {
        ...state.activeItem,
        fileStatus: ResourceFileStatus.FAILED,
      } as ISlideshowData
      return {
        ...state,
        items: UtilHelper.updateArrayItemById(state.items!, updatedSlideshow),
        activeItem: updatedSlideshow,
      }
    }
    case SlideshowActionTypes.UPDATE_TIMELINE_THUMBNAILS_DISPLAYED_AMOUNT: {
      return {
        ...state,
        timelineThumbnailsDisplayedAmount:
          action.payload?.timelineThumbnailsDisplayedAmount,
      }
    }
    case SlideshowActionTypes.UPDATE_TIMELINE_UPLOAD_IMAGE_PANEL_COLLAPSED: {
      return {
        ...state,
        timelineUploadImagePanelCollapsed:
          action.payload?.timelineUploadImagePanelCollapsed,
      }
    }
    default:
      return state
  }
}
