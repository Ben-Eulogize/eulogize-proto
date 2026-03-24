import React from 'react'
import styled from 'styled-components'
// import { Button, ButtonType } from '@eulogise/client-components'
import {
  EulogiseProduct,
  ICardProductBackgroundImage,
  ICardProductBackgroundImageBase,
} from '@eulogise/core'
import BackgroundImageSelectionList from '../selection/BackgroundImageSelectionList'

interface ISelectBackgroundImageViewProps {
  onApply: (
    product: EulogiseProduct,
    backgroundImage: ICardProductBackgroundImage,
  ) => void
  onEdit: (backgroundImage: ICardProductBackgroundImageBase) => void
  // onApplyBlankBackground: () => void
}

// const StyledNoBackgroundButtonContainer = styled.div`
//   margin-bottom: 20px;
//   display: flex;
//   justify-content: flex-end;
//   margin-right: 60px;
// `

// const StyledNoBackgroundButton = styled(Button)`
//   min-width: 155px;
// `

const StyledSelectBackgroundImageView = styled.div``

const SelectBackgroundImageView: React.FC<ISelectBackgroundImageViewProps> = ({
  onApply,
  onEdit,
  // onApplyBlankBackground,
}) => (
  <StyledSelectBackgroundImageView>
    {/* <StyledNoBackgroundButtonContainer>
      <StyledNoBackgroundButton
        disabled={false}
        buttonType={ButtonType.TRANSPARENT}
        onClick={onApplyBlankBackground}
      >
        No Background
      </StyledNoBackgroundButton>
    </StyledNoBackgroundButtonContainer> */}
    <BackgroundImageSelectionList onApply={onApply} onEdit={onEdit} />
  </StyledSelectBackgroundImageView>
)

export default SelectBackgroundImageView
