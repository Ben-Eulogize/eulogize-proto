import { useState, useEffect } from 'react'
import {
  IAudioAsset,
  IAudioAssetContent,
  ICaseState,
  IAssetState,
} from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'
import { AudioHelper, IFilestackResponse } from '../helpers/AudioHelper'
import { saveEditedAudioBuffer } from '../store/AssetState/actions'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
} from '../store/hooks'
import { Notification } from '@eulogise/client-components'

interface IUseAudioEditingProps {
  editAudio: IAudioAsset
  volumePercent: number
  trimFromStartSecs: number
  trimFromEndSecs: number
  addSlienceAtStartSecs: number
  addSlienceAtEndSecs: number
  fadeUpAtStartSecs: number
  fadeDownAtEndSecs: number
  onCloseAudioEditor: () => void
}

interface IUseAudioEditingOutPut {
  isAudioLoaded: boolean
  isAudioPlaying: boolean
  isAudioSaving: boolean
  playAudio: () => void
  saveAudio: () => void
  stopAudio: () => void
}

const findPreviousEditedAudio = (
  audios: Array<IAudioAsset>,
  editedAudioTitle: string,
): IAudioAsset | null => {
  if (!audios) {
    return null
  }
  return (
    audios.find(
      (audio: IAudioAsset) => audio?.content?.title === editedAudioTitle,
    ) ?? null
  )
}

interface ITrimBufferOutput {
  trimmedBuffer: AudioBuffer
  newPlaySound: AudioBufferSourceNode
  gainNode: GainNode
  newCtx: AudioContext
}

const EDITED_AUDIO_TITLE_PREFIX = 'Edit - '

const stripEditedAudioPrefix = (audioName: string): string => {
  if (!audioName) {
    return audioName
  }
  return audioName.replace(/^(Edit -\s*)+/i, '').trim()
}

