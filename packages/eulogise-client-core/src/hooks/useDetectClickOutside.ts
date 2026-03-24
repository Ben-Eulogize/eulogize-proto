// It is copy from react-detect-click-outside. Please refer to https://github.com/zhaluza/react-detect-click-outside
import { useCallback, useEffect, useMemo, useRef } from 'react'

interface Props {
  onTriggered: (e: Event) => void
  disableClick?: boolean
  disableMouseDown?: boolean
  disableTouch?: boolean
  disableKeys?: boolean
  allowAnyKey?: boolean
  triggerKeys?: string[]
}

type EventConfigItem = [boolean | undefined, string, (e: Event) => void]

/**
 * Hook used to detect clicks outside a component (or an escape key press). onTriggered function is triggered on `click`, `touch` or escape `keyup` event.
 *
 */
export function useDetectClickOutside({
  onTriggered,
  disableClick,
  disableMouseDown = true,
  disableTouch,
  disableKeys,
  allowAnyKey,
  triggerKeys,
}: Props) {
  const ref = useRef(null)

  const keyListener = useCallback(
    (e: any) => {
      if (allowAnyKey) {
        onTriggered(e)
      } else if (triggerKeys) {
        if (triggerKeys.includes(e.key)) {
          onTriggered(e)
        }
      } else {
        if (e.key === 'Escape') {
          onTriggered(e)
        }
      }
    },
    [allowAnyKey, triggerKeys, onTriggered],
  )

  const clickOrTouchListener = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (ref && ref.current) {
        if (!(ref.current! as any).contains(e.target)) {
          onTriggered?.(e)
        }
      }
    },
    [ref.current, onTriggered],
  )

  const eventsConfig: EventConfigItem[] = useMemo(
    () => [
      [disableClick, 'click', clickOrTouchListener],
      [disableMouseDown, 'mousedown', clickOrTouchListener],
      [disableTouch, 'touchstart', clickOrTouchListener],
      [disableKeys, 'keyup', keyListener],
    ],
    [
      disableClick,
      disableMouseDown,
      disableTouch,
      disableKeys,
      clickOrTouchListener,
      keyListener,
    ],
  )

  useEffect(() => {
    eventsConfig.map((eventConfigItem) => {
      const [isDisabled, eventName, listener] = eventConfigItem

      if (!isDisabled) {
        // @ts-ignore
        document.addEventListener(eventName, listener)
      }
    })

    return () => {
      eventsConfig.map((eventConfigItem) => {
        const [isDisabled, eventName, listener] = eventConfigItem

        if (!isDisabled) {
          // @ts-ignore
          document.removeEventListener(eventName, listener)
        }
      })
    }
  }, [eventsConfig])

  return ref
}
