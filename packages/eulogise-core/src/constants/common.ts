import {
  CardProductPageSize,
  EulogiseProduct,
  EulogizeFeature,
  GraphicFrameField,
  GUIDE_SHOW_UP_PAGE,
  IDynamicThemeFontSizeAdaptionObject,
  IEulogiseProductAvailabilityStatus,
  IEulogizeFeatureAvailabilityStatus,
  IGuideStep,
} from '../types'

export const SLIDESHOW_FPS = 24

export const AU_BOOKLET_CONTENT_WIDTH = 360
export const US_BOOKLET_CONTENT_WIDTH = 335

export const AU_BOOKLET_CONTENT_HEIGHT = 360
export const US_BOOKLET_CONTENT_HEIGHT = 335

export const AU_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH = 354
export const US_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH = 329

export const AU_BOOKLET_FULL_WIDTH_WIDTH = 420.945
export const US_BOOKLET_FULL_WIDTH_WIDTH = 395.432

export const DEFAULT_ORIGINAL_FRAME_SIZE = 210

export const FRAME_THUMBNAIL_SIZE = 120

export const DEFAULT_DATE_FORMAT_WITHOUT_YEAR: string = 'MMM Do'
export const DEFAULT_DATE_FORMAT: string = 'MMM Do YYYY'
export const DEFAULT_DATE_TIME_FORMAT: string = 'MMM Do YYYY hh:mm:ss a'
export const DEFAULT_ISO_DATE_FORMAT: string = 'YYYY-MM-DD'

export const DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT = 30

export const AVAILABLE_DATE_FORMATS = [
  { label: 'Month Day Year', value: 'MMMM DD YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'MM.DD.YYYY', value: 'MM.DD.YYYY' },
  { label: 'Day Month Year', value: 'DD MMMM YYYY' },
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'DD.MM.YY', value: 'DD.MM.YY' },
  { label: 'Month Year', value: 'MMMM YYYY' },
]

export const INITIAL_DEFAULT_PRODUCTS: IEulogiseProductAvailabilityStatus = {
  [EulogiseProduct.BOOKLET]: true,
  [EulogiseProduct.BOOKMARK]: true,
  // DISABLED PHOTOBOOK
  [EulogiseProduct.PHOTOBOOK]: true,
  [EulogiseProduct.SIDED_CARD]: true,
  [EulogiseProduct.SLIDESHOW]: true,
  [EulogiseProduct.THANK_YOU_CARD]: true,
  [EulogiseProduct.TV_WELCOME_SCREEN]: true,
}

export const INITIAL_FEATURES: IEulogizeFeatureAvailabilityStatus = {
  [EulogizeFeature.SLIDESHOW_VB]: false,
}

export const DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE = 'mFMLqO1RSYylJwRWp5Rx'

export const DEFAULT_DUMMY_IMAGE_URL = `https://cdn.filestackcontent.com/${DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE}`

export const DISPLAY_DATE_FORMAT = 'MM/DD/YYYY'

export const CARD_PRODUCT_DEFAULT_NEW_ROW_WIDTH = 360

export const LOGIN_HEADER_CONTENT = 'Sign in to your Eulogize account'
export const FORGOT_PASSWORD_HEADER_CONTENT = 'Reset your Eulogize password'
export const SIGN_UP_HEADER_CONTENT = 'Sign up to start creating'
export const SIGN_UP_SUB_HEADER_CONTENT =
  'We just need a few details to get you started'

export const ADMIN_PORTAL_USERS_SEARCH_BAR_PLACEHOLDER =
  'Type here to search user'
export const ADMIN_PORTAL_CLIENTS_SEARCH_BAR_PLACEHOLDER = 'Search client brand'
export const ADMIN_PORTAL_CASES_SEARCH_BAR_PLACEHOLDER =
  'Search case deceased full name'
export const ADMIN_CREATE_A_CLIENT_TITLE = 'Create a new client'
export const ADMIN_CREATE_EDIT_CLIENT_PAGE_TITLE = 'Create a client'
export const ADMIN_EDIT_A_CLIENT_TITLE = 'Edit a client'
export const ADMIN_CREATE_A_NEW_CASE_TITLE = 'Create a new case'
export const ADMIN_CREATE_A_NEW_CASE_SUBTITLE =
  'We need a few details to create your memorial'

