import { useEffect, useState } from 'react'

type OrientationType =
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary'

export const useOrientation = (): OrientationType => {
  const [orientation, setOrientation] = useState<string | undefined>()
  useEffect(() => {
    if (window) {
      window.addEventListener('orientationchange', (event) => {
        setTimeout(() => {
          setOrientation(window?.screen?.orientation?.type)
        }, 300)
      })
      setOrientation(window?.screen?.orientation?.type)
    }
  }, [])

  return orientation as OrientationType
}
