import { StateSchema } from '../listivos'
import { MediaSchema } from '../Media/Media.module'
import { UserPackageSchema } from '../Paquetes'
import { UserSchema } from '../Usuarios'

import * as z from 'zod'

export const CreateDirectorioParamsSchema = z.object({
  title: z
    .string()
    .min(3, 'El titulo debe tener al menos 3 caracteres')
    .max(50, 'El titulo debe tener menos de 50 caracteres'),
  state_id: z
    .number()
    .positive('Debes seleccionar un estado')
    .min(1, 'Debes seleccionar un estado'),
  type: z
    .string()
    .min(3, 'El tipo debe tener al menos 3 caracteres')
    .max(50, 'El tipo debe tener menos de 50 caracteres'),
  hours: z
    .string()
    .min(3, 'El horario debe tener al menos 3 caracteres')
    .max(50, 'El horario debe tener menos de 50 caracteres'),
  address: z
    .string()
    .min(3, 'La dirección debe tener al menos 3 caracteres')
    .max(50, 'La dirección debe tener menos de 50 caracteres'),
  phone: z
    .string()
    .min(3, 'El telefono debe tener al menos 3 caracteres')
    .max(10, 'El telefono debe tener menos de 10 caracteres'),
  email: z
    .string()
    .min(3, 'El email debe tener al menos 3 caracteres')
    .max(50, 'El email debe tener menos de 50 caracteres')
    .email('Email invalido'),

  TyC: z
    .boolean({
      errorMap: (error) => {
        return { message: 'Debes aceptar los terminos' }
      },
    })
    .refine((v) => v === true, {
      message: 'Debes aceptar los terminos',
    }),
})
export type CreateDirectorioParamsSchema = z.infer<
  typeof CreateDirectorioParamsSchema
>

export type CreateDirectorioParams = Omit<
  CreateDirectorioParamsSchema,
  'TyC'
> & {
  user_id: number
  thumbnail?: string
}

const UserDirectorioSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
})

export const DirectorioSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  hours: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),

  thumbnail: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  userPackage: UserPackageSchema.nullable().optional(),
  user: UserDirectorioSchema,
  state: StateSchema,
  updated_at: z.coerce.date(),
  created_at: z.coerce.date(),
  media: z.array(MediaSchema).nullable().optional(),
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

export const CreateDirectorioResponseSchema = z.object({
  data: DirectorioSchema,
})

export type CreateDirectorioResponse = z.infer<
  typeof CreateDirectorioResponseSchema
>

export const isDirectorio = (obj: unknown): obj is Directorio => {
  try {
    DirectorioSchema.parse(obj)
    return true
  } catch (error) {
    return false
  }
}
