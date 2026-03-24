import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  Alert,
  AlertFull,
  AlertLeft,
  Button,
  ButtonType,
  FontSizeIcon,
  MusicIcon,
  Text,
  BackgroundIcon,
  BorderSettingsIcon,
  ResetIcon,
  ConfirmModal,
  BnWDropIcon,
  MagnifierPlusIcon,
} from '@eulogise/client-components'
import {
  useEulogiseDispatch,
  useGuideWalkThroughState,
  useSlideshowState,
} from '../../store/hooks'
import { SlideshowHelper, StringHelper } from '@eulogise/helpers'
import {
  EulogiseProduct,
  GUIDE_SHOW_UP_PAGE,
  IGuideWalkThroughState,
  ISlide,
  ISlideshowBorderSettings,
  ISlideshowState,
} from '@eulogise/core'
import { openChangeBackgroundImageDrawer } from '../../store/DrawerState/actions'
import {
  AlertRight,
  TextSize,
  DropdownArrowUpIcon,
  DropdownArrowDownIcon,
} from '@eulogise/client-components'
import { VideoDurationMessage } from '../SlideshowInfo/VideoDurationMessage'
import { NoOfSlidesMessage } from '../SlideshowInfo/NoOfSlidesMessage'
import {
  COLOR,
  useIsNotDesktop,
  useEditorBreakpoint,
  useDetectClickOutside,
} from '@eulogise/client-core'
import { useDropdownHoverClick } from '../../hooks/useDropdownHoverClick'
import {
  resetSlideshowAction,
  updateSlideshow,
  updateTimelineThumbnailsDisplayedAmount,
} from '../../store/SlideshowState/actions'
import TimelineMagnifierSlider from '../SlideshowTimeline/TimelineMagnifierSlider'
import { useBreakpoint } from '@eulogise/client-core'
import { DEVICES } from '@eulogise/client-core'
import { GuidePopover } from '../../components/GuidePopover/GuidePopover'

interface ITimelinePanelHeaderProps {
  onMusicSettingsClick: () => void
  onOpenStartEditTitleSlideClick: () => void
  onVideoBierClick?: () => void
  isDev?: boolean
}

const timelineIconStyle = `
  cursor: pointer;
`

const StyledMusicIcon = styled(MusicIcon)`
  margin-top: 3px;
  ${timelineIconStyle}
`

const StyledTitleIcon = styled(FontSizeIcon)`
  margin-top: 2px;
  ${timelineIconStyle}
`

const StyledTimelinePanelHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
`

const StyledAlertFull = styled(AlertFull)`
  display: flex;
  padding: 0 16px;
`

const DesktopTextButton = styled(Button)<{
  $shouldShowSlideshowDropdown: boolean
}>`
  ${({
    $shouldShowSlideshowDropdown,
  }: {
    $shouldShowSlideshowDropdown: boolean
  }) => ($shouldShowSlideshowDropdown ? `width: 100%;` : ``)}
  display: flex;
  align-items: center;
  button.ant-btn[disabled] {
    & > * {
      pointer-events: auto;
      cursor: not-allowed;
    }
  }
`

const EditTitleSlideButton = styled(DesktopTextButton)`
  ${({
    $isTitleSlideEnabled,
    $shouldShowWhiteText,
  }: {
    $isTitleSlideEnabled: boolean
    $shouldShowWhiteText: boolean
  }) =>
    $shouldShowWhiteText
      ? `
      color: ${COLOR.WHITE};
    `
      : $isTitleSlideEnabled
      ? `
    &&, &&:hover {
      color: ${COLOR.DARK_BLUE};
      border-color: ${COLOR.DARK_BLUE};
    }
  `
      : ''}
`

const StyledAlert = styled(Alert)`
  margin-bottom: 0;
  margin-top: 0;
`

const StyledBorderIcon = styled(BorderSettingsIcon)`
  padding-top: 2px;
  height: 100%;
`

const StyledBackgroundIcon = styled(BackgroundIcon)``

const SlideshowInfo = styled(Text)``

const SlideshowInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSeparator = styled.div`
  padding: 0 6px;
`

const StyledDesignOptionButton = styled(Button)`
  display: flex;
`

const StyledDesignOptionButtonGroupContainer = styled.div``

const StyledDesignOptionDropdownButtonContainer = styled.div`
  position: absolute;
  width: 208px;
`

const StyledDropdownArrowDownIconContainer = styled.div`
  margin: 3px 0 0 5px;
`

const StyledDropdownArrowDownIcon = styled(DropdownArrowDownIcon)``

const StyledDropdownArrowUpIcon = styled(DropdownArrowUpIcon)``

const StyledTimelineMagnifierSlider = styled(TimelineMagnifierSlider)``

const StyledMagnifierDropdownContainer = styled.div`
  margin-left: 15px;
