export default function defaultGetHelperDimensions({ node }: any) {
  return {
    height: node.offsetHeight,
    width: node.offsetWidth,
  }
}
