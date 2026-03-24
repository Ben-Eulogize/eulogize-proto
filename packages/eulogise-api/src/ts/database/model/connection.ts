import dynamoose from 'dynamoose'
import { IConnectionModel } from '../types/ConnectionModel.types'
import { BaseEulogizeModel } from './BaseEulogizeModel'

class ConnectionModel extends BaseEulogizeModel<
  IConnectionModel.Model,
  IConnectionModel.Schema
> {
  constructor() {
    const schema = new dynamoose.Schema(
      {
        id: {
          type: String,
        },
        case: {
          type: String,
          index: {
            type: 'global',
            name: 'case-index',
          },
        },
        user: {
          type: String,
          required: true,
        },
      },
      {
        saveUnknown: [],
        timestamps: true,
      },
    )
    super('connection', schema as any, ['case', 'user'])
  }
}

export const connectionModel = new ConnectionModel()
