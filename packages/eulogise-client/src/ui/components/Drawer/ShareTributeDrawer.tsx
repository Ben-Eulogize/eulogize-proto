import React, { useState } from 'react'
import { RawDraftContentState } from 'draft-js'
import styled from 'styled-components'
import { Drawer } from 'antd'
import {
  ButtonSize,
  ButtonType,
  Checkbox,
  DownloadTributeIcon,
  DrawerPlacement,
  PersonaliseInvitationIcon,
  SelectWhoToShareIcon,
  ShareTributeIcon,
  Select,
  RichTextEditor,
  TextField,
  CreateCaseFormRules,
  FieldRules,
} from '@eulogise/client-components'
import { Button } from '@eulogise/client-components'
import {
  EulogiseProduct,
  IShareRecipient,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import {
  useAllGeneratedProducts,
  useAllGenericCardProductTypes,
  useAuthState,
  useCaseState,
  useCustomerInfoState,
  useEulogiseDispatch,
  useGetCollaborators,
  useShareState,
} from '../../store/hooks'
import { closeDrawerAction } from '../../store/DrawerState/actions'
import { PlusOutlined } from '@ant-design/icons'
import {
  DrawerContentContainer,
  DrawerContentItemContainer,
  DrawerTitle,
} from './DrawerContentContainer'
import { DrawerHeader } from './DrawerHeader'
import { STYLE, COLOR } from '@eulogise/client-core'
import { InfoPanel } from '../Panel/InfoPanel'
import { ShareNewRecipientForm } from '../Form/ShareNewRecipientForm'
import { AccountHelper } from '@eulogise/helpers'
import { upsertShare } from '../../store/ShareState/actions'

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 40px;
  }
`

const StepsContainer = styled.div`
  margin: calc(${STYLE.GUTTER} * 2) 0 ${STYLE.GUTTER};
`

const StepContainer = styled.div`
  margin-bottom: ${STYLE.GUTTER};
  display: flex;
  align-items: center;
  gap: ${STYLE.GUTTER};
  padding-bottom: ${STYLE.GUTTER};
  border-bottom: 1px solid ${COLOR.CORE_PURPLE_30};
`

const StepIcon = styled.div`
  color: #9d4edd;
  font-size: 24px;
  margin-top: 4px;
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.div``

const RecipientItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${STYLE.HALF_GUTTER};
  margin: ${STYLE.HALF_GUTTER} 0;
`

const RecipientInfo = styled.div`
  flex: 1;
  display: flex;
`

const RecipientName = styled.div`
  font-size: ${STYLE.FONT_SIZE_SM};
`

const RecipientEmail = styled.div`
  font-size: ${STYLE.FONT_SIZE_SM};
  margin-left: ${STYLE.GUTTER};
  color: ${COLOR.SLATE_GREY};
`

const CheckboxContainer = styled.div`
  border-top: 1px solid ${COLOR.LIGHT_GREY};
  padding: 1rem 0;
`

const MessageContainer = styled.div`
  margin: 1rem 0;
`

const ReplyEmailContainer = styled.div`
  margin: 1rem 0;
`

const SendButton = styled(Button)``

const DrawerText = styled.div`
  font-size: ${STYLE.FONT_SIZE_SM};
  line-height: ${STYLE.TEXT_LINE_HEIGHT_SMALL};
`

const DrawerHint = styled.div`
  font-size: ${STYLE.FONT_SIZE_XS};
  color: ${COLOR.SLATE_GREY};
`

const NoRecipientMessage = styled.div`
  margin: ${STYLE.GUTTER} 0;
  color: ${COLOR.TEXT_DISABLED_COLOR};
`

const StyledButton = styled(Button)`
  margin: ${STYLE.GUTTER} 0;
`

const RecipientsContainer = styled.div`
  padding-bottom: ${STYLE.HALF_GUTTER};
`

const StyledInfoPanel = styled(InfoPanel)`
  padding: 2.5rem 1.5rem;
