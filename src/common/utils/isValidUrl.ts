export const isValidUrl = (url: string): string | null => {
  const trimmedUrl = url.trim()
  if (trimmedUrl.length < 10) return null

  const urlPattern = /^(https?:\/\/)([a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,})(:[0-9]+)?(\/.*)?$/

  if (urlPattern.test(trimmedUrl)) {
    return trimmedUrl
  } else {
    return null
  }
}
