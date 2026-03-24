import React from 'react'

import Divider1 from './dividers/divider-01.svg'
import Divider2 from './dividers/divider-02.svg'
import Divider3 from './dividers/divider-03.svg'
import Divider4 from './dividers/divider-04.svg'
import Divider5 from './dividers/divider-05.svg'
import Divider6 from './dividers/divider-06.svg'
import Divider7 from './dividers/divider-07.svg'
import Divider8 from './dividers/divider-08.svg'
import Divider9 from './dividers/divider-09.svg'
import Divider10 from './dividers/divider-10.svg'
import Divider11 from './dividers/divider-11.svg'
import Divider12 from './dividers/divider-12.svg'
import Divider13 from './dividers/divider-13.svg'
import Divider14 from './dividers/divider-14.svg'
import Divider15 from './dividers/divider-15.svg'
import Divider16 from './dividers/divider-16.svg'
import Divider17 from './dividers/divider-17.svg'
import Divider18 from './dividers/divider-18.svg'
import Divider19 from './dividers/divider-19.svg'
import { ICardProductDividerName } from '@eulogise/core'

const getDivider = (name: ICardProductDividerName) => {
  switch (name) {
    case 'divider-01':
      return Divider1
    case 'divider-02':
      return Divider2
    case 'divider-03':
      return Divider3
    case 'divider-04':
      return Divider4
    case 'divider-05':
      return Divider5
    case 'divider-06':
      return Divider6
    case 'divider-07':
      return Divider7
    case 'divider-08':
      return Divider8
    case 'divider-09':
      return Divider9
    case 'divider-10':
      return Divider10
    case 'divider-11':
      return Divider11
    case 'divider-12':
      return Divider12
    case 'divider-13':
      return Divider13
    case 'divider-14':
      return Divider14
    case 'divider-15':
      return Divider15
    case 'divider-16':
      return Divider16
    case 'divider-17':
      return Divider17
    case 'divider-18':
      return Divider18
    case 'divider-19':
      return Divider19
    default:
      throw new Error(`Invalid divider name: ${name}`)
  }
}

export const DividerAsset = ({
  name,
  ...props
}: {
  name: ICardProductDividerName
  [key: string]: any
}) => {
  const Divider = getDivider(name)

  // @ts-ignore
  return <Divider {...props} />
}
