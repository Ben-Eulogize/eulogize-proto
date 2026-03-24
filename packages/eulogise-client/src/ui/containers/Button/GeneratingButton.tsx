import React from 'react'
import { Button, ButtonType, IButtonProps } from '@eulogise/client-components'
import { EulogiseProduct } from '@eulogise/core'
import { DownloadPageButton } from '@eulogise/client-components/dist/Button/DownloadPageButton'

type IGeneratingButtonProps = Partial<IButtonProps> & {
  product: EulogiseProduct
  caseId: string
  isDownloadPageButton?: boolean
}

export const GeneratingButton = ({
  product,
  caseId,
  isDownloadPageButton,
  ...buttonProps
}: IGeneratingButtonProps) => {
  const props = {
    buttonType: ButtonType.TRANSPARENT,
    disabled: true,
    loading: true,
    ...buttonProps,
    children: 'Generating',
  }
  if (isDownloadPageButton) {
    return <DownloadPageButton {...props} />
  }
  return <Button {...props} />
}
