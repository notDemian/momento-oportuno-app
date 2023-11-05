import type { AddonsRecord } from '../Orders'

import type { Addons } from './Addons.type'

export function getAddonRecord(addons: Addons[]) {
  return addons.reduce((acc, addon, index) => {
    acc[`addons[${index}]`] = 1
    return acc
  }, {} as AddonsRecord)
}
