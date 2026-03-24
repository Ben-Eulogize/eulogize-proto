import React, { useLayoutEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PersonalDetailsForm from '../Forms/Settings/PersonalDetailsForm'
import UpdatePasswordForm from '../Forms/Settings/UpdatePasswordForm'
import BillingDetails from '../Billing/BillingDetails'
import CaseEdit from '../Cases/CaseEdit'
import {
  HeaderTextLG,
  PageHeader,
  Notification,
} from '@eulogise/client-components'
import UploadPicturesPanel from '../Dashboard/UploadPicturesPanel/UploadPicturesPanel'
import { AccountManagementSetting } from './AccountManagementSetting'

import PrimaryImageForm from '../Forms/Settings/PrimaryImageForm'
import {
  useAssetState,
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
} from '../../store/hooks'

import {
  EulogiseUserRole,
  IAssetState,
  IImageAsset,
  IImageSize,
  ModalId,
} from '@eulogise/core'
import { updateCaseById } from '../../store/CaseState/actions'
import { showModalAction } from '../../store/ModalState/actions'

import { ImageHelper } from '@eulogise/helpers'

interface IAccountSettingsProps {
  showUpdatePasswordForm?: boolean
  showUpdateCase?: boolean
  account: {
    id: string
    fullName: string
    email: string
    role: EulogiseUserRole
  }
  onUpdated: () => void
}

const PageContent = styled.div`
  margin: 0 auto;
`

const PageContainer = styled.div`
  display: flex;
`

const AccountSettings: React.FC<IAccountSettingsProps> = ({
  account,
  showUpdatePasswordForm = false,
  showUpdateCase = false,
  onUpdated,
}) => {
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false)
  const [imageLibraryHeight, setImageLibraryHeight] = useState<number>()
  const ref = useRef(null)
  const dispatch = useEulogiseDispatch()
  const { account: loggedInAccount } = useAuthState()
  const { activeItem: activeCase, isUpdating, items: cases } = useCaseState()
  const { images }: IAssetState = useAssetState()
  const primaryImage = activeCase?.deceased?.primaryImage
  const caseId = activeCase?.id

  useLayoutEffect(() => {
    if (ref.current?.clientHeight) {
      setImageLibraryHeight(ref.current?.clientHeight)
    }
  }, [ref.current?.clientHeight])

  const getSelectedPrimaryImagesFileHandles = (): Array<string> => {
    if (!primaryImage) {
      return []
    }
    const imagesFileHandles: Array<string> =
      images?.map((i) => i.content.filestackHandle)! ?? []
    return [
      imagesFileHandles.find(
        (fileHandle) => fileHandle === primaryImage?.filestackHandle,
      )!,
    ]
  }

  const onSelectPrimaryImage = async ({ image }: { image: IImageAsset }) => {
    if (image?.id && !isUpdating) {
      const { height, width }: IImageSize =
        await ImageHelper.getImageSizeViaFilestack(
          image?.content?.filestackHandle,
        )
      const updatedCaseFields = {
        primaryImage: {
          ...image?.content,
          height,
          width,
        },
      }
      dispatch(
        updateCaseById({
          caseId: caseId!,
          caseFields: updatedCaseFields,
          success: () => Notification.success(`Primary image updated.`),
        }),
      )
    }
  }

  const hasLoadedCases = (cases?.length ?? 0) > 0
  const hasAnyClientCases = (cases ?? []).some((eulogiseCase) =>
    Boolean(eulogiseCase?.client),
  )
  const isDirectUser = Boolean(
    loggedInAccount?.role === EulogiseUserRole.CUSTOMER &&
      loggedInAccount?.id === account?.id &&
      hasLoadedCases &&
      !hasAnyClientCases,
  )

  return (
    <PageContainer ref={ref}>
      {showUpdateCase && showImageSelector && (
        <UploadPicturesPanel
          isVisible={true}
          height={`${imageLibraryHeight}px`}
          title={`Select an image to update as primary image`}
          existingFileHandles={getSelectedPrimaryImagesFileHandles()}
          isDraggableImageLibraryItem={false}
          onImageClick={onSelectPrimaryImage}
          onSelectImageClick={onSelectPrimaryImage}
          onUnselectImageClick={() => {
            console.log('unselect image click')
          }}
        />
      )}
      <PageContent>
        <PageHeader>
          <HeaderTextLG>Account Settings</HeaderTextLG>
        </PageHeader>
        <PersonalDetailsForm account={account} isUpdateCase={showUpdateCase} />
        {showUpdatePasswordForm && (
          <UpdatePasswordForm account={account} onUpdated={onUpdated} />
        )}
        <BillingDetails />
        {showUpdateCase && <CaseEdit />}
        {showUpdateCase && (
          <PrimaryImageForm
            onSetShowImageSelector={() =>
              setShowImageSelector(!showImageSelector)
            }
            isUpdating={isUpdating}
          />
        )}
        <AccountManagementSetting
          isVisible={
            account?.role === EulogiseUserRole.CUSTOMER && isDirectUser
          }
          isLoading={!!isUpdating}
          onDeleteAccountClick={() =>
            dispatch(showModalAction(ModalId.DELETE_ACCOUNT_MODAL))
          }
        />
      </PageContent>
    </PageContainer>
  )
}
export default AccountSettings
