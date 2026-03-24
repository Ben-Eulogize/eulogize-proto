import React, { useEffect } from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import { Button, HeaderTextLG, Text } from '@eulogise/client-components'
import { PreLoggedInLayout } from '../../components/Layout/PreLoggedInLayout'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'
import { EulogisePage, EulogiseProduct, EulogiseRegion } from '@eulogise/core'
import {
  CardProductHelper,
  NavigationHelper,
  StringHelper,
} from '@eulogise/helpers'
import Logo from '../Logo/Logo'

interface IBaseInvitePreviewPageProps {
  invitorName: string
  deceasedFullName: string
  onMount: () => void
  location: WindowLocation
  product: EulogiseProduct
  onWatch: () => void
  previewText: string
  region: EulogiseRegion
  isShowCreateTribute?: boolean
}

const StyledBaseInvitePage = styled(PreLoggedInLayout)`
  color: ${COLOR.TEXT_COLOR};
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledButton = styled(Button)`
  margin: 1.8rem 0 1rem;
`

const StyledText = styled(Text)`
  display: inline-block;
  margin: 0.5rem 0;
`

const Content = styled.div`
  padding: 2rem 1rem;
  ${SCREEN_SIZE.TABLET} {
    padding: 2rem 4rem;
  }
`

const StyledLogo = styled(Logo)`
  margin: 0.5rem auto;
`

const BaseInvitePreviewPage = ({
  invitorName,
  deceasedFullName,
  onMount,
  location,
  product,
  onWatch,
  previewText,
  region,
  isShowCreateTribute,
}: IBaseInvitePreviewPageProps) => {
  const pageTitle = CardProductHelper.getDownloadProductName({
    product,
  })
  useEffect(() => {
    onMount()
  }, [])
  const productShortName = CardProductHelper.getProductShortName({
    product,
    region,
  })
  const isVowel = StringHelper.isVowel(productShortName)

  return (
    <StyledBaseInvitePage title={pageTitle} location={location} noRedirect>
      <Content>
        <HeaderTextLG>{pageTitle}</HeaderTextLG>
        <StyledText>
          {invitorName} has invited you to preview {isVowel ? ' an ' : ' a '}
          {CardProductHelper.getProductShortName({
            product,
            region,
          }).toLowerCase()}{' '}
          in honour of {deceasedFullName}
        </StyledText>
        <br />
        <StyledButton onClick={onWatch}>{previewText}</StyledButton>
        <br />
        <StyledLogo />
        {isShowCreateTribute && (
          <>
            <StyledText>
              Eulogize is the easiest way to quickly make beautiful video
              tributes, orders of service and other funeral memorials.
            </StyledText>
            <StyledText>
              Need to make your own video,{' '}
              {CardProductHelper.getProductShortName({
                product: EulogiseProduct.BOOKLET,
                region,
              }).toLowerCase()}{' '}
              or other funeral keepsake?
            </StyledText>
            <br />
            <StyledButton
              onClick={() => {
                NavigationHelper.navigate(EulogisePage.SIGN_UP)
              }}
            >
              Create a tribute
            </StyledButton>
          </>
        )}
      </Content>
    </StyledBaseInvitePage>
  )
}

export default BaseInvitePreviewPage
