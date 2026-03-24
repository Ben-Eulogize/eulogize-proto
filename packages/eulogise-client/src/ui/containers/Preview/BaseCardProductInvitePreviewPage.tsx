import React from 'react'
import { WindowLocation } from '@reach/router'
import {
  useAllGenericCardProductTypes,
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useGenericCardProductTypeBySlug,
} from '../../store/hooks'
import BaseInvitePreviewPage from './BaseInvitePreviewPage'
import { showModalAction } from '../../store/ModalState/actions'
import { fetchCardProductsByCaseId } from '../../store/CardProduct/actions'
import {
  EulogiseProduct,
  ICaseState,
  IPreviewModalOption,
  ModalId,
} from '@eulogise/core'

interface IBaseCardProductInvitePreviewPage {
  location: WindowLocation
  product: EulogiseProduct
  slug: string
}

const BaseCardProductInvitePreviewPage = ({
  location,
  product,
  slug,
}: IBaseCardProductInvitePreviewPage) => {
  const dispatch = useEulogiseDispatch()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const genericProductType = useGenericCardProductTypeBySlug(slug)
  const { account } = useAuthState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id
  const region = activeCase?.region!
  const invitorFullName = account?.invitorFullName

  if (!caseId) {
    return null
  }

  return (
    <BaseInvitePreviewPage
      isShowCreateTribute={!activeCase?.client}
      region={region!}
      invitorName={invitorFullName ?? activeCase?.customer.fullName}
      deceasedFullName={activeCase?.deceased?.fullName!}
      onMount={() => {
        dispatch(
          fetchCardProductsByCaseId({
            product,
            caseId,
            genericProductType,
            region,
          }),
        )
      }}
      location={location}
      product={product}
      previewText="View the Preview"
      onWatch={() => {
        dispatch(
          showModalAction(ModalId.CARD_PRODUCT_PREVIEW, {
            product,
            showFooter: false,
            genericProductTypes,
          } as IPreviewModalOption),
        )
      }}
    />
  )
}

export default BaseCardProductInvitePreviewPage
