import { BOOKLET_EDITOR_COLORS } from './Resource.types'

export const TEXT_EDITOR_COLOR_STYLE_MAP = BOOKLET_EDITOR_COLORS.reduce(
  (styleMap: any, { value, color }: { value: string; color: string }) => {
    styleMap[value] = { color }
    return styleMap
  },
  {},
)
