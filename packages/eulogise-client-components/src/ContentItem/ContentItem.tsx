import React from 'react'
import {
  AlignmentType,
  CardProductContentItemType,
  CardProductViewDisplayMode,
  IBoundariesType,
  ICardProductFrameContentItem,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameRowData,
  ICardProductRowData,
  ICardProductTheme,
  IContentItemOnChangeEvent,
  PageActionPosition,
  EulogiseProduct,
  ICardProductTextRowData,
  ICardProductImageRowData,
  ICardProductSpaceRowData,
  ICardProductIconRowData,
  ICardProductColumnRowData,
  IPhotobookFrameSize,
  EulogiseImageSize,
} from '@eulogise/core'
import {
  ColumnsItem,
  IChangeImageEvent,
  IconItem,
  ImageItem,
  SpaceItem,
  TextItem,
} from './types'
import { FrameItem } from './types/FrameItem/FrameItem'

type IContentItemProps = {
  maxPhotoSize?: EulogiseImageSize
  onDragDisabled: (disabled: boolean) => void
  isEnablePhotobookEdit: boolean
  product: EulogiseProduct
  isFocused?: boolean
  onFocus: (type: CardProductContentItemType) => void
  type: CardProductContentItemType
  data: ICardProductRowData
  hideActions?: boolean
  boundaries: IBoundariesType
  displayMode?: CardProductViewDisplayMode
  isRowHovered?: boolean
  productTheme: ICardProductTheme
  onChange?: (
    rowData: ICardProductRowData,
    event: IContentItemOnChangeEvent,
  ) => void
  onCancel?: () => void
  onChangeIconClick?: () => void
  onChangeDividerClick?: () => void
  onChangeImageClick: (ev: IChangeImageEvent) => void
  onEditImageClick: (ev: IChangeImageEvent) => void
  onEnhanceImageClick?: (ev: IChangeImageEvent) => void
  onBgRemoverClick?: (ev: IChangeImageEvent) => void
  onDelete: () => void
  onChangeLayoutClick: (layoutId?: string) => void
  onChangeFrameBackgroundClick: () => void
  onToggleImageBorderClick: (ev: IChangeImageEvent) => void
  onToggleFadeImageClick: (ev: IChangeImageEvent) => void
  onTransparencyChange?: (ev: IChangeImageEvent & { opacity: number }) => void
  onToggleTextClick?: () => void
  isTextEnabled?: boolean
  onFullWidthClick: () => void
  focusColumnIndex: number
  setFocusColumnIndex: (colIndex: number) => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  onFrameContentItemClick: (
    frameContentItem: ICardProductFrameContentItem,
  ) => void
  onFrameContentItemChange: (
    event: ICardProductFrameImageChangeEvent,
    contentItem: ICardProductFrameContentItem,
  ) => void
  selectedFrameContentItemId?: string
  editorScaledFactor: number
  containerRef: any
  onChangeAlignment?: (alignment: AlignmentType) => void
  onFrameSizeChange?: (frameSize: IPhotobookFrameSize) => void
  isPhotobookTitlePageLayout: boolean
}

