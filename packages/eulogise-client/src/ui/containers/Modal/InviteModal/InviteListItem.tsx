import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonSize,
  ButtonType,
  ConfirmModal,
} from '@eulogise/client-components'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
} from '../../../store/hooks'
import {
  removeInvite,
  sendInvite,
  shareWithContact,
} from '../../../store/InviteState/actions'
import { EulogiseProduct, EulogiseUserRole, IInvite } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { copyInviteLink } from '../../../helpers/AdminHelper'

interface IInviteListItemProps {
  invite: IInvite
  isAdmin?: boolean
  isEditable?: boolean
  isShowConfirmModal?: boolean
  product?: EulogiseProduct
}

const StyledInviteListItem = styled.tr``

export const InviteListItemCell = styled.td<{
  $textAlignRight?: boolean
  $noWrapText?: boolean
  $maxWidth?: string
  $padding?: string
}>`
  padding: 0.25rem 2px;
  ${({ $textAlignRight, $noWrapText, $maxWidth, $padding }) =>
    `${$textAlignRight ? `text-align: right;` : ''}
     ${$noWrapText ? `white-space: nowrap;` : ''}
     ${$maxWidth ? `max-width: ${$maxWidth};` : ''}
     ${$padding ? `padding: ${$padding};` : ''}
    }
  `}
`

const StyledButton = styled(Button)``

const InviteListItem: React.FC<IInviteListItemProps> = ({
  isAdmin,
  invite,
  isEditable = true,
  isShowConfirmModal = true,
  product,
}) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const {
    account: { role },
  } = useAuthState()
  const [isResending, setIsResending] = useState<boolean>(false)
  const [isRemoving, setIsRemoving] = useState<boolean>(false)
  const [isShowResendModal, setIsShowResendModal] = useState<boolean>(false)
  const [isShowRemoveModal, setIsShowRemoveModal] = useState<boolean>(false)

  const isAllowCopyLink =
    role === EulogiseUserRole.ADMIN || role === EulogiseUserRole.CLIENT

  const send = () => {
    setIsResending(true)
    if (product) {
      const shareToUserRole: EulogiseUserRole =
        CardProductHelper.getShareLinkUserRole(product)
      dispatch(
        shareWithContact({
          caseId: activeCase?.id!,
          inviteRole: shareToUserRole,
          userData: {
            email: invite.email!,
            fullName: invite.fullName,
          },
          success: () => {
            setIsResending(false)
            setIsShowResendModal(false)
          },
        }),
      )
    } else {
      dispatch(
        sendInvite({
          inviteId: invite.id,
          success: () => {
            setIsResending(false)
            setIsShowResendModal(false)
          },
        }),
      )
    }
  }

  const sendClick = () => {
    if (isShowConfirmModal) {
      setIsShowResendModal(true)
    } else {
      send()
    }
  }
  return (
    <StyledInviteListItem>
      <InviteListItemCell $padding={'0 1rem'} $maxWidth={'18vw'}>
        {invite.fullName}
      </InviteListItemCell>
      <InviteListItemCell $padding={'0 1rem'} $maxWidth={'18vw'}>
        {invite.email}
      </InviteListItemCell>
      {isAdmin ? (
        <>
          <InviteListItemCell $maxWidth={'80px'} $padding={'0'}>
            {CardProductHelper.getRoleNameByType(invite.role)}
          </InviteListItemCell>
          <InviteListItemCell $maxWidth={'220px'} $textAlignRight>
            <StyledButton
              noMarginLeft
              noMarginRight
              buttonSize={ButtonSize.XS}
              disabled={!isEditable}
              onClick={sendClick}
              loading={isResending}
            >
              Resend
            </StyledButton>
            {isAllowCopyLink && (
              <StyledButton
                buttonType={ButtonType.TRANSPARENT}
                noMarginRight
                buttonSize={ButtonSize.XS}
                disabled={!isEditable}
                onClick={() => {
                  copyInviteLink(invite.email!)
                }}
              >
                Copy Link
              </StyledButton>
            )}
            <StyledButton
              buttonType={ButtonType.TRANSPARENT}
              noMarginRight
              buttonSize={ButtonSize.XS}
              disabled={!isEditable}
              onClick={() => setIsShowRemoveModal(true)}
            >
              Remove
            </StyledButton>
          </InviteListItemCell>
        </>
      ) : (
        <InviteListItemCell $textAlignRight>
          <Button
            noMarginLeft
            noMarginRight
            buttonSize={ButtonSize.XS}
            onClick={sendClick}
            loading={isResending}
          >
            Send
          </Button>
        </InviteListItemCell>
      )}
      {isShowResendModal && (
        <ConfirmModal
          title="Are you sure?"
          text={`${invite.fullName} will receive a new invite.`}
          isConfirming={isResending}
          onClose={() => setIsShowResendModal(false)}
          onConfirm={() => {
            send()
          }}
        />
      )}
      {isShowRemoveModal && (
        <ConfirmModal
          title="Are you sure?"
          text={`Do you want to remove the invite for ${invite.fullName}`}
          isConfirming={isRemoving}
          onClose={() => setIsShowRemoveModal(false)}
          onConfirm={() => {
            setIsRemoving(true)
            dispatch(
              removeInvite({
                inviteId: invite.id,
                success: () => {
                  setIsRemoving(false)
                  setIsShowRemoveModal(false)
                },
              }),
            )
          }}
        />
      )}
    </StyledInviteListItem>
  )
}

export default InviteListItem
