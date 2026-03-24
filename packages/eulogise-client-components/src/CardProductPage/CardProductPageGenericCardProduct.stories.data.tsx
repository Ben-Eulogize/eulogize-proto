import {
  BOOKLET_THEMES,
  EulogiseProduct,
  GenericCardProductTypeFoldType,
  GenericCardProductTypeOutputFormat,
  ICardProductData,
  IGenericCardProductTypeData,
  IGenericCardProductTypeDimension,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

export const MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS: Array<IGenericCardProductTypeDimension> =
  [
    {
      name: 'Booklet',
      width: 400,
      height: 600,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Large Booklet (8.5x11)',
      width: 215.9,
      height: 279.4,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Large Trifold (5.75x11)',
      width: 146.05,
      height: 279.4,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Service Card (5.5x8.5)',
      width: 139.7,
      height: 215.9,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Prayer Card (4x7)',
      width: 101.6,
      height: 177.8,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Thank You Card (3.25x5)',
      width: 82.55,
      height: 127,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Hard Cover Registry Book (8.5x11)',
      width: 215.9,
      height: 279.4,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Memorial Throw: Single Panel (51.5x37)',
      width: 1000,
      height: 939.8,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Memorial Throw: 9-Panel (16x9)',
      width: 406.4,
      height: 228.6,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Portrait Glass Plaque (7x10)',
      width: 177.8,
      height: 254,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Memorial Candles (8.5x6)',
      width: 215.9,
      height: 152.4,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Social Media Announcement (7x5)',
      width: 177.8,
      height: 127,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Stick Fan: Traditional Shape (7.5x7.5)',
      width: 190.5,
      height: 190.5,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Memorial Cross (4.25x6)',
      width: 107.95,
      height: 152.4,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Memorial Blanket (50x60)',
      width: 1270,
      height: 1524,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
    {
      name: 'Oversized Memorial Throw (54x60)',
      width: 1371.6,
      height: 1524,
      overlayMarginX: 10,
      overlayMarginY: 10,
      pageMarginsX: 3,
      pageMarginsY: 3,
    },
  ]

export const MOCK_GENERIC_CARD_PRODUCT_TYPE_SINGLE_SIDED_1: IGenericCardProductTypeData =
  {
    defaultPages: 1,
    isLegacy: false,
    slug: 'mvp-sizes',
    createdAt: '2026-02-12T02:21:14.794Z',
    createdBy: 'a4b16ffc-68ae-44cd-872b-1bda2539792f',
    name: 'MVP Sizes',
    minPages: 1,
    outputFormat: GenericCardProductTypeOutputFormat.PDF,
    updatedAt: '2026-02-12T04:23:52.422Z',
    dimensions: MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS,
    foldType: GenericCardProductTypeFoldType.SINGLE_SIDE,
    maxPages: 4,
    id: 'single-side-product',
  }

export const MOCK_GENERIC_CARD_PRODUCT_TYPE_DOUBLE_SIDED_1: IGenericCardProductTypeData =
  {
    defaultPages: 1,
    isLegacy: false,
    slug: 'mvp-sizes',
    createdAt: '2026-02-12T02:21:14.794Z',
    createdBy: 'a4b16ffc-68ae-44cd-872b-1bda2539792f',
    name: 'MVP Sizes',
    minPages: 1,
    outputFormat: GenericCardProductTypeOutputFormat.PDF,
    updatedAt: '2026-02-12T04:23:52.422Z',
    dimensions: MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS,
    foldType: GenericCardProductTypeFoldType.DOUBLE_SIDED,
    maxPages: 4,
    id: 'double-sided-product',
  }

export const MOCK_GENERIC_CARD_PRODUCT_TYPE_BIFOLD_1: IGenericCardProductTypeData =
  {
    defaultPages: 1,
    isLegacy: false,
    slug: 'bifold-sizes',
    createdAt: '2026-02-12T02:21:14.794Z',
    createdBy: 'a4b16ffc-68ae-44cd-872b-1bda2539792f',
    name: 'BiFold Sizes',
    minPages: 1,
    outputFormat: GenericCardProductTypeOutputFormat.PDF,
    updatedAt: '2026-02-12T04:23:52.422Z',
    dimensions: MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS,
    foldType: GenericCardProductTypeFoldType.BIFOLD,
    maxPages: 4,
    id: 'bifold-product',
  }

export const MOCK_GENERIC_CARD_PRODUCT_TYPE_TRIFOLD_1: IGenericCardProductTypeData =
  {
    defaultPages: 1,
    isLegacy: false,
    slug: 'bifold-sizes',
    createdAt: '2026-02-12T02:21:14.794Z',
    createdBy: 'a4b16ffc-68ae-44cd-872b-1bda2539792f',
    name: 'BiFold Sizes',
    minPages: 1,
    outputFormat: GenericCardProductTypeOutputFormat.PDF,
    updatedAt: '2026-02-12T04:23:52.422Z',
    dimensions: MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS,
    foldType: GenericCardProductTypeFoldType.BIFOLD,
    maxPages: 6,
    id: 'trifold-product',
  }

const getTheme = ({
  themeId,
  genericProductType,
}: {
  themeId: string
  genericProductType: IGenericCardProductTypeData
}) =>
  CardProductHelper.createDynamicTheme({
    themeId,
    product: EulogiseProduct.GENERIC_CARD_PRODUCT,
    genericProductType,
    productTheme: BOOKLET_THEMES.find((t) => t.id === themeId)!,
  })

const createDummyGenericCardProductData = ({
  themeId,
  backgroundPaths,
  genericProductType,
}: {
  themeId: string
  backgroundPaths?: Array<string>
  genericProductType: IGenericCardProductTypeData
}): ICardProductData => {
  const productTheme = getTheme({ themeId, genericProductType })
  return CardProductHelper.createDummyGenericCardProductData({
    productTheme,
    backgroundPaths,
    genericProductType,
  })
}

export const mockGenericCardProductSingleSidedTheme = ({
  themeId = 'aura',
  genericProductType = MOCK_GENERIC_CARD_PRODUCT_TYPE_SINGLE_SIDED_1,
}: {
  themeId: string
  genericProductType?: IGenericCardProductTypeData
}): ICardProductData =>
  createDummyGenericCardProductData({
    themeId,
    genericProductType,
  })

export const mockGenericCardProductDoubleSidedTheme = ({
  themeId = 'aura',
  genericProductType = MOCK_GENERIC_CARD_PRODUCT_TYPE_DOUBLE_SIDED_1,
}: {
  themeId: string
  genericProductType?: IGenericCardProductTypeData
}): ICardProductData =>
  createDummyGenericCardProductData({
    themeId,
    genericProductType,
  })

export const mockGenericCardProductBiFoldTheme = ({
  themeId = 'aura',
  genericProductType = MOCK_GENERIC_CARD_PRODUCT_TYPE_BIFOLD_1,
}: {
  themeId: string
  genericProductType?: IGenericCardProductTypeData
}): ICardProductData =>
  createDummyGenericCardProductData({
    themeId,
    genericProductType,
  })

export const mockGenericCardProductTriFoldTheme = ({
  themeId = 'aura',
  genericProductType = MOCK_GENERIC_CARD_PRODUCT_TYPE_TRIFOLD_1,
}: {
  themeId: string
  genericProductType?: IGenericCardProductTypeData
}): ICardProductData =>
  createDummyGenericCardProductData({
    themeId,
    genericProductType,
  })
