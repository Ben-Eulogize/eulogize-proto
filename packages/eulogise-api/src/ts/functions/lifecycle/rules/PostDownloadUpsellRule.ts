/**
 * ============================================================================
 * Post-Download Upsell Rule — Encourage users to try other product types
 * ============================================================================
 *
 * When:   12-24 hours after a product reaches 'download' status
 * Who:    Users who downloaded a product but might want to try others
 * Stream: engagement (can be unsubscribed from)
 *
 * Deduped per product type + product ID. Each product type has its own
 * SendGrid template:
 *   SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_SLIDESHOW
 *   SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_BOOKLET
 *   SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_BOOKMARK
 *   SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_SIDEDCARD
 *   SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_THANKYOUCARD
 *
 * NOTE: Currently disabled — template IDs are empty until ready.
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

export function evaluatePostDownloadUpsell(
  snap: UserLifecycleSnapshot,
): LifecycleEmailAction[] {
  const actions: LifecycleEmailAction[] = []
  const alreadySent = snap.lifecycleEmailState.postDownloadUpsellSentFor || []
  const now = Date.now()

  for (const productType of PRODUCT_TYPES) {
    const product: ProductSnapshot | undefined = snap[productType]
    if (!product) continue
    if (product.status !== 'download') continue
    if (!product.updatedAt) continue

    // Only fire 12-24h after the product was downloaded
    const hoursSinceDownload = (now - product.updatedAt) / (1000 * 60 * 60)
    if (hoursSinceDownload < 12 || hoursSinceDownload > 24) continue

    const dedupeKey = `postDownloadUpsell:${productType}:${product.productId}`
    if (alreadySent.includes(dedupeKey)) continue

    actions.push({
      type: 'POST_DOWNLOAD_UPSELL',
      stream: 'engagement',
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
