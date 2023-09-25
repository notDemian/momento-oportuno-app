export type Directorio = {
  id: number
  date: Date
  date_gmt: Date
  guid: GUID
  modified: Date
  modified_gmt: Date
  slug: string
  status: string
  type: string
  link: string
  title: GUID
  content: Content
  template: string
  meta: Meta
  acf: unknown[]
  _links: Links
}

export type DirectorioMapped = Omit<
  Directorio,
  '_links' | 'acf' | 'date_gmt' | 'modified_gmt' | 'slug' | 'template'
>

export type GetAllDirectoriosRes = Directorio[]

interface Links {
  self: About[]
  collection: About[]
  about: About[]
  'wp:attachment': About[]
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

interface Content {
  rendered: string
  protected: boolean
}

interface GUID {
  rendered: string
}

interface Meta {
  _seopress_robots_primary_cat: string
  ubicacion: string
}
