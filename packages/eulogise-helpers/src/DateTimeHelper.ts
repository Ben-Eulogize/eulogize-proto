import moment from 'moment'
import momentTimeZone from 'moment-timezone'
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_ISO_DATE_FORMAT,
  EulogiseCountry,
  EulogiseCountryTimeZone,
} from '@eulogise/core'

export const DateTimeHelper = {
  toTime: (date: string | number) => {
    if (!date) {
      throw new Error(`Date is required`)
    }
    if (typeof date === 'string') {
      return moment(date).toDate().getTime()
    }
    return moment(date).toDate().getTime()
  },
  formatDate: (date?: string | number, dateFormat?: string) =>
    moment(date).format(dateFormat ?? DEFAULT_DATE_FORMAT),
  getYearFromDate: (date?: string | number) => moment(date).format('YYYY'),
  formatDateTime: (date?: string | number) =>
    moment(date).format(DEFAULT_DATE_TIME_FORMAT),
  formatTimeByDate: (date?: string) => moment(date).format('HH:mm'),
  formatYear: (date?: string | number) => moment(date).format('YYYY'),
  formatDateTimeWithCountry: (
    date: string | number,
    country: EulogiseCountry,
  ) => {
    if (typeof date !== 'string') {
      return moment(date).format(DEFAULT_DATE_TIME_FORMAT)
    }
    return momentTimeZone(date)
      .tz(EulogiseCountryTimeZone[country])
      .format(DEFAULT_DATE_TIME_FORMAT)
  },
  formatISODate: (date?: string) =>
    moment(date).format(DEFAULT_ISO_DATE_FORMAT),

  formatDuration: (milliSeconds: number) => {
    const minutes = Math.floor(milliSeconds / 60000)
    const seconds = Math.floor((milliSeconds % 60000) / 1000)

    return `${minutes}:${`0${seconds}`.slice(-2)}`
  },

  formatDurationInMilliseconds: (milliSeconds: number) => {
    const minutes = Math.floor(milliSeconds / 60000)
    const seconds = Math.floor((milliSeconds % 60000) / 1000)
    const milliseconds = Math.floor(milliSeconds % 1000).toString()

    const filledSecondsString = seconds.toString().padStart(2, '0')
    const filledMillisecondsString = milliseconds.toString().padStart(3, '0')

    return `${minutes}:${filledSecondsString}:${filledMillisecondsString}`
  },

  getTimeByDate: (date: string): number => {
    return Number(moment(`${date}T00:00:00Z`).format('x'))
  },

  formatInSeconds: (milliseconds: number) => {
    return `${Math.floor(milliseconds / 1000)} seconds`
  },

  formatInSecondsWithDecimalPlaces: (
    milliseconds: number,
    numberOfDecimalPlaces: 1 | 2 | 3,
  ) => {
    if (numberOfDecimalPlaces < 1 || numberOfDecimalPlaces > 3) {
      return `${Math.floor(milliseconds / 1000)} seconds`
    }
    return `${(milliseconds / 1000).toFixed(numberOfDecimalPlaces)} seconds`
  },

  // Convert milliseconds to mm:ss
  formatTime(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.round((milliseconds % 60000) / 1000)

    return `${minutes}:${`0${seconds}`.slice(-2)}`
  },

  getMinutesFromMs: (milliseconds: number): number =>
    Math.floor(milliseconds / 60000),
  getSecondsFromMs: (milliseconds: number): number =>
    Math.round((milliseconds % 60000) / 1000),

  // Convert milliseconds to mm mins ss
  formatWithMinsAndSecondsText: (milliSeconds: number) => {
    const minutes = Math.floor(milliSeconds / 60000)
    const seconds = Math.round((milliSeconds % 60000) / 1000)

    return `${minutes} mins ${`0${seconds}`.slice(-2)}`
  },
}
