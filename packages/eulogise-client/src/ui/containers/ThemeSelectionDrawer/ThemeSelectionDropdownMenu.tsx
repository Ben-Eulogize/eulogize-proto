import React from 'react'
import styled from 'styled-components'
import { DropdownMenu, DropdownMenuItem } from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'
import { EulogiseProduct, ICase, ITheme } from '@eulogise/core'
import { CardProductHelper, ThemeHelper } from '@eulogise/helpers'

const StyledThemeSelectionDropdownMenu = styled(DropdownMenu)`
  && {
    box-shadow: 0 0 20px ${COLOR.GREY};
  }
`

interface IThemeSelectionDropdownMenuProps {
  eulogiseCase: ICase
  theme: ITheme
  onApply: (product: EulogiseProduct, theme: ITheme) => void
}

const ThemeSelectionDropdownMenu: React.FC<
  IThemeSelectionDropdownMenuProps
> = ({ theme, onApply, eulogiseCase }) => {
  const availableEulogiseProducts = ThemeHelper.getAvailableProductsFromTheme({
    activeCase: eulogiseCase,
    theme,
  })
  const region = eulogiseCase?.region!

  const onApplyToProduct = (product: EulogiseProduct) => {
    onApply(product, theme)
  }
  return (
    <StyledThemeSelectionDropdownMenu>
      <DropdownMenuItem
        key="apply-all"
        onClick={() => onApplyToProduct(EulogiseProduct.ALL)}
      >
        Apply All
      </DropdownMenuItem>
      {availableEulogiseProducts.map((product: EulogiseProduct) => (
        <DropdownMenuItem
          key={product}
          onClick={() => onApplyToProduct(product)}
        >
          Apply to {CardProductHelper.getProductShortName({ product, region })}
        </DropdownMenuItem>
      ))}
    </StyledThemeSelectionDropdownMenu>
  )
}

export default ThemeSelectionDropdownMenu
