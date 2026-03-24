import { readFileSync } from 'fs'
import {
  assetModel,
  bookletModel,
  bookmarkModel,
  caseModel,
  clientModel,
  inviteModel,
  invoiceModel,
  serviceModel,
  sidedCardModel,
  slideshowModel,
  thankyouCardModel,
  transactionModel,
  userModel,
} from '../src/ts/database'

const JSONParser = (keys: any) => (data: any) =>
  keys.reduce(
    (acc: object, key: string) => ({
      ...acc,
      [key]: data[key] ? JSON.parse(data[key]) : undefined,
    }),
    data,
  )

const start = async () => {
  try {
    console.log(`Environment: ${process.env.ENV}`)
    console.log(`DB_PREFIX: ${process.env.DB_PREFIX}`)
    const models = [
      {
        Model: assetModel,
        name: 'assets',
        parser: JSONParser(['content']),
      },
      {
        Model: bookletModel,
        name: 'booklets',
        parser: JSONParser(['content']),
      },
      {
        Model: bookmarkModel,
        name: 'bookmarks',
        parser: JSONParser(['content']),
      },
      {
        Model: caseModel,
        name: 'cases',
        parser: JSONParser(['deceased', 'service', 'inviteEmail', 'editors']),
      },
      {
        Model: clientModel,
        name: 'clients',
        parser: (data: any) => ({
          ...data,
          directors: data.directors ? JSON.parse(data.directors) : [],
          users: data.users ? new Set(data.users) : undefined,
        }),
      },
      { Model: inviteModel, name: 'invites' },
      {
        Model: invoiceModel,
        name: 'invoices',
        parser: JSONParser(['transactions', 'details']),
      },
      { Model: serviceModel, name: 'services' },
      {
        Model: sidedCardModel,
        name: 'sidecards',
        parser: JSONParser(['content']),
      },
      {
        Model: slideshowModel,
        name: 'slideshows',
        parser: JSONParser(['content']),
      },
      {
        Model: thankyouCardModel,
        name: 'thankyoucards',
        parser: JSONParser(['content']),
      },
      {
        Model: transactionModel,
        name: 'transactions',
        parser: JSONParser(['stripePaymentIntentData']),
      },
      {
        Model: userModel,
        name: 'users',
        parser: (data: any) => ({
          ...data,
          fullName: data.fullName ? data.fullName : data.email,
        }),
      },
    ]
    for (const model of models) {
      const { Model, name, parser } = model
      console.log(`Migrating: ${name}`)
      const json = readFileSync(`${__dirname}/../backups/${name}.json`, 'utf-8')
      const items = JSON.parse(json)
      for (const item of items) {
        const parsedItem = parser ? parser(item) : item
        parsedItem.createdAt =
          new Date(parsedItem.createdAt).getTime() || new Date().getTime()
        parsedItem.updatedAt =
          new Date(parsedItem.updatedAt).getTime() || new Date().getTime()
        console.log(`Migrating ${name} item: `, parsedItem)
        // @ts-ignore
        await Model.getModel().create(parsedItem)
      }
    }
    console.log('Complete')
  } catch (ex) {
    console.log(ex)
  }
}

start()
