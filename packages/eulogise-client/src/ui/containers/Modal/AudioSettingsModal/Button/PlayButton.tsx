import React from 'react'
import styled from 'styled-components'
import { PlayIcon } from '@eulogise/client-components'
import BasicMusicButton from './BasicMusicButton'

const PlayButton = styled(BasicMusicButton).attrs({
  children: <PlayIcon />,
})``

export default PlayButton
