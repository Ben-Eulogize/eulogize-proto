import styled from 'styled-components'
import React from 'react'
import {
  AddContributorIcon,
  Popover,
  UploadPicturesIcon,
} from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
} from '../../store/hooks'
import {
  AssetType,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  GUIDE_WALK_THROUGH_STEPS,
  IAuthState,
  ICaseState,
  IGuideWalkThroughState,
  IUserGuideHelperConfig,
  ModalId,
  SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE,
} from '@eulogise/core'
import { closeGuide, showGuide } from '../../store/GuideWalkThroughState/action'
import { PopoverProps } from 'antd/lib/popover'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { EulogiseGuideHelper } from '../../helpers/EulogiseGuideHelper'
import { WindowLocation } from '@reach/router'
import { updatePersonalDetailById } from '../../store/AuthState/actions'
import { LogoIcon } from '../icons/LogoIcon'
import { showModalAction } from '../../store/ModalState/actions'
import { ExploringOnMyOwnTextButton } from '../Button/ExploringOnMyOwnTextButton'
import { updateIsFSOverlayPickerOpen } from '../../store/AssetState/actions'

interface ExtendedPopoverProps extends PopoverProps {
  top: string
  left: string
}

const StyledPopover = styled(Popover)<ExtendedPopoverProps>`
  position: relative;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  min-height: 200px;
  width: auto;
  ${({ top, left }) =>
    `${left && `left: ${left};`}
   ${top && `top: ${top};`}
`};
`

const StyledContentContainer = styled.div`
  padding: 0;
`

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  background-color: ${COLOR.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const StyledTitleTextContainer = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  color: ${COLOR.DARK_BLUE};
`

const StyledTitleText = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
`

const StyledSubTitleText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
`

const StyledGuideSelectionContainer = styled.div`
  display: flex;
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
`

const StyledEulogizeLogo = styled(LogoIcon)`
  color: ${COLOR.PRIMARY};
  height: 32px;
  width: 105px;
`

const StyledSelectionBox = styled.div`
  width: 160px;
  height: 140px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.PRIMARY};
  margin: 12px 20px;
  border-radius: 4px;
  border: 1px solid ${COLOR.GREY};
  background: ${COLOR.WHITE};
  transition: background-color 0.3s ease-out 100ms;
  &:hover {
    background-color: ${COLOR.SHADOW_GREY};
    cursor: pointer;
  }
`

const StyledIconContainer = styled.div`
  color: ${COLOR.DARK_BLUE};
  height: 50px;
  padding: 40px 10px;
  display: flex;
  justify-content: center;
`

const StyledSelectionText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 33.6px;
  padding-top: 4px;
  color: ${COLOR.DARK_BLUE};
`

