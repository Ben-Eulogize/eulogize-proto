import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
// @ts-ignore
import Measure from 'react-measure'
import {
  AlignmentType,
  CardProductViewDisplayMode,
  IBoundariesType,
  ICardProductIconRowData,
  IContentItemOnChangeEvent,
  PageActionPosition,
} from '@eulogise/core'
import { ResizeWrapper } from '../../ResizeWrapper'
import { IconItemActionBar } from './IconItemActionBar'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { IconAsset } from '../../../IconAsset/IconAsset'

type IIconItemProps = {
  data?: ICardProductIconRowData
  hideActions?: boolean
  boundaries?: IBoundariesType
  displayMode?: CardProductViewDisplayMode
  onChange?: (
    rowData: ICardProductIconRowData,
    events: IContentItemOnChangeEvent,
  ) => any
  selectModalTitle?: string
  onDelete: () => void
  onChangeIconClick: () => void
  onChangeAlignment: (alignment: AlignmentType) => void
  alignment: AlignmentType
  isFocused: boolean
  onFocus: () => void
  isRowHovered?: boolean
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  isPhotobookTitlePageLayout: boolean
  onDragDisabled: (disabled: boolean) => void
}

interface IClientDataObj {
  width: number
  height: number
}

const StyledIcon = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
`

const MIN_ICON_WIDTH = 50

export const IconItem = (props: IIconItemProps) => {
  const {
    data,
    onDelete,
    alignment,
    onChangeAlignment,
    onChangeIconClick,
    onDuplicate,
    actionsPosition,
    displayMode,
    onChange,
    boundaries,
    isFocused,
    onFocus,
    isRowHovered,
    isAnyRowFocused,
    isPhotobookTitlePageLayout,
    onDragDisabled,
  } = props

  const [, setResizing] = useState<boolean>(false)
  const { width: boundariesWidth, height: boundariesHeight } = boundaries!
  const {
    width = EulogiseClientConfig.CARD_PRODUCT_ICON_ITEM_DEFAULT_SIZE,
    height = EulogiseClientConfig.CARD_PRODUCT_ICON_ITEM_DEFAULT_SIZE,
    icon,
  } = data!

  return (
    <>
      <ResizeWrapper
        onResizeHandleHover={(hover: boolean) => {
          onDragDisabled(hover)
        }}
        width={width!}
        height={height!}
        isFocused={isFocused}
        onFocus={onFocus}
        isAnyRowFocused={isAnyRowFocused}
        onResizeStart={() => setResizing(true)}
        onResizeEnd={({ width, height }) => {
          if (onChange) {
            // Only trigger onChange if size actually changed
            if (width === data?.width && height === data?.height) {
              return
            }
            onChange(
              {
                ...data,
                height,
                width,
              },
              { event: 'resize' },
            )
          }

          setResizing(false)
        }}
        onResize={({ width, height }) => {
          if (!onChange) return
          onChange(
            {
              ...data,
              height,
              width,
            },
            { event: 'resize-no-recording' },
          )
        }}
        minWidth={MIN_ICON_WIDTH}
        maxWidth={boundariesWidth}
        maxHeight={boundariesHeight}
        lockAspectRatio
        disabled={displayMode !== CardProductViewDisplayMode.EDIT}
        isParentHovered={isRowHovered}
      >
        <StyledIcon>
          {icon && (
            <Measure
              client
              onResize={({ client }: { client: IClientDataObj }) => {
                const { width: clientWidth, height: clientHeight } = client
                if (width !== clientWidth || height !== clientHeight) {
                  if (onChange) {
                    onChange(
                      {
                        ...data,
                        width: clientWidth,
                        height: clientHeight,
                        icon: {
                          ...icon,
                        },
                      },
                      { event: 'resize' },
                    )
                  }
                }
              }}
            >
              {({ measureRef }: { measureRef: any }) =>
                icon?.icon && (
                  <IconAsset
                    ref={measureRef}
                    name={icon.icon}
                    style={{
                      fill: icon.color,
                      stroke: icon.color,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )
              }
            </Measure>
          )}
        </StyledIcon>
      </ResizeWrapper>

      {displayMode === CardProductViewDisplayMode.EDIT &&
        isFocused &&
        (() => {
          const portalTarget = document.getElementById(
            'editor-toolbar-sticky-target',
          )
          return portalTarget
            ? createPortal(
                <IconItemActionBar
                  isShowPhotobookTitlePageLayout={isPhotobookTitlePageLayout}
                  onChangeAlignment={onChangeAlignment}
                  alignment={alignment}
                  onChangeIcon={onChangeIconClick}
                  onColorSelect={(color: string) => {
                    if (onChange) {
                      onChange(
                        {
                          ...data,
                          // @ts-ignore
                          icon: {
                            ...icon,
                            color,
                          },
                        },
                        { event: 'color-change' },
                      )
                    }
                  }}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  actionsPosition={actionsPosition}
                  isPortaled
                />,
                portalTarget,
              )
            : null
        })()}
    </>
  )
}
