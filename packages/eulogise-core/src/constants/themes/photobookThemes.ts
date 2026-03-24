import { ICardProductTheme } from '../../types'

export const PHOTOBOOK_DEFAULT_THEME: ICardProductTheme = {
  id: 'default',
  name: 'Default',
  thumbnail: {
    images: [],
  },
  defaultThemeLayoutColumns: 1,
  defaultStyle: {
    font: 'Lora',
    fontSize: 10,
  },
  newPageStyles: {
    header: 'default-header',
    paragraph: 'default-paragraph',
    headerHeight: 27,
    paragraphHeight: 118,
  },
  styles: {
    'default-header': {
      font: 'Alegreya',
      fontSize: 16,
    },
    'default-paragraph': {
      font: 'Alegreya',
      fontSize: 12,
      color: '#4a4a4a',
    },
    'header-one': {
      font: 'Allura',
      fontSize: 44,
    },
    'header-two': {
      font: 'Allura',
      fontSize: 30,
    },
    'header-three': {
      font: 'Allura',
      fontSize: 24,
    },
    'header-four': {
      font: 'Alegreya',
      fontSize: 20,
    },
    'header-five': {
      font: 'Alegreya',
      fontSize: 16,
    },
    'header-six': {
      font: 'Alegreya',
      fontSize: 14,
    },
    'paragraph-one': {
      font: 'Alegreya',
      fontSize: 12,
      color: '#4a4a4a',
    },
    'paragraph-two': {
      font: 'Alegreya',
      fontSize: 9,
      color: '#4a4a4a',
    },
  },
}
