import React from 'react'
import { ThemeIcon, Tooltip } from '@eulogise/client-components'
import { GUIDE_SHOW_UP_PAGE } from '@eulogise/core'
import { SiderMenuItem } from '../SiderMenu/SiderMenuItem'
import { GuidePopover } from '../../../GuidePopover/GuidePopover'

type IChangeThemeSiderMenuItemProps = {
  onChangeThemeClick: () => void
  isHighlighted?: boolean
}
export const ChangeThemeSiderMenuItem = ({
  onChangeThemeClick,
  isHighlighted = false,
}: IChangeThemeSiderMenuItemProps) => {
  return (
    <>
      <GuidePopover
        placedPage={GUIDE_SHOW_UP_PAGE.DASHBOARD}
        showUpStepIndex={2}
        width={430}
      />
      <Tooltip placement="right" title="View Themes">
        <SiderMenuItem
          key="view-themes"
          $isHighlighted={isHighlighted}
          icon={<ThemeIcon />}
          onClick={() => onChangeThemeClick()}
        >
          View Themes
        </SiderMenuItem>
      </Tooltip>
    </>
  )
}
