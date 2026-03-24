import React from 'react'
import { EulogiseProduct, IGenericCardProductTypeData } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { useCaseState } from '../../store/hooks'
import { SectionActionMenu } from '../SectionActionMenu/SectionActionMenu'
import SectionActionMenuItem from '../SectionActionMenu/SectionActionMenuItem'

interface IThemeSelectionActionMenuProps {
  isShow: boolean
  productType: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  onApply: () => void
  onApplyAll: () => void
  onDeleteTemplate: () => void
  isDeletable: boolean
}

const ThemeSelectionActionMenu = ({
  isShow,
  productType,
  genericProductType,
  onApply,
  onApplyAll,
  onDeleteTemplate,
  isDeletable,
}: IThemeSelectionActionMenuProps) => {
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  return (
    <SectionActionMenu isShow={isShow}>
      {productType && (
        <SectionActionMenuItem onClick={onApply}>
          Apply to{' '}
          {CardProductHelper.getProductShortName({
            product: productType,
            genericProductType,
            region,
          })}
        </SectionActionMenuItem>
      )}
      <SectionActionMenuItem onClick={onApplyAll}>
        Apply to all
      </SectionActionMenuItem>
      {isDeletable && (
        <SectionActionMenuItem onClick={onDeleteTemplate}>
          Delete Theme
        </SectionActionMenuItem>
      )}
    </SectionActionMenu>
  )
}

export default ThemeSelectionActionMenu
