import React, { useState, useMemo } from 'react'

import 'draft-js/dist/Draft.css'
import { CardProductPage } from './CardProductPage'
import {
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductTypeDimension,
  IGenericCardProductContent,
} from '@eulogise/core'
import { CardProductPageStory } from './CardProductPage.stories.component'
import { BOOKLET_THEMES } from '@eulogise/core'
import {
  MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS,
  mockGenericCardProductBiFoldTheme,
  mockGenericCardProductDoubleSidedTheme,
  mockGenericCardProductSingleSidedTheme,
  mockGenericCardProductTriFoldTheme,
} from './CardProductPageGenericCardProduct.stories.data'
import { Select, SelectOption } from '../Select'

export default {
  title: 'CardProductPage/GenericProductPortrait',
  component: CardProductPage,
  argTypes: {},
}

const Template = ({ cardProduct }: { cardProduct: ICardProductData }) => {
  const dimensions = MOCK_GENERIC_CARD_PRODUCT_TYPE_DIMENSIONS
  const genericContent = cardProduct.content as IGenericCardProductContent
  const initialDimension =
    genericContent?.metadata?.selectedDimension ?? dimensions[0]

  const [selectedDimension, setSelectedDimension] =
    useState<IGenericCardProductTypeDimension>(initialDimension)

  const updatedCardProduct = useMemo(() => {
    return {
      ...cardProduct,
      content: {
        ...cardProduct.content,
        metadata: {
          ...(cardProduct.content as IGenericCardProductContent)?.metadata,
          selectedDimension,
          dimensions,
        },
      },
    } as ICardProductData
  }, [cardProduct, selectedDimension])

  return (
    <div>
      <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
        <Select
          labelText="Dimension"
          value={selectedDimension?.name}
          onChange={(value) => {
            const dimension = dimensions.find((d) => d.name === value)
            if (dimension) {
              setSelectedDimension(dimension)
            }
          }}
        >
          {dimensions.map((dimension) => (
            <SelectOption key={dimension.name} value={dimension.name}>
              {dimension.name} ({dimension.width}x{dimension.height}mm)
            </SelectOption>
          ))}
        </Select>
      </div>
      <CardProductPageStory
        cardProduct={updatedCardProduct}
        productTheme={
          BOOKLET_THEMES.find(
            (t: ICardProductTheme) => t.id === cardProduct.content.theme,
          )!
        }
        product={EulogiseProduct.GENERIC_CARD_PRODUCT}
      />
    </div>
  )
}

export const AuraSingleSided = () => (
  <Template
    cardProduct={mockGenericCardProductSingleSidedTheme({ themeId: 'aura' })}
  />
)
export const AuraDoubleSided = () => (
  <Template
    cardProduct={mockGenericCardProductDoubleSidedTheme({ themeId: 'aura' })}
  />
)
export const AuraBiFoldSided = () => (
  <Template
    cardProduct={mockGenericCardProductBiFoldTheme({ themeId: 'aura' })}
  />
)
export const AuraTriFoldSided = () => (
  <Template
    cardProduct={mockGenericCardProductTriFoldTheme({ themeId: 'aura' })}
  />
)

export const GrandeurSingleSided = () => (
  <Template
    cardProduct={mockGenericCardProductSingleSidedTheme({
      themeId: 'grandeur',
    })}
  />
)
export const GrandeurDoubleSided = () => (
  <Template
    cardProduct={mockGenericCardProductDoubleSidedTheme({
      themeId: 'grandeur',
    })}
  />
)
export const GrandeurBiFoldSided = () => (
  <Template
    cardProduct={mockGenericCardProductBiFoldTheme({ themeId: 'grandeur' })}
  />
)
export const GrandeurTriFoldSided = () => (
  <Template
    cardProduct={mockGenericCardProductTriFoldTheme({ themeId: 'grandeur' })}
  />
)
