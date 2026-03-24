import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ButtonSize, ButtonType } from '../Button'
import { AccountSettingIcon, EditIcon, PurchaseIcon } from '../icons'
import {
  EulogiseProduct,
  EulogiseProductFileTypes,
  IGenericCardProductTypeData,
  ResourceFileStatus,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import CompleteConfirmModal from './Modals/CompleteConfirmModal'
import FullPageMarginConfirmModal from './Modals/FullPageMarginConfirmModal'
import { CheckoutsCardProductDownloadButtons } from './CheckoutsCardProductDownloadButtons'
import {
  COLOR,
  DEVICES,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import { DownloadPageButton } from '../Button/DownloadPageButton'

const StyledGenerateButton = styled(DownloadPageButton).attrs({
  noMarginLeft: true,
})`
  ${SCREEN_SIZE.TABLET} {
    width: 130px;
  }
`

const StyledCardProductItemContainer = styled.div``

const StyledProductItemContentContainer = styled.div`
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    min-height: 80px;
    align-items: start;
    justify-content: space-between;
  }
`

const StyledProductNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  ${SCREEN_SIZE.TABLET} {
    text-align: left;
    width: 220px;
    display: block;
    justify-content: normal;
  }
`

const StyledButtonGroupContainer = styled.div`
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    justify-content: flex-end;
    width: 330px;
  }
`

const StyledProcessContainer = styled.div`
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    justify-content: space-between;
    width: auto;
    margin: ${STYLE.GUTTER} 0;
  }
`

const StyledProcessingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${SCREEN_SIZE.TABLET} {
    margin: ${STYLE.GUTTER} 0;
  }
`

const StyledProductText = styled.div<{
  $isBold?: boolean
}>`
  margin-top: 1.4rem;
  margin-bottom: 0.25rem;
  ${SCREEN_SIZE.TABLET} {
    min-width: 160px;
    // add 4px so that the button and text align
    margin: calc(${STYLE.GUTTER} + 4px) 0;
  }
  ${({ $isBold }) => $isBold && `font-weight: bold;`}
`

const StyledProductTextContainer = styled.div`
  min-width: 160px;
`

const StyledStartCreatingOrKeepEditingButton = styled(DownloadPageButton)`
  ${SCREEN_SIZE.TABLET} {
    width: 160px;
  }
`

const StyledProductTextRow = styled.div`
  min-width: 160px;
  text-align: center;
`

const StyledFoldTypeText = styled.span`
  color: ${COLOR.NEUTRAL_GREY};
  font-size: 0.75rem;
`

export interface IDownloadCardProductRowProps {
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  hasCardProduct: boolean
  cardProductId?: string
  cardProductFileStatus?: ResourceFileStatus
  hasGeneratePermission?: boolean
  isAdmin?: boolean
  isAnyPageFull?: boolean
  processingContent?: ReactNode
  isBleedDownloadLoading?: boolean
  isStandardDownloadLoading?: boolean
  isPhotobookInternalsDownloadLoading?: boolean
  isPhotobookCoverDownloadLoading?: boolean
  isShowShareButton?: boolean
  isShowHomeViewButton?: boolean
  isShowProViewButton?: boolean
  isShowDownloadButton?: boolean
  isShowPurchaseButton?: boolean
  onViewClick?: ({ isBleed }: { isBleed: boolean }) => void
  onShareDrawerClick?: () => void
  shouldDisableButton?: boolean
  shouldHideKeepEditingButton?: boolean
  onStartCreating: (args: { product: EulogiseProduct }) => void
  onKeepEditing: (args: {
    product: EulogiseProduct
    productId?: string
  }) => void
  onPurchase: (product: EulogiseProduct) => void
  onConfirmGenerate: (args: {
    product: EulogiseProduct
    cardProductId?: string
  }) => void
  onShare: (product: EulogiseProduct) => void
  onDownloadBleed?: () => void
  onDownloadStandard?: () => void
  onSharePhotobook?: () => void
  onPurchasePhotobook?: () => void
  onDownloadPhotobookInternals?: () => void
  onDownloadPhotobookCover?: () => void
  onCopyPhotobookInternalsLink?: () => void
  onCopyPhotobookCoverLink?: () => void
}