export const ADMIN_CREATE_A_NEW_CASE_PLACEHOLDERS = {
  SELECT_A_CLIENT: 'Select a client',
  CUSTOMER_FULL_NAME: 'Customer full name',
  EMAIL: 'Email',
  DECEASED_NAME: 'Deceased name',
  SELECT_GENDER: 'Select gender',
  DATE_OF_BIRTH: 'Date of birth',
  DECEASED_DATE: 'Deceased date',
  SERVICE_TYPE: 'Service type',
  VENUE: 'Venue',
  VENUE_ADDRESS: 'Venue address',
  SERVICE_START_DATE: 'Select start date',
  SERVICE_END_DATE: 'Service end date',
}

export const ADMIN_CREATE_A_NEW_CLIENT_PLACEHOLDERS = {
  TITLE: 'Title',
  ADDRESS: 'Address',
  FULL_NAME: 'Full name',
  EMAIL: 'Email',
}

export const CREATE_A_CASE_FIELD_NAMES = {
  CLIENT: 'Client',
  CUSTOMER: 'Customer',
  DECEASED: 'Deceased',
  SERVICE: 'Service',
}

export const EDITOR_TOOL_BAR_ACTIVE_PAGES = {
  COVER: 'cover',
  MIDDLE: 'middle',
  BACK: 'back',
}

export const CARD_PRODUCT_NORMAL_EDITOR_VERTICAL_PADDING_IN_REM = 1
export const CARD_PRODUCT_THANK_YOU_CARD_EDITOR_VERTICAL_PADDING_IN_REM = 4

export const NO_REPLY_EULOGISE_EMAIL = 'noreply@eulogizememorials.com'

export const MAX_IMAGE_WIDTH: number = 3564
export const MAX_IMAGE_HEIGHT: number = 2520

export const MAX_SLIDESHOW_VIDEO_LENGTH: number = 45 // in minutes
export const MAX_IMAGE_DIMENSIONS: [number, number] = [
  MAX_IMAGE_WIDTH,
  MAX_IMAGE_HEIGHT,
]

export const BACKGROUND_IMAGES_BASE_PATH = 'backgroundImages'

export const MAX_DUMMY_IMAGE_DIMENSION: number = 210
export const MAX_CARD_PRODUCT_IMAGES_PER_FRAME = 6

export const SERVICE_START_TIME_PICKER_FORMAT = 'h:mm a'
export const SERVICE_START_TIME_PICKER_LABEL_TEXT = 'Service Start Time'

export const AUDIO_TRIMER_TIME_PICKER_FORMAT = 'HH:mm:ss'

export const AUDIO_TRIMER_PRECISION = {
  MIN: 'min',
  SEC: 'sec',
  MS: 'ms',
  PERCENTAGE: 'percentage',
}

export const AUDIO_TRIMER_FIELD = {
  VOLUME_PERCENTAGE: 'volumePercentage',
  TRIM_FROM_START: 'trimFromStart',
  TRIM_FROM_END: 'trimFromEnd',
  FADE_UP_AT_START: 'fadeUpAtStart',
  FADE_DOWN_AT_END: 'fadeDownAtEnd',
  ADD_SLIENCE_AT_START: 'addSlienceAtStart',
  ADD_SLIENCE_AT_END: 'addSlienceAtEnd',
  IS_CROSS_FADE_WITH_NEXT_TRACK: 'isCrossFadeWithNextTrack',
}

export const DYNAMIC_THEME_FONT_SIZE_ADAPTION_THRESHOLD: Record<
  string,
  IDynamicThemeFontSizeAdaptionObject
