import React, { useState } from 'react'
import styled from 'styled-components'
import {
  FormContext,
  Button,
  ButtonType,
  Spin,
} from '@eulogise/client-components'
import {
  AUDIO_TRIMER_PRECISION,
  AUDIO_TRIMER_FIELD,
  IAudioAsset,
} from '@eulogise/core'

import EditAudioInputTime from '../EditAudioInputTime/EditAudioInputTime'
import EditAudioInputVolume from '../EditAudioInputVolume/EditAudioInputVolume'
import useEditAudio from '../../../../hooks/useEditAudio'
import { DateTimeHelper } from '@eulogise/helpers'
interface IEditAudioFormProps {
  editAudio: IAudioAsset
  formRef: any
  originalSongDuration: number
  playingAudioInAudioLists: Array<IAudioAsset>
  onCloseAudioEditor: () => void
  clearAllPlayingAudios: () => void
}

interface IEditAudioFormFields {
  volumePercentage: number
  trimFromStart: Record<string, number>
  trimFromEnd: Record<string, number>
  fadeUpAtStart: Record<string, number>
  fadeDownAtEnd: Record<string, number>
  addSlienceAtStart: Record<string, number>
  addSlienceAtEnd: Record<string, number>
}

const StyledClientCreateCaseForm = styled.form`
  margin: 20px 0 0 0;
`

const StyledButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 35px 0 15px 0;
`

const StyledEditedSongLengthText = styled.div<{
  $isValid?: boolean
}>`
  margin: 20px 0 0 0;
  ${({ $isValid }) =>
    $isValid
      ? ``
      : `
    color: red;
  `}
`

const StyledWarningLengthText = styled.div<{
  $isValid?: boolean
}>`
  margin: 20px 0 20px 0;
  ${({ $isValid }) =>
    $isValid
      ? ``
      : `
    color: red;
  `}
`

const StyledLoadingSongContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledSpinningLoader = styled(Spin)`
  margin: 40px 0 30px 0;
  float: left;
`

const StyledTimeUnitText = styled.div`
  margin: 8px 0 4px 0;
  text-align: end;
