import { useEffect, useState } from 'react'

type WindowSize = {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize | undefined => {
  const [windowSize, setWindowSize] = useState<WindowSize>()
  const windowResizeHandler = () => {
    const { innerWidth, innerHeight } = window
    setWindowSize({ width: innerWidth, height: innerHeight })
  }
  useEffect(() => {
    windowResizeHandler()
    // @ts-ignore
    window.addEventListener('resize', windowResizeHandler)
    return () => {
      // @ts-ignore
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [])
  return windowSize
}
