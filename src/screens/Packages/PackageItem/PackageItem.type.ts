import type { Paquete } from '@src/api'

export type PackageItemProps = {
  paquete: Paquete
  onPress: (item: Paquete) => void
}
