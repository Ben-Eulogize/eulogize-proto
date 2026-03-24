import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  OnOffSwitchButton,
} from '@eulogise/client-components'
import { Select, SelectOption } from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  CardProductHelper,
  NavigationHelper,
  UtilHelper,
} from '@eulogise/helpers'
import { showUnsavedChangesConfirmModal } from '../../store/ModalState/actions'
import {
  EulogisePage,
  EulogiseProduct,
  ICardProductState,
  ImageAnimationType,
  ITitleSlideTransition,
  PAGE_SIZES,
} from '@eulogise/core'
import {
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
  useTvWelcomeScreenState,
} from '../../store/hooks'
import { useIsDebug } from '../../hooks/useIsDebug'

const ACTION_CONTAINER_SIZE = 33
export const BASED_TITLE_SLIDE_CONTROL_PANEL_CONTAINER_HEIGHT = 372
export const TITLE_SLIDE_CONTROL_MIN_SCALED_FACTOR = 0.75

const StyledTitleSlideControlPanel = styled.div<{
  $titleSlidePanelScaleFactor: number
}>`
  border: 1px solid ${COLOR.PRIMARY};
  width: ${PAGE_SIZES.TV_WELCOME_SCREEN[0] + ACTION_CONTAINER_SIZE * 2}px;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 1.4rem;
  ${({ $titleSlidePanelScaleFactor }) =>
    $titleSlidePanelScaleFactor &&
    `
    scale: ${
      $titleSlidePanelScaleFactor > TITLE_SLIDE_CONTROL_MIN_SCALED_FACTOR
        ? $titleSlidePanelScaleFactor
        : TITLE_SLIDE_CONTROL_MIN_SCALED_FACTOR
    };
    transform-origin: top;
`}
`

export type TitleSlideControlPanelProps = {
  isStartTitleSlideEnabled: boolean
  isEndTitleSlideEnabled: boolean
  titleSlideTransition: ITitleSlideTransition
  endTitleSlideTransition: ITitleSlideTransition
}

type ITitleSlideControlPanelProps = TitleSlideControlPanelProps & {
  slideshowId: string
  onChange: ({
    isStartTitleSlideEnabled,
    isEndTitleSlideEnabled,
    titleSlideTransition,
    endTitleSlideTransition,
  }: TitleSlideControlPanelProps) => void
  onNavigationLeave: () => void
  titleSlidePanelScaleFactor: number
}

const StyledRow = styled(Row)`
  justify-content: space-between;
  margin-bottom: calc(${STYLE.GUTTER} / 2);
`

const StyledSelect = styled(Select)`
  width: 12rem;
`

const LabelCol = styled(Col)`
  font-size: ${STYLE.FONT_SIZE_MD};
  flex: 1;
`

const SubLabelCol = styled(LabelCol)`
  padding-left: ${STYLE.GUTTER};
`

