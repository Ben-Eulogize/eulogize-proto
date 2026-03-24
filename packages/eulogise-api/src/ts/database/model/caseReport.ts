import dynamoose from 'dynamoose'
import { BaseModel } from './BaseModel'
import { ICaseReportModel } from '../types/CaseReportModel.types'

class CaseReportModel extends BaseModel<
  ICaseReportModel.Model,
  ICaseReportModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        client: {
          type: String,
          index: {
            type: 'global',
            name: 'client-index',
          },
        },
        externalCaseId: {
          type: String,
        },
        createdByAPIKey: {
          type: String,
        },
        funeralDirector: {
          type: String,
        },
        customer: {
          type: String,
        },
        deceased: {
          type: Object,
        },
        service: {
          type: Object,
        },
        inviteEmail: {
          type: Object,
        },
        status: {
          type: String,
          enum: ['unpaid', 'paid'],
        },
        hasImages: {
          type: Boolean,
        },
        editors: {
          type: Array,
          schema: [String],
        },
        region: {
          type: String,
        },
        country: {
          type: String,
        },
        hasAccessedDownloadPage: {
          type: Boolean,
        },
        retainOnCleanup: {
          type: Boolean,
          default: false,
        },
        customisedImagesOrderIds: {
          type: Array,
          schema: [String],
        },
        createdAt: {
          type: Date,
        },
        updatedAt: {
          type: Date,
        },
        enabledProducts: {
          type: Object,
          schema: {
            BOOKLET: {
              type: Boolean,
            },
            BOOKMARK: {
              type: Boolean,
            },
            SIDED_CARD: {
              type: Boolean,
            },
            SLIDESHOW: {
              type: Boolean,
            },
            THANK_YOU_CARD: {
              type: Boolean,
            },
            TV_WELCOME_SCREEN: {
              type: Boolean,
            },
            PHOTOBOOK: {
              type: Boolean,
            },
          },
        },
        funeralDirectorName: { type: String },
        customerName: { type: String },
        customerEmail: { type: String },
        clientName: { type: String },
        booklet: { type: Object },
        bookmark: { type: Object },
        thankyouCard: { type: Object },
        slideshow: { type: Object },
        sidedCard: { type: Object },
        tvWelcomeScreen: { type: Object },
        photobook: { type: Object },
      },
      {
        saveUnknown: [
          'service.**',
          'deceased.**',
          'inviteEmail.**',
          'booklet.**',
          'bookmark.**',
          'thankyouCard.**',
          'slideshow.**',
          'sidedCard.**',
          'tvWelcomeScreen.**',
          'photobook.**',
        ],
      },
    )
    super('caseReport', schema)
  }

  public async findByDateRange({
    from,
    to,
  }: {
    from: Date
    to: Date
  }): Promise<Array<ICaseReportModel.Schema>> {
    return this.getModel()
      .scan()
      .filter('createdAt')
      .between(from.getTime(), to.getTime())
      .all()
      .exec()
  }

  public async getAllByClientId(clientId: string) {
    return this.getModel().query('client').eq(clientId).all().exec()
  }
}

export const caseReportModel = new CaseReportModel()
