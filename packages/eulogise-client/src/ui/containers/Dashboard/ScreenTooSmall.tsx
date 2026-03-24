import React from 'react'
import styled from 'styled-components'
import ScreenTooSmallPageContent from './ScreenTooSmallPageContent'
import { Alert } from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import { useCaseState } from '../../store/hooks'
import { ICaseState } from '@eulogise/core'

const StyledScreenTooSmall = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`
const StyledAlert = styled(Alert)`
  margin-left: ${STYLE.CONTENT_PADDING};
`

const PageContent = styled.div`
  padding: 0 ${STYLE.CONTENT_PADDING};
  flex: 1;
  display: flex;
`

const ScreenTooSmall = () => {
  const caseState: ICaseState = useCaseState()
  const activeCase = caseState?.activeItem
  const deceasedFullName: string = activeCase?.deceased?.fullName
  return (
    <StyledScreenTooSmall>
      <StyledAlert noBorderRightRadius>
        Upload your photos of {deceasedFullName} here
      </StyledAlert>
      <PageContent>
        <ScreenTooSmallPageContent />
      </PageContent>
    </StyledScreenTooSmall>
  )
}

export default ScreenTooSmall
