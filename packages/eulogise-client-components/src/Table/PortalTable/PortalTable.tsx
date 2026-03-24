import React from 'react'
import styled from 'styled-components'
import { Table, TableProps } from '../Table'
import {
  MemorialVisualStatusProps,
  MemorialVisualStatus,
  ResourceFileStatus,
  EulogiseCountry,
  EulogiseProduct,
} from '@eulogise/core'
import { TableHelper } from '@eulogise/helpers'
import { PortalTableMemorialStatusCell } from './PortalTableMemorialStatusCell'
import { PortalTableSettingsCell } from './PortalTableSettingsCell'
import { MemorialVisualStatuses } from '../../SearchAndFilterBar'
import { COLOR } from '@eulogise/client-core'
import { PortalTableMemorialDeceasedNameCell } from './PortalTableMemorialDeceasedNameCell'

export type IPortalTableCellClickEvent = {
  columnKey: string
  record: IPortalTableItem
}

export type IPortalTableResetClickEvent = {
  id: string
  caseId: string
  product: EulogiseProduct
}

export type IPortalTableItem = {
  key: string
  serviceDate: number
  caseId: string
  createdAt: string
  clientName?: string
  deceasedFirstName: string
  deceasedLastName: string
  deceasedFullName: string
  familyMemberFirstName: string
  familyMemberLastName: string
  familyMemberFullName: string
  customerEmail: string
  funeralDirector: string
  funeralDirectorFirstName: string
  funeralDirectorLastName: string
  funeralDirectorFullName: string
  slideshowId: string
  slideshowStatus: MemorialVisualStatus
  slideshowFileStatus: ResourceFileStatus
  slideshowHasGeneratedBefore: boolean
  photobookId: string
  photobookStatus: MemorialVisualStatus
  photobookFileStatus: ResourceFileStatus
  photobookHasGeneratedBefore: boolean
  bookletId: string
  bookletStatus: MemorialVisualStatus
  bookletFileStatus: ResourceFileStatus
  bookletHasGeneratedBefore: boolean
  bookmarkId: string
  bookmarkStatus: MemorialVisualStatus
  bookmarkFileStatus: ResourceFileStatus
  bookmarkHasGeneratedBefore: boolean
  sidedCardId: string
  sidedCardStatus: MemorialVisualStatus
  sidedCardFileStatus: ResourceFileStatus
  sidedCardHasGeneratedBefore: boolean
  thankyouCardId: string
  thankyouCardStatus: MemorialVisualStatus
  thankyouCardFileStatus: ResourceFileStatus
  thankyouCardHasGeneratedBefore: boolean
  country: EulogiseCountry
  isRetainOnCleanup: boolean
}

const StyledPortalTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #ffffff;
  }
  .ant-table-tbody > tr {
    background-color: ${COLOR.WIDE_SAND_GREY};
    &:hover {
      background-color: ${COLOR.WIDE_SAND_GREY};
    }
    > td {
      border-bottom: 1px solid ${COLOR.SHALLOW_GREY};
      overflow-wrap: anywhere;
      &:first-letter,
      *:first-letter {
        text-transform: uppercase;
      }

      &:before {
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 1.6em;
        background-color: ${COLOR.SHALLOW_GREY};
        transform: translateY(-50%);
        transition: background-color 0.3s;
        content: '';
      }
      &:last-of-type:before {
        width: 0;
      }
    }
  }
`

const ClientName = styled.div`
  max-width: 80px;
  overflow: hidden;
