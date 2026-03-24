import React, { useState } from 'react'

import { SearchAndFilterBar } from './SearchAndFilterBar'
import {
  ALL_SEARCH_FILTERS,
  DEFAULT_SEARCH_FILTERS,
} from './SearchFilter.constants'
import { SearchAndFilterBarItemProps } from './SearchAndFilterBar.types'

export default {
  title: 'Table/SearchAndFilterBar',
  component: SearchAndFilterBar,
  argTypes: {},
}

const Template = ({
  filters,
  welcomeText,
}: {
  filters: Array<SearchAndFilterBarItemProps>
  welcomeText?: string
}) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string
  }>({})
  const [searchText, setSearchText] = useState<string>()
  return (
    <SearchAndFilterBar
      welcomeText={welcomeText}
      filters={filters}
      searchText={searchText}
      selectedFilters={selectedFilters}
      onFilterChange={(filter) => setSelectedFilters(filter)}
      onSearchTextChange={(text) => setSearchText(text)}
    />
  )
}

export const Default = () => <Template filters={DEFAULT_SEARCH_FILTERS} />
export const WithWelcomeText = () => (
  <Template
    filters={DEFAULT_SEARCH_FILTERS}
    welcomeText={`Welcome Eric. View, edit and create new customer memorials here`}
  />
)
export const IVC = () => <Template filters={ALL_SEARCH_FILTERS} />
