/**
 * ============================================================================
 * Download Ready Rule — Transactional notification when a product is generated
 * ============================================================================
 *
 * When:   Product's fileStatus becomes 'generated' (no time window)
 * Who:    Any user with a generated product
 * Stream: transactional (always sent, cannot be unsubscribed from)
 *
 * Deduped per product type + product ID to avoid re-notifying for the
 * same product.
 *
 * Templates (one per product type):
 *   SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_SLIDESHOW
 *   SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_BOOKLET
 *   SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_BOOKMARK
 *   SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_SIDEDCARD
 *   SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_THANKYOUCARD
 *
 * NOTE: Currently disabled — existing event-driven emails handle download
 * notifications. This rule is implemented for future migration to the
 * lifecycle system. It will only fire when the corresponding template
 * env vars are populated.
 * ============================================================================
 */

import {
  UserLifecycleSnapshot,
  LifecycleEmailAction,
  ProductSnapshot,
} from '../types'

const PRODUCT_TYPES = [
  'slideshow',
  'booklet',
  'bookmark',
  'sidedCard',
  'thankyouCard',
] as const

export function evaluateDownloadReady(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction[] {
  const actions: LifecycleEmailAction[] = []
  const alreadySent = snap.lifecycleEmailState.downloadReadySentFor || []

  for (const productType of PRODUCT_TYPES) {
    const product: ProductSnapshot | undefined = snap[productType]
    if (!product) continue
    if (product.fileStatus !== 'generated') continue

    // Dedupe key includes product type AND product ID so we can notify
    // once per generated product (e.g. if user regenerates a new booklet)
    const dedupeKey = `downloadReady:${productType}:${product.productId}`
    if (alreadySent.includes(dedupeKey)) continue

    actions.push({
      type: 'DOWNLOAD_READY',
      stream: 'transactional',
      userId: snap.userId,
      email: snap.email,
      fullName: snap.fullName,
      caseId: snap.caseId,
      productType,
      productId: product.productId,
      dedupeKey,
      templateData: {
        fullName: snap.fullName,
        productType,
      },
    })
  }

  return actions
}
