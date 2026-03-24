import React, { CSSProperties, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  AlignmentType,
  AlignmentTypeText,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  CardProductViewDisplayMode,
  EulogiseProduct,
  IBoundariesType,
  ICardProductDividerName,
  ICardProductDynamicDataFieldEvent,
  ICardProductFrameContentItem,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameLayout,
  ICardProductIconName,
  ICardProductIconRowData,
  ICardProductRowData,
  ICardProductSpaceRowData,
  ICardProductTheme,
  IContentItemOnChangeEvent,
  MarginType,
  PageActionPosition,
  IPhotobookFrameSize,
  EulogiseImageSize,
} from '@eulogise/core'
import { Tooltip } from '../Tooltip'
import { DragIcon } from '../icons'
import { ContentItem, IChangeImageEvent } from '../ContentItem'
import { CardProductFrameHelper, CardProductHelper } from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'
import DynamicDataSelector from '../DynamicData/DynamicDataSelector'

export interface IContentRowProps {
  isPhotobookTitlePageLayout: boolean
  isEnablePhotobookEdit: boolean
  isFocused?: boolean
  dynamicDataId?: string
  onFocus: (type: CardProductContentItemType) => void
  onDragDisabled?: (disabled: boolean) => void
  focusedRowId: string | undefined
  onBlur: () => void
  product: EulogiseProduct
  pageIndex: number
  id: string
  index: number
  type: CardProductContentItemType
  width: number
  height: number
  boundaries: IBoundariesType
  data: ICardProductRowData
  actionsPosition: PageActionPosition
  pageMargins: MarginType
  displayMode: CardProductViewDisplayMode
  productTheme: ICardProductTheme
  maxPhotoSize?: EulogiseImageSize
  onChange: (
    data: ICardProductRowData,
    id: string,
    event?: IContentItemOnChangeEvent,
  ) => void
  onChangeLayoutClick: (layoutId?: string) => void
  onChangeFrameBackgroundClick: () => void
  onFullWidthClick: () => void
  onDelete: (id: string) => void
  onCancel?: () => void
  onToggleImageBorderClick: (ev: IChangeImageEvent) => void
  onToggleFadeImageClick: (ev: IChangeImageEvent) => void
  onTransparencyChange?: (ev: IChangeImageEvent & { opacity: number }) => void
  isTextEnabled?: boolean
  onChangeIconClick?: (params: {
    rowId: string
    color: string
    iconName: ICardProductIconName
  }) => void
  onChangeDividerClick?: (params: {
    rowId: string
    color: string
    dividerName: ICardProductDividerName
  }) => void
  onChangeImageClick: (ev: IChangeImageEvent) => void
  onEditImageClick: (ev: IChangeImageEvent) => void
  onEnhanceImageClick?: (ev: IChangeImageEvent) => void
  onBgRemoverClick?: (ev: IChangeImageEvent) => void
  focusColumnIndex: number
  setFocusColumnIndex: (colIndex: number) => void
  onDuplicate: (id: string) => void
  onFrameContentItemClick: (
    frameContentItem: ICardProductFrameContentItem,
  ) => void
  onFrameContentItemChange: (
    event: ICardProductFrameImageChangeEvent,
    contentItem: ICardProductFrameContentItem,
  ) => void
  selectedFrameContentItemId?: string
  provided: any
  snapshot: any
  editorScaledFactor: number
  containerRef: any
  onChangeAlignment: (alignment: AlignmentType) => void
  onAssignDynamicData?: (event: ICardProductDynamicDataFieldEvent) => void
  template?: ICardProductTheme
  isDragContainerHighlighted?: boolean
  onToggleTextClick?: () => void
  frameSize?: IPhotobookFrameSize
  onFrameSizeChange?: (frameSize: IPhotobookFrameSize) => void
}

interface IStyledDragContainer {
  actionsPosition: PageActionPosition
  isDragging: boolean
  isHover: boolean
  isPreview: boolean
  $editorScaledFactor: number
}

interface IStyledDragIconContainer {
  isFocused: boolean
  $isDragContainerHighlighted: boolean
}

interface IStyledContent {
  $alignment: AlignmentType
  $isFocused: boolean
  $isFlexStart?: boolean
}

interface IStyledContentRowContainer {
  isDragging: boolean
  style: CSSProperties
}

const StyledContentRowContainer = styled.div<IStyledContentRowContainer>`
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  user-select: none;
  transition: opacity 250ms, box-shadow 100ms;

  ${({ isDragging, style }: IStyledContentRowContainer) =>
    isDragging
      ? `
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transform: translate(0, ${
      style?.transform?.split(',')[1].replace(/\)/, '') || '0px'
    }) !important;
       `
      : ``}
`

