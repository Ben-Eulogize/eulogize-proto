import { SCREEN_SIZE } from '@eulogise/client-core'
import { Form } from 'antd'
import styled from 'styled-components'

const StyledForgotPasswordForm = styled(Form)`
  max-width: 80vw;
  margin: 30px 20px;
`

const StyledLeftFloatDiv = styled.div`
  float: left;
  display: inline-block;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
  }
`

export { StyledForgotPasswordForm, StyledLeftFloatDiv }
