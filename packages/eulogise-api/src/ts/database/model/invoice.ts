import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { IInvoiceModel } from '../types/InvoiceModel.types'
import { BaseModel } from './BaseModel'

class InvoiceModel extends BaseModel<
  IInvoiceModel.Model,
  IInvoiceModel.Schema
> {
  constructor() {
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
        customer: {
          type: String,
          required: true,
        },
        transactions: {
          type: Array,
          schema: [String],
        },
        details: {
          type: Object,
        },
        status: {
          type: String,
          enum: ['pending', 'failed', 'complete'],
        },
        error: {
          type: Object,
        },
      },
      {
        saveUnknown: ['details.**', 'error.**'],
        timestamps: true,
      },
    )
    super('invoice', schema)
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IInvoiceModel.Schema[]> {
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async findByCaseId(
    caseId: string,
  ): Promise<Array<IInvoiceModel.Schema>> {
    return this.getModel().query({ case: caseId }).all().exec()
  }

  public async findOneByCaseId(
    caseId: string,
  ): Promise<IInvoiceModel.Schema | null> {
    const invoices = await this.findByCaseId(caseId)
    if (invoices.length === 0) {
      return null
    }
    return invoices?.[0]
  }

  public async save(
    invoiceObj: IInvoiceModel.Schema,
  ): Promise<IInvoiceModel.Schema> {
    if (!invoiceObj.id) {
      return this.create(invoiceObj)
    } else {
      return this.update(invoiceObj)
    }
  }

  public async create(
    invoiceObj: IInvoiceModel.Schema,
  ): Promise<IInvoiceModel.Schema> {
    let invoiceResult: IInvoiceModel.Schema

    const saveQuery = {
      id: uuid.v4(),
      case: invoiceObj.case,
      customer: invoiceObj.customer,
      transactions: invoiceObj.transactions,
      details: invoiceObj.details,
      status: invoiceObj.status,
      error: invoiceObj.error,
    }

    try {
      invoiceResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return invoiceResult
  }

  public async update(
    invoiceObj: IInvoiceModel.Schema,
  ): Promise<IInvoiceModel.Schema> {
    let invoiceResult: IInvoiceModel.Schema

    const saveQuery = [
      'case',
      'customer',
      'transactions',
      'details',
      'status',
      'error',
    ].reduce((query, key) => {
      if (invoiceObj.hasOwnProperty(key)) {
        query[key] = (invoiceObj as any)[key]
      }
      return query
    }, {} as { [key: string]: any })

    try {
      await this.getModel().update({ id: invoiceObj.id }, saveQuery)
      invoiceResult = await this.getModel().get(invoiceObj.id!)
    } catch (error) {
      throw error
    }

    return invoiceResult
  }
}

export const invoiceModel = new InvoiceModel()
