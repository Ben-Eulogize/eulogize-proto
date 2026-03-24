import React from 'react'
import styled from 'styled-components'
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  FontSizeIcon,
  ChevronDownIcon,
} from '../../icons'
import { ButtonType } from '../../Button'
import { AlignmentType, BOOKLET_EDITOR_COLORS } from '@eulogise/core'
import { COLOR } from '@eulogise/client-core'
import { Dropdown, DropdownMenu, DropdownMenuItem } from '../../Dropdown'
import { EditorDropdownButton } from '../../EditorToolbar/EditorDropdownButton'

const StyledText = styled.span`
  margin-left: 0.5rem;
  display: inline-block;
`

const StyledButtonLabel = styled.span`
  white-space: nowrap;
  font-size: 16px;
`

export const ActionBarEditButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) => {
  return {
    content: <StyledButtonLabel>Edit</StyledButtonLabel>,
    title: 'Edit image',
    disable: disabled,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarEnhanceButton = ({
  onClick,
  disabled,
  isEnhanced,
}: {
  onClick: () => void
  disabled?: boolean
  isEnhanced?: boolean
}) => {
  return {
    content: <StyledButtonLabel>Enhance</StyledButtonLabel>,
    title: isEnhanced ? 'Remove image enhancement' : 'Enhance image',
    disable: disabled,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: isEnhanced ? ButtonType.PRIMARY : ButtonType.WHITE,
  }
}

export const ActionBarBgRemoverButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) => {
  return {
    content: <StyledButtonLabel>Bg Remover</StyledButtonLabel>,
    title: 'Remove background',
    disable: disabled,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarChangeIconButton = ({
  onClick,
}: {
  onClick: () => void
}) => {
  return {
    content: <StyledButtonLabel>Change Icon</StyledButtonLabel>,
    title: 'Change Icon',
    onClick,
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarRepositionButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) => {
  return {
    content: <StyledButtonLabel>Reposition</StyledButtonLabel>,
    title: 'Reposition photo within frame',
    disable: disabled,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarCopyAssetButton = ({
  title,
  onClick,
}: {
  title: string
  onClick: () => void
}) => {
  return {
    content: <StyledButtonLabel>Duplicate</StyledButtonLabel>,
    title: title,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarDeleteButton = ({ onClick }: { onClick: () => void }) => {
  return {
    content: <StyledButtonLabel>Delete</StyledButtonLabel>,
    title: 'Delete row',
    onClick,
    buttonType: ButtonType.DANGER,
  }
}

export const ActionBarImageLayoutButton = ({
  onClick,
  text,
}: {
  onClick: () => void
  text?: string
}) => {
  return {
    content: <StyledButtonLabel>{text || 'Change Frame'}</StyledButtonLabel>,
    title: 'Image Layout',
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarSizeButton = ({
  isEnabled,
  text,
  title,
  onClick,
}: {
  isEnabled?: boolean
  text: string
  title: string
  onClick: () => void
}) => {
  return {
    content: text,
    title,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: isEnabled ? ButtonType.DANGER : ButtonType.WHITE,
  }
}

export const ActionBarToggleTextButton = ({
  isTextEnabled,
  onClick,
  text,
}: {
  isTextEnabled?: boolean
  onClick: () => void
  text?: string
}) => {
  return {
    content: (
      <>
        <FontSizeIcon />
        <StyledText>{text}</StyledText>
      </>
    ),
    title: 'Text',
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: isTextEnabled ? ButtonType.DANGER : ButtonType.WHITE,
  }
}

export const ActionBarFullWidthButton = ({
  isFullWidth,
  onClick,
  disabled,
}: {
  isFullWidth: boolean
  onClick: () => void
  disabled: boolean
}) => {
  return {
    content: <StyledButtonLabel>Full Width</StyledButtonLabel>,
    disable: disabled,
    title: isFullWidth ? 'Normal Width' : 'Full Width',
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: isFullWidth ? ButtonType.PRIMARY : ButtonType.WHITE,
  }
}

export const ActionBarFadeImageButton = ({
  onClick,
  disabled,
  isFadeImageEnabled,
}: {
  onClick: () => void
  disabled: boolean
  isFadeImageEnabled: boolean
}) => {
  return {
    content: <StyledButtonLabel>Blur Edges</StyledButtonLabel>,
    title: 'Blur Edges',
    disable: disabled,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: isFadeImageEnabled ? ButtonType.PRIMARY : ButtonType.WHITE,
  }
}

export const ActionBarBorderButton = ({
  onClick,
  disabled,
  isBorderEnabled,
}: {
  onClick: () => void
  disabled: boolean
  isBorderEnabled: boolean
}) => {
  return {
    content: <StyledButtonLabel>Border</StyledButtonLabel>,
    title: 'Photo Border',
    disable: disabled,
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: isBorderEnabled ? ButtonType.PRIMARY : ButtonType.WHITE,
  }
}

const StyledColorMenuContainer = styled(DropdownMenu)`
  display: flex;
  width: 128px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 4px;

  &::after {
    content: '';
    flex: auto;
  }
`

const StyledColorItem = styled(DropdownMenuItem)`
  display: inline-block;
  padding: 2px;
`

const StyledColorThumb = styled.div<{ backgroundColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 2px ${COLOR.SHALLOW_GREY} solid;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export const ActionBarColorDropdown = ({
  onColorSelect,
}: {
  onColorSelect: (color: string) => void
}) => {
  return (
    <Dropdown
      trigger={['hover']}
      placement="bottomRight"
      overlay={
        <StyledColorMenuContainer>
          {BOOKLET_EDITOR_COLORS.map(({ label, color }, index) => (
            <StyledColorItem
              key={index}
              onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
              onClick={() => onColorSelect(color)}
              title={label}
            >
              <StyledColorThumb backgroundColor={color} />
            </StyledColorItem>
          ))}
        </StyledColorMenuContainer>
      }
    >
      <EditorDropdownButton>
        Color
        <ChevronDownIcon />
      </EditorDropdownButton>
    </Dropdown>
  )
}

export const ActionBarDividerButton = ({
  onClick,
}: {
  onClick: () => void
}) => {
  return {
    content: <StyledButtonLabel>Change Divider</StyledButtonLabel>,
    title: 'Change divider graphic',
    onClick,
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarPhotoAndFrameEffectsButton = ({
  onClick,
}: {
  onClick: () => void
}) => {
  return {
    content: <StyledButtonLabel>Photo &amp; Frame Effects</StyledButtonLabel>,
    title: 'Photo & Frame Effects',
    onClick: (ev: any) => {
      ev.stopPropagation()
      onClick()
    },
    buttonType: ButtonType.WHITE,
  }
}

export const ActionBarAlignmentButton = ({
  alignment,
  onClick,
  disabled,
}: {
  alignment: AlignmentType
  onClick: (newAlignment: AlignmentType) => void
  disabled?: boolean
}) => {
  return alignment === AlignmentType.CENTER
    ? {
        content: <AlignCenterIcon />,
        title: 'Align Center',
        onClick: (ev: any) => {
          ev.stopPropagation()
          onClick(AlignmentType.LEFT)
        },
        buttonType: ButtonType.WHITE,
        disable: disabled,
      }
    : alignment === AlignmentType.LEFT
    ? {
        content: <AlignLeftIcon />,
        title: 'Align Left',
        onClick: (ev: any) => {
          ev.stopPropagation()
          onClick(AlignmentType.RIGHT)
        },
        buttonType: ButtonType.WHITE,
        disable: disabled,
      }
    : {
        content: <AlignRightIcon />,
        title: 'Align Right',
        onClick: (ev: any) => {
          ev.stopPropagation()
          onClick(AlignmentType.CENTER)
        },
        buttonType: ButtonType.WHITE,
        disable: disabled,
      }
}
