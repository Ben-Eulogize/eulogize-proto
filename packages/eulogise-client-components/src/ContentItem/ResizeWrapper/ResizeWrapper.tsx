import React, { useState } from 'react'
import { Resizable, ResizableProps, ResizeDirection } from 're-resizable'
// @ts-ignore
import Measure from 'react-measure'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { CardProductHelper } from '@eulogise/helpers'

const BORDER_WIDTH = 3
const HANDLE_WIDTH = 10

type IResizeWrapperDelta = {
  width: number
  height: number
}

type IResizableWrapperEnableProps = {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
  topRight?: boolean
  bottomRight?: boolean
  bottomLeft?: boolean
  topLeft?: boolean
}

interface IResizeWrapperProps extends Omit<ResizableProps, 'onResize'> {
  width: number
  height: number
  maxWidth?: number
  maxHeight?: number
  disabled: boolean
  borderWidth?: number
  onResizeStart?: (
    ev: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
    dir: ResizeDirection, // Direction,
    elementRef: HTMLElement,
  ) => void
  onResize?: (size: {
    width: number
    height: number
    delta: IResizeWrapperDelta
    direction: ResizeDirection
  }) => void
  onResizeEnd: (resizeEndProps: {
    width: number
    height: number
    direction?: ResizeDirection
    delta?: IResizeWrapperDelta
  }) => any
  children?: any
  lockAspectRatio: boolean
  isFocused: boolean
  onFocus: () => void
  isParentHovered?: boolean
  isAnyRowFocused: boolean
  className?: string
  borderStyle?: 'solid' | 'dotted'
  style?: React.CSSProperties
  enables?: IResizableWrapperEnableProps
  onResizeHandleHover?: (hover: boolean) => void
}

interface IStyledResizableProps {
  $isFocused: boolean
  $isHovered: boolean
  $resizing: boolean
  $isAnyRowFocused: boolean
  $borderStyle: 'solid' | 'dotted'
  $enables: IResizableWrapperEnableProps
  $borderWidth: number
}

/*
1. top
2. right
3. bottom
4. left
5. top right
6. bottom right
7. bottom left
8. top left
 */
// @ts-ignore
const StyledResizable = styled(Resizable)<IStyledResizableProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({
    $resizing,
    $isFocused,
    $isHovered,
    $isAnyRowFocused,
    $borderStyle,
    $enables,
    $borderWidth,
  }: IStyledResizableProps) =>
    CardProductHelper.isWrapperBorderVisible({
      resizing: $resizing,
      enables: $enables,
      isFocused: $isFocused,
      isHovered: $isHovered,
      isAnyRowFocused: $isAnyRowFocused,
    })
      ? `;
				z-index: 1;
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				${
          $isFocused || $isHovered
            ? `border: ${$borderWidth}px ${COLOR.CORE_PURPLE_60} ${
                $borderStyle ?? 'solid'
              };`
            : ''
        }
				transition: opacity 100ms;
				${
          $isFocused &&
          `
          & > div:last-of-type > div {
            ${[
              'dummy', // add a dummy so that the style will not applied if all sides are disabled
              $enables.top ? `&:nth-of-type(1):after` : undefined,
              $enables.right ? `&:nth-of-type(2):after` : undefined,
              $enables.bottom ? `&:nth-of-type(3):after` : undefined,
              $enables.left ? `&:nth-of-type(4):after` : undefined,
              $enables.topRight ? `&:nth-of-type(5):after` : undefined,
              $enables.bottomRight ? `&:nth-of-type(6):after` : undefined,
              $enables.bottomLeft ? `&:nth-of-type(7):after` : undefined,
              $enables.topLeft ? `&:nth-of-type(8):after` : undefined,
            ]
              .filter(Boolean)
              .join(',')} {
              content: '';
              border-radius: 5px;
              border: 1px ${COLOR.GREY} solid;
              background-color: ${COLOR.WHITE};
              z-index: 100;
              position: absolute;
            }
            &:hover:after, &:active:after {
              background-color: ${COLOR.CORNFLOWER_BLUE} !important;
            }
        
            &:nth-of-type(2):after,
            &:nth-of-type(4):after {
              top: 30%;
              height: 40%;
              width: 8px;
            }
            &:nth-of-type(2):after {
              left: 3px;
            }
            &:nth-of-type(1):after,
            &:nth-of-type(3):after {
              left: 30%;
              width: 40%;
              height: 8px;
            }
            &:nth-of-type(3):after {
              top: 3px;
            }
            
            &:nth-of-type(5):after,
            &:nth-of-type(6):after,
            &:nth-of-type(7):after,
            &:nth-of-type(8):after {
              width: 15px;
              height: 15px;
              border-radius: 30px;
            }
            &:nth-of-type(5):after,
            &:nth-of-type(6):after {
              left: 4px;
            }
            &:nth-of-type(6):after,
            &:nth-of-type(7):after {
              top: 3px;
            }
            &:nth-of-type(7):after,
            &:nth-of-type(8):after {
              left: 1px;
            }
          }
				`
        }
			`
      : `
				border: solid ${$borderWidth}px transparent;
			`}
