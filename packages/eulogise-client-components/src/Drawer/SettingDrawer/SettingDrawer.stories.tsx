import React, { useState } from 'react'
import { faker } from '@faker-js/faker'
import { SettingDrawer } from './SettingDrawer'
import { Button } from '../../Button'
import {
  EulogiseRegion,
  INITIAL_DEFAULT_PRODUCTS,
  MemorialVisualStatus,
  MemorialVisualStatusLevelOrder,
} from '@eulogise/core'

export default {
  title: 'Drawers/SettingDrawer',
  component: SettingDrawer,
  argTypes: {},
}

const createProductId = (status: MemorialVisualStatus): string | undefined => {
  if (
    status === MemorialVisualStatus.DOWNLOAD ||
    status === MemorialVisualStatus.COMPLETE ||
    status === MemorialVisualStatus.EDITED ||
    status === MemorialVisualStatus.THEME_SELECTED
  ) {
    return faker.string.uuid()
  }
  return
}

const Template = ({ allowUnlock }: { allowUnlock?: boolean }) => {
  const [isShowDrawer, setShowDrawer] = useState<boolean>(true)
  const noOfImages = faker.datatype.number({ min: 0, max: 100 })
  const noOfInvites = faker.datatype.number({ min: 0, max: 100 })
  const bookletStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const bookmarkStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const sidedCardStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const slideshowStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const thankyouCardStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const tvWelcomeScreenStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const photobookStatus = faker.helpers.arrayElement(
    MemorialVisualStatusLevelOrder,
  )
  const bookletId = createProductId(bookletStatus)
  const bookmarkId = createProductId(bookmarkStatus)
  const slideshowId = createProductId(slideshowStatus)
  const sidedCardId = createProductId(sidedCardStatus)
  const thankyouCardId = createProductId(thankyouCardStatus)
  const tvWelcomeScreenId = createProductId(tvWelcomeScreenStatus)
  const photobookId = createProductId(photobookStatus)

  return (
    <>
      <Button onClick={() => setShowDrawer(true)}>Open</Button>
      <SettingDrawer
        title={null}
        region={EulogiseRegion.USA}
        allowUnlock={allowUnlock}
        onClose={() => setShowDrawer(false)}
        isOpen={isShowDrawer}
        noOfImages={noOfImages}
        noOfInvites={noOfInvites}
        bookletId={bookletId}
        bookletStatus={bookletStatus}
        onBookletClick={() => {}}
        onBookletUnlockClick={() => {}}
        bookmarkId={bookmarkId}
        bookmarkStatus={bookmarkStatus}
        onBookmarkClick={() => {}}
        onBookmarkUnlockClick={() => {}}
        sidedCardId={sidedCardId}
        sidedCardStatus={sidedCardStatus}
        onSidedCardClick={() => {}}
        onSidedCardUnlockClick={() => {}}
        slideshowId={slideshowId}
        slideshowStatus={slideshowStatus}
        onSlideshowClick={() => {}}
        onSlideshowUnlockClick={() => {}}
        thankyouCardId={thankyouCardId}
        thankyouCardStatus={thankyouCardStatus}
        onThankyouCardClick={() => {}}
        onThankyouCardUnlockClick={() => {}}
        onThankyouCardReEditClick={() => {}}
        photobookId={photobookId}
        photobookStatus={photobookStatus}
        onPhotobookClick={() => {}}
        onPhotobookUnlockClick={() => {}}
        onPhotobookReEditClick={() => {}}
        tvWelcomeScreenId={tvWelcomeScreenId}
        tvWelcomeScreenStatus={tvWelcomeScreenStatus}
        onTvWelcomeScreenClick={() => {}}
        onTvWelcomeScreenUnlockClick={() => {}}
        onTvWelcomeScreenReEditClick={() => {}}
        onAccountSettingsClick={() => {}}
        onViewMemorialClick={() => {}}
        onInviteContributorClick={() => {}}
        onUploadPictureClick={() => {}}
        onFeatureToggle={() => {}}
        availableProducts={INITIAL_DEFAULT_PRODUCTS}
        isRetainOnCleanup={false}
        onToggleRetentionClick={() => {}}
      />
    </>
  )
}

export const Default = () => <Template />

export const WithUnlockFeature = () => <Template allowUnlock />
