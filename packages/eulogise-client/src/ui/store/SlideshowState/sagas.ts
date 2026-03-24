import { takeEvery, put, select, throttle } from 'redux-saga/effects'
import {
  EulogiseProduct,
  EulogiseResource,
  IAudioAsset,
  ISlide,
  ISlideshowBackground,
  ISlideshowData,
  ISlideshowDataContent,
  ISlideshowTheme,
  MemorialVisualStatus,
  SlideshowActionTypes,
  TimelineType,
  UpdateBackgroundImageMode,
} from '@eulogise/core'
import {
  createSlideshowByCaseId,
  CreateSlideshowByCaseIdAction,
  DownloadSlideshowAction,
  FetchSlideshowsByIdAction,
  GenerateSlideshowAction,
  saveSlideshowByCaseId,
  SaveSlideshowByCaseIdAction,
  saveSlidesToSlideshowByCaseId,
  SaveTitleSlideAction,
  updateSlideshow,
  UpdateSlideshowBackgroundImageAction,
  // UpdateSlideshowDownloadPercentageAction,
  UpdateTitleSlideAction,
  UpsertSlideshowByCaseIdAction,
} from './actions'
import RequestHelper from '../../helpers/RequestHelper'
import {
  CardProductHelper,
  NavigationHelper,
  SlideshowHelper,
  ThemeHelper,
} from '@eulogise/helpers'
import { Notification } from '@eulogise/client-components'
import { DownloadHelper } from '../../helpers/DownloadHelper'

function* handleFetchSlideshowsByCaseId(action: FetchSlideshowsByIdAction) {
  const {
    payload: { caseId, isShareFlow, callback },
  } = action
  try {
    const {
      data: { items: slideshows },
    } = isShareFlow
      ? yield RequestHelper.request(`/v2/shares/cases/${caseId}/slideshow`, {})
      : yield RequestHelper.findResourceRequest({
          resource: EulogiseResource.SLIDESHOW,
          caseId,
        })
    let activeSlideshowTheme: ISlideshowTheme | undefined = undefined
    if (slideshows?.length > 0) {
      const themeId = (slideshows[0] as ISlideshowData).content.theme
      const {
        data: { theme },
      } = isShareFlow
        ? yield RequestHelper.request(
            `/v2/shares/cases/${caseId}/themes/${themeId}`,
            {},
          )
        : yield RequestHelper.fetchThemeById(themeId)
      activeSlideshowTheme = ThemeHelper.getProductThemeByProductType({
        theme,
        product: EulogiseProduct.SLIDESHOW,
      }) as ISlideshowTheme
    }

    yield put({
      type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS,
      payload: {
        items: slideshows,
        activeSlideshowTheme,
      },
    })

    if (callback) {
      callback(slideshows as Array<ISlideshowData>)
    }
  } catch (ex) {
    console.log('Exception', ex)
    yield put({
      type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_FAILED,
      payload: ex,
    })
  }
}

function* handleSaveSlideshowByCaseId(action: SaveSlideshowByCaseIdAction) {
  const { activeSlideshowTheme, activeItem } = yield select(
    (state) => state.slideshows,
  )
  const { payload } = action
  const { slideshowData, slideshowTheme, onSuccess } = payload ?? {}
  try {
    const currentSlideshowData = activeItem as ISlideshowData
    const newSlideshowData = slideshowData ?? currentSlideshowData
    // TODO: saving slideshow duration is mainly to satisfy generator. Once generator is rebuilt, the slide duration should be calculated on the generator
    const { duration } = SlideshowHelper.getSlideshowDurations({
      slideshowData: newSlideshowData,
      slideshowTheme: (slideshowTheme ??
        activeSlideshowTheme) as never as ISlideshowTheme,
    })

    let status = newSlideshowData.status
    if (
      NavigationHelper.hasProductBeenChanged &&
      CardProductHelper.isHigherProductStatusPriority(
        MemorialVisualStatus.EDITED,
        status,
      )
    ) {
      status = MemorialVisualStatus.EDITED
    }

    // @ts-ignore
    const { data } = yield RequestHelper.saveResourceRequest(
      EulogiseResource.SLIDESHOW,
      {
        ...newSlideshowData,
        content: {
          ...newSlideshowData.content,
          // @ts-ignore
          duration,
          audio: (newSlideshowData?.content?.audio ?? []).filter(Boolean),
        },
        status,
      },
    )
    yield put({
      type: SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID_SUCCESS,
      payload: { slideshow: data?.item, slideshowTheme },
    })
    if (onSuccess) {
      onSuccess(data.item.id!)
    } else {
      Notification.success(`Slideshow saved.`)
    }
    NavigationHelper.removeUnsavedListener()
  } catch (ex) {
    Notification.error(`Failed to save.`)
    console.log('Error', ex)
    yield put({
      type: SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID_FAILED,
    })
  }
}

