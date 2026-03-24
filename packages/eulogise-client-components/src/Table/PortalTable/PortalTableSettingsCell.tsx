import React from 'react'
import styled from 'styled-components'
import { ClientDashboardActionsIcon } from '../../icons'

const StyledPortalTableSettingsContainer = styled.div``

const StyledPortalTableSettingsCell = styled.div`
  text-align: center;
`

// @ts-ignore
const StyledAccountSettingIcon = styled(ClientDashboardActionsIcon)`
  font-size: 1.4rem;
  cursor: pointer;
`

export const PortalTableSettingsCell = ({
  onClick,
  MemorialSettingsPopoverComponent,
}: {
  onClick: () => void
  MemorialSettingsPopoverComponent: JSX.Element | undefined | null
}) => {
  return (
    <StyledPortalTableSettingsContainer>
      {MemorialSettingsPopoverComponent}
      <StyledPortalTableSettingsCell onClick={onClick}>
        <StyledAccountSettingIcon />
      </StyledPortalTableSettingsCell>
    </StyledPortalTableSettingsContainer>
  )
}
