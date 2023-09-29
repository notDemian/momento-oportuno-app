import type { Anuncio } from '@src/api'

type TypesToExcludeAndInclude =
  | 'user'
  | 'id'
  | 'title'
  | 'url'
  | 'description'
  | 'created_at'
  | 'image'

export type MappedAnuncio = Pick<Anuncio, TypesToExcludeAndInclude> & {
  defaultPrice: string
  defaultImages: string[]
  Categories: Anuncio['caracteresticas_de_la_comunidad']['value']
  pricesAsSalary: string
  estados: Anuncio['caracteresticas_de_la_comunidad']['value']
  image: string

  jointCategories: string[]

  fullData: Omit<Anuncio, TypesToExcludeAndInclude>
}

export function mapAnuncio(anuncio: Anuncio): MappedAnuncio {
  const {
    user,
    created_at,
    id,
    url,
    title,
    description,
    image,

    ...rest
  } = anuncio

  const jointCategories = [
    // ...(anuncio.listivo_1910 ?? []),
    // ...(anuncio.listivo_1912 ?? []),
    // ...(anuncio.listivo_1911 ?? []),
    // ...(anuncio.listivo_1913 ?? []),
    // ...(anuncio.listivo_945 ?? []),
    // ...(anuncio.listivo_946 ?? []),
    // ...(anuncio.listivo_4686 ?? []),
    // ...(anuncio.listivo_4316 ?? []),
    ...(anuncio.caracteresticas_de_la_comunidad.value.map((p) => p.name) ?? []),
    ...(anuncio.caracteresticas_de_la_mascota.value.map((p) => p.name) ?? []),
    ...(anuncio.caracteresticas_del_veheculo.value.map((p) => p.name) ?? []),
    ...(anuncio.caracteristicas_de_la_propiedad.value.map((p) => p.name) ?? []),
  ]

  const mappedAnuncio: MappedAnuncio = {
    user,
    id,
    title,
    url,
    description,
    created_at,

    defaultPrice: anuncio.price ?? '',
    Categories: anuncio.categorea.value,
    pricesAsSalary: anuncio.salario.value.listivo_4780_listivo_459,
    estados: anuncio.ciudad.value,
    image,
    defaultImages: anuncio.images.map((i) => i.url),
    jointCategories,

    fullData: rest,
  }

  return mappedAnuncio
}
