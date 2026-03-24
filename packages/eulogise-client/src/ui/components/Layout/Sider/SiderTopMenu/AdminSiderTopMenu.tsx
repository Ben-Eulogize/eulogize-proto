import React from 'react'
import {
  BackgroundImageIcon,
  ContactsIcon,
  CreateNewClientIcon,
  ImageLibraryIcon,
  ManageUsersIcon,
  SearchIcon,
  ViewAllCasesIcon,
  ViewThemesIcon,
} from '@eulogise/client-components'
import { NavigationHelper } from '@eulogise/helpers'
import { EulogisePage } from '@eulogise/core'
import { BaseSiderMenu } from './BaseSiderMenu'
import { SiderMenuItem } from '../SiderMenu/SiderMenuItem'
import { ChangeThemeSiderMenuItem } from '../SiderMenuItem/ChangeThemeSiderMenuItem'
import { MemorialHomeSiderMenuItem } from '../SiderMenuItem/MemorialHomeSiderMenuItem'
import { Divider } from '@eulogise/client-components'

export const AdminSiderTopMenu = ({
  location,
  onChangeThemeClick,
  onViewAllMemorialsClick,
}: {
  location: Location
  onChangeThemeClick: () => void
  onViewAllMemorialsClick: () => void
}) => {
  const isEulogizeAdminPage = /eulogizeAdmin\//.test(location.pathname)
  const isPhotobookEditorPage = NavigationHelper.isPhotobookPage(
    location?.pathname!,
  )
  return (
    <BaseSiderMenu>
      {!isEulogizeAdminPage && (
        <>
          <MemorialHomeSiderMenuItem
            onViewAllMemorialsClick={onViewAllMemorialsClick}
          />
          {!isPhotobookEditorPage && (
            <ChangeThemeSiderMenuItem
              key="change-theme"
              onChangeThemeClick={onChangeThemeClick}
            />
          )}
          <SiderMenuItem
            onClick={() => {
              NavigationHelper.navigate(EulogisePage.PHOTO_LIBRARY)
            }}
            key="photo-library"
            icon={<ImageLibraryIcon />}
          >
            Photo Library
          </SiderMenuItem>
          <Divider />
        </>
      )}

      <SiderMenuItem
        key="memorial-home"
        icon={<ContactsIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
        }
      >
        View clients
      </SiderMenuItem>
      <SiderMenuItem
        key="quick-search"
        icon={<SearchIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_QUICK_SEARCH)
        }
      >
        Quick Search
      </SiderMenuItem>
      <SiderMenuItem
        key="view-all-cases"
        icon={<ViewAllCasesIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CASES)
        }
      >
        Cases
      </SiderMenuItem>
      <SiderMenuItem
        key="view-all-themes"
        icon={<ViewThemesIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_THEMES)
        }
      >
        Themes
      </SiderMenuItem>
      <SiderMenuItem
        key="view-all-backgrounds"
        icon={<BackgroundImageIcon />}
        onClick={() =>
          NavigationHelper.navigate(
            EulogisePage.EULOGIZE_ADMIN_BACKGROUND_IMAGES,
          )
        }
      >
        Backgrounds
      </SiderMenuItem>
      {/* FEAT_GENERIC_CARD_PRODUCT
      <SiderMenuItem
        key="generic-card-product-types"
        icon={<ViewThemesIcon />}
        onClick={() =>
          NavigationHelper.navigate(
            EulogisePage.EULOGIZE_ADMIN_GENERIC_CARD_PRODUCT_TYPES,
          )
        }
      >
        Generic Print Products
      </SiderMenuItem>
*/}
      <SiderMenuItem
        key="image-library"
        icon={<CreateNewClientIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CREATE_NEW_CASE)
        }
      >
        Create a new case
      </SiderMenuItem>
      <SiderMenuItem
        key="invite-family-member"
        icon={<ManageUsersIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_USERS)
        }
      >
        Manager users
      </SiderMenuItem>
      <SiderMenuItem
        key="view-invoices"
        icon={<ManageUsersIcon />}
        onClick={() =>
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_INVOICES)
        }
      >
        View Invoices
      </SiderMenuItem>
      <SiderMenuItem
        key="create-edit-client"
        icon={<CreateNewClientIcon />}
        onClick={() =>
          NavigationHelper.navigate(
            EulogisePage.EULOGIZE_ADMIN_CREATE_EDIT_NEW_CLIENT,
          )
        }
      >
        Create a new client
      </SiderMenuItem>
    </BaseSiderMenu>
  )
}
