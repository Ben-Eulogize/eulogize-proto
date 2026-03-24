import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  ImageAnimationType,
  ISlideGroup,
  ISlideshowData,
  ISlideTransitionParams,
} from '@eulogise/core'
import SlideThumbnailPreview from '../../SlideshowTimeline/SlideThumbnailPreview'
import { SlideshowHelper } from '@eulogise/helpers'
import { Expandable } from '@eulogise/client-components'
import { Button, ButtonType, Select } from '@eulogise/client-components'
import { InputNumber, InputNumberProps } from 'antd'
import { EditSlideModalTransitionControl } from './EditSlideModalTransitionControl'
import { UtilHelper } from '@eulogise/helpers'
import { useIsDebug } from '../../../hooks/useIsDebug'
import { EulogiseModal } from '../../../components/Modal/EulogiseModal'

type IEditSlideModalProps = {
  onClose: () => void
  onOpen?: () => void
  onApply: ({
    transitionIn,
    transitionOut,
    animation,
  }: ISlideTransitionParams) => void
  slideGroup?: ISlideGroup
  caseId: string
  slideshowData: ISlideshowData
}

const EditSlideControls = styled.div`
  display: flex;
`

const TRANSITION_IN_OPTIONS: Array<{
  label: string
  value: ImageAnimationType
}> = [
  { label: 'None', value: 'noneIn' },
  { label: 'Blur', value: 'blurIn' },
  { label: 'Dissolve', value: 'fadeIn' },
  { label: 'Flash', value: 'flashIn' },
  { label: 'Slide Down', value: 'slideDownIn' },
  { label: 'Slide Up', value: 'slideUpIn' },
  { label: 'Slide Left', value: 'slideLeftIn' },
  { label: 'Slide Right', value: 'slideRightIn' },
  { label: 'Warp', value: 'warpRightIn' },
  { label: 'Wipe', value: 'wipeLeftIn' },
]

const TRANSITION_OUT_OPTIONS: Array<{
  label: string
  value: ImageAnimationType
}> = [
  { label: 'None', value: 'noneOut' },
  { label: 'Blur', value: 'blurOut' },
  { label: 'Dissolve', value: 'fadeOut' },
  { label: 'Dissolve & Zoom', value: 'fadeOutZoomIn' },
  { label: 'Flash', value: 'flashOut' },
  { label: 'Slide Down', value: 'slideDownOut' },
  { label: 'Slide Up', value: 'slideUpOut' },
  { label: 'Slide Left', value: 'slideLeftOut' },
  { label: 'Slide Right', value: 'slideRightOut' },
  { label: 'Warp', value: 'warpRightOut' },
  { label: 'Wipe', value: 'wipeLeftOut' },
]

const ANIMATIONS_OPTIONS: Array<{
  label: string
  value: ImageAnimationType
}> = [
  { label: 'None', value: 'none' },
  { label: 'Slide Right', value: 'slideRight' },
  { label: 'Slide Left', value: 'slideLeft' },
  { label: 'Slide Up', value: 'slideUp' },
  { label: 'Slide Down', value: 'slideDown' },
  { label: 'Zoom In', value: 'zoomIn' },
  { label: 'Zoom Out', value: 'zoomOut' },
]

const StyledSelect = styled(Select)`
  width: 100%;
`

const EditSlideFooter = styled.div`
  display: flex;
`

const ModalTitle = styled.div`
  padding-right: 26px;
`

const EditSlideControlItem = styled.div`
  flex: 1;
  padding: 0.5rem 0.25rem 0;
`

const StyledInput = styled(InputNumber).attrs({
  addonAfter: 'sec',
  min: 0,
})`
  margin-top: 0;
`

const MilliSecondsToSecondInputNumber = ({
  decimalPlaces = 1,
  ...props
}: InputNumberProps & { decimalPlaces?: number }) => {
  const value = props.value ? (props.value as number) / 1000 : undefined
  return (
    <StyledInput
      {...props}
      step={0.1}
      precision={1}
      value={value?.toFixed(decimalPlaces)}
      onChange={(duration) => {
        const durationValue =
          duration !== undefined
            ? parseFloat(((duration as number) * 1000).toFixed(decimalPlaces))
            : undefined
        props.onChange(durationValue)
      }}
    />
  )
}

