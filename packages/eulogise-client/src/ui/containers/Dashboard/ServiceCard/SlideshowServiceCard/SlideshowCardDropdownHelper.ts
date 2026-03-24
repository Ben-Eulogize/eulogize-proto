import { EulogiseUserRole, ResourceFileStatus } from '@eulogise/core'
import { SldeshowCardDropdownItemType } from './types'

interface IGetSlideshowCardDropdownItemStatuses {
  hasTheme: boolean
  isPaid?: boolean
  userRole?: EulogiseUserRole
  hasSlides?: boolean
  hasImages?: boolean
  fileStatus?: ResourceFileStatus
}

const {
  SELECT_THEME,
  CHANGE_THEME,
  UPLOAD_IMAGES,
  EDIT_SLIDESHOW,
  PREVIEW,
  COMPLETE,
  CHECKOUT,
  DOWNLOAD,
} = SldeshowCardDropdownItemType

const SlideshowCardDropdownHelper = {
  getSlideshowCardDropdownItemStatuses: ({
    hasTheme,
    isPaid,
    hasSlides,
    userRole,
    hasImages,
    fileStatus,
  }: IGetSlideshowCardDropdownItemStatuses): {
    show: Array<SldeshowCardDropdownItemType>
    enabled: Array<SldeshowCardDropdownItemType>
  } => {
    if (!hasTheme) {
      return {
        show: [SELECT_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, COMPLETE],
        enabled: [SELECT_THEME],
      }
    }
    if (!hasImages) {
      return {
        show: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, COMPLETE],
        enabled: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW],
      }
    }
    if (!hasSlides) {
      return {
        show: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, COMPLETE],
        enabled: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW],
      }
    }
    if (!isPaid) {
      if (userRole === EulogiseUserRole.CLIENT) {
        return {
          show: [
            CHANGE_THEME,
            UPLOAD_IMAGES,
            EDIT_SLIDESHOW,
            PREVIEW,
            DOWNLOAD,
          ],
          enabled: [
            CHANGE_THEME,
            UPLOAD_IMAGES,
            EDIT_SLIDESHOW,
            PREVIEW,
            DOWNLOAD,
          ],
        }
      }
      return {
        show: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, CHECKOUT],
        enabled: [
          CHANGE_THEME,
          UPLOAD_IMAGES,
          EDIT_SLIDESHOW,
          PREVIEW,
          CHECKOUT,
        ],
      }
    }
    if (fileStatus === ResourceFileStatus.GENERATED) {
      return {
        show: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, DOWNLOAD],
        enabled: [PREVIEW, DOWNLOAD],
      }
    }
    return {
      show: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, COMPLETE],
      enabled: [CHANGE_THEME, UPLOAD_IMAGES, EDIT_SLIDESHOW, PREVIEW, COMPLETE],
    }
  },
}

export default SlideshowCardDropdownHelper
