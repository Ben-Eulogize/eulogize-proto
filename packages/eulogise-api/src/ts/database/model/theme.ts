import * as uuid from 'uuid'
import dynamoose from 'dynamoose'
import { BaseModel } from './BaseModel'
import { IThemeModel } from '../types/ThemeModel.types'

export class ThemeModel extends BaseModel<
  IThemeModel.Model,
  IThemeModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length >= 4, // 4 because we have 4 character id (e.g. "aura")
          hashKey: true,
        },
        name: {
          type: String,
        },
        clientId: String,
        thumbnail: {
          type: Object,
          schema: {
            images: {
              type: Array,
              default: [],
              schema: [String],
            },
            video: String,
          },
        },
        categories: {
          type: Array,
          default: [],
          schema: [String],
        },
        baseFont: {
          type: String,
        },
        dateFormat: {
          type: String,
        },
        dateFormatUS: {
          type: String,
        },
        products: {
          type: Object,
          schema: {
            booklet: {
              type: Object,
            },
            bookletUS: {
              type: Object,
            },
            sidedCard: {
              type: Object,
            },
            sidedCardUS: {
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
        deleted: {
          type: Boolean,
          default: false,
        },
      },
      {
        saveUnknown: [
          'products.booklet.**',
          'products.bookletUS.**',
          'products.sidedCard.**',
          'products.sidedCardUS.**',
          'products.bookmark.**',
          'products.slideshow.**',
          'products.tvWelcomeScreen.**',
          'products.thankYouCard.**',
        ],
        timestamps: true,
      },
    )
    super('theme', schema)
  }

  public async create(
    themeData: IThemeModel.Schema,
  ): Promise<IThemeModel.Model> {
    let newTheme: IThemeModel.Model

    const saveQuery: IThemeModel.Schema = {
      ...themeData,
      id: themeData.id ?? uuid.v4(),
    }

    try {
      console.log('Creating Theme', saveQuery)
      const model = this.getModel()
      newTheme = await model.create(saveQuery)
      console.log('Created Theme')
    } catch (error) {
      console.log('Error', error)
      throw error
    }

    return newTheme
  }

  public async updateById(
    id: string,
    themeData: Partial<IThemeModel.Schema>,
  ): Promise<IThemeModel.Model> {
    const existingThemeData = await this.findById(id)
    console.log('Pre Updating Theme', existingThemeData)
    Object.keys(themeData).forEach((key) => {
      if (key === 'products') {
        existingThemeData.products = {
          ...existingThemeData.products,
          ...themeData.products,
        }
        return
      }
      if (key === 'createdAt' || key === 'updatedAt') {
        ;(existingThemeData as any).updatedAt = new Date()
        return
      }
      // @ts-ignore
      existingThemeData[key] = themeData[key] ?? existingThemeData[key]
    })
    console.log('Updating Theme', existingThemeData)
    // @ts-ignore
    return await existingThemeData.save({ overwrite: true })
  }
}

export const themeModel = new ThemeModel()
