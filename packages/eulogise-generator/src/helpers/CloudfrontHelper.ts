import {
  CloudFrontClient,
  CreateInvalidationCommand,
  CreateInvalidationCommandInput,
} from '@aws-sdk/client-cloudfront'
import { GENERATOR_CONFIG } from '../config'

const client = new CloudFrontClient()

export class CloudfrontHelper {
  public static createInvalidations = async ({
    distributionId = GENERATOR_CONFIG.AWS_CLOUD_FRONT_MEDIA_DISTRIBUTION_ID,
    paths,
  }: {
    distributionId?: string
    paths: Array<string>
  }): Promise<void> => {
    try {
      console.log('Creating invalidation:', paths)
      const params = {
        DistributionId: distributionId,
        InvalidationBatch: {
          Paths: {
            Quantity: 1,
            Items: paths,
          },
          CallerReference: `${Date.now()}`,
        },
      } as CreateInvalidationCommandInput
      const command = new CreateInvalidationCommand(params)
      const data = await client.send(command)
      console.log('Invalidation successful:', data)
    } catch (ex) {
      console.error('Error creating invalidation:', ex)
      throw new Error(ex)
    }
  }

  public static createInvalidation = async ({
    distributionId = GENERATOR_CONFIG.AWS_CLOUD_FRONT_MEDIA_DISTRIBUTION_ID,
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
