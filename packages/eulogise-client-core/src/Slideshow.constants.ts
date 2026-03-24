import { ITitleSlideTransition, SlideTransition } from '@eulogise/core'
import { COLOR } from './EulogiseStyles'

export const SLIDESHOW_COLORS = [
  {
    label: 'Gray',
    value: 'gray',
    rgb: '#D1DACC',
    color: '#D1DACC',
  },
  {
    label: 'Teal',
    value: 'teal',
    rgb: '#01A69E',
    color: '#01A69E',
  },
  {
    label: 'Hawkes Blue',
    value: 'hawkes-blue',
    rgb: '#D9EEFD',
    color: '#D9EEFD',
  },
  {
    label: 'Bondi Blue',
    value: 'bondi-blue',
    rgb: '#008FC1',
    color: '#008FC1',
  },
  {
    label: 'Regal Blue',
    value: 'regal-blue',
    rgb: COLOR.REGAL_BLUE,
    color: COLOR.REGAL_BLUE,
  },
  {
    label: 'Tan',
    value: 'tan',
    rgb: '#BF713E',
    color: '#BF713E',
  },
  {
    label: 'Sea Pink',
    value: 'sea-pink',
    rgb: '#EB9F97',
    color: '#EB9F97',
  },
  {
    label: 'Lavender',
    value: 'lavender',
    rgb: '#C49AC7',
    color: '#C49AC7',
  },
  {
    label: 'Logan',
    value: 'logan',
    rgb: '#AC9FC4',
    color: '#AC9FC4',
  },
  {
    label: 'Magenta',
    value: 'magenta',
    rgb: COLOR.MAGENTA,
    color: COLOR.MAGENTA,
  },
  { label: 'Black', value: 'black', rgb: 'rgb(0,0,0)', color: 'rgb(0,0,0)' },
  {
    label: 'White',
    value: 'white',
    rgb: 'rgb(255,255,255)',
    color: 'rgb(255,255,255)',
  },
  {
    label: 'Dark Grey',
    value: 'dark-grey',
    rgb: 'rgb(79,83,89)',
    color: 'rgb(79,83,89)',
  },
  {
    label: 'Light Grey',
    value: 'light-grey',
    rgb: '#BCC6CC',
    color: '#BCC6CC',
  },
  {
    label: 'Gold',
    value: 'gold',
    rgb: '#D4B037',
    color: '#D4B037',
  },
  {
    label: 'Mint Green',
    value: 'mint-green',
    rgb: '#daffe7',
    color: '#daffe7',
  },
  {
    label: 'Pastel Yellow',
    value: 'pastel-yellow',
    rgb: '#FDFD96',
    color: '#FDFD96',
  },
  {
    label: 'Pastel Blue',
    value: 'pastel-blue',
    rgb: '#EDE0F0',
    color: '#EDE0F0',
  },
  {
    label: 'Pastel Pink',
    value: 'pastel-pink',
    rgb: '#ffdef5',
    color: '#ffdef5',
  },
]

export const DEFAULT_TITLE_SLIDE_TRANSITION: ITitleSlideTransition = {
  in: { type: 'fadeIn' },
  out: { type: 'fadeOut' },
}

export const STATUS_INCOMPLETE = 'incomplete'
export const STATUS_COMPLETE = 'complete'

export const DEFAULT_END_TITLE_SLIDE_NUMBER = 1

export const MIN_SINGLE_SLIDE_DURATION_IN_MS = 3000 // 3 seconds

const swapKeyValue = (json: any) => {
  let ret: any = {}
  for (let key in json) {
    ret[json[key]] = key
  }
  return ret
}

export const SWAPPED_SLIDE_ANIMATION = swapKeyValue(SlideTransition)

export const THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT = 32
