import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
  RawDraftContentState,
} from 'draft-js'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { TEXT_EDITOR_COLOR_STYLE_MAP } from '@eulogise/core'
import { RichTextEditorToolbar } from './RichTextEditorToolbar'

export interface IRichTextEditorProps {
  value?: string
  rawValue?: RawDraftContentState
  onChange?: (value: string) => void
  onRawChange?: (rawValue: RawDraftContentState) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
  className?: string
}

const EditorContainer = styled.div<{ $rows: number; $disabled?: boolean }>`
  border: 1px solid ${COLOR.GREY};
  border-radius: 4px;
  background-color: ${({ $disabled }) =>
    $disabled ? COLOR.LITE_GREY : COLOR.WHITE};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ $disabled }) =>
      $disabled ? COLOR.GREY : COLOR.CORE_PURPLE_60};
  }

  &:focus-within {
    border-color: ${COLOR.CORE_PURPLE};
    box-shadow: 0 0 0 2px ${COLOR.CORE_PURPLE_10};
  }

  section {
    font-family: inherit !important;
    font-size: inherit !important;
  }
`

const EditorWrapper = styled.div<{ $rows: number }>`
  min-height: ${({ $rows }) => $rows * 1.5}em;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;

  .DraftEditor-root {
    min-height: ${({ $rows }) => $rows * 1.5}em;
  }

  .public-DraftEditorPlaceholder-root {
    color: ${COLOR.SLATE_GREY};
    position: absolute;
    pointer-events: none;
  }

  .public-DraftEditor-content {
    min-height: ${({ $rows }) => $rows * 1.5}em;
  }
`

export const RichTextEditor: React.FC<IRichTextEditorProps> = ({
  value,
  rawValue,
  onChange,
  onRawChange,
  placeholder,
  rows = 4,
  disabled = false,
  className,
}) => {
  const editorRef = useRef<Editor>(null)

  const createEditorState = useCallback(() => {
    if (rawValue) {
      try {
        const contentState = convertFromRaw(rawValue)
        return EditorState.createWithContent(contentState)
      } catch (e) {
        // Fall back to empty state if rawValue is invalid
      }
    }
    if (value) {
      const contentState = ContentState.createFromText(value)
      return EditorState.createWithContent(contentState)
    }
    return EditorState.createEmpty()
  }, [rawValue, value])

  const [editorState, setEditorState] = useState<EditorState>(createEditorState)
  const [isFocused, setIsFocused] = useState(false)

  // Update editor state when external value changes
  useEffect(() => {
    if (rawValue) {
      try {
        const currentContent = editorState.getCurrentContent()
        const currentRaw = convertToRaw(currentContent)
        // Only update if content is actually different
        if (JSON.stringify(currentRaw) !== JSON.stringify(rawValue)) {
          const contentState = convertFromRaw(rawValue)
          const newEditorState = EditorState.createWithContent(contentState)
          setEditorState(newEditorState)
        }
      } catch (e) {
        // Ignore invalid rawValue
      }
    } else if (value !== undefined) {
      const currentText = editorState.getCurrentContent().getPlainText()
      if (currentText !== value) {
        const contentState = ContentState.createFromText(value)
        const newEditorState = EditorState.createWithContent(contentState)
        setEditorState(newEditorState)
      }
    }
  }, [rawValue, value])

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState)

    const contentState = newEditorState.getCurrentContent()
    const plainText = contentState.getPlainText()
    const rawContent = convertToRaw(contentState)

    if (onChange) {
      onChange(plainText)
    }
    if (onRawChange) {
      onRawChange(rawContent)
    }
  }

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      handleEditorChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const handleToggleInlineStyle = (inlineStyle: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const focusEditor = () => {
    if (!disabled && editorRef.current) {
      editorRef.current.focus()
    }
  }

  return (
    <EditorContainer
      className={className}
      $rows={rows}
      $disabled={disabled}
      onClick={focusEditor}
    >
      <RichTextEditorToolbar
        editorState={editorState}
        onToggleInlineStyle={handleToggleInlineStyle}
        visible={isFocused}
      />
      <EditorWrapper $rows={rows}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          readOnly={disabled}
          customStyleMap={TEXT_EDITOR_COLOR_STYLE_MAP}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </EditorWrapper>
    </EditorContainer>
  )
}
