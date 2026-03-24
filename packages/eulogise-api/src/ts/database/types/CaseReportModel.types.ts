import { Item } from 'dynamoose/dist/Item'
import { CaseModelWithSummary } from '../../functions/controller'

export namespace ICaseReportModel {
  export type Schema = CaseModelWithSummary

  export type Model = Item & Schema
}
