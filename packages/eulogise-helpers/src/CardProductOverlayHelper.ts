const DEFAULT_OVERLAY_POSITION_FIELD_VALUE: [number, number] = [0, 100]

export class CardProductOverlayHelper {
  public static getOverlayFadeBackground = ({
    color,
    overlayFadePosition,
    overlayEndPosition,
  }: {
    color: string
    overlayFadePosition: {
      top: number
      bottom: number
    }
    overlayEndPosition: {
      top: number
      bottom: number
    }
  }): string => {
    const { top: fadeTop, bottom: fadeBottom } = overlayFadePosition
    const { top: endTop, bottom: endBottom } = overlayEndPosition
    const top = fadeTop - endTop
    const bottom = endBottom - fadeBottom

    const height = endBottom - endTop
    const heightPercent = 100 / height
    const topHeightPercent = top * heightPercent
    const bottomHeightPercent = bottom * heightPercent

    return `linear-gradient(to bottom, ${
      topHeightPercent > 0 ? `transparent 0%,` : ''
    } ${color} ${topHeightPercent}%, ${color} ${100 - bottomHeightPercent}% ${
      bottomHeightPercent ? `, transparent 100%` : ''
    })`
  }

  public static transformOverlayPositionToFieldValues = (value: {
    top: number
    bottom: number
  }): [number, number] => {
    if (value) {
      return [value.top, value.bottom]
    }
    return DEFAULT_OVERLAY_POSITION_FIELD_VALUE
  }

  public static transformFieldValuesToOverlayPosition(
    fieldValues: [number, number], // [bottom, top]
  ): { top: number; bottom: number } {
    return {
      top: fieldValues[0],
      bottom: fieldValues[1],
    }
  }
}