`

const inputTimerFieldToSeconds = (
  min: number,
  sec: number,
  ms: number,
): number => {
  return min * 60 + sec + ms / 1000
}

const inputTimerFieldToMilliseconds = (
  min: number,
  sec: number,
  ms: number,
): number => {
  return min * 60 * 1000 + sec * 1000 + ms
}

const isTrimmedDurationLessThenOriginalTrack = (
  originalSongDuration: number,
  {
    trimFromStartMin = 0,
    trimFromStartSec = 0,
    trimFromStartMs = 0,
    trimFromEndMin = 0,
    trimFromEndSec = 0,
    trimFromEndMs = 0,
  }: {
    trimFromStartMin: number
    trimFromStartSec: number
    trimFromStartMs: number
    trimFromEndMin: number
    trimFromEndSec: number
    trimFromEndMs: number
  },
): boolean => {
  const trimFromStartDuration: number = inputTimerFieldToMilliseconds(
    trimFromStartMin,
    trimFromStartSec,
    trimFromStartMs,
  )
  const trimFromEndDuration: number = inputTimerFieldToMilliseconds(
    trimFromEndMin,
    trimFromEndSec,
    trimFromEndMs,
  )
  if (!originalSongDuration || originalSongDuration === 0) {
    return false
  }
  if (trimFromStartDuration + trimFromEndDuration >= originalSongDuration) {
    return false
  }
  return true
}

const isFadeUpDownDurationLessThanEditedTrack = (
  editedAudioDuration: number,
  {
    fadeUpAtStartMin = 0,
    fadeUpAtStartSec = 0,
    fadeUpAtStartMs = 0,
    fadeDownAtEndMin = 0,
    fadeDownAtEndSec = 0,
    fadeDownAtEndMs = 0,
  }: {
    fadeUpAtStartMin: number
    fadeUpAtStartSec: number
    fadeUpAtStartMs: number
    fadeDownAtEndMin: number
    fadeDownAtEndSec: number
    fadeDownAtEndMs: number
  },
): boolean => {
  const fadeUpAtStartDuration: number = inputTimerFieldToMilliseconds(
    fadeUpAtStartMin,
    fadeUpAtStartSec,
    fadeUpAtStartMs,
  )
  const fadeDownAtEndDuration: number = inputTimerFieldToMilliseconds(
    fadeDownAtEndMin,
    fadeDownAtEndSec,
    fadeDownAtEndMs,
  )
  if (!editedAudioDuration || editedAudioDuration === 0) {
    return false
  }
  if (fadeUpAtStartDuration + fadeDownAtEndDuration >= editedAudioDuration) {
    return false
  }
  return true
}

const EditAudioForm: React.FC<IEditAudioFormProps> = ({
  editAudio,
  formRef,
  originalSongDuration,
  playingAudioInAudioLists,
  clearAllPlayingAudios,
  onCloseAudioEditor,
}) => {
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const [fields, setFields] = useState<IEditAudioFormFields>({
    volumePercentage: 100,
    trimFromStart: {
      [AUDIO_TRIMER_PRECISION.MIN]: 0,
      [AUDIO_TRIMER_PRECISION.SEC]: 0,
      [AUDIO_TRIMER_PRECISION.MS]: 0,
    },
    trimFromEnd: {
      [AUDIO_TRIMER_PRECISION.MIN]: 0,
      [AUDIO_TRIMER_PRECISION.SEC]: 0,
      [AUDIO_TRIMER_PRECISION.MS]: 0,
    },
    fadeUpAtStart: {
      [AUDIO_TRIMER_PRECISION.MIN]: 0,
      [AUDIO_TRIMER_PRECISION.SEC]: 0,
      [AUDIO_TRIMER_PRECISION.MS]: 0,
    },
    fadeDownAtEnd: {
      [AUDIO_TRIMER_PRECISION.MIN]: 0,
      [AUDIO_TRIMER_PRECISION.SEC]: 0,
      [AUDIO_TRIMER_PRECISION.MS]: 0,
    },
    addSlienceAtStart: {
      [AUDIO_TRIMER_PRECISION.MIN]: 0,
      [AUDIO_TRIMER_PRECISION.SEC]: 0,
      [AUDIO_TRIMER_PRECISION.MS]: 0,
    },
    addSlienceAtEnd: {
      [AUDIO_TRIMER_PRECISION.MIN]: 0,
      [AUDIO_TRIMER_PRECISION.SEC]: 0,
      [AUDIO_TRIMER_PRECISION.MS]: 0,
    },
  })

  const [editedAudioDuration, setEditedAudioDuration] =
    useState(originalSongDuration)

  const onFieldChange = (
    value: number,
    fieldName: string,
    precision: AUDIO_TRIMER_PRECISION,
  ) => {
    switch (fieldName) {
      case AUDIO_TRIMER_FIELD.VOLUME_PERCENTAGE:
        setFields({
          ...fields,
          volumePercentage: value,
        })
        break
      case AUDIO_TRIMER_FIELD.TRIM_FROM_START:
        if (precision === AUDIO_TRIMER_PRECISION.MIN) {
          setFields({
            ...fields,
            trimFromStart: {
              ...fields.trimFromStart,
              [AUDIO_TRIMER_PRECISION.MIN]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration -
              60 *
                1000 *
                (value - fields.trimFromStart[AUDIO_TRIMER_PRECISION.MIN]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.SEC) {
          setFields({
            ...fields,
            trimFromStart: {
              ...fields.trimFromStart,
              [AUDIO_TRIMER_PRECISION.SEC]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration -
              1000 * (value - fields.trimFromStart[AUDIO_TRIMER_PRECISION.SEC]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.MS) {
          setFields({
            ...fields,
            trimFromStart: {
              ...fields.trimFromStart,
              [AUDIO_TRIMER_PRECISION.MS]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration -
              (value - fields.trimFromStart[AUDIO_TRIMER_PRECISION.MS]),
          )
        }
        break
      case AUDIO_TRIMER_FIELD.TRIM_FROM_END:
        if (precision === AUDIO_TRIMER_PRECISION.MIN) {
          setFields({
            ...fields,
            trimFromEnd: {
              ...fields.trimFromEnd,
              [AUDIO_TRIMER_PRECISION.MIN]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration -
              60 *
                1000 *
                (value - fields.trimFromEnd[AUDIO_TRIMER_PRECISION.MIN]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.SEC) {
          setFields({
            ...fields,
            trimFromEnd: {
              ...fields.trimFromEnd,
              [AUDIO_TRIMER_PRECISION.SEC]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration -
              1000 * (value - fields.trimFromEnd[AUDIO_TRIMER_PRECISION.SEC]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.MS) {
          setFields({
            ...fields,
            trimFromEnd: {
              ...fields.trimFromEnd,
              [AUDIO_TRIMER_PRECISION.MS]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration -
              (value - fields.trimFromEnd[AUDIO_TRIMER_PRECISION.MS]),
          )
        }
        break
      case AUDIO_TRIMER_FIELD.ADD_SLIENCE_AT_START:
        if (precision === AUDIO_TRIMER_PRECISION.MIN) {
          setFields({
            ...fields,
            addSlienceAtStart: {
              ...fields.addSlienceAtStart,
              [AUDIO_TRIMER_PRECISION.MIN]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration +
              60 *
                1000 *
                (value - fields.addSlienceAtStart[AUDIO_TRIMER_PRECISION.MIN]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.SEC) {
          setFields({
            ...fields,
            addSlienceAtStart: {
              ...fields.addSlienceAtStart,
              [AUDIO_TRIMER_PRECISION.SEC]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration +
              1000 *
                (value - fields.addSlienceAtStart[AUDIO_TRIMER_PRECISION.SEC]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.MS) {
          setFields({
            ...fields,
            addSlienceAtStart: {
              ...fields.addSlienceAtStart,
              [AUDIO_TRIMER_PRECISION.MS]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration +
              (value - fields.addSlienceAtStart[AUDIO_TRIMER_PRECISION.MS]),
          )
        }
        break
      case AUDIO_TRIMER_FIELD.ADD_SLIENCE_AT_END:
        if (precision === AUDIO_TRIMER_PRECISION.MIN) {
          setFields({
            ...fields,
            addSlienceAtEnd: {
              ...fields.addSlienceAtEnd,
              [AUDIO_TRIMER_PRECISION.MIN]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration +
              60 *
                1000 *
                (value - fields.addSlienceAtEnd[AUDIO_TRIMER_PRECISION.MIN]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.SEC) {
          setFields({
            ...fields,
            addSlienceAtEnd: {
              ...fields.addSlienceAtEnd,
              [AUDIO_TRIMER_PRECISION.SEC]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration +
              1000 *
                (value - fields.addSlienceAtEnd[AUDIO_TRIMER_PRECISION.SEC]),
          )
        } else if (precision === AUDIO_TRIMER_PRECISION.MS) {
          setFields({
            ...fields,
            addSlienceAtEnd: {
              ...fields.addSlienceAtEnd,
              [AUDIO_TRIMER_PRECISION.MS]: value,
            },
          })
          setEditedAudioDuration(
            editedAudioDuration +
              (value - fields.addSlienceAtEnd[AUDIO_TRIMER_PRECISION.MS]),
          )
        }
        break
      case AUDIO_TRIMER_FIELD.FADE_UP_AT_START:
        if (precision === AUDIO_TRIMER_PRECISION.MIN) {
          setFields({
            ...fields,
            fadeUpAtStart: {
              ...fields.fadeUpAtStart,
              [AUDIO_TRIMER_PRECISION.MIN]: value,
            },
          })
        } else if (precision === AUDIO_TRIMER_PRECISION.SEC) {
          setFields({
            ...fields,
            fadeUpAtStart: {
              ...fields.fadeUpAtStart,
              [AUDIO_TRIMER_PRECISION.SEC]: value,
            },
          })
        } else if (precision === AUDIO_TRIMER_PRECISION.MS) {
          setFields({
            ...fields,
            fadeUpAtStart: {
              ...fields.fadeUpAtStart,
              [AUDIO_TRIMER_PRECISION.MS]: value,
            },
          })
        }
        break
      case AUDIO_TRIMER_FIELD.FADE_DOWN_AT_END:
        if (precision === AUDIO_TRIMER_PRECISION.MIN) {
          setFields({
            ...fields,
            fadeDownAtEnd: {
              ...fields.fadeDownAtEnd,
              [AUDIO_TRIMER_PRECISION.MIN]: value,
            },
          })
        } else if (precision === AUDIO_TRIMER_PRECISION.SEC) {
          setFields({
            ...fields,
            fadeDownAtEnd: {
              ...fields.fadeDownAtEnd,
              [AUDIO_TRIMER_PRECISION.SEC]: value,
            },
          })
        } else if (precision === AUDIO_TRIMER_PRECISION.MS) {
          setFields({
            ...fields,
            fadeDownAtEnd: {
              ...fields.fadeDownAtEnd,
              [AUDIO_TRIMER_PRECISION.MS]: value,
            },
          })
        }
        break
      default:
        break
    }
  }

  const trimFromStartSecs = inputTimerFieldToSeconds(
    fields?.trimFromStart?.[AUDIO_TRIMER_PRECISION.MIN],
    fields?.trimFromStart?.[AUDIO_TRIMER_PRECISION.SEC],
    fields?.trimFromStart?.[AUDIO_TRIMER_PRECISION.MS],
  )
  const trimFromEndSecs = inputTimerFieldToSeconds(
    fields?.trimFromEnd?.[AUDIO_TRIMER_PRECISION.MIN],
    fields?.trimFromEnd?.[AUDIO_TRIMER_PRECISION.SEC],
    fields?.trimFromEnd?.[AUDIO_TRIMER_PRECISION.MS],
  )
  const addSlienceAtStartSecs = inputTimerFieldToSeconds(
    fields?.addSlienceAtStart?.[AUDIO_TRIMER_PRECISION.MIN],
    fields?.addSlienceAtStart?.[AUDIO_TRIMER_PRECISION.SEC],
    fields?.addSlienceAtStart?.[AUDIO_TRIMER_PRECISION.MS],
  )
  const addSlienceAtEndSecs = inputTimerFieldToSeconds(
    fields?.addSlienceAtEnd?.[AUDIO_TRIMER_PRECISION.MIN],
    fields?.addSlienceAtEnd?.[AUDIO_TRIMER_PRECISION.SEC],
    fields?.addSlienceAtEnd?.[AUDIO_TRIMER_PRECISION.MS],
  )
  const fadeUpAtStartSecs = inputTimerFieldToSeconds(
    fields?.fadeUpAtStart?.[AUDIO_TRIMER_PRECISION.MIN],
    fields?.fadeUpAtStart?.[AUDIO_TRIMER_PRECISION.SEC],
    fields?.fadeUpAtStart?.[AUDIO_TRIMER_PRECISION.MS],
  )
  const fadeDownAtEndSecs = inputTimerFieldToSeconds(
    fields?.fadeDownAtEnd?.[AUDIO_TRIMER_PRECISION.MIN],
    fields?.fadeDownAtEnd?.[AUDIO_TRIMER_PRECISION.SEC],
    fields?.fadeDownAtEnd?.[AUDIO_TRIMER_PRECISION.MS],
  )

  const {
    isAudioLoaded,
    isAudioPlaying,
    isAudioSaving,
    playAudio,
    saveAudio,
    stopAudio,
  } = useEditAudio({
    editAudio,
    volumePercent: fields?.volumePercentage,
    trimFromStartSecs,
    trimFromEndSecs,
    addSlienceAtStartSecs,
    addSlienceAtEndSecs,
    fadeUpAtStartSecs,
    fadeDownAtEndSecs,
    onCloseAudioEditor,
  })

  const isTrimmedDurationValid = isTrimmedDurationLessThenOriginalTrack(
    originalSongDuration,
    {
      trimFromStartMin: fields?.trimFromStart?.[AUDIO_TRIMER_PRECISION.MIN],
      trimFromStartSec: fields?.trimFromStart?.[AUDIO_TRIMER_PRECISION.SEC],
      trimFromStartMs: fields?.trimFromStart?.[AUDIO_TRIMER_PRECISION.MS],
      trimFromEndMin: fields?.trimFromEnd?.[AUDIO_TRIMER_PRECISION.MIN],
      trimFromEndSec: fields?.trimFromEnd?.[AUDIO_TRIMER_PRECISION.SEC],
      trimFromEndMs: fields?.trimFromEnd?.[AUDIO_TRIMER_PRECISION.MS],
    },
  )

  const isFadeUpDownDurationValid = isFadeUpDownDurationLessThanEditedTrack(
    editedAudioDuration,
    {
      fadeUpAtStartMin: fields?.fadeUpAtStart?.[AUDIO_TRIMER_PRECISION.MIN],
      fadeUpAtStartSec: fields?.fadeUpAtStart?.[AUDIO_TRIMER_PRECISION.SEC],
      fadeUpAtStartMs: fields?.fadeUpAtStart?.[AUDIO_TRIMER_PRECISION.MS],
      fadeDownAtEndMin: fields?.fadeDownAtEnd?.[AUDIO_TRIMER_PRECISION.MIN],
      fadeDownAtEndSec: fields?.fadeDownAtEnd?.[AUDIO_TRIMER_PRECISION.SEC],
      fadeDownAtEndMs: fields?.fadeDownAtEnd?.[AUDIO_TRIMER_PRECISION.MS],
    },
  )

  if (!isAudioLoaded) {
    return (
      <StyledLoadingSongContainer>
        <StyledSpinningLoader />
      </StyledLoadingSongContainer>
    )
  }

  return (
    <FormContext.Provider value={{ isFormDirty }}>
      <StyledEditedSongLengthText $isValid={editedAudioDuration > 0}>
        {`Edited Song Length:\u00A0\u00A0\u00A0\u00A0${DateTimeHelper.formatDurationInMilliseconds(
          editedAudioDuration,
        )}`}
      </StyledEditedSongLengthText>

      <StyledClientCreateCaseForm
        ref={formRef}
        onSubmit={(ev) => {
          ev.preventDefault()
          setIsFormDirty(true)
        }}
      >
        {!isTrimmedDurationValid && (
          <StyledWarningLengthText $isValid={false}>
            {`Please make sure the trimming duration is less than original song length!`}
          </StyledWarningLengthText>
        )}

        <EditAudioInputVolume
          inputText={'Volume:'}
          onChange={(value, precision) =>
            onFieldChange(
              value,
              AUDIO_TRIMER_FIELD.VOLUME_PERCENTAGE,
              precision,
            )
          }
        />

        <StyledTimeUnitText>{`m: sec: m/s`}</StyledTimeUnitText>

        <EditAudioInputTime
          inputText={'Trim from start:'}
          onChange={(value, precision) =>
            onFieldChange(value, AUDIO_TRIMER_FIELD.TRIM_FROM_START, precision)
          }
        />

        <EditAudioInputTime
          inputText={'Trim from end:'}
          onChange={(value, precision) =>
            onFieldChange(value, AUDIO_TRIMER_FIELD.TRIM_FROM_END, precision)
          }
        />

        {!isFadeUpDownDurationValid && editedAudioDuration > 0 && (
          <StyledWarningLengthText $isValid={false}>
            {`Please make sure the input fade duration is less than edited song length!`}
          </StyledWarningLengthText>
        )}

        <EditAudioInputTime
          inputText={'Fade up at start:'}
          onChange={(value, precision) =>
            onFieldChange(value, AUDIO_TRIMER_FIELD.FADE_UP_AT_START, precision)
          }
        />

        <EditAudioInputTime
          inputText={'Fade down at end:'}
          onChange={(value, precision) =>
            onFieldChange(value, AUDIO_TRIMER_FIELD.FADE_DOWN_AT_END, precision)
          }
        />

        <EditAudioInputTime
          inputText={'Add slience at start:'}
          onChange={(value, precision) =>
            onFieldChange(
              value,
              AUDIO_TRIMER_FIELD.ADD_SLIENCE_AT_START,
              precision,
            )
          }
        />

        <EditAudioInputTime
          inputText={'Add slience at end:'}
          onChange={(value, precision) =>
            onFieldChange(
              value,
              AUDIO_TRIMER_FIELD.ADD_SLIENCE_AT_END,
              precision,
            )
          }
        />

        <StyledButtonGroupContainer>
          <Button
            buttonType={ButtonType.PRIMARY}
            onClick={() => {
              if (playingAudioInAudioLists?.length > 0) {
                clearAllPlayingAudios()
              }
              playAudio()
            }}
            loading={false}
            disabled={
              editedAudioDuration <= 0 ||
              !isTrimmedDurationValid ||
              isAudioSaving ||
              !isFadeUpDownDurationValid
            }
          >
            {isAudioPlaying ? 'Stop' : 'Preview'}
          </Button>
          <Button
            buttonType={ButtonType.PRIMARY}
            onClick={() => saveAudio()}
            disabled={
              editedAudioDuration <= 0 ||
              !isTrimmedDurationValid ||
              isAudioPlaying ||
              !isFadeUpDownDurationValid
            }
            loading={isAudioSaving}
          >
            Save
          </Button>
          <Button
            buttonType={ButtonType.TRANSPARENT}
            onClick={() => {
              if (playingAudioInAudioLists?.length > 0) {
                clearAllPlayingAudios()
              }
              onCloseAudioEditor()
              stopAudio()
            }}
            disabled={isAudioSaving}
            loading={isAudioSaving}
          >
            Close
          </Button>
        </StyledButtonGroupContainer>
      </StyledClientCreateCaseForm>
    </FormContext.Provider>
  )
}

export default EditAudioForm
