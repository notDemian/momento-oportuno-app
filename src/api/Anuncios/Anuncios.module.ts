import { MicrositeSchema } from '../Micrositios/Micrositios.type'
import { UserSchema } from '../Usuarios'

import { z } from 'zod'

export const UserAdSchema = UserSchema.omit({
  email_verified_at: true,
  // created_at: true,
  updated_at: true,
}).merge(
  z.object({
    microsite: MicrositeSchema.omit({
      user: true,
      state: true,
    })
      .nullable()
      .optional(),
  }),
)
