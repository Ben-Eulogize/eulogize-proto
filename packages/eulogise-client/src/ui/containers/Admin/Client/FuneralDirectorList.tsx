import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  Checkbox,
  ConfirmModal,
  Spin,
  Table,
  Text,
  TextSize,
} from '@eulogise/client-components'
import { IClientRole, IEulogiseUser } from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import { copyLoginLink } from '../../../helpers/AdminHelper'

const StyledTable = styled(Table)`
  margin-top: ${STYLE.GUTTER};
`

const EmptyText = styled(Text)`
  margin: 2rem 0;
  display: block;
`

const StyledOneRowColumn = styled.div`
  display: flex;
`

export const FuneralDirectorList: React.FC<{
  isLoading?: boolean
  funeralDirectors?: Array<IEulogiseUser>
  onDelete?: (user: IEulogiseUser) => void
  onChange?: (user: IEulogiseUser) => void
}> = ({ isLoading, funeralDirectors = [], onDelete, onChange }) => {
  const [deleteUser, setDeleteUser] = useState<IEulogiseUser | undefined>()
  if (isLoading) {
    return <Spin />
  }
  if (!funeralDirectors || funeralDirectors.length === 0) {
    return (
      <EmptyText size={TextSize.SMALL}>
        There are no funeral directors in this client
      </EmptyText>
    )
  }
  const columns = [
    {
      title: 'Admin',
      key: 'clientAdmin',
      render: (v: IEulogiseUser, record: IEulogiseUser) => {
        return (
          <Checkbox
            checked={record.clientRole === IClientRole.ADMIN}
            onChange={(ev: any) => {
              const checked = ev.target.checked
              if (onChange) {
                onChange({
                  ...record,
                  clientRole: checked
                    ? IClientRole.ADMIN
                    : IClientRole.OPERATOR,
                })
              }
            }}
          />
        )
      },
    },
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: '',
      key: 'actions',
      render: (value: IEulogiseUser, record: IEulogiseUser) => (
        <StyledOneRowColumn>
          <Button
            buttonType={ButtonType.DANGER}
            onClick={() => {
              setDeleteUser(record)
            }}
          >
            Delete
          </Button>
          <Button
            disabled={false}
            buttonType={ButtonType.PRIMARY}
            onClick={() => {
              copyLoginLink(value?.id)
            }}
          >
            Copy Login
          </Button>
        </StyledOneRowColumn>
      ),
    },
  ]
  return (
    <>
      <StyledTable dataSource={funeralDirectors} columns={columns} />
      <ConfirmModal
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(undefined)}
        onConfirm={() => {
          if (onDelete) {
            onDelete(deleteUser!)
          }
          setDeleteUser(undefined)
        }}
        title="Are you sure you want to delete this user?"
        text={`This will delete ${deleteUser?.fullName} (${deleteUser?.email}) from your account. Any cases created by this user, will remain in the account.`}
      />
    </>
  )
}
