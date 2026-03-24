const path = require('path')
const { spawnSync } = require('child_process')

const SECURE_KEYS = [
  'PASSARE_API_KEY',
  'SENDGRID_ACCESS_KEY',
  'STRIPE_ACCESS_KEY',
  'WEBTOKEN_SECRET',
  'XAWS_ACCESS_KEY',
  'XAWS_SECRET_KEY',
  'SERVERLESS_ACCESS_KEY',
]

const args = process.argv.slice(2)
const hasSecureKeys = args.includes('--secure-keys')

if (!hasSecureKeys) {
  args.push('--secure-keys', SECURE_KEYS.join(','))
}

const scriptPath = path.resolve(__dirname, 'push-ssm-env.js')
const result = spawnSync('node', [scriptPath, ...args], {
  stdio: 'inherit',
  env: process.env,
})

process.exit(result.status ?? 1)
