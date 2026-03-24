import React from 'react'
import styled from 'styled-components'
import { Alert } from './Alert'
import { COLOR } from '@eulogise/client-core'
import { WarningIcon } from '../icons'
import { AlertStyles } from './Alert.styles'

// @ts-ignore
export const WarningAlert = styled(Alert).attrs({
  icon: <WarningIcon />,
})`
  ${AlertStyles};
  color: ${COLOR.WARNING};
`
