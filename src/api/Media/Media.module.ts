import z from 'zod'

export const MediaSchema = z.object({
  id: z.number(),
  model_type: z.string(),
  model_id: z.number(),
  uuid: z.string(),
  collection_name: z.string(),
  name: z.string(),
  file_name: z.string(),
  mime_type: z.string(),
  disk: z.string(),
  conversions_disk: z.string(),
  size: z.number(),
  manipulations: z.array(z.any()),
  custom_properties: z.array(z.any()),
  generated_conversions: z.array(z.any()),
  responsive_images: z.array(z.any()),
  order_column: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  original_url: z.string(),
  preview_url: z.string(),
})
export type Media = z.infer<typeof MediaSchema>
