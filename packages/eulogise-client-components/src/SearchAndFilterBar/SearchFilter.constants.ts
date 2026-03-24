import { MemorialVisualStatus, MemorialVisualStatusProps } from '@eulogise/core'
import { SearchAndFilterBarItemProps } from './SearchAndFilterBar.types'

export enum SearchFilterCasesType {
  MyCases = 'my-cases',
  AllCases = 'all-cases',
  PreviousCases = 'previous-cases',
}

export const CASES_SEARCH_FILTER_BAR_ITEM: SearchAndFilterBarItemProps = {
  key: 'cases',
  title: 'Cases',
  defaultText: 'Select cases',
  items: [
    { label: 'Active cases', key: SearchFilterCasesType.AllCases },
    { label: 'My cases', key: SearchFilterCasesType.MyCases },
    { label: 'Previous cases', key: SearchFilterCasesType.PreviousCases },
  ],
}

export const BRAND_SEARCH_FILTER_BAR_ITEM: SearchAndFilterBarItemProps = {
  key: 'brand',
  title: 'Brand',
  defaultText: 'Select brand',
  items: [
    { label: 'White Lady', key: 'white-lady' },
    { label: 'Simplicity', key: 'simplicity' },
    { label: 'Value Cremations', key: 'value-cremations' },
  ],
}

export const LOCATION_SEARCH_FILTER_BAR_ITEM: SearchAndFilterBarItemProps = {
  key: 'location',
  title: 'Location',
  defaultText: 'Select location',
  items: [
    { label: 'Adelaide', key: 'adelaide' },
    { label: 'Brisbane', key: 'brisbane' },
    { label: 'Melbourne', key: 'melbourne' },
    { label: 'Perth', key: 'perth' },
    { label: 'Sydney', key: 'sydney' },
  ],
}

export const MemorialVisualStatuses: Array<MemorialVisualStatus> = [
  MemorialVisualStatus.NOT_STARTED,
  MemorialVisualStatus.THEME_SELECTED,
  MemorialVisualStatus.EDITED,
  MemorialVisualStatus.COMPLETE,
  MemorialVisualStatus.DOWNLOAD,
]

export const STATUS_SEARCH_FILTER_BAR_ITEM: SearchAndFilterBarItemProps = {
  key: 'status',
  title: 'Status',
  defaultText: 'Select status',
  items: MemorialVisualStatuses.map((status) => ({
    label: MemorialVisualStatusProps[status].label,
    key: status,
  })),
}
export const DEFAULT_SEARCH_FILTERS: Array<SearchAndFilterBarItemProps> = [
  CASES_SEARCH_FILTER_BAR_ITEM,
]

export const ALL_SEARCH_FILTERS: Array<SearchAndFilterBarItemProps> = [
  CASES_SEARCH_FILTER_BAR_ITEM,
  BRAND_SEARCH_FILTER_BAR_ITEM,
  LOCATION_SEARCH_FILTER_BAR_ITEM,
]
