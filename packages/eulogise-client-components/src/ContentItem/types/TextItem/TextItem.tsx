import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AlignmentType,
  CardProductViewDisplayMode,
  EulogiseProduct,
  IBoundariesType,
  ICardProductTextRowData,
  ICardProductTheme,
  IContentItemOnChangeEvent,
  IResourceRowContent,
  PageActionPosition,
  TEXT_EDITOR_COLOR_STYLE_MAP,
} from '@eulogise/core'
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js'
import { CardProductHelper } from '@eulogise/helpers'
// @ts-ignore
import Measure from 'react-measure'
import styled from 'styled-components'
import { Tooltip } from '../../../Tooltip'
import { ResizeWrapper } from '../../ResizeWrapper'
import { TextItemActionBar } from './TextItemActionBar'
import { EditorToolbar } from '../../../EditorToolbar'

interface ITextItemProps {
  isEnablePhotobookEdit: boolean
  isPhotobookTitlePageLayout: boolean
  data?: ICardProductTextRowData
  product: EulogiseProduct
  hideActions: boolean
  boundaries?: IBoundariesType
  displayMode?: CardProductViewDisplayMode
  productTheme: ICardProductTheme
  onChange: (
    rowData: ICardProductTextRowData,
    ev?: IContentItemOnChangeEvent,
  ) => any
  onDelete: () => void
  isFocused?: boolean
  onFocus: () => void
  isRowHovered?: boolean
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  editorScaledFactor: number
  onDragDisabled: (disabled: boolean) => void
}

const StyledContainer = styled.div`
  position: relative;
  line-height: 1.4;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: inherit;
    font-weight: inherit;
    margin: 0;
    font-size: inherit;
  }
`

const StyledTextItemContainer = styled.div``

const StyledTextItem = styled.div<{
  letterSpacing: number
  $maxHeight?: number
}>`
  ${({ letterSpacing, $maxHeight }) =>
    `
      ${letterSpacing > 0 ? `letter-spacing: ${letterSpacing}px;` : ''}
      ${
        $maxHeight && $maxHeight > 0
          ? `max-height: ${$maxHeight}px; overflow: hidden;`
          : ''
      }
    `}
`

const StyledResizeWrapper = styled(ResizeWrapper)<{
  $isFlexStart: boolean
  $isNonPhotobookTitlePage: boolean
}>`
  ${({ $isFlexStart, isFocused, $isNonPhotobookTitlePage }) =>
    `${$isFlexStart ? `align-items: flex-start !important;` : ''}
    ${$isNonPhotobookTitlePage && isFocused ? `overflow: hidden;` : ''}
  `}
`