function* handleUpdateTitleSlide(action: UpdateTitleSlideAction) {
  const {
    payload: { slideshowData, startTitleSlideData, endTitleSlideData },
  } = action
  const slides = slideshowData.content.slides
  const startTitleSlide = SlideshowHelper.getStartTitleSlide(slides)
  const endTitleSlide = SlideshowHelper.getEndTitleSlide(slides)
  const newSlides = [
    { ...startTitleSlide, ...startTitleSlideData },
    ...slides.slice(1, slides.length - 1),
    { ...endTitleSlide, ...endTitleSlideData },
  ]

  yield put(
    updateSlideshow({
      slideshow: {
        ...slideshowData,
        content: {
          ...slideshowData?.content,
          slides: newSlides,
        },
      },
    }),
  )
}

function* handleSaveTitleSlide(action: SaveTitleSlideAction) {
  const {
    payload: {
      endTitleSlideData,
      onSuccess,
      startTitleSlideData,
      caseId,
      slideshowData,
    },
  } = action
  const slides = slideshowData.content.slides
  const startTitleSlide = SlideshowHelper.getStartTitleSlide(slides)
  const endTitleSlide = SlideshowHelper.getEndTitleSlide(slides)
  const newSlides = [
    { ...startTitleSlide, ...startTitleSlideData },
    ...slides.slice(1, slides.length - 1),
    { ...endTitleSlide, ...endTitleSlideData },
  ]
  yield put(
    saveSlidesToSlideshowByCaseId({
      caseId,
      slideshowData,
      slides: newSlides,
      onSuccess,
    }),
  )
}

function* handleCreateSlideshowByCaseId(action: CreateSlideshowByCaseIdAction) {
  const {
    payload: { caseId, slideshowTheme, onSuccess, audio, themeId },
  } = action
  try {
    const timelineType: TimelineType = TimelineType.FIT_SLIDES
    const startSlides = SlideshowHelper.createStartSlides(slideshowTheme)
    const endTitleSlide: ISlide =
      SlideshowHelper.createEndTitleSlide(slideshowTheme)
    const slides: Array<ISlide> = [
      ...startSlides, // dummy image
      endTitleSlide,
    ]
    const defaultTitleSlideContent =
      SlideshowHelper.createDefaultTitleSlide(slideshowTheme)

    const slideshow: ISlideshowData = {
      case: caseId,
      status: MemorialVisualStatus.THEME_SELECTED,
      content: {
        timelineType,
        theme: themeId,
        imageFilter: slideshowTheme.content.themeDefaultImageFilter,
        audio,
        hasUserPreview: false,
        hasUserSave: false,
        slides,
        defaultTitleSlideContent,
      },
    }
    const { data } = yield RequestHelper.saveResourceRequest(
      EulogiseResource.SLIDESHOW,
      slideshow,
    )
    yield put({
      type: SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID_SUCCESS,
      payload: { slideshow: data.item, slideshowTheme },
    })
    if (onSuccess) {
      onSuccess(data.item.id!)
    }
    NavigationHelper.removeUnsavedListener()
  } catch (ex) {
    console.log('Exception', ex)
    Notification.error(`Failed to save slideshow.`)
    yield put({
      type: SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID_FAILED,
      payload: {
        ex,
      },
    })
  }
}

function* handleDownloadSlideshow(action: DownloadSlideshowAction) {
  const {
    payload: { deceasedName = 'Your loved one', caseId, onProgress },
  } = action
  try {
    const url = SlideshowHelper.getGeneratedSlideshowUrl({ caseId })
    yield RequestHelper.updateResourceRequest(
      CardProductHelper.getResourceByProduct(EulogiseProduct.SLIDESHOW),
      {
        case: caseId,
        status: MemorialVisualStatus.DOWNLOAD,
      },
    )
    yield DownloadHelper.downloadAs(
      url,
      `${deceasedName}'s Slideshow.mp4`,
      onProgress,
    )
    yield put({
      type: SlideshowActionTypes.DOWNLOAD_SLIDESHOW_SUCCESS,
    })
  } catch (ex) {
    Notification.error('Failed to download slideshow.')
    yield put({
      type: SlideshowActionTypes.DOWNLOAD_SLIDESHOW_FAILED,
    })
  }
}

