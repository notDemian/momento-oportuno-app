import { AdSchema } from '../Anuncios'

import * as z from 'zod'

export const AdFavoriteSchema = AdSchema.omit({
  user: true,
  user_package: true,
  state: true,
  attributes: true,
  attributeValues: true,
  category: true,
})

export type AdFavorite = z.infer<typeof AdFavoriteSchema>

export const GetMyFavoritesResponseSchema = z.object({
  data: z.array(AdFavoriteSchema),
})
export type GetMyFavoritesResponse = z.infer<
  typeof GetMyFavoritesResponseSchema
>

export const AddFavoriteResponseSchema = z.object({
  data: AdFavoriteSchema,
})

export type AddFavoriteResponse = z.infer<typeof AddFavoriteResponseSchema>

export const RemoveFavoriteResponseSchema = z.object({
  message: z.string(),
})

export type RemoveFavoriteResponse = z.infer<
  typeof RemoveFavoriteResponseSchema
>
