import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import {
  useAllActiveCardProducts,
  useAvailableEulogiseCardProducts,
  useAvailableEulogiseProducts,
  useCaseState,
  useEulogiseDispatch,
  useProductState,
  useSlideshowState,
} from '../../../store/hooks'
import {
  APPLY_BUTTON,
  APPLY_BUTTON_CONTEXT,
  ApplyButtonPageIconEnum,
  EulogiseProduct,
  IApplyButtonContext,
  ICardProductData,
  ICaseState,
  ISlide,
  ISlideshowData,
  ISlideshowState,
  UpdateBackgroundImageMode,
} from '@eulogise/core'
import { Button, ButtonType, Title } from '@eulogise/client-components'
import { updateCardProductBackgroundPagesImage } from '../../../store/CardProduct/actions'
import { updateSlideshowBackgroundImage } from '../../../store/SlideshowState/actions'
import { CardProductHelper } from '@eulogise/helpers/src/CardProductHelper'
import iconBookletFrontActiveLightBlue from '../../../assets/editorPagination/icons/booklet-front-active-light-blue.svg'
import iconBookletFront from '../../../assets/editorPagination/icons/booklet-front.svg'
import iconBookletOpenActiveLightBlue from '../../../assets/editorPagination/icons/booklet-open-active-light-blue.svg'
import iconBookletOpen from '../../../assets/editorPagination/icons/booklet-open.svg'
import iconBookletBackActiveLightBlue from '../../../assets/editorPagination/icons/booklet-back-active-light-blue.svg'
import iconBookletBack from '../../../assets/editorPagination/icons/booklet-back.svg'
import { SlideshowHelper } from '@eulogise/helpers/src/SlideshowHelper'

interface IApplyBackgroundImageContainerProps {
  selectedBackgroundImage: any
  slug?: string
  product: EulogiseProduct
  onClose: () => void
  onConfirm: () => void
}

const StyledApplyBackgroundImageConfirmation = styled.div`
  max-width: 100%;
  width: 30rem;
  ${STYLE.TEXT_MEDIUM}
`

const ProductNameTextContainer = styled.div`
  margin-bottom: ${STYLE.GUTTER};
`

const ProductNameText = styled.div`
  font-weight: ${STYLE.FONT_WEIGHT_BOLD};
  margin-bottom: 0.25rem;
`

const SentenceText = styled.div`
  margin-bottom: ${STYLE.GUTTER};
`

const ActionButtonsContainerFirstRow = styled.div`
  display: flex;
  margin-top: calc(${STYLE.GUTTER} * 2);
  justify-content: space-between;
`

const StyledTitleContainer = styled.div`
  display: flex;
`

const StyledTitle = styled(Title)`
  text-align: left;
  margin-left: 0;
`

const StyledCancelButton = styled(Button)`
  margin-top: 30px;
`

const StyledConfirmationTextContainer = styled.div`
  margin: 30px 0;
`

const StyledApplyBackgroundChangeButtonContainer = styled.div`
  position: relative;
`

const StyledApplyButtonContainer = styled.div`
  margin-top: 10px;
`

const StyledPaginationImageIconsContainer = styled.div`
  position: inherit;
  display: inline-block;
  padding: 0.25rem;
  width: 100%;
`

const StyledIconsContainer = styled.div`
  text-align: center;
  margin: 10px 0px;
`

const StyledPaginationIcon = styled.span<{ isClickable?: boolean }>`
  position: inherit;
  padding: 0 0.25rem;
`

const makeEulogiseProductPageIcons = ({
  applyButtonContext,
}: {
  applyButtonContext: IApplyButtonContext
}) => {
  const {
    show,
    pageIcons: {
      frontPage: { iconType: frontPageIconType, amount: frontPageIconAmount },
      lastPage: { iconType: lastPageIconType, amount: lastPageIconAmount },
      centrePages: {
        iconType: centrePagesIconType,
        amount: centrePagesIconAmount,
      },
    },
  } = applyButtonContext
  if (!show) {
    return null
  }

  return (
    <StyledPaginationImageIconsContainer
      className={'background-change-front-page-icons'}
    >
      <StyledIconsContainer>
        {frontPageIconAmount > 0 && (
          <StyledPaginationIcon isClickable={false} onClick={() => null}>
            <img
              src={
                frontPageIconType === ApplyButtonPageIconEnum?.ACTIVE
                  ? iconBookletFrontActiveLightBlue
                  : iconBookletFront
              }
              alt="1"
            />
          </StyledPaginationIcon>
        )}
        {centrePagesIconAmount > 0 && (
          <StyledPaginationIcon isClickable={false} onClick={() => null}>
            <img
              src={
                centrePagesIconType === ApplyButtonPageIconEnum?.ACTIVE
                  ? iconBookletOpenActiveLightBlue
                  : iconBookletOpen
              }
              alt="2"
            />
          </StyledPaginationIcon>
        )}
        {lastPageIconAmount > 0 && (
          <StyledPaginationIcon isClickable={false} onClick={() => null}>
            <img
              src={
                lastPageIconType === ApplyButtonPageIconEnum?.ACTIVE
                  ? iconBookletBackActiveLightBlue
                  : iconBookletBack
              }
              alt="3"
            />
          </StyledPaginationIcon>
        )}
      </StyledIconsContainer>
    </StyledPaginationImageIconsContainer>
  )
}

