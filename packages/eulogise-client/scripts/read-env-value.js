const path = require('path')
const dotenv = require('dotenv')

const args = process.argv.slice(2)
const parsedArgs = args.reduce((acc, arg, index) => {
  if (!arg.startsWith('--')) return acc
  const key = arg.replace(/^--/, '')
  const value =
    args[index + 1] && !args[index + 1].startsWith('--')
      ? args[index + 1]
      : true
  acc[key] = value
  return acc
}, {})

const envPath = parsedArgs.path
const envKey = parsedArgs.key

if (!envPath) {
  console.error('Missing --path for env file.')
  process.exit(1)
}

if (!envKey) {
  console.error('Missing --key to read from env file.')
  process.exit(1)
}

const resolvedPath = path.resolve(process.cwd(), envPath)
const result = dotenv.config({ path: resolvedPath })

if (result.error) {
  console.error(`Failed to read env file at ${resolvedPath}`)
  process.exit(1)
}

const value = (result.parsed && result.parsed[envKey]) || ''
process.stdout.write(value)