const DownloadCardProductRow = ({
  product,
  genericProductType,
  hasCardProduct,
  cardProductId,
  cardProductFileStatus = ResourceFileStatus.NOT_STARTED,
  hasGeneratePermission = false,
  isAdmin = false,
  isAnyPageFull = false,
  processingContent,
  isBleedDownloadLoading = false,
  isStandardDownloadLoading = false,
  isPhotobookInternalsDownloadLoading = false,
  isPhotobookCoverDownloadLoading = false,
  shouldDisableButton = false,
  isShowShareButton,
  isShowHomeViewButton,
  isShowProViewButton,
  isShowDownloadButton,
  isShowPurchaseButton,
  shouldHideKeepEditingButton,
  onViewClick,
  onStartCreating,
  onKeepEditing,
  onPurchase,
  onConfirmGenerate,
  onShare,
  onDownloadBleed,
  onDownloadStandard,
  onSharePhotobook,
  onShareDrawerClick,
  onPurchasePhotobook,
  onDownloadPhotobookInternals,
  onDownloadPhotobookCover,
  onCopyPhotobookInternalsLink,
  onCopyPhotobookCoverLink,
}: IDownloadCardProductRowProps) => {
  const device = useBreakpoint()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const productFileType: EulogiseProductFileTypes = useMemo(
    () => CardProductHelper.getDownloadProductFileTypes({ product }),
    [product],
  )

  const avgGenerationText = useMemo(
    () =>
      CardProductHelper.getDownloadProductAverageGenerationText({ product }),
    [product],
  )

  const handleOpenConfirmModal = () => setIsConfirmModalOpen(true)

  const handleCloseConfirmModal = () => setIsConfirmModalOpen(false)

  const handleConfirmGenerate = () => {
    handleCloseConfirmModal()
    onConfirmGenerate({ product, cardProductId })
  }

  const handleShareFromModal = () => {
    handleCloseConfirmModal()
    onShare(product)
  }

  const handleKeepEditingFromModal = () => {
    handleCloseConfirmModal()
    onKeepEditing({ product, productId: cardProductId })
  }

  const renderDownloadStatusTributeText = () => {
    if (device === DEVICES.MOBILE) {
      return null
    }
    if (cardProductFileStatus === ResourceFileStatus.GENERATED) {
      if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
        return <StyledProductText>Screen ready JPEG</StyledProductText>
      }
      if (product === EulogiseProduct.PHOTOBOOK) {
        return (
          <StyledProductTextContainer>
            <StyledProductText>Purchased</StyledProductText>
          </StyledProductTextContainer>
        )
      }
      return (
        <StyledProductTextContainer>
          <StyledProductText>Best for pro printing</StyledProductText>
          <StyledProductText>Best for home printing</StyledProductText>
        </StyledProductTextContainer>
      )
    }

    if (hasGeneratePermission) {
      if (cardProductFileStatus === ResourceFileStatus.PROCESSING) {
        return (
          <StyledProductTextRow>
            <StyledProductText>Average generation time</StyledProductText>
            <StyledProductText>{avgGenerationText}</StyledProductText>
          </StyledProductTextRow>
        )
      }

      return <StyledProductText>Prepare for download</StyledProductText>
    }

    return <StyledProductText>{productFileType}</StyledProductText>
  }

  const renderButtonGroups = () => {
    if (!hasCardProduct) {
      return (
        <StyledProcessContainer>
          <StyledStartCreatingOrKeepEditingButton
            buttonSize={ButtonSize.SM}
            buttonType={ButtonType.TRANSPARENT}
            noMarginLeft
            onClick={() => onStartCreating({ product })}
          >
            <EditIcon />
            Start Creating
          </StyledStartCreatingOrKeepEditingButton>
          {(hasGeneratePermission && product !== EulogiseProduct.PHOTOBOOK) ||
          isAdmin ? (
            <StyledGenerateButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              disabled
              onClick={handleOpenConfirmModal}
            >
              <AccountSettingIcon />
              Generate
            </StyledGenerateButton>
          ) : (
            <StyledGenerateButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              disabled={shouldDisableButton}
              onClick={() => onPurchase(product)}
            >
              <PurchaseIcon />
              Purchase
            </StyledGenerateButton>
          )}
        </StyledProcessContainer>
      )
    }

    if (cardProductFileStatus === ResourceFileStatus.GENERATED) {
      return (
        <CheckoutsCardProductDownloadButtons
          product={product}
          isAdmin={isAdmin}
          isBleedDownloadLoading={isBleedDownloadLoading}
          isStandardDownloadLoading={isStandardDownloadLoading}
          isPhotobookInternalsDownloadLoading={
            isPhotobookInternalsDownloadLoading
          }
          isPhotobookCoverDownloadLoading={isPhotobookCoverDownloadLoading}
          isShowShareButton={isShowShareButton}
          isShowHomeViewButton={isShowHomeViewButton}
          isShowProViewButton={isShowProViewButton}
          isShowDownloadButton={isShowDownloadButton}
          isShowPurchaseButton={isShowPurchaseButton}
          onViewClick={onViewClick}
          onDownloadBleed={onDownloadBleed}
          onDownloadStandard={onDownloadStandard}
          onSharePhotobook={onSharePhotobook}
          onPurchasePhotobook={onPurchasePhotobook}
          onDownloadPhotobookInternals={onDownloadPhotobookInternals}
          onDownloadPhotobookCover={onDownloadPhotobookCover}
          onCopyPhotobookInternalsLink={onCopyPhotobookInternalsLink}
          onCopyPhotobookCoverLink={onCopyPhotobookCoverLink}
          onShareClick={onShareDrawerClick}
        />
      )
    }

    if (cardProductFileStatus === ResourceFileStatus.PROCESSING) {
      return (
        <StyledProcessingContainer>
          {processingContent ?? null}
        </StyledProcessingContainer>
      )
    }

    return (
      <>
        <StyledProcessContainer>
          {!shouldHideKeepEditingButton && (
            <StyledStartCreatingOrKeepEditingButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginLeft
              onClick={() =>
                onKeepEditing({ product, productId: cardProductId })
              }
            >
              <EditIcon />
              Keep Editing
            </StyledStartCreatingOrKeepEditingButton>
          )}

          {(hasGeneratePermission && product !== EulogiseProduct.PHOTOBOOK) ||
          isAdmin ? (
            <StyledGenerateButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginLeft
              noMarginRight
              onClick={handleOpenConfirmModal}
            >
              <AccountSettingIcon />
              Generate
            </StyledGenerateButton>
          ) : (
            <StyledGenerateButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              noMarginLeft
              disabled={shouldDisableButton}
              onClick={() => onPurchase(product)}
            >
              <PurchaseIcon />
              Purchase
            </StyledGenerateButton>
          )}
        </StyledProcessContainer>
        {isConfirmModalOpen &&
          (isAnyPageFull ? (
            <FullPageMarginConfirmModal
              isOpen={isConfirmModalOpen}
              onClose={handleCloseConfirmModal}
              onCompleteClick={handleConfirmGenerate}
              onKeepEditingClick={handleKeepEditingFromModal}
            />
          ) : (
            <CompleteConfirmModal
              isOpen={isConfirmModalOpen}
              onClose={handleCloseConfirmModal}
              onCompleteClick={handleConfirmGenerate}
              onShareClick={handleShareFromModal}
              onKeepEditingClick={handleKeepEditingFromModal}
            />
          ))}
      </>
    )
  }

  const productDisplayName = useMemo(() => {
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductType
    ) {
      return genericProductType.name
    }
    return CardProductHelper.getDownloadProductName({ product })
  }, [product, genericProductType])

  const productDisplayNameWithFileTypes = useMemo(() => {
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductType
    ) {
      return `${genericProductType.name} - PDF`
    }
    return CardProductHelper.getDownloadProductNameWithFileTypes({ product })
  }, [product, genericProductType])

  const foldType = genericProductType?.foldType
  return (
    <StyledCardProductItemContainer>
      <StyledProductItemContentContainer>
        <StyledProductNameRow>
          <StyledProductText $isBold>
            {productDisplayName}{' '}
            {foldType ? (
              <StyledFoldTypeText>{foldType}</StyledFoldTypeText>
            ) : (
              ''
            )}
          </StyledProductText>

          <StyledProductText>
            {productDisplayNameWithFileTypes}
          </StyledProductText>
        </StyledProductNameRow>
        {renderDownloadStatusTributeText()}

        <StyledButtonGroupContainer>
          {renderButtonGroups()}
        </StyledButtonGroupContainer>
      </StyledProductItemContentContainer>
    </StyledCardProductItemContainer>
  )
}

export { DownloadCardProductRow }