const StyledDragContainer = styled.div<IStyledDragContainer>`
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: stretch;
  cursor: grab;

  .dragHandle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    margin-top: 1px;
    margin-bottom: 1px;
    background-color: whitesmoke;
    transition: background 100ms, opacity 300ms;
  }

  ${({
    actionsPosition,
    isDragging,
    isHover,
    isPreview,
  }: IStyledDragContainer) => {
    const isLeftActionPosition: boolean =
      actionsPosition === PageActionPosition.LEFT
    return `
      justify-content: ${isLeftActionPosition ? `flex-start` : `flex-end`};
      right: ${isLeftActionPosition ? `0` : `-30px`};
      left: ${isLeftActionPosition ? `-30px` : `-0`};
      opacity: ${isPreview ? `0` : `1`};
      
      .dragHandle {
        border-top-left-radius: ${isLeftActionPosition ? `5px` : `0`};
        border-bottom-left-radius: ${isLeftActionPosition ? `5px` : `0`};
        border-top-right-radius: ${isLeftActionPosition ? `0px` : `5px`};
        border-bottom-right-radius: ${isLeftActionPosition ? `0px` : `5px`};
        background-color: ${isDragging || isHover ? `lightgray` : `whitesmoke`};
      }
    `
  }}
`

const DYNAMIC_DATA_WIDTH = 200

const StyledDynamicData = styled.div<{
  actionsPosition: PageActionPosition
  $editorScaledFactor: number
}>`
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ actionsPosition }) => {
    const isLeftActionPosition: boolean =
      actionsPosition === PageActionPosition.LEFT
    return `
      justify-content: ${isLeftActionPosition ? `flex-start` : `flex-end`};
      ${
        isLeftActionPosition
          ? `left: -${DYNAMIC_DATA_WIDTH + 5}px;`
          : `right: -${DYNAMIC_DATA_WIDTH + 5}px;`
      }
      };
    `
  }}
`

const StyledContent = styled.div<IStyledContent>`
  z-index: 3;
  flex: 1;
  display: flex;
  justify-content: center;

  ${({ $alignment, $isFocused, $isFlexStart }) => `
    ${$isFlexStart ? `align-items: flex-start;` : 'align-items: center;'}
    ${$isFocused ? 'z-index: 4;' : ''}
    ${
      $alignment
        ? `
      justify-content: ${CardProductHelper.getJustifyContentStyleByAlignment(
        $alignment,
      )}
    `
        : ''
    }
  `}
`

const StyledDragIconContainer = styled.div<IStyledDragIconContainer>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  transition: background 100ms, opacity 300ms;

  ${({ isFocused, $isDragContainerHighlighted }: IStyledDragIconContainer) => {
    return `
      background-color: ${
        isFocused || $isDragContainerHighlighted
          ? `${COLOR.CORE_PURPLE_60}`
          : `whitesmoke`
      };
    `
  }}
`

const StyledScaledContentContainer = styled.div`
  transition: all 300ms;
  z-index: 5;
