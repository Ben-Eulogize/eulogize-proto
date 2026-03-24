import { Context, APIGatewayEvent } from 'aws-lambda'
import { ProductThumbnailGeneratorJobPayload } from '../types/GeneratorProcessJob.types'
import { GeneratorThemeController } from '../themes/GeneratorThemeController'
import { LambdaHelper } from '../helpers/LambdaHelper'

export const generatorProductThumbnailJobHandle = async (
  event: APIGatewayEvent & {
    compressedPayload: string
  },
  context: Context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as ProductThumbnailGeneratorJobPayload
  console.log('new generator product theme thumbnail job received', payload)
  if (
    (event as unknown as { source: string }).source ===
    'serverless-plugin-warmup'
  ) {
    console.log('WarmUp - Lambda is warm!')
    return 'Lambda is warm!'
  }
  try {
    console.log('GeneratorThemeController.generateThumbnail payload', payload)
    await GeneratorThemeController.generateThumbnail(payload)
  } catch (ex) {
    console.log('GeneratorThemeController.generateThumbnail error', ex)
    throw ex
  }
}
