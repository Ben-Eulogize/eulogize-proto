const path = require('path')
const { spawnSync } = require('child_process')

const SECURE_KEYS = [
  'GATSBY_FILESTACK_API_KEY',
  'GATSBY_GOOGLE_MAPS_PLACES_API_KEY',
  'GATSBY_BRAINFISH_WIDGET_KEY',
  'GATSBY_PENDO_API_KEY',
  'GATSBY_BUGSNAG_API_KEY',
  'GATSBY_STRIPE_API_KEY',
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
