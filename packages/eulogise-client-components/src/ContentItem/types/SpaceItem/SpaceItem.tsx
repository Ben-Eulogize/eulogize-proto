import React from 'react'
import { createPortal } from 'react-dom'
import {
  IBoundariesType,
  CardProductViewDisplayMode,
  PageActionPosition,
  IContentItemOnChangeEvent,
  ICardProductSpaceRowData,
  GetImageObject,
  ICardProductDividerName,
  EulogiseProduct,
} from '@eulogise/core'
import { useState } from 'react'
import { ResizeWrapper } from '../../ResizeWrapper'
// @ts-ignore
import Measure from 'react-measure'
import styled from 'styled-components'
import { SpaceItemActionBar } from './SpaceItemActionBar'
import { ImageHelper } from '@eulogise/helpers'
import { DividerAsset } from '../../../DividerAsset/DividerAsset'

const { getImageUrl } = ImageHelper

interface ISpaceItemProps {
  isEnablePhotobookEdit: boolean
  data?: ICardProductSpaceRowData
  hideActions?: boolean
  boundaries?: IBoundariesType
  displayMode?: CardProductViewDisplayMode
  onChangeDividerClick?: () => void
  onChange?: (
    rowData: ICardProductSpaceRowData,
    events: IContentItemOnChangeEvent,
  ) => any
  selectModalTitle?: string
  onDelete: () => void
  isFocused: boolean
  onFocus: () => void
  isRowHovered?: boolean
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  product: EulogiseProduct
  onDragDisabled: (disabled: boolean) => void
}

interface IClientDataObj {
  width: number
  height: number
}

const StyledSpace = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100%;
  }
`

const StyledDividerImage = styled.img`
  max-width: 100%;
`

export const SpaceItem = ({
  data,
  isEnablePhotobookEdit,
  hideActions,
  displayMode,
  onChange,
  boundaries,
  onDelete,
  onChangeDividerClick,
  isFocused,
  onFocus,
  isRowHovered,
  onDuplicate,
  actionsPosition,
  isAnyRowFocused,
  product,
  onDragDisabled,
}: ISpaceItemProps) => {
  const [, setResizing] = useState<boolean>(false)
  const { width: boundariesWidth, height: boundariesHeight } = boundaries!
  const { height, divider } = data!

  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  return (
    <>
      <ResizeWrapper
        borderWidth={isPhotobook ? 0 : undefined}
        width={boundariesWidth}
        height={height!}
        onResizeHandleHover={(hover: boolean) => {
          onDragDisabled(hover)
        }}
        isFocused={isFocused}
        onFocus={onFocus}
        isAnyRowFocused={isAnyRowFocused}
        onResizeStart={() => setResizing(true)}
        onResizeEnd={({ height }) => {
          if (onChange) {
            // Only call onChange if height actually changed
            if (height !== data?.height) {
              onChange(
                {
                  ...data,
                  height,
                },
                { event: 'resize' },
              )
            }
          }

          setResizing(false)
        }}
        onResize={({ width, height }) => {
          if (!onChange) return
          onChange(
            {
              ...data,
              height,
            },
            { event: 'resize-no-recording' },
          )
        }}
        minWidth={boundariesWidth}
        maxWidth={boundariesWidth}
        maxHeight={boundariesHeight}
        lockAspectRatio={false}
        disabled={
          displayMode !== CardProductViewDisplayMode.EDIT ||
          (!isEnablePhotobookEdit && isPhotobook)
        }
        isParentHovered={isRowHovered}
      >
        <StyledSpace>
          {divider && (
            <Measure
              client
              onResize={({ client }: { client: IClientDataObj }) => {
                const { width, height } = client
                if (divider.width !== width || divider.height !== height) {
                  if (onChange) {
                    onChange(
                      {
                        ...data,
                        divider: {
                          ...divider,
                          width,
                          height,
                        },
                      },
                      { event: 'resize' },
                    )
                  }
                }
              }}
            >
              {({ measureRef }: { measureRef: any }) =>
                divider?.asset?.id && typeof divider?.asset?.id === 'string' ? (
                  <DividerAsset
                    name={divider?.asset?.id as ICardProductDividerName}
                    style={{
                      fill: divider.color,
                      stroke: divider.color,
                    }}
                  />
                ) : divider?.asset?.filepath ? (
                  <StyledDividerImage
                    ref={measureRef}
                    src={getImageUrl(divider?.asset as GetImageObject)}
                    alt=""
                    style={{
                      width: divider?.width || 'auto',
                    }}
                  />
                ) : null
              }
            </Measure>
          )}
        </StyledSpace>
      </ResizeWrapper>

      {displayMode === CardProductViewDisplayMode.EDIT &&
        isFocused &&
        (isEnablePhotobookEdit || !isPhotobook) &&
        (() => {
          const portalTarget = document.getElementById(
            'editor-toolbar-sticky-target',
          )
          return portalTarget
            ? createPortal(
                <SpaceItemActionBar
                  onChangeImage={() => {
                    if (onChangeDividerClick) {
                      onChangeDividerClick()
                    }
                  }}
                  onColorSelect={(color: string) => {
                    if (onChange) {
                      onChange(
                        {
                          ...data,
                          // @ts-ignore
                          divider: {
                            ...divider,
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
