import React from 'react'
import styled from 'styled-components'

import { COLOR } from '@eulogise/client-core'
import { AddOverlayIcon } from './AddOverlayIcon'

export default {
  title: 'Icons/AddOverlayIcon',
  component: AddOverlayIcon,
  argTypes: {},
}

const StyledRemoveImageIcon = styled(AddOverlayIcon)``
const StyledPrimaryRemoveImageIcon = styled(AddOverlayIcon)`
  color: ${COLOR.PRIMARY};
`

export const Default = () => <StyledRemoveImageIcon />
export const PrimaryColor = () => <StyledPrimaryRemoveImageIcon />
