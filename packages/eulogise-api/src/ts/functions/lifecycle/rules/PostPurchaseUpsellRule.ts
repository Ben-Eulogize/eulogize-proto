/**
 * ============================================================================
 * Post-Purchase Upsell Rule — Cross-sell after a completed purchase
 * ============================================================================
 *
 * When:   12-24 hours after a completed invoice
 * Who:    Users who purchased one product type but might want others
 * Stream: engagement (can be unsubscribed from)
 * Dedupe: Per case ID (one upsell email per memorial)
 *
 * Template: SENDGRID_TEMPLATE_LIFECYCLE_POST_PURCHASE_UPSELL
 *
 * NOTE: Currently disabled — template ID is empty until ready.
 * ============================================================================
 */

import { UserLifecycleSnapshot, LifecycleEmailAction } from '../types'

export function evaluatePostPurchaseUpsell(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction | null {
  if (snap.invoiceStatus !== 'complete') return null
  if (!snap.purchaseAt) return null

  const now = Date.now()
  const hoursSincePurchase = (now - snap.purchaseAt) / (1000 * 60 * 60)
  if (hoursSincePurchase < 12 || hoursSincePurchase > 24) return null

  const dedupeKey = `postPurchaseUpsell:invoice:${snap.caseId}`
  const alreadySent = snap.lifecycleEmailState.postPurchaseUpsellSentFor || []
  if (alreadySent.includes(dedupeKey)) return null

  return {
    type: 'POST_PURCHASE_UPSELL',
    stream: 'engagement',
    userId: snap.userId,
    email: snap.email,
    fullName: snap.fullName,
    caseId: snap.caseId,
    dedupeKey,
    templateData: {
      fullName: snap.fullName,
    },
  }
}
