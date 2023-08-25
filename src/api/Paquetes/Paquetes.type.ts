export type GetALlPaquetesRes = Paquete[]

export interface Paquete {
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
  excerpt: Content
  featured_media: number
  comment_status: CommentStatus
  ping_status: PingStatus
  template: string
  meta: Meta
  product_cat: number[]
  product_tag: any[]
  acf: any[]
  _links: Links
}

interface Links {
  self: About[]
  collection: About[]
  about: About[]
  replies: Reply[]
  'wp:attachment': About[]
  'wp:term': WpTerm[]
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

interface Reply {
  embeddable: boolean
  href: string
}

interface WpTerm {
  taxonomy: Taxonomy
  embeddable: boolean
  href: string
}

enum Taxonomy {
  ProductCat = 'product_cat',
  ProductTag = 'product_tag',
}

enum CommentStatus {
  Open = 'open',
}

interface Content {
  rendered: Rendered
  protected: boolean
}

enum Rendered {
  Empty = '',
  PContenidoP = '<p>Contenido</p>\n',
}

interface GUID {
  rendered: string
}

interface Meta {
  _seopress_robots_primary_cat: SeopressRobotsPrimaryCat
}

enum SeopressRobotsPrimaryCat {
  Empty = '',
  None = 'none',
}

enum PingStatus {
  Closed = 'closed',
}

enum Status {
  Publish = 'publish',
}

enum Type {
  Product = 'product',
}
