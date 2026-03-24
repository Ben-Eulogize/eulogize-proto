import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  Modal,
  Notification,
} from '@eulogise/client-components'
import { IClientState, IInsertBrandOption, ModalId } from '@eulogise/core'
import {
  useClientState,
  useEulogiseDispatch,
  useModalState,
} from '../../../store/hooks'
import { hideModalAction } from '../../../store/ModalState/actions'
import { InsertBrandSlickSlick } from './InsertBrandSlick'
import InsertBrandCard from './InsertBrandCard'
import { STYLE } from '@eulogise/client-core'

const InsertBrandHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const InsertBrandTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const InsertBrandTitle = styled.div``

const InsertBrandContainer = styled.div`
  padding: 0px 32px;
  text-align: center;
`

const StyledClientLogo = styled.img``

const StyledNoBrandReminderTextContainer = styled.div`
  ${STYLE.TEXT_MEDIUM}
`

interface InsertBrandModalProps {
  onInsertBrand: (
    insertBrandHandle: string,
    pageIndex: number | undefined,
  ) => void
}

const InsertBrandModal = ({ onInsertBrand }: InsertBrandModalProps) => {
  const dispatch = useEulogiseDispatch()

  const { activeItem: activeClient }: IClientState = useClientState()
  const [selectedBrandIndex, setSelectedBrandIndex] = useState<number | null>(
    null,
  )
  const clientLogoHandle = activeClient?.logo
  const clientBrandAssetsIds: Array<string> =
    activeClient?.clientBrandHandles ?? []

  const { options } = useModalState()
  const pageIndex: number | undefined = (options as IInsertBrandOption)
    ?.pageIndex

  const close = () => {
    setTimeout(() => {
      dispatch(hideModalAction(ModalId.INSERT_BRAND))
    }, 50)
  }

  useEffect(() => {
    setSelectedBrandIndex(null)
  }, [])

  const logoUrl = `https://${process.env.GATSBY_AWS_S3_BUCKET}/clients/logos/${clientLogoHandle}`

  const clientHasBrand = clientBrandAssetsIds?.length > 0

  const onInsert = async ({
    brandHandle,
    pageIndex,
  }: {
    brandHandle: string
    pageIndex: number | undefined
  }) => {
    if (!brandHandle) {
      return
    }
    try {
      onInsertBrand(brandHandle, pageIndex)
      Notification.success('Brand inserted.')
    } catch (error) {
      console.log('Insert a brand failed error', error)
      Notification.error('Insert a brand failed.')
    }
    dispatch(hideModalAction(ModalId.INSERT_BRAND))
  }

  return (
    <Modal
      width={800}
      footer={
        <>
          <Button
            buttonType={ButtonType.TRANSPARENT}
            noMarginRight
            onClick={() => dispatch(hideModalAction(ModalId.INSERT_BRAND))}
          >
            Cancel
          </Button>
          <Button
            buttonType={ButtonType.PRIMARY}
            noMarginRight
            disabled={selectedBrandIndex === null}
            onClick={() => {
              if (selectedBrandIndex !== null && selectedBrandIndex >= 0) {
                onInsert({
                  brandHandle: clientBrandAssetsIds?.[selectedBrandIndex],
                  pageIndex,
                })
              }
            }}
          >
            Insert
          </Button>
        </>
      }
      title={
        <InsertBrandHeader>
          {clientLogoHandle && (
            <StyledClientLogo
              src={logoUrl}
              width="auto"
              height="45"
              alt="Logo"
            />
          )}
          <InsertBrandTitleContainer>
            <InsertBrandTitle>Select Branding</InsertBrandTitle>
          </InsertBrandTitleContainer>
        </InsertBrandHeader>
      }
      isOpen
      onCloseClick={close}
    >
      <InsertBrandContainer>
        <InsertBrandSlickSlick noOfBrands={clientBrandAssetsIds?.length ?? 0}>
          {clientHasBrand ? (
            clientBrandAssetsIds.map((handle: any, index: number) => (
              <InsertBrandCard
                index={index}
                clientBrandHandle={handle}
                selectedBrandIndex={selectedBrandIndex}
                onSelectBrandRadio={(index: number) =>
                  setSelectedBrandIndex(index)
                }
              />
            ))
          ) : (
            <StyledNoBrandReminderTextContainer>
              {
                'You can now have company logo’s & signatures pre-loaded into your account. Please reach out to your customer service rep to arrange.'
              }
            </StyledNoBrandReminderTextContainer>
          )}
        </InsertBrandSlickSlick>
      </InsertBrandContainer>
    </Modal>
  )
}

export default InsertBrandModal
