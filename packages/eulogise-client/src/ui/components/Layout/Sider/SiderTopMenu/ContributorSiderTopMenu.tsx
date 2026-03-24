import React from 'react'
import { useCaseState, useEulogiseDispatch } from '../../../../store/hooks'
import { AssetType, ICaseState } from '@eulogise/core'
import {
  ImageLibraryIcon,
  UploadPicturesIcon,
} from '@eulogise/client-components'
import { SiderMenuItem } from '../SiderMenu/SiderMenuItem'
import { BaseSiderMenu } from './BaseSiderMenu'
import { NavigationHelper } from '@eulogise/helpers'
import { EulogisePage } from '@eulogise/core'
import { updateIsFSOverlayPickerOpen } from '../../../../store/AssetState/actions'

export const ContributorSiderTopMenu = () => {
  const dispatch = useEulogiseDispatch()
  return (
    <BaseSiderMenu>
      <SiderMenuItem
        key="upload-pictures"
        icon={<UploadPicturesIcon />}
        onClick={() =>
          dispatch(
            updateIsFSOverlayPickerOpen({
              isFilestackOverlayPickerOpen: true,
              filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
            }),
          )
        }
      >
        Upload Pictures
      </SiderMenuItem>
      <SiderMenuItem
        onClick={() => NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)}
        key="image-library"
        icon={<ImageLibraryIcon />}
      >
        Image Library
      </SiderMenuItem>
    </BaseSiderMenu>
  )
}
