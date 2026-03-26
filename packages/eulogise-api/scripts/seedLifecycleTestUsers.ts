/**
 * ============================================================================
 * Seed Lifecycle Email Test Users
 * ============================================================================
 *
 * Creates 8 test users in proto DynamoDB with backdated timestamps so that
 * each user falls into a different lifecycle email rule window. This lets you
 * demo ALL rules firing in a single Lambda run (or local run).
 *
 * Usage:
 *   yarn lifecycle:seed:proto
 *
 * What it creates:
 *   1. ben+uc07@wildpalms.com.au     — UC07 (idle 15 min)
 *   2. ben+uc08@wildpalms.com.au     — UC08 (idle 75 min)
 *   3. ben+uc08b-video@wildpalms.com.au — UC08B VIDEO (started slideshow 25h ago)
 *   4. ben+uc08b-print@wildpalms.com.au — UC08B PRINT (started booklet 25h ago)
 *   5. ben+uc09a@wildpalms.com.au    — UC09_A (idle 50 hrs)
 *   6. ben+uc09b-video@wildpalms.com.au — UC09_B VIDEO (stalled 25h)
 *   7. ben+suppressed@wildpalms.com.au  — Suppressed (recent activity)
 *   8. ben+unsubscribed@wildpalms.com.au — Unsubscribed from engagement
 *
 * Safe to re-run — deletes existing test users first.
 * Only touches proto_* tables (controlled by DB_PREFIX=proto in .env.proto).
 * ============================================================================
 */

import { v4 as uuid } from 'uuid'
import {
  userModel,
  caseModel,
  assetModel,
  slideshowModel,
  bookletModel,
} from '../src/ts/database'
import { EulogiseUserRole } from '@eulogise/core'
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'

const ddbClient = new DynamoDBClient({
  region: process.env.XAWS_REGION || 'ap-southeast-2',
})
const DB_PREFIX = process.env.DB_PREFIX || 'proto'

/**
 * Raw DynamoDB UpdateItem to set timestamps without dynamoose interfering.
 * Dynamoose auto-sets updatedAt on every update() call which conflicts with
 * our explicit backdated values. This bypasses dynamoose entirely.
 */
async function forceSetTimestamps(
  tableName: string,
  id: string,
  timestamps: Record<string, number>,
): Promise<void> {
  const expressionParts: string[] = []
  const attrValues: Record<string, any> = {}
  const attrNames: Record<string, string> = {}

  let i = 0
  for (const [key, value] of Object.entries(timestamps)) {
    const placeholder = `:v${i}`
    const namePlaceholder = `#n${i}`
    expressionParts.push(`${namePlaceholder} = ${placeholder}`)
    attrValues[placeholder] = { N: String(value) }
    attrNames[namePlaceholder] = key
    i++
  }

  await ddbClient.send(
    new UpdateItemCommand({
      TableName: `${DB_PREFIX}_${tableName}`,
      Key: { id: { S: id } },
      UpdateExpression: `SET ${expressionParts.join(', ')}`,
      ExpressionAttributeValues: attrValues,
      ExpressionAttributeNames: attrNames,
    }),
  )
}

// ── Time helpers ─────────────────────────────────────────────────────────────

const NOW = Date.now()
const MINUTES = (n: number) => n * 60 * 1000
const HOURS = (n: number) => n * 60 * 60 * 1000

// ── Test user definitions ────────────────────────────────────────────────────

interface TestUserDef {
  email: string
  fullName: string
  description: string
  expectedRule: string
  signupAgo: number // ms ago
  lastLoginAgo?: number // ms ago (defaults to signupAgo)
  lifecycleEmailState?: Record<string, any>
  needsCase?: boolean
  products?: Array<{
    model: 'slideshow' | 'booklet'
    status: string
    fileStatus: string
    updatedAgo: number // ms ago — when the product was last touched
  }>
  assets?: Array<{
    type: 'image' | 'audio'
    updatedAgo: number // ms ago
  }>
}

