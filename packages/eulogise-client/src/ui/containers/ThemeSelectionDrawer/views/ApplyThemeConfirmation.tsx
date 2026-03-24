import React, { useRef } from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import {
  useAllActiveCardProducts,
  useAnyActiveCardProductIsFetching,
  useAvailableEulogiseCardProductsByTheme,
  useAvailableEulogiseProductsByTheme,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
  useAllGenericCardProductTypes,
} from '../../../store/hooks'
import {
  IAllActiveCardProducts,
  ISlideshowData,
  ICardProductData,
  EulogiseProduct,
  ISlideshowState,
  ICaseState,
  INavigateToProductQueryString,
  ITheme,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import {
  Button,
  ButtonType,
  Title,
  Notification,
} from '@eulogise/client-components'
import {
  applyThemeToAllProducts,
  applyThemeToProduct,
} from '../../../store/CardProduct/actions'
import { closeDrawerAction } from '../../../store/DrawerState/actions'
import {
  SlideshowHelper,
  CardProductHelper,
  NavigationHelper,
  AccountHelper,
  CaseHelper,
} from '@eulogise/helpers'

interface IApplyThemeConfirmationProps {
  theme: ITheme
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  onClose: () => void
  onConfirm: () => void
  isNavigateToProductWhenApplyTheme: boolean
  navigateToProductWhenApplyAll: EulogiseProduct
}

const StyledApplyThemeConfirmation = styled.div`
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

const ActionButtonsContainer = styled.div`
  display: flex;
  margin-top: calc(${STYLE.GUTTER} * 2);
`

const StyledTitle = styled(Title)`
  text-align: left;
  margin-left: 0;
`

const ApplyThemeConfirmation = ({
  product,
  genericProductType,
  theme,
  onConfirm,
  onClose,
  isNavigateToProductWhenApplyTheme,
  navigateToProductWhenApplyAll,
}: IApplyThemeConfirmationProps) => {
  const noOfSuccessRef = useRef(0)
  const dispatch = useEulogiseDispatch()
  const caseState: ICaseState = useCaseState()
  const isAnyFetching = useAnyActiveCardProductIsFetching()
  const activeCase = caseState.activeItem!
  const {
    deceased: {
      hasSkippedOrFilledMemorialDataPullForm,
      fullName,
      primaryImage,
    },
    service: { location, serviceStartTime },
  } = activeCase
  const dateOfBirth = CaseHelper.getDateOfBirth(activeCase)
  const dateOfDeath = CaseHelper.getDateOfDeath(activeCase)
  const dateOfService = CaseHelper.getDateOfService(activeCase)
  const { activeItem: activeSlideshow }: ISlideshowState = useSlideshowState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const region = activeCase?.region!
  const slug = genericProductType?.slug

  const allAvailableProducts: Array<EulogiseProduct> =
    useAvailableEulogiseProductsByTheme(theme)
  const allAvailableCardProducts: Array<EulogiseProduct | string> =
    useAvailableEulogiseCardProductsByTheme(theme)

  let activeCardProduct: ICardProductData | ISlideshowData
  let allActiveCardProducts: IAllActiveCardProducts
  if (product === EulogiseProduct.ALL) {
    allActiveCardProducts = useAllActiveCardProducts(allAvailableCardProducts)
  } else {
    const { activeItem } = useProductState({ product, slug })
    activeCardProduct = activeItem!
  }

  const products =
    EulogiseProduct.ALL === product ? allAvailableProducts : [product]

  const changableProducts: Array<EulogiseProduct> = products.filter(
    (p: EulogiseProduct): boolean => {
      if (p === EulogiseProduct.SLIDESHOW) {
        return SlideshowHelper.isSlideshowThemeChangable(activeSlideshow!)
      }
      return CardProductHelper.isCardProductThemeChangable(
        allActiveCardProducts?.[p],
      )
    },
  )

  const close = () => {
    onClose()
  }

  const navigateToProduct = ({
    product,
    id,
    query,
  }: {
    product: EulogiseProduct
    id: string
    query?: INavigateToProductQueryString
  }) => {
    if (!isNavigateToProductWhenApplyTheme) {
      return
    }
    NavigationHelper.navigateToProduct({ product, slug, id, query })
  }

  return (
    <StyledApplyThemeConfirmation>
      <StyledTitle>Are you sure?</StyledTitle>
      <SentenceText>
        You are about to change the theme used in the following memorial.
      </SentenceText>
      <ProductNameTextContainer data-testid="confirm-product-name">
        {changableProducts.map((p: EulogiseProduct) => (
          <ProductNameText key={p}>
            {CardProductHelper.getProductName({
              product: p,
              genericProductType,
              region,
            })}
          </ProductNameText>
        ))}
      </ProductNameTextContainer>
      <SentenceText>
        Changing the theme will overwrite any saved changes you have already
        made.
      </SentenceText>
      <ActionButtonsContainer>
        <Button
          key="cancel"
          buttonType={ButtonType.TRANSPARENT}
          noMarginLeft
          noMarginRight
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          key="apply"
          loading={isAnyFetching}
          noMarginRight
          onClick={() => {
            if (EulogiseProduct.ALL === product) {
              const totalProducts = AccountHelper.getAllAvailableProducts({
                activeCase,
                genericProductTypes,
              }).length
              noOfSuccessRef.current = 0
              dispatch(
                applyThemeToAllProducts({
                  activeCase,
                  slideshow: activeSlideshow,
                  cardProducts: allActiveCardProducts,
                  themeId: theme.id,
                  isPopulatingData: hasSkippedOrFilledMemorialDataPullForm!,
                  populatedData: {
                    deceasedName: fullName,
                    dateOfService,
                    dateOfBirth,
                    dateOfDeath,
                    location,
                    serviceStartTime,
                    primaryImage,
                  },
                  onSuccess: (p, productId) => {
                    if (p === navigateToProductWhenApplyAll) {
                      navigateToProduct({
                        product: p,
                        id: productId,
                        query: {
                          applyThemeTo: EulogiseProduct.ALL,
                        },
                      })
                    }
                    noOfSuccessRef.current += 1
                    // need to minus 1 because Photobook does not have a theme
                    // refer to https://trello.com/c/We1V4JWA/1492-apply-to-all-turn-off-notifications
                    if (noOfSuccessRef.current === totalProducts - 1) {
                      Notification.success('Theme changed')
                    }
                  },
                }),
              )
            } else {
              dispatch(
                applyThemeToProduct({
                  product,
                  genericProductType,
                  activeCase,
                  slideshow: activeSlideshow,
                  cardProduct: activeCardProduct as ICardProductData,
                  themeId: theme.id,
                  isPopulatingData: hasSkippedOrFilledMemorialDataPullForm!,
                  populatedData: {
                    deceasedName: fullName,
                    dateOfService,
                    dateOfBirth,
                    dateOfDeath,
                    location,
                    serviceStartTime,
                    primaryImage,
                  },
                  onSuccess: (cardProductId) => {
                    navigateToProduct({ product, id: cardProductId })
                  },
                }),
              )
            }

            dispatch(closeDrawerAction())
            if (onConfirm) {
              onConfirm()
            }
            close()
          }}
        >
          Confirm Theme Change
        </Button>
      </ActionButtonsContainer>
    </StyledApplyThemeConfirmation>
  )
}

export default ApplyThemeConfirmation
