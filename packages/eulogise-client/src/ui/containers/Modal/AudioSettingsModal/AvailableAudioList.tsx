import React from 'react'
import { IAudioAsset, ICategorizedAudio } from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'
import { Accordion, AccordionItem } from '@eulogise/client-components'
import AvailableAudioItem from './AvailableAudioItem'

interface IAvailableAudioListProps {
  selectedAudios: Array<IAudioAsset>
  playingAudios: Array<IAudioAsset>
  onUseClick: (audio: IAudioAsset) => void
  onPlayClick: (audio: IAudioAsset) => void
  onStopClick: (audio: IAudioAsset) => void
  onDeleteClick: (audio: IAudioAsset) => void
  audios: Array<IAudioAsset>
}

const AvailableAudioList: React.FunctionComponent<IAvailableAudioListProps> = ({
  selectedAudios,
  playingAudios,
  onUseClick,
  onPlayClick,
  onStopClick,
  onDeleteClick,
  audios,
}) => {
  const categorizedAudios = AssetHelper.categoriseAudios(audios)
  return (
    <Accordion>
      {categorizedAudios.map((category: ICategorizedAudio) => {
        const categoryName: string = category.name
        const isUploadedCategory: boolean = categoryName === 'Uploaded'
        const audios: Array<IAudioAsset> = category.audios.sort(
          (a: IAudioAsset, b: IAudioAsset) =>
            a.content.title > b.content.title ? 1 : -1,
        )
        return (
          <AccordionItem
            key={categoryName}
            header={isUploadedCategory ? 'My Music Uploads' : categoryName}
          >
            {audios.map((audio: IAudioAsset) => {
              const isSelected: boolean = selectedAudios.includes(audio)
              const isPlaying: boolean = playingAudios.includes(audio)

              return (
                <AvailableAudioItem
                  key={audio.content.filepath}
                  audio={audio}
                  isPlaying={isPlaying}
                  isSelected={isSelected}
                  onUseClick={() => onUseClick(audio)}
                  onPlayClick={() => onPlayClick(audio)}
                  onStopClick={() => onStopClick(audio)}
                  onDeleteClick={() => onDeleteClick(audio)}
                  isUploadedCategory={isUploadedCategory}
                />
              )
            })}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default AvailableAudioList
