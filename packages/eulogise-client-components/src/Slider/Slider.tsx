import React from 'react'
import styled from 'styled-components'

import { Slider as AntSlider, SliderSingleProps } from 'antd'
import type { SliderRangeProps } from 'antd/lib/slider/index'
import { DateTimeHelper } from '@eulogise/helpers'

type ISliderSingleProps = (
  | Omit<SliderSingleProps, 'tooltip' & 'tipFormatter'>
  | Omit<SliderRangeProps, 'tooltip' & 'tipFormatter'>
) & {
  tooltipVisible?: boolean
}

// @ts-ignore
const StyledSlider = styled(AntSlider)``

export const Slider: React.FunctionComponent<ISliderSingleProps> = ({
  tooltipVisible,
  ...sliderProps
}) => (
  <StyledSlider
    {...sliderProps}
    tooltip={{ open: !!tooltipVisible }}
    tipFormatter={(value: number) =>
      DateTimeHelper.formatInSeconds(value * 1000)
    }
  />
)
