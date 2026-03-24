import { MOCK_CASE_1 } from '../cases'
import {
  AssetType,
  IAudioAsset,
  IAudioAssetCategory,
  IImageAsset,
  EulogiseResource,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2 } from '../users'

// Mock Asset data
export const MOCK_IMAGE_ASSET_1: IImageAsset = {
  content: {
    filename: 'rF5O0AW7Tn6i51jFLA9K_good.png',
    filepath:
      'cases/75c93d2d-f7bf-46e7-9226-c74bfc28d531/gallery/rF5O0AW7Tn6i51jFLA9K_good.png',
    filestackHandle: 'ltd73rwLQ5a1XRxC7waW',
    selected: false,
  },
  updatedAt: '2021-06-10T07:34:54.383Z',
  createdAt: '2021-04-28T12:37:23.010Z',
  owner: '78522eca-5a18-41b4-b61e-e087fe20da3f',
  id: '140d87c0-b58f-4323-9af2-b8abbb5bfe30',
  case: MOCK_CASE_1.id,
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_2: IImageAsset = {
  content: {
    filename: '4hXo2xgYSIujZOnZaIkB_IMG_5290(1).jpeg',
    filepath:
      'cases/75c93d2d-f7bf-46e7-9226-c74bfc28d531/gallery/4hXo2xgYSIujZOnZaIkB_IMG_5290(1).jpeg',
    filestackHandle: 'h5ipvC4HQbC0d2JmWnA8',
    selected: false,
  },
  updatedAt: '2021-06-10T07:43:58.966Z',
  createdAt: '2021-05-03T04:41:12.568Z',
  owner: '78522eca-5a18-41b4-b61e-e087fe20da3f',
  id: '733ad1d5-d0fb-4205-a096-442b1c90a895',
  case: MOCK_CASE_1.id,
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_3: IImageAsset = {
  content: {
    filename: 'aohQYyWCQZbunNPmGe6r_Screen Shot 2021-04-20 at 11.49.39 am.png',
    filepath:
      'cases/75c93d2d-f7bf-46e7-9226-c74bfc28d531/gallery/aohQYyWCQZbunNPmGe6r_Screen Shot 2021-04-20 at 11.49.39 am.png',
    filestackHandle: 'dZWLaauNTR267v3F2XzY',
    selected: true,
  },
  updatedAt: '2021-06-10T07:44:02.685Z',
  createdAt: '2021-05-12T07:30:22.809Z',
  owner: '78522eca-5a18-41b4-b61e-e087fe20da3f',
  id: 'f5e8528c-ac97-416e-8296-22abf61ba510',
  case: MOCK_CASE_1.id,
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_4: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/oUntUB9BSUWYe0hZIwf1_tuxdeo.overcoat-1.jpeg',
    filestackHandle: 'kgVAkwrxSGSnaK41n1QQ',
    filename: 'oUntUB9BSUWYe0hZIwf1_tuxdeo.overcoat-1.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.498Z',
  createdAt: '2021-10-21T23:37:30.498Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '452531ce-2894-48b0-acff-1acc60e305de',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_5: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/zoI2X9wTK2x6CFYXXR5A_casual-1.jpeg',
    filestackHandle: 'OIMBMzNpTKCGeyRs9uWl',
    filename: 'zoI2X9wTK2x6CFYXXR5A_casual-1.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.440Z',
  createdAt: '2021-10-21T23:37:30.440Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '58c3fe4a-1cde-4778-a517-c23894fdc971',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_6: IImageAsset = {
  content: {
    filename: 'vmArworzSi25DgDGWVW3_Vital Barberis Canonico.png',
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/vmArworzSi25DgDGWVW3_Vital Barberis Canonico.png',
    filestackHandle: 'F9JO2PCUTQS8kcaSzWC3',
    selected: true,
  },
  updatedAt: '2021-10-17T22:47:34.381Z',
  createdAt: '2021-10-17T22:47:26.265Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'f2a79d4c-486b-481e-a7dc-37e24f81baf7',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_7: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/2cgFUwzySqKIvmOwQhWa_business-3.jpeg',
    filestackHandle: 'A1Moryc9Sv2AzmPMHLNP',
    filename: '2cgFUwzySqKIvmOwQhWa_business-3.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.467Z',
  createdAt: '2021-10-21T23:37:30.467Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'f63ffc1a-cbb3-406d-8c02-f03722e12a1f',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_8: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/D9hnHlqpR2WEAmjYy2y7_casual-2.jpeg',
    filestackHandle: 'ThsrrP8SJVfFhDwMFuew',
    filename: 'D9hnHlqpR2WEAmjYy2y7_casual-2.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.526Z',
  createdAt: '2021-10-21T23:37:30.526Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '27c725a8-940a-4ede-ae9c-8c7dd729ed84',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_9: IImageAsset = {
  content: {
    filename: 'sclEvuD3SXGmZm3wqulC_Loro Piana.png',
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/sclEvuD3SXGmZm3wqulC_Loro Piana.png',
    filestackHandle: 'GQ4XKfs3TU2xdHO82vuE',
    selected: true,
  },
  updatedAt: '2021-10-17T22:47:34.414Z',
  createdAt: '2021-10-17T22:47:27.782Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '81aa63e7-0c76-44c7-a89b-ad0c0340f8c7',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_10: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/dR8hxSmXTUSuzCYD1L3q_Dino Filarte.jpeg',
    filestackHandle: '05dTNl6kS3ma8CCcTrWL',
    filename: 'dR8hxSmXTUSuzCYD1L3q_Dino Filarte.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.468Z',
  createdAt: '2021-10-21T23:37:30.468Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'afeff755-00cc-443b-9833-31c7eb5d7127',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_11: IImageAsset = {
  content: {
    filename: 'K9TAbtKBQJWrvMcxRnmg_Reda.png',
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/K9TAbtKBQJWrvMcxRnmg_Reda.png',
    filestackHandle: 'CRuVdcT5KgYJLhZe5tqA',
    selected: true,
  },
  updatedAt: '2021-10-17T22:47:34.409Z',
  createdAt: '2021-10-17T22:47:27.800Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'a00667a3-fc6e-4f97-b480-9fc21b8e073c',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_12: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/Lge3bnY4Sxa7VvFoBZq9_Scabal.jpeg',
    filestackHandle: 'Ak2slcwTc65ILZ0EBtkS',
    filename: 'Lge3bnY4Sxa7VvFoBZq9_Scabal.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.387Z',
  createdAt: '2021-10-21T23:37:30.387Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '774779a0-cea3-4a14-a021-1df5ae83c2da',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_13: IImageAsset = {
  content: {
    filename: 'T2QqbrF5Q0SCKdXPjJxp_Colombo.png',
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/T2QqbrF5Q0SCKdXPjJxp_Colombo.png',
    filestackHandle: 'llBZogrwRtKcpjGYw5pX',
    selected: true,
  },
  updatedAt: '2021-10-17T22:47:34.391Z',
  createdAt: '2021-10-17T22:47:27.863Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '85607a88-3754-43b8-8f7b-d864c611695e',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_14: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/EQFNFxRCRNeppIHOqKp0_tuxdeo.overcoat-2.jpeg',
    filestackHandle: 'xAUsEZqWTlamduAY072q',
    filename: 'EQFNFxRCRNeppIHOqKp0_tuxdeo.overcoat-2.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.501Z',
  createdAt: '2021-10-21T23:37:30.501Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'f1069dbb-1cc2-4913-b385-08075c632b4c',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_15: IImageAsset = {
  content: {
    filename: 'XVZuXXbdRt6TkES9aqxY_Lanificio Cerruti.png',
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/XVZuXXbdRt6TkES9aqxY_Lanificio Cerruti.png',
    filestackHandle: 'cbt7XaNQTXK9wdoz8Ue6',
    selected: true,
  },
  updatedAt: '2021-10-17T22:47:34.345Z',
  createdAt: '2021-10-17T22:47:27.999Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: '97a86208-0c8b-44c7-b0a1-9a1571351175',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.AUDIO,
}

export const MOCK_IMAGE_ASSET_16: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/Y7PG2250TpGovtNSPmD0_Ermenegildo Zegna.jpeg',
    filestackHandle: 'acFL1fgzRD6sBeuloWfp',
    filename: 'Y7PG2250TpGovtNSPmD0_Ermenegildo Zegna.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.466Z',
  createdAt: '2021-10-21T23:37:30.466Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'c5958e0e-f6f9-4857-9e18-eeda48adaed5',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_IMAGE_ASSET_17: IImageAsset = {
  content: {
    filepath:
      'cases/8ae0d367-101a-40df-964d-b1d7fc521d54/gallery/vorWZFlRL6Y3lVnbrAGw_Loro Piana.jpeg',
    filestackHandle: 'p1OGpWVrSsy1ht1y0UyO',
    filename: 'vorWZFlRL6Y3lVnbrAGw_Loro Piana.jpeg',
  },
  updatedAt: '2021-10-21T23:37:30.443Z',
  createdAt: '2021-10-21T23:37:30.443Z',
  owner: '5d16002c-27ed-44c5-a80e-cb0c6f8b4b3e',
  id: 'bc7d920d-dc51-485c-a68f-332c38b871bb',
  case: '8ae0d367-101a-40df-964d-b1d7fc521d54',
  type: AssetType.IMAGE,
}

export const MOCK_AUDIO_ASSET_1: IAudioAsset = {
  content: {
    duration: 67179,
    filename: 'embers_at_sunrise.mp3',
    title: 'Embers At Sunrise',
    category: IAudioAssetCategory.STRINGS,
    filepath: 'slideshow/audio/embers_at_sunrise.mp3',
    artist: 'Egg Music',
  },
  updatedAt: '2019-01-21T00:37:56.268Z',
  createdAt: '2018-12-06T01:49:29.711Z',
  owner: '*',
  id: '70eb67cc-7398-41e7-bba0-3f7c3bafba33',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_2: IAudioAsset = {
  content: {
    duration: 122979,
    filename: 'tomorrow.mp3',
    title: 'Tomorrow Looks Great',
    category: IAudioAssetCategory.BRIGHT,
    filepath: 'slideshow/audio/tomorrow.mp3',
    artist: 'Intervox',
  },
  updatedAt: '2019-01-21T00:37:56.765Z',
  createdAt: '2018-12-06T01:49:29.708Z',
  owner: '*',
  id: 'e738518c-f532-4004-97a0-e0be61a1bccd',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_3: IAudioAsset = {
  content: {
    duration: 143067,
    filename: 'by_the_river.mp3',
    title: 'Down At The Creek',
    category: IAudioAssetCategory.BRIGHT,
    filepath: 'slideshow/audio/by_the_river.mp3',
    artist: 'Lift',
  },
  updatedAt: '2019-01-21T00:37:57.294Z',
  createdAt: '2018-12-06T01:49:29.708Z',
  owner: '*',
  id: '977fe0af-5bc4-4969-ad2c-c8cb408ef033',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_4: IAudioAsset = {
  content: {
    duration: 61000,
    filename: 'happy_forrest_family.mp3',
    title: 'Happy Forrest Family',
    category: IAudioAssetCategory.ORCHESTRAL,
    filepath: 'slideshow/audio/happy_forrest_family.mp3',
    artist: 'Color TV',
  },
  updatedAt: '2019-01-21T00:37:57.823Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: '8956c835-58cb-418b-9e4c-7cd4c12e5295',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_5: IAudioAsset = {
  content: {
    duration: 214899,
    filename: 'nearer_my_god_to_thee.mp3',
    title: 'Nearer My God To Thee',
    category: IAudioAssetCategory.HYMNS,
    filepath: 'slideshow/audio/nearer_my_god_to_thee.mp3',
    artist: 'Bibliotheque Music',
  },
  updatedAt: '2019-01-21T00:38:57.129Z',
  createdAt: '2018-12-06T01:56:25.402Z',
  owner: '*',
  id: '2a5686f5-1c50-4000-92ec-b18bbba02704',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_6: IAudioAsset = {
  content: {
    duration: 102507,
    filename: 'journey_home.mp3',
    title: 'Journey home',
    category: IAudioAssetCategory.STRINGS,
    filepath: 'slideshow/audio/journey_home.mp3',
    artist: 'Altitude Underscore',
  },
  updatedAt: '2019-01-21T00:37:58.275Z',
  createdAt: '2018-12-06T01:49:29.711Z',
  owner: '*',
  id: '8b8002de-8a85-4210-b0be-57d1a3774ee2',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_7: IAudioAsset = {
  content: {
    duration: 75000,
    filename: 'a_prayer.mp3',
    title: 'A Prayer',
    category: IAudioAssetCategory.REFLECTION,
    filepath: 'slideshow/audio/a_prayer.mp3',
    artist: 'Color TV',
  },
  updatedAt: '2019-01-21T00:37:58.671Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: 'd22860cd-2670-4479-ab15-056e514ba6a6',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_8: IAudioAsset = {
  content: {
    duration: 75000,
    filename: 'a_prayer.mp3',
    title: 'A Prayer',
    category: IAudioAssetCategory.UPLOADED,
    filepath: 'slideshow/audio/a_prayer.mp3',
    artist: 'Color TV',
  },
  updatedAt: '2019-01-21T00:37:58.671Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: 'd22860cd-2670-4479-ab15-056e514ba6a6',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_9: IAudioAsset = {
  content: {
    duration: 168579,
    filename: 'another_day_woodwinds.mp3',
    title: 'Another Day Woodwinds',
    category: IAudioAssetCategory.BRIGHT,
    filepath: 'slideshow/audio/another_day_woodwinds.mp3',
    artist: 'AXS Documentary',
  },
  updatedAt: '2019-01-21T00:37:59.041Z',
  createdAt: '2018-12-06T01:49:29.707Z',
  owner: '*',
  id: '97e19f2d-362f-4851-b3e0-7be4ae0ad901',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_10: IAudioAsset = {
  content: {
    duration: 110475,
    filename: 'little_apples.mp3',
    title: 'Little Apples',
    category: IAudioAssetCategory.BRIGHT,
    filepath: 'slideshow/audio/little_apples.mp3',
    artist: 'Sonic Quiver',
  },
  updatedAt: '2019-01-21T00:37:59.408Z',
  createdAt: '2018-12-06T01:49:29.708Z',
  owner: '*',
  id: 'd062bc6a-4bf4-4f9e-9db1-3d445e692175',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_11: IAudioAsset = {
  content: {
    duration: 124971,
    filename: 'by_night.mp3',
    title: 'BY NIGHT',
    category: IAudioAssetCategory.ORCHESTRAL,
    filepath: 'slideshow/audio/by_night.mp3',
    artist: 'Cavendish',
  },
  updatedAt: '2019-01-21T00:37:59.801Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: 'be57696e-4bd1-41ba-be1d-d1e370d149ee',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_12: IAudioAsset = {
  content: {
    duration: 164115,
    filename: 'reverie.mp3',
    title: 'Reverie',
    category: IAudioAssetCategory.CHOIR,
    filepath: 'slideshow/audio/reverie.mp3',
    artist: 'Dynamic Music',
  },
  updatedAt: '2019-01-21T00:38:00.250Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: '1b549c9e-d9d0-4932-a6e4-bd7852b79c7b',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_13: IAudioAsset = {
  content: {
    duration: 115635,
    filename: 'fruit_of_the_river.mp3',
    title: 'FRUIT OF THE RIVER',
    category: IAudioAssetCategory.ORCHESTRAL,
    filepath: 'slideshow/audio/fruit_of_the_river.mp3',
    artist: 'Cavendish',
  },
  updatedAt: '2019-01-21T00:38:00.661Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: 'c919166f-16c7-4c0c-83f8-2140c6f97565',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_14: IAudioAsset = {
  content: {
    duration: 187227,
    filename: 'inner_peace.mp3',
    title: 'Inner Peace',
    category: IAudioAssetCategory.STRINGS,
    filepath: 'slideshow/audio/inner_peace.mp3',
    artist: 'Altitude Underscore',
  },
  updatedAt: '2019-01-21T00:38:01.084Z',
  createdAt: '2018-12-06T01:49:29.711Z',
  owner: '*',
  id: 'cd745cbd-ab62-4b45-8276-7931fdee3aa6',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_15: IAudioAsset = {
  content: {
    duration: 123267,
    filename: 'sunlit_wander.mp3',
    title: 'Sunlit Wander',
    category: IAudioAssetCategory.CHOIR,
    filepath: 'slideshow/audio/sunlit_wander.mp3',
    artist: 'Dynamic Music',
  },
  updatedAt: '2019-01-21T00:38:01.516Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: '7a1782f8-bf9b-4b79-adb1-5b8aa557ad9f',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_16: IAudioAsset = {
  content: {
    duration: 102120,
    filename: 'coming_home.mp3',
    title: 'Coming home',
    category: IAudioAssetCategory.PIANO,
    filepath: 'slideshow/audio/coming_home.mp3',
    artist: 'Unknown',
  },
  updatedAt: '2019-01-21T00:38:01.936Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: '22393fe0-cd61-4768-90e1-d06e2a3f3279',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_17: IAudioAsset = {
  content: {
    duration: 150648,
    filename: 'love_ritournelle.mp3',
    title: 'Love Ritournelle',
    category: IAudioAssetCategory.PIANO,
    filepath: 'slideshow/audio/love_ritournelle.mp3',
    artist: 'Uknown',
  },
  updatedAt: '2019-01-21T00:38:02.359Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: 'f58ab202-7478-4ecf-bb50-68569d44c1d3',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_18: IAudioAsset = {
  content: {
    duration: 202515,
    filename: 'desert_drift.mp3',
    title: 'Desert Drift',
    category: IAudioAssetCategory.REFLECTION,
    filepath: 'slideshow/audio/desert_drift.mp3',
    artist: 'Lift',
  },
  updatedAt: '2019-01-21T00:38:02.785Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: '914c4562-91d6-47e6-a4ce-e7d9380c6d72',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_19: IAudioAsset = {
  content: {
    duration: 143259,
    filename: 'pastoral_glades.mp3',
    title: 'Pastoral Glades',
    category: IAudioAssetCategory.CHOIR,
    filepath: 'slideshow/audio/pastoral_glades.mp3',
    artist: 'Dynamic Music',
  },
  updatedAt: '2019-01-21T00:38:03.231Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: 'ae7abb33-752d-4082-99f6-9274b055d005',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_20: IAudioAsset = {
  content: {
    duration: 91851,
    filename: 'early_birds.mp3',
    title: 'Early Birds',
    category: IAudioAssetCategory.BRIGHT,
    filepath: 'slideshow/audio/early_birds.mp3',
    artist: 'Altitude Underscore',
  },
  updatedAt: '2019-01-21T00:38:03.575Z',
  createdAt: '2018-12-06T01:49:29.708Z',
  owner: '*',
  id: '898337eb-3ec4-4ad2-934c-6b73a61629e6',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_21: IAudioAsset = {
  content: {
    duration: 144891,
    filename: 'divine_spirit.mp3',
    title: 'Divine Spirit',
    category: IAudioAssetCategory.CHOIR,
    filepath: 'slideshow/audio/divine_spirit.mp3',
    artist: 'Dynamic Music',
  },
  updatedAt: '2019-01-21T00:38:04.035Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: 'a8c5ef97-880d-4a5d-86b5-23e63ac517bb',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_22: IAudioAsset = {
  content: {
    duration: 176043,
    filename: 'folksy_dream.mp3',
    title: 'Folksy Dream',
    category: IAudioAssetCategory.REFLECTION,
    filepath: 'slideshow/audio/folksy_dream.mp3',
    artist: 'AXS Music',
  },
  updatedAt: '2019-01-21T00:38:04.531Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: 'd585482e-98fa-4187-a305-1746a76be2a6',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_23: IAudioAsset = {
  content: {
    duration: 144891,
    filename: 'divine_spirit.mp3',
    title: 'Divine Spirit',
    category: IAudioAssetCategory.ORCHESTRAL,
    filepath: 'slideshow/audio/divine_spirit.mp3',
    artist: 'Dynamic Music',
  },
  updatedAt: '2019-01-21T00:38:05.010Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: 'f7bdd3be-6b96-40e6-ac7b-18213819d36c',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_24: IAudioAsset = {
  content: {
    duration: 149000,
    filename: 'love_bed.mp3',
    title: 'Love Bed',
    category: IAudioAssetCategory.PIANO,
    filepath: 'slideshow/audio/love_bed.mp3',
    artist: 'Benedikt Dorn, Ernest Ribka',
  },
  updatedAt: '2019-01-21T00:38:05.505Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: '02ce5ce3-9ad7-41ed-b358-7d444936d48f',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_25: IAudioAsset = {
  content: {
    duration: 186147,
    filename: 'peace_be_with_you.mp3',
    title: 'Peace Be With You',
    category: IAudioAssetCategory.CHOIR,
    filepath: 'slideshow/audio/peace_be_with_you.mp3',
    artist: 'Dynamic Music',
  },
  updatedAt: '2019-01-21T00:38:05.976Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: '977ce03b-cbcf-4daa-8b95-e1ddc64ffb95',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_26: IAudioAsset = {
  content: {
    duration: 140043,
    filename: 'awakening.mp3',
    title: 'Awakening',
    category: IAudioAssetCategory.ORCHESTRAL,
    filepath: 'slideshow/audio/awakening.mp3',
    artist: 'Altitude x Faber',
  },
  updatedAt: '2019-01-21T00:38:06.539Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: '77f5990c-a535-42ae-b32d-145ccbb5fa3f',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_27: IAudioAsset = {
  content: {
    duration: 122256,
    filename: 'in_solitude.mp3',
    title: 'In Solitude',
    category: IAudioAssetCategory.PIANO,
    filepath: 'slideshow/audio/in_solitude.mp3',
    artist: 'Unknown',
  },
  updatedAt: '2019-01-21T00:38:06.773Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: 'd4b395cd-ab36-4b5c-b2d1-4ce8d0c290b2',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_28: IAudioAsset = {
  content: {
    duration: 117504,
    filename: 'haven.mp3',
    title: 'Haven',
    category: IAudioAssetCategory.PIANO,
    filepath: 'slideshow/audio/haven.mp3',
    artist: 'Uknown',
  },
  updatedAt: '2019-01-21T00:38:06.921Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: '4894d8e0-5a7e-49c4-b480-455fe3e99f24',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_29: IAudioAsset = {
  content: {
    duration: 79000,
    filename: 'coming_alright.mp3',
    title: 'Coming Alright',
    category: IAudioAssetCategory.ORCHESTRAL,
    filepath: 'slideshow/audio/coming_alright.mp3',
    artist: 'Color TV',
  },
  updatedAt: '2019-01-21T00:38:07.046Z',
  createdAt: '2018-12-06T01:49:29.709Z',
  owner: '*',
  id: '8e3262f0-aa0f-4f0c-9d90-c035dede15c5',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_30: IAudioAsset = {
  content: {
    duration: 143664,
    filename: 'morning_ritournelle.mp3',
    title: 'Morning Ritournelle',
    category: IAudioAssetCategory.PIANO,
    filepath: 'slideshow/audio/morning_ritournelle.mp3',
    artist: 'Unknown',
  },
  updatedAt: '2019-01-21T00:38:07.276Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: '15e9398d-7f8d-43cd-8e7c-8dba208f039d',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_31: IAudioAsset = {
  content: {
    duration: 165579,
    filename: 'infinity_squared.mp3',
    title: 'Infinity Squared',
    category: IAudioAssetCategory.REFLECTION,
    filepath: 'slideshow/audio/infinity_squared.mp3',
    artist: 'Lift',
  },
  updatedAt: '2019-01-21T00:38:07.743Z',
  createdAt: '2018-12-06T01:49:29.710Z',
  owner: '*',
  id: 'd68a9ab1-e766-4a61-b2c1-b3b6867f18ae',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_32: IAudioAsset = {
  content: {
    duration: 140667,
    filename: 'memories_of_seville.mp3',
    title: 'Memories Of Seville',
    category: IAudioAssetCategory.STRINGS,
    filepath: 'slideshow/audio/memories_of_seville.mp3',
    artist: 'Altitude x Faber',
  },
  updatedAt: '2019-01-21T00:38:07.872Z',
  createdAt: '2018-12-06T01:49:29.711Z',
  owner: '*',
  id: '5edc5b00-bbf0-41fd-b692-81ad9bf23631',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_AUDIO_ASSET_33: IAudioAsset = {
  content: {
    duration: 94971,
    filename: 'bright_new_day.mp3',
    title: 'Bright New Day',
    category: IAudioAssetCategory.BRIGHT,
    filepath: 'slideshow/audio/bright_new_day.mp3',
    artist: '4 Elements Music',
  },
  updatedAt: '2019-01-21T00:38:07.998Z',
  createdAt: '2018-12-06T01:49:29.708Z',
  owner: '*',
  id: 'c6c0704a-05a6-4f10-a6db-906c30e636f2',
  case: '*',
  type: AssetType.AUDIO,
}

export const MOCK_IMAGE_ASSETS: Array<IImageAsset> = [
  MOCK_IMAGE_ASSET_1,
  MOCK_IMAGE_ASSET_2,
  MOCK_IMAGE_ASSET_3,
  MOCK_IMAGE_ASSET_4,
  MOCK_IMAGE_ASSET_5,
  MOCK_IMAGE_ASSET_6,
  MOCK_IMAGE_ASSET_7,
  MOCK_IMAGE_ASSET_8,
  MOCK_IMAGE_ASSET_9,
  MOCK_IMAGE_ASSET_10,
  MOCK_IMAGE_ASSET_11,
  MOCK_IMAGE_ASSET_12,
  MOCK_IMAGE_ASSET_13,
  MOCK_IMAGE_ASSET_14,
  MOCK_IMAGE_ASSET_15,
  MOCK_IMAGE_ASSET_16,
  MOCK_IMAGE_ASSET_17,
]

export const MOCK_AUDIO_ASSETS: Array<IAudioAsset> = [
  MOCK_AUDIO_ASSET_1,
  MOCK_AUDIO_ASSET_2,
  MOCK_AUDIO_ASSET_3,
  MOCK_AUDIO_ASSET_4,
  MOCK_AUDIO_ASSET_5,
  MOCK_AUDIO_ASSET_6,
  MOCK_AUDIO_ASSET_7,
  MOCK_AUDIO_ASSET_8,
  MOCK_AUDIO_ASSET_9,
  MOCK_AUDIO_ASSET_10,
  MOCK_AUDIO_ASSET_11,
  MOCK_AUDIO_ASSET_12,
  MOCK_AUDIO_ASSET_13,
  MOCK_AUDIO_ASSET_14,
  MOCK_AUDIO_ASSET_15,
  MOCK_AUDIO_ASSET_16,
  MOCK_AUDIO_ASSET_17,
  MOCK_AUDIO_ASSET_18,
  MOCK_AUDIO_ASSET_19,
  MOCK_AUDIO_ASSET_20,
  MOCK_AUDIO_ASSET_21,
  MOCK_AUDIO_ASSET_22,
  MOCK_AUDIO_ASSET_23,
  MOCK_AUDIO_ASSET_24,
  MOCK_AUDIO_ASSET_25,
  MOCK_AUDIO_ASSET_26,
  MOCK_AUDIO_ASSET_27,
  MOCK_AUDIO_ASSET_28,
  MOCK_AUDIO_ASSET_29,
  MOCK_AUDIO_ASSET_30,
  MOCK_AUDIO_ASSET_31,
  MOCK_AUDIO_ASSET_32,
  MOCK_AUDIO_ASSET_33,
]

// Mock Asset Find response
export const MOCK_IMAGE_ASSET_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_IMAGE_ASSETS,
  count: MOCK_IMAGE_ASSETS.length,
  ref: '5e61d4a090a5d',
}

export const MOCK_AUDIO_ASSET_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_AUDIO_ASSETS,
  count: MOCK_AUDIO_ASSETS.length,
  ref: '50c93bd26337',
}

export const MOCK_ASSET_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.ASSET,
  search: {
    case: MOCK_CASE_1.id,
    type: AssetType.IMAGE,
  },
}

export const MOCK_ASSET_FIND_REQUEST_BODY_2: IFindRequestBody = {
  resource: EulogiseResource.ASSET,
  search: {
    case: MOCK_CASE_1.id,
    type: AssetType.AUDIO,
  },
}

export const MOCK_ASSET_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_ASSET_FIND_REQUEST_BODY_1 },
  response: MOCK_IMAGE_ASSET_FIND_RESPONSE_1,
}

export const MOCK_ASSET_FIND_REQUEST_RESPONSE_2: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_ASSET_FIND_REQUEST_BODY_2 },
  response: MOCK_AUDIO_ASSET_FIND_RESPONSE_1,
}

export const MOCK_ASSET_FIND_REQUEST_RESPONSE_3: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: { body: MOCK_ASSET_FIND_REQUEST_BODY_1 },
  response: MOCK_IMAGE_ASSET_FIND_RESPONSE_1,
}

export const MOCK_ASSET_FIND_REQUEST_RESPONSE_4: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: { body: MOCK_ASSET_FIND_REQUEST_BODY_2 },
  response: MOCK_AUDIO_ASSET_FIND_RESPONSE_1,
}

export const MOCK_ASSET_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> = [
  MOCK_ASSET_FIND_REQUEST_RESPONSE_1,
  MOCK_ASSET_FIND_REQUEST_RESPONSE_2,
  MOCK_ASSET_FIND_REQUEST_RESPONSE_3,
  MOCK_ASSET_FIND_REQUEST_RESPONSE_4,
]
