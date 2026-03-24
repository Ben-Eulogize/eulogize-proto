import styled from 'styled-components'
import Menu from 'antd/lib/menu'

// @ts-ignore
export const DropdownMenu = styled(Menu)`
  .ant-dropdown & {
    max-height: 50vh;
    overflow: auto;
  }
`
