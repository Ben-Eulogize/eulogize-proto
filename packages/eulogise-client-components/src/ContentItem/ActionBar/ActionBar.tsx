import React from 'react'
import styled from 'styled-components'
import { ButtonType, ButtonGroup, Button } from '../../Button'
import { Dropdown, DropdownMenu } from '../../Dropdown'
import { COLOR } from '@eulogise/client-core'
import { IActionType, PageActionPosition } from '@eulogise/core'
interface IActionBarProps {
  actions: Array<IActionType<ButtonType>>
  actionsPosition: PageActionPosition
  style?: any
  className?: string
  isPortaled?: boolean
}

// @ts-ignore
const StyledActionButton = styled(Button)`
  &.hover {
    color: ${COLOR.RED};
  }
  && {
    font-size: 1rem;
    border: none;
    border-radius: 0;
    height: 100%;
    min-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &[data-inactive]:hover {
      background: ${COLOR.LIGHT_GREY || '#f5f5f5'};
    }
    &:first-child {
      border-radius: 6px 0 0 6px;
    }
    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }
  width: auto;
`

// @ts-ignore
const StyledActionBarButtonGroup = styled(ButtonGroup)<{
  actionsPosition?: string
  $isPortaled?: boolean
}>`
  ${({ $isPortaled }) =>
    $isPortaled
      ? `
    position: relative;
    top: auto;
    right: auto;
    pointer-events: auto;
  `
      : `
    right: 0;
    position: absolute;
    top: -40px;
  `}
  z-index: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  button {
    border-radius: 0;
    border: none;
  }
`

export const ActionBar = ({
  actions,
  actionsPosition,
  isPortaled,
  ...rest
}: IActionBarProps) => (
  <StyledActionBarButtonGroup
    // @ts-ignore
    size="small"
    {...rest}
    actionsPosition={actionsPosition}
    $isPortaled={isPortaled}
  >
    {actions.map(
      (
        {
          content,
          buttonType,
          subActions,
          onClick,
          disable,
          isCustomContent,
          ...rest
        },
        index,
      ) => {
        if (isCustomContent) {
          return <React.Fragment key={index}>{content}</React.Fragment>
        }

        if (subActions) {
          return (
            <Dropdown
              key={index}
              trigger={['hover']}
              overlay={
                <DropdownMenu>
                  {subActions.map(
                    (
                      { content: subContent, ...subRest }: any,
                      index: number,
                    ) => (
                      <DropdownMenu.Item key={index}>
                        <a {...subRest}>{subContent}</a>
                      </DropdownMenu.Item>
                    ),
                  )}
                </DropdownMenu>
              }
            >
              <Button>{content}</Button>
            </Dropdown>
          )
        }

        const isInactive = buttonType === ButtonType.WHITE
        return (
          <StyledActionButton
            noMarginLeft
            noMarginRight
            key={index}
            buttonType={buttonType ?? ButtonType.PRIMARY}
            onClick={onClick}
            tooltip={rest.title}
            disabled={disable}
            onMouseDown={(ev: React.MouseEvent) => ev.stopPropagation()}
            onMouseUp={(ev: React.MouseEvent) => ev.stopPropagation()}
            noBoxShadow
            {...(isInactive ? { 'data-inactive': true } : {})}
          >
            {content}
          </StyledActionButton>
        )
      },
    )}
  </StyledActionBarButtonGroup>
)
