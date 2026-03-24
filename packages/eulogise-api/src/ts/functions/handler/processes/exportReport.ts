import { ReportController } from '../../controller/ReportController'
import { CONFIG } from '../../../config/Config'
import fs from 'fs'
import { S3Helper } from '../../../utils/S3Helper'
import { ReportHelper } from '../../../utils/ReportHelper'

export const exportReportHandler = async () => {
  console.log('exportReportHandler')

  const fileName = ReportHelper.getReportFileName()
  const filePath = `${CONFIG.TMP_DIR}/${fileName}`
  const s3Path = ReportHelper.getReportS3FilePath()

  console.log('Exporting to Csv')
  const reportController = new ReportController()
  const csv = await reportController.exportOverviewReportToCsv()

  // save to local
  fs.writeFileSync(filePath, csv)

  console.log('Clean up s3 report file')
  await S3Helper.deleteObject({
    key: s3Path,
  })

  console.log('Uploading to s3')
  // upload to s3
  await S3Helper.uploadToS3({
    filePath,
    s3Path,
    isCheck: true,
  })
}