`

export type IResizeWrapperPosition = {
  left: number
  top: number
}

export const getResizeWrapperNewPosition = ({
  currentPosition,
  direction,
  delta,
}: {
  currentPosition: IResizeWrapperPosition
  direction: ResizeDirection
  delta: IResizeWrapperDelta
}): IResizeWrapperPosition => {
  const styleTop = currentPosition.top
  const styleLeft = currentPosition.left
  let nPosition: IResizeWrapperPosition = {
    top: styleTop,
    left: styleLeft,
  }
  if (direction === 'left' || direction === 'top' || direction === 'topLeft') {
    nPosition = {
      top: styleTop - delta.height,
      left: styleLeft - delta.width,
    }
  } else if (direction === 'topRight') {
    nPosition = {
      top: styleTop - delta.height,
      left: styleLeft,
    }
  } else if (direction === 'bottomLeft') {
    nPosition = {
      top: styleTop,
      left: styleLeft - delta.width,
    }
  }
  return nPosition
}

const resizableStyle = {}

const nonResizableStyle = {
  cursor: 'default',
}

export const ResizeWrapper = ({
  className,
  minHeight,
  maxHeight,
  onResizeEnd,
  onResize,
  onResizeStart,
  width,
  height,
  maxWidth,
  minWidth,
  disabled,
  children,
  lockAspectRatio,
  isFocused,
  onFocus,
  isParentHovered,
  isAnyRowFocused,
  borderStyle,
  style,
  enables,
  borderWidth = BORDER_WIDTH,
  onResizeHandleHover,
}: IResizeWrapperProps) => {
  const restProps: Partial<IResizeWrapperProps> = {
    minHeight,
    maxHeight,
    maxWidth,
    minWidth,
    disabled,
    children,
  }
  const isResizeDisabled = disabled || !isFocused

  const [isHover, setIsHover] = useState<boolean>(false)
  const [resizing, setResizing] = useState<boolean>(false)

  const onMeasure = (ev: any) => {
    const { client } = ev
    let { width, height } = client
    if (height > maxHeight!) {
      width = (maxHeight! / height) * width
      height = maxHeight
    }

    onResizeEnd({
      width: Math.floor(width),
      height: Math.floor(height),
    })
  }

  const handleResizeHandleHover = (hover: boolean) => {
    if (isFocused && onResizeHandleHover) {
      onResizeHandleHover(hover)
    }
  }

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const nearLeft = x < HANDLE_WIDTH
    const nearRight = x > rect.width - HANDLE_WIDTH
    const nearTop = y < HANDLE_WIDTH
    const nearBottom = y > rect.height - HANDLE_WIDTH

    if (nearTop && nearLeft) {
      handleResizeHandleHover(true)
    } else if (nearTop && nearRight) {
      handleResizeHandleHover(true)
    } else if (nearBottom && nearLeft) {
      handleResizeHandleHover(true)
    } else if (nearBottom && nearRight) {
      handleResizeHandleHover(true)
    } else if (nearTop) {
      handleResizeHandleHover(true)
    } else if (nearBottom) {
      handleResizeHandleHover(true)
    } else if (nearLeft) {
      handleResizeHandleHover(true)
    } else if (nearRight) {
      handleResizeHandleHover(true)
    } else {
      handleResizeHandleHover(false)
    }
  }

  // Measure child if no width or height is defined
  if (!width || !height) {
    return (
      <Measure client onResize={onMeasure}>
        {({ measureRef }: any) =>
          React.cloneElement(children, { ref: measureRef })
        }
      </Measure>
    )
  }

  const newEnables = {
    top: !isResizeDisabled,
    right: !isResizeDisabled,
    bottom: !isResizeDisabled,
    left: !isResizeDisabled,
    topRight: !isResizeDisabled,
    bottomRight: !isResizeDisabled,
    bottomLeft: !isResizeDisabled,
    topLeft: !isResizeDisabled,
    ...enables,
  }
  return (
    // @ts-ignore
    <StyledResizable
      className={className}
      style={style}
      size={{ width, height }}
      handleStyles={{
        top: newEnables.top ? resizableStyle : nonResizableStyle,
        right: newEnables.right ? resizableStyle : nonResizableStyle,
        bottom: newEnables.bottom ? resizableStyle : nonResizableStyle,
        left: newEnables.left ? resizableStyle : nonResizableStyle,
        topRight: newEnables.topRight ? resizableStyle : nonResizableStyle,
        bottomRight: newEnables.bottomRight
          ? resizableStyle
          : nonResizableStyle,
        bottomLeft: newEnables.bottomLeft ? resizableStyle : nonResizableStyle,
        topLeft: newEnables.topLeft ? resizableStyle : nonResizableStyle,
      }}
      $enables={newEnables}
      {...restProps}
      onClick={(ev: React.ChangeEvent) => {
        if (disabled) {
          return
        }
        ev.stopPropagation()
        onFocus()
      }}
      onResizeStart={
        // @ts-ignore
        (
          e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
          dir: ResizeDirection, //Direction,
          elementRef: HTMLElement,
        ) => {
          // @ts-ignore
          if (newEnables[dir] === false) {
            e.stopPropagation()
            return false
          }
          if (onResizeStart) {
            onResizeStart(e, dir, elementRef)
          }
          setResizing(true)
        }
      }
      $borderWidth={borderWidth}
      onResize={(
        event: any,
        direction: ResizeDirection,
        ref: any,
        delta: any,
      ) => {
        if (!onResize) {
          return
        }

        const borderSize = borderWidth * 2
        onResize({
          width: ref.clientWidth + borderSize,
          height: ref.clientHeight + borderSize,
          direction,
          delta,
        })
      }}
      onResizeStop={(
        e: any,
        direction: ResizeDirection,
        ref: any,
        delta: any,
      ) => {
        const borderSize = borderWidth * 2
        onResizeEnd({
          // width: Math.floor((width || 0) + delta.width),
          // height: Math.floor((height || 0) + delta.height),
          width: Math.floor((ref.clientWidth || 0) + borderSize),
          height: Math.floor((ref.clientHeight || 0) + borderSize),
          direction,
          delta,
        })

        setResizing(false)
      }}
      $resizing={resizing}
      onMouseDown={() => onFocus()}
      onMouseEnter={() => {
        setIsHover(true)
        handleResizeHandleHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
        handleResizeHandleHover(false)
      }}
      onMouseMove={handleMouseMove}
      $isFocused={isFocused}
      $isHovered={!disabled && (isHover || isParentHovered)}
      $isAnyRowFocused={isAnyRowFocused}
      $borderStyle={borderStyle}
      lockAspectRatio={lockAspectRatio}
    />
  )
}
