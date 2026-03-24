export const EulogiseResourceHelper = {
  getLatestItem: (items?: Array<any>): any => {
    if (!items) {
      return
    }
    if (!(items instanceof Array)) {
      throw new Error('Parameter must be an Array')
    }
    return items.reduce((latestItem, currentItem) => {
      return new Date(latestItem.updatedAt) > new Date(currentItem.updatedAt)
        ? latestItem
        : currentItem
    }, items[0])
  },
}
