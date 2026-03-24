import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { EulogiseUserRole } from '@eulogise/core'
import { V2RoutePutRequestEvent } from '../../../../types/routes.types'
import {
  ApiLambdaHelper,
  ApiLambdaJobTypes,
} from '../../../../utils/ApiLambdaHelper'
import { S3Helper } from '../../../../utils/S3Helper'
import { ReportHelper } from '../../../../utils/ReportHelper'

const permitRoles = [EulogiseUserRole.ADMIN]

const exportReportOverviewCsv = async (
  event: V2RoutePutRequestEvent<{
    from: string
    to: string
  }>,
): Promise<any> => {
  const {
    body: { from, to },
  } = event

  console.log('Clean up s3 report file')
  await S3Helper.deleteObject({
    key: ReportHelper.getReportS3FilePath(),
  })

  console.log('exportReportOverviewCsv', { from, to })
  await ApiLambdaHelper.invokeJob(
    ApiLambdaJobTypes.EXPORT_REPORT_TO_CSV,
    {
      from,
      to,
    },
    true,
  )
  return {
    message: `Generating report process started`,
  }
}

export default {
  '/admin/report/export/csv': {
    POST: RouteMiddleware.authMiddleware(permitRoles, exportReportOverviewCsv),
  },
}
