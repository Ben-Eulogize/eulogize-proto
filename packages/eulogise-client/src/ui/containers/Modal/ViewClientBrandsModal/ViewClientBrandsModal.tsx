import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  Modal,
  Notification,
} from '@eulogise/client-components'
import { AssetType, IAssetState, ModalId } from '@eulogise/core'
import { useAssetState, useEulogiseDispatch } from '../../../store/hooks'
import { hideModalAction } from '../../../store/ModalState/actions'
import { ViewClientBrandsSlick } from './ViewClientBrandsSlick'
import ViewClientBrandsCard from './ViewClientBrandsCard'
import { IClientData } from '@eulogise/core'
import {
  fetchClientByClientId,
  updateClientById,
} from '../../../store/AdminState/actions'
import { IEulogiseUser } from '@eulogise/core'
import {
  fetchBrandAssetsByClientId,
  removeAsset,
} from '../../../store/AssetState/actions'

const ViewClientBrandsHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const ViewClientBrandsTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ViewClientBrandsTitle = styled.div``

const ViewClientBrandsContainer = styled.div`
  padding: 0px 32px;
  text-align: center;
`

const StyledClientLogo = styled.img``

interface IViewClientBrandsModal {
  clientBrandHandles: Array<string>
  clientLogoHandle?: string
  clientData: IClientData
  clientId: string
  funeralDirectors: Array<IEulogiseUser>
  onSetClient: (c: IClientData) => void
}

const ViewClientBrandsModal = ({
  clientBrandHandles = [],
  clientLogoHandle,
  clientId,
  clientData,
  funeralDirectors,
  onSetClient,
}: IViewClientBrandsModal) => {
  const dispatch = useEulogiseDispatch()
  const [selectedBrandsIndex, setSelectBrandsIndex] = useState<number | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const { brands }: IAssetState = useAssetState()

  useEffect(() => {
    dispatch(fetchBrandAssetsByClientId({ clientId }))
  }, [])

  const close = () => {
    setTimeout(() => {
      dispatch(hideModalAction(ModalId.VIEW_CLIENT_BRANDS))
    }, 50)
  }

  const logoUrl = `https://${process.env.GATSBY_AWS_S3_BUCKET}/clients/logos/${clientLogoHandle}`

  const onDelete = async ({ brandHandle }: { brandHandle: string }) => {
    if (!brandHandle) {
      return
    }
    setIsDeleting(true)
    try {
      dispatch(fetchBrandAssetsByClientId({ clientId }))
      const updatedClientData = {
        ...clientData,
        clientBrandHandles: clientData?.clientBrandHandles?.filter(
          (gh: string) => gh !== brandHandle,
        ),
      }

      const formattedClientData = {
        ...updatedClientData,
        users: funeralDirectors.map((fd) => fd.id),
      }
      dispatch(
        updateClientById({
          clientId,
          clientData: formattedClientData,
          onSuccess: () => {
            const removedBrandId = brands?.find(
              (brand) => brand?.content?.filestackHandle === brandHandle,
            )?.id
            if (!removedBrandId) {
              Notification.error('Brand removed failed, no brand id matched!')
              return
            }
            dispatch(
              removeAsset({
                assetId: removedBrandId,
                assetType: AssetType.BRAND,
                onSuccess: () => {
                  dispatch(fetchBrandAssetsByClientId({ clientId }))
                },
              }),
            )
            dispatch(
              fetchClientByClientId({
                clientId,
                onSuccess: (c) => {
                  close()
                  onSetClient(c)
                },
              }),
            )
          },
        }),
      )
      Notification.success('Brand successfully removed.')
    } catch (error) {
      Notification.error('Remove brand failed.')
    }
    setIsDeleting(false)
  }

  return (
    <Modal
      width={800}
      footer={
        <>
          <Button
            buttonType={ButtonType.TRANSPARENT}
            noMarginRight
            onClick={() =>
              dispatch(hideModalAction(ModalId.VIEW_CLIENT_BRANDS))
            }
          >
            Cancel
          </Button>
          {selectedBrandsIndex !== null && !isNaN(selectedBrandsIndex) && (
            <Button
              buttonType={ButtonType.DANGER}
              noMarginRight
              disabled={isDeleting}
              onClick={() =>
                onDelete({
                  brandHandle: clientBrandHandles?.[selectedBrandsIndex],
                })
              }
            >
              Delete
            </Button>
          )}
        </>
      }
      title={
        <ViewClientBrandsHeader>
          {clientLogoHandle && (
            <StyledClientLogo
              src={logoUrl}
              width="auto"
              height="45"
              alt="Logo"
            />
          )}
          <ViewClientBrandsTitleContainer>
            <ViewClientBrandsTitle>Client Brands</ViewClientBrandsTitle>
          </ViewClientBrandsTitleContainer>
        </ViewClientBrandsHeader>
      }
      isOpen
      onCloseClick={close}
    >
      <ViewClientBrandsContainer>
        <ViewClientBrandsSlick noOfBrands={clientBrandHandles?.length ?? 0}>
          {clientBrandHandles.map((handle: any, index: number) => (
            <ViewClientBrandsCard
              index={index}
              clientBrandHandle={handle}
              selectedBrandIndex={selectedBrandsIndex}
              onSelectBrandRadio={(index) => setSelectBrandsIndex(index)}
            />
          ))}
        </ViewClientBrandsSlick>
      </ViewClientBrandsContainer>
    </Modal>
  )
}

export default ViewClientBrandsModal
