export function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function sentenceCaseString (string: string) {
  return (
    string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
  ).replaceAll('_', ' ')
}