`

export const ShareTributeDrawer = () => {
  const dispatch = useEulogiseDispatch()
  const collaborators = useGetCollaborators()
  const { account } = useAuthState()
  const { share } = useShareState()
  const { customerInfo } = useCustomerInfoState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { activeItem: activeCase } = useCaseState()
  const generatedProducts = useAllGeneratedProducts()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const [isShowNewRecipientForm, setIsShowNewRecipientForm] = useState(false)

  const [recipients, setRecipients] = useState<IShareRecipient[]>(
    share?.recipients ??
      collaborators.map(
        (c) =>
          ({
            fullName: c.fullName,
            email: c.email,
            selected: true,
          } as IShareRecipient),
      ) ??
      [],
  )

  const [allowDownload, setAllowDownload] = useState(
    share?.allowDownload ?? true,
  )
  const [selectedTributes, setSelectedTributes] = useState<Array<string>>(
    (share?.tributeIds ?? []).filter((id) =>
      generatedProducts.includes(id as EulogiseProduct),
    ),
  )
  const [invitationMessage, setInvitationMessage] =
    useState<RawDraftContentState>(share?.invitationMessage ?? {})
  const [replyEmail, setReplyEmail] = useState(
    share?.replyEmail ??
      account?.email ??
      customerInfo?.email ??
      NO_REPLY_EULOGISE_EMAIL,
  )

  const caseId = activeCase?.id

  if (!activeCase || !caseId) {
    return null
  }

  const handleRecipientToggle = (email: string) => {
    setRecipients(
      recipients?.map((recipient) =>
        recipient.email === email
          ? { ...recipient, selected: !recipient.selected }
          : recipient,
      ),
    )
  }

  const handleClose = () => {
    dispatch(closeDrawerAction())
  }

  const handleSendAndShare = () => {
    // Handle send and share logic here
    console.log('Sending invitation...')
    setIsSubmitting(true)
    dispatch(
      upsertShare({
        caseId,
        share: {
          recipients: recipients as unknown as Array<IShareRecipient>,
          allowDownload: allowDownload,
          tributeIds: selectedTributes,
          invitationMessage: invitationMessage,
          replyEmail: replyEmail,
        },
        success: () => {
          setIsSubmitting(false)
          handleClose()
        },
        error: () => {
          setIsSubmitting(false)
        },
      }),
    )
  }

  const handleToggleNewRecipientForm = () => {
    setIsShowNewRecipientForm(!isShowNewRecipientForm)
  }

  const selectedRecipients = recipients.filter((r) => r.selected === true)
  const hasValidEmail = replyEmail && FieldRules.email.validate(replyEmail)
  const isFormValid =
    selectedRecipients.length > 0 &&
    selectedTributes.length > 0 &&
    Object.keys(invitationMessage).length > 0 &&
    hasValidEmail
  return (
    <StyledDrawer
      placement={DrawerPlacement.LEFT}
      open={true}
      closable={false}
      key={`share-tribute-drawer`}
      maskClosable={false}
      width={'1180px'}
    >
      <DrawerHeader onCloseClick={handleClose} />

      <DrawerContentContainer>
        <DrawerContentItemContainer>
          <StyledInfoPanel>
            <DrawerTitle>Share your tributes</DrawerTitle>
            <DrawerText>
              Enter the recipients and we'll send an invitation to view or
              download your tributes.
            </DrawerText>
            <StepsContainer>
              <StepContainer>
                <StepIcon>
                  <SelectWhoToShareIcon />
                </StepIcon>
                <StepContent>
                  <StepTitle>
                    Select who to share with, or add new contacts.
                  </StepTitle>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepIcon>
                  <DownloadTributeIcon />
                </StepIcon>
                <StepContent>
                  <StepTitle>Allow tribute download or view only</StepTitle>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepIcon>
                  <ShareTributeIcon />
                </StepIcon>
                <StepContent>
                  <StepTitle>Select the tributes to share</StepTitle>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepIcon>
                  <PersonaliseInvitationIcon />
                </StepIcon>
                <StepContent>
                  <StepTitle>Personalise your invitation</StepTitle>
                </StepContent>
              </StepContainer>
            </StepsContainer>
          </StyledInfoPanel>
        </DrawerContentItemContainer>
        <DrawerContentItemContainer>
          <DrawerTitle>Select recipients</DrawerTitle>
          <RecipientsContainer>
            {recipients.length === 0 ? (
              <NoRecipientMessage>No recipients</NoRecipientMessage>
            ) : (
              recipients.map((recipient) => (
                <RecipientItem key={recipient.email}>
                  <Checkbox
                    checked={recipient.selected}
                    onChange={() => handleRecipientToggle(recipient.email)}
                  />
                  <RecipientInfo>
                    <RecipientName>{recipient.fullName}</RecipientName>
                    <RecipientEmail>{recipient.email}</RecipientEmail>
                  </RecipientInfo>
                </RecipientItem>
              ))
            )}

            <StyledButton
              noMarginLeft
              buttonSize={ButtonSize.XS}
              buttonType={ButtonType.TRANSPARENT}
              onClick={handleToggleNewRecipientForm}
            >
              <PlusOutlined />
              Add a new recipient
            </StyledButton>
          </RecipientsContainer>
          {isShowNewRecipientForm && (
            <ShareNewRecipientForm
              recipients={recipients}
              onSubmit={(data) => {
                setRecipients([
                  ...recipients,
                  {
                    ...data,
                    selected: true,
                    status: 'pending',
                  },
                ])
                setIsShowNewRecipientForm(false)
              }}
            />
          )}

          <CheckboxContainer>
            <Checkbox
              checked={allowDownload}
              onChange={(e: any) => setAllowDownload(e.target.checked)}
            >
              Allow recipients to download your tributes
            </Checkbox>
          </CheckboxContainer>

          <DrawerText>Select which tributes to share</DrawerText>
          <Select
            mode="multiple"
            placeholder="Please select"
            style={{ width: '100%' }}
            value={selectedTributes}
            onChange={(options) => {
              setSelectedTributes(options as Array<string>)
            }}
            options={AccountHelper.getAllAvailableProductOptions({
              activeCase,
              genericProductTypes,
            }).map((o) => ({
              ...o,
              disabled: !generatedProducts.includes(o.value as EulogiseProduct),
            }))}
          />

          <MessageContainer>
            <div>
              <DrawerText>Add a message to your invitation</DrawerText>
            </div>
            <RichTextEditor
              rows={4}
              rawValue={invitationMessage}
              onRawChange={(value) => {
                setInvitationMessage(value)
              }}
              placeholder="Here are the tributes I have created, please let me know what you think."
            />
            <DrawerHint>Type to replace this message with your own</DrawerHint>
          </MessageContainer>

          <ReplyEmailContainer>
            <TextField
              labelText="Reply email"
              placeholder="Your email address"
              autoCapitalize="none"
              value={replyEmail}
              rules={CreateCaseFormRules.email}
              onChange={(ev: any) => {
                setReplyEmail(ev.target.value)
              }}
            />

            <DrawerHint>Leave blank to disable replies</DrawerHint>
          </ReplyEmailContainer>

          <SendButton
            buttonSize={ButtonSize.SM}
            noMarginLeft
            loading={isSubmitting}
            disabled={!isFormValid}
            onClick={handleSendAndShare}
          >
            Send and share
          </SendButton>
        </DrawerContentItemContainer>
      </DrawerContentContainer>
    </StyledDrawer>
  )
}
