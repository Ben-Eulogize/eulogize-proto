import React from 'react'
import styled from 'styled-components'
import { LabelText } from '../Text'
import { COLOR } from '@eulogise/client-core'

const StyledCollapseBox = styled.div``

type ICollapseBoxProps = React.PropsWithChildren & {
  title: string
  isCollapsed: boolean
  onCollapsedChange: (isCollapsed: boolean) => void
  textColor?: string
}

export const CollapseBox = ({
  title,
  isCollapsed,
  onCollapsedChange,
  children,
  textColor = COLOR.BLACK,
}: ICollapseBoxProps) => (
  <StyledCollapseBox>
    <LabelText
      isCollapsible
      isCollapsed={isCollapsed}
      onChange={onCollapsedChange}
      textColor={textColor}
    >
      {title}
    </LabelText>
    {!isCollapsed && <div>{children}</div>}
  </StyledCollapseBox>
)
