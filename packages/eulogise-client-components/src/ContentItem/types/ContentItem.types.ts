import {
  CardProductDrawerLayoutType,
  EulogiseProduct,
  ICardProductRow,
  ICardProductRowData,
} from '@eulogise/core'

export type IChangeImageEvent = {
  columnIndex?: number
  frameContentItemId?: string
  product?: EulogiseProduct
  slug?: string
  pageIndex?: number
  rowId?: string
  filestackHandle?: string
  maxImages?: number
  openImageLibrary?: boolean
}

export type IFrameChangeEvent = {
  pageIndex: number
  rowId?: string
  rowContent?: ICardProductRow
  layoutType?: CardProductDrawerLayoutType
  layoutId?: string
}

export type IRowDataChangeEvent = {
  pageIndex: number
  rowId: string
  rowData: ICardProductRowData
}
