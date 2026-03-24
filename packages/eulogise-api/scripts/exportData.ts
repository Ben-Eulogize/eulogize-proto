import { writeFileSync } from 'fs'
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
  themeModel,
  transactionModel,
  tvWelcomeScreenModel,
  userModel,
} from '../src/ts/database'
import { backgroundImageModel } from '../src/ts/database/model/backgroundImage'

const start = async () => {
  console.log(`Environment: ${process.env.ENV}`)
  console.log(`DB_PREFIX: ${process.env.DB_PREFIX}`)
  const models = [
    { Model: assetModel, name: 'assets' },
    { Model: backgroundImageModel, name: 'backgroundImages' },
    { Model: bookletModel, name: 'booklets' },
    { Model: bookmarkModel, name: 'bookmarks' },
    { Model: caseModel, name: 'cases' },
    {
      Model: clientModel,
      name: 'clients',
      transform: (items: any) =>
        items.map((i: any) => ({
          ...i,
          users: i.users ? [...i.users] : undefined,
        })),
    },
    { Model: inviteModel, name: 'invites' },
    { Model: invoiceModel, name: 'invoices' },
    { Model: serviceModel, name: 'services' },
    { Model: sidedCardModel, name: 'sidecards' },
    { Model: slideshowModel, name: 'slideshows' },
    { Model: thankyouCardModel, name: 'thankyoucards' },
    { Model: transactionModel, name: 'transactions' },
    { Model: tvWelcomeScreenModel, name: 'tvWelcomeScreens' },
    { Model: themeModel, name: 'themes' },
    { Model: userModel, name: 'users' },
  ]
  for (const model of models) {
    const { Model, name, transform } = model
    console.log(`Exporting: ${name}`)
    const items: any = await Model.getModel().scan().exec()

    writeFileSync(
      `${__dirname}/../backups/${name}.json`,
      JSON.stringify(transform ? transform(items) : items.toJSON()),
      'utf8',
    )
  }
  console.log('Complete')
}

start()
