import { AdSchema } from '../Anuncios'

import { UserSchema } from './Usuarios.type'

import { z } from 'zod'

export const UserWithListingsSchema = UserSchema.extend({
  listings: z
    .lazy(() =>
      AdSchema.omit({
        user: true,
        attributes: true,
        category: true,
        state: true,
        updated_at: true,
      }).array(),
    )
    .nullable()
    .optional(),
})
