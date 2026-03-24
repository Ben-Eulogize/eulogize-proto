import React from 'react'
import styled from 'styled-components'
import { CardProductPage } from '../CardProductPage'
import {
  CardProductPageColMode,
  CardProductPageOrientation,
  CardProductPageSize,
  CardProductViewDisplayMode,
  EulogisePhotobookCoverType,
  EulogiseProduct,
  ICardProductData,
  ICardProductPage,
  IImageAssetContent,
  IPhotobookPageLayout,
  PHOTOBOOK_DEFAULT_THEME,
} from '@eulogise/core'
import { CardProductHelper, PhotobookHelper } from '@eulogise/helpers'

const StyledPhotobookCoverPagePreview = styled.div``

type IPhotobookCoverPagePreviewProps = {
  layout: IPhotobookPageLayout
  coverType: EulogisePhotobookCoverType
  editorScaledFactor?: number
  primaryImage?: IImageAssetContent
  displayMode?: CardProductViewDisplayMode
  pageSize?: CardProductPageSize
}

const StyledCardProductPage = styled(CardProductPage)`
  // box-shadow: 0 1px 6px rgba(0, 21, 41, 0.25);
`

export const PhotobookCoverPagePreview = ({
  layout,
  coverType,
  editorScaledFactor = 0.5,
  primaryImage,
  pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
}: IPhotobookCoverPagePreviewProps) => {
  const product = EulogiseProduct.PHOTOBOOK
  const coverTypeUrl = PhotobookHelper.getCoverPageFabricBackgroundUrl({
    coverType,
    pageSize,
  })
  const cardProduct: ICardProductData =
    CardProductHelper.attachPrimaryImageToCardProduct({
      cardProduct: {
        content: {
          pages: [
            {
              ...layout,
              background: {
                image: {
                  url: coverTypeUrl,
                },
              },
            } as ICardProductPage,
          ],
          pageSize,
          pageMargins: CardProductHelper.getDefaultPageMargins({
            product,
          }),
          pageOrientation: CardProductPageOrientation.PORTRAIT,
          theme: 'photobook-default-theme',
        },
      } as ICardProductData,
      primaryImage,
    })
  return (
    <StyledPhotobookCoverPagePreview>
      <StyledCardProductPage
        isDisabledDnd
        product={product}
        pageIndex={0}
        // @ts-ignore
        cardProduct={cardProduct}
        productTheme={PHOTOBOOK_DEFAULT_THEME}
        isEnablePhotobookEdit={false}
        colMode={CardProductPageColMode.ONE_COL}
        editorScaledFactor={editorScaledFactor}
        displayMode={CardProductViewDisplayMode.PREVIEW}
        containerRef={0}
      />
    </StyledPhotobookCoverPagePreview>
  )
}
