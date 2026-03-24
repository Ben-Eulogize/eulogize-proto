import { IPortalTableItem } from './PortalTable'
import { DateTimeHelper } from '@eulogise/helpers'
import { useState } from 'react'
import moment from 'moment'
import { SearchFilterCasesType } from '../../SearchAndFilterBar'

export const usePortalTableDataSource = ({
  dataSource,
  ownerId,
  defaultFilters = {},
}: {
  ownerId: string
  dataSource: Array<IPortalTableItem>
  defaultFilters?: { [key: string]: string }
}) => {
  const [searchText, setSearchText] = useState<string>('')
  const [filter, setFilter] = useState<{ [key: string]: string }>(
    defaultFilters,
  )
  const searchTextReg = new RegExp(searchText.replace('+', '\\+'), 'ig')
  let displayDataSource = dataSource
  if (searchText) {
    displayDataSource = dataSource.filter(
      (item: IPortalTableItem) =>
        !!(
          [
            'deceasedLastName',
            'deceasedFirstName',
            'familyMemberFirstName',
            'familyMemberLastName',
            'funeralDirectorFirstName',
            'funeralDirectorLastName',
            'customerEmail',
            'caseId',
          ].find((key) =>
            // @ts-ignore
            searchTextReg.test(item[key]),
          ) || searchTextReg.test(DateTimeHelper.formatDate(item.serviceDate))
        ),
    )
  }
  if (filter) {
    displayDataSource = displayDataSource.filter((item: IPortalTableItem) => {
      if (filter.status) {
        return (
          item.photobookStatus === filter.status ||
          item.slideshowStatus === filter.status ||
          item.bookletStatus === filter.status
        )
      }
      if (filter.cases) {
        if (filter.cases === SearchFilterCasesType.MyCases) {
          return (
            item.funeralDirector === ownerId &&
            moment(item.serviceDate).isSameOrAfter(new Date(), 'day')
          )
        } else if (filter.cases === SearchFilterCasesType.AllCases) {
          return (
            moment(item.serviceDate).isSameOrAfter(new Date(), 'day') ||
            item.serviceDate === null
          )
        } else if (filter.cases === SearchFilterCasesType.PreviousCases) {
          return moment(item.serviceDate).isBefore(new Date(), 'day')
        }
      }
      return true
    })
  }

  const onSearchTextChange = (searchText: string) => {
    setSearchText(searchText)
  }
  const onFilterChange = (filter: { [key: string]: string }) => {
    setFilter(filter)
  }
  return {
    displayDataSource: displayDataSource.sort((a, b) => {
      if (filter.cases === SearchFilterCasesType.PreviousCases) {
        return moment(a.serviceDate) > moment(b.serviceDate) ? -1 : 1
      }
      return moment(a.serviceDate) > moment(b.serviceDate) ? 1 : -1
    }),
    searchText,
    filter,
    onSearchTextChange,
    onFilterChange,
  }
}
