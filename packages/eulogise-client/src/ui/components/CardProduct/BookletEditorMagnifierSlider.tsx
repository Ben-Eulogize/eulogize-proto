import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Slider } from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'

interface IBookletEditorMagnifierSlider {
  value: number
  onChange: (value: number) => void
}

const StyledMagnifierSlider = styled.div`
  display: flex;
  align-items: center;
`

const StyledSlider = styled(Slider)``

const SliderContainer = styled.div`
  padding-top: 16px;
  width: 200px;
`

const BookletEditorMagnifierSlider: React.FC<IBookletEditorMagnifierSlider> = ({
  value,
  onChange,
}) => {
  const displayMarks = {
    0: 'Fit',
    25: '+1',
    50: '+2',
    100: 'Max',
  }
  const marks = useMemo(() => displayMarks, [displayMarks])
  return (
    <StyledMagnifierSlider>
      <SliderContainer>
        <StyledSlider
          step={1}
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

export default BookletEditorMagnifierSlider
