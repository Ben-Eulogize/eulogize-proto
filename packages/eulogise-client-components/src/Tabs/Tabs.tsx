import { default as AntTabs } from 'antd/lib/tabs'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

// @ts-ignore
export const Tabs = styled(AntTabs)`
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: ${COLOR.CORE_PURPLE};
    }
  }
  .ant-tabs-tab-btn:hover {
    color: ${COLOR.CORE_PURPLE};
  }
  .ant-tabs-ink-bar {
    background-color: ${COLOR.CORE_PURPLE};
  }
  .ant-tabs-tab {
    font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  }
`
