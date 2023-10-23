import { Ad, AdFavorite } from '@src/api'
export type AnuncioProps =
  | {
      data: Ad
    }
  | {
      isFav: true
      data: AdFavorite
    }
