import { useEffect } from 'react'

export const useResize = (
  handleResize: () => void,
  dependencies: any[] = [],
) => {
  let resizeTimeout: number
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('resize', () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }

      resizeTimeout = setTimeout(() => {
        console.log('Resize finished')
        handleResize()
      }, 200)
    })

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, dependencies)
}
