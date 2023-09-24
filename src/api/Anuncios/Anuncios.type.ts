export type Main_Anuncios = Anuncio[]

export type getAnuncioRes = Anuncio

export interface Anuncio {
  id: number
  date: Date
  date_gmt: Date
  guid: GUID
  modified: Date
  modified_gmt: Date
  slug: string
  status: Status
  type: Type
  link: string
  title: GUID
  content: Content
  author: number
  template: string
  listivo_4661: string[]
  listivo_4660: string[]
  listivo_4659: string[]
  listivo_4657: string[]
  listivo_4318: string[]
  listivo_2723: string[]
  listivo_1913: string[]
  listivo_1912: string[]
  listivo_1911: string[]
  listivo_1910: string[]
  listivo_946: string[]
  listivo_945: string[]
  listivo_14: string[]
  listivo_10934: string[]
  listivo_4780: string[]
  listivo_4686: string[]
  listivo_4316: string[]
  listivo_3411: Listivo34
  listivo_2863: string[]
  listivo_345: Listivo34
  listivo_344: unknown[]
  listivo_340: string[]
  listivo_339: unknown[]
  listivo_338: unknown[]
  listivo_145: string[]
  listivo_130: string[]
  _links: Anu_Links
}

interface Anu_Links {
  self: About[]
  collection: About[]
  about: About[]
  author: Author[]
  'wp:attachment': About[]
  'wp:term': WpTerm[]
  curies: Cury[]
}

interface About {
  href: string
}

interface Author {
  embeddable: boolean
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

interface WpTerm {
  taxonomy: string
  embeddable: boolean
  href: string
}

interface Content {
  rendered: string
  protected: boolean
}

interface GUID {
  rendered: string
}

interface Listivo34 {
  url: string
  embed: string
}

enum Status {
  Publish = 'publish',
}

enum Type {
  ListivoListing = 'listivo_listing',
}