`

const StyledMagnifierButton = styled(DesktopTextButton)`
  display: flex;
  margin-left: auto;
`

const StyledMagnifierPlusIcon = styled(MagnifierPlusIcon)`
  margin-left: 6px;
  margin-top: 3px;
  cursor: pointer;
  font-size: 20px;
`

const StyledMagnifierDropdownButtonContainer = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
`

const TimelineHeader: React.FC<ITimelinePanelHeaderProps> = ({
  onOpenStartEditTitleSlideClick,
  onMusicSettingsClick,
  isDev = false,
}) => {
  const dispatch = useEulogiseDispatch()
  const { activeSlideshowTheme: slideshowTheme } = useSlideshowState()

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  const [isShowResetConfirmModal, setIsShowResetConfirmModal] =
    useState<boolean>(false)
  const {
    activeItem: slideshowData,
    timelineThumbnailsDisplayedAmount,
  }: ISlideshowState = useSlideshowState()

  const startTitleSlide: ISlide = SlideshowHelper.getStartTitleSlide(
    slideshowData?.content?.slides!,
  )

  const borderSettings: ISlideshowBorderSettings =
    SlideshowHelper.getBorderSettings({
      slideshowTheme: slideshowTheme!,
      slideshowData,
    })

  const imageFilter =
    slideshowData && SlideshowHelper.getImageFilter(slideshowData)

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const { guideShowAt, currentStep } = guideWalkThroughContext

  const isGuideWalkThroughHighlightedForSlideshow: boolean =
    guideShowAt === GUIDE_SHOW_UP_PAGE.SLIDESHOW

  // TODO: this need to move into ITheme and ISlideshow - should not be hardcoded
  const unchangableBackgroundThemes = [
    'reflection',
    'grace',
    'minimal-arch',
    'minimal-collage',
    'full-width',
  ]

  const isChangeBackgroundDisabled: boolean =
    unchangableBackgroundThemes.includes(slideshowData?.content?.theme!) ??
    false

  const noOfSlides: number = SlideshowHelper.getTotalActiveImageSlides(
    slideshowData!,
  )

  const isNotDesktop = useIsNotDesktop()

  const { shouldShowSlideshowDropdown } = useEditorBreakpoint()

  const {
    hovered: magnifierHovered,
    clicked: magnifierClicked,
    onMouseClick: onMagnifierMouseClick,
    onMouseEnter: onMagnifierMouseEnter,
    onMouseLeave: onMagnifierMouseLeave,
    onReset: onMagnifierMouseReset,
  } = useDropdownHoverClick({
    onDoubleClickedAction: () => {
      if (timelineThumbnailsDisplayedAmount < 8) {
        const updatedThumbnailsAmount = timelineThumbnailsDisplayedAmount + 2
        dispatch(
          updateTimelineThumbnailsDisplayedAmount(updatedThumbnailsAmount),
        )
      }
    },
  })

  const magnifierRef = useDetectClickOutside({
    onTriggered: () => onMagnifierMouseReset(),
  })

  const shouldMagnifierDropdownOpened = magnifierHovered || magnifierClicked

  const {
    hovered: musicAndSettingsHovered,
    clicked: musicAndSettingsClicked,
    onMouseClick: onMusicAndSettingstMouseClick,
    onMouseEnter: onMusicAndSettingstMouseEnter,
    onMouseLeave: onMusicAndSettingstMouseLeave,
    onReset: onMusicAndSettingstMouseRestet,
  } = useDropdownHoverClick({})

  const shouldDesignOptionDropdownOpened =
    musicAndSettingsHovered || musicAndSettingsClicked

  const musicAndSettings = useDetectClickOutside({
    onTriggered: () => onMusicAndSettingstMouseRestet(),
  })

  const renderBackgroundButton = () => {
    return (
      <DesktopTextButton
        $shouldShowSlideshowDropdown={shouldShowSlideshowDropdown}
        tooltip={
          isChangeBackgroundDisabled
            ? `Background can not be changed in ${StringHelper.caplitisedFirstLetterOfThemeName(
                slideshowData?.content?.theme!,
              )} theme`
            : `Change background image`
        }
        buttonType={
          isGuideWalkThroughHighlightedForSlideshow && currentStep === 3
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        disabled={isChangeBackgroundDisabled}
        onClick={() => {
          dispatch(
            openChangeBackgroundImageDrawer({
              productType: EulogiseProduct.SLIDESHOW,
              productId: slideshowData?.id,
            }),
          )
        }}
        noMarginRight
        icon={<StyledBackgroundIcon />}
      >
        Background
      </DesktopTextButton>
    )
  }

  const renderMusicSettingsButton = () => {
    return (
      <DesktopTextButton
        $shouldShowSlideshowDropdown={shouldShowSlideshowDropdown}
        buttonType={
          isGuideWalkThroughHighlightedForSlideshow && currentStep === 2
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        onClick={() => onMusicSettingsClick()}
        tooltip="Add or remove music"
        noMarginRight
        icon={<StyledMusicIcon />}
      >
        Music & Settings
      </DesktopTextButton>
    )
  }

  const renderBorderSettingsButton = () => (
    <DesktopTextButton
      $shouldShowSlideshowDropdown={shouldShowSlideshowDropdown}
      // tooltip="Change Border Settings"
      buttonType={
        borderSettings.enabled ||
        (isGuideWalkThroughHighlightedForSlideshow && currentStep === 3)
          ? ButtonType.HIGHLIGHTED_BUTTON
          : ButtonType.WHITE
      }
      onClick={() => {
        dispatch(
          updateSlideshow({
            slideshow: {
              // @ts-ignore
              content: {
                imageBorderSettings: {
                  enabled: !borderSettings.enabled,
                },
              },
            },
          }),
        )
      }}
      noMarginRight
      icon={<StyledBorderIcon />}
    >
      Borders
    </DesktopTextButton>
  )

  const renderBlackAndWhiteFilterButton = () => {
    const isActive = imageFilter === 'inkwell'

    return (
      <DesktopTextButton
        $shouldShowSlideshowDropdown={shouldShowSlideshowDropdown}
        buttonType={
          isActive ||
          (isGuideWalkThroughHighlightedForSlideshow && currentStep === 3)
            ? ButtonType.HIGHLIGHTED_BUTTON
            : ButtonType.WHITE
        }
        onClick={() => {
          dispatch(
            updateSlideshow({
              slideshow: {
                // @ts-ignore
                content: {
                  imageFilter: imageFilter !== 'inkwell' ? 'inkwell' : '',
                },
              },
            }),
          )
        }}
        noMarginRight
        // icon={<BnWDropIcon />}
        icon={<BnWDropIcon />}
      >
        B & W
      </DesktopTextButton>
    )
  }

  const renderResetButton = () => (
    <DesktopTextButton
      $shouldShowSlideshowDropdown={shouldShowSlideshowDropdown}
      // tooltip="Change Border Settings"
      buttonType={ButtonType.WHITE}
      onClick={() => {
        setIsShowResetConfirmModal(true)
      }}
      noMarginRight
      icon={<ResetIcon />}
    >
      Reset
    </DesktopTextButton>
  )

  const renderResponsiveSlider = () => {
    const onMagnifierSliderChange = (thumbnailSliderPercentage: number) => {
      const updatedThumbnailsAmount =
        SlideshowHelper.getTimelineDisplayedThumbnailsAmountByMagnifierPercentage(
          thumbnailSliderPercentage,
          isMobileScreenSize,
        )
      dispatch(updateTimelineThumbnailsDisplayedAmount(updatedThumbnailsAmount))
    }

    return (
      <StyledMagnifierDropdownContainer
        ref={magnifierRef}
        onMouseEnter={onMagnifierMouseEnter}
        onMouseLeave={onMagnifierMouseLeave}
      >
        <StyledMagnifierButton
          id="magnifier-button"
          buttonType={ButtonType.WHITE}
          disabled={false}
          noMarginRight
          onClick={() => onMagnifierMouseClick()}
          icon={<StyledMagnifierPlusIcon />}
        />
        {shouldMagnifierDropdownOpened && (
          <StyledMagnifierDropdownButtonContainer>
            <StyledTimelineMagnifierSlider
              isMobileScreenSize={isMobileScreenSize}
              onChange={onMagnifierSliderChange}
              value={SlideshowHelper.getTimelineMagnifierPercentageByDisplayedThumbnailsAmount(
                timelineThumbnailsDisplayedAmount,
                isMobileScreenSize,
              )}
            />
          </StyledMagnifierDropdownButtonContainer>
        )}
      </StyledMagnifierDropdownContainer>
    )
  }

  useEffect(() => {
    onMusicAndSettingstMouseRestet()
  }, [isNotDesktop])

  return (
    <StyledTimelinePanelHeader>
      <StyledAlert flex noBorderRightRadius padding={'16px 16px 16px 8px'}>
        <StyledAlertFull>
          <AlertLeft>
            {!shouldShowSlideshowDropdown && renderBackgroundButton()}
            <GuidePopover
              placedPage={GUIDE_SHOW_UP_PAGE.SLIDESHOW}
              showUpStepIndex={2}
              width={430}
            />
            {!shouldShowSlideshowDropdown && renderMusicSettingsButton()}
            {!shouldShowSlideshowDropdown && renderBorderSettingsButton()}
            {!shouldShowSlideshowDropdown && renderBlackAndWhiteFilterButton()}
            {!shouldShowSlideshowDropdown && renderResetButton()}
            {shouldShowSlideshowDropdown && (
              <StyledDesignOptionButtonGroupContainer
                ref={musicAndSettings}
                onMouseEnter={onMusicAndSettingstMouseEnter}
                onMouseLeave={onMusicAndSettingstMouseLeave}
              >
                <StyledDesignOptionButton
                  buttonType={ButtonType.WHITE}
                  noMarginRight
                  onClick={onMusicAndSettingstMouseClick}
                >
                  Music and Settings
                  <StyledDropdownArrowDownIconContainer>
                    {shouldDesignOptionDropdownOpened ? (
                      <StyledDropdownArrowUpIcon />
                    ) : (
                      <StyledDropdownArrowDownIcon />
                    )}
                  </StyledDropdownArrowDownIconContainer>
                </StyledDesignOptionButton>
                {shouldDesignOptionDropdownOpened && (
                  <StyledDesignOptionDropdownButtonContainer>
                    {renderBackgroundButton()}
                    {renderMusicSettingsButton()}
                    {renderBorderSettingsButton()}
                    {renderBlackAndWhiteFilterButton()}
                    {renderResetButton()}
                  </StyledDesignOptionDropdownButtonContainer>
                )}
              </StyledDesignOptionButtonGroupContainer>
            )}
            <GuidePopover
              placedPage={GUIDE_SHOW_UP_PAGE.SLIDESHOW}
              showUpStepIndex={3}
              width={430}
            />
            <GuidePopover
              placedPage={GUIDE_SHOW_UP_PAGE.SLIDESHOW}
              showUpStepIndex={1}
              width={430}
            />
            <GuidePopover
              placedPage={GUIDE_SHOW_UP_PAGE.SLIDESHOW}
              showUpStepIndex={4}
              width={430}
            />
            <EditTitleSlideButton
              $shouldShowSlideshowDropdown={false}
              buttonType={
                isGuideWalkThroughHighlightedForSlideshow && currentStep === 4
                  ? ButtonType.HIGHLIGHTED_BUTTON
                  : ButtonType.WHITE
              }
              $shouldShowWhiteText={
                isGuideWalkThroughHighlightedForSlideshow && currentStep === 4
              }
              onClick={onOpenStartEditTitleSlideClick}
              noMarginRight
              tooltip={
                startTitleSlide?.isTitleSlideEnable
                  ? 'Add title slide to the start of your video'
                  : 'Insert text slide to the end of your video'
              }
              $isTitleSlideEnabled={startTitleSlide?.isTitleSlideEnable!}
              icon={<StyledTitleIcon />}
            >
              Title Slides
            </EditTitleSlideButton>
            {isDev && (
              <EditTitleSlideButton
                buttonType={ButtonType.WHITE}
                onClick={() => {
                  dispatch(
                    updateSlideshow({
                      slideshow: {
                        // @ts-ignore
                        content: {
                          isVideoBier: !slideshowData?.content?.isVideoBier,
                        },
                      },
                    }),
                  )
                }}
              >
                Video Bier
              </EditTitleSlideButton>
            )}
          </AlertLeft>
          <AlertRight>
            <SlideshowInfoContainer>
              <SlideshowInfo size={TextSize.HEADING_EXTRA_SMALL}>
                <VideoDurationMessage
                  slideshowData={slideshowData!}
                  slideshowTheme={slideshowTheme!}
                  noTitle={true}
                />
              </SlideshowInfo>
              <SlideshowInfo>
                <StyledSeparator>|</StyledSeparator>
              </SlideshowInfo>
              <SlideshowInfo size={TextSize.HEADING_EXTRA_SMALL}>
                <NoOfSlidesMessage noOfSlides={noOfSlides} title={`Photos: `} />
              </SlideshowInfo>
            </SlideshowInfoContainer>
            {renderResponsiveSlider()}
          </AlertRight>
        </StyledAlertFull>
      </StyledAlert>
      <ConfirmModal
        isOpen={isShowResetConfirmModal}
        onConfirm={() => {
          dispatch(resetSlideshowAction())
          setIsShowResetConfirmModal(false)
        }}
        text="This will result the theme default settings and timings to your slideshow, are you sure you want to continue?"
        onClose={() => {
          setIsShowResetConfirmModal(false)
        }}
      />
    </StyledTimelinePanelHeader>
  )
}

export default TimelineHeader