export const TitleSlideControlPanel = ({
  slideshowId,
  isStartTitleSlideEnabled,
  isEndTitleSlideEnabled,
  titleSlideTransition,
  endTitleSlideTransition,
  onChange,
  onNavigationLeave,
  titleSlidePanelScaleFactor = 1,
}: ITitleSlideControlPanelProps) => {
  const isDebug = useIsDebug()
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeSlideshow } = useSlideshowState()
  const { activeItem: activeCase } = useCaseState()
  const { activeItem: tvWelcomeScreenData }: ICardProductState =
    useTvWelcomeScreenState()
  const isSlideshowGenerating = CardProductHelper.isProcessing(
    activeSlideshow?.fileStatus,
  )
  const region = activeCase?.region

  const updateField = (props: Partial<TitleSlideControlPanelProps>) => {
    onChange(
      UtilHelper.mergeDeepRight(
        {
          isStartTitleSlideEnabled,
          isEndTitleSlideEnabled,
          titleSlideTransition,
          endTitleSlideTransition,
        },
        props,
      ),
    )
  }

  return (
    <StyledTitleSlideControlPanel
      $titleSlidePanelScaleFactor={titleSlidePanelScaleFactor}
    >
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            noMarginRight
            buttonType={ButtonType.TRANSPARENT}
            disabled={isSlideshowGenerating}
            onClick={() => {
              onNavigationLeave()
              NavigationHelper.navigate(
                EulogisePage.EDIT_SLIDESHOW,
                {
                  slideshowId,
                },
                null,
                false,
                () =>
                  dispatch(
                    showUnsavedChangesConfirmModal({
                      editingProduct: EulogiseProduct.TV_WELCOME_SCREEN,
                      unsavedProductState: tvWelcomeScreenData,
                      page: EulogisePage.EDIT_SLIDESHOW,
                      region: region!,
                    }),
                  ),
              )
            }}
          >
            Back to slideshow
          </Button>
        </Col>
      </Row>
      <StyledRow>
        <LabelCol>Use as video title slide</LabelCol>
        <Col>
          <OnOffSwitchButton
            onClick={() => {
              updateField({
                isStartTitleSlideEnabled: !isStartTitleSlideEnabled,
              })
            }}
            checked={isStartTitleSlideEnabled}
          />
        </Col>
      </StyledRow>
      {isStartTitleSlideEnabled && (
        <>
          <StyledRow>
            <SubLabelCol>Transition In</SubLabelCol>
            <Col>
              <StyledSelect
                value={titleSlideTransition?.in?.type}
                onChange={(v) => {
                  updateField({
                    titleSlideTransition: {
                      in: {
                        type: v as ImageAnimationType,
                      },
                    },
                  })
                }}
              >
                <SelectOption value="none">None</SelectOption>
                <SelectOption value="fadeIn">Fade From White</SelectOption>
                <SelectOption value="fadeInBlack">Fade From Black</SelectOption>
              </StyledSelect>
            </Col>
          </StyledRow>
          <StyledRow>
            <SubLabelCol>Transition Out</SubLabelCol>
            <Col>
              <StyledSelect
                value={titleSlideTransition?.out?.type}
                onChange={(v) => {
                  updateField({
                    titleSlideTransition: {
                      out: {
                        type: v as ImageAnimationType,
                      },
                    },
                  })
                }}
              >
                <SelectOption value="noneOut">None</SelectOption>
                <SelectOption value="fadeOut">Dissolve</SelectOption>
                {/* remove below for prod */}
                {isDebug && (
                  <>
                    {' '}
                    <SelectOption value="fadeOutZoomIn">
                      Dissolve & Zoom
                    </SelectOption>
                    <SelectOption value="slideDownOut">Slide Down</SelectOption>
                    <SelectOption value="slideUpOut">Slide Up</SelectOption>
                    <SelectOption value="slideRightOut">
                      Slide Right
                    </SelectOption>
                    <SelectOption value="slideLeftOut">Slide Left</SelectOption>
                    <SelectOption value="flashOut">Flash</SelectOption>
                    <SelectOption value="warpRightOut">Warp</SelectOption>
                    <SelectOption value="wipeLeftOut">Wipe</SelectOption>
                    <SelectOption value="zoomOut">Zoom</SelectOption>
                  </>
                )}
              </StyledSelect>
            </Col>
          </StyledRow>
        </>
      )}
      <StyledRow style={{ marginTop: STYLE.GUTTER }}>
        <LabelCol>Use as video end slide</LabelCol>
        <Col>
          <OnOffSwitchButton
            onClick={() => {
              updateField({
                isEndTitleSlideEnabled: !isEndTitleSlideEnabled,
              })
            }}
            checked={isEndTitleSlideEnabled}
          />
        </Col>
      </StyledRow>
      {isEndTitleSlideEnabled && (
        <>
          <StyledRow>
            <SubLabelCol>Transition In</SubLabelCol>
            <Col>
              <StyledSelect
                value={endTitleSlideTransition?.in?.type}
                onChange={(v) => {
                  updateField({
                    endTitleSlideTransition: {
                      in: {
                        type: v as ImageAnimationType,
                      },
                    },
                  })
                }}
              >
                <SelectOption value="noneIn">None</SelectOption>
                <SelectOption value="fadeIn">Dissolve</SelectOption>
                {/* remove below for prod */}
                {isDebug && (
                  <>
                    <SelectOption value="slideDownIn">Slide Down</SelectOption>
                    <SelectOption value="slideUpIn">Slide Up</SelectOption>
                    <SelectOption value="slideRightIn">
                      Slide Right
                    </SelectOption>
                    <SelectOption value="slideLeftIn">Slide Left</SelectOption>
                    <SelectOption value="flashIn">Flash</SelectOption>
                    <SelectOption value="warpRightIn">Warp</SelectOption>
                    <SelectOption value="wipeLeftIn">Wipe</SelectOption>
                    <SelectOption value="zoomIn">Zoom</SelectOption>
                  </>
                )}
              </StyledSelect>
            </Col>
          </StyledRow>
          <StyledRow>
            <SubLabelCol>Transition Out</SubLabelCol>
            <Col>
              <StyledSelect
                value={endTitleSlideTransition?.out?.type}
                onChange={(v) => {
                  updateField({
                    endTitleSlideTransition: {
                      out: {
                        type: v as ImageAnimationType,
                      },
                    },
                  })
                }}
              >
                <SelectOption value="none">None</SelectOption>
                <SelectOption value="fadeOut">Fade To White</SelectOption>
                <SelectOption value="fadeOutBlack">Fade To Black</SelectOption>
              </StyledSelect>
            </Col>
          </StyledRow>
        </>
      )}
    </StyledTitleSlideControlPanel>
  )
}
