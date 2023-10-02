export type GetDirectoriesVariantsResponse = DirectorioVariant[]

export type DirectorioVariant = {
  id: number
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  description: string
  permalink: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: null
  date_on_sale_from_gmt: null
  date_on_sale_to: null
  date_on_sale_to_gmt: null
  on_sale: boolean
  status: string
  purchasable: boolean
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  low_stock_amount: null
  weight: string
  dimensions: Dimensions
  shipping_class: string
  shipping_class_id: number
  image: null
  attributes: Attribute[]
  menu_order: number
  meta_data: MetaDatum[]
  _links: Links
}

type Links = {
  self: Collection[]
  collection: Collection[]
  up: Collection[]
}

type Collection = {
  href: string
}

type Attribute = {
  id: number
  name: string
  option: string
}

type Dimensions = {
  length: string
  width: string
  height: string
}

type MetaDatum = {
  id: number
  key: string
  value: string
}
