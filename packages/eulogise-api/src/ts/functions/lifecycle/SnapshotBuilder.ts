/**
 * ============================================================================
 * SnapshotBuilder — Builds user lifecycle snapshots from DynamoDB
 * ============================================================================
 *
 * This is Step 1 of the lifecycle email pipeline. It:
 *   1. Scans DynamoDB for CUSTOMER users created in the last N days
 *   2. For each user, fetches their case, products, assets, invites, invoices
 *   3. Computes derived fields (hoursSinceSignup, activePath, etc.)
 *   4. Returns an array of UserLifecycleSnapshot objects
 *
 * The snapshots are the ONLY input to the rule evaluators — rules never
 * query the database directly.
 *
 * Performance note: getRecentUsers() does a DynamoDB scan, which is fine
 * for small user volumes but may need a GSI if user count grows significantly.
 * ============================================================================
 */

import {
  userModel,
  caseModel,
  assetModel,
  inviteModel,
  invoiceModel,
  slideshowModel,
  bookletModel,
  bookmarkModel,
  sidedCardModel,
  thankyouCardModel,
} from '../../database'
import { EulogiseUserRole } from '@eulogise/core'
import { IUserModel } from '../../database/types/UserModel.types'
import { IMemorialProductModel } from '../../database/types/MemorialProductModel.types'
import { UserLifecycleSnapshot, ProductSnapshot, ActivePath } from './types'
import { MemorialProductIndexObject } from '../../database/model/BaseMemorialModel'

export class SnapshotBuilder {
  /**
   * Fetch all CUSTOMER users created within the last `days` days.
   *
   * Note: This uses a DynamoDB scan with a filter on `createdAt` and `role`.
   * For the current user volume this is fine, but if user count grows past
   * ~10k it should be replaced with a GSI on (role, createdAt).
   */
  public static async getRecentUsers(
    days: number = 7,
  ): Promise<IUserModel.Model[]> {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    const allUsers = await userModel
      .getModel()
      .scan('createdAt')
      .gt(cutoff)
      .where('role')
      .eq(EulogiseUserRole.CUSTOMER)
      .all()
      .exec()

    return allUsers
  }

