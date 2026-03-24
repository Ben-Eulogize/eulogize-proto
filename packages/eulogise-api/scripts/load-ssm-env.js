const fs = require('fs')
const path = require('path')
const { SSMClient, GetParametersByPathCommand } = require('@aws-sdk/client-ssm')

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
const ssmPath = parsedArgs.path || process.env.SSM_PATH
const outputPath =
  parsedArgs.output ||
  (envName
    ? path.resolve(__dirname, '..', 'environments', `.env.${envName}`)
    : null)
const region =
  process.env.SSM_REGION ||
  process.env.AWS_REGION ||
  process.env.AWS_DEFAULT_REGION

if (!envName && !outputPath) {
  console.error(
    'Missing environment name. Provide --env or set ENV/ENVIRONMENT, or pass --output.',
  )
  process.exit(1)
}

const normalizePaths = (value) => {
  if (!value) return []
  if (value === true) return []
  if (Array.isArray(value)) return value.flatMap(normalizePaths)
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

const ssmPaths = normalizePaths(ssmPath)

if (!ssmPaths.length) {
  console.error('Missing SSM path. Provide --path or set SSM_PATH.')
  process.exit(1)
}

if (!region) {
  console.error('Missing AWS region. Set AWS_REGION or AWS_DEFAULT_REGION.')
  process.exit(1)
}

const normalizedPaths = ssmPaths.map((item) =>
  item.endsWith('/') ? item : `${item}/`,
)

const formatEnvValue = (value) => {
  const stringValue = value === undefined || value === null ? '' : String(value)
  const needsQuotes = /[\s#"'\\]/.test(stringValue)

  if (!needsQuotes) return stringValue

  const escaped = stringValue
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')

  return `"${escaped}"`
}

const fetchParametersByPath = async (client, ssmPathValue) => {
  const collected = []
  let nextToken

  do {
    const command = new GetParametersByPathCommand({
      Path: ssmPathValue,
      Recursive: true,
      WithDecryption: true,
      NextToken: nextToken,
    })

    const response = await client.send(command)
    if (response.Parameters) collected.push(...response.Parameters)
    nextToken = response.NextToken
  } while (nextToken)

  return collected
}

const writeEnvFile = (values) => {
  const keys = Object.keys(values)

  const lines = keys
    .sort()
    .map((key) => `${key}=${formatEnvValue(values[key])}`)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  const header = `# Generated from SSM paths ${normalizedPaths.join(', ')}\n`
  fs.writeFileSync(outputPath, `${header}${lines.join('\n')}\n`, {
    mode: 0o600,
  })

  console.log(`Wrote ${lines.length} parameters to ${outputPath}`)
}

const main = async () => {
  const client = new SSMClient({ region })
  const values = {}
  let foundAny = false

  for (const ssmPathValue of normalizedPaths) {
    const parameters = await fetchParametersByPath(client, ssmPathValue)
    if (!parameters.length) {
      console.warn(`No parameters found under ${ssmPathValue}`)
      continue
    }

    foundAny = true
    for (const parameter of parameters) {
      const key = parameter.Name.split('/').pop()
      if (!key) continue
      values[key] = parameter.Value || ''
    }
  }

  if (!foundAny) {
    console.error(`No parameters found under ${normalizedPaths.join(', ')}`)
    process.exit(1)
  }

  writeEnvFile(values)
}

main().catch((error) => {
  console.error('Failed to load SSM parameters:', error)
  process.exit(1)
})
