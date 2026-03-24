import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchFilter } from './SearchFilter'
import { COLOR, STYLE } from '@eulogise/client-core'
import { SearchIcon, CloseIcon } from '../icons'
import { IconButton } from '../Button/IconButton'
import { Input } from '../Input'
import { SearchAndFilterBarItemProps } from './SearchAndFilterBar.types'
import { ButtonType } from '../Button'

const StyledPortalSearchAndFilterBar = styled.div`
  border: 1px solid ${COLOR.CORE_PURPLE};
  border-radius: 3rem;
  display: flex;
  padding: 0.25rem;
  margin-bottom: 2rem;
  min-height: 66px;
`

const SearchAndFilterBarItemsContainer = styled.div`
  display: flex;
  flex: 1;
`

const SearchAndFilterBarItem = styled.div`
  min-width: 250px;
  width: 250px;
  position: relative;
  &:after {
    content: ' ';
    border-right: 1px solid ${COLOR.GREY};
    position: absolute;
    right: 0;
    top: 25%;
    height: 50%;
  }
  padding-left: 0.5rem;
`

type SearchAndFilterBarProps = {
  filters: Array<SearchAndFilterBarItemProps>
  searchText?: string
  selectedFilters: { [filterKey: string]: string }
  onFilterChange: (filter: { [key: string]: string }) => void
  onSearchTextChange: (text: string) => void
  welcomeText?: string
  isDropdownHighlighted?: boolean
  isSearchButtonHighlighted?: boolean
}

// @ts-ignore
const SearchButton = styled(IconButton)`
  width: auto;
  height: auto;
  padding: 0.5rem;
  margin: 0 0.5rem;
  span {
    font-size: 1.8rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`

const SearchInput = styled(Input)`
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  margin: 0 1rem;
  &,
  &:hover,
  &:focus,
  &:active {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
`

const WelcomeText = styled.div`
  font-size: 1rem;
  padding: 1rem;
  background-color: ${COLOR.PASTEL_BLUE};
  color: ${COLOR.BLACK};
  flex: 1;
  border-radius: 3rem 0 0 3rem;
`

export const SearchAndFilterBar = ({
  filters,
  searchText,
  selectedFilters = {},
  onFilterChange,
  onSearchTextChange,
  welcomeText,
  isDropdownHighlighted = false,
  isSearchButtonHighlighted = false,
}: SearchAndFilterBarProps) => {
  const [isShowSearchInput, setIsShowSearchInput] = useState<boolean>(false)
  return (
    <StyledPortalSearchAndFilterBar>
      {isShowSearchInput ? (
        <SearchInput
          placeholder="Search by name, family member or email"
          value={searchText}
          onChange={(ev: any) => {
            onSearchTextChange(ev.target.value)
          }}
        />
      ) : (
        <SearchAndFilterBarItemsContainer>
          {welcomeText && <WelcomeText>{welcomeText}</WelcomeText>}
        </SearchAndFilterBarItemsContainer>
      )}
      {filters.map(({ key, title, defaultText, items }) => {
        const foundFilterValue = selectedFilters[key]
        return (
          <SearchAndFilterBarItem key={title}>
            <SearchFilter
              title={title}
              defaultText={defaultText}
              value={foundFilterValue}
              items={items}
              onSelect={(ev) =>
                onFilterChange({
                  ...selectedFilters,
                  [key]: ev.key,
                })
              }
              isDropdownHighlighted={isDropdownHighlighted}
            />
          </SearchAndFilterBarItem>
        )
      })}
      <ButtonContainer>
        <SearchButton
          icon={isShowSearchInput ? <CloseIcon /> : <SearchIcon />}
          buttonType={
            isSearchButtonHighlighted
              ? ButtonType.HIGHLIGHTED_BUTTON
              : ButtonType.CORE_PURPLE
          }
          onClick={() => {
            if (isShowSearchInput) {
              onSearchTextChange('')
            }
            setIsShowSearchInput(!isShowSearchInput)
          }}
        />
      </ButtonContainer>
    </StyledPortalSearchAndFilterBar>
  )
}
