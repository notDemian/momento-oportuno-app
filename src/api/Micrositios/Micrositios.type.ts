import { StateSchema } from '../listivos'
import { UserSchema } from '../Usuarios'

import * as z from 'zod'

export const UserMicrositeSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
})

export type UserMicrosite = z.infer<typeof UserMicrositeSchema>

export const MicrositeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  description: z.null(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.string(),
  user_package: z.null(),
  user: UserMicrositeSchema,
  state: StateSchema,
  expires_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type Microsite = z.infer<typeof MicrositeSchema>

export const GetMicrositesResponseSchema = z.object({
  data: z.array(MicrositeSchema),
})
export type GetMicrositesResponse = z.infer<typeof GetMicrositesResponseSchema>

export const GetMicrositeByIdResponseSchema = z.object({
  data: MicrositeSchema,
})

export type GetMicrositeByIdResponse = z.infer<
  typeof GetMicrositeByIdResponseSchema
>
