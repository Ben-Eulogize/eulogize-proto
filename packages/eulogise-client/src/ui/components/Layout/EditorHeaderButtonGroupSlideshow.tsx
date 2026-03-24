import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  ButtonType,
  UndoIcon,
  RedoIcon,
  Text,
  Button,
  Notification,
} from '@eulogise/client-components'
import {
  useAssetState,
  useAuthState,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
  useSlideshowState,
} from '../../store/hooks'
import {
  CaseStatus,
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  IAuthState,
  ICaseState,
  IGuideWalkThroughState,
  ISlide,
  ISlideshowState,
  ResourceFileStatus,
  ModalId,
  IAssetState,
  ICheckoutEntrySource,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'
import { GeneratingButton } from '../../containers/Button/GeneratingButton'
import { NavigationHelper, CardProductHelper } from '@eulogise/helpers'
import { SlideshowHelper } from '@eulogise/helpers'
import { TitleSlideControlPanelProps } from '../CardProduct/TitleSlideControlPanel'
import {
  downloadSlideshow,
  fetchSlideshowsByCaseId,
  redoSlideshowContent,
  saveSlidesToSlideshowByCaseId,
  undoSlideshowContent,
} from '../../store/SlideshowState/actions'
import { HeaderSlideWarning } from '../../containers/SlideshowInfo/HeaderSlideWarning'
import { showModalAction } from '../../store/ModalState/actions'
import { GuidePopover } from '../GuidePopover/GuidePopover'
import { DEVICES, useBreakpoint } from '@eulogise/client-core'
import { useIsDebug } from '../../hooks/useIsDebug'
import { AxiosProgressEvent } from 'axios'

const StyledRedoUndoPlaceholder = styled.div`
  margin: 0 8px;
`

const IconButton = styled(Button).attrs({
  children: <StyledRedoUndoPlaceholder />,
})`
  span {
    display: none;
    &.anticon {
      display: inline-block;
    }
  }
`

const StyledEditorButtonGroupContainer = styled.div`
  display: flex;
  padding-right: 16px;
  align-items: center;
`

const SlideshowInfo = styled(Text)`
  display: flex;
  margin-right: 10px;
  align-items: center;
`

interface IEditorHeaderButtonGroupSlideshow {
  location: Location
}

const EditorHeaderButtonGroupSlideshow = ({
  location,
}: IEditorHeaderButtonGroupSlideshow) => {
  const [titleSlideProps, setTitleSlideProps] =
    useState<TitleSlideControlPanelProps>()
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const isDebug = useIsDebug()

  const isShowTooSmallScreen = !isDebug && isMobileScreenSize

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const deceasedFullName = activeCase?.deceased?.fullName
  const caseId: string = activeCase?.id!
  const userRole: EulogiseUserRole = account?.role!

  const { isUploadingEditedImage }: IAssetState = useAssetState()
  const isAdmin: boolean = userRole === EulogiseUserRole.ADMIN
  const isClient: boolean = userRole === EulogiseUserRole.CLIENT
  const isEditor: boolean = userRole === EulogiseUserRole.EDITOR
  const caseStatus: CaseStatus = activeCase?.status ?? CaseStatus.UNPAID
  const isPaid: boolean = caseStatus === CaseStatus.PAID

  const editorPaymentConfig = activeCase?.editorPaymentConfig

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })

  const isAtSlideshowTimelineEditor = product === EulogiseProduct.SLIDESHOW

  const { isUpdating, undoContentList, redoContentList } = useProductState({
    product,
  })

  const isCoEditor = userRole === EulogiseUserRole.COEDITOR

  const { activeItem: slideshowData, isDownloading }: ISlideshowState =
    useSlideshowState()

  const hasImageSlides: boolean =
    SlideshowHelper?.getTotalImageSlides(slideshowData!) > 0

  const slides: Array<ISlide> = slideshowData?.content?.slides ?? []

  const totalImageSlides: number = SlideshowHelper.getTotalImageSlides(
    slideshowData!,
  )

  const saveSlideshow = (onSuccess?: () => void) => {
    if (slideshowData) {
      dispatch(
        saveSlidesToSlideshowByCaseId({
          caseId,
          slideshowData,
          slides,
          onSuccess,
        }),
      )
    }
  }

  const onPurchase = () => {
    saveSlideshow()
  }

  const renderTooSmallHeaderButtonGroupSlideshow = () => {
    return (
      <StyledEditorButtonGroupContainer>
        {/* <Button
          noMarginRight
          buttonType={ButtonType.WHITE}
          onClick={() => {
            saveSlideshow()
            NavigationHelper.navigate(
              EulogisePage.DASHBOARD,
              null,
              undefined,
              false,
              () => {},
            )
          }}
          loading={false}
          disabled={false}
        >
          Back to Dashboard
        </Button> */}
      </StyledEditorButtonGroupContainer>
    )
  }

  const renderSlideshowEditorHeaderButtonGroup = () => {
    return (
      <StyledEditorButtonGroupContainer>
        {totalImageSlides > 0 && (
          <SlideshowInfo>
            <HeaderSlideWarning slideshowData={slideshowData!} />
          </SlideshowInfo>
        )}
        <IconButton
          tooltip="Undo"
          buttonType={ButtonType.TRANSPARENT}
          noMarginLeft
          onClick={() => dispatch(undoSlideshowContent())}
          disabled={
            !undoContentList ||
            undoContentList?.length === 0 ||
            isUploadingEditedImage
          }
          icon={<UndoIcon />}
        />
        <IconButton
          tooltip="Redo"
          buttonType={ButtonType.TRANSPARENT}
          noMarginLeft
          onClick={() => dispatch(redoSlideshowContent())}
          disabled={
            !redoContentList ||
            redoContentList.length === 0 ||
            isUploadingEditedImage
          }
          icon={<RedoIcon />}
          noMarginRight
        />
        <Button
          noMarginRight
          buttonType={ButtonType.WHITE}
          onClick={() => {
            dispatch(showModalAction(ModalId.SLIDESHOW_CLEAR_ALL))
          }}
          loading={false}
          disabled={isUploadingEditedImage || isUpdating}
        >
          Clear All
        </Button>
        <Button
          noMarginRight
          buttonType={ButtonType.WHITE}
          onClick={() => {
            saveSlideshow()
          }}
          loading={isUpdating}
          disabled={isUploadingEditedImage}
        >
          Save
        </Button>
        <Button
          tooltip="Share with family"
          disabled={isUploadingEditedImage}
          noMarginRight
          buttonType={ButtonType.WHITE}
          onClick={() => {
            dispatch(
              showModalAction(ModalId.SHARE_CARD_PRODUCT, {
                product,
              }),
            )
          }}
        >
          Share
        </Button>
        <Button
          noMarginRight
          disabled={
            !SlideshowHelper.isPreviewable(slideshowData!) ||
            isUploadingEditedImage
          }
          buttonType={ButtonType.HIGHLIGHTED_BUTTON}
          tooltip="View or share your tribute"
          onClick={() => {
            saveSlideshow(() => {
              Notification.success(`Slideshow saved. Redirecting to preview`)
              setTimeout(() => {
                window.location.replace(
                  `${process.env.GATSBY_APP_ENDPOINT}${EulogisePage.PREVIEW_SLIDESHOW_IN_PAGE}`,
                )
              }, 3000)
            })
          }}
        >
          Preview
        </Button>
        <GuidePopover
          placedPage={GUIDE_SHOW_UP_PAGE.SLIDESHOW}
          showUpStepIndex={5}
          width={430}
        />
        {!isCoEditor &&
          (slideshowData?.fileStatus === ResourceFileStatus.PROCESSING ? (
            <GeneratingButton
              product={EulogiseProduct.SLIDESHOW}
              caseId={caseId}
            />
          ) : slideshowData?.fileStatus === ResourceFileStatus.GENERATED ? (
            <Button
              noMarginRight
              loading={isDownloading}
              disabled={isUploadingEditedImage}
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
                    onProgress: (progressEvent: AxiosProgressEvent) =>
                      console.log(
                        `Downloading slideshow, progress precentage: ${Number(
                          ((progressEvent?.progress ?? 0) * 100)?.toFixed(2),
                        )}`,
                      ),
                  }),
                )
              }}
            >
              Download
            </Button>
          ) : (
            <Button
              onClick={() => {
                onPurchase()
                if (
                  isAdmin ||
                  ((isClient || isEditor) &&
                    editorPaymentConfig !==
                      EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY) ||
                  isPaid
                ) {
                  NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
                } else {
                  NavigationHelper.navigate(
                    EulogisePage.CHECKOUTS_V2_PACKAGE,
                    null,
                    { source: ICheckoutEntrySource?.[product] },
                  )
                }
              }}
              disabled={!hasImageSlides || isUploadingEditedImage}
              tooltip="Complete and download"
              noMarginRight
            >
              Complete
            </Button>
          ))}
      </StyledEditorButtonGroupContainer>
    )
  }

  useEffect(() => {
    if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
      dispatch(
        fetchSlideshowsByCaseId({
          caseId,
          callback: (slideshowData) => {
            const slides = slideshowData?.[0]?.content?.slides
            const startTitleSlide = SlideshowHelper.getStartTitleSlide(slides)
            const endTitleSlide = SlideshowHelper.getEndTitleSlide(slides)
            setTitleSlideProps({
              isStartTitleSlideEnabled: !!startTitleSlide?.isTitleSlideEnable,
              isEndTitleSlideEnabled: !!endTitleSlide?.isTitleSlideEnable,
              titleSlideTransition: startTitleSlide?.titleSlideTransition!,
              endTitleSlideTransition: endTitleSlide?.titleSlideTransition!,
            })
          },
        }),
      )
    }
  }, [product])

  if (!account || !isAtSlideshowTimelineEditor) {
    return null
  }

  if (isShowTooSmallScreen) {
    return renderTooSmallHeaderButtonGroupSlideshow()
  } else {
    return renderSlideshowEditorHeaderButtonGroup()
  }
}

export default EditorHeaderButtonGroupSlideshow
