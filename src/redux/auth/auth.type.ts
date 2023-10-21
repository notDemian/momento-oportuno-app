import { User } from '@src/api/Usuarios'
import jwtDecode from 'jwt-decode'
import { z } from 'zod'

export interface AuthState {
  token: string
  user: User | null
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

export function JwtParse(token: string) {
  const jwtDecoded = JwtUserSchema.safeParse(jwtDecode(token))
  if (jwtDecoded.success) {
    return jwtDecoded.data
  }
  return null
}

export type JwtUser = z.infer<typeof JwtUserSchema>
