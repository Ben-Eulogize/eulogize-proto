import {
  IEulogiseCategory,
  ICardProductBackgroundImageBase,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  BackgroundRestrictions,
} from '../types'

const CARD_PRODUCT_DEFAULT_THEME_DOB = '20 March 1954'
const CARD_PRODUCT_DEFAULT_THEME_DOD = '25 January 2023'
const CARD_PRODUCT_DEFAULT_LOCATION =
  'Eastern Suburbs Memorial Park West Chapel'
const CARD_PRODUCT_DEFAULT_DATE_OF_SERVICE = 'Monday 18 January 2023'
const CARD_PRODUCT_DEFAULT_START_TIME = '5:05 pm'
const CARD_PRODUCT_DEFAULT_DECEASED_NAME = 'Deceased Name'

// AVAILABLE VARIABLES
// dateOfBirth - {{{dateOfBirth}}}
// dateOfDeath - {{{dateOfDeath}}}
// location - {{{location}}}
// dateOfService - {{{dateOfService}}}
// serviceStartTime - {{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}
// primaryImageType - {{{primaryImageType}}}
// primaryImage - <<&primaryImage>>
// deceasedName - {{{deceasedName}}}
// deceasedNameFontType - {{{deceasedNameFontType}}}

export const CARD_PRODUCT_DEFAULT_COMMON_DATA: {
  [key: string]: string
} = {
  dateOfBirth: CARD_PRODUCT_DEFAULT_THEME_DOB,
  dateOfDeath: CARD_PRODUCT_DEFAULT_THEME_DOD,
  location: CARD_PRODUCT_DEFAULT_LOCATION,
  dateOfService: CARD_PRODUCT_DEFAULT_DATE_OF_SERVICE,
  serviceStartTime: CARD_PRODUCT_DEFAULT_START_TIME,
  deceasedName: CARD_PRODUCT_DEFAULT_DECEASED_NAME,
}

export const CARD_PRODUCT_DEFAULT_THEME_DATA = {
  ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
  primaryImage: {
    height: 232,
    width: 232,
  },
  bookmarkPrimaryImage: {
    width: 129,
    height: 129,
  },
  tvWelcomeScreenPrimaryImage: {
    height: 276,
    width: 276,
  },
}

export const CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP: {
  [key: string]: { id: CardProductDynamicDataKey; template: string }
} = {
  deceasedName: {
    id: CardProductDynamicDataKey.deceasedName,
    template: '{{{deceasedName}}}',
  },
  dateOfBirth: {
    id: CardProductDynamicDataKey.dateOfBirth,
    template: '{{{dateOfBirth}}}',
  },
  dateOfDeath: {
    id: CardProductDynamicDataKey.dateOfDeath,
    template: '{{{dateOfDeath}}}',
  },
  dobToDod: {
    id: CardProductDynamicDataKey.dobToDod,
    template: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
  },
  dateOfService: {
    id: CardProductDynamicDataKey.dateOfService,
    template: '{{{dateOfService}}}',
  },
  serviceStartTime: {
    id: CardProductDynamicDataKey.serviceStartTime,
    template: '{{{serviceStartTime}}}',
  },
  serviceDateAtServiceTime: {
    id: CardProductDynamicDataKey.serviceDateAtServiceTime,
    template: '{{{dateOfService}}} at {{serviceStartTime}}',
  },
  location: {
    id: CardProductDynamicDataKey.location,
    template: '{{{location}}}',
  },
  primaryImage: {
    id: CardProductDynamicDataKey.primaryImage,
    template: '<<&primaryImage>>',
  },
}

export const CARD_PRODUCT_DYNAMIC_DATA_FIELDS: {
  [key in CardProductContentItemType]?: Array<{ label: string; value: string }>
} = {
  [CardProductContentItemType.TEXT]: [
    {
      label: 'Deceased Name',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.deceasedName.id,
    },
    {
      label: 'DOB',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.dateOfBirth.id,
    },
    {
      label: 'DOD',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.dateOfDeath.id,
    },
    {
      label: 'DOB - DOD',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.dobToDod.id,
    },
    {
      label: 'Service Address',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.location.id,
    },
    {
      label: 'Service Date at Service Time',
      value:
        CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.serviceDateAtServiceTime
          .id,
    },
    {
      label: 'Service Date',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.dateOfService.id,
    },
    {
      label: 'Service Time',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.serviceStartTime.id,
    },
  ],
  [CardProductContentItemType.IMAGE]: [
    {
      label: 'Primary Image',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.primaryImage.id,
    },
  ],
  [CardProductContentItemType.FRAME]: [
    {
      label: 'Primary Image',
      value: CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP.primaryImage.id,
    },
  ],
}

export const BACKGROUND_IMAGE_CATEGORIES: Array<IEulogiseCategory> = [
  //  { id: 'new', name: 'New' },
  {
    id: 'customer-category',
    name: '', // set by the UI
    backgroundType: BackgroundRestrictions.CUSTOMER_BASE,
  },
  {
    id: 'client-category',
    name: '', // set by the UI
    backgroundType: BackgroundRestrictions.CLIENT_BASE,
  },
  { id: 'popular', name: 'Popular' },
  { id: 'floral', name: 'Floral' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'modern', name: 'Modern' },
  { id: 'scenic', name: 'Scenic' },
  { id: 'activities_hobbies', name: 'Activities & Hobbies' },
  { id: 'textures', name: 'Textures' },
  { id: 'american', name: 'American' },
  { id: 'australian', name: 'Australian' },
  { id: 'skies_sunsets', name: 'Skies & Sunsets' },
  { id: 'religion_culture', name: 'Religion & Culture' },
]

