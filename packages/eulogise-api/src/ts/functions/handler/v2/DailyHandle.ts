import { DbCleanUpHelper } from '../../../utils/DbCleanUpHelper'
import { S3CleanUpHelper } from '../../../utils/S3CleanUpHelper'

export const dailyTask = async (event: any, context: any, pathParams: any) => {
  console.log('dailyTask', pathParams)

  /*
  Database Clean up Strategy
  - HARD (development/staging) - Remove cases older than a week
  - SOFT (production) - Remove cases older than 3 months (keep active cases, Completed or Downloaded) (keep client cases)
  - NONE - Do not clean up database
   */
  switch (process.env.DB_CLEANUP_STRATEGY) {
    // for staging and development
    case 'HARD': {
      console.log('DB_CLEANUP_STRATEGY: HARD')
      await DbCleanUpHelper.deleteCasesOlderThan1Week()
      break
    }
    // for production
    case 'SOFT': {
      console.log('DB_CLEANUP_STRATEGY: SOFT')
      await DbCleanUpHelper.deleteCaseOlderThan3MonthsNonClientCasesAndNotActiveStatus()
      await S3CleanUpHelper.cleanupOldFramesFolder()
      break
    }
    default: {
      console.log('DB_CLEANUP_STRATEGY not set - not cleaning up database')
    }
  }
  return 'dailyTask'
}
