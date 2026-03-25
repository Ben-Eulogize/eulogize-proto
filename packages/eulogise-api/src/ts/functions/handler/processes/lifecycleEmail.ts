/**
 * Lambda handler for the lifecycle email scheduled task.
 *
 * Runs every 15 minutes (configured in serverless.yml).
 * Scans for recent users, evaluates time-based rules, and sends emails.
 *
 * See packages/eulogise-api/src/ts/functions/lifecycle/ for the full
 * pipeline implementation and rule definitions.
 */
import { LifecycleEmailController } from '../../lifecycle/LifecycleEmailController'

export const lifecycleEmailHandler = async () => {
  console.log('lifecycleEmailTask start')
  await LifecycleEmailController.processAll()
  console.log('lifecycleEmailTask complete')
}
