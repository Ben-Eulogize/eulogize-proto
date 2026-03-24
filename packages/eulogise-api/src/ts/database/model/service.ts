import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { IServiceModel } from '../types/ServiceModel.types'
import { BaseModel } from './BaseModel'

class ServiceModel extends BaseModel<
  IServiceModel.Model,
  IServiceModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        title: {
          type: String,
        },
        accessKey: {
          type: String,
          required: true,
        },
        secretKey: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      },
    )
    super('service', schema)
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IServiceModel.Schema[]> {
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async save(
    serviceObj: IServiceModel.Schema,
  ): Promise<IServiceModel.Schema> {
    if (!serviceObj.id) {
      return this.create(serviceObj)
    } else {
      return this.update(serviceObj)
    }
  }

  public async create(
    serviceObj: IServiceModel.Schema,
  ): Promise<IServiceModel.Schema> {
    let serviceResult: IServiceModel.Schema

    const saveQuery = {
      id: uuid.v4(),
      title: serviceObj.title,
      accessKey: uuid.v4(),
      secretKey: uuid.v4(),
    }

    try {
      serviceResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return serviceResult
  }

  public async update(
    serviceObj: IServiceModel.Schema,
  ): Promise<IServiceModel.Schema> {
    let serviceResult: IServiceModel.Schema

    const saveQuery = ['title', 'accessKey', 'secretKey'].reduce(
      (query, key) => {
        if (serviceObj.hasOwnProperty(key)) {
          query[key] = (serviceObj as any)[key]
        }
        return query
      },
      {} as { [key: string]: any },
    )

    try {
      await this.getModel().update({ id: serviceObj.id }, saveQuery)
      serviceResult = await this.getModel().get(serviceObj.id!)
    } catch (error) {
      throw error
    }

    return serviceResult
  }

  public async remove(search: any): Promise<boolean> {
    const removeQuery = {
      ...search,
    }

    let removeResult: any

    try {
      removeResult = await this.getModel().delete(removeQuery)
    } catch (error) {
      throw error
    }

    return removeResult
  }

  public scope(
    type: 'public',
    serviceObj: IServiceModel.Schema,
  ): IServiceModel.PublicSchema | undefined {
    if (type === 'public') {
      return {
        id: serviceObj.id,
        title: serviceObj.title,
        createdAt: serviceObj.createdAt,
        updatedAt: serviceObj.updatedAt,
      }
    }
    return
  }
}

export const serviceModel = new ServiceModel()
