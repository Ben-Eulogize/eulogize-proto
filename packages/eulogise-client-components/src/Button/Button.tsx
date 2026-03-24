import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { Tooltip } from '../Tooltip'

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  LIGHT_BLUE = 'LIGHT_BLUE',
  SECONDARY = 'SECONDARY',
  TRANSPARENT = 'TRANSPARENT',
  DANGER = 'DANGER',
  WHITE = 'WHITE',
  OUTLINE = 'OUTLINE',
  HIGHLIGHTED_BUTTON = 'HIGHLIGHTED_BUTTON',
  CORE_PURPLE = 'CORE_PURPLE',
  CORE_PURPLE_60 = 'CORE_PURPLE_60',
  DROPDOWN_HIGHLIGHTED_BUTTON = 'DROPDOWN_HIGHLIGHTED_BUTTON',
  CHECKOUT_CTA_BUTTON_PRIMARY = 'CHECKOUT_CTA_BUTTON_PRIMARY',
  CHECKOUT_CTA_BUTTON_SECONDARY = 'CHECKOUT_CTA_BUTTON_SECONDARY',
  CHECKOUT_HIGHLIGHTED_BUTTON = 'CHECKOUT_HIGHLIGHTED_BUTTON',
}

export enum ButtonSize {
  XXS = 'XXS',
  XS = 'XS',
  SM = 'SM',
  XMD = 'XMD',
  MD = 'MD',
  LG = 'LG',
  EL = 'EL',
}

const ButtonSizeStyle: { [key: string]: string } = {
  [ButtonSize.XXS]: `font-size: ${STYLE.FONT_SIZE_XXS};`,
  [ButtonSize.XS]: `font-size: ${STYLE.FONT_SIZE_XS};`,
  [ButtonSize.SM]: `font-size: ${STYLE.FONT_SIZE_SM};`,
  [ButtonSize.MD]: `font-size: ${STYLE.FONT_SIZE_MD};`,
  [ButtonSize.XMD]: `font-size: ${STYLE.FONT_SIZE_XMD};`,
  [ButtonSize.LG]: `font-size: ${STYLE.FONT_SIZE_LG};`,
  [ButtonSize.EL]: `font-size: ${STYLE.FONT_SIZE_EL};`,
}

