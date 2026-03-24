import React, { useState } from 'react'
import { Button } from '@eulogise/client-components'
import { downloadCardProductByCaseId } from '../../store/CardProduct/actions'
import { CardProductHelper } from '@eulogise/helpers'
import {
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductData,
  IGenericCardProductData,
} from '@eulogise/core'
import { ButtonType } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../store/hooks'

type ICardProductDownloadButtonsProps = {
  product: EulogiseProduct
  cardProduct?: ICardProductData | IGenericCardProductData
  caseId: string
  deceasedName: string
  containerEl?: any
  region?: EulogiseRegion
  pageSize?: CardProductPageSize
}

export const CardProductDownloadButtons = ({
  product,
  cardProduct,
  caseId,
  deceasedName,
  containerEl,
  region,
  pageSize,
}: ICardProductDownloadButtonsProps) => {
  const dispatch = useEulogiseDispatch()
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isDownloadingBleed, setIsDownloadingBleed] = useState<boolean>(false)
  return (
    <>
      <Button
        noMarginLeft
        noMarginRight
        loading={isDownloading}
        buttonType={ButtonType.TRANSPARENT}
        onClick={() => {
          setIsDownloading(true)
          const genericProductMetadata = (
            cardProduct as IGenericCardProductData
          )?.content?.metadata
          dispatch(
            downloadCardProductByCaseId({
              product,
              productName: CardProductHelper.getProductExportName({
                product,
                region: region!,
                genericProductMetadata,
              }),
              slug: genericProductMetadata.slug,
              pageSize,
              caseId,
              deceasedName,
              isBleed: false,
            }),
          )

          setIsDownloading(false)
        }}
        getPopupContainer={() => containerEl?.current}
        tooltip="For printing at home"
      >
        Download
      </Button>
      {product !== EulogiseProduct.TV_WELCOME_SCREEN && (
        <Button
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          loading={isDownloadingBleed}
          onClick={() => {
            setIsDownloadingBleed(true)
            const genericProductMetadata = (
              cardProduct as IGenericCardProductData
            )?.content?.metadata
            dispatch(
              downloadCardProductByCaseId({
                product,
                productName: CardProductHelper.getProductExportName({
                  product,
                  genericProductMetadata,
                  region: region!,
                }),
                slug: genericProductMetadata?.slug,
                pageSize,
                caseId,
                deceasedName,
                isBleed: true,
                complete: () => {
                  setIsDownloadingBleed(false)
                },
              }),
            )
          }}
          getPopupContainer={() => containerEl?.current}
          tooltip="For professional printing"
        >
          Download (Bleed)
        </Button>
      )}
    </>
  )
}
