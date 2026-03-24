import React from 'react'
import styled from 'styled-components'
import { Card, ChevronDownIcon, Dropdown } from '@eulogise/client-components'
import {
  EulogiseProduct,
  IGenericCardProductTypeData,
  ITheme,
} from '@eulogise/core'
import ThemeSelectionThumbnailPreview from './ThemeSelectionThumbnailPreview'
import ThemeSelectionDropdownMenu from './ThemeSelectionDropdownMenu'
import { STYLE } from '@eulogise/client-core'
import { useCaseState } from '../../store/hooks'

interface IThemeSelectionCardProps {
  theme: ITheme
  productType: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  onApply: (product: EulogiseProduct, theme: ITheme) => void
  onDelete?: (product: EulogiseProduct, theme: ITheme) => void
  isDeletable: boolean
}

const StyledThemeSelectionCard = styled(Card)`
  border: none;
`

const ThemeSelectionFooter = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${STYLE.GUTTER};
  align-items: center;
`

const ThemeTitle = styled.div`
  flex: 1;
  &:first-letter {
    text-transform: uppercase;
  }
`

const StyledSelectAnActionDropdown = styled(Dropdown)`
  width: auto;
`

const ThemeSelectionCard = ({
  theme,
  productType,
  genericProductType,
  onApply,
  onDelete,
  isDeletable,
}: IThemeSelectionCardProps) => {
  const { activeItem: activeCase } = useCaseState()
  return (
    <StyledThemeSelectionCard bodyStyle={{ padding: STYLE.GUTTER }}>
      <ThemeSelectionThumbnailPreview
        theme={theme}
        productType={productType}
        genericProductType={genericProductType}
        onApply={() => {
          onApply(productType, theme)
        }}
        onApplyAll={() => {
          onApply(EulogiseProduct.ALL, theme)
        }}
        isDeletable={isDeletable}
        onDeleteTemplate={() => {
          if (onDelete) {
            onDelete(productType, theme)
          }
        }}
      />
      <StyledSelectAnActionDropdown
        overlay={
          <ThemeSelectionDropdownMenu
            eulogiseCase={activeCase!}
            theme={theme}
            onApply={onApply}
          />
        }
        placement="topLeft"
        trigger={['click', 'hover']}
      >
        <ThemeSelectionFooter>
          <ThemeTitle>{theme.name}</ThemeTitle>
          <ChevronDownIcon />
        </ThemeSelectionFooter>
      </StyledSelectAnActionDropdown>
    </StyledThemeSelectionCard>
  )
}

export default ThemeSelectionCard
