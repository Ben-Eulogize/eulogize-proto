import { STYLE } from '@eulogise/client-core'

export const FIT_CONTENT_RATIO = 0.8
export const DEBOUNCED_UPDATE_ZOOM_FACTOR_THRESHOLD = 0.05
export const DEBOUNCED_UPDATE_POSTER_EXTRA_SPACE_CHANGE_PX_THRESHOLD = 20
export const PRE_SIGN_UP_IN_LAYOUT_CARD_PADDING = 24
export const PRE_LOGGED_IN_RESPONSIVE_ENABLE_SCREEN_HEIGHT = 1080
export const HEADER_HEIGHT_IN_PIXES =
  parseInt((STYLE.PRE_LOGIN_HEADER_HEIGHT as string).replace('rem', '')) * 16
export const FOOTER_HEIGHT_IN_PIXES =
  parseInt((STYLE.FOOTER_HEIGHT as string).replace('rem', '')) * 16
