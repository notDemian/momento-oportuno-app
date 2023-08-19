import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { useQuery } from 'react-query'
import { AnunciosQuerys } from './anuncios.query'

export const useAnuncio = (id: string | number) => {
  return useQuery({
    queryKey: [AnunciosQuerys.getAnuncio, id],
    queryFn: () => AnunciosServices.getAnuncio(id),
  })
}
