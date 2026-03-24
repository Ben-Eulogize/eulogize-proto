import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

const StyledContainer = styled.div`
  padding: 24px;
  background-color: ${COLOR.CORE_PURPLE_10};
  border-radius: 10px;
`

const StyledTitle = styled.div`
  font-family: 'Greycliff';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  padding-bottom: 24px;
`

const StyledDescription = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding: 8px 0;
`

const StyledTextContainer = styled.div`
  font-family: 'Greycliff';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
`

const StyledGoToDashboardText = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: underline;
  padding: 10px 0;
  cursor: pointer;
`

interface IStillEditingTributesProps {
  onRedirectToDashboard: () => void
}

export const StillEditingTributes: React.FC<IStillEditingTributesProps> = ({
  onRedirectToDashboard,
}) => {
  return (
    <StyledContainer>
      <StyledTitle>Creating more tributes?</StyledTitle>
      <StyledTextContainer>
        <StyledDescription>
          You can still start or continue other tributes.
        </StyledDescription>
        <StyledGoToDashboardText onClick={onRedirectToDashboard}>
          Go to Homepage
        </StyledGoToDashboardText>
      </StyledTextContainer>
    </StyledContainer>
  )
}