`

export const ContentRow = ({
  isPhotobookTitlePageLayout,
  isEnablePhotobookEdit,
  isFocused,
  dynamicDataId,
  onFocus,
  focusedRowId,
  product,
  pageIndex,
  pageMargins,
  width,
  height,
  id,
  onChange,
  onChangeLayoutClick,
  onChangeFrameBackgroundClick,
  onToggleTextClick,
  onToggleFadeImageClick,
  onTransparencyChange,
  isTextEnabled,
  onFullWidthClick,
  onDelete,
  onDragDisabled,
  index,
  actionsPosition,
  displayMode,
  boundaries,
  productTheme,
  type,
  data,
  onCancel,
  onToggleImageBorderClick,
  onChangeDividerClick,
  onChangeIconClick,
  onBlur,
  onChangeImageClick,
  onEditImageClick,
  onEnhanceImageClick,
  onBgRemoverClick,
  focusColumnIndex,
  setFocusColumnIndex,
  onDuplicate,
  onFrameContentItemClick,
  onFrameContentItemChange,
  selectedFrameContentItemId,
  provided,
  snapshot,
  editorScaledFactor,
  containerRef,
  onChangeAlignment,
  onAssignDynamicData,
  isDragContainerHighlighted = false,
  onFrameSizeChange,
  maxPhotoSize,
}: IContentRowProps) => {
  const pm = pageMargins as Array<number>
  // @ts-ignore
  const originalRowHeight = data?.height ?? 0
  // @ts-ignore
  const originalRowWidth = data?.width ?? 0
  // @ts-ignore
  const originalMargin = data?.margin ?? 0
  const scaledRowHeight = CardProductHelper.calculateContentItemTotalHeight(
    originalRowHeight + (type === CardProductContentItemType.FRAME ? 4 : 0), // if frame add 4px (.25rem)
    originalMargin,
    editorScaledFactor ?? 1,
  )
  const scaledRowWidth = originalRowWidth * editorScaledFactor

  const [rowState, setRowState] = useState({
    hover: false,
    contentStyle: {
      paddingRight: pm[2] * editorScaledFactor || pm[0] * editorScaledFactor,
      paddingLeft: pm[0] * editorScaledFactor,
    },
  })
  const isPreview =
    displayMode !== CardProductViewDisplayMode.EDIT &&
    displayMode !== CardProductViewDisplayMode.TEMPLATE
  const handleMouseEnter = () => {
    if (isPreview) {
      return
    }
    setRowState({ ...rowState, hover: true })
  }

  const handleMouseLeave = () => {
    if (isPreview) {
      return
    }
    setRowState({ ...rowState, hover: false })
  }

  useEffect(() => {
    setRowState({ ...rowState, hover: false })
  }, [
    // @ts-ignore
    data?.rowStyle,
  ])

  useEffect(() => {
    setRowState({
      ...rowState,
      contentStyle: {
        paddingRight: pm[2] * editorScaledFactor || pm[0] * editorScaledFactor,
        paddingLeft: pm[0] * editorScaledFactor,
      },
    })
  }, [editorScaledFactor])

  const isMeasuring = !height
  const dragHandlePosition = actionsPosition === 'LEFT' ? 'left' : 'right'

  const isPhotobook = product === EulogiseProduct.PHOTOBOOK

  // @ts-ignore
  const $alignment = isPhotobook ? undefined : data?.alignment

  const transformOriginAlignmentType: AlignmentType | AlignmentTypeText =
    $alignment ?? AlignmentType.CENTER

  const containerStyle = {
    ...provided?.draggableProps?.style,
    width:
      snapshot.isDragging && width ? width * editorScaledFactor : undefined,
    height: snapshot.isDragging && height ? scaledRowHeight : undefined,
    opacity: isMeasuring ? 0 : 1,
  }

  return (
    <StyledContentRowContainer
      {...provided.draggableProps}
      ref={provided.innerRef}
      key={id}
      onMouseDown={(ev) => {
        onBlur()
      }}
      onClick={(ev) => {
        if (isPreview) {
          return
        }
        ev.preventDefault()
        ev.stopPropagation()
        onFocus(type)
      }}
      style={containerStyle}
      isDragging={snapshot.isDragging}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...provided.dragHandleProps}
    >
      {displayMode === CardProductViewDisplayMode.EDIT &&
        (isEnablePhotobookEdit || product !== EulogiseProduct.PHOTOBOOK) && (
          <StyledDragContainer
            {...provided.dragHandleProps}
            isPreview={isPreview}
            actionsPosition={actionsPosition}
            ref={provided.innerRef}
            $editorScaledFactor={editorScaledFactor}
          >
            <Tooltip
              // @ts-ignore
              placement={dragHandlePosition}
              title="Drag to move this element"
            >
              <StyledDragIconContainer
                isFocused={isFocused!}
                $isDragContainerHighlighted={isDragContainerHighlighted}
                onClick={(ev) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  onFocus(type)
                }}
              >
                <DragIcon />
              </StyledDragIconContainer>
            </Tooltip>
          </StyledDragContainer>
        )}

      {displayMode === CardProductViewDisplayMode.TEMPLATE &&
        (type === CardProductContentItemType.TEXT ||
          // Don't support Image tag for now
          // type === CardProductContentItemType.IMAGE ||
          // dynamic data assignment only available for frame that contains a single image
          (type === CardProductContentItemType.FRAME &&
            CardProductFrameHelper.getNoOfPhotosInFrameLayout(
              // @ts-ignore
              data.content as unknown as ICardProductFrameLayout,
            ) === 1)) && (
          <StyledDynamicData
            actionsPosition={actionsPosition}
            $editorScaledFactor={editorScaledFactor}
          >
            <DynamicDataSelector
              width={DYNAMIC_DATA_WIDTH}
              type={type}
              onSelect={(value) => {
                if (onAssignDynamicData) {
                  onAssignDynamicData({
                    rowId: id,
                    dynamicDataId: value as CardProductDynamicDataKey,
                  })
                }
              }}
              isRowHovered={rowState.hover}
              value={dynamicDataId}
            />
          </StyledDynamicData>
        )}

      <StyledContent
        $isFocused={!!isFocused}
        // @ts-ignore
        $alignment={$alignment}
        style={{
          height: `${scaledRowHeight < 0 ? 0 : scaledRowHeight}px`,
          width: `${scaledRowWidth}px`,
          ...rowState.contentStyle,
        }}
      >
        <StyledScaledContentContainer
          style={{
            transform: `scale(${editorScaledFactor})`,
            transformOrigin: `center ${transformOriginAlignmentType}`,
          }}
        >
          <ContentItem
            product={product}
            maxPhotoSize={maxPhotoSize}
            isPhotobookTitlePageLayout={isPhotobookTitlePageLayout}
            isEnablePhotobookEdit={isEnablePhotobookEdit}
            isFocused={isFocused}
            onFocus={(...args) => {
              onFocus.apply(null, args)
            }}
            onDragDisabled={(disabled) => {
              if (onDragDisabled) {
                onDragDisabled(disabled)
              }
            }}
            type={type}
            data={data}
            onToggleImageBorderClick={({ columnIndex, filestackHandle }) =>
              onToggleImageBorderClick({
                filestackHandle,
                columnIndex,
                rowId: id,
                pageIndex,
                product,
              })
            }
            onToggleFadeImageClick={({ filestackHandle }) => {
              onToggleFadeImageClick({
                filestackHandle,
                rowId: id,
                pageIndex,
                product,
              })
            }}
            onTransparencyChange={
              onTransparencyChange
                ? ({ opacity }) => {
                    onTransparencyChange({
                      opacity,
                      rowId: id,
                      pageIndex,
                      product,
                    })
                  }
                : undefined
            }
            onChangeLayoutClick={onChangeLayoutClick}
            onToggleTextClick={onToggleTextClick}
            isTextEnabled={isTextEnabled}
            onChangeFrameBackgroundClick={onChangeFrameBackgroundClick}
            onFullWidthClick={onFullWidthClick}
            onChangeIconClick={() => {
              if (onChangeIconClick) {
                const icon = (data as ICardProductIconRowData).icon
                if (!icon) {
                  throw new Error('icon is not defined')
                }
                const { icon: iconName, color } = icon
                onChangeIconClick({ rowId: id, color, iconName })
              }
            }}
            onChangeDividerClick={() => {
              if (onChangeDividerClick) {
                const divider = (data as ICardProductSpaceRowData).divider
                const {
                  asset: { id: dividerName },
                  color,
                } = divider ?? { asset: {}, color: COLOR.BLACK }
                onChangeDividerClick({
                  rowId: id,
                  color: color!,
                  dividerName: dividerName as ICardProductDividerName,
                })
              }
            }}
            onChangeImageClick={({ columnIndex, filestackHandle }) =>
              onChangeImageClick({
                columnIndex,
                filestackHandle,
                product,
                pageIndex,
                rowId: id,
              })
            }
            onFrameContentItemClick={onFrameContentItemClick}
            onFrameContentItemChange={onFrameContentItemChange}
            selectedFrameContentItemId={selectedFrameContentItemId}
            onEditImageClick={({ columnIndex, filestackHandle }) => {
              onEditImageClick({
                columnIndex,
                filestackHandle,
                product,
                pageIndex,
                rowId: id,
              })
            }}
            onEnhanceImageClick={
              onEnhanceImageClick
                ? ({ columnIndex, filestackHandle }) =>
                    onEnhanceImageClick({
                      columnIndex,
                      filestackHandle,
                      product,
                      pageIndex,
                      rowId: id,
                    })
                : undefined
            }
            onBgRemoverClick={({ columnIndex, filestackHandle }) => {
              if (onBgRemoverClick) {
                onBgRemoverClick({
                  columnIndex,
                  filestackHandle,
                  product,
                  pageIndex,
                  rowId: id,
                })
              }
            }}
            isRowHovered={rowState.hover}
            hideActions={snapshot.isDragging}
            displayMode={displayMode}
            productTheme={productTheme}
            boundaries={boundaries}
            onCancel={onCancel}
            onChange={(
              data: ICardProductRowData,
              ev: IContentItemOnChangeEvent,
            ) => {
              onChange(data, id, ev)
            }}
            onDelete={() => onDelete(id)}
            focusColumnIndex={focusColumnIndex}
            setFocusColumnIndex={setFocusColumnIndex}
            onDuplicate={() => onDuplicate(id)}
            actionsPosition={actionsPosition}
            isAnyRowFocused={!!focusedRowId}
            editorScaledFactor={editorScaledFactor}
            containerRef={containerRef}
            onChangeAlignment={onChangeAlignment}
            onFrameSizeChange={onFrameSizeChange}
          />
        </StyledScaledContentContainer>
      </StyledContent>
    </StyledContentRowContainer>
  )
}
