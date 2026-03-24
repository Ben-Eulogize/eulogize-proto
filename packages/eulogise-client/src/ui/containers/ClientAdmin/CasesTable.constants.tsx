import React from 'react'
import moment from 'moment'
import {
  AccountSettingIcon,
  InviteIcon,
  MemorialEditIcon,
  UploadPicturesIcon,
} from '@eulogise/client-components'
import { EulogisePage, DrawerId, ModalId, AssetType } from '@eulogise/core'
import { setActiveCaseByCaseId } from '../../store/CaseState/actions'
import { showModalAction } from '../../store/ModalState/actions'
import { NavigationHelper } from '@eulogise/helpers'
import { TableHelper } from '@eulogise/helpers'
import { updateIsFSOverlayPickerOpen } from '../../store/AssetState/actions'

export const CaseTableColumns = [
  {
    title: 'Service Date',
    dataIndex: 'serviceDate',
    key: 'serviceDate',
    colSpan: 1,
    sorter: TableHelper.commonSorter('serviceDate'),
    render: (text: string) => moment(text).format('ll'),
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
    colSpan: 1,
    sorter: TableHelper.commonSorter('customerName'),
  },
  {
    title: 'Deceased Name',
    dataIndex: 'deceasedName',
    key: 'deceasedName',
    colSpan: 1,
    sorter: TableHelper.commonSorter('deceasedName'),
  },
  {
    title: 'Funeral Director',
    dataIndex: 'funeralDirector',
    key: 'funeralDirector',
    colSpan: 1,
    sorter: TableHelper.commonSorter('funeralDirector'),
  },
  {
    title: 'Upload',
    dataIndex: 'upload',
    key: 'upload',
    colSpan: 1,
    render: (text: string, { id: caseId, dispatch }) => (
      <UploadPicturesIcon
        onClick={() => {
          dispatch(
            updateIsFSOverlayPickerOpen({
              isFilestackOverlayPickerOpen: true,
              filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
            }),
          )
        }}
      />
    ),
  },
  {
    title: 'Memorials',
    dataIndex: 'memorials',
    key: 'memorials',
    colSpan: 1,
    render: (text: string, { id: caseId, dispatch }) => (
      <MemorialEditIcon
        onClick={() => {
          dispatch(
            setActiveCaseByCaseId({
              caseId,
              success: () => {
                NavigationHelper.navigate(EulogisePage.DASHBOARD)
              },
            }),
          )
        }}
      />
    ),
  },
  {
    title: 'Invite',
    dataIndex: 'invite',
    key: 'invite',
    colSpan: 1,
    render: (text: string, { id: caseId, dispatch }) => (
      <InviteIcon
        onClick={() => {
          dispatch(showModalAction(ModalId.INVITE, { caseId }))
        }}
      />
    ),
  },
  {
    title: 'Settings',
    dataIndex: 'settings',
    key: 'settings',
    colSpan: 1,
    render: (text: string, { id: caseId, dispatch }) => (
      <AccountSettingIcon
        onClick={() => {
          dispatch(
            setActiveCaseByCaseId({
              caseId,
              success: () => {
                NavigationHelper.navigate(EulogisePage.ACCOUNT_SETTINGS)
              },
            }),
          )
        }}
      />
    ),
  },
]
