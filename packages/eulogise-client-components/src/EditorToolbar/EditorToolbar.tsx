import React, { useRef } from 'react'
import { RichUtils, EditorState, Modifier } from 'draft-js'

import {
  BOOKLET_EDITOR_COLORS,
  AlignmentType,
  IRowStyle,
  ICardProductTheme,
  InlineStyleValueEnum,
  ICardProductTextRowData,
} from '@eulogise/core'
import { ButtonGroup } from '../Button'
import styled from 'styled-components'
import { ButtonGroupProps } from 'antd/lib/button'
import { EditorAlignmentPanel } from './EditorAlignmentPanel'
import { EditorColorDropdown } from './EditorColorDropdown'
import { EditorInlineStylesButtons } from './EditorInlineStylesButtons'
import { EditorFontSizeDropdown } from './EditorFontSizeDropdown'
import { EditorFontDropdown } from './EditorFontDropdown'
import { CardProductHelper } from '@eulogise/helpers'
import { EditorLetterSpacingDropdown } from './EditorLetterSpacingDropdown'

// @ts-ignore
const StyledEditorToolbar = styled(ButtonGroup)<IStyledButtonGroupProps>`
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: opacity 200ms linear;
  pointer-events: auto;
  background: #fff;
  border-radius: 8px;
  border: none;
  padding: 2px;
  gap: 2px;
  ${({ $editing }: IStyledButtonGroupProps) =>
    $editing ? `opacity: 1;` : `pointer-events: none; opacity: 0;`}
  &&&& > * {
    border: 0;
    border-radius: 0;
    font-size: 1rem;
    transition: background 150ms ease;
    &:hover {
      opacity: 1;
    }
    &:first-child {
      border-radius: 6px 0 0 6px;
    }
    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }
  /* Lower specificity so active buttons' own hover styles win */
  > *:hover {
    background: #f5f5f5;
  }
`

interface IStyledButtonGroupProps extends ButtonGroupProps {
  $editing: boolean
  ref: any
}

export interface IEditorToolbarProps {
  style?: object
  activeAlignmentType?: AlignmentType
  productTheme?: ICardProductTheme
  editorState: EditorState
  rowStyle?: IRowStyle
  onChange: (editorState: EditorState, dataUpdates?: object) => any
  editing: boolean
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  className?: string
  editorScaledFactor?: number
  letterSpacing: number
  maxFontSize?: number
  isPortaled?: boolean
}

export interface IToggleAllProps {
  action: InlineStyleValueEnum
  textBlock: ICardProductTextRowData
}

