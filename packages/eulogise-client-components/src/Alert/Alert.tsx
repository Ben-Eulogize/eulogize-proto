import React from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

export interface IAlertProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  flex?: boolean
  justifyContent?: string
  noBorderRightRadius?: boolean
  noMargin?: boolean
  lineHeight?: string
  padding?: string
}

const StyledAlert = styled.div<{
  $noBorderRightRadius?: boolean
  $noMargin?: boolean
  $lineHeight?: string
  $padding?: string
}>`
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
  color: ${COLOR.TEXT_COLOR};
  padding: 10px 2rem;

  ${STYLE.HEADING_MEDIUM}
  display: flex;
  ${({ $noBorderRightRadius, $noMargin, $lineHeight, $padding }) =>
    `
      ${
        $noBorderRightRadius
          ? `border-top-right-radius: 0; border-bottom-right-radius: 0;`
          : ''
      }
      ${$noMargin ? '' : 'margin: 1.8rem 0;'}
      ${$lineHeight ? `line-height:${$lineHeight}; ` : ''}
      ${$padding ? `padding:${$padding}; ` : ''}
    `}
`

const AlertIcon = styled.div`
  margin: 0 1rem 0 0;
  font-size: 2rem;
`
const AlertMessage = styled.div<{ flex?: boolean; justifyContent?: string }>`
  ${({ flex }) =>
    flex &&
    `
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  `}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
`

export const Alert: React.FC<IAlertProps> = ({
  icon,
  flex,
  className,
  children,
  justifyContent,
  noBorderRightRadius,
  noMargin,
  lineHeight,
  padding,
}) => (
  <StyledAlert
    className={className}
    $noMargin={noMargin}
    $noBorderRightRadius={noBorderRightRadius}
    $lineHeight={lineHeight}
    $padding={padding}
  >
    {icon && <AlertIcon>{icon}</AlertIcon>}
    <AlertMessage flex={flex} justifyContent={justifyContent}>
      {children}
    </AlertMessage>
  </StyledAlert>
)
