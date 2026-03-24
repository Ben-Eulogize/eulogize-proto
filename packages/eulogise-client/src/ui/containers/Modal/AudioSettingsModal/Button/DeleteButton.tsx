import React from 'react'
import styled from 'styled-components'
import { DeleteIcon } from '@eulogise/client-components'
import BasicMusicButton from './BasicMusicButton'

const DeleteButton = styled(BasicMusicButton).attrs({
  children: <DeleteIcon />,
})``

export default DeleteButton
