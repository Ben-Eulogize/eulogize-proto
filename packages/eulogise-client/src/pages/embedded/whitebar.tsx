import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { UrlHelper } from '@eulogise/helpers'
import { EulogisePage } from '@eulogise/core'
import { EmbeddedProductBottomBar } from '../../ui/components/EmbeddedProduct/EmbeddedProductBottomBar'

const StyledEmbeddedWhiteBar = styled.div`
  body:has(&) {
    #fc_frame {
      display: none;
    }

    overflow: hidden;
  }
`

const StyledEmbeddedProductBottomBar = styled(EmbeddedProductBottomBar)`
  padding: 0.25rem 1rem;
`

const EmbeddedWhiteBar = ({ location }: PageProps) => {
  const { caseId } = UrlHelper.getParams(EulogisePage.EMBEDDED_WHITEBAR, {
    pathname: location.pathname,
  })

  return (
    <StyledEmbeddedWhiteBar>
      <StyledEmbeddedProductBottomBar
        caseId={caseId}
        isShowPurchaseButton
        onBottomBarShow={() => {}}
      />
    </StyledEmbeddedWhiteBar>
  )
}

export default EmbeddedWhiteBar
