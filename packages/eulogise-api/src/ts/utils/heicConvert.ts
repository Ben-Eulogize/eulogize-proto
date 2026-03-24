import jpegJs from 'jpeg-js'
// @ts-ignore
import { PNG } from 'pngjs'
import { scale } from 'proportional-scale'

const to: any = {
  JPEG: ({ data, width, height }: any) => {
    const { scale: newScale } = scale({
      width,
      height,
      maxHeight: 1000,
    })
    return jpegJs.encode({ data, width, height }, newScale * 100).data
  },
  PNG: ({ data, width, height }: any) => {
    const png = new PNG({ width, height })
    png.data = data

    return PNG.sync.write(png, {
      width,
      height,
      deflateLevel: 9,
      deflateStrategy: 3,
      filterType: -1,
      colorType: 6,
      inputHasAlpha: true,
    })
  },
}

const convertImage = async ({ image, format }: any) => {
  return await to[format]({
    width: image.width,
    height: image.height,
    data: Buffer.from(image.data),
  })
}

export const heicConvert = async ({
  buffer,
  format,
  all,
}: any): Promise<Buffer | undefined> => {
  // mocha test can't run if we import this at the top
  const decode = require('heic-decode')
  console.log('heicConvert start:', buffer, format, all)
  if (!to[format]) {
    throw new Error(`output format needs to be one of [${Object.keys(to)}]`)
  }

  if (!all) {
    try {
      const image = await decode({ buffer })
      return await convertImage({ image, format })
    } catch (ex) {
      console.log('heic decode failed ex', ex)
      return
    }
  }
  console.log('heicConvert: decode all', buffer)
  const images = await decode.all({ buffer })

  return images.map((image: any) => {
    return {
      convert: async () =>
        await convertImage({
          image: await image.decode(),
          format,
        }),
    }
  })
}
