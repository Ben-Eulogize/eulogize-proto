/**
 * ============================================================================
 * Onboarding Rules — Time-based engagement emails for new users
 * ============================================================================
 *
 * These rules fire during the first 54 hours after signup and are designed
 * to nudge users who haven't completed their memorial. Each rule has:
 *   - A time window (based on hoursSinceSignup)
 *   - Activity conditions (what has/hasn't the user done)
 *   - A dedupe key (prevents sending the same email twice)
 *
 * Timeline overview:
 *   ┌─────────────────────────────────────────────────────────────────┐
 *   │ 0       10min   30min   60min   90min   24h    30h   48h   54h│
 *   │ ├────────┤ UC07 ├────────┤ UC08 ├────────┤UC08b├──────┤UC09_A├│
 *   │                                          │UC09_B starts at 24h│
 *   │                                          │(if idle for 24h+) │
 *   └─────────────────────────────────────────────────────────────────┘
 *
 * Global suppression (shared across all onboarding rules):
 *   - User has been active in the last 2 hours → don't interrupt them
 *   - User has already generated a product → they reached their goal
 *
 * All onboarding emails are in the "engagement" stream, meaning users
 * can unsubscribe from them (checked in the Controller, not here).
 * ============================================================================
 */

import { UserLifecycleSnapshot, LifecycleEmailAction } from '../types'

/**
 * Global suppression checks shared across onboarding rules.
 * Suppress if:
 * - User is currently active (meaningful activity < 2 hours ago)
 * - User has already generated a product (reached their goal)
 */
function isGloballySuppressed(snap: UserLifecycleSnapshot): boolean {
  if (snap.hoursSinceMeaningfulActivity < 2) return true
  if (snap.hasGeneratedProduct) return true
  return false
}

function baseAction(
  snap: UserLifecycleSnapshot,
): Pick<LifecycleEmailAction, 'userId' | 'email' | 'fullName' | 'caseId'> {
  return {
    userId: snap.userId,
    email: snap.email,
    fullName: snap.fullName,
    caseId: snap.caseId,
  }
}

/**
 * UC07: Quick welcome nudge — "Get started with your memorial"
 *
 * When:  10-30 minutes after signup
 * Who:   Users who are completely idle — no uploads, no invites,
 *        no products started, activePath === NONE
 * Why:   Many users sign up but don't take any action. This is the
 *        first gentle push to get them started.
 *
 * Template: SENDGRID_TEMPLATE_LIFECYCLE_UC07
 */
