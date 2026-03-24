import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LogoIcon } from '../icons/LogoIcon'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'
import RequestHelper from '../../helpers/RequestHelper'
import { ICase, IEulogiseEmbeddedIframeSettings } from '@eulogise/core'
import { Button } from '@eulogise/client-components'
import { CaseHelper } from '@eulogise/helpers'

const StyledEmbeddedProductBottomBar = styled.div`
  display: flex;
  border-top: 1px solid ${COLOR.CORE_PURPLE};
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.WHITE};
  min-height: 54px;
  padding: 0.5rem 1rem;
`

const StyledLogoIcon = styled(LogoIcon)`
  height: 40px;
  margin-top: 0;
`

type IEmbeddedProductBottomBarProps = {
  caseId: string
  onBottomBarShow: () => void
  isShowPurchaseButton?: boolean
  className?: string
}

const StyledButton = styled(Button)`
  height: auto;
  font-size: 1rem;
`

const StyledPurchaseContainer = styled.div`
  min-width: 40px;
  ${SCREEN_SIZE.TABLET} {
    min-width: 118px;
  }
`

const StyledText = styled.div`
  font-family: PP Eiko, sans-serif !important;
  text-align: center;
`

export const EmbeddedProductBottomBar = ({
  caseId,
  onBottomBarShow,
  isShowPurchaseButton = false,
  className,
}: IEmbeddedProductBottomBarProps) => {
  const [activeCase, setActiveCase] = React.useState<ICase>()
  const [embeddedIframesSettings, setEmbeddedIframesSettings] =
    React.useState<IEulogiseEmbeddedIframeSettings>()
  const deceasedName = activeCase?.deceased?.fullName
  const dob = CaseHelper.getDateOfBirthDisplay(activeCase!)
  const dod = CaseHelper.getDateOfDeathDisplay(activeCase!)

  useEffect(() => {
    RequestHelper.request(`/v2/admin/cases/${caseId}/embeddedDetails`, {}).then(
      (res) => {
        const { case: caseData, embeddedIframesSettings } = res.data
        setActiveCase(caseData)
        setEmbeddedIframesSettings(embeddedIframesSettings)
        if (embeddedIframesSettings?.showWhiteBottomBar) {
          onBottomBarShow()
        }
      },
    )
  }, [caseId])

  if (
    !caseId ||
    activeCase === undefined ||
    !embeddedIframesSettings?.showWhiteBottomBar
  ) {
    return null
  }

  return (
    <StyledEmbeddedProductBottomBar className={className}>
      <div>
        {embeddedIframesSettings.showEulogizeBranding === true ? (
          <StyledLogoIcon isShowSmallLogoOnMobile isWithMemorialsText />
        ) : null}
      </div>
      <StyledText>
        {deceasedName}
        {dob && dod ? (
          <>
            <br />
            {dob} - {dod}
          </>
        ) : (
          ''
        )}
      </StyledText>
      <StyledPurchaseContainer>
        {isShowPurchaseButton &&
          embeddedIframesSettings.allowPurchaseButton &&
          embeddedIframesSettings.purchaseUrl && (
            <StyledButton
              onClick={() => {
                window.open(embeddedIframesSettings.purchaseUrl, '_blank')
              }}
            >
              {embeddedIframesSettings.customButtonCopy !== undefined &&
              embeddedIframesSettings.customButtonCopy?.trim().length > 0
                ? embeddedIframesSettings.customButtonCopy
                : `Purchase`}
            </StyledButton>
          )}
      </StyledPurchaseContainer>
    </StyledEmbeddedProductBottomBar>
  )
}
