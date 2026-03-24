import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { Helmet } from 'react-helmet'
import { COLOR, SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import { Button, ButtonType } from '@eulogise/client-components'
import { LogoIcon } from '../ui/components/icons/LogoIcon'
import Footer from '../ui/components/Layout/Footer'
import {
  CaseHelper,
  ImageHelper,
  NavigationHelper,
  UrlHelper,
} from '@eulogise/helpers'
import { EulogisePage, IEulogiseUser } from '@eulogise/core'
import { fetchCaseById } from '../ui/store/CaseState/actions'
import {
  useCaseState,
  useEulogiseDispatch,
  useShareState,
} from '../ui/store/hooks'
import { fetchSharesByCaseId } from '../ui/store/ShareState/actions'

const PageContainer = styled.div``

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
  ${SCREEN_SIZE.TABLET} {
    margin: 2.5rem 0;
  }
`

const StyledLogo = styled(LogoIcon)`
  height: 2.5rem;

  ${SCREEN_SIZE.TABLET} {
    height: 4.5rem;
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 24rem;
  min-height: 90vh;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${COLOR.WHITE};
  ${SCREEN_SIZE.TABLET} {
    width: 50rem;
  }
`

const ShareMessage = styled.p`
  color: ${COLOR.TEXT_COLOR};
  font-size: ${STYLE.FONT_SIZE_MD};
  text-align: center;
  margin-bottom: 2rem;
`

const TributeCard = styled.div`
  background-color: ${COLOR.PASTEL_BLUE};
  border-radius: 12px;
  border: 1px solid ${COLOR.BORDER_COLOR};
  padding: 1.5rem 1rem;
  width: fit-content;
  margin: 1.5rem auto;
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.15);
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    width: 100%;
    margin: 5rem auto;
  }
`

const TributeCardLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${SCREEN_SIZE.TABLET} {
    flex: 1;
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  }
`
const TributeCardRightContainer = styled.div`
  ${SCREEN_SIZE.TABLET} {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const PhotoContainer = styled.div`
  border-radius: ${STYLE.BORDER_RADIUS};
  border: 1rem solid ${COLOR.WHITE};
  background-color: ${COLOR.WHITE};
`

const TributeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    margin: 2rem 0;
  }
`

const InMemoryText = styled.p`
  ${STYLE.TEXT_SMALL};
  color: ${COLOR.TEXT_COLOR};
  margin: 2.5rem 0 0 0;
  ${SCREEN_SIZE.TABLET} {
    margin: 0;
    ${STYLE.TEXT_MEDIUM};
  }
`

const DeceasedName = styled.div`
  ${STYLE.HEADING_EXTRA_LARGE};
  margin: 1.5rem 0 0 0;
  ${SCREEN_SIZE.TABLET} {
    font-size: 3.25rem;
    margin: 2.5rem 0 0 0;
  }
`

const DateRange = styled.p`
  ${STYLE.TEXT_SMALL};
  margin: 1.5rem 0 0 0;
  ${SCREEN_SIZE.TABLET} {
    ${STYLE.TEXT_MEDIUM};
    margin: 2.5rem 0 0 0;
  }
`

const ViewTributeButton = styled(Button)`
  margin: 1.5rem 0 3rem;
  ${SCREEN_SIZE.TABLET} {
    margin: 4.5rem 0 0 0;
  }
`

const SplashImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const SharesPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const { share } = useShareState()
  const { activeItem: activeCase } = useCaseState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useEulogiseDispatch()

  const { caseId } = UrlHelper.getParams(EulogisePage.SHARE_TRIBUTES, location)

  useEffect(() => {
    if (caseId) {
      setIsLoading(true)
      dispatch(fetchCaseById({ caseId, isShareFlow: true }))
      dispatch(
        fetchSharesByCaseId({
          caseId,
          success: () => {
            setIsLoading(false)
          },
          error: () => {
            setIsLoading(false)
          },
        }),
      )
    }
  }, [caseId])

  const deceased = activeCase?.deceased

  if (!deceased) {
    return null
  }

  const handleViewTributes = () => {
    NavigationHelper.navigate(EulogisePage.SHARE_DOWNLOAD_TRIBUTES, {
      caseId,
    })
  }

  const primaryImage = CaseHelper.getPrimaryImage({ activeCase })
  const imageUrl = primaryImage ? ImageHelper.getImageUrl(primaryImage) : null
  const deceasedFullName = deceased.fullName
  const invitorName = (share?.createdBy as unknown as IEulogiseUser)?.fullName
  const dateOfBirthDisplay = CaseHelper.getDateOfBirthDisplay(activeCase!)
  const dateOfDeathDisplay = CaseHelper.getDateOfDeathDisplay(activeCase!)
  return (
    <PageContainer>
      <Helmet>
        <title>
          {isLoading
            ? `Loading... - Eulogize`
            : !share
            ? `Share Not Found - Eulogize`
            : deceasedFullName
            ? `In Memory of ${deceasedFullName} - Eulogize`
            : 'Eulogize'}
        </title>
      </Helmet>
      <Header>
        <StyledLogo />
      </Header>
      <MainContent>
        {isLoading ? (
          <ShareMessage>Loading...</ShareMessage>
        ) : !share ? (
          <ShareMessage>Share not found</ShareMessage>
        ) : (
          <>
            <ShareMessage>
              {invitorName} has shared their memorial tribute files with you for{' '}
              {deceasedFullName}
            </ShareMessage>
            <TributeCard>
              <TributeCardLeftContainer>
                <div>
                  <PhotoContainer>
                    {imageUrl && <SplashImage src={imageUrl} />}
                  </PhotoContainer>
                </div>
              </TributeCardLeftContainer>
              <TributeCardRightContainer>
                <TributeInfo>
                  <InMemoryText>In Loving memory of</InMemoryText>
                  <DeceasedName>{deceasedFullName}</DeceasedName>
                  {dateOfBirthDisplay && dateOfDeathDisplay && (
                    <DateRange>
                      {dateOfBirthDisplay} - {dateOfDeathDisplay}
                    </DateRange>
                  )}
                  <ViewTributeButton
                    buttonType={ButtonType.CORE_PURPLE}
                    onClick={handleViewTributes}
                  >
                    View tributes
                  </ViewTributeButton>
                </TributeInfo>
              </TributeCardRightContainer>
            </TributeCard>
          </>
        )}
      </MainContent>
      <Footer />
    </PageContainer>
  )
}

export default SharesPage
