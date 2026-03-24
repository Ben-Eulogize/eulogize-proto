import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  CheckoutTributeDownloadIcon,
} from '@eulogise/client-components'
import { useAuthState, useProductState } from '../../store/hooks'
import {
  EulogisePage,
  EulogiseProduct,
  IAuthState,
  ICardProductData,
  ICheckoutEntrySource,
} from '@eulogise/core'
import { CardProductHelper, NavigationHelper } from '@eulogise/helpers'

const StyledEditorButtonGroupContainer = styled.div`
  display: flex;
  padding-right: 16px;
`

const StyledBackButton = styled(Button)`
  width: 120px;
`

interface ICheckoutPackageHeaderButtonGroups {
  location: Location
}

const SourceToProduct = Object.fromEntries(
  Object.entries(ICheckoutEntrySource).map(([key, value]) => [value, key]),
) as Record<string, EulogiseProduct>

const CheckoutPackageHeaderButtonGroups = ({
  location,
}: ICheckoutPackageHeaderButtonGroups) => {
  const { account }: IAuthState = useAuthState()

  const queryParams = new URLSearchParams(location.search)
  const source = queryParams.get('source')

  if (!account) {
    return null
  }

  const product = source ? SourceToProduct?.[source] : null
  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product: product as EulogiseProduct,
    location,
  })
  const productState = product
    ? useProductState({ product: product as unknown as EulogiseProduct, slug })
    : { activeItem: null }
  const { activeItem: activeCardProduct } = productState

  const onBack = () => {
    if (!source) {
      return NavigationHelper.navigate(EulogisePage.DASHBOARD)
    }

    const navigatePage = CardProductHelper.getEditPageByProduct({
      product: product as unknown as EulogiseProduct,
    })
    const productId = CardProductHelper.getProductIdKey({
      product: product as unknown as EulogiseProduct,
    })

    if (navigatePage && productId) {
      NavigationHelper.navigate(navigatePage, {
        [productId]: activeCardProduct?.id,
      })
    }
  }

  return (
    <StyledEditorButtonGroupContainer>
      <StyledBackButton
        buttonType={ButtonType.SECONDARY}
        onClick={onBack}
        tooltip="Back"
        noMarginRight
      >
        Back
      </StyledBackButton>
    </StyledEditorButtonGroupContainer>
  )
}

export default CheckoutPackageHeaderButtonGroups
