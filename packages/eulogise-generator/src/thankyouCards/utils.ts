export const getThankyouCardPageOrder = ({ thankyouCardPages }) => {
  switch (thankyouCardPages.length) {
    case 2:
      return [0, 1]
    case 4:
      return [0, 1, 2, 3]
  }
  return [3, 0, 1, 2]
}
