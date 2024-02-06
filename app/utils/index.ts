export function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function sentenceCaseString (string: string) {
  return (
    string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  ).replaceAll('_', ' ')
}

export function parseFileNameAndExtensionFromUrl (urlString: string) {
  const url = new URL(urlString)
  const file = url.pathname.split('/').pop()
  if (!file) return { fileName: '', extension: '' }

  const [fileName, extension] = file.split('.')

  return { fileName, extension }
}
