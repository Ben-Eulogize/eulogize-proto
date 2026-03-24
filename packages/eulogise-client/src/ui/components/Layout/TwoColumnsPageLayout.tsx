import React from 'react'
import styled from 'styled-components'
import { CHECKOUT_BREAKPOINT } from '@eulogise/client-core'

export const TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_MD_TO_LG = 283
export const TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_XL = 411
export const TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_MD_TO_LG = 589
export const TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_XL = 765
export const TWO_COLUMNS_PAGE_LAYOUT_MID_LAYOUT_WIDTH =
  TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_MD_TO_LG +
  TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_MD_TO_LG +
  24
export const TWO_COLUMNS_PAGE_LAYOUT_LARGE_LAYOUT_WIDTH =
  TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_XL +
  TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_XL +
  24

const Header = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    max-width: ${TWO_COLUMNS_PAGE_LAYOUT_MID_LAYOUT_WIDTH}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    max-width: ${TWO_COLUMNS_PAGE_LAYOUT_LARGE_LAYOUT_WIDTH}px;
  }
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    max-width: ${TWO_COLUMNS_PAGE_LAYOUT_MID_LAYOUT_WIDTH}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    max-width: ${TWO_COLUMNS_PAGE_LAYOUT_LARGE_LAYOUT_WIDTH}px;
  }
`

const HeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_XL}px;
  }
`

const HeaderRightContainer = styled.div`
  display: none;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    display: flex;
    width: ${TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
    justify-content: flex-end;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    display: flex;
    width: ${TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_XL}px;
    justify-content: flex-end;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }
`

const ContentLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_LEFT_COLUMN_WIDTH_XL}px;
  }
`

const ContentRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  flex-shrink: 0;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${TWO_COLUMNS_PAGE_LAYOUT_RIGHT_COLUMN_WIDTH_XL}px;
  }
`

type ITwoColumnPageLayoutProps = {
  headerLeft: React.ReactNode
  headerRight: React.ReactNode
  contentLeft: React.ReactNode
  contentRight: React.ReactNode
}

export const TwoColumnsPageLayout = ({
  headerLeft,
  headerRight,
  contentLeft,
  contentRight,
}: ITwoColumnPageLayoutProps) => (
  <div>
    <Header>
      <HeaderContainer>
        <HeaderLeftContainer>{headerLeft}</HeaderLeftContainer>
        <HeaderRightContainer>{headerRight}</HeaderRightContainer>
      </HeaderContainer>
    </Header>
    <Content>
      <ContentContainer>
        <ContentLeftContainer>{contentLeft}</ContentLeftContainer>
        <ContentRightContainer>{contentRight}</ContentRightContainer>
      </ContentContainer>
    </Content>
  </div>
)
