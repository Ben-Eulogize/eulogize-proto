import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import BBPromise from 'bluebird'
import { IClientModel } from '../types/ClientModel.types'
import { BaseModel } from './BaseModel'
import { EulogiseCountry, IClientRole } from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'
import { userModel } from './user'
import { IUserModel } from '../types/UserModel.types'
import { caseModel } from './case'
import { assetModel } from './asset'
import { invoiceModel } from './invoice'
import { transactionModel } from './transaction'
import { inviteModel } from './invite'
import { themeModel } from './theme'
import { backgroundImageModel } from './backgroundImage'

const UPDATABLE_FIELDS = [
  'title',
  'defaultClientSignUpText',
  'handle',
  'primaryAddress',
  'additionalAddress',
  'createCaseFamilyInviteOptions',
  'clientSignUpDefaultUserRole',
  'editorPaymentConfig',
  'country',
  'logo',
  'clientEmailAsset',
  'directors',
  'users',
  'clientBrandHandles',
  'defaultProducts',
  'availableProducts',
  'embeddedIframes',
  'allowPurchasing',
  'features',
  'isDemoClient',
]

class ClientModel extends BaseModel<IClientModel.Model, IClientModel.Schema> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length > 12,
          hashKey: true,
        },
        title: {
          type: String,
          required: true,
        },
        defaultClientSignUpText: {
          type: String,
        },
        handle: {
          type: String,
          index: {
            type: 'global',
            name: 'handle-index',
          },
        },
        primaryAddress: {
          type: Array,
          schema: [String],
          required: true,
        },
        additionalAddress: {
          type: Array,
          schema: [
            {
              type: Array,
              schema: [String],
            },
          ],
          required: false,
        },
        createCaseFamilyInviteOptions: {
          type: Array,
          schema: [String],
          required: true,
        },
        country: {
          type: String,
          default: EulogiseCountry.AUSTRALIA,
        },
        logo: {
          type: String,
        },
        clientEmailAsset: {
          type: String,
        },
        clientBrandHandles: {
          type: Array,
          schema: [String],
          required: false,
        },
        directors: {
          type: Array,
          schema: {
            fullName: String,
            position: String,
            email: String,
            phone: String,
            officePhone: String,
          },
        },
        users: {
          type: Set,
          schema: [String],
        },
        features: {
          type: Object,
          schema: {
            SLIDESHOW_VB: {
              type: Boolean,
            },
          },
        },
        clientSignUpDefaultUserRole: {
          type: String, // EulogiseUserRole (editor or co-editor)
        },
        editorPaymentConfig: {
          type: String, // EulogiseEditorPaymentConfig
          required: false,
        },
        embeddedIframes: {
          type: Object,
          schema: {
            showWhiteBottomBar: {
              type: Boolean,
            },
            allowPurchaseButton: {
              type: Boolean,
            },
            purchaseUrl: {
              type: String,
            },
            customButtonCopy: {
              type: String,
            },
            showEulogizeBranding: {
              type: Boolean,
            },
          },
        },
        allowPurchasing: {
          type: Object,
          schema: {
            printing: {
              type: Object,
              schema: {
                funeralHomeCanOrder: Boolean,
                familyCanOrder: Boolean,
              },
            },
            videoBooks: {
              type: Object,
              schema: {
                funeralHomeCanOrder: Boolean,
                familyCanOrder: Boolean,
              },
            },
            photoBooks: {
              type: Object,
              schema: {
                funeralHomeCanOrder: Boolean,
                familyCanOrder: Boolean,
              },
            },
          },
        },
        defaultProducts: {
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
        availableProducts: {
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
        isDemoClient: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
        saveUnknown: ['defaultProducts.**', 'availableProducts.**'],
      },
    )

    super('client', schema)
  }

  public async findOne(search: any): Promise<IClientModel.Model | undefined> {
    const results: any = await this.query(search)
    if (results) {
      return results[0]
    }
    return
  }

  public async findOneByHandle(
    handle: string,
  ): Promise<IClientModel.Model | undefined> {
    const data = await this.getModel().query({ handle }).exec()
    return data?.[0]
  }

  public async findByUserId(
    userId: string,
  ): Promise<Array<IClientModel.Model>> {
    return this.getModel()
      .scan({ users: { contains: userId } })
      .exec()
  }

  public async findOneByUserId(userId: string): Promise<IClientModel.Model> {
    const clients: Array<IClientModel.Model> = await this.findByUserId(userId)
    console.log('findOneByUserId', userId)
    if (clients.length === 0) {
      throw new Error('findOneByUserId: clients not found')
    }
    return clients[0]
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IClientModel.Schema[]> {
    const result = await this.getModel()
      .scan(search)
      .attributes(attributes)
      .all()
      .exec()

    return result.map((item: any) => {
      return {
        ...item,
        users: item.users instanceof Set ? [...item.users] : [],
      }
    })
  }

  public async save(
    clientObj: IClientModel.Schema,
  ): Promise<IClientModel.Schema> {
    if (!clientObj.id) {
      return this.create(clientObj)
    } else {
      return this.update(clientObj)
    }
  }

  public async create(
    clientObj: IClientModel.Schema,
  ): Promise<IClientModel.Schema> {
    let clientResult: IClientModel.Schema

    const saveQuery: IClientModel.Schema = {
      id: uuid.v4(),
      ...UtilHelper.pick(UPDATABLE_FIELDS, clientObj),
    }

    try {
      clientResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return clientResult
  }

  public async update(
    clientObj: IClientModel.Schema,
  ): Promise<IClientModel.Schema> {
    let clientResult: IClientModel.Schema

    const saveQuery = UPDATABLE_FIELDS.reduce((query, key) => {
      if (clientObj.hasOwnProperty(key)) {
        query[key] = (clientObj as any)[key]
      }
      return query
    }, {} as { [key: string]: any })

    try {
      await this.getModel().update({ id: clientObj.id }, saveQuery)
      clientResult = await this.getModel().get(clientObj.id!)
    } catch (error) {
      throw error
    }

    return clientResult
  }

  public async findUsers(clientId: string): Promise<Array<IUserModel.Model>> {
    const client = await this.findById(clientId)
    return await BBPromise.map(
      client.users ?? [],
      async (userId: string) => {
        return await userModel.findById(userId)
      },
      { concurrency: 10 },
    )
  }

  public async findAdmins(clientId: string): Promise<Array<IUserModel.Model>> {
    const users = await this.findUsers(clientId)
    return users.filter((user) => user.clientRole === IClientRole.ADMIN)
  }

  public async queryByClientIdsGroupById(
    clientIds: Array<string>,
    attributes: Array<string>,
  ): Promise<{ [key: string]: IClientModel.Schema }> {
    console.log('queryByClientIdsGroupById modelName', this.modelName)
    const records = await this.getModel().batchGet(UtilHelper.uniq(clientIds), {
      attributes,
    })

    const clients = records.reduce((acc: any, client) => {
      acc[client.id!] = client
      return acc
    }, {})
    console.log(
      'completed: queryByClientIdsGroupById modelName',
      this.modelName,
    )
    return clients
  }

  public static async remove(
    clientId: string,
  ): Promise<{ success: boolean; deletedRecords: { [key: string]: number } }> {
    // Verify client exists
    const client = await clientModel.findById(clientId)
    if (!client) {
      throw new Error(`Client with ID ${clientId} not found`)
    }

    const deletedRecords: { [key: string]: number } = {}

    try {
      // 1. Find all cases associated with this client
      const cases = await caseModel.getAllCasesByClientId(clientId)
      deletedRecords.cases = cases.length

      // 2. For each case, delete associated records in order
      for (const caseObj of cases) {
        const caseId = caseObj.id!

        // 2a. Delete assets associated with this case
        const assets = await assetModel.findByCaseId(caseId)
        deletedRecords.assets = (deletedRecords.assets || 0) + assets.length
        for (const asset of assets) {
          if (caseId === '*') {
            console.log(`ClientModel.remove: cannot remove asset ${caseId}`)
          } else {
            await assetModel.remove({ id: asset.id })
          }
        }

        // 2b. Delete invoices associated with this case
        const invoices = await invoiceModel.findByCaseId(caseId)
        deletedRecords.invoices =
          (deletedRecords.invoices || 0) + invoices.length
        for (const invoice of invoices) {
          // Delete associated transactions
          if (invoice.transactions && invoice.transactions.length > 0) {
            for (const transactionId of invoice.transactions) {
              try {
                await transactionModel.remove({ id: transactionId })
                deletedRecords.transactions =
                  (deletedRecords.transactions || 0) + 1
              } catch (error) {
                console.warn(
                  `Failed to delete transaction ${transactionId}:`,
                  error,
                )
              }
            }
          }
          await invoiceModel.remove({ id: invoice.id })
        }

        // 2c. Delete invites associated with this case
        const invites = await inviteModel.query({ case: caseId })
        deletedRecords.invites = (deletedRecords.invites || 0) + invites.length
        for (const invite of invites) {
          await inviteModel.remove({ id: invite.id })
        }

        // 2d. Delete the case itself
        await caseModel.remove({ id: caseId })
      }

      // 3. Delete themes associated with this client
      const themes = await themeModel.getModel().query({ clientId }).exec()
      deletedRecords.themes = themes.length
      for (const theme of themes) {
        await themeModel.remove({ id: theme.id })
      }

      // 4. Delete background images associated with this client
      const backgroundImages = await backgroundImageModel
        .getModel()
        .query({ clientId })
        .exec()
      deletedRecords.backgroundImages = backgroundImages.length
      for (const backgroundImage of backgroundImages) {
        await backgroundImageModel.remove({ id: backgroundImage.id })
      }

      // 5. Delete invites associated with this client (direct relationship)
      const clientInvites = await inviteModel.query({ client: clientId })
      deletedRecords.clientInvites = clientInvites.length
      for (const invite of clientInvites) {
        await inviteModel.remove({ id: invite.id })
      }

      // 6. Finally, delete the client itself
      await clientModel.remove({ id: clientId })
      deletedRecords.clients = 1

      return {
        success: true,
        deletedRecords,
      }
    } catch (error) {
      console.error('Error removing client with associated records:', error)
      throw new Error(`Failed to remove client ${clientId}: ${error.message}`)
    }
  }
}

export const clientModel = new ClientModel()
