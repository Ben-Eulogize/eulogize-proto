import React from 'react'
import styled from 'styled-components'
import { Modal, IModalProps } from '@eulogise/client-components'
import { LogoIcon } from '../icons/LogoIcon'

const StyledLogoIcon = styled(LogoIcon)`
  height: 36px;
  margin-right: 10px;
`

export const EulogiseModal = (props: IModalProps) => (
  <Modal logo={<StyledLogoIcon />} {...props} />
)
