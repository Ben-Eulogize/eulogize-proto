import React, { useState } from 'react'
import styled from 'styled-components'
import ThemeSelectionActionMenu from './ThemeSelectionActionMenu'
import {
  EulogiseProduct,
  ICardProductTheme,
  ICardProductThemeThumbnail,
  IGenericCardProductTypeData,
  ISlideshowTheme,
} from '@eulogise/core'
import ProductAssetDisplayView from './views/ProductAssetDisplayView'
import { ITheme } from '@eulogise/core'
import { ThemeHelper } from '@eulogise/helpers'
import { useCaseState } from '../../store/hooks'

interface IThemeSelectionThumbnailPreviewProps {
  theme: ITheme
  productType: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  onApply: () => void
  onApplyAll: () => void
  onDeleteTemplate: () => void
  isDeletable: boolean
}

const StyledThemeSelectionThumbnailPreview = styled.div`
  position: relative;
  overflow: hidden;
`

const ThumbnailImage = styled.img``

const ThemeProductViewContainer = styled.div`
  width: 268px;
`

const ThemeSelectionThumbnailPreview = ({
  theme,
  productType,
  genericProductType,
  onApply,
  onApplyAll,
  onDeleteTemplate,
  isDeletable,
}: IThemeSelectionThumbnailPreviewProps) => {
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region
  const [isShowActionMenu, setIsShowActionMenu] = useState<boolean>(false)
  const productAssets: ICardProductTheme | ISlideshowTheme =
    ThemeHelper.getProductThemeByProductType({
      theme,
      product: productType,
      genericProductType,
      region,
    })!

  const productThumbnail: ICardProductThemeThumbnail = productAssets?.thumbnail
  return (
    <StyledThemeSelectionThumbnailPreview
      onMouseEnter={() => setIsShowActionMenu(true)}
      onMouseLeave={() => setIsShowActionMenu(false)}
    >
      {productAssets ? (
        <ThemeProductViewContainer>
          <ProductAssetDisplayView
            assets={productThumbnail}
            product={productType}
          />
        </ThemeProductViewContainer>
      ) : (
        <ThumbnailImage src={productThumbnail?.images?.[0]!} />
      )}

      <ThemeSelectionActionMenu
        productType={productType}
        genericProductType={genericProductType}
        isShow={isShowActionMenu}
        onApply={onApply}
        onApplyAll={onApplyAll}
        isDeletable={isDeletable}
        onDeleteTemplate={onDeleteTemplate}
      />
    </StyledThemeSelectionThumbnailPreview>
  )
}

export default ThemeSelectionThumbnailPreview
