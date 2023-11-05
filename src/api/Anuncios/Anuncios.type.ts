import {
  AttributeSchema,
  AttributeValueSchema,
  CategorieSchema,
  StateSchema,
} from '../listivos'
import { MediaSchema } from '../Media/Media.module'
import { UserPackageSchema } from '../Paquetes'

import { UserAdSchema } from './Anuncios.module'

import * as z from 'zod'

const LinkSchema = z.object({
  url: z.union([z.null(), z.string()]),
  label: z.string(),
  active: z.coerce.boolean(),
})

const MetaSchema = z.object({
  current_page: z.number(),
  from: z.number().nullable().optional(),
  last_page: z.number(),
  links: z.array(LinkSchema),
  path: z.string(),
  per_page: z.number(),
  to: z.number().nullable().optional(),
  total: z.number(),
})

const nulishString = z.string().nullable().optional()

const LinksSchema = z.object({
  first: nulishString,
  last: nulishString,
  prev: nulishString,
  next: nulishString,
})

/**
 *  {"address": "dir", "created_at": "2023-11-02T19:11:54.000000Z", "description": null, "email": "demian.ironhide@gmail.com", "expires_at": "2023-12-02T19:12:23.000000Z", "id": 13, "image": null, "phone": "5547212321", "state_id": 1, "status": "published", "title": "título epico probando flujo", "updated_at": "2023-11-02T19:12:23.000000Z", "user_id": 2, "user_package_id": null}
 */

export type UserAd = z.infer<typeof UserAdSchema>

const AttributeAdSchema = AttributeSchema.omit({
  attributeValues: true,
  value: true,
}).merge(
  z.object({
    value: z.union([z.array(AttributeValueSchema), z.string()]),
  }),
)

export const AdSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  url: z.string().nullable().optional(),
  status: z.string(),
  image: z.union([z.null(), z.string()]),
  description: z.string().nullable().optional(),
  is_featured: z.coerce.boolean(),
  is_multistate: z.coerce.boolean(),
  is_active: z.coerce.boolean(),
  send_to_print: z.coerce.boolean().nullable().optional(),
  auto_renew: z.coerce.boolean(),
  user: UserAdSchema,
  user_package: UserPackageSchema.nullable().optional(),
  state: StateSchema,
  category: CategorieSchema,
  attributes: z.array(AttributeAdSchema),
  create_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  media: z.array(MediaSchema).nullable().optional(),
})
export type Ad = z.infer<typeof AdSchema>

export const GetAllAdsResponseSchema = z.object({
  data: z.array(AdSchema),
  links: LinksSchema,
  meta: MetaSchema,
})
export type GetAllAdsResponse = z.infer<typeof GetAllAdsResponseSchema>

export const GetAdByIdResponseSchema = z.object({
  data: AdSchema,
})
export type GetAdByIdResponse = z.infer<typeof GetAdByIdResponseSchema>

export const GetMyAdsResponseSchema = GetAllAdsResponseSchema

export type GetMyAdsResponse = z.infer<typeof GetMyAdsResponseSchema>

export const CreateAnuncioResponseSchema = z.object({
  data: AdSchema.omit({
    status: true,
    user: true,
    user_package: true,
    state: true,
    category: true,
    attributes: true,
  }),
})

export type CreateAnuncioResponse = z.infer<typeof CreateAnuncioResponseSchema>

export type GeneralCreateAnuncioParams = {
  title: string
  description: string
  state_id: number
  user_id: number
  category_id: number
}
export type a = {
  is_featured: boolean
  includes_printing: boolean
  includes_video: boolean
  includes_socials: boolean
  printing_state_id?: number
}

export type ListingAttribute = {
  attribute_id: number
  value: string
}

export type CreateAnuncioParams = GeneralCreateAnuncioParams & {
  subcategory_id: number
  listingAttributes: ListingAttribute[]
}

// export type createAnuncioResponse = createAnuncioParams

export const isAd = (ad: unknown): ad is Ad => {
  // prettier-ignore
  return Boolean(typeof ad === 'object' && ad && 'id' in ad && 'title' in ad && 'slug' in ad && 'url' in ad && 'status' in ad && 'image' in ad && 'description' in ad && 'is_featured' in ad && 'is_multistate' in ad && 'is_active' in ad && 'auto_renew' in ad && 'user' in ad && 'user_package' in ad && 'state' in ad && 'category' in ad && 'attributes' in ad && 'create_at' in ad && 'updated_at' in ad && ad.id && ad.title && ad.slug && ad.url && ad.status && ad.image && ad.description && ad.is_featured && ad.is_multistate && ad.is_active && ad.auto_renew && ad.user && ad.user_package && ad.state && ad.category && ad.attributes && ad.create_at && ad.updated_at)
}
