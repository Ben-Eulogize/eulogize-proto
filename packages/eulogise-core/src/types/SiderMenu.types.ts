export enum ISiderMenuActionTypes {
  COLLAPSE_SIDER_MENU = 'COLLAPSE_SIDER_MENU',
  EXPAND_SIDER_MENU = 'EXPAND_SIDER_MENU',
}

export interface ISiderMenuAction {
  type: ISiderMenuActionTypes
  payload?: any
}

export interface ISiderMenuState {
  isCollapsed: boolean
}
