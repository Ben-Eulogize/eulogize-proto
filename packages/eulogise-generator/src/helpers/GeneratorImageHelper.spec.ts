import { GeneratorImageHelper } from './GeneratorImageHelper'
import expect from 'expect'

describe('GeneratorImageHelper', () => {
  describe('downloadImage', () => {
    beforeEach(async () => {
      await GeneratorImageHelper.downloadImage(
        'https://cdn.filestackcontent.com/auto_image/resize=width:580,height:328/output=format:png/anTy8Dq2RA6ujaygTl0j',
        `${__dirname}/image.png`,
      )
    })

    it('should be true', () => {})
  })

  describe('prepareImages', () => {
    it('should return correct HTML string', async () => {
      const htmlString = `
        <style>
  .a {background-image:url(https://staging.media.eulogisememorials.com/graphicFrames/Gold_Roses_Hexagon_Frame_v3.png);
  .b { mask-image:url(https://staging.media.eulogisememorials.com/graphicFrames/Gold_Roses_Hexagon_Frame_v3_Mask.png);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;}</style>
  <div>
    <a href="https://example.com">Example Link</a>
    <img src="https://example.com/image1.jpg" alt="Image 1">
    <img src="https://cdn.filestackcontent.com/resize=width:1200,height:675/rotate=deg:exif/sN7SvJLgSsCaxUAsRbjQ" alt="Image 2">
    <img src="https://example.com/image3.gif" alt="Image 3">
  </div>
`
      const newHtmlString = await GeneratorImageHelper.prepareImages(htmlString)
      console.log('newHtmlString', newHtmlString)
      expect(newHtmlString.length).toBeGreaterThan(htmlString.length)
    })
  })

  describe('extractImageUrlsFromHtml', () => {
    it('should return correct image URLs', () => {
      const htmlString = `
  <style>
  .a {position:absolute;pointer-events:none;background-image:url(https://staging.media.eulogisememorials.com/graphicFrames/Gold_Roses_Hexagon_Frame_v3.png);
  .b { mask-image:url(https://staging.media.eulogisememorials.com/graphicFrames/Gold_Roses_Hexagon_Frame_v3_Mask.png);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;}</style>
  <div>
    <a href="https://example.com">Example Link</a>
    <img src="https://example.com/image1.jpg" alt="Image 1">
    <img src="https://example.com/image2.png" alt="Image 2">
    <img src="https://cdn.filestackcontent.com/resize=width:1200,height:675/rotate=deg:exif/sN7SvJLgSsCaxUAsRbjQ" alt="Image 3">
  </div>
`
      expect(GeneratorImageHelper.extractImageUrlsFromHtml(htmlString)).toEqual(
        [
          `https://example.com/image1.jpg`,
          `https://example.com/image2.png`,
          `https://cdn.filestackcontent.com/resize=width:1200,height:675/rotate=deg:exif/sN7SvJLgSsCaxUAsRbjQ`,
          'https://staging.media.eulogisememorials.com/graphicFrames/Gold_Roses_Hexagon_Frame_v3.png',
          'https://staging.media.eulogisememorials.com/graphicFrames/Gold_Roses_Hexagon_Frame_v3_Mask.png',
        ],
      )
    })
  })

  describe('getImageDimensions', () => {
    it('should return correct width and height', async () => {
      const { width, height } = await GeneratorImageHelper.getImageDimensions({
        url: 'https://us.media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_THUMBNAIL.jpg',
      })
      expect(width).toEqual(781)
      expect(height).toEqual(517)
    })
  })
})
