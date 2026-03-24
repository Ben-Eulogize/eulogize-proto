const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const { SSMClient, PutParameterCommand } = require('@aws-sdk/client-ssm')

const args = process.argv.slice(2)
const parsedArgs = args.reduce((acc, arg, index) => {
  if (!arg.startsWith('--')) return acc
  const key = arg.replace(/^--/, '')
  const value =
    args[index + 1] && !args[index + 1].startsWith('--')
      ? args[index + 1]
      : true

  if (acc[key] === undefined) {
    acc[key] = value
  } else if (Array.isArray(acc[key])) {
    acc[key].push(value)
  } else {
    acc[key] = [acc[key], value]
  }

  return acc
}, {})

const envName =
  parsedArgs.env ||
  process.env.ENV ||
  process.env.ENVIRONMENT ||
  process.env.NODE_ENV
const envFile =
  parsedArgs.file ||
  (envName
    ? path.resolve(__dirname, '..', 'environments', `.env.${envName}`)
    : null)
const ssmPath = parsedArgs.path || process.env.SSM_PATH
const region =
  process.env.SSM_REGION ||
  process.env.AWS_REGION ||
  process.env.AWS_DEFAULT_REGION
const kmsKeyId = parsedArgs['kms-key-id'] || process.env.SSM_KMS_KEY_ID

const isFalsey = (value) =>
  value === false || value === 'false' || value === '0'
const overwrite =
  !isFalsey(parsedArgs.overwrite) && parsedArgs['no-overwrite'] !== true
const skipEmpty =
  parsedArgs['skip-empty'] === undefined
    ? true
    : !isFalsey(parsedArgs['skip-empty'])
const failOnEmpty =
  parsedArgs['fail-on-empty'] === undefined
    ? false
    : !isFalsey(parsedArgs['fail-on-empty'])

const normalizeList = (value) => {
  if (!value || value === true) return []
  if (Array.isArray(value)) return value.flatMap(normalizeList)
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

const defaultType = parsedArgs.type || 'String'
const secureKeys = new Set(normalizeList(parsedArgs['secure-keys']))
const securePatternValue = parsedArgs['secure-pattern']
const securePattern = securePatternValue ? new RegExp(securePatternValue) : null
const maxRetries = Number(parsedArgs['max-retries'] || 5)
const retryBaseMs = Number(parsedArgs['retry-base-ms'] || 200)
const requestDelayMs = Number(parsedArgs['request-delay-ms'] || 0)

if (!envFile) {
  console.error('Missing env file. Provide --file or set --env.')
  process.exit(1)
}

if (Array.isArray(envFile)) {
  console.error('Multiple --file values provided. Use a single env file.')
  process.exit(1)
}

if (!ssmPath) {
  console.error('Missing SSM path. Provide --path or set SSM_PATH.')
  process.exit(1)
}

if (Array.isArray(ssmPath)) {
  console.error('Multiple --path values provided. Use a single SSM path.')
  process.exit(1)
}

if (!region) {
  console.error('Missing AWS region. Set AWS_REGION or AWS_DEFAULT_REGION.')
  process.exit(1)
}

if (!['String', 'SecureString'].includes(defaultType)) {
  console.error('Invalid --type. Use String or SecureString.')
  process.exit(1)
}

if (!fs.existsSync(envFile)) {
  console.error(`Env file not found at ${envFile}`)
  process.exit(1)
}

const normalizedPath = ssmPath.endsWith('/') ? ssmPath : `${ssmPath}/`

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const isRetryableError = (error) => {
  const name = error && (error.name || error.__type || '')
  const message = error && error.message ? error.message : ''
  return (
    /Throttling/i.test(name) ||
    /Throttling/i.test(message) ||
    /TooManyUpdates/i.test(name) ||
    /RequestLimitExceeded/i.test(name) ||
    /Rate exceeded/i.test(message)
  )
}

const sendWithRetry = async (client, command) => {
  let attempt = 0

  while (true) {
    try {
      return await client.send(command)
    } catch (error) {
      attempt += 1
      const shouldRetry = isRetryableError(error) && attempt <= maxRetries
      if (!shouldRetry) throw error

      const jitter = Math.floor(Math.random() * retryBaseMs)
      const delay = retryBaseMs * Math.pow(2, attempt - 1) + jitter
      await sleep(delay)
    }
  }
}

const resolveType = (key) => {
  if (defaultType === 'SecureString') return 'SecureString'
  if (secureKeys.has(key)) return 'SecureString'
  if (securePattern && securePattern.test(key)) return 'SecureString'
  return 'String'
}

const loadEnvValues = () => {
  const contents = fs.readFileSync(envFile)
  const parsed = dotenv.parse(contents)
  return parsed
}

const main = async () => {
  const values = loadEnvValues()
  const entries = Object.entries(values)

  if (!entries.length) {
    console.error(`No values found in ${envFile}`)
    process.exit(1)
  }

  const client = new SSMClient({ region })
  let pushed = 0

  for (const [key, value] of entries) {
    const name = `${normalizedPath}${key}`
    const type = resolveType(key)
    const stringValue =
      value === undefined || value === null ? '' : String(value)

    if (stringValue.length === 0) {
      if (failOnEmpty) {
        console.error(`Empty value not allowed for ${key}`)
        process.exit(1)
      }

      if (skipEmpty) {
        console.warn(`Skipping empty value for ${key}`)
        continue
      }

      console.error(
        `Empty value not allowed by SSM for ${key}. Use --skip-empty or set a value.`,
      )
      process.exit(1)
    }

    const commandInput = {
      Name: name,
      Value: stringValue,
      Type: type,
      Overwrite: overwrite,
    }

    if (type === 'SecureString' && kmsKeyId) {
      commandInput.KeyId = kmsKeyId
    }

    await sendWithRetry(client, new PutParameterCommand(commandInput))
    pushed += 1

    if (requestDelayMs > 0) {
      await sleep(requestDelayMs)
    }
  }

  console.log(`Pushed ${pushed} parameters to ${normalizedPath}`)
}

main().catch((error) => {
  console.error('Failed to push SSM parameters:', error)
  process.exit(1)
})
