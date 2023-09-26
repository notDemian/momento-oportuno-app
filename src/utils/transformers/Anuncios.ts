import type { Anuncio } from '@src/api'

type TypesToExcludeAndInclude =
  | 'author'
  | 'content'
  | 'date'
  | 'id'
  | 'link'
  | 'guid'
  | 'modified'
  | 'slug'
  | 'status'
  | 'template'
  | 'title'
  | 'type'

export type MappedAnuncio = Pick<Anuncio, TypesToExcludeAndInclude> & {
  defaultPrices: string[]
  defaultImages: string[]
  Categories: string[]
  pricesAsSalary: string[]
  estados: string[]

  caracteristicasCarros: string[]
  caracteristicasPolicyRelated: string[]

  jointCategories: string[]

  fullData: Omit<Anuncio, TypesToExcludeAndInclude>
}

export function mapAnuncio(anuncio: Anuncio): MappedAnuncio {
  const {
    author,
    content,
    date,
    id,
    guid,
    link,
    template,
    title,
    modified,
    type,
    slug,
    status,
    ...rest
  } = anuncio

  const jointCategories = [
    ...(anuncio.listivo_1910 ?? []),
    ...(anuncio.listivo_1912 ?? []),
    ...(anuncio.listivo_1911 ?? []),
    ...(anuncio.listivo_1913 ?? []),
    ...(anuncio.listivo_945 ?? []),
    ...(anuncio.listivo_946 ?? []),
    ...(anuncio.listivo_4686 ?? []),
    ...(anuncio.listivo_4316 ?? []),
  ]

  const mappedAnuncio: MappedAnuncio = {
    author,
    content,
    date,
    id,
    guid,
    link,
    template,
    title,
    modified,
    type,
    slug,
    status,

    defaultPrices: anuncio.listivo_130 ?? [],
    defaultImages: anuncio.listivo_145 ?? [],
    Categories: anuncio.listivo_14 ?? [],
    pricesAsSalary: anuncio.listivo_4780 ?? [],
    estados: anuncio.listivo_10934 ?? [],

    caracteristicasCarros: anuncio.listivo_4318 ?? [],
    caracteristicasPolicyRelated: anuncio.listivo_2723 ?? [],

    jointCategories,

    fullData: rest,
  }

  return mappedAnuncio
}
