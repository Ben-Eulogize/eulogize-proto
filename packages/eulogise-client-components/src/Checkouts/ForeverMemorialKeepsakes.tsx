import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { ForeverMemorialKeepsakeSingle } from './ForeverMemorialKeepsakeSingle'

const StyledContainer = styled.div`
  padding: 40px 24px;
  background-color: ${COLOR.WARM_GREY_WHITE_BG};
  border-radius: 10px;
`

const StyledTitle = styled.div`
  font-family: 'Greycliff';
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  padding-bottom: 16px;
`

const StyledDescription = styled.div`
  font-family: 'Greycliff';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 24px;
`

interface IForeverMemorialKeepsakesProps {
  keepSakes: Array<any>
}

export const ForeverMemorialKeepsakes: React.FC<
  IForeverMemorialKeepsakesProps
> = ({ keepSakes }) => {
  return (
    <StyledContainer>
      <StyledTitle>Forever keepsakes</StyledTitle>
      <StyledDescription>Something special to remember them.</StyledDescription>
      {keepSakes.map((keepsake) => {
        const {
          thumbnailSrc,
          title,
          description,
          isDescriptionClickable,
          onViewProduct,
        } = keepsake
        return (
          <ForeverMemorialKeepsakeSingle
            thumbnailSrc={thumbnailSrc}
            title={title}
            description={description}
            isDescriptionClickable={isDescriptionClickable}
            onViewProduct={onViewProduct}
          />
        )
      })}
    </StyledContainer>
  )
}