  /**
   * Build a full lifecycle snapshot for each user.
   *
   * This is the most data-intensive part of the pipeline — for each user it
   * fetches their case, all 5 product types, assets, invites, and invoices.
   * Product fetches are batched across all users to minimize DB round-trips.
   */
  public static async buildSnapshots(
    users: IUserModel.Model[],
  ): Promise<UserLifecycleSnapshot[]> {
    if (users.length === 0) return []

    // ── Step 1: Fetch first case for each user ─────────────────────
    const casesPerUser = new Map<string, any>()
    for (const user of users) {
      const cases = await caseModel.findByCustomerId(user.id!)
      if (cases.length > 0) {
        casesPerUser.set(user.id!, cases[0])
      }
    }

    const caseIds = [...casesPerUser.values()].map((c) => c.id!).filter(Boolean)

    // ── Step 2: Batch-fetch all products by case IDs ───────────────
    // Only fetch the fields we need (case, id, status, fileStatus, updatedAt)
    const productAttrs = ['case', 'id', 'status', 'fileStatus', 'updatedAt']
    let slideshowsByCase: MemorialProductIndexObject = {}
    let bookletsByCase: MemorialProductIndexObject = {}
    let bookmarksByCase: MemorialProductIndexObject = {}
    let sidedCardsByCase: MemorialProductIndexObject = {}
    let thankyouCardsByCase: MemorialProductIndexObject = {}

    if (caseIds.length > 0) {
      ;[
        slideshowsByCase,
        bookletsByCase,
        bookmarksByCase,
        sidedCardsByCase,
        thankyouCardsByCase,
      ] = await Promise.all([
        slideshowModel.scanByCaseIdsGroupById(caseIds, productAttrs),
        bookletModel.scanByCaseIdsGroupById(caseIds, productAttrs),
        bookmarkModel.scanByCaseIdsGroupById(caseIds, productAttrs),
        sidedCardModel.scanByCaseIdsGroupById(caseIds, productAttrs),
        thankyouCardModel.scanByCaseIdsGroupById(caseIds, productAttrs),
      ])
    }

    // ── Step 3: Build snapshot for each user ───────────────────────
    const snapshots: UserLifecycleSnapshot[] = []

    for (const user of users) {
      const caseObj = casesPerUser.get(user.id!)
      const caseId = caseObj?.id

      // Default values — overwritten if user has a case
      let photoCount = 0
      let trackCount = 0
      let lastUploadAt: number | undefined
      let inviteCount = 0
      let lastInviteAt: number | undefined
      let invoiceStatus: string | undefined
      let purchaseAt: number | undefined

      if (caseId) {
        // Fetch assets, invites, invoices for this case in parallel
        const [imgCount, audioCount, caseInviteCount, caseInvoices] =
          await Promise.all([
            assetModel.getImageCountByCaseId(caseId),
            assetModel.getAudioCountByCaseId(caseId),
            inviteModel.getInviteCountByCaseId(caseId),
            invoiceModel.findByCaseId(caseId),
          ])

        photoCount = imgCount
        trackCount = audioCount
        inviteCount = caseInviteCount

        // Find the most recent asset upload timestamp
        const assets = await assetModel.findByCaseId(caseId)
        if (assets.length > 0) {
          const timestamps = assets
            .map((a) => a.updatedAt || a.createdAt || 0)
            .filter(Boolean)
          if (timestamps.length > 0) {
            lastUploadAt = Math.max(...timestamps)
          }
        }

        // Find the most recent invite timestamp
        const invites = await inviteModel
          .getModel()
          .query({ case: caseId })
          .all()
          .exec()
        if (invites.length > 0) {
          const inviteTimestamps = invites
            .map((i) => i.createdAt || 0)
            .filter(Boolean)
          if (inviteTimestamps.length > 0) {
            lastInviteAt = Math.max(...inviteTimestamps)
          }
        }

        // Check for completed purchases
        const completedInvoice = caseInvoices.find(
          (i) => i.status === 'complete',
        )
        invoiceStatus = completedInvoice?.status ?? caseInvoices[0]?.status
        purchaseAt = completedInvoice?.updatedAt
      }

      // ── Extract product snapshots (most recently updated per type) ─
      const slideshowSnap = this.extractProductSnapshot(
        slideshowsByCase,
        caseId,
      )
      const bookletSnap = this.extractProductSnapshot(bookletsByCase, caseId)
      const bookmarkSnap = this.extractProductSnapshot(bookmarksByCase, caseId)
      const sidedCardSnap = this.extractProductSnapshot(
        sidedCardsByCase,
        caseId,
      )
      const thankyouCardSnap = this.extractProductSnapshot(
        thankyouCardsByCase,
        caseId,
      )

      // ── Compute derived fields ───────────────────────────────────
      const now = Date.now()

      // "Meaningful activity" = any upload, product edit, invite, or purchase
      // Used by global suppression: if activity < 2h ago, don't send onboarding emails
      const meaningfulTimestamps = [
        lastUploadAt,
        lastInviteAt,
        slideshowSnap?.updatedAt,
        bookletSnap?.updatedAt,
        bookmarkSnap?.updatedAt,
        sidedCardSnap?.updatedAt,
        thankyouCardSnap?.updatedAt,
        purchaseAt,
      ].filter(Boolean) as number[]

      const lastMeaningfulActivityAt =
        meaningfulTimestamps.length > 0
          ? Math.max(...meaningfulTimestamps)
          : undefined

      const hoursSinceMeaningfulActivity = lastMeaningfulActivityAt
        ? (now - lastMeaningfulActivityAt) / (1000 * 60 * 60)
        : Infinity

      const hoursSinceSignup =
        (now - (user.createdAt || now)) / (1000 * 60 * 60)
      const hoursSinceLogin = user.lastLoginAt
        ? (now - user.lastLoginAt) / (1000 * 60 * 60)
        : Infinity

      const loggedInRecently = hoursSinceLogin < 2

      const allProductSnaps = [
        slideshowSnap,
        bookletSnap,
        bookmarkSnap,
        sidedCardSnap,
        thankyouCardSnap,
      ].filter(Boolean) as ProductSnapshot[]

      const activePath = this.determineActivePath(
        slideshowSnap,
        bookletSnap,
        bookmarkSnap,
        sidedCardSnap,
        thankyouCardSnap,
        photoCount,
        trackCount,
      )

      const hasGeneratedProduct = allProductSnaps.some(
        (p) => p.fileStatus === 'generated',
      )
      const hasDownloadedProduct = allProductSnaps.some(
        (p) => p.status === 'download',
      )

      snapshots.push({
        userId: user.id!,
        email: user.email,
        fullName: user.fullName,
        unsubscribedFromEngagement:
          user.lifecycleEmailState?.unsubscribedFromEngagement,
        createdAt: user.createdAt || now,
        lastLoginAt: user.lastLoginAt,
        verified: user.verified,
        caseId,
        caseCreatedAt: caseObj?.createdAt,
        photoCount,
        trackCount,
        lastUploadAt,
        inviteCount,
        lastInviteAt,
        slideshow: slideshowSnap,
        booklet: bookletSnap,
        bookmark: bookmarkSnap,
        sidedCard: sidedCardSnap,
        thankyouCard: thankyouCardSnap,
        invoiceStatus,
        purchaseAt,
        lastMeaningfulActivityAt,
        hoursSinceMeaningfulActivity,
        hoursSinceSignup,
        hoursSinceLogin,
        loggedInRecently,
        activePath,
        hasGeneratedProduct,
        hasDownloadedProduct,
        lifecycleEmailState: user.lifecycleEmailState || {},
      })
    }

    return snapshots
  }

