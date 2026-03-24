import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  FormContext,
  TextField,
  InviteFormRules,
  Button,
  Tooltip,
  Radio,
  FormHelper,
  RadioGroup,
} from '@eulogise/client-components'
import {
  createInvite,
  fetchInvitesByCaseId,
} from '../../../store/InviteState/actions'
import {
  useAuthState,
  useCaseState,
  useClientState,
  useEulogiseDispatch,
  useInviteState,
} from '../../../store/hooks'
import { updateCaseEmailInviteById } from '../../../store/CaseState/actions'
import {
  ICaseState,
  IClientState,
  EulogiseUserRole,
  ICase,
  IInviteFields,
  IInviteState,
  NO_REPLY_EULOGISE_EMAIL,
  IAuthState,
  EulogiseEditorPaymentConfig,
} from '@eulogise/core'
import { COLOR, STYLE } from '@eulogise/client-core'
import { signUpCoEditor } from '../../../store/AuthState/actions'
import { Notification } from '@eulogise/client-components'

interface IInviteFormProps {
  caseId: string
  isContributor: boolean
  isAllowToInviteEditor?: boolean
  isAllowToInviteHasToPayEditor?: boolean
}

const StyledInviteForm = styled.form``

const StyledOverMaxLimitInvitesWarningText = styled.div`
  margin-top: 16px;
  color: ${COLOR.RED};
  ${STYLE.TEXT_SMALL}
`

const initialFormFields: IInviteFields = {
  fullName: '',
  email: '',
}

