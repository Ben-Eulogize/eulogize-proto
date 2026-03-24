import { useBreakpoint } from './useBreakpoint'
import { DEVICES } from '../EulogiseBreakpoints'

export const useIsMobile = () => {
  const screenSize = useBreakpoint()
  return screenSize === DEVICES.MOBILE
}