  /**
   * Extract the most recently updated product from the batch-fetched index.
   * Returns undefined if no product exists for this case.
   */
  private static extractProductSnapshot(
    index: MemorialProductIndexObject,
    caseId?: string,
  ): ProductSnapshot | undefined {
    if (!caseId || !index[caseId] || index[caseId].length === 0) {
      return undefined
    }
    const products = index[caseId]
    const best = products.reduce(
      (a: IMemorialProductModel.Schema, b: IMemorialProductModel.Schema) =>
        (b.updatedAt || 0) > (a.updatedAt || 0) ? b : a,
    )
    return {
      productId: best.id,
      status: best.status,
      fileStatus: best.fileStatus,
      updatedAt: best.updatedAt,
    }
  }

  /**
   * Determine which product path the user is on.
   * Priority: VIDEO > PRINT > UPLOAD_ONLY > NONE
   *
   * A product is considered "started" if its status is NOT 'not_started'
   * (i.e. the user has at least selected a theme).
   */
  private static determineActivePath(
    slideshow?: ProductSnapshot,
    booklet?: ProductSnapshot,
    bookmark?: ProductSnapshot,
    sidedCard?: ProductSnapshot,
    thankyouCard?: ProductSnapshot,
    photoCount: number = 0,
    trackCount: number = 0,
  ): ActivePath {
    const hasSlideshow = slideshow && slideshow.status !== 'not_started'
    const hasPrint = [booklet, bookmark, sidedCard, thankyouCard].some(
      (p) => p && p.status !== 'not_started',
    )

    if (hasSlideshow) return 'VIDEO'
    if (hasPrint) return 'PRINT'
    if (photoCount > 0 || trackCount > 0) return 'UPLOAD_ONLY'
    return 'NONE'
  }
}