> = {
  aura: {
    DECEASED_NAME: {
      ORIGIN_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-one',
        [EulogiseProduct.SIDED_CARD]: 'header-one',
        [EulogiseProduct.BOOKMARK]: 'header-one',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-one',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-one',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-one',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-one',
        [EulogiseProduct.ALL]: 'header-one',
      },
      ONE_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-two',
        [EulogiseProduct.SIDED_CARD]: 'header-two',
        [EulogiseProduct.BOOKMARK]: 'header-two',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-two',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-two',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-two',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-two',
        [EulogiseProduct.ALL]: 'header-two',
      },
      TWO_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-three',
        [EulogiseProduct.SIDED_CARD]: 'header-three',
        [EulogiseProduct.BOOKMARK]: 'header-three',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-three',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-four',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-four',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-three',
        [EulogiseProduct.ALL]: 'header-three',
      },
      ONE_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 18,
        [EulogiseProduct.SIDED_CARD]: 18,
        [EulogiseProduct.BOOKMARK]: 18,
        [EulogiseProduct.THANK_YOU_CARD]: 18,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 20,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 20,
        [EulogiseProduct.SLIDESHOW]: 18,
        [EulogiseProduct.PHOTOBOOK]: 18,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 18,
        [EulogiseProduct.ALL]: 18,
      },
      TWO_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 28,
        [EulogiseProduct.SIDED_CARD]: 28,
        [EulogiseProduct.BOOKMARK]: 28,
        [EulogiseProduct.THANK_YOU_CARD]: 28,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 24,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 24,
        [EulogiseProduct.SLIDESHOW]: 28,
        [EulogiseProduct.PHOTOBOOK]: 28,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 28,
        [EulogiseProduct.ALL]: 28,
      },
    },
  },
  grandeur: {
    DECEASED_NAME: {
      ORIGIN_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-one',
        [EulogiseProduct.SIDED_CARD]: 'header-one',
        [EulogiseProduct.BOOKMARK]: 'header-one',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-one',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-one',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-one',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-one',
        [EulogiseProduct.ALL]: 'header-one',
      },
      ONE_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-two',
        [EulogiseProduct.SIDED_CARD]: 'header-two',
        [EulogiseProduct.BOOKMARK]: 'header-two',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-two',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-three',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-three',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-two',
        [EulogiseProduct.ALL]: 'header-two',
      },
      TWO_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-three',
        [EulogiseProduct.SIDED_CARD]: 'header-three',
        [EulogiseProduct.BOOKMARK]: 'header-three',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-three',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-five',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-five',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-three',
        [EulogiseProduct.ALL]: 'header-three',
      },
      ONE_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 18,
        [EulogiseProduct.SIDED_CARD]: 18,
        [EulogiseProduct.BOOKMARK]: 18,
        [EulogiseProduct.THANK_YOU_CARD]: 18,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 16,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 16,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 18,
        [EulogiseProduct.ALL]: 0,
      },
      TWO_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 30,
        [EulogiseProduct.SIDED_CARD]: 30,
        [EulogiseProduct.BOOKMARK]: 30,
        [EulogiseProduct.THANK_YOU_CARD]: 30,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 20,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 20,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 30,
        [EulogiseProduct.ALL]: 0,
      },
    },
  },
  linen: {
    DECEASED_NAME: {
      ORIGIN_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-one',
        [EulogiseProduct.SIDED_CARD]: 'header-one',
        [EulogiseProduct.BOOKMARK]: 'header-one',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-one',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-one',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-one',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-one',
        [EulogiseProduct.ALL]: 'header-one',
      },
      ONE_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-two',
        [EulogiseProduct.SIDED_CARD]: 'header-two',
        [EulogiseProduct.BOOKMARK]: 'header-two',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-two',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-two',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-two',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-two',
        [EulogiseProduct.ALL]: 'header-two',
      },
      TWO_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-three',
        [EulogiseProduct.SIDED_CARD]: 'header-three',
        [EulogiseProduct.BOOKMARK]: 'header-three',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-three',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-three',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-three',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-three',
        [EulogiseProduct.ALL]: 'header-three',
      },
      ONE_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 24,
        [EulogiseProduct.SIDED_CARD]: 24,
        [EulogiseProduct.BOOKMARK]: 24,
        [EulogiseProduct.THANK_YOU_CARD]: 24,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 19,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 19,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 0,
        [EulogiseProduct.ALL]: 0,
      },
      TWO_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 32,
        [EulogiseProduct.SIDED_CARD]: 32,
        [EulogiseProduct.BOOKMARK]: 32,
        [EulogiseProduct.THANK_YOU_CARD]: 32,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 25,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 25,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 32,
        [EulogiseProduct.ALL]: 0,
      },
    },
  },
  reflection: {
    DECEASED_NAME: {
      ORIGIN_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-one',
        [EulogiseProduct.SIDED_CARD]: 'header-one',
        [EulogiseProduct.BOOKMARK]: 'header-one',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-one',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-one',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-one',
        [EulogiseProduct.SLIDESHOW]: '',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-one',
        [EulogiseProduct.ALL]: 'header-one',
      },
      ONE_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-two',
        [EulogiseProduct.SIDED_CARD]: 'header-two',
        [EulogiseProduct.BOOKMARK]: 'header-two',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-two',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-two',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-two',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-two',
        [EulogiseProduct.ALL]: 'header-two',
      },
      TWO_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-three',
        [EulogiseProduct.SIDED_CARD]: 'header-three',
        [EulogiseProduct.BOOKMARK]: 'header-three',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-three',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-three',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-three',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-three',
        [EulogiseProduct.ALL]: 'header-three',
      },
      ONE_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 18,
        [EulogiseProduct.SIDED_CARD]: 18,
        [EulogiseProduct.BOOKMARK]: 18,
        [EulogiseProduct.THANK_YOU_CARD]: 18,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 16,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 16,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 18,
        [EulogiseProduct.ALL]: 0,
      },
      TWO_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 28,
        [EulogiseProduct.SIDED_CARD]: 28,
        [EulogiseProduct.BOOKMARK]: 28,
        [EulogiseProduct.THANK_YOU_CARD]: 28,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 21,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 21,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 28,
        [EulogiseProduct.ALL]: 0,
      },
    },
  },
  grace: {
    DECEASED_NAME: {
      ORIGIN_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-one',
        [EulogiseProduct.SIDED_CARD]: 'header-one',
        [EulogiseProduct.BOOKMARK]: 'header-one',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-one',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-one',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-one',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-one',
        [EulogiseProduct.ALL]: 'header-one',
      },
      ONE_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-two',
        [EulogiseProduct.SIDED_CARD]: 'header-two',
        [EulogiseProduct.BOOKMARK]: 'header-two',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-two',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-three',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-three',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-two',
        [EulogiseProduct.ALL]: 'header-two',
      },
      TWO_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-three',
        [EulogiseProduct.SIDED_CARD]: 'header-three',
        [EulogiseProduct.BOOKMARK]: 'header-three',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-three',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-five',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-five',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-three',
        [EulogiseProduct.ALL]: 'header-three',
      },
      ONE_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 21,
        [EulogiseProduct.SIDED_CARD]: 21,
        [EulogiseProduct.BOOKMARK]: 21,
        [EulogiseProduct.THANK_YOU_CARD]: 21,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 19,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 19,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 21,
        [EulogiseProduct.ALL]: 0,
      },
      TWO_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 25,
        [EulogiseProduct.SIDED_CARD]: 25,
        [EulogiseProduct.BOOKMARK]: 25,
        [EulogiseProduct.THANK_YOU_CARD]: 25,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 26,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 26,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 25,
        [EulogiseProduct.ALL]: 0,
      },
    },
  },
  classic: {
    DECEASED_NAME: {
      ORIGIN_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-one',
        [EulogiseProduct.SIDED_CARD]: 'header-one',
        [EulogiseProduct.BOOKMARK]: 'header-one',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-one',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-one',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-one',
        [EulogiseProduct.SLIDESHOW]: '',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-one',
        [EulogiseProduct.ALL]: 'header-one',
      },
      ONE_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-two',
        [EulogiseProduct.SIDED_CARD]: 'header-two',
        [EulogiseProduct.BOOKMARK]: 'header-two',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-two',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-two',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-two',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-two',
        [EulogiseProduct.ALL]: 'header-two',
      },
      TWO_LEVEL_SMALLER_FONT_TYPE: {
        [EulogiseProduct.BOOKLET]: 'header-three',
        [EulogiseProduct.SIDED_CARD]: 'header-three',
        [EulogiseProduct.BOOKMARK]: 'header-three',
        [EulogiseProduct.THANK_YOU_CARD]: 'header-three',
        [EulogiseProduct.TV_WELCOME_SCREEN]: 'header-three',
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'header-three',
        [EulogiseProduct.SLIDESHOW]: 'n/a',
        [EulogiseProduct.PHOTOBOOK]: '',
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'header-three',
        [EulogiseProduct.ALL]: 'header-three',
      },
      ONE_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 24,
        [EulogiseProduct.SIDED_CARD]: 24,
        [EulogiseProduct.BOOKMARK]: 24,
        [EulogiseProduct.THANK_YOU_CARD]: 24,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 21,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 21,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 24,
        [EulogiseProduct.ALL]: 0,
      },
      TWO_LEVEL_STRING_LENGTH_THRESHOLD: {
        [EulogiseProduct.BOOKLET]: 32,
        [EulogiseProduct.SIDED_CARD]: 32,
        [EulogiseProduct.BOOKMARK]: 32,
        [EulogiseProduct.THANK_YOU_CARD]: 32,
        [EulogiseProduct.TV_WELCOME_SCREEN]: 31,
        [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 31,
        [EulogiseProduct.SLIDESHOW]: 0,
        [EulogiseProduct.PHOTOBOOK]: 0,
        [EulogiseProduct.GENERIC_CARD_PRODUCT]: 32,
        [EulogiseProduct.ALL]: 0,
      },
    },
  },
}