const TEST_USERS: TestUserDef[] = [
  // ── UC07: Quick welcome nudge (10-30 min, completely idle) ──────────
  {
    email: 'ben+uc07@wildpalms.com.au',
    fullName: 'UC07 Test User',
    description: 'Signed up 15 min ago, completely idle',
    expectedRule: 'UC07',
    signupAgo: MINUTES(15),
    needsCase: false,
  },

  // ── UC08: Stronger nudge (60-90 min, completely idle) ───────────────
  {
    email: 'ben+uc08@wildpalms.com.au',
    fullName: 'UC08 Test User',
    description: 'Signed up 75 min ago, completely idle',
    expectedRule: 'UC08',
    signupAgo: MINUTES(75),
    needsCase: false,
  },

  // ── UC08B VIDEO: Started slideshow but hasn't generated (24-30 hrs) ─
  {
    email: 'ben+uc08b-video@wildpalms.com.au',
    fullName: 'UC08B Video Test User',
    description:
      'Signed up 25 hrs ago, started slideshow, last activity 3h ago',
    expectedRule: 'UC08B (VIDEO)',
    signupAgo: HOURS(25),
    needsCase: true,
    products: [
      {
        model: 'slideshow',
        status: 'theme_selected',
        fileStatus: 'not_started',
        updatedAgo: HOURS(3), // 3h ago avoids the 2h suppression window
      },
    ],
  },

  // ── UC08B PRINT: Started booklet but hasn't generated (24-30 hrs) ───
  {
    email: 'ben+uc08b-print@wildpalms.com.au',
    fullName: 'UC08B Print Test User',
    description: 'Signed up 25 hrs ago, started booklet, last activity 3h ago',
    expectedRule: 'UC08B (PRINT)',
    signupAgo: HOURS(25),
    needsCase: true,
    products: [
      {
        model: 'booklet',
        status: 'theme_selected',
        fileStatus: 'not_started',
        updatedAgo: HOURS(3),
      },
    ],
  },

  // ── UC09_A: Did absolutely nothing (48-54 hrs) ─────────────────────
  {
    email: 'ben+uc09a@wildpalms.com.au',
    fullName: 'UC09A Test User',
    description: 'Signed up 50 hrs ago, did absolutely nothing',
    expectedRule: 'UC09_A',
    signupAgo: HOURS(50),
    needsCase: false,
  },

  // ── UC09_B VIDEO: Started then stalled 25h+ ────────────────────────
  {
    email: 'ben+uc09b-video@wildpalms.com.au',
    fullName: 'UC09B Video Test User',
    description: 'Signed up 26 hrs ago, started slideshow, silent for 25h',
    expectedRule: 'UC09_B (VIDEO)',
    signupAgo: HOURS(26),
    needsCase: true,
    products: [
      {
        model: 'slideshow',
        status: 'theme_selected',
        fileStatus: 'not_started',
        updatedAgo: HOURS(25), // 25h ago → triggers the 24h+ stall condition
      },
    ],
  },

  // ── SUPPRESSED: Recent activity blocks onboarding emails ────────────
  {
    email: 'ben+suppressed@wildpalms.com.au',
    fullName: 'Suppressed Test User',
    description:
      'Signed up 15 min ago, but uploaded photos 30 min ago → suppressed',
    expectedRule: 'NONE (suppressed by recent activity)',
    signupAgo: MINUTES(15),
    needsCase: true,
    assets: [
      { type: 'image', updatedAgo: MINUTES(30) }, // 30 min ago < 2h threshold
    ],
  },

  // ── UNSUBSCRIBED: Engagement emails blocked ─────────────────────────
  {
    email: 'ben+unsubscribed@wildpalms.com.au',
    fullName: 'Unsubscribed Test User',
    description: 'Signed up 15 min ago, idle, but unsubscribed from engagement',
    expectedRule: 'NONE (unsubscribed from engagement)',
    signupAgo: MINUTES(15),
    needsCase: false,
    lifecycleEmailState: { unsubscribedFromEngagement: true },
  },
]

// ── Main seed function ───────────────────────────────────────────────────────

