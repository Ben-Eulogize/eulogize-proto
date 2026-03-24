import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import PhotoLibraryEditPanel from '../../ui/containers/Dashboard/PhotoLibrary/PhotoLibraryEditPanel'
import MobileUploadQRCodeModal from '../../ui/containers/Dashboard/PhotoLibrary/MobileUploadQRCode/MobileUploadQRCodeModal'
import { NoAutoScroll } from '../../ui/components/NoAutoScroll/NoAutoScroll'
import Layout from '../../ui/components/Layout/Layout'
import { SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import {
  EulogisePage,
  EulogisePhotoLibraryEditMode,
  IAssetState,
  IAuthState,
  ICaseState,
  IModalState,
  ModalId,
} from '@eulogise/core'
import {
  useAssetState,
  useAuthState,
  useCaseState,
  useModalState,
} from '../../ui/store/hooks'
import { makeMobileUploadImageQrCodeLinkByRole } from '../../ui/helpers/AdminHelper'

const StyledBackgroundImageLibraryPage = styled(Layout)`
  padding: 0;
  ${SCREEN_SIZE.TABLET} {
    padding: ${STYLE.CONTENT_PADDING};
  }
`

const BackgroundImageLibraryPage = ({ location }: PageProps) => {
  const caseState: ICaseState = useCaseState()
  const { images }: IAssetState = useAssetState()
  const modalState: IModalState = useModalState()
  const { openModalIds } = modalState
  const isMobileUploadModalOpened: boolean =
    openModalIds?.includes(ModalId.MOBILE_UPLOAD_QR_CODE) ?? false
  const caseId: string = caseState?.activeItem?.id!
  const { account, inviteToken, shadowToken }: IAuthState = useAuthState()

  const role = account?.role
  const qRCodeLink = makeMobileUploadImageQrCodeLinkByRole({
    role,
    inviteToken,
    shadowToken,
    redirectTo: EulogisePage.PHOTO_LIBRARY,
  })

  return (
    <div>
      <NoAutoScroll />
      <StyledBackgroundImageLibraryPage
        location={location}
        title="Background Image Library"
        noPadding={true}
        shouldHideFooter={true}
      >
        <PhotoLibraryEditPanel
          // @ts-ignore
          containerId={'background-image-library'}
          isShow={true}
          axis="xy"
          useDragHandle
          onThumbnailMouseEnter={() => {}}
          onTimelineMouseLeave={() => {}}
          onTimelineMouseEnter={() => {}}
          onSortEnd={() => {}}
          onSortStart={() => {}}
          onSortMove={() => {}}
          caseId={caseId}
          sortedImages={images}
          isDraggingAImage={false}
          setMobileSelectedImageIndex={() => {}}
          editMode={EulogisePhotoLibraryEditMode.BACKGROUND_IMAGE_LIBRARY}
        />
      </StyledBackgroundImageLibraryPage>
      {isMobileUploadModalOpened && (
        <MobileUploadQRCodeModal qRCodeLink={qRCodeLink} />
      )}
    </div>
  )
}

export default BackgroundImageLibraryPage
