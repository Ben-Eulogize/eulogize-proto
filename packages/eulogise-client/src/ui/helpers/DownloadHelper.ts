import axios from 'axios'

export class DownloadHelper {
  public static cacheBuster = (url: string) => `${url}?cb=${Date.now()}`

  public static async downloadFileWithAvailable({
    fileUrl,
    fileName,
    retryInterval = 3000,
  }: {
    fileUrl: string
    fileName: string
    retryInterval?: number
  }) {
    const maxRetries = 300 // 300 retries meant 900 seconds = 15 mins
    let retries = 0

    while (retries < maxRetries) {
      try {
        const response = await axios.head(fileUrl) // Use HEAD to check the file metadata
        if (response.status === 200) {
          console.log('File is available. Proceeding to download...')
          // window.location.href = fileUrl // Trigger file download
          await this.downloadAs(
            `${fileUrl}?time=${new Date().getTime()}`,
            fileName,
          )
          return
        }
      } catch (error) {
        console.log(
          `File not available yet. Retrying in ${
            retryInterval / 1000
          } seconds...`,
        )
      }

      await new Promise((resolve) => setTimeout(resolve, retryInterval))
      retries++
    }

    console.error('File not available after maximum retries.')
  }

  public static downloadAs = async (
    url: string,
    filename: string,
    onDownloadProgress?: Function,
  ) => {
    const response = await axios({
      url: this.cacheBuster(url),
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: function (progressEvent) {
        if (onDownloadProgress) {
          onDownloadProgress(progressEvent)
        }
      },
    })
    const newUrl = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = newUrl
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
