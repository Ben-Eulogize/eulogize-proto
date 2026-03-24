import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { ITransactionModel } from '../types/TransactionModel.types'
import { BaseModel } from './BaseModel'

class TransactionModel extends BaseModel<
  ITransactionModel.Model,
  ITransactionModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
          validate: (v: string) => v.length === 36,
          hashKey: true,
        },
        customer: {
          type: String,
          required: true,
        },
        stripePaymentIntentId: {
          type: String,
          required: false,
        },
        stripePaymentIntentData: {
          type: Object,
          required: false,
        },
      },
      {
        saveUnknown: ['stripePaymentIntentData.**'],
        timestamps: true,
      },
    )

    super('transaction', schema)
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<ITransactionModel.Schema[]> {
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async save(
    transactionObj: ITransactionModel.Schema,
  ): Promise<ITransactionModel.Schema> {
    if (!transactionObj.id) {
      return this.create(transactionObj)
    } else {
      return this.update(transactionObj)
    }
  }

  public async create(
    transactionObj: ITransactionModel.Schema,
  ): Promise<ITransactionModel.Schema> {
    let transactionResult: ITransactionModel.Schema

    const saveQuery = {
      id: uuid.v4(),
      stripePaymentIntentId: transactionObj.stripePaymentIntentId,
      stripePaymentIntentData: transactionObj.stripePaymentIntentData,
      customer: transactionObj.customer,
    }

    try {
      transactionResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return transactionResult
  }

  public async update(
    transactionObj: ITransactionModel.Schema,
  ): Promise<ITransactionModel.Schema> {
    let transactionResult: ITransactionModel.Schema

    const saveQuery = [
      'customer',
      'stripePaymentIntentId',
      'stripePaymentIntentData',
    ].reduce((query, key) => {
      if (transactionObj.hasOwnProperty(key)) {
        query[key] = (transactionObj as any)[key]
      }
      return query
    }, {} as { [key: string]: any })

    try {
      await this.getModel().update({ id: transactionObj.id }, saveQuery)
      transactionResult = await this.getModel().get(transactionObj.id!)
    } catch (error) {
      throw error
    }

    return transactionResult
  }
}

export const transactionModel = new TransactionModel()
