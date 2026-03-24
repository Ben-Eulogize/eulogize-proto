import React from 'react'
import styled from 'styled-components'
import { UseIcon } from '@eulogise/client-components'
import BasicMusicButton from './BasicMusicButton'

const UseButton = styled(BasicMusicButton).attrs({
  children: <UseIcon />,
})``

export default UseButton
