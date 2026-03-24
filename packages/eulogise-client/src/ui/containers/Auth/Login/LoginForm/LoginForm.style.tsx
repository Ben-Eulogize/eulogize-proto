import { SCREEN_SIZE } from '@eulogise/client-core'
import { Form } from 'antd'
import styled from 'styled-components'

const StyledLoginForm = styled(Form)`
  margin: 30px 20px 0 20px;
  .ant-form-item-explain {
    text-align: left;
    margin: 3px 0;
  }
`

const StyledLeftFloatDiv = styled.div`
  float: left;
  ${SCREEN_SIZE.TABLET} {
    display: inherit;
  }
  display: flex;
`

export { StyledLoginForm, StyledLeftFloatDiv }
