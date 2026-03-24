import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../environments/.env.test.local` })
;[
  'DB_PREFIX',
  'WEBTOKEN_SECRET',
  'GENERATOR_API_URL',
  'EULOGISE_APP_DOMAIN',
  'EULOGISE_API_DOMAIN',
  'XAWS_REGION',
  'XAWS_DYNAMO_DB_REGION',
  'XAWS_DYNAMO_DB_ENDPOINT',
  'XAWS_ACCESS_KEY',
  'XAWS_SECRET_KEY',
  'XAWS_S3_BUCKET',
  'DYNAMODB_CREATE_TABLE_ON_START',
].forEach((key) => {
  console.log(key, process.env[key])
})
/*
beforeEach(async () => {
  console.log('Environment', process.env.ENV)
  if (process.env.ENV !== 'development') {
    throw Error('To run the test. You must run in a development environment')
    return
  }
  /!*const models = [clientModel, userModel]
  for (const Model of models) {
    console.log('deleting', Model.getModel().originalName)
    const items = await Model.getModel().scan().exec()
    const ids = items.map(({ id }) => id)
    if (ids.length > 0) {
      await Model.getModel().batchDelete(ids)
    }
  }*!/
  console.log('Complete setup')
})
*/
