import * as uuid from 'uuid'
import dynamoose from 'dynamoose'
import { BaseModel } from './BaseModel'
import { IBackgroundImageModel } from '../types/BackgroundImageModel.types'
import { BackgroundRestrictions } from '@eulogise/core'

export class BackgroundImageModel extends BaseModel<
  IBackgroundImageModel.Model,
  IBackgroundImageModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length >= 4, // 4 because we have 4 character id (e.g. "aura")
        },
        name: {
          type: String,
        },
        categoryIds: {
          type: Array,
          default: [],
          schema: [String],
        },
        clientId: {
          type: String,
          index: {
            type: 'global',
            name: 'client-index',
            project: true, // Projects all attributes to the index
            throughput: 'ON_DEMAND', // Uses on-demand capacity mode
          },
        },
        customerId: {
          type: String,
          index: {
            type: 'global',
            name: 'customer-index',
            project: true, // Projects all attributes to the index
            throughput: 'ON_DEMAND', // Uses on-demand capacity mode
          },
        },
        status: {
          type: String,
          enum: ['draft', 'created', 'deleted', 'published'],
          default: 'draft',
        },
        restrictions: {
          type: String,
          enum: [
            BackgroundRestrictions.CUSTOMER_BASE,
            BackgroundRestrictions.CLIENT_BASE,
          ],
        },
        productProperties: {
          type: Object,
          schema: {
            booklet: {
              type: Object,
            },
            bookletUS: {
              type: Object,
            },
            bookmark: {
              type: Object,
            },
            slideshow: {
              type: Object,
            },
            tvWelcomeScreen: {
              type: Object,
            },
            thankYouCard: {
              type: Object,
            },
          },
        },
      },
      {
        saveUnknown: [
          'productProperties.booklet.**',
          'productProperties.bookletUS.**',
          'productProperties.bookmark.**',
          'productProperties.slideshow.**',
          'productProperties.tvWelcomeScreen.**',
          'productProperties.thankYouCard.**',
        ],
        timestamps: true,
      },
    )
    super('backgroundImage', schema)
  }

  public async create(
    backgroundImageData: Partial<IBackgroundImageModel.Schema>,
  ): Promise<IBackgroundImageModel.Schema> {
    let newBackgroundImage: IBackgroundImageModel.Schema

    const saveQuery = {
      ...backgroundImageData,
      id: backgroundImageData.id ?? uuid.v4(),
    } as IBackgroundImageModel.Schema

    try {
      console.log('Creating Background Image', saveQuery)
      const model = this.getModel()
      newBackgroundImage = await model.create(saveQuery)
      console.log('Created Background Image')
    } catch (error) {
      console.log('Error Creating Background Image', error)
      throw error
    }

    return newBackgroundImage
  }

  public async getAllGlobal() {
    return await this.getModel()
      .scan()
      .where('clientId')
      .not()
      .exists()
      .where('customerId')
      .not()
      .exists()
      .exec()
  }

  public async getAllPublicByClientId(clientId: string) {
    const model = this.getModel()
    const clientImages = await model.query({ clientId }).exec()
    return clientImages.filter(
      (image) => image.restrictions === BackgroundRestrictions.CLIENT_BASE,
    )
  }

  private async getAllPrivateByCustomerId(customerId: string) {
    const model = this.getModel()
    const backgrounds = await model.query({ customerId }).exec()
    console.log('backgrounds', backgrounds)
    return backgrounds.filter(
      (b) => b.restrictions === BackgroundRestrictions.CUSTOMER_BASE,
    )
  }

  public async getAllByClientId(clientId: string, customerId?: string) {
    const [globals, clients, customers] = await Promise.all([
      this.getAllGlobal(),
      this.getAllPublicByClientId(clientId),
      customerId ? this.getAllPrivateByCustomerId(customerId) : [],
    ])

    return [...customers, ...clients, ...globals]
  }

  public async getAllByCustomerId(customerId: string, clientId?: string) {
    const [globals, clients, customers] = await Promise.all([
      this.getAllGlobal(),
      clientId ? this.getAllPublicByClientId(clientId) : [],
      this.getAllPrivateByCustomerId(customerId),
    ])
    return [
      // get all customer base images
      ...customers.filter(
        (bg) => bg.restrictions === BackgroundRestrictions.CUSTOMER_BASE,
      ),
      // get all shared client images
      ...clients,
      ...globals,
    ]
  }
}

export const backgroundImageModel = new BackgroundImageModel()
