import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { IShareModel } from '../types/ShareModel.types'
import { BaseModel } from './BaseModel'

/*
const UPDATABLE_FIELDS: Array<keyof IShareModel.Schema> = [
  'recipients',
  'tributeIds',
  'allowDownload',
  'invitationMessage',
  'replyEmail',
  'sharedBy',
  'expiresAt',
]
*/

class ShareModel extends BaseModel<IShareModel.Model, IShareModel.Schema> {
  constructor() {
    const recipientSchema = new dynamoose.Schema({
      email: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
      },
      status: {
        type: String,
        enum: ['pending', 'sent', 'error', 'accepted', 'expired'],
        default: 'pending',
      },
      sentAt: {
        type: Number,
      },
      acceptedAt: {
        type: Number,
      },
      selected: {
        type: Boolean,
      },
    })

    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        case: {
          type: String,
          required: true,
          index: {
            type: 'global',
            name: 'case-index',
          },
        },
        recipients: {
          type: Array,
          schema: [recipientSchema],
          required: true,
        },
        tributeIds: {
          type: Array,
          schema: [String],
          required: true,
        },
        allowDownload: {
          type: Boolean,
          default: false,
        },
        invitationMessage: {
          type: Object,
        },
        replyEmail: {
          type: String,
          required: true,
        },
        createdBy: {
          type: String,
          required: true,
          index: {
            type: 'global',
            name: 'createdBy-index',
          },
        },
        expiresAt: {
          type: Number,
        },
      },
      {
        saveUnknown: ['invitationMessage.**'],
        timestamps: true,
      },
    )

    super('share', schema)
  }

  /*
  public async save(shareObj: IShareModel.Schema): Promise<IShareModel.Model> {
    if (!shareObj.id) {
      return this.create(shareObj)
    } else {
      return this.update(shareObj as IShareModel.Schema & { id: string })
    }
  }
*/

  public async create(
    shareObj: IShareModel.Schema,
  ): Promise<IShareModel.Model> {
    const saveQuery: IShareModel.Schema = {
      id: uuid.v4(),
      case: shareObj.case,
      recipients: shareObj.recipients.map((recipient) => ({
        ...recipient,
        email: recipient.email.toLowerCase().trim(),
        status: recipient.status || 'pending',
      })),
      tributeIds: shareObj.tributeIds,
      allowDownload: shareObj.allowDownload ?? false,
      invitationMessage: shareObj.invitationMessage,
      replyEmail: shareObj.replyEmail.toLowerCase().trim(),
      createdBy: shareObj.createdBy,
      expiresAt: shareObj.expiresAt,
    }

    return this.getModel().create(saveQuery)
  }

  /*
  public async update(
    shareObj: Partial<IShareModel.Schema> & { id: string },
  ): Promise<IShareModel.Model> {
    const saveQuery = UPDATABLE_FIELDS.reduce((query, key) => {
      if (shareObj.hasOwnProperty(key)) {
        let value = (shareObj as any)[key]
        if (key === 'recipients' && Array.isArray(value)) {
          value = value.map((recipient: IShareModel.Recipient) => ({
            ...recipient,
            email: recipient.email.toLowerCase().trim(),
          }))
        }
        if (key === 'replyEmail' && typeof value === 'string') {
          value = value.toLowerCase().trim()
        }
        query[key] = value
      }
      return query
    }, {} as { [key: string]: any })

    await this.getModel().update({ id: shareObj.id }, saveQuery)
    return this.getModel().get(shareObj.id)
  }
*/

  public async findByCaseId(caseId: string): Promise<Array<IShareModel.Model>> {
    return this.getModel().query({ case: caseId }).exec()
  }

  /*
  public async findByCreatedBy(
    userId: string,
  ): Promise<Array<IShareModel.Model>> {
    return this.getModel().query({ createdBy: userId }).exec()
  }

  public async findOneById(id: string): Promise<IShareModel.Model | null> {
    const result = await this.getModel().query({ id }).limit(1).exec()
    return result[0] || null
  }
*/

  /*public async updateRecipientStatus(
    shareId: string,
    recipientEmail: string,
    status: IShareModel.Status,
  ): Promise<IShareModel.Model | null> {
    const share = await this.findOneById(shareId)
    if (!share) {
      return null
    }

    const normalizedEmail = recipientEmail.toLowerCase().trim()
    const updatedRecipients = share.recipients.map((recipient) => {
      if (recipient.email.toLowerCase().trim() === normalizedEmail) {
        return {
          ...recipient,
          status,
          ...(status === 'sent' ? { sentAt: Date.now() } : {}),
          ...(status === 'accepted' ? { acceptedAt: Date.now() } : {}),
        }
      }
      return recipient
    })

    return this.update({ id: shareId, recipients: updatedRecipients })
  }*/

  /*
  public async addRecipients(
    shareId: string,
    newRecipients: Array<IShareModel.Recipient>,
  ): Promise<IShareModel.Model | null> {
    const share = await this.findOneById(shareId)
    if (!share) {
      return null
    }

    const existingEmails = new Set(
      share.recipients.map((r) => r.email.toLowerCase().trim()),
    )

    const uniqueNewRecipients = newRecipients.filter(
      (r) => !existingEmails.has(r.email.toLowerCase().trim()),
    )

    if (uniqueNewRecipients.length === 0) {
      return share
    }

    const updatedRecipients = [
      ...share.recipients,
      ...uniqueNewRecipients.map((r) => ({
        ...r,
        email: r.email.toLowerCase().trim(),
        status: r.status || ('pending' as IShareModel.Status),
      })),
    ]

    return this.update({ id: shareId, recipients: updatedRecipients })
  }
*/

  /*
  public async removeRecipient(
    shareId: string,
    recipientEmail: string,
  ): Promise<IShareModel.Model | null> {
    const share = await this.findOneById(shareId)
    if (!share) {
      return null
    }

    const normalizedEmail = recipientEmail.toLowerCase().trim()
    const updatedRecipients = share.recipients.filter(
      (r) => r.email.toLowerCase().trim() !== normalizedEmail,
    )

    return this.update({ id: shareId, recipients: updatedRecipients })
  }
*/

  public scope(
    type: 'public',
    shareObj: IShareModel.Model,
  ): IShareModel.PublicSchema | undefined {
    if (type === 'public') {
      return {
        id: shareObj.id,
        case: shareObj.case,
        recipients: shareObj.recipients,
        tributeIds: shareObj.tributeIds,
        allowDownload: shareObj.allowDownload,
        invitationMessage: shareObj.invitationMessage,
        replyEmail: shareObj.replyEmail,
        expiresAt: shareObj.expiresAt,
        createdAt: shareObj.createdAt,
        updatedAt: shareObj.updatedAt,
      }
    }
    return
  }
}

export const shareModel = new ShareModel()
