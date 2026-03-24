import React from 'react'
import styled from 'styled-components'
import EulogizeMemorialCardImageSrc from './eulogize-memorial-card.png'
import { COLOR, SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import { LinkArrowRightIcon } from '@eulogise/client-components'

const StyledEulogizeMemorialCard = styled.div`
  border: 1px solid ${COLOR.CORE_PURPLE};
  border-radius: 0.5rem;
  overflow: hidden;
  max-width: 100%;
  ${SCREEN_SIZE.DESKTOP} {
    width: 395px;
  }
`

const EulogizeMemorialCardImage = styled.div<{ $src: string }>`
  height: 12.5rem;
  ${({ $src }) =>
    $src &&
    `
    background-image: url(${$src});
    background-position: center center;
    background-size: cover;
  `}
`

const ContentSection = styled.div`
  margin-top: -.75rem;
  display: flex;
  background: linear-gradient(#c176d3, #9e51b1);
  color ${COLOR.WHITE};
  padding: 1rem;
  position: relative;
  height: 100%;
  justify-content: space-between;
`

const ContentSectionTitle = styled.div`
  ${STYLE.HEADING_MEDIUM};
  margin-bottom: 0.5rem;
`

const ContentSectionDescription = styled.div`
  ${STYLE.TEXT_SMALL};
`

const ContentSectionLeft = styled.div`
  padding: 0 0.5rem;
`

const ContentSectionRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
`

const StyledArrowRightButton = styled.div`
  background-color: ${COLOR.WHITE};
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 2rem;
  color: ${COLOR.BLACK};
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

type IEulogizeMemorialCardProps = {
  onArrowRightClick?: () => void
}

export const EulogizeMemorialCard = ({
  onArrowRightClick,
}: IEulogizeMemorialCardProps) => {
  return (
    <StyledEulogizeMemorialCard>
      <EulogizeMemorialCardImage $src={EulogizeMemorialCardImageSrc} />
      <ContentSection>
        <ContentSectionLeft>
          <ContentSectionTitle>Eulogize Memorials</ContentSectionTitle>
          <ContentSectionDescription>
            The easiest place to make beautiful tributes & memorials for your
            love one
          </ContentSectionDescription>
        </ContentSectionLeft>
        <ContentSectionRight>
          <StyledArrowRightButton onClick={onArrowRightClick}>
            <LinkArrowRightIcon />
          </StyledArrowRightButton>
        </ContentSectionRight>
      </ContentSection>
    </StyledEulogizeMemorialCard>
  )
}
