import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { IClientState } from '@eulogise/core'
import { useClientState } from '../../store/hooks'
import { ImageHelper } from '@eulogise/helpers'
import { LogoIcon } from './LogoIcon'

const StyledClientLogo = styled(LogoIcon)`
  ${({ noMarginLeft }: { noMarginLeft: boolean }) =>
    noMarginLeft ? `` : `margin-left: ${STYLE.GUTTER};`}
  height: 41px;
`
export const ClientLogo = ({
  className,
  noMarginLeft,
}: {
  className?: string
  noMarginLeft: boolean
}) => {
  const { activeItem: activeClient }: IClientState = useClientState()
  const clientLogo = activeClient?.logo
    ? ImageHelper.getClientLogo(activeClient?.logo)
    : undefined
  return (
    <StyledClientLogo
      className={className}
      src={clientLogo}
      noMarginLeft={noMarginLeft}
    />
  )
}
