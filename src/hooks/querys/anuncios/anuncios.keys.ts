import { FilterParamsBase } from '@src/redux'

export const AnunciosQuerys = {
  getAllAnuncios: (params?: Partial<FilterParamsBase> | undefined) => [
    'getAllAnuncios',
    params,
    params?.query,
  ],
  getAnuncio: (id: string | number, includeDrafts: boolean) => [
    'getAnuncio',
    id,
    includeDrafts,
  ],
  getMyAds: 'getMyAds',

  createAnuncio: 'createAnuncio',
  updateAnuncio: 'updateAnuncio',
  deleteAnuncio: 'deleteAnuncio',
} as const

export const AnunciosMutationsKeys = {
  createAnuncio: 'createAnuncio',
} as const
