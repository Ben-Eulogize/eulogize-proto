import { BOOKLET_FONTS, IFont } from '@eulogise/core'

export class FontHelper {
  public static getCardProductFontHref(): string {
    const googleFonts = BOOKLET_FONTS.map((f) => `family=${f.googleFont}`)
    return `https://fonts.googleapis.com/css2?${googleFonts.join('&')}`
  }

  public static async loadCardProductFonts() {
    const link = document.createElement('link')
    link.href = this.getCardProductFontHref()
    link.type = 'text/css'
    link.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  public static createCardProductFontTag(): string {
    const googleFonts = BOOKLET_FONTS.map((f) => `family=${f.googleFont}`)
    const href = `https://fonts.googleapis.com/css2?${googleFonts.join(
      '&',
    )}&display=swap`
    return `<link href=${href} type='text/css' rel='stylesheet'>`
  }

  public static getFontNameById(fontId?: string): string | undefined {
    const googleFonts = BOOKLET_FONTS.find((font: IFont) => font.id === fontId)
    if (!googleFonts) {
      return
    }
    return googleFonts.name
  }
}
