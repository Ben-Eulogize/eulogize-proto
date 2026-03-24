import { EulogiseProduct, ICardProductOverlayUpdateOptions } from '../types'

export const CARD_PRODUCTS_OVERLAYS: Record<
  EulogiseProduct,
  ICardProductOverlayUpdateOptions
> = {
  [EulogiseProduct.BOOKLET]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.85,
    overlayMargin: [11, 8],
  },
  [EulogiseProduct.BOOKMARK]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.85,
    overlayMargin: [11, 8],
  },
  [EulogiseProduct.SIDED_CARD]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.85,
    overlayMargin: [11, 8],
  },
  [EulogiseProduct.THANK_YOU_CARD]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.85,
    overlayMargin: [5, 7],
  },
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.85,
    overlayMargin: [5, 7],
  },
  [EulogiseProduct.SLIDESHOW]: {
    overlayColor: '#ffffff',
    overlayOpacity: 1,
    overlayMargin: [0, 0],
  },
  [EulogiseProduct.TV_WELCOME_SCREEN]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.45,
    overlayMargin: [3, 8],
  },
  [EulogiseProduct.PHOTOBOOK]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.45,
    overlayMargin: [11, 8],
  },
  [EulogiseProduct.GENERIC_CARD_PRODUCT]: {
    overlayColor: '#ffffff',
    overlayOpacity: 0.85,
    overlayMargin: [11, 8],
  },
  [EulogiseProduct.ALL]: {
    overlayColor: '#ffffff',
    overlayOpacity: 1,
    overlayMargin: [11, 8],
  },
}
