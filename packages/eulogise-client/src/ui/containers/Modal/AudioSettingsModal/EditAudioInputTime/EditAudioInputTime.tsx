import React from 'react'
import styled from 'styled-components'
import { InputNumber } from 'antd'
import { AUDIO_TRIMER_PRECISION } from '@eulogise/core'

const StyledEditAudioInputTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
`

const StyledEditAudioInputTimeComponentContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`

const StyledInputText = styled.div``

const StyledEditAudioInputTimeComponent = styled(InputNumber)`
  padding: 0;
  .ant-input-number-input {
    padding: 0;
    text-align: center;
  }

  ${({ width }: { width: string }) => width && `width: ${width};`}
`

const StyledEditAudioTimeSeparator = styled.div`
  margin-top: 3px;
`

interface IEditAudioInputTimeProps {
  inputText: string
  onChange: (value: any, precision: any) => void
}

const onKeyDownNumberInputOnly = (
  e: React.KeyboardEvent<HTMLInputElement>,
): void => {
  let _code = e.keyCode
  if ((_code < 48 || _code > 57) && _code != 190 && _code != 8) {
    e.preventDefault()
    return
  }
  return
}

const getInputTimeFormatter = (value: string, inputName: string): string => {
  switch (inputName) {
    case AUDIO_TRIMER_PRECISION.MIN:
      if (parseInt(value) === 0) {
        return `0`
      }
      return value
    case AUDIO_TRIMER_PRECISION.SEC:
      if (parseInt(value) === 0) {
        return `00`
      } else if (value.length === 1) {
        return `0${value}`
      }
      return value
    case AUDIO_TRIMER_PRECISION.MS:
      if (parseInt(value) === 0) {
        return `000`
      } else if (value.length === 1) {
        return `00${value}`
      } else if (value.length === 2) {
        return `0${value}`
      }
      return value
    default:
      return value
  }
}

const getInputTimeParser = (value: string, inputName: string): string => {
  return value
}

const EditAudioInputTime = ({
  inputText,
  onChange,
}: IEditAudioInputTimeProps) => {
  return (
    <StyledEditAudioInputTimeContainer>
      <StyledInputText>{inputText}</StyledInputText>

      <StyledEditAudioInputTimeComponentContainer>
        <StyledEditAudioInputTimeComponent
          key={AUDIO_TRIMER_PRECISION.MIN}
          defaultValue={0}
          min={0}
          max={59}
          formatter={(value: any) =>
            getInputTimeFormatter(value, AUDIO_TRIMER_PRECISION.MIN)
          }
          parser={(value: any) =>
            getInputTimeParser(value, AUDIO_TRIMER_PRECISION.MIN)
          }
          bordered={false}
          controls={false}
          onChange={(value) => onChange(value, AUDIO_TRIMER_PRECISION.MIN)}
          width={'16px'}
          onKeyDown={(e) => onKeyDownNumberInputOnly(e)}
        />

        <StyledEditAudioTimeSeparator>:</StyledEditAudioTimeSeparator>

        <StyledEditAudioInputTimeComponent
          key={AUDIO_TRIMER_PRECISION.SEC}
          defaultValue={0}
          min={0}
          max={99}
          formatter={(value: any) =>
            getInputTimeFormatter(value, AUDIO_TRIMER_PRECISION.SEC)
          }
          parser={(value: any) =>
            getInputTimeParser(value, AUDIO_TRIMER_PRECISION.SEC)
          }
          bordered={false}
          controls={false}
          onChange={(value) => {
            onChange(value, AUDIO_TRIMER_PRECISION.SEC)
          }}
          width={'20px'}
          onKeyDown={(e) => onKeyDownNumberInputOnly(e)}
        />

        <StyledEditAudioTimeSeparator>:</StyledEditAudioTimeSeparator>

        <StyledEditAudioInputTimeComponent
          key={AUDIO_TRIMER_PRECISION.MS}
          defaultValue={0}
          min={0}
          max={999}
          formatter={(value: any) =>
            getInputTimeFormatter(value, AUDIO_TRIMER_PRECISION.MS)
          }
          parser={(value: any) =>
            getInputTimeParser(value, AUDIO_TRIMER_PRECISION.MS)
          }
          bordered={false}
          controls={false}
          onChange={(value) => onChange(value, AUDIO_TRIMER_PRECISION.MS)}
          width={'30px'}
          onKeyDown={(e) => onKeyDownNumberInputOnly(e)}
        />
      </StyledEditAudioInputTimeComponentContainer>
    </StyledEditAudioInputTimeContainer>
  )
}

export default EditAudioInputTime
