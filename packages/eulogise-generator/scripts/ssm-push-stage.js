const path = require('path')
const { spawnSync } = require('child_process')

const SECURE_KEYS = [
  'API_ACCESS_KEY',
  'API_SECRET_KEY',
  'SLACK_WEBHOOK_URL',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
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