const InviteForm: React.FC<IInviteFormProps> = ({
  caseId,
  isContributor = false,
  isAllowToInviteEditor = false,
  isAllowToInviteHasToPayEditor = false,
}) => {
  const dispatch = useEulogiseDispatch()
  const containerRef = useRef()
  const { items: cases }: ICaseState = useCaseState()
  const { activeItem: activeClient }: IClientState = useClientState()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const [fields, setFields] = useState<IInviteFields>(initialFormFields)
  const { isValid } = FormHelper.validateInviteForm(fields)
  const [role, setRole] = useState<EulogiseUserRole>(
    EulogiseUserRole.CONTRIBUTOR,
  )
  const [editorPaymentConfig, setEditorPaymentConfig] =
    useState<EulogiseEditorPaymentConfig | null>(null)

  const { account }: IAuthState = useAuthState()
  const userRole: EulogiseUserRole = account?.role!

  const { items: collaborators }: IInviteState = useInviteState()

  const activeCase = cases?.find((c: ICase) => c.id === caseId)
  const activeCaseEmail = activeCase?.customer?.email || ''

  const isActiveCaseUserEditor =
    collaborators?.find((i) => i.email === activeCaseEmail)?.role ===
    EulogiseUserRole.EDITOR

  const isAnyEditorInviteExists =
    collaborators.filter((i) => i.role === EulogiseUserRole.EDITOR).length > 0

  const isCoEditor = userRole === EulogiseUserRole.COEDITOR

  useEffect(() => {
    dispatch(fetchInvitesByCaseId({ caseId }))
  }, [caseId])

  const displayCollaborators = collaborators.filter(
    (i) => i.email !== NO_REPLY_EULOGISE_EMAIL,
  )

  const isOverInviteMaxLimitFeatureEnabled = ![
    EulogiseUserRole.ADMIN,
    EulogiseUserRole.CLIENT,
  ].includes(userRole)

  const shouldInviteButtonDisabled =
    isOverInviteMaxLimitFeatureEnabled && displayCollaborators?.length >= 10

  const updateFields = (newFields: any) => {
    setFields({ ...fields, ...newFields })
  }

  const sendInvite = (activeCase: ICase) => {
    dispatch(
      updateCaseEmailInviteById({
        caseId,
        existingCaseData: activeCase,
        success: () => {
          dispatch(
            createInvite({
              isShouldSendEmail: fields.email ? true : false,
              inviteData: {
                role,
                email: fields.email,
                fullName: fields.fullName,
                case: caseId,
                ...(activeClient ? { client: activeClient.id } : {}),
              },
              success: () => {
                setFields(initialFormFields)
                setIsFormDirty(false)
                Notification.success('Invite sent successfully.')
              },
              complete: () => {
                setIsCreating(false)
              },
            }),
          )
        },
      }),
    )
  }

  const onSubmit = async (ev: any) => {
    ev.preventDefault()
    setIsFormDirty(true)
    if (isValid) {
      const activeCase: ICase = cases?.find((c: ICase) => c.id === caseId)!
      if (!activeCase) {
        return
      }
      setIsCreating(true)
      if (role === EulogiseUserRole.CONTRIBUTOR) {
        sendInvite(activeCase)
      } else if (
        role === EulogiseUserRole.COEDITOR ||
        role === EulogiseUserRole.EDITOR
      ) {
        // create user
        dispatch(
          signUpCoEditor({
            email: fields.email,
            fullName: fields.fullName,
            role,
            success: () => {
              // send invite
              sendInvite(activeCase)
            },
            complete: () => {
              setIsCreating(false)
            },
          }),
        )
      }
    }
  }

  return (
    <div>
      <FormContext.Provider value={{ isFormDirty }}>
        <StyledInviteForm ref={containerRef} onSubmit={onSubmit}>
          <TextField
            labelText="Full name"
            placeholder="Full name"
            value={fields.fullName}
            rules={InviteFormRules.fullName}
            onChange={(ev, value) => updateFields({ fullName: value })}
            marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
          />
          <TextField
            labelText="Email"
            placeholder="Email"
            value={fields.email}
            autoCapitalize="none"
            rules={InviteFormRules.email}
            onChange={(ev, value) => updateFields({ email: value })}
            marginBottom={STYLE.FIELD_MARGIN_BOTTOM}
          />
          {!isContributor && (
            <RadioGroup>
              {isAllowToInviteEditor &&
                !isCoEditor &&
                !isActiveCaseUserEditor &&
                !isAnyEditorInviteExists && (
                  <Tooltip
                    title="Invited user is able to edit and generate memorials"
                    getPopupContainer={() => containerRef.current!}
                  >
                    <Radio
                      checked={
                        role === EulogiseUserRole.EDITOR &&
                        editorPaymentConfig !==
                          EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
                      }
                      onClick={() => {
                        setEditorPaymentConfig(
                          EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY,
                        )
                        setRole(EulogiseUserRole.EDITOR)
                      }}
                    >
                      Editor
                    </Radio>
                  </Tooltip>
                )}
              {isAllowToInviteHasToPayEditor &&
                !isCoEditor &&
                !isActiveCaseUserEditor &&
                !isAnyEditorInviteExists && (
                  <Tooltip
                    title="Invited user is able to edit and generate memorials, but has to pay first"
                    getPopupContainer={() => containerRef.current!}
                  >
                    <Radio
                      checked={
                        role === EulogiseUserRole.EDITOR &&
                        editorPaymentConfig ===
                          EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
                      }
                      onClick={() => {
                        setEditorPaymentConfig(
                          EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY,
                        )
                        setRole(EulogiseUserRole.EDITOR)
                      }}
                    >
                      Has to purchase
                    </Radio>
                  </Tooltip>
                )}
              <Tooltip
                title="Invited user can only upload photos"
                getPopupContainer={() => containerRef.current!}
              >
                <Radio
                  checked={role === EulogiseUserRole.CONTRIBUTOR}
                  onClick={() => setRole(EulogiseUserRole.CONTRIBUTOR)}
                >
                  Contributor
                </Radio>
              </Tooltip>
              <Tooltip
                title="Invited user is able to edit memorials"
                getPopupContainer={() => containerRef.current!}
              >
                <Radio
                  checked={role === EulogiseUserRole.COEDITOR}
                  onClick={() => setRole(EulogiseUserRole.COEDITOR)}
                >
                  Coeditor
                </Radio>
              </Tooltip>
            </RadioGroup>
          )}

          <Button
            htmlType="submit"
            loading={isCreating}
            disabled={!isValid || shouldInviteButtonDisabled}
            noMarginLeft
            onClick={onSubmit}
          >
            Invite
          </Button>
        </StyledInviteForm>
      </FormContext.Provider>
      {shouldInviteButtonDisabled && (
        <StyledOverMaxLimitInvitesWarningText>
          You can invite up to 10 family and friends at the same time.
        </StyledOverMaxLimitInvitesWarningText>
      )}
    </div>
  )
}

export default InviteForm
