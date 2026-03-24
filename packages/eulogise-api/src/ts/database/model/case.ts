import * as uuid from 'uuid'
import dynamoose from 'dynamoose'
import { filterUser } from '../../utils/filters'
import { ICaseModel } from '../types/CaseModel.types'
import { BaseModel } from './BaseModel'
import { userModel } from './user'
import { EulogiseCountry } from '@eulogise/core'
import { inviteModel } from './invite'

const UPDATABLE_FIELDS = [
  'client',
  'customer',
  'deceased',
  'familyDetails',
  'obituary',
  'service',
  'inviteEmail',
  'status',
  'editors',
  'region',
  'country',
  'hasAccessedDownloadPage',
  'customisedImagesOrderIds',
  'enabledProducts',
  'externalCaseId',
  'createdByAPIKey',
  'viaClientHandle',
  'retainOnCleanup',
  'editorPaymentConfig',
]

const SERVICE_SCHEMA: { [K in keyof ICaseModel.Service]-?: any } = {
  type: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  funeralHome: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  serviceAddress: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  viewingLocation: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  viewingAddress: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  viewingDate: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  viewingDateDisplay: {
    type: [Number, dynamoose.type.NULL],
    required: false,
  },
  viewingTime: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  wakeLocation: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  wakeAddrfess: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  wakeDate: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  wakeDateDisplay: {
    type: [Number, dynamoose.type.NULL],
    required: false,
  },
  wakeTime: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  serviceConductedBy: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  serviceNotes: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  pallbearers: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  placeOfDisposition: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  timeStart: {
    type: [Number, dynamoose.type.NULL],
    required: false,
  },
  timeStartDisplay: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  timeEnd: {
    type: [Number, dynamoose.type.NULL],
    required: false,
  },
  timeEndDisplay: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  serviceLocation: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
  serviceStartTime: {
    type: [String, dynamoose.type.NULL],
    required: false,
  },
}

