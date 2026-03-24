export const StringHelper = {
  safeJsonParse: (jsonString: string): any => {
    try {
      const safeJson = jsonString
        .replace(/&quot;/g, '"') // Quote marks
        .replace(/&amp;/g, '&') // Ampersand
        .replace(/&lt;/g, '<') // Less than
        .replace(/&gt;/g, '>') // Greater than
        .replace(/&#39;/g, "'") // Apostrophe
        .replace(/&apos;/g, "'") // Alternative apostrophe
        .replace(/&nbsp;/g, ' ') // Non-breaking space

      return JSON.parse(safeJson)
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      return null
    }
  },

  convertPixelStringToNumber: (pixelString: string): number => {
    return parseInt(pixelString.replace('px', ''), 10)
  },

  onlyAcceptAsciiCharacters(str: string) {
    // Define a regular expression that matches non-ASCII characters
    const nonAsciiPattern = /[^\x09\x0A\x0D\x20-\x7E]/g

    // Replace non-ASCII characters with an empty string
    return str.replace(nonAsciiPattern, '')
  },

  padStart: (str: string, maxLength: number, padStr: string = '0') => {
    // @ts-ignore
    if (!str || !str?.padStart) {
      return
    }
    // @ts-ignore
    return str.padStart(maxLength, padStr)
  },

  isVowel: (str: string) => {
    if (str) {
      const firstChar = str.toLowerCase().charAt(0)
      return ['a', 'e', 'i', 'o', 'u'].includes(firstChar)
    }
    return false
  },

  isString: (v: any): boolean => {
    return typeof v === 'string'
  },

  parseStringToNumber: (v: any): number => {
    return StringHelper.isString(v) ? parseInt(v as string, 10) : v
  },

  caplitisedFirstLetterOfThemeName: (themeName: string) => {
    return themeName.charAt(0).toUpperCase() + themeName.slice(1)
  },
}
