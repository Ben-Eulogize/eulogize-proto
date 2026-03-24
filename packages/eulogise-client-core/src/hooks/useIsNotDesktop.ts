import { useBreakpoint } from './useBreakpoint'
import { DEVICES } from '../EulogiseBreakpoints'

export const useIsNotDesktop = () => {
  const screenSize = useBreakpoint()
  return screenSize !== DEVICES.DESKTOP
}
