import { useState } from 'react'
import fileSaver from 'file-saver'

function useDownload() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function downloadFile(url: string, options = {}, fileName = '') {
    setLoading(true)

    fetch(url, options)
      .then((response) => response.blob())
      .then((blob) => {
        // @ts-ignore
        fileSaver(blob, fileName || url.split('/').pop())
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  return [
    loading,
    downloadFile,
    error
  ]
}

export default useDownload