import {
  ThemeActionTypes,
  ITheme,
  ICardProductData,
  EulogiseProduct,
} from '@eulogise/core'

export type FetchThemesPayload = {
  isShareFlow?: boolean
  caseId?: string
  onSuccess?: (themes: Array<ITheme>) => void
}
export type FetchThemesAction = {
  type: ThemeActionTypes.FETCH_THEMES
  payload?: FetchThemesPayload
}

export const fetchThemesAction = (
  payload?: FetchThemesPayload,
): FetchThemesAction => {
  return {
    type: ThemeActionTypes.FETCH_THEMES,
    payload,
  }
}

type FetchThemeByIdPayload = { themeId: string }
export type FetchThemeByIdAction = {
  type: ThemeActionTypes.FETCH_THEME
  payload: FetchThemeByIdPayload
}
export const fetchSingleThemeById = (
  payload: FetchThemeByIdPayload,
): FetchThemeByIdAction => ({
  type: ThemeActionTypes.FETCH_THEME,
  payload,
})

type CreateNewThemePayload = {
  theme: ITheme
  cardProduct: ICardProductData
  product: EulogiseProduct
  onCreated: () => void
}
export type CreateNewThemeAction = {
  type: ThemeActionTypes.CREATE_THEME
  payload: CreateNewThemePayload
}
export const createNewTheme = (
  payload: CreateNewThemePayload,
): CreateNewThemeAction => ({
  type: ThemeActionTypes.CREATE_THEME,
  payload,
})

type UpdateExistingThemePayload = {
  themeId: string
  theme: ITheme
  cardProduct: ICardProductData
  overwriteThumbnail: boolean
  product: EulogiseProduct
  onUpdated: () => void
}
export type UpdateExistingThemeAction = {
  type: ThemeActionTypes.UPDATE_THEME
  payload: UpdateExistingThemePayload
}
export const updateExistingTheme = (
  payload: UpdateExistingThemePayload,
): UpdateExistingThemeAction => ({
  type: ThemeActionTypes.UPDATE_THEME,
  payload,
})

type UpsertThemePayload = {
  theme: ITheme
  product: EulogiseProduct
  cardProduct: ICardProductData
  overwriteThumbnail: boolean
  onCompleted: () => void
}
export type UpsertThemeAction = {
  type: ThemeActionTypes.UPSERT_THEME
  payload: UpsertThemePayload
}
export const upsertTheme = (
  payload: UpsertThemePayload,
): UpsertThemeAction => ({
  type: ThemeActionTypes.UPSERT_THEME,
  payload,
})

type DeleteThemeByIdPayload = {
  themeId: string
  onDeleted?: () => void
  onComplete?: () => void
}

export type DeleteThemeByIdAction = {
  type: ThemeActionTypes.DELETE_THEME_BY_ID
  payload: DeleteThemeByIdPayload
}

export const deleteThemeByIdAction = (
  payload: DeleteThemeByIdPayload,
): DeleteThemeByIdAction => ({
  type: ThemeActionTypes.DELETE_THEME_BY_ID,
  payload,
})
