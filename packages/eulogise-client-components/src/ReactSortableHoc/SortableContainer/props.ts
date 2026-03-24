// @ts-nocheck
import invariant from 'invariant'

import { KEYCODE } from '../utils'
import defaultGetHelperDimensions from './defaultGetHelperDimensions'
import defaultShouldCancelStart from './defaultShouldCancelStart'

export const defaultKeyCodes = {
  lift: [KEYCODE.SPACE],
  drop: [KEYCODE.SPACE],
  cancel: [KEYCODE.ESC],
  up: [KEYCODE.UP, KEYCODE.LEFT],
  down: [KEYCODE.DOWN, KEYCODE.RIGHT],
}

export const defaultProps = {
  axis: 'y',
  disableAutoscroll: false,
  distance: 0,
  getHelperDimensions: defaultGetHelperDimensions,
  hideSortableGhost: true,
  lockOffset: '50%',
  lockToContainerEdges: false,
  pressDelay: 0,
  pressThreshold: 5,
  keyCodes: defaultKeyCodes,
  shouldCancelStart: defaultShouldCancelStart,
  transitionDuration: 300,
  useWindowAsScrollContainer: false,
}

export const propTypes = {
  axis: {},
  contentWindow: {},
  disableAutoscroll: {},
  distance: {},
  getContainer: {},
  getHelperDimensions: {},
  helperClass: {},
  helperContainer: {},
  hideSortableGhost: {},
  keyboardSortingTransitionDuration: {},
  lockAxis: {},
  lockOffset: {},
  lockToContainerEdges: {},
  onSortEnd: {},
  onSortMove: {},
  onSortOver: {},
  onSortStart: {},
  pressDelay: {},
  pressThreshold: {},
  keyCodes: {
    lift: {},
    drop: {},
    cancel: {},
    up: {},
    down: {},
  },
  shouldCancelStart: {},
  transitionDuration: {},
  updateBeforeSortStart: {},
  useDragHandle: {},
  useWindowAsScrollContainer: {},
}

export const omittedProps = Object.keys(propTypes)

export function validateProps(props: any) {
  invariant(
    !(props.distance && props.pressDelay),
    'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.',
  )
}
