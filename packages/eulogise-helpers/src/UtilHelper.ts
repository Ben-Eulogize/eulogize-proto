import mergeDeepRight from 'ramda/src/mergeDeepRight'
import mergeAll from 'ramda/src/mergeAll'
import updateArrayItem from 'ramda/src/update'
import insertAll from 'ramda/src/insertAll'
import times from 'ramda/src/times'
import values from 'ramda/src/values'
import ramdaOmit from 'ramda/src/omit'
import equals from 'ramda/src/equals'
import isNil from 'ramda/src/isNil'
import assoc from 'ramda/src/assoc'
import path from 'ramda/src/path'
import uniq from 'ramda/src/uniq'
import pick from 'ramda/src/pick'
import take from 'ramda/src/take'
import takeLast from 'ramda/src/takeLast'
import splitEvery from 'ramda/src/splitEvery'
import flatten from 'ramda/src/flatten'
import reject from 'ramda/src/reject'

// @ts-ignore
import { parseFullName } from 'parse-full-name'

let timeoutId: number | undefined

export class UtilHelper {
  public static percentTextToFloat = (percentText: string) => {
    return parseFloat(percentText.replace('%', '')) / 100
  }

  public static exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  public static makeFullScreen = () => {
    const documentElement = document.documentElement
    if (documentElement.requestFullscreen) {
      documentElement.requestFullscreen()
    } else {
      // @ts-ignore
      if (documentElement.mozRequestFullScreen) {
        // Firefox
        // @ts-ignore
        documentElement.mozRequestFullScreen()
      }
      // @ts-ignore
      else if (documentElement.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        // @ts-ignore
        documentElement.webkitRequestFullscreen()
      }
      // @ts-ignore
      else if (documentElement.msRequestFullscreen) {
        // IE/Edge
        // @ts-ignore
        documentElement.msRequestFullscreen()
      }
    }
  }

  public static removeNils = (obj: object) => {
    const removeNils = reject(isNil)
    return removeNils(obj)
  }

  public static flatten = (arr: Array<any>) => {
    return flatten(arr)
  }

  public static splitEvery = (n: number, arr: Array<any>) => {
    return splitEvery(n, arr)
  }

  public static generateID = (length: number) => {
    return Number(Math.random().toString().substring(2, length) + Date.now())
      .toString(36)
      .substring(0, length)
  }

  public static take(n: number, arr: Array<any>): Array<any> {
    return take(n, arr)
  }

  public static takeLast(n: number, arr: Array<any>): Array<any> {
    return takeLast(n, arr)
  }

  public static clone(obj: any): any {
    return JSON.parse(JSON.stringify(obj))
  }

  public static uniq<T>(arr: Array<T>): Array<T> {
    return uniq(arr)
  }

  public static pick<T>(keys: Array<string>, obj: any): T {
    return pick(keys, obj) as T
  }

  public static getPath(pathArr: Array<string | number>, obj: any) {
    return path(pathArr, obj)
  }
  public static flattenObjectOfArrays<T>(obj: {
    [key: string]: Array<T>
  }): Array<T> {
    return Object.keys(obj).reduce(
      (acc: Array<T>, key: string) => acc.concat(obj[key]),
      [],
    )
  }

  public static debounce(func: any, delay: number) {
    return function () {
      const context = this
      const args = arguments

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(context, args)
      }, delay) as unknown as number
    }
  }

  public static setObject(path: string, value: any, currentData: any) {
    const pathArray = parsePath(path)

    function parsePath(p: string) {
      return p
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .map((key) => (isNaN(parseInt(key)) ? key : parseInt(key)))
    }

    const updateAtPath = (
      pathArray: Array<any>,
      value: string,
      obj: any,
    ): any => {
      const key = pathArray[0]
      if (pathArray.length === 1) {
        return Array.isArray(obj)
          ? updateArrayItem(parseInt(key, 10), value, obj)
          : assoc(key, value, obj)
      } else {
        const head = Array.isArray(obj) ? parseInt(key, 10) : key
        const tail = pathArray.slice(1)
        const nextObj = isNil(obj[head])
          ? Array.isArray(head)
            ? []
            : {}
          : obj[head]
        const updatedNextObj = updateAtPath(tail, value, nextObj)
        return Array.isArray(obj)
          ? updateArrayItem(parseInt(key, 10), updatedNextObj, obj)
          : assoc(key, updatedNextObj, obj)
      }
    }

    return updateAtPath(pathArray, value, currentData)
  }

  public static parseFullName(fullName: string): {
    error: Array<any>
    first: string
    last: string
    middle: string
    nick: string
    suffix: string
    title: string
  } {
    return parseFullName(fullName)
  }

  public static updateArrayItemById(
    items: Array<any>,
    updatedItem: any,
    key: string = 'id',
  ) {
    return items.map((item) => {
      if (item[key] === updatedItem[key]) {
        return updatedItem
      }
      return item
    })
  }

  public static mergeDeepRight(...args: any) {
    return mergeDeepRight.apply(this, args)
  }

  public static mergeAll(...args: any) {
    return mergeAll.apply(this, args)
  }

  public static updateArrayItem(...args: any) {
    return updateArrayItem.apply(this, args)
  }

  public static insertAll(...args: any) {
    return insertAll.apply(this, args)
  }
  public static times(...args: any) {
    return times.apply(this, args)
  }

  public static equals(...args: any) {
    return equals.apply(this, args)
  }

  public static values(...args: any) {
    return values.apply(this, args)
  }

  public static removeUndefinedFields(obj: { [key: string]: any }): {
    [key: string]: any
  } {
    for (let key in obj) {
      if (obj[key] === undefined) {
        delete obj[key]
      }
    }
    return obj
  }

  public static getWindow(): Window | undefined {
    // @ts-ignore
    if (typeof document === 'undefined') {
      return
    }
    // @ts-ignore
    return window
  }
  public static hasWindow() {
    return !!UtilHelper.getWindow()
  }

  public static arrayMove(
    arr: Array<any>,
    fromIndex: number,
    toIndex: number,
  ): Array<any> {
    // Create a copy to avoid mutating the original array
    const element = arr[fromIndex]
    const newArray = arr.slice() // Create shallow copy
    newArray.splice(fromIndex, 1)
    newArray.splice(toIndex, 0, element)
    return newArray
  }

  public static arrayMoveMultiple<T>(
    arr: T[],
    fromIndex: number,
    toIndex: number,
    count: number,
  ): T[] {
    const elements = arr.slice(fromIndex, fromIndex + count)
    const before = arr.slice(0, fromIndex)
    const after = arr.slice(fromIndex + count)

    const arrayWithoutElements = before.concat(after)

    const beforeInsert = arrayWithoutElements.slice(0, toIndex)
    const afterInsert = arrayWithoutElements.slice(toIndex)

    return beforeInsert.concat(elements, afterInsert)
  }

  public static omit(omitFieldNames: Array<string>, obj: any): object {
    return ramdaOmit(omitFieldNames, obj)
  }

  public static sleep(milliseconds: number) {
    // @ts-ignore
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  public static isPropNullOrUndefined(prop: any): boolean {
    if (prop == null) {
      return true
    }
    return false
  }
}
