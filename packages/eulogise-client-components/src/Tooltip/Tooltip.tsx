import React, { useEffect, useRef, useState } from 'react'
import { Tooltip as AntTooltip } from 'antd'
import styled from 'styled-components'
import { EulogiseClientConfig } from '@eulogise/client-core'

export declare type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'

export interface ITooltipProps {
  placement?: TooltipPlacement
  title: string
  children: React.ReactNode
  visible?: boolean
  zIndex?: number
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  mouseEnterDelay?: number
  className?: string
}

// @ts-ignore
const StyledTooltip = styled(AntTooltip)``

export const Tooltip: React.FunctionComponent<ITooltipProps> = ({
  placement,
  title,
  children,
  visible,
  zIndex,
  getPopupContainer,
  mouseEnterDelay = EulogiseClientConfig.TOOLTIP_VISIBLE_TIMEOUT / 1000,
  className,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const tooltipTimeout = useRef(-1)

  useEffect(() => {
    if (visible) {
      // @ts-ignore
      tooltipTimeout.current = setTimeout(
        () => setIsTooltipVisible(visible !== undefined ? visible : true),
        EulogiseClientConfig.TOOLTIP_VISIBLE_TIMEOUT,
      )
    } else if (visible === false) {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current)
      }
      setIsTooltipVisible(false)
    }
  }, [visible])

  if (visible !== undefined) {
    return (
      <StyledTooltip
        className={className}
        open={isTooltipVisible}
        getPopupContainer={getPopupContainer}
        placement={placement}
        title={title}
        zIndex={zIndex}
      >
        {children}
      </StyledTooltip>
    )
  }
  return (
    <StyledTooltip
      className={className}
      getPopupContainer={getPopupContainer}
      placement={placement}
      title={title}
      zIndex={zIndex}
      mouseEnterDelay={mouseEnterDelay}
    >
      {children}
    </StyledTooltip>
  )
}
