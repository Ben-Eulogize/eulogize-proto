import React, { useState } from 'react'
import styled from 'styled-components'
import { Drawer, DrawerPlacement, IDrawerProps } from '../Drawer'
import { Alert } from '../../Alert'
import {
  AccountSettingIcon,
  AddContributorIcon,
  CopyAssetIcon,
  CreateNewCaseIcon,
  GlobalEarthIcon,
  MemorialEditIcon,
  UploadPicturesIcon,
  UserIcon,
  ViewAllCasesIcon,
} from '../../icons'
import { DrawerLabel } from './DrawerLabel'
import {
  EulogiseCountry,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  IEulogiseProductAvailabilityStatus,
  IEulogiseUser,
  INITIAL_DEFAULT_PRODUCTS,
  MemorialVisualStatus,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
  ResourceFileStatus,
} from '@eulogise/core'
import { DrawerListRow } from './DrawerListRow'
import { DrawerListRowItem } from './DrawerListRowItem'
import { DrawerLabelRowStatusItem } from './DrawerLabelRowStatusItem'
import { Tooltip } from '../../Tooltip'
import { STYLE } from '@eulogise/client-core'
import { CardProductHelper } from '@eulogise/helpers'
import { SwitchButton } from '../../Switch'
import { Select } from '../../Select'
import { Spin } from '../../Spin'
import { IPortalTableResetClickEvent } from '../../Table'

type SelectOption = {
  label: string
  value: string
}

export type ISettingDrawerProps = Omit<IDrawerProps, 'children'> & {
  arrangerId?: string
  userRole?: EulogiseUserRole
  funeralDirectors: Array<IEulogiseUser>
  onArrangerChange: (arrangerId: string, selectedItem: SelectOption) => void
  isFetchingCaseSummary?: boolean
  isFetchingFuneralDirectors?: boolean
  isFetchingUserRole?: boolean
  header?: string
  caseId: string
  isAdmin: boolean
  region: EulogiseRegion
  country: EulogiseCountry
  noOfInvites: number
  noOfImages: number
  enabledProducts?: IEulogiseProductAvailabilityStatus
  availableProducts?: IEulogiseProductAvailabilityStatus
  onResetClick: (ev: IPortalTableResetClickEvent) => void
  bookletId?: string
  bookletStatus: MemorialVisualStatus
  bookletFileStatus: ResourceFileStatus
  onBookletClick: () => void
  onBookletEditClick: () => void
  onBookletUnlockClick: () => void
  onBookletReEditClick: () => void
  bookmarkId?: string
  bookmarkStatus: MemorialVisualStatus
  bookmarkFileStatus: ResourceFileStatus
  onBookmarkClick: () => void
  onBookmarkEditClick: () => void
  onBookmarkUnlockClick: () => void
  onBookmarkReEditClick: () => void
  sidedCardId?: string
  sidedCardStatus: MemorialVisualStatus
  sidedCardFileStatus: ResourceFileStatus
  onSidedCardClick: () => void
  onSidedCardEditClick: () => void
  onSidedCardUnlockClick: () => void
  onSidedCardReEditClick: () => void
  slideshowId?: string
  slideshowStatus: MemorialVisualStatus
  slideshowFileStatus: ResourceFileStatus
  onSlideshowClick: () => void
  onSlideshowEditClick: () => void
  onSlideshowUnlockClick: () => void
  onSlideshowReEditClick: () => void
  thankyouCardId?: string
  thankyouCardStatus: MemorialVisualStatus
  thankyouCardFileStatus: ResourceFileStatus
  onThankyouCardClick: () => void
  onThankyouCardEditClick: () => void
  onThankyouCardUnlockClick: () => void
  onThankyouCardReEditClick: () => void
  photobookId?: string
  photobookStatus: MemorialVisualStatus
  photobookFileStatus: ResourceFileStatus
  onPhotobookClick: () => void
  onPhotobookEditClick: () => void
  onPhotobookUnlockClick: () => void
  onPhotobookReEditClick: () => void
  tvWelcomeScreenId?: string
  tvWelcomeScreenStatus: MemorialVisualStatus
  tvWelcomeScreenFileStatus: ResourceFileStatus
  onTvWelcomeScreenClick: () => void
  onTvWelcomeScreenEditClick: () => void
  onTvWelcomeScreenUnlockClick: () => void
  onTvWelcomeScreenReEditClick: () => void
  onViewMemorialClick: () => void
  onAccountSettingsClick: () => void
  onInviteContributorClick: () => void
  onUploadPictureClick: () => void
  allowUnlock?: boolean
  allowReset?: boolean
  onToggleFeature: (
    enabled: Partial<IEulogiseProductAvailabilityStatus>,
  ) => void
  onFamilyCanDownloadClick: (enabled: boolean) => void
  isRetainOnCleanup?: boolean
  onToggleRetentionClick: () => void
  onViewPhotosInPhotoLibrary: () => void
}

