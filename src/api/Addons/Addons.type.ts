import * as z from 'zod'

export const AddonsSchema = z.object({
  id: z.number(),
  name: z.string(),
  key: z.string(),
  description: z.string().nullable().optional(),
  price: z.coerce.number().nullable().optional(),
})
export type Addons = z.infer<typeof AddonsSchema>

export const GetAddonsResponseSchema = z.object({
  data: z.array(AddonsSchema),
})
export type GetAddonsResponse = z.infer<typeof GetAddonsResponseSchema>