const defaultTransitionValues = {
  duration: 2000,
  delay: 1000,
}

const StyledExpandable = styled(Expandable)`
  padding: 1rem 0.25rem 0;
`

const LeftButtonContainer = styled.div`
  flex: 1;
  text-align: left;
`

const RightButtonContainer = styled.div``

export const EditSlideModal = ({
  onClose,
  onOpen,
  slideGroup,
  caseId,
  slideshowData,
  slideshowTheme,
  onApply,
}: IEditSlideModalProps) => {
  const isDebug = useIsDebug()
  const [isOpenAdvancedSettings, setIsOpenAdvancedSettings] =
    useState<boolean>(false)
  const contentRef = useRef()
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>()
  const [thumbnailWidth, setThumbnailWidth] = useState<number>(0)
  const slideIndex = slideGroup?.imageSlideIndex

  const slideImage =
    slideIndex !== undefined
      ? SlideshowHelper.getSlideImage({
          slideshowData,
          slideshowTheme,
          slide: slideGroup?.imageSlide!,
          slideIndex,
        })
      : undefined

  const defaultTransitionParams = {
    transitionIn: slideImage?.transitionIn,
    transitionOut: slideImage?.transitionOut,
    animation: slideImage?.animation,
    slideDuration:
      slideIndex !== undefined
        ? SlideshowHelper.getTotalSlideDuration({
            slideshowData,
            slideshowTheme,
            imageSlideIndex: slideIndex,
          })
        : undefined,
  }

  const [transitionParams, setTransitionParams] =
    useState<ISlideTransitionParams>(defaultTransitionParams)

  const isStartTitleSlide = slideIndex === 1
  const isEndTitleSlide = slideGroup?.id === 'end-title-slide'
  const isOpen = !!slideGroup

  useEffect(() => {
    if (contentRef.current && thumbnailWidth === 0) {
      setThumbnailWidth((contentRef.current as any)?.clientWidth)
    }
  }, [isOpen, thumbnailWidth])

  const updateTransitionParamsObject = (data: any) => {
    setTransitionParams(UtilHelper.mergeDeepRight(transitionParams, data))
  }
  const updateTransitionParams = (key: string, data: any) => {
    setTransitionParams(UtilHelper.setObject(key, data, transitionParams))
  }

  const transitionInDuration = transitionParams.transitionIn?.duration
  const transitionInDelay = transitionParams.transitionIn?.delay
  const transitionOutDuration = transitionParams.transitionOut?.duration
  const transitionOutDelay = transitionParams.transitionOut?.delay
  const slideDuration = transitionParams.slideDuration
  return (
    <EulogiseModal
      title={<ModalTitle>Edit Slide</ModalTitle>}
      isOpen={isOpen}
      onCloseClick={onClose}
      onOpen={onOpen}
      closeButtonText="Cancel"
      footer={
        <EditSlideFooter>
          <LeftButtonContainer>
            <Button
              buttonType={ButtonType.TRANSPARENT}
              onClick={() => {
                setTransitionParams(defaultTransitionParams)
              }}
            >
              Reset
            </Button>
          </LeftButtonContainer>
          <RightButtonContainer>
            {!isPlayingPreview ? (
              <Button
                buttonType={ButtonType.TRANSPARENT}
                onClick={() => {
                  setIsPlayingPreview(true)
                }}
              >
                Preview
              </Button>
            ) : (
              <Button
                buttonType={ButtonType.TRANSPARENT}
                onClick={() => {
                  setIsPlayingPreview(false)
                }}
              >
                Stop Preview
              </Button>
            )}
            <Button
              onClick={() => {
                onApply(transitionParams)
              }}
            >
              Apply
            </Button>
          </RightButtonContainer>
        </EditSlideFooter>
      }
    >
      <div ref={contentRef}>
        <SlideThumbnailPreview
          width={thumbnailWidth ? `${thumbnailWidth}px` : undefined}
          onMouseEnter={() => console.log('mouseenter')}
          onMouseLeave={() => console.log('mouseleave')}
          slide={slideGroup?.imageSlide!}
          isTitleSlide={isStartTitleSlide}
          isEndTitleSide={isEndTitleSlide}
          caseId={caseId}
          slideIndex={slideIndex}
          slideshowData={slideshowData}
          imageTransitionParams={transitionParams}
          isPlayOnHover={false}
          onStop={() => setIsPlayingPreview(false)}
          isPlay={isPlayingPreview}
        />

        <EditSlideControls>
          <EditSlideControlItem>
            <EditSlideModalTransitionControl label="Transition In">
              <StyledSelect
                value={transitionParams.transitionIn?.type}
                onChange={(type: string) => {
                  updateTransitionParamsObject({
                    transitionIn: {
                      ...defaultTransitionValues,
                      type,
                    },
                  })
                }}
                options={TRANSITION_IN_OPTIONS}
              />
            </EditSlideModalTransitionControl>
            {isOpenAdvancedSettings && (
              <>
                <EditSlideModalTransitionControl label="Transition Duration">
                  <MilliSecondsToSecondInputNumber
                    placeholder={transitionInDuration?.toString()}
                    value={transitionInDuration}
                    onChange={(duration) => {
                      updateTransitionParams('transitionIn.duration', duration)
                    }}
                  />
                </EditSlideModalTransitionControl>
                <EditSlideModalTransitionControl label="Transition Delay">
                  <MilliSecondsToSecondInputNumber
                    placeholder={transitionInDelay?.toString()}
                    value={transitionInDelay}
                    onChange={(delay) => {
                      updateTransitionParams('transitionIn.delay', delay)
                    }}
                  />
                </EditSlideModalTransitionControl>
              </>
            )}
          </EditSlideControlItem>
          <EditSlideControlItem>
            <EditSlideModalTransitionControl label="Transition Out">
              <StyledSelect
                value={transitionParams.transitionOut?.type}
                onChange={(type: string) => {
                  updateTransitionParamsObject({
                    transitionOut: {
                      ...defaultTransitionValues,
                      type,
                    },
                  })
                }}
                options={TRANSITION_OUT_OPTIONS}
              />
            </EditSlideModalTransitionControl>
            {isOpenAdvancedSettings && (
              <EditSlideModalTransitionControl label="Transition Duration">
                <MilliSecondsToSecondInputNumber
                  placeholder={transitionOutDuration?.toString()}
                  value={transitionOutDuration}
                  onChange={(duration) => {
                    updateTransitionParams('transitionOut.duration', duration)
                  }}
                />
              </EditSlideModalTransitionControl>
            )}
            {isDebug && isOpenAdvancedSettings && (
              <EditSlideModalTransitionControl label="Transition Delay">
                <MilliSecondsToSecondInputNumber
                  placeholder={transitionOutDelay?.toString()}
                  value={transitionOutDelay}
                  onChange={(delay) => {
                    updateTransitionParams('transitionOut.delay', delay)
                  }}
                />
              </EditSlideModalTransitionControl>
            )}
          </EditSlideControlItem>
          <EditSlideControlItem>
            <EditSlideModalTransitionControl label="Animation">
              <StyledSelect
                value={transitionParams.animation}
                onChange={(type: string) => {
                  updateTransitionParams('animation', type)
                }}
                options={ANIMATIONS_OPTIONS}
              />
            </EditSlideModalTransitionControl>
            {isOpenAdvancedSettings && (
              <EditSlideModalTransitionControl label="Total Slide Duration">
                <MilliSecondsToSecondInputNumber
                  placeholder={slideDuration?.toString()}
                  value={slideDuration}
                  onChange={(type) => {
                    updateTransitionParams('slideDuration', type)
                  }}
                />
              </EditSlideModalTransitionControl>
            )}
          </EditSlideControlItem>
        </EditSlideControls>
        <StyledExpandable
          isExpanded={isOpenAdvancedSettings}
          expandText="Advanced Controls"
          collapseText="Advanced Controls"
          onClick={() => setIsOpenAdvancedSettings(!isOpenAdvancedSettings)}
        />
      </div>
    </EulogiseModal>
  )
}
