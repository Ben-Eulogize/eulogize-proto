import { DEVICES } from '../EulogiseBreakpoints'
import { useBreakpoint } from './useBreakpoint'

export const useModalWidth = (fixedWidth: number = 600): number | undefined => {
  const screenSize: DEVICES = useBreakpoint()
  if (screenSize === DEVICES.TABLET || screenSize === DEVICES.DESKTOP) {
    return fixedWidth
  }
  return
}
