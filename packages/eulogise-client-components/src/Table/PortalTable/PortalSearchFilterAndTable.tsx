import React from 'react'
import styled from 'styled-components'
import { usePortalTableDataSource } from './PortalTable.hooks'
import {
  DEFAULT_SEARCH_FILTERS,
  SearchAndFilterBar,
} from '../../SearchAndFilterBar'
import {
  IPortalTableCellClickEvent,
  IPortalTableItem,
  IPortalTableResetClickEvent,
  PortalTable,
} from './PortalTable'
import { SearchAndFilterBarItemProps } from '../../SearchAndFilterBar/SearchAndFilterBar.types'

const StyledPortalSearchFilterAndTable = styled.div``

type IPortalSearchFilterAndTableProps = {
  dataSource: Array<IPortalTableItem>
  filters?: Array<SearchAndFilterBarItemProps>
  defaultFilters?: { [key: string]: string }
  excludeColumns?: Array<string>
  loading?: boolean
  ownerId: string
  isShowResetButton: boolean
  onCellClick: (event: IPortalTableCellClickEvent) => void
  onResetClick: (event: IPortalTableResetClickEvent) => void
  welcomeText?: string
  MemorialStatusPopoverComponent?: JSX.Element
  MemorialSettingsPopoverComponent?: JSX.Element
  MemorialDashboardPopoverComponent?: JSX.Element
  isDropdownHighlighted?: boolean
  isSearchButtonHighlighted?: boolean
}

export const PortalSearchFilterAndTable = ({
  dataSource,
  filters = DEFAULT_SEARCH_FILTERS,
  defaultFilters,
  excludeColumns = [],
  loading,
  ownerId,
  onCellClick,
  isShowResetButton,
  onResetClick,
  welcomeText,
  MemorialStatusPopoverComponent,
  MemorialSettingsPopoverComponent,
  MemorialDashboardPopoverComponent,
  isDropdownHighlighted,
  isSearchButtonHighlighted,
}: IPortalSearchFilterAndTableProps) => {
  const {
    searchText,
    filter: selectedFilters,
    onSearchTextChange,
    onFilterChange,
    displayDataSource,
  } = usePortalTableDataSource({ dataSource, ownerId, defaultFilters })
  return (
    <StyledPortalSearchFilterAndTable>
      <SearchAndFilterBar
        welcomeText={welcomeText}
        filters={filters}
        searchText={searchText}
        selectedFilters={selectedFilters}
        onFilterChange={onFilterChange}
        onSearchTextChange={onSearchTextChange}
        isDropdownHighlighted={isDropdownHighlighted}
        isSearchButtonHighlighted={isSearchButtonHighlighted}
      />
      <PortalTable
        dataSource={displayDataSource}
        excludeColumns={excludeColumns}
        loading={loading}
        onCellClick={onCellClick}
        isShowResetButton={isShowResetButton}
        onResetClick={onResetClick}
        MemorialStatusPopoverComponent={MemorialStatusPopoverComponent}
        MemorialSettingsPopoverComponent={MemorialSettingsPopoverComponent}
        MemorialDashboardPopoverComponent={MemorialDashboardPopoverComponent}
      />
    </StyledPortalSearchFilterAndTable>
  )
}
