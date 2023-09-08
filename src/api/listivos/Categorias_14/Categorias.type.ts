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

interface Links {
  self: About[]
  collection: About[]
  about: About[]
  up: Up[]
  'wp:post_type': About[]
  curies: Cury[]
}

interface About {
  href: string
}

interface Cury {
  name: Name
  href: Href
  templated: boolean
}

enum Href {
  HTTPSAPIWOrgRel = 'https://api.w.org/{rel}',
}

enum Name {
  Wp = 'wp',
}

interface Up {
  embeddable: boolean
  href: string
}

enum Taxonomy {
  Listivo14 = 'listivo_14',
}
