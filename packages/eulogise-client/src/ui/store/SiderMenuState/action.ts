import { ISiderMenuActionTypes } from '@eulogise/core'

export const collapseSiderMenu = () => ({
  type: ISiderMenuActionTypes.COLLAPSE_SIDER_MENU,
})

export const expandSiderMenu = () => ({
  type: ISiderMenuActionTypes.EXPAND_SIDER_MENU,
})
