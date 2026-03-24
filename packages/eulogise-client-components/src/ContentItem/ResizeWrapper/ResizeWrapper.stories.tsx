import React, { useState } from 'react'
import styled from 'styled-components'
import {
  getResizeWrapperNewPosition,
  IResizeWrapperPosition,
  ResizeWrapper,
} from './ResizeWrapper'

export default {
  title: 'General/ResizeWrapper',
  component: ResizeWrapper,
  argTypes: {},
}

const StyledResizeWrapper = styled(ResizeWrapper)`
  position: absolute;
`

export const Default = () => {
  const [position, setPosition] = useState<IResizeWrapperPosition>({
    left: 0,
    top: 0,
  })
  const [newPosition, setNewPosition] = useState<IResizeWrapperPosition>({
    left: 0,
    top: 0,
  })
  const [size, setSize] = useState({
    width: 100,
    height: 100,
  })
  return (
    <StyledResizeWrapper
      onFocus={() => {}}
      height={size.height}
      isAnyRowFocused
      disabled={false}
      isFocused
      lockAspectRatio
      style={{
        top: newPosition?.top ?? position.top,
        left: newPosition?.left ?? position.left,
      }}
      onResizeStart={() => {}}
      onResize={({ delta, width, height, direction }) => {
        setSize({
          width,
          height,
        })
        const resizeWrapperNewPosition = getResizeWrapperNewPosition({
          currentPosition: position,
          direction,
          delta,
        })
        setNewPosition({
          left: resizeWrapperNewPosition.left,
          top: resizeWrapperNewPosition.top,
        })
      }}
      onResizeEnd={({ width, height, delta, direction }) => {
        if (delta) {
          setPosition(newPosition)
        }
      }}
      width={size.width}
    >
      Test
    </StyledResizeWrapper>
  )
}

export const EnableTopAndBottomOnly = () => {
  const [position, setPosition] = useState<IResizeWrapperPosition>({
    left: 0,
    top: 0,
  })
  const [newPosition, setNewPosition] = useState<IResizeWrapperPosition>({
    left: 0,
    top: 0,
  })
  const [size, setSize] = useState({
    width: 100,
    height: 100,
  })
  return (
    <StyledResizeWrapper
      onFocus={() => {}}
      height={size.height}
      isAnyRowFocused
      disabled={true}
      enables={{
        top: true,
        bottom: true,
      }}
      isFocused
      lockAspectRatio
      style={{
        top: newPosition?.top ?? position.top,
        left: newPosition?.left ?? position.left,
      }}
      onResizeStart={() => {}}
      onResize={({ delta, width, height, direction }) => {
        setSize({
          width,
          height,
        })
        const resizeWrapperNewPosition = getResizeWrapperNewPosition({
          currentPosition: position,
          direction,
          delta,
        })
        setNewPosition({
          left: resizeWrapperNewPosition.left,
          top: resizeWrapperNewPosition.top,
        })
      }}
      onResizeEnd={({ width, height, delta, direction }) => {
        if (delta) {
          setPosition(newPosition)
        }
      }}
      width={size.width}
    >
      Top & Bottom
    </StyledResizeWrapper>
  )
}