// @ts-ignore
const StyledSettingDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding-right: 0;
  }
`

// @ts-ignore
const StyledAlert = styled(Alert)`
  margin-top: 0;
`

const DrawerList = styled.div``

const SettingDrawerContent = styled.div`
  padding-right: 1rem;
`

/*
const isCompleteStatus = (status: MemorialVisualStatus) =>
  status === MemorialVisualStatus.DOWNLOAD ||
  status === MemorialVisualStatus.COMPLETE
*/

// @ts-ignore
const StyledCaseIdDrawerListRowItem = styled(DrawerListRowItem)`
  justify-content: space-between;
  cursor: default;
`

const getDisabledText = ({
  isGenerating,
  isProductDisabled,
}: {
  isGenerating?: boolean
  isProductDisabled?: boolean
}) => {
  if (isProductDisabled) {
    return 'Disabled'
  }
  if (isGenerating) {
    return 'Generating...'
  }
  return ''
}

const CaseIdLabel = styled.span`
  font-size: ${STYLE.FONT_SIZE_XS};
`

export const SettingDrawer = (props: ISettingDrawerProps) => {
  const {
    arrangerId,
    userRole,
    funeralDirectors,
    onFamilyCanDownloadClick,
    isAdmin,
    region,
    country,
    noOfInvites,
    noOfImages,
    enabledProducts = INITIAL_DEFAULT_PRODUCTS,
    availableProducts,
    bookletId,
    bookletStatus,
    bookletFileStatus,
    onBookletClick,
    onBookletEditClick,
    onBookletUnlockClick,
    onBookletReEditClick,
    bookmarkId,
    bookmarkStatus,
    bookmarkFileStatus,
    onBookmarkClick,
    onBookmarkEditClick,
    onBookmarkUnlockClick,
    onBookmarkReEditClick,
    sidedCardId,
    sidedCardStatus,
    sidedCardFileStatus,
    onSidedCardClick,
    onSidedCardEditClick,
    onSidedCardUnlockClick,
    onSidedCardReEditClick,
    slideshowId,
    slideshowStatus,
    slideshowFileStatus,
    onSlideshowClick,
    onSlideshowEditClick,
    onSlideshowUnlockClick,
    onSlideshowReEditClick,
    thankyouCardId,
    thankyouCardStatus,
    thankyouCardFileStatus,
    onThankyouCardClick,
    onThankyouCardEditClick,
    onThankyouCardUnlockClick,
    onThankyouCardReEditClick,
    photobookId,
    photobookStatus,
    photobookFileStatus,
    onPhotobookClick,
    onPhotobookEditClick,
    onPhotobookUnlockClick,
    onPhotobookReEditClick,
    onResetClick,
    tvWelcomeScreenId,
    tvWelcomeScreenStatus,
    tvWelcomeScreenFileStatus,
    onTvWelcomeScreenClick,
    onTvWelcomeScreenEditClick,
    onTvWelcomeScreenUnlockClick,
    onTvWelcomeScreenReEditClick,
    onViewMemorialClick,
    onAccountSettingsClick,
    onInviteContributorClick,
    onUploadPictureClick,
    onArrangerChange,
    onViewPhotosInPhotoLibrary,
    allowUnlock,
    allowReset,
    caseId,
    onToggleFeature,
    header,
    isRetainOnCleanup = false,
    onToggleRetentionClick,
    isFetchingCaseSummary = false,
    isFetchingFuneralDirectors = false,
    isFetchingUserRole = false,
  } = props

  const [isCopied, setIsCopied] = useState(false)

  const availableProductsMap = availableProducts ?? enabledProducts ?? {}

  const {
    SLIDESHOW: isSlideshowAvailable = false,
    BOOKLET: isBookletAvailable = false,
    BOOKMARK: isBookmarkAvailable = false,
    SIDED_CARD: isSidedCardAvailable = false,
    THANK_YOU_CARD: isThankyouCardAvailable = false,
    TV_WELCOME_SCREEN: isTvWelcomeScreenAvailable = false,
    PHOTOBOOK: isPhotobookAvailable = false,
  } = availableProductsMap ?? {}

  const isSlideshowProcessing =
    slideshowFileStatus === ResourceFileStatus.PROCESSING
  const isBookletProcessing =
    bookletFileStatus === ResourceFileStatus.PROCESSING
  const isBookmarkProcessing =
    bookmarkFileStatus === ResourceFileStatus.PROCESSING
  const isSidedCardProcessing =
    sidedCardFileStatus === ResourceFileStatus.PROCESSING
  const isThankyouCardProcessing =
    thankyouCardFileStatus === ResourceFileStatus.PROCESSING
  const isPhotobookProcessing =
    photobookFileStatus === ResourceFileStatus.PROCESSING
  const isTvWelcomeScreenProcessing =
    tvWelcomeScreenFileStatus === ResourceFileStatus.PROCESSING

  const isSlideshowEnabled = enabledProducts?.SLIDESHOW
  const isBookletEnabled = enabledProducts?.BOOKLET
  const isSidedCardEnabled = enabledProducts?.SIDED_CARD
  const isThankyouCardEnabled = enabledProducts?.THANK_YOU_CARD
  const isTvWelcomeScreenEnabled = enabledProducts?.TV_WELCOME_SCREEN
  const isBookmarkEnabled = enabledProducts?.BOOKMARK
  const isPhotobookEnabled = enabledProducts?.PHOTOBOOK

  const isPhotobookShippable =
    PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)

  return (
    <StyledSettingDrawer
      {...props}
      onClose={() => {
        if (props.onClose) {
          props.onClose()
        }
        setIsCopied(false)
      }}
      placement={DrawerPlacement.RIGHT}
      isShowCloseIcon={false}
      width="600px"
    >
      <StyledAlert noBorderRightRadius>
        {header ?? 'Customer memorial settings'}
      </StyledAlert>
      <SettingDrawerContent>
        <DrawerList>
          <DrawerListRow>
            <DrawerListRowItem
              isClickable
              tooltip="Click to view memorials"
              onClick={onViewMemorialClick}
            >
              <DrawerLabel icon={<MemorialEditIcon />} label="View Memorials" />
            </DrawerListRowItem>
            <DrawerListRowItem textRightAlign>
              {isFetchingUserRole ? (
                <Spin />
              ) : (
                <>
                  <div style={{ marginRight: STYLE.GUTTER }}>
                    Family Can Download
                  </div>
                  <SwitchButton
                    onClick={onFamilyCanDownloadClick}
                    checked={userRole === EulogiseUserRole.EDITOR}
                    noMarginBottom
                    checkedChildren="On"
                    unCheckedChildren="Off"
                  />
                </>
              )}
            </DrawerListRowItem>
          </DrawerListRow>

          {isAdmin && (
            <DrawerListRow>
              <DrawerListRowItem isClickable={false}>
                <DrawerLabel icon={<CreateNewCaseIcon />} label="Retain Case" />
              </DrawerListRowItem>
              <DrawerListRowItem textRightAlign>
                <SwitchButton
                  onClick={onToggleRetentionClick}
                  checked={isRetainOnCleanup}
                  noMarginBottom
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </DrawerListRowItem>
            </DrawerListRow>
          )}

          {noOfInvites !== undefined && (
            <DrawerListRow>
              <DrawerListRowItem
                isClickable
                tooltip="Click to invite contributors"
                onClick={onInviteContributorClick}
              >
                <DrawerLabel
                  icon={<AddContributorIcon />}
                  label="Invite Contributors"
                />
              </DrawerListRowItem>
              <DrawerListRowItem textRightAlign>
                {isFetchingCaseSummary ? (
                  <Spin />
                ) : (
                  `${noOfInvites} Invites sent`
                )}
              </DrawerListRowItem>
            </DrawerListRow>
          )}

          {noOfImages !== undefined && (
            <DrawerListRow>
              <DrawerListRowItem
                isClickable
                tooltip="Click to upload pictures"
                onClick={onUploadPictureClick}
              >
                <DrawerLabel
                  icon={<UploadPicturesIcon />}
                  label="Upload Pictures"
                />
              </DrawerListRowItem>
              <DrawerListRowItem
                textRightAlign
                isClickable
                onClick={onViewPhotosInPhotoLibrary}
              >
                <DrawerLabel
                  icon={isFetchingCaseSummary && <Spin />}
                  label={
                    isFetchingCaseSummary ? 'Loading' : `${noOfImages} Images`
                  }
                />
              </DrawerListRowItem>
            </DrawerListRow>
          )}

          {isSlideshowAvailable && (
            <DrawerLabelRowStatusItem
              productName="Slideshow"
              isFeatureToggleEnabled={isSlideshowEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ SLIDESHOW: enabled })
              }
              disabled={!isSlideshowEnabled || isSlideshowProcessing}
              disabledText={getDisabledText({
                isGenerating: isSlideshowProcessing,
                isProductDisabled: !isSlideshowEnabled,
              })}
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.SLIDESHOW,
                region,
              })}
              status={slideshowStatus}
              fileStatus={slideshowFileStatus}
              id={slideshowId}
              onClick={onSlideshowClick}
              onEditClick={onSlideshowEditClick}
              onUnlockClick={onSlideshowUnlockClick}
              onReEditClick={onSlideshowReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: slideshowId!,
                  product: EulogiseProduct.SLIDESHOW,
                  caseId,
                })
              }
            />
          )}

          {isBookletAvailable && (
            <DrawerLabelRowStatusItem
              productName="Booklet"
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              isFeatureToggleEnabled={isBookletEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ BOOKLET: enabled })
              }
              disabled={!isBookletEnabled || isBookletProcessing}
              disabledText={getDisabledText({
                isGenerating: isBookletProcessing,
                isProductDisabled: !isBookletEnabled,
              })}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.BOOKLET,
                region,
              })}
              status={bookletStatus}
              fileStatus={bookletFileStatus}
              id={bookletId}
              onClick={onBookletClick}
              onEditClick={onBookletEditClick}
              onUnlockClick={onBookletUnlockClick}
              onReEditClick={onBookletReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: bookletId!,
                  product: EulogiseProduct.BOOKLET,
                  caseId,
                })
              }
            />
          )}

          {isBookmarkAvailable && (
            <DrawerLabelRowStatusItem
              productName="Bookmark"
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              isFeatureToggleEnabled={isBookmarkEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ BOOKMARK: enabled })
              }
              disabled={!isBookmarkEnabled || isBookmarkProcessing}
              disabledText={getDisabledText({
                isGenerating: isBookmarkProcessing,
                isProductDisabled: !isBookmarkEnabled,
              })}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.BOOKMARK,
                region,
              })}
              status={bookmarkStatus}
              fileStatus={bookmarkFileStatus}
              id={bookmarkId}
              onClick={onBookmarkClick}
              onEditClick={onBookmarkEditClick}
              onUnlockClick={onBookmarkUnlockClick}
              onReEditClick={onBookmarkReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: bookmarkId!,
                  product: EulogiseProduct.BOOKMARK,
                  caseId,
                })
              }
            />
          )}

          {isSidedCardAvailable && (
            <DrawerLabelRowStatusItem
              productName="Memorial Card"
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              isFeatureToggleEnabled={isSidedCardEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ SIDED_CARD: enabled })
              }
              disabled={!isSidedCardEnabled || isSidedCardProcessing}
              disabledText={getDisabledText({
                isGenerating: isSidedCardProcessing,
                isProductDisabled: !isSidedCardEnabled,
              })}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.SIDED_CARD,
                region,
              })}
              status={sidedCardStatus}
              fileStatus={sidedCardFileStatus}
              id={sidedCardId}
              onClick={onSidedCardClick}
              onEditClick={onSidedCardEditClick}
              onUnlockClick={onSidedCardUnlockClick}
              onReEditClick={onSidedCardReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: sidedCardId!,
                  product: EulogiseProduct.SIDED_CARD,
                  caseId,
                })
              }
            />
          )}

          {isThankyouCardAvailable && (
            <DrawerLabelRowStatusItem
              productName="Thankyou Card"
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              isFeatureToggleEnabled={isThankyouCardEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ THANK_YOU_CARD: enabled })
              }
              disabled={!isThankyouCardEnabled || isThankyouCardProcessing}
              disabledText={getDisabledText({
                isGenerating: isThankyouCardProcessing,
                isProductDisabled: !isThankyouCardEnabled,
              })}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.THANK_YOU_CARD,
                region,
              })}
              status={thankyouCardStatus}
              fileStatus={thankyouCardFileStatus}
              id={thankyouCardId}
              onClick={onThankyouCardClick}
              onEditClick={onThankyouCardEditClick}
              onUnlockClick={onThankyouCardUnlockClick}
              onReEditClick={onThankyouCardReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: thankyouCardId!,
                  product: EulogiseProduct.THANK_YOU_CARD,
                  caseId,
                })
              }
            />
          )}

          {isTvWelcomeScreenAvailable && (
            <DrawerLabelRowStatusItem
              productName="TV Welcome Screen"
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              isFeatureToggleEnabled={isTvWelcomeScreenEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ TV_WELCOME_SCREEN: enabled })
              }
              disabled={
                !isTvWelcomeScreenEnabled || isTvWelcomeScreenProcessing
              }
              disabledText={getDisabledText({
                isGenerating: isTvWelcomeScreenProcessing,
                isProductDisabled: !isTvWelcomeScreenEnabled,
              })}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.TV_WELCOME_SCREEN,
                region,
              })}
              status={tvWelcomeScreenStatus}
              fileStatus={tvWelcomeScreenFileStatus}
              id={tvWelcomeScreenId}
              onClick={onTvWelcomeScreenClick}
              onEditClick={onTvWelcomeScreenEditClick}
              onUnlockClick={onTvWelcomeScreenUnlockClick}
              onReEditClick={onTvWelcomeScreenReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: tvWelcomeScreenId!,
                  product: EulogiseProduct.TV_WELCOME_SCREEN,
                  caseId,
                })
              }
            />
          )}

          {isPhotobookAvailable && isPhotobookShippable && (
            <DrawerLabelRowStatusItem
              productName="Photobook"
              allowUnlock={allowUnlock}
              allowReset={allowReset}
              isFeatureToggleEnabled={isPhotobookEnabled}
              onToggleFeature={(enabled) =>
                onToggleFeature({ PHOTOBOOK: enabled })
              }
              disabled={!isPhotobookEnabled || isPhotobookProcessing}
              disabledText={getDisabledText({
                isGenerating: isPhotobookProcessing,
                isProductDisabled: !isPhotobookEnabled,
              })}
              label={CardProductHelper.getProductShortName({
                product: EulogiseProduct.PHOTOBOOK,
                region,
              })}
              status={photobookStatus}
              fileStatus={photobookFileStatus}
              id={photobookId}
              onClick={onPhotobookClick}
              onEditClick={onPhotobookEditClick}
              onUnlockClick={onPhotobookUnlockClick}
              onReEditClick={onPhotobookReEditClick}
              onResetClick={() =>
                onResetClick({
                  id: photobookId!,
                  product: EulogiseProduct.PHOTOBOOK,
                  caseId,
                })
              }
            />
          )}

          <DrawerListRow>
            <DrawerListRowItem>
              <DrawerLabel icon={<UserIcon />} label="Arranger" />
            </DrawerListRowItem>
            <DrawerListRowItem textRightAlign>
              {isFetchingFuneralDirectors ? (
                <Spin />
              ) : (
                <Select
                  value={arrangerId}
                  style={{ width: '240px' }}
                  onChange={onArrangerChange}
                  options={[{ label: '', value: '' }].concat(
                    funeralDirectors.map((fd) => ({
                      label: fd.fullName,
                      value: fd.id,
                    })),
                  )}
                />
              )}
            </DrawerListRowItem>
          </DrawerListRow>

          <DrawerListRow>
            <DrawerListRowItem
              tooltip="Click to Edit Account Details"
              isClickable
              onClick={onAccountSettingsClick}
            >
              <DrawerLabel
                icon={<AccountSettingIcon />}
                label="Account Details"
              />
            </DrawerListRowItem>
          </DrawerListRow>
        </DrawerList>

        {isAdmin && (
          <DrawerListRow>
            <DrawerListRowItem>
              <DrawerLabel icon={<GlobalEarthIcon />} label="Country" />
            </DrawerListRowItem>
            <DrawerListRowItem textRightAlign>{country}</DrawerListRowItem>
          </DrawerListRow>
        )}

        <DrawerListRow>
          <StyledCaseIdDrawerListRowItem isClickable={false}>
            <DrawerLabel icon={<ViewAllCasesIcon />} label="Case Id" />
            <div>
              <CaseIdLabel>{caseId} </CaseIdLabel>
              <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
                <CopyAssetIcon
                  onClick={() => {
                    setIsCopied(true)
                    navigator.clipboard.writeText(caseId)
                  }}
                />
              </Tooltip>
            </div>
          </StyledCaseIdDrawerListRowItem>
        </DrawerListRow>
      </SettingDrawerContent>
    </StyledSettingDrawer>
  )
}
