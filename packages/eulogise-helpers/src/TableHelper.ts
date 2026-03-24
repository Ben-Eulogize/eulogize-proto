import { DateTimeHelper } from './DateTimeHelper'
import { DEFAULT_DATE_FORMAT_WITHOUT_YEAR } from '@eulogise/core'

export class TableHelper {
  public static commonSorter = (key: string) => (a: any, b: any) =>
    a[key] > b[key] ? 1 : -1

  public static dateSorter = (key: string) => (a: any, b: any) => {
    return DateTimeHelper.toTime(a[key]) > DateTimeHelper.toTime(b[key])
      ? 1
      : -1
  }

  public static dateRenderer = (key: string) => (text: string, record: any) => {
    if (!record[key]) {
      return 'TBD'
    }
    return DateTimeHelper.formatDate(record[key])
  }

  public static dateRendererWithoutYear =
    (key: string) => (text: string, record: any) => {
      if (!record[key]) {
        return 'TBD'
      }
      return DateTimeHelper.formatDate(
        record[key],
        DEFAULT_DATE_FORMAT_WITHOUT_YEAR,
      )
    }
}