export const TextItem = ({
  isPhotobookTitlePageLayout,
  data,
  product,
  productTheme,
  hideActions,
  displayMode,
  onChange,
  boundaries,
  onDelete,
  isFocused,
  onFocus,
  isRowHovered,
  onDuplicate,
  actionsPosition,
  isAnyRowFocused,
  editorScaledFactor,
  isEnablePhotobookEdit,
  onDragDisabled,
}: ITextItemProps) => {
  const isAutoFitHeight = isPhotobookTitlePageLayout
  const {
    margin,
    height: rowHeight,
    width,
    content: { blocks },
  }: ICardProductTextRowData = data!
  const { defaultStyle, styles } = productTheme
  const letterSpacing = data?.rowStyle?.letterSpacing ?? 0
  const editorEl = useRef(null)
  const previousFocusPos = useRef<{ key: string; offset: number }>(null)
  const [textStateData, setTextStateData] = useState<any>()
  const totalHeight = CardProductHelper.calculateContentItemTotalHeight(
    rowHeight!,
    margin!,
  )

  const blockType = blocks[0]?.type
  const styleDef = {
    ...defaultStyle,
    ...(styles[blockType] || {}),
  }

  const [minRowHeight, setMinRowHeight] = useState<number>(
    rowHeight! - styleDef.fontSize!,
  )
  const containerStyle = CardProductHelper.styleDefToStyle(
    {
      ...defaultStyle,
      ...(styles[blockType] || {}),
      font: CardProductHelper.getTextItemFont({
        productTheme,
        blockType,
      }),
      width,
      margin,
    },
    {
      excludeMargin: true,
    },
  )
  const autoFitHeightPadding = rowHeight! - data?.rowStyle?.fontSize!

  const convertedContent = convertFromRaw(data?.content as any)

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(convertedContent),
  )
  const [editing, setEditing] = useState<boolean>(false)
  const [, setResizing] = useState<boolean>(false)

  useEffect(() => {
    const newEditorState = EditorState.createWithContent(
      convertFromRaw(data?.content as any),
    )

    // restore the previous cursor position
    if (editorEl?.current && previousFocusPos?.current) {
      //@ts-ignore
      const newSelection = newEditorState.getSelection().merge({
        focusKey: previousFocusPos.current.key,
        focusOffset: previousFocusPos.current.offset,
        anchorKey: previousFocusPos.current.key,
        anchorOffset: previousFocusPos.current.offset,
        hasFocus: true,
      })

      const newEditorStateWithSelection = EditorState.acceptSelection(
        newEditorState,
        newSelection,
      )

      setEditorState(newEditorStateWithSelection)

      // clear the previous cursor
      //@ts-ignore
      previousFocusPos.current = null
    } else {
      setEditorState(newEditorState)
    }
  }, [data?.content, data?.rowStyle?.fontSize])

  // Sync textStateData when rowStyle changes externally (e.g., dimension change)
  // to prevent stale cached values from overriding new data in onEditorChange
  useEffect(() => {
    setTextStateData((prev: any) => {
      if (!prev) return prev
      return {
        ...prev,
        height: data?.height,
        width: data?.width,
        rowStyle: {
          ...prev.rowStyle,
          ...data?.rowStyle,
        },
      }
    })
  }, [data?.rowStyle?.fontSize])

  useEffect(() => {
    // step 1: calculate the new size editorEl.current.editor.clientHeight
    const newHeight = isPhotobookButNotTitlePage
      ? rowHeight
      : (editorEl.current as any)?.editor?.clientHeight
    // step 2: compare the new height (from step 1) vs the old height (from the props)
    // update if new height is larger (use onChange prop)
    if (
      (newHeight && newHeight > rowHeight!) ||
      (isAutoFitHeight && newHeight && newHeight < rowHeight!)
    ) {
      if (editorState.getSelection().getHasFocus()) {
        // remember the current focus position before updating state
        // @ts-ignore
        previousFocusPos.current = {
          key: editorState.getSelection().getFocusKey(),
          offset: editorState.getSelection().getFocusOffset(),
        }
      }

      // @ts-ignore
      onChange({
        // add textStateData to fix blank page issue after removing blocks with backspace
        // https://trello.com/c/lf3I344U/1629-production-issue-blank-page-after-removing-row-with-backspace
        ...data,
        ...textStateData,
        height: newHeight,
      })
    }
  }, [textStateData])

  const onEditorChange = (
    editorState: EditorState,
    dataUpdates?: ICardProductTextRowData,
  ) => {
    const contentState = convertToRaw(editorState.getCurrentContent())
    setEditorState(editorState)
    let newData: ICardProductTextRowData = {
      ...data,
      // add textStateData to fix blank page issue after removing blocks with backspace
      // https://trello.com/c/lf3I344U/1629-production-issue-blank-page-after-removing-row-with-backspace
      ...textStateData,
      // depreciated
      ...dataUpdates,
      content: contentState as IResourceRowContent,
    }
    newData = {
      ...newData,
      // for photobook only
      height: isAutoFitHeight
        ? newData.height! + autoFitHeightPadding
        : newData.height,
    }
    // This is to trigger the Editor to change, use setTimeout to make sure the order always be blur first then re-focus
    if (dataUpdates) {
      setTimeout(() => {
        // @ts-ignore
        editorEl?.current?.blur()
        setTimeout(() => {
          // @ts-ignore
          editorEl?.current?.focus()
        }, 1)
      }, 1)
    }

    setTextStateData(newData)
  }

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onEditorChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const focus = () => {
    // @ts-ignore
    editorEl?.current?.focus()
  }

  const isPhotobook = product === EulogiseProduct.PHOTOBOOK

  const maxWidth = boundaries?.width
  const isPhotobookButNotTitlePage = isPhotobook && !isPhotobookTitlePageLayout
  return (
    <StyledTextItemContainer>
      <StyledTextItem
        letterSpacing={letterSpacing}
        $maxHeight={
          isPhotobookButNotTitlePage && !isFocused ? rowHeight : undefined
        }
      >
        <StyledResizeWrapper
          $isFlexStart={isPhotobookButNotTitlePage}
          $isNonPhotobookTitlePage={isPhotobookButNotTitlePage}
          isFocused={isFocused!}
          onFocus={onFocus}
          isAnyRowFocused={isAnyRowFocused}
          width={width!}
          height={totalHeight}
          onResizeHandleHover={(hover: boolean) => {
            onDragDisabled(hover)
          }}
          onResizeStart={() => setResizing(true)}
          onResizeEnd={({ width, height }) => {
            if (!data?.width || !data?.height) {
            } else {
              onChange(
                {
                  ...data,
                  margin: [
                    (height - data.height) / 2,
                    (width - data.width) / 2,
                  ],
                },
                { event: 'resize' },
              )
            }
            setResizing(false)
          }}
          onResize={({ width, height }) => {
            if (!data?.width || !data?.height) {
            } else {
              const newWidth = maxWidth
                ? width > maxWidth
                  ? maxWidth
                  : width
                : width

              onChange(
                {
                  ...data,
                  width: newWidth,
                  height,
                  margin: [
                    (height - data.height) / 2,
                    (newWidth - data.width) / 2,
                  ],
                },
                { event: 'resize-no-recording' },
              )
            }
          }}
          isParentHovered={isRowHovered}
          minWidth={width}
          minHeight={
            isPhotobookButNotTitlePage
              ? rowHeight
              : displayMode !== CardProductViewDisplayMode.PRINT
              ? minRowHeight
              : undefined
          }
          maxWidth={maxWidth}
          maxHeight={
            isPhotobookButNotTitlePage ? rowHeight : boundaries?.height
          }
          disabled={
            displayMode !== CardProductViewDisplayMode.EDIT ||
            (!isEnablePhotobookEdit && isPhotobook)
          }
          lockAspectRatio={false}
        >
          <Tooltip
            title="Click to edit"
            visible={editing === true ? false : isRowHovered}
          >
            <StyledContainer style={containerStyle} onClick={focus}>
              <Measure
                client
                onResize={(props: any) => {
                  const { client } = props
                  setMinRowHeight(client.height)
                  onChange(
                    {
                      ...data,
                      height: client.height,
                    } as ICardProductTextRowData,
                    {
                      event: 'measure-resize',
                    },
                  )
                }}
              >
                {({ measureRef }: { measureRef: any }) => (
                  <div
                    className="measure-ref"
                    ref={measureRef}
                    onMouseEnter={() => {
                      onDragDisabled(true)
                    }}
                    onMouseOver={(ev) => {
                      ev.stopPropagation()
                      onDragDisabled(true)
                    }}
                    onMouseMove={(ev) => {
                      // to prevent the drag event interfering selecting the cursor inside the editor
                      ev.stopPropagation()
                    }}
                    onMouseLeave={() => {
                      onDragDisabled(false)
                    }}
                  >
                    <Editor
                      customStyleMap={TEXT_EDITOR_COLOR_STYLE_MAP}
                      editorState={editorState}
                      onChange={onEditorChange}
                      onFocus={() => setEditing(true)}
                      onBlur={() => {
                        setEditing(false)
                        const editorElCurrent = editorEl.current as any
                        const editorHeight =
                          editorElCurrent?.editor?.clientHeight

                        onChange({
                          ...textStateData,
                          height: isPhotobookButNotTitlePage
                            ? rowHeight
                            : editorHeight > rowHeight!
                            ? editorHeight
                            : rowHeight,
                        })
                      }}
                      handleKeyCommand={handleKeyCommand}
                      ref={editorEl}
                      placeholder={
                        displayMode === CardProductViewDisplayMode.EDIT
                          ? 'Add your text'
                          : ''
                      }
                      textAlignment={data?.alignment}
                      // @ts-ignore
                      blockRenderMap={CardProductHelper.getBlockRenderMap(
                        productTheme,
                        data?.rowStyle!,
                      )}
                      readOnly={displayMode !== CardProductViewDisplayMode.EDIT}
                    />
                  </div>
                )}
              </Measure>
            </StyledContainer>
          </Tooltip>
        </StyledResizeWrapper>

        {displayMode === CardProductViewDisplayMode.EDIT &&
          isFocused &&
          !hideActions &&
          (() => {
            const portalTarget = document.getElementById(
              'editor-toolbar-sticky-target',
            )
            return portalTarget
              ? createPortal(
                  <>
                    <EditorToolbar
                      maxFontSize={
                        isPhotobook && !isPhotobookTitlePageLayout
                          ? 30
                          : undefined
                      }
                      editorState={editorState}
                      productTheme={productTheme}
                      activeAlignmentType={
                        (data?.alignment || AlignmentType.LEFT) as AlignmentType
                      }
                      onChange={onEditorChange}
                      rowStyle={data?.rowStyle}
                      letterSpacing={letterSpacing}
                      editing={true}
                    />
                    {(isEnablePhotobookEdit || !isPhotobook) && (
                      <TextItemActionBar
                        onDelete={onDelete}
                        onDuplicate={onDuplicate}
                        actionsPosition={actionsPosition}
                        isPortaled
                      />
                    )}
                  </>,
                  portalTarget,
                )
              : null
          })()}
      </StyledTextItem>
    </StyledTextItemContainer>
  )
}
