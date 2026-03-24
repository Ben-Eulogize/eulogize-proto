import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

export const DownloadModalTitleText = styled.div`
  border-bottom: 1px solid ${COLOR.LITE_GREY};
  ${STYLE.HEADING_SMALL}
`

export const DownloadModalProductDetailRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${STYLE.GUTTER} 0;
  margin-bottom: ${STYLE.GUTTER};
`

export const DownloadModalProductDetailLabel = styled.div`
  flex: 1;
`

export const DownloadModalProductDetailAction = styled.div``
