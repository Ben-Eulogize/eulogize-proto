import { ICopyLibraryCopy } from '../types'

export const FUNERAL_READINGS_COPIES: Array<ICopyLibraryCopy> = [
  {
    title: 'No matter what',
    copyFrom: 'Debi Gliori',
    text: 'Small said: “But what about when you’re dead and gone? Would you love me then? Does love go on?”\nLarge held Small snug as they looked out at the night, at the moon in the dark and the stars shining bright.\n“Small, look at the stars – how they shine and glow. Yet some of those stars died a long time ago. Still they shine in the evening skies… love, like starlight, never dies”.',
  },
  {
    title: 'Roads go ever on',
    copyFrom: 'J. R. R. Tolkien',
    text: 'Roads go ever ever on,\nOver rock and under tree,\nBy caves where never sun has shone,\nBy streams that never find the sea;\nOver snow by winter sown,\nAnd through the merry flowers of June,\nOver grass and over stone,\nAnd under mountains in the moon.\nRoads go ever ever on\nUnder cloud and under star,\nYet feet that wandering have gone\nTurn at last to home afar.\nEyes that fire and sword have seen\nAnd horror in the halls of stone\nLook at last on meadows green\nAnd trees and hills they long have known.\nRoads go ever on and on\nOut from the door where it began.\nNow far ahead the Road has gone,\nLet others follow it who can!\nLet them a journey new begin,\nBut I at last with weary feet\nWill turn towards the lighted inn,\nMy evening-rest and sleep to meet.',
  },
  {
    title: 'The little prince',
    copyFrom: 'Antoine De Saint-Exupéry',
    text: "If you love a flower that lives on a star, it is sweet to look at the sky at night. All the stars are a-blossom with flowers.\n\nAnd at night you will look up at the stars. Where I live, everything is so small that I cannot show you where my star is to be found. It is better like that. My star will just be one of the stars, for you. And so you will love to watch all of the stars in the heavens. They will be your friends.\n\nAll men have the stars, but they are not the same things for different people. For some, who are travellers, these stars are guides. For others, they are no more than little lights in the sky.\n\nBut all these stars are silent. You – you alone – will have the stars as no one else has them and in one of the stars, I shall be living. In one of them, I shall be laughing when you look at the sky at night.\n\nAnd when your sorrow is comforted, for time soothes all sorrows, you will be content that you have known me. You will always be my friend. You will want to laugh with me. And you will sometimes open your window, just for that pleasure.'",
  },
  {
    title: 'Go they great way!',
    copyFrom: 'Emily Dickinson',
    text: 'Go they great way!\nThe stars thou meetst\nAre even as Thyself—\nFor what are Stars but Asterisks\nTo point a human Life?',
  },
  {
    title: 'High flight',
    copyFrom: 'John Gillespie Magee',
    text: "Oh! I have slipped the surly bonds of earth,\nAnd danced the skies on laughter-silvered wings;\nSunward I've climbed, and joined the tumbling mirth\nOf sun-split clouds, --and done a hundred things\nYou have not dreamed of --Wheeled and soared and swung\nHigh in the sunlit silence. Hov'ring there\nI've chased the shouting wind along, and flung\nMy eager craft through footless halls of air...\nUp, up the long, delirious, burning blue\nI've topped the wind-swept heights with easy grace\nWhere never lark or even eagle flew --\nAnd, while with silent lifting mind I've trod\nThe high untrespassed sanctity of space,\nPut out my hand, and touched the face of God.",
  },
  {
    title: 'The wheel',
    copyFrom: 'Susan Stocker',
    text: 'Time is a wheel: the day that we met\nIs still there: Everything changes but nothing is lost:\nAll that we shared, All that we ever loved, belongs to us still:\nTime is a wheel Whatever has ended is just about to begin\nAll that we feel, All that we ever felt, will come back again\nTime is a wheel The sound of your laughter, the rain in your hair,\nYour hand in mine,Your knock at the door, your step on the stair -\nAll are still there Because time is a wheel and death will come round\nAs birth will come round As love will come round, as peace will come round,\nAs joy will come round, As life will come round, because time is a wheel\nBringing back even yet, All that we ever shared, and the day that we met.',
  },
  {
    title: 'Our lives matter',
    copyFrom: 'M.Maureen Killoran',
    text: 'We come together from the diversity of our grieving,\nto gather in the warmth of this community\ngiving stubborn witness to our belief that\nin times of sadness, there is room for laughter.\nIn times of darkness, there always will be light.\nMay we hold fast to the conviction\nthat what we do with our lives matters\nand that a caring world is possible after all.',
  },
  {
    title: 'Eulogy from a physicist',
    copyFrom: 'Aaron Freeman',
    text: '“You want a physicist to speak at your funeral. You want the physicist to talk to your grieving family about the conservation of energy, so they will understand that your energy has not died. You’ll want the physicist to explain to those who loved you that they need not have faith; indeed, they should not have faith. Let them know that they can measure, that scientists have measured precisely the conservation of energy and found it accurate, verifiable and consistent across space and time. You can hope your family will examine the evidence and satisfy themselves that the science is sound and that they’ll be comforted to know your energy’s still around. According to the law of the conservation of energy, not a bit of you is gone; you’re just less orderly. Amen.”',
  },
].sort((a: ICopyLibraryCopy, b: ICopyLibraryCopy) =>
  a.title > b.title ? 1 : -1,
)