export const ContentItem = ({
  product,
  isFocused,
  isRowHovered,
  onFocus,
  onDragDisabled,
  type,
  data,
  hideActions,
  boundaries,
  displayMode,
  productTheme,
  onChange,
  onChangeIconClick,
  onChangeDividerClick,
  onChangeImageClick,
  onChangeLayoutClick,
  onChangeFrameBackgroundClick,
  onFullWidthClick,
  onEditImageClick,
  onEnhanceImageClick,
  onBgRemoverClick,
  onToggleImageBorderClick,
  onToggleTextClick,
  isTextEnabled,
  onDelete,
  focusColumnIndex,
  setFocusColumnIndex,
  onDuplicate,
  actionsPosition,
  isAnyRowFocused,
  onFrameContentItemClick,
  onToggleFadeImageClick,
  onTransparencyChange,
  onFrameContentItemChange,
  selectedFrameContentItemId,
  editorScaledFactor = 1,
  containerRef,
  onChangeAlignment,
  onFrameSizeChange,
  isPhotobookTitlePageLayout,
  isEnablePhotobookEdit,
  maxPhotoSize,
}: IContentItemProps) => {
  switch (type) {
    case CardProductContentItemType.FRAME:
      return (
        <FrameItem
          maxPhotoSize={maxPhotoSize}
          isEnablePhotobookEdit={isEnablePhotobookEdit}
          isPhotobookTitlePageLayout={isPhotobookTitlePageLayout}
          product={product}
          onDragDisabled={onDragDisabled}
          isFocused={isFocused}
          onDelete={onDelete}
          onChangeLayoutClick={onChangeLayoutClick}
          onChangeFrameBackgroundClick={onChangeFrameBackgroundClick}
          actionsPosition={actionsPosition}
          onFocus={() => onFocus(CardProductContentItemType.IMAGE)}
          displayMode={displayMode}
          onChange={onChange!}
          boundaries={boundaries}
          isRowHovered={isRowHovered}
          isAnyRowFocused={isAnyRowFocused}
          data={data as ICardProductFrameRowData}
          onContentItemClick={onFrameContentItemClick}
          onContentItemChange={onFrameContentItemChange}
          onFullWidthClick={onFullWidthClick}
          onDuplicate={onDuplicate}
          selectedContentItemId={selectedFrameContentItemId}
          containerRef={containerRef}
          alignment={
            (data as ICardProductFrameRowData).alignment ?? AlignmentType.CENTER
          }
          onChangeAlignment={onChangeAlignment ? onChangeAlignment : () => {}}
          onEditImage={onEditImageClick}
          onEnhanceImage={onEnhanceImageClick}
          onBgRemover={onBgRemoverClick}
          onToggleBorder={onToggleImageBorderClick}
          onToggleFadeImage={onToggleFadeImageClick}
          onTransparencyChange={onTransparencyChange}
          onToggleText={onToggleTextClick}
          isTextEnabled={isTextEnabled}
          onFrameSizeChange={onFrameSizeChange}
        />
      )
    case CardProductContentItemType.TEXT:
      return (
        <TextItem
          isEnablePhotobookEdit={isEnablePhotobookEdit}
          isPhotobookTitlePageLayout={isPhotobookTitlePageLayout}
          onDragDisabled={onDragDisabled}
          isFocused={isFocused}
          onFocus={() => onFocus(CardProductContentItemType.TEXT)}
          data={data as ICardProductTextRowData}
          product={product}
          productTheme={productTheme}
          hideActions={hideActions!}
          displayMode={displayMode}
          onChange={onChange!}
          boundaries={boundaries}
          onDelete={onDelete}
          isRowHovered={isRowHovered}
          onDuplicate={onDuplicate}
          actionsPosition={actionsPosition}
          isAnyRowFocused={isAnyRowFocused}
          editorScaledFactor={editorScaledFactor}
        />
      )
    case CardProductContentItemType.IMAGE:
      return (
        <ImageItem
          product={product}
          onDragDisabled={onDragDisabled}
          isFocused={isFocused}
          onChangeLayout={() => onChangeLayoutClick()}
          onFocus={() => onFocus(CardProductContentItemType.IMAGE)}
          onChangeImage={onChangeImageClick}
          onEditImage={onEditImageClick}
          onEnhanceImage={onEnhanceImageClick}
          onBgRemover={onBgRemoverClick}
          onToggleBorder={onToggleImageBorderClick}
          onToggleFadeImage={onToggleFadeImageClick}
          onTransparencyChange={onTransparencyChange}
          data={data as ICardProductImageRowData}
          hideActions={hideActions}
          displayMode={displayMode}
          onChange={onChange}
          boundaries={boundaries}
          onDelete={onDelete}
          isRowHovered={isRowHovered}
          productTheme={productTheme}
          onDuplicate={onDuplicate}
          actionsPosition={actionsPosition}
          isAnyRowFocused={isAnyRowFocused}
          imageColumnIndex={0}
        />
      )
    case CardProductContentItemType.SPACE: {
      return (
        <SpaceItem
          onDragDisabled={onDragDisabled}
          isEnablePhotobookEdit={isEnablePhotobookEdit}
          isFocused={isFocused!}
          onFocus={() => onFocus(CardProductContentItemType.SPACE)}
          data={data as ICardProductSpaceRowData}
          hideActions={hideActions}
          displayMode={displayMode!}
          onChange={onChange}
          onChangeDividerClick={onChangeDividerClick}
          boundaries={boundaries}
          onDelete={onDelete}
          isRowHovered={isRowHovered}
          onDuplicate={onDuplicate}
          actionsPosition={actionsPosition}
          isAnyRowFocused={isAnyRowFocused}
          product={product}
        />
      )
    }
    case CardProductContentItemType.ICON: {
      return (
        <IconItem
          onDragDisabled={onDragDisabled}
          isPhotobookTitlePageLayout={isPhotobookTitlePageLayout}
          isFocused={isFocused!}
          onFocus={() => onFocus(CardProductContentItemType.ICON)}
          data={data as ICardProductIconRowData}
          hideActions={hideActions}
          displayMode={displayMode!}
          onChange={onChange}
          alignment={
            (data as ICardProductIconRowData).alignment ?? AlignmentType.CENTER
          }
          onChangeAlignment={onChangeAlignment ? onChangeAlignment : () => {}}
          onChangeIconClick={() => {
            if (onChangeIconClick) {
              onChangeIconClick()
            }
          }}
          boundaries={boundaries}
          onDelete={onDelete}
          isRowHovered={isRowHovered}
          onDuplicate={onDuplicate}
          actionsPosition={actionsPosition}
          isAnyRowFocused={isAnyRowFocused}
        />
      )
    }
    case CardProductContentItemType.COLUMNS:
      return (
        <ColumnsItem
          isFocused={isFocused}
          onDragDisabled={onDragDisabled}
          onFocus={() => onFocus(CardProductContentItemType.COLUMNS)}
          data={data as ICardProductColumnRowData}
          onChangeImage={onChangeImageClick}
          onEditImage={onEditImageClick}
          hideActions={hideActions!}
          productTheme={productTheme}
          displayMode={displayMode!}
          boundaries={boundaries}
          onChange={onChange!}
          onDelete={onDelete}
          isRowHovered={isRowHovered}
          focusColumnIndex={focusColumnIndex}
          setFocusColumnIndex={setFocusColumnIndex}
          onDuplicate={onDuplicate}
          actionsPosition={actionsPosition}
          isAnyRowFocused={isAnyRowFocused}
        />
      )
    default:
      console.warn(`Did not recognize ${type} content type`)
      return null
  }
}
