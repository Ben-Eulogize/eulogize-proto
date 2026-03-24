import React, { useState } from 'react'
import styled from 'styled-components'
import { PortalSearchFilterAndTable } from './PortalSearchFilterAndTable'
import {
  ALL_SEARCH_FILTERS,
  SearchFilterCasesType,
} from '../../SearchAndFilterBar'
import { IPortalTableCellClickEvent, IPortalTableItem } from './PortalTable'
import { PortableTableMockService } from '../data/PortableTableMockService'
import { SearchAndFilterBarItemProps } from '../../SearchAndFilterBar/SearchAndFilterBar.types'
import { SettingDrawer } from '../../Drawer'
import { EulogiseRegion } from '@eulogise/core'

export default {
  title: 'Table/PortalSearchFilterAndTable',
  component: PortalSearchFilterAndTable,
  argTypes: {},
}

const dataSource: Array<IPortalTableItem> =
  PortableTableMockService.createFakeTableItems(100)

const StyledTemplate = styled.div``

const Template = ({
  welcomeText,
  excludeColumns,
  filters,
}: {
  welcomeText?: string
  excludeColumns?: Array<string>
  filters?: Array<SearchAndFilterBarItemProps>
}) => {
  const [selectedSettings, setSelectedSettings] = useState<IPortalTableItem>()
  console.log('selectedSettings', selectedSettings)
  return (
    <StyledTemplate>
      <PortalSearchFilterAndTable
        welcomeText={welcomeText}
        isShowResetButton={true}
        onResetClick={(ev) => {}}
        ownerId={dataSource[0].funeralDirector}
        defaultFilters={{ cases: SearchFilterCasesType.MyCases }}
        dataSource={dataSource}
        excludeColumns={excludeColumns}
        filters={filters}
        onCellClick={(ev: IPortalTableCellClickEvent) => {
          if (ev.columnKey === 'settings') {
            setSelectedSettings(ev.record)
          }
        }}
      />
      <SettingDrawer
        allowReset
        onClose={() => setSelectedSettings(undefined)}
        region={EulogiseRegion.USA}
        isOpen={!!selectedSettings}
        noOfInvites={1}
        noOfImages={1}
        bookletId={selectedSettings?.bookletId}
        bookletStatus={selectedSettings?.bookletStatus!}
        onBookletClick={() => {}}
        onBookletUnlockClick={() => {}}
        bookmarkId={selectedSettings?.bookmarkId}
        bookmarkStatus={selectedSettings?.bookmarkStatus!}
        onBookmarkClick={() => {}}
        onBookmarkUnlockClick={() => {}}
        sidedCardId={selectedSettings?.sidedCardId}
        sidedCardStatus={selectedSettings?.sidedCardStatus!}
        onSidedCardClick={() => {}}
        onSidedCardUnlockClick={() => {}}
        slideshowId={selectedSettings?.slideshowId}
        slideshowStatus={selectedSettings?.slideshowStatus!}
        onSlideshowClick={() => {}}
        onSlideshowUnlockClick={() => {}}
        thankyouCardId={selectedSettings?.thankyouCardId}
        thankyouCardStatus={selectedSettings?.thankyouCardStatus!}
        onThankyouCardClick={() => {}}
        onThankyouCardUnlockClick={() => {}}
        photobookId={selectedSettings?.photobookId}
        photobookStatus={selectedSettings?.photobookStatus!}
        onPhotobookClick={() => {}}
        onPhotobookUnlockClick={() => {}}
        onViewMemorialClick={() => {}}
        onAccountSettingsClick={() => {}}
        onInviteContributorClick={() => {}}
        onUploadPictureClick={() => {}}
        onToggleFeature={() => {}}
        isRetainOnCleanup={selectedSettings?.isRetainOnCleanup}
        onToggleRetentionClick={() => {}}
      />
    </StyledTemplate>
  )
}

export const Default = () => <Template excludeColumns={['caseId']} />

export const DefaultWithWelcomeText = () => (
  <Template
    welcomeText={`Welcome Eric. View, edit and create new customer memorials here`}
    excludeColumns={['caseId']}
  />
)

export const IVC = () => <Template filters={ALL_SEARCH_FILTERS} />
