import styled from 'styled-components'
import React from 'react'
import {
  Popover,
  Button,
  ButtonType,
  ButtonGroup,
  ButtonSize,
  MemorialStatus,
  MemorialStatusText,
  TooltipPlacement,
} from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'
import {
  useAuthState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
} from '../../store/hooks'
import {
  GUIDE_WALK_THROUGH_STEPS,
  IAuthState,
  GUIDE_SHOW_UP_PAGE,
  IGuideWalkThroughState,
  EulogiseUserRole,
  MemorialVisualStatus,
  SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE,
  IUserGuideHelperConfig,
} from '@eulogise/core'
import {
  closeGuide,
  finishFirstPartClientDashboardGuide,
  nextGuideStep,
} from '../../store/GuideWalkThroughState/action'
import { PopoverProps } from 'antd/lib/popover'
import { updatePersonalDetailById } from '../../store/AuthState/actions'

interface IExtendedPopoverProps extends PopoverProps {
  top: string
  left: string
}

const StyledPopover = styled(Popover)<IExtendedPopoverProps>`
  position: relative;
  ${({ top, left }) =>
    `${left && `left: ${left};`}
     ${top && `top: ${top};`}
  `};
`

const StyledContentContainer = styled.div``

const StyledSteps = styled.div`
  font-size: 1.2rem;
  margin-top: 15px;
`

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  background-color: ${COLOR.WHITE};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`

const StyledTitleTextContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const StyledTitleText = styled.div`
  font-size: 1.2rem;
  color: ${COLOR.DARK_BLUE};
`

const StyledGuideContent = styled.div`
  padding: 15px 0 2px;
  font-size: 1.2rem;
  padding: 8px 8px 0px 20px;

  #bold-text {
    font-weight: bold;
  }
`

const StyledMemorialStatusGuideMemorialContent = styled.div`
  padding: 5px 0;
  font-size: 1.2rem;
`

const StyledButtonRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px 15px 20px;
`

const StyledButtonGroup = styled(ButtonGroup)`
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
`

const StyledMemorialStatusCellContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 0px 7px 30px;
`
interface IGuidePopoverProps {
  placedPage: GUIDE_SHOW_UP_PAGE
  showUpStepIndex: number
  hasMemorialStatus?: boolean
  width: number
}

const DEFAULT_POPOVER_WIDTH = 300

export const ClientDashBoardMemorialStatusOrder: Array<MemorialVisualStatus> = [
  MemorialVisualStatus.NOT_STARTED,
  MemorialVisualStatus.THEME_SELECTED,
  MemorialVisualStatus.EDITED,
  MemorialVisualStatus.COMPLETE,
  MemorialVisualStatus.DOWNLOAD,
]

export const ClientDashBoardMemorialStatusOrderProps: {
  [key: string]: { text: string; color: string }
} = {
  [MemorialVisualStatus.NOT_STARTED]: {
    text: 'Memorial has not been started',
    color: '#C2C2C2',
  },
  [MemorialVisualStatus.THEME_SELECTED]: {
    text: 'Theme has been selected for the memorial',
    color: '#BED6E9',
  },
  [MemorialVisualStatus.EDITED]: {
    text: 'User has started editing the memorial',
    color: '#60B1F1',
  },
  [MemorialVisualStatus.COMPLETE]: {
    text: 'The memorial has been completed',
    color: '#41BCC8',
  },
  [MemorialVisualStatus.DOWNLOAD]: {
    text: 'The memorial has been downloaded',
    color: '#7A79F9',
  },
  undefined: { text: 'N/A', color: '#FFFFFF' },
}

export const GuidePopover: React.FC<IGuidePopoverProps> = ({
  placedPage,
  showUpStepIndex,
  hasMemorialStatus = false,
  width = DEFAULT_POPOVER_WIDTH,
}) => {
  const dispatch = useEulogiseDispatch()
  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const {
    guideShowAt = GUIDE_SHOW_UP_PAGE.NULL,
    currentStep = -1,
    isQuickGuideEnabled,
  } = guideWalkThroughContext

  const { account }: IAuthState = useAuthState()
  const userId: string = account?.id!
  const role = account?.role

  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig

  const validRoleShowGuide: boolean =
    role === EulogiseUserRole.CUSTOMER ||
    role === EulogiseUserRole.COEDITOR ||
    role === EulogiseUserRole.EDITOR ||
    role === EulogiseUserRole.CLIENT

  const onSkipGuide = () => {
    if (!guideShowAt) {
      return
    }

    const configKey = SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE?.[
      guideShowAt
    ] as keyof IUserGuideHelperConfig

    if (!userGuideHelperConfig?.[configKey]) {
      const updatedUserGuideHelperConfig = {
        userGuideHelperConfig: {
          ...userGuideHelperConfig,
          [configKey]: true,
        },
      }
      dispatch(
        updatePersonalDetailById({
          userId,
          personalDetailsFields: updatedUserGuideHelperConfig,
        }),
      )
    }

    if (guideShowAt === GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE) {
      dispatch(finishFirstPartClientDashboardGuide())
      return
    }
    dispatch(closeGuide())
    return
  }

  const placedPageKey = SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE?.[
    placedPage
  ] as keyof IUserGuideHelperConfig

  const hasCurrentPageGuideViewed: boolean =
    userGuideHelperConfig?.[placedPageKey] ?? false

  const shouldShowUp: boolean =
    (validRoleShowGuide &&
      placedPage === guideShowAt &&
      showUpStepIndex === currentStep &&
      (!hasCurrentPageGuideViewed || isQuickGuideEnabled)) ??
    false

  const {
    STEP,
    TITLE,
    TEXT,
    SECOND_TEXT,
    THIRD_TEXT,
    PLACEMENT,
    STYLE: { TOP, LEFT },
  } = GUIDE_WALK_THROUGH_STEPS?.[guideShowAt]?.[currentStep]

  if (
    !GUIDE_WALK_THROUGH_STEPS?.[guideShowAt] ||
    !guideWalkThroughContext ||
    !role ||
    !shouldShowUp
  ) {
    return null
  }

  const isNextStepAvailable =
    currentStep! < GUIDE_WALK_THROUGH_STEPS?.[guideShowAt!]?.length - 1

  return (
    <StyledPopover
      overlayClassName={`${guideShowAt.toLowerCase()} guide-popover-${PLACEMENT}`}
      top={TOP}
      left={LEFT}
      overlayInnerStyle={{ borderRadius: '25px', maxWidth: width }}
      color={COLOR.PRIMARY_BACKGROUND_COLOR}
      placement={(PLACEMENT as TooltipPlacement) || `right`}
      open={shouldShowUp}
      content={
        <StyledContentContainer>
          <StyledTitleContainer>
            <StyledTitleTextContainer>
              <StyledTitleText dangerouslySetInnerHTML={{ __html: TITLE }} />
            </StyledTitleTextContainer>
          </StyledTitleContainer>

          <StyledGuideContent dangerouslySetInnerHTML={{ __html: TEXT }} />

          <StyledGuideContent
            dangerouslySetInnerHTML={{ __html: SECOND_TEXT }}
          />

          <StyledGuideContent
            dangerouslySetInnerHTML={{ __html: THIRD_TEXT }}
          />

          {hasMemorialStatus && (
            <StyledMemorialStatusGuideMemorialContent>
              {ClientDashBoardMemorialStatusOrder.map(
                (status: MemorialVisualStatus) => {
                  return (
                    <StyledMemorialStatusCellContainer>
                      <MemorialStatus status={status} />
                      <MemorialStatusText>
                        {
                          ClientDashBoardMemorialStatusOrderProps?.[status]
                            ?.text
                        }
                      </MemorialStatusText>
                    </StyledMemorialStatusCellContainer>
                  )
                },
              )}
            </StyledMemorialStatusGuideMemorialContent>
          )}
          <StyledButtonRowContainer>
            <StyledSteps>
              {`${STEP} / ${GUIDE_WALK_THROUGH_STEPS?.[guideShowAt]?.length}`}
            </StyledSteps>
            <StyledButtonGroup>
              {STEP < GUIDE_WALK_THROUGH_STEPS?.[guideShowAt]?.length && (
                <Button
                  buttonType={ButtonType.TRANSPARENT}
                  buttonSize={ButtonSize.SM}
                  noMarginLeft
                  onClick={() => onSkipGuide()}
                >
                  Skip
                </Button>
              )}
              <Button
                buttonSize={ButtonSize.SM}
                buttonType={ButtonType.PRIMARY}
                noMarginRight
                onClick={() => {
                  if (isNextStepAvailable) {
                    dispatch(nextGuideStep())
                  } else {
                    onSkipGuide()
                  }
                }}
              >
                {isNextStepAvailable ? `Next` : `End`}
              </Button>
            </StyledButtonGroup>
          </StyledButtonRowContainer>
        </StyledContentContainer>
      }
    />
  )
}
