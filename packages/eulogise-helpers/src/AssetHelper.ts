// @ts-ignore
import mediaTags from 'jsmediatags/dist/jsmediatags'
import {
  IAudioAsset,
  IAudioAssetCategory,
  IAudioAssetContent,
  IAudioTag,
  ICategorizedAudio,
  IFilestackImageEnhancePreset,
  IImageAsset,
  IImageAssetContent,
} from '@eulogise/core'
import { EulogiseClientConfig } from '@eulogise/client-core'

export class AssetHelper {
  public static categoriseAudios(
    audios: Array<IAudioAsset>,
  ): Array<ICategorizedAudio> {
    let categorizedAudios: Array<ICategorizedAudio> = []
    audios.forEach((audio: IAudioAsset) => {
      const audioContent: IAudioAssetContent = audio.content
      const categoryName: string = audioContent.category
      const foundCategory: ICategorizedAudio = categorizedAudios.find(
        (categorizedAudio: ICategorizedAudio) =>
          categorizedAudio.name === categoryName,
      )!
      if (foundCategory) {
        foundCategory.audios.push(audio)
      } else {
        const category = {
          name: categoryName,
          audios: [audio],
        }
        if (categoryName === IAudioAssetCategory.UPLOADED) {
          categorizedAudios = [category].concat(categorizedAudios)
        } else {
          categorizedAudios.push(category)
        }
      }
    })
    return categorizedAudios
  }

  public static getAudioUrl(
    trackData: IAudioAssetContent,
    options?: { caseId: string; bucketUrl?: string },
  ) {
    const bucketUrl = options?.bucketUrl ?? EulogiseClientConfig.AWS_S3_URL
    const isStockMusic = /slideshow\/audio/.test(trackData.filepath)
    if (isStockMusic) {
      return `${bucketUrl}/${trackData.filepath}`
    }
    if (trackData.filestackHandle) {
      return `${EulogiseClientConfig.FILESTACK_CDN}/${trackData.filestackHandle}`
    }

    if (trackData.category === IAudioAssetCategory.UPLOADED) {
      return `${bucketUrl}/cases/${options?.caseId}/audio/${trackData.filename}`
    }

    return `${bucketUrl}/slideshow/audio/${trackData.filename}`
  }

  public static getAudioTag(file: any): Promise<IAudioTag> {
    return new Promise((resolve, reject) => {
      mediaTags.read(file, {
        onSuccess: function (result: any) {
          resolve(result.tags)
        },
        onError: function (error: any) {
          reject(error)
        },
      })
    })
  }

  public static getAudioName(audioContent: IAudioAssetContent) {
    return audioContent.title
      ? audioContent.title
      : audioContent.filename
          .replace(/^[A-Za-z0-9]+_/g, '')
          .replace(/\..+$/, '')
  }

  public static getAudioDuration(url: string): Promise<number> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const audio = new Audio(url)

      audio.addEventListener('loadeddata', () => {
        resolve(audio.duration)
      })

