import { z } from 'zod'

export interface User {
  token: string
  user_display_name: string
  user_email: string
  user_nicename: string
}

export type logInRes = User

export const logInParamsSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type logInParams = z.infer<typeof logInParamsSchema>

export const registerParamsSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
})

export type registerParams = z.infer<typeof registerParamsSchema>
