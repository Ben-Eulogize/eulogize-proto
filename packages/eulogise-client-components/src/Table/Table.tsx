import { default as AntTable } from 'antd/lib/table'
import { TableProps as AntTableProps } from 'antd/lib/table'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'

export type TableProps = AntTableProps<any>

// @ts-ignore
export const Table: any = styled(AntTable)`
  .ant-table {
    font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
  }
`
