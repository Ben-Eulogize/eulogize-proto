import * as uuid from 'uuid'
import { BaseModel } from './BaseModel'
import { Item } from 'dynamoose/dist/Item'
import { EulogiseResourceName } from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'

export abstract class BaseEulogizeModel<
  T extends { id?: string } & Item,
  S extends { id?: string },
> extends BaseModel<T, S> {
  private readonly updatableFields: Array<keyof S>

  protected constructor(
    modelName: EulogiseResourceName,
    schema: S,
    updatableFields: Array<keyof S>,
  ) {
    super(modelName, schema)
    this.updatableFields = updatableFields
  }

  public async findByCaseId(caseId: string): Promise<Array<T>> {
    return this.getModel().query({ case: caseId }).all().exec()
  }

  public async findOneByCaseId(caseId: string): Promise<T | null> {
    const invoices = await this.findByCaseId(caseId)
    if (invoices.length === 0) {
      return null
    }
    return invoices?.[0]
  }

  public async save(obj: S): Promise<T> {
    if (!obj.id) {
      return this.create(obj)
    } else {
      return this.update(obj)
    }
  }

  public async create(obj: S): Promise<T> {
    const saveQuery = {
      ...obj,
      id: obj.id ?? uuid.v4(),
    }

    try {
      return this.getModel().create(saveQuery as any, {
        return: 'item',
      }) as Promise<T>
    } catch (error) {
      throw error
    }
  }

  public async updateById(id: string, data: Partial<S>): Promise<T> {
    try {
      return this.getModel().update(
        { id },
        UtilHelper.pick(this.updatableFields, data) as Partial<T>,
        {
          return: 'item',
        },
      ) as Promise<T>
    } catch (error) {
      throw error
    }
  }

  public async update(obj: Partial<S>): Promise<T> {
    try {
      return this.getModel().update(
        { id: obj.id },
        UtilHelper.pick(this.updatableFields, obj) as Partial<T>,
        {
          return: 'item',
        },
      ) as Promise<T>
    } catch (error) {
      throw error
    }
  }
}
