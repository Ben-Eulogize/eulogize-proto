import { Context, APIGatewayEvent } from 'aws-lambda'
import { LambdaHelper } from '../helpers/LambdaHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
import { GhostscriptHelper } from '../helpers/GhostscriptHelper'
import { S3Helper } from '../core/S3Helper'
import { ConvertToPrintablePdfProcessPayload } from '../types/GeneratorProcessJob.types'

export const generatorConvertToPrintablePdfJobHandle = async (
  event: APIGatewayEvent & { compressedPayload: string },
  context: Context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as ConvertToPrintablePdfProcessPayload
  console.log('new generator ghostscript job received', payload)

  const { caseId, s3Key, product } = payload

  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-GHOSTSCRIPT-START (${caseId}). ${product}`,
  })

  try {
    // Download the PDF from S3
    console.log('Downloading PDF from S3:', s3Key)
    const s3KeyStrings = s3Key.split('/')
    const localInputPath = `/tmp/${s3KeyStrings[s3KeyStrings.length - 1]}`
    await S3Helper.downloadFile({ key: s3Key, filePath: localInputPath })
    console.log('Downloaded to local path:', localInputPath)

    // Convert PDF using Ghostscript
    console.log('Converting PDF with Ghostscript')
    const { outputFilePath } = GhostscriptHelper.convertPdfToPrintableFormat({
      inputFilePath: localInputPath,
    })
    console.log('Ghostscript conversion completed:', outputFilePath)

    // Upload the converted PDF back to S3
    console.log('Uploading converted PDF to S3')
    const s3OutputPath = s3Key.replace('.pdf', '-converted.pdf')
    await S3Helper.uploadToS3({
      filePath: outputFilePath,
      s3Path: s3OutputPath,
    })
    console.log('Uploaded to S3:', s3OutputPath)

    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-GHOSTSCRIPT-END (${caseId}). Completed Ghostscript conversion. ${product}`,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        outputFilePath: s3OutputPath,
      }),
    }
  } catch (error) {
    console.log('GENERATOR-GHOSTSCRIPT-ERROR', error)

    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-GHOSTSCRIPT-ERROR (${caseId}). Error converting PDF. ${product}. ${error.message}`,
      notifyChannel: true,
    })

    throw error
  }
}
