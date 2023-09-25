import {
  Directorio,
  DirectorioMapped,
} from '@src/api/Directorio/Directorio.type'

export function mapDirectorio(d: Directorio): DirectorioMapped {
  const { _links, acf, date_gmt, modified_gmt, slug, template, ...rest } = d
  return rest
}
