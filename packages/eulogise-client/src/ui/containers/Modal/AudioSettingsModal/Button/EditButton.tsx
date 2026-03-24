import React from 'react'
import styled from 'styled-components'
import { EditIcon } from '@eulogise/client-components'
import BasicMusicButton from './BasicMusicButton'

const EditButton = styled(BasicMusicButton).attrs({
  children: <EditIcon />,
})``

export default EditButton
