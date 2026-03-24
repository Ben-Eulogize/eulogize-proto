import 'antd/dist/antd.css'
import './scss-loader.scss'
import '../src/styles/global.css'

import { CHECKOUT_BREAKPOINT } from '@eulogise/client-core'

const CHECKOUT_VIEWPORTS = {
  XS: {
    name: `${CHECKOUT_BREAKPOINT.XS}px`,
    styles: {
      width: `${CHECKOUT_BREAKPOINT.XS}px`,
      height: '812px',
    },
  },
  SM: {
    name: `${CHECKOUT_BREAKPOINT.SM}px`,
    styles: {
      width: `${CHECKOUT_BREAKPOINT.SM}px`,
      height: '1024px',
    },
  },
  MD: {
    name: `${CHECKOUT_BREAKPOINT.MD}px`,
    styles: {
      width: `${CHECKOUT_BREAKPOINT.MD}px`,
      height: '1366px',
    },
  },
  LG: {
    name: `${CHECKOUT_BREAKPOINT.LG}px`,
    styles: {
      width: `${CHECKOUT_BREAKPOINT.LG}px`,
      height: '900px',
    },
  },
  XL: {
    name: `${CHECKOUT_BREAKPOINT.XL}px`,
    styles: {
      width: `${CHECKOUT_BREAKPOINT.XL}px`,
      height: '1080px',
    },
  },
} as const

export const parameters = {
  actions: {},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    options: CHECKOUT_VIEWPORTS,
  },
}
export const tags = ['autodocs']
