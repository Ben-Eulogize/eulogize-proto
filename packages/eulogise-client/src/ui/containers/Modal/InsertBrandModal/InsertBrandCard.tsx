import React from 'react'
import styled from 'styled-components'
import { Card, Radio } from '@eulogise/client-components'

interface IInsertBrandCardProps {
  index: number
  clientBrandHandle: string
  selectedBrandIndex: number | null
  onSelectBrandRadio: (selectedBrandIndex: number) => void
}

const BRAND_SIZE = 90

const StyledBrandsCard = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`

const StyledBrandsOperationContainer = styled.div``

const StyledBrandsCardImg = styled.img`
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const StyledBrandsOperationText = styled.div`
  margin-top: 4px;
`

const StyledBrandRadio = styled(Radio)`
  margin-top: 8px;
`

const getBrandUrlByHandle = (brandHandle: string) => {
  if (!brandHandle) {
    return ''
  }
  return `${process.env.GATSBY_FILESTACK_CDN}/${brandHandle}`
}

const InsertBrandCard: React.FunctionComponent<IInsertBrandCardProps> = ({
  index,
  clientBrandHandle,
  selectedBrandIndex,
  onSelectBrandRadio,
}) => {
  return (
    <StyledBrandsCard bordered={false}>
      <StyledBrandsCardImg
        height={BRAND_SIZE}
        alt="Logo"
        src={getBrandUrlByHandle(clientBrandHandle)}
      />
      <StyledBrandsOperationContainer>
        <StyledBrandRadio
          checked={selectedBrandIndex === index}
          onClick={() => onSelectBrandRadio(index)}
        />
        <StyledBrandsOperationText>
          Option {index + 1}
        </StyledBrandsOperationText>
      </StyledBrandsOperationContainer>
    </StyledBrandsCard>
  )
}

export default InsertBrandCard
