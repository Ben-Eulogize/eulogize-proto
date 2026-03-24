import {
  BackgroundRestrictions,
  ICardProductBackgroundImageBase,
} from '@eulogise/core'

export const MOCK_BACKGROUND_IMAGE_DATA_1: Partial<ICardProductBackgroundImageBase> =
  {
    name: 'Mock Global Background Image 1',
    categoryIds: ['mock-category-1'],
  }

export const MOCK_BACKGROUND_IMAGE_CLIENT_PUBLIC_DATA_1: Partial<ICardProductBackgroundImageBase> =
  {
    name: 'Mock Client Background Image 2',
    categoryIds: ['mock-category-2'],
    clientId: 'mock-client-id-1',
    restrictions: BackgroundRestrictions.CLIENT_BASE,
  }

export const MOCK_BACKGROUND_IMAGE_CLIENT_CUSTOMER_SPECIFIC_DATA_1: Partial<ICardProductBackgroundImageBase> =
  {
    name: 'Mock Client Background Image 3',
    categoryIds: ['mock-category-2'],
    customerId: 'mock-client-customer-id-1',
    clientId: 'mock-client-id-1',
    restrictions: BackgroundRestrictions.CUSTOMER_BASE,
  }

export const MOCK_BACKGROUND_IMAGE_CUSTOMER_DATA_1: Partial<ICardProductBackgroundImageBase> =
  {
    name: 'Mock Customer Background Image 4',
    categoryIds: ['mock-category-3'],
    customerId: 'mock-customer-id-1',
  }
