/**
 * ============================================================================
 * LifecycleEmailController — Main orchestrator for the lifecycle email pipeline
 * ============================================================================
 *
 * This is the entry point called by both:
 *   - The Lambda handler (every 15 min in production)
 *   - The local runner script (configurable interval via --loop --interval=N)
 *
 * Pipeline flow:
 *   1. Fetch recent users (last 7 days) from DynamoDB
 *   2. Build enriched snapshots for each user (case, products, assets, etc.)
 *   3. Apply domain whitelist filter (for safe testing against shared envs)
 *   4. Evaluate all rules against each snapshot
 *   5. Filter out engagement emails for unsubscribed users
 *   6. Send emails via SendGrid
 *   7. Persist dedupe flags to prevent re-sending
 *
 * Environment variables:
 *   LIFECYCLE_EMAIL_DOMAIN_WHITELIST — comma-separated email domains to
 *     restrict processing to (e.g. "wildpalms.com.au"). Empty = all users.
 *     Used for safe testing against shared environments like test-eng-1.
 *
 * Two-tier deduplication:
 *   - Onboarding emails (UC07-UC09): timestamp flags (e.g. uc07SentAt: 17089...)
 *   - Product emails: array flags (e.g. downloadReadySentFor: ["downloadReady:slideshow:abc"])
 * ============================================================================
 */

import { userModel } from '../../database'
import { SnapshotBuilder } from './SnapshotBuilder'
import { LifecycleEmailSender } from './LifecycleEmailSender'
import { UserLifecycleSnapshot, LifecycleEmailAction } from './types'
import {
  evaluateUC07,
  evaluateUC08,
  evaluateUC08b,
  evaluateUC09,
  evaluateDownloadReady,
  evaluatePostDownloadUpsell,
  evaluatePostPurchaseUpsell,
} from './rules'

