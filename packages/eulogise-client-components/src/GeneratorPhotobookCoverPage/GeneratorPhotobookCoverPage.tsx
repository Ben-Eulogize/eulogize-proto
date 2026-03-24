import React from 'react'
import {
  BleedPageMode,
  CardProductPageColMode,
  CardProductPageSize,
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductPage,
  PHOTOBOOK_DEFAULT_THEME,
} from '@eulogise/core'
import styled from 'styled-components'
import { CardProductPage } from '../CardProductPage'

type IGeneratorPhotobookCoverPageProps = {
  cardProduct: ICardProductData
  pageSize: CardProductPageSize
}

const StyledGeneratorPhotobookCoverPage = styled.div`
  overflow: hidden;
`

export const GeneratorPhotobookCoverPage = ({
  cardProduct,
  pageSize,
}: IGeneratorPhotobookCoverPageProps) => {
  const [coverPage, ...restPages] = cardProduct.content.pages
  const newCardProduct: ICardProductData = {
    ...cardProduct,
    content: {
      ...cardProduct.content,
      pageSize,
      pages: [
        {
          ...coverPage,
          rows: coverPage.rows
            .map((row) => {
              if (
                row.type === 'image' ||
                row.type === 'frame' ||
                row.type === 'text'
              ) {
                return row
              }
              return
            })
            .filter(Boolean),
        } as ICardProductPage,
        ...restPages,
      ],
    },
  }
  return (
    <StyledGeneratorPhotobookCoverPage
      className={`generator-photobook-cover-page`}
    >
      <CardProductPage
        isDisabledDnd
        bleedPageMode={BleedPageMode.FULL_BLEED}
        product={EulogiseProduct.PHOTOBOOK}
        pageIndex={0}
        bleed
        // @ts-ignore`
        cardProduct={newCardProduct}
        productTheme={PHOTOBOOK_DEFAULT_THEME}
        isEnablePhotobookEdit={false}
        colMode={CardProductPageColMode.ONE_COL}
        editorScaledFactor={1}
        displayMode={CardProductViewDisplayMode.PRINT}
        isPrintCoverPage
        containerRef={0}
        maxPhotoSize={{
          width: 1200,
          height: 1200,
        }}
      />
    </StyledGeneratorPhotobookCoverPage>
  )
}
