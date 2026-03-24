import { MobileMenuActionTypes } from '@eulogise/core'

export const openMenuAction = () => ({
  type: MobileMenuActionTypes.OPEN_MENU,
})

export const closeMenuAction = () => ({
  type: MobileMenuActionTypes.CLOSE_MENU,
})

export const toggleMenuAction = () => ({
  type: MobileMenuActionTypes.TOGGLE_MENU,
})
