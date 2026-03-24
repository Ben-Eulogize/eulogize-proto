import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'
import zlib from 'zlib'
import {
  BackgroundImageProcessPayload,
  CaptureScreenshotProcessPayload,
  CardProductSingleScreenshotGeneratorJobPayload,
  ConvertToPrintablePdfProcessPayload,
  EditedBackgroundImageProcessPayload,
  GeneratorProcessJobTypes,
  MasterSlideshowProcessPayload,
  MasterVideoGenerationProcessPayload,
  PdfGeneratorJobPayload,
  ProductThumbnailGeneratorJobPayload,
  ScreenshotTriggerPayload,
  SlaveFinaliseVideoProcessPayload,
  SlaveVideoBlockGenerationProcessPayload,
} from '../types/GeneratorProcessJob.types'
import { GENERATOR_CONFIG } from '../config'

const LambdaHelper: any = {}

console.log(
  'GENERATOR_CONFIG.AWS_LAMBDA_ENDPOINT',
  GENERATOR_CONFIG.AWS_LAMBDA_ENDPOINT,
)
const httpOptions = {
  timeout: 480000, // 8 minutes in milliseconds
}
const requestHandler = {
  requestTimeout: httpOptions.timeout,
  connectionTimeout: httpOptions.timeout,
}
const client = new LambdaClient(
  GENERATOR_CONFIG.AWS_LAMBDA_ENDPOINT
    ? {
        endpoint: GENERATOR_CONFIG.AWS_LAMBDA_ENDPOINT,
        requestHandler: requestHandler,
      }
    : {
        requestHandler,
      },
)

LambdaHelper.compressPayload = (payload: any): string => {
  console.log('compressing payload', payload)
  return zlib.gzipSync(JSON.stringify(payload)).toString('base64')
}

LambdaHelper.decompressPayload = (base64EncodedPayload: string): any => {
  const compressedPayload = Buffer.from(base64EncodedPayload, 'base64')

  // Decompress using Gzip
  const decompressedPayload = zlib.gunzipSync(compressedPayload)
  console.log('decompressed payload', decompressedPayload)

  // Convert the decompressed data back to JSON
  const parsedJson = JSON.parse(decompressedPayload.toString())
  console.log('decompressed payload parsedJson', parsedJson)
  return parsedJson
}

LambdaHelper.invokeJob = async (
  jobType: GeneratorProcessJobTypes,
  payload:
    | CaptureScreenshotProcessPayload
    | ScreenshotTriggerPayload
    | PdfGeneratorJobPayload
    | CardProductSingleScreenshotGeneratorJobPayload
    | MasterSlideshowProcessPayload
    | MasterVideoGenerationProcessPayload
    | SlaveVideoBlockGenerationProcessPayload
    | SlaveFinaliseVideoProcessPayload
    | ProductThumbnailGeneratorJobPayload
    | BackgroundImageProcessPayload
    | EditedBackgroundImageProcessPayload
    | ConvertToPrintablePdfProcessPayload,
  isAsync = false,
  delay?: number, // milliseconds
) => {
  console.log('invoke job', { jobType, payload })
  let invokeFunctionName: string | undefined
  // Apply delay if specified
  if (delay && delay > 0) {
    console.log(`Delaying Lambda invocation by ${delay}ms`)
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  switch (jobType) {
    case GeneratorProcessJobTypes.GENERATE_BACKGROUND_IMAGE: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_BACKGROUND_IMAGE_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.GENERATE_EDITED_BACKGROUND_IMAGE: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_EDITED_BACKGROUND_IMAGE_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.CAPTURE_SCREENSHOT: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_CAPTURE_SCREENSHOT_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.CONVERT_TO_PRINTABLE_PDF:
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_CONVERT_TO_PRINTABLE_PDF_PROCESS_FN
      break
    case GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT: {
      invokeFunctionName = GENERATOR_CONFIG.GENERATOR_PDF_GENERATION_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT_THUMBNAIL: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_PRODUCT_THUMBNAIL_GENERATION_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.GENERATE_SLIDESHOW_MASTER: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_MASTER_SLIDESHOW_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT_SINGLE_SCREENSHOT: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_CARD_PRODUCT_SINGLE_SCREENSHOT_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.CAPTURE_SCREENSHOT_TRIGGER: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_CAPTURE_SCREENSHOT_TRIGGER_FN
      break
    }
    case GeneratorProcessJobTypes.MASTER_VIDEO_GENERATION: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_MASTER_VIDEO_GENERATION_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.SLAVE_VIDEO_BLOCK_GENERATION: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_SLAVE_VIDEO_BLOCK_GENERATION_PROCESS_FN
      break
    }
    case GeneratorProcessJobTypes.SLAVE_FINALISE_VIDEO: {
      invokeFunctionName =
        GENERATOR_CONFIG.GENERATOR_SLAVE_FINALISE_VIDEO_PROCESS_FN
      break
    }

    default:
      throw new Error(`JobTypes (${jobType}) does not exist`)
  }

  console.log('invokeFunctionName', invokeFunctionName)

  const compressedPayload = LambdaHelper.compressPayload(payload)

  const preCompressSizeInBytes = Buffer.byteLength(JSON.stringify(payload))
  console.log(`preCompressedPayload size in bytes: ${preCompressSizeInBytes}`)
  const sizeInBytes = Buffer.byteLength(compressedPayload)

  console.log(`compressedPayload size in bytes: ${sizeInBytes}`)

  const command = new InvokeCommand({
    // InvocationRequest
    FunctionName: invokeFunctionName!, // required
    InvocationType: isAsync ? 'Event' : 'RequestResponse',

    /*
    LogType: "None" || "Tail",
    ClientContext: "STRING_VALUE",
*/
    Payload: Buffer.from(
      JSON.stringify({
        jobType,
        compressedPayload,
      }),
    ), // e.g. Buffer.from("") or new TextEncoder().encode("")
    //    Qualifier: "STRING_VALUE",
  })

  // @ts-ignore
  return client.send(command)
}

export { LambdaHelper }
