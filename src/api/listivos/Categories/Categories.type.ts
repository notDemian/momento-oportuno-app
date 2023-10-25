import * as z from 'zod'

const SubCategorie = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.null(),
  parent_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type SubCategory = z.infer<typeof SubCategorie>

export const CategorieSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.null(),
  children: z.array(SubCategorie),
})
export type Categorie = z.infer<typeof CategorieSchema>

export const GetCategoriesResponseSchema = z.object({
  data: z.array(CategorieSchema),
})
export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>

export const AttributeValueSchema = z.object({
  id: z.number(),
  attribute_id: z.number(),
  name: z.string(),
  key: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type AttributeValue = z.infer<typeof AttributeValueSchema>

const AttributeType = z.union([
  z.literal('text'),
  z.literal('number'),
  z.literal('select'),
  z.literal('checkbox'),
])

export const AttributeSchema = z.object({
  id: z.number(),
  name: z.string(),
  key: z.string(),
  placeholder: z.union([z.null(), z.string()]),
  description: z.union([z.null(), z.string()]),
  type: AttributeType,
  is_required: z.boolean(),
  is_multiple: z.boolean(),
  category_id: z.number().nullable(),
  value: z.null().optional(),
  attributeValues: z.array(AttributeValueSchema),
})
export type Attribute = z.infer<typeof AttributeSchema>

export const GetCategoryAttributesSchema = z.object({
  data: z.array(AttributeSchema),
})
export type GetCategoryAttributes = z.infer<typeof GetCategoryAttributesSchema>
