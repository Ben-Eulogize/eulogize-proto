import React from 'react'
import styled from 'styled-components'
import { StopIcon } from '@eulogise/client-components'
import BasicMusicButton from './BasicMusicButton'

const StopButton = styled(BasicMusicButton).attrs({
  children: <StopIcon />,
})``

export default StopButton
