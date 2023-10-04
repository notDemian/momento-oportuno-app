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

export type GetMyOrdersResponse = Order[]

export type Order = {
  id: number
  parent_id: number
  status:
    | 'pending'
    | 'processing'
    | 'on-hold'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'trash'
  currency: string
  version: string
  prices_include_tax: boolean
  date_created: Date
  date_modified: Date
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  customer_id: number
  order_key: string
  billing: Ing
  shipping: Ing
  payment_method: string
  payment_method_title: string
  transaction_id: string
  customer_ip_address: string
  customer_user_agent: string
  created_via: string
  customer_note: string
  date_completed: Date
  date_paid: Date
  cart_hash: string
  number: string
  meta_data: MetaDatum[]
  line_items: LineItem[]
  tax_lines: any[]
  shipping_lines: any[]
  fee_lines: any[]
  coupon_lines: any[]
  refunds: any[]
  payment_url: string
  is_editable: boolean
  needs_payment: boolean
  needs_processing: boolean
  date_created_gmt: Date
  date_modified_gmt: Date
  date_completed_gmt: Date
  date_paid_gmt: Date
  currency_symbol: string
  _links: Links
}

type Ing = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone: string
}

type LineItem = {
  id: number
  name: string
  product_id: number
  variation_id: number
  quantity: number
  tax_class: string
  subtotal: string
  subtotal_tax: string
  total: string
  total_tax: string
  taxes: any[]
  meta_data: any[]
  sku: string
  price: number
  image: Image
  parent_name: null
}

type Image = {
  id: string
  src: string
}
