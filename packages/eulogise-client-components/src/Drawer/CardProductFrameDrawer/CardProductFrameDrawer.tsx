import { Drawer, IDrawerProps } from '../Drawer'
import styled from 'styled-components'
import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { CardProductFrameThumbnailList } from '../../CardProductFrame/CardProductFrameThumbnailList'
import {
  CardProductDrawerLayoutType,
  CardProductFrameOnItemClickType,
  EulogiseProduct,
  ICardProductData,
  ICardProductFrameLayout,
  ICardProductFrameScaleProps,
  ICardProductPage,
  ICase,
} from '@eulogise/core'
import { Select } from '../../Select'
import { Button, ButtonType } from '../../Button'
import { STYLE } from '@eulogise/client-core'
import { PhotobookHelper, UtilHelper } from '@eulogise/helpers'

// @ts-ignore
const StyledCardProductFrameDrawer = styled(Drawer)`
  text-align: center;
`

const CardProductFrameThumbnailCenter = styled.div`
  display: flex;
  justify-content: center;
`

type ICardProductFrameDrawerProps = Omit<IDrawerProps, 'children'> & {
  activeCase: ICase
  cardProduct: ICardProductData
  product: EulogiseProduct
  isShowTitlePageLayouts: boolean
  pageIndex: number
  selectedLayoutId?: string
  onItemClick: (
    type: CardProductFrameOnItemClickType,
    item: ICardProductFrameLayout | ICardProductPage,
  ) => void
  initialDrawerDisplayMode?: CardProductDrawerLayoutType
} & ICardProductFrameScaleProps

export const CardProductFrameDrawer = ({
  activeCase,
  onItemClick,
  onClose,
  containerRef,
  product,
  isShowTitlePageLayouts,
  pageIndex,
  selectedLayoutId,
  initialDrawerDisplayMode = CardProductDrawerLayoutType.LAYOUT_FRAME,
  cardProduct,
  ...drawerProps
}: ICardProductFrameDrawerProps) => {
  const currentPage = cardProduct.content.pages[pageIndex]
  const coverTypeValue = currentPage.coverType!

  const [drawerDisplayMode, setDrawerDisplayMode] =
    useState<CardProductDrawerLayoutType>(initialDrawerDisplayMode)

  const [photosPerPage, setPhotosPerPage] = useState<number | null>(null)
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const pageSize = cardProduct.content.pageSize
  const isGraphicFrame =
    drawerDisplayMode === CardProductDrawerLayoutType.GRAPHIC_FRAME
  const isCoverPage = PhotobookHelper.isPhotobookCoverPage({
    pageIndex,
    product,
  })
  return (
    <StyledCardProductFrameDrawer
      {...drawerProps}
      onClose={() => {
        setPhotosPerPage(null)
        if (onClose) {
          onClose()
        }
      }}
      isShowCloseIcon={false}
      width="580px"
    >
      <h1>{isCoverPage ? `Change Cover Design` : `Select a photo layout`} </h1>
      <p>
        You can drag your pictures into the page,
        <br /> your pictures will automatically fit the layout
      </p>
      <Row style={{ marginBottom: STYLE.GUTTER }}>
        <Col flex={1}>
          {!isGraphicFrame && !isCoverPage && (
            <Row align="middle">
              <Col>
                {isPhotobook ? `Photos per page` : `Photos per frame`}
                &nbsp;
              </Col>
              <Col>
                <Select
                  value={photosPerPage}
                  options={[
                    { value: null, label: 'All' },
                    ...UtilHelper.times(
                      (pageIndex: number) => ({
                        value: pageIndex + 1,
                        label: `${pageIndex + 1}`,
                      }),
                      product === EulogiseProduct.PHOTOBOOK ? 6 : 5,
                    ),
                  ]}
                  onChange={(value) => {
                    setPhotosPerPage(value as number)
                  }}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isCoverPage && (
          <Col>
            {isPhotobook ? (
              <Button
                buttonType={ButtonType.TRANSPARENT}
                onClick={() => {
                  if (
                    drawerDisplayMode !== CardProductDrawerLayoutType.TITLE_PAGE
                  ) {
                    setDrawerDisplayMode(CardProductDrawerLayoutType.TITLE_PAGE)
                  } else {
                    setDrawerDisplayMode(
                      CardProductDrawerLayoutType.LAYOUT_FRAME,
                    )
                  }
                }}
                noMarginRight
              >
                {drawerDisplayMode === CardProductDrawerLayoutType.TITLE_PAGE
                  ? `Back to layout frames`
                  : `View Title Pages`}
              </Button>
            ) : !isPhotobook ? (
              !isGraphicFrame ? (
                <Button
                  buttonType={ButtonType.TRANSPARENT}
                  onClick={() =>
                    setDrawerDisplayMode(
                      CardProductDrawerLayoutType.GRAPHIC_FRAME,
                    )
                  }
                  noMarginRight
                >
                  View Graphic Frames
                </Button>
              ) : (
                <Button
                  buttonType={ButtonType.TRANSPARENT}
                  onClick={() =>
                    setDrawerDisplayMode(
                      CardProductDrawerLayoutType.LAYOUT_FRAME,
                    )
                  }
                  noMarginRight
                >
                  Back to layout frames
                </Button>
              )
            ) : null}
          </Col>
        )}
      </Row>
      <CardProductFrameThumbnailCenter>
        <CardProductFrameThumbnailList
          isCoverPage={isCoverPage}
          coverType={coverTypeValue}
          activeCase={activeCase}
          product={product}
          pageSize={pageSize}
          selectedLayoutId={selectedLayoutId}
          isShowFrameLayouts={
            drawerDisplayMode !== CardProductDrawerLayoutType.TITLE_PAGE
          }
          isShowTitlePageLayouts={
            drawerDisplayMode === CardProductDrawerLayoutType.TITLE_PAGE
          }
          isGraphicFrame={isGraphicFrame}
          photosPerPage={photosPerPage}
          onItemClick={onItemClick}
          containerRef={containerRef}
        />
      </CardProductFrameThumbnailCenter>
    </StyledCardProductFrameDrawer>
  )
}
