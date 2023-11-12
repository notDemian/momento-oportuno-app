import { z } from 'zod'

export const PostMessageSchema = z.object({
  message: z.string().min(1).max(1000),
})
export type PostMessageSchema = z.infer<typeof PostMessageSchema>
