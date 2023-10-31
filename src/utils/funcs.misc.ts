import { Constants } from './constants'

export function getShareUrl(slug: string): string {
  const url = `${Constants.URL.RAW}ads/${slug}`

  return url
}
