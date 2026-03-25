/**
 * ============================================================================
 * Lifecycle Email System — Core Types
 * ============================================================================
 *
 * These types define the data structures used throughout the lifecycle email
 * pipeline. The pipeline runs every 15 minutes (Lambda) or on a configurable
 * interval (local watch mode) and follows this flow:
 *
 *   1. SnapshotBuilder  — scans DynamoDB for recent users (last 7 days),
 *                          enriches each with case/product/asset data
 *   2. Controller       — evaluates time-based rules against each snapshot
 *   3. Sender           — sends matching emails via SendGrid
 *   4. Deduplication    — persists flags to prevent re-sending
 *
 * Two email streams exist:
 *   - "transactional" — always sent (e.g. download ready notifications)
 *   - "engagement"    — tips/nudges that users can unsubscribe from
 *
 * The `acceptMarketing` user flag does NOT affect either stream.
 * Only `unsubscribedFromEngagement` stops the engagement stream.
 * ============================================================================
 */

import { IMemorialProductModel } from '../../database/types/MemorialProductModel.types'
import { IUserModel } from '../../database/types/UserModel.types'

/**
 * Which product path has the user started?
 *
 * - VIDEO        — user has started editing a slideshow
 * - PRINT        — user has started editing a booklet, bookmark, sidedCard, or thankyouCard
 * - UPLOAD_ONLY  — user uploaded photos/tracks but hasn't started any product
 * - NONE         — user hasn't done anything meaningful yet
 */
export type ActivePath = 'VIDEO' | 'PRINT' | 'UPLOAD_ONLY' | 'NONE'

/**
 * Minimal snapshot of a single memorial product (slideshow, booklet, etc.).
 * Extracted from the DynamoDB product table and attached to UserLifecycleSnapshot.
 */
export interface ProductSnapshot {
  productId?: string
  /** Product editing status: 'not_started' | 'theme_selected' | 'edited' | 'download' */
  status?: string
  /** File generation status: 'not_started' | 'generating' | 'generated' | 'failed' */
  fileStatus?: IMemorialProductModel.FileStatus
  /** Last update timestamp (epoch ms) — used for activity tracking */
  updatedAt?: number
}

/**
 * A point-in-time snapshot of everything the lifecycle engine needs to know
 * about a single user. Built by SnapshotBuilder from DynamoDB data.
 *
 * This is the single input to all rule evaluators — rules never query
 * the database directly, they only inspect this snapshot.
 */
export interface UserLifecycleSnapshot {
  // ── User identity ──────────────────────────────────────────────────
  userId: string
  email: string
  fullName: string

  // ── Email preferences ──────────────────────────────────────────────
  /** If true, engagement-stream emails are suppressed for this user */
  unsubscribedFromEngagement?: boolean

  // ── Account timestamps ─────────────────────────────────────────────
  createdAt: number
  lastLoginAt?: number
  verified: boolean

  // ── Case (memorial) ────────────────────────────────────────────────
  caseId?: string
  caseCreatedAt?: number

  // ── Content uploads ────────────────────────────────────────────────
  photoCount: number
  trackCount: number
  lastUploadAt?: number
  inviteCount: number
  lastInviteAt?: number

  // ── Product snapshots (one per product type, most recently updated) ─
  slideshow?: ProductSnapshot
  booklet?: ProductSnapshot
  bookmark?: ProductSnapshot
  sidedCard?: ProductSnapshot
  thankyouCard?: ProductSnapshot

  // ── Purchase data ──────────────────────────────────────────────────
  invoiceStatus?: string
  purchaseAt?: number

  // ── Computed fields (calculated by SnapshotBuilder) ────────────────
  /** Epoch ms of the most recent meaningful activity (upload, edit, purchase) */
  lastMeaningfulActivityAt?: number
  /** Hours since last meaningful activity — Infinity if no activity ever */
  hoursSinceMeaningfulActivity: number
  /** Hours since user signed up */
  hoursSinceSignup: number
  /** Hours since last login */
  hoursSinceLogin: number
  /** True if user logged in within the last 2 hours */
  loggedInRecently: boolean
  /** Which product path the user is on (VIDEO | PRINT | UPLOAD_ONLY | NONE) */
  activePath: ActivePath
  /** True if any product has fileStatus === 'generated' */
  hasGeneratedProduct: boolean
  /** True if any product has status === 'download' */
  hasDownloadedProduct: boolean

  // ── Dedupe state (persisted on user record in DynamoDB) ────────────
  lifecycleEmailState: IUserModel.LifecycleEmailState
}

/**
 * All possible lifecycle email action types.
 *
 * Onboarding (engagement stream):
 *   UC07     — "Get started" nudge, 10-30 min post-signup, completely idle
 *   UC08     — Stronger nudge, 60-90 min post-signup, still idle
 *   UC08B    — "Keep going" nudge, 24-30h post-signup, started but not generated
 *              Variants: VIDEO, PRINT, UPLOAD (based on activePath)
 *   UC09_A   — Winback, 48-54h post-signup, did absolutely nothing
 *   UC09_B   — Winback, 24h+ post-signup AND 24h+ idle, started but stalled
 *              Variants: VIDEO, PRINT, UPLOAD (based on activePath)
 *
 * Product (transactional stream):
 *   DOWNLOAD_READY       — product file generated, ready for download
 *
 * Upsell (engagement stream):
 *   POST_DOWNLOAD_UPSELL — 12-24h after download, encourages other products
 *   POST_PURCHASE_UPSELL — 12-24h after purchase, encourages other products
 */
export type LifecycleEmailActionType =
  | 'UC07'
  | 'UC08'
  | 'UC08B'
  | 'UC09_A'
  | 'UC09_B'
  | 'DOWNLOAD_READY'
  | 'POST_DOWNLOAD_UPSELL'
  | 'POST_PURCHASE_UPSELL'

/**
 * Two email streams:
 * - "transactional" — always sent regardless of user preferences
 * - "engagement"    — tips/nudges, blocked if user.unsubscribedFromEngagement
 */
export type LifecycleEmailStream = 'transactional' | 'engagement'

/**
 * Represents a single email action to be sent. Produced by rule evaluators,
 * consumed by LifecycleEmailSender.
 */
export interface LifecycleEmailAction {
  type: LifecycleEmailActionType
  stream: LifecycleEmailStream
  userId: string
  email: string
  fullName: string
  /** For UC08B/UC09_B: "VIDEO" | "PRINT" | "UPLOAD" — selects the template variant */
  templateVariant?: string
  /** For product-specific emails: "slideshow" | "booklet" | etc. */
  productType?: string
  /** For product-specific emails: the specific product ID */
  productId?: string
  caseId?: string
  /**
   * Dedupe key — used to prevent re-sending.
   * - Onboarding emails: simple key like "uc07SentAt" → stored as timestamp
   * - Product emails: compound key like "downloadReady:slideshow:abc-123" → stored in array
   */
  dedupeKey: string
  /** Dynamic data passed to the SendGrid template */
  templateData: Record<string, any>
}
