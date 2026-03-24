import React from 'react'
import { IPortalTableItem, PortalTable } from './PortalTable'
import { PortableTableMockService } from './data/PortableTableMockService'

export default {
  title: 'Table/PortalTable',
  component: PortalTable,
  argTypes: {},
}

const dataSource: Array<IPortalTableItem> =
  PortableTableMockService.createFakeTableItems(100)

export const Default = () => (
  <PortalTable
    onResetClick={() => {}}
    dataSource={dataSource}
    excludeColumns={['caseId', 'photobookStatus']}
    onCellClick={(ev) => console.log(ev)}
  />
)

export const IVC = () => (
  <PortalTable
    onResetClick={() => {}}
    dataSource={dataSource}
    onCellClick={(ev) => console.log(ev)}
  />
)