export function evaluateUC07(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction | null {
  if (isGloballySuppressed(snap)) return null
  if (snap.lifecycleEmailState.uc07SentAt) return null

  const mins = snap.hoursSinceSignup * 60
  if (mins < 10 || mins > 30) return null

  // Must be truly idle — any activity means they don't need this nudge
  if (snap.activePath !== 'NONE') return null
  if (snap.photoCount > 0 || snap.trackCount > 0) return null
  if (snap.inviteCount > 0) return null

  return {
    ...baseAction(snap),
    type: 'UC07',
    stream: 'engagement',
    dedupeKey: 'uc07SentAt',
    templateData: {
      fullName: snap.fullName,
    },
  }
}

/**
 * UC08: Stronger nudge — "We're here to help"
 *
 * When:  60-90 minutes after signup
 * Who:   Same idle conditions as UC07 (no activity at all)
 * Why:   User didn't respond to UC07. This is a second attempt with
 *        stronger messaging and possibly different content/CTAs.
 *
 * Template: SENDGRID_TEMPLATE_LIFECYCLE_UC08
 */
export function evaluateUC08(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction | null {
  if (isGloballySuppressed(snap)) return null
  if (snap.lifecycleEmailState.uc08SentAt) return null

  const mins = snap.hoursSinceSignup * 60
  if (mins < 60 || mins > 90) return null

  // Must be truly idle — same check as UC07
  if (snap.activePath !== 'NONE') return null
  if (snap.photoCount > 0 || snap.trackCount > 0) return null
  if (snap.inviteCount > 0) return null

  return {
    ...baseAction(snap),
    type: 'UC08',
    stream: 'engagement',
    dedupeKey: 'uc08SentAt',
    templateData: {
      fullName: snap.fullName,
    },
  }
}

/**
 * UC08b: "Keep going" follow-up — path-specific encouragement
 *
 * When:  24-30 hours after signup
 * Who:   Users who STARTED something (activePath !== NONE) but haven't
 *        generated a product yet. Different template per path:
 *        - VIDEO  → slideshow tips
 *        - PRINT  → booklet/card tips
 *        - UPLOAD → "now create a product with your photos"
 * Why:   User showed intent but got stuck. This email provides path-specific
 *        guidance to help them finish.
 *
 * Templates:
 *   SENDGRID_TEMPLATE_LIFECYCLE_UC08B_VIDEO
 *   SENDGRID_TEMPLATE_LIFECYCLE_UC08B_PRINT
 *   SENDGRID_TEMPLATE_LIFECYCLE_UC08B_UPLOAD
 */
export function evaluateUC08b(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction | null {
  if (isGloballySuppressed(snap)) return null
  if (snap.lifecycleEmailState.uc08bSentAt) return null

  if (snap.hoursSinceSignup < 24 || snap.hoursSinceSignup > 30) return null

  // Must have started something — if they're idle, UC09_A handles them instead
  if (snap.activePath === 'NONE') return null

  let variant: string
  switch (snap.activePath) {
    case 'VIDEO':
      variant = 'VIDEO'
      break
    case 'PRINT':
      variant = 'PRINT'
      break
    case 'UPLOAD_ONLY':
      variant = 'UPLOAD'
      break
    default:
      return null
  }

  return {
    ...baseAction(snap),
    type: 'UC08B',
    stream: 'engagement',
    templateVariant: variant,
    dedupeKey: 'uc08bSentAt',
    templateData: {
      fullName: snap.fullName,
      activePath: snap.activePath,
    },
  }
}

/**
 * UC09: Winback email — last attempt to re-engage
 *
 * Two modes:
 *
 * Mode A — "We miss you"
 *   When: 48-54 hours after signup
 *   Who:  Users who did NOTHING (activePath === NONE)
 *   Why:  Final attempt for users who never started
 *   Template: SENDGRID_TEMPLATE_LIFECYCLE_UC09_A
 *
 * Mode B — "Pick up where you left off"
 *   When: 24+ hours after signup AND 24+ hours since last activity
 *   Who:  Users who STARTED something but then went silent for 24h+
 *   Why:  Path-specific winback with different messaging per product type
 *   Templates:
 *     SENDGRID_TEMPLATE_LIFECYCLE_UC09_B_VIDEO
 *     SENDGRID_TEMPLATE_LIFECYCLE_UC09_B_PRINT
 *     SENDGRID_TEMPLATE_LIFECYCLE_UC09_B_UPLOAD
 *
 * Note: UC09_A and UC09_B share the same dedupe key (uc09SentAt),
 * so a user can only ever receive one UC09 email.
 */
export function evaluateUC09(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction | null {
  if (isGloballySuppressed(snap)) return null
  if (snap.lifecycleEmailState.uc09SentAt) return null

  // Mode A: Did absolutely nothing, 48-54h after signup
  if (
    snap.activePath === 'NONE' &&
    snap.hoursSinceSignup >= 48 &&
    snap.hoursSinceSignup <= 54
  ) {
    return {
      ...baseAction(snap),
      type: 'UC09_A',
      stream: 'engagement',
      dedupeKey: 'uc09SentAt',
      templateData: {
        fullName: snap.fullName,
      },
    }
  }

  // Mode B: Started something but stalled for 24h+
  if (
    snap.activePath !== 'NONE' &&
    snap.hoursSinceSignup >= 24 &&
    snap.hoursSinceMeaningfulActivity >= 24
  ) {
    let variant: string
    switch (snap.activePath) {
      case 'VIDEO':
        variant = 'VIDEO'
        break
      case 'PRINT':
        variant = 'PRINT'
        break
      case 'UPLOAD_ONLY':
        variant = 'UPLOAD'
        break
      default:
        return null
    }

    return {
      ...baseAction(snap),
      type: 'UC09_B',
      stream: 'engagement',
      templateVariant: variant,
      dedupeKey: 'uc09SentAt',
      templateData: {
        fullName: snap.fullName,
        activePath: snap.activePath,
      },
    }
  }

  return null
}
