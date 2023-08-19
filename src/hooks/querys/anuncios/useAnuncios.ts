import AnunciosServices from '@src/api/Anuncios/Anuncios'
import { useQuery } from 'react-query'
import { AnunciosQuerys } from './anuncios.query'

const useAnuncios = () => {
  return useQuery({
    queryKey: [AnunciosQuerys.getAllAnuncios],
    queryFn: AnunciosServices.getAllAnuncios,
  })
}

export { useAnuncios }
