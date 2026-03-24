import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'
import { CONFIG } from '../config/Config'
import { EulogiseProduct, EulogiseRegion } from '@eulogise/core'

export enum ApiLambdaJobTypes {
  EXPORT_REPORT_TO_CSV = 'EXPORT_REPORT_TO_CSV',
  POPULATE_CASE_REPORT_TABLE = 'POPULATE_CASE_REPORT_TABLE',
  REINDEX_REDIS_DB = 'REINDEX_REDIS_DB',
  VIDEO_FIX_GLITCHES_AND_GENERATE = 'VIDEO_FIX_GLITCHES_AND_GENERATE',
}

export type ExportReportToCsvPayload = {
  from: string
  to: string
}

export type PopulateCaseReportTablePayload = {}

export type RedisIndex = 'themes' | 'users' | 'invoices'

export type ReindexRedisDbPayload = {
  redisIndexes: Array<RedisIndex>
}

export type SlideshowVideoGeneratePayload = {
  memorialProductId: string
  product?: EulogiseProduct
  region?: EulogiseRegion
  additionalPayload?: object
  generateUserId: string
}

const httpOptions = {
  timeout: 480000, // 8 minutes in milliseconds
}
const requestHandler = {
  requestTimeout: httpOptions.timeout,
  connectionTimeout: httpOptions.timeout,
}
const client = new LambdaClient({
  requestHandler,
})

export class ApiLambdaHelper {
  public static async invokeJob(
    jobType: ApiLambdaJobTypes,
    payload:
      | ExportReportToCsvPayload
      | PopulateCaseReportTablePayload
      | ReindexRedisDbPayload
      | SlideshowVideoGeneratePayload,
    isAsync = false,
  ) {
    console.log('invoke job', { jobType, payload })
    let invokeFunctionName: string | undefined

    switch (jobType) {
      case ApiLambdaJobTypes.EXPORT_REPORT_TO_CSV: {
        invokeFunctionName = CONFIG.EXPORT_REPORT_PROCESS_FN
        break
      }
      case ApiLambdaJobTypes.POPULATE_CASE_REPORT_TABLE: {
        invokeFunctionName = CONFIG.POPULATE_CASE_REPORT_TABLE_PROCESS_FN
        break
      }
      case ApiLambdaJobTypes.REINDEX_REDIS_DB: {
        if (!CONFIG.REDIS_HOST) {
          return
        }

        invokeFunctionName = CONFIG.REINDEX_REDIS_DB_PROCESS_FN
        break
      }
      case ApiLambdaJobTypes.VIDEO_FIX_GLITCHES_AND_GENERATE: {
        invokeFunctionName = CONFIG.VIDEO_FIX_GLITCHES_AND_GENERATE_PROCESS_FN
      }
    }

    const command = new InvokeCommand({
      FunctionName: invokeFunctionName,
      InvocationType: isAsync ? 'Event' : 'RequestResponse',
      Payload: JSON.stringify(payload),
    })

    return client.send(command)
  }
}
