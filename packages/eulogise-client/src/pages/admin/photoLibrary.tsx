import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { SortEnd } from '@eulogise/client-components/src/ReactSortableHoc/types/react-sortable-hoc'
import Layout from '../../ui/components/Layout/Layout'
import {
  DEVICES,
  SCREEN_SIZE,
  STYLE,
  useBreakpoint,
} from '@eulogise/client-core'
import {
  useAssetState,
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useModalState,
} from '../../ui/store/hooks'
import {
  fetchAssetsByCaseId,
  updateImagesOrders,
  updateImagesSortBy,
} from '../../ui/store/AssetState/actions'
import {
  IAssetState,
  ICaseState,
  IModalState,
  ModalId,
  IAuthState,
  AssetType,
  EulogiseImageLibrarySortingBy,
  EulogisePage,
  IImageAsset,
} from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'
import MobileUploadQRCodeModal from '../../ui/containers/Dashboard/PhotoLibrary/MobileUploadQRCode/MobileUploadQRCodeModal'
import PhotoLibraryEditPanel from '../../ui/containers/Dashboard/PhotoLibrary/PhotoLibraryEditPanel'
import { fetchCaseById } from '../../ui/store/CaseState/actions'
import { memoriseShadowToken } from '../../ui/store/AuthState/actions'
import { EulogiseUserRole } from '@eulogise/core'
import {
  fetchShadowTokenByUserId,
  makeMobileUploadImageQrCodeLinkByRole,
} from '../../ui/helpers/AdminHelper'
import { NavigationHelper } from '@eulogise/helpers'
import { NoAutoScroll } from '../../ui/components/NoAutoScroll/NoAutoScroll'

const StyledPhotoLibraryPage = styled(Layout)`
  padding: 0;
  ${SCREEN_SIZE.TABLET} {
    padding: ${STYLE.CONTENT_PADDING};
  }
`

const ImageLibraryPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const [mobileSelectedImageIndex, setMobileSelectedImageIndex] = useState<
    number | undefined
  >(undefined)
  const screenSize = useBreakpoint()
  const caseState: ICaseState = useCaseState()
  const dispatch = useEulogiseDispatch()
  const caseId: string = caseState?.activeItem?.id!
  const customisedImagesOrderIds: Array<string> =
    caseState?.activeItem?.customisedImagesOrderIds!
  const { images, sortBy }: IAssetState = useAssetState()
  const [isHoveringTimeline, setIsHoveringTimeline] = useState<boolean>(false)
  const [hoveringThumbnailIndex, setHoveringThumbnailIndex] = useState<number>()
  const [isDraggingAImage, setIsDraggingAImage] = useState<boolean>(false)
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const modalState: IModalState = useModalState()
  const { openModalIds } = modalState
  const isMobileUploadModalOpened: boolean =
    openModalIds?.includes(ModalId.MOBILE_UPLOAD_QR_CODE) ?? false
  const { account, inviteToken, shadowToken }: IAuthState = useAuthState()
  const role = account?.role
  const isContributor = account?.role === EulogiseUserRole.CONTRIBUTOR
  const userId: string = account?.id!

  const assignShadowTokenForNonContributorUsers = async (userId: string) => {
    if (!userId || isContributor) {
      return
    }
    const [shadowToken, error] = await fetchShadowTokenByUserId(userId)
    if (shadowToken && !error) {
      dispatch(memoriseShadowToken({ shadowToken }))
    }
  }

  useEffect(() => {
    return () => {
      NavigationHelper.removeUnsavedListener()
    }
  }, [])

  useEffect(() => {
    if (!caseId) {
      return
    }
    // Has to invoke fetchCases() firstly to get the latest order from database
    dispatch(
      fetchCaseById({
        caseId,
      }),
    )
  }, [caseId])

  useEffect(() => {
    if (!isContributor && userId && !inviteToken) {
      assignShadowTokenForNonContributorUsers(userId)
    }
  }, [userId])

  useEffect(() => {
    if (!caseId) {
      return
    }
    if (customisedImagesOrderIds?.length > 0) {
      dispatch(
        fetchAssetsByCaseId({
          caseId,
          assetType: AssetType.IMAGE,
          sortBy: EulogiseImageLibrarySortingBy.CUSTOMISED,
          customisedImagesOrderIds: customisedImagesOrderIds!,
        }),
      )
    } else {
      dispatch(fetchAssetsByCaseId({ caseId, assetType: AssetType.IMAGE }))
    }
  }, [customisedImagesOrderIds, caseId])

  const onSortEnd = (sortEnd: SortEnd) => {
    const { oldIndex, newIndex } = sortEnd

    setHoveringThumbnailIndex(-1)
    setIsDraggingAImage(false)

    if (isHoveringTimeline || isMobileScreenSize) {
      const fromIndex = oldIndex
      const toIndex = newIndex

      const newOrderedImages = UtilHelper.arrayMove(
        images as Array<IImageAsset>,
        fromIndex,
        toIndex,
      )
      dispatch(updateImagesOrders({ newOrderImages: newOrderedImages }))
      if (sortBy !== EulogiseImageLibrarySortingBy.CUSTOMISED) {
        dispatch(
          updateImagesSortBy({
            sortBy: EulogiseImageLibrarySortingBy.CUSTOMISED,
          }),
        )
      }

      setMobileSelectedImageIndex(toIndex)
      NavigationHelper.addUnsavedListener()
    }
    // triggering this will make sure that the mouse/touch will leave the timeline component
    // - on desktop, the onTimelineMouseEnter() will be trigger immediately
    // - on ipad, which works with touch event, this will indicate that the touch point is not over the timeline component
    onTimelineMouseLeave()
  }

  const onThumbnailMouseEnter = (imageIndex: number) => {
    if (imageIndex !== hoveringThumbnailIndex) {
      setHoveringThumbnailIndex(imageIndex)
    }
    if (!isHoveringTimeline) {
      setIsHoveringTimeline(true)
    }
  }

  const onTimelineMouseEnter = () => {}

  const onTimelineMouseLeave = () => {
    setIsHoveringTimeline(false)
    setHoveringThumbnailIndex(-1)
  }

  const qRCodeLink = makeMobileUploadImageQrCodeLinkByRole({
    role,
    inviteToken,
    shadowToken,
    redirectTo: EulogisePage.PHOTO_LIBRARY,
  })

  if (!caseId) {
    return null
  }

  return (
    <div>
      <NoAutoScroll />
      <StyledPhotoLibraryPage
        location={location}
        title="Photo Library"
        noPadding={true}
        shouldHideFooter={true}
      >
        <PhotoLibraryEditPanel
          // @ts-ignore containerId is the thumbnail list id
          containerId={'photo-image-library-timeline'}
          isShow={true}
          axis="xy"
          useDragHandle
          hoveringThumbnailIndex={hoveringThumbnailIndex!}
          onThumbnailMouseEnter={onThumbnailMouseEnter}
          onTimelineMouseLeave={onTimelineMouseLeave}
          onTimelineMouseEnter={onTimelineMouseEnter}
          onSortEnd={onSortEnd}
          onSortStart={() => {}}
          onSortMove={() => {}}
          caseId={caseId}
          sortedImages={images}
          isDraggingAImage={isDraggingAImage}
          mobileSelectedImageIndex={mobileSelectedImageIndex}
          setMobileSelectedImageIndex={(mobileSelectedImageIndex: number) => {
            setMobileSelectedImageIndex(mobileSelectedImageIndex)
          }}
        />
      </StyledPhotoLibraryPage>
      {isMobileUploadModalOpened && (
        <MobileUploadQRCodeModal qRCodeLink={qRCodeLink} />
      )}
    </div>
  )
}

export default ImageLibraryPage
