import assets from '../seed/assets.seed'
import backgroundImages from '../seed/backgroundImages.seed'
import booklets from '../seed/booklets.seed'
import bookmarks from '../seed/bookmarks.seed'
import cases from '../seed/cases.seed'
import clients from '../seed/clients.seed'
import invites from '../seed/invites.seed'
import invoices from '../seed/invoices.seed'
import services from '../seed/services.seed'
import sidedcards from '../seed/sidedcards.seed'
import slideshows from '../seed/slideshows.seed'
import thankyoucards from '../seed/thankyoucards.seed'
import transactions from '../seed/transaction.seed'
import users from '../seed/users.seed'
import {
  assetModel,
  backgroundImageModel,
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
  themeModel,
  transactionModel,
  userModel,
} from '../src/ts/database'
import themes from '../seed/themes.seed'

const start = async () => {
  const SEED_TABLES = process.env.SEED_TABLES
  if (!SEED_TABLES) {
    console.log('No tables to seed (SEED_TABLES) defined')
    return
  }
  const seedTables = SEED_TABLES.split(',')
  console.log('seedTables', seedTables)
  const tables = [
    { name: 'assets', data: assets, Model: assetModel },
    {
      name: 'backgroundImages',
      data: backgroundImages.map((bg) => ({ ...bg, status: 'published' })),
      Model: backgroundImageModel,
    },
    { name: 'booklets', data: booklets, Model: bookletModel },
    { name: 'bookmarks', data: bookmarks, Model: bookmarkModel },
    { name: 'cases', data: cases, Model: caseModel },
    { name: 'clients', data: clients, Model: clientModel },
    { name: 'invites', data: invites, Model: inviteModel },
    { name: 'invoices', data: invoices, Model: invoiceModel },
    { name: 'services', data: services, Model: serviceModel },
    { name: 'sidedcards', data: sidedcards, Model: sidedCardModel },
    { name: 'slideshows', data: slideshows, Model: slideshowModel },
    { name: 'themes', data: themes, Model: themeModel },
    { name: 'thankyoucards', data: thankyoucards, Model: thankyouCardModel },
    { name: 'transactions', data: transactions, Model: transactionModel },
    { name: 'users', data: users, Model: userModel },
  ]

  try {
    for (const table of tables) {
      if (!(seedTables.includes(table.name) || seedTables.includes('ALL'))) {
        continue
      }
      console.log('Seed: Populating table', table.name)
      const { Model, data, name }: { Model: any; data: any; name: string } =
        table
      const currentModel = Model.getModel()
      /*
      const existingUsers = await currentModel.scan().exec()
      const ids = existingUsers.map(({ id }: { id: string }) => id)
      console.log('ids', ids, data, name)
      if (ids.length > 0) {
        await currentModel.batchDelete(ids)
      }
*/

      // seed data
      for (const item of data) {
        delete item.createdAt
        delete item.updatedAt
        console.log(`creating ${name}`, item)
        // @ts-ignore
        await currentModel.create(item)
      }
    }
  } catch (ex) {
    console.log('ex', ex)
  }
}

start()
