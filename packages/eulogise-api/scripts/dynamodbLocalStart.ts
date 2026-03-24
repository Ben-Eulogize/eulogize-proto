import * as DynamoDbLocal from 'dynamodb-local'
import fs from 'fs'
const dynamoDbDir = `${__dirname}/../.dynamodb-local`

if (!fs.existsSync(dynamoDbDir)) {
  fs.mkdirSync(dynamoDbDir)
}
const dynamoLocalPort = 8002

const start = async () => {
  console.log(`Starting DynamoDb Locally at ${dynamoLocalPort}`)
  await DynamoDbLocal.launch(dynamoLocalPort, dynamoDbDir, ['-sharedDb']) //if you want to share with Javascript Shell
  console.log(`Started DynamoDb Locally at ${dynamoLocalPort}`)
}

start()
