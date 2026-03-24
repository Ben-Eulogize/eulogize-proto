import { S3Helper } from '../src/ts/utils/S3Helper'
import { CONFIG } from '../src/ts/config/Config'
import BBPromise from 'bluebird'

const start = async () => {
  const list: Array<{ Key: string }> = await S3Helper.listAllObjects({
    bucket: CONFIG.AWS_S3_BUCKET,
    prefix: 'cases',
  })
  BBPromise.map(
    list,
    async ({ Key }) => {
      if (/\/frames\//.test(Key)) {
        await S3Helper.deleteObject({
          key: Key,
        })
      }
    },
    { concurrency: 50 },
  )
}

start()
