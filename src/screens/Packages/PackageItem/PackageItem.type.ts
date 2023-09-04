import type { Paquete } from '@src/api'
import type { PackageFakeData } from '../mocks/package.type'

export type PackageItemProps = {
  paquete: PackageFakeData
  // Paquete
  onPress: (item: Paquete) => void
}
