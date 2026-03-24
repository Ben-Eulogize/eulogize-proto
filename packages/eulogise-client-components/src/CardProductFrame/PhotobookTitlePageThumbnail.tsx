import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  CardProductContentItemType,
  CardProductPageSize,
  CardProductViewDisplayMode,
  EulogisePhotobookCoverType,
  EulogiseProduct,
  ICardProductPage,
  ICardProductRow,
  PAGE_SIZES,
  PageActionPosition,
  PHOTOBOOK_DEFAULT_THEME,
} from '@eulogise/core'
import { CardProductHelper, PhotobookHelper } from '@eulogise/helpers'
import { ContentRow } from '../ContentRow'
import { COLOR } from '@eulogise/client-core'

type IPhotobookTitlePageThumbnailProps = {
  selected?: boolean
  page: ICardProductPage
  onClick: (page: ICardProductPage) => void
  coverType: EulogisePhotobookCoverType
  isCoverPage?: boolean
  layoutId: string
  pageSize?: CardProductPageSize
}

const PhotobookTitlePageThumbnailContainer = styled.div<{
  $selected: boolean
  $coverType: EulogisePhotobookCoverType
  $pageSize: CardProductPageSize
  $isCoverPage: boolean
}>`
  ${({ $selected, $coverType, $isCoverPage, $pageSize }) => `
    border: 2px solid ${
      $selected ? COLOR.CORNFLOWER_BLUE : COLOR.CORE_PURPLE_30
    };
    ${
      $isCoverPage
        ? `
    background-image: url(${PhotobookHelper.getCoverPageFabricBackgroundUrl({
      coverType: $coverType,
      pageSize: $pageSize,
    })});
    `
        : ''
    }
    background-size: 3rem;
  `}

  width: ${PAGE_SIZES.PHOTOBOOK_THUMBNAIL[0]}px;
  height: ${PAGE_SIZES.PHOTOBOOK_THUMBNAIL[1]}px;
  position: relative;
`

const StyledPhotobookTitlePageThumbnail = styled.div<{ $scale?: number }>`
  ${({ $scale }) =>
    $scale
      ? `transform: scale(${$scale}) translate(-50%, -58%);`
      : `visibility: hidden;`}
  transform-origin: top left;
  position: absolute;
  margin-left: 50%;
  margin-top: 50%;
  cursor: pointer;
  div,
  span {
    cursor: pointer !important;
  }
`

const PhotobookThumbnailElementContainer = styled.div``

const ClickableOverlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const PhotobookTitlePageThumbnail = ({
  selected,
  page,
  onClick,
  coverType,
  isCoverPage = false,
  layoutId,
  pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
}: IPhotobookTitlePageThumbnailProps) => {
  const [scale, setScale] = React.useState()
  const elementsContainerRef = React.useRef<HTMLDivElement>(null)
  const boundaries = {
    width: 600,
    height: 600,
  }
  useEffect(() => {
    // need to wait for 1 millisecond before calculation, otherwise, opening the drawer
    // the second time, the thumbnailEl width and height will be 0
    setTimeout(() => {
      const thumbnailEl = elementsContainerRef.current
      if (thumbnailEl) {
        const { height: elementContainerHeight, width: elementContainerWidth } =
          thumbnailEl.getBoundingClientRect()
        // use the higher of the two dimensions to scale the thumbnail
        const contentHeight = PAGE_SIZES.PHOTOBOOK_THUMBNAIL[1] - 14
        if (elementContainerHeight > elementContainerWidth) {
          const newScale = contentHeight / elementContainerHeight
          // @ts-ignore
          setScale(newScale)
        } else if (elementContainerWidth >= elementContainerHeight) {
          const newScale = contentHeight / (elementContainerWidth + 40) // 40 is the padding
          // @ts-ignore
          setScale(newScale)
        }
      }
    }, 1)
  }, [])

  const clickHandler = () => {
    if (onClick) {
      onClick(page)
    }
  }

  const newPage = PhotobookHelper.centerTitlePageLayout({
    page,
    pageSize: CardProductPageSize.PHOTOBOOK_THUMBNAIL,
  })
  return (
    <PhotobookTitlePageThumbnailContainer
      $selected={!!selected}
      $coverType={coverType}
      $pageSize={pageSize}
      $isCoverPage={isCoverPage}
      onClick={clickHandler}
    >
      <ClickableOverlay onClick={clickHandler} />
      <StyledPhotobookTitlePageThumbnail
        className={`photobook-title-page-thumbnail ${layoutId}`}
        $scale={scale}
      >
        <PhotobookThumbnailElementContainer ref={elementsContainerRef}>
          {newPage.rows
            // remove the first row, which is the title row
            .filter(
              (r, i) =>
                !(i === 0 && r.type === CardProductContentItemType.SPACE),
            )
            .map((row: ICardProductRow) => {
              const rowHeight = CardProductHelper.getRowHeight(row)
              return (
                <ContentRow
                  isEnablePhotobookEdit={false}
                  isPhotobookTitlePageLayout
                  editorScaledFactor={1}
                  key={row.id}
                  id={row.id!}
                  pageIndex={0}
                  provided={{}}
                  snapshot={{}}
                  focusColumnIndex={0}
                  setFocusColumnIndex={() => {}}
                  product={EulogiseProduct.PHOTOBOOK}
                  type={row.type as CardProductContentItemType}
                  width={boundaries.width}
                  height={rowHeight}
                  boundaries={boundaries}
                  data={row.data}
                  dynamicDataId={row.dynamicDataId}
                  actionsPosition={PageActionPosition.RIGHT}
                  pageMargins={0}
                  displayMode={CardProductViewDisplayMode.PREVIEW}
                  productTheme={PHOTOBOOK_DEFAULT_THEME}
                  containerRef={0}
                  onChange={() => {}}
                  onFocus={() => {}}
                  focusedRowId={undefined}
                  onBlur={() => {}}
                  index={0}
                  onChangeLayoutClick={() => {}}
                  onChangeFrameBackgroundClick={() => {}}
                  onFullWidthClick={() => {}}
                  onDelete={() => {}}
                  onToggleFadeImageClick={() => {}}
                  onToggleImageBorderClick={() => {}}
                  onChangeImageClick={() => {}}
                  onEditImageClick={() => {}}
                  onDuplicate={() => {}}
                  onFrameContentItemClick={() => {}}
                  onFrameContentItemChange={() => {}}
                  onChangeAlignment={() => {}}
                />
              )
            })}
        </PhotobookThumbnailElementContainer>
      </StyledPhotobookTitlePageThumbnail>
    </PhotobookTitlePageThumbnailContainer>
  )
}
