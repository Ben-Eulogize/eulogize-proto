interface Audio {
  url: string
  filetype: string
}
interface Image {
  filepath: string
  filestackHandle: string
  filename: string
}

export interface ScreenCaptureRecordOption {
  output: string
  audio: Array<Audio>
  fps: number
  totalFrames: number
  images: Array<Image>
  slideshowId?: string
  caseId: string
  render: (frame: number) => Promise<string>
}
