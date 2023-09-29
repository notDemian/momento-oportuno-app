import {
  Directorio,
  DirectorioMapped,
} from '@src/api/Directorio/Directorio.type'

export function mapDirectorio(d: Directorio): DirectorioMapped {
  const { ...rest } = d
  return rest
}
