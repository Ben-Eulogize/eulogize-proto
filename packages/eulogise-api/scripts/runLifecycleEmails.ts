/**
 * ============================================================================
 * Local Lifecycle Email Runner
 * ============================================================================
 *
 * Runs the lifecycle email pipeline locally (outside of Lambda).
 * Useful for development, testing, and demos.
 *
 * Usage:
 *   # Run once and exit:
 *   yarn lifecycle:run:test-eng-1
 *
 *   # Run in watch mode (every 2 minutes):
 *   yarn lifecycle:watch:test-eng-1
 *
 * Flags:
 *   --loop           — keep running on an interval instead of exiting
 *   --interval=N     — set the interval in minutes (default: 15)
 *
 * Note: This reads remote DynamoDB data from whatever environment the
 * .env file points to. The LIFECYCLE_EMAIL_DOMAIN_WHITELIST env var
 * controls which users are processed (for safe testing).
 * ============================================================================
 */

import { LifecycleEmailController } from '../src/ts/functions/lifecycle/LifecycleEmailController'

const LOOP_FLAG = process.argv.includes('--loop')
const INTERVAL_ARG = process.argv.find((a) => a.startsWith('--interval='))
const INTERVAL_MINUTES = INTERVAL_ARG
  ? parseInt(INTERVAL_ARG.split('=')[1], 10)
  : 15

const runOnce = async () => {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`[${timestamp}] Running lifecycle email job...`)
  try {
    await LifecycleEmailController.processAll()
  } catch (error) {
    console.error('Lifecycle email job failed:', error)
  }
}

const start = async () => {
  if (!LOOP_FLAG) {
    await runOnce()
    console.log('Done.')
    process.exit(0)
  }

  console.log(
    `[LifecycleEmail] Starting in watch mode — running every ${INTERVAL_MINUTES} minute(s)`,
  )
  console.log('[LifecycleEmail] Press Ctrl+C to stop\n')

  // Run immediately on start
  await runOnce()

  // Then repeat on interval
  setInterval(runOnce, INTERVAL_MINUTES * 60 * 1000)
}

start()
