import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

const StyledContainer = styled.div`
  background-color: ${COLOR.WARM_GREY_WHITE_BG};
`

const StyledContentContainer = styled.div`
  padding: 16px 0 0 0;
  display: flex;
`

const StyledThumbnail = styled.img`
  max-width: 166px;
  border-radius: 5px;
`

const StyledTextContainer = styled.div`
  padding-left: 16px;
`

const StyledTitle = styled.div`
  padding: 16px 0;
  font-family: 'Greycliff';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
`

const StyledDescription = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`

const StyledClickableDescription = styled.a`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: underline;
  color: black;
`

// const StyledBorder = styled.div`
//   position: relative;
//   width: 100%;
//   margin: 16px auto 0 auto;
//   border-bottom: 2px solid;
//   border-color: ${COLOR.CORE_PURPLE_10};
// `

interface IForeverMemorialKeepsakeSingleProps {
  thumbnailSrc: string | null
  title: string
  description: string
  isDescriptionClickable: boolean
  onViewProduct: () => null
}

export const ForeverMemorialKeepsakeSingle: React.FC<
  IForeverMemorialKeepsakeSingleProps
> = ({
  thumbnailSrc,
  title,
  description,
  isDescriptionClickable,
  onViewProduct,
}) => {
  return (
    <StyledContainer>
      <StyledContentContainer>
        <StyledThumbnail src={thumbnailSrc!} />
        <StyledTextContainer>
          <StyledTitle>{title}</StyledTitle>
          {isDescriptionClickable ? (
            <StyledClickableDescription onClick={onViewProduct}>
              {description}
            </StyledClickableDescription>
          ) : (
            <StyledDescription>{description}</StyledDescription>
          )}
        </StyledTextContainer>
      </StyledContentContainer>
      {/* <StyledBorder /> */}
    </StyledContainer>
  )
}
