import { GenIcon } from 'react-icons/lib'

export const TbPhotoPlus = function TbPhotoPlus(props: any) {
  return GenIcon({
    tag: 'svg',
    attr: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    child: [
      { tag: 'path', attr: { d: 'M15 8h.01' }, child: [] },
      {
        tag: 'path',
        attr: {
          d: 'M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5',
        },
        child: [],
      },
      {
        tag: 'path',
        attr: { d: 'M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4' },
        child: [],
      },
      {
        tag: 'path',
        attr: { d: 'M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54' },
        child: [],
      },
      { tag: 'path', attr: { d: 'M16 19h6' }, child: [] },
      { tag: 'path', attr: { d: 'M19 16v6' }, child: [] },
    ],
  })(props)
}

export const TbBorderStyle = function TbBorderStyle(props: any) {
  return GenIcon({
    tag: 'svg',
    attr: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    child: [
      { tag: 'path', attr: { d: 'M4 20v-14a2 2 0 0 1 2 -2h14' }, child: [] },
      { tag: 'path', attr: { d: 'M20 8v.01' }, child: [] },
      { tag: 'path', attr: { d: 'M20 12v.01' }, child: [] },
      { tag: 'path', attr: { d: 'M20 16v.01' }, child: [] },
      { tag: 'path', attr: { d: 'M8 20v.01' }, child: [] },
      { tag: 'path', attr: { d: 'M12 20v.01' }, child: [] },
      { tag: 'path', attr: { d: 'M16 20v.01' }, child: [] },
      { tag: 'path', attr: { d: 'M20 20v.01' }, child: [] },
    ],
  })(props)
}

export const TbTextPlus = function TbTextPlus(props: any) {
  return GenIcon({
    tag: 'svg',
    attr: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    child: [
      { tag: 'path', attr: { d: 'M19 10h-14' }, child: [] },
      { tag: 'path', attr: { d: 'M5 6h14' }, child: [] },
      { tag: 'path', attr: { d: 'M14 14h-9' }, child: [] },
      { tag: 'path', attr: { d: 'M5 18h6' }, child: [] },
      { tag: 'path', attr: { d: 'M18 15v6' }, child: [] },
      { tag: 'path', attr: { d: 'M15 18h6' }, child: [] },
    ],
  })(props)
}
