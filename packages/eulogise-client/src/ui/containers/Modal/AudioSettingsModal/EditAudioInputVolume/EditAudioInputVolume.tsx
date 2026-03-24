import React from 'react'
import styled from 'styled-components'
import { InputNumber } from 'antd'
import { AUDIO_TRIMER_PRECISION, AUDIO_TRIMER_FIELD } from '@eulogise/core'

const StyledInputText = styled.div``

const StyledInputVolumeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
`

const StyledInpuVolumeComponentContainer = styled.div`
  border-bottom: 1px solid black;
`

const StyledInputNumberComponent = styled(InputNumber)`
  .ant-input-number-input {
    padding: 0;
    text-align: center;
  }
  ${({ width }: { width: string }) => width && `width: ${width};`}
`

interface IEditAudioInputVolumeProps {
  inputText: string
  onChange: (value: any, fieldName: any, precision: any) => void
}

const EditAudioInputVolume = ({
  inputText,
  onChange,
}: IEditAudioInputVolumeProps) => {
  return (
    <StyledInputVolumeContainer>
      <StyledInputText>{inputText}</StyledInputText>
      <StyledInpuVolumeComponentContainer>
        <StyledInputNumberComponent
          defaultValue={100}
          min={0}
          max={100}
          formatter={(value: any) => `${value}%`}
          parser={(value: any) => value!.replace('%', '')}
          bordered={false}
          controls={false}
          onChange={(value) =>
            onChange(
              value,
              AUDIO_TRIMER_FIELD.VOLUME_PERCENTAGE,
              AUDIO_TRIMER_PRECISION.PERCENTAGE,
            )
          }
          width={'70px'}
        />
      </StyledInpuVolumeComponentContainer>
    </StyledInputVolumeContainer>
  )
}

export default EditAudioInputVolume