async function seed() {
  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║   Seeding Lifecycle Email Test Users (proto)            ║')
  console.log('╚══════════════════════════════════════════════════════════╝\n')

  const results: Array<{
    email: string
    expectedRule: string
    userId: string
  }> = []

  for (const def of TEST_USERS) {
    console.log(`\n── ${def.email} ──`)
    console.log(`   ${def.description}`)
    console.log(`   Expected rule: ${def.expectedRule}`)

    // Step 1: Delete existing user by email (clean re-run)
    const existing = await userModel.findByEmail(def.email)
    if (existing && existing.length > 0) {
      for (const user of existing) {
        console.log(`   Deleting existing user: ${user.id}`)

        // Delete associated case, products, and assets
        if (user.id) {
          const cases = await caseModel.findByCustomerId(user.id)
          for (const c of cases) {
            if (c.id) {
              // Delete products
              await deleteProductsByCaseId(c.id)
              // Delete assets
              const assets = await assetModel.findByCaseId(c.id)
              for (const a of assets) {
                if (a.id) await assetModel.getModel().delete(a.id)
              }
              // Delete case
              await caseModel.getModel().delete(c.id)
            }
          }
          // Delete user
          await userModel.getModel().delete(user.id)
        }
      }
    }

    // Step 2: Create user with backdated timestamps
    const userId = uuid()
    const createdAt = NOW - def.signupAgo
    const lastLoginAt = def.lastLoginAgo
      ? NOW - def.lastLoginAgo
      : createdAt + 1000 // Login 1s after signup

    // Create user first, then force-set backdated timestamps
    // (dynamoose auto-generates createdAt/updatedAt on create)
    await userModel.getModel().create({
      id: userId,
      email: def.email.toLowerCase().trim(),
      fullName: def.fullName,
      verified: true,
      role: EulogiseUserRole.CUSTOMER,
      token: uuid(),
      password: '$2a$10$seedPasswordHashNotUsedForLogin',
      lifecycleEmailState: def.lifecycleEmailState || {},
    })
    await forceSetTimestamps('user', userId, {
      createdAt,
      updatedAt: createdAt,
      lastLoginAt,
    })

    console.log(
      `   ✓ Created user ${userId} (createdAt: ${new Date(
        createdAt,
      ).toISOString()})`,
    )

    // Step 3: Create case if needed
    let caseId: string | undefined
    if (def.needsCase || def.products?.length || def.assets?.length) {
      caseId = uuid()
      const caseCreatedAt = createdAt + 1000
      await caseModel.getModel().create({
        id: caseId,
        customer: userId,
        deceased: { fullName: `Memorial for ${def.fullName}` },
        status: 'unpaid',
        country: 'United States',
        region: 'USA',
        hasAccessedDownloadPage: false,
        hasImages: (def.assets?.length || 0) > 0,
        retainOnCleanup: false,
        customisedImagesOrderIds: [],
        editors: [],
      })
      await forceSetTimestamps('case', caseId, {
        createdAt: caseCreatedAt,
        updatedAt: caseCreatedAt,
      })
      console.log(`   ✓ Created case ${caseId}`)
    }

    // Step 4: Create products if needed
    if (def.products && caseId) {
      for (const prod of def.products) {
        const productId = uuid()
        const productUpdatedAt = NOW - prod.updatedAgo

        const model = prod.model === 'slideshow' ? slideshowModel : bookletModel
        // Create the product first (dynamoose overwrites updatedAt on create)
        await model.getModel().create({
          id: productId,
          case: caseId,
          content: {},
          status: prod.status,
          fileStatus: prod.fileStatus,
        })
        // Then force-set the correct backdated timestamps via raw update
        const productTableName =
          prod.model === 'slideshow' ? 'slideshow' : 'booklet'
        await forceSetTimestamps(productTableName, productId, {
          createdAt: createdAt + 2000,
          updatedAt: productUpdatedAt,
        })
        console.log(
          `   ✓ Created ${prod.model} ${productId} (status: ${
            prod.status
          }, updatedAt: ${new Date(productUpdatedAt).toISOString()})`,
        )
      }
    }

    // Step 5: Create assets if needed
    if (def.assets && caseId) {
      for (const asset of def.assets) {
        const assetId = uuid()
        const assetUpdatedAt = NOW - asset.updatedAgo

        // Create asset first (dynamoose overwrites timestamps on create)
        await assetModel.getModel().create({
          id: assetId,
          type: asset.type,
          case: caseId,
          owner: userId,
          content: {
            filename: 'test-photo.jpg',
            filepath: `cases/${caseId}/gallery/test-photo.jpg`,
          },
        })
        // Then force-set the correct backdated timestamps
        await forceSetTimestamps('asset', assetId, {
          createdAt: assetUpdatedAt,
          updatedAt: assetUpdatedAt,
        })
        console.log(
          `   ✓ Created ${asset.type} asset ${assetId} (updatedAt: ${new Date(
            assetUpdatedAt,
          ).toISOString()})`,
        )
      }
    }

    results.push({ email: def.email, expectedRule: def.expectedRule, userId })
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log(
    '\n\n╔══════════════════════════════════════════════════════════╗',
  )
  console.log('║   Seed Complete — Summary                               ║')
  console.log('╚══════════════════════════════════════════════════════════╝\n')
  console.log(
    '┌─────────────────────────────────────────────┬────────────────────────────────────┐',
  )
  console.log(
    '│ Email                                       │ Expected Rule                      │',
  )
  console.log(
    '├─────────────────────────────────────────────┼────────────────────────────────────┤',
  )
  for (const r of results) {
    const email = r.email.padEnd(43)
    const rule = r.expectedRule.padEnd(34)
    console.log(`│ ${email} │ ${rule} │`)
  }
  console.log(
    '└─────────────────────────────────────────────┴────────────────────────────────────┘',
  )
  console.log('\nNext steps:')
  console.log('  1. Run: yarn lifecycle:run:proto')
  console.log(
    '     Expected: actions: 6, sent: 6 (or skipped if templates missing)',
  )
  console.log(
    '  2. Or wait up to 15 min for the Lambda to pick them up automatically',
  )
  console.log('  3. Check inbox at wildpalms.com.au for 6 lifecycle emails\n')
}

async function deleteProductsByCaseId(caseId: string) {
  const models = [slideshowModel, bookletModel]
  for (const model of models) {
    try {
      const products = await model.getProductsByCaseId(caseId)
      for (const p of products) {
        if (p.id) await model.getModel().delete(p.id)
      }
    } catch {
      // Table might not exist yet, that's fine
    }
  }
}

// ── Run ──────────────────────────────────────────────────────────────────────

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
