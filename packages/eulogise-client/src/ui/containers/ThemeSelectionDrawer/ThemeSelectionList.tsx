import React from 'react'
import styled from 'styled-components'
import ThemeSelectionCard from './ThemeSelectionCard'
import { useCaseState, useDrawerState, useThemeState } from '../../store/hooks'
import {
  EulogiseProduct,
  ICaseState,
  IDrawerState,
  IEulogiseCategory,
  IGenericCardProductTypeData,
  ITheme,
} from '@eulogise/core'
import { DrawerThumbnailSlider } from '../DrawerSlider/DrawerThumbnailSlider'
import { ThemeHelper } from '@eulogise/helpers'

interface IThemeSelectionListProps {
  isClientTheme?: boolean
  genericProductType?: IGenericCardProductTypeData
  category: IEulogiseCategory
  onApply: (product: EulogiseProduct, theme: ITheme) => void
  onDelete?: (product: EulogiseProduct, theme: ITheme) => void
  isDeletable: boolean
}

const StyledThemeSelectionList = styled.div``

const ThemeSelectionList = ({
  isClientTheme = false,
  genericProductType,
  category,
  onApply,
  onDelete,
  isDeletable,
}: IThemeSelectionListProps) => {
  const { drawerOptions }: IDrawerState = useDrawerState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { themes } = useThemeState()

  // @ts-ignore
  const productType: EulogiseProduct = drawerOptions?.productType
  const displayThemes = themes.filter((t: ITheme) => {
    // ****** client themes
    if (isClientTheme) {
      if (!t.clientId) {
        // don't display theme that does not have client id (global themes)
        return false
      }
      return ThemeHelper.isProductAvailableInTheme({
        theme: t,
        product: productType,
        region: activeCase?.region!,
      })
    }

    // ****** Global Themes
    const isInCategory = t.categories.includes(category.id)
    if (isInCategory) {
      if (productType === EulogiseProduct.GENERIC_CARD_PRODUCT) {
        return true
      }
      return ThemeHelper.isProductAvailableInTheme({
        theme: t,
        product: productType,
        region: activeCase?.region!,
      })
    }
    return false
  })

  if (displayThemes.length === 0) {
    return null
  }

  return (
    <StyledThemeSelectionList>
      <DrawerThumbnailSlider
        categoryName={category.name}
        noOfThumbnails={displayThemes.length}
      >
        {displayThemes.map((theme: ITheme) => (
          <ThemeSelectionCard
            key={theme.id}
            theme={theme}
            genericProductType={genericProductType}
            productType={productType}
            onApply={onApply}
            onDelete={onDelete}
            isDeletable={isDeletable}
          />
        ))}
      </DrawerThumbnailSlider>
    </StyledThemeSelectionList>
  )
}

export default ThemeSelectionList