const useEditAudio = ({
  editAudio,
  volumePercent = 100,
  trimFromStartSecs = 0,
  trimFromEndSecs = 0,
  addSlienceAtStartSecs = 0,
  addSlienceAtEndSecs = 0,
  fadeUpAtStartSecs = 0,
  fadeDownAtEndSecs = 0,
  onCloseAudioEditor,
}: IUseAudioEditingProps): IUseAudioEditingOutPut => {
  const ctx = new AudioContext()
  const [isAudioLoaded, setIsAudioLoaded] = useState<boolean>(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const [audio, setAudio] = useState<any>(null)
  const [playSound, setPlaySound] = useState<AudioBufferSourceNode>(
    ctx.createBufferSource(),
  )
  const [isAudioSaving, setIsAudioSaving] = useState<boolean>(false)
  const {
    activeItem: { id: caseId },
  }: ICaseState = useCaseState()
  const { audios }: IAssetState = useAssetState()

  const dispatch = useEulogiseDispatch()

  const fetchAudioToBuffer = async () => {
    setIsAudioLoaded(false)
    const audioContent: IAudioAssetContent = editAudio?.content

    const url: string = AssetHelper.getAudioUrl(audioContent)

    try {
      const buffer = await AudioHelper.fetchAudioFileBuffer(url)
      const arrayBuffer = buffer?.data

      const decodedAudio: AudioBuffer = await ctx.decodeAudioData(arrayBuffer)
      setAudio(decodedAudio)
      setIsAudioLoaded(true)
      setIsAudioPlaying(false)

      setPlaySound(ctx.createBufferSource())
    } catch (ex) {
      Notification.error('Cannot fetch audio butter', ex)
      setIsAudioLoaded(false)
    }
  }

  const playAudio = () => {
    if (!audio) {
      setIsAudioPlaying(false)
      return
    }
    if (!isAudioPlaying) {
      const { newPlaySound, gainNode, newCtx } = trimBuffer(audio)
      newPlaySound.start(newCtx.currentTime)
      setIsAudioPlaying(true)

      // cleanup node when playing finished
      newPlaySound.onended = function () {
        gainNode.disconnect()
        setIsAudioPlaying(false)
        return
      }
    } else {
      playSound.playbackRate.value = 1.0
      playSound.disconnect()
      setIsAudioPlaying(false)
      return
    }
  }

  const stopAudio = () => {
    playSound.playbackRate.value = 1.0
    playSound.disconnect()
    setIsAudioPlaying(false)
    return
  }

  const saveAudio = async () => {
    try {
      setIsAudioSaving(true)
      const { trimmedBuffer } = trimBuffer(audio)
      const convertedWaveBlob: Blob = AudioHelper.bufferToWave(
        trimmedBuffer,
        trimmedBuffer?.length,
      )

      const audioName: string = AssetHelper.getAudioName(editAudio?.content)
      const normalizedAudioName = stripEditedAudioPrefix(audioName)
      const editedAudioBaseName =
        normalizedAudioName ||
        audioName ||
        editAudio?.content?.filename ||
        'audio'
      const editedAudioBufferFileName: string = `${EDITED_AUDIO_TITLE_PREFIX}${editedAudioBaseName}`

      const previousEditedAudio: IAudioAsset | null = findPreviousEditedAudio(
        audios!,
        editedAudioBufferFileName,
      )
      const previousEditedAudioId: string = previousEditedAudio?.id!

      const res: IFilestackResponse =
        await AudioHelper.uploadEditedAudioWavBufferToFilestack({
          editedAudioBuffer: convertedWaveBlob,
          filename: editedAudioBufferFileName,
        })
      const key = `cases/${caseId}/audio/${editedAudioBufferFileName}.wav`

      dispatch(
        saveEditedAudioBuffer({
          caseId,
          editedAudioFromFileStack: res,
          fileName: editedAudioBufferFileName,
          previousEditedAudioId,
          key,
          onSuccess: (audio: IAudioAssetContent) => {
            Notification.success(
              `Edited Audio ${editedAudioBufferFileName} has been saved! Please check it at My Music Uploads collection`,
            )
            setIsAudioSaving(false)
            onCloseAudioEditor()
            return
          },
        }),
      )
    } catch (error) {
      Notification.error('Unable to upload the edited audio')
      setIsAudioSaving(false)
    }
  }

  const trimBuffer = (audio: AudioBuffer): ITrimBufferOutput => {
    // Create a new audio ctx as it does not allow us to share ctx in one buffer
    const newCtx = new AudioContext()

    const newPlaySound = newCtx.createBufferSource()

    let trimmedBuffer = cloneAudioBuffer(audio)

    // Prioritised trimming: trim from start/end, add slience from start/end
    // Trim from start:
    if (trimFromStartSecs > 0) {
      trimmedBuffer = trimFromStart(trimmedBuffer, trimFromStartSecs)
    }

    // Trim from end:
    if (trimFromEndSecs > 0) {
      trimmedBuffer = trimFromEnd(trimmedBuffer, trimFromEndSecs)
    }

    // Add slience at start:
    if (addSlienceAtStartSecs > 0) {
      trimmedBuffer = addSlienceAtStart(trimmedBuffer, addSlienceAtStartSecs)
    }

    // Add slience at end:
    if (addSlienceAtEndSecs > 0) {
      trimmedBuffer = addSlienceAtEnd(trimmedBuffer, addSlienceAtEndSecs)
    }

    // Secondary trimming: volumn, fade in, fade out
    const gainNode = newCtx.createGain()

    // Volume control: buffer trimming:
    const volumeCoefficient: number = volumePercent / 100
    trimmedBuffer = volumeBufferTrim(trimmedBuffer, volumeCoefficient)

    // Fade effects must be applied to the buffer so they are included in the exported WAV.
    trimmedBuffer = fadeBufferTrim(
      trimmedBuffer,
      fadeUpAtStartSecs,
      fadeDownAtEndSecs,
    )

    gainNode.gain.value = 1

    newPlaySound!.buffer = trimmedBuffer

    gainNode.connect(newCtx.destination)

    newPlaySound!.connect(gainNode)

    setPlaySound(newPlaySound)

    return {
      trimmedBuffer,
      newPlaySound,
      gainNode,
      newCtx,
    }
  }

  const trimFromStart = (
    audioBuffer: AudioBuffer,
    trimSecondsFromStart: number,
  ): AudioBuffer => {
    const channels = audioBuffer.numberOfChannels
    const rate = audioBuffer.sampleRate
    const bufferLength = audioBuffer.length

    const startOffset = rate * trimSecondsFromStart
    const newBufferFrameCount = bufferLength - startOffset

    const newAudioBuffer: AudioBuffer = new AudioContext().createBuffer(
      channels,
      newBufferFrameCount,
      rate,
    )
    const anotherBufferArray = new Float32Array(newBufferFrameCount)

    for (let channel = 0; channel < channels; channel++) {
      audioBuffer.copyFromChannel(anotherBufferArray, channel, startOffset)
      newAudioBuffer.copyToChannel(anotherBufferArray, channel, 0)
    }
    return newAudioBuffer
  }

  const trimFromEnd = (
    audioBuffer: AudioBuffer,
    trimSecondsFromEnd: number,
  ): AudioBuffer => {
    const channels = audioBuffer.numberOfChannels
    const rate = audioBuffer.sampleRate
    const bufferLength = audioBuffer.length

    const endOffset = rate * trimSecondsFromEnd
    const newBufferFrameCount = bufferLength - endOffset

    const newAudioBuffer: AudioBuffer = new AudioContext().createBuffer(
      channels,
      newBufferFrameCount,
      rate,
    )
    const anotherBufferArray = new Float32Array(newBufferFrameCount)

    for (let channel = 0; channel < channels; channel++) {
      audioBuffer.copyFromChannel(anotherBufferArray, channel, 0)
      newAudioBuffer.copyToChannel(anotherBufferArray, channel, 0)
    }
    return newAudioBuffer
  }

  const addSlienceAtStart = (
    audioBuffer: AudioBuffer,
    addSlienceAtStartSeconds: number,
  ): AudioBuffer => {
    const channels = audioBuffer.numberOfChannels
    const rate = audioBuffer.sampleRate
    const bufferLength = audioBuffer.length

    // slient frames with seconds
    const slientFrames = rate * addSlienceAtStartSeconds
    const newBufferFrameCount = slientFrames + bufferLength
    // create a slient buffer with same channels, rate for slient seconds
    const newAudioBuffer = new AudioContext().createBuffer(
      channels,
      slientFrames + bufferLength,
      rate,
    )
    // convert to buffer array
    const anotherBufferArray = new Float32Array(newBufferFrameCount)

    for (let channel = 0; channel < channels; channel++) {
      audioBuffer.copyFromChannel(anotherBufferArray, channel, 0)
      newAudioBuffer.copyToChannel(anotherBufferArray, channel, slientFrames)
    }
    return newAudioBuffer
  }

  const addSlienceAtEnd = (
    audioBuffer: AudioBuffer,
    addSlienceAtStartSeconds: number,
  ): AudioBuffer => {
    const channels = audioBuffer.numberOfChannels
    const rate = audioBuffer.sampleRate
    const bufferLength = audioBuffer.length

    // slient frames with seconds
    const slientFrames = rate * addSlienceAtStartSeconds
    const newBufferFrameCount = slientFrames + bufferLength
    // create a slient buffer with same channels, rate for slient seconds
    const newAudioBuffer = new AudioContext().createBuffer(
      channels,
      slientFrames + bufferLength,
      rate,
    )
    // convert to buffer array
    const anotherBufferArray = new Float32Array(newBufferFrameCount)

    for (let channel = 0; channel < channels; channel++) {
      audioBuffer.copyFromChannel(anotherBufferArray, channel, 0)
      newAudioBuffer.copyToChannel(anotherBufferArray, channel, 0)
    }
    return newAudioBuffer
  }

  const volumeBufferTrim = (
    audioBuffer: AudioBuffer,
    volumeCoefficient: number,
  ): AudioBuffer => {
    let newBuffer = audioBuffer

    const channels = newBuffer.numberOfChannels

    for (let channel = 0; channel < channels; channel++) {
      const channelData = newBuffer.getChannelData(channel)
      for (let j = 0; j < channelData.length; j++) {
        // TODO: Need to investigate why volumeCoefficient here is not working properly
        channelData[j] = channelData[j] * volumeCoefficient
      }
    }
    return newBuffer
  }

  const cloneAudioBuffer = (audioBuffer: AudioBuffer): AudioBuffer => {
    const channels = audioBuffer.numberOfChannels
    const rate = audioBuffer.sampleRate
    const bufferLength = audioBuffer.length
    const newAudioBuffer = new AudioContext().createBuffer(
      channels,
      bufferLength,
      rate,
    )

    for (let channel = 0; channel < channels; channel++) {
      const channelData = audioBuffer.getChannelData(channel)
      newAudioBuffer.copyToChannel(channelData, channel, 0)
    }
    return newAudioBuffer
  }

  const fadeBufferTrim = (
    audioBuffer: AudioBuffer,
    fadeUpSeconds: number,
    fadeDownSeconds: number,
  ): AudioBuffer => {
    const channels = audioBuffer.numberOfChannels
    const sampleRate = audioBuffer.sampleRate
    const totalFrames = audioBuffer.length

    const fadeUpFrames = Math.min(
      Math.max(0, Math.floor(fadeUpSeconds * sampleRate)),
      totalFrames,
    )
    const fadeDownFrames = Math.min(
      Math.max(0, Math.floor(fadeDownSeconds * sampleRate)),
      totalFrames,
    )
    const fadeDownStartFrame = Math.max(0, totalFrames - fadeDownFrames)

    for (let channel = 0; channel < channels; channel++) {
      const channelData = audioBuffer.getChannelData(channel)

      for (let i = 0; i < fadeUpFrames; i++) {
        channelData[i] = channelData[i] * (i / fadeUpFrames)
      }

      for (let i = 0; i < fadeDownFrames; i++) {
        const frameIndex = fadeDownStartFrame + i
        const coefficient = (fadeDownFrames - i) / fadeDownFrames
        channelData[frameIndex] = channelData[frameIndex] * coefficient
      }
    }

    return audioBuffer
  }

  useEffect(() => {
    if (!isAudioLoaded && editAudio && editAudio?.content) {
      fetchAudioToBuffer()
    }
  }, [])

  return {
    isAudioLoaded,
    isAudioPlaying,
    isAudioSaving,
    playAudio,
    saveAudio,
    stopAudio,
  }
}

export default useEditAudio
