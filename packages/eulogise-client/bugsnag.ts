import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import BugsnagPerformance from '@bugsnag/browser-performance'

const isBugsnagEnabled = process.env.GATSBY_BUGSNAG_ENABLED
const bugSnagAPIKey = process.env.GATSBY_BUGSNAG_API_KEY
const bugSnagReleaseStage = process.env.GATSBY_BUGSNAG_RELEASE_STAGE
const isDevelopmentEnv = process.env.GATSBY_USE_DEVELOPMEN

if (isBugsnagEnabled && bugSnagAPIKey && !isDevelopmentEnv) {
  Bugsnag.start({
    apiKey: bugSnagAPIKey,
    plugins: [new BugsnagPluginReact()],
    releaseStage: bugSnagReleaseStage,
    appVersion: '1.0.0',
    enabledReleaseStages: ['production-us', 'staging'],
  })
  BugsnagPerformance.start({ apiKey: bugSnagAPIKey })
}

export default Bugsnag
