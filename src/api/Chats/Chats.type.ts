import { AdSchema } from '../Anuncios'
import { UserSchema } from '../Usuarios'

import { z } from 'zod'

export const PostMessageSchema = z.object({
  message: z.string().min(1).max(1000),
})
export type PostMessageSchema = z.infer<typeof PostMessageSchema>

export const BaseChatMessageSchema = z.object({
  id: z.number(),
  chat_id: z.number(),
  user_id: z.number(),
  message: z.string(),
  read: z.coerce.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type BaseChatMessage = z.infer<typeof BaseChatMessageSchema>

export const InitializeChatResponseSchema = BaseChatMessageSchema.omit({
  read: true,
})
export type InitializeChatResponse = z.infer<
  typeof InitializeChatResponseSchema
>
export const GetChatMessagesResponseSchema = BaseChatMessageSchema.array()
export type GetChatMessagesResponse = z.infer<
  typeof GetChatMessagesResponseSchema
>

export const ListingChatSchema = AdSchema.pick({
  id: true,
  title: true,
  slug: true,
  status: true,
  thumbnail: true,
  description: true,
  is_featured: true,
  is_multistate: true,
  send_to_print: true,
  is_active: true,
  auto_renew: true,
  created_at: true,
  updated_at: true,
  video_url: true,
  media: true,
})
export const ChatSchema = z.object({
  id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  seller: UserSchema,
  buyer: UserSchema,
  buyer_id: z.number(),
  seller_id: z.number(),
  listing_id: z.number(),
  listing: ListingChatSchema,
  last_message: BaseChatMessageSchema,
})
export type Chat = z.infer<typeof ChatSchema>

export const GetMyChatsResponseSchema = z.object({
  data: ChatSchema.array(),
})
export type GetMyChatsResponse = z.infer<typeof GetMyChatsResponseSchema>

export const PostMessageResponseSchema = z.object({
  message: z.string(),
})

export type PostMessageResponse = z.infer<typeof PostMessageResponseSchema>
