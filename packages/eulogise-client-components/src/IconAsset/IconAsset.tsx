import React from 'react'

import Christian from './icons/christian.svg'
import ChristianCross from './icons/christian-cross.svg'
import Cross from './icons/cross.svg'
import Cross2 from './icons/cross-2.svg'
import Cross3 from './icons/cross-3.svg'
import Dove from './icons/dove.svg'
import Dove2 from './icons/dove-2.svg'
import Fish from './icons/fish.svg'
import Flower from './icons/flower.svg'
import GolfFlag from './icons/golf-flag.svg'
import Heart from './icons/heart.svg'
import Heart2 from './icons/heart-2.svg'
import Ichthus from './icons/ichthus.svg'
import Jewish from './icons/jewish.svg'
import Jewish2 from './icons/jewish-2.svg'
import Leaf from './icons/leaf.svg'
import Leaf2 from './icons/leaf-2.svg'
import Leaf3 from './icons/leaf-3.svg'
import MusicNote from './icons/music-note.svg'
import MusicNote2 from './icons/music-note-2.svg'
import Muslim from './icons/muslim.svg'
import Ribbon from './icons/ribbon.svg'
import Ribbon2 from './icons/ribbon-2.svg'
import SailBoat from './icons/sail-boat.svg'
import Star from './icons/star.svg'
import Star2 from './icons/star-2.svg'
import Star3 from './icons/star-3.svg'
import Tree from './icons/tree.svg'
import Tree2 from './icons/tree-2.svg'
import YingYang from './icons/ying-yang.svg'
import { ICardProductIconName } from '@eulogise/core'

const getIcon = (name: ICardProductIconName) => {
  switch (name) {
    case 'Christian':
      return Christian
    case 'ChristianCross':
      return ChristianCross
    case 'Cross':
      return Cross
    case 'Cross2':
      return Cross2
    case 'Cross3':
      return Cross3
    case 'Dove':
      return Dove
    case 'Dove2':
      return Dove2
    case 'Fish':
      return Fish
    case 'Flower':
      return Flower
    case 'GolfFlag':
      return GolfFlag
    case 'Heart':
      return Heart
    case 'Heart2':
      return Heart2
    case 'Ichthus':
      return Ichthus
    case 'Jewish':
      return Jewish
    case 'Jewish2':
      return Jewish2
    case 'Leaf':
      return Leaf
    case 'Leaf2':
      return Leaf2
    case 'Leaf3':
      return Leaf3
    case 'MusicNote':
      return MusicNote
    case 'MusicNote2':
      return MusicNote2
    case 'Muslim':
      return Muslim
    case 'Ribbon':
      return Ribbon
    case 'Ribbon2':
      return Ribbon2
    case 'SailBoat':
      return SailBoat
    case 'Star':
      return Star
    case 'Star2':
      return Star2
    case 'Star3':
      return Star3
    case 'Tree':
      return Tree
    case 'Tree2':
      return Tree2
    case 'YingYang':
      return YingYang
    default:
      throw new Error(`Invalid icon name: ${name}`)
  }
}

export const IconAsset = ({
  name,
  ...props
}: {
  name: ICardProductIconName
  [key: string]: any
}) => {
  const Icon = getIcon(name)

  // @ts-ignore
  return <Icon {...props} />
}