export enum GUIDE_WALK_THROUGH_ROUTERS_START_WITH {
  DASHBOARD = '/admin/dashboard/',
  BOOKLET = '/admin/booklets/',
  SLIDESHOW = '/admin/slideshows/',
  CLIENT_DASHBOARD_PART_ONE = '/admin/client/cases/',
  CLIENT_DASHBOARD_PART_TWO = '/admin/client/cases/',
}

export const GUIDE_WALK_THROUGH_STEPS: Record<
  GUIDE_SHOW_UP_PAGE,
  Array<IGuideStep>
> = {
  DASHBOARD: [
    {
      STEP: 1,
      TITLE: '1. Add, Arrange and Edit Photos',
      SUBTITLE: '',
      TEXT: '<span id="bold-text">Add photos</span> easily from any device via the <span id="bold-text">Upload</span> Pictures button.',
      SECOND_TEXT:
        'All uploaded photos can be viewed, arranged and edited in your <span id="bold-text">photo library.</span>',
      THIRD_TEXT: '',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '25px',
        LEFT: '240px',
      },
    },
    {
      STEP: 2,
      TITLE: '2. Work with Friends & Family',
      SUBTITLE: '',
      TEXT: 'Invite friends or family as <span id="bold-text">Contributors</span> to upload photos.',
      SECOND_TEXT:
        'If you invite them as <span id="bold-text">Coeditors</span> they can even help you create your tributes.',
      THIRD_TEXT: '',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '25px',
        LEFT: '240px',
      },
    },
    {
      STEP: 3,
      TITLE: '3. View Designs and Templates',
      SUBTITLE: '',
      TEXT: 'Click <span id="bold-text">View Themes</span> to see our section of editable templates.',
      SECOND_TEXT:
        'These can be selected individually or applied to all tributes.',
      THIRD_TEXT: '',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '25px',
        LEFT: '240px',
      },
    },
    {
      STEP: 4,
      TITLE: '4. Start Creating',
      SUBTITLE: '',
      TEXT: 'Eulogize lets you create <span id="bold-text">Memorial Tribute Videos, Folded Service Programs</span>, and other funeral stationery in one easy place.',
      SECOND_TEXT:
        'Choose where you would like to start and click <span id="bold-text">Start Creating</span> to begin.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '-5px',
        LEFT: '265px',
      },
    },
  ],
  BOOKLET: [
    {
      STEP: 1,
      TITLE: '1. Change Your Photos',
      SUBTITLE: '',
      TEXT: '<span id="bold-text">Click</span> any image to change the photo or layout.',
      SECOND_TEXT:
        '<span id="bold-text">Double click</span> to change the positining.',
      THIRD_TEXT:
        '<span id="bold-text">Upload</span> more photos via the image draw on the left.',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '-450px',
        LEFT: '215px',
      },
    },
    {
      STEP: 2,
      TITLE: '2. Update Your Text',
      SUBTITLE: '',
      TEXT: `<span id="bold-text">Click</span> any text box to edit the words.`,
      SECOND_TEXT: `<span id="bold-text">Add</span> a new text box via the <span id="bold-text">Add Content</span> button in the top bar.`,
      THIRD_TEXT: '',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '-200px',
        LEFT: '215px',
      },
    },
    {
      STEP: 3,
      TITLE: '3. Arrange Your Layout',
      SUBTITLE: '',
      TEXT: '<span id="bold-text">Drag</span> any photo or text box up and down the page via the handles on the side.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '-470px',
        LEFT: '300px',
      },
    },
    {
      STEP: 4,
      TITLE: '4. Design Your Program',
      SUBTITLE: '',
      TEXT: 'Use the top purple bar to find additional design tools.',
      SECOND_TEXT:
        'From there you can <span id="bold-text">Add Pages, Change Background, Select Borders,</span> and find a <span id="bold-text">Verses Library</span> of popular poems and readings.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '20px',
        LEFT: '315px',
      },
    },
    {
      STEP: 5,
      TITLE: '5. Share and Finish',
      SUBTITLE: '',
      TEXT: 'Send a preview with the share button, or click complete to download your booklet.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '30px',
        LEFT: '20px',
      },
    },
  ],
  SLIDESHOW: [
    {
      STEP: 1,
      TITLE: '1. Upload and Add Photos',
      SUBTITLE: '',
      TEXT: '<span id="bold-text">Upload</span> your photos from the left drawer.',
      SECOND_TEXT:
        '<span id="bold-text">Add</span> all your photos to the timeline with one button or select them individually.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottomLeft',
      STYLE: {
        TOP: '-10px',
        LEFT: '-20px',
      },
    },
    {
      STEP: 2,
      TITLE: '2. Change the Photo Order',
      SUBTITLE: '',
      TEXT: '<span id="bold-text">Drag and Drop</span> in the timeline to change the order and position of your photos.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '270px',
        LEFT: '210px',
      },
    },
    {
      STEP: 3,
      TITLE: '3. Add & Select Music',
      SUBTITLE: '',
      TEXT: '<span id="bold-text">Upload</span> your own music track or select from our library. Your photos will <span id="bold-text">auto-fit</span> to the duration of your music.',
      SECOND_TEXT: 'You can also select no audio for a slient video.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '15px',
        LEFT: '110px',
      },
    },
    {
      STEP: 4,
      TITLE: '4. Change the Designs',
      SUBTITLE: '',
      TEXT: 'Use the top purple bar to find additional design tools.',
      SECOND_TEXT:
        'From there you can <span id="bold-text">Change Background, Add Borders,</span> or make all photos <span id="bold-text">Black & White</span>.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '10px',
        LEFT: '-185px',
      },
    },
    {
      STEP: 5,
      TITLE: '5. Add Title Slides',
      SUBTITLE: '',
      TEXT: 'Add a title slide to the beginning or end.',
      SECOND_TEXT:
        'You can also download this slide to use as a TV welcome screen for the service.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '10px',
        LEFT: '80px',
      },
    },
    {
      STEP: 6,
      TITLE: '6. Watch Your Video',
      SUBTITLE: '',
      TEXT: 'View a <span id="bold-text">preview</span> of your video at anytime.',
      SECOND_TEXT:
        'When you are done, share a preview link or download your mp4 file.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '30px',
        LEFT: '-55px',
      },
    },
  ],
  GLOBAL_WELCOME_MEMORIAL_DASHBOARD: [
    {
      STEP: 1,
      TITLE: 'Welcome to Eulogize',
      SUBTITLE: 'What would you like to do first?',
      TEXT: 'Eulogize is the easiest way to quickly make beautiful videos, order of service booklets and other keepsakes for your loved one.',
      SECOND_TEXT: 'Would you like to see our get started guide?',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '-150px',
        LEFT: '-270px',
      },
    },
  ],
  GLOBAL_WELCOME_CLIENT_DASHBOARD: [
    {
      STEP: 1,
      TITLE: 'Welcome to Eulogize',
      SUBTITLE: '',
      TEXT: 'This screen is your admin dashboard where you can see and manage all the manage tributes for your families.',
      SECOND_TEXT: ' Would you like to take the short tour?',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '0px',
        LEFT: '-270px',
      },
    },
  ],
  CLIENT_DASHBOARD_PART_ONE: [
    {
      STEP: 1,
      TITLE: 'Create a New Tribute',
      SUBTITLE: '',
      TEXT: 'Start making a memorial video, order of service booklet or other memorials.',
      SECOND_TEXT:
        'All service details will be added to memorials dynamically.',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '-5px',
        LEFT: '170px',
      },
    },
    {
      STEP: 2,
      TITLE: 'Select Your View',
      SUBTITLE: '',
      TEXT: 'Switch which cases appear in the dashboard or view past cases.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'bottomRight',
      STYLE: {
        TOP: '120px',
        LEFT: '-80px',
      },
    },
    {
      STEP: 3,
      TITLE: 'Search and Filter',
      SUBTITLE: '',
      TEXT: 'Search for any case by deceased name, family member or email address.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'bottomRight',
      STYLE: {
        TOP: '110px',
        LEFT: '0px',
      },
    },
    {
      STEP: 4,
      TITLE: 'Help Guides',
      SUBTITLE: '',
      TEXT: 'Relaunch the page tutorial at any time by clicking the ? or use the live chat bubble on the right to talk to our team.',
      SECOND_TEXT: 'Create your first tribute to see more features.',

      THIRD_TEXT: '',
      PLACEMENT: 'rightTop',
      STYLE: {
        TOP: '0px',
        LEFT: '230px',
      },
    },
  ],
  CLIENT_DASHBOARD_PART_TWO: [
    {
      STEP: 1,
      TITLE: 'View Tribute Page',
      SUBTITLE: '',
      TEXT: "Clicking the deceased's name will open the tribute page for that case.",
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'bottom',
      STYLE: {
        TOP: '15px',
        LEFT: '50px',
      },
    },
    {
      STEP: 2,
      TITLE: 'Memorial Status',
      SUBTITLE: '',
      TEXT: 'View the status of the memorial video or order of service booklet. You can click the status to jump straight into that memorial.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'leftTop',
      STYLE: {
        TOP: '-5px',
        LEFT: '0px',
      },
    },
    {
      STEP: 3,
      TITLE: 'Tribute Actions',
      SUBTITLE: '',
      TEXT: 'Upload photos, invite family members and view the status of other memorials from inside the actions tab.',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'leftTop',
      STYLE: {
        TOP: '-10px',
        LEFT: '0px',
      },
    },
  ],
  NULL: [
    {
      STEP: 1,
      TITLE: 'N/A',
      SUBTITLE: '',
      TEXT: 'N/A',
      SECOND_TEXT: '',
      THIRD_TEXT: '',
      PLACEMENT: 'right',
      STYLE: {
        TOP: '0',
        LEFT: '0',
      },
    },
  ],
}

