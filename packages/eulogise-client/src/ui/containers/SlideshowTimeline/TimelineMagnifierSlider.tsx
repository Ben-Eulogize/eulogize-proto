import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Slider } from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'

interface ITimelineMagnifierSlider {
  value: number
  onChange: (value: number) => void
  isMobileScreenSize: boolean
}

const StyledMagnifierSlider = styled.div`
  display: flex;
  align-items: center;
`

const StyledSlider = styled(Slider)``

const SliderContainer = styled.div`
  width: 200px;
  position: relative;
  left: -165px;
  background: ${COLOR.PASTEL_BLUE};
  padding: 16px 16px 0 16px;
  border-radius: 10px;
`

const DESKTOP_TIMELINE_DISPLAY_MARKS = {
  0: '2',
  33: '4',
  67: '6',
  100: '8',
}

const MOBILE_TIMELINE_DISPLAY_MARKS = {
  0: '1',
  100: '3',
}

const TimelineMagnifierSlider: React.FC<ITimelineMagnifierSlider> = ({
  value,
  onChange,
  isMobileScreenSize = false,
}) => {
  const displayMarks = isMobileScreenSize
    ? MOBILE_TIMELINE_DISPLAY_MARKS
    : DESKTOP_TIMELINE_DISPLAY_MARKS
  const marks = useMemo(() => displayMarks, [displayMarks])
  return (
    <StyledMagnifierSlider>
      <SliderContainer>
        <StyledSlider
          step={null}
          defaultValue={50}
          marks={marks}
          value={value}
          tooltipVisible={false}
          onChange={onChange}
          trackStyle={{ backgroundColor: COLOR.DARK_BLUE }}
        />
      </SliderContainer>
    </StyledMagnifierSlider>
  )
}

export default TimelineMagnifierSlider
