import styled from 'styled-components'
import { SCREEN_SIZE, STYLE } from '@eulogise/client-core'

export const DOWNLOAD_PAGE_LEFT_CONTAINER_WIDTH = 950
export const DOWNLOAD_PAGE_RIGHT_CONTAINER_WIDTH = 450

export const DownloadPageContainer = styled.div<{
  $shouldStackContainers?: boolean
}>`
  ${({ $shouldStackContainers }) =>
    $shouldStackContainers
      ? ``
      : `display: flex;
    justify-content: space-between;`}
  height: 100%;
`

export const DownloadPageLeftContentContainer = styled.div`
  width: ${DOWNLOAD_PAGE_LEFT_CONTAINER_WIDTH}px;
  padding: 1rem 0 0 0;
  max-width: 100%;
  ${SCREEN_SIZE.TABLET} {
    padding: 40px 0 0 20px;
  }
`

export const DownloadPageRightContentContainer = styled.div`
  padding-top: 40px;
  height: 100%;
  ${SCREEN_SIZE.TABLET} {
    padding-right: 50px;
  }
`
export const DownloadPageThankYouHeader = styled.div`
  margin: 0 0 8px 0;
  ${STYLE.HEADING_MEDIUM};
`
