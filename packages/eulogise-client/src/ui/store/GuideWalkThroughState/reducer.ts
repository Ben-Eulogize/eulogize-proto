import {
  IGuideWalkThroughAction,
  IGuideWalkThroughState,
  GuideWalkThroughActionTypes,
  GUIDE_SHOW_UP_PAGE,
} from '@eulogise/core'

const initialState: IGuideWalkThroughState = {
  guideShowAt: GUIDE_SHOW_UP_PAGE.NULL,
  currentStep: 0,
  isQuickGuideEnabled: false,
  shouldQuickGuideFlashHighlighted: false,
  shouldCreateNewCaseFlashHighlighted: false,
}

export const GuideWalkThroughReducer = (
  state: IGuideWalkThroughState = initialState,
  action: IGuideWalkThroughAction,
): IGuideWalkThroughState => {
  switch (action.type) {
    case GuideWalkThroughActionTypes.NEXT_STEP: {
      return {
        ...state,
        currentStep: (state.currentStep ?? 0) + 1,
      }
    }
    case GuideWalkThroughActionTypes.CLOSE_GUIDE: {
      return {
        ...initialState,
        shouldQuickGuideFlashHighlighted: true,
      }
    }
    case GuideWalkThroughActionTypes.OPEN_GUIDE: {
      const { guideShowAt, currentStep, isQuickGuideEnabled } = action.payload!
      return {
        ...state,
        guideShowAt,
        currentStep,
        isQuickGuideEnabled,
        shouldQuickGuideFlashHighlighted: false,
      }
    }
    case GuideWalkThroughActionTypes.FINISH_CLIENT_DASHBOARD_GUIDE_FIRST_PART: {
      return {
        ...initialState,
        shouldCreateNewCaseFlashHighlighted: true,
      }
    }
    case GuideWalkThroughActionTypes.RESTORE_GUIDE_WALK_THROUGH_INITIAL_STATE: {
      return initialState
    }
    default:
      return state
  }
}

export const GuideWalkThroughInitialState = initialState
