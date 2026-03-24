import React from 'react'
import { PageProps } from 'gatsby'
import { showModalAction } from '../../ui/store/ModalState/actions'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
} from '../../ui/store/hooks'
import { fetchSlideshowsByCaseId } from '../../ui/store/SlideshowState/actions'
import BaseInvitePreviewPage from '../../ui/containers/Preview/BaseInvitePreviewPage'
import {
  EulogiseProduct,
  EulogiseRegion,
  ICaseState,
  ModalId,
} from '@eulogise/core'
import { fetchCardProductsByCaseId } from '../../ui/store/CardProduct/actions'

const PreviewSlideshowPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { account } = useAuthState()
  const invitorFullName = account?.invitorFullName

  const caseId = activeCase?.id
  const region = EulogiseRegion.AU

  if (!caseId) {
    return null
  }
  const product = EulogiseProduct.SLIDESHOW
  return (
    <BaseInvitePreviewPage
      region={region!}
      invitorName={invitorFullName ?? activeCase?.customer?.fullName}
      deceasedFullName={activeCase?.deceased?.fullName!}
      onMount={() => {
        dispatch(fetchSlideshowsByCaseId({ caseId }))
        dispatch(
          fetchCardProductsByCaseId({
            product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
            caseId,
            region,
          }),
        )
      }}
      location={location}
      product={EulogiseProduct.SLIDESHOW}
      previewText="Watch the Preview"
      onWatch={() => {
        dispatch(
          showModalAction(ModalId.SLIDESHOW_PREVIEW, {
            product,
            showFooter: false,
          }),
        )
      }}
    />
  )
}

export default PreviewSlideshowPage
