export const AnunciosQuerys = {
  getAllAnuncios: (params?: unknown) => ['getAllAnuncios', params],
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
