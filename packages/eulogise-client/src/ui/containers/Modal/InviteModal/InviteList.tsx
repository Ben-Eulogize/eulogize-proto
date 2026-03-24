import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchInvitesByCaseId } from '../../../store/InviteState/actions'
import {
  useAuthState,
  useEulogiseDispatch,
  useGetCollaborators,
  useInviteState,
} from '../../../store/hooks'
import {
  EulogiseProduct,
  EulogiseUserRole,
  IInvite,
  IInviteState,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import InviteListItem from './InviteListItem'
import { STYLE } from '@eulogise/client-core'
import { CaseOwnerListItem } from './CaseOwnerListItem'

interface IInviteListProps {
  caseId: string
  ownerId: string
  className?: string
  isAdmin?: boolean
  isShowConfirmModal?: boolean
  product?: EulogiseProduct
}

const StyledInviteList = styled.table`
  width: 100%;
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
`

const InviteList = ({
  className,
  isAdmin,
  caseId,
  ownerId,
  product,
  isShowConfirmModal,
}: IInviteListProps) => {
  const dispatch = useEulogiseDispatch()
  const [hasOwnerEmail, setHasOwnerEmail] = useState<boolean>(false)
  const { account } = useAuthState()
  const role = account?.role
  const { isFetching }: IInviteState = useInviteState()
  const displayCollaborators = useGetCollaborators()

  const email = account?.email

  useEffect(() => {
    dispatch(fetchInvitesByCaseId({ caseId }))
  }, [caseId])

  return (
    <StyledInviteList className={className}>
      {role === EulogiseUserRole.ADMIN && (
        <CaseOwnerListItem
          ownerId={ownerId}
          onOwnerFetched={(owner) => {
            setHasOwnerEmail(owner?.email !== NO_REPLY_EULOGISE_EMAIL)
          }}
        />
      )}
      {displayCollaborators.map((i: IInvite) => (
        <InviteListItem
          isAdmin={isAdmin}
          key={i.id}
          invite={i}
          isEditable={i.email !== email}
          isShowConfirmModal={isShowConfirmModal}
          product={product}
        />
      ))}

      {!isFetching && displayCollaborators.length === 0 && !hasOwnerEmail && (
        <tr>
          <td>No collaborators have been added</td>
        </tr>
      )}
    </StyledInviteList>
  )
}

export default InviteList
