import { useEffect } from 'react'

export const useDisabledModalScrollbar = () => {
  useEffect(() => {
    // Disable modal scroll on mount
    console.log('useDisabledModalScrollbar disabled')
    document.body.classList.add('disabled-modal-scrollbar')

    // Re-enable modal scroll on unmount
    return () => {
      console.log('useDisabledModalScrollbar enabled')
      document.body.classList.remove('disabled-modal-scrollbar')
    }
  }, [])
}
