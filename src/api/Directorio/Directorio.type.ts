import { StateSchema } from '../listivos'
import { UserPackageSchema } from '../Paquetes'
import { UserSchema } from '../Usuarios'

import * as z from 'zod'

export type CreateDirectorioParams = {
  title: string
  state_id: number
  type: string
  hours: string
  address: string
  phone: string
  email: string
  user_id: number
  thumbnail: string
}

const UserDirectorioSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
})

export const DirectorioSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  type: z.string(),
  hours: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  thumbnail: z.string(),
  userPackage: UserPackageSchema.nullable().optional(),
  user: UserDirectorioSchema,
  state: StateSchema,
  updated_at: z.coerce.date(),
  created_at: z.coerce.date(),
})
export type Directorio = z.infer<typeof DirectorioSchema>

export const GetAllDirectoriosResponseSchema = z.object({
  data: z.array(DirectorioSchema),
})
export type GetAllDirectoriosResponse = z.infer<
  typeof GetAllDirectoriosResponseSchema
>

export const GetDirectorioByIdResponseSchema = z.object({
  data: DirectorioSchema,
})

export type GetDirectorioByIdResponse = z.infer<
  typeof GetDirectorioByIdResponseSchema
>

export const CreateDirectorioResponseSchema = GetDirectorioByIdResponseSchema

export type CreateDirectorioResponse = z.infer<
  typeof CreateDirectorioResponseSchema
>
