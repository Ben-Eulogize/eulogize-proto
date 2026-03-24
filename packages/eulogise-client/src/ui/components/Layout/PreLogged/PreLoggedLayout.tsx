import React, { useEffect } from 'react'
import './preLoggedLayout.css'
import './preLoggedLayout.less'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import { Helmet } from 'react-helmet'
import { Layout as AntLayout } from 'antd'
import 'antd/dist/antd.less'
import 'draft-js/dist/Draft.css'
import Header from '../Header'
import Footer from '../Footer'
import Content from '../Content'
import CoverImageSrc from './sign-up-cover-image.png'

import {
  COLOR,
  EulogiseClientConfig,
  EulogiseFilestackEndpoint,
  SCREEN_SIZE,
  STYLE,
} from '@eulogise/client-core'
import useDevelopment from '../../../hooks/useDevelopment'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect'
import { useAuthState, useEulogiseDispatch } from '../../../store/hooks'
import { EulogiseUserRole, ModalId } from '@eulogise/core'
import { showModalAction } from '../../../store/ModalState/actions'
import { Title } from '@eulogise/client-components'

interface ILayoutProps {
  children: React.ReactNode
  title: string
  className?: string
  location: WindowLocation
  noRedirect?: boolean
  noPadding?: boolean
  isLoading?: boolean
  shouldHideFooter?: boolean
}

const CoverImage = styled.img.attrs({
  src: CoverImageSrc,
  alt: 'cover',
})`
  width: 80%;
  margin: 0 auto;
  display: block;
`

const StyledTitle = styled(Title)`
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.HEADING_FONT_SIZE_EXTRA_SMALL_LARGE};
  padding: 5rem 0 1.2rem;
  display: block;
`

const StyledSubTitle = styled(Title)`
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.HEADING_FONT_SIZE_LARGE};
  padding-bottom: 1.4rem;
`

const ProductTextList = styled.div`
  ${SCREEN_SIZE.DESKTOP} {
    display: flex;
    flex-wrap: wrap;
  }
`

const ProductText = styled.div`
  ${SCREEN_SIZE.DESKTOP} {
    width: 33.33%;
  }
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.HEADING_FONT_SIZE_LARGE};
  text-align: center;
  padding-bottom: 1rem;
`

// @ts-ignore
const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`

const MainContentContainer = styled(AntLayout)`
  margin-top: 0;
`

const MainContent = styled.div`
  ${SCREEN_SIZE.DESKTOP} {
    display: flex;
  }
  width: 100%;
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const LeftContentContainer = styled(ContentContainer)`
  background-image: url(${`https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/pre-logged-bg-opacity.jpg`});
  background-size: cover;
`

const CoverContainer = styled.div`
  padding-bottom: 3rem;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`

const PreLoggedLayout: React.FunctionComponent<ILayoutProps> = ({
  children,
  title,
  className,
  location,
  isLoading,
  shouldHideFooter = false,
  noRedirect = false,
  noPadding = false,
}) => {
  useDevelopment()

  const { account } = useAuthState()
  const dispatch = useEulogiseDispatch()
  const userRole = account?.role

  const appName = EulogiseClientConfig.APP_NAME

  if (!noRedirect) {
    useAuthRedirect(location)
  }

  useEffect(() => {
    if (
      userRole === EulogiseUserRole.CLIENT ||
      userRole === EulogiseUserRole.EDITOR ||
      userRole === EulogiseUserRole.COEDITOR
    ) {
      if (!account?.acceptTerms) {
        dispatch(showModalAction(ModalId.FINALISE_SIGNUP))
      }
    }
  }, [userRole])

  return (
    <StyledLayout>
      <Helmet>
        <title>{title ? `${title} - ${appName}` : appName}</title>
        <link
          href={EulogiseFilestackEndpoint.FILESTACK_UMD_URL}
          rel="stylesheet"
        />
      </Helmet>
      <Header location={location} isLoading={isLoading} />

      <MainContentContainer>
        <MainContent>
          <LeftContentContainer>
            <Content
              noPadding={noPadding}
              padding="0.75rem 0.75rem 0 0.75rem"
              className={className}
            >
              {children}
            </Content>
          </LeftContentContainer>
          <ContentContainer
            style={{ backgroundColor: COLOR.PANEL_BACKGROUND_COLOR }}
          >
            <CoverContainer>
              <StyledTitle>Their Story, Your Memories</StyledTitle>
              <CoverImage />
              <StyledSubTitle>
                The easiest way to create beautiful tributes
              </StyledSubTitle>
              <ProductTextList>
                <ProductText>Memorial Videos</ProductText>
                <ProductText>Funeral Programs</ProductText>
                <ProductText>Service Cards</ProductText>
                <ProductText style={{ width: '100%' }}>& More</ProductText>
              </ProductTextList>
            </CoverContainer>
          </ContentContainer>
        </MainContent>
      </MainContentContainer>
      {!shouldHideFooter && <Footer />}
    </StyledLayout>
  )
}

export default PreLoggedLayout
