import React from 'react'
import styled from 'styled-components'
import { RemoveIcon } from '@eulogise/client-components'
import BasicMusicButton from './BasicMusicButton'

const RemoveButton = styled(BasicMusicButton).attrs({
  children: <RemoveIcon />,
})``

export default RemoveButton
