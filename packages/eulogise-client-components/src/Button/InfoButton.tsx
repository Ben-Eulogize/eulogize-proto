import React from 'react'
import { Tooltip } from '../Tooltip'
import styled from 'styled-components'
import { InfoCircleIcon } from '../icons'
import { COLOR } from '@eulogise/client-core'

type IInfoButtonProps = {
  title: string
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}

// @ts-ignore
const StyledInfoCircleIcon = styled(InfoCircleIcon)`
  color: ${COLOR.DARK_BLUE};
`

export const InfoButton = ({ title, getPopupContainer }: IInfoButtonProps) => (
  <Tooltip title={title} getPopupContainer={getPopupContainer}>
    <StyledInfoCircleIcon />
  </Tooltip>
)
