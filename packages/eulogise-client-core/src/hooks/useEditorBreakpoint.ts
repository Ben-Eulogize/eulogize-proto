import { useEffect, useState } from 'react'
import { EDITOR_DESIGN_OPTIONS_DROPDOWN_BREAKPOINT } from '../EulogiseBreakpoints'

interface IUseEditorBreakpoint {
  shouldShowCardEditorDropdown: boolean
  shouldShowSlideshowDropdown: boolean
}

export const useEditorBreakpoint = (): IUseEditorBreakpoint => {
  const [shouldShowCardEditorDropdown, setShouldShowCardEditorDropdown] =
    useState<boolean>(false)
  const [shouldShowSlideshowDropdown, setShouldShowSlideshowEditorDropdown] =
    useState<boolean>(false)
  const windowResizeHandler = () => {
    // @ts-ignore
    const { clientWidth } = window.document.body
    const shouldShowCardEditorDropdownValue = parseInt(
      EDITOR_DESIGN_OPTIONS_DROPDOWN_BREAKPOINT.CARD_PRODUCT.replace('px', ''),
      10,
    )
    const shouldShowSlideshowDropdownValue = parseInt(
      EDITOR_DESIGN_OPTIONS_DROPDOWN_BREAKPOINT.SLIDESHOW.replace('px', ''),
      10,
    )

    if (clientWidth >= shouldShowCardEditorDropdownValue) {
      setShouldShowCardEditorDropdown(false)
    }

    if (clientWidth < shouldShowCardEditorDropdownValue) {
      setShouldShowCardEditorDropdown(true)
    }

    if (clientWidth >= shouldShowSlideshowDropdownValue) {
      setShouldShowSlideshowEditorDropdown(false)
    }

    if (clientWidth < shouldShowSlideshowDropdownValue) {
      setShouldShowSlideshowEditorDropdown(true)
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

  return { shouldShowCardEditorDropdown, shouldShowSlideshowDropdown }
}