const ApplySelectBackgroundConfirmation: React.FC<
  IApplyBackgroundImageContainerProps
> = ({ product, slug, selectedBackgroundImage, onConfirm, onClose }) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!

  const allAvailableProducts: Array<EulogiseProduct> =
    useAvailableEulogiseProducts()
  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()
  let activeCardProduct: ICardProductData | ISlideshowData
  const allActiveCardProducts = useAllActiveCardProducts([
    ...allAvailableCardProducts,
    EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
  ])
  if (product !== EulogiseProduct.ALL) {
    const { activeItem } = useProductState({ product, slug })
    activeCardProduct = activeItem!
  }

  const products =
    EulogiseProduct.ALL === product ? allAvailableProducts : [product]

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides

  const close = () => {
    onClose()
  }

  const cardProductsBackgroundChangableMap =
    CardProductHelper.getCardProductsBackgroundChangableMap(
      allActiveCardProducts!,
    )

  const isBookletBackgroundChangable: boolean =
    cardProductsBackgroundChangableMap?.[EulogiseProduct.BOOKLET]
  const isSlideshowBackgroundChangable: boolean =
    SlideshowHelper.isSlideshowBackgroundChangable(slideshowData)
  const isBookmarkBackgroundChangable: boolean =
    cardProductsBackgroundChangableMap?.[EulogiseProduct.BOOKMARK]
  const isSidedCardBackgroundChangable: boolean =
    cardProductsBackgroundChangableMap?.[EulogiseProduct.SIDED_CARD]
  const isThankYouCardBackgroundChangable: boolean =
    cardProductsBackgroundChangableMap?.[EulogiseProduct.THANK_YOU_CARD]
  const isTVWelcomeScreenBackgroundChangable: boolean =
    cardProductsBackgroundChangableMap?.[EulogiseProduct.TV_WELCOME_SCREEN]
  const isSlideshowTitleSlideBackgroundChangable: boolean =
    cardProductsBackgroundChangableMap?.[EulogiseProduct.SLIDESHOW_TITLE_SLIDE]

  const makeApplyButton = (
    product: EulogiseProduct,
    buttonOrder: APPLY_BUTTON,
  ) => {
    let applyButtonType =
      product === EulogiseProduct.GENERIC_CARD_PRODUCT
        ? EulogiseProduct.ALL
        : product
    const { show, mode, text } =
      APPLY_BUTTON_CONTEXT?.[applyButtonType]?.[buttonOrder]
    const {
      activeItem: { id: caseId, region },
    }: ICaseState = useCaseState()

    if (!show || !mode || !text) {
      return <></>
    }
    const isCardProduct: boolean = CardProductHelper.isCardProduct(product)
    const isSlideshow: boolean = product === EulogiseProduct.SLIDESHOW
    const isAll: boolean = product === EulogiseProduct.ALL
    const isApplyAllPages: boolean =
      mode === UpdateBackgroundImageMode.UPDATE_ALL_PRODUCTS_ALL_PAGES ?? false

    return (
      <StyledApplyBackgroundChangeButtonContainer>
        {makeEulogiseProductPageIcons({
          applyButtonContext:
            APPLY_BUTTON_CONTEXT?.[applyButtonType]?.[buttonOrder],
        })}
        <StyledApplyButtonContainer>
          <Button
            key={`${product} ${buttonOrder} button`}
            noMarginLeft
            noMarginRight
            onClick={() => {
              if (isAll) {
                if (isBookletBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.BOOKLET,
                      cardProduct: allActiveCardProducts?.BOOKLET!,
                      updateMode: isApplyAllPages
                        ? UpdateBackgroundImageMode.UPDATE_ALL_PAGES
                        : UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
                      backgroundImageSet: selectedBackgroundImage,
                    }),
                  )
                }
                if (isBookmarkBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.BOOKMARK,
                      cardProduct: allActiveCardProducts?.BOOKMARK!,
                      updateMode: isApplyAllPages
                        ? UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY
                        : UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY,
                      backgroundImageSet: selectedBackgroundImage,
                    }),
                  )
                }
                if (isSidedCardBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.SIDED_CARD,
                      cardProduct: allActiveCardProducts?.SIDED_CARD!,
                      updateMode: isApplyAllPages
                        ? UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY
                        : UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY,
                      backgroundImageSet: selectedBackgroundImage,
                    }),
                  )
                }
                if (isThankYouCardBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.THANK_YOU_CARD,
                      cardProduct: allActiveCardProducts?.THANK_YOU_CARD!,
                      updateMode:
                        UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY,
                      backgroundImageSet: selectedBackgroundImage,
                    }),
                  )
                }
                if (isTVWelcomeScreenBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.TV_WELCOME_SCREEN,
                      cardProduct: allActiveCardProducts?.TV_WELCOME_SCREEN!,
                      updateMode:
                        UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
                      backgroundImageSet: selectedBackgroundImage,
                    }),
                  )
                }
                if (isSlideshowTitleSlideBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
                      cardProduct:
                        allActiveCardProducts?.SLIDESHOW_TITLE_SLIDE!,
                      updateMode:
                        UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
                      backgroundImageSet: selectedBackgroundImage,
                    }),
                  )
                }
                if (isSlideshowBackgroundChangable) {
                  dispatch(
                    updateSlideshowBackgroundImage({
                      product: EulogiseProduct.SLIDESHOW,
                      slideshowData,
                      updateMode: UpdateBackgroundImageMode.UPDATE_ALL_SLIDES,
                      backgroundImageSet: selectedBackgroundImage,
                      caseId,
                      slides,
                    }),
                  )
                }
              } else if (isSlideshow) {
                dispatch(
                  updateSlideshowBackgroundImage({
                    product: EulogiseProduct.SLIDESHOW,
                    slideshowData,
                    updateMode: UpdateBackgroundImageMode.UPDATE_ALL_SLIDES,
                    backgroundImageSet: selectedBackgroundImage,
                    caseId,
                    slides,
                  }),
                )
              } else if (isCardProduct) {
                dispatch(
                  updateCardProductBackgroundPagesImage({
                    product: product!,
                    slug,
                    cardProduct: activeCardProduct as ICardProductData,
                    updateMode: mode,
                    backgroundImageSet: selectedBackgroundImage,
                  }),
                )
              }
              if (onConfirm) {
                onConfirm()
              }
              close()
            }}
          >
            {text}
          </Button>
        </StyledApplyButtonContainer>
      </StyledApplyBackgroundChangeButtonContainer>
    )
  }

  return (
    <StyledApplyBackgroundImageConfirmation>
      <StyledTitleContainer>
        <StyledTitle>Confirm Background Change</StyledTitle>
        <StyledCancelButton
          key="back"
          buttonType={ButtonType.TRANSPARENT}
          noMarginLeft
          noMarginRight
          onClick={close}
        >
          Back
        </StyledCancelButton>
      </StyledTitleContainer>

      <StyledConfirmationTextContainer>
        <SentenceText>
          You are about to change the background used in the following tribute.
        </SentenceText>
      </StyledConfirmationTextContainer>

      <ProductNameTextContainer>
        {products.map((p: EulogiseProduct) => {
          if (
            p === EulogiseProduct.SLIDESHOW ||
            p === EulogiseProduct.SLIDESHOW_TITLE_SLIDE ||
            cardProductsBackgroundChangableMap[p]
          ) {
            return (
              <ProductNameText key={p}>
                {CardProductHelper.getProductName({ product: p, region })}
              </ProductNameText>
            )
          }
          return null
        })}
      </ProductNameTextContainer>
      <ActionButtonsContainerFirstRow>
        {makeApplyButton(product, APPLY_BUTTON.FIRST_BUTTON)}
        {makeApplyButton(product, APPLY_BUTTON.SECOND_BUTTON)}
      </ActionButtonsContainerFirstRow>
    </StyledApplyBackgroundImageConfirmation>
  )
}

export default ApplySelectBackgroundConfirmation
