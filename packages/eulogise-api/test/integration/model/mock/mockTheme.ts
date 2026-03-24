import { IThemeModel } from '../../../../src/ts/database/types/ThemeModel.types'
import { DISPLAY_DATE_FORMAT } from '@eulogise/core'
import { MOCK_BOOKLET_THEME_1 } from './mockBookletTheme'
import { MOCK_BOOKMARK_THEME_1 } from './mockBookmarkTheme'
import { MOCK_SLIDESHOW_THEME_1 } from './mockSlideshowTheme'
import { MOCK_SIDED_CARD_THEME_1 } from './mockSidedCardTheme'
import { MOCK_THANK_YOU_CARD_THEME_1 } from './mockThankYouCardTheme'
import { MOCK_TV_WELCOME_SCREEN_THEME_1 } from './mockTvWelcomeScreenTheme'

export const MOCK_THEME_DATA_1: IThemeModel.Schema = {
  name: 'mock-theme',
  clientId: 'mock-client-id',
  categories: ['mock-cat1', 'mock-cat2'],
  baseFont: 'mockFont',
  dateFormat: DISPLAY_DATE_FORMAT,
  products: {
    booklet: MOCK_BOOKLET_THEME_1,
    bookmark: MOCK_BOOKMARK_THEME_1,
    slideshow: MOCK_SLIDESHOW_THEME_1,
    sidedCard: MOCK_SIDED_CARD_THEME_1,
    thankYouCard: MOCK_THANK_YOU_CARD_THEME_1,
    tvWelcomeScreen: MOCK_TV_WELCOME_SCREEN_THEME_1,
  },
}
