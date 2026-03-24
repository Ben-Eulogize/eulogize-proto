import { EulogiseClientConfig } from '@eulogise/client-core'
import {
  FRAME_GRAPHICS,
  GraphicFrameDetailsField,
  GraphicFrameField,
} from '@eulogise/core'

export class GraphicFrameHelper {
  private static getGraphicFrameFolderUrl() {
    return `${EulogiseClientConfig.AWS_S3_URL}/graphicFrames`
  }

  public static getGraphicFrameDetails(): Array<
    Pick<GraphicFrameDetailsField, 'name'>
  > {
    return FRAME_GRAPHICS.map(this.getGraphicFrameDetailsByName)
  }

  public static getGraphicFrameDetailsByName({
    name,
    ...otherProps
  }: GraphicFrameField): GraphicFrameDetailsField {
    const graphicFrameFolderUrl = this.getGraphicFrameFolderUrl()
    return {
      ...otherProps,
      name,
      thumbnailUrl: `${graphicFrameFolderUrl}/${name}.jpg`,
      backgroundUrl: `${graphicFrameFolderUrl}/${name}.png`,
      maskImageUrl: `${graphicFrameFolderUrl}/${name}_Mask.png`,
      maskEditorImageUrl: `${graphicFrameFolderUrl}/${name}_Editor_Mask.png`,
    }
  }
}
