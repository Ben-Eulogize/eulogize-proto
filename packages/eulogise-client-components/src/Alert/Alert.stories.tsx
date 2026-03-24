import React from 'react'

import { Alert } from './Alert'
import { InfoAlert } from './InfoAlert'
import { WarningAlert } from './WarningAlert'

export default {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export const Default = () => <Alert>Header</Alert>
export const NoBorderRadius = () => <Alert noBorderRightRadius>Header</Alert>

export const Info = () => <InfoAlert>Info</InfoAlert>
export const Warning = () => <WarningAlert>Warning</WarningAlert>
