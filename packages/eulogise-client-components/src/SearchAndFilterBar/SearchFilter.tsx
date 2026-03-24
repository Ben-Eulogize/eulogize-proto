import React from 'react'
import styled from 'styled-components'
import { Dropdown, DropdownItemProps } from '../Dropdown'
import { ChevronDownIcon } from '../icons'
import { COLOR, STYLE } from '@eulogise/client-core'

const StyledPortalFilter = styled.div`
  border-radius: 3rem;
  overflow: hidden;
  padding: 0 1.4rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
`

type MenuItemClickEvent = {
  key: string
  keyPath: Array<string>
  domEvent: any
}

type SearchFilterProps = {
  title: string
  defaultText: string
  value?: string
  items: Array<DropdownItemProps>
  onSelect: (ev: MenuItemClickEvent) => void
  isDropdownHighlighted?: boolean
}

const FilterTitle = styled.div`
  color: ${COLOR.NEUTRAL_GREY};
  font-weight: ${STYLE.FONT_WEIGHT_SEMI_BOLD};
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
`

const SelectedDropdownText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  font-weight: ${STYLE.FONT_WEIGHT_NORMAL};
`

const StyledDropdownText = styled.div<{
  $isDropdownHighlighted?: boolean
}>`
  ${({ $isDropdownHighlighted }) =>
    $isDropdownHighlighted ? `background-color: ${COLOR.TEAL_BLUE};` : ''}
`

// @ts-ignore
const StyledChevronDownIcon = styled(ChevronDownIcon)`
  font-size: 1rem;
  margin: 7px 0px 0px 10px;
  scale: 1.3;
`

export const SearchFilter = ({
  title,
  defaultText,
  value,
  items,
  onSelect,
  isDropdownHighlighted,
}: SearchFilterProps) => {
  const displayText = items.find((i) => i.key === value)?.label || defaultText
  return (
    <StyledPortalFilter>
      <FilterTitle>{title}</FilterTitle>
      <Dropdown
        menu={{
          items,
          onClick: (ev: MenuItemClickEvent) => {
            onSelect(ev)
          },
        }}
        trigger={['click']}
      >
        <SelectedDropdownText>
          <StyledDropdownText $isDropdownHighlighted={isDropdownHighlighted}>
            {displayText}
          </StyledDropdownText>
          <StyledChevronDownIcon />
        </SelectedDropdownText>
      </Dropdown>
    </StyledPortalFilter>
  )
}
