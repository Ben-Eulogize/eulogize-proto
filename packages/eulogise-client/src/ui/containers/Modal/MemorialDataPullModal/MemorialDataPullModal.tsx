import React, { useRef, useState } from 'react'
import { Button, Modal } from '@eulogise/client-components'
import MemorialDataPullForm from '../../Forms/memorialDataPullForm/MemorialDataPullForm'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useModalState,
} from '../../../store/hooks'
import {
  ICaseState,
  ModalId,
  ICaseEditFields,
  EulogiseProduct,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  IAuthState,
  IUserGuideHelperConfig,
  IMemorialDataPullModalOption,
  IModalState,
  SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE,
} from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import { updateCaseById } from '../../../store/CaseState/actions'
import styled from 'styled-components'
import { showGuide } from '../../../store/GuideWalkThroughState/action'
import { updatePersonalDetailById } from '../../../store/AuthState/actions'

const StyledButtonGroup = styled.div<{ $hasViewedBookletGuide: boolean }>`
  display: flex;

  ${({ $hasViewedBookletGuide }) =>
    $hasViewedBookletGuide
      ? `
      justify-content: flex-end;
    `
      : `
      justify-content: space-between;
    `}
`

interface MemorialDataPullModalProps {}

const MemorialDataPullModal: React.FC<MemorialDataPullModalProps> = () => {
  const formRef = useRef()
  const dispatch = useEulogiseDispatch()
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const { account }: IAuthState = useAuthState()
  const role = account?.role
  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig
  const userId: string = account?.id!

  const validRoleAutoShowGuide: boolean =
    role === EulogiseUserRole.CUSTOMER ||
    role === EulogiseUserRole.COEDITOR ||
    role === EulogiseUserRole.EDITOR ||
    role === EulogiseUserRole.CLIENT
  const hasViewedBookletGuide = userGuideHelperConfig?.hasViewedBooklet ?? false

  const { options }: IModalState = useModalState()
  const { product } = options as IMemorialDataPullModalOption

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id

  const onUpdateHasViewedBookletGuide = () => {
    if (!hasViewedBookletGuide) {
      const bookletGuideKey =
        SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE[
          GUIDE_SHOW_UP_PAGE.BOOKLET
        ]
      const updatedUserGuideHelperConfig = {
        userGuideHelperConfig: {
          ...userGuideHelperConfig,
          [bookletGuideKey]: true,
        },
      }
      dispatch(
        updatePersonalDetailById({
          userId,
          personalDetailsFields: updatedUserGuideHelperConfig,
        }),
      )
    }
  }

  const onClose = () => {
    dispatch(hideModalAction(ModalId.MEMORIAL_DATA_PULL))
  }

  const onSkip = () => {
    if (!caseId) {
      return
    }
    const formattedFields: ICaseEditFields = {
      hasSkippedOrFilledMemorialDataPullForm: true,
    }
    dispatch(updateCaseById({ caseId, caseFields: formattedFields }))
    onUpdateHasViewedBookletGuide()
    dispatch(hideModalAction(ModalId.MEMORIAL_DATA_PULL))
  }

  return (
    <Modal
      isOpen
      onCloseClick={onSkip}
      title="Enter funeral details to pre-fill template"
      closeButtonText={'Skip'}
      fontSize={STYLE.TEXT_FONT_SIZE_MEDIUM as string}
      footer={
        <StyledButtonGroup $hasViewedBookletGuide={hasViewedBookletGuide}>
          <Button
            key="start-editing"
            loading={isCreating}
            onClick={() => {
              // @ts-ignore
              formRef.current.dispatchEvent(
                new Event('submit', { bubbles: true, cancelable: true }),
              )
              dispatch(showGuide(GUIDE_SHOW_UP_PAGE.NULL, 0, false))
              onUpdateHasViewedBookletGuide()
            }}
          >
            Start Editing
          </Button>
          {!hasViewedBookletGuide && (
            <Button
              key="take-a-tour"
              loading={isCreating}
              onClick={() => {
                // @ts-ignore
                formRef.current.dispatchEvent(
                  new Event('submit', { bubbles: true, cancelable: true }),
                )
                if (
                  !hasViewedBookletGuide &&
                  product === EulogiseProduct.BOOKLET &&
                  validRoleAutoShowGuide
                ) {
                  dispatch(showGuide(GUIDE_SHOW_UP_PAGE.BOOKLET, 0, false))
                }
              }}
            >
              Take a Tour
            </Button>
          )}
        </StyledButtonGroup>
      }
    >
      <MemorialDataPullForm
        formRef={formRef}
        onCreating={() => setIsCreating(true)}
        onCreated={() => {
          setIsCreating(false)
          onClose()
        }}
        onFailed={() => setIsCreating(false)}
      />
    </Modal>
  )
}

export default MemorialDataPullModal
