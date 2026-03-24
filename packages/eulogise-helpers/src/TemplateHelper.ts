import {
  CARD_PRODUCT_DYNAMIC_DATA_FIELDS,
  ICardProductTextRow,
} from '@eulogise/core'
import { ICardProductImageRow } from '@eulogise/core'
import { CardProductContentItemType } from '@eulogise/core'
import { ICardProductPage } from '@eulogise/core'
import { UtilHelper } from './UtilHelper'

export class TemplateHelper {
  public static isDynamicData(key: string): boolean {
    const arr = UtilHelper.flattenObjectOfArrays<{
      label: string
      value: string
    }>(CARD_PRODUCT_DYNAMIC_DATA_FIELDS)
    return !!arr.find(({ value }) => value === key)
  }

  public static getDynamicDataContentByRowId(
    pages: Array<ICardProductPage>,
    rowId: string,
  ) {
    for (let page of pages) {
      for (let row of page.rows) {
        if (row.id === rowId) {
          switch (row.type) {
            case CardProductContentItemType.TEXT: {
              const textRow = row as ICardProductTextRow
              const text = textRow.data.content.blocks[0].text
              return this.isDynamicData(text) ? text : undefined
            }
            case CardProductContentItemType.IMAGE: {
              const imgSrc = (row as ICardProductImageRow).data as string
              return this.isDynamicData(imgSrc) ? imgSrc : undefined
            }
            case CardProductContentItemType.FRAME: {
              const str = row.data as unknown as string
              return this.isDynamicData(str) ? str : undefined
            }
          }
        }
      }
    }

    return undefined
  }
}
