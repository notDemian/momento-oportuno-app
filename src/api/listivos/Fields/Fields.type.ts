import * as z from 'zod'

const TermSchema = z.object({
  id: z.number(),
  key: z.string(),
  name: z.string(),
  parent: z.number(),
  searchFormPlaceholder: z.string(),
  parentTermIds: z.array(z.any()),
  dependencies: z.array(z.number()),
  hasMultilevelChildren: z.boolean(),
})

export const FieldSchema = z.object({
  id: z.number(),
  key: z.string(),
  name: z.string(),
  type: z.enum(['taxonomy', 'embed', 'number', 'price', 'salary', 'gallery']),
  terms: z.union([z.array(TermSchema), z.null()]).optional(),
})

export type FieldSchema = z.infer<typeof FieldSchema>

export const GetAllFieldsResponseSchema = z.array(FieldSchema)
export type GetAllFieldsResponse = z.infer<typeof GetAllFieldsResponseSchema>
