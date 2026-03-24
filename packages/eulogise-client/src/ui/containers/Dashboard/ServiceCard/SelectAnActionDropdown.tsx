import React from 'react'
import styled from 'styled-components'
import { STYLE, COLOR } from '@eulogise/client-core'
import { Dropdown, ChevronDownIcon } from '@eulogise/client-components'
interface ISelectAnActionDropdownProps {
  menu: any
  text?: string
  className?: string
  isVisible?: boolean
  isHighlighted?: boolean
}

const StyledSelectAnActionDropdown = styled(Dropdown)`
  border: 0;
  padding: 0;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${STYLE.TEXT_MEDIUM}

  &&& {
    ${({ $isHighlighted }) =>
      $isHighlighted &&
      `
          color: ${COLOR.TEXT_COLOR};
          overflow: hidden;
          width: initial;
          background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
          color: ${COLOR.WHITE};
        `}
  }
`

const StyledActionContainer = styled.div`
  border: 1.5px solid black;
  border-radius: 8px;
`

const DropdownText = styled.div`
  color: ${COLOR.DARK_BLUE};
`

const StyledTextContainer = styled.div`
  padding-left: 6px;
`

const StyledChevronDownIconContainer = styled(ChevronDownIcon)`
  padding-right: 1rem;
`

const SelectAnActionDropdown: React.FunctionComponent<
  ISelectAnActionDropdownProps
> = ({ menu, text, className, isVisible, isHighlighted }) => (
  <StyledSelectAnActionDropdown
    data-testid="select-action-dropdown"
    className={className}
    overlay={menu}
    trigger={['click']}
    visible={isVisible}
    placement="top"
    $isHighlighted={isHighlighted}
  >
    <StyledActionContainer>
      <StyledTextContainer>
        {text && <DropdownText>{text}</DropdownText>}
      </StyledTextContainer>

      <StyledChevronDownIconContainer>
        <ChevronDownIcon />
      </StyledChevronDownIconContainer>
    </StyledActionContainer>
  </StyledSelectAnActionDropdown>
)

export default SelectAnActionDropdown
