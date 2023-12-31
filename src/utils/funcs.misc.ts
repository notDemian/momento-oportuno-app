import { Constants } from './constants'
import { formatCurrency } from './formatter'

import type { Ad } from '@src/api'

export function getShareUrl(id: number): string {
  const url = `${Constants.FRONTEND_URL.RAW}ad/${id}`

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
