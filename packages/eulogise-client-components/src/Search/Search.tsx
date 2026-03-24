import styled from 'styled-components'
import { default as AntInput } from 'antd/lib/input'
import { COLOR } from '@eulogise/client-core'

const { Search: AntSearch } = AntInput
// @ts-ignore
export const Search = styled(AntSearch)`
  margin: 15px 0 30px;
  box-shadow: none;
  color: ${COLOR.WHITE};
  &:hover .ant-input {
    border-color: ${COLOR.PASTEL_BLUE};
  }
`
