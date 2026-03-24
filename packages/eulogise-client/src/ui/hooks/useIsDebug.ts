import { useState, useEffect } from 'react'
import { UrlHelper } from '@eulogise/helpers'

export const useIsDebug = () => {
  const [isDebug, setIsDebug] = useState<boolean>(false)
  useEffect(() => {
    setIsDebug(
      UrlHelper.getQueryParam(
        'isDebug',
        // @ts-ignore
        location.search,
      ) === 'true',
    )
  }, [])

  return isDebug
}
