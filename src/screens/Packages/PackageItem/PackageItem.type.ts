import type { PackageFakeData } from '../mocks/package.type'

import type { Paquete } from '@src/api'

export type PackageItemProps = {
  paquete: PackageFakeData
  // Paquete
  onPress: (item: Paquete) => void
}
