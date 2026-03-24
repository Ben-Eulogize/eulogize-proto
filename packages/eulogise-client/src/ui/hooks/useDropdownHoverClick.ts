import { useState, useEffect } from 'react'

const DOUBLE_CLICK_DELAY_MILLISECONDS = 250

interface IUseDropdownHoverClick {
  hovered: boolean
  clicked: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMouseClick: () => void
  onSpreadViewClick: () => void
  onReset: () => void
}

interface IUseDropdownHoverClickprops {
  onSingleClickedAction?: () => void
  onDoubleClickedAction?: () => void
}

export const useDropdownHoverClick = ({
  onSingleClickedAction,
  onDoubleClickedAction,
}: IUseDropdownHoverClickprops): IUseDropdownHoverClick => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)
  const [clickTimes, setClickTimes] = useState<number>(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickTimes === 1) {
        setClicked(!clicked)
        if (onSingleClickedAction) {
          onSingleClickedAction()
        }
      }
      setClickTimes(0)
    }, DOUBLE_CLICK_DELAY_MILLISECONDS)

    if (clickTimes === 2) {
      if (onDoubleClickedAction) {
        onDoubleClickedAction()
      }
    }

    return () => clearTimeout(timer)
  }, [clickTimes])

  const onMouseEnter = () => {
    setHovered(true)
  }

  const onMouseLeave = () => {
    setHovered(false)
  }

  const onMouseClick = () => {
    setClickTimes((prev) => prev + 1)
  }

  const onReset = () => {
    setClicked(false)
    setHovered(false)
  }

  return {
    hovered,
    clicked,
    onMouseEnter,
    onMouseLeave,
    onMouseClick,
    onReset,
  }
}
