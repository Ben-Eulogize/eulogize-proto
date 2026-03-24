import { attachGraphicBorder, getBookletThemes } from './bookletThemeUtils'
import {
  AU_BOOKLET_CONTENT_HEIGHT,
  AU_BOOKLET_CONTENT_WIDTH,
  AU_BOOKLET_FULL_WIDTH_WIDTH,
} from '../common'

export const BOOKLET_THEMES_NORMAL_BORDERS = getBookletThemes({
  regionContentWidth: AU_BOOKLET_CONTENT_WIDTH,
  regionContentHeight: AU_BOOKLET_CONTENT_HEIGHT,
  regionFullWidth: AU_BOOKLET_FULL_WIDTH_WIDTH,
})

export const BOOKLET_THEMES = attachGraphicBorder(BOOKLET_THEMES_NORMAL_BORDERS)
