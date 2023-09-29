import { useQuery } from 'react-query'

import { AnunciosQuerys } from './anuncios.query'

import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { OldMapAnuncio } from '@src/utils'

export const useAnuncio = (id: string | number) => {
  return useQuery({
    queryKey: [AnunciosQuerys.getAnuncio, id],
    queryFn: () => AnunciosServices.getAnuncio(id),
    select: OldMapAnuncio,
  })
}
