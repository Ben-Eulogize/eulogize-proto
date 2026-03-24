const fs = require('fs')
const path = require('path')

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

const envName =
  parsedArgs.env ||
  process.env.ENV ||
  process.env.ENVIRONMENT ||
  process.env.STAGE

if (!envName) {
  console.error('Missing environment name. Provide --env or set ENV.')
  process.exit(1)
}

const envDir = path.resolve(__dirname, '..', 'environments')
const fallbackFile = parsedArgs.file || path.resolve(envDir, `.env.${envName}`)

process.stdout.write(fallbackFile)
