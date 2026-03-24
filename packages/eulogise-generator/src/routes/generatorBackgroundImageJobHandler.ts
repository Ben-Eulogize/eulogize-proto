import { BackgroundImageProcessPayload } from '../types/GeneratorProcessJob.types'
import { GeneratorBackgroundImageController } from '../controllers/GeneratorBackgroundImageController'
import { LambdaHelper } from '../helpers/LambdaHelper'

export const generatorBackgroundImageJobHandle = async (
  event: {
    compressedPayload: string
  },
  context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as BackgroundImageProcessPayload

  console.log('new generator background image process received', payload)
  await GeneratorBackgroundImageController.generateBackgroundImage(payload)
  console.log('generator background image process completed')
}
