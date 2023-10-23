export const AnunciosQuerys = {
  getAllAnuncios: (params?: unknown) => ['getAllAnuncios', params],
  getAnuncio: (id: string | number) => ['getAnuncio', id],
  getMyAds: 'getMyAds',

  createAnuncio: 'createAnuncio',
  updateAnuncio: 'updateAnuncio',
  deleteAnuncio: 'deleteAnuncio',
} as const
