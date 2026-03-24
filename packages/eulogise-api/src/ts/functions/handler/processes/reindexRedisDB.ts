import {
  bookletModel,
  bookmarkModel,
  caseModel,
  clientModel,
  inviteModel,
  invoiceModel,
  sidedCardModel,
  slideshowModel,
  thankyouCardModel,
  themeModel,
  tvWelcomeScreenModel,
  userModel,
} from '../../../database'
import { ReindexRedisDbPayload } from '../../../utils/ApiLambdaHelper'
import { caseReportModel } from '../../../database/model/caseReport'

const RedisModelMap = [
  // { key: 'assets', model: assetModel },
  { key: 'booklets', model: bookletModel },
  { key: 'bookmarks', model: bookmarkModel },
  { key: 'cases', model: caseModel },
  { key: 'caseReports', model: caseReportModel },
  { key: 'clients', model: clientModel },
  { key: 'invites', model: inviteModel },
  { key: 'invoices', model: invoiceModel },
  { key: 'slideshows', model: slideshowModel },
  { key: 'sidedCards', model: sidedCardModel },
  { key: 'thankyouCards', model: thankyouCardModel },
  { key: 'tvWelcomeScreens', model: tvWelcomeScreenModel },
  { key: 'themes', model: themeModel },
  { key: 'users', model: userModel },
]

export const reindexRedisDBHandler = async (event: ReindexRedisDbPayload) => {
  const {
    redisIndexes = [
      // 'assets',
      'booklets',
      'bookmarks',
      'cases',
      'caseReports',
      'clients',
      'invites',
      'invoices',
      'slideshows',
      'sidedCards',
      'thankyouCards',
      'tvWelcomeScreens',
      'themes',
      'users',
    ],
  } = event
  console.log('reindexRedisDBHandler start', event)
  if (!redisIndexes || redisIndexes.length === 0) {
    console.log('No redis indexes to reindex')
    return
  }
  for (const redisIndex of redisIndexes) {
    console.log(`Reindexing redis index: ${redisIndex}`)
    const modelEntry = RedisModelMap.find((entry) => entry.key === redisIndex)
    if (modelEntry) {
      await modelEntry.model.reindexRedisRecords()
      console.log(`Reindexing ${redisIndex} completed`)
    } else {
      console.warn(`No model found for redis index: ${redisIndex}`)
    }
  }
  console.log('reindexRedisDBHandler finish')
}
