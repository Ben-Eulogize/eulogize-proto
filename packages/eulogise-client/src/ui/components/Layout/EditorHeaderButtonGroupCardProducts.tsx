import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonGroup,
  ButtonType,
  RedoIcon,
  UndoIcon,
} from '@eulogise/client-components'
import {
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
  useProductState,
  useSlideshowState,
} from '../../store/hooks'
import {
  CardProductPageMode,
  CardProductViewDisplayMode,
  CaseStatus,
  EulogiseEditorPaymentConfig,
  EulogisePage,
  EulogiseProduct,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  IAuthState,
  ICardProductContent,
  ICardProductData,
  ICardProductViewType,
  ICaseState,
  ICheckoutEntrySource,
  IGenericCardProductContent,
  IGenericCardProductData,
  IGenericCardProductMetadata,
  IGenericCardProductTypeData,
  IGuideWalkThroughState,
  ModalId,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  showCardEditorClearAllModal,
  showModalAction,
} from '../../store/ModalState/actions'
import { GeneratingButton } from '../../containers/Button/GeneratingButton'
import { CardProductDownloadButtons } from '../../containers/Button/CardProductDownloadButtons'
import { NavigationHelper, SlideshowHelper } from '@eulogise/helpers'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { TitleSlideControlPanelProps } from '../CardProduct/TitleSlideControlPanel'
import {
  fetchSlideshowsByCaseId,
  saveTitleSlide,
} from '../../store/SlideshowState/actions'
import {
  redoCardProductContent,
  saveCardProduct,
  undoCardProductContent,
} from '../../store/CardProduct/actions'
import { useIsNotDesktop } from '@eulogise/client-core'
import { GuidePopover } from '../GuidePopover/GuidePopover'
import { fetchThemesAction } from '../../store/ThemeState/actions'
import { restoreTemporaryCheckoutState } from '../../store/CheckoutsState/action'

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
`

interface IEditorHeaderButtonGroupCardProducts {
  location: Location
  pageCursor: number
  genericProductType?: IGenericCardProductTypeData
  displayMode: CardProductViewDisplayMode
  editorViewType?: ICardProductViewType
}

const EditorHeaderButtonGroupCardProducts = ({
  location,
  pageCursor,
  genericProductType,
  displayMode,
  editorViewType,
}: IEditorHeaderButtonGroupCardProducts) => {
  const [titleSlideProps, setTitleSlideProps] =
    useState<TitleSlideControlPanelProps>()
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const checkoutsState = useCheckoutsState()

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!
  const region = activeCase?.region
  const userRole: EulogiseUserRole = account?.role!
  const caseStatus: CaseStatus = activeCase?.status ?? CaseStatus.UNPAID
  const isAdmin: boolean = userRole === EulogiseUserRole.ADMIN
  const isClient: boolean = userRole === EulogiseUserRole.CLIENT
  const isPaid: boolean = caseStatus === CaseStatus.PAID
  const isEditor: boolean = userRole === EulogiseUserRole.EDITOR

  const editorPaymentConfig = activeCase?.editorPaymentConfig

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { guideShowAt, currentStep } = guideWalkThroughContext

  const isGuideWalkThroughHighlighted: boolean =
    guideShowAt === GUIDE_SHOW_UP_PAGE.BOOKLET && currentStep === 4

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })
  const isAtCardProductEditor = CardProductHelper.getIsAtCardProductEditor({
    location,
  })

  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location,
  })
  const {
    activeItem: cardProduct,
    isUpdating,
    undoContentList,
    redoContentList,
  } = useProductState({ product, slug })
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const genericProductMetadata = (cardProduct as IGenericCardProductData)
    ?.content?.metadata as IGenericCardProductMetadata

  const { activeItem: activeSlideshow } = useSlideshowState()

  const isNotDesktop = useIsNotDesktop()
  const cardProductContent = cardProduct?.content
  const pageSize = (cardProductContent as ICardProductContent).pageSize
  const cardProductContentPages = (cardProductContent as ICardProductContent)
    ?.pages

  const pageMode: CardProductPageMode = CardProductHelper.getPageModeByPageSize(
    {
      pageSize,
      product,
      foldType: (cardProductContent as IGenericCardProductContent)?.metadata
        ?.foldType,
      displayMode,
    },
  )

  const noOfPageCursors = CardProductHelper.getTotalPageCursors({
    product,
    totalPages: cardProductContentPages?.length,
    foldType: genericProductMetadata?.foldType,
    pageMode,
    isMobile: isNotDesktop,
  })

  const currentPageCursor =
    pageCursor > noOfPageCursors! - 1 ? noOfPageCursors! - 1 : pageCursor

  const { leftPageIndex, rightPageIndex } =
    CardProductHelper.getPageIndexesByPageCursor({
      product,
      pageCursorIndex: currentPageCursor,
      foldType: genericProductMetadata?.foldType,
      totalPages: cardProductContentPages?.length,
      pageMode,
    })

  const isTemporaryCheckoutStateExisting = checkoutsState.temporaryCheckoutState

  const onSaveTitleSlide = (tsp?: TitleSlideControlPanelProps) => {
    const tSlideProps = tsp || titleSlideProps
    dispatch(
      saveTitleSlide({
        caseId,
        slideshowData: activeSlideshow!,
        startTitleSlideData: {
          isTitleSlideEnable: tSlideProps?.isStartTitleSlideEnabled,
          titleSlideTransition: tSlideProps?.titleSlideTransition,
        },
        endTitleSlideData: {
          isTitleSlideEnable: tSlideProps?.isEndTitleSlideEnabled,
          titleSlideTransition: tSlideProps?.endTitleSlideTransition,
        },
      }),
    )
  }

  const save = ({ onSuccess }: { onSuccess?: () => void }) => {
    if (product && cardProduct) {
      const cardProductData = cardProduct as ICardProductData
      dispatch(
        saveCardProduct({
          product,
          slug: (cardProductData as IGenericCardProductData)?.content?.metadata
            ?.slug,
          cardProduct: cardProductData,
          saveFromClickComplete: true,
          onSuccess,
        }),
      )
      if (activeSlideshow && product === EulogiseProduct.TV_WELCOME_SCREEN) {
        onSaveTitleSlide()
      }
    }
  }

  const canSkipPackageStep =
    isAdmin ||
    isPaid ||
    ((isClient || isEditor) &&
      editorPaymentConfig !== EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY)

  const navigateToPackage = (p: EulogiseProduct) => {
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE, null, {
      source: ICheckoutEntrySource?.[p],
    })
  }

  const navigateAfterRestore = (restoredProduct: EulogiseProduct) => {
    switch (restoredProduct) {
      case EulogiseProduct.BOOKLET:
      case EulogiseProduct.SIDED_CARD:
      case EulogiseProduct.BOOKMARK:
      case EulogiseProduct.THANK_YOU_CARD:
      case EulogiseProduct.TV_WELCOME_SCREEN:
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_OPTIONS)
        return
      case EulogiseProduct.PHOTOBOOK:
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
        return
      default:
        navigateToPackage(restoredProduct)
        return
    }
  }

  const navigateAfterFinalize = (p: EulogiseProduct) => {
    // If user can skip package step:
    // - photobook goes to package (with source)
    // - others go to download
    if (canSkipPackageStep) {
      if (p === EulogiseProduct.PHOTOBOOK) {
        navigateToPackage(p)
      } else {
        NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
      }
      return
    }

    // Otherwise always go package (with source)
    navigateToPackage(p)
  }

  const handleFinalizeSuccess = () => {
    if (isTemporaryCheckoutStateExisting) {
      dispatch(restoreTemporaryCheckoutState())

      const restoredEditingProduct: EulogiseProduct =
        CardProductHelper.getAtWhichProductEditorPage({ location })

      navigateAfterRestore(restoredEditingProduct)
      return
    }

    navigateAfterFinalize(product)
  }

  useEffect(() => {
    if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
      dispatch(fetchSlideshowsByCaseId({ caseId }))
    }
  }, [product])

  useEffect(() => {
    if (!activeSlideshow) {
      return
    }
    const slides = activeSlideshow.content?.slides
    const startTitleSlide = SlideshowHelper.getStartTitleSlide(slides)
    const endTitleSlide = SlideshowHelper.getEndTitleSlide(slides)
    setTitleSlideProps({
      isStartTitleSlideEnabled: !!startTitleSlide?.isTitleSlideEnable,
      isEndTitleSlideEnabled: !!endTitleSlide?.isTitleSlideEnable,
      titleSlideTransition: startTitleSlide?.titleSlideTransition!,
      endTitleSlideTransition: endTitleSlide?.titleSlideTransition!,
    })
  }, [activeSlideshow])

  if (!account || !isAtCardProductEditor) {
    return null
  }

  const isCreateTemplateAllowed =
    (userRole === EulogiseUserRole.ADMIN ||
      userRole === EulogiseUserRole.CLIENT) &&
    !isPhotobook

  useEffect(() => {
    if (isCreateTemplateAllowed) {
      dispatch(fetchThemesAction())
    }
  }, [isCreateTemplateAllowed])

  const FinalizeTributeButton = () => (
    <Button
      tooltip="Finalize your tribute"
      disabled={!cardProduct}
      buttonType={
        isGuideWalkThroughHighlighted
          ? ButtonType.HIGHLIGHTED_BUTTON
          : ButtonType.PRIMARY
      }
      noMarginLeft
      noMarginRight
      onClick={() => {
        save({ onSuccess: handleFinalizeSuccess })
      }}
    >
      {isTemporaryCheckoutStateExisting ? 'Return to Checkout' : 'Complete'}
    </Button>
  )

  const renderPrimaryActionButton = () => {
    let primaryActionButton: React.ReactNode = null

    if (userRole !== EulogiseUserRole.COEDITOR) {
      if (cardProduct?.fileStatus === ResourceFileStatus.PROCESSING) {
        primaryActionButton = (
          <GeneratingButton
            product={product}
            caseId={cardProduct.case}
            noMarginLeft
            noMarginRight
          />
        )
      } else if (
        CardProductHelper.isReadyForDownload(cardProduct?.fileStatus!)
      ) {
        primaryActionButton = (
          <CardProductDownloadButtons
            product={product}
            cardProduct={cardProduct as ICardProductData}
            caseId={cardProduct?.case!}
            deceasedName={activeCase?.deceased.fullName!}
            region={region}
          />
        )
      } else {
        primaryActionButton = <FinalizeTributeButton />
      }
    }

    // If there is a temporary checkout state and no button has been chosen yet, show FinalizeTributeButton
    if (isTemporaryCheckoutStateExisting && !primaryActionButton) {
      primaryActionButton = <FinalizeTributeButton />
    }

    return primaryActionButton
  }

  return (
    <StyledEditorButtonGroupContainer>
      <IconButton
        tooltip={
          // no tooltip when this button is disabled
          !undoContentList || undoContentList?.length === 0 ? null : `Undo`
        }
        buttonType={ButtonType.TRANSPARENT}
        onClick={() => dispatch(undoCardProductContent(product))}
        disabled={!undoContentList || undoContentList?.length === 0}
        noMarginLeft
        icon={<UndoIcon />}
      />
      <IconButton
        tooltip={
          // no tooltip when this button is disabled
          !redoContentList || redoContentList.length === 0 ? null : `Redo`
        }
        buttonType={ButtonType.TRANSPARENT}
        onClick={() => dispatch(redoCardProductContent(product))}
        disabled={!redoContentList || redoContentList.length === 0}
        loading={isUpdating}
        noMarginLeft
        noMarginRight
        icon={<RedoIcon />}
      />
      <ButtonGroup>
        <Button
          noMarginRight
          buttonType={ButtonType.TRANSPARENT}
          onClick={() =>
            dispatch(
              showCardEditorClearAllModal({
                product,
                genericProductType,
                leftPageIndex,
                rightPageIndex,
                currentPageCursor,
                isShowClearAllPage: true,
                isShowClearCurrentPage:
                  editorViewType !== ICardProductViewType.SPREAD_VIEW,
              }),
            )
          }
          loading={false}
          disabled={isUpdating}
        >
          Clear All
        </Button>
        {isCreateTemplateAllowed && (
          <Button
            buttonType={
              isGuideWalkThroughHighlighted
                ? ButtonType.PRIMARY
                : ButtonType.TRANSPARENT
            }
            onClick={() => {
              dispatch(
                showModalAction(ModalId.SAVE_TEMPLATE_DESIGN, {
                  [ModalId.SAVE_TEMPLATE_DESIGN]: {
                    product,
                    slug,
                    region,
                  },
                }),
              )
            }}
            tooltip="Save this memorial template"
            noMarginRight
          >
            Create Template
          </Button>
        )}
        {product !== EulogiseProduct.SLIDESHOW && (
          <Button
            noMarginRight
            buttonType={ButtonType.TRANSPARENT}
            onClick={() => {
              dispatch(
                showModalAction(
                  CardProductHelper.getPreviewModalIdByProduct(product)!,
                  { product, genericProductType, slug },
                ),
              )
            }}
          >
            Preview
          </Button>
        )}
        <Button
          buttonType={
            isGuideWalkThroughHighlighted
              ? ButtonType.HIGHLIGHTED_BUTTON
              : ButtonType.TRANSPARENT
          }
          onClick={save}
          tooltip="Save this memorial"
          loading={isUpdating}
          noMarginRight
        >
          Save
        </Button>
        <Button
          tooltip="Share with family"
          disabled={!cardProduct}
          buttonType={
            isGuideWalkThroughHighlighted
              ? ButtonType.HIGHLIGHTED_BUTTON
              : ButtonType.TRANSPARENT
          }
          onClick={() => {
            dispatch(
              showModalAction(ModalId.SHARE_CARD_PRODUCT, {
                product,
                slug,
              }),
            )
          }}
        >
          Share
        </Button>
        <GuidePopover
          placedPage={GUIDE_SHOW_UP_PAGE.BOOKLET}
          showUpStepIndex={4}
          width={430}
        />
        {renderPrimaryActionButton()}
      </ButtonGroup>
    </StyledEditorButtonGroupContainer>
  )
}

export default EditorHeaderButtonGroupCardProducts
