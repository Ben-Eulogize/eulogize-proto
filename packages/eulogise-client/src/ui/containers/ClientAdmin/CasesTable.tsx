import React from 'react'
import { Table } from '@eulogise/client-components'
import { CaseTableColumns } from './CasesTable.constants'
import { useEulogiseDispatch } from '../../store/hooks'

interface ICasesTableProps {
  dataSource: Array<any>
  excludeColumns?: Array<string>
}

const CasesTable: React.FC<ICasesTableProps> = ({
  dataSource,
  excludeColumns = [],
}) => {
  const dispatch = useEulogiseDispatch()
  const columns = CaseTableColumns.filter(
    (c) => !excludeColumns.includes(c.key),
  )
  const formattedDataSource = dataSource.map((c) => ({
    ...c,
    dispatch,
  }))

  return (
    <Table
      locale={{ emptyText: 'No Data' }}
      dataSource={formattedDataSource}
      columns={columns}
    />
  )
}

export default CasesTable
