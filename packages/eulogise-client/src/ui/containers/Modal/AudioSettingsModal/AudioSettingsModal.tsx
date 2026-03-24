import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Spin,
  Modal,
  AudioSound,
  SwitchButton,
  Notification,
} from '@eulogise/client-components'
import { UtilHelper } from '@eulogise/helpers'
import { SlideshowHelper } from '@eulogise/helpers'
import SelectedAudioList from './SelectedAudioList'
import AvailableAudioList from './AvailableAudioList'
import {
  AudioStatus,
  IAudioAssetCategory,
  IAudioAsset,
  IAudioAssetContent,
  TimelineType,
  ISlideshowData,
  ICaseState,
  IAssetState,
  ISlide,
  ISlideshowState,
  ModalId,
  ISlideshowTheme,
  AssetType,
} from '@eulogise/core'
import UploadSongButton from './Button/UploadSongButton'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
} from '../../../store/hooks'
import {
  fetchAudioAssetsByCaseId,
  removeAsset,
} from '../../../store/AssetState/actions'
import NoAudio from '../ProjectSettingsModal/NoAudio'
import WithAudio from '../ProjectSettingsModal/WithAudio'
import {
  saveSlideshowByCaseId,
  saveSlidesToSlideshowByCaseId,
  updateSlideshow,
} from '../../../store/SlideshowState/actions'
import { AssetHelper } from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'
import {
  SLOW_SLIDES_WARNING_TEXT_NO_AUDIOS,
  EXPIRED_OLD_MUSIC_TRACK_TITLES,
} from '@eulogise/helpers'
import { hideModalAction } from '../../../store/ModalState/actions'
import EditAudioDropdown from './EditAudioDropdown'

const SelectedAudios = styled.div``

const SelectedAudioTitle = styled.div``

const AudioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const AudioTitle = styled.div``

const ActionContainer = styled.div`
  justify-content: flex-end;
  display: flex;
`

const NoAudioSlowSlideWarning = styled.div`
  margin-bottom: 2rem;
  color: ${COLOR.RED};
  text-align: center;
`

