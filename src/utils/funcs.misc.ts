import { Constants } from './constants'
import { formatCurrency } from './formatter'

import type { Ad } from '@src/api'

export function getShareUrl(slug: string): string {
  const url = `${Constants.URL.RAW}ads/${slug}`

  return url
}

export function getPriceOrSalary({
  attributes,
  formatted = false,
}: {
  attributes: Ad['attributes']
  formatted?: boolean
}): string | null {
  const priceOrSalary =
    attributes.find((a) => a.id === Constants.IDS.price)?.value?.toString() ??
    attributes.find((a) => a.id === Constants.IDS.salary)?.value?.toString()

  let priceDisplay = priceOrSalary ?? null

  if (formatted && priceDisplay) {
    priceDisplay = formatCurrency(priceDisplay)
  }

  return priceDisplay
}
