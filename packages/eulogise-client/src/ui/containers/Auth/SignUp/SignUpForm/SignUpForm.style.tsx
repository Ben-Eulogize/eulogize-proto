import { Form } from 'antd'
import styled from 'styled-components'
import { STYLE, COLOR } from '@eulogise/client-core'

const StyledSignUpForm = styled(Form)`
  .ant-form-item-explain {
    text-align: left;
    margin: 3px 0;
  }

  .ant-input-prefix {
    color: ${COLOR.DARK_BLUE};
  }

  .ant-input-affix-wrapper-status-error .ant-input-prefix {
    color: ${COLOR.ANTD_INPUT_ERROR_RED_COLOR};
  }
`

const StyledLeftFloatDiv = styled.div`
  float: left;
`

const StyledCheckBoxSmallText = styled.div`
  ${STYLE.TEXT_FONT_SIZE_SMALL}
`

export { StyledSignUpForm, StyledLeftFloatDiv, StyledCheckBoxSmallText }
