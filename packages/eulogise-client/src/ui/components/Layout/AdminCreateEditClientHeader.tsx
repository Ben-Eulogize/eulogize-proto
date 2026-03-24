import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ButtonType, Button } from '@eulogise/client-components'
import { useAuthState } from '../../store/hooks'
import { IAuthState } from '@eulogise/core'

const StyledEditorButtonGroupContainer = styled.div`
  display: flex;
  padding-right: 16px;
`

interface IAdminCreateEditClientHeader {
  location: Location
}

const AdminCreateEditClientHeader = ({
  location,
}: IAdminCreateEditClientHeader) => {
  const { account }: IAuthState = useAuthState()

  useEffect(() => {}, [])

  if (!account) {
    return null
  }
  return (
    <StyledEditorButtonGroupContainer>
      <Button
        disabled={true}
        noMarginRight
        buttonType={ButtonType.PRIMARY}
        onClick={() => {}}
        loading={false}
      >
        Save
      </Button>
    </StyledEditorButtonGroupContainer>
  )
}

export default AdminCreateEditClientHeader
