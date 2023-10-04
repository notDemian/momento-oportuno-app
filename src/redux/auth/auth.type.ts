import { User } from '@src/api/Usuarios'
import { z } from 'zod'

export interface AuthState {
  token: string
  user: User | null
  userId: number
}

export const JwtUserSchema = z.object({
  iss: z.string().optional(),
  iat: z.number().optional(),
  nbf: z.number().optional(),
  exp: z.number().optional(),
  data: z.object({
    user: z.object({
      id: z.coerce.number(),
    }),
  }),
})

export type JwtUser = z.infer<typeof JwtUserSchema>
