export enum GuideWalkThroughActionTypes {
  OPEN_GUIDE = 'OPEN_GUIDE',
  NEXT_STEP = 'NEXT_STEP',
  CLOSE_GUIDE = 'CLOSE_GUIDE',
  RESTORE_INITIAL_STARESTORE_GUIDE_WALK_THROUGH_INITIAL_STATETE = 'RESTORE_GUIDE_WALK_THROUGH_INITIAL_STATE',
  FINISH_CLIENT_DASHBOARD_GUIDE_FIRST_PART = 'FINISH_CLIENT_DASHBOARD_GUIDE_FIRST_PART',
}

export enum GUIDE_SHOW_UP_PAGE {
  DASHBOARD = 'DASHBOARD',
  BOOKLET = 'BOOKLET',
  SLIDESHOW = 'SLIDESHOW',
  NULL = 'NULL',
  GLOBAL_WELCOME_MEMORIAL_DASHBOARD = 'GLOBAL_WELCOME_MEMORIAL_DASHBOARD',
  GLOBAL_WELCOME_CLIENT_DASHBOARD = 'GLOBAL_WELCOME_CLIENT_DASHBOARD',
  CLIENT_DASHBOARD_PART_ONE = 'CLIENT_DASHBOARD_PART_ONE',
  CLIENT_DASHBOARD_PART_TWO = 'CLIENT_DASHBOARD_PART_TWO',
}

export const SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE: Record<
  GUIDE_SHOW_UP_PAGE,
  string
> = {
  [GUIDE_SHOW_UP_PAGE.DASHBOARD]: 'hasViewedMemorialDashboard',
  [GUIDE_SHOW_UP_PAGE.BOOKLET]: 'hasViewedBooklet',
  [GUIDE_SHOW_UP_PAGE.SLIDESHOW]: 'hasViewedSlideshow',
  [GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_MEMORIAL_DASHBOARD]:
    'hasViewedMemorialDashboard',
  [GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_CLIENT_DASHBOARD]:
    'hasViewedClientDashboardPartOne',
  [GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE]:
    'hasViewedClientDashboardPartOne',
  [GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_TWO]:
    'hasViewedClientDashboardPartTwo',
  [GUIDE_SHOW_UP_PAGE.NULL]: '',
}

export const WELCOME_POPOVER_STEPS_MAP_TABLE: Partial<
  Record<GUIDE_SHOW_UP_PAGE, number>
> = {
  [GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_MEMORIAL_DASHBOARD]: 5,
  [GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_CLIENT_DASHBOARD]: 4,
}

export interface IGuideStep {
  STEP: number
  TITLE: string
  SUBTITLE: string
  TEXT: string
  SECOND_TEXT: string
  THIRD_TEXT: string
  PLACEMENT: string
  STYLE: any
}

export interface IGuideWalkThroughState {
  guideShowAt?: GUIDE_SHOW_UP_PAGE
  currentStep?: number
  isQuickGuideEnabled?: boolean
  shouldQuickGuideFlashHighlighted: boolean
  shouldCreateNewCaseFlashHighlighted: boolean
}

export interface IGuideWalkThroughAction {
  type: GuideWalkThroughActionTypes
  payload?: IGuideWalkThroughActionPayload
}

export interface IGuideWalkThroughActionPayload {
  guideShowAt?: GUIDE_SHOW_UP_PAGE
  currentStep?: number
  isQuickGuideEnabled?: boolean
}
