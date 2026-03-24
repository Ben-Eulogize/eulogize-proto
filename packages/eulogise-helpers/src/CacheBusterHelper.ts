export class CacheBusterHelper {
  public static cacheBuster: string
  public static getCacheBuster(): string {
    // console.log('getCacheBuster', this.cacheBuster)
    if (!this.cacheBuster) {
      this.cacheBuster = `${new Date().getTime()}`
      return this.cacheBuster
    }
    return this.cacheBuster
  }

  public static refreshCacheBuster(): void {
    console.log(
      'CacheBusterHelper > refreshCacheBuster - old',
      this.cacheBuster,
    )
    this.cacheBuster = `${new Date().getTime()}`
    console.log(
      'CacheBusterHelper > refreshCacheBuster - new',
      this.cacheBuster,
    )
  }

  public static addCacheBusterToString(url: string) {
    // Check if the URL already has query parameters
    const separator = url.includes('?') ? '&' : '?'

    // if cacheBuster query existing, replace it
    if (url.includes('cacheBuster')) {
      return url.replace(
        /cacheBuster=\d+/,
        `cacheBuster=${CacheBusterHelper.getCacheBuster()}`,
      )
    }
    // Append the cacheBuster query parameter
    return `${url}${separator}cacheBuster=${CacheBusterHelper.getCacheBuster()}`
  }
}
