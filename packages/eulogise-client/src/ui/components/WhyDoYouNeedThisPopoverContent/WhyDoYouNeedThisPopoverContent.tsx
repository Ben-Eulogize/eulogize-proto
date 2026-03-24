import styled from 'styled-components'
import React from 'react'
import { Button, ButtonType } from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  background-color: ${COLOR.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const StyledTitleTextContainer = styled.div`
  padding-top: 8px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${COLOR.DARK_BLUE};
  border-radius: 50px;
`

const StyledTitleText = styled.div`
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
`

const StyledGuideMainContent = styled.div`
  text-align: left;
  padding: 20px;
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
  background-color: ${COLOR.PASTEL_BLUE};
`

const StyledGuideSecondContent = styled.div`
  text-align: left;
  padding: 10px 20px 30px 20px;
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
  background-color: ${COLOR.PASTEL_BLUE};
  border-radius: 0 0 25px 25px;
`

const StyledCloseButton = styled(Button)`
  margin-top: 8px;
`

const StyledPopoverContentContainer = styled.div`
  border-radius: 25px;
`

const TITLE = 'Why is my country / location relevant?'

const MAIN_CONTENT = `Different countries and regions around the world use different paper sizes. Selecting your country allows Eulogize to provide you with templates best suited for the printers and paper stock in your home country.`

const SECOND_CONTENT = `For some countries it also allows us to offer payment in your local currency.`

export const WhyDoYouNeedThisPopoverContent = ({
  onClose,
}: {
  onClose: () => void
}) => {
  return (
    <StyledPopoverContentContainer>
      <StyledTitleContainer>
        <StyledTitleTextContainer>
          <StyledTitleText>{TITLE}</StyledTitleText>
        </StyledTitleTextContainer>
        <StyledCloseButton
          buttonType={ButtonType.TRANSPARENT}
          onClick={() => onClose()}
        >
          Close
        </StyledCloseButton>
      </StyledTitleContainer>

      <StyledGuideMainContent>{MAIN_CONTENT}</StyledGuideMainContent>

      <StyledGuideSecondContent>{SECOND_CONTENT}</StyledGuideSecondContent>
    </StyledPopoverContentContainer>
  )
}
