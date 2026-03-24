import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useAuthState,
  useClientState,
  useEulogiseDispatch,
  useModalState,
} from '../../../store/hooks'
import { Button, ButtonType, Modal, Spin } from '@eulogise/client-components'
import {
  ICase,
  IClientFamilyInviteOptions,
  IModalState,
  ModalId,
} from '@eulogise/core'
import InviteForm from '../../Forms/InviteForm/InviteForm'
import InviteList from './InviteList'
import { STYLE } from '@eulogise/client-core'
import { EulogiseUserRole } from '@eulogise/core'
import { useBreakpoint } from '@eulogise/client-core'
import { DEVICES } from '@eulogise/client-core'
import { fetchCaseById } from '../../../store/CaseState/actions'

interface IInviteModalProps {}

const StyledInviteList = styled(InviteList)`
  margin-top: ${STYLE.GUTTER};
`

const InviteModal: React.FC<IInviteModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const {
    // @ts-ignore
    options: { caseId },
  }: IModalState = useModalState()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [selectedCase, setSelectedCase] = React.useState<ICase>()
  const { account } = useAuthState()
  const role = account?.role
  const isContributor = role === EulogiseUserRole.CONTRIBUTOR

  const { activeItem: activeClient } = useClientState()

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const createCaseFamilyInviteOptions =
    activeClient?.createCaseFamilyInviteOptions ?? []

  const isAllowToInviteEditor = role
    ? [EulogiseUserRole.ADMIN, EulogiseUserRole.CLIENT].includes(role)
      ? createCaseFamilyInviteOptions.includes(
          IClientFamilyInviteOptions.EDITOR,
        )
      : true
    : false

  const isAllowToInviteHasToPayEditor = role
    ? [EulogiseUserRole.ADMIN, EulogiseUserRole.CLIENT].includes(role)
      ? createCaseFamilyInviteOptions.includes(
          IClientFamilyInviteOptions.EDITOR_HAS_TO_PAY,
        )
      : true
    : false

  const close = () => {
    dispatch(hideModalAction(ModalId.INVITE))
  }
  useEffect(() => {
    setIsFetching(true)
    dispatch(
      fetchCaseById({
        caseId,
        success: (fetchedCase) => {
          setSelectedCase(fetchedCase)
        },
        onComplete: () => {
          setIsFetching(false)
        },
      }),
    )
  }, [])

  const ownerId = selectedCase?.customer?.id ?? selectedCase?.customer
  return (
    <Modal
      isOpen
      width={'90vw'}
      title={
        isMobileScreenSize
          ? `Invite family`
          : `Invite family and friends to add their pictures for ${selectedCase?.deceased?.fullName}`
      }
      footer={
        <>
          <Button
            noMarginRight
            buttonType={ButtonType.TRANSPARENT}
            onClick={close}
          >
            Cancel
          </Button>
        </>
      }
      onCloseClick={close}
    >
      {isFetching || !selectedCase ? (
        <Spin />
      ) : (
        <>
          <InviteForm
            caseId={caseId}
            isContributor={isContributor}
            isAllowToInviteEditor={isAllowToInviteEditor}
            isAllowToInviteHasToPayEditor={isAllowToInviteHasToPayEditor}
          />
          {!isContributor && (
            <StyledInviteList isAdmin caseId={caseId} ownerId={ownerId} />
          )}
        </>
      )}
    </Modal>
  )
}

export default InviteModal
