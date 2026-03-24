import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InviteListItemCell } from './InviteListItem'
import {
  Button,
  ButtonSize,
  ButtonType,
  ConfirmModal,
  Spin,
} from '@eulogise/client-components'
import { fetchUserByUserId } from '../../../store/AdminState/actions'
import { useEulogiseDispatch } from '../../../store/hooks'
import { IUserReadable, NO_REPLY_EULOGISE_EMAIL } from '@eulogise/core'
import { sendWelcomeEmailAction } from '../../../store/InviteState/actions'
import { copyLoginLink } from '../../../helpers/AdminHelper'

const StyledCaseOwnerListItem = styled.tr``

type ICaseOwnerListItemProps = {
  ownerId: string
  onOwnerFetched: (owner: IUserReadable) => void
}

export const CaseOwnerListItem = ({
  ownerId,
  onOwnerFetched,
}: ICaseOwnerListItemProps) => {
  const dispatch = useEulogiseDispatch()
  const [isFetching, setIsFetching] = useState(false)
  const [owner, setOwner] = useState<IUserReadable>()
  const [isShowResendModal, setIsShowResendModal] = useState<boolean>(false)
  const [isResending, setIsResending] = useState<boolean>(false)
  const send = () => {
    setIsResending(true)
    dispatch(
      sendWelcomeEmailAction({
        userId: ownerId,
        onComplete: () => {
          setIsResending(false)
          setIsShowResendModal(false)
        },
      }),
    )
  }
  const sendClick = () => {
    setIsShowResendModal(true)
  }

  useEffect(() => {
    setIsFetching(true)
    dispatch(
      fetchUserByUserId({
        userId: ownerId,
        success: (owner) => {
          setOwner(owner)
          onOwnerFetched(owner)
        },
        onComplete: () => {
          setIsFetching(false)
        },
      }),
    )
  }, [])
  if (!ownerId || owner?.email === NO_REPLY_EULOGISE_EMAIL) {
    return null
  }
  const ownerFullName = owner?.fullName
  return isFetching || !owner ? (
    <Spin />
  ) : (
    <StyledCaseOwnerListItem>
      <InviteListItemCell $padding={'0 1rem'} $maxWidth={'18vw'}>
        {ownerFullName}
      </InviteListItemCell>
      <InviteListItemCell $padding={'0 1rem'} $maxWidth={'18vw'}>
        {owner?.email}
      </InviteListItemCell>
      <InviteListItemCell $maxWidth={'80px'} $padding={'0'}>
        Tribute Creator
      </InviteListItemCell>
      <InviteListItemCell $maxWidth={'220px'} $textAlignRight>
        <Button
          noMarginLeft
          noMarginRight
          buttonSize={ButtonSize.XS}
          onClick={sendClick}
          loading={isResending}
        >
          Resend
        </Button>
        <Button
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          buttonSize={ButtonSize.XS}
          onClick={() => {
            copyLoginLink(ownerId)
          }}
        >
          Copy Link
        </Button>
        <Button
          buttonType={ButtonType.TRANSPARENT}
          noMarginRight
          buttonSize={ButtonSize.XS}
          disabled
        >
          Remove
        </Button>
      </InviteListItemCell>
      {isShowResendModal && (
        <ConfirmModal
          title="Are you sure?"
          text={`${ownerFullName} will receive a welcome email.`}
          isConfirming={isResending}
          onClose={() => setIsShowResendModal(false)}
          onConfirm={() => {
            send()
          }}
        />
      )}
    </StyledCaseOwnerListItem>
  )
}
