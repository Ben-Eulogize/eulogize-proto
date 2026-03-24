import React from 'react'
import styled from 'styled-components'
import {
  CardProductFrameOnItemClickType,
  CardProductPageSize,
  EulogisePhotobookCoverType,
  EulogiseProduct,
  ICardProductFrameLayout,
  ICardProductFrameScaleProps,
  ICardProductPage,
  ICase,
  IPhotobookPageLayout,
} from '@eulogise/core'
import { GRAPHIC_FRAME_LAYOUTS } from './graphicFrameLayouts'
import { CardProductFrameHelper, CaseHelper } from '@eulogise/helpers'
import { PhotobookHelper } from '@eulogise/helpers'
import { PhotobookTitlePageThumbnail } from './PhotobookTitlePageThumbnail'
import { CardProductFrameThumbnail } from './CardProductFrameThumbnail'
import { PhotobookCoverPagePreview } from '../PhotobookCoverPagePreview'
import { COLOR } from '@eulogise/client-core'

const StyledCardProductFrameThumbnailList = styled.div<{
  $isGraphicFrame?: boolean
  $product: EulogiseProduct
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  ${({ $isGraphicFrame, $product }) => `
    ${$isGraphicFrame ? `width: 74%;` : ''}
    ${
      $product === EulogiseProduct.PHOTOBOOK ? `width: 455px;` : 'width: 395px;'
    }
  `}
  .dummy-icon svg {
    max-width: 30px;
    max-height: 30px;
    width: 70%;
    height: 70%;
  }
`

const PhotobookCoverTypeThumbnail = styled.div<{
  $selected: boolean
}>`
  ${({ $selected }) =>
    $selected
      ? `
    border: 1px solid ${COLOR.CORNFLOWER_BLUE};
  `
      : ''}
  cursor: pointer;
  div {
    cursor: pointer !important;
  }
  position: relative;
`

const PhotobookCoverTypeThumbnailOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
`

type ICardProductFrameThumbnailListProps = {
  coverType: EulogisePhotobookCoverType
  isShowTitlePageLayouts: boolean
  isCoverPage: boolean
  isShowFrameLayouts: boolean
  isGraphicFrame: boolean
  photosPerPage: null | number
  onItemClick: (
    type: CardProductFrameOnItemClickType,
    item: ICardProductFrameLayout | ICardProductPage,
  ) => void
  product: EulogiseProduct
  activeCase: ICase
  selectedLayoutId?: string
  pageSize?: CardProductPageSize
} & ICardProductFrameScaleProps

export const CardProductFrameThumbnailList = ({
  isShowTitlePageLayouts,
  coverType,
  isCoverPage,
  selectedLayoutId,
  isShowFrameLayouts = true,
  isGraphicFrame,
  photosPerPage,
  onItemClick,
  containerRef,
  product,
  activeCase,
  pageSize,
}: ICardProductFrameThumbnailListProps) => {
  const layouts = isGraphicFrame
    ? GRAPHIC_FRAME_LAYOUTS
    : (CardProductFrameHelper.getFrameLayouts(
        photosPerPage,
        product,
      ) as Array<any>)
  const primaryImage = CaseHelper.getPrimaryImage({ activeCase })
  const photobookTitlePageLayoutVariables =
    PhotobookHelper.getPhotobookTitlePageLayoutVariables({ activeCase })
  const photobookTitlePageLayouts: Array<IPhotobookPageLayout> =
    PhotobookHelper.getPhotobookTitlePageLayouts({
      variables: photobookTitlePageLayoutVariables,
      isCreation: false,
    })
  const coverPageLayouts: Array<IPhotobookPageLayout> =
    PhotobookHelper.getPhotobookCoverPageLayouts({
      variables: photobookTitlePageLayoutVariables,
      pageSize,
    })
  return (
    <StyledCardProductFrameThumbnailList
      $product={product}
      $isGraphicFrame={isGraphicFrame}
    >
      {isCoverPage &&
        coverPageLayouts.map((layout, index) => (
          <PhotobookCoverTypeThumbnail
            $selected={selectedLayoutId === layout.layoutId}
            onClick={() => {
              onItemClick(CardProductFrameOnItemClickType.PAGE, layout)
            }}
          >
            <PhotobookCoverTypeThumbnailOverlay
              onClick={() => {
                onItemClick(CardProductFrameOnItemClickType.PAGE, layout)
              }}
            />
            <PhotobookCoverPagePreview
              key={`cover-page-${index}`}
              layout={layout}
              coverType={coverType}
              editorScaledFactor={0.32}
              primaryImage={primaryImage}
              pageSize={pageSize}
            />
          </PhotobookCoverTypeThumbnail>
        ))}

      {!isCoverPage &&
        isShowTitlePageLayouts &&
        photobookTitlePageLayouts.map((page, index) => (
          <PhotobookTitlePageThumbnail
            key={`title-page-${index}`}
            layoutId={page.layoutId}
            isCoverPage={isCoverPage}
            coverType={coverType}
            pageSize={pageSize}
            selected={selectedLayoutId === page.layoutId}
            page={page}
            onClick={() => {
              if (!pageSize) {
                console.error('Page size is not defined')
                return
              }
              onItemClick(
                CardProductFrameOnItemClickType.PAGE,
                PhotobookHelper.fitAndCenterTitlePageLayout({
                  page,
                  pageSize,
                }),
              )
            }}
          />
        ))}

      {!isCoverPage &&
        isShowFrameLayouts &&
        layouts.map((layout: ICardProductFrameLayout, index) => (
          <CardProductFrameThumbnail
            key={`frame-layout-${index}`}
            product={product}
            selected={selectedLayoutId === layout.layoutId}
            layout={layout}
            onClick={(frameLayout: ICardProductFrameLayout) =>
              onItemClick(
                CardProductFrameOnItemClickType.FRAME_LAYOUT,
                frameLayout,
              )
            }
            containerRef={containerRef}
          />
        ))}
    </StyledCardProductFrameThumbnailList>
  )
}
