import { LambdaHelper } from '../helpers/LambdaHelper'
import { EditedBackgroundImageProcessPayload } from '../types/GeneratorProcessJob.types'
import { GeneratorBackgroundImageController } from '../controllers/GeneratorBackgroundImageController'

export const generatorEditedBackgroundImageJobHandle = async (
  event: {
    compressedPayload: string
  },
  context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as EditedBackgroundImageProcessPayload

  console.log('new generator edited background image process received', payload)
  await GeneratorBackgroundImageController.generateEditedBackgroundImage(
    payload,
  )
  console.log('generator edited background image process completed')
}
