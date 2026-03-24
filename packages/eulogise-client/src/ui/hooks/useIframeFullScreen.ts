import { useEffect, useState } from 'react'

export const useIframeFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement?.tagName) {
        console.log('Iframe is fullscreen')
        setIsFullScreen(true)
      } else {
        console.log('Iframe is not fullscreen')
        setIsFullScreen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])
  return isFullScreen
}
