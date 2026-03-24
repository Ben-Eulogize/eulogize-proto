import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, ButtonType, Title } from '@eulogise/client-components'
import { Drawer } from '../../../../../eulogise-client-components/src/Drawer'
import { DrawerId, ThemeDrawerOptions } from '@eulogise/core'
import {
  useDrawerState,
  useEulogiseDispatch,
  useIsOpenDrawer,
} from '../../store/hooks'
import SelectThemeView from './views/SelectThemeView'
import { EulogiseProduct } from '@eulogise/core'
import { closeDrawerAction } from '../../store/DrawerState/actions'
import { ITheme } from '@eulogise/core'
import ApplyThemeConfirmation from './views/ApplyThemeConfirmation'
import { DeleteThemeConfirmation } from './views/DeleteThemeConfirmation'
import { deleteThemeByIdAction } from '../../store/ThemeState/actions'

const StyledThemeSelectionDrawer = styled(Drawer)`
  .ant-drawer-header,
  .ant-drawer-content {
    background-color: rgb(243, 245, 247);
  }
  .ant-drawer-body {
    padding: 0 3rem;
  }
  .ant-card {
    background-color: transparent;
  }
`

const ApplyThemeConfirmationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const ThemeSelectionDrawer = () => {
  const dispatch = useEulogiseDispatch()
  const isOpenDrawer: boolean = useIsOpenDrawer(DrawerId.THEME_SELECTION_DRAWER)
  const drawerState = useDrawerState()
  const drawerOptions = drawerState?.drawerOptions as ThemeDrawerOptions
  const isNavigateToProductWhenApplyTheme: boolean =
    drawerOptions?.isNavigateToProductWhenApplyTheme
  const navigateToProductWhenApplyAll: EulogiseProduct =
    drawerOptions?.productType as EulogiseProduct
  const genericProductType = drawerOptions?.genericProductType
  const [selectedTheme, setSelectedTheme] = useState<ITheme | null>(null)
  const [selectedProduct, setSelectedProduct] =
    useState<EulogiseProduct | null>(null)
  const [isShowApplyConfirmation, setIsShowApplyConfirmation] =
    useState<boolean>(false)
  const [isShowDeleteConfirmation, setIsShowDeleteConfirmation] =
    useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  useEffect(() => {
    if (isOpenDrawer === false) {
      setSelectedTheme(null)
    }
  }, [isOpenDrawer])

  const applyTheme = (product: EulogiseProduct, theme: ITheme) => {
    setIsShowApplyConfirmation(true)
    setSelectedProduct(product)
    setSelectedTheme(theme)
  }

  const deleteTemplate = (product: EulogiseProduct, theme: ITheme) => {
    setIsShowDeleteConfirmation(true)
    setSelectedTheme(theme)
  }

  const onBackToViewThemesMode = () => {
    //setViewThemeMode(ThemeViewMode.VIEW_THEMES)
    setSelectedTheme(null)
  }

  const close = () => {
    dispatch(closeDrawerAction())
    //setViewThemeMode(ThemeViewMode.VIEW_THEMES)
    setSelectedProduct(null)
    setSelectedTheme(null)
    setIsShowApplyConfirmation(false)
    setIsShowDeleteConfirmation(false)
  }

  return (
    <StyledThemeSelectionDrawer
      width="80%"
      title={<Title>Select Theme</Title>}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={close}
        >
          Cancel
        </Button>
      }
      isOpen={isOpenDrawer}
      onClose={() => {
        close()
      }}
    >
      {!isShowApplyConfirmation && !isShowDeleteConfirmation && (
        <SelectThemeView
          genericProductType={genericProductType}
          onApply={applyTheme}
          onDelete={deleteTemplate}
        />
      )}
      {isShowApplyConfirmation && selectedProduct && selectedTheme && (
        <ApplyThemeConfirmationContainer>
          <ApplyThemeConfirmation
            product={selectedProduct}
            genericProductType={genericProductType}
            theme={selectedTheme}
            onConfirm={onBackToViewThemesMode}
            isNavigateToProductWhenApplyTheme={
              isNavigateToProductWhenApplyTheme
            }
            onClose={() => {
              setIsShowApplyConfirmation(false)
            }}
            navigateToProductWhenApplyAll={navigateToProductWhenApplyAll}
          />
        </ApplyThemeConfirmationContainer>
      )}
      {isShowDeleteConfirmation && selectedTheme && (
        <ApplyThemeConfirmationContainer>
          <DeleteThemeConfirmation
            theme={selectedTheme}
            onClose={() => {
              setIsShowDeleteConfirmation(false)
            }}
            isDeleting={isDeleting}
            onDeleteClick={() => {
              setIsDeleting(true)
              dispatch(
                deleteThemeByIdAction({
                  themeId: selectedTheme.id,
                  onComplete: () => {
                    setIsDeleting(false)
                    close()
                  },
                }),
              )
            }}
          />
        </ApplyThemeConfirmationContainer>
      )}
    </StyledThemeSelectionDrawer>
  )
}

export default ThemeSelectionDrawer
