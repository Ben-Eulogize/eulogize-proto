import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { EditorToolbar, IEditorToolbarProps } from './EditorToolbar'
import { Button, ButtonSize, ButtonType } from '../Button'
import { CopyAssetIcon, DeleteIcon } from '../icons'

export const EDITOR_TOOLBAR_PORTAL_TARGET_ID = 'editor-toolbar-portal-target'
export const EDITOR_TOOLBAR_HEIGHT = 40

export interface IEditorToolbarPortalProps extends IEditorToolbarProps {
  onDelete?: () => void
  onDuplicate?: () => void
}

const StyledPortalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledActionButtons = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  flex-shrink: 0;
`

export const TextItemEditorToolbarPortal: React.FC<
  IEditorToolbarPortalProps
> = ({ onDelete, onDuplicate, ...toolbarProps }) => {
  if (typeof document === 'undefined') {
    return null
  }

  const portalTarget = document.getElementById(EDITOR_TOOLBAR_PORTAL_TARGET_ID)

  if (!portalTarget) {
    return <EditorToolbar {...toolbarProps} />
  }

  return ReactDOM.createPortal(
    <StyledPortalContainer
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <EditorToolbar {...toolbarProps} isPortaled />
      <StyledActionButtons>
        {onDuplicate && (
          <Button
            buttonType={ButtonType.WHITE}
            buttonSize={ButtonSize.SM}
            noMarginRight
            title="Duplicate text"
            onClick={(ev) => {
              ev.stopPropagation()
              onDuplicate()
            }}
          >
            <CopyAssetIcon />
          </Button>
        )}
        {onDelete && (
          <Button
            buttonType={ButtonType.DANGER}
            buttonSize={ButtonSize.SM}
            title="Delete row"
            onClick={onDelete}
          >
            <DeleteIcon />
          </Button>
        )}
      </StyledActionButtons>
    </StyledPortalContainer>,
    portalTarget,
  )
}
