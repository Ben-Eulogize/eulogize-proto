export interface IMobileMenuState {
  isOpen?: boolean
}

export enum MobileMenuActionTypes {
  CLOSE_MENU = 'CLOSE_MENU',
  OPEN_MENU = 'OPEN_MENU',
  TOGGLE_MENU = 'TOGGLE_MENU',
}

export interface IMobileMenuAction {
  type: MobileMenuActionTypes
}
