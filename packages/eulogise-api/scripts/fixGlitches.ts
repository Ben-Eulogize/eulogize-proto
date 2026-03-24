import { slideshowModel } from '../src/ts/database'
import { ImageHelper } from '@eulogise/helpers'

const start = async () => {
  // const caseId = '9c922bbe-0fd2-47a3-9c22-55b2ae9b1acf'
  // const caseId = '781e15c0-625d-478c-a1f4-94cdce103996'
  const caseId = '4d898036-c431-466a-b799-568f479820de'
  console.log(`Fixing glitches for case ${caseId}`)

  // get slideshow for the case
  const slideshow = await slideshowModel.findByCaseId(caseId)

  if (!slideshow) {
    console.log(`No slideshow found for case ${caseId}`)
    return
  }
  console.log('Found slideshow:', slideshow)

  // get all asset for the case
  /*
  const assets = await assetModel.findByCaseId(caseId)
  if (!assets) {
    console.log(`No assets found for case ${caseId}`)
    return
  }
*/

  // loop through slideshow assets
  for (const slide of slideshow.content.slides) {
    const slideType = slide.slideType
    if (slideType === 'Image Slide' && slide.image) {
      console.log(`Processing slide:`, slide)
      const slideFilestackHandle = slide.image.filestackHandle

      const { handle: storedFilestackHandle } =
        await ImageHelper.storeFilestackImage(slideFilestackHandle)
      // update filestack handle in the slideshow slide
      slide.image.filestackHandle = storedFilestackHandle
    } else {
      console.log(`Skipping slide of type ${slideType}`)
    }
  }
  // save updated slideshow
  await slideshow.save()
  console.log(`Slideshow updated successfully for case ${caseId}`)
}

start()
