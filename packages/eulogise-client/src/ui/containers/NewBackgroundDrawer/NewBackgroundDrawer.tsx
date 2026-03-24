import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  Drawer,
  Spin,
  Title,
} from '@eulogise/client-components'
import {
  BackgroundRestrictions,
  DrawerId,
  EditBackgroundImageDrawerOptions,
  INewBackgroundFormFields,
} from '@eulogise/core'
import {
  useAuthState,
  useBackgroundImageState,
  useCaseState,
  useDrawerState,
  useEulogiseDispatch,
  useIsOpenDrawer,
} from '../../store/hooks'
import {
  closeDrawerAction,
  openDrawerAction,
} from '../../store/DrawerState/actions'
import { NewBackgroundImageThumbnailList } from './NewBackgroundImageThumbnailList'
import { NewBackgroundForm } from './NewBackgroundForm'
import { updateBackgroundImageByIdAction } from '../../store/BackgroundImageState/actions'
import {
  BackgroundImageHelper,
  NavigationHelper,
  UrlHelper,
} from '@eulogise/helpers'

const StyledNewBackgroundDrawer = styled(Drawer)`
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

const DEFAULT_NEW_BACKGROUND_FIELDS: INewBackgroundFormFields = {
  name: '',
  categoryIds: [],
  restrictions: BackgroundRestrictions.CLIENT_BASE,
}

const SpinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const NewBackgroundDrawer = () => {
  const dispatch = useEulogiseDispatch()
  const drawerState = useDrawerState()
  const { account } = useAuthState()
  const role = account?.role!
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  const drawerOptions =
    drawerState.drawerOptions as EditBackgroundImageDrawerOptions
  const genericProductType = drawerOptions?.genericProductType
  const backgroundImage = drawerOptions?.backgroundImage
  const [fields, setFields] = useState<INewBackgroundFormFields>(
    DEFAULT_NEW_BACKGROUND_FIELDS,
  )
  const { isUpdating } = useBackgroundImageState()
  const isOpenDrawer: boolean = useIsOpenDrawer(DrawerId.EDIT_BACKGROUND_DRAWER)
  const isEditing = drawerOptions?.isEditing
  const isGenerating = drawerOptions?.isGenerating
  const backgroundImageId = backgroundImage?.id

  useEffect(() => {
    if (backgroundImage) {
      setFields({
        name: backgroundImage.name,
        categoryIds: backgroundImage.categoryIds,
        restrictions:
          backgroundImage.restrictions ??
          DEFAULT_NEW_BACKGROUND_FIELDS.restrictions,
      })
    }
  }, [backgroundImage])

  const backToEditor = () => {
    const { fromProductId, fromProduct } = UrlHelper.getQueryParams(
      window.location.search,
    )

    if (fromProduct && fromProductId) {
      // navigate back to the editor
      NavigationHelper.navigateToProduct({
        product: fromProduct,
        id: fromProductId,
        query: {
          fromProduct,
          fromProductId,
        },
      })
    } else {
      console.log('no fromProduct or fromProductId provided')
    }
  }

  const close = () => {
    dispatch(closeDrawerAction())
    backToEditor()
  }

  const resetForm = () => {
    setFields(DEFAULT_NEW_BACKGROUND_FIELDS)
  }

  const isDeletable = backgroundImage
    ? BackgroundImageHelper.isBackgroundDeletable(role, backgroundImage)
    : false

  const save = ({ isApply }: { isApply: boolean }) => {
    dispatch(
      updateBackgroundImageByIdAction({
        backgroundImageId,
        backgroundImage: {
          ...fields,
          name: fields.name?.trim(),
        },
        status: 'published',
        genericProductType,
        onUpdated: () => {
          resetForm()
          close()
          const { fromProduct, fromProductId } = UrlHelper.getQueryParams(
            document.location.search,
          )

          if (fromProduct && fromProductId) {
            dispatch(
              openDrawerAction(DrawerId.CHANGE_BACKGROUND_IMAGE_DRAWER, {
                productType: fromProduct,
                productId: fromProductId,
                isNavigateToProductWhenApplyTheme: false,
                isShowConfirmation: !!isApply,
                selectedBackgroundImage:
                  BackgroundImageHelper.createBackgroundImage({
                    name: backgroundImage?.name,
                    categoryIds: backgroundImage?.categoryIds,
                    region,
                    id: backgroundImage?.id,
                  }),
              }),
            )
            NavigationHelper.navigateToProduct({
              product: fromProduct,
              id: fromProductId,
            })
          }
        },
      }),
    )
  }

  return (
    <StyledNewBackgroundDrawer
      width="80%"
      title={<Title>{isEditing ? 'Edit' : 'New'} Background</Title>}
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
      {isGenerating ? (
        <SpinContainer>
          <Spin />
          &nbsp;Creating Background Images
        </SpinContainer>
      ) : (
        <>
          <NewBackgroundImageThumbnailList
            isEditable={!!isEditing && !!fields.name}
            loadingMessage={
              isEditing ? 'Loading background' : 'Generating background'
            }
            backgroundImageId={backgroundImageId}
          />
          {isOpenDrawer && (
            <NewBackgroundForm
              isEditing={isEditing}
              isDeletable={isDeletable}
              isUpdating={isUpdating}
              onDelete={() => {
                dispatch(
                  openDrawerAction(DrawerId.DELETE_BACKGROUND_DRAWER, {
                    backgroundImage,
                  }),
                )
                backToEditor()
              }}
              fields={fields}
              onFieldsChange={(f) => {
                setFields(f)
              }}
              onSaveAndApply={() => {
                save({ isApply: true })
              }}
              onSave={() => {
                save({ isApply: false })
              }}
            />
          )}
        </>
      )}
    </StyledNewBackgroundDrawer>
  )
}
