import {
  AccountSettingIcon,
  Button,
  ButtonType,
  CheckoutTributeDownloadIcon,
  CompleteConfirmModal,
  DownloadProgressBar,
  EditIcon,
  EyeIcon,
  Notification,
  PurchaseIcon,
  ShareIcon,
} from '@eulogise/client-components'
import { ButtonSize } from '@eulogise/client-components/src/Button'
import {
  EulogisePage,
  EulogiseProduct,
  EulogiseProductFileTypes,
  EulogiseUserRole,
  ICardProductState,
  ICaseState,
  ISlideshowState,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  CardProductHelper,
  NavigationHelper,
  SlideshowHelper,
  VIDEO_CANNOT_EXCEED_LIMIT_TEXT,
} from '@eulogise/helpers'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
  useTvWelcomeScreenState,
} from '../../store/hooks'
import {
  hideModalAction,
  showModalAction,
} from '../../store/ModalState/actions'
import {
  downloadSlideshow,
  generateSlideshow,
} from '../../store/SlideshowState/actions'
import { updateIsSlideshowGenerating } from '../../store/CheckoutsState/action'
import { COLOR, SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import { AxiosProgressEvent } from 'axios'
import { DownloadPageButton } from '@eulogise/client-components/dist/Button/DownloadPageButton'

const StyledSlideshowItemContainer = styled.div``

const StyledProductItemContentContainer = styled.div`
  min-height: 80px;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const StyledProductNameRow = styled.div`
  text-align: left;
  width: 220px;
  display: block;
`

const StyledButtonGroupContainer = styled.div`
  display: flex;
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    width: 330px;
  }
`

const StyledProcessContainer = styled.div<{ $width?: string }>`
  padding-right: 0;
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    justify-content: flex-end;
  }
  ${({ $width }) => ($width ? `width: ${$width};` : `width: 100%;`)}
`

const StyledProcessingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const StyledProcessIcon = styled(AccountSettingIcon)``

const StyledPurchaseIcon = styled(PurchaseIcon)``

const StyledCheckoutTributeDownloadIcon = styled(CheckoutTributeDownloadIcon)``

const StyledProductText = styled.div<{ $padding?: string; $isBold?: boolean }>`
  min-width: 160px;
  padding-top: 4px;
  ${({ $padding }) => $padding && `padding: ${$padding};`}
  ${({ $isBold }) => $isBold && `font-weight: bold;`}
`

const StyledProductTextRow = styled.div`
  min-width: 160px;
  text-align: center;
`

const StyledStartCreatingOrKeepEditingIcon = styled(EditIcon)``

const StyledStartCreatingOrKeepEditingButton = styled(Button)`
  width: 160px;
`

const StyledGenerateButton = styled(DownloadPageButton).attrs({
  noMarginLeft: true,
})`
  width: 130px;
