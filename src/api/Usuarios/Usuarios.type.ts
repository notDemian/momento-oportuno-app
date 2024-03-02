import * as z from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  email_verified_at: z.string().nullable().default(null),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable().optional(),
})
export type User = z.infer<typeof UserSchema>

export const GeneralLogInSchema = z.object({
  token: z.string(),
  user: UserSchema,
})
export type GeneralLogIn = z.infer<typeof GeneralLogInSchema>

export type logInRes = GeneralLogIn

export type registerRes = GeneralLogIn

export const LoginParamsSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export type LoginParams = z.infer<typeof LoginParamsSchema>

export const RegisterParamsSchema = z
  .object({
    name: z.string().min(6, 'El nombre debe tener al menos 6 caracteres'),
    email: z.string().email('El email no es válido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    phone: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
    username: z
      .string()
      .min(6, 'El nombre de usuario debe tener al menos 6 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['password_confirmation'],
      })
    }
  })

export type RegisterParams = z.infer<typeof RegisterParamsSchema>

// export const DataSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   email: z.string(),
// });
// export type Data = z.infer<typeof DataSchema>;

export const GetMeResponseSchema = z.object({
  data: UserSchema.omit({
    email_verified_at: true,
    created_at: true,
    updated_at: true,
  }),
})
export type GetMeResponse = z.infer<typeof GetMeResponseSchema>

export const ChangePasswordParamsSchema = z
  .object({
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    password_confirmation: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['password_confirmation'],
      })
    }
  })

export type ChangePasswordParamsSchema = z.infer<
  typeof ChangePasswordParamsSchema
>

export const ChangePasswordResponseSchema = z.object({
  message: z.string().optional(),
})

export type ChangePasswordResponse = z.infer<
  typeof ChangePasswordResponseSchema
>

export const RegisterErrorSchema = z.object({
  message: z.string(),
  errors: z.record(z.array(z.string())),
})

export type RegisterError = z.infer<typeof RegisterErrorSchema>