function* handleResetSlideshow() {
  const { activeItem: slideshow } = yield select((state) => state.slideshows)
  const slides = slideshow?.content.slides
  const newSlides: Array<ISlide> =
    slides?.map((slide: ISlide) => ({
      ...slide,
      ...(slide?.image
        ? {
            image: {
              ...slide.image,
              animation: undefined,
              transitionIn: undefined,
              transitionOut: undefined,
            },
          }
        : {}),
    })) ?? []
  yield put(
    updateSlideshow({
      slideshow: {
        ...slideshow,
        content: {
          ...slideshow.content,
          slides: newSlides,
        },
      },
    }),
  )
}

function* handleUpsertSlideshowByCaseId(action: UpsertSlideshowByCaseIdAction) {
  const {
    payload: { slideshow, caseId, onSuccess, themeId },
  } = action
  const { audios } = yield select((state) => state.assets)
  const {
    data: { theme },
  } = yield RequestHelper.fetchThemeById(themeId)
  const slideshowTheme = ThemeHelper.getProductThemeByProductType({
    theme,
    product: EulogiseProduct.SLIDESHOW,
  }) as ISlideshowTheme
  if (!slideshowTheme) {
    console.log(`No slideshow theme available for the current theme`, theme)
    return
  }

  let shouldOverwriteSlideshowDefaultThemeTrack = false
  const overwriteThemeDefaultTracks: Array<IAudioAsset> = [
    audios?.filter(
      (a: IAudioAsset) =>
        a?.content?.title ===
        slideshowTheme?.content?.slideshowDefaultThemeTracks?.title,
    )?.[0]?.content,
  ]
  if (!slideshow) {
    shouldOverwriteSlideshowDefaultThemeTrack = true
  } else {
    if (slideshow) {
      const { activeSlideshowTheme: existingSlideshowTheme } = yield select(
        (state) => state.slideshows,
      )
      shouldOverwriteSlideshowDefaultThemeTrack =
        slideshow?.content?.audio?.length === 1 &&
        slideshow?.content?.audio?.[0]?.title ===
          existingSlideshowTheme?.content?.slideshowDefaultThemeTracks?.title &&
        slideshowTheme?.content?.slideshowDefaultThemeTracks?.title !==
          existingSlideshowTheme?.content?.slideshowDefaultThemeTracks?.title
    }
  }
  const newAudios = shouldOverwriteSlideshowDefaultThemeTrack
    ? overwriteThemeDefaultTracks
    : slideshow?.content?.audio ?? []

  if (slideshow) {
    const slides: Array<ISlide> = slideshow.content.slides
    const dynamicStartSlides: Array<ISlide> =
      slides.length > 0
        ? [slides[0], slides[1]]
        : SlideshowHelper.createStartSlides(slideshowTheme)
    const dynamicEndSlide: ISlide =
      SlideshowHelper.createEndTitleSlide(slideshowTheme)

    const newSlidesWithStartAndEndSlides = slides
      .map((s, index) => {
        if (
          s.slideType === 'Title Slide' ||
          s.slideType === 'End Title Slide'
        ) {
          return {
            ...s,
            background:
              SlideshowHelper.getTitleSlideBackgroundImageContent(
                slideshowTheme,
              ),
          }
        }
        return s
      })
      // remove the Start Slides (1 Title Slide, 1 Image Slide)  and End Slides (1 Title Slide)
      .filter((a, i) => i > 1 && i < slides.length - 1)

    const mergedSlides = [
      ...dynamicStartSlides,
      ...newSlidesWithStartAndEndSlides,
      dynamicEndSlide,
    ].filter((s) => s)

    // reset all the slides transitions so that it will use the default theme transitions
    const newSlides: Array<ISlide> = mergedSlides.map((slide) => ({
      ...slide,
      ...(slide?.image
        ? {
            image: {
              ...slide.image,
              animation: undefined,
              transitionIn: undefined,
              transitionOut: undefined,
            },
          }
        : {}),
    }))

    yield put(
      saveSlideshowByCaseId({
        slideshowTheme,
        slideshowData: {
          ...slideshow,
          content: {
            ...slideshow.content,
            slides: newSlides,
            audio: newAudios,
            theme: themeId,
            imageFilter: slideshowTheme.content.themeDefaultImageFilter,
            slideshowBackground: {},
            // reset border settings so that it will use the default theme border settings
            imageBorderSettings: undefined,
          },
        },
        onSuccess,
      }),
    )
    return
  }

  yield put(
    createSlideshowByCaseId({
      caseId,
      slideshowTheme,
      themeId,
      audio: newAudios,
      onSuccess,
    }),
  )
}

