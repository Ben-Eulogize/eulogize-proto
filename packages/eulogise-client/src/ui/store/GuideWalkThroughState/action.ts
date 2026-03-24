import { GuideWalkThroughActionTypes, GUIDE_SHOW_UP_PAGE } from '@eulogise/core'

export const nextGuideStep = () => ({
  type: GuideWalkThroughActionTypes.NEXT_STEP,
  payload: {},
})

export const closeGuide = () => ({
  type: GuideWalkThroughActionTypes.CLOSE_GUIDE,
  payload: {},
})

export const finishFirstPartClientDashboardGuide = () => ({
  type: GuideWalkThroughActionTypes.FINISH_CLIENT_DASHBOARD_GUIDE_FIRST_PART,
  payload: {},
})

export const showGuide = (
  guideShowAt: GUIDE_SHOW_UP_PAGE,
  currentStep: number,
  isQuickGuideEnabled: boolean,
) => ({
  type: GuideWalkThroughActionTypes.OPEN_GUIDE,
  payload: {
    guideShowAt,
    currentStep,
    isQuickGuideEnabled,
  },
})

export const restoreGuideState = () => ({
  type: GuideWalkThroughActionTypes.RESTORE_INITIAL_STARESTORE_GUIDE_WALK_THROUGH_INITIAL_STATETE,
  payload: {},
})
