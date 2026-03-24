/* New Style - Mobile first */
export const BREAKPOINT = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1000px',
}

export const SCREEN_SIZE = {
  MOBILE: `@media only screen and (min-width: ${BREAKPOINT.MOBILE})`,
  TABLET: `@media only screen and (min-width: ${BREAKPOINT.TABLET})`,
  DESKTOP: `@media only screen and (min-width: ${BREAKPOINT.DESKTOP})`,
}

/* For UseBreakpoint Hook */
export enum DEVICES {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
}

export enum EDITOR_DESIGN_OPTIONS_DROPDOWN_BREAKPOINT {
  CARD_PRODUCT = '1168px',
  SLIDESHOW = '1168px',
}

export const CHECKOUT_BREAKPOINT = {
  XS: 375,
  SM: 768,
  MD: 1024,
  LG: 1440,
  XL: 1920,
} as const

export const CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES = {
  [CHECKOUT_BREAKPOINT.XS]: 'iPhone 12 / 13 / 14 (375px)',
  [CHECKOUT_BREAKPOINT.SM]: 'iPad Mini / small tablet (768px)',
  [CHECKOUT_BREAKPOINT.MD]: 'iPad Pro / large tablet (1024px)',
  [CHECKOUT_BREAKPOINT.LG]: 'Laptop / desktop (1440px)',
  [CHECKOUT_BREAKPOINT.XL]: 'Large desktop (1920px)',
} as const
