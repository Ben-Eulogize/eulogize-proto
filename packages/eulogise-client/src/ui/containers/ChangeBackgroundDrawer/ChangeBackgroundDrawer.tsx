import React, { useEffect, useState } from 'react'
import { WindowLocation } from '@reach/router'
import styled from 'styled-components'
import { Drawer, Title, Button, ButtonType } from '@eulogise/client-components'
import {
  ChangeBackgroundImageDrawerOptions,
  DrawerId,
  EulogisePage,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductBackgroundImageBase,
  ICaseState,
} from '@eulogise/core'
import {
  useProductState,
  useCaseState,
  useDrawerState,
  useEulogiseDispatch,
  useIsOpenDrawer,
} from '../../store/hooks'
import {
  closeDrawerAction,
  openDrawerAction,
} from '../../store/DrawerState/actions'
import ApplySelectBackgroundConfirmation from './views/ApplyBackgroundImageConfirmation'
import SelectBackgroundImageView from './views/SelectBackgroundImageView'
import ApplyNoBackgroundImageConfirmation from './views/ApplyNoBackgroundImageConfirmation'
import { ICardProductBackgroundImage } from '@eulogise/core'
import {
  BackgroundImageHelper,
  UrlHelper,
  NavigationHelper,
  CardProductHelper,
} from '@eulogise/helpers'
import { showUnsavedChangesConfirmModal } from '../../store/ModalState/actions'

const StyledChangeBackgroundDrawer = styled(Drawer)`
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

const ApplyChangeBackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 3rem;
  justify-content: center;
`

const ChangeBackgroundDrawer = ({
  location,
}: {
  location?: WindowLocation
}) => {
  const dispatch = useEulogiseDispatch()
  const isOpenDrawer: boolean = useIsOpenDrawer(
    DrawerId.CHANGE_BACKGROUND_IMAGE_DRAWER,
  )
  const [selectedBackgroundImage, setSelectedBackgroundImage] =
    useState<ICardProductBackgroundImage | null>(null)
  const [selectedProduct, setSelectedProduct] =
    useState<EulogiseProduct | null>(null)
  const [isShowNoBackgroundConfirmation, setIsShowNoBackgroundConfirmation] =
    useState<boolean>(false)
  const { activeItem }: ICaseState = useCaseState()
  const drawerOptions = useDrawerState()
    .drawerOptions as ChangeBackgroundImageDrawerOptions

  const [isShowConfirmation, setIsShowConfirmation] = useState<boolean>(false)
  const productType: EulogiseProduct = drawerOptions?.productType
  const productId = drawerOptions?.productId
  const region: EulogiseRegion = activeItem?.region!

  // Don't we have productType already?
  const product = CardProductHelper.getAtWhichProductEditorPage({
    location: location!,
  })
  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location: location!,
  })

  const { activeItem: activeProductItem } = useProductState({
    product,
    slug,
  })

  useEffect(() => {
    if (isOpenDrawer === false) {
      setSelectedBackgroundImage(null)
    }
  }, [isOpenDrawer])

  useEffect(() => {
    if (drawerOptions?.isShowConfirmation !== undefined) {
      setIsShowConfirmation(drawerOptions?.isShowConfirmation)
    }
    if (drawerOptions?.productType !== undefined) {
      setSelectedProduct(drawerOptions?.productType)
    }
  }, [drawerOptions?.isShowConfirmation, drawerOptions?.productType])

  const applyBackgroundImage = (
    product: EulogiseProduct,
    selectedBackgroundImage: ICardProductBackgroundImage,
  ) => {
    setIsShowNoBackgroundConfirmation(false)
    setIsShowConfirmation(true)
    setSelectedProduct(product)
    setSelectedBackgroundImage(selectedBackgroundImage)
  }

  const applyBlankBackgroundImages = ({
    product,
    region,
  }: {
    product: EulogiseProduct
    region: EulogiseRegion
  }) => {
    setIsShowNoBackgroundConfirmation(true)
    setIsShowConfirmation(false)
    setSelectedProduct(product)
    setSelectedBackgroundImage(
      BackgroundImageHelper.getBlankBackgroundImages({ region }),
    )
  }

  const onClose = () => {
    setSelectedProduct(null)
    setSelectedBackgroundImage(null)
    setIsShowConfirmation(false)
    dispatch(closeDrawerAction())
  }

  return (
    <StyledChangeBackgroundDrawer
      width="80%"
      title={<Title>Select Background</Title>}
      closeIcon={
        <Button
          key="close"
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          onClick={onClose}
        >
          Cancel
        </Button>
      }
      extra={
        <>
          <Button
            buttonType={ButtonType.TRANSPARENT}
            onClick={() =>
              applyBlankBackgroundImages({ product: selectedProduct!, region })
            }
          >
            No Background
          </Button>
          <Button
            buttonType={ButtonType.TRANSPARENT}
            onClick={() => {
              dispatch(closeDrawerAction())
              const query = {
                fromProduct: productType,
                fromProductId: productId,
              }
              if (product) {
                dispatch(
                  showUnsavedChangesConfirmModal({
                    editingProduct: product,
                    unsavedProductState: activeProductItem!,
                    page: EulogisePage.BACKGROUND_IMAGE_LIBRARY,
                    region,
                    query,
                  }),
                )
              } else {
                NavigationHelper.navigate(
                  EulogisePage.BACKGROUND_IMAGE_LIBRARY,
                  {},
                  query,
                )
              }
            }}
          >
            Upload Background
          </Button>
        </>
      }
      isOpen={isOpenDrawer}
      onClose={onClose}
    >
      {!isShowNoBackgroundConfirmation && !isShowConfirmation && (
        <SelectBackgroundImageView
          onApply={applyBackgroundImage}
          onEdit={(backgroundImage: ICardProductBackgroundImageBase) => {
            dispatch(
              openDrawerAction(DrawerId.EDIT_BACKGROUND_DRAWER, {
                backgroundImage,
                isEditing: true,
              }),
            )
            UrlHelper.setQueryParams({
              fromProduct: productType,
              fromProductId: productId,
            })
          }}
          // onApplyBlankBackground={() =>
          //   applyBlankBackgroundImages({ product: selectedProduct!, region })
          // }
        />
      )}
      {!isShowNoBackgroundConfirmation && isShowConfirmation && (
        <ApplyChangeBackgroundContainer>
          <ApplySelectBackgroundConfirmation
            selectedBackgroundImage={
              drawerOptions.selectedBackgroundImage ?? selectedBackgroundImage!
            }
            product={selectedProduct!}
            slug={slug}
            onConfirm={() => {
              setIsShowConfirmation(false)
              dispatch(closeDrawerAction())
            }}
            onClose={() => {
              setIsShowConfirmation(false)
            }}
          />
        </ApplyChangeBackgroundContainer>
      )}
      {isShowNoBackgroundConfirmation && !isShowConfirmation && (
        <ApplyChangeBackgroundContainer>
          <ApplyNoBackgroundImageConfirmation
            slug={slug}
            onConfirm={() => {
              setIsShowNoBackgroundConfirmation(false)
              dispatch(closeDrawerAction())
            }}
            onClose={() => {
              setIsShowNoBackgroundConfirmation(false)
            }}
          />
        </ApplyChangeBackgroundContainer>
      )}
    </StyledChangeBackgroundDrawer>
  )
}

export default ChangeBackgroundDrawer
