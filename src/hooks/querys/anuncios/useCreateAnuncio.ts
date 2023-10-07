import { useMutation } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import { AnunciosServices } from '@src/api'

export const useCreateAnuncio = () => {
  return useMutation({
    mutationKey: [AnunciosQuerys.createAnuncio],
    mutationFn: AnunciosServices.createAnuncio,
  })
}