function* handleGenerateSlideshow(action: GenerateSlideshowAction) {
  const {
    payload: { slideshowId, isVideoBier },
  } = action
  try {
    const { account } = yield select((state) => state.auth)
    Notification.success('Slideshow is being generated')
    yield RequestHelper.generateResourceRequestExt({
      product: EulogiseProduct.SLIDESHOW,
      productId: slideshowId,
      data: {
        generateUserId: account?.id,
        isVideoBier,
      },
    })

    yield put({
      type: SlideshowActionTypes.GENERATE_SLIDESHOW_SUCCESS,
      payload: { slideshowId },
    })
  } catch (ex) {
    Notification.error('Failed to generate slideshow')
    yield put({
      type: SlideshowActionTypes.GENERATE_SLIDESHOW_FAILED,
      payload: ex,
    })
  }
}

function* handleUpdateSlideshowBackgroundImage(
  action: UpdateSlideshowBackgroundImageAction,
) {
  const {
    payload: {
      product,
      caseId,
      slideshowData,
      slides,
      backgroundImageSet,
      updateMode,
    },
  } = action
  if (
    product !== EulogiseProduct.SLIDESHOW ||
    !slideshowData ||
    !backgroundImageSet
  ) {
    return
  }
  if (updateMode === UpdateBackgroundImageMode.UPDATE_ALL_SLIDES) {
    const content: ISlideshowDataContent = slideshowData?.content
    const slideshowBackground: ISlideshowBackground | undefined =
      content?.slideshowBackground
    const newBackgroundImageUrl: string =
      backgroundImageSet?.slideshow?.slideBackgroundImageUrl

    const newSlideshowBackground: ISlideshowBackground = {
      ...slideshowBackground,
      image: {
        url: newBackgroundImageUrl,
      },
    }

    const newSlideshowData: ISlideshowData = {
      ...slideshowData,
      content: {
        ...slideshowData.content,
        slideshowBackground: newSlideshowBackground,
      },
    }

    if (newSlideshowBackground) {
      yield put(
        saveSlidesToSlideshowByCaseId({
          caseId,
          slideshowData: newSlideshowData,
          slides,
          onSuccess: () => Notification.success('Slideshow saved.'),
        }),
      )
    }
  }
}

/* Watchers */
function* watchers() {
  yield throttle(
    5000,
    SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID,
    handleFetchSlideshowsByCaseId,
  )
  yield takeEvery(
    SlideshowActionTypes.SAVE_SLIDESHOW_BY_CASE_ID,
    handleSaveSlideshowByCaseId,
  )
  yield takeEvery(
    SlideshowActionTypes.UPDATE_TITLE_SLIDE,
    handleUpdateTitleSlide,
  )
  yield takeEvery(SlideshowActionTypes.SAVE_TITLE_SLIDE, handleSaveTitleSlide)
  yield takeEvery(
    SlideshowActionTypes.CREATE_SLIDESHOW_BY_CASE_ID,
    handleCreateSlideshowByCaseId,
  )
  yield takeEvery(
    SlideshowActionTypes.DOWNLOAD_SLIDESHOW,
    handleDownloadSlideshow,
  )
  yield takeEvery(SlideshowActionTypes.RESET_SLIDESHOW, handleResetSlideshow)
  yield takeEvery(
    SlideshowActionTypes.UPSERT_SLIDESHOW_BY_CASE_ID,
    handleUpsertSlideshowByCaseId,
  )
  yield takeEvery(
    SlideshowActionTypes.GENERATE_SLIDESHOW,
    handleGenerateSlideshow,
  )
  yield takeEvery(
    SlideshowActionTypes.UPDATE_SLIDESHOW_BACKGROUND_IMAGE,
    handleUpdateSlideshowBackgroundImage,
  )
}

export const SlideshowSagas = [watchers()]
