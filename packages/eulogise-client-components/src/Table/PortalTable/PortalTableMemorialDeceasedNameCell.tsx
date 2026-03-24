import React from 'react'
import styled from 'styled-components'

import { Tooltip } from '../../Tooltip'
import { COLOR } from '@eulogise/client-core'

export const MemorialDeceasedNameText = styled.div`
  color: ${COLOR.DARK_BLUE};
`

const StyledPortalTableMemorialDeceasedNameCell = styled.div<{
  $isClickable?: boolean
}>`
  display: flex;
  align-items: center;
  width: 200px;
  ${({ $isClickable }) =>
    $isClickable &&
    `
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      text-decoration-color: ${COLOR.DARK_BLUE};
    }
  `}
`

const MEMORIAL_DECEASED_CELL_TOOLTIP_TEXT = 'Click to view memorial'

export const PortalTableMemorialDeceasedNameCell = (
  deceasedFullName: string,
  onClick: () => void,
  MemorialDashboardPopoverComponent?: JSX.Element | null,
) => {
  const tooltip = MEMORIAL_DECEASED_CELL_TOOLTIP_TEXT

  return (
    <Tooltip title={tooltip}>
      {MemorialDashboardPopoverComponent}
      <StyledPortalTableMemorialDeceasedNameCell $isClickable onClick={onClick}>
        <MemorialDeceasedNameText>{deceasedFullName}</MemorialDeceasedNameText>
      </StyledPortalTableMemorialDeceasedNameCell>
    </Tooltip>
  )
}