const AudioSettingsModal = () => {
  const dispatch = useEulogiseDispatch()
  const [isDisabledAudio, setIsDisabledAudio] = useState<boolean>(false)
  const [previousSelectedAudioList, setPreviousSelectedAudioList] = useState<
    Array<IAudioAssetContent>
  >([])
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id
  const caseState: ICaseState = useCaseState()
  const slideshowState: ISlideshowState = useSlideshowState()
  const { audios: unfliteredAudioAssets, isFetching }: IAssetState =
    useAssetState()
  const audioAssets = unfliteredAudioAssets?.filter(
    (a: IAudioAsset) =>
      !EXPIRED_OLD_MUSIC_TRACK_TITLES.includes(a?.content?.title),
  )

  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const { activeSlideshowTheme: slideshowTheme }: ISlideshowTheme =
    slideshowState
  const persistedAudios =
    slideshowData?.content?.audio?.filter(
      (audio: IAudioAssetContent | null | undefined) => !!audio,
    ) ?? []
  const selectedAudios = persistedAudios.filter((audio: IAudioAssetContent) => {
    return audioAssets?.find(
      (asset: IAudioAsset) => asset?.content?.filepath === audio?.filepath,
    )
  })
  const selectedAudioAssets: Array<IAudioAsset> = selectedAudios?.map(
    (audio: IAudioAssetContent) => {
      return audioAssets?.find(
        (asset: IAudioAsset) => asset?.content?.filepath === audio?.filepath,
      )
    },
  )
  const totalImageSlides: number =
    SlideshowHelper.getTotalImageSlides(slideshowData)

  const totalTitleSlides: number =
    SlideshowHelper.getTotalTitleSlides(slideshowData)

  const [playAudios, setPlayAudios] = useState<Array<IAudioAsset>>([])
  const [loadingAudios, setLoadingAudios] = useState<Array<IAudioAsset>>([])
  const [editAudio, setEditAudio] = useState<IAudioAsset | null>(null)

  const addPlayingAudio = (audio: IAudioAsset) => setPlayAudios([audio])
  const removePlayingAudio = (audio: IAudioAsset) =>
    setPlayAudios(playAudios.filter((a: IAudioAsset) => a.id !== audio.id))

  const onDeleteUploadedAudioTrack = (audio: IAudioAsset) => {
    if (!audio?.id) {
      Notification.error(`Audio removed failed, audio id is missing.`)
      return
    }
    dispatch(
      removeAsset({
        assetId: audio.id,
        assetType: AssetType.AUDIO,
        onSuccess: () => {
          Notification.success(`Audio Removed.`)
          dispatch(fetchAudioAssetsByCaseId(caseState.activeItem?.id!))
        },
      }),
    )
  }

  const toggleNoAudioSwitch = (disabled?: boolean) => {
    setIsDisabledAudio(disabled!)
    const timelineType = disabled
      ? TimelineType.NO_AUDIO
      : TimelineType.FIT_SLIDES

    dispatch(
      updateSlideshow({
        slideshow: {
          // @ts-ignore
          content: {
            timelineType,
          },
        },
      }),
    )
  }

  useEffect(() => {
    dispatch(fetchAudioAssetsByCaseId(caseState.activeItem?.id!))

    if (slideshowData?.content?.timelineType) {
      const isNoAudioMode =
        slideshowData?.content?.timelineType === TimelineType.NO_AUDIO
      setIsDisabledAudio(isNoAudioMode)
    }
  }, [])

  const clearAllPlayingAudios = () => {
    setPlayAudios([])
  }

  const close = () => {
    setPlayAudios([])
    setLoadingAudios([])
    const shouldForceSwitchToNoAudio =
      !isDisabledAudio &&
      audiosDurationInMilliseconds === 0 &&
      persistedAudios.length === 0 &&
      !!properNoAudioFile?.content
    if (shouldForceSwitchToNoAudio) {
      setPreviousSelectedAudioList([])
      onSelectedAudioChanged([properNoAudioFile?.content!])
      toggleNoAudioSwitch(!isDisabledAudio)
      dispatch(hideModalAction(ModalId.AUDIO_SETTINGS))
      dispatch(
        saveSlidesToSlideshowByCaseId({
          caseId,
          slideshowData: {
            ...slideshowData,
            content: {
              ...slideshowData?.content,
              audio: [properNoAudioFile?.content!],
              timelineType: TimelineType.NO_AUDIO,
            },
          },
          slides,
          onSuccess: () => {
            setTimeout(() => {
              Notification.success(`Slideshow saved.`)
            }, 200)
          },
        }),
      )
    } else {
      dispatch(saveSlideshowByCaseId({}))
      setTimeout(() => {
        dispatch(hideModalAction(ModalId.AUDIO_SETTINGS))
      }, 50)
    }
  }

  const onSelectedAudioChanged = (
    selectedAudios: Array<IAudioAssetContent>,
  ) => {
    if (selectedAudios) {
      dispatch(
        updateSlideshow({
          slideshow: {
            // @ts-ignore
            content: {
              audio: selectedAudios,
            },
          },
        }),
      )
    }
  }
  const onDragEnd = ({ source, destination }) => {
    // Dropped outside the list
    if (!destination) {
      return
    }
    onSelectedAudioChanged(
      UtilHelper.arrayMove(selectedAudios, source.index, destination.index),
    )
  }

  const onEditAudio = (audio: IAudioAsset) => {
    if (editAudio) {
      setEditAudio(null)
      return
    }
    setEditAudio(audio)
  }

  const onEditAudioClose = () => {
    setEditAudio(null)
    return
  }

  const audiosDurationInMilliseconds: number =
    AssetHelper.getAudiosDurations(selectedAudioAssets) ?? 0

  const slides: Array<ISlide> = slideshowData?.content?.slides ?? []

  const startTitleSlide: ISlide = SlideshowHelper.getStartTitleSlide(slides)

  const endTitleSlide: ISlide = SlideshowHelper.getEndTitleSlide(slides)

  const isStartTitleSlideEnabled: boolean = startTitleSlide?.isTitleSlideEnable!
  const isEndTitleSlideEnabled: boolean = endTitleSlide?.isTitleSlideEnable!

  const noAudioSlideshowDuration: number =
    SlideshowHelper.getNoAudioTotalSlideshowDuration({
      slideshowData,
      slideshowTheme,
    })

  const nonInternalUsedudioAssets = audioAssets?.filter(
    (audio: IAudioAsset) =>
      audio?.content?.category !== IAudioAssetCategory.INTERNAL_USED,
  )
  const internalUsedAudioAssets = audioAssets?.filter(
    (audio: IAudioAsset) =>
      audio?.content?.category === IAudioAssetCategory.INTERNAL_USED,
  )
  const properNoAudioFileName = AssetHelper.getProperSilenceAudioFileName(
    noAudioSlideshowDuration,
  )
  const properNoAudioFile: IAudioAsset | undefined = audioAssets?.find(
    (audio: IAudioAsset) => audio?.content?.filename === properNoAudioFileName,
  )

  return (
    <Modal
      footer={null}
      closeButtonText="Save & Close"
      title={
        <AudioHeader>
          <AudioTitle>Music Settings</AudioTitle>
        </AudioHeader>
      }
      isOpen
      onCloseClick={close}
      closeButtonDisabled={false}
    >
      {isFetching && audioAssets?.length === 0 ? (
        <Spin />
      ) : (
        <>
          {!isDisabledAudio && (
            <WithAudio
              noOfSelectedAudios={selectedAudioAssets.length}
              totalImageSlides={totalImageSlides}
              audioLength={audiosDurationInMilliseconds}
              totalTileSlides={totalTitleSlides}
            />
          )}

          {SlideshowHelper.isVeryFastSlide(slideshowData) &&
            isDisabledAudio && (
              <NoAudioSlowSlideWarning>
                {SLOW_SLIDES_WARNING_TEXT_NO_AUDIOS}
              </NoAudioSlowSlideWarning>
            )}

          <ActionContainer>
            <SwitchButton
              onClick={() => {
                if (isDisabledAudio && properNoAudioFile) {
                  onSelectedAudioChanged(previousSelectedAudioList)
                  setPreviousSelectedAudioList([])
                } else if (!isDisabledAudio && properNoAudioFile) {
                  setPreviousSelectedAudioList(selectedAudios)
                  onSelectedAudioChanged([properNoAudioFile?.content])
                }
                toggleNoAudioSwitch(!isDisabledAudio)
              }}
              checked={isDisabledAudio}
            >
              No Audio
            </SwitchButton>
          </ActionContainer>
          {isDisabledAudio && (
            <NoAudio
              internalUsedAudio={internalUsedAudioAssets ?? []}
              totalImageSlides={totalImageSlides}
              slideshowData={slideshowData}
              slideshowTheme={slideshowTheme}
              onSlideDurationChange={(value: number) => {
                dispatch(
                  updateSlideshow({
                    slideshow: {
                      // @ts-ignore
                      content: {
                        noAudioModeSlideDuration: value,
                        slides: slides.map((s) => ({
                          ...s,
                          slideDuration: undefined,
                        })),
                      },
                    },
                  }),
                )
              }}
              totalTileSlides={totalTitleSlides}
              isStartTitleSlideEnabled={isStartTitleSlideEnabled}
              isEndTitleSlideEnabled={isEndTitleSlideEnabled}
            />
          )}
          {!isDisabledAudio && (
            <SelectedAudios>
              <SelectedAudioTitle>
                Your tribute is currently playing:
              </SelectedAudioTitle>
              <SelectedAudioList
                isEditingAudio={!!editAudio}
                loadingAudios={loadingAudios}
                playingAudios={playAudios}
                audios={selectedAudioAssets}
                onPlayClick={addPlayingAudio}
                onRemoveClick={(audio: IAudioAsset) => {
                  const audios = selectedAudios.filter(
                    (a: IAudioAssetContent) =>
                      a.filepath !== audio.content.filepath,
                  )
                  if (playAudios?.includes(audio)) {
                    setPlayAudios([])
                  }
                  if (audios.length === 0) {
                    toggleNoAudioSwitch(true)
                  }
                  onSelectedAudioChanged(audios)
                }}
                onDragEnd={onDragEnd}
                onStopClick={removePlayingAudio}
                onEditClick={onEditAudio}
              />
            </SelectedAudios>
          )}
          {!isDisabledAudio && editAudio && (
            <EditAudioDropdown
              playingAudioInAudioLists={playAudios}
              editAudio={editAudio}
              isOpen={!!editAudio}
              onClose={onEditAudioClose}
              clearAllPlayingAudios={clearAllPlayingAudios}
            />
          )}
          {!isDisabledAudio && (
            <>
              <UploadSongButton />
              <AvailableAudioList
                playingAudios={playAudios}
                selectedAudios={selectedAudioAssets}
                onUseClick={(audio: IAudioAsset) => {
                  toggleNoAudioSwitch(false)
                  onSelectedAudioChanged(selectedAudios.concat(audio.content))
                }}
                audios={nonInternalUsedudioAssets!}
                onPlayClick={addPlayingAudio}
                onStopClick={removePlayingAudio}
                onDeleteClick={onDeleteUploadedAudioTrack}
              />
              {playAudios.map((audio: IAudioAsset) => (
                <AudioSound
                  audioStatus={AudioStatus.PLAYING}
                  key={audio.id}
                  audio={audio.content}
                  onLoading={() => {
                    if (!loadingAudios.includes(audio)) {
                      setLoadingAudios(loadingAudios.concat(audio))
                    }
                  }}
                  onLoaded={() => {
                    setLoadingAudios(
                      loadingAudios.filter(
                        (a: IAudioAsset) => a.id !== audio.id,
                      ),
                    )
                  }}
                  onFinishPlaying={() => removePlayingAudio(audio)}
                />
              ))}
            </>
          )}
        </>
      )}
    </Modal>
  )
}

export default AudioSettingsModal
