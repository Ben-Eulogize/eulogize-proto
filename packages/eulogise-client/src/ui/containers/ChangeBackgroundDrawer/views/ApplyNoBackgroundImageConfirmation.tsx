import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import {
  useAllActiveCardProducts,
  useAvailableEulogiseCardProducts,
  useProductState,
  useCaseState,
  useDrawerState,
  useEulogiseDispatch,
  useSlideshowState,
} from '../../../store/hooks'
import {
  ISlideshowData,
  ICardProductData,
  EulogiseProduct,
  ISlideshowState,
  UpdateBackgroundImageMode,
  ICaseState,
  ISlide,
  getBlankBackgroundImages,
  IDrawerState,
} from '@eulogise/core'
import { Button, ButtonType, Title } from '@eulogise/client-components'
import { updateCardProductBackgroundPagesImage } from '../../../store/CardProduct/actions'
import { updateSlideshowBackgroundImage } from '../../../store/SlideshowState/actions'
import { CardProductHelper } from '@eulogise/helpers/src/CardProductHelper'
import { SlideshowHelper } from '@eulogise/helpers/src/SlideshowHelper'
import { BackgroundImageHelper } from '@eulogise/helpers/dist/BackgroundImageHelper'

interface IApplyBackgroundImageContainerProps {
  onClose: () => void
  onConfirm: () => void
  slug?: string
}

const StyledApplyNoBackgroundImageConfirmation = styled.div`
  max-width: 100%;
  width: 30rem;
  ${STYLE.TEXT_MEDIUM}
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

const ApplyNoBackgroundImageConfirmation: React.FC<
  IApplyBackgroundImageContainerProps
> = ({ onConfirm, onClose, slug }) => {
  const dispatch = useEulogiseDispatch()

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id
  const region = activeCase?.region!

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()

  const allActiveCardProducts = useAllActiveCardProducts(
    allAvailableCardProducts,
  )

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides

  const { drawerOptions }: IDrawerState = useDrawerState()
  const currentEditingProduct: EulogiseProduct = drawerOptions?.productType

  let activeCardProduct: ICardProductData | ISlideshowData
  const { activeItem } = useProductState({
    product: currentEditingProduct,
    slug,
  })
  activeCardProduct = activeItem!

  const cardProductsBackgroundChangableMap =
    CardProductHelper.getCardProductsBackgroundChangableMap(
      allActiveCardProducts!,
    )

  const makeApplyNoBackgroundButton = (productName: EulogiseProduct) => {
    if (!productName) {
      return <></>
    }
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

    const getCorrectUpdateMode = (currentEditingProduct: EulogiseProduct) => {
      if (!currentEditingProduct) {
        return UpdateBackgroundImageMode.NOT_APPLICABLE
      }
      if (currentEditingProduct === EulogiseProduct.BOOKLET) {
        return UpdateBackgroundImageMode.UPDATE_ALL_PAGES
      }
      if (
        [
          EulogiseProduct.BOOKMARK,
          EulogiseProduct.TV_WELCOME_SCREEN,
          EulogiseProduct.SIDED_CARD,
        ]
      ) {
        return UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY
      }
      if (currentEditingProduct === EulogiseProduct.SLIDESHOW) {
        return UpdateBackgroundImageMode.UPDATE_ALL_SLIDES
      }
      if (currentEditingProduct === EulogiseProduct.THANK_YOU_CARD) {
        return UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY
      }
      return UpdateBackgroundImageMode.NOT_APPLICABLE
    }
    return (
      <StyledApplyBackgroundChangeButtonContainer>
        <StyledApplyButtonContainer>
          <Button
            key={`apply no background image for ${productName} button`}
            noMarginLeft
            onClick={() => {
              const blankBackgroundImageSet =
                BackgroundImageHelper.getBlankBackgroundImages({
                  region,
                })
              if (productName === EulogiseProduct.ALL) {
                if (isBookletBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.BOOKLET,
                      cardProduct: allActiveCardProducts?.BOOKLET!,
                      updateMode: UpdateBackgroundImageMode.UPDATE_ALL_PAGES,
                      backgroundImageSet: blankBackgroundImageSet,
                    }),
                  )
                }
                if (isBookmarkBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.BOOKMARK,
                      cardProduct: allActiveCardProducts?.BOOKMARK!,
                      updateMode:
                        UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
                      backgroundImageSet: blankBackgroundImageSet,
                    }),
                  )
                }
                if (isSidedCardBackgroundChangable) {
                  dispatch(
                    updateCardProductBackgroundPagesImage({
                      product: EulogiseProduct.SIDED_CARD,
                      cardProduct: allActiveCardProducts?.SIDED_CARD!,
                      updateMode:
                        UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
                      backgroundImageSet: blankBackgroundImageSet,
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
                      backgroundImageSet: blankBackgroundImageSet,
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
                      backgroundImageSet: blankBackgroundImageSet,
                    }),
                  )
                }
                if (isSlideshowBackgroundChangable) {
                  dispatch(
                    updateSlideshowBackgroundImage({
                      product: EulogiseProduct.SLIDESHOW,
                      slideshowData,
                      updateMode: UpdateBackgroundImageMode.UPDATE_ALL_SLIDES,
                      backgroundImageSet: blankBackgroundImageSet,
                      caseId,
                      slides,
                    }),
                  )
                }
              } else if (currentEditingProduct === EulogiseProduct.SLIDESHOW) {
                dispatch(
                  updateSlideshowBackgroundImage({
                    product: EulogiseProduct.SLIDESHOW,
                    slideshowData,
                    updateMode: UpdateBackgroundImageMode.UPDATE_ALL_SLIDES,
                    backgroundImageSet: blankBackgroundImageSet,
                    caseId,
                    slides,
                  }),
                )
              } else if (currentEditingProduct !== EulogiseProduct.ALL) {
                dispatch(
                  updateCardProductBackgroundPagesImage({
                    product: currentEditingProduct!,
                    cardProduct: activeCardProduct as ICardProductData,
                    updateMode: getCorrectUpdateMode(currentEditingProduct),
                    backgroundImageSet: blankBackgroundImageSet,
                  }),
                )
              }
              if (onConfirm) {
                onConfirm()
              }
              close()
            }}
          >
            {productName === EulogiseProduct.ALL
              ? `Apply to all products`
              : `Apply to ${CardProductHelper.getProductName({
                  product: productName,
                  region,
                })}`}
          </Button>
        </StyledApplyButtonContainer>
      </StyledApplyBackgroundChangeButtonContainer>
    )
  }

  const close = () => {
    onClose()
  }

  return (
    <StyledApplyNoBackgroundImageConfirmation>
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
          You are about to remove the background image or design, please select.
        </SentenceText>
      </StyledConfirmationTextContainer>

      <ActionButtonsContainerFirstRow>
        {makeApplyNoBackgroundButton(currentEditingProduct)}
        {makeApplyNoBackgroundButton(EulogiseProduct.ALL)}
      </ActionButtonsContainerFirstRow>
    </StyledApplyNoBackgroundImageConfirmation>
  )
}

export default ApplyNoBackgroundImageConfirmation