export const FRAME_GRAPHICS: Array<Pick<GraphicFrameField, 'name'>> = [
  {
    name: 'Blue_Pastel_Circle_Frame',
  },
  {
    name: 'Bluegum_Gold_Rectangle_Frame',
  },
  {
    name: 'Circle_Leaf_Frame_2',
  },
  {
    name: 'Circle_Leaf_Frame',
  },
  {
    name: 'Gold_Roses_Circle_Frame',
  },
  {
    name: 'Rectangle_Leaf_Frame',
  },
  {
    name: 'White_Rose_Rectangle_Frame',
  },
]

export const DEFAULT_CLIENT_INSERTED_BRAND_HEIGHT = 65
export const ENHANCE_IMAGE_INACTIVE_SVG_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/enhance-image-black.svg`
export const ENHANCE_IMAGE_ACTIVE_SVG_URL = `https://${process.env.GATSBY_AWS_S3_BUCKET}/icons/enhance-image-purple.svg`

export enum EulogisePhotobookCoverType {
  // CLASSIC
  SAND = 'sand',
  IVORY = 'ivory',
  BLACK = 'black',
  CHARCOAL = 'charcoal',
  PALE_PINK = 'pale-pink',
  RUBY_RED = 'ruby-red',
  BABY_BLUE = 'baby-blue',