`

interface IProductItemProps {
  product: EulogiseProduct
  caseId: string
  isShowOnlyGenerated?: boolean
  hasGeneratePermission: boolean
  isShowShareButton?: boolean
  isShowViewButton?: boolean
  isShowStartCreatingButton?: boolean
  isShowGenerateButton?: boolean
  isShowDownloadButton?: boolean
  onViewClick?: () => void
  onShareClick?: () => void
  onKeepEditing: ({
    product,
    productId,
  }: {
    product: EulogiseProduct
    productId: string | undefined
  }) => void
  onStartCreating: ({ product }: { product: EulogiseProduct }) => void
  onPurchase: (purchaseProduct: EulogiseProduct) => void
}

export const DownloadTributeProduct = ({
  product,
  caseId,
  hasGeneratePermission = false,
  isShowShareButton = true,
  isShowViewButton = false,
  isShowOnlyGenerated = false,
  isShowStartCreatingButton = true,
  isShowGenerateButton = true,
  isShowDownloadButton = true,
  onViewClick,
  onKeepEditing,
  onStartCreating,
  onPurchase,
  onShareClick,
}: IProductItemProps) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeSlideshow, isDownloading }: ISlideshowState =
    useSlideshowState()
  const { webtokenPayload } = useAuthState()
  const [isVideoBierProcessing, setIsVideoBierProcessing] =
    useState<boolean>(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const deceasedFullName = activeCase?.deceased?.fullName

  const { activeItem: activeTvWelcomeScreen }: ICardProductState =
    useTvWelcomeScreenState()
  const fileStatus: ResourceFileStatus =
    activeSlideshow?.fileStatus! ?? ResourceFileStatus.NOT_STARTED

  const [slideshowDownloadPercent, setSlideshowDownloadPercent] = useState(0)

  const productFileType: EulogiseProductFileTypes =
    CardProductHelper.getDownloadProductFileTypes({ product })

  const isExceededTimeLimit = SlideshowHelper.isExceededTimeLimit(
    activeSlideshow?.content?.duration ?? 0,
  )

  const hasMoreThanOneImageSelectedInSlideshow: boolean =
    SlideshowHelper.getTotalActiveImageSlides(activeSlideshow!) > 0

  const avgGenerationText =
    CardProductHelper.getDownloadProductAverageGenerationText({ product })

  const getProcessText = ({
    hasGeneratePermission,
    fileStatus,
  }: {
    hasGeneratePermission: boolean
    fileStatus: ResourceFileStatus
  }) => {
    if (!hasGeneratePermission || fileStatus === ResourceFileStatus.GENERATED) {
      return ''
    }
    if (hasGeneratePermission && fileStatus === ResourceFileStatus.PROCESSING) {
      return avgGenerationText
    }
    if (isExceededTimeLimit) {
      return (
        <span style={{ color: COLOR.WARNING }}>
          {VIDEO_CANNOT_EXCEED_LIMIT_TEXT}
        </span>
      )
    }
    return 'Prepare for download'
  }

  const processText = getProcessText({ hasGeneratePermission, fileStatus })

  useEffect(() => {
    setSlideshowDownloadPercent(0)
  }, [isDownloading])

  const onClose = () => {
    NavigationHelper.navigate(EulogisePage.DASHBOARD)
    dispatch(hideModalAction(ModalId.DOWNLOAD))
  }

  const onGenerateSlideshow = ({
    isGenerateVideoBier,
  }: {
    isGenerateVideoBier: boolean
  }) => {
    setIsVideoBierProcessing(isGenerateVideoBier)
    setIsOpenConfirmModal(true)
  }

  if (isShowOnlyGenerated) {
    if (fileStatus !== ResourceFileStatus.GENERATED) {
      return null
    }
  }

  const renderTributeActionButton = () => {
    if (!activeSlideshow) {
      return (
        <StyledProcessContainer>
          {isShowStartCreatingButton && (
            <StyledStartCreatingOrKeepEditingButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginLeft
              onClick={() => onStartCreating({ product })}
            >
              <StyledStartCreatingOrKeepEditingIcon />
              Start Creating
            </StyledStartCreatingOrKeepEditingButton>
          )}
          {isShowGenerateButton && (
            <StyledGenerateButton
              buttonType={ButtonType.TRANSPARENT}
              buttonSize={ButtonSize.SM}
              disabled={
                !hasMoreThanOneImageSelectedInSlideshow
                  ? true
                  : !hasGeneratePermission
                  ? false
                  : isExceededTimeLimit
              }
              noMarginRight
              onClick={() =>
                hasGeneratePermission
                  ? onGenerateSlideshow({ isGenerateVideoBier: false })
                  : onPurchase(EulogiseProduct.SLIDESHOW)
              }
            >
              {hasGeneratePermission ? (
                <StyledProcessIcon />
              ) : (
                <StyledPurchaseIcon />
              )}
              {hasGeneratePermission ? 'Generate' : 'Purchase'}
            </StyledGenerateButton>
          )}
        </StyledProcessContainer>
      )
    }

    if (fileStatus === ResourceFileStatus.PROCESSING) {
      return (
        <StyledProcessingContainer>
          <DownloadPageButton
            buttonSize={ButtonSize.SM}
            noMarginLeft
            noMarginRight
            disabled
            buttonType={ButtonType.TRANSPARENT}
            loading
          >
            Processing
          </DownloadPageButton>
        </StyledProcessingContainer>
      )
    } else if (fileStatus === ResourceFileStatus.GENERATED) {
      if (isDownloading) {
        return (
          <StyledProcessContainer>
            <DownloadPageButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.PRIMARY}
              noMarginLeft
              noMarginRight
              loading={isDownloading}
              disabled={true}
            >
              <StyledCheckoutTributeDownloadIcon />
              Downloading
            </DownloadPageButton>
          </StyledProcessContainer>
        )
      }

      return (
        <StyledProcessContainer>
          {isShowViewButton && (
            <DownloadPageButton
              noMarginLeft
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              icon={<EyeIcon />}
              onClick={onViewClick}
            >
              View
            </DownloadPageButton>
          )}
          {isShowShareButton && (
            <DownloadPageButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              icon={<ShareIcon />}
              onClick={onShareClick}
            >
              Share
            </DownloadPageButton>
          )}
          {isShowDownloadButton && (
            <DownloadPageButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.PRIMARY}
              noMarginRight
              loading={isDownloading}
              onClick={() => {
                if (!caseId || !deceasedFullName) {
                  Notification.error(
                    'Cannot download the slideshow, please contact Eulogize admin.',
                  )
                  return
                }

                dispatch(
                  downloadSlideshow({
                    caseId,
                    deceasedName: deceasedFullName,
                    onProgress: (progressEvent: AxiosProgressEvent) => {
                      console.log(
                        `Downloading slideshow, progress precentage: ${Number(
                          ((progressEvent?.progress ?? 0) * 100)?.toFixed(2),
                        )}`,
                      ),
                        setSlideshowDownloadPercent(
                          Number(
                            ((progressEvent?.progress ?? 0) * 100)?.toFixed(2),
                          ) ?? 0,
                        )
                    },
                  }),
                )
              }}
            >
              <StyledCheckoutTributeDownloadIcon />
              Download
            </DownloadPageButton>
          )}
        </StyledProcessContainer>
      )
    } else if (activeSlideshow) {
      return (
        <StyledProcessContainer>
          <StyledStartCreatingOrKeepEditingButton
            buttonSize={ButtonSize.SM}
            buttonType={ButtonType.TRANSPARENT}
            noMarginLeft
            onClick={() =>
              onKeepEditing({ product, productId: activeSlideshow?.id })
            }
            icon={<StyledStartCreatingOrKeepEditingIcon />}
          >
            Keep Editing
          </StyledStartCreatingOrKeepEditingButton>
          {webtokenPayload?.role === EulogiseUserRole.ADMIN ||
            (webtokenPayload?.features?.SLIDESHOW_VB && (
              <DownloadPageButton
                buttonType={ButtonType.TRANSPARENT}
                buttonSize={ButtonSize.SM}
                disabled={
                  isExceededTimeLimit || !hasMoreThanOneImageSelectedInSlideshow
                }
                noMarginLeft
                onClick={() =>
                  onGenerateSlideshow({ isGenerateVideoBier: true })
                }
              >
                <StyledProcessIcon />
                Generate VB
              </DownloadPageButton>
            ))}

          <StyledGenerateButton
            buttonType={ButtonType.TRANSPARENT}
            buttonSize={ButtonSize.SM}
            disabled={
              !hasGeneratePermission
                ? false
                : isExceededTimeLimit || !hasMoreThanOneImageSelectedInSlideshow
            }
            noMarginRight
            onClick={() => {
              hasGeneratePermission
                ? onGenerateSlideshow({ isGenerateVideoBier: false })
                : onPurchase(EulogiseProduct.SLIDESHOW)
            }}
          >
            {hasGeneratePermission ? (
              <StyledProcessIcon />
            ) : (
              <StyledPurchaseIcon />
            )}
            {hasGeneratePermission ? 'Generate' : 'Purchase'}
          </StyledGenerateButton>
          {isOpenConfirmModal && (
            <CompleteConfirmModal
              isOpen={isOpenConfirmModal}
              isVideoBierProcessing={isVideoBierProcessing}
              onClose={() => setIsOpenConfirmModal(false)}
              onCompleteClick={() => {
                setIsOpenConfirmModal(false)
                dispatch(updateIsSlideshowGenerating(true))
                dispatch(
                  generateSlideshow({
                    caseId,
                    slideshowId: activeSlideshow.id!,
                    tvWelcomeScreenId: activeTvWelcomeScreen?.id,
                    isVideoBier: isVideoBierProcessing,
                  }),
                )
              }}
              onShareClick={() => {
                setIsOpenConfirmModal(false)
                dispatch(showModalAction(ModalId.SHARE_SLIDESHOW))
              }}
              onKeepEditingClick={() => {
                setIsOpenConfirmModal(false)
                onClose()
                NavigationHelper.navigate(EulogisePage.EDIT_SLIDESHOW, {
                  slideshowId: activeSlideshow.id!,
                })
              }}
            />
          )}
        </StyledProcessContainer>
      )
    }
    return null
  }

  const renderProcessText = () => {
    if (isDownloading) {
      return (
        <DownloadProgressBar
          percent={slideshowDownloadPercent}
          width={300}
          status={'active'}
          padding={'0 24px 0 0'}
        />
      )
    }

    if (!isDownloading && processText) {
      if (fileStatus === ResourceFileStatus.PROCESSING) {
        return (
          <StyledProductTextRow>
            <StyledProductText>Average generation time</StyledProductText>
            <StyledProductText>{processText}</StyledProductText>
          </StyledProductTextRow>
        )
      }
      return <StyledProductText>{processText}</StyledProductText>
    }
    return <></>
  }

  if (!caseId || !deceasedFullName) {
    return <></>
  }

  return (
    <StyledSlideshowItemContainer>
      <StyledProductItemContentContainer>
        <StyledProductNameRow>
          <StyledProductText $isBold={true}>
            {CardProductHelper.getDownloadProductName({ product })}
          </StyledProductText>
          <StyledProductText $padding="8px 0">
            {productFileType}
          </StyledProductText>
        </StyledProductNameRow>
        {renderProcessText()}
        <StyledButtonGroupContainer>
          {renderTributeActionButton()}
        </StyledButtonGroupContainer>
      </StyledProductItemContentContainer>
    </StyledSlideshowItemContainer>
  )
}
