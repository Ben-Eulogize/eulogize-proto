import { EulogiseClientConfig } from '@eulogise/client-core'
import axios, { AxiosResponse } from 'axios'
import * as FilestackClient from 'filestack-js'

export interface IFilestackResponse {
  handle: string
  url: string
  filename: string
  size: number
  mimetype: string
  status: string
  key: string
  container: string
}

export class AudioHelper {
  public static preloadAudio = (url: string) => {
    const audio = new Audio()
    // once this file loads, it will call loadedAudio()
    // the file will be kept by the browser as cache
    audio.addEventListener(
      'canplaythrough',
      () => {
        console.log('loaded audio', url)
      },
      false,
    )
    audio.src = url
  }

  public static fetchAudioFileBuffer = async (
    url: string,
  ): Promise<AxiosResponse<never>> => {
    try {
      const buffer = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer',
      })
      return buffer
    } catch (ex) {
      throw new Error(`Can not fetch audio file with url: ${url}`)
    }
  }

  public static uploadEditedAudioWavBufferToFilestack = async ({
    editedAudioBuffer,
    filename,
  }: {
    editedAudioBuffer: Blob
    filename: string
  }) => {
    const filestackClient = FilestackClient.init(
      EulogiseClientConfig.FILESTACK_API_KEY!,
    )
    // upload new edited audio wav buffer to filestack
    try {
      const uploadResp: IFilestackResponse = await filestackClient.upload(
        editedAudioBuffer,
        {},
        { filename },
      )
      return uploadResp
    } catch (error) {
      throw new Error(
        `failed to uploaded edited wav buffer to filestack, buffer: ${editedAudioBuffer}`,
      )
    }
  }

  // Convert AudioBuffer to a Blob using WAVE representation
  public static bufferToWave(audioBuffer: AudioBuffer, len: number): Blob {
    let numOfChan = audioBuffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      buffer = new ArrayBuffer(length),
      view = new DataView(buffer),
      channels = [],
      i,
      sample,
      offset = 0,
      pos = 0

    // write WAVE header
    // "RIFF"
    setUint32(0x46464952)
    // file length - 8
    setUint32(length - 8)
    // "WAVE"
    setUint32(0x45564157)
    // "fmt " chunk
    setUint32(0x20746d66)
    // length = 16
    setUint32(16)
    // PCM (uncompressed)
    setUint16(1)
    setUint16(numOfChan)
    setUint32(audioBuffer.sampleRate)
    // avg. bytes/sec
    setUint32(audioBuffer.sampleRate * 2 * numOfChan)
    // block-align
    setUint16(numOfChan * 2)
    // 16-bit (hardcoded in this demo)
    setUint16(16)
    // "data" - chunk
    setUint32(0x61746164)
    // chunk length
    setUint32(length - pos - 4)

    // write interleaved data
    for (i = 0; i < audioBuffer.numberOfChannels; i++)
      channels.push(audioBuffer.getChannelData(i))

    while (pos < length) {
      // interleave channels
      for (i = 0; i < numOfChan; i++) {
        // clamp
        sample = Math.max(-1, Math.min(1, channels[i][offset]))
        // scale to 16-bit signed int
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0
        // write 16-bit sample
        view.setInt16(pos, sample, true)
        pos += 2
      }
      // next source sample
      offset++
    }

    // create Blob
    return new Blob([buffer], { type: 'audio/wav' })

    function setUint16(data: number) {
      view.setUint16(pos, data, true)
      pos += 2
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true)
      pos += 4
    }
  }
}