export const EULOGISE_BACKGROUND_IMAGES: Array<ICardProductBackgroundImageBase> =
  [
    { id: 'mountains', name: 'Mountains', categoryIds: ['scenic'] },
    { id: 'uluru', name: 'Uluru', categoryIds: ['australian'] },
    { id: 'field', name: 'Field', categoryIds: ['scenic'] },
    { id: 'clouds', name: 'Clouds', categoryIds: ['skies_sunsets'] },
    { id: 'lavender', name: 'Lavender', categoryIds: ['scenic'] },
    { id: 'light_rays', name: 'Light Rays', categoryIds: ['skies_sunsets'] },
    {
      id: 'sunset_cross',
      name: 'Sunset Cross',
      categoryIds: ['religion_culture'],
    },
    { id: 'fall_Leaves', name: 'Fall Leaves', categoryIds: ['scenic'] },
    { id: 'purple_roses', name: 'Purple Roses', categoryIds: ['floral'] },
    { id: 'rosemary', name: 'Rosemary', categoryIds: ['floral'] },
    { id: 'pier', name: 'Pier', categoryIds: ['scenic'] },
    { id: 'golf', name: 'Golf', categoryIds: ['activities_hobbies'] },
    { id: 'sailing', name: 'Sailing', categoryIds: ['activities_hobbies'] },
    {
      id: 'united_states_flag',
      name: 'United States Flag',
      categoryIds: ['american'],
    },
    {
      id: 'ski_mountain',
      name: 'Ski Mountain',
      categoryIds: ['activities_hobbies'],
    },
    { id: 'snowing', name: 'Snowing', categoryIds: ['scenic'] },
    { id: 'cloudy_sky', name: 'Cloudy Sky', categoryIds: ['skies_sunsets'] },
    { id: 'italian_fields', name: 'Italian Fields', categoryIds: ['scenic'] },
    { id: 'snow_drops', name: 'Snow Drops', categoryIds: ['floral'] },
    { id: 'meadow', name: 'Meadow', categoryIds: ['scenic'] },
    { id: 'beach', name: 'Beach', categoryIds: ['popular'] },
    { id: 'floral', name: 'Floral', categoryIds: ['floral'] },
    { id: 'linen', name: 'Linen', categoryIds: ['popular', 'textures'] },
    { id: 'paper', name: 'Paper', categoryIds: ['popular', 'textures'] },
    { id: 'calm_beach', name: 'Calm Beach', categoryIds: ['scenic'] },
    { id: 'blue_gum', name: 'Blue Gum', categoryIds: ['australian'] },
    {
      id: 'cloudy_mountain',
      name: 'Cloudy Mountain',
      categoryIds: ['skies_sunsets'],
    },
    { id: 'floral_painting', name: 'Floral Painting', categoryIds: ['floral'] },
    { id: 'botanical', name: 'Botanical', categoryIds: ['floral'] },
    { id: 'pastel_beige', name: 'Pastel Beige', categoryIds: ['textures'] },
    { id: 'pastel_green', name: 'Pastel Green', categoryIds: ['textures'] },
    { id: 'pastel_pink', name: 'Pastel Pink', categoryIds: ['textures'] },
    { id: 'pastel_purple', name: 'Pastel Purple', categoryIds: ['textures'] },
    { id: 'pastel_blue', name: 'Pastel Blue', categoryIds: ['textures'] },
    { id: 'gold_roses', name: 'Gold Roses', categoryIds: ['floral'] },
    {
      id: 'blue_pastel_flowers',
      name: 'Blue Pastel Flowers',
      categoryIds: ['floral'],
    },
    { id: 'fall_flowers', name: 'Fall Flowers', categoryIds: ['floral'] },
    { id: 'flower_memorial', name: 'Flower Memorial', categoryIds: ['floral'] },
    {
      id: 'sailing_watercolor',
      name: 'Sailing Watercolor',
      categoryIds: ['activities_hobbies'],
    },
    {
      id: 'blue_stripe',
      name: 'Blue Stripe',
      categoryIds: ['popular'],
    },
    {
      id: 'ocean_shore',
      name: 'Ocean Shore',
      categoryIds: ['activities_hobbies'],
    },
    {
      id: 'stars_and_stripes',
      name: 'Stars And Stripes',
      categoryIds: ['american'],
    },
    {
      id: 'statues_of_liberty',
      name: 'Statue Of Liberty',
      categoryIds: ['american'],
    },
    { id: 'usa_paper', name: 'USA Paper', categoryIds: ['american'] },
    {
      id: 'australian_watercolour',
      name: 'Australian Watercolour',
      categoryIds: ['australian'],
    },
    {
      id: 'mountain_watercolor',
      name: 'Mountain Watercolor',
      categoryIds: ['scenic'],
    },
    {
      id: 'hill_cross',
      name: 'Hill Cross',
      categoryIds: ['religion_culture'],
    },
    { id: 'paper 2', name: 'Paper 2', categoryIds: ['textures'] },
  ]
