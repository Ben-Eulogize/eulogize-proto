import {
  CardProductBorderThicknessType,
  CardProductBorderType,
  ICardProductBorderStyle,
  ICardProductSingleBorder,
} from '../types'

export const CARD_PRODUCT_THICKNESS: {
  [key in CardProductBorderThicknessType]: number
} = {
  [CardProductBorderThicknessType.THIN]: 1,
  [CardProductBorderThicknessType.MEDIUM]: 2,
  [CardProductBorderThicknessType.THICK]: 3,
}

type CardProductBorderStyle = Omit<
  ICardProductSingleBorder,
  'color' & 'thickness'
>

const getBlankMidBottom = (
  type: ICardProductBorderStyle,
): Array<CardProductBorderStyle> => {
  const height = 'calc({{{height}}} - 15%)'
  return [
    {
      thicknessTemplate: '{{{thickness}}} {{{thickness}}} 0 {{{thickness}}}',
      borderStyle: type,
      size: {
        height,
        width: '{{{width}}}}',
      },
    },
    {
      thicknessTemplate: '0 0 {{{thickness}}}',
      borderStyle: type,
      size: {
        height,
        width: '15%',
      },
      alignTo: 'left',
      padding: '0 0 0 calc((100% - {{{width}}}) / 2)',
    },
    {
      thicknessTemplate: '0 0 {{{thickness}}}',
      borderStyle: type,
      size: {
        height,
        width: '15%',
      },
      alignTo: 'right',
      padding: '0 calc((100% - {{{width}}}) / 2) 0 0',
    },
  ]
}

export const getCardProductBorderStyle = ({
  borderType,
  editorScaledFactor,
}: {
  borderType: CardProductBorderType
  editorScaledFactor: number
}): Array<ICardProductSingleBorder> => {
  const CARD_PRODUCT_BORDER_STYLE: {
    [key in CardProductBorderType]: Array<CardProductBorderStyle>
  } = {
    [CardProductBorderType.SINGLE_SOLID]: [
      {
        borderStyle: 'solid',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
      },
    ],
    [CardProductBorderType.SINGLE_DASHED]: [
      {
        borderStyle: 'dashed',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
      },
    ],
    [CardProductBorderType.SINGLE_DOTTED]: [
      {
        borderStyle: 'dotted',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
      },
    ],
    [CardProductBorderType.DOUBLE_SOLID]: [
      {
        borderStyle: 'solid',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
      },
      {
        borderStyle: 'solid',
        size: {
          width: `calc({{{width}}} - calc(0.5rem * ${editorScaledFactor}))`,
          height: `calc({{{height}}} - calc(0.5rem * ${editorScaledFactor}))`,
        },
      },
    ],
    [CardProductBorderType.DOUBLE_DASHED]: [
      {
        borderStyle: 'dashed',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
      },
      {
        borderStyle: 'dashed',
        size: {
          width: `calc({{{width}}} - calc(0.5rem * ${editorScaledFactor}))`,
          height: `calc({{{height}}} - calc(0.5rem * ${editorScaledFactor}));`,
        },
      },
    ],
    [CardProductBorderType.DOUBLE_DOTTED]: [
      {
        borderStyle: 'dotted',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
      },
      {
        borderStyle: 'dotted',
        size: {
          width: `calc({{{width}}} - calc(0.5rem * ${editorScaledFactor}))`,
          height: `calc({{{height}}} - calc(0.5rem * ${editorScaledFactor}));`,
        },
      },
    ],
    [CardProductBorderType.TOP_AND_BOTTOM_SOLID]: [
      {
        borderStyle: 'solid',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
        thicknessTemplate: '{{{thickness}}} 0',
      },
    ],
    [CardProductBorderType.TOP_AND_BOTTOM_DASHED]: [
      {
        borderStyle: 'dashed',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
        thicknessTemplate: '{{{thickness}}} 0',
      },
    ],
    [CardProductBorderType.TOP_AND_BOTTOM_DOTTED]: [
      {
        borderStyle: 'dotted',
        size: { width: '{{{width}}}', height: '{{{height}}}' },
        thicknessTemplate: '{{{thickness}}} 0',
      },
    ],
    [CardProductBorderType.BLANK_MID_BOTTOM_SOLID]: getBlankMidBottom('solid'),
    [CardProductBorderType.BLANK_MID_BOTTOM_DASHED]:
      getBlankMidBottom('dashed'),
    [CardProductBorderType.BLANK_MID_BOTTOM_DOTTED]:
      getBlankMidBottom('dotted'),
    [CardProductBorderType.NONE]: [],

    // Graphic borders
    [CardProductBorderType.SOSSAMON]: [
      {
        isGraphic: true,
      },
    ],
  }
  return CARD_PRODUCT_BORDER_STYLE[borderType]
}
