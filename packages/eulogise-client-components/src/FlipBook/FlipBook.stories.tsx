import React from 'react'
import styled from 'styled-components'

import { FlipBook } from './FlipBook'
import { CardProductPage } from '../CardProductPage'
import {
  CardProductPageColMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
  PAGE_SIZES,
  PageActionPosition,
} from '@eulogise/core'
import { STORIES_MOCK_BOOKLET_DATA_GRANDEUR_PIER_BACKGROUND } from '../CardProductPage/CardProductPageBooklet.stories.data'
import { BOOKLET_THEMES } from '@eulogise/core'
import { DragDropContext } from '../Draggable'

export default {
  title: 'General/FlipBook',
  component: FlipBook,
  argTypes: {},
}

const StyledPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Default = () => (
  <FlipBook
    width={300}
    height={500}
    pages={[
      <StyledPage style={{ backgroundColor: 'lightblue' }}>Page 1</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightgreen' }}>Page 2</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightcoral' }}>Page 3</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightblue' }}>Page 4</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightgreen' }}>Page 5</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightcoral' }}>Page 6</StyledPage>,
    ]}
  />
)

export const Landscape = () => (
  <FlipBook
    width={500}
    height={200}
    pages={[
      <StyledPage style={{ backgroundColor: 'lightblue' }}>Page 1</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightgreen' }}>Page 2</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightcoral' }}>Page 3</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightblue' }}>Page 4</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightgreen' }}>Page 5</StyledPage>,
      <StyledPage style={{ backgroundColor: 'lightcoral' }}>Page 6</StyledPage>,
    ]}
  />
)

type ITemplateProps = {
  product: EulogiseProduct
  cardProduct: ICardProductData
  pageIndex: number
}

const Template = ({ product, cardProduct, pageIndex }: ITemplateProps) => (
  <DragDropContext>
    <CardProductPage
      product={product}
      cardProduct={cardProduct}
      bleed={false}
      productTheme={
        BOOKLET_THEMES.find(
          (t: ICardProductTheme) => t.id === cardProduct.content.theme,
        )!
      }
      pageIndex={pageIndex}
      actionsPosition={PageActionPosition.RIGHT}
      displayMode={CardProductViewDisplayMode.PREVIEW}
      hasSkippedOrFilledMemorialDataPullForm={false}
      colMode={CardProductPageColMode.ONE_COL}
      editorScaledFactor={1}
      containerRef={0}
      onToggleImageBorderClick={() => {}}
      onChangeImageClick={() => {}}
      onEditImageClick={() => {}}
      onChangeLayoutClick={() => {}}
      onChangeFrameBackgroundClick={() => {}}
      onRowDataChange={() => {}}
      onFocus={() => {}}
      onItemFocus={() => {}}
      onAddAndCancelNewElementClick={() => {}}
      onCancel={() => {}}
      onUpdate={() => {}}
      onDelete={() => {}}
      onAddRowClick={() => {}}
      onDuplicate={() => {}}
      onOpenCopyLibraryDrawer={() => {}}
      onFrameContentItemClick={() => {}}
      onFrameContentItemChange={() => {}}
    />
  </DragDropContext>
)

const BookletTemplate = ({
  cardProduct,
}: {
  cardProduct: ICardProductData
}) => {
  const product = EulogiseProduct.BOOKLET
  const [width, height] = PAGE_SIZES['A5']
  return (
    <FlipBook
      width={width}
      height={height}
      showCover={true}
      pages={cardProduct.content.pages.map((_, pageIndex) => (
        <Template
          product={product}
          cardProduct={cardProduct}
          pageIndex={pageIndex}
        />
      ))}
    />
  )
}

export const FlipbookBookletPages = () => {
  return (
    <BookletTemplate
      cardProduct={STORIES_MOCK_BOOKLET_DATA_GRANDEUR_PIER_BACKGROUND}
    />
  )
}
