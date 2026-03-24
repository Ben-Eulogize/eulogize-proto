import React from 'react'
import styled from 'styled-components'
import { CollapseIcon, ExpandIcon } from '../icons'
import { COLOR } from '@eulogise/client-core'

const StyledExpandable = styled.div`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${COLOR.LINK_HOVER_COLOR};
  }
`

type IExpandableProps = {
  expandText?: string
  collapseText?: string
  isExpanded?: boolean
  onClick: () => void
  className?: string
}

export const Expandable = ({
  expandText = 'Expand',
  collapseText = 'Collapse',
  isExpanded = true,
  onClick,
  className,
}: IExpandableProps) => (
  <StyledExpandable className={className} onClick={onClick}>
    {isExpanded ? (
      <>
        {collapseText}&nbsp;
        <CollapseIcon />
      </>
    ) : (
      <>
        {expandText}&nbsp;
        <ExpandIcon />
      </>
    )}
  </StyledExpandable>
)