      audio.addEventListener('error', (error: any) => {
        reject(error)
      })
    })
  }

  public static getAudiosDurations(audioAssets: Array<IAudioAsset>): number {
    if (!audioAssets) {
      return 0
    }
    return audioAssets.reduce((acc, cur) => {
      if (!cur || !cur?.content || !cur?.content?.duration) {
        return acc
      }
      return acc + cur?.content?.duration! ?? acc
    }, 0)
  }

  public static getSelectedAudiosDurations(
    selectedAudioAssets: Array<IAudioAssetContent>,
  ): number {
    if (!selectedAudioAssets) {
      return 0
    }
    return selectedAudioAssets.reduce(
      (acc, cur) => acc + cur?.duration! ?? 0,
      0,
    )
  }

  public static getProperSilenceAudioFileName(slideshowDuration: number) {
    const ONE_HOUR_DURATION = 60 * 60 * 1000
    const THIRTY_TWO_MINS_DURATION = 32 * 60 * 1000
    const SIXTEEN_MINS_DURATION = 16 * 60 * 1000
    const EIGHT_MINS_DURATION = 8 * 60 * 1000
    const FOUR_MINS_DURATION = 4 * 60 * 1000

    if (slideshowDuration <= 0) {
      return '1-hour-slience.mp3'
    } else if (slideshowDuration < FOUR_MINS_DURATION) {
      return '4-mins-slience.mp3'
    } else if (slideshowDuration < EIGHT_MINS_DURATION) {
      return '8-mins-slience.mp3'
    } else if (slideshowDuration < SIXTEEN_MINS_DURATION) {
      return '16-mins-slience.mp3'
    } else if (slideshowDuration < THIRTY_TWO_MINS_DURATION) {
      return '32-mins-slience.mp3'
    } else if (slideshowDuration < ONE_HOUR_DURATION) {
      return '1-hour-slience.mp3'
    } else {
      return '1-hour-slience.mp3'
    }
  }

  public static sortImagesByFileName(images: IImageAsset[]): IImageAsset[] {
    if (!images) {
      return []
    }

    const getSortableName = (image?: IImageAsset): string =>
      image?.content?.filename ?? ''

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base',
    })

    return [...images].sort((imageA, imageB) =>
      collator.compare(getSortableName(imageA), getSortableName(imageB)),
    )
  }

  public static sortImagesByUpdatedAt(images: IImageAsset[]): IImageAsset[] {
    if (!images) {
      return []
    }
    const deepCopiedImages = JSON.parse(JSON.stringify(images))
    const sortedFiles = deepCopiedImages.sort(
      (imageA: IImageAsset, imageB: IImageAsset) => {
        return imageA.updatedAt > imageB.updatedAt
          ? -1
          : imageA.updatedAt < imageB.updatedAt
          ? 1
          : 0
      },
    )
    return sortedFiles
  }

  public static sortImagesByRandom(images: IImageAsset[]): IImageAsset[] {
    if (!images) {
      return []
    }
    const imagesInputCopy = [...images]

    // Fisher-Yates (Durstenfeld) algorithm to shuffle the array
    for (let i = imagesInputCopy.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))

      // Swap elements
      ;[imagesInputCopy[i], imagesInputCopy[randomIndex]] = [
        imagesInputCopy[randomIndex],
        imagesInputCopy[i],
      ]
    }
    return imagesInputCopy
  }

  public static getCustomisedImagesOrderIdsByImages(
    images: IImageAsset[],
  ): string[] {
    if (!images) {
      return []
    }
    return images?.map((i) => {
      return i?.id
    })
  }

  public static removeNonExistedImagesFromCustomImagesOrderIds(
    images: Array<IImageAsset>,
    customisedImagesOrderIds: Array<string>,
  ): Array<string> {
    if (!images || images?.length === 0) {
      return customisedImagesOrderIds
    }
    if (!customisedImagesOrderIds || customisedImagesOrderIds?.length === 0) {
      return []
    }
    return customisedImagesOrderIds?.filter((id: string) => {
      const imagesIds = images?.map((image) => image.id)
      return imagesIds?.includes(id)
    })
  }

  public static getNewImagesOrderByStoredImagesOrderIds(
    images: Array<IImageAsset>,
    customisedImagesOrderIds: Array<string>,
  ): Array<IImageAsset> {
    if (!images || images?.length === 0) {
      return images
    }
    if (!customisedImagesOrderIds || customisedImagesOrderIds?.length === 0) {
      return images
    }
    if (images && customisedImagesOrderIds?.length > 0) {
      const existedImagesOrderIds: Array<string> =
        this.removeNonExistedImagesFromCustomImagesOrderIds(
          images,
          customisedImagesOrderIds,
        )
      const existedOrderedImages: Array<IImageAsset> =
        existedImagesOrderIds?.map((imageId: string) => {
          const foundImage: IImageAsset = images.find((i) => i.id === imageId)!
          return foundImage
        })
      const newImagesNotExistedInCustomOrder: Array<IImageAsset> =
        images?.filter((image) => {
          return !existedImagesOrderIds?.includes(image?.id)!
        })
      return [...existedOrderedImages, ...newImagesNotExistedInCustomOrder]
    }
    return images
  }

  public static toggleEnhanceImagePreset(image: IImageAsset): IImageAsset {
    const isEnhanced =
      image?.content?.preset === IFilestackImageEnhancePreset.AUTO
    const updatedContent = {
      ...image.content,
      preset: isEnhanced
        ? IFilestackImageEnhancePreset.NULL
        : IFilestackImageEnhancePreset.AUTO,
    } as IImageAssetContent
    return {
      ...image,
      content: updatedContent,
    }
  }
}
