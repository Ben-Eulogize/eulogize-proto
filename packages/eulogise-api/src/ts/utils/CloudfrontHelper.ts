import {
  CloudFrontClient,
  CreateInvalidationCommand,
  CreateInvalidationCommandInput,
} from '@aws-sdk/client-cloudfront'
import { CONFIG } from '../config/Config'

const client = new CloudFrontClient()

export class CloudfrontHelper {
  public static createInvalidations = async ({
    distributionId = CONFIG.AWS_CLOUD_FRONT_MEDIA_DISTRIBUTION_ID,
    paths,
  }: {
    distributionId?: string
    paths: Array<string>
  }): Promise<void> => {
    try {
      console.log('Creating invalidations:', paths)
      const params = {
        DistributionId: distributionId,
        InvalidationBatch: {
          Paths: {
            Quantity: paths.length,
            Items: paths,
          },
          CallerReference: `${Date.now()}`,
        },
      } as CreateInvalidationCommandInput
      const command = new CreateInvalidationCommand(params)
      const data = await client.send(command)
      console.log('Invalidations successful:', data)
    } catch (ex) {
      console.error('Error creating invalidations:', ex)
      throw new Error(ex)
    }
  }

  public static createInvalidation = async ({
    distributionId = CONFIG.AWS_CLOUD_FRONT_MEDIA_DISTRIBUTION_ID,
    path,
  }: {
    distributionId?: string
    path: string
  }): Promise<void> => {
    console.log('Creating invalidation:', path)
    return this.createInvalidations({
      distributionId,
      paths: [path],
    })
  }
}
