export type GetAllEstadosResponse = Estado[]

export interface Estado {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  meta: unknown[]
  acf: unknown[]
  _links: Links
}

interface Links {
  self: About[]
  collection: About[]
  about: About[]
  'wp:post_type': About[]
  curies: Cury[]
}

interface About {
  href: string
}

interface Cury {
  name: string
  href: string
  templated: boolean
}