const StyledFooterContainer = styled.div`
  display: flex;
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
  justify-content: flex-end;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

enum EULOGISE_WELCOME_SELECTION_MAP_ENUM {
  UPLOAD_PHOTOS = 'Upload Photos',
  TAKE_A_TOUR = 'Take a Tour',
  INVITE_FAMILY = 'Invite Family',
}

const EULOGISE_WELCOME_SELECTION_MAP = [
  {
    index: 0,
    text: EULOGISE_WELCOME_SELECTION_MAP_ENUM.UPLOAD_PHOTOS,
    render: (
      <UploadPicturesIcon style={{ fontSize: '40px', paddingTop: '16px' }} />
    ),
  },
  {
    index: 1,
    text: EULOGISE_WELCOME_SELECTION_MAP_ENUM.TAKE_A_TOUR,
    render: <StyledEulogizeLogo />,
  },
  {
    index: 2,
    text: EULOGISE_WELCOME_SELECTION_MAP_ENUM.INVITE_FAMILY,
    render: (
      <AddContributorIcon style={{ fontSize: '40px', paddingTop: '16px' }} />
    ),
  },
]

interface IGuidePopoverWelcomeProps {
  placedPage: GUIDE_SHOW_UP_PAGE
  showUpStepIndex: number
  location: WindowLocation
}

const getShouldShowWelcomePopover = (
  userGuideHelperConfig: IUserGuideHelperConfig | undefined,
  role: EulogiseUserRole,
): boolean => {
  if (!userGuideHelperConfig) {
    return true
  } else if (typeof userGuideHelperConfig === 'object') {
    if (
      role === EulogiseUserRole.CLIENT &&
      (!userGuideHelperConfig?.hasViewedClientDashboardPartOne ||
        !userGuideHelperConfig?.hasViewedMemorialDashboard)
    ) {
      return true
    } else if (
      role === EulogiseUserRole.COEDITOR ||
      role === EulogiseUserRole.EDITOR ||
      role === EulogiseUserRole.CUSTOMER
    ) {
      if (!userGuideHelperConfig?.hasViewedMemorialDashboard) {
        return true
      }
      return false
    }
  }
  return false
}

export const GuidePopoverWelcome: React.FC<IGuidePopoverWelcomeProps> = ({
  placedPage,
  showUpStepIndex,
  location,
}) => {
  const dispatch = useEulogiseDispatch()
  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { guideShowAt, currentStep } = guideWalkThroughContext

  const { account }: IAuthState = useAuthState()
  const role: EulogiseUserRole = account?.role!
  const userId: string = account?.id!
  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig

  const { activeItem: activeCase }: ICaseState = useCaseState()

  const caseId: string = activeCase?.id!

  const validRoleAutoShowGuide: boolean =
    role === EulogiseUserRole.CUSTOMER ||
    role === EulogiseUserRole.COEDITOR ||
    role === EulogiseUserRole.EDITOR ||
    role === EulogiseUserRole.CLIENT

  const onHandleClickBox = ({
    text,
  }: {
    text: EULOGISE_WELCOME_SELECTION_MAP_ENUM
  }) => {
    switch (text) {
      case EULOGISE_WELCOME_SELECTION_MAP_ENUM.UPLOAD_PHOTOS:
        dispatch(
          updateIsFSOverlayPickerOpen({
            isFilestackOverlayPickerOpen: true,
            filestackOverlayPickerUploadAssetType: AssetType.IMAGE,
          }),
        )
        onSkipGuide()
        return
      case EULOGISE_WELCOME_SELECTION_MAP_ENUM.TAKE_A_TOUR:
        onTakeTour()
        return
      case EULOGISE_WELCOME_SELECTION_MAP_ENUM.INVITE_FAMILY:
        onSkipGuide()
        dispatch(showModalAction(ModalId.INVITE, { caseId }))
        return
      default:
        return
    }
  }

  const onTakeTour = () => {
    if (
      EulogiseGuideHelper.findShowGuideAt(location?.pathname) ===
      GUIDE_SHOW_UP_PAGE.DASHBOARD
    ) {
      dispatch(showGuide(GUIDE_SHOW_UP_PAGE.DASHBOARD, 0, true))
      return
    } else if (
      EulogiseGuideHelper.findShowGuideAt(location?.pathname) ===
      GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE
    ) {
      dispatch(showGuide(GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE, 0, true))
      return
    }
  }

  const onSkipGuide = () => {
    if (!guideShowAt) {
      return
    }

    if (
      EulogiseGuideHelper.findShowGuideAt(location?.pathname) ===
      GUIDE_SHOW_UP_PAGE.DASHBOARD
    ) {
      const updatedUserGuideHelperConfig = {
        userGuideHelperConfig: {
          ...userGuideHelperConfig,
          [SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE[
            GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_MEMORIAL_DASHBOARD
          ]]: true,
        },
      }
      dispatch(
        updatePersonalDetailById({
          userId,
          personalDetailsFields: updatedUserGuideHelperConfig,
        }),
      )
    } else if (
      EulogiseGuideHelper.findShowGuideAt(location?.pathname) ===
      GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE
    ) {
      const updatedUserGuideHelperConfig = {
        userGuideHelperConfig: {
          ...userGuideHelperConfig,
          [SKIP_TOUR_PAGE_AND_USER_HELPER_CONFIG_MAP_TABLE[
            GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_CLIENT_DASHBOARD
          ]]: true,
        },
      }
      dispatch(
        updatePersonalDetailById({
          userId,
          personalDetailsFields: updatedUserGuideHelperConfig,
        }),
      )
    }
    dispatch(closeGuide())
  }
  const shouldShowWelcomePopover: boolean =
    getShouldShowWelcomePopover(userGuideHelperConfig, role) ?? false

  const shouldShowUp: boolean =
    validRoleAutoShowGuide &&
    placedPage === guideShowAt &&
    showUpStepIndex === currentStep &&
    shouldShowWelcomePopover

  const {
    TITLE,
    TEXT,
    PLACEMENT,
    STYLE: { TOP, LEFT },
    SUBTITLE,
  } = GUIDE_WALK_THROUGH_STEPS?.[guideShowAt]?.[currentStep]

  if (
    !GUIDE_WALK_THROUGH_STEPS?.[guideShowAt] ||
    !guideWalkThroughContext ||
    !role
  ) {
    return null
  }

  return (
    <StyledPopover
      overlayClassName={guideShowAt.toLowerCase()}
      showArrow={false}
      top={TOP}
      left={LEFT}
      overlayInnerStyle={{
        borderRadius: '25px',
        maxWidth: '540px',
        minHeight: '250px',
      }}
      color={COLOR.PRIMARY_BACKGROUND_COLOR}
      placement={(PLACEMENT || `right`) as TooltipPlacement}
      open={shouldShowUp}
      content={
        <StyledContentContainer>
          <StyledTitleContainer>
            <StyledTitleTextContainer>
              <StyledTitleText>{TITLE}</StyledTitleText>
              <StyledSubTitleText>{SUBTITLE}</StyledSubTitleText>
            </StyledTitleTextContainer>
          </StyledTitleContainer>

          <StyledGuideSelectionContainer>
            {EULOGISE_WELCOME_SELECTION_MAP.map((option) => {
              const { index, text, render } = option
              return (
                <StyledSelectionBox
                  onClick={() => onHandleClickBox({ text })}
                  key={index}
                >
                  <StyledIconContainer>{render}</StyledIconContainer>
                  <StyledSelectionText>{text}</StyledSelectionText>
                </StyledSelectionBox>
              )
            })}
          </StyledGuideSelectionContainer>

          <StyledFooterContainer>
            <ExploringOnMyOwnTextButton onClick={onSkipGuide} />
          </StyledFooterContainer>
        </StyledContentContainer>
      }
    />
  )
}