export const EditorToolbar: React.FC<IEditorToolbarProps> = ({
  style,
  rowStyle,
  editorState,
  activeAlignmentType,
  getPopupContainer,
  onChange,
  productTheme,
  editing,
  className,
  letterSpacing = 0,
  maxFontSize,
  isPortaled = false,
}): JSX.Element => {
  if (!editorState) {
    return <></>
  }

  console.log(
    `1 - [Bugsnag diagnostic data] - EditorToolbar.tsx editorState, ${JSON.stringify(
      editorState,
    )}`,
  )

  const activeBlockType = RichUtils?.getCurrentBlockType(editorState)

  console.log(
    `2 - [Bugsnag diagnostic data] - EditorToolbar.tsx editorState`,
    'RichUtils?.getCurrentBlockType(editorState)',
    activeBlockType,
    'typeof activeBlockType',
    typeof activeBlockType,
  )
  const themeStyle = productTheme?.styles?.[activeBlockType]
  const defaultThemeStyle = productTheme?.defaultStyle
  const fontName = CardProductHelper.getTextItemFont({
    rowStyle,
    blockType: activeBlockType as string,
    productTheme: productTheme!,
  })
  // @ts-ignore
  const fontSize: number =
    rowStyle?.fontSize || themeStyle?.fontSize || defaultThemeStyle?.fontSize
  const editorRef = useRef()

  const currentStyle = editorState.getCurrentInlineStyle()

  const onFontChange = (fontName: string) => {
    onChange(editorState, {
      rowStyle: {
        ...rowStyle,
        font: fontName,
      },
    })
  }

  const onFontSizeChange = (fontSize: number) => {
    onChange(editorState, {
      rowStyle: {
        ...rowStyle,
        fontSize,
      },
    })
  }

  const onLetterSpacingChange = (letterSpacing: number) => {
    onChange(editorState, {
      rowStyle: {
        ...rowStyle,
        letterSpacing,
      },
    })
  }

  const getHasAnyTextSelected = (): boolean => {
    try {
      const selectionState = editorState.getSelection()
      const anchorKey = selectionState.getAnchorKey()
      const currentContent = editorState.getCurrentContent()
      const currentContentBlock = currentContent.getBlockForKey(anchorKey)
      const start = selectionState.getStartOffset()
      const end = selectionState.getEndOffset()
      const selectedText = currentContentBlock.getText().slice(start, end)
      if (selectedText?.length === 0) {
        return false
      }
      return true
    } catch (error) {
      console.log('getHasAnyTextSelected error', error)
      return false
    }
  }

  // Return a selectionEditorState with all text forcely highlighted
  const getForceSelectionEditorState = () => {
    let selection = editorState.getSelection()
    const currentContent = editorState.getCurrentContent()
    selection = editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      anchorOffset: 0,

      focusOffset: currentContent.getLastBlock().getText().length,
      focusKey: currentContent.getLastBlock().getKey(),
    })
    return EditorState.acceptSelection(editorState, selection)
  }

  const onToggleInlineStyle = (inlineStyle: any) => {
    const hasAnyTextSelected = getHasAnyTextSelected()
    let updatedEditorState: EditorState
    if (!hasAnyTextSelected) {
      const forceSelectionEditorState = getForceSelectionEditorState()
      updatedEditorState = RichUtils.toggleInlineStyle(
        forceSelectionEditorState,
        inlineStyle,
      )
    } else {
      updatedEditorState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
    }

    if (updatedEditorState) {
      // @ts-ignore
      onChange(updatedEditorState)
    }
  }

  const onToggleColor = (colorValue: any) => {
    const selection = editorState.getSelection()

    // Allow one color at a time, turn off all active colors
    const nextContentState = BOOKLET_EDITOR_COLORS.reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color.value)
      },
      editorState.getCurrentContent(),
    )

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style',
    )

    // Unset style override for current color
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state: any, color: any) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    // If the color is being toggled on, apply it
    if (!currentStyle.has(colorValue)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, colorValue)
    }

    // If no text highligted at all, will coloured all text in the block
    const hasAnyTextSelected = getHasAnyTextSelected()
    if (!hasAnyTextSelected) {
      const forceSelectionEditorState = getForceSelectionEditorState()
      nextEditorState = RichUtils.toggleInlineStyle(
        forceSelectionEditorState,
        colorValue,
      )
    }

    // @ts-ignore
    onChange(nextEditorState)
  }

  const onToggleAlignment = (alignmentType: AlignmentType) => {
    onChange(editorState, {
      alignment: alignmentType,
    })
  }

  return (
    <StyledEditorToolbar
      ref={editorRef}
      className={className}
      $editing={editing}
      style={style}
      size="small"
      onMouseDown={(ev) => {
        ev.preventDefault()
        ev.stopPropagation()
      }}
    >
      {productTheme && (
        <>
          <EditorFontDropdown
            productTheme={productTheme}
            onChange={onFontChange}
            fontName={fontName}
          />
          <EditorFontSizeDropdown
            productTheme={productTheme}
            onChange={onFontSizeChange}
            fontSize={fontSize}
            maxFontSize={maxFontSize}
          />
        </>
      )}
      <EditorInlineStylesButtons
        inlineStyle={editorState.getCurrentInlineStyle()}
        onToggleInlineStyle={onToggleInlineStyle}
      />
      <EditorColorDropdown
        onToggleColor={onToggleColor}
        getPopupContainer={getPopupContainer}
      />
      {activeAlignmentType && (
        <EditorAlignmentPanel
          onToggleAlignment={onToggleAlignment}
          type={activeAlignmentType}
        />
      )}
      <EditorLetterSpacingDropdown
        productTheme={productTheme}
        onChange={onLetterSpacingChange}
        letterSpacing={letterSpacing}
      />
    </StyledEditorToolbar>
  )
}
