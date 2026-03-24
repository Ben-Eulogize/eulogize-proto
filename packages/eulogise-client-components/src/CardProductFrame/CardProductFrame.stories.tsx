import React, { useState } from 'react'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'
import {
  CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LAYOUT,
  CARD_PRODUCT_FRAME_LARGE_TOP_ROW_SMALL_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_LAYOUTS,
  CARD_PRODUCT_FRAME_LEFT_COLUMN_RIGHT_TWO_ROWS_LAYOUT,
  CARD_PRODUCT_FRAME_LEFT_TWO_ROWS_RIGHT_COLUMN_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_HORIZONTAL_ELLIPSE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LANDSCAPE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_LANDSCAPE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_PORTRAIT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_SQUARE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_VERTICAL_ELLIPSE_LAYOUT,
  CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LAYOUT,
  CARD_PRODUCT_FRAME_SMALL_TOP_ROW_LARGE_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_EVEN_ROWS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_THREE_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_TWO_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_THREE_COLUMNS_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_TWO_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_LAYOUT,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameContentItem,
  ICardProductFrameItem,
  ICardProductFrameLayout,
} from '@eulogise/core'
import { CardProductFrame } from './CardProductFrame'
import { CardProductFrameHelper } from '@eulogise/helpers'
import {
  CARD_PRODUCT_FRAME_BLUE_PASTEL_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUE_PASTEL_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_SQUARE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUEGUM_GOLD_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_CIRCLE_LEAF_2_BACKGROUND,
  CARD_PRODUCT_FRAME_CIRCLE_LEAF_BACKGROUND,
  CARD_PRODUCT_FRAME_FLORAL_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLD_ROSES_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLD_ROSES_HEXAGON_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLD_ROSES_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLDBLUE_ROSES_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_PINK_ROSE_SQUARE_BACKGROUND,
  CARD_PRODUCT_FRAME_RECTANGLE_LEAF_BACKGROUND,
  CARD_PRODUCT_FRAME_WHITE_ROSE_RECTANGLE_BACKGROUND,
} from './graphicFrameLayouts'

const Matrix1 = 'fSV4AXgTROR0iltPdiEp'
const Matrix2 = 'UrfWSGmgQrVj1M6IJLxF'
const IMAGES = [Matrix1, Matrix2]

export default {
  title: 'CardProduct/CardProductFrame',
  component: CardProductFrame,
  argTypes: {},
}

const StyledCardProductTemplate = styled.div`
  display: inline;
  box-shadow: 0 1px 2px #999999;
  margin: 1rem;
`

const StyledFrameImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

type ICardProductFrameContainerProps = {
  layout: ICardProductFrameLayout
  selectedContentItemId: string
  onContentItemClick: (contentItem: ICardProductFrameContentItem) => void
  onContentItemChange: (
    event: ICardProductFrameImageChangeEvent,
    contentItem: ICardProductFrameContentItem,
  ) => void
}

const CardProductFrameContainer = ({
  layout,
  onContentItemClick,
  selectedContentItemId,
  onContentItemChange,
}: ICardProductFrameContainerProps) => (
  <StyledCardProductTemplate>
    <CardProductFrame
      width={layout.width}
      height={layout.height}
      onDisplayModeChange={() => {}}
      layout={layout}
      selectedContentItemId={selectedContentItemId}
      onContentItemClick={onContentItemClick}
      onContentItemChange={onContentItemChange}
    />
  </StyledCardProductTemplate>
)

const CardProductFrameContainerWithApplyImage = ({
  layout,
  imageSrc,
}: {
  layout: ICardProductFrameLayout
  imageSrc: string
}) => {
  const [displayLayout, setDisplayLayout] = useState<ICardProductFrameLayout>(
    applyImages(layout, imageSrc) as ICardProductFrameLayout,
  )
  const [selectedContentItemId, setSelectedContentItemId] = useState('')
  return (
    <CardProductFrameContainer
      key={imageSrc}
      layout={displayLayout}
      selectedContentItemId={selectedContentItemId}
      onContentItemClick={(contentItem) => {
        setSelectedContentItemId(contentItem.id!)
      }}
      onContentItemChange={(ev, contentItem) => {
        const newLayout =
          CardProductFrameHelper.getUpdatedLayoutFromNewContentItem(
            displayLayout,
            contentItem,
          )
        setDisplayLayout(newLayout)
      }}
    />
  )
}

const CardProductFrameContainerWithApplyImages = ({
  layout,
}: {
  layout: ICardProductFrameLayout
}) => {
  const sizeMultiplier = [0.5, 1, 2, 3]
  return (
    <>
      {sizeMultiplier
        .map((multipler) =>
          IMAGES.map((imageSrc) => (
            <CardProductFrameContainerWithApplyImage
              key={imageSrc}
              layout={{
                ...(CardProductFrameHelper.generateIdForLayout(
                  layout,
                ) as ICardProductFrameLayout),
                width: layout.width ? layout.width * multipler : undefined,
                height: layout.height ? layout.height * multipler : undefined,
              }}
              imageSrc={imageSrc}
            />
          )),
        )
        .flat()}
    </>
  )
}