const ButtonTypeStyle = {
  [ButtonType.PRIMARY]: `
    box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.DARK_BLUE} 40%, ${COLOR.DARK_BLUE});
    &, &:hover, &:active, &:focus {
      background-color: ${COLOR.DARK_BLUE};
      color: ${COLOR.WHITE};
      border-color: transparent;
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.LIGHT_BLUE]: `
    border: 1px solid black;
    &, &:hover, &:active, &:focus {
      background-color: ${COLOR.PASTEL_BLUE};
      color: ${COLOR.BLACK};
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.TRANSPARENT]: `
    background-color: transparent;
    box-shadow: 0 1px 2px color-mix(in srgb, currentColor 40%, transparent);
    &, &:hover, &:active, &:focus {
      border-color: ${COLOR.TEXT_COLOR};
      color: ${COLOR.TEXT_COLOR};
    }
    &:hover {
      opacity: .8;
    }
    &:disabled {
      opacity: .3;
    }
  `,
  [ButtonType.OUTLINE]: `
    background-color: transparent;
    &, &:hover, &:active, &:focus {
      border-color: ${COLOR.WHITE};
      color: ${COLOR.WHITE};
    }
    &:hover {
      opacity: .8;
    }
    &:disabled {
      opacity: .3;
    }
  `,
  [ButtonType.WHITE]: `
    background-color: ${COLOR.WHITE};
    &, &:active, &:focus {
      border-color: ${COLOR.TEXT_COLOR};
      color: ${COLOR.TEXT_COLOR};
    }
    &&:hover {
      color: ${COLOR.PRIMARY};
      border-color: ${COLOR.PRIMARY};
      opacity: .8;
    }
    &:disabled {
      opacity: .3;
    }
  `,
  [ButtonType.SECONDARY]: `
    // box-shadow: 0 1px 2px color-mix(in srgb, currentColor 40%, transparent);
    border-width: 1px;
    &, &:hover, &:active, &:focus {
      border-color: ${COLOR.CORNFLOWER_BLUE};
      color: ${COLOR.CORNFLOWER_BLUE};
      background-color: ${COLOR.WHITE};
    }
    &:hover {
      opacity: 0.8;
    }
    &:disabled {
      border-color: ${COLOR.TEXT_COLOR};
      color: ${COLOR.TEXT_COLOR};
      background-color: transparent;
      opacity: .3;
    }
  `,
  [ButtonType.DANGER]: `
   box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.LIGHT_RED} 40%, ${COLOR.LIGHT_RED});
   &, &:hover, &:active, &:focus {
      background-color: ${COLOR.LIGHT_RED};
      color: ${COLOR.WHITE};
      border-color: ${COLOR.LIGHT_RED};
      border-color: transparent;
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.HIGHLIGHTED_BUTTON]: `
    // box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.DARK_BLUE} 40%, ${COLOR.DARK_BLUE});
    &, &:hover, &:active, &:focus {
      border-color: ${COLOR.DARK_BLUE};
      color: ${COLOR.DARK_BLUE};
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.CORE_PURPLE]: `
    box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.CORE_PURPLE} 40%, ${COLOR.CORE_PURPLE});
    &, &:hover, &:active, &:focus {
      background-color: ${COLOR.CORE_PURPLE};
      color: ${COLOR.WHITE};
      border-color: transparent;
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.CORE_PURPLE_60]: `
    box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.CORE_PURPLE_60} 40%, ${COLOR.CORE_PURPLE_60});
    &, &:hover, &:active, &:focus {
      background-color: ${COLOR.CORE_PURPLE_60};
      color: ${COLOR.WHITE};
      border-color: transparent;
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.DROPDOWN_HIGHLIGHTED_BUTTON]: `
    box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.DARK_BLUE} 40%, ${COLOR.DARK_BLUE});
    &, &:hover, &:active, &:focus {
      background-color: ${COLOR.DARK_BLUE};
      color: ${COLOR.WHITE};
      border-color: ${COLOR.DARK_GREEN_BLACK};
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
  [ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY]: `
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    height: 48px;
    border-radius: 4px;
    &, &:hover, &:active, &:focus {
      background-color: ${COLOR.DARK_BLUE};
      color: ${COLOR.WHITE};
      border-color: transparent;
    }
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
      background-color: ${COLOR.SLATE_GREY};
    }
  `,
  [ButtonType.CHECKOUT_CTA_BUTTON_SECONDARY]: `
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    height: 48px;
    border-radius: 4px;
    border-width: 1px;
    &, &:hover, &:active, &:focus {
      border-color: ${COLOR.BLACK};
      color: ${COLOR.BLACK};
      background-color: ${COLOR.WHITE};
    }
    &:hover {
      opacity: 0.8;
    }
    &:disabled {
      border-color: ${COLOR.TEXT_COLOR};
      color: ${COLOR.TEXT_COLOR};
      background-color: transparent;
      opacity: .3;
    }
  `,
  [ButtonType.CHECKOUT_HIGHLIGHTED_BUTTON]: `
    // box-shadow: 0 1px 2px color-mix(in srgb, ${COLOR.DARK_BLUE} 40%, ${COLOR.DARK_BLUE});
    border-radius: 4px;
    &, &:hover, &:active, &:focus {
      border-color: ${COLOR.DARK_BLUE};
      color: ${COLOR.DARK_BLUE};
    }
    &:hover {
      background-color: ${COLOR.CORE_PURPLE_10}
    }
    &:disabled {
      opacity: 0.3;
    }
  `,
}

// @ts-ignore
const StyledButton = styled(Button)`
  margin: 0 calc(${STYLE.GUTTER} / 2);
  border-radius: 0.5rem;
  height: auto;
  ${STYLE.TEXT_SMALL}
  ${({
    $buttonType = ButtonType.PRIMARY,
    $buttonSize = ButtonSize.MD,
    $noMarginLeft = false,
    $noMarginRight = false,
    $noBoxShadow = false,
  }: {
    $buttonType?: ButtonType
    $buttonSize?: ButtonSize
    $noMarginLeft?: boolean
    $noMarginRight?: boolean
    $noBoxShadow?: boolean
  }) => `
    && {
      ${ButtonTypeStyle[$buttonType]}
      ${ButtonSizeStyle[$buttonSize]}
      ${$noMarginLeft ? `margin-left: 0;` : ''}
      ${$noMarginRight ? `margin-right: 0;` : ''}
      &&& { ${$noBoxShadow ? `box-shadow: none;` : ''} }
    }
  `}
`
StyledButton.displayName = 'StyledButton'

export interface IButtonProps {
  children?: React.ReactNode
  buttonType?: ButtonType
  buttonSize?: ButtonSize
  noMarginLeft?: boolean
  noMarginRight?: boolean
  noBoxShadow?: boolean
  className?: string
  tooltip?: string
  onClick?: (event: any) => void
  loading?: boolean
  disabled?: boolean
  onMouseDown?: (event: any) => void
  onMouseUp?: (ev: any) => void
  title?: string
  htmlType?: 'submit' | 'button'
  block?: boolean
  icon?: React.ReactNode
  tooltipPlacement?: 'top' | 'bottom'
  getPopupContainer?: () => any
  target?: string
}

const EnhancedButton: React.FC<IButtonProps> = ({
  children,
  className,
  tooltip,
  buttonType,
  buttonSize,
  noMarginLeft,
  noMarginRight,
  noBoxShadow,
  tooltipPlacement = 'bottom',
  getPopupContainer,
  disabled,
  target,
  ...rest
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

  useEffect(() => {
    if (disabled) {
      setTimeout(() => setIsTooltipVisible(false), 500)
    }
  }, [disabled])

  const buttonElement = (
    <StyledButton
      {...rest}
      disabled={disabled}
      $buttonType={buttonType}
      $buttonSize={buttonSize}
      $noMarginLeft={noMarginLeft}
      $noMarginRight={noMarginRight}
      className={className}
      onMouseOver={() => setIsTooltipVisible(true)}
      onMouseOut={() => setIsTooltipVisible(false)}
      $noBoxShadow={noBoxShadow}
      target={target}
    >
      {children}
    </StyledButton>
  )
  return tooltip ? (
    <Tooltip
      title={tooltip!}
      placement={tooltipPlacement}
      visible={!!tooltip && isTooltipVisible}
      getPopupContainer={getPopupContainer}
    >
      {buttonElement}
    </Tooltip>
  ) : (
    buttonElement
  )
}

EnhancedButton.displayName = 'EnhancedButton'

export { EnhancedButton as Button }
