import z from 'zod'

export const MediaSchema = z.object({
  id: z.number(),
  collection_name: z.string(),
  file_name: z.string(),
  mime_type: z.string(),
  size: z.number(),
  original_url: z.string(),
  preview_url: z.string(),
})
export type Media = z.infer<typeof MediaSchema>
