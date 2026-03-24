import { useEffect } from 'react'
import { EulogiseClientConfig } from '@eulogise/client-core'

let interval: any
// HACK:
// this hook is only for development
// on Fast Refresh update, the "style" element has moved above the ant design style
// that reduce the specificity of the Styled Components elements and ruin the page
const useDevelopment = () => {
  if (!EulogiseClientConfig.USE_DEVELOPMENT) {
    return
  }
  useEffect(() => {
    if (interval) {
      return
    }
    interval = setInterval(() => {
      const el = document.querySelector('style[data-styled="active"]')
      if (el === document.querySelector('head').lastChild) {
        return
      }
      try {
        document.querySelector('head').appendChild(el)
      } catch (ex) {
        console.log('Swallow Development Exception', ex)
        clearInterval(interval)
      }
    }, 100)
  }, [])
}

export default useDevelopment
