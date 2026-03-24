import * as uuid from 'uuid'
import dynamoose from 'dynamoose'
import { IMemorialProductModel } from '../types/MemorialProductModel.types'
import { BaseModel } from './BaseModel'
import {
  EulogiseResourceName,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'

export type MemorialProductIndexObject = {
  [key: string]: Array<IMemorialProductModel.Schema>
}

const UPDATABLE_FIELDS = [
  'case',
  'content',
  'status',
  'fileStatus',
  'fileStatuses',
  'generateUserId',
  'hasGeneratedBefore',
]

export abstract class BaseMemorialModel extends BaseModel<
  IMemorialProductModel.Model,
  IMemorialProductModel.Schema
> {
  protected readonly additionalUpdatableFields: Array<string>

  protected constructor(
    modelName: EulogiseResourceName,
    options?: {
      additionalSchema?: any
      additionalUpdatableFields?: Array<string>
    },
  ) {
    const schema = new dynamoose.Schema(
      {
        // Creating new fields, make sure updating UPDATABLE_FIELDS
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        case: {
          type: String,
          index: {
            type: 'global',
            name: 'caseIndex',
          },
          required: true,
        },
        content: {
          type: Object,
        },
        status: {
          type: String,
          enum: [
            MemorialVisualStatus.NOT_STARTED,
            MemorialVisualStatus.THEME_SELECTED,
            MemorialVisualStatus.EDITED,
            MemorialVisualStatus.COMPLETE,
            MemorialVisualStatus.DOWNLOAD,
            // DEPRECATED
            MemorialVisualStatus.INCOMPLETE,
          ],
          default: MemorialVisualStatus.THEME_SELECTED,
        },
        fileStatus: {
          type: String,
          enum: ['not_started', 'processing', 'generated', 'failed'],
          default: 'not_started',
        },
        fileStatuses: {
          type: Object,
        },
        generateUserId: { type: String },
        hasGeneratedBefore: { type: Boolean, default: false },
        ...options?.additionalSchema,
      },
      {
        saveUnknown: ['content.**', 'fileStatuses.**'],
        timestamps: true,
      },
    )
    super(modelName, schema as any)
    this.additionalUpdatableFields = options?.additionalUpdatableFields ?? []
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IMemorialProductModel.Schema[]> {
    const keys = Object.keys(search)
    console.log('query keys', keys)
    if (keys.length === 1 && search && search.case) {
      return this.getProductsByCaseId(search.case)
    }
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async getProductsByCaseId(
    caseId: string,
    attributes?: any,
  ): Promise<Array<IMemorialProductModel.Model>> {
    console.log('getProductsByCaseId', this.modelName, caseId)
    return this.getModel()
      .query({ case: caseId })
      .attributes(attributes)
      .where('createdAt')
      .sort('descending')
      .exec()
  }

  public async getActiveProductByCaseId(
    caseId: string,
    attributes?: any,
  ): Promise<IMemorialProductModel.Model | undefined> {
    const products = await this.getProductsByCaseId(caseId, attributes)
    if (products.length > 0) {
      return products.reduce((latestProduct, currentProduct) => {
        if (
          latestProduct.updatedAt === undefined ||
          currentProduct.updatedAt === undefined
        ) {
          return latestProduct
        }

        return new Date(latestProduct.updatedAt) >
          new Date(currentProduct.updatedAt)
          ? latestProduct
          : currentProduct
      }, products[0])
      // return products[0]
    }
    return
  }

  public async findByCaseId(
    caseId: string,
  ): Promise<IMemorialProductModel.Model | undefined> {
    return this.getActiveProductByCaseId(caseId)
  }

  public async markAsDownloadStatusById(
    id: string,
  ): Promise<IMemorialProductModel.Schema> {
    return this.getModel().update(
      { id },
      { status: MemorialVisualStatus.DOWNLOAD },
    )
  }

  public async create(
    memorialProductData: IMemorialProductModel.Schema,
  ): Promise<IMemorialProductModel.Schema> {
    let memorialProduct: IMemorialProductModel.Schema

    const saveQuery = {
      id: uuid.v4(),
      case: memorialProductData.case,
      content: memorialProductData.content,
      status: memorialProductData.status,
      generateUserId: memorialProductData.generateUserId,
    }

    try {
      console.log('Creating Memorial Product', saveQuery)
      memorialProduct = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return memorialProduct
  }

  public async updateByCaseId(
    caseId: string,
    data: any,
  ): Promise<IMemorialProductModel.Schema> {
    console.log('updateByCaseId', caseId, data)
    const product = await this.getActiveProductByCaseId(caseId)
    if (!product) {
      throw new Error(
        `updateByCaseId: product not found for caseId: "${caseId}"`,
      )
    }
    return await this.getModel().update({ id: product.id }, data, {
      return: 'item',
    })
  }

  public async removeByCaseId(caseId: string) {
    const products = await this.getProductsByCaseId(caseId)
    console.log(`removeByCaseId ${this.getModelName()}`, caseId)
    console.log(products)
    for (const product of products) {
      console.log(
        `removeByCaseId ${this.getModelName()} deleting product`,
        product.id,
      )
      await product.delete()
    }
  }

  public async update(
    memorialProductData: Partial<IMemorialProductModel.Schema>,
  ): Promise<IMemorialProductModel.Schema> {
    let memorialProductResult: IMemorialProductModel.Schema

    const saveQuery = [
      ...UPDATABLE_FIELDS,
      ...this.additionalUpdatableFields,
    ].reduce((query, key) => {
      if (memorialProductData.hasOwnProperty(key)) {
        query[key] = (memorialProductData as any)[key]
      }
      return query
    }, {} as { [key: string]: any })
    console.log('Updating Memorial Product', {
      saveQuery,
      memorialProductDataId: memorialProductData.id,
    })

    try {
      memorialProductResult = await this.getModel().update(
        { id: memorialProductData.id },
        saveQuery,
        {
          return: 'item',
        },
      )
      /*
      memorialProductResult = (await this.getModel().get(
        memorialProductData.id!,
      )) as never as IMemorialProductModel.Schema
*/
    } catch (error) {
      throw error
    }

    return memorialProductResult
  }

  public async save(
    memorialProductData: IMemorialProductModel.Schema,
  ): Promise<IMemorialProductModel.Schema> {
    if (!memorialProductData.id) {
      return this.create(memorialProductData)
    } else {
      return this.update(memorialProductData)
    }
  }

  public async getAllIndexesByCaseId(
    attributes: Array<string>,
  ): Promise<MemorialProductIndexObject> {
    console.log('getAllIndexesByCaseId', this.modelName)
    const records = await this.getAllWithAttributes(attributes)
    try {
      const results = records.reduce((acc, curr) => {
        const caseId = curr.case!
        if (acc[caseId]) {
          acc[caseId].push(curr)
        } else {
          acc[caseId] = [curr]
        }
        return acc
      }, {} as any)

      console.log('completed: getAllIndexesByCaseId', this.modelName)
      return results
    } catch (ex) {
      console.log('error on', this.modelName, ex)
      throw new Error(ex)
    }
  }

  public async scanByCaseIdsGroupById(
    caseIds: Array<string>,
    attributes: Array<string>,
  ): Promise<MemorialProductIndexObject> {
    console.log('scanByCaseIdsGroupById', this.modelName, caseIds)
    const records = await this.getModel()
      .scan('case')
      .in(caseIds)
      .attributes(attributes)
      .all()
      .exec()

    console.log('return records', this.modelName, caseIds, records)
    const results = records.reduce((acc, curr) => {
      const caseId = curr.case!
      if (acc[caseId]) {
        acc[caseId].push(curr)
      } else {
        acc[caseId] = [curr]
      }
      return acc
    }, {} as any)
    console.log('return results', this.modelName, caseIds, results)
    console.log('completed: scanByCaseIdsGroupById', this.modelName)
    return results
  }

  public async unlockProductById({ productId }: { productId: string }) {
    return this.getModel().update(
      { id: productId },
      {
        status: MemorialVisualStatus.EDITED,
        fileStatus: 'not_started',
      },
      {
        return: 'item',
      },
    )
  }

  public async updateFileStatusById({
    productId,
    fileStatus,
    status,
    hasGeneratedBefore,
  }: {
    productId: string
    fileStatus: ResourceFileStatus
    status: MemorialVisualStatus
    hasGeneratedBefore: boolean
  }) {
    console.log('updateFileStatusById', this.modelName, productId, fileStatus)
    return this.getModel().update(
      { id: productId },
      {
        fileStatus,
        status,
        hasGeneratedBefore,
      },
    )
  }
}