  // PREMIUM
  SALT_LINEN = 'salt-linen',
  PEPPER_LINEN = 'pepper-linen',
  NUT_LINEN = 'nut-linen',
  IVORY_LINEN = 'ivory-linen',
  STONE_LINEN = 'stone-linen',
  BLUSH_LINEN = 'blush-linen',
  STEEL_BLUE_LINEN = 'steel-blue-linen',
  METALLIC_PEARL_BUCKRAM = 'metallic-pearl-buckram',
  BLACK_BUCKRAM = 'black-buckram',
  DEEP_BLUE_BUCKRAM = 'deep-blue-buckram',
  METALLIC_CHESTNUT_BUCKRAM = 'metallic-chestnut-buckram',
  MERLOT_VEGAN_LEATHER = 'merlot-vegan-leather',
  EMERALD_VEGAN_LEATHER = 'emerald-vegan-leather',
  BLACK_VEGAN_LEATHER = 'black-vegan-leather',
}

export type IPhotobookCoverTypeOption = {
  label: string
  value: EulogisePhotobookCoverType
  supportedPageSizes?: Array<CardProductPageSize>
  extraCost?: boolean
}

export const PhotobookCoverTypeOptions: Array<IPhotobookCoverTypeOption> = [
  // CLASSIC
  {
    label: 'Sand',
    value: EulogisePhotobookCoverType.SAND,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },
  {
    label: 'Ivory',
    value: EulogisePhotobookCoverType.IVORY,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },
  {
    label: 'Black',
    value: EulogisePhotobookCoverType.BLACK,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },
  {
    label: 'Charcoal',
    value: EulogisePhotobookCoverType.CHARCOAL,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },
  {
    label: 'Pale Pink',
    value: EulogisePhotobookCoverType.PALE_PINK,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },
  {
    label: 'Ruby Red',
    value: EulogisePhotobookCoverType.RUBY_RED,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },
  {
    label: 'Baby Blue',
    value: EulogisePhotobookCoverType.BABY_BLUE,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    ],
  },

  // PREMIUM
  {
    label: 'Salt Linen',
    value: EulogisePhotobookCoverType.SALT_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Pepper Linen',
    value: EulogisePhotobookCoverType.PEPPER_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Nut Linen',
    value: EulogisePhotobookCoverType.NUT_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Ivory Linen',
    value: EulogisePhotobookCoverType.IVORY_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Stone Linen',
    value: EulogisePhotobookCoverType.STONE_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Blush Linen',
    value: EulogisePhotobookCoverType.BLUSH_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Steel Blue Linen',
    value: EulogisePhotobookCoverType.STEEL_BLUE_LINEN,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  /*{
    label: 'Metallic Pearl Buckram',
    value: EulogisePhotobookCoverType.METALLIC_PEARL_BUCKRAM,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Black Buckram',
    value: EulogisePhotobookCoverType.BLACK_BUCKRAM,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Deep Blue Buckram',
    value: EulogisePhotobookCoverType.DEEP_BLUE_BUCKRAM,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Metallic Chestnut Buckram',
    value: EulogisePhotobookCoverType.METALLIC_CHESTNUT_BUCKRAM,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
  },
  {
    label: 'Merlot Vegan Leather',
    value: EulogisePhotobookCoverType.MERLOT_VEGAN_LEATHER,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
    extraCost: true,
  },*/
  {
    label: 'Emerald Vegan Leather',
    value: EulogisePhotobookCoverType.EMERALD_VEGAN_LEATHER,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
    extraCost: true,
  },
  {
    label: 'Black Vegan Leather',
    value: EulogisePhotobookCoverType.BLACK_VEGAN_LEATHER,
    supportedPageSizes: [
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    ],
    extraCost: true,
  },
]

export const PhotobookCoverTypeLabelMap = PhotobookCoverTypeOptions.reduce(
  (acc, option) => {
    acc[option.value] = option.label
    return acc
  },
  {} as Record<EulogisePhotobookCoverType, string>,
)
