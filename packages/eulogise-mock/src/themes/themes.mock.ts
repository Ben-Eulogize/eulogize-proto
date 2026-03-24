import {
  EulogiseProductThemeMap,
  ITheme,
  IThemeCommon,
  ICardProductTheme,
  BOOKMARK_THEMES,
  BOOKLET_THEMES,
  BOOKLET_US_THEMES,
  THANK_YOU_CARD_THEMES,
  TV_WELCOME_SCREEN_THEMES,
  SLIDESHOW_THEMES,
  BOOKLET_THEMES_NORMAL_BORDERS,
  BOOKLET_US_THEMES_WITH_NORMAL_BORDERS,
} from '@eulogise/core'

const createSidedCardTheme = (
  bookletTheme: ICardProductTheme,
): ICardProductTheme => {
  const sidedCardThemeDefaultContent = bookletTheme.defaultContent
  if (
    !sidedCardThemeDefaultContent ||
    sidedCardThemeDefaultContent?.length < 2
  ) {
    throw new Error('Booklet theme does not have more than 2 pages')
  }

  const [firstPage] = sidedCardThemeDefaultContent
  const lastPage =
    sidedCardThemeDefaultContent[sidedCardThemeDefaultContent.length - 1]
  return {
    ...bookletTheme,
    defaultContent: [firstPage, lastPage],
  }
}

const getProductThemeById = ({
  themeId,
  isGraphicBorders = false,
}: {
  themeId: string
  isGraphicBorders?: boolean
}) => {
  const bookletTheme = (
    isGraphicBorders ? BOOKLET_THEMES : BOOKLET_THEMES_NORMAL_BORDERS
  ).find((t) => t.id === themeId)!
  const bookletUsTheme = (
    isGraphicBorders ? BOOKLET_US_THEMES : BOOKLET_US_THEMES_WITH_NORMAL_BORDERS
  ).find((t) => t.id === themeId)!
  const sidedCardTheme = createSidedCardTheme(bookletTheme)
  const sidedCardUsTheme = createSidedCardTheme(bookletUsTheme)
  const bookmarkTheme = BOOKMARK_THEMES.find((t) => t.id === themeId)
  const slideshowTheme = SLIDESHOW_THEMES.find((t) => t.id === themeId)
  const thankYouCardTheme = THANK_YOU_CARD_THEMES.find((t) => t.id === themeId)
  const tvWelcomeScreenTheme = TV_WELCOME_SCREEN_THEMES.find(
    (t) => t.id === themeId,
  )
  return {
    [EulogiseProductThemeMap.BOOKLET]: bookletTheme,
    [EulogiseProductThemeMap.BOOKLET_US]: bookletUsTheme,
    [EulogiseProductThemeMap.BOOKMARK]: bookmarkTheme,
    [EulogiseProductThemeMap.SIDED_CARD]: sidedCardTheme,
    [EulogiseProductThemeMap.SIDED_CARD_US]: sidedCardUsTheme,
    [EulogiseProductThemeMap.SLIDESHOW]: slideshowTheme,
    [EulogiseProductThemeMap.THANK_YOU_CARD]: thankYouCardTheme,
    [EulogiseProductThemeMap.TV_WELCOME_SCREEN]: tvWelcomeScreenTheme,
  }
}

const createProductThemeById = ({
  themeSummary,
  isGraphicBorders,
}: {
  themeSummary: Omit<IThemeCommon, 'dateFormat' | 'dateFormatUS'>
  isGraphicBorders?: boolean
}): ITheme => {
  return {
    ...themeSummary,
    dateFormat: 'DD/MM/YYYY',
    dateFormatUS: 'MM/DD/YYYY',
    // @ts-ignore
    products: getProductThemeById({
      themeId: themeSummary.id,
      isGraphicBorders,
    }),
  }
}

const themeSummaries: Array<Omit<IThemeCommon, 'dateFormat' | 'dateFormatUS'>> =
  [
    {
      id: 'aura',
      name: 'Aura',
      baseFont: 'Lora',
      categories: ['popular', 'floral'],
    },
    {
      id: 'grandeur',
      name: 'Grandeur',
      baseFont: 'Lora',
      categories: ['popular', 'activities-and-hobbies'],
    },
    {
      id: 'linen',
      name: 'Linen',
      baseFont: 'EB Garamond',
      categories: ['popular', 'textures'],
    },
    {
      id: 'reflection',
      baseFont: 'Montserrat',
      name: 'Reflection',
      categories: ['popular', 'minimal'],
    },
    {
      id: 'grace',
      name: 'Grace',
      baseFont: 'Lora',
      categories: ['popular', 'minimal'],
    },
    {
      id: 'classic',
      name: 'Classic',
      baseFont: 'Playfair Display',
      categories: ['popular', 'textures'],
    },
    {
      id: 'gold-roses',
      name: 'Gold Roses',
      baseFont: 'Raleway',
      categories: ['new', 'floral'],
    },
    {
      id: 'watercolor-sailing',
      name: 'Watercolor Sailing',
      baseFont: 'Cormorant',
      categories: ['new', 'activities-and-hobbies'],
    },
    {
      id: 'pastel-blue-roses',
      name: 'Pastel Blue Roses',
      baseFont: 'Old Standard TT',
      categories: ['new', 'floral'],
    },
    {
      id: 'pink-pastel',
      name: 'Pink Pastel',
      baseFont: 'EB Garamond',
      categories: ['new', 'textures'],
    },
    {
      id: 'fall-flowers',
      name: 'Fall Flowers',
      baseFont: 'Sora',
      categories: ['new', 'floral'],
    },
    {
      id: 'minimal-arch',
      name: 'Minimal Arch',
      baseFont: 'Alegra',
      categories: ['new', 'minimal'],
    },
    {
      id: 'minimal-collage',
      name: 'Minimal Collage',
      baseFont: 'Playfair Display',
      categories: ['new', 'minimal'],
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      baseFont: 'Jost',
      categories: ['new', 'minimal'],
    },
    {
      id: 'full-width',
      name: 'Full Width',
      baseFont: 'EB Garamond',
      categories: ['new', 'minimal'],
    },
  ]

export const MOCK_THEMES: Array<ITheme> = themeSummaries.map((summary) =>
  createProductThemeById({ themeSummary: summary, isGraphicBorders: true }),
)

export const MOCK_THEMES_WITH_NORMAL_BORDERS: Array<ITheme> =
  themeSummaries.map((summary) =>
    createProductThemeById({ themeSummary: summary, isGraphicBorders: false }),
  )
