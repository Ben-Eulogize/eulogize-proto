import React from 'react'
import { SiderMenuItem } from '../SiderMenu/SiderMenuItem'
import { EulogisePage } from '@eulogise/core'
import { HomeIcon, Tooltip } from '@eulogise/client-components'

export const MemorialHomeSiderMenuItem = ({
  onViewAllMemorialsClick,
}: {
  onViewAllMemorialsClick: () => void
}) => (
  <Tooltip
    key="memorial-home-tooltip"
    placement="right"
    title="View All Memorials"
  >
    <SiderMenuItem
      key="memorial-home"
      $isSelected={location?.pathname === EulogisePage.DASHBOARD}
      icon={<HomeIcon />}
      onClick={onViewAllMemorialsClick}
    >
      View All Memorials
    </SiderMenuItem>
  </Tooltip>
)
