import dynamoose from 'dynamoose'
import { CONFIG } from '../config/Config'
const dbConfig = {
  endpoint: CONFIG.AWS_DYNAMO_DB_ENDPOINT,
  credentials: {
    accessKeyId: CONFIG.AWS_ACCESS_KEY || '',
    secretAccessKey: CONFIG.AWS_SECRET_KEY || '',
  },
  region: CONFIG.AWS_DYNAMO_DB_REGION || CONFIG.AWS_REGION,
}

const client = new dynamoose.aws.ddb.DynamoDB(dbConfig)

dynamoose.aws.ddb.set(client)

const defaultsTableConfig = {
  create: CONFIG.DYNAMODB.CREATE_TABLE_ON_START,
  prefix: `${process.env.DB_PREFIX}_`,
}
console.log('defaultsTableConfig', defaultsTableConfig)

dynamoose.Table.defaults.set(defaultsTableConfig)