class CaseModel extends BaseModel<ICaseModel.Model, ICaseModel.Schema> {
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
          index: {
            type: 'global',
            name: 'external-case-index',
          },
        },
        createdByAPIKey: {
          type: String,
        },
        funeralDirector: {
          type: String,
        },
        customer: {
          type: String,
          index: {
            type: 'global',
            name: 'customer-index',
          },
        },
        deceased: {
          type: Object,
          schema: {
            fullName: {
              type: String,
            },
            title: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            suffix: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            nickName: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            education: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            occupation: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            militaryService: {
              type: Object,
              schema: {
                branch: {
                  type: [String, dynamoose.type.NULL],
                  required: false,
                },
                rank: {
                  type: [String, dynamoose.type.NULL],
                  required: false,
                },
                dateEntered: {
                  type: [String, dynamoose.type.NULL],
                  required: false,
                },
                dateEnteredDisplay: {
                  type: [Number, dynamoose.type.NULL],
                  required: false,
                },
                dateDischarged: {
                  type: [String, dynamoose.type.NULL],
                  required: false,
                },
                dateDischargedDisplay: {
                  type: [Number, dynamoose.type.NULL],
                  required: false,
                },
                notes: {
                  type: [String, dynamoose.type.NULL],
                  required: false,
                },
              },
            },
            hasSkippedOrFilledMemorialDataPullForm: {
              type: Boolean,
            },
            dateOfBirth: {
              type: Number,
            },
            dateOfBirthDisplay: {
              type: String,
            },
            dateOfDeath: {
              type: Number,
            },
            dateOfDeathDisplay: {
              type: String,
            },
            gender: {
              type: String,
            },
            primaryImage: {
              type: Object,
              schema: {
                filestackHandle: {
                  type: String,
                },
                filepath: {
                  type: String,
                },
                url: {
                  type: String,
                },
                width: {
                  type: [String, Number],
                },
                height: {
                  type: [String, Number],
                },
              },
            },
          },
        },
        familyDetails: {
          type: Object,
          schema: {
            spouseName: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            childrenNames: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            fathersName: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
            mothersName: {
              type: [String, dynamoose.type.NULL],
              required: false,
            },
          },
        },
        obituary: {
          type: [String, dynamoose.type.NULL],
          required: false,
        },
        service: {
          type: Object,
          schema: SERVICE_SCHEMA,
        },
        inviteEmail: {
          type: Object,
        },
        status: {
          type: String,
          enum: ['unpaid', 'paid'],
          default: 'unpaid',
        },
        hasImages: {
          type: Boolean,
          default: false,
        },
        retainOnCleanup: {
          type: Boolean,
          default: false,
        },
        editors: {
          type: Array,
          default: [],
          schema: [String],
        },
        region: {
          type: String,
          validate: (v: ICaseModel.Regions) =>
            [ICaseModel.Regions.AU, ICaseModel.Regions.USA].includes(v),
          default: 'AU',
        },
        country: {
          type: String,
          default: EulogiseCountry.AUSTRALIA,
        },
        hasAccessedDownloadPage: {
          type: Boolean,
          default: false,
        },
        customisedImagesOrderIds: {
          type: Array,
          default: [],
          schema: [String],
        },
        createdAt: {
          type: Date,
          default: Date.now, // You can set this to any specific date when creating an item
        },
        updatedAt: {
          type: Date,
          default: Date.now, // You can set this to any specific date when creating an item
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
        viaClientHandle: {
          type: String,
        },
        editorPaymentConfig: {
          type: [String, dynamoose.type.NULL],
        },
        paymentProcessingLockId: {
          type: [String, dynamoose.type.NULL],
          required: false,
        },
        paymentProcessingLockExpiresAt: {
          type: Number,
          default: 0,
        },
      },
      {
        saveUnknown: ['service.**', 'deceased.**', 'inviteEmail.**'],
      },
    )
    super('case', schema)
  }

  public async findOneByExternalCaseId(
    externalCaseId?: string,
  ): Promise<ICaseModel.Schema> {
    if (!externalCaseId) {
      throw new Error('findOneByExternalCaseId: externalCaseId is required')
    }
    const foundCases = await this.getModel().query({ externalCaseId }).exec()
    return foundCases?.[0]
  }

  public async findByCustomerId(
    customerId: string,
  ): Promise<Array<ICaseModel.Schema>> {
    return this.getModel().query({ customer: customerId }).exec()
  }

  public async findByEditorOrCoEditorId(
    userId: string,
  ): Promise<ICaseModel.Model> {
    console.log('findByEditorOrCoEditorId', userId)
    const inviteObj = await inviteModel.findOneByUserId(userId)
    console.log('inviteObj', inviteObj)
    const caseId = inviteObj.case
    if (!caseId) {
      console.log('caseId is not found inviteObj', inviteObj)
      throw new Error('caseId is not found in invite object')
    }
    const foundCase = this.findById(caseId)
    if (!foundCase) {
      console.log('foundCase is not found', foundCase)
      throw new Error('foundCase is not found')
    }
    return foundCase
  }

  public async findOneByCustomerId(
    customerId: string,
  ): Promise<ICaseModel.Schema> {
    const invites = await this.getModel()
      .query({ customer: customerId })
      .limit(1)
      .exec()
    return invites[0]
  }

  public async all(search: any) {
    return this.getModel().scan(search).all().exec()
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<ICaseModel.Schema[]> {
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async markHasImageById(caseId: string) {
    return this.getModel().update({ id: caseId }, { hasImages: true })
  }

  public async findByDateRange({ from, to }: { from: Date; to: Date }) {
    return this.getModel()
      .scan()
      .filter('createdAt')
      .between(from.getTime(), to.getTime())
      .all()
      .exec()
  }

  public async findAllWithPopulatedCustomer(
    search: any,
  ): Promise<ICaseModel.Model[]> {
    console.log('findAllWithPopulatedCustomer', search)
    const cases: any = await this.findAll(search)
    console.log('findAllWithPopulatedCustomer cases', cases)
    return await Promise.all(
      cases.map(async (c: any) => {
        console.log('findAllWithPopulatedCustomer case.customer', c.customer)
        const customer = await userModel.findById(c.customer)
        if (!customer) {
          console.log('ERROR: Customer not found', c.customer)
        }
        console.log(
          'findAllWithPopulatedCustomer found customer',
          c.customer,
          customer,
        )
        const newCase = {
          ...c,
        }
        if (newCase.customer) {
          console.log(
            'findAllWithPopulatedCustomer filterUser',
            c.customer,
            customer,
          )
          newCase.customer = customer
            ? filterUser(customer)
            : {
                id: newCase.customer,
                fullName: 'Dummy Name',
                email: 'dummy@email.com',
              }
        }

        return newCase
      }),
    )
  }

  public async save(caseObj: ICaseModel.Schema): Promise<ICaseModel.Schema> {
    if (!caseObj.id) {
      return this.create(caseObj)
    } else {
      return this.update(caseObj)
    }
  }

  public async create(caseObj: ICaseModel.Schema): Promise<ICaseModel.Schema> {
    let caseResult: ICaseModel.Schema

    const deceased = (caseObj.deceased ?? {}) as ICaseModel.Deceased
    const service = caseObj.service
    const saveQuery: Record<string, any> = {
      id: uuid.v4(),
      client: caseObj.client,
      customer: caseObj.customer,
      funeralDirector: caseObj.funeralDirector,
      deceased,
      familyDetails: caseObj.familyDetails,
      obituary: caseObj.obituary,
      service,
      inviteEmail: caseObj.inviteEmail,
      status: caseObj.status,
      region: caseObj.region,
      country: caseObj.country,
      hasAccessedDownloadPage: caseObj.hasAccessedDownloadPage,
      customisedImagesOrderIds: caseObj.customisedImagesOrderIds,
      enabledProducts: caseObj.enabledProducts,
      externalCaseId: caseObj.externalCaseId,
      createdByAPIKey: caseObj.createdByAPIKey,
      viaClientHandle: caseObj.viaClientHandle,
      editorPaymentConfig: caseObj.editorPaymentConfig,
    }

    try {
      console.log('create case', saveQuery)
      caseResult = await this.getModel().create(saveQuery)
    } catch (error) {
      console.log('error', error)
      throw error
    }

    return caseResult
  }

  public async update(caseObj: ICaseModel.Schema): Promise<ICaseModel.Schema> {
    let caseResult: ICaseModel.Schema

    const saveQuery = UPDATABLE_FIELDS.reduce((query, key) => {
      if (caseObj.hasOwnProperty(key)) {
        query[key] = (caseObj as any)[key]
      }
      return query
    }, {} as { [key: string]: any })

    try {
      await this.getModel().update({ id: caseObj.id }, saveQuery)
      caseResult = await this.getModel().get(caseObj.id!)
    } catch (error) {
      throw error
    }

    return caseResult
  }

  public async findOne(search: any): Promise<ICaseModel.Model | undefined> {
    const results: any = await this.query(search)
    if (!results) {
      return
    }
    return results[0]
  }

  public async findAll(search: any): Promise<ICaseModel.Model[]> {
    const results: any = await this.query(search)
    if (!results) {
      return []
    }
    return results
  }

  public async getAllCasesByClientId(
    clientId: string,
  ): Promise<ICaseModel.Model[]> {
    console.log('getAllCasesByClientId', clientId)
    const results: any = await this.getModel()
      .query('client')
      .eq(clientId)
      .all()
      .exec()
    if (!results) {
      return []
    }
    return results
  }

  private isConditionalCheckFailedError(error: any): boolean {
    return (
      error?.name === 'ConditionalCheckFailedException' ||
      error?.code === 'ConditionalCheckFailedException' ||
      `${error?.message ?? ''}`.includes('ConditionalCheckFailedException')
    )
  }

  public async acquirePaymentProcessingLock({
    caseId,
    lockId,
    lockExpiresAt,
  }: {
    caseId: string
    lockId: string
    lockExpiresAt: number
  }): Promise<boolean> {
    const now = Date.now()
    const condition = new dynamoose.Condition()
      .where('id')
      .exists()
      .and()
      .parenthesis((cond) =>
        cond
          .where('paymentProcessingLockExpiresAt')
          .not()
          .exists()
          .or()
          .where('paymentProcessingLockExpiresAt')
          .lt(now),
      )

    try {
      await this.getModel().update(
        { id: caseId },
        {
          paymentProcessingLockId: lockId,
          paymentProcessingLockExpiresAt: lockExpiresAt,
        },
        { condition },
      )
      return true
    } catch (error) {
      if (this.isConditionalCheckFailedError(error)) {
        return false
      }
      throw error
    }
  }

  public async releasePaymentProcessingLock({
    caseId,
    lockId,
  }: {
    caseId: string
    lockId: string
  }): Promise<boolean> {
    const condition = new dynamoose.Condition()
      .where('id')
      .exists()
      .and()
      .where('paymentProcessingLockId')
      .eq(lockId)

    try {
      await this.getModel().update(
        { id: caseId },
        {
          paymentProcessingLockId: null,
          paymentProcessingLockExpiresAt: 0,
        },
        { condition },
      )
      return true
    } catch (error) {
      if (this.isConditionalCheckFailedError(error)) {
        return false
      }
      throw error
    }
  }
}

export const caseModel = new CaseModel()
