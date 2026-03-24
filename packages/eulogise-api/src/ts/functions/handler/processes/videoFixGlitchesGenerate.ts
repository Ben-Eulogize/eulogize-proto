import { SlideshowVideoGeneratePayload } from '../../../utils/ApiLambdaHelper'
import { slideshowResourceController } from '../../controller'

export const videoFixGlitchesGenerateHandler = async (
  payload: SlideshowVideoGeneratePayload,
) => {
  console.log('videoFixGlitchesGenerateHandler', payload)
  await slideshowResourceController.fixGlitchesAndGenerate(payload)
  console.log('videoFixGlitchesGenerateHandler complete')
}
