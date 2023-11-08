import { StateSchema } from '../listivos'
import { MediaSchema } from '../Media/Media.module'
import { UserPackageSchema } from '../Paquetes'
import { UserSchema } from '../Usuarios'

import * as z from 'zod'

export const UserMicrositeSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
})
export const MicrositeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.string().nullable().optional(),
  user_package: UserPackageSchema.nullable().optional(),
  user: UserMicrositeSchema,
  state: StateSchema,
  expires_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  media: z.array(MediaSchema).nullable().optional(),
})

export const GetMicrositesResponseSchema = z.object({
  data: z.array(MicrositeSchema),
})

export type UserMicrosite = z.infer<typeof UserMicrositeSchema>

export type Microsite = z.infer<typeof MicrositeSchema>

export type GetMicrositesResponse = z.infer<typeof GetMicrositesResponseSchema>

export const CreateMicrositeParamsSchema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  state_id: z.number().min(1, 'Selecciona un estado'),
  address: z.string().min(3, 'Mínimo 3 caracteres'),
  phone: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(10, 'Máximo 10 caracteres'),
  email: z.string().email('Email inválido'),
})
export type CreateMicrositeParamsSchema = z.infer<
  typeof CreateMicrositeParamsSchema
>
export type CreateMicrositeParams = CreateMicrositeParamsSchema & {
  user_id: number
}

export const CreateMicrositeResponseSchema = z.object({
  data: MicrositeSchema.omit({
    user: true,
  }),
})

export type CreateMicrositeResponse = z.infer<
  typeof CreateMicrositeResponseSchema
>

export const isMicrosite = (data: unknown): data is Microsite => {
  try {
    MicrositeSchema.parse(data)
    return true
  } catch (error) {
    return false
  }
}
