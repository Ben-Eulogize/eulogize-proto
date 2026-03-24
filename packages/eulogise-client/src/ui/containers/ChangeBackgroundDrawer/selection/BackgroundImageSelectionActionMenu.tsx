import React from 'react'
import styled from 'styled-components'
import BackgroundImageSelectionActionMenuItem from './BackgroundImageSelectionActionMenuItem'
import { COLOR } from '@eulogise/client-core'
import { EulogiseProduct, EulogiseRegion } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { useAllGenericCardProductTypes } from '../../../store/hooks'

interface IBackgroundImageSelectionActionMenuProps {
  isShow: boolean
  productType: EulogiseProduct
  slug?: string
  onApply: () => void
  //  onDelete: () => void
  onApplyAll: () => void
  onEdit: () => void
  isEditable: boolean
  //  isDeletable: boolean
  region: EulogiseRegion
}

const StyledBackgroundImageSelectionActionMenu = styled.div`
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR}dd;
  color: ${COLOR.DARK_BLUE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s all;
  transform: translateY(100%)
    ${({ isShow }: { isShow: boolean }) =>
      isShow &&
      `
    transform: translateY(0);
  `};
`

const BackgroundImageSelectionActionMenu: React.FC<
  IBackgroundImageSelectionActionMenuProps
> = ({
  isShow,
  productType,
  slug,
  isEditable,
  onApply,
  onApplyAll,
  region,
  onEdit,
}) => {
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const genericProductType = slug
    ? CardProductHelper.getGenericProductTypeBySlug({
        slug,
        genericProductTypes,
      })
    : undefined
  return (
    <StyledBackgroundImageSelectionActionMenu isShow={isShow}>
      <BackgroundImageSelectionActionMenuItem onClick={onApply}>
        Apply to{' '}
        {CardProductHelper.getProductShortName({
          product: productType,
          region,
          genericProductType,
        })}
      </BackgroundImageSelectionActionMenuItem>
      <BackgroundImageSelectionActionMenuItem onClick={onApplyAll}>
        Apply to all
      </BackgroundImageSelectionActionMenuItem>

      {isEditable && (
        <BackgroundImageSelectionActionMenuItem onClick={onEdit}>
          Edit Background
        </BackgroundImageSelectionActionMenuItem>
      )}
    </StyledBackgroundImageSelectionActionMenu>
  )
}

export default BackgroundImageSelectionActionMenu
