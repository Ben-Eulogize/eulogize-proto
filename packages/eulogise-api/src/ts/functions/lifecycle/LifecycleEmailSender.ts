import { SendGridHelper } from '../../utils/SendGridHelper'
import { LifecycleEmailAction } from './types'

/**
 * Maps lifecycle email action types to their SendGrid template env var names.
 * Variant-aware: appends _VIDEO, _PRINT, _UPLOAD, or product type suffix.
 */
const TEMPLATE_ENV_MAP: Record<string, string> = {
  UC07: 'SENDGRID_TEMPLATE_LIFECYCLE_UC07',
  UC08: 'SENDGRID_TEMPLATE_LIFECYCLE_UC08',
  UC08B_VIDEO: 'SENDGRID_TEMPLATE_LIFECYCLE_UC08B_VIDEO',
  UC08B_PRINT: 'SENDGRID_TEMPLATE_LIFECYCLE_UC08B_PRINT',
  UC08B_UPLOAD: 'SENDGRID_TEMPLATE_LIFECYCLE_UC08B_UPLOAD',
  UC09_A: 'SENDGRID_TEMPLATE_LIFECYCLE_UC09_A',
  UC09_B_VIDEO: 'SENDGRID_TEMPLATE_LIFECYCLE_UC09_B_VIDEO',
  UC09_B_PRINT: 'SENDGRID_TEMPLATE_LIFECYCLE_UC09_B_PRINT',
  UC09_B_UPLOAD: 'SENDGRID_TEMPLATE_LIFECYCLE_UC09_B_UPLOAD',
  DOWNLOAD_READY_slideshow:
    'SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_SLIDESHOW',
  DOWNLOAD_READY_booklet: 'SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_BOOKLET',
  DOWNLOAD_READY_bookmark:
    'SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_BOOKMARK',
  DOWNLOAD_READY_sidedCard:
    'SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_SIDEDCARD',
  DOWNLOAD_READY_thankyouCard:
    'SENDGRID_TEMPLATE_LIFECYCLE_DOWNLOAD_READY_THANKYOUCARD',
  POST_DOWNLOAD_UPSELL_slideshow:
    'SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_SLIDESHOW',
  POST_DOWNLOAD_UPSELL_booklet:
    'SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_BOOKLET',
  POST_DOWNLOAD_UPSELL_bookmark:
    'SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_BOOKMARK',
  POST_DOWNLOAD_UPSELL_sidedCard:
    'SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_SIDEDCARD',
  POST_DOWNLOAD_UPSELL_thankyouCard:
    'SENDGRID_TEMPLATE_LIFECYCLE_POST_DOWNLOAD_UPSELL_THANKYOUCARD',
  POST_PURCHASE_UPSELL: 'SENDGRID_TEMPLATE_LIFECYCLE_POST_PURCHASE_UPSELL',
}

function resolveTemplateEnvKey(action: LifecycleEmailAction): string {
  const { type, templateVariant, productType } = action

  if (type === 'UC08B' && templateVariant) {
    return `${type}_${templateVariant}`
  }
  if (type === 'UC09_B' && templateVariant) {
    return `${type}_${templateVariant}`
  }
  if (
    (type === 'DOWNLOAD_READY' || type === 'POST_DOWNLOAD_UPSELL') &&
    productType
  ) {
    return `${type}_${productType}`
  }

  return type
}

export class LifecycleEmailSender {
  /**
   * Send a lifecycle email for the given action.
   * Returns true if sent, false if skipped (missing template).
   */
  public static async send(action: LifecycleEmailAction): Promise<boolean> {
    const envKey = resolveTemplateEnvKey(action)
    const envVarName = TEMPLATE_ENV_MAP[envKey]

    if (!envVarName) {
      console.warn(
        `[LifecycleEmail] No template env mapping for key: ${envKey}`,
      )
      return false
    }

    const templateId = process.env[envVarName]

    if (!templateId) {
      console.warn(
        `[LifecycleEmail] No template configured for ${envVarName} — skipping ${action.type} for ${action.email}`,
      )
      return false
    }

    const options = {
      from: {
        name: process.env.SENDGRID_EMAIL_SUPPORT_NAME,
        email: process.env.SENDGRID_EMAIL_SUPPORT_ADDRESS!,
      },
      templateId,
      personalizations: [
        {
          to: {
            name: action.fullName,
            email: action.email,
          },
          dynamicTemplateData: {
            ...action.templateData,
          },
        },
      ],
    }

    console.log(
      `[LifecycleEmail] Sending ${action.type} to ${action.email} (template: ${envVarName})`,
    )

    await SendGridHelper.send(options as any)
    return true
  }
}
