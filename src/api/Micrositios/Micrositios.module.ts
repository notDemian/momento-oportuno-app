import { StateSchema } from '../listivos'
import { MediaSchema } from '../Media/Media.module'
import { UserPackageSchema } from '../Paquetes'
import { UserWithListingsSchema } from '../Usuarios/Usuario.module'

import { z } from 'zod'

const MicrositeSchemaWithListings = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.string().nullable().optional(),
  user_package: UserPackageSchema.nullable().optional(),
  user: UserWithListingsSchema,
  state: StateSchema,
  expires_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  media: z.array(MediaSchema).nullable().optional(),
})

export type MicrositeWithListings = z.infer<typeof MicrositeSchemaWithListings>

export const GetMicrositeByIdResponseSchema = z.object({
  data: MicrositeSchemaWithListings,
})

export type GetMicrositeByIdResponse = z.infer<
  typeof GetMicrositeByIdResponseSchema
>

type asd = NonNullable<
  GetMicrositeByIdResponse['data']['user']['listings']
>[number]

// z.object({
//   listings: z
//     .array(
//       AdSchema.omit({
//         user: true,
//       }),
//     )
//     .nullable()
// .optional(),
// })
