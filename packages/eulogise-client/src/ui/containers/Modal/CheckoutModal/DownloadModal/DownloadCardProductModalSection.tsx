import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@eulogise/client-components'
import { CardProductHelper } from '@eulogise/helpers'
import styled from 'styled-components'
import {
  ResourceFileStatus,
  ICardProductData,
  ModalId,
  EulogiseRegion,
  ICardProductContent,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import {
  DownloadModalProductDetailAction,
  DownloadModalProductDetailLabel,
  DownloadModalProductDetailRow,
  DownloadModalTitleText,
} from './DownloadModal.styles'
import { useProductState, useEulogiseDispatch } from '../../../../store/hooks'
import { openThemeDrawer } from '../../../../store/DrawerState/actions'
import {
  fetchCardProductsByCaseId,
  generateCardProduct,
} from '../../../../store/CardProduct/actions'
import { EulogiseProduct, EulogisePage } from '@eulogise/core'
import { showModalAction } from '../../../../store/ModalState/actions'
import { CompleteConfirmModal } from '@eulogise/client-components'
import { FullPageMarginConfirmModal } from '@eulogise/client-components'
import { NavigationHelper } from '@eulogise/helpers'
import { GeneratingButton } from '../../../Button/GeneratingButton'
import { CardProductDownloadButtons } from '../../../Button/CardProductDownloadButtons'

interface IDownloadCardProductModalSectionProps {
  onClose: () => void
  caseId: string
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  deceasedName?: string
  region: EulogiseRegion
}

const StyledDownloadCardProductModalSection = styled.div``

const DownloadCardProductModalSection: React.FC<
  IDownloadCardProductModalSectionProps
> = ({
  product,
  genericProductType,
  caseId,
  onClose,
  deceasedName,
  region,
}) => {
  const containerEl = useRef<HTMLElement>()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>()
  const dispatch = useEulogiseDispatch()
  const slug = genericProductType?.slug
  const { activeItem: cardProduct } = useProductState({
    product,
    slug,
  })

  const cardProductFileStatus = cardProduct?.fileStatus
  const pageSize = (cardProduct?.content as ICardProductContent).pageSize
  const productName: string = CardProductHelper.getProductName({
    product,
    region,
  })
  const productShortName: string = CardProductHelper.getProductShortName({
    product,
    region,
  })

  useEffect(() => {
    if (!cardProduct) {
      dispatch(
        fetchCardProductsByCaseId({
          product,
          genericProductType,
          caseId,
          region,
        }),
      )
    }
  }, [])

  const isAnyPageFull: boolean =
    !!cardProduct &&
    product !== EulogiseProduct.TV_WELCOME_SCREEN &&
    CardProductHelper.isAnyPageFull(cardProduct as ICardProductData, product)

  return (
    <StyledDownloadCardProductModalSection ref={containerEl}>
      <DownloadModalTitleText>{productName}</DownloadModalTitleText>
      {!cardProduct ? (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            You have not created a {productShortName.toLowerCase()}
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            <Button
              noMarginLeft
              noMarginRight
              onClick={() => {
                onClose()
                NavigationHelper.navigate(EulogisePage.DASHBOARD)
                dispatch(openThemeDrawer(product, false))
              }}
            >
              Create {productShortName}
            </Button>
          </DownloadModalProductDetailAction>
        </DownloadModalProductDetailRow>
      ) : cardProductFileStatus === ResourceFileStatus.GENERATED ? (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            {product === EulogiseProduct.TV_WELCOME_SCREEN
              ? 'Download Jpeg'
              : 'Download Print Ready PDF'}
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            <CardProductDownloadButtons
              caseId={caseId}
              product={product}
              cardProduct={cardProduct as ICardProductData}
              deceasedName={deceasedName!}
              containerEl={containerEl}
              region={region}
              pageSize={pageSize}
            />
          </DownloadModalProductDetailAction>
        </DownloadModalProductDetailRow>
      ) : cardProductFileStatus === ResourceFileStatus.PROCESSING ? (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            Please wait while we process your {productShortName.toLowerCase()}
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            <GeneratingButton
              product={product}
              caseId={caseId}
              noMarginLeft
              noMarginRight
            />
          </DownloadModalProductDetailAction>
        </DownloadModalProductDetailRow>
      ) : (
        <DownloadModalProductDetailRow>
          <DownloadModalProductDetailLabel>
            {product === EulogiseProduct.TV_WELCOME_SCREEN
              ? 'Generate Jpeg for Download'
              : 'Generate PDF for Download'}
          </DownloadModalProductDetailLabel>
          <DownloadModalProductDetailAction>
            <Button
              noMarginLeft
              noMarginRight
              onClick={() => {
                setIsOpenConfirmModal(true)
              }}
            >
              Generate
            </Button>
          </DownloadModalProductDetailAction>
          {isAnyPageFull ? (
            <FullPageMarginConfirmModal
              isOpen={isOpenConfirmModal}
              onClose={() => setIsOpenConfirmModal(false)}
              onCompleteClick={() => {
                setIsOpenConfirmModal(false)
                dispatch(
                  generateCardProduct({
                    product,
                    caseId,
                    cardProductId: cardProduct.id!,
                  }),
                )
              }}
              onKeepEditingClick={() => {
                setIsOpenConfirmModal(false)
                onClose()
                NavigationHelper.navigateToProduct({
                  product,
                  id: cardProduct.id!,
                })
              }}
            />
          ) : (
            <CompleteConfirmModal
              isOpen={isOpenConfirmModal}
              onClose={() => setIsOpenConfirmModal(false)}
              onCompleteClick={() => {
                setIsOpenConfirmModal(false)
                dispatch(
                  generateCardProduct({
                    product,
                    caseId,
                    cardProductId: cardProduct.id!,
                  }),
                )
              }}
              onShareClick={() => {
                setIsOpenConfirmModal(false)
                dispatch(
                  showModalAction(ModalId.SHARE_CARD_PRODUCT, {
                    product,
                    slug,
                  }),
                )
              }}
              onKeepEditingClick={() => {
                setIsOpenConfirmModal(false)
                onClose()
                NavigationHelper.navigateToProduct({
                  product,
                  id: cardProduct.id!,
                })
              }}
            />
          )}
        </DownloadModalProductDetailRow>
      )}
    </StyledDownloadCardProductModalSection>
  )
}

export default DownloadCardProductModalSection
