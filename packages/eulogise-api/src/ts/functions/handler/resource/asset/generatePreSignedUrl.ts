import { Lambdur } from 'lambdur'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'
import { Webtoken } from '../../../../webtoken'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { CONFIG } from '../../../../config/Config'

export const resourceGeneratePreSignedUrlHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  let generatedUrlResult: any

  try {
    const bucket = CONFIG.AWS_S3_BUCKET
    const key = request?.body?.key

    if (!bucket || !key) {
      throw Error(
        'no bucket or no filename in the payload to generate a pre-signed url',
      )
    }

    const clientUrl = await createPresignedUrlWithClient({
      region: CONFIG.AWS_REGION || 'us-east-2',
      bucket,
      key,
    })

    generatedUrlResult = {
      preSignedUrl: clientUrl,
    }
  } catch (error) {
    console.log(
      `🚨 Something wrong in resourceGeneratePreSignedUrlHandler, error is ${error}`,
      error,
    )
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to generate url for key ${request.body.key}`,
    })
  }

  return {
    statusCode: 200,
    body: {
      item: generatedUrlResult,
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceGeneratePreSignedUrlHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Query {
    bucket: string
    key: string
  }
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: handler.Query
  }
  export interface Response extends Lambdur.Handler.Response {
    body: {
      item: any
    }
  }
}

const createPresignedUrlWithClient = ({
  region = CONFIG.AWS_REGION!,
  bucket,
  key,
}: {
  region: string
  bucket: string
  key: string
}): Promise<string> => {
  if (!CONFIG.AWS_ACCESS_KEY || !CONFIG.AWS_SECRET_KEY) {
    throw new Error(
      'AWS_ACCESS_KEY or AWS_SECRET_KEY is not set in the environment variables',
    )
  }
  const client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: CONFIG.AWS_ACCESS_KEY,
      secretAccessKey: CONFIG.AWS_SECRET_KEY,
    },
  })
  const command = new PutObjectCommand({ Bucket: bucket, Key: key })
  // @ts-ignore
  return getSignedUrl(client, command, { expiresIn: 3600 })
}