`

export const PortalTable = ({
  dataSource,
  excludeColumns = [],
  onCellClick,
  MemorialStatusPopoverComponent,
  MemorialSettingsPopoverComponent,
  MemorialDashboardPopoverComponent,
  isShowResetButton = false,
  onResetClick,
  ...restProps
}: {
  dataSource: any
  excludeColumns?: Array<string>
  isShowResetButton?: boolean
  onResetClick: ({ product, id }: IPortalTableResetClickEvent) => void
  onCellClick: (event: IPortalTableCellClickEvent) => void
  MemorialStatusPopoverComponent?: JSX.Element
  MemorialSettingsPopoverComponent?: JSX.Element
  MemorialDashboardPopoverComponent?: JSX.Element
} & TableProps) => {
  const columns = React.useMemo(
    () => [
      {
        title: 'Service',
        dataIndex: 'serviceDate',
        key: 'serviceDate',
        sorter: TableHelper.dateSorter('serviceDate'),
        render: TableHelper.dateRendererWithoutYear('serviceDate'),
      },
      {
        title: 'Number',
        dataIndex: 'caseId',
        key: 'caseId',
        sorter: TableHelper.commonSorter('caseId'),
      },
      {
        title: 'Deceased Name',
        key: 'deceasedName',
        render: (text: string, record: IPortalTableItem, index: number) => {
          return PortalTableMemorialDeceasedNameCell(
            record.deceasedFullName,
            () => {
              onCellClick({
                columnKey: 'deceasedName',
                record,
              })
            },
            index === 0 ? MemorialDashboardPopoverComponent : null,
          )
        },
        sorter: TableHelper.commonSorter('deceasedFullName'),
      },
      {
        title: 'Family Member',
        key: 'familyMemberFullName',
        render: (text: string, record: IPortalTableItem) =>
          record.familyMemberFullName,
        sorter: TableHelper.commonSorter('familyMemberFullName'),
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        sorter: TableHelper.commonSorter('createdAt'),
        render: TableHelper.dateRendererWithoutYear('createdAt'),
      },
      {
        title: 'Client',
        key: 'clientName',
        sorter: TableHelper.commonSorter('clientName'),
        render: (_: any, item: any) => {
          return <ClientName>{item.clientName}</ClientName>
        },
      },
      {
        title: 'Arranger',
        key: 'funeralDirectorName',
        render: (text: string, record: IPortalTableItem) =>
          record.funeralDirectorFullName,
        sorter: TableHelper.commonSorter('funeralDirectorFullName'),
      },
      {
        title: 'Email',
        key: 'customerEmail',
        render: (text: string, record: IPortalTableItem) => {
          return record.customerEmail
        },
        sorter: TableHelper.commonSorter('customerEmail'),
      },
      {
        title: 'Memorial Video',
        dataIndex: 'slideshowStatus',
        key: 'slideshowStatus',
        filters: MemorialVisualStatuses.map((status) => {
          return {
            text: MemorialVisualStatusProps[status].label,
            value: status,
          }
        }),
        onFilter: (value: string, record: IPortalTableItem) =>
          record.slideshowStatus.startsWith(value),
        sorter: TableHelper.commonSorter('slideshowStatus'),
        render: (
          status: MemorialVisualStatus,
          record: IPortalTableItem,
          index: number,
        ) => {
          return PortalTableMemorialStatusCell({
            product: EulogiseProduct.SLIDESHOW,
            status,
            fileStatus: record.slideshowFileStatus,
            hasGeneratedBefore: record.slideshowHasGeneratedBefore,
            onClick: () => {
              onCellClick({
                columnKey: 'slideshowStatus',
                record,
              })
            },
            isShowResetButton,
            onResetClick: ({ product }) => {
              onResetClick({
                product,
                id: record.slideshowId,
                caseId: record.caseId,
              })
            },
            id: record.slideshowId,
            MemorialStatusPopoverComponent:
              index === 0 ? MemorialStatusPopoverComponent : null,
          })
        },
      },
      {
        title: 'Photobook',
        dataIndex: 'photobookStatus',
        key: 'photobookStatus',
        filters: MemorialVisualStatuses.map((status) => ({
          text: MemorialVisualStatusProps[status].label,
          value: status,
        })),
        onFilter: (value: string, record: IPortalTableItem) =>
          record.photobookStatus.startsWith(value),
        sorter: TableHelper.commonSorter('photobookStatus'),
        render: (status: MemorialVisualStatus, record: IPortalTableItem) =>
          PortalTableMemorialStatusCell({
            isShowResetButton,
            product: EulogiseProduct.PHOTOBOOK,
            status,
            fileStatus: record.photobookFileStatus,
            hasGeneratedBefore: record.photobookHasGeneratedBefore,
            onClick: () => {
              onCellClick({
                columnKey: 'photobookStatus',
                record,
              })
            },
            onResetClick: ({ product }) => {
              onResetClick({
                product,
                id: record.photobookId,
                caseId: record.caseId,
              })
            },
            id: record.photobookId,
          }),
      },
      {
        title: 'Order of Service',
        dataIndex: 'bookletStatus',
        key: 'bookletStatus',
        sorter: TableHelper.commonSorter('bookletStatus'),
        render: (status: MemorialVisualStatus, record: IPortalTableItem) =>
          PortalTableMemorialStatusCell({
            isShowResetButton,
            product: EulogiseProduct.BOOKLET,
            status,
            fileStatus: record.bookletFileStatus,
            hasGeneratedBefore: record.bookletHasGeneratedBefore,
            onClick: () => {
              onCellClick({
                columnKey: 'bookletStatus',
                record,
              })
            },
            onResetClick: ({ product }) => {
              onResetClick({
                product,
                id: record.bookletId,
                caseId: record.caseId,
              })
            },
            id: record.bookletId,
          }),
        filters: MemorialVisualStatuses.map((status) => ({
          text: MemorialVisualStatusProps[status].label,
          value: status,
        })),
        onFilter: (value: string, record: IPortalTableItem) =>
          record.bookletStatus.startsWith(value),
      },
      {
        title: 'Bookmark',
        dataIndex: 'bookmarkStatus',
        key: 'bookmarkStatus',
        sorter: TableHelper.commonSorter('bookmarkStatus'),
        render: (status: MemorialVisualStatus, record: IPortalTableItem) =>
          PortalTableMemorialStatusCell({
            isShowResetButton,
            product: EulogiseProduct.BOOKMARK,
            status,
            fileStatus: record.bookmarkFileStatus,
            hasGeneratedBefore: record.bookmarkHasGeneratedBefore,
            onClick: () => {
              onCellClick({
                columnKey: 'bookmarkStatus',
                record,
              })
            },
            onResetClick: ({ product }) => {
              onResetClick({
                product,
                id: record.bookmarkId,
                caseId: record.caseId,
              })
            },
            id: record.bookmarkId,
          }),
        filters: MemorialVisualStatuses.map((status) => ({
          text: MemorialVisualStatusProps[status].label,
          value: status,
        })),
        onFilter: (value: string, record: IPortalTableItem) =>
          record.bookmarkStatus.startsWith(value),
      },
      {
        title: 'Memorial Card',
        dataIndex: 'sidedCardStatus',
        key: 'sidedCardStatus',
        sorter: TableHelper.commonSorter('sidedCardStatus'),
        render: (status: MemorialVisualStatus, record: IPortalTableItem) =>
          PortalTableMemorialStatusCell({
            isShowResetButton,
            product: EulogiseProduct.SIDED_CARD,
            status,
            fileStatus: record.sidedCardFileStatus,
            hasGeneratedBefore: record.sidedCardHasGeneratedBefore,
            onClick: () => {
              onCellClick({
                columnKey: 'sidedCardStatus',
                record,
              })
            },
            onResetClick: ({ product }) => {
              onResetClick({
                product,
                id: record.sidedCardId,
                caseId: record.caseId,
              })
            },
            id: record.sidedCardId,
          }),
        filters: MemorialVisualStatuses.map((status) => ({
          text: MemorialVisualStatusProps[status].label,
          value: status,
        })),
        onFilter: (value: string, record: IPortalTableItem) =>
          record.sidedCardStatus.startsWith(value),
      },
      {
        title: 'Thankyou Card',
        dataIndex: 'thankyouCardStatus',
        key: 'thankyouCardStatus',
        sorter: TableHelper.commonSorter('thankyouCardStatus'),
        render: (status: MemorialVisualStatus, record: IPortalTableItem) =>
          PortalTableMemorialStatusCell({
            isShowResetButton,
            product: EulogiseProduct.THANK_YOU_CARD,
            status,
            fileStatus: record.thankyouCardFileStatus,
            hasGeneratedBefore: record.thankyouCardHasGeneratedBefore,
            onClick: () => {
              onCellClick({
                columnKey: 'thankyouCardStatus',
                record,
              })
            },
            onResetClick: ({ product }) => {
              onResetClick({
                product,
                id: record.thankyouCardId,
                caseId: record.caseId,
              })
            },
            id: record.thankyouCardId,
          }),
        filters: MemorialVisualStatuses.map((status) => ({
          text: MemorialVisualStatusProps[status].label,
          value: status,
        })),
        onFilter: (value: string, record: IPortalTableItem) =>
          record.thankyouCardStatus.startsWith(value),
      },
      {
        title: 'Country',
        key: 'country',
        sorter: TableHelper.commonSorter('region'),
        render: (key: string, record: IPortalTableItem) => {
          return record.country
        },
      },
      {
        title: 'Actions',
        key: 'settings',
        render: (key: string, record: IPortalTableItem, index: number) =>
          PortalTableSettingsCell({
            onClick: () => {
              onCellClick({
                columnKey: 'settings',
                record,
              })
            },
            MemorialSettingsPopoverComponent:
              index === 0 ? MemorialSettingsPopoverComponent : null,
          }),
      },
    ],
    [],
  )
  const displayColumns = columns.filter((c) => !excludeColumns.includes(c.key))
  return (
    <StyledPortalTable
      {...restProps}
      dataSource={dataSource}
      columns={displayColumns}
      guidePopoverComponent={MemorialStatusPopoverComponent}
    />
  )
}