const DEFAULT_FRAME_LAYOUT: ICardProductFrameLayout =
  CardProductFrameHelper.generateIdForLayout({
    type: 'rows',
    items: [
      {
        type: 'content',
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
    ],
  })

export const Default = () => {
  const [layout, setLayout] = useState(DEFAULT_FRAME_LAYOUT)
  const [selectedContentItemId, setSelectedContentItemId] = useState('')
  return (
    <CardProductFrameContainer
      layout={layout}
      selectedContentItemId={selectedContentItemId}
      onContentItemClick={(contentItem) => {
        setSelectedContentItemId(contentItem.id!)
        setLayout(layout)
      }}
      onContentItemChange={(event, contentItem) => {
        console.log('contentItem change', event, contentItem)
      }}
    />
  )
}

type ApplyImagesParams = ICardProductFrameLayout | ICardProductFrameItem
const applyImages = (
  layoutOrItem: ApplyImagesParams,
  filestackHandle?: string,
): ApplyImagesParams => {
  if ((layoutOrItem as any).items) {
    return {
      ...layoutOrItem,
      // @ts-ignore
      items: layoutOrItem.items.map((item) =>
        applyImages(item, filestackHandle),
      ),
    }
  }
  if ((layoutOrItem as ICardProductFrameItem).type === 'content') {
    return {
      ...layoutOrItem,
      content: {
        type: 'image',
        filestackHandle: filestackHandle ?? faker.helpers.arrayElement(IMAGES),
      },
    } as ICardProductFrameContentItem
  }
  return {
    ...layoutOrItem,
  }
}

export const BluegumGoldRectangle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_BLUEGUM_GOLD_RECTANGLE_BACKGROUND}
  />
)

export const BluePastelCircle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_BLUE_PASTEL_CIRCLE_BACKGROUND}
  />
)

export const BluePastelRectangle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_BLUE_PASTEL_RECTANGLE_BACKGROUND}
  />
)

export const FloralCircle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_FLORAL_CIRCLE_BACKGROUND}
  />
)

export const PinkRoseSquare = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_PINK_ROSE_SQUARE_BACKGROUND}
  />
)

export const GoldRosesRectangle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_GOLD_ROSES_RECTANGLE_BACKGROUND}
  />
)

export const BlueGoldRosesRectangleCircle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_RECTANGLE_BACKGROUND}
  />
)

export const BlueGoldRosesSquareCircle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_SQUARE_BACKGROUND}
  />
)

export const CircleLeaf2 = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_CIRCLE_LEAF_2_BACKGROUND}
  />
)

export const CircleLeaf = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_CIRCLE_LEAF_BACKGROUND}
  />
)

export const GoldRosesCircle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_GOLD_ROSES_CIRCLE_BACKGROUND}
  />
)

export const GoldRosesHexagon = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_GOLD_ROSES_HEXAGON_BACKGROUND}
  />
)

export const GoldBlueRosesCircle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_GOLDBLUE_ROSES_CIRCLE_BACKGROUND}
  />
)

export const RectangleLeaf = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_RECTANGLE_LEAF_BACKGROUND}
  />
)

export const WhiteRoseRectangle = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_WHITE_ROSE_RECTANGLE_BACKGROUND}
  />
)

export const Portrait = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT}
  />
)

export const Landscape = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_LANDSCAPE_LAYOUT}
  />
)

export const Square = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT}
  />
)

export const RoundedPortrait = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_ROUNDED_PORTRAIT_LAYOUT}
  />
)

export const RoundedLandscape = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_ROUNDED_LANDSCAPE_LAYOUT}
  />
)

export const RoundedSquare = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_ROUNDED_SQUARE_LAYOUT}
  />
)

export const Rounded = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_ROUNDED_LAYOUT}
  />
)

export const VerticalEllipsis = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_VERTICAL_ELLIPSE_LAYOUT}
  />
)

export const HorizontalEllipsis = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_ONE_HORIZONTAL_ELLIPSE_LAYOUT}
  />
)

export const TwoEvenColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT}
  />
)
export const LargeLeftSmallRightColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LAYOUT}
  />
)

export const SmallLeftLargeRightColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LAYOUT}
  />
)

export const TwoEvenRows = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_LAYOUT}
  />
)

export const LargeTopSmallBottomRows = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_LARGE_TOP_ROW_SMALL_BOTTOM_ROW_LAYOUT}
  />
)

export const SmallTopLargeBottomRows = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_SMALL_TOP_ROW_LARGE_BOTTOM_ROW_LAYOUT}
  />
)

export const ThreeEventColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT}
  />
)

export const LeftColumnRightTwoRows = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_LEFT_COLUMN_RIGHT_TWO_ROWS_LAYOUT}
  />
)

export const LeftTwoRowsRightColumn = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_LEFT_TWO_ROWS_RIGHT_COLUMN_LAYOUT}
  />
)

export const ThreeEvenRows = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_THREE_EVEN_ROWS_LAYOUT}
  />
)

export const TopTwoColumnsBottomRow = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_ROW_LAYOUT}
  />
)

export const TopRowBottomTwoColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_TWO_COLUMNS_LAYOUT}
  />
)

export const TopTwoColumnsBottomTwoColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_TWO_COLUMNS_LAYOUT}
  />
)

export const TopThreeColumnsBottomRow = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TOP_THREE_COLUMNS_BOTTOM_ROW_LAYOUT}
  />
)

export const TopRowBottomThreeColumns = () => (
  <CardProductFrameContainerWithApplyImages
    layout={CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_THREE_COLUMNS_LAYOUT}
  />
)

export const WithImages = () => {
  const [selectedContentItemId, setSelectedContentItemId] = useState('')
  return (
    <StyledFrameImageContainer>
      {CARD_PRODUCT_FRAME_LAYOUTS.map((layout: ICardProductFrameLayout) => (
        <CardProductFrameContainer
          layout={applyImages(layout) as ICardProductFrameLayout}
          selectedContentItemId={selectedContentItemId}
          onContentItemClick={(contentItem) => {
            setSelectedContentItemId(contentItem.id!)
          }}
          onContentItemChange={() => {}}
        />
      ))}
    </StyledFrameImageContainer>
  )
}
