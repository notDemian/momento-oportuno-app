export type GetALlCategoriasRes = Categoria[]

export interface Categoria {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: Taxonomy
  parent: number
  meta: any[]
  acf: any[]
  _links: Links
}

export interface Links {
  self: About[]
  collection: About[]
  about: About[]
  up: Up[]
  'wp:post_type': About[]
  curies: Cury[]
}

export interface About {
  href: string
}

export interface Cury {
  name: Name
  href: Href
  templated: boolean
}

export enum Href {
  HTTPSAPIWOrgRel = 'https://api.w.org/{rel}',
}

export enum Name {
  Wp = 'wp',
}

export interface Up {
  embeddable: boolean
  href: string
}

export enum Taxonomy {
  Listivo14 = 'listivo_14',
}
