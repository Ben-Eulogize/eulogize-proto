import React from 'react'
import styled from 'styled-components'
import { HeaderTextLG } from '@eulogise/client-components'
import { ICaseState } from '@eulogise/core'
import { useCaseState } from '../../store/hooks'
import CaseEditForm from './CaseEditForm'

interface ICaseEditProps {}

const StyledCaseEdit = styled.div`
  margin: 2rem 0;
`

const CaseEdit: React.FC<ICaseEditProps> = () => {
  const { activeItem: activeCase }: ICaseState = useCaseState()
  if (!activeCase) {
    return null
  }
  return (
    <StyledCaseEdit>
      <HeaderTextLG>Case Details</HeaderTextLG>
      <CaseEditForm currentCase={activeCase} />
    </StyledCaseEdit>
  )
}

export default CaseEdit
