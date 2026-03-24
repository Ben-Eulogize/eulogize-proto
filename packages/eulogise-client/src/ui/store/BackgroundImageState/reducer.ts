import {
  BackgroundImageActionTypes,
  IBackgroundImageAction,
  IBackgroundImageState,
} from '@eulogise/core'

const initialState: IBackgroundImageState = {
  isCreating: false,
  isUpdating: false,
  isRegenerating: false,
  regenerateProduct: undefined,
  isFetching: false,
  isDeleting: false,
  isAdding: false,
  activeItem: undefined,
  backgroundImages: [],
}

export const BackgroundImageReducer = (
  state: IBackgroundImageState = initialState,
  action: IBackgroundImageAction,
): IBackgroundImageState => {
  switch (action.type) {
    // FETCH ALL background images
    case BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES_SUCCESS: {
      const backgroundImages = action.payload?.backgroundImages
      if (!backgroundImages) {
        console.error(
          'BackgroundImageState > Reducer > FETCH_BACKGROUND_IMAGES_SUCCESS: missing backgroundImages data in the payload',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        backgroundImages,
      }
    }

    case BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID: {
      return {
        ...state,
        isDeleting: true,
      }
    }

    case BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID_SUCCESS: {
      const deletedBackgroundImageId = action.payload?.backgroundImageId
      return {
        ...state,
        isDeleting: false,
        backgroundImages: state.backgroundImages.filter((b) => {
          return b.id !== deletedBackgroundImageId
        }),
      }
    }

    case BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID_FAILED: {
      return {
        ...state,
        isDeleting: false,
      }
    }

    // FETCH ONE background image
    case BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID_SUCCESS: {
      const fetchedBackgroundImage = action.payload?.backgroundImage
      if (!fetchedBackgroundImage) {
        console.error(
          'BackgroundImageState > Reducer > FETCH_BACKGROUND_IMAGE_BY_ID_SUCCESS: missing backgroundImage data in the payload',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        activeItem: fetchedBackgroundImage,
        backgroundImages: state.backgroundImages.filter((b) => {
          if (b.id === fetchedBackgroundImage.id) {
            return fetchedBackgroundImage
          }
          return b
        }),
      }
    }

    // CREATE a new backgroundImage
    case BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE: {
      return {
        ...state,
        isCreating: true,
      }
    }
    case BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE_FAILED: {
      return {
        ...state,
        isCreating: false,
      }
    }
    case BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE_SUCCESS: {
      const newBackgroundImage = action.payload?.backgroundImage
      if (!newBackgroundImage) {
        console.error(
          'BackgroundImageState > Reducer > CREATE_BACKGROUND_IMAGE_SUCCESS: missing backgroundImage data in the payload',
        )
        return {
          ...state,
          isCreating: false,
        }
      }

      return {
        ...state,
        isCreating: false,
        backgroundImages: [...state.backgroundImages, newBackgroundImage],
      }
    }

    // UPDATE an existing backgroundImage
    case BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE: {
      return {
        ...state,
        isUpdating: true,
        isRegenerating: !!action.payload?.regenerateProduct,
        regenerateProduct: action.payload?.regenerateProduct,
      }
    }
    case BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE_FAILED: {
      return {
        ...state,
        isUpdating: false,
        isRegenerating: false,
        regenerateProduct: undefined,
      }
    }
    case BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE_SUCCESS: {
      const updatedBackgroundImage = action.payload?.backgroundImage
      if (!updatedBackgroundImage) {
        console.error(
          'BackgroundImageState > Reducer > UPDATE_BACKGROUND_IMAGE_SUCCESS: missing backgroundImage data in the payload',
        )
        return {
          ...state,
          isUpdating: false,
          isRegenerating: false,
          regenerateProduct: undefined,
        }
      }
      return {
        ...state,
        isUpdating: false,
        isRegenerating: false,
        regenerateProduct: undefined,
        backgroundImages: state.backgroundImages.map((t) => {
          if (t.id === updatedBackgroundImage.id) {
            return updatedBackgroundImage
          }
          return t
        }),
      }
    }

    // DEFAULT
    default: {
      return state
    }
  }
}

export const BackgroundImageInitialState = initialState
