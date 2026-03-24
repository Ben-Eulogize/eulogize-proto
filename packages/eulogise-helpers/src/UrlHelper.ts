import qs from 'qs'
import { match, compile } from 'path-to-regexp'

const UrlHelper = {
  setQueryParam: (key: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    history.pushState(null, '', url)
  },
  setQueryParams: (params: { [key: string]: string }) => {
    const url = new URL(window.location.href)
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key])
    })
    history.pushState(null, '', url)
  },
  getParams: (pageReg: string, pathnameOrLocation: string | any) => {
    const fn: any = match(pageReg)
    const pathname: string = pathnameOrLocation?.pathname || pathnameOrLocation
    return fn(pathname).params || {}
  },

  getQueryParams: (queryString: string): any => {
    return qs.parse(queryString, { ignoreQueryPrefix: true })
  },

  getQueryParam: (paramName: string, queryString: string): string => {
    return UrlHelper.getQueryParams(queryString)[paramName]
  },

  queryStringify: (query: { [key: string]: string }) => {
    return qs.stringify(query)
  },

  toUrl: (pageReg: string, params: any) => {
    const toPath = compile(pageReg)
    if (!params) {
      return pageReg
    }
    return toPath(params)
  },
}

export { UrlHelper }
