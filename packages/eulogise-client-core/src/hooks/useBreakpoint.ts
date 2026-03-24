import { useEffect, useState } from 'react'
import { BREAKPOINT, DEVICES } from '../EulogiseBreakpoints'

export const useBreakpoint = (): DEVICES => {
  const [screenSize, setScreenSize] = useState<DEVICES>(DEVICES.DESKTOP)
  const windowResizeHandler = () => {
    // @ts-ignore
    const { clientWidth } = window.document.body
    const desktopValue = parseInt(BREAKPOINT.DESKTOP.replace('px', ''), 10)
    const tabletValue = parseInt(BREAKPOINT.TABLET.replace('px', ''), 10)
    if (clientWidth >= desktopValue) {
      if (screenSize !== DEVICES.DESKTOP) {
        setScreenSize(DEVICES.DESKTOP)
        return
      }
      return
    }
    if (clientWidth >= tabletValue) {
      if (screenSize !== DEVICES.TABLET) {
        setScreenSize(DEVICES.TABLET)
        return
      }
      return
    }
    if (clientWidth > 0) {
      setScreenSize(DEVICES.MOBILE)
      return
    }
  }
  useEffect(() => {
    windowResizeHandler()
    // @ts-ignore
    window.addEventListener('resize', windowResizeHandler)
    return () => {
      // @ts-ignore
      window.removeEventListener('resize', windowResizeHandler)
    }
  })
  return screenSize
}
