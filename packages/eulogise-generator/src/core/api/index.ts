import { save as resourceSave } from './resource'

export const bookletApi = {
  save: function (env, bookletData) {
    return resourceSave({
      env,
      resource: 'booklet',
      item: bookletData,
    })
  },
}

export const slideshowApi = {
  save: function (env, slideshowData) {
    return resourceSave({
      env,
      resource: 'slideshow',
      item: slideshowData,
    })
  },
}

export const sidedCardApi = {
  save: function (env, sidedCardData) {
    return resourceSave({
      env,
      resource: 'sidedCard',
      item: sidedCardData,
    })
  },
}

export const bookmarkApi = {
  save: function (env, bookmarkData) {
    return resourceSave({
      env,
      resource: 'bookmark',
      item: bookmarkData,
    })
  },
}

export const thankYouCardApi = {
  save: function (env, thankyouCardData) {
    return resourceSave({
      env,
      resource: 'thankyouCard',
      item: thankyouCardData,
    })
  },
}