export class LifecycleEmailController {
  /**
   * Parse the LIFECYCLE_EMAIL_DOMAIN_WHITELIST env var into an array of
   * lowercase domain strings. When empty, all users are processed.
   *
   * Example: "wildpalms.com.au,eulogize.com" → ["wildpalms.com.au", "eulogize.com"]
   */
  private static getAllowedDomains(): string[] {
    const raw = process.env.LIFECYCLE_EMAIL_DOMAIN_WHITELIST || ''
    return raw
      .split(',')
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean)
  }

  /**
   * Main entry point — run the full lifecycle email pipeline.
   *
   * Safe to call multiple times (idempotent thanks to dedupe flags).
   * If a run is interrupted, the next run will pick up where it left off.
   */
  public static async processAll(): Promise<void> {
    console.log('[LifecycleEmail] Starting lifecycle email processing')

    // Step 1: Fetch recent users
    const users = await SnapshotBuilder.getRecentUsers(7)
    console.log(`[LifecycleEmail] Found ${users.length} recent users`)

    if (users.length === 0) return

    // Step 2: Build enriched snapshots
    const allowedDomains = this.getAllowedDomains()
    const snapshots = await SnapshotBuilder.buildSnapshots(users)

    // Step 3: Apply domain whitelist (for testing safety)
    const filteredSnapshots =
      allowedDomains.length > 0
        ? snapshots.filter((snap) => {
            const domain = snap.email?.split('@')[1]?.toLowerCase()
            return domain && allowedDomains.includes(domain)
          })
        : snapshots

    if (allowedDomains.length > 0) {
      console.log(
        `[LifecycleEmail] Domain whitelist active: ${allowedDomains.join(
          ', ',
        )} — ${filteredSnapshots.length}/${snapshots.length} users match`,
      )
    }

    console.log(
      `[LifecycleEmail] Processing ${filteredSnapshots.length} snapshots`,
    )

    let actionsGenerated = 0
    let emailsSent = 0
    let emailsSkipped = 0

    for (const snap of filteredSnapshots) {
      // Step 4: Evaluate all rules
      const allActions = this.evaluateAllRules(snap)

      // Step 5: Filter out engagement emails for unsubscribed users
      // Note: transactional emails (e.g. DOWNLOAD_READY) are NEVER filtered
      const actions = allActions.filter((action) => {
        if (action.stream === 'engagement' && snap.unsubscribedFromEngagement) {
          return false
        }
        return true
      })

      if (actions.length === 0) continue

      actionsGenerated += actions.length

      // Step 6 & 7: Send and persist dedupe flags
      for (const action of actions) {
        try {
          const sent = await LifecycleEmailSender.send(action)

          if (sent) {
            emailsSent++
            await this.persistDedupeFlag(action)
          } else {
            emailsSkipped++
          }
        } catch (error) {
          console.error(
            `[LifecycleEmail] Error sending ${action.type} to ${action.email}:`,
            error,
          )
        }
      }
    }

    console.log(
      `[LifecycleEmail] Complete — users: ${filteredSnapshots.length}, actions: ${actionsGenerated}, sent: ${emailsSent}, skipped: ${emailsSkipped}`,
    )
  }

  /**
   * Evaluate all lifecycle rules against a single user snapshot.
   *
   * Rules are evaluated in order but are safe to run in parallel —
   * each rule is independent and checks its own dedupe key.
   * The time windows are mutually exclusive for onboarding rules.
   */
  private static evaluateAllRules(
    snap: UserLifecycleSnapshot,
  ): LifecycleEmailAction[] {
    const actions: LifecycleEmailAction[] = []

    // ── Onboarding rules (engagement stream) ──────────────────────
    // These are time-gated and check user activity level.
    // See OnboardingRules.ts for the full timeline and conditions.
    const uc07 = evaluateUC07(snap)
    if (uc07) actions.push(uc07)

    const uc08 = evaluateUC08(snap)
    if (uc08) actions.push(uc08)

    const uc08b = evaluateUC08b(snap)
    if (uc08b) actions.push(uc08b)

    const uc09 = evaluateUC09(snap)
    if (uc09) actions.push(uc09)

    // ── Product rules (transactional + engagement streams) ────────
    // These check product status, not signup time.
    actions.push(...evaluateDownloadReady(snap))
    actions.push(...evaluatePostDownloadUpsell(snap))

    const postPurchase = evaluatePostPurchaseUpsell(snap)
    if (postPurchase) actions.push(postPurchase)

    return actions
  }

  /**
   * Persist the dedupe flag after a successful send to prevent re-sending.
   *
   * Two deduplication strategies:
   *   1. Timestamp flags — for onboarding emails that fire once per user
   *      e.g. { uc07SentAt: 1708900000000 }
   *   2. Array flags — for product emails that fire once per product
   *      e.g. { downloadReadySentFor: ["downloadReady:slideshow:abc-123"] }
   */
  private static async persistDedupeFlag(
    action: LifecycleEmailAction,
  ): Promise<void> {
    const { userId, dedupeKey, type } = action

    // Timestamp-based flags for onboarding emails
    const simpleFlags: Record<string, string> = {
      uc07SentAt: 'uc07SentAt',
      uc08SentAt: 'uc08SentAt',
      uc08bSentAt: 'uc08bSentAt',
      uc09SentAt: 'uc09SentAt',
    }

    if (simpleFlags[dedupeKey]) {
      await userModel.updateLifecycleEmailState(userId, {
        [simpleFlags[dedupeKey]]: Date.now(),
      })
      return
    }

    // Array-based flags for product-specific emails
    const arrayFlagMap: Record<string, string> = {
      DOWNLOAD_READY: 'downloadReadySentFor',
      POST_DOWNLOAD_UPSELL: 'postDownloadUpsellSentFor',
      POST_PURCHASE_UPSELL: 'postPurchaseUpsellSentFor',
    }

    const arrayField = arrayFlagMap[type]
    if (arrayField) {
      const user = await userModel.findById(userId)
      const state = user?.lifecycleEmailState || {}
      const existing = (state as any)[arrayField] || []
      await userModel.updateLifecycleEmailState(userId, {
        [arrayField]: [...existing, dedupeKey],
      })
    }
  }
}
