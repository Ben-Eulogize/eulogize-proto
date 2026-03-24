import { attachGraphicBorder, getBookletThemes } from './bookletThemeUtils'
import {
  US_BOOKLET_CONTENT_HEIGHT,
  US_BOOKLET_CONTENT_WIDTH,
  US_BOOKLET_FULL_WIDTH_WIDTH,
} from '../common'

export const BOOKLET_US_THEMES_WITH_NORMAL_BORDERS = getBookletThemes({
  regionContentWidth: US_BOOKLET_CONTENT_WIDTH,
  regionContentHeight: US_BOOKLET_CONTENT_HEIGHT,
  regionFullWidth: US_BOOKLET_FULL_WIDTH_WIDTH,
})

export const BOOKLET_US_THEMES = attachGraphicBorder(
  BOOKLET_US_THEMES_WITH_NORMAL_BORDERS,
)
