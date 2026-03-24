import React from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { Text, HeaderTextLG, Button } from '@eulogise/client-components'
import { useCaseState } from '../../ui/store/hooks'
import { PreLoggedInLayout } from '../../ui/components/Layout/PreLoggedInLayout'
import { ICaseState, EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

const StyledContributorWelcomePage = styled(PreLoggedInLayout)`
  color: ${COLOR.TEXT_COLOR};
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Content = styled.div`
  padding-top: 2rem;
`

const ContinueButton = styled(Button)`
  margin-top: 5rem;
`

const ContributorWelcomePage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id

  if (!caseId) {
    return null
  }
  const deceasedFullName = activeCase?.deceased?.fullName
  return (
    <StyledContributorWelcomePage
      title="Welcome"
      location={location}
      noRedirect
    >
      <Content>
        <HeaderTextLG>Welcome to Eulogize</HeaderTextLG>
        <Text>
          You have been invited to add pictures to <br />
          feature in the visual tribute and funeral stationery for&nbsp;
          {deceasedFullName}.
        </Text>
        <br />
        <ContinueButton
          onClick={() => NavigationHelper.navigate(EulogisePage.DASHBOARD)}
        >
          Continue
        </ContinueButton>
      </Content>
    </StyledContributorWelcomePage>
  )
}

export default ContributorWelcomePage
