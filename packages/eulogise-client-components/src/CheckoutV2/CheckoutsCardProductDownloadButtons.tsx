import React from 'react'
import { ButtonSize, ButtonType } from '../Button'
import { CheckoutTributeDownloadIcon, EyeIcon, ShareIcon } from '../icons'
import { EulogiseProduct } from '@eulogise/core'
import styled from 'styled-components'
import {
  DEVICES,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import { DownloadPageButton } from '../Button/DownloadPageButton'

type CheckoutsCardProductDownloadButtonsProps = {
  product: EulogiseProduct
  isAdmin?: boolean
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
  onDownloadBleed?: () => void
  onDownloadStandard?: () => void
  onViewPhotobook?: () => void
  onSharePhotobook?: () => void
  onPurchasePhotobook?: () => void
  onDownloadPhotobookInternals?: () => void
  onDownloadPhotobookCover?: () => void
  onCopyPhotobookInternalsLink?: () => void
  onCopyPhotobookCoverLink?: () => void
  getPopupContainer?: () => HTMLElement
  onShareClick?: () => void
}

const StyledButtonsContainer = styled.div`
  width: 100%;
`

const StyledShareIcon = styled(ShareIcon)`
  margin-bottom: -2px;
`

const StyledDownloadButtonRowContainer = styled.div`
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: ${STYLE.GUTTER} 0;
  }
`

const StyledDownloadButton = styled(DownloadPageButton)`
  min-width: 130px;
`

const ProductText = styled.div`
  margin-bottom: 0.25rem;
`

const noop = () => undefined

export const CheckoutsCardProductDownloadButtons = ({
  product,
  isAdmin = false,
  isBleedDownloadLoading = false,
  isStandardDownloadLoading = false,
  isPhotobookInternalsDownloadLoading = false,
  isPhotobookCoverDownloadLoading = false,
  isShowShareButton = true,
  isShowHomeViewButton = false,
  isShowProViewButton = false,
  isShowDownloadButton = true,
  isShowPurchaseButton = true,
  onViewClick,
  onDownloadBleed = noop,
  onDownloadStandard = noop,
  onSharePhotobook = noop,
  onPurchasePhotobook = noop,
  onDownloadPhotobookInternals = noop,
  onDownloadPhotobookCover = noop,
  onCopyPhotobookInternalsLink = noop,
  onCopyPhotobookCoverLink = noop,
  getPopupContainer,
  onShareClick,
}: CheckoutsCardProductDownloadButtonsProps) => {
  const device = useBreakpoint()
  return (
    <StyledButtonsContainer>
      {product !== EulogiseProduct.TV_WELCOME_SCREEN &&
        product !== EulogiseProduct.PHOTOBOOK && (
          <StyledDownloadButtonRowContainer>
            {isShowProViewButton && (
              <DownloadPageButton
                buttonSize={ButtonSize.SM}
                noMarginRight
                buttonType={ButtonType.TRANSPARENT}
                icon={<EyeIcon />}
                onClick={() => {
                  if (onViewClick) {
                    onViewClick({ isBleed: true })
                  }
                }}
              >
                View
              </DownloadPageButton>
            )}
            {isShowShareButton && (
              <DownloadPageButton
                buttonSize={ButtonSize.SM}
                noMarginRight
                buttonType={ButtonType.TRANSPARENT}
                icon={<StyledShareIcon />}
                onClick={onShareClick}
              >
                Share
              </DownloadPageButton>
            )}
            {isShowDownloadButton && (
              <>
                {device === DEVICES.MOBILE && (
                  <ProductText>Best for pro printing</ProductText>
                )}
                <StyledDownloadButton
                  buttonSize={ButtonSize.SM}
                  noMarginRight
                  loading={isBleedDownloadLoading}
                  buttonType={ButtonType.PRIMARY}
                  onClick={onDownloadBleed}
                  getPopupContainer={getPopupContainer}
                  tooltip="For professional printing"
                >
                  <CheckoutTributeDownloadIcon />
                  Download
                </StyledDownloadButton>
              </>
            )}
          </StyledDownloadButtonRowContainer>
        )}
      {product !== EulogiseProduct.PHOTOBOOK && (
        <StyledDownloadButtonRowContainer>
          {isShowHomeViewButton && (
            <DownloadPageButton
              buttonSize={ButtonSize.SM}
              noMarginRight
              buttonType={ButtonType.TRANSPARENT}
              icon={<EyeIcon />}
              onClick={() => {
                if (onViewClick) {
                  onViewClick({ isBleed: false })
                }
              }}
            >
              View
            </DownloadPageButton>
          )}

          {isShowDownloadButton && (
            <>
              {device === DEVICES.MOBILE && (
                <ProductText>Best for home printing</ProductText>
              )}

              <StyledDownloadButton
                buttonSize={ButtonSize.SM}
                buttonType={ButtonType.PRIMARY}
                noMarginRight
                loading={isStandardDownloadLoading}
                onClick={onDownloadStandard}
                getPopupContainer={getPopupContainer}
                tooltip="For printing at home"
              >
                <CheckoutTributeDownloadIcon />
                Download
              </StyledDownloadButton>
            </>
          )}
        </StyledDownloadButtonRowContainer>
      )}
      {product === EulogiseProduct.PHOTOBOOK && (
        <>
          <StyledDownloadButtonRowContainer>
            <DownloadPageButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              getPopupContainer={getPopupContainer}
              tooltip="View"
              onClick={() => {
                if (onViewClick) {
                  onViewClick({ isBleed: true })
                }
              }}
              icon={<EyeIcon />}
            >
              View
            </DownloadPageButton>
            {isShowShareButton && (
              <DownloadPageButton
                buttonSize={ButtonSize.SM}
                buttonType={ButtonType.TRANSPARENT}
                getPopupContainer={getPopupContainer}
                noMarginRight
                tooltip="Share"
                onClick={onSharePhotobook}
              >
                <ShareIcon />
                Share
              </DownloadPageButton>
            )}
            {isShowPurchaseButton && (
              <DownloadPageButton
                buttonSize={ButtonSize.SM}
                buttonType={ButtonType.TRANSPARENT}
                noMarginRight
                getPopupContainer={getPopupContainer}
                tooltip="Purchase"
                onClick={onPurchasePhotobook}
              >
                <ShareIcon />
                Purchase
              </DownloadPageButton>
            )}
          </StyledDownloadButtonRowContainer>

          {isAdmin && (
            <>
              <StyledDownloadButtonRowContainer>
                <DownloadPageButton
                  buttonSize={ButtonSize.SM}
                  buttonType={ButtonType.PRIMARY}
                  noMarginLeft
                  getPopupContainer={getPopupContainer}
                  tooltip="Download Internals"
                  loading={isPhotobookInternalsDownloadLoading}
                  onClick={onDownloadPhotobookInternals}
                >
                  <CheckoutTributeDownloadIcon />
                  Download Internals
                </DownloadPageButton>
                <DownloadPageButton
                  buttonSize={ButtonSize.SM}
                  buttonType={ButtonType.PRIMARY}
                  noMarginLeft
                  noMarginRight
                  getPopupContainer={getPopupContainer}
                  tooltip="Download Cover"
                  loading={isPhotobookCoverDownloadLoading}
                  onClick={onDownloadPhotobookCover}
                >
                  <CheckoutTributeDownloadIcon />
                  Download Cover
                </DownloadPageButton>
              </StyledDownloadButtonRowContainer>
              <StyledDownloadButtonRowContainer>
                <DownloadPageButton
                  buttonSize={ButtonSize.SM}
                  buttonType={ButtonType.PRIMARY}
                  noMarginLeft
                  getPopupContainer={getPopupContainer}
                  tooltip="S3 Link Internals"
                  onClick={onCopyPhotobookInternalsLink}
                >
                  <CheckoutTributeDownloadIcon />
                  S3 Link Internals
                </DownloadPageButton>
                <DownloadPageButton
                  buttonSize={ButtonSize.SM}
                  buttonType={ButtonType.PRIMARY}
                  noMarginLeft
                  noMarginRight
                  getPopupContainer={getPopupContainer}
                  tooltip="S3 Link Cover"
                  onClick={onCopyPhotobookCoverLink}
                >
                  <CheckoutTributeDownloadIcon />
                  S3 Link Cover
                </DownloadPageButton>
              </StyledDownloadButtonRowContainer>
            </>
          )}
        </>
      )}
    </StyledButtonsContainer>
  )
}
