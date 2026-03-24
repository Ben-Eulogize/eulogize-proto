import {
  EULOGISE_BACKGROUND_IMAGES,
  EulogiseRegion,
  ICardProductBackgroundImageBase,
} from '@eulogise/core'
import { S3Helper } from '../core/S3Helper'
import { BackgroundImageHelper } from '@eulogise/helpers'

export class BackgroundImageSetHelper {
  public static async verifyBackgroundImageSet(
    backgroundImageSet: ICardProductBackgroundImageBase,
  ): Promise<Array<string>> {
    const { id, name } = backgroundImageSet
    const regions: Array<EulogiseRegion> = [
      EulogiseRegion.AU,
      EulogiseRegion.USA,
    ]
    const missingAssets: Array<string> = []
    console.log('Verifying id ', id)
    for (let region of regions) {
      console.log('Verifying region', { id, region })
      const assetKeys = BackgroundImageHelper.getBackgroundImageAssetKeys(
        name,
        region,
      )
      for (let assetKey of assetKeys) {
        try {
          console.log('Verifying key', { id, region, assetKey })
          await S3Helper.checkExists(assetKey)
        } catch (ex) {
          console.log('Missing background image key', assetKey)
          missingAssets.push(assetKey)
        }
      }
    }
    return missingAssets
  }

  public static async verifyBackgroundImageSets() {
    let missingAssets: Array<string> = []
    for (const backgroundImageSet of EULOGISE_BACKGROUND_IMAGES) {
      const missings = await this.verifyBackgroundImageSet(backgroundImageSet)
      missingAssets = [...missingAssets, ...missings]
    }
    return missingAssets
  }
}
